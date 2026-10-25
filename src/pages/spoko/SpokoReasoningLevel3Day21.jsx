import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
  Clock, Sparkles, BookOpen, Layers, Target, Zap, HelpCircle,
  AlertTriangle, FileText, CheckCircle, Scale, Eye, GitBranch,
  ShieldAlert, Award, CheckSquare, MessageSquare, Briefcase,
  ChevronDown, ChevronRight, Check, Hash, RefreshCw, FastForward,
  Filter, Lock, Unlock, Play, Pause, Key, Compass, Terminal,
  Cpu, Activity, ListFilter, Columns, Table, ArrowUp, ArrowDown,
  Printer, Users, Heart, Share2, Link, Shield, ShieldCheck,
  CircleDot, BarChart3, PieChart, TrendingUp, Calculator, Sliders,
  BookmarkCheck, Flag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day21Overview,
  section1CourseRevision,
  section2ProblemFramework,
  section3MixedChallenge,
  section4CaseStudy,
  section5ExamStrategy,
  section6FinalAssessment,
  section8RevisionSheet
} from '../../data/reasoningLevel3Day21.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day21({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d21_progress_${userKey}`;

  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for progress tracking
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : {
        completedSections: ['overview'],
        assessmentScore: 0,
        assessmentPercentage: 0,
        assessmentPassed: false,
        assessmentSubmitted: {},
        assessmentAnswers: {},
        assessmentFinished: false,
        completedCourse: false,
        completedDay: false
      };
    } catch {
      return {
        completedSections: ['overview'],
        assessmentScore: 0,
        assessmentPercentage: 0,
        assessmentPassed: false,
        assessmentSubmitted: {},
        assessmentAnswers: {},
        assessmentFinished: false,
        completedCourse: false,
        completedDay: false
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Level 3 Day 21 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync with LMS backend API if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d21:day21';
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonKey,
          completed: true,
          score: savedProgress.assessmentScore,
          total: 50
        })
      }).catch(err => console.log('LMS sync skipped/offline:', err));
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, session]);

  const markSectionComplete = (secId) => {
    setSavedProgress(prev => {
      const existing = prev.completedSections || [];
      if (!existing.includes(secId)) {
        return { ...prev, completedSections: [...existing, secId] };
      }
      return prev;
    });
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionComplete(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l3_d21', tabId);
    }
  };

  // Section 1: Level tabs
  const [activeRevisionLevel, setActiveRevisionLevel] = useState(0);

  // Section 2: Framework strategy drills
  const [frameworkAnswers, setFrameworkAnswers] = useState({});
  const [frameworkSubmitted, setFrameworkSubmitted] = useState({});

  const handleFrameworkSelect = (qId, optIdx) => {
    if (frameworkSubmitted[qId]) return;
    setFrameworkAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleFrameworkSubmit = (qId) => {
    if (frameworkAnswers[qId] === undefined) return;
    setFrameworkSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  // Section 3: Mixed Practice Challenge
  const [mixedAnswers, setMixedAnswers] = useState({});
  const [mixedSubmitted, setMixedSubmitted] = useState({});

  const handleMixedSelect = (qId, optIdx) => {
    if (mixedSubmitted[qId]) return;
    setMixedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleMixedSubmit = (qId) => {
    if (mixedAnswers[qId] === undefined) return;
    setMixedSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  const handleMixedRetry = (qId) => {
    setMixedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setMixedSubmitted(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Section 4: Integrated Case Study
  const [caseStudyText, setCaseStudyText] = useState('');
  const [caseStudyShowSolution, setCaseStudyShowSolution] = useState(false);

  // Section 6: Final 50-Question Assessment state
  const [assessAnswers, setAssessAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessMarkedForReview, setAssessMarkedForReview] = useState({});
  const [assessSubmitted, setAssessSubmitted] = useState(savedProgress.assessmentFinished || false);
  const [assessTimeRemaining, setAssessTimeRemaining] = useState(60 * 60);
  const [assessTimerActive, setAssessTimerActive] = useState(false);
  const [currentAssessQIdx, setCurrentAssessQIdx] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (assessTimerActive && assessTimeRemaining > 0 && !assessSubmitted) {
      interval = setInterval(() => {
        setAssessTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [assessTimerActive, assessTimeRemaining, assessSubmitted]);

  const handleStartAssessment = () => {
    setAssessTimerActive(true);
  };

  const handleAssessSelect = (qId, optIdx) => {
    if (assessSubmitted) return;
    setAssessAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const toggleMarkForReview = (qId) => {
    setAssessMarkedForReview(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleAutoSubmitAssessment = () => {
    calculateAndSaveScore();
  };

  const calculateAndSaveScore = () => {
    let correctCount = 0;
    section6FinalAssessment.questions.forEach(q => {
      if (assessAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / section6FinalAssessment.questions.length) * 100);
    const passed = correctCount >= section6FinalAssessment.passingScore;

    setAssessSubmitted(true);
    setAssessTimerActive(false);

    setSavedProgress(prev => ({
      ...prev,
      assessmentScore: correctCount,
      assessmentPercentage: percentage,
      assessmentPassed: passed,
      assessmentAnswers: assessAnswers,
      assessmentFinished: true,
      completedCourse: passed,
      completedDay: true,
      completedSections: [...new Set([...(prev.completedSections || []), 'assessment', 'review', 'summary', 'graduation'])]
    }));

    if (passed) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleRetakeAssessment = () => {
    if (window.confirm("Are you sure you want to retake the Final Comprehensive Assessment? Previous answers will be reset.")) {
      setAssessAnswers({});
      setAssessMarkedForReview({});
      setAssessSubmitted(false);
      setAssessTimeRemaining(60 * 60);
      setAssessTimerActive(true);
      setCurrentAssessQIdx(0);
    }
  };

  // Section 8: Rapid-Fire Drills state
  const [revealedRapidFire, setRevealedRapidFire] = useState({});
  const toggleRapidFire = (id) => {
    setRevealedRapidFire(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Compute topic-wise breakdown for Section 7 Personalized Review
  const computeTopicBreakdown = () => {
    const topicStats = {};
    section6FinalAssessment.questions.forEach(q => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total++;
      if (assessAnswers[q.id] === q.correct) {
        topicStats[q.topic].correct++;
      }
    });
    return topicStats;
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
    { id: 'section1', label: '1. Course-Wide Revision', icon: <RefreshCw size={16} /> },
    { id: 'section2', label: '2. 6-Step Framework', icon: <Target size={16} /> },
    { id: 'section3', label: '3. Mixed Challenge (15 Qs)', icon: <Layers size={16} /> },
    { id: 'section4', label: '4. Integrated Case Study', icon: <Briefcase size={16} /> },
    { id: 'section5', label: '5. Exam Time Strategy', icon: <Clock size={16} /> },
    { id: 'assessment', label: '6. Final Assessment (50 Qs)', icon: <Award size={16} /> },
    { id: 'review', label: '7. Performance Review', icon: <Activity size={16} /> },
    { id: 'summary', label: '8. Revision Sheet & Drills', icon: <FileText size={16} /> },
    { id: 'graduation', label: '9. Course Completion 🎉', icon: <Sparkles size={16} /> }
  ];

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#0f172a',
      background: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* 🧭 HEADER & BRANDING */}
      <header style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              <Brain size={14} /> Alpha Fly Computer Education • Logical Reasoning Capstone
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', lineHeight: 1.2 }}>
              Level 3 – Advanced Day 10: Comprehensive Logical Reasoning Challenge & Final Assessment
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', maxWidth: '850px', lineHeight: 1.5 }}>
              The definitive capstone module synthesizing all 3 levels of Logical Reasoning: comprehensive 50-question final exam, 6-step analytical framework, integrated operational case study, and personalized diagnostic reporting.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            minWidth: '170px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>
              Final Exam Status
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '0.25rem' }}>
              {savedProgress.completedCourse ? 'GRADUATED 🏆' : savedProgress.assessmentFinished ? 'COMPLETED' : 'IN PROGRESS'}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>
              Final Score: {savedProgress.assessmentScore}/50 ({savedProgress.assessmentPercentage}%)
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION SCROLL BAR */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          marginTop: '1.75rem',
          paddingBottom: '0.5rem'
        }}>
          {navTabs.map(tab => {
            const isActive = currentTab === tab.id;
            const isCompleted = (savedProgress.completedSections || []).includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                  color: isActive ? '#0369a1' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {isCompleted && !isActive && <CheckCircle size={14} style={{ color: '#86efac' }} />}
              </button>
            );
          })}
        </div>
      </header>

      {/* 🚀 TAB CONTENT CONTAINER */}
      <main>
        <AnimatePresence mode="wait">

          {/* TAB 0: OVERVIEW */}
          {currentTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Capstone Course Specifications
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {day21Overview.title}
                    </h2>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                    <div><strong>Duration:</strong> {day21Overview.duration}</div>
                    <div><strong>Difficulty:</strong> <span style={{ color: '#dc2626', fontWeight: 700 }}>{day21Overview.difficulty}</span></div>
                    <div><strong>Prerequisite:</strong> {day21Overview.prerequisite}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  🎯 Capstone Master Learning Objectives
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '0.85rem' }}>
                  {day21Overview.learningObjectives.map((obj, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '10px',
                        borderLeft: '4px solid #0284c7',
                        fontSize: '0.9rem',
                        lineHeight: 1.45,
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem' }}>#{i + 1}</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontWeight: 800, fontSize: '0.95rem' }}>
                    🏆 The Pinnacle of Logical Reasoning at Alpha Fly Computer Education
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d', lineHeight: 1.5 }}>
                    "You have journeyed through 21 intensive days of structured deduction—from fundamental number series to multi-variable logic grids, root cause analysis, decision trees, and abstract non-verbal matrices. Today is the synthesis: prove your analytical precision on the 50-question final examination and earn your full course completion."
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Start Section 1: Course-Wide Revision <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: SECTION 1 - COURSE-WIDE REVISION */}
          {currentTab === 'section1' && (
            <motion.div
              key="section1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  3-Tier Course Review
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section1CourseRevision.title}
                </h2>

                {/* LEVEL TABS */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {section1CourseRevision.levels.map((lvl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveRevisionLevel(idx)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeRevisionLevel === idx ? '#0284c7' : '#f1f5f9',
                        color: activeRevisionLevel === idx ? '#ffffff' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      {lvl.level}
                    </button>
                  ))}
                </div>

                {/* TOPICS ACCORDION IN ACTIVE LEVEL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  {section1CourseRevision.levels[activeRevisionLevel].topics.map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.5rem'
                      }}
                    >
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {t.name}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.45, marginBottom: '1rem' }}>
                        {t.summary}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.85rem', borderRadius: '8px' }}>
                          <strong style={{ color: '#0369a1', fontSize: '0.8rem', textTransform: 'uppercase' }}>Key Solving Strategy:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#0c4a6e', marginTop: '0.2rem' }}>{t.strategy}</div>
                        </div>
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.85rem', borderRadius: '8px' }}>
                          <strong style={{ color: '#dc2626', fontSize: '0.8rem', textTransform: 'uppercase' }}>Common Pitfall / Trap:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#991b1b', marginTop: '0.2rem' }}>{t.mistake}</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem', color: '#334155', marginBottom: '1rem' }}>
                        <strong>Master Example:</strong> {t.example}
                      </div>

                      {/* QUICK CHECK DRILL */}
                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                          🎯 Quick Revision Check:
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600, marginBottom: '0.5rem' }}>
                          {t.drill.q}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                          {t.drill.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              style={{
                                background: oIdx === t.drill.correct ? '#bbf7d0' : '#ffffff',
                                border: '1px solid #86efac',
                                padding: '0.45rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.82rem',
                                color: oIdx === t.drill.correct ? '#14532d' : '#475569',
                                fontWeight: oIdx === t.drill.correct ? 700 : 500
                              }}
                            >
                              {getLetter(oIdx)}. {opt} {oIdx === t.drill.correct && '✓'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('overview')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Overview
                  </button>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 2: 6-Step Framework <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECTION 2 - 6-STEP FRAMEWORK */}
          {currentTab === 'section2' && (
            <motion.div
              key="section2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Standardized Cognitive Protocol
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section2ProblemFramework.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section2ProblemFramework.introduction}
                </p>

                {/* THE SIX STEPS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The Universal Six-Step Solving Architecture
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section2ProblemFramework.sixSteps.map((st, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {st.step}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {st.action}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WHEN TO USE WHICH MODEL */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Representation Model Selector: Choosing the Right Diagram
                </h3>
                <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Problem Domain</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Recommended Representation</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Cognitive Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section2ProblemFramework.representationSelector.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{row.problemType}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#0284c7', fontWeight: 800 }}>{row.model}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{row.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5 STRATEGY SELECTION DRILLS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  3. Strategy Selection Drills
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section2ProblemFramework.strategyDrills.map((drill, idx) => {
                    const isSubmitted = frameworkSubmitted[drill.id];
                    const selectedOpt = frameworkAnswers[drill.id];
                    const isCorrect = isSubmitted && selectedOpt === drill.correct;

                    return (
                      <div
                        key={drill.id}
                        style={{
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          STRATEGY SCENARIO {idx + 1}
                        </div>
                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem 0', lineHeight: 1.45 }}>
                          {drill.scenario}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                          {drill.options.map((opt, oIdx) => {
                            let btnBg = '#ffffff';
                            let borderCol = '#cbd5e1';
                            let textCol = '#0f172a';

                            if (selectedOpt === oIdx) {
                              btnBg = '#e0f2fe';
                              borderCol = '#0284c7';
                              textCol = '#0369a1';
                            }
                            if (isSubmitted) {
                              if (oIdx === drill.correct) {
                                btnBg = '#dcfce7';
                                borderCol = '#16a34a';
                                textCol = '#166534';
                              } else if (selectedOpt === oIdx) {
                                btnBg = '#fee2e2';
                                borderCol = '#dc2626';
                                textCol = '#991b1b';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handleFrameworkSelect(drill.id, oIdx)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${borderCol}`,
                                  color: textCol,
                                  borderRadius: '8px',
                                  padding: '0.75rem 1rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  fontWeight: selectedOpt === oIdx ? 700 : 500,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  transition: 'all 0.15s'
                                }}
                              >
                                <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={selectedOpt === undefined}
                            onClick={() => handleFrameworkSubmit(drill.id)}
                            style={{
                              background: selectedOpt !== undefined ? '#0284c7' : '#94a3b8',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.5rem 1.25rem',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Verify Strategy
                          </button>
                        ) : (
                          <div style={{
                            background: isCorrect ? '#ecfdf5' : '#fef2f2',
                            border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                            borderRadius: '8px',
                            padding: '1rem',
                            fontSize: '0.85rem',
                            color: isCorrect ? '#065f46' : '#991b1b',
                            lineHeight: 1.45
                          }}>
                            <div style={{ fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                              {isCorrect ? 'Optimal Strategy Chosen!' : 'Sub-Optimal Representation'}
                            </div>
                            {drill.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 1
                  </button>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 3: Mixed Challenge <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SECTION 3 - MIXED CHALLENGE */}
          {currentTab === 'section3' && (
            <motion.div
              key="section3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Mixed Crucible
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
                  {section3MixedChallenge.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section3MixedChallenge.introduction}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {section3MixedChallenge.questions.map((q, idx) => {
                    const isSubmitted = mixedSubmitted[q.id];
                    const selectedOpt = mixedAnswers[q.id];
                    const isCorrect = isSubmitted && selectedOpt === q.correct;

                    return (
                      <div
                        key={q.id}
                        style={{
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '12px',
                          padding: '1.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                            QUESTION {idx + 1} OF 15 • {q.topic}
                          </span>
                          {isSubmitted && (
                            <span style={{
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              color: isCorrect ? '#166534' : '#991b1b',
                              background: isCorrect ? '#dcfce7' : '#fee2e2',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px'
                            }}>
                              {isCorrect ? 'CORRECT' : 'INCORRECT'}
                            </span>
                          )}
                        </div>

                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem 0', lineHeight: 1.45 }}>
                          {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {q.options.map((opt, oIdx) => {
                            let btnBg = '#ffffff';
                            let borderCol = '#cbd5e1';
                            let textCol = '#0f172a';

                            if (selectedOpt === oIdx) {
                              btnBg = '#e0f2fe';
                              borderCol = '#0284c7';
                              textCol = '#0369a1';
                            }
                            if (isSubmitted) {
                              if (oIdx === q.correct) {
                                btnBg = '#dcfce7';
                                borderCol = '#16a34a';
                                textCol = '#166534';
                              } else if (selectedOpt === oIdx) {
                                btnBg = '#fee2e2';
                                borderCol = '#dc2626';
                                textCol = '#991b1b';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handleMixedSelect(q.id, oIdx)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${borderCol}`,
                                  color: textCol,
                                  borderRadius: '8px',
                                  padding: '0.75rem 1rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  fontWeight: selectedOpt === oIdx ? 700 : 500,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  transition: 'all 0.15s'
                                }}
                              >
                                <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={selectedOpt === undefined}
                            onClick={() => handleMixedSubmit(q.id)}
                            style={{
                              background: selectedOpt !== undefined ? '#0284c7' : '#94a3b8',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.6rem 1.5rem',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{
                              background: isCorrect ? '#ecfdf5' : '#fef2f2',
                              border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                              borderRadius: '8px',
                              padding: '1rem',
                              fontSize: '0.88rem',
                              color: isCorrect ? '#065f46' : '#991b1b',
                              lineHeight: 1.45
                            }}>
                              <div style={{ fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                {isCorrect ? 'Step-by-Step Proof' : 'Diagnostic Explanation'}
                              </div>
                              {q.explanation}
                            </div>
                            <div>
                              <button
                                onClick={() => handleMixedRetry(q.id)}
                                style={{
                                  background: '#f1f5f9',
                                  color: '#475569',
                                  border: '1px solid #cbd5e1',
                                  padding: '0.45rem 1rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem'
                                }}
                              >
                                <RotateCcw size={14} /> Retry Question
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 2
                  </button>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 4: Integrated Case Study <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECTION 4 - INTEGRATED CASE STUDY */}
          {currentTab === 'section4' && (
            <motion.div
              key="section4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Integrated Capstone Case Study
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
                  {section4CaseStudy.title}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  {section4CaseStudy.disclaimer}
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.75rem', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                  {section4CaseStudy.scenarioOverview}
                </div>

                {/* TELEMETRY TABLE & SCHEDULING CONSTRAINTS */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                  1. Operational Telemetry & Scheduling Constraints
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Quarterly Admissions Performance
                    </div>
                    <div style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#334155' }}>
                      <div>• <strong>Quarter 1:</strong> 160 enquiries, 24 admissions (15.0%), 14h response latency, 82% follow-up rate.</div>
                      <div>• <strong>Quarter 2:</strong> 240 enquiries, 26 admissions (10.8%), 46h response latency, 51% follow-up rate.</div>
                      <div style={{ color: '#dc2626', fontWeight: 700, marginTop: '0.35rem' }}>• {section4CaseStudy.dataset.gap}</div>
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Tuesday Morning Lab Scheduling Rules
                    </div>
                    <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: '#334155' }}>
                      {section4CaseStudy.schedulingConstraints.map((c, cIdx) => (
                        <div key={cIdx}>• {c}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STUDENT WORKBENCH */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                  2. Student Integrated Investigation Workbench
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Draft your findings for the 7 investigation tasks in the workspace below, then click "Check Solution" to review the verified master report.
                </p>

                <textarea
                  rows={6}
                  value={caseStudyText}
                  onChange={(e) => setCaseStudyText(e.target.value)}
                  placeholder="Record your step-by-step reasoning: (1) Conversion shortfall calculation, (2) Evidence vs assumption check, (3) 5 Whys chain for 46h latency, (4) Tuesday lab allocations for A, C, D, (5) Syllogism validity check, and (6) Recommended CRM automation action plan..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    marginBottom: '1rem',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <button
                    onClick={() => setCaseStudyShowSolution(prev => !prev)}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.65rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {caseStudyShowSolution ? 'Hide Model Report' : 'Check Solution & Official Report'}
                  </button>
                </div>

                {caseStudyShowSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ background: '#f8fafc', border: '1.5px solid #0284c7', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      <CheckCircle2 size={18} /> Official Alpha Fly Integrated Case Findings
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#0284c7' }}>Tasks 1 & 2 (Conversion & Evidence):</strong> {section4CaseStudy.modelSolution.t1} {section4CaseStudy.modelSolution.t2}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#166534' }}>Task 3 (Root Cause):</strong> {section4CaseStudy.modelSolution.t3}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#0369a1' }}>Task 4 (Tuesday Lab Allocation):</strong> {section4CaseStudy.modelSolution.t4}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#7c3aed' }}>Tasks 5 & 6 (Syllogism & Decision Matrix):</strong> {section4CaseStudy.modelSolution.t5} {section4CaseStudy.modelSolution.t6}
                      </div>
                      <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '8px', border: '1px solid #a7f3d0', color: '#065f46', fontWeight: 700 }}>
                        🚀 Task 7 (Action & Primary KPI): {section4CaseStudy.modelSolution.t7}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 3
                  </button>
                  <button
                    onClick={() => handleTabChange('section5')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 5: Exam Strategy <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SECTION 5 - EXAM STRATEGY */}
          {currentTab === 'section5' && (
            <motion.div
              key="section5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Execution Tactics
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section5ExamStrategy.title}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section5ExamStrategy.principles.map((pr, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #0284c7', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                        {pr.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                        {pr.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  Interactive Time-Pacing Drills
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {section5ExamStrategy.timeExercises.map((drill, idx) => (
                    <div key={idx} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '1.25rem' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Pacing Scenario {idx + 1}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                        {drill.q}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
                        ✅ Recommended Strategy: {drill.options[drill.correct]}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.5rem', lineHeight: 1.4 }}>
                        {drill.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 4
                  </button>
                  <button
                    onClick={() => handleTabChange('assessment')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 6: Final Assessment (50 Qs) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: SECTION 6 - FINAL ASSESSMENT (50 QUESTIONS) */}
          {currentTab === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Official Comprehensive Capstone Exam
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {section6FinalAssessment.title}
                    </h2>
                  </div>

                  {/* 60-MIN COUNTDOWN TIMER */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: assessTimeRemaining < 600 ? '#fef2f2' : '#f0f9ff',
                    border: `1.5px solid ${assessTimeRemaining < 600 ? '#dc2626' : '#0284c7'}`,
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px'
                  }}>
                    <Clock size={20} color={assessTimeRemaining < 600 ? '#dc2626' : '#0284c7'} />
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: assessTimeRemaining < 600 ? '#dc2626' : '#0284c7', textTransform: 'uppercase' }}>
                        Time Remaining
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: assessTimeRemaining < 600 ? '#dc2626' : '#0284c7', fontFamily: 'monospace' }}>
                        {formatTime(assessTimeRemaining)}
                      </div>
                    </div>
                  </div>
                </div>

                {!assessTimerActive && !assessSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Award size={64} style={{ color: '#0284c7', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                      Ready to Begin the 50-Question Final Assessment?
                    </h3>
                    <p style={{ color: '#64748b', maxWidth: '650px', margin: '0 auto 1.75rem auto', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      This comprehensive evaluation contains 50 questions across all 11 core logical reasoning topics with a 60-minute time limit. Passing threshold is 35/50 (70%). Your results will unlock your course graduation and generate your personalized diagnostic review.
                    </p>
                    <button
                      onClick={handleStartAssessment}
                      style={{
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.85rem 2.25rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
                      }}
                    >
                      Start 60-Minute Final Assessment Now
                    </button>
                  </div>
                ) : !assessSubmitted ? (
                  <div>
                    {/* QUESTION PROGRESS PALETTE (50 BUTTONS) */}
                    <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
                      {section6FinalAssessment.questions.map((q, idx) => {
                        const isAnswered = assessAnswers[q.id] !== undefined;
                        const isMarked = assessMarkedForReview[q.id];
                        const isCurrent = currentAssessQIdx === idx;

                        let btnBg = '#ffffff';
                        let textCol = '#475569';
                        let borderCol = '#cbd5e1';

                        if (isAnswered) {
                          btnBg = '#0284c7';
                          textCol = '#ffffff';
                        }
                        if (isMarked) {
                          btnBg = '#f59e0b';
                          textCol = '#ffffff';
                        }
                        if (isCurrent) {
                          borderCol = '#0f172a';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentAssessQIdx(idx)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: isCurrent ? '2px solid #0f172a' : `1px solid ${borderCol}`,
                              background: btnBg,
                              color: textCol,
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* CURRENT QUESTION CARD */}
                    {(() => {
                      const q = section6FinalAssessment.questions[currentAssessQIdx];
                      const selectedOpt = assessAnswers[q.id];
                      const isMarked = assessMarkedForReview[q.id];

                      return (
                        <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                              QUESTION {currentAssessQIdx + 1} OF 50 • TOPIC: {q.topic}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <button
                                onClick={() => toggleMarkForReview(q.id)}
                                style={{
                                  background: isMarked ? '#fef3c7' : '#ffffff',
                                  color: isMarked ? '#b45309' : '#64748b',
                                  border: `1px solid ${isMarked ? '#d97706' : '#cbd5e1'}`,
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem'
                                }}
                              >
                                <Flag size={12} /> {isMarked ? 'Marked for Review' : 'Mark for Review'}
                              </button>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                Answered: {Object.keys(assessAnswers).length}/50
                              </span>
                            </div>
                          </div>

                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem 0', lineHeight: 1.45 }}>
                            {q.question}
                          </h3>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleAssessSelect(q.id, oIdx)}
                                  style={{
                                    background: isSelected ? '#e0f2fe' : '#ffffff',
                                    border: `1.5px solid ${isSelected ? '#0284c7' : '#cbd5e1'}`,
                                    color: isSelected ? '#0369a1' : '#0f172a',
                                    borderRadius: '8px',
                                    padding: '0.85rem 1rem',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                              disabled={currentAssessQIdx === 0}
                              onClick={() => setCurrentAssessQIdx(prev => prev - 1)}
                              style={{
                                background: '#f1f5f9',
                                color: currentAssessQIdx === 0 ? '#94a3b8' : '#475569',
                                border: 'none',
                                padding: '0.6rem 1.25rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: currentAssessQIdx === 0 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              ← Previous
                            </button>

                            {currentAssessQIdx < 49 ? (
                              <button
                                onClick={() => setCurrentAssessQIdx(prev => prev + 1)}
                                style={{
                                  background: '#0284c7',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1.5rem',
                                  borderRadius: '8px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Next →
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you ready to finalize and submit your 50-question assessment?")) {
                                    calculateAndSaveScore();
                                  }
                                }}
                                style={{
                                  background: '#16a34a',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1.75rem',
                                  borderRadius: '8px',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                Submit Final Test
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* POST-ASSESSMENT SCORE CARD */
                  <div>
                    <div style={{
                      background: savedProgress.assessmentPassed ? '#f0fdf4' : '#fef2f2',
                      border: `1.5px solid ${savedProgress.assessmentPassed ? '#86efac' : '#fca5a5'}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ fontSize: '3.5rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                        {savedProgress.assessmentScore} / 50
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: savedProgress.assessmentPassed ? '#166534' : '#991b1b', marginBottom: '0.5rem' }}>
                        Score: {savedProgress.assessmentPercentage}% — {savedProgress.assessmentPassed ? 'PASSED & GRADUATED 🏆' : 'RETAKE RECOMMENDED'}
                      </div>
                      <p style={{ margin: '0 auto 1.25rem auto', maxWidth: '600px', fontSize: '0.9rem', color: savedProgress.assessmentPassed ? '#14532d' : '#7f1d1d' }}>
                        {section6FinalAssessment.rubric.find(r => {
                          const [min, max] = r.range.split('–').map(n => parseInt(n, 10));
                          return savedProgress.assessmentScore >= min && savedProgress.assessmentScore <= max;
                        })?.desc}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={handleRetakeAssessment}
                          style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            border: '1.5px solid #cbd5e1',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <RotateCcw size={16} /> Retake Assessment
                        </button>
                        <button
                          onClick={() => handleTabChange('review')}
                          style={{
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                          }}
                        >
                          View Personalized Diagnostic Review →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 7: SECTION 7 - PERSONALIZED PERFORMANCE REVIEW */}
          {currentTab === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Diagnostic Analytics
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  Section 7 – Personalized Performance Review
                </h2>

                {savedProgress.assessmentFinished ? (
                  <div>
                    {/* TOPIC BREAKDOWN BARS */}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                      Topic-Wise Performance Analytics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                      {Object.entries(computeTopicBreakdown()).map(([topic, stats]) => {
                        const pct = Math.round((stats.correct / stats.total) * 100);
                        return (
                          <div key={topic} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                              <span>{topic}</span>
                              <span style={{ color: pct >= 75 ? '#166534' : pct >= 50 ? '#b45309' : '#dc2626' }}>
                                {stats.correct}/{stats.total} ({pct}%)
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: pct >= 75 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* STUDY RECOMMENDATIONS */}
                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1', fontWeight: 800, fontSize: '0.95rem' }}>
                        📋 Tailored Post-Assessment Study Recommendations
                      </h4>
                      <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.88rem', color: '#0c4a6e', lineHeight: 1.5 }}>
                        Based on your real response data, your strongest performance was demonstrated in topics with $\ge 80\%$ accuracy. Focus your revision on any domain scoring below 70% before taking competitive placement tests.
                      </p>
                      <div style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 700 }}>
                        Recommended Next Step: Revisit Section 1 Revision Summaries & the Final Revision Sheet.
                      </div>
                    </div>

                    {/* FULL 50-QUESTION REVIEW ACCORDION */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                      Complete 50-Question Solution Explanations
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {section6FinalAssessment.questions.map((q, idx) => {
                        const userAns = assessAnswers[q.id];
                        const isCorrect = userAns === q.correct;

                        return (
                          <div
                            key={q.id}
                            style={{
                              background: '#ffffff',
                              border: `1.5px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                              borderRadius: '10px',
                              padding: '1.25rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                                #{idx + 1} • {q.topic}
                              </span>
                              <span style={{ fontWeight: 800, fontSize: '0.78rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                                {isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                              {q.question}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.25rem' }}>
                              Your Answer: <strong>{userAns !== undefined ? `${getLetter(userAns)}. ${q.options[userAns]}` : 'Unanswered'}</strong>
                            </div>
                            {!isCorrect && (
                              <div style={{ fontSize: '0.85rem', color: '#166534', marginBottom: '0.5rem', fontWeight: 700 }}>
                                Correct Answer: {getLetter(q.correct)}. {q.options[q.correct]}
                              </div>
                            )}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                              💡 <strong>Diagnostic Explanation:</strong> {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                      Please complete and submit the Final Assessment in Section 6 to view your personalized performance analytics.
                    </p>
                    <button
                      onClick={() => handleTabChange('assessment')}
                      style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Go to Section 6: Final Assessment →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 8: SECTION 8 - FINAL REVISION SHEET & DRILLS */}
          {currentTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Executive Reference Sheet
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {section8RevisionSheet.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => window.print()}
                    style={{
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.6rem 1.25rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={16} /> Print Revision Sheet
                  </button>
                </div>

                {/* FORMULA REFERENCE CARDS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. Universal Formulas, Rules & Heuristics
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section8RevisionSheet.cheatSheet.map((card, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #0284c7', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                        {card.formulas}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 10 RAPID-FIRE QUESTIONS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Ten Rapid-Fire Recall Drills (Click to Reveal Answers)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section8RevisionSheet.rapidFireQuestions.map((rf, idx) => {
                    const isRevealed = revealedRapidFire[rf.id];
                    return (
                      <div
                        key={rf.id}
                        onClick={() => toggleRapidFire(rf.id)}
                        style={{
                          background: isRevealed ? '#f0fdf4' : '#f8fafc',
                          border: `1.5px solid ${isRevealed ? '#86efac' : '#cbd5e1'}`,
                          borderRadius: '10px',
                          padding: '1.25rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                            Drill #{idx + 1}: {rf.q}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                            {isRevealed ? '▲ Hide Answer' : '▼ Click to Reveal'}
                          </span>
                        </div>
                        {isRevealed && (
                          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0', fontSize: '0.88rem' }}>
                            <div style={{ fontWeight: 900, color: '#166534', marginBottom: '0.25rem' }}>
                              Answer: {rf.a}
                            </div>
                            <div style={{ color: '#14532d', fontSize: '0.82rem', lineHeight: 1.4 }}>
                              {rf.exp}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 9: SECTION 9 - COURSE COMPLETION & GRADUATION */}
          {currentTab === 'graduation' && (
            <motion.div
              key="graduation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #e2e8f0', marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)'
                }}>
                  <Award size={48} />
                </div>

                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Alpha Fly Computer Education • Official Certification
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.5rem 0 1rem 0', color: '#0f172a' }}>
                  Course Completed: Logical Reasoning Mastery
                </h2>
                <p style={{ maxWidth: '700px', margin: '0 auto 2rem auto', fontSize: '1rem', color: '#475569', lineHeight: 1.6 }}>
                  Congratulations! You have completed all 21 intensive days across Levels 1, 2, and 3. You have proven rigorous proficiency in deduction, analytical problem-solving, data interpretation, root cause analysis, decision trees, and abstract reasoning.
                </p>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  maxWidth: '550px',
                  margin: '0 auto 2.5rem auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Total Curriculum</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284c7' }}>21 Days</div>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: '#cbd5e1' }} />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Final Score</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#16a34a' : '#b45309' }}>
                        {savedProgress.assessmentScore} / 50
                      </div>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: '#cbd5e1' }} />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Proficiency</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                        {savedProgress.assessmentPassed ? 'Advanced' : 'Completed'}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleTabChange('overview')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    Return to Overview
                  </button>
                  <button
                    onClick={() => handleTabChange('review')}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
                    }}
                  >
                    View Diagnostic Report
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
