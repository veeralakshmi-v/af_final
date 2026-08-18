import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, RefreshCw, Layers, Sliders, HelpCircle, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'techniques', label: '🚀 Advanced Techniques' },
  { id: 'chaining_sim', label: '🔗 Chaining Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const ADVANCED_TECHNIQUES = [
  {
    id: 'chaining',
    name: 'Prompt Chaining',
    icon: '🔗',
    color: '#059669',
    tagline: 'Split complex tasks into sequential prompts',
    what: 'Instead of asking the AI to do 5 complex steps in one prompt, you ask it to do Step 1, take that output, feed it into Prompt 2 for Step 2, and so on. This dramatically increases accuracy.',
    when: 'Complex workflows like generating a report: Prompt 1 extracts facts -> Prompt 2 structures outline -> Prompt 3 writes draft.',
    example: 'Prompt 1: "Extract the bugs from this error log."\nPrompt 2: "Write code to fix the bugs extracted here: [Output 1]"'
  },
  {
    id: 'react',
    name: 'ReAct (Reason + Act) Framework',
    icon: '🤖',
    color: '#3b82f6',
    tagline: 'Give the AI access to search engines & tools',
    what: 'ReAct tells the model to think, execute an action (like searching Google or running Python code), observe the result, and repeat until the problem is solved. This is how modern AI Agents work.',
    when: 'Tasks that require external tools, real-time lookups, or mathematical calculation.',
    example: 'Thought: I need to find the population of Tokyo in 2024.\nAction: Search[Tokyo population 2024]\nObservation: Tokyo population is 37.4M.\nThought: I can now answer the user.'
  },
  {
    id: 'self_consistency',
    name: 'Self-Consistency',
    icon: '⚖️',
    color: '#8b5cf6',
    tagline: 'Majority vote from multiple reasoning paths',
    what: 'You prompt the model to generate 3–5 different reasoning paths for the same math or logic question, then pick the answer that appears most frequently (majority voting).',
    when: 'Highly complex logic or math questions where the model might make a calculation mistake.',
    example: 'Path 1: Answer is 12.\nPath 2: Answer is 15.\nPath 3: Answer is 12.\nFinal Answer Selected: 12 (2 votes vs 1).'
  }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is Prompt Chaining?',
    opts: ['Running the exact same prompt 10 times in a row', 'Breaking a complex task into multiple prompts where the output of one prompt becomes the input for the next', 'Combining two different AI models into one search window'],
    ans: 1
  },
  {
    q: 'Why is Prompt Chaining usually better than one giant detailed prompt?',
    opts: ['It saves internet bandwidth', 'It reduces cognitive overload on the model, leading to higher accuracy and fewer hallucinations', 'It is cheaper to compute'],
    ans: 1
  },
  {
    q: 'What does "ReAct" stand for in prompt framework architectures?',
    opts: ['Reactive Action', 'Reasoning and Acting', 'Recursive Activation'],
    ans: 1
  },
  {
    q: 'How does a ReAct loop proceed?',
    opts: ['Input -> Translation -> Output', 'Thought -> Action -> Observation -> Thought...', 'Prompt -> Wait -> Answer'],
    ans: 1
  },
  {
    q: 'What is the core concept of Self-Consistency?',
    opts: ['Keeping the temperature at 0.0 at all times', 'Generating multiple logic paths for a single question and taking the majority vote answer', 'Ensuring the prompt language is simple'],
    ans: 1
  },
  {
    q: 'You want to build an AI agent that automatically reads customer emails, searches your inventory database, and writes replies. Which framework fits best?',
    opts: ['Zero-shot prompting', 'Self-Consistency', 'ReAct (Reasoning and Acting)'],
    ans: 2
  },
  {
    q: 'If you want to write a newsletter summary of a complex raw document, what chain is best?',
    opts: ['Prompt 1: translate -> Prompt 2: write poetry', 'Prompt 1: extract main entities/key quotes -> Prompt 2: draft summary using those key items', 'Single Zero-shot prompt'],
    ans: 1
  },
  {
    q: 'What role do "Tools" play in the ReAct framework?',
    opts: ['They are formatting rules', 'They are external API connections (Search, Calculators) the AI can choose to run', 'They are parameter sliders in the model settings'],
    ans: 1
  }
];

