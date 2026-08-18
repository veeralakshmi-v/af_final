import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, BarChart2, Table
} from 'lucide-react';
import PandasAIPlayground from '../../components/PandasAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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

export default function PandasDay5({ activeTab, onNavigate, openAITutor }) {
  const day5Presets = [
    {
      name: 'pivot_table',
      label: 'Pivot Table',
      code: `import pandas as pd\n\ndata = {\n    'Dept': ['IT', 'HR', 'IT', 'HR'],\n    'Gender': ['M', 'F', 'F', 'M'],\n    'Salary': [80000, 45000, 85000, 50000]\n}\ndf = pd.DataFrame(data)\npivot = df.pivot_table(values='Salary', index='Dept', columns='Gender', aggfunc='mean')\nprint(pivot)`,
      output: `Gender      F      M\nDept\nHR      45000  50000\nIT      85000  80000`
    },
    {
      name: 'plot_bar',
      label: 'Plot Bar Chart',
      code: `import pandas as pd\n\ndata = {'Revenue': [120, 180, 250]}\ndf = pd.DataFrame(data, index=['2021', '2022', '2023'])\ndf.plot(kind='bar')\nprint("Plot generated successfully!")`,
      output: `🎉 Chart successfully generated!\nBar plot rendered for index timeline.`
    }
  ];

  const day5Challenges = [
    {
      id: 'ch5_pivot_table',
      title: '1. Create Pivot Table',
      desc: 'Create a pivot table index="Dept", columns="Gender", values="Salary" averaging salaries.',
      hint: 'Use df.pivot_table(values="Salary", index="Dept", columns="Gender", aggfunc="mean").',
    },
    {
      id: 'ch5_plot_bar',
      title: '2. Bar Plotting',
      desc: 'Plot a bar chart of the DataFrame df using the kind="bar" parameter.',
      hint: 'Use df.plot(kind="bar").',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import pandas as pd

# Company sales dataset
data = {
    'Department': ['Electronics', 'Clothing', 'Electronics', 'Clothing'],
    'Sales': [45000, 32000, 58000, 41000],
    'Region': ['East', 'East', 'West', 'West']
}
df = pd.DataFrame(data)

# Create a pivot table analyzing Sales by Department (rows) and Region (columns)
pivot_sales = df.pivot_table(values='Sales', index='Department', columns='Region', aggfunc='sum')

print(pivot_sales)`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day5', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Building multi-dimensional cross tables...\n');
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import pandas as pd') || aiActivityCode.includes('import pandas');
      const hasPivot = aiActivityCode.includes('pivot_table(');
      const hasArgs = aiActivityCode.includes('values=') && aiActivityCode.includes('index=') && aiActivityCode.includes('columns=');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "pandas"\nInclude: import pandas as pd.');
        return;
      }
      if (!hasPivot) {
        setAiActivityConsole(p => p + 'DataValidationError: Pivot table creation function call missing.\nHint: Use df.pivot_table().');
        return;
      }
      if (!hasArgs) {
        setAiActivityConsole(p => p + 'DataValidationError: Pivot table arguments mismatch.\nHint: Specify values="Sales", index="Department", columns="Region".');
        return;
      }

      setAiActivityConsole(
        `>>> Pivot computation successful!\n\nSales pivot grid:\nRegion         East   West\nDepartment                \nClothing      32000  41000\nElectronics   45000  58000\n\n✅ AI Validation: Pivot table of company sales structured perfectly!`
      );
      setAiActivityPassed(true);
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
      q: 'Which Pandas method calculates the correlation matrix for all numeric columns?',
      opts: ['df.corr()', 'df.correlation()', 'df.cov()', 'df.covar()'],
      ans: 0,
      exp: '`df.corr()` computes element-wise Pearson correlation coefficients between numeric columns.'
    },
    {
      id: 'q2',
      q: 'What is the key difference between apply() and applymap()?',
      opts: [
        'apply works element-wise; applymap works column-wise.',
        'apply runs column-wise/row-wise; applymap runs element-wise across the entire DataFrame.',
        'They are identical.',
        'apply only works on strings; applymap works on numbers.'
      ],
      ans: 1,
      exp: '`apply()` is used to run functions along axis boundaries (rows/columns), while `applymap()` applies functions element-wise to every single cell.'
    },
    {
      id: 'q3',
      q: 'Which method creates a frequency cross-tabulation table of two factors?',
      opts: ['pd.pivot()', 'pd.crosstab()', 'pd.groupby()', 'df.join()'],
      ans: 1,
      exp: '`pd.crosstab(index, columns)` computes a simple frequency distribution table of two or more columns.'
    },
    {
      id: 'q4',
      q: 'What is the default plot type rendered when calling df.plot()?',
      opts: ['Bar Chart', 'Line Chart', 'Histogram', 'Scatter Plot'],
      ans: 1,
      exp: 'Calling `df.plot()` defaults to `kind="line"`.'
    },
    {
      id: 'q5',
      q: 'How do you export a DataFrame to a CSV file in Pandas?',
      opts: ['df.write_csv()', 'df.to_csv()', 'pd.save_csv()', 'df.export_csv()'],
      ans: 1,
      exp: '`df.to_csv("filename.csv", index=False)` writes the DataFrame contents to a CSV file.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'analysis' && (
        <Section eyebrow="Day 5 • Analytics" title="Descriptive Analysis, Correlations & Mapping">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Summary Metrics & Correlation</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Inspect general statistical summaries using descriptive tools:
            </p>
            <SyntaxHighlighter code={`# Quick statistical stats\nstats = df.describe()\n\n# Compute correlation coefficient matrix\ncorr_matrix = df.corr(numeric_only=True)`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Mapping Operations & Lambdas</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
              Use custom mapping handlers to process column contents:
            </p>
            <SyntaxHighlighter code={`# map() - lookup replacement on a Series\ndf['Status_Code'] = df['Status'].map({'Pending': 0, 'Approved': 1})\n\n# apply() - run functions column-wise or row-wise\ndf['Double_Sales'] = df['Sales'].apply(lambda x: x * 2)\n\n# applymap() - run functions element-wise across the entire DataFrame\ndf_scaled = df.applymap(lambda x: x / 10 if isinstance(x, (int, float)) else x)`} />

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('pivoting')}>
                Continue to Pivot Tables →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'pivoting' && (
        <Section eyebrow="Day 5 • Pivoting" title="Pivot Tables & Crosstabs">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Pivot Tables: pivot_table()</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              A pivot table reshapes data by grouping columns, letting you aggregate cells based on index rows and columns headers.
            </p>
            <SyntaxHighlighter code={`# Create average sales pivot grid\npivot_grid = df.pivot_table(values='Sales', index='Category', columns='Region', aggfunc='mean')`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Frequency distributions: crosstab()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              <code>pd.crosstab()</code> is a helper that returns frequency counts of categories occurrences:
            </p>
            <SyntaxHighlighter code={`# Count occurrences of regions categories per department\nfreq_grid = pd.crosstab(df['Department'], df['Region'])`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('analysis')}>
                ← Back to Analysis
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('plotting')}>
                Continue to Plotting & Export →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'plotting' && (
        <Section eyebrow="Day 5 • Visuals" title="Pandas Built-in Plotting & File Exports">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Pandas plot() API</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
              Use <code>df.plot()</code> to output charts. Save Matplotlib, Seaborn, and Plotly codes for their dedicated courses.
            </p>
            <SyntaxHighlighter code={`# Line Chart\ndf['Sales'].plot(kind='line')\n\n# Bar Chart\ndf.plot(kind='bar', x='Year', y='Sales')\n\n# Pie Chart\ndf['Share'].plot(kind='pie')\n\n# Histogram\ndf['Age'].plot(kind='hist', bins=5)\n\n# Box Plot\ndf['Salary'].plot(kind='box')`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Exporting Results</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Write tables back to disk using file export writers:
            </p>
            <SyntaxHighlighter code={`# Export to CSV (suppress default index column)\ndf.to_csv('summary_report.csv', index=False)\n\n# Export to Excel sheet\ndf.to_excel('summary_report.xlsx', sheet_name='Summary')`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('pivoting')}>
                ← Back to Pivoting
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 5 • AI Studio" title="AI Activity: Analyze Company Sales Data">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Pivot Sales transactions</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Group the company sales records by department and region to generate a sum table using pivot operations.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Call <code>df.pivot_table()</code> on the company sales DataFrame.</li>
                <li>Set row rows index parameter to <code>'Department'</code>, columns headers to <code>'Region'</code>, and target values to <code>'Sales'</code>.</li>
                <li>Set the aggregation function <code>aggfunc</code> to <code>'sum'</code>, print, and compile.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  sales_pivoting.py
                </div>
                <textarea
                  value={aiActivityCode}
                  onChange={(e) => setAiActivityCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#e2e8f0',
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
                  <button onClick={handleRunAIActivity} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Validate Code
                  </button>
                </div>
              </div>

              {/* Console output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiActivityConsole || 'Console compiler idle... Click Validate Code to execute.'}
                </div>

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Company Sales pivot table completed successfully!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('plotting')}>
                ← Back to Plotting
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 5 • Practical Lab" title="Analysis & Plotting Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct pandas pivot table and df.plot() plotting syntax.
            </p>
            <PandasAIPlayground dayId="day5" presets={day5Presets} challenges={day5Challenges} />

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
        <Section eyebrow="Day 5 • Evaluation" title="Day 5 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Test Your Understanding</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
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
                        btnStyle.background = '#eff6ff';
                        btnStyle.borderColor = '#3b82f6';
                        btnStyle.color = '#1d4ed8';
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
                      <Sparkles size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Tutor Explanation:</strong> {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#14532d' }}>Submit Your Assessment</h3>
              <p style={{ color: '#166534', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore}>
                Calculate Grading Score
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', display: 'block' }}>{score} / 5</span>
                  <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    {score === 5 ? '🏆 Outstanding! Perfect score!' : score >= 3 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
                  </span>
                </div>
              )}
            </div>

            {/* Homework Assignment */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px dashed #64748b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                <FileText size={20} color="#3b82f6" /> 📝 Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Write a python script that loads your regional sales transaction dataset. Create a pivot table summarizing average revenue by product line across quarters, plot a horizontal bar chart of the result, and export the summary to Excel.
              </p>
            </div>

            {/* Lesson Rating */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
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
