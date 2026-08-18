import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, RefreshCw, Trash2
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

export default function PandasDay3({ activeTab, onNavigate, openAITutor }) {
  const day3Presets = [
    {
      name: 'drop_na',
      label: 'Drop Missing Rows',
      code: `import pandas as pd\n\n# Drop rows containing NaN values\ndata = {'Val': [10.0, None, 30.0]}\ndf = pd.DataFrame(data)\ndf_clean = df.dropna()\nprint(df_clean)`,
      output: `    Val\n0  10.0\n2  30.0`
    },
    {
      name: 'fill_na',
      label: 'Fill NaN Values',
      code: `import pandas as pd\n\n# Fill NaN values with constant\ndata = {'Val': [1.0, None, 3.0]}\ndf = pd.DataFrame(data)\ndf_filled = df.fillna(0)\nprint(df_filled)`,
      output: `   Val\n0  1.0\n1  0.0\n2  3.0`
    }
  ];

  const day3Challenges = [
    {
      id: 'ch3_dropna',
      title: 'Purge Missing Records',
      desc: 'Given a DataFrame df with null values, drop rows containing missing numbers.',
      hint: 'Use df.dropna().',
    },
    {
      id: 'ch3_fillna',
      title: 'Fill NaN Values with Zero',
      desc: 'Use fillna to replace missing cells with 0.',
      hint: 'Use df.fillna(0).',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import pandas as pd

# Messy employee dataset
data = {
    'Name': [' amit', 'Neha ', 'Vijay', 'Neha '],
    'Salary': [75000, None, 85000, 75000],
    'Joining': ['2023-01-15', '2022-05-10', '2021-11-20', '2022-05-10']
}
df = pd.DataFrame(data)

# 1. Strip whitespace from Names
df['Name'] = df['Name'].str.strip()

# 2. Fill missing Salary with 0
df['Salary'] = df['Salary'].fillna(0)

# 3. Drop duplicate rows
df = df.drop_duplicates()

print(df)`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Instantiating Data Cleaning Pipeline...\n');
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import pandas as pd') || aiActivityCode.includes('import pandas');
      const hasStrip = aiActivityCode.includes('.str.strip()');
      const hasFill = aiActivityCode.includes('fillna(') || aiActivityCode.includes('dropna(');
      const hasDuplicates = aiActivityCode.includes('drop_duplicates(') || aiActivityCode.includes('drop_duplicates()');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "pandas"\nInclude: import pandas as pd.');
        return;
      }
      if (!hasStrip) {
        setAiActivityConsole(p => p + 'DataValidationError: Leading/trailing whitespace still detected in "Name" column.\nHint: Use df["Name"] = df["Name"].str.strip().');
        return;
      }
      if (!hasFill) {
        setAiActivityConsole(p => p + 'DataValidationError: Null values still detected in "Salary" column.\nHint: Use df["Salary"] = df["Salary"].fillna(0).');
        return;
      }
      if (!hasDuplicates) {
        setAiActivityConsole(p => p + 'DataValidationError: Duplicate row records still present.\nHint: Use df = df.drop_duplicates().');
        return;
      }

      setAiActivityConsole(
        `>>> Cleaning complete!\n\nProcessed DataFrame:\n     Name   Salary     Joining\n0    amit  75000.0  2023-01-15\n1    Neha      0.0  2022-05-10\n2   Vijay  85000.0  2021-11-20\n\n✅ AI Validation: Employee dataset successfully scrubbed and deduplicated!`
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
      q: 'Which Pandas method checks for non-null elements, returning a boolean table?',
      opts: ['isnull()', 'notnull()', 'fillna()', 'dropna()'],
      ans: 1,
      exp: '`notnull()` checks for non-missing elements (returns True if value is present, False if NaN).'
    },
    {
      id: 'q2',
      q: 'What does df.rename(columns={"old": "new"}) do?',
      opts: [
        'Changes column headings',
        'Changes row indices name',
        'Casts column data types',
        'Replaces cell values'
      ],
      ans: 0,
      exp: 'The `rename(columns={...})` method maps old column names to new names via dictionary key-values.'
    },
    {
      id: 'q3',
      q: 'How do you cast column "Salary" from float64 to int64?',
      opts: [
        "df['Salary'].astype('int64')",
        "df['Salary'].cast('int64')",
        "df['Salary'].convert('int64')",
        "pd.to_integer(df['Salary'])"
      ],
      ans: 0,
      exp: '`astype()` is the standard Pandas method for changing column data types.'
    },
    {
      id: 'q4',
      q: 'Which method identifies duplicate rows without dropping them?',
      opts: ['duplicated()', 'drop_duplicates()', 'is_duplicate()', 'check_duplicates()'],
      ans: 0,
      exp: '`df.duplicated()` returns a boolean Series marking duplicate rows. `drop_duplicates()` actually purges them.'
    },
    {
      id: 'q5',
      q: 'How do you convert a string column to lowercase in Pandas?',
      opts: [
        "df['Col'].lower()",
        "df['Col'].str.lower()",
        "df['Col'].str.tolower()",
        "pd.to_lower(df['Col'])"
      ],
      ans: 1,
      exp: 'Pandas uses the `.str` accessor to expose string operations like `.str.lower()`, `.str.upper()`, and `.str.strip()` on columns.'
    },
    {
      id: 'q6',
      q: 'Which function converts a column containing date strings to datetime objects?',
      opts: ['pd.to_datetime()', 'df.to_date()', 'astype("datetime")', 'pd.parse_date()'],
      ans: 0,
      exp: '`pd.to_datetime()` converts strings (e.g., "2023-01-15") into actual timestamp datetime objects for date calculations.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'missing' && (
        <Section eyebrow="Day 3 • Missing Values" title="Identifying & Resolving Null Records">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Detection Methods</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Missing data in Pandas is marked by <code>NaN</code> (Not a Number) or <code>None</code>. You check for their presence using detection functions:
            </p>

            <ul style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
              <li><strong><code>df.isnull()</code> / <code>df.isna()</code>:</strong> Returns a boolean table where cell values are <code>True</code> if missing, <code>False</code> if present.</li>
              <li><strong><code>df.notnull()</code> / <code>df.notna()</code>:</strong> Inverse check; returns <code>True</code> if elements are present.</li>
              <li><strong><code>df.isnull().sum()</code>:</strong> Sums up the count of missing elements per column.</li>
            </ul>

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Remediation: dropna() vs. fillna()</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: '#fee2e2', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                <strong style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Trash2 size={18} /> Purge Rows: dropna()
                </strong>
                <p style={{ color: '#991b1b', fontSize: '0.88rem', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                  Deletes rows containing null cells. Best when missing row counts are small relative to dataset size.
                </p>
                <SyntaxHighlighter code={`# Delete rows with NaN\ndf_clean = df.dropna()`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                <strong style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <RefreshCw size={18} /> Impute Values: fillna()
                </strong>
                <p style={{ color: '#065f46', fontSize: '0.88rem', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                  Fills missing cells with constants (like 0) or aggregations (like column mean average).
                </p>
                <SyntaxHighlighter code={`# Impute NaNs with mean\nmean_val = df['Score'].mean()\ndf['Score'] = df['Score'].fillna(mean_val)`} />
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('replacing')}>
                Continue to Replacing & Renaming →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'replacing' && (
        <Section eyebrow="Day 3 • Preprocessing" title="Replacing Values, Renaming Columns & Basics">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Value Replacement: replace()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Replace specific cell contents using dictionaries:
            </p>
            <SyntaxHighlighter code={`# Replace values in column\ndf['Status'] = df['Status'].replace({'Yes': 1, 'No': 0})`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Renaming Headers: rename()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Modify column heading labels by mapping keys:
            </p>
            <SyntaxHighlighter code={`# Rename multiple columns\ndf = df.rename(columns={'student_name': 'Name', 'math_score': 'Maths'})`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>3. String accessors & Date basics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong>String Operations</strong>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 10px 0' }}>Clean text records using <code>.str</code>.</p>
                <SyntaxHighlighter code={`# Strip spaces and convert to lower\ndf['Name'] = df['Name'].str.strip().str.lower()`} />
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong>Date & Time Ingestion</strong>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 10px 0' }}>Convert string representations to timestamp structures.</p>
                <SyntaxHighlighter code={`# Cast string date to Datetime object\ndf['Joining'] = pd.to_datetime(df['Joining'])`} />
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('missing')}>
                ← Back to Missing Values
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('duplicates')}>
                Continue to Duplicates & Types →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'duplicates' && (
        <Section eyebrow="Day 3 • Preprocessing" title="Handling Duplicates & Casting Types">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Removing Duplicate Rows</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
              Duplicated records are common in database exports. Flags are queried via <code>duplicated()</code> and purged via <code>drop_duplicates()</code>:
            </p>
            <SyntaxHighlighter code={`# Find duplicate rows\nduplicates = df.duplicated()\n\n# Drop duplicates, keeping the first occurrence\ndf = df.drop_duplicates()`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Data Type Conversion: astype()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Cast data types of columns (e.g. converting float metrics to integers or integers to strings):
            </p>
            <SyntaxHighlighter code={`# Cast column values to integer\ndf['Salary'] = df['Salary'].astype('int64')`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('replacing')}>
                ← Back to Replacing
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 3 • AI Studio" title="AI Activity: Clean Messy Employee Dataset">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Scrub Employee records</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              In this activity, you will execute operations to strip whitespaces, impute missing values, and drop duplicate rows from a sample employee database.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Strip leading and trailing whitespaces from the <code>Name</code> column using <code>.str.strip()</code>.</li>
                <li>Fill missing salary values in column <code>Salary</code> with 0.</li>
                <li>Purge duplicate records using <code>.drop_duplicates()</code>.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  clean_employees.py
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
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>All columns stripped, duplicates dropped, and salaries filled.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('duplicates')}>
                ← Back to Duplicates
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 3 • Practical Lab" title="Data Cleaning Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct pandas loading, selection, and filtering syntax.
            </p>
            <PandasAIPlayground dayId="day3" presets={day3Presets} challenges={day3Challenges} />

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
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', display: 'block' }}>{score} / 6</span>
                  <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    {score === 6 ? '🏆 Outstanding! Perfect score!' : score >= 3 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
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
                Write a python script that loads a dirty employee dataset with duplicate names, strips whitespaces, replaces null salaries with the column median, and drops duplicates.
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
