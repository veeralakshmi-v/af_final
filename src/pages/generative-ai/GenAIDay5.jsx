import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, AlertTriangle, Eye, HelpCircle, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'hallucinations', label: '⚠️ Hallucinations' },
  { id: 'ethics', label: '⚖️ AI Ethics' },
  { id: 'best_practices', label: '🛡️ Best Practices' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is an AI "hallucination"?',
    opts: ['The model shutting down due to high traffic', 'The model generating confident but completely false/fabricated information', 'The model translating words correctly'],
    ans: 1
  },
  {
    q: 'Why do LLMs hallucinate?',
    opts: ['Because they are math engines predicting likely words — not databases querying factual files', 'Because the computer runs out of memory', 'To protect user privacy'],
    ans: 0
  },
  {
    q: 'What does "Bias" in an LLM mean?',
    opts: ['The model responding too quickly', 'Systemic errors or prejudices inherited from the training data', 'The cost of API tokens'],
    ans: 1
  },
  {
    q: 'Which of the following is a key requirement of "Responsible AI"?',
    opts: ['Maximizing model size at all costs', 'Ensuring transparency, fairness, privacy, and accountability', 'Using the model only for coding'],
    ans: 1
  },
  {
    q: 'What is the best way to handle AI-generated facts in a professional report?',
    opts: ['Copy-paste directly since LLMs are always accurate', 'Fact-check and verify every statement with independent primary sources', 'Delete the report completely'],
    ans: 1
  },
  {
    q: 'How does setting a high temperature (e.g. 1.5) affect hallucinations?',
    opts: ['It reduces hallucinations completely', 'It increases hallucinations and randomness', 'It has no effect'],
    ans: 1
  },
  {
    q: 'What is the ethical concern regarding "Copyright & IP" in LLMs?',
    opts: ['Models costing too much money', 'Models being trained on copyrighted books/art without permission or attribution', 'Models generating code too fast'],
    ans: 1
  },
  {
    q: 'Which of the following represents a "Best Practice" in prompting?',
    opts: ['Keeping instructions as vague as possible', 'Providing clear constraints and asking the model to cite references', 'Writing in all capital letters'],
    ans: 1
  }
];

