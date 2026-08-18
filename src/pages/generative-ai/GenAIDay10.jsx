import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, LayoutTemplate, FileText, CheckCircle, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'templates', label: '🏗️ Reusable Templates' },
  { id: 'injector_sim', label: '💻 Variable Injector' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is a "prompt template"?',
    opts: ['A hardcoded text file that can never change', 'A reusable prompt structure containing dynamic placeholders (e.g. {{variable}}) that get replaced with actual data during execution', 'A method of buying server space'],
    ans: 1
  },
  {
    q: 'Which syntax is most commonly used by developers to represent dynamic variables in a template?',
    opts: ['Double curly braces: {{variable_name}}', 'Underlines: _____', 'Capitalized words only'],
    ans: 0
  },
  {
    q: 'How does using prompt templates benefit software developers?',
    opts: ['It reduces the cost of the model to $0', 'It keeps prompts consistent across the application while allowing dynamic inputs (like user reviews or file content)', 'It makes the model respond faster'],
    ans: 1
  },
  {
    q: 'What is a "Prompt Library"?',
    opts: ['A physical building containing AI manuals', 'A curated, organized repository of tested, high-performing prompts that team members can collaborate on and reuse', 'A set of Python math packages'],
    ans: 1
  },
  {
    q: 'Why should you version-control prompt templates?',
    opts: ['To count the lines of code', 'Because small updates to prompt wording can drastically alter model outputs and cause regression errors in applications', 'To delete older files automatically'],
    ans: 1
  },
  {
    q: 'If you want to write a prompt template for customer support replies, which placeholder pattern fits best?',
    opts: ['"Reply to user."', '"Act as support. Reply to query {{user_query}} in a {{tone}} tone. Restrict answers to {{context}}."', '"Reply to support query now."'],
    ans: 1
  },
  {
    q: 'What is the purpose of a "variable injector" in an AI system?',
    opts: ['It edits binary neural weights', 'It dynamically replaces double-curly brace placeholders in templates with actual user strings before forwarding the prompt to the API', 'It reduces temperature variability'],
    ans: 1
  },
  {
    q: 'Which parameter should be set to 0.0 when testing prompt templates for strict factual consistency?',
    opts: ['Context window length', 'Temperature', 'Token limit'],
    ans: 1
  }
];

export default function GenAIDay10({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [template, setTemplate] = useState("Act as a professional {{role}}. Translate the following text into {{language}}:\n\nText: \"{{user_text}}\"");
  const [role, setRole] = useState("Marketing Expert");
  const [language, setLanguage] = useState("Spanish");
  const [userText, setUserText] = useState("We launch our next-gen AI workspace today!");
  const [injectedResult, setInjectedResult] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInject = () => {
    let result = template
      .replace("{{role}}", role)
      .replace("{{language}}", language)
      .replace("{{user_text}}", userText);
    setInjectedResult(result);
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
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 10 • TEMPLATE LIBRARIES
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Reusable Prompt Templates & Prompt Libraries
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Writing static prompts for every user request is inefficient. Today we learn how to create reusable templates using placeholder variables, code a variable injector, and build collaborative libraries for software development teams.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 10 Goal:</strong> Master the placeholder format for prompt templates and build a live variable injection panel.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('templates')} style={{ background: '#059669', borderColor: '#059669' }}>
                Prompt Templates <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. TEMPLATES ─────────────────────────────────────────────── */}
        {activeTab === 'templates' && (
          <motion.div key="templates" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ Designing Prompt Templates</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Templates let you write the logic once and dynamically inject changing data like query variables, user names, or text files at runtime.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>⚡ Prompt Template blueprint</h4>
                <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  The blueprint contains placeholders inside double curly braces: <code>{"{{placeholder}}"}</code>.
                  These act as arguments.
                </p>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>
                  {`Act as a {{role}}.\nSummarize this post in {{count}} words:\n\nPost: "{{post_text}}"`}
                </pre>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>📂 Prompt Libraries</h4>
                <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  For production environments, libraries store tested prompts in structured JSON files. This ensures teams can run regression tests when upgrading to newer models (like upgrading from GPT-3.5 to GPT-4).
                </p>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>
                  {`{\n  "template_id": "translator",\n  "version": "1.2.0",\n  "description": "Marketing translator",\n  "parameters": ["role", "language"]\n}`}
                </pre>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('injector_sim')} style={{ background: '#059669', borderColor: '#059669' }}>
                Try Variable Injector <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INJECTOR SIMULATOR ────────────────────────────────────── */}
        {activeTab === 'injector_sim' && (
          <motion.div key="injector_sim" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Dynamic Variable Injector</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Edit the prompt template and the parameters below, then click "Inject Variables" to compile the prompt:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                
                {/* Inputs */}
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', fontWeight: 700, marginBottom: '0.3rem' }}>Prompt Template (with placeholders)</label>
                    <textarea
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      style={{ width: '100%', height: '80px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#475569', fontWeight: 700, marginBottom: '0.3rem' }}>{`{{role}}`}</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#475569', fontWeight: 700, marginBottom: '0.3rem' }}>{`{{language}}`}</label>
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#475569', fontWeight: 700, marginBottom: '0.3rem' }}>{`{{user_text}}`}</label>
                    <input
                      type="text"
                      value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    onClick={handleInject}
                    style={{ width: '100%', background: '#059669', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ⚡ Inject Variables
                  </button>
                </div>

                {/* Compiled output */}
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>📝 Compiled Prompt payload</span>
                  <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '12px', minHeight: '220px', border: '1px solid #1e293b', boxSizing: 'border-box' }}>
                    {injectedResult ? (
                      <pre style={{ margin: 0, color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{injectedResult}</pre>
                    ) : (
                      <span style={{ color: '#475569', fontSize: '0.82rem', fontStyle: 'italic' }}>Click "Inject Variables" to see the compiled output payload...</span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#059669', borderColor: '#059669' }}>
                Day 10 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 10 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Design a template for an email categorizer system:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Reusable Customer Support Template
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Create a prompt template with at least 3 placeholders (e.g. <code>{"{{support_query}}"}</code>, <code>{"{{customer_priority}}"}</code>, and <code>{"{{reusable_faq_context}}"}</code>).
                Write the rules ensuring the AI remains concise and only answers if the query matches the FAQ guidelines.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`PROMPT TEMPLATE:\nYou are a customer support agent. Analyze the support ticket: "{{support_query}}".\nPriority classification: "{{customer_priority}}".\nAnswer using ONLY these guidelines:\n"{{reusable_faq_context}}".`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Template Submitted!' : 'Submit Support Template'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Template registered!</strong> Take the final Day 10 assessment quiz below.
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
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 10 Assessment Quiz</h2>
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
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f5132' }}>🎉 Day 10 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've successfully completed the reusable prompt templates syllabus.</p>
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
