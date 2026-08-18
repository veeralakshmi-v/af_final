import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldAlert, Cpu, Layers, CheckCircle, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'cot_deepdive', label: '🔗 Chain-of-Thought' },
  { id: 'consistency_grounding', label: '⚖️ Consistency & Grounding' },
  { id: 'cot_playground', label: '💻 CoT Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is the main difference between standard prompting and Chain-of-Thought (CoT) prompting?',
    opts: ['Standard prompting only works in French', 'CoT forces the model to write out its step-by-step reasoning before arriving at the final answer', 'CoT works without tokens'],
    ans: 1
  },
  {
    q: 'How does Zero-Shot CoT trigger reasoning without examples?',
    opts: ['By typing in all caps', 'By appending a phrase like "Let\'s think step by step" to the prompt', 'By lowering the model temperature to 0.0'],
    ans: 1
  },
  {
    q: 'If a model has high self-consistency on a logical question, what does it mean?',
    opts: ['The model generated the same final answer across multiple different reasoning paths', 'The model answered in less than 1 second', 'The model used zero tokens'],
    ans: 0
  },
  {
    q: 'What is "grounding" a prompt?',
    opts: ['Shutting down the AI server', 'Providing a source text (context) and restricting the AI to ONLY use that source for its answers', 'Setting the AI temperature to 2.0'],
    ans: 1
  },
  {
    q: 'Which prompt instruction is a "negative constraint" designed to stop hallucinations?',
    opts: ['"Explain the topic clearly and list all facts."', '"If the answer cannot be found in the provided text, reply \'I do not know\'. Do NOT make up facts."', '"Answer as if you are a smart corporate advisor."'],
    ans: 1
  },
  {
    q: 'Why do logic-based puzzles often fail without Chain-of-Thought prompting?',
    opts: ['Because the model tries to guess the next token directly without computing the intermediate calculations', 'Because the prompt is too short', 'Because the system crashes'],
    ans: 0
  },
  {
    q: 'Which technique uses multiple reasoning paths to arrive at a consensus answer?',
    opts: ['System prompting', 'Self-Consistency', 'Few-shot translation'],
    ans: 1
  },
  {
    q: 'What does grounding do to hallucinations?',
    opts: ['It increases them slightly', 'It drastically reduces them by anchoring the AI to a provided reference text', 'It turns the AI into a creative writer'],
    ans: 1
  }
];

