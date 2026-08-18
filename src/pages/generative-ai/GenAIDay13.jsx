import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Table, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, Database, Code, Clipboard 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'use_cases', label: '📊 Spreadsheet Use Cases' },
  { id: 'sandbox', label: '💻 AI Formula Generator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'How does Generative AI help with spreadsheet operations?',
    opts: [
      'By translating natural language goals into precise Excel or Google Sheets formulas and macros.',
      'By physically entering the rows for you.',
      'By formatting page layout styles automatically.'
    ],
    ans: 0
  },
  {
    q: 'What is the purpose of the VLOOKUP or XLOOKUP function?',
    opts: [
      'To search for a value in a column and return a matching value from another column in the same row.',
      'To add up numbers in a range.',
      'To delete duplicate rows.'
    ],
    ans: 0
  },
  {
    q: 'Why should you verify AI-generated spreadsheet formulas before running them on large sheets?',
    opts: [
      'To prevent calculation errors, broken references, or circular dependencies in your database.',
      'Because AI formulas make files too large.',
      'Because they bypass internet security checks.'
    ],
    ans: 0
  },
  {
    q: 'What does a "Pivot Table" do in spreadsheet analysis?',
    opts: [
      'Summarizes and groups large datasets to quickly draw comparisons, patterns, and trends.',
      'Sorts values alphabetically.',
      'Connects your sheet to a Slack channel.'
    ],
    ans: 0
  },
  {
    q: 'How can you use AI to research information directly from a sheet?',
    opts: [
      'By writing prompts requesting target summaries, statistical values, or outline templates based on your text cells.',
      'By turning off the local computer network.',
      'By converting CSV files into images.'
    ],
    ans: 0
  }
];

