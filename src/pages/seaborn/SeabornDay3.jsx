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

export default function SeabornDay3({ activeTab, onNavigate, openAITutor }) {
  const day3Presets = [
    {
      name: 'correlation_heatmap',
      label: 'Correlation Heatmap',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load mpg sample dataset\nmpg = sns.load_dataset('mpg')\n\n# Select numerical columns and compute correlation\ncorr_matrix = mpg[['mpg', 'cylinders', 'displacement', 'horsepower', 'weight']].corr()\n\nsns.set_theme(style='white')\n\n# Create an annotated heatmap with a custom colormap\nsns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)\n\nplt.title('Car Specifications Correlation Matrix')\nplt.show()`,
      output: `🎉 Correlation heatmap successfully created!\n[Figure: annotated matrix highlighting displacement/horsepower/weight links]`
    },
    {
      name: 'regression_scatter',
      label: 'Linear Regression Plot',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntips = sns.load_dataset('tips')\n\n# Plot regression fit with confidence intervals shaded\nsns.regplot(data=tips, x='total_bill', y='tip', scatter_kws={'alpha':0.5}, line_kws={'color':'red'})\n\nplt.title('Bill vs Tip Linear regression')\nplt.show()`,
      output: `🎉 Regression fit successfully generated!\n[Figure: scatter points with fitted regression trend line overlay]`
    }
  ];

  const day3Challenges = [
    {
      id: 'ch3_sns_heatmap',
      title: 'Housing Heatmap Challenge',
      desc: 'Build an annotated heatmap showing correlations between variables in a housing dataset.',
      hint: 'Include "sns.heatmap(corr, annot=True)" in your Python code.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  const handleContinue = (nextTabId) => {
    onNavigate('seaborn_day3', nextTabId);
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
      q: 'Which function creates a matrix grid of pairwise scatter plots across all numerical columns in a DataFrame?',
      opts: ['sns.heatmap()', 'sns.pairplot()', 'sns.jointplot()', 'sns.lmplot()'],
      ans: 1,
      exp: '`sns.pairplot()` creates a grid of pairwise relationships, plotting histograms on the diagonal and scatter plots on off-diagonals.'
    },
    {
      id: 'q2',
      q: 'What parameter displays exact Pearson correlation coefficient numbers inside heatmap cells?',
      opts: ['annot=True', 'labels=True', 'show_values=True', 'numbers=True'],
      ans: 0,
      exp: 'Setting `annot=True` overlays numerical value strings directly onto correlation heatmap grid cells.'
    },
    {
      id: 'q3',
      q: 'What is the main difference between regplot and lmplot?',
      opts: [
        'regplot runs faster on large arrays.',
        'lmplot is a figure-level grid wrapper supporting facets (row/col columns), whereas regplot is an axes-level drawing function.',
        'regplot draws circles; lmplot draws squares.',
        'They are exactly identical.'
      ],
      ans: 1,
      exp: '`sns.lmplot()` combines regression features with a facet grid layout (allowing `col` and `row` categorical groupings), while `sns.regplot()` is limited to single axes canvas drawing.'
    },
    {
      id: 'q4',
      q: 'Which visualization displays a bivariate scatter relationship alongside marginal histograms on the sides?',
      opts: ['sns.pairplot()', 'sns.jointplot()', 'sns.heatmap()', 'sns.regplot()'],
      ans: 1,
      exp: '`sns.jointplot()` maps scatter coordinate points in the center axes, and appends univariate marginal frequency plots on top and right edges.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'relationships' && (
        <Section eyebrow="Day 3 • Statistical Relationships" title="Regressions, Pair Plots & Heatmaps">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#6366f1" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#3730a3', lineHeight: '1.5' }}>
                  Today we focus on statistical correlation models. Use <strong>regplot</strong> to fit trend lines, <strong>jointplot</strong> for distributions and scatters, <strong>pairplot</strong> for dataset scans, and <strong>heatmaps</strong> to audit correlation matrices.
                </span>
              </div>
            </div>

            {/* Regression and Relationships */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Linear Regressions: regplot vs. lmplot
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Seaborn draws linear regression lines automatically over scatter coordinates to check linear relationships:
              </p>
              <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
                <li><strong><code>sns.regplot()</code>:</strong> Fits and plots a linear regression model. Operates on individual axes objects.</li>
                <li><strong><code>sns.lmplot()</code>:</strong> Figure-level function that supports multi-faceted category row/column configurations.</li>
              </ul>
              <SyntaxHighlighter code={`# Simple regression fit\nsns.regplot(data=df, x='Price', y='Sales')\n\n# Multi-facet regression grid grouped by region\nsns.lmplot(data=df, x='Price', y='Sales', col='Region', hue='Product')`} />
            </div>

            {/* Pair & Joint Plots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Pair Plots & Joint Plots
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Quickly explore relationships across multiple variables in your datasets:
              </p>
              <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
                <li><strong><code>sns.pairplot()</code>:</strong> Scans the entire DataFrame, rendering pairwise relationship grids between all numerical columns.</li>
                <li><strong><code>sns.jointplot()</code>:</strong> Plots a bivariate scatter plot in the center, and marginal distribution plots along the top and right.</li>
              </ul>
              <SyntaxHighlighter code={`# Full dataframe scan\nsns.pairplot(data=df, hue='Category')\n\n# Joint relationship mapping\nsns.jointplot(data=df, x='Price', y='Sales', kind='reg')`} />
            </div>

            {/* Heatmaps & Correlation Matrix */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. Correlation Matrix Heatmaps (annot, cmap)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Heatmaps display correlations between variables using a color spectrum. First compute the matrix using Pandas <code>.corr()</code>, then draw it:
              </p>
              <SyntaxHighlighter code={`# Compute Pearson correlation values\ncorr_matrix = df[['Price', 'Sales', 'Profit', 'AdSpend']].corr()\n\n# Plot annotated matrix with warm/cool diverging palette\nsns.heatmap(corr_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)\n\n# Cluster Map introduction (groups similar variables)\nsns.clustermap(corr_matrix)`} />
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
        <Section eyebrow="Day 3 • AI Studio" title="AI Activity: Housing Dataset Relationships">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Sift Correlation Matrices</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a Seaborn script to visualize the correlation matrix of housing prices, sizes, and rooms using an annotated heatmap.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Select numerical columns: <code>['Price', 'SizeSqFt', 'RoomsCount']</code> and compute correlation matrix using <code>.corr()</code>.</li>
                <li>Call <code>sns.heatmap()</code>, setting <code>annot=True</code> and using the <code>cmap='coolwarm'</code> palette.</li>
                <li>Display the output using <code>plt.show()</code>.</li>
              </ol>
            </div>

            <SyntaxHighlighter code={`# Columns in df DataFrame:\n# ['Price', 'SizeSqFt', 'RoomsCount', 'NeighborhoodCategory']`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('relationships')}>
                ← Back to Theory
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 3 • Practical Lab" title="Correlation Sandbox">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Day 3 Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Solve the Housing correlation challenges on the left panel, and review compiler evaluation feedback in the logs window.
            </p>
            <SeabornAIPlayground dayId="day3" presets={day3Presets} challenges={day3Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('activity')}>
                ← Back to AI Activity
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Day 3 Assessment →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 3 • Evaluation" title="Day 3 Assessment Quiz">
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
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>🎉 Perfect score! You have mastered statistical relationships in Seaborn.</span>
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
              <button className="btn btn-primary" onClick={() => onNavigate('seaborn_day4', 'project_brief')}>
                Continue to Day 4 →
              </button>
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
