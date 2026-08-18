import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Briefcase, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, Award, UserCheck, Code, Clipboard 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'ats_tips', label: '📄 ATS Resume Rules' },
  { id: 'sandbox', label: '💻 ATS Sandbox Scanner' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is an Applicant Tracking System (ATS) in simple terms?',
    opts: [
      'A software program that employers use to scan, filter, and rank job applicant resumes based on keyword matching before a human reads them.',
      'A hardware device that tracks employees locations.',
      'An email auto-responder that replies to customers.'
    ],
    ans: 0
  },
  {
    q: 'What is the "XYZ formula" for writing strong resume bullet points?',
    opts: [
      'Accomplished [X], as measured by [Y], by doing [Z].',
      'X-ray your skills, Year-end review, Zero errors.',
      'XML formatting, Yellow highlights, Zip folder compression.'
    ],
    ans: 0
  },
  {
    q: 'Why are fancy multi-column grid layouts often bad for ATS systems?',
    opts: [
      'Because many older ATS scanners read files left-to-right across the entire page, scrambling text columns into jumbled sentences.',
      'Because they make the file size too small.',
      'Because color buttons aren\'t supported in PDF formats.'
    ],
    ans: 0
  },
  {
    q: 'How should you incorporate keywords into your resume for a specific job?',
    opts: [
      'Customize your resume for each application by naturally embedding specific technical keywords and tools mentioned in the job post.',
      'Paste a block of hidden white-colored text containing keywords at the bottom of the page.',
      'Type all tools you have ever heard of in alphabetical order.'
    ],
    ans: 0
  },
  {
    q: 'What is the best way to optimize your LinkedIn profile for recruiters?',
    opts: [
      'Include high-volume search keywords in your headline and summary sections so recruiters can find you in search results.',
      'Upload your resume as a background banner picture.',
      'Write "Looking for a job" as your headline.'
    ],
    ans: 0
  }
];