export default function GenAIDay13({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [userPrompt, setUserPrompt] = useState('Calculate average sales of column C if region in column D is West');
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [compiledFormula, setCompiledFormula] = useState('');
  const [explanation, setExplanation] = useState('');

  // Forms and quiz states
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const generateFormula = () => {
    setIsRunning(true);
    setSimLogs([]);
    setCompiledFormula('');
    setExplanation('');

    const steps = [
      `🧠 Parsing natural language request...`,
      `🔍 Identifying target ranges and conditionals...`,
      `⚙️ Generating Excel/Google Sheets formula syntax...`,
      `✅ Validation checks passed.`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            const query = userPrompt.toLowerCase();
            let formula = '=AVERAGE(C:C)';
            let desc = 'Calculates the overall average value of cells in Column C.';

            if (query.includes('average') && query.includes('west')) {
              formula = `=AVERAGEIF(D:D, "West", C:C)`;
              desc = 'Checks Column D for the string "West", and returns the average of corresponding rows in Column C.';
            } else if (query.includes('sum') && query.includes('paid')) {
              formula = `=SUMIF(B:B, "Paid", A:A)`;
              desc = 'Checks Column B for "Paid" and sums corresponding values in Column A.';
            } else if (query.includes('vlookup') || query.includes('find')) {
              formula = `=XLOOKUP(A2, Sheet2!A:A, Sheet2!B:B, "Not Found")`;
              desc = 'Searches for the ID in cell A2 inside Sheet2, returning the match from column B.';
            }

            setCompiledFormula(formula);
            setExplanation(desc);
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 850;
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-Tabs selector navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: isActive ? '#7c3aed' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        
        {/* ── 1. LESSON OVERVIEW ───────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 13
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Spreadsheets & Research
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to master Excel and Google Sheets using Generative AI. We cover formula writing, pivot tables, and using AI models to synthesize online research.
              </p>
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  AI-Powered Data Analysis
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  Spreadsheets are the backbone of business decision-making. However, memorizing complex nested formulas like XLOOKUP or SUMIFS is challenging.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  With AI assistants, you can describe your data goals in plain English, and have the model write the exact formula code needed. We will also learn how to summarize research datasets for corporate briefs.
                </p>
              </div>

              {/* Requirement Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={18} style={{ color: '#7c3aed' }} /> Key Operations Covered:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Conditional Formulas (SUMIF, AVERAGEIF).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Cross-Table Matches (XLOOKUP, VLOOKUP).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Pivot Table design and row grouping.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Research synthesis and data cleaning prompts.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('use_cases')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Use Cases <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. SPREADSHEET USE CASES ────────────────────────────────── */}
        {activeTab === 'use_cases' && (
          <motion.div key="use_cases" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📊 Spreadsheet AI Integration Patterns</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Learn how workers integrate AI models to process spreadsheet data:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Writing Formulas</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Simply describe your columns (e.g. "Col A has names") and ask the AI to draft a formula.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Data Formatting</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Use prompt commands to clean lists, remove extra spaces, and format dates into ISO formats.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Synthesizing Studies</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Ask AI to review large rows of textual columns and extract key themes or positive sentiment scores.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try AI Formula Playground <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Natural Language AI Formula Generator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Describe your spreadsheet calculation goal in plain English, and compile the matching Excel formula:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Formula Prompt
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Describe what you want to calculate:</label>
                      <textarea
                        value={userPrompt}
                        disabled={isRunning}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        style={{ width: '100%', height: '110px', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.4 }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.4rem' }}>
                        💡 Try: "Sum column A if column B is Paid" or "Vlookup name matching A2"
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateFormula}
                  disabled={isRunning}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(124,58,237,0.2)',
                    marginTop: '1.5rem'
                  }}
                >
                  <Play size={15} />
                  {isRunning ? 'Analyzing data goals...' : 'Generate Formula'}
                </button>
              </div>

              {/* Right Column Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '480px', boxSizing: 'border-box' }}>
                
                {/* Visual Logs */}
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> EXECUTIONS MONITOR
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ PROCESSING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Describe your calculation goals and run the generator to see steps...
                      </span>
                    )}
                    {simLogs.map((log, idx) => (
                      <div key={idx} style={{ color: '#e2e8f0', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formula output dashboard card */}
                {compiledFormula && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                      <Code size={12} /> TARGET EXCEL FORMULA CODE
                    </span>
                    <strong style={{ fontSize: '1.4rem', color: '#34d399', display: 'block', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                      {compiledFormula}
                    </strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.4, display: 'block' }}>
                      <strong>How it works:</strong> {explanation}
                    </span>
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('use_cases')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Use Cases
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Table size={22} style={{ color: '#7c3aed' }} />
                Day 13 Assignment: Excel Data Query Design
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You have a sheet containing product sales. 
                <br />
                Draft the prompt commands you would send to an AI assistant to get it to write a formula that sums the values in column D (Price) only if column C (Category) is "Software" and column E (Quantity) is greater than 10.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Describe your prompt template here..."
                style={{ width: '100%', height: '180px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                disabled={!assignmentText.trim() || assignmentSubmitted}
                style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✅ Assignment Submitted Successfully' : 'Submit Assignment'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 13 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 13 Knowledge Quiz</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((question, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  return (
                    <div key={qIdx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>
                        Q{qIdx + 1}: {question.q}
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {question.opts.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          let bg = '#f8fafc';
                          let border = '1px solid #cbd5e1';
                          let textColor = '#475569';

                          if (quizSubmitted) {
                            if (oIdx === question.ans) {
                              bg = '#ecfdf5';
                              border = '1px solid #10b981';
                              textColor = '#166534';
                            } else if (isSelected) {
                              bg = '#fef2f2';
                              border = '1px solid #ef4444';
                              textColor = '#991b1b';
                            }
                          } else if (isSelected) {
                            bg = '#f5f3ff';
                            border = '1px solid #7c3aed';
                            textColor = '#7c3aed';
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              style={{
                                background: bg,
                                border: border,
                                color: textColor,
                                padding: '0.85rem 1.1rem',
                                borderRadius: '8px',
                                cursor: quizSubmitted ? 'default' : 'pointer',
                                fontSize: '0.98rem',
                                fontWeight: isSelected ? 700 : 500,
                                transition: 'all 0.15s'
                              }}
                            >
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '2rem',
                    fontSize: '1rem'
                  }}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <div style={{ marginTop: '2rem', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#4c1d95', display: 'block', marginBottom: '0.4rem' }}>
                    Quiz Score: {quizScore} / {QUIZ_QUESTIONS.length}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#6d28d9' }}>
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You understand spreadsheet automation!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Assignment
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('dashboard')}
                style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}