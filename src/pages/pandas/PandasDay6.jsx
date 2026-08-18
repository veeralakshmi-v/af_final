import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, Trophy, Bot, Award
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

export default function PandasDay6({ activeTab, onNavigate, openAITutor }) {
  const day6Presets = [
    {
      name: 'groupby_scores',
      label: 'Sort Average Scores',
      code: `import pandas as pd\n\ndata = {\n    'Student': ['Raj', 'Simran', 'Amit', 'Neha', 'Vijay', 'Pooja'],\n    'Score': [75, 92, 68, 95, 82, 79]\n}\ndf = pd.DataFrame(data)\ntop_students = df.groupby('Student')['Score'].mean().sort_values(ascending=False)\nprint(top_students)`,
      output: `Student\nNeha       95.0\nSimran     92.0\nVijay      82.0\nPooja      79.0\nRaj        75.0\nAmit       68.0\nName: Score, dtype: float64`
    }
  ];

  const day6Challenges = [
    {
      id: 'ch6_top_students',
      title: 'Group and Sort Top Students',
      desc: 'Find the top-performing students by grouping by Student and calculating mean Score sorted descending.',
      hint: 'Use df.groupby("Student")["Score"].mean().sort_values(ascending=False).',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Challenge prompt state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiCode, setAiCode] = useState(
`import pandas as pd

# Student scores dataset
data = {
    'Student': ['Raj', 'Simran', 'Amit', 'Neha', 'Vijay', 'Pooja'],
    'Score': [75, 92, 68, 95, 82, 79]
}
df = pd.DataFrame(data)

# Compute top-performing students using Pandas
top_students = df.groupby('Student')['Score'].mean().sort_values(ascending=False)

print(top_students)`
  );
  const [aiCodeConsole, setAiCodeConsole] = useState('');
  const [aiCodePassed, setAiCodePassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day6', nextTabId);
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

  const handleAskAI = () => {
    if (!aiPrompt.trim()) return;
    setAiResponse('🤖 AI is scanning data records...\n');
    setTimeout(() => {
      if (aiPrompt.toLowerCase().includes('top-performing') || aiPrompt.toLowerCase().includes('perform') || aiPrompt.toLowerCase().includes('top')) {
        setAiResponse(
          `🤖 AI Analyst Response:\n\nBased on my analysis of the provided dataset of 6 students, the top three performers are:\n1. Neha (Score: 95)\n2. Simran (Score: 92)\n3. Vijay (Score: 82)\n\nNow, implement your Pandas code on the left to verify if your mathematical results match mine!`
        );
      } else {
        setAiResponse(
          `🤖 AI Analyst Response:\n\nI can help you analyze student performance. Try asking: "Analyze this dataset and tell me the top-performing students."`
        );
      }
    }, 600);
  };

  const handleRunAiCode = () => {
    setAiCodeConsole('>>> Executing analytical queries...\n');
    setTimeout(() => {
      const hasGroupBy = aiCode.includes('groupby(');
      const hasSort = aiCode.includes('sort_values(') && aiCode.includes('ascending=False');

      if (!hasGroupBy || !hasSort) {
        setAiCodeConsole(p => p + 'DataValidationError: Verify you are grouping by "Student" and sorting by average Score in descending order.');
        return;
      }

      setAiCodeConsole(
        `>>> Processing complete!\n\nPandas Output:\nStudent\nNeha     95.0\nSimran   92.0\nVijay    82.0\nName: Score, dtype: float64\n\n🎉 Verification Match: Your Pandas results match the AI Analyst conclusions exactly! Both models identify Neha, Simran, and Vijay as top students.`
      );
      setAiCodePassed(true);
    }, 600);
  };

  const quizQuestions = [
    {
      id: 'q1',
      q: 'Which Pandas workflow is most effective for loading a CSV file, dropping nulls, and saving reports?',
      opts: [
        'pd.read_csv() -> df.dropna() -> df.to_csv()',
        'pd.to_csv() -> df.isnull() -> pd.read_csv()',
        'df.dropna() -> pd.read_csv() -> df.to_excel()',
        'pd.read_excel() -> df.fillna() -> pd.read_json()'
      ],
      ans: 0,
      exp: '`read_csv()` ingests the data, `dropna()` purges nulls, and `to_csv()` saves the resulting records back to disk.'
    },
    {
      id: 'q2',
      q: 'How do you check for duplicate rows in a DataFrame before removing them?',
      opts: ['df.check_duplicates()', 'df.duplicated()', 'df.drop_duplicates()', 'df.unique()'],
      ans: 1,
      exp: '`.duplicated()` checks and flags duplicated rows; `.drop_duplicates()` deletes them.'
    },
    {
      id: 'q3',
      q: 'What is the correct syntax to calculate the mean score grouped by Student and sorted descending?',
      opts: [
        "df.groupby('Student')['Score'].mean().sort_values(ascending=False)",
        "df.sort_values('Score').groupby('Student').mean()",
        "df.groupby('Score')['Student'].mean().sort_index()",
        "df.groupby('Student').mean().sort_values(ascending=True)"
      ],
      ans: 0,
      exp: 'You group by `Student`, isolate column `Score`, calculate the `.mean()`, and finally chain `.sort_values(ascending=False)`.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'project_brief' && (
        <Section eyebrow="Day 6 • Capstone Project" title="Student Performance Analytics Dashboard">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Dashboard Objectives</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Welcome to your final course project! In this mini project, you will build a comprehensive Student Performance Analytics Dashboard. You will pull together all the Pandas skills learned over the past 6 days to analyze and report on school records.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                <strong style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Database size={18} /> Core Pipeline Checklist
                </strong>
                <ul style={{ color: '#065f46', fontSize: '0.88rem', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                  <li>Import data using Pandas file readers</li>
                  <li>Explore shapes, column types, and descriptions</li>
                  <li>Clean NaN values using fillna/dropna</li>
                  <li>Filter out students with low score marks</li>
                  <li>Group and aggregate class statistics</li>
                </ul>
              </div>

              <div style={{ padding: '1.2rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Award size={18} /> Reporting & Export Checklist
                </strong>
                <ul style={{ color: '#1e40af', fontSize: '0.88rem', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                  <li>Merge student records with department details</li>
                  <li>Sort tables in descending order of grades</li>
                  <li>Graph averages using df.plot(kind='bar')</li>
                  <li>Export cleaned tables to a final CSV report</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_challenge')}>
                Continue to AI Challenge →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'ai_challenge' && (
        <Section eyebrow="Day 6 • AI Challenge" title="AI Analyst vs. Pandas Verification">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Compare Insights with AI</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
              Ask the AI Analyst below to analyze the dataset and return the top performers. Then write your own Pandas grouping and sorting commands to verify the results.
            </p>

            {/* Prompt Box */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder='Ask AI: "Analyze this dataset and tell me the top-performing students"'
                  style={{ flex: 1, padding: '0.6rem 1rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
                <button onClick={handleAskAI} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Ask AI
                </button>
              </div>
              {aiResponse && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '8px', fontSize: '0.88rem', color: '#166534', whiteSpace: 'pre-wrap', display: 'flex', gap: '8px' }}>
                  <Bot size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>{aiResponse}</div>
                </div>
              )}
            </div>

            {/* Validation Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  pandas_verification.py
                </div>
                <textarea
                  value={aiCode}
                  onChange={(e) => setAiCode(e.target.value)}
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
                  <button onClick={handleRunAiCode} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Run Pandas
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiCodeConsole || 'Pandas terminal idle... Click Run Pandas to check.'}
                </div>

                {aiCodePassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Insights Verified!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>You have successfully compiled Pandas grouping queries to match AI conclusions.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('project_brief')}>
                ← Back to Project Brief
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 6 • Practical Lab" title="Dashboard Project Coding Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct pandas groupby and sorting syntax.
            </p>
            <PandasAIPlayground dayId="day6" presets={day6Presets} challenges={day6Challenges} />

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
        <Section eyebrow="Day 6 • Final Evaluation" title="Pandas Course Final Assessment">
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
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', display: 'block' }}>{score} / 3</span>
                  <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    {score === 3 ? '🏆 Outstanding! Perfect score!' : score >= 2 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
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
                Write a python script to run a full analysis on a class gradebook sheet. Perform cleaning, merge it with an student enrollment lookup, find the department-wide GPA average, and plot a vertical bar chart. Save your final cleaned DataFrame to Excel.
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
