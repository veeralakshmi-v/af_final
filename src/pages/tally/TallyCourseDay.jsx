import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Play, Bot, FileText, CheckCircle, HelpCircle, 
  ArrowRight, Sparkles, Check, ClipboardList, Target, Terminal,
  Briefcase, RefreshCw, Send, Lock, Unlock, AlertTriangle,
  Award, MessageSquare, Clock, ShieldAlert, RotateCcw
} from 'lucide-react';
import { tallyDaysData } from './tallyCourseData';
import { 
  getAssignmentValidations, 
  saveAssignmentValidation, 
  isModuleLocked, 
  getLockReason,
  getModuleConfig
} from '../../utils/htmlCssLocking';

export default function TallyCourseDay({ 
  dayId, 
  activeTab: propActiveTab, 
  onNavigate, 
  openAITutor, 
  onSubmitTask, 
  activeModuleId,
  session 
}) {
  const effectiveDayId = 
    dayId === 'tally_prime_module1' ? 'day1' :
    dayId === 'tally_prime_module2' ? 'day2' :
    dayId === 'tally_prime_module3' ? 'day3' :
    dayId === 'tally_prime_module4' ? 'day4' :
    dayId === 'tally_prime_project1' ? 'tally_project1' :
    dayId === 'tally_prime_module5' ? 'day5' :
    (dayId || 'day1');

  const currentModuleId = activeModuleId || (
    effectiveDayId === 'day1' ? 'tally_prime_module1' :
    effectiveDayId === 'day2' ? 'tally_prime_module2' :
    effectiveDayId === 'day3' ? 'tally_prime_module3' :
    effectiveDayId === 'day4' ? 'tally_prime_module4' :
    effectiveDayId === 'tally_project1' ? 'tally_prime_project1' :
    effectiveDayId === 'day5' ? 'tally_prime_module5' :
    'tally_prime_module1'
  );

  const dayData = tallyDaysData[effectiveDayId] || tallyDaysData['day1'];
  const moduleConfig = getModuleConfig('tally_prime', currentModuleId);

  // User session
  const currentUser = (() => {
    if (session) return session;
    try {
      const raw = localStorage.getItem('lms_user_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  })();

  const isStaff = Boolean(currentUser && (currentUser.role === 'staff' || currentUser.role === 'admin' || currentUser.role === 'instructor'));

  // Assignment Validation & Locking State
  const [validations, setValidations] = useState(getAssignmentValidations());
  const currentValidation = validations[currentModuleId] || {};

  // Form State
  const [submissionNotes, setSubmissionNotes] = useState(currentValidation.submissionNotes || '');
  const [studentFeedback, setStudentFeedback] = useState(currentValidation.studentFeedback || '');
  const [feedbackError, setFeedbackError] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      setValidations(getAssignmentValidations());
    };
    window.addEventListener('html_css_validation_changed', handleSync);
    return () => window.removeEventListener('html_css_validation_changed', handleSync);
  }, []);

  useEffect(() => {
    const rec = validations[currentModuleId] || {};
    if (rec.submissionNotes) setSubmissionNotes(rec.submissionNotes);
    if (rec.studentFeedback) setStudentFeedback(rec.studentFeedback);
  }, [currentModuleId]);

  const renderSectionIcon = (iconName, color) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={20} color={color} />;
      case 'ClipboardList': return <ClipboardList size={20} color={color} />;
      case 'RefreshCw': return <RefreshCw size={20} color={color} />;
      case 'Briefcase': return <Briefcase size={20} color={color} />;
      case 'Bot': return <Bot size={20} color={color} />;
      default: return <BookOpen size={20} color={color} />;
    }
  };
  
  const [activeTab, setActiveTab] = useState(propActiveTab || 'overview');
  
  // Interactive Quiz States
  const [quizSelected, setQuizSelected] = useState({});
  const [quizChecked, setQuizChecked] = useState({});
  const [reflectionChecks, setReflectionChecks] = useState({});

  // Sync tab with external prop
  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  // Reset page states when effectiveDayId changes
  useEffect(() => {
    setActiveTab(propActiveTab || 'overview');
    setQuizSelected({});
    setQuizChecked({});
    setReflectionChecks({});
    setFeedbackError(false);
    setIsSubmittedSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [effectiveDayId]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate && currentModuleId) {
      onNavigate(currentModuleId, tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuizOption = (qIdx, optIdx) => {
    if (quizChecked[qIdx]) return;
    setQuizSelected(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuizQuestion = (qIdx) => {
    if (quizSelected[qIdx] !== undefined) {
      setQuizChecked(prev => ({ ...prev, [qIdx]: true }));
    }
  };

  const handleResetQuiz = () => {
    setQuizSelected({});
    setQuizChecked({});
  };

  const calculateScore = () => {
    let score = 0;
    dayData.quiz.forEach((item, idx) => {
      if (quizChecked[idx] && quizSelected[idx] === item.ans) {
        score += 1;
      }
    });
    return score;
  };

  const totalChecked = Object.keys(quizChecked).length;
  const currentScore = calculateScore();

  const handleReflectionToggle = (idx) => {
    setReflectionChecks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const MIN_CHARS = 50;
  const isFeedbackValid = (studentFeedback.trim().length >= MIN_CHARS);

  const handleSubmitAssignment = async (e) => {
    if (e) e.preventDefault();
    if (!isFeedbackValid) {
      setFeedbackError(true);
      return;
    }
    setFeedbackError(false);

    const newRecord = {
      ...currentValidation,
      studentName: currentUser?.name || currentValidation.studentName || 'Tally Student',
      studentAccessCode: currentUser?.accessCode || currentUser?.username || currentValidation.studentAccessCode || 'STUDENT',
      submissionNotes: submissionNotes.trim(),
      studentFeedback: studentFeedback.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: isStaff ? (currentValidation.status || 'approved') : 'pending'
    };

    const updated = saveAssignmentValidation(currentModuleId, newRecord);
    if (updated) {
      setValidations(updated);
    }
    setIsSubmittedSuccess(true);

    // If backend student API exists, record the task
    if (currentUser?.studentId) {
      try {
        await fetch(`/api/students/${currentUser.studentId}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: currentModuleId,
            tabId: 'assignment',
            taskUrl: '',
            taskText: `[Tally Learning Reflection]: ${studentFeedback.trim()}${submissionNotes.trim() ? `\n\n[Solutions / Entry Notes]:\n${submissionNotes.trim()}` : ''}`
          })
        });
      } catch (err) {
        console.error('Task API error:', err);
      }
    }
  };

  // Next Module navigation determination
  const nextModId = moduleConfig?.nextModuleId;
  const nextModTitle = moduleConfig?.nextModuleTitle || 'Next Day';
  const isNextLocked = nextModId ? isModuleLocked('tally_prime', nextModId, validations, currentUser) : false;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Course Title Banner */}
      <div style={{ background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', padding: '2rem', borderRadius: '16px', color: 'white', marginBottom: '2rem', boxShadow: '0 8px 20px rgba(5,150,105,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.8rem' }}>
              📅 {dayId.replace('day', 'Day ').replace('tally_prime_module', 'Day ')} of Tally Prime
            </span>
            <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800 }}>{dayData.title}</h1>
          </div>
          {currentValidation?.status === 'approved' && (
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
              <CheckCircle size={18} color="#86efac" /> Staff Approved
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: OVERVIEW & CONCEPT */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            {/* Objectives */}
            <div className="panel" style={{ borderLeft: '5px solid #059669', marginBottom: '2rem', background: '#f8fafc' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                <Target size={20} color="#059669" /> What You Will Learn Today
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.98rem' }}>
                {dayData.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Core Explanation Sections */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.2rem', fontSize: '1.3rem', fontWeight: 800 }}>
                📖 Lesson Notes & Fundamentals
              </h3>
              
              {dayData.explanationSections ? (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {dayData.explanationSections.map((sec, idx) => {
                    if (sec.type === 'comparison') {
                      return (
                        <div key={idx} style={{ background: sec.bgColor || 'white', border: `1px solid ${sec.color}25`, borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 800, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {renderSectionIcon(sec.icon, sec.color)} {sec.title}
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                              <strong style={{ color: sec.color, display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>{sec.leftTitle}</strong>
                              <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{sec.leftDesc}</p>
                            </div>
                            <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                              <strong style={{ color: '#059669', display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>{sec.rightTitle}</strong>
                              <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{sec.rightDesc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '1.2rem', background: sec.bgColor || 'white', border: `1px solid ${sec.color}15`, borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ background: `${sec.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0 }}>
                          {renderSectionIcon(sec.icon, sec.color)}
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800, fontSize: '1.1rem' }}>{sec.title}</h4>
                          <p style={{ margin: 0, color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{sec.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {dayData.explanation}
                </div>
              )}
            </div>

            {/* Real World Example */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 800 }}>
                💼 Real-World Business Scenario
              </h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {dayData.realWorldExample}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Proceed to Practical <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TALLY PRACTICAL */}
        {activeTab === 'practical' && (
          <motion.div
            key="practical"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div style={{ background: '#fffbeb', borderLeft: '5px solid #d97706', padding: '1.2rem', borderRadius: '8px', color: '#b45309', fontSize: '0.92rem', marginBottom: '2rem' }}>
              <strong>⚠️ Course Mode Reminder (Educational Mode):</strong> Practice these transactions using dates <strong>1st, 2nd, or 31st</strong> in your free Tally software to ensure compatibility.
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <Terminal size={20} color="#059669" /> Step-by-Step Tally Practice Walkthrough
              </h3>
              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.2rem', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {dayData.demonstration}
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontWeight: 800 }}>🎯 Today's Hands-on Goal</h4>
              <p style={{ margin: 0, color: '#14532d', fontSize: '0.95rem', lineHeight: 1.6 }}>{dayData.handsOnTask}</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('overview')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('ai_activity')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Proceed to AI Activity <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: AI ACTIVITY */}
        {activeTab === 'ai_activity' && (
          <motion.div
            key="ai_activity"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', boxShadow: '0 6px 15px rgba(37,99,235,0.2)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                <Sparkles size={22} color="#93c5fd" /> AI Accounting Challenge & Assistant
              </h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Copy the prompt below and paste it into your AI Tutor or ChatGPT to test your transaction classifications and get personalized tutor feedback.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.8rem', fontSize: '1rem' }}>
                📋 Copy-Paste Prompt Template:
              </strong>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '10px', color: '#334155', fontSize: '0.92rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {dayData.aiActivity}
              </div>
              {openAITutor && (
                <button
                  onClick={() => openAITutor(dayData.aiActivity)}
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#2563eb' }}
                >
                  <Bot size={16} /> Open Prompt in AI Tutor
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Proceed to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 4: ASSIGNMENT & FEEDBACK */}
        {activeTab === 'assignment' && (
          <motion.div
            key="assignment"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            {/* Homework Assignment Tasks */}
            <div className="panel" style={{ borderTop: '5px solid #059669', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                <ClipboardList size={22} color="#059669" /> Daily Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {dayData.assignment}
              </p>
            </div>

            {/* Submission Status Alert */}
            {currentValidation?.status && (
              <div style={{
                padding: '1.2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid',
                background: currentValidation.status === 'approved' ? '#f0fdf4' : currentValidation.status === 'rejected' ? '#fef2f2' : '#fffbeb',
                borderColor: currentValidation.status === 'approved' ? '#86efac' : currentValidation.status === 'rejected' ? '#fca5a5' : '#fde047',
                color: currentValidation.status === 'approved' ? '#166534' : currentValidation.status === 'rejected' ? '#991b1b' : '#854d0e',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1rem', marginBottom: '0.4rem' }}>
                  {currentValidation.status === 'approved' && <><CheckCircle size={18} /> Staff Evaluation: Approved ✅</>}
                  {currentValidation.status === 'pending' && <><Clock size={18} /> Assignment Submitted — Pending Staff Evaluation ⏳</>}
                  {currentValidation.status === 'rejected' && <><AlertTriangle size={18} /> Revision Requested by Staff ⚠️</>}
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {currentValidation.status === 'approved' && 'Your assignment and reflection have been approved. Next day is fully unlocked!'}
                  {currentValidation.status === 'pending' && 'Your assignment has been recorded! Staff will evaluate your answers to permanently verify completion.'}
                  {currentValidation.status === 'rejected' && (currentValidation.staffFeedback || 'Please refine your submission answers and resubmit.')}
                </div>
              </div>
            )}

            {/* Submission Form */}
            <form onSubmit={handleSubmitAssignment} style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 800, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={18} color="#059669" /> Submit Assignment Solutions & Student Feedback
              </h4>

              {/* Assignment Solutions Box */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 700, color: '#334155', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                  1. Practical Solutions & Entry Answers:
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Enter your journal entries, debits/credits, group folders, or Trial Balance totals here..."
                  rows={4}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>

              {/* Student Feedback & Learning Reflection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 700, color: '#334155', fontSize: '0.92rem' }}>
                    2. Learning Reflection & Feedback (Required min 50 characters):
                  </label>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: studentFeedback.trim().length >= MIN_CHARS ? '#10b981' : '#dc2626' }}>
                    {studentFeedback.trim().length} / {MIN_CHARS} chars
                  </span>
                </div>
                <textarea
                  value={studentFeedback}
                  onChange={(e) => setStudentFeedback(e.target.value)}
                  placeholder="Write a brief reflection on what you learned today in Tally Prime, what was easy, and what you practiced..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: feedbackError ? '2px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
                {feedbackError && (
                  <p style={{ color: '#dc2626', fontSize: '0.84rem', marginTop: '0.4rem', fontWeight: 600 }}>
                    ⚠️ Please provide at least {MIN_CHARS} characters of learning reflection before submitting for staff evaluation.
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.7rem 1.6rem',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(5,150,105,0.2)'
                  }}
                >
                  <Send size={16} /> Submit for Staff Review & Unlock Next Day
                </button>

                {isSubmittedSuccess && (
                  <span style={{ color: '#166534', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> Successfully Submitted!
                  </span>
                )}
              </div>
            </form>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('ai_activity')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Take Quick Quiz <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 5: QUICK QUIZ WITH INSTANT FEEDBACK */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', fontWeight: 800 }}>
                  <HelpCircle size={24} color="#059669" /> Daily Assessment Quiz ({dayData.quiz.length} Questions)
                </h3>
                <p style={{ margin: '0.3rem 0 0 0', color: '#64748b', fontSize: '0.92rem' }}>
                  Select an answer for each question and click <strong>Check Answer</strong> for immediate explanation.
                </p>
              </div>

              {totalChecked > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: 800, color: '#166534' }}>
                    Score: {currentScore} / {dayData.quiz.length} ({Math.round((currentScore / dayData.quiz.length) * 100)}%)
                  </div>
                  <button onClick={handleResetQuiz} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                    <RotateCcw size={14} /> Retry
                  </button>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {dayData.quiz.map((qItem, qIdx) => {
                const isSelected = quizSelected[qIdx] !== undefined;
                const isChecked = Boolean(quizChecked[qIdx]);
                const chosenOpt = quizSelected[qIdx];
                const isCorrect = isChecked && chosenOpt === qItem.ans;

                return (
                  <div key={qIdx} style={{ background: '#f8fafc', padding: '1.6rem', borderRadius: '16px', border: isChecked ? (isCorrect ? '2px solid #22c55e' : '2px solid #ef4444') : '1px solid #e2e8f0', transition: 'all 0.2s' }}>
                    <strong style={{ color: '#0f172a', display: 'block', fontSize: '1.05rem', marginBottom: '1.2rem', lineHeight: 1.5 }}>
                      Q{qIdx + 1}: {qItem.q}
                    </strong>
                    
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                      {qItem.opts.map((opt, optIdx) => {
                        const isThisChosen = chosenOpt === optIdx;
                        const isThisCorrect = optIdx === qItem.ans;

                        let optBg = 'white';
                        let optBorder = '1px solid #cbd5e1';
                        let optColor = '#334155';
                        let optFontWeight = 500;

                        if (isChecked) {
                          if (isThisCorrect) {
                            optBg = '#f0fdf4';
                            optBorder = '2px solid #22c55e';
                            optColor = '#166534';
                            optFontWeight = 700;
                          } else if (isThisChosen) {
                            optBg = '#fef2f2';
                            optBorder = '2px solid #ef4444';
                            optColor = '#991b1b';
                            optFontWeight = 700;
                          }
                        } else if (isThisChosen) {
                          optBg = '#eff6ff';
                          optBorder = '2px solid #3b82f6';
                          optColor = '#1d4ed8';
                          optFontWeight = 700;
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            style={{
                              background: optBg,
                              border: optBorder,
                              color: optColor,
                              fontWeight: optFontWeight,
                              padding: '0.8rem 1.2rem',
                              borderRadius: '10px',
                              cursor: isChecked ? 'default' : 'pointer',
                              fontSize: '0.92rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ 
                                display: 'inline-flex', 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '50%', 
                                background: isThisChosen ? (isChecked ? (isThisCorrect ? '#16a34a' : '#dc2626') : '#2563eb') : '#f1f5f9',
                                color: isThisChosen ? 'white' : '#64748b',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '0.8rem',
                                fontWeight: 800
                              }}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              {opt}
                            </span>
                            {isChecked && isThisCorrect && <Check size={18} color="#16a34a" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Check Answer Button */}
                    {!isChecked && isSelected && (
                      <button
                        onClick={() => handleCheckQuizQuestion(qIdx)}
                        style={{
                          marginTop: '0.5rem',
                          background: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1.4rem',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}
                      >
                        Check Answer
                      </button>
                    )}

                    {/* Instant Feedback & Accounting Explanation */}
                    {isChecked && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 800, color: isCorrect ? '#15803d' : '#dc2626', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                          {isCorrect ? '✅ Correct Answer!' : `❌ Incorrect. Correct Answer: Option ${String.fromCharCode(65 + qItem.ans)} (${qItem.opts[qItem.ans]})`}
                        </div>
                        {qItem.exp && (
                          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.8rem', color: '#166534', fontSize: '0.88rem', lineHeight: 1.5 }}>
                            <strong>💡 Accounting Rule:</strong> {qItem.exp}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('reflection')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Proceed to Self Check <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 6: REFLECTION & UNLOCK STATUS */}
        {activeTab === 'reflection' && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div className="panel" style={{ borderTop: '5px solid #059669', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                <CheckCircle size={22} color="#059669" /> Daily Student Self Check
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Check each item you feel confident about. If you leave any item unchecked, we recommend reviewing that concept or asking the AI Tutor.
              </p>

              <div style={{ display: 'grid', gap: '0.8rem' }}>
                {dayData.reflection.map((ref, idx) => {
                  const isChecked = !!reflectionChecks[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleReflectionToggle(idx)}
                      style={{
                        background: isChecked ? '#f0fdf4' : 'white',
                        border: `1px solid ${isChecked ? '#bbf7d0' : '#cbd5e1'}`,
                        padding: '1rem 1.2rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: '2px solid',
                        borderColor: isChecked ? '#10b981' : '#64748b',
                        background: isChecked ? '#10b981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s'
                      }}>
                        {isChecked && <Check size={14} color="white" />}
                      </div>
                      <span style={{ color: isChecked ? '#065f46' : '#334155', fontSize: '0.95rem', fontWeight: 600 }}>
                        {ref}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Locking & Next Day Flow Banner */}
            {nextModId && (
              <div style={{
                background: isNextLocked ? '#fffbeb' : '#f0fdf4',
                border: isNextLocked ? '1px solid #fde047' : '1px solid #86efac',
                padding: '1.4rem',
                borderRadius: '14px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {isNextLocked ? <Lock size={22} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} /> : <Unlock size={22} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />}
                <div>
                  <strong style={{ color: isNextLocked ? '#92400e' : '#166534', fontSize: '1rem', display: 'block', marginBottom: '0.3rem' }}>
                    {isNextLocked ? `🔒 ${nextModTitle} is currently locked` : `🔓 ${nextModTitle} is unlocked!`}
                  </strong>
                  <p style={{ margin: 0, color: isNextLocked ? '#78350f' : '#14532d', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {isNextLocked ? (
                      currentValidation?.status === 'pending' ?
                        'Your assignment is submitted and currently under review by instructors. Once evaluated, next day will be unlocked permanently.' :
                        'Submit your assignment & feedback in the Assignment tab to send it for staff evaluation and unlock the next day.'
                    ) : (
                      'Great job! You have satisfied all prerequisites. You can proceed to the next module.'
                    )}
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('quiz')}>Back to Quiz</button>
              
              {nextModId ? (
                <button 
                  className="btn btn-primary" 
                  onClick={() => onNavigate(nextModId, 'overview')} 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Proceed to {nextModTitle} <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  onClick={() => onNavigate('dashboard', '')} 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Finish Course! Return to Dashboard <CheckCircle size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
