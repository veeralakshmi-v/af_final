import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, ChevronDown, ChevronUp, AlertCircle,
  Eye, CheckSquare, ShieldCheck, TrendingUp, Home, GraduationCap,
  Briefcase, Filter, Info, FileText, Search, RefreshCw, Shield
} from 'lucide-react';
import {
  day1Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  day1PracticeQuestions
} from '../../data/reasoningLevel1Day1.js';

export default function SpokoReasoningDay1({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d1_progress_${userKey}`;

  // Current active sub-tab (driven by Sidebar or section progression)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  // Interconnected 4-Pillars & Life/Career Interactive State
  const [activePillarId, setActivePillarId] = useState('analysis');
  const [lifeCareerTab, setLifeCareerTab] = useState('both'); // 'both' | 'life' | 'career'

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
      markSectionCompleted(activeTab);
    }
  }, [activeTab]);

  // Persistence State
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : {
        completedSections: ['overview'],
        classifierAnswers: {},
        classifierSubmitted: false,
        ceChecksAnswers: {},
        quizAnswers: {},
        quizSubmitted: {},
        quizScore: 0,
        quizFinished: false,
        completedDay: false,
        attemptCount: 0,
        lastActivity: new Date().toISOString()
      };
    } catch {
      return {
        completedSections: ['overview'],
        classifierAnswers: {},
        classifierSubmitted: false,
        ceChecksAnswers: {},
        quizAnswers: {},
        quizSubmitted: {},
        quizScore: 0,
        quizFinished: false,
        completedDay: false,
        attemptCount: 0,
        lastActivity: new Date().toISOString()
      };
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.warn('Failed to save reasoning progress', e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d1:day1';
      fetch(`/api/students/${studentId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lessonKey,
          course: 'spoko_reasoning',
          score: savedProgress.quizScore,
          total: 20
        })
      }).catch(() => {});
    }
  }, [savedProgress.completedDay, savedProgress.quizScore, session]);

  // Mark a section as completed
  const markSectionCompleted = (sectionId) => {
    setSavedProgress(prev => {
      const exists = prev.completedSections?.includes(sectionId);
      if (exists) return prev;
      return {
        ...prev,
        completedSections: [...(prev.completedSections || []), sectionId],
        lastActivity: new Date().toISOString()
      };
    });
  };

  // Switch tabs smoothly and notify parent navigation / sidebar
  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionCompleted(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l1_d1', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 2: Interactive Classifier State
  const [classifierSelected, setClassifierSelected] = useState(savedProgress.classifierAnswers || {});
  const [classifierSubmitted, setClassifierSubmitted] = useState(savedProgress.classifierSubmitted || false);

  const handleClassifierSelect = (id, type) => {
    if (classifierSubmitted) return;
    const updated = { ...classifierSelected, [id]: type };
    setClassifierSelected(updated);
    setSavedProgress(prev => ({
      ...prev,
      classifierAnswers: updated,
      lastActivity: new Date().toISOString()
    }));
  };

  const handleClassifierSubmit = () => {
    setClassifierSubmitted(true);
    setSavedProgress(prev => ({
      ...prev,
      classifierSubmitted: true,
      lastActivity: new Date().toISOString()
    }));
    markSectionCompleted('section2');
  };

  const handleClassifierReset = () => {
    setClassifierSelected({});
    setClassifierSubmitted(false);
    setSavedProgress(prev => ({
      ...prev,
      classifierAnswers: {},
      classifierSubmitted: false,
      lastActivity: new Date().toISOString()
    }));
  };

  const classifierCorrectCount = useMemo(() => {
    let count = 0;
    section2Content.classificationItems.forEach(item => {
      if (classifierSelected[item.id] === item.correctType) count++;
    });
    return count;
  }, [classifierSelected]);

  // Section 3: Scenario Selector State
  const [activeScenarioId, setActiveScenarioId] = useState('scenario_1');

  // Section 4: Cause-and-Effect Mini-checks State
  const [ceChecks, setCeChecks] = useState(savedProgress.ceChecksAnswers || {});
  const handleCeSelect = (qId, optionIdx) => {
    const updated = { ...ceChecks, [qId]: optionIdx };
    setCeChecks(updated);
    setSavedProgress(prev => ({
      ...prev,
      ceChecksAnswers: updated,
      lastActivity: new Date().toISOString()
    }));
  };

  // Section 5: Framework Step and Case State
  const [activeFrameworkStep, setActiveFrameworkStep] = useState(0);
  const [activeCaseId, setActiveCaseId] = useState('case_student');

  // STEP 4 & 5: PRACTICE QUIZ STATE (20 QUESTIONS)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(savedProgress.quizAnswers || {});
  const [quizSubmitted, setQuizSubmitted] = useState(savedProgress.quizSubmitted || {});
  const [quizFinished, setQuizFinished] = useState(savedProgress.quizFinished || false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleOptionSelect = (qId, optionIdx) => {
    if (quizSubmitted[qId]) return; // locked once submitted
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuestion = (qId) => {
    if (quizSubmitted[qId] || quizAnswers[qId] === undefined) return;
    const currentQ = day1PracticeQuestions.find(q => q.id === qId);
    const isCorrect = quizAnswers[qId] === currentQ.correctAnswer;

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    // Calculate score
    let score = 0;
    day1PracticeQuestions.forEach(q => {
      if (newSubmitted[q.id] && newAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const isAllSubmitted = day1PracticeQuestions.every(q => newSubmitted[q.id]);

    setQuizSubmitted(newSubmitted);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: newAnswers,
      quizSubmitted: newSubmitted,
      quizScore: score,
      quizFinished: isAllSubmitted || prev.quizFinished,
      completedDay: score >= 14 ? true : prev.completedDay,
      lastActivity: new Date().toISOString()
    }));

    markSectionCompleted('practice');
  };

  // Final Score calculation
  const totalCorrect = useMemo(() => {
    let count = 0;
    day1PracticeQuestions.forEach(q => {
      if (quizSubmitted[q.id] && quizAnswers[q.id] === q.correctAnswer) {
        count++;
      }
    });
    return count;
  }, [quizAnswers, quizSubmitted]);

  const percentage = Math.round((totalCorrect / 20) * 100);
  const isPassing = percentage >= 70;

  const handleCompleteQuiz = () => {
    setQuizFinished(true);
    setSavedProgress(prev => ({
      ...prev,
      quizFinished: true,
      quizScore: totalCorrect,
      completedDay: totalCorrect >= 14,
      lastActivity: new Date().toISOString()
    }));
    handleTabChange('assessment');
  };

  const handleRetryQuiz = () => {
    if (!window.confirm("Are you sure you want to retry the quiz? Your previous answers will be cleared.")) return;
    setQuizAnswers({});
    setQuizSubmitted({});
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setIsReviewOpen(false);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: {},
      quizSubmitted: {},
      quizScore: 0,
      quizFinished: false,
      attemptCount: (prev.attemptCount || 0) + 1,
      lastActivity: new Date().toISOString()
    }));
    handleTabChange('practice');
  };

  // Mark Day 1 complete in LMS
  const handleMarkDayComplete = () => {
    setSavedProgress(prev => ({
      ...prev,
      completedDay: true,
      lastActivity: new Date().toISOString()
    }));
    markSectionCompleted('assessment');
    alert("Congratulations! Level 1 – Day 1 has been marked complete in your progress tracker.");
  };

  // Analyze topics to revise based on incorrect answers
  const topicsToRevise = useMemo(() => {
    const wrongByCategory = {};
    day1PracticeQuestions.forEach(q => {
      if (quizSubmitted[q.id] && quizAnswers[q.id] !== q.correctAnswer) {
        wrongByCategory[q.category] = (wrongByCategory[q.category] || 0) + 1;
      }
    });
    return Object.entries(wrongByCategory).map(([cat, count]) => ({
      category: cat,
      count
    }));
  }, [quizAnswers, quizSubmitted]);

  // Overall progress percentage across 5 sections + quiz
  const overallProgressPercentage = useMemo(() => {
    let points = 0;
    if (savedProgress.completedSections?.includes('section1')) points += 15;
    if (savedProgress.completedSections?.includes('section2')) points += 15;
    if (savedProgress.completedSections?.includes('section3')) points += 15;
    if (savedProgress.completedSections?.includes('section4')) points += 15;
    if (savedProgress.completedSections?.includes('section5')) points += 15;
    const answeredCount = Object.keys(quizSubmitted).length;
    points += Math.round((answeredCount / 20) * 25);
    return Math.min(100, points);
  }, [savedProgress.completedSections, quizSubmitted]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      paddingBottom: '5rem'
    }}>
      {/* 🧭 BREADCRUMB NAVIGATION */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        fontSize: '0.85rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
        >
          Courses
        </button>
        <span>/</span>
        <span style={{ color: '#475569', fontWeight: 500 }}>Logical Reasoning & Analytical Thinking</span>
        <span>/</span>
        <span style={{ color: '#475569', fontWeight: 500 }}>Level 1 – Beginner</span>
        <span>/</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 1: Introduction to Logical Thinking</span>
      </div>

      {/* 🌟 HERO / HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)',
        color: '#ffffff',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Level 1 – Beginner
            </span>
            <span style={{
              background: '#10b981',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Day 1 of 30
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              Interactive Written Masterclass
            </span>
            {savedProgress.completedDay && (
              <span style={{
                background: '#fbbf24',
                color: '#78350f',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={13} /> Day 1 Completed
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.75rem 0'
          }}>
            Day 1: Introduction to Logical Thinking
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e0e7ff',
            maxWidth: '800px',
            lineHeight: 1.6,
            margin: '0 0 1.5rem 0'
          }}>
            Learn how to think step-by-step using real facts, tell facts from opinions and guesses, solve everyday problems calmly, and practice with 20 beginner-friendly questions.
          </p>

          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>DAY COMPLETION</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {overallProgressPercentage}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>PRACTICE QUIZ</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {Object.keys(quizSubmitted).length} / 20 Submitted
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>ACCURACY SCORE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a7f3d0' }}>
                {totalCorrect} / 20 ({percentage}%)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>STATUS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isPassing ? '#6ee7b7' : '#fde047' }}>
                {savedProgress.completedDay ? 'Certified Complete' : isPassing ? 'Passed (Ready to Mark)' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📦 MAIN CONTENT CONTAINER */}
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>

        {/* ========================================================== */}
        {/* TAB 0: OVERVIEW & OBJECTIVES */}
        {/* ========================================================== */}
        {currentTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#e0e7ff', padding: '0.6rem', borderRadius: '12px', color: '#4f46e5' }}>
                  <Brain size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#1e1b4b' }}>
                    Welcome to Day 1: Introduction to Logical Thinking
                  </h2>
                  <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Foundation module for students, freshers, job seekers, and critical thinkers
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                borderLeft: '4px solid #4f46e5',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                color: '#334155'
              }}>
                <strong>Why This Course Exists:</strong> In daily life, college, and job interviews, it is very common to jump to conclusions based on anger, panic, or wild guesses. This course teaches you a simple, practical way to think clearly, look at real facts, and make smart, confident choices.
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Day 1 Learning Objectives
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day1Overview.objectives.map((obj, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}>
                    <div style={{
                      background: '#10b981',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                      {obj}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#312e81', fontSize: '1.1rem' }}>
                    Ready to begin Section 1?
                  </div>
                  <div style={{ color: '#4338ca', fontSize: '0.9rem' }}>
                    Explore what logical thinking is, why it matters, and analyze your first commute scenario.
                  </div>
                </div>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
                  }}
                >
                  Start Section 1 <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: WHAT IS LOGICAL THINKING? */}
        {/* ========================================================== */}
        {currentTab === 'section1' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 1
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Core Fundamentals</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                {section1Content.title}
              </h2>

              {/* Definition Block */}
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
                  CORE DEFINITION
                </div>
                <div style={{ fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 500, color: '#f8fafc' }}>
                  "{section1Content.definition.core}"
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                  {section1Content.definition.breakdown.map((item, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.08)', padding: '0.85rem', borderRadius: '8px' }}>
                      <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        ✓ {item.term}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========================================================== */}
              {/* THE 4 INTERCONNECTED SKILLS OF CLEAR THINKING (SIMPLE WORDS) */}
              {/* ========================================================== */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2.5rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: '#6366f1',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Simple Guide
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                    The 4 Steps to Solve Any Problem
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  {section1Content.interconnectedThinking?.title || "How These 4 Thinking Skills Work Together"}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0', maxWidth: '850px' }}>
                  {section1Content.interconnectedThinking?.overview}
                </p>

                {/* The Process Flow Sequence in Simple Words */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RefreshCw size={16} color="#6366f1" /> The 4-Step Solution Loop:
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>1. Break It Down</span>
                    <span style={{ color: '#94a3b8' }}>➔</span>
                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>2. Check What's True</span>
                    <span style={{ color: '#94a3b8' }}>➔</span>
                    <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>3. Connect the Clues</span>
                    <span style={{ color: '#94a3b8' }}>➔</span>
                    <span style={{ background: '#d1fae5', color: '#059669', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>4. Fix It!</span>
                  </div>
                </div>

                {/* Interactive Pillar Selector Tabs (Balanced 4-Col / 2x2 Grid) */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  {section1Content.interconnectedThinking?.pillars?.map((p) => {
                    const isSelected = activePillarId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActivePillarId(p.id)}
                        style={{
                          flex: '1 1 calc(25% - 0.75rem)',
                          minWidth: '220px',
                          background: isSelected ? '#ffffff' : '#f8fafc',
                          border: isSelected ? `2px solid ${p.color}` : '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '1.1rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 4px 12px -2px rgba(0,0,0,0.08)' : 'none',
                          transform: isSelected ? 'translateY(-2px)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: p.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {p.role}
                          </span>
                          {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b', marginBottom: '0.3rem' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4 }}>
                          {p.tagline}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Deep-Dive Card in Simple Words */}
                {(() => {
                  const currentPillar = section1Content.interconnectedThinking?.pillars?.find(p => p.id === activePillarId) || section1Content.interconnectedThinking?.pillars?.[0];
                  if (!currentPillar) return null;
                  return (
                    <motion.div
                      key={currentPillar.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        background: '#ffffff',
                        border: `1.5px solid ${currentPillar.color}40`,
                        borderRadius: '14px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ background: currentPillar.bgColor || '#f1f5f9', color: currentPillar.color, fontSize: '0.8rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                            {currentPillar.role}
                          </span>
                          <h4 style={{ margin: '0.5rem 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                            Key Question: "{currentPillar.coreQuestion}"
                          </h4>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        <strong>In Simple Words:</strong> {currentPillar.definition}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderLeft: `4px solid ${currentPillar.color}`,
                          padding: '1.1rem',
                          borderRadius: '10px'
                        }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={16} color={currentPillar.color} /> Easy Everyday Example:
                          </div>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                            {currentPillar.inAction}
                          </p>
                        </div>

                        <div style={{
                          background: '#fff1f2',
                          border: '1px solid #fecdd3',
                          borderLeft: '4px solid #f43f5e',
                          padding: '1.1rem',
                          borderRadius: '10px'
                        }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#9f1239', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <AlertCircle size={16} color="#e11d48" /> What Happens If You Skip This Step?
                          </div>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#881337', lineHeight: 1.55 }}>
                            {currentPillar.withoutIt}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* The Failure Chain Alert Table */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={16} color="#f59e0b" /> Why You Cannot Skip Any Step:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    {section1Content.interconnectedThinking?.theFailureChain?.map((item, idx) => (
                      <div key={idx} style={{
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        borderRadius: '8px',
                        padding: '0.75rem'
                      }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#b91c1c', marginBottom: '0.2rem' }}>
                          ❌ {item.missing}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4 }}>
                          {item.result}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ========================================================== */}
              {/* WHY YOU NEED THIS IN LIFE AND CAREER (SIMPLE WORDS) */}
              {/* ========================================================== */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>
                      Why You Need This in Daily Life & Career
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                      {section1Content.interconnectedThinking?.lifeAndCareerImportance?.summary || "Thinking clearly protects you from silly mistakes and helps you grow fast."}
                    </p>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    background: '#f1f5f9',
                    padding: '0.25rem',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <button
                      onClick={() => setLifeCareerTab('both')}
                      style={{
                        background: lifeCareerTab === 'both' ? '#4f46e5' : 'transparent',
                        color: lifeCareerTab === 'both' ? '#ffffff' : '#64748b',
                        border: 'none',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      All Domains
                    </button>
                    <button
                      onClick={() => setLifeCareerTab('life')}
                      style={{
                        background: lifeCareerTab === 'life' ? '#4f46e5' : 'transparent',
                        color: lifeCareerTab === 'life' ? '#ffffff' : '#64748b',
                        border: 'none',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      🌟 Daily Life
                    </button>
                    <button
                      onClick={() => setLifeCareerTab('career')}
                      style={{
                        background: lifeCareerTab === 'career' ? '#4f46e5' : 'transparent',
                        color: lifeCareerTab === 'career' ? '#ffffff' : '#64748b',
                        border: 'none',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      🚀 Career & Jobs
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                  {/* Everyday Life Column */}
                  {(lifeCareerTab === 'both' || lifeCareerTab === 'life') && (
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#4338ca', fontWeight: 800, fontSize: '1.05rem' }}>
                        <Home size={20} color="#4f46e5" />
                        <span>In Your Everyday Life</span>
                      </div>
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        {section1Content.interconnectedThinking?.lifeAndCareerImportance?.lifeReasons?.map((item, idx) => (
                          <div key={idx} style={{
                            background: '#f8fafc',
                            border: '1px solid #f1f5f9',
                            borderLeft: '3px solid #6366f1',
                            padding: '0.9rem 1rem',
                            borderRadius: '8px'
                          }}>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', marginBottom: '0.25rem' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Career & Workplace Column */}
                  {(lifeCareerTab === 'both' || lifeCareerTab === 'career') && (
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#047857', fontWeight: 800, fontSize: '1.05rem' }}>
                        <Briefcase size={20} color="#059669" />
                        <span>In Your Career & Job Tests</span>
                      </div>
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        {section1Content.interconnectedThinking?.lifeAndCareerImportance?.careerReasons?.map((item, idx) => (
                          <div key={idx} style={{
                            background: '#f0fdf4',
                            border: '1px solid #dcfce7',
                            borderLeft: '3px solid #10b981',
                            padding: '0.9rem 1rem',
                            borderRadius: '8px'
                          }}>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#064e3b', marginBottom: '0.25rem' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5 }}>
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guessing vs Reasoning Comparison */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                The Critical Difference: Guessing vs. Reasoning
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Many people mistake intuitive guessing for logical thinking. Here is how they fundamentally differ:
              </p>

              <div style={{
                overflowX: 'auto',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                marginBottom: '2.5rem'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.85rem 1rem', color: '#1e293b', fontWeight: 700 }}>Dimension</th>
                      <th style={{ padding: '0.85rem 1rem', color: '#b91c1c', fontWeight: 700, background: '#fee2e2' }}>❌ Guessing (Intuition / Chance)</th>
                      <th style={{ padding: '0.85rem 1rem', color: '#047857', fontWeight: 700, background: '#d1fae5' }}>✓ Logical Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section1Content.guessingVsReasoning.comparison.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#334155' }}>{row.feature}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#991b1b', background: '#fff5f5' }}>{row.guessing}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#065f46', background: '#f0fdf4' }}>{row.reasoning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Everyday Life Examples */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Everyday Life Examples: Non-Logical vs. Logical Approaches
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section1Content.everydayExamples.map((ex, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    background: '#ffffff'
                  }}>
                    <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1rem', marginBottom: '0.75rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ background: '#fff1f2', borderLeft: '3px solid #f43f5e', padding: '0.65rem 0.85rem', borderRadius: '4px', marginBottom: '0.65rem', fontSize: '0.85rem', color: '#9f1239' }}>
                      <strong>Non-Logical:</strong> {ex.nonLogical}
                    </div>
                    <div style={{ background: '#ecfdf5', borderLeft: '3px solid #10b981', padding: '0.65rem 0.85rem', borderRadius: '4px', fontSize: '0.85rem', color: '#065f46' }}>
                      <strong>Logical:</strong> {ex.logical}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step-by-Step Worked Commute Example */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #d8b4fe',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#9333ea', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    WORKED DEMO
                  </span>
                  <span style={{ fontWeight: 700, color: '#581c87' }}>Case Study: The Commute Delay</span>
                </div>
                <div style={{ fontSize: '1rem', color: '#3b0764', fontWeight: 600, marginBottom: '1.25rem' }}>
                  Situation: {section1Content.workedExample.scenario}
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {section1Content.workedExample.steps.map((st) => (
                    <div key={st.stepNumber} style={{
                      background: '#ffffff',
                      border: '1px solid #e9d5ff',
                      borderRadius: '10px',
                      padding: '1rem'
                    }}>
                      <div style={{ color: '#7e22ce', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        Step {st.stepNumber}: {st.question}
                      </div>
                      <div style={{ color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {st.analysis}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <button
                  onClick={() => handleTabChange('overview')}
                  style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Back to Overview
                </button>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Facts, Opinions & Assumptions <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: FACTS, OPINIONS, AND ASSUMPTIONS */}
        {/* ========================================================== */}
        {currentTab === 'section2' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 2
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Critical Distinction</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                {section2Content.title}
              </h2>

              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Clear thinking starts by knowing what is real proof, what is just a personal feeling, and what is a wild guess. Mixing them up leads to confusion and bad decisions.
              </p>

              {/* Definitions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section2Content.definitions.map((def, i) => (
                  <div key={i} style={{
                    background: def.type === 'Fact' ? '#f0fdf4' : def.type === 'Opinion' ? '#fffbeb' : '#eef2ff',
                    border: `1px solid ${def.type === 'Fact' ? '#bbf7d0' : def.type === 'Opinion' ? '#fde68a' : '#c7d2fe'}`,
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{
                        background: def.type === 'Fact' ? '#10b981' : def.type === 'Opinion' ? '#f59e0b' : '#6366f1',
                        color: '#ffffff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 800
                      }}>
                        {def.type}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {def.definition}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', background: 'rgba(255,255,255,0.7)', padding: '0.6rem', borderRadius: '6px', marginBottom: '0.6rem' }}>
                      <strong>Key Test:</strong> {def.keyTest}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#334155', fontStyle: 'italic' }}>
                      <strong>Example:</strong> "{def.example}"
                    </div>
                  </div>
                ))}
              </div>

              {/* 🎯 INTERACTIVE CLASSIFICATION EXERCISE (12 ITEMS) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                      Interactive Practice: Classify the 12 Statements
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                      Test your understanding by classifying each statement as a Fact, Opinion, or Assumption.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      background: '#ede9fe',
                      color: '#4338ca',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: 800
                    }}>
                      Score: {classifierCorrectCount} / 12
                    </span>
                    <button
                      onClick={handleClassifierReset}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RotateCcw size={13} /> Reset
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {section2Content.classificationItems.map((item, idx) => {
                    const selected = classifierSelected[item.id];
                    const isSubmitted = classifierSubmitted;
                    const isCorrect = selected === item.correctType;

                    return (
                      <div key={item.id} style={{
                        background: '#ffffff',
                        border: `1px solid ${isSubmitted ? (isCorrect ? '#86efac' : '#fca5a5') : '#e2e8f0'}`,
                        borderRadius: '10px',
                        padding: '1.25rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>
                            {idx + 1}. "{item.statement}"
                          </span>
                          {isSubmitted && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: isCorrect ? '#dcfce7' : '#fee2e2',
                              color: isCorrect ? '#166534' : '#991b1b',
                              flexShrink: 0
                            }}>
                              {isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                              {isCorrect ? 'Correct' : `Answer: ${item.correctType}`}
                            </span>
                          )}
                        </div>

                        {/* Options Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: isSubmitted ? '0.75rem' : 0 }}>
                          {['Fact', 'Opinion', 'Assumption'].map((type) => {
                            const isChosen = selected === type;
                            let btnBg = '#f1f5f9';
                            let btnColor = '#475569';
                            let btnBorder = '1px solid #cbd5e1';

                            if (isChosen) {
                              btnBg = type === 'Fact' ? '#10b981' : type === 'Opinion' ? '#f59e0b' : '#6366f1';
                              btnColor = '#ffffff';
                              btnBorder = 'none';
                            }

                            return (
                              <button
                                key={type}
                                onClick={() => handleClassifierSelect(item.id, type)}
                                disabled={isSubmitted}
                                style={{
                                  background: btnBg,
                                  color: btnColor,
                                  border: btnBorder,
                                  padding: '0.4rem 0.85rem',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  transition: 'all 0.1s ease'
                                }}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback & Explanation on Submit */}
                        {isSubmitted && (
                          <div style={{
                            background: '#f8fafc',
                            borderTop: '1px solid #e2e8f0',
                            paddingTop: '0.75rem',
                            fontSize: '0.83rem',
                            color: '#475569',
                            lineHeight: 1.5
                          }}>
                            <div><strong>Explanation:</strong> {item.explanation}</div>
                            <div style={{ marginTop: '0.25rem', color: '#64748b' }}>
                              <em>Why not others?</em> {item.whyNotOther}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!classifierSubmitted ? (
                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button
                      onClick={handleClassifierSubmit}
                      disabled={Object.keys(classifierSelected).length === 0}
                      style={{
                        background: '#4f46e5',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        cursor: Object.keys(classifierSelected).length === 0 ? 'not-allowed' : 'pointer',
                        opacity: Object.keys(classifierSelected).length === 0 ? 0.6 : 1
                      }}
                    >
                      Submit Classification & Check Answers ({Object.keys(classifierSelected).length}/12)
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '1.5rem', background: '#ecfdf5', padding: '1rem', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#065f46' }}>
                      Well done! You scored {classifierCorrectCount} out of 12 on statement classification.
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Previous Section
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Understanding Problems <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: UNDERSTANDING PROBLEMS */}
        {/* ========================================================== */}
        {currentTab === 'section3' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 3
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Methodical Analysis</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                {section3Content.title}
              </h2>

              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {section3Content.intro}
              </p>

              {/* 6 Step Problem Analysis Framework */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                The 6-Step Problem Analysis Sequence
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                {section3Content.frameworkSteps.map((st) => (
                  <div key={st.step} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      background: '#4f46e5',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      marginBottom: '0.75rem'
                    }}>
                      {st.step}
                    </div>
                    <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                      {st.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {st.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Worked Practical Scenarios Explorer */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                    Three Worked Scenarios: Analysing Without Jumping to Conclusions
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    Select a scenario below to explore its structured step-by-step breakdown.
                  </p>
                </div>

                {/* Scenario Selector Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
                  {section3Content.workedScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setActiveScenarioId(sc.id)}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        border: activeScenarioId === sc.id ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                        background: activeScenarioId === sc.id ? '#eef2ff' : '#ffffff',
                        color: activeScenarioId === sc.id ? '#4338ca' : '#475569',
                        fontWeight: activeScenarioId === sc.id ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {sc.title.split(':')[0]}
                    </button>
                  ))}
                </div>

                {/* Active Scenario Card */}
                {(() => {
                  const sc = section3Content.workedScenarios.find(s => s.id === activeScenarioId);
                  if (!sc) return null;
                  return (
                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                        {sc.title}
                      </div>
                      <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                        Visible Symptom: {sc.symptom}
                      </div>

                      <div style={{ display: 'grid', gap: '0.85rem' }}>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem' }}>1. ACTUAL PROBLEM:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step1.replace('Actual Problem: ', '')}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem' }}>2. KNOWN VS MISSING:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step2.replace('Known vs Missing: ', '')}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem' }}>3. POSSIBLE CAUSES:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step3.replace('Possible Causes: ', '')}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem' }}>4. ALTERNATIVE SOLUTIONS:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step4.replace('Alternative Solutions: ', '')}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem' }}>5. COMPARISON & TRADEOFFS:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step5.replace('Comparison: ', '')}</p>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem' }}>6. EVALUATION & METRIC:</span>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#334155' }}>{sc.analysis.step6.replace('Evaluation: ', '')}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Previous Section
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Cause & Effect Reasoning <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: BASIC CAUSE-AND-EFFECT REASONING */}
        {/* ========================================================== */}
        {currentTab === 'section4' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 4
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Causality & Correlation</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                {section4Content.title}
              </h2>

              {/* Core Rules Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#4f46e5', marginBottom: '0.5rem' }}>What is a Cause?</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    {section4Content.concepts.cause}
                  </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>What is an Effect?</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    {section4Content.concepts.effect}
                  </p>
                </div>
              </div>

              {/* Critical Alert: Correlation != Causation */}
              <div style={{
                background: '#fff1f2',
                border: '2px solid #fecdd3',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <AlertCircle size={24} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    Golden Rule of Logic: Correlation Does NOT Equal Causation!
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#be123c', lineHeight: 1.5 }}>
                    {section4Content.concepts.correlationWarning} Never assume one event caused another just because they happened together. Always check if a hidden reason or simple coincidence is at work!
                  </p>
                </div>
              </div>

              {/* 5 Everyday Examples */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Five Everyday Cause-and-Effect Scenarios
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                {section4Content.everydayExamples.map((ex, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      <div style={{ color: '#4338ca' }}><strong>Cause:</strong> {ex.cause}</div>
                      <div style={{ color: '#047857' }}><strong>Effect:</strong> {ex.effect}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', background: '#ffffff', padding: '0.6rem', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                      <strong>Analytical Breakdown:</strong> {ex.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Interactive Check Questions */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                    Interactive Concept Checks: Test Your Causal Reasoning
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    Answer these 5 mini-check questions to test if you can spot correlation traps.
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {section4Content.interactiveQuestions.map((q, idx) => {
                    const selectedIdx = ceChecks[q.id];
                    const hasSelected = selectedIdx !== undefined;
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div key={q.id} style={{
                        background: '#ffffff',
                        border: `1px solid ${hasSelected ? (isCorrect ? '#86efac' : '#fca5a5') : '#e2e8f0'}`,
                        borderRadius: '12px',
                        padding: '1.25rem'
                      }}>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.4rem' }}>
                          Scenario {idx + 1}: {q.scenario}
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.75rem' }}>
                          {q.question}
                        </div>

                        <div style={{ display: 'grid', gap: '0.4rem', marginBottom: hasSelected ? '0.75rem' : 0 }}>
                          {q.options.map((opt, optIdx) => {
                            const isThisChosen = selectedIdx === optIdx;
                            let optBg = '#ffffff';
                            let optBorder = '1px solid #cbd5e1';

                            if (hasSelected) {
                              if (optIdx === q.correctIndex) {
                                optBg = '#dcfce7';
                                optBorder = '1px solid #22c55e';
                              } else if (isThisChosen && !isCorrect) {
                                optBg = '#fee2e2';
                                optBorder = '1px solid #ef4444';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleCeSelect(q.id, optIdx)}
                                style={{
                                  background: optBg,
                                  border: optBorder,
                                  borderRadius: '8px',
                                  padding: '0.6rem 0.85rem',
                                  textAlign: 'left',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  color: '#1e293b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem'
                                }}
                              >
                                <span style={{ fontWeight: 700, color: '#6366f1' }}>
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {hasSelected && (
                          <div style={{
                            background: isCorrect ? '#f0fdf4' : '#fff5f5',
                            borderTop: '1px solid #e2e8f0',
                            paddingTop: '0.65rem',
                            fontSize: '0.82rem',
                            color: isCorrect ? '#166534' : '#991b1b',
                            lineHeight: 1.5
                          }}>
                            <strong>{isCorrect ? '✓ Correct!' : '✗ Explanation:'}</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Previous Section
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: 5-Step Thinking Framework <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: A SIMPLE LOGICAL THINKING FRAMEWORK */}
        {/* ========================================================== */}
        {currentTab === 'section5' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 5
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Executive Framework</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                {section5Content.title}
              </h2>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1.5rem' }}>
                {section5Content.subtitle}
              </div>

              {/* Visual Flowchart Ribbon */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                {section5Content.steps.map((st, idx) => {
                  const isSelected = activeFrameworkStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveFrameworkStep(idx)}
                      style={{
                        background: isSelected ? '#4f46e5' : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#334155',
                        border: isSelected ? '2px solid #3730a3' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 700 }}>STEP {st.step}</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{st.code}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Details Card */}
              {(() => {
                const st = section5Content.steps[activeFrameworkStep];
                return (
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '2.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ background: '#4f46e5', color: '#ffffff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                        {st.step}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b' }}>
                        {st.title}: {st.summary}
                      </h4>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                        Key Implementation Rules:
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.6 }}>
                        {st.guidelines.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

              {/* Two Fully Worked Cases: Student Life & Workplace */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Two Fully Worked Case Applications
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {section5Content.workedCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCaseId(c.id)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      border: activeCaseId === c.id ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                      background: activeCaseId === c.id ? '#eef2ff' : '#ffffff',
                      color: activeCaseId === c.id ? '#4338ca' : '#475569',
                      fontWeight: activeCaseId === c.id ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {c.domain} Case
                  </button>
                ))}
              </div>

              {(() => {
                const activeCase = section5Content.workedCases.find(c => c.id === activeCaseId);
                if (!activeCase) return null;

                return (
                  <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ background: '#7e22ce', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {activeCase.domain}
                      </span>
                      <span style={{ fontWeight: 800, color: '#3b0764', fontSize: '1.1rem' }}>
                        {activeCase.scenario}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: '#581c87', lineHeight: 1.5 }}>
                      <strong>Context:</strong> {activeCase.context}
                    </p>

                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {activeCase.application.map((app, i) => (
                        <div key={i} style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #f3e8ff' }}>
                          <span style={{ fontWeight: 800, color: '#7e22ce', fontSize: '0.85rem' }}>
                            {app.stage}:
                          </span>{' '}
                          <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                            {app.details}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Previous Section
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Start Practice Quiz (20 Questions) <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* STEP 4 & 5: INTERACTIVE PRACTICE QUIZ (20 QUESTIONS) */}
        {/* ========================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              {/* Quiz Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      DAY 1 ASSESSMENT
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>20 Interactive Questions</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Logical Reasoning Practice Quiz
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#334155',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    Score: {totalCorrect} / {Object.keys(quizSubmitted).length}
                  </span>
                  <button
                    onClick={handleRetryQuiz}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RotateCcw size={14} /> Restart Quiz
                  </button>
                </div>
              </div>

              {/* Question Navigator Palette */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap',
                background: '#f8fafc',
                padding: '0.75rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                {day1PracticeQuestions.map((q, idx) => {
                  const isSubmitted = quizSubmitted[q.id];
                  const isCorrect = isSubmitted && quizAnswers[q.id] === q.correctAnswer;
                  const isCurrent = currentQuizIdx === idx;

                  let bgColor = '#ffffff';
                  let textColor = '#475569';
                  let border = '1px solid #cbd5e1';

                  if (isSubmitted) {
                    if (isCorrect) {
                      bgColor = '#dcfce7';
                      textColor = '#166534';
                      border = '1px solid #86efac';
                    } else {
                      bgColor = '#fee2e2';
                      textColor = '#991b1b';
                      border = '1px solid #fca5a5';
                    }
                  }

                  if (isCurrent) {
                    border = '2px solid #4f46e5';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuizIdx(idx)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '6px',
                        background: bgColor,
                        color: textColor,
                        border: border,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Single Question Card Display */}
              {(() => {
                const currentQ = day1PracticeQuestions[currentQuizIdx];
                const isSubmitted = quizSubmitted[currentQ.id];
                const selectedOption = quizAnswers[currentQ.id];
                const isCorrect = isSubmitted && selectedOption === currentQ.correctAnswer;

                return (
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Header: Question Number & Difficulty */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#4f46e5' }}>
                        QUESTION {currentQuizIdx + 1} OF 20
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{
                          background: currentQ.difficulty === 'Easy' ? '#ecfdf5' : currentQ.difficulty === 'Moderate' ? '#fffbeb' : '#f5f3ff',
                          color: currentQ.difficulty === 'Easy' ? '#047857' : currentQ.difficulty === 'Moderate' ? '#b45309' : '#6d28d9',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {currentQ.difficulty}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {currentQ.category}
                        </span>
                      </div>
                    </div>

                    {/* Question Text */}
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                      whiteSpace: 'pre-line'
                    }}>
                      {currentQ.question}
                    </h3>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {currentQ.options.map((opt, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        let optBorder = '1px solid #cbd5e1';
                        let optBg = '#ffffff';

                        if (isSubmitted) {
                          if (optIdx === currentQ.correctAnswer) {
                            optBg = '#dcfce7';
                            optBorder = '2px solid #16a34a';
                          } else if (isChosen && !isCorrect) {
                            optBg = '#fee2e2';
                            optBorder = '2px solid #dc2626';
                          }
                        } else if (isChosen) {
                          optBg = '#eef2ff';
                          optBorder = '2px solid #4f46e5';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleOptionSelect(currentQ.id, optIdx)}
                            style={{
                              background: optBg,
                              border: optBorder,
                              borderRadius: '10px',
                              padding: '1rem 1.25rem',
                              cursor: isSubmitted ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: isChosen ? '2px solid #4f46e5' : '2px solid #94a3b8',
                              background: isChosen ? '#4f46e5' : '#ffffff',
                              color: isChosen ? '#ffffff' : '#64748b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              flexShrink: 0
                            }}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.4 }}>
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Bar: Submit or Result Details */}
                    {!isSubmitted ? (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleSubmitQuestion(currentQ.id)}
                          disabled={selectedOption === undefined}
                          style={{
                            background: '#4f46e5',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem 1.75rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            cursor: selectedOption === undefined ? 'not-allowed' : 'pointer',
                            opacity: selectedOption === undefined ? 0.6 : 1
                          }}
                        >
                          Submit Answer
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        background: isCorrect ? '#f0fdf4' : '#fff5f5',
                        border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                        borderRadius: '10px',
                        padding: '1.25rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          {isCorrect ? (
                            <CheckCircle2 size={20} color="#16a34a" />
                          ) : (
                            <XCircle size={20} color="#dc2626" />
                          )}
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                            {isCorrect ? 'Correct! Logical Reasoning Validated.' : 'Incorrect Response'}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                          <strong>Why this is correct:</strong> {currentQ.explanation}
                        </div>

                        {currentQ.whyIncorrect && (
                          <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.5rem' }}>
                            <strong>Why alternatives fail:</strong>
                            <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem' }}>
                              {Object.entries(currentQ.whyIncorrect).map(([idxStr, reason]) => (
                                <li key={idxStr}>
                                  <strong>Option {String.fromCharCode(65 + Number(idxStr))}:</strong> {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      <button
                        onClick={() => setCurrentQuizIdx(Math.max(0, currentQuizIdx - 1))}
                        disabled={currentQuizIdx === 0}
                        style={{
                          background: 'none',
                          border: '1px solid #cbd5e1',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          cursor: currentQuizIdx === 0 ? 'not-allowed' : 'pointer',
                          opacity: currentQuizIdx === 0 ? 0.4 : 1,
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#475569'
                        }}
                      >
                        ← Previous Question
                      </button>

                      {currentQuizIdx < 19 ? (
                        <button
                          onClick={() => setCurrentQuizIdx(currentQuizIdx + 1)}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Next Question →
                        </button>
                      ) : (
                        <button
                          onClick={handleCompleteQuiz}
                          style={{
                            background: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700
                          }}
                        >
                          View Assessment Summary
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* STEP 6: DAY 1 FINAL ASSESSMENT SUMMARY */}
        {/* ========================================================== */}
        {currentTab === 'assessment' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: isPassing ? '#dcfce7' : '#fee2e2',
                  color: isPassing ? '#16a34a' : '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Award size={36} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Day 1 Assessment Report
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                  Logical Reasoning & Analytical Thinking • Level 1 Beginner
                </p>
              </div>

              {/* Performance Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>TOTAL QUESTIONS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>20</div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>CORRECT ANSWERS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '0.25rem' }}>{totalCorrect}</div>
                </div>
                <div style={{ background: '#fff5f5', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>INCORRECT ANSWERS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '0.25rem' }}>{20 - totalCorrect}</div>
                </div>
                <div style={{ background: '#eef2ff', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #c7d2fe' }}>
                  <div style={{ fontSize: '0.8rem', color: '#4338ca', fontWeight: 700 }}>FINAL PERCENTAGE</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.25rem' }}>{percentage}%</div>
                </div>
              </div>

              {/* Feedback Band Banner */}
              <div style={{
                background: percentage >= 90 ? '#ecfdf5' : percentage >= 70 ? '#f0fdf4' : percentage >= 50 ? '#fffbeb' : '#fff1f2',
                border: `2px solid ${percentage >= 90 ? '#a7f3d0' : percentage >= 70 ? '#bbf7d0' : percentage >= 50 ? '#fde68a' : '#fecdd3'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: percentage >= 90 ? '#065f46' : percentage >= 70 ? '#166534' : percentage >= 50 ? '#92400e' : '#9f1239',
                  marginBottom: '0.35rem'
                }}>
                  {percentage >= 90 ? '🌟 90–100%: Excellent Understanding!' :
                   percentage >= 70 ? '🎉 70–89%: Good Progress!' :
                   percentage >= 50 ? '📚 50–69%: Keep Practising!' :
                   '⚠️ Below 50%: Review the Learning Material & Try Again.'}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                  {percentage >= 90 ? 'Outstanding work! You have mastered the basics of logical thinking, facts, and causes.' :
                   percentage >= 70 ? 'Great job! You cleared the 70% passing mark. You understand how to think step-by-step using facts.' :
                   percentage >= 50 ? 'Good effort! You understand the basics, but review the difference between facts and guesses before moving to Day 2.' :
                   'Take your time to re-read Sections 1 to 5. Focus on the simple clues and facts, then give the quiz another try!'}
                </p>
              </div>

              {/* Topics to Revise Section */}
              {topicsToRevise.length > 0 && (
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={18} color="#4f46e5" /> Recommended Revision Areas (Based on Missed Questions)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {topicsToRevise.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontWeight: 700, color: '#b91c1c', fontSize: '0.85rem' }}>
                          • {item.category}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                          {item.count} question{item.count > 1 ? 's' : ''} missed
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Eye size={17} /> {isReviewOpen ? 'Hide Full Answer Review' : 'Review All 20 Answers'}
                </button>

                <button
                  onClick={handleRetryQuiz}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <RotateCcw size={17} /> Retry Assessment
                </button>

                {isPassing && (
                  <button
                    onClick={handleMarkDayComplete}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <CheckCircle2 size={18} /> Mark Day 1 Complete in LMS
                  </button>
                )}
              </div>

              {/* Collapsible Review Mode */}
              {isReviewOpen && (
                <div style={{ marginTop: '2rem', borderTop: '2px dashed #cbd5e1', paddingTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                    Full 20-Question Answer Review & Rationales
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {day1PracticeQuestions.map((q, idx) => {
                      const userAns = quizAnswers[q.id];
                      const isCorrect = userAns === q.correctAnswer;

                      return (
                        <div key={q.id} style={{
                          background: '#f8fafc',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.85rem' }}>
                              Question {idx + 1} ({q.difficulty})
                            </span>
                            <span style={{
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: isCorrect ? '#dcfce7' : '#fee2e2',
                              color: isCorrect ? '#166534' : '#991b1b'
                            }}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem' }}>
                            {q.question}
                          </div>

                          <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.5rem' }}>
                            <div><strong>Your Choice:</strong> {userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'Not answered'}</div>
                            <div style={{ color: '#16a34a', fontWeight: 600 }}><strong>Correct Answer:</strong> {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</div>
                          </div>

                          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, border: '1px solid #e2e8f0' }}>
                            <strong>Why:</strong> {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* 🧭 BOTTOM GLOBAL NAVIGATION FOOTER */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#475569',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          ← Back to Level 1 Curriculum
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            disabled
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#94a3b8',
              cursor: 'not-allowed'
            }}
          >
            ← Previous Day
          </button>

          <button
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d2', 'overview')}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            Next: Day 2 (Number Series) →
          </button>
        </div>
      </div>
    </div>
  );
}