export default function GenAIDay12({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive ATS Sandbox States
  const [resumeText, setResumeText] = useState('John Doe. Experienced in building web apps. Worked with JavaScript and design.');
  const [jobDescription, setJobDescription] = useState('Seeking a frontend engineer with skills in React, Redux, and TailwindCSS.');
  
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [matchScore, setMatchScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  // Forms and quiz states
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const runAtsScanner = () => {
    setIsRunning(true);
    setSimLogs([]);
    setMatchScore(0);
    setSuggestions([]);

    const steps = [
      `📁 Reading resume document characters...`,
      `🔍 Extracting key phrases and job parameters...`,
      `⚖️ Cross-referencing against target job description keywords...`,
      `📊 Analyzing structure, columns, and headings validation...`,
      `✅ Optimization report compiled.`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            const hasReact = resumeText.toLowerCase().includes('react');
            const hasRedux = resumeText.toLowerCase().includes('redux');
            const hasTailwind = resumeText.toLowerCase().includes('tailwind');

            let score = 45;
            const items = [];

            if (hasReact) score += 20; else items.push('Missing keyword: "React"');
            if (hasRedux) score += 15; else items.push('Missing keyword: "Redux"');
            if (hasTailwind) score += 15; else items.push('Missing keyword: "TailwindCSS"');

            if (resumeText.length < 100) {
              score -= 10;
              items.push('Resume content is too short. Add details about your projects.');
            }

            setMatchScore(score);
            setSuggestions(items.length > 0 ? items : ['Perfect keyword matching! Your resume is highly compatible.']);
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 800;
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
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 12
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Careers, Resumes & Socials
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to leverage AI tools to accelerate your job hunting. We cover ATS friendly formats, building high-impact resume bullet points, and keyword-optimizing your LinkedIn presence.
              </p>
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  AI-Powered Career Optimization
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  Finding a job in the modern tech landscape requires understanding **recruitment algorithms**. Over 90% of large corporations use Applicant Tracking Systems (ATS) to filter resumes before a recruiter ever sees them.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  Instead of sending the same generic resume to hundreds of places, you will learn how to use Generative AI to scan job descriptions, identify missing keywords, and tailor your bullet points for optimal compatibility.
                </p>
              </div>

              {/* API terms */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} style={{ color: '#7c3aed' }} /> Core Concepts to Master:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>📄 ATS Screening:</span>
                    <span>Automated scanning filters that search for specific keywords.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🎯 XYZ Formula:</span>
                    <span>A structured way to write results-oriented resume bullets.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>👥 LinkedIn SEO:</span>
                    <span>Optimizing headlines and summaries to appear in searches.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>💼 Tailored Cover Letters:</span>
                    <span>Creating custom intro letters based on job criteria.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('ats_tips')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View ATS Resume Rules <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. ATS RESUME RULES ─────────────────────────────────────── */}
        {activeTab === 'ats_tips' && (
          <motion.div key="ats_tips" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📄 ATS-Friendly Resume Formatting Rules</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Follow these standard guidelines to ensure your resume passes scanner filters:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Single-Column Layouts</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Older ATS scanners parse documents left-to-right. Multi-column grids can jumble text columns together.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Keyword Matching</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Recruiters search for specific tools. If a job calls for "React", make sure that exact keyword is present.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Plain Text Headings</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Use simple headings like "Work Experience", "Education", and "Skills" so the computer can identify sections.</span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', border: '1px solid #cbd5e1', borderRadius: '16px', marginBottom: '2rem' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>💡 The XYZ Formula:</strong>
              <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Instead of saying "Worked on a React application", write it using Google's formula: 
                <br />
                <strong>"Accomplished [X] as measured by [Y], by doing [Z]."</strong>
                <br />
                *Example: "Optimized dashboard load speed by 35% (Y) by refactoring React component hooks (Z) to resolve redundant re-renders (X)."*
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try ATS Scanner Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Interactive ATS Keyword Scanner</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Paste your resume text and target job description details to calculate compatibility scores:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Resume Inputs
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Your Resume Draft:</label>
                      <textarea value={resumeText} disabled={isRunning} onChange={(e) => setResumeText(e.target.value)} style={{ width: '100%', height: '80px', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Target Job Description:</label>
                      <textarea value={jobDescription} disabled={isRunning} onChange={(e) => setJobDescription(e.target.value)} style={{ width: '100%', height: '80px', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={runAtsScanner}
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
                  {isRunning ? 'Scanning Resume keywords...' : 'Run Keyword Scan'}
                </button>
              </div>

              {/* Right Column Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '480px', boxSizing: 'border-box' }}>
                
                {/* Visual Logs */}
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> SCANNING LOG DETAILS
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ MATCHING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Paste inputs and run scanner to test compatibility scores...
                      </span>
                    )}
                    {simLogs.map((log, idx) => (
                      <div key={idx} style={{ color: '#e2e8f0', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Match score dashboard indicator */}
                {matchScore > 0 && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                      <UserCheck size={12} /> ATS SCORE REPORT CARD
                    </span>
                    <strong style={{ fontSize: '1.5rem', color: matchScore >= 70 ? '#10b981' : '#f59e0b', display: 'block', marginBottom: '0.2rem' }}>
                      ATS Keyword Match: {matchScore}%
                    </strong>
                    <div style={{ color: '#e2e8f0', fontSize: '0.8rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                      <strong>Suggestions:</strong>
                      {suggestions.map((s, idx) => (
                        <div key={idx} style={{ color: '#94a3b8', marginTop: '0.2rem' }}>• {s}</div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('ats_tips')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Tips
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
                <Briefcase size={22} style={{ color: '#7c3aed' }} />
                Day 12 Assignment: The XYZ Bullet Formulation
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You want to write a high-impact experience bullet for your developer resume.
                <br />
                Write down one accomplishments bullet using the **Google XYZ Formula**:
                <br />
                <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>
                <br />
                E.g. Refactored a legacy login flow (Z), reducing user registration dropout rates by 22% (Y), resulting in smoother onboarding (X).
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`Accomplished X: ...\nMeasured by Y: ...\nBy doing Z: ...`}
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
                Start Day 12 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 12 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You understand ATS screening parameters!' : 'Review the correct options highlighted green above.'}
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
