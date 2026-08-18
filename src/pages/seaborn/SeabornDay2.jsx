import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Code, BookOpen, Sliders, Trophy, FileText, ArrowRight, Award } from 'lucide-react';
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

export default function SeabornDay2({ activeTab, onNavigate, openAITutor }) {
  const day2Presets = [
    {
      name: 'distribution_charts',
      label: 'Salary Distribution Plot',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load tips mock dataset\ntips = sns.load_dataset('tips')\n\nsns.set_theme(style='darkgrid')\n\n# Combine histogram with KDE line overlay\nsns.histplot(data=tips, x='total_bill', kde=True, color='purple', bins=15)\n\nplt.title('Restaurant Invoice Sizes Spread')\nplt.show()`,
      output: `🎉 Distribution plot generated successfully!\n[Figure: total_bill histogram with overlapping KDE density line]`
    },
    {
      name: 'categorical_violin',
      label: 'Categorical Violin Plot',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntips = sns.load_dataset('tips')\n\nsns.set_theme(style='ticks')\n\n# Violin plot comparing distributions across categories\nsns.violinplot(data=tips, x='day', y='total_bill', hue='sex', split=True, palette='muted')\n\nplt.title('Daily Bill Distribution by Gender')\nplt.show()`,
      output: `🎉 Categorical violin plot successfully created!\n[Figure: split violins comparing genders across days]`
    }
  ];

  const day2Challenges = [
    {
      id: 'ch2_sns_dist',
      title: 'Salary Histogram Challenge',
      desc: 'Plot a distribution curve of salary metrics using histplot with KDE lines enabled.',
      hint: 'Include "sns.histplot(data=df, x=..., kde=True)" in your code.'
    },
    {
      id: 'ch2_sns_categorical',
      title: 'Categorical Box Plot Challenge',
      desc: 'Configure boxplots comparing salary spreads across distinct business departments.',
      hint: 'Include "sns.boxplot(x=\'Department\', y=\'Salary\', data=df)" in your code.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  const handleContinue = (nextTabId) => {
    onNavigate('seaborn_day2', nextTabId);
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
      q: 'Which Seaborn function overlays a continuous probability density curve onto frequency bins?',
      opts: ['sns.kdeplot()', 'sns.histplot(..., kde=True)', 'sns.displot()', 'sns.ecdfplot()'],
      ans: 1,
      exp: 'Passing `kde=True` to `sns.histplot()` overlays a Kernel Density Estimation line onto the frequency bar histograms.'
    },
    {
      id: 'q2',
      q: 'Which categorical plot renders individual data points as a scatter layout without them overlapping?',
      opts: ['sns.stripplot()', 'sns.swarmplot()', 'sns.boxplot()', 'sns.violinplot()'],
      ans: 1,
      exp: '`sns.swarmplot()` positions scatter points side-by-side along categorical axes to prevent overlaps, revealing distribution shapes clearly.'
    },
    {
      id: 'q3',
      q: 'What is the unique visual advantage of a Violin Plot (sns.violinplot) compared to a Box Plot?',
      opts: [
        'It displays exact coordinate values in text labels.',
        'It works faster on heavy big-data sets.',
        'It combines box plot stats (quartiles) with continuous probability distribution curves.',
        'It shows correlation lines.'
      ],
      ans: 2,
      exp: 'Violin plots combine box-plot metrics (medians, ranges) with a mirrored kernel density estimation curve to show density shape details.'
    },
    {
      id: 'q4',
      q: 'Which function should be used to automatically count occurrences of items in a categorical column?',
      opts: ['sns.barplot()', 'sns.countplot()', 'sns.histplot()', 'sns.displot()'],
      ans: 1,
      exp: '`sns.countplot()` automatically aggregates and displays counts of records for each categorical value on a bar layout.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'distributions' && (
        <Section eyebrow="Day 2 • Distribution Plots" title="Visualizing Data Spreads & Density">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#6366f1" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#3730a3', lineHeight: '1.5' }}>
                  Today we learn how to map continuous distributions! Use <strong>histplot</strong> for raw frequency bins, <strong>kdeplot</strong> for smooth probability curves, and <strong>ecdfplot</strong> to visualize cumulative statistics.
                </span>
              </div>
            </div>

            {/* Distribution Charts */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Histograms, KDE, and displot
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Seaborn provides several functions to analyze statistical distributions:
              </p>

              <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
                <li><strong><code>sns.histplot()</code>:</strong> Plots bar counts in equal intervals (bins). Add <code>kde=True</code> to overlay density curves.</li>
                <li><strong><code>sns.kdeplot()</code>:</strong> Kernel Density Estimation curves showing continuous probability density.</li>
                <li><strong><code>sns.ecdfplot()</code>:</strong> Empirical Cumulative Distribution Function plot, representing cumulative proportions.</li>
              </ul>

              <SyntaxHighlighter code={`# Histogram with KDE\nsns.histplot(data=df, x='Salary', kde=True, bins=10)\n\n# Smooth Density Curve\nsns.kdeplot(data=df, x='Salary', fill=True)\n\n# ECDF Plot\nsns.ecdfplot(data=df, x='Salary')`} />
            </div>

            {/* Advantages and Applications */}
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>When to Use & Advantages:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                <li><strong>Histograms:</strong> Best for raw counts and identifying outlier gaps.</li>
                <li><strong>KDE Plots:</strong> Best for smooth comparisons of multiple curves without bin count bias.</li>
                <li><strong>Applications:</strong> Identifying employee salary skewness, verifying test score thresholds, or auditing website latency values.</li>
              </ul>
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('categorical')}>
                Continue to Categorical Charts →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'categorical' && (
        <Section eyebrow="Day 2 • Categorical Plots" title="Comparing Category Metrics & Spreads">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#6366f1" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#3730a3', lineHeight: '1.5' }}>
                  Let's explore categorical distributions. We will study bar and count plots for aggregated totals, box and violin plots for summary spreads, and strip/swarm plots to show every individual data point.
                </span>
              </div>
            </div>

            {/* Categorical Charts list */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Categorical Visualizations Guide
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Choose the best visualization depending on your aggregation needs:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Aggregated Values</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                    <li><strong><code>sns.barplot()</code>:</strong> Shows mean values as bars with error margin cap lines.</li>
                    <li><strong><code>sns.countplot()</code>:</strong> Displays frequency counts for categories.</li>
                  </ul>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Statistical Spreads</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                    <li><strong><code>sns.boxplot()</code>:</strong> Displays median box boundaries, quartiles, and outliers.</li>
                    <li><strong><code>sns.violinplot()</code>:</strong> Displays continuous probability shapes.</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Individual Points (Scatter style)</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                  <li><strong><code>sns.stripplot()</code>:</strong> Plots individual points (can overlap slightly).</li>
                  <li><strong><code>sns.swarmplot()</code>:</strong> Adjusts points along the categorical axis so they never overlap.</li>
                </ul>
              </div>

              <SyntaxHighlighter code={`# Violin plot grouped by category\nsns.violinplot(data=df, x='Department', y='Salary', hue='Gender', split=True)\n\n# Swarm plot overlaid on top of a boxplot\nsns.boxplot(data=df, x='Department', y='Salary', color='lightgray')\nsns.swarmplot(data=df, x='Department', y='Salary', color='purple', size=5)`} />
            </div>

            <div className="flex justify-between" style={{ marginTop: '1rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('distributions')}>
                ← Back to Distributions
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 2 • AI Studio" title="AI Activity: Employee Salary spreads">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Sift Categorical Distributions</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a Seaborn script to compare the distribution of employee salaries across different departments using box plots.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Configure the whitegrid theme using <code>sns.set_theme()</code>.</li>
                <li>Call <code>sns.boxplot()</code>, setting <code>x='Department'</code>, <code>y='Salary'</code>, and passing the DataFrame <code>data=df</code>.</li>
                <li>Display the output using <code>plt.show()</code>.</li>
              </ol>
            </div>

            <SyntaxHighlighter code={`# Columns in df DataFrame:\n# ['EmployeeName', 'Department', 'Salary', 'ExperienceYears']`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('categorical')}>
                ← Back to Categorical
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 2 • Practical Lab" title="Distribution & Categorical Sandbox">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Day 2 Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Test distribution histograms, count aggregations, and violin density shapes. Solve tasks on the left sidebar to pass the coding evaluation.
            </p>
            <SeabornAIPlayground dayId="day2" presets={day2Presets} challenges={day2Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('activity')}>
                ← Back to AI Activity
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Day 2 Assessment →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 2 • Evaluation" title="Day 2 Assessment Quiz">
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
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>🎉 Perfect score! You have mastered distribution and categorical plots in Seaborn.</span>
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
              <button className="btn btn-primary" onClick={() => onNavigate('seaborn_day3', 'relationships')}>
                Continue to Day 3 →
              </button>
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
