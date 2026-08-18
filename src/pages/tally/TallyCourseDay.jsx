import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Play, Bot, FileText, CheckCircle, HelpCircle, 
  ArrowRight, Sparkles, Check, ClipboardList, Target, Terminal,
  Briefcase, RefreshCw, Send
} from 'lucide-react';
import { tallyDaysData } from './tallyCourseData';

export default function TallyCourseDay({ dayId, onNavigate, openAITutor, onSubmitTask }) {
  const dayData = tallyDaysData[dayId] || tallyDaysData['day1'];

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
  
  const [activeTab, setActiveTab] = useState('overview');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [reflectionChecks, setReflectionChecks] = useState({});

  // Reset page states when dayId changes
  useEffect(() => {
    setActiveTab('overview');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setReflectionChecks({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dayId]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleReflectionToggle = (idx) => {
    setReflectionChecks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tabs = [
    { id: 'overview', label: '📖 Overview & Concept', icon: <BookOpen size={16} /> },
    { id: 'practical', label: '💻 Tally Practical', icon: <Play size={16} /> },
    { id: 'ai_activity', label: '🤖 AI Activity', icon: <Bot size={16} /> },
    { id: 'assignment', label: '📝 Assignment', icon: <FileText size={16} /> },
    { id: 'quiz', label: '✍️ Quick Quiz', icon: <HelpCircle size={16} /> },
    { id: 'reflection', label: '🎯 Self Check', icon: <CheckCircle size={16} /> }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Course Title Banner */}
      <div style={{ background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', padding: '2rem', borderRadius: '16px', color: 'white', marginBottom: '2rem', boxShadow: '0 8px 20px rgba(5,150,105,0.15)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.8rem' }}>
          📅 {dayId.replace('day', 'Day ')} of 5
        </span>
        <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800 }}>{dayData.title}</h1>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isActive ? '#059669' : 'transparent',
                color: isActive ? 'white' : '#475569',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
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
            {/* Learning Objectives */}
            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #059669', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <Target size={20} /> Learning Objectives
              </h3>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#047857', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {dayData.objectives.map((obj, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Concept Explanation */}
            <div className="panel" style={{ marginBottom: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 800 }}>
                <BookOpen size={24} color="#059669" /> Concept Explanation
              </h3>
              
              {dayData.explanationSections ? (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {dayData.explanationSections.map((sec, idx) => {
                    if (sec.type === 'comparison') {
                      return (
                        <div key={idx} style={{ background: sec.bgColor, border: `1px solid ${sec.color}22`, borderRadius: '12px', padding: '1.5rem' }}>
                          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 800 }}>
                            {renderSectionIcon(sec.icon, sec.color)}
                            {sec.title}
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1.2rem' }}>
                              <h5 style={{ margin: '0 0 0.5rem 0', color: '#991b1b', fontWeight: 700, fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sec.leftTitle}</h5>
                              <p style={{ margin: 0, color: '#7f1d1d', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{sec.leftDesc}</p>
                            </div>
                            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '1.2rem' }}>
                              <h5 style={{ margin: '0 0 0.5rem 0', color: '#065f46', fontWeight: 700, fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sec.rightTitle}</h5>
                              <p style={{ margin: 0, color: '#064e3b', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{sec.rightDesc}</p>
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

            <div className="panel" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                <Terminal size={20} color="#059669" /> Tally Step-by-Step Demonstration
              </h3>
              <div style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: '#f8fafc', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                {dayData.demonstration}
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: '12px', color: '#065f46', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.1rem', fontWeight: 800 }}>⚡ Hands-on Tally Task</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                {dayData.handsOnTask}
              </p>
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
            <div style={{ background: '#eff6ff', borderLeft: '5px solid #3b82f6', padding: '1.5rem', borderRadius: '12px', color: '#1e40af', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <Sparkles size={20} color="#3b82f6" /> AI-Assisted Accounting Activity
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                AI is your learning assistant, not the final authority. Copy and paste the prompt template below into ChatGPT, Claude, or Gemini to analyze classifications or verify equations.
              </p>
            </div>

            <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.8rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', position: 'relative', marginBottom: '2rem', border: '1px solid #1e293b' }}>
              <span style={{ position: 'absolute', top: '10px', right: '12px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>PROMPT TEMPLATE</span>
              {dayData.aiActivity}
            </div>

            <div style={{ textAlign: 'center', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.95rem' }}>Having doubts or need custom scenarios? Launch the AI Tutor directly:</p>
              <button className="btn btn-outline" onClick={() => openAITutor(`I am on ${dayId.replace('day', 'Day ')} learning "${dayData.title}". Let's practice accounting calculations together.`)}>
                💬 Ask AI Tutor
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Proceed to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 4: ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div
            key="assignment"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div className="panel" style={{ borderTop: '5px solid #059669', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                <ClipboardList size={22} color="#059669" /> Daily Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {dayData.assignment}
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <div>
                  <strong>Submission Instructions:</strong> Enter your solutions or copy-paste your accounting entry details into the **Task Submission Box** below.
                </div>
                {onSubmitTask && (
                  <button 
                    onClick={onSubmitTask} 
                    className="btn btn-primary" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '0.6rem 1.2rem',
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(5,150,105,0.2)',
                      fontWeight: 700
                    }}
                  >
                    <Send size={16} /> Submit Assignment Task
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('ai_activity')}>Back</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Take Quick Quiz <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 5: QUICK QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
              <HelpCircle size={22} color="#059669" /> Quick Concept Check Quiz
            </h3>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {dayData.quiz.map((qItem, qIdx) => (
                <div key={qIdx} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#0f172a', display: 'block', fontSize: '1.05rem', marginBottom: '1rem' }}>
                    Q{qIdx + 1}: {qItem.q}
                  </strong>
                  
                  <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {qItem.opts.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = optIdx === qItem.ans;
                      
                      let optionBg = 'white';
                      let optionBorder = '#e2e8f0';
                      let optionColor = '#475569';

                      if (isSelected) {
                        optionBg = '#e0f2fe';
                        optionBorder = '#0ea5e9';
                        optionColor = '#0369a1';
                      }

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionBg = '#d1fae5';
                          optionBorder = '#10b981';
                          optionColor = '#065f46';
                        } else if (isSelected) {
                          optionBg = '#fee2e2';
                          optionBorder = '#ef4444';
                          optionColor = '#991b1b';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizSelect(qIdx, optIdx)}
                          disabled={quizSubmitted}
                          style={{
                            textAlign: 'left',
                            background: optionBg,
                            border: `1px solid ${optionBorder}`,
                            color: optionColor,
                            padding: '0.8rem 1.2rem',
                            borderRadius: '10px',
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            fontSize: '0.92rem',
                            fontWeight: isSelected ? 700 : 500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check size={16} color="#10b981" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')}>Back</button>
              {!quizSubmitted ? (
                <button className="btn btn-primary" onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < dayData.quiz.length}>
                  Submit Answers
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => handleTabChange('reflection')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Proceed to Self Check <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 6: REFLECTION / SELF CHECK */}
        {activeTab === 'reflection' && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="learning-card"
          >
            <div className="panel" style={{ borderTop: '5px solid #059669', marginBottom: '2.5rem' }}>
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

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('quiz')}>Back</button>
              
              {/* Next day calculation flow */}
              {(() => {
                const dayNum = parseInt(dayId.replace('day', ''));
                // tally_project1 navigates to day5
                if (dayId === 'tally_project1') {
                  return (
                    <button className="btn btn-primary" onClick={() => onNavigate('tally_prime_module1', 'day5')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Proceed to Day 5 <ArrowRight size={16} />
                    </button>
                  );
                } else if (!isNaN(dayNum) && dayNum < 5) {
                  const nextDayId = dayNum === 4 ? 'tally_project1' : `day${dayNum + 1}`;
                  return (
                    <button className="btn btn-primary" onClick={() => onNavigate('tally_prime_module1', nextDayId)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {dayNum === 4 ? 'Proceed to Mini Project' : `Proceed to Day ${dayNum + 1}`} <ArrowRight size={16} />
                    </button>
                  );
                } else {
                  return (
                    <button className="btn btn-primary" onClick={() => onNavigate('dashboard', '')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Finish Course! Return to Dashboard <CheckCircle size={16} />
                    </button>
                  );
                }
              })()}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
