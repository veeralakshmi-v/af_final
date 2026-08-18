import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Video, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, Music, Code, Clipboard 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'script_rules', label: '📹 Video Script Formats' },
  { id: 'sandbox', label: '💻 Interactive Hook Generator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Why is the "Hook" of a video script critical for social media platforms?',
    opts: [
      'To catch the viewer\'s attention in the first 3 seconds and prevent them from scrolling away.',
      'To make the video render faster in high resolutions.',
      'To automatically add subtitle captions.'
    ],
    ans: 0
  },
  {
    q: 'What is a split-column video script format?',
    opts: [
      'A layout separating visual instructions (left) from audio/narration text (right).',
      'A code format that compiles Python scripts.',
      'A spreadsheet formula that aggregates video files.'
    ],
    ans: 0
  },
  {
    q: 'How does Generative AI assist in podcast creation?',
    opts: [
      'By drafting episode structures, generating interview questions, and detailing audio scripts.',
      'By physical hosting and distribution across Spotify.',
      'By deleting audio static automatically.'
    ],
    ans: 0
  },
  {
    q: 'What is "A-Roll" in video production terminology?',
    opts: [
      'The primary footage showing the speaker talking directly to the camera.',
      'The background music sound tracks.',
      'Supplemental overlay clips like diagrams or animations.'
    ],
    ans: 0
  },
  {
    q: 'What is "B-Roll"?',
    opts: [
      'Supplemental background footage, screenshots, or actions that keep visual pacing fast.',
      'The backup audio recording file.',
      'The text captions overlay.'
    ],
    ans: 0
  }
];

export default function GenAIDay15({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [genre, setGenre] = useState('tech'); // 'tech', 'pitch', 'vlog'
  const [productName, setProductName] = useState('AI Learning Hub');
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [hooks, setHooks] = useState([]);

  // Forms and quiz states
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const generateHooks = () => {
    setIsRunning(true);
    setSimLogs([]);
    setHooks([]);

    const steps = [
      `🧠 Analyzing target product "${productName}"...`,
      `🔍 Profiling viewers for selected genre "${genre}"...`,
      `⚙️ Formatting hook drafts (Suspense, Question, Direct)...`,
      `✅ Video hooks drafted.`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            let list = [];
            if (genre === 'tech') {
              list = [
                { style: '❓ Provocative Question', text: `Did you know 90% of developers use AI incorrectly? Here is how to use ${productName} the right way.` },
                { style: '🔥 Dramatic Contrast', text: `Stop spending hours reading documentation. I built a working prototype in 5 minutes using ${productName}, and here is how.` },
                { style: '⚡ Direct/Value', text: `If you want to master AI engineering in 2026, here are three things you need to do with ${productName} today.` }
              ];
            } else if (genre === 'pitch') {
              list = [
                { style: '❓ Bold Question', text: `What if your team could save 20 hours of manual work every single week? Introducing ${productName}.` },
                { style: '📈 Shocking Stat', text: `Companies lose millions in manual data entries. Here is how ${productName} automates it in seconds.` },
                { style: '⚡ Direct/Value', text: `Automate your workflow in 3 steps. Let me show you how ${productName} replaces tedious forms.` }
              ];
            } else {
              list = [
                { style: '❓ Relatable Question', text: `Ever feel like you are working hard but getting nowhere? Here is how I changed my routine using ${productName}.` },
                { style: '🎬 Behind the Scenes', text: `A day in the life of a developer using ${productName}. spoiler: it is much easier than before.` },
                { style: '⚡ Quick Tip', text: `My secret weapon to build apps fast. This is ${productName}, and here is why I use it.` }
              ];
            }

            setHooks(list);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 15
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Video Scripts & Podcasts
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to leverage Generative AI to design engaging video content scripts, storyboards, and podcasts. Master hooks, pacing, A-Roll vs B-Roll guidelines, and sound scripting.
              </p>
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  AI-Powered Storyboarding & Scriptwriting
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  The first 3 seconds of a video are the most critical. If the hook is boring, viewers scroll away. Writing split-column scripts (separating visual cues from spoken narration) keeps pacing balanced.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  With AI assistants, you can generate multiple hooks, storyboard panel ideas, and podcast outlines, saving hours of brainstorming and editing time.
                </p>
              </div>

              {/* Requirements Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Music size={18} style={{ color: '#7c3aed' }} /> Key Operations Covered:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Hooks & Intros (first 3 seconds rule).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Split-column script layouts (Visual + Audio).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>A-Roll (talking head) and B-Roll (actions).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Podcast outlines & speaker transitions.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('script_rules')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Script Formats <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. VIDEO SCRIPT FORMATS ─────────────────────────────────── */}
        {activeTab === 'script_rules' && (
          <motion.div key="script_rules" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📹 Video Script Formatting Guidelines</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Optimize your scripts for visual flow and viewer pacing:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Split-Column Format</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Put visual descriptions (e.g. "Zoom on hands") in the left column, and spoken narration text in the right.</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Hook, Core, Call to Action</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Every script must have: a strong Hook (first 3s), Core content value, and a clear Call to Action (CTA) at the end.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Pacing (A-Roll & B-Roll)</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Alternate A-Roll (talking straight to camera) with B-Roll overlays (diagrams, screens) every 4-6 seconds.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try Hook Generator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Interactive Video Hook Generator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure your product name and select a content style to draft video intro hooks:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Video Settings
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Select Content Genre:</label>
                      <select value={genre} disabled={isRunning} onChange={(e) => setGenre(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}>
                        <option value="tech">🔧 Tech Tutorial / Coding Tips</option>
                        <option value="pitch">📈 Business Product Pitch</option>
                        <option value="vlog">🎬 Day-in-the-life Storytelling</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Product or Topic Name:</label>
                      <input
                        type="text"
                        value={productName}
                        disabled={isRunning}
                        onChange={(e) => setProductName(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateHooks}
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
                  {isRunning ? 'Brainstorming hooks...' : 'Generate Hooks'}
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
                      {isRunning ? '⏳ GENERATING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '120px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure video settings and click Generate Hooks to brainstorm intros...
                      </span>
                    )}
                    {simLogs.map((log, idx) => (
                      <div key={idx} style={{ color: '#e2e8f0', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hooks list card */}
                {hooks.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.2rem', boxSizing: 'border-box' }}>
                    {hooks.map((h, idx) => (
                      <div key={idx} style={{ borderBottom: idx === hooks.length - 1 ? 'none' : '1px solid #334155', paddingBottom: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ display: 'inline-block', fontSize: '0.68rem', background: '#4c1d95', color: '#ddd6fe', padding: '0.15rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace', marginBottom: '0.25rem', fontWeight: 700 }}>
                          {h.style}
                        </span>
                        <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, margin: 0 }}>
                          "{h.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('script_rules')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Rules
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
                <Video size={22} style={{ color: '#7c3aed' }} />
                Day 15 Assignment: Video Hook Compilation
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You are scripting a 60-second YouTube Short introducing the main advantages of using TailwindCSS.
                <br />
                Write down your script's first sentence (the hook). Make sure it captures attention and prompts the viewer to watch the remaining 57 seconds.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Draft your video script hook here..."
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
                Start Day 15 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 15 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You understand media scriptwriting!' : 'Review the correct options highlighted green above.'}
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