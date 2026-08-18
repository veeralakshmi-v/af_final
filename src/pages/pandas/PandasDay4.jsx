import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, Columns, Link
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

export default function PandasDay4({ activeTab, onNavigate, openAITutor }) {
  const day4Presets = [
    {
      name: 'sort_data',
      label: 'Sort Values',
      code: `import pandas as pd\n\ndata = {'Name': ['Alice', 'Bob', 'Charlie'], 'Score': [85, 95, 78]}\ndf = pd.DataFrame(data)\n# Sort by Score descending\nsorted_df = df.sort_values(by='Score', ascending=False)\nprint(sorted_df)`,
      output: `      Name  Score\n1      Bob     95\n0    Alice     85\n2  Charlie     78`
    },
    {
      name: 'groupby_sales',
      label: 'GroupBy City',
      code: `import pandas as pd\n\ndata = {'City': ['Mumbai', 'Delhi', 'Mumbai'], 'Sales': [100, 200, 150]}\ndf = pd.DataFrame(data)\ntotal_sales = df.groupby('City')['Sales'].sum()\nprint(total_sales)`,
      output: `City\nDelhi     200\nMumbai    250\nName: Sales, dtype: int64`
    }
  ];

  const day4Challenges = [
    {
      id: 'ch4_groupby',
      title: 'Group Salaries by Dept',
      desc: 'Group the DataFrame df by the column "Department" and find the average of the "Salary" column.',
      hint: 'Use df.groupby("Department")["Salary"].mean().',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import pandas as pd

# Sales transactions dataset
data = {
    'City': ['Mumbai', 'Delhi', 'Mumbai', 'Delhi', 'Bangalore', 'Bangalore'],
    'Sales': [15000, 22000, 18000, 12000, 30000, 25000]
}
df = pd.DataFrame(data)

# Calculate total sales by city using groupby
city_sales = df.groupby('City')['Sales'].sum()

print(city_sales)`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Compiling aggregate nodes...\n');
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import pandas as pd') || aiActivityCode.includes('import pandas');
      const hasGroupBy = aiActivityCode.includes("groupby('City')") || aiActivityCode.includes('groupby("City")');
      const hasSum = aiActivityCode.includes('.sum()');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "pandas"\nInclude: import pandas as pd.');
        return;
      }
      if (!hasGroupBy) {
        setAiActivityConsole(p => p + 'DataValidationError: GroupBy operation must segment by column key "City".\nHint: Use df.groupby("City").');
        return;
      }
      if (!hasSum) {
        setAiActivityConsole(p => p + 'DataValidationError: Sum aggregation calculation missing.\nHint: Use df.groupby("City")["Sales"].sum().');
        return;
      }

      setAiActivityConsole(
        `>>> Ingestion aggregate successful!\n\nSales totals by City:\nCity\nBangalore    55000\nDelhi        34000\nMumbai       33000\nName: Sales, dtype: int64\n\n✅ AI Validation: Sales by City analysis executed perfectly!`
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
      q: 'Which code sorts a DataFrame by column "Sales" in descending order?',
      opts: [
        "df.sort_values(by='Sales')",
        "df.sort_values(by='Sales', ascending=False)",
        "df.sort_index(ascending=False)",
        "df.sort('Sales', reverse=True)"
      ],
      ans: 1,
      exp: '`df.sort_values(by="Sales", ascending=False)` sorts values by column key in descending order.'
    },
    {
      id: 'q2',
      q: 'What is the function of value_counts()?',
      opts: [
        'Counts unique values in a column',
        'Finds the sum of a column',
        'Groups values by index keys',
        'Calculates standard deviation'
      ],
      ans: 0,
      exp: '`.value_counts()` returns a frequency count of unique elements in a Series.'
    },
    {
      id: 'q3',
      q: 'How do unique() and nunique() differ?',
      opts: [
        'unique returns list of unique values; nunique returns number of unique values.',
        'unique returns number of values; nunique returns list.',
        'They do the same thing.',
        'unique works on columns; nunique works on rows.'
      ],
      ans: 0,
      exp: '`.unique()` returns an array of unique values; `.nunique()` returns the integer count of those unique elements.'
    },
    {
      id: 'q4',
      q: 'How do you concatenate two DataFrames df1 and df2 column-wise (horizontally)?',
      opts: [
        'pd.concat([df1, df2])',
        'pd.concat([df1, df2], axis=1)',
        'pd.merge(df1, df2)',
        'df1.append(df2)'
      ],
      ans: 1,
      exp: '`axis=1` tells the concat function to align elements along columns horizontally.'
    },
    {
      id: 'q5',
      q: 'Which function is used to join on indices rather than specific columns?',
      opts: ['pd.merge()', 'df.join()', 'pd.concat()', 'df.combine()'],
      ans: 1,
      exp: '`df.join()` is a convenient method for combining the columns of two index-aligned DataFrames.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'sorting' && (
        <Section eyebrow="Day 4 • Sorting" title="Sorting DataFrames & Value Frequencies">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Sorting Values: sort_values()</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Sort rows by one or more column values in ascending (default) or descending order:
            </p>
            <SyntaxHighlighter code={`# Sort by Sales ascending\ndf_sorted = df.sort_values(by='Sales')\n\n# Sort by multiple columns, Sales descending, Age ascending\ndf_sorted = df.sort_values(by=['Sales', 'Age'], ascending=[False, True])`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Sorting Index: sort_index()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Sort a DataFrame by its row index labels:
            </p>
            <SyntaxHighlighter code={`df_sorted_index = df.sort_index(ascending=True)`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Frequency Counts & Uniques</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code>df['Category'].value_counts()</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns count of occurrences for each category.</p>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code>df['Category'].unique()</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns array of unique categories.</p>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code>df['Category'].nunique()</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns count of unique categories.</p>
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('groupby')}>
                Continue to GroupBy & Aggregations →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'groupby' && (
        <Section eyebrow="Day 4 • Aggregations" title="Grouping & Statistical Summary Operations">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. The GroupBy workflow</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Use GroupBy to partition elements into buckets, perform mathematical summaries, and combine them back into a single table.
            </p>
            <SyntaxHighlighter code={`# Calculate average salary by department\ndept_means = df.groupby('Department')['Salary'].mean()`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Multiple Aggregations</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Perform multiple calculations simultaneously using the `.agg()` method:
            </p>
            <SyntaxHighlighter code={`# Compute min, max, and mean of salaries\nsummary = df.groupby('Department')['Salary'].agg(['min', 'max', 'mean'])`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('sorting')}>
                ← Back to Sorting
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('combining')}>
                Continue to Combining Data →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'combining' && (
        <Section eyebrow="Day 4 • Combining Data" title="Concat, Merge & Join Operations">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Concatenating: concat()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Append rows or columns together along a given axis:
            </p>
            <SyntaxHighlighter code={`# Stack rows (default axis=0)\npd.concat([df1, df2])\n\n# Stack columns side-by-side\npd.concat([df1, df2], axis=1)`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Database Joins: merge()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Combine datasets based on common key columns (supports inner, outer, left, right):
            </p>
            <SyntaxHighlighter code={`# Inner join on 'ID'\npd.merge(df1, df2, on='ID', how='inner')`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Index Alignment: join()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Join DataFrames using index positions rather than columns:
            </p>
            <SyntaxHighlighter code={`# Join columns of other DataFrame along indices\ndf1.join(df2)`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('groupby')}>
                ← Back to GroupBy
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 4 • AI Studio" title="AI Activity: Analyze Sales by City">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Calculate Category Aggregates</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a grouping query to calculate the total sum of sales for each city.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Group the sales records <code>df</code> by column <code>City</code>.</li>
                <li>Extract the column <code>Sales</code> and compute its sum using <code>.sum()</code>.</li>
                <li>Store result in <code>city_sales</code> and print.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  sales_analysis.py
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
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Total Sales successfully grouped and aggregated per City.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('combining')}>
                ← Back to Combining
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 4 • Practical Lab" title="Grouping & Aggregations Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct pandas groupby and sorting syntax.
            </p>
            <PandasAIPlayground dayId="day4" presets={day4Presets} challenges={day4Challenges} />

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
                Analyze store sales data by merging product category lookup sheets with transactions. Group by region and category, compute sales sums, and sort products in descending order of performance.
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