export default function GenAIDay5({ openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Horizontal local sub-tab navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#f43f5e' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(244,63,94,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#ffe4e6', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 5 • AI ETHICS & RESPONSIBILITY
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                AI Ethics, Responsible AI & Hallucinations
              </h1>
              <p style={{ color: '#ffe4e6', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                AI is extremely powerful — but it has limits. Learn why AI models make up false details (hallucinations), the ethical concerns of training on copyrighted data, bias issues, and the best practices for using AI safely at work.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 5 Goal:</strong> Identify when an AI is hallucinating, understand data privacy, and write a responsible AI usage guideline.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('hallucinations')} style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>
                Understanding Hallucinations <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. HALLUCINATIONS ────────────────────────────────────────── */}
        {activeTab === 'hallucinations' && (
          <motion.div key="hallucinations" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚠️ AI Hallucinations</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              A hallucination is when an AI generates a response that sounds highly confident but is **completely factually incorrect**.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#be123c', fontWeight: 800, margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ❓ Why do Hallucinations Happen?
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  LLMs do not connect to a structured database of facts. Instead, they are **pattern prediction engines** (like giant autocomplete boards). 
                  If a model does not know an answer, its default behavior is to output words that *sound* like a correct answer based on statistical patterns — creating fake citations, laws, or historical events.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#be123c', fontWeight: 800, margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🚦 How to Spot Them
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  • **URLs**: Check links. AI often makes up realistic web domains.
                  <br />
                  • **Numbers & Math**: Check multiplication. Models easily miscalculate large equations.
                  <br />
                  • **Biographies**: Ask about obscure people. The AI will mix facts of different individuals.
                </p>
              </div>
            </div>

            {/* Example Case */}
            <div style={{ background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#be123c', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.6rem' }}>🚨 Real-World Case Study</div>
              <p style={{ fontSize: '0.9rem', color: '#4c0519', lineHeight: 1.6, margin: 0 }}>
                In 2023, a lawyer used ChatGPT to prepare a legal brief. ChatGPT hallucinated **six complete court cases**, including fake judicial quotes and citation numbers. The lawyer did not verify the links, submitted the brief, and was heavily fined by the judge.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ethics')} style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>
                Explore AI Ethics <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. ETHICS ────────────────────────────────────────────────── */}
        {activeTab === 'ethics' && (
          <motion.div key="ethics" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚖️ Ethics & Responsible AI</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Deploying AI requires thinking about how it impacts society, fairness, and law.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              {[
                { title: '🔍 Bias & Discrimination', desc: 'Models are trained on text written by humans. If the training data contains prejudices, the AI inherits those biases, leading to discriminatory resume screening, medical predictions, or writing styles.', color: '#f43f5e' },
                { title: '🔒 Data Privacy', desc: 'Everything you paste into ChatGPT or Gemini APIs might be stored to retrain future models. Never paste private customer data, proprietary source code, or passwords into public model portals.', color: '#0ea5e9' },
                { title: '🎨 Copyright & Training Data', desc: 'Frontier models are trained on books, blogs, artwork, and code without explicit consent from original creators. This has led to massive class-action lawsuits regarding intellectual property.', color: '#10b981' }
              ].map((et, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', borderLeft: `4px solid ${et.color}` }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{et.title}</h4>
                  <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>{et.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('best_practices')} style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>
                AI Best Practices <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. BEST PRACTICES ────────────────────────────────────────── */}
        {activeTab === 'best_practices' && (
          <motion.div key="best_practices" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛡️ Best Practices for using AI</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Follow these standard safety steps when integrating generative AI into your work:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem', marginBottom: '2rem' }}>
              {[
                { title: '1. The "Human-in-the-loop" Rule', desc: 'Never let an AI send emails to customers, deploy code, or submit documents automatically. Always have a human review and sign off on all outputs first.', icon: '🧑‍⚖️' },
                { title: '2. Verify Important Citations', desc: 'If the model outputs a statistic, a page link, or a direct quote, double check it on Google or primary directories. Assume it is hallucinated until proven correct.', icon: '🔍' },
                { title: '3. Anchor the Prompt', desc: 'When asking for analysis, paste the text directly into the prompt box and say: "Only answer using the text provided above. If the answer is not in the text, write Not Found."', icon: '⚓' },
                { title: '4. Set low temperature for facts', desc: 'When doing logical extraction or factual summarization, turn the temperature down to 0.0 or 0.1 to prevent the model from guessing.', icon: '🧊' }
              ].map((bp, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{bp.icon}</span>
                    <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{bp.title}</strong>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{bp.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>
                Day 5 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 5 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Draft a simple AI safety policy for your workspace:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Case Study: Designing a Company AI Policy
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Your company plans to start using ChatGPT for customer correspondence.
                Write a **3-point safety guideline** for the customer service employees.
                Include rules about customer data privacy, fact verification, and human review.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`AI SAFETY POLICY FOR CUSTOMER SUCCESS TEAM:\n\n1. [Write rule 1 here]\n\n2. [Write rule 2 here]\n\n3. [Write rule 3 here]`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Policy Submitted!' : 'Submit Policy'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Policy recorded successfully!</strong> Now start the quiz to complete Day 5.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#f43f5e', borderColor: '#f43f5e' }}>
                Start Assessment Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 5 Assessment Quiz</h2>
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
                      } else if (isSelected) { bg = '#ffe4e6'; border = '1.5px solid #f43f5e'; color = '#9f1239'; }
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
                  style={{ background: '#f43f5e', borderColor: '#f43f5e' }}
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

            <div style={{ background: '#fff1f2', border: '1px solid #ffe4e6', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#be123c' }}>🎉 Day 5 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You now understand AI Ethics & Best Practices.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
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