export default function GenAIDay8({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [simulatedMode, setSimulatedMode] = useState('no_cot');
  const [simulatedOutput, setSimulatedOutput] = useState('');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runSimulation = (mode) => {
    setSimulatedMode(mode);
    setIsRunningSim(true);
    setSimulatedOutput('');

    const outputs = {
      no_cot: "❌ Final Answer: 11\n\n(AI calculated too fast and missed the intermediate step that John ate some apples.)",
      cot: "✅ Let's solve this step-by-step:\n\nStep 1: John starts with 8 apples.\nStep 2: He gives 3 to Mary (8 - 3 = 5 apples left).\nStep 3: He eats 1 apple himself (5 - 1 = 4 apples left).\nStep 4: He buys 2 bags of 5 apples each (2 * 5 = 10 new apples).\nStep 5: Add them to his current apples (4 + 10 = 14 apples).\n\nFinal Answer: 14"
    };

    const text = outputs[mode];
    let idx = 0;
    const interval = setInterval(() => {
      setSimulatedOutput(text.slice(0, idx));
      idx++;
      if (idx > text.length) {
        clearInterval(interval);
        setIsRunningSim(false);
      }
    }, 15);
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
                background: isActive ? '#6366f1' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(99,102,241,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 8 • REASONING & MITIGATIONS
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Reasoning Patterns — Chain-of-Thought & Grounding
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                How do we stop AI from getting logic puzzles wrong and confidently making up facts? Today we learn the math behind Chain-of-Thought reasoning, explore Self-Consistency consensus, and design grounded prompts that completely block hallucinations.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 8 Goal:</strong> Write logic prompts using Chain-of-Thought structures and configure grounding constraints to secure AI outputs.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('cot_deepdive')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                CoT Deep Dive <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. COT DEEP DIVE ─────────────────────────────────────────── */}
        {activeTab === 'cot_deepdive' && (
          <motion.div key="cot_deepdive" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔗 Chain-of-Thought (CoT) Prompting</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Chain-of-Thought forces the AI to output intermediate calculations and logic steps *before* saying the final answer.
            </p>

            {/* Why standard fails */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem', marginBottom: '0.6rem' }}>❌ Without CoT (Standard Prompting)</div>
                <p style={{ color: '#7f1d1d', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                  Prompt: "John has 5 apples, gives 2 to Mary, buys 3 packs of 4 apples. How many?"
                  <br /><br />
                  Model prediction flow: The model tries to generate the single final answer token immediately. Since it has to guess the next number mathematically without planning, it easily predicts the wrong digit (e.g., "12").
                </p>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem', marginBottom: '0.6rem' }}>✅ With CoT (Chain-of-Thought)</div>
                <p style={{ color: '#14532d', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                  Prompt: "John has 5 apples... **Let's think step by step.**"
                  <br /><br />
                  Model prediction flow: The model writes "First John has 5...", then computes "5 - 2 = 3", then "3 * 4 = 12", and finally "3 + 12 = 15". By generating these tokens first, they act as memory space to make the math calculations accurate.
                </p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #6366f1', marginBottom: '1.5rem' }}>
              💡 <strong>Pro Tip: Zero-Shot CoT vs Few-Shot CoT:</strong>
              <br />
              • **Zero-Shot CoT**: Simply append `"Let's think step by step"` to your prompt.
              <br />
              • **Few-Shot CoT**: Provide 1–2 examples where you show a math riddle and *write out the step-by-step logic* yourself before giving the final answer. This teaches the model the exact reasoning pattern.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('consistency_grounding')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Consistency & Grounding <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. CONSISTENCY & GROUNDING ──────────────────────────────── */}
        {activeTab === 'consistency_grounding' && (
          <motion.div key="consistency_grounding" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚖️ Self-Consistency & Grounding</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Learn how to verify accuracy using model consensus and eliminate hallucination.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.6rem' }}>⚖️ Self-Consistency</h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Self-Consistency generates multiple different reasoning paths (e.g. 5 times at temperature 0.7) for the same problem. 
                  If 4 out of 5 runs result in `"Answer: 15"`, the system takes 15 as the consensus. This prevents random reasoning mistakes.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.6rem' }}>🛡️ Factual Grounding</h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Grounding means anchoring the model's knowledge to a specific text you paste.
                  You instruct the model: *"Analyze this document. Do NOT reference outside facts. If the information is not in the text, say 'I do not know'."* This is the single best way to block hallucinations in production chatbots.
                </p>
              </div>
            </div>

            <div style={{ background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontWeight: 800, color: '#3730a3', fontSize: '0.92rem', marginBottom: '0.4rem' }}>🔧 Grounded System Prompt Template:</div>
              <pre style={{ margin: 0, padding: '1rem', background: '#0f172a', color: '#a7f3d0', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {`System Prompt:\nYou are an assistant. Answer ONLY using the context provided below.\nRules:\n1. If the context does not contain the answer, reply "Information not found".\n2. Do NOT make up links or details.\n\nContext: [PASTE YOUR REFERENCE DOCUMENT HERE]`}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('cot_playground')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Interactive CoT Sandbox <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. COT PLAYGROUND ────────────────────────────────────────── */}
        {activeTab === 'cot_playground' && (
          <motion.div key="cot_playground" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Chain-of-Thought Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Watch how standard prediction compares to Chain-of-Thought step calculation:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px' }}>
              {/* Question board */}
              <div style={{ background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '12px', color: 'white', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>🧩 Math Word Riddle</span>
                <strong style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  "John starts with 8 apples. He gives 3 to Mary, eats 1 himself, and buys 2 bags of 5 apples each. How many does he have now?"
                </strong>
              </div>

              {/* Simulation triggers */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => runSimulation('no_cot')}
                  disabled={isRunningSim}
                  style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Run Without CoT (Standard)
                </button>
                <button
                  onClick={() => runSimulation('cot')}
                  disabled={isRunningSim}
                  style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Run With CoT (Step-by-step)
                </button>
              </div>

              {/* Console log display */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', minHeight: '180px', border: '1px solid #1e293b' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>🤖 Simulated AI Outputs</span>
                {simulatedOutput ? (
                  <pre style={{ margin: 0, color: '#a7f3d0', fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{simulatedOutput}{isRunningSim ? '▌' : ''}</pre>
                ) : (
                  <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic' }}>Click one of the buttons above to start simulation...</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Day 8 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 8 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Design a factually grounded system prompt to prevent chatbot hallucinations:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Grounded Chatbot Prompt
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Write a **System Prompt** for a school FAQ chatbot. 
                Include rules that:
                <br />
                1. Force the model to only answer using provided FAQ facts.
                2. Explicitly prevent guessing or suggesting external school sites.
                3. Specify a fall-back statement (e.g. "I do not know") if the facts are missing.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`SYSTEM INSTRUCTIONS:\nYou are a school FAQ chatbot...\n\nNEGATIVE CONSTRAINTS:\n1. If not found, you must...\n2. Do NOT...`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Grounded System Submitted!' : 'Submit Grounded Prompt'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Prompt recorded successfully!</strong> Complete the Day 8 assessment quiz below.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Start Assessment Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 8 Assessment Quiz</h2>
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
                      } else if (isSelected) { bg = '#e0e7ff'; border = '1.5px solid #6366f1'; color = '#3730a3'; }
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
                  style={{ background: '#6366f1', borderColor: '#6366f1' }}
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

            <div style={{ background: '#e0e7ff', border: '1px solid #c7d2fe', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#3730a3' }}>🎉 Day 8 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've successfully completed the advanced reasoning and mitigations syllabus.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
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