export default function GenAIDay7({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedTech, setSelectedTech] = useState(ADVANCED_TECHNIQUES[0]);
  const [chainInput, setChainInput] = useState('This product is amazing. It resolved my network lag completely, though the setup manual was a bit confusing.');
  const [chainStep1Output, setChainStep1Output] = useState('');
  const [chainStep2Output, setChainStep2Output] = useState('');
  const [isChaining, setIsChaining] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateChain = () => {
    if (!chainInput.trim()) return;
    setIsChaining(true);
    setChainStep1Output('');
    setChainStep2Output('');

    // Step 1: Extract Main Feature
    setTimeout(() => {
      const step1Text = "💡 Main Feature Extracted: Resolved network latency/lag successfully.\n⚠️ Minor Issue: Confusing setup manual.";
      setChainStep1Output(step1Text);

      // Step 2: Draft Marketing Bullet
      setTimeout(() => {
        setChainStep2Output("📢 Marketing Headline:\n\"Say goodbye to network lag! Experience seamless connectivity in seconds. 🚀 #SpeedUp #LagFree\"");
        setIsChaining(false);
      }, 1500);
    }, 1200);
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#059669' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
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

        {/* ── 1. OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 7 • ADVANCED PROMPTING
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Advanced Prompting — Chaining & Agents
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Go beyond single prompts. Today we cover how to link prompts sequentially (Prompt Chaining), enable the AI to access external search APIs and databases (ReAct Framework), and vote on the best answer logic (Self-Consistency).
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 7 Goal:</strong> Master Prompt Chaining workflows and understand the ReAct framework that powers modern AI Agents.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('techniques')} style={{ background: '#059669', borderColor: '#059669' }}>
                Advanced Techniques <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. TECHNIQUES ────────────────────────────────────────────── */}
        {activeTab === 'techniques' && (
          <motion.div key="techniques" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🚀 Advanced Prompt Engineering</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>Click each card to explore advanced prompting methods:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {ADVANCED_TECHNIQUES.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  style={{
                    background: selectedTech.id === tech.id ? '#e6f4ea' : 'white',
                    border: `2px solid ${selectedTech.id === tech.id ? '#059669' : '#e2e8f0'}`,
                    padding: '1.5rem',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tech.icon}</div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{tech.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{tech.tagline}</span>
                </button>
              ))}
            </div>

            {/* Selected tech panel */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{selectedTech.icon}</span>
                <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', color: '#0f172a' }}>{selectedTech.name}</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>How it works</span>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem', lineHeight: 1.6 }}>{selectedTech.what}</p>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>When to use</span>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem', lineHeight: 1.6 }}>{selectedTech.when}</p>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Example Walkthrough</span>
                  <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}>
                    {selectedTech.example}
                  </pre>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('chaining_sim')} style={{ background: '#059669', borderColor: '#059669' }}>
                Try Chaining Simulator <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. CHAINING SIMULATOR ────────────────────────────────────── */}
        {activeTab === 'chaining_sim' && (
          <motion.div key="chaining_sim" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔗 Interactive Chaining Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              See how a 2-step prompt pipeline processes data sequentially. Paste a review and click run:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Raw Customer Review (Input Data)
                </label>
                <textarea
                  value={chainInput}
                  onChange={(e) => setChainInput(e.target.value)}
                  style={{ width: '100%', height: '80px', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <button
                onClick={handleSimulateChain}
                disabled={isChaining}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem' }}
              >
                {isChaining ? '⏳ Chaining Prompts...' : '▶ Run 2-Step Prompt Chain'}
              </button>

              {/* Chaining Flow Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Step 1 */}
                <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6', opacity: chainStep1Output ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#1e3a8a' }}>Step 1: Feature Extraction Prompt</strong>
                    {isChaining && !chainStep1Output && <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>Processing...</span>}
                  </div>
                  {chainStep1Output ? (
                    <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{chainStep1Output}</pre>
                  ) : (
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>Output will flow here...</span>
                  )}
                </div>

                {/* Step 2 */}
                <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', opacity: chainStep2Output ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#064e3b' }}>Step 2: Social Media Marketing Prompt (Input = Output 1)</strong>
                    {isChaining && chainStep1Output && !chainStep2Output && <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Processing...</span>}
                  </div>
                  {chainStep2Output ? (
                    <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{chainStep2Output}</pre>
                  ) : (
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>Waiting for Step 1 output to flow in...</span>
                  )}
                </div>

              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#059669', borderColor: '#059669' }}>
                Day 7 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 7 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Design a 2-step prompt pipeline to automate news summarization:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Workflow Design: News Polish & Translate
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Write the core system instructions for a **2-step prompt pipeline** that:
                <br />
                **Step 1**: Takes a raw news article and extracts only the 3 main bullet facts.
                <br />
                **Step 2**: Takes the 3 bullets from Step 1 and translates them into Spanish, formatted as a marketing post.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`PROMPT STEP 1 (Extraction):\n[Write your prompt instructions here]\n\nPROMPT STEP 2 (Translation & Post formatting):\n[Write your prompt instructions here]`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Pipeline Submitted!' : 'Submit Pipeline'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Pipeline recorded successfully!</strong> Now start the quiz to complete Day 7.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#059669', borderColor: '#059669' }}>
                Start Assessment Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 7 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — select your answers:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#e6f4ea'; border = '1.5px solid #059669'; color = '#064e3b'; }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.65rem 0.9rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400 }}
                        >
                          {opt}
                          {quizSubmitted && isCorrect && <span style={{ float: 'right' }}>✓</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span style={{ float: 'right' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{ background: '#059669', borderColor: '#059669' }}
                >
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great Job!' : '📖 Review the lessons!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                    Retry Quiz
                  </button>
                </>
              )}
            </div>

            <div style={{ background: '#e6f4ea', border: '1px solid #a3cfbb', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f5132' }}>🎉 Day 7 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've successfully completed the advanced prompting syllabus.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
