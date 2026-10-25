import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
  Clock, Sparkles, BookOpen, Layers, Target, Zap, HelpCircle,
  ChevronRight, AlertCircle, Eye, CheckSquare, Award, Filter,
  Shield, Activity, RefreshCw, AlertTriangle, FileText, CheckCircle,
  Play, Pause, Compass, Users, Check, GitCommit, Split, Search,
  TrendingDown, TrendingUp, BarChart3, Database, MessageSquare,
  ChevronDown, ExternalLink, Lightbulb, ShieldAlert, GitBranch,
  Scale, Briefcase, ListChecks, DollarSign, Calendar, Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day10Overview,
  lessonIntro,
  coreConcepts,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  caseStudyData,
  commonMistakes,
  practicalChecklist,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel2Day10.js';

export default function SpokoReasoningDay10({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d10_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for Day 10 progress tracking
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
        practiceAScore: 0,
        practiceBScore: 0,
        practiceCScore: 0,
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
        practiceAScore: 0,
        practiceBScore: 0,
        practiceCScore: 0,
        completedDay: false
      };
    }
  });

  // Save Day 10 progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 10 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l2_d10:day10';
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonKey, completed: true })
      }).catch(() => { });

      fetch(`/api/students/${studentId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lessonKey,
          course: 'spoko_reasoning',
          score: savedProgress.assessmentScore,
          total: finalAssessmentQuestions.length,
          completed: true,
          percentage: savedProgress.assessmentPercentage
        })
      }).catch(() => { });
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, savedProgress.assessmentPercentage, session]);

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

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionCompleted(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l2_d10', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // PRACTICE SETS INTERACTIVE STATE (A, B, C)
  // ==========================================
  const [practiceAnswers, setPracticeAnswers] = useState({
    set_a: {},
    set_b: {},
    set_c: {}
  });
  const [practiceSubmitted, setPracticeSubmitted] = useState({
    set_a: {},
    set_b: {},
    set_c: {}
  });

  // Practice Timers
  const [timerA, setTimerA] = useState(practiceSetA.timeLimitSeconds);
  const [isTimerARunning, setIsTimerARunning] = useState(false);
  const [timerB, setTimerB] = useState(practiceSetB.timeLimitSeconds);
  const [isTimerBRunning, setIsTimerBRunning] = useState(false);
  const [timerC, setTimerC] = useState(practiceSetC.timeLimitSeconds);
  const [isTimerCRunning, setIsTimerCRunning] = useState(false);

  // Timer intervals
  useEffect(() => {
    let interval = null;
    if (isTimerARunning && timerA > 0) {
      interval = setInterval(() => setTimerA(prev => prev - 1), 1000);
    } else if (timerA === 0) {
      setIsTimerARunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerARunning, timerA]);

  useEffect(() => {
    let interval = null;
    if (isTimerBRunning && timerB > 0) {
      interval = setInterval(() => setTimerB(prev => prev - 1), 1000);
    } else if (timerB === 0) {
      setIsTimerBRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerBRunning, timerB]);

  useEffect(() => {
    let interval = null;
    if (isTimerCRunning && timerC > 0) {
      interval = setInterval(() => setTimerC(prev => prev - 1), 1000);
    } else if (timerC === 0) {
      setIsTimerCRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerCRunning, timerC]);

  const handlePracticeSelect = (setId, qId, optIdx) => {
    if (practiceSubmitted[setId]?.[qId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: optIdx }
    }));
    if (setId === 'set_a' && !isTimerARunning && timerA > 0) setIsTimerARunning(true);
    if (setId === 'set_b' && !isTimerBRunning && timerB > 0) setIsTimerBRunning(true);
    if (setId === 'set_c' && !isTimerCRunning && timerC > 0) setIsTimerCRunning(true);
  };

  const handlePracticeSubmit = (setId, qId) => {
    if (practiceSubmitted[setId]?.[qId] || practiceAnswers[setId]?.[qId] === undefined) return;
    setPracticeSubmitted(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: true }
    }));
  };

  const handlePracticeReset = (setId) => {
    setPracticeAnswers(prev => ({ ...prev, [setId]: {} }));
    setPracticeSubmitted(prev => ({ ...prev, [setId]: {} }));
    if (setId === 'set_a') { setTimerA(practiceSetA.timeLimitSeconds); setIsTimerARunning(false); }
    if (setId === 'set_b') { setTimerB(practiceSetB.timeLimitSeconds); setIsTimerBRunning(false); }
    if (setId === 'set_c') { setTimerC(practiceSetC.timeLimitSeconds); setIsTimerCRunning(false); }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // ==========================================
  // CASE STUDY INTERACTIVE STATE
  // ==========================================
  const [selectedCaseSol, setSelectedCaseSol] = useState('sol1');
  const [caseStudyNotes, setCaseStudyNotes] = useState('');
  const [isCaseSubmitted, setIsCaseSubmitted] = useState(false);

  // ==========================================
  // FINAL ASSESSMENT (20 QUESTIONS: EASY, MEDIUM, HARD)
  // ==========================================
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentTimer, setAssessmentTimer] = useState(1500); // 25 minutes (1500s)
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'Easy' | 'Medium' | 'Hard' | 'incorrect' | 'correct'
  const [pillDifficultyFilter, setPillDifficultyFilter] = useState('all'); // 'all' | 'Easy' | 'Medium' | 'Hard'
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isAssessmentTimerRunning && assessmentTimer > 0 && !assessmentFinished) {
      interval = setInterval(() => setAssessmentTimer(prev => prev - 1), 1000);
    } else if (assessmentTimer === 0 && !assessmentFinished) {
      setIsAssessmentTimerRunning(false);
      handleFinishAssessment();
    }
    return () => clearInterval(interval);
  }, [isAssessmentTimerRunning, assessmentTimer, assessmentFinished]);

  const handleAssessmentSelect = (qId, optIdx) => {
    if (assessmentSubmitted[qId] || assessmentFinished) return;
    setAssessmentAnswers(prev => ({ ...prev, [qId]: optIdx }));
    if (!isAssessmentTimerRunning) setIsAssessmentTimerRunning(true);
  };

  const handleAssessmentSubmitQuestion = (qId) => {
    if (assessmentSubmitted[qId] || assessmentAnswers[qId] === undefined || assessmentFinished) return;
    const newSubmitted = { ...assessmentSubmitted, [qId]: true };
    setAssessmentSubmitted(newSubmitted);

    const allDone = finalAssessmentQuestions.every(q => newSubmitted[q.id]);
    if (allDone) {
      calculateAndFinishAssessment(newSubmitted, assessmentAnswers);
    }
  };

  const calculateAndFinishAssessment = (submittedObj, answersObj) => {
    let score = 0;
    finalAssessmentQuestions.forEach(q => {
      if (answersObj[q.id] === q.correctAnswer) score += 1;
    });

    const percentage = Math.round((score / finalAssessmentQuestions.length) * 100);
    const passed = percentage >= 60; // 60% developing, 75% good, 90% excellent

    setAssessmentFinished(true);
    setIsAssessmentTimerRunning(false);

    setSavedProgress(prev => ({
      ...prev,
      assessmentAnswers: answersObj,
      assessmentSubmitted: submittedObj,
      assessmentScore: score,
      assessmentPercentage: percentage,
      assessmentPassed: passed,
      assessmentFinished: true,
      completedDay: passed
    }));

    if (percentage >= 75) {
      try {
        confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 } });
      } catch { }
    }
  };

  const handleFinishAssessment = () => {
    calculateAndFinishAssessment(assessmentSubmitted, assessmentAnswers);
  };

  const handleResetAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentSubmitted({});
    setAssessmentFinished(false);
    setAssessmentIndex(0);
    setAssessmentTimer(1500); // 25 mins
    setIsAssessmentTimerRunning(false);
    setSavedProgress(prev => ({
      ...prev,
      assessmentAnswers: {},
      assessmentSubmitted: {},
      assessmentScore: 0,
      assessmentPercentage: 0,
      assessmentPassed: false,
      assessmentFinished: false
    }));
  };

  // Selected worked example accordion
  const [selectedExample, setSelectedExample] = useState(workedExamples[0].id);

  // Concept 3 interactive state
  const [concept3Choice, setConcept3Choice] = useState(null);

  // Calculate weak areas based on final assessment answers
  const getDomainBreakdown = () => {
    const domains = {
      "Problem Definition & Decomposition": { correct: 0, total: 0 },
      "Facts, Information & Constraints": { correct: 0, total: 0 },
      "Generating Alternatives & Decision Criteria": { correct: 0, total: 0 },
      "Decision Matrices, Trade-offs & Risk": { correct: 0, total: 0 },
      "Implementation, Evaluation & Improvement": { correct: 0, total: 0 }
    };

    finalAssessmentQuestions.forEach(q => {
      if (domains[q.domain]) {
        domains[q.domain].total += 1;
        if (assessmentAnswers[q.id] === q.correctAnswer) {
          domains[q.domain].correct += 1;
        }
      }
    });

    return domains;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Hero Banner - Alpha Fly Brand */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        color: '#ffffff',
        padding: '2.5rem 1.5rem 2rem',
        boxShadow: '0 4px 20px -2px rgba(30, 58, 138, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
            backdropFilter: 'blur(4px)'
          }}>
            <Sparkles size={14} color="#93c5fd" />
            AlphaFly Logical Reasoning • Level 2 – Intermediate • Day 10
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Structured Problem Solving (Part 1)
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#bfdbfe',
            maxWidth: '820px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Problem Definition, Decomposition, and Generating Solutions: Master formulating objective problem statements, separating symptoms from root causes, building MECE logic trees, and brainstorming creative alternatives.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#e2e8f0'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={15} color="#93c5fd" /> 45–60 Minutes
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={15} color="#93c5fd" /> 4 Core Concepts
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#93c5fd" /> 4 Solved Master Examples
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={15} color="#93c5fd" /> 20 Timed Assessment Qs (Easy, Medium, Hard)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        flex: 1,
        width: '100%',
        boxSizing: 'border-box'
      }}>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & STARTER SCENARIO                       */}
        {/* ======================================================== */}
        {currentTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  padding: '0.6rem',
                  borderRadius: '12px'
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    Welcome to Day 10: Structured Problem Solving
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Define, Analyze, Evaluate, and Solve: Practical Methods for Academic, Technical & Business Success
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {day10Overview.description}
              </p>

              {/* 9 Learning Objectives */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 1rem 0' }}>
                  🎯 What You Will Master in This Lesson:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                  {day10Overview.learningObjectives.map((obj, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Structured Problem Solving Matters */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                🌟 Why Structured Problem Solving is Essential
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                {lessonIntro.importancePoints.map((pt, i) => {
                  const [title, desc] = pt.split(': ');
                  return (
                    <div key={i} style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '12px',
                      padding: '1.1rem',
                      fontSize: '0.9rem'
                    }}>
                      <strong style={{ color: '#166534', display: 'block', marginBottom: '0.35rem' }}>{title}</strong>
                      <span style={{ color: '#374151', lineHeight: 1.5 }}>{desc}</span>
                    </div>
                  );
                })}
              </div>

              {/* Starter Scenario: The 100 Enquiries Dilemma */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '14px',
                border: '1.5px solid #93c5fd',
                padding: '1.75rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={20} color="#1d4ed8" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e40af', margin: 0 }}>
                    {lessonIntro.starterScenario.title}
                  </h3>
                </div>
                <p style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {lessonIntro.starterScenario.context}
                </p>

                <div style={{
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <strong style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <AlertTriangle size={16} /> The Immediate Intuitive Urge:
                  </strong>
                  <span style={{ color: '#7f1d1d', fontSize: '0.9rem' }}>
                    {lessonIntro.starterScenario.initialUrge}
                  </span>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#b91c1c', fontStyle: 'italic' }}>
                    ⚠️ {lessonIntro.starterScenario.whyUrgeIsDangerous}
                  </div>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.75rem' }}>
                  6 Critical Problem-Solving Inquiries:
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {lessonIntro.starterScenario.diagnosticQuestions.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.9rem 1.1rem'
                    }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {idx + 1}. {item.question}
                      </div>
                      <div style={{ color: '#1e40af', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        💡 <strong>Insight:</strong> {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The 8-Stage Structured Problem-Solving Cycle Diagram */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                🔄 The 8-Stage Structured Problem-Solving Cycle
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Follow this universal, battle-tested loop to solve complex challenges in exams, software, and management without jumping to hasty, expensive assumptions:
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}>
                {lessonIntro.cycleSteps.map((s) => (
                  <div key={s.step} style={{
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '12px',
                      background: '#1d4ed8',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      STEP {s.step}
                    </div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: '0.35rem' }}>
                      {s.title}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.45 }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Navigation */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Start Concept 1: Define the Problem →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONCEPT 1 - DEFINE THE PROBLEM CLEARLY             */}
        {/* ======================================================== */}
        {currentTab === 'section1' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 1
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept1.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept1.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept1.theory}
              </div>

              {/* Comparison Table */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Distinguishing the 5 Core Problem Elements
              </h3>
              <div style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800, width: '22%' }}>Element</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800, width: '38%' }}>Characteristics</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800, width: '40%' }}>Realistic Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coreConcepts.concept1.comparisonTable.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#1e40af' }}>{row.element}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{row.characteristics}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#0f172a', fontStyle: 'italic' }}>{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 5Ws Framework Card */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 1rem 0' }}>
                  📋 The 5Ws Problem Framing Protocol
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {coreConcepts.concept1.fiveWsFramework.map((f, i) => (
                    <div key={i} style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>{f.question}</div>
                      <div style={{ color: '#1e293b', fontSize: '0.85rem', marginTop: '0.25rem' }}>{f.answer}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Domain Examples */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                3 Concrete Examples Across Domains
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept1.threeDomainsExamples.map((ex, i) => (
                  <div key={i} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      Domain {i + 1}: {ex.domain}
                    </div>
                    <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#991b1b' }}>
                      ❌ <strong>Vague Statement:</strong> {ex.vague}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      ✓ <strong>Clear Problem Statement:</strong> {ex.clear}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('overview')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Overview
                </button>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Problem Decomposition →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONCEPT 2 - PROBLEM DECOMPOSITION & TREES          */}
        {/* ======================================================== */}
        {currentTab === 'section2' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 2
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept2.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept2.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept2.theory}
              </div>

              {/* College Project Breakdown */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 0.5rem 0' }}>
                  🎓 {coreConcepts.concept2.collegeProjectExample.headline}
                </h3>
                <p style={{ color: '#334155', fontSize: '0.92rem', marginBottom: '1rem' }}>
                  <strong>Scenario:</strong> {coreConcepts.concept2.collegeProjectExample.problem}
                </p>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                  {coreConcepts.concept2.collegeProjectExample.branches.map((b, i) => (
                    <div key={i} style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {b.branch}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                        {b.subItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#ffffff', borderLeft: '3px solid #16a34a', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.88rem', color: '#166534', fontWeight: 600 }}>
                  💡 {coreConcepts.concept2.collegeProjectExample.takeaway}
                </div>
              </div>

              {/* Hierarchical Issue Tree Visualization */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                🌳 Hierarchical Issue Tree: Diagnosing Low Enquiry Conversion
              </h3>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-block', background: '#dc2626', color: '#ffffff', padding: '0.5rem 1.25rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.95rem' }}>
                    {coreConcepts.concept2.hierarchyTree.root}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {coreConcepts.concept2.hierarchyTree.level1.map((col, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.9rem', borderBottom: '2px solid #93c5fd', paddingBottom: '0.35rem', marginBottom: '0.65rem' }}>
                        Branch {idx + 1}: {col.name}
                      </div>
                      <div style={{ display: 'grid', gap: '0.45rem' }}>
                        {col.items.map((it, i) => (
                          <div key={i} style={{ background: '#f1f5f9', padding: '0.45rem 0.65rem', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                            • {it}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section1')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 1
                </button>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Information & Constraints →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONCEPT 3 - GATHER INFO & CONSTRAINTS             */}
        {/* ======================================================== */}
        {currentTab === 'section3' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 3
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept3.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept3.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept3.theory}
              </div>

              {/* 4 Categories Card */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.categories.map((c, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {c.category}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                      {c.desc}
                    </p>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem', fontSize: '0.82rem', color: '#0f172a', fontStyle: 'italic' }}>
                      <strong>Example:</strong> {c.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Scenario: Spot the Missing Info */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 0.5rem 0' }}>
                  🎯 {coreConcepts.concept3.interactiveScenario.scenarioTitle}
                </h3>
                <p style={{ color: '#1e293b', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {coreConcepts.concept3.interactiveScenario.situation}
                </p>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                  {coreConcepts.concept3.interactiveScenario.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setConcept3Choice(idx)}
                      style={{
                        padding: '0.85rem 1.1rem',
                        borderRadius: '8px',
                        border: concept3Choice === idx ? (opt.isBest ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                        background: concept3Choice === idx ? (opt.isBest ? '#dcfce7' : '#fee2e2') : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{opt.text}</span>
                      {concept3Choice === idx && (
                        opt.isBest ? <CheckCircle2 size={18} color="#16a34a" /> : <XCircle size={18} color="#dc2626" />
                      )}
                    </button>
                  ))}
                </div>

                {concept3Choice !== null && (
                  <div style={{
                    background: coreConcepts.concept3.interactiveScenario.options[concept3Choice].isBest ? '#ecfdf5' : '#fff1f2',
                    border: `1px solid ${coreConcepts.concept3.interactiveScenario.options[concept3Choice].isBest ? '#a7f3d0' : '#fecdd3'}`,
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.88rem',
                    color: coreConcepts.concept3.interactiveScenario.options[concept3Choice].isBest ? '#065f46' : '#9f1239'
                  }}>
                    {coreConcepts.concept3.interactiveScenario.options[concept3Choice].feedback}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 2
                </button>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Generating Alternatives →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONCEPT 4 - GENERATE MULTIPLE ALTERNATIVES        */}
        {/* ======================================================== */}
        {currentTab === 'section4' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 4
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept4.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept4.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept4.theory}
              </div>

              {/* 5 Generation Techniques */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Structured Alternative Generation Methods
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4.generationTechniques.map((tech, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {i + 1}. {tech.name}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.45 }}>
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Assignment Deadlines Example Alternatives */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', margin: '0 0 0.5rem 0' }}>
                  💡 Generating Diverse Alternatives for One Real Problem
                </h3>
                <p style={{ color: '#166534', fontSize: '0.92rem', marginBottom: '1rem' }}>
                  <strong>Problem:</strong> {coreConcepts.concept4.workedExampleAlternatives.problem}
                </p>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {coreConcepts.concept4.workedExampleAlternatives.alternatives.map((alt) => (
                    <div key={alt.id} style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{alt.name}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px' }}>
                          {alt.type}
                        </span>
                      </div>
                      <div style={{ color: '#475569', fontSize: '0.85rem' }}>{alt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 3
                </button>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 4 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}



        {/* ======================================================== */}
        {/* TAB 5: 4 SOLVED MASTER EXAMPLES                          */}
        {/* ======================================================== */}
        {currentTab === 'examples' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                PRACTICAL MASTERY
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                4 Detailed Solved Master Examples
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Explore 4 complete, end-to-end problem solving breakdowns across academic performance, IT debugging, software selection, and college project deadlines. Each example follows the rigorous structured protocol:
              </p>

              {/* Example Selector Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {workedExamples.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(ex.id)}
                    style={{
                      padding: '0.5rem 0.9rem',
                      borderRadius: '8px',
                      border: selectedExample === ex.id ? '2px solid #1d4ed8' : '1px solid #cbd5e1',
                      background: selectedExample === ex.id ? '#eff6ff' : '#ffffff',
                      color: selectedExample === ex.id ? '#1e40af' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ex {idx + 1}: {ex.domain}
                  </button>
                ))}
              </div>

              {/* Active Example Card */}
              {(() => {
                const ex = workedExamples.find(e => e.id === selectedExample) || workedExamples[0];
                return (
                  <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.75rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '4px' }}>
                        {ex.domain}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                        10-Step Structured Breakdown
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                      {ex.title}
                    </h3>

                    <div style={{ display: 'grid', gap: '0.85rem' }}>
                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>1. Problem Statement:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.problemStatement}</span>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>2. Facts & Hard Constraints:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.factsAndConstraints}</span>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>3. Missing Information Needed:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.missingInfo}</span>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>4. Possible Underlying Causes:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.possibleCauses}</span>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.35rem' }}>5. Alternative Solutions Considered:</strong>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.5 }}>
                          {ex.alternatives.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>6. Decision Criteria & Weights:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.decisionCriteria}</span>
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#15803d', display: 'block', marginBottom: '0.2rem' }}>7 & 8. Recommended Solution & Justification:</strong>
                        <div style={{ fontWeight: 700, color: '#065f46', fontSize: '0.92rem', marginBottom: '0.25rem' }}>{ex.recommendedSolution}</div>
                        <div style={{ color: '#166534', fontSize: '0.86rem', lineHeight: 1.5 }}>{ex.justification}</div>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>9. Implementation Plan:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem' }}>{ex.actionPlan}</span>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.2rem' }}>10. Measurable Success Indicator:</strong>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 600 }}>{ex.successIndicator}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section8')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 8
                </button>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 3 Timed Practice Sets →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 11: 3 TIMED PRACTICE SETS                            */}
        {/* ======================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                TIMED HANDS-ON PRACTICE
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                3 Progressive Problem-Solving Practice Sets
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Test your ability to frame problems, calculate decision matrices, and build defensible action plans with live timers, immediate explanations, and retry controls.
              </p>

              {/* PRACTICE SET A */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
                      {practiceSetA.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetA.subtitle}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <Clock size={16} color="#2563eb" />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerA < 60 ? '#dc2626' : '#1d4ed8' }}>
                      {formatTimer(timerA)}
                    </span>
                    <button onClick={() => handlePracticeReset('set_a')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set A">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {practiceSetA.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_a?.[q.id];
                    const isSub = practiceSubmitted.set_a?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{idx + 1}. {q.question}
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handlePracticeSelect('set_a', q.id, optIdx)}
                              disabled={isSub}
                              style={{
                                padding: '0.65rem 0.9rem',
                                borderRadius: '6px',
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #2563eb') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#eff6ff') : '#ffffff',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                color: '#1e293b',
                                cursor: isSub ? 'default' : 'pointer'
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {!isSub ? (
                          <button
                            onClick={() => handlePracticeSubmit('set_a', q.id)}
                            disabled={sel === undefined}
                            style={{ background: sel !== undefined ? '#1d4ed8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
                          >
                            Confirm Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#9f1239' }}>
                            <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRACTICE SET B */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
                      {practiceSetB.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetB.subtitle}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <Clock size={16} color="#2563eb" />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerB < 60 ? '#dc2626' : '#1d4ed8' }}>
                      {formatTimer(timerB)}
                    </span>
                    <button onClick={() => handlePracticeReset('set_b')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set B">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {practiceSetB.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_b?.[q.id];
                    const isSub = practiceSubmitted.set_b?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{idx + 1}. {q.question}
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handlePracticeSelect('set_b', q.id, optIdx)}
                              disabled={isSub}
                              style={{
                                padding: '0.65rem 0.9rem',
                                borderRadius: '6px',
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #2563eb') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#eff6ff') : '#ffffff',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                color: '#1e293b',
                                cursor: isSub ? 'default' : 'pointer'
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {!isSub ? (
                          <button
                            onClick={() => handlePracticeSubmit('set_b', q.id)}
                            disabled={sel === undefined}
                            style={{ background: sel !== undefined ? '#1d4ed8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
                          >
                            Confirm Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#9f1239' }}>
                            <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRACTICE SET C */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
                      {practiceSetC.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetC.subtitle}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <Clock size={16} color="#2563eb" />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerC < 60 ? '#dc2626' : '#1d4ed8' }}>
                      {formatTimer(timerC)}
                    </span>
                    <button onClick={() => handlePracticeReset('set_c')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set C">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {practiceSetC.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_c?.[q.id];
                    const isSub = practiceSubmitted.set_c?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{idx + 1}. {q.question}
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handlePracticeSelect('set_c', q.id, optIdx)}
                              disabled={isSub}
                              style={{
                                padding: '0.65rem 0.9rem',
                                borderRadius: '6px',
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #2563eb') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#eff6ff') : '#ffffff',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                color: '#1e293b',
                                cursor: isSub ? 'default' : 'pointer'
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {!isSub ? (
                          <button
                            onClick={() => handlePracticeSubmit('set_c', q.id)}
                            disabled={sel === undefined}
                            style={{ background: sel !== undefined ? '#1d4ed8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
                          >
                            Confirm Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#9f1239' }}>
                            <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Solved Examples
                </button>
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Real-World Case Study →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 12: REAL-WORLD CASE STUDY                            */}
        {/* ======================================================== */}
        {currentTab === 'casestudy' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXECUTIVE PROBLEM SOLVING LAB
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {caseStudyData.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {caseStudyData.context}
              </p>

              {/* Data Table */}
              <div style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Performance Metric</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800 }}>Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudyData.metricsTable.map((m, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{m.metric}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, color: '#1d4ed8' }}>{m.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 10 Case Tasks Overview */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                10-Step Problem Solver Journey
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem', marginBottom: '2rem' }}>
                {caseStudyData.tasks.map((t) => (
                  <div key={t.step} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.85rem' }}>
                      Task {t.step}: {t.label}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px' }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Decision Matrix */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Interactive Decision Matrix: Evaluate Candidate Solutions
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1rem' }}>
                Click on any alternative to evaluate its scores and trade-offs against the ₹3,000 budget and 2-staff constraints:
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {caseStudyData.interactiveMatrix.solutions.map((sol) => {
                  const isSel = selectedCaseSol === sol.id;
                  return (
                    <div
                      key={sol.id}
                      onClick={() => setSelectedCaseSol(sol.id)}
                      style={{
                        background: isSel ? '#eff6ff' : '#ffffff',
                        border: isSel ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{sol.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '4px' }}>
                            Cost: {sol.cost}
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, background: '#dbeafe', color: '#1e40af', padding: '2px 10px', borderRadius: '12px' }}>
                            Weighted: {sol.weightedScore} pts
                          </span>
                        </div>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 0.75rem 0' }}>{sol.desc}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', fontSize: '0.82rem' }}>
                        <div style={{ color: '#15803d', background: '#dcfce7', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                          ✓ <strong>Advantage:</strong> {sol.pros}
                        </div>
                        <div style={{ color: '#b91c1c', background: '#fee2e2', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                          ⚠️ <strong>Drawback:</strong> {sol.cons}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Student Submission Area */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  ✍️ Your Recommendation Justification:
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  Briefly explain why your selected option is superior to the others, how it respects the ₹3,000 budget, and what KPI you will track:
                </p>
                <textarea
                  value={caseStudyNotes}
                  onChange={(e) => setCaseStudyNotes(e.target.value)}
                  placeholder="Example: Solution 1 solves the 46h response latency using WhatsApp automation for only ₹1,200/mo, leaving ₹1,800 buffer. We will measure first callback time..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                    marginBottom: '0.75rem'
                  }}
                />
                <button
                  onClick={() => setIsCaseSubmitted(true)}
                  style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  Submit Recommendation & Reveal Official Model Answer
                </button>
              </div>

              {/* Official Model Answer Reveal */}
              {isCaseSubmitted && (
                <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '14px', padding: '1.75rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <CheckCircle size={22} color="#16a34a" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                      Official Expert Model Answer
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>1. Airtight Problem Statement:</strong>
                      <div style={{ color: '#166534', fontSize: '0.9rem', lineHeight: 1.5 }}>{caseStudyData.modelAnswer.problemStatement}</div>
                    </div>

                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>2. Root Cause Synthesis:</strong>
                      <div style={{ color: '#166534', fontSize: '0.9rem', lineHeight: 1.5 }}>{caseStudyData.modelAnswer.rootCauseAnalysis}</div>
                    </div>

                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>3. Selected Solution & Rationale:</strong>
                      <div style={{ color: '#166534', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        <strong>{caseStudyData.modelAnswer.recommendedOption}</strong> — {caseStudyData.modelAnswer.justification}
                      </div>
                    </div>

                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.35rem' }}>4. 1-Week Action Plan:</strong>
                      <div style={{ display: 'grid', gap: '0.35rem' }}>
                        {caseStudyData.modelAnswer.oneWeekActionPlan.map((p, i) => (
                          <div key={i} style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#166534', border: '1px solid #bbf7d0' }}>
                            <strong>{p.day} ({p.owner}):</strong> {p.task}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>5. Success Verification Metrics:</strong>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#166534', fontSize: '0.88rem' }}>
                        {caseStudyData.modelAnswer.kpis.map((k, i) => <li key={i}>{k}</li>)}
                      </ul>
                    </div>

                    <div>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>6. Pre-Planned Contingency Fallback:</strong>
                      <div style={{ color: '#166534', fontSize: '0.88rem' }}>{caseStudyData.modelAnswer.fallbackPlan}</div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Practice Sets
                </button>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Mistakes & Checklist →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 13: MISTAKES & CHECKLIST                             */}
        {/* ======================================================== */}
        {currentTab === 'mistakes' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXAM & CAREER TRAPS
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Top 10 Problem-Solving Mistakes & How to Avoid Them
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Review these universal cognitive traps that cost candidates marks in aptitude assessments and lead to expensive operational failures in business.
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                {commonMistakes.map((m, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {m.mistake}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {m.explanation}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
                      💡 <strong>Disciplined Remedy:</strong> {m.remedy}
                    </div>
                  </div>
                ))}
              </div>

              {/* 10-Point Checklist */}
              <div style={{ background: '#eff6ff', border: '2px solid #93c5fd', borderRadius: '14px', padding: '1.75rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 1rem 0' }}>
                  📋 The 10-Point Master Problem-Solving Checklist
                </h3>
                <div style={{ display: 'grid', gap: '0.65rem' }}>
                  {practicalChecklist.map((ch, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b' }}>
                      {ch}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Case Study
                </button>
                <button onClick={() => handleTabChange('assessment')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Final Assessment (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 14: TIMED FINAL ASSESSMENT (20 QUESTIONS)            */}
        {/* ======================================================== */}
        {currentTab === 'assessment' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                    LEVEL 2 DAY 10 FINAL ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Timed Final Assessment (20 Questions: Easy, Medium & Hard)
                  </h2>
                </div>

                {/* 25-Minute Countdown Clock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: assessmentTimer < 180 ? '#fee2e2' : '#f8fafc', padding: '0.5rem 1rem', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}>
                  <Clock size={18} style={{ color: assessmentTimer < 180 ? '#dc2626' : '#2563eb' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: assessmentTimer < 180 ? '#dc2626' : '#1d4ed8' }}>
                    {formatTimer(assessmentTimer)}
                  </span>
                </div>
              </div>

              {!assessmentFinished ? (
                <div>
                  {/* Difficulty Filter Tabs */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginRight: '0.25rem' }}>Filter by Level:</span>
                    {[
                      { id: 'all', label: 'All (20)' },
                      { id: 'Easy', label: '🟢 Easy (Q1–Q7)', color: '#16a34a', bg: '#dcfce7', startIndex: 0 },
                      { id: 'Medium', label: '🟡 Medium (Q8–Q14)', color: '#d97706', bg: '#fef3c7', startIndex: 7 },
                      { id: 'Hard', label: '🔴 Hard (Q15–Q20)', color: '#dc2626', bg: '#fee2e2', startIndex: 14 }
                    ].map(filter => {
                      const isSelected = pillDifficultyFilter === filter.id;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => {
                            setPillDifficultyFilter(filter.id);
                            if (filter.startIndex !== undefined) {
                              setAssessmentIndex(filter.startIndex);
                            }
                          }}
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '20px',
                            border: isSelected ? `2px solid ${filter.color || '#2563eb'}` : '1px solid #cbd5e1',
                            background: isSelected ? (filter.bg || '#eff6ff') : '#ffffff',
                            color: isSelected ? (filter.color || '#1e40af') : '#475569',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.15s'
                          }}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Jump Pill Bar (1-20) */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {finalAssessmentQuestions.map((q, idx) => {
                      if (pillDifficultyFilter !== 'all' && q.difficulty !== pillDifficultyFilter) {
                        return null;
                      }

                      const isAns = assessmentAnswers[q.id] !== undefined;
                      const isSub = assessmentSubmitted[q.id];
                      const isCurr = assessmentIndex === idx;

                      let bg = '#f1f5f9';
                      let color = '#475569';
                      let borderColor = '#cbd5e1';
                      if (isSub) { bg = '#dcfce7'; color = '#166534'; borderColor = '#16a34a'; }
                      else if (isAns) { bg = '#fef3c7'; color = '#92400e'; borderColor = '#f59e0b'; }
                      if (isCurr) { bg = '#1d4ed8'; color = '#ffffff'; borderColor = '#1e40af'; }

                      const diffColor = q.difficulty === 'Easy' ? '#16a34a' : q.difficulty === 'Medium' ? '#d97706' : '#dc2626';

                      return (
                        <button
                          key={q.id}
                          onClick={() => setAssessmentIndex(idx)}
                          title={`Q${idx + 1} (${q.difficulty} - ${q.domain})`}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            border: isCurr ? '2px solid #1e40af' : `1.5px solid ${borderColor}`,
                            borderBottom: !isCurr ? `3px solid ${diffColor}` : '2px solid #1e40af',
                            background: bg,
                            color: color,
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Question Card */}
                  {(() => {
                    const currentQ = finalAssessmentQuestions[assessmentIndex];
                    const selectedOpt = assessmentAnswers[currentQ.id];
                    const isSub = Boolean(assessmentSubmitted[currentQ.id]);
                    const isCorrect = selectedOpt === currentQ.correctAnswer;

                    return (
                      <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', background: '#dbeafe', padding: '2px 8px', borderRadius: '4px' }}>
                              {currentQ.domain}
                            </span>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: currentQ.difficulty === 'Easy' ? '#dcfce7' : currentQ.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                              color: currentQ.difficulty === 'Easy' ? '#166534' : currentQ.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                              border: `1px solid ${currentQ.difficulty === 'Easy' ? '#86efac' : currentQ.difficulty === 'Medium' ? '#fde68a' : '#fca5a5'}`
                            }}>
                              {currentQ.difficulty} Level
                            </span>
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                            Question {assessmentIndex + 1} of {finalAssessmentQuestions.length}
                          </span>
                        </div>

                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                          {currentQ.question}
                        </div>

                        <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {currentQ.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            let bg = '#ffffff';
                            let border = '#cbd5e1';

                            if (isSub) {
                              if (optIdx === currentQ.correctAnswer) { bg = '#dcfce7'; border = '#16a34a'; }
                              else if (isSelected) { bg = '#fee2e2'; border = '#dc2626'; }
                            } else if (isSelected) {
                              bg = '#eff6ff'; border = '#2563eb';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleAssessmentSelect(currentQ.id, optIdx)}
                                disabled={isSub}
                                style={{
                                  padding: '0.75rem 1rem',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${border}`,
                                  background: bg,
                                  fontWeight: isSelected ? 700 : 500,
                                  fontSize: '0.9rem',
                                  textAlign: 'left',
                                  cursor: isSub ? 'default' : 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Navigation controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button
                            onClick={() => setAssessmentIndex(prev => Math.max(0, prev - 1))}
                            disabled={assessmentIndex === 0}
                            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: assessmentIndex === 0 ? 'not-allowed' : 'pointer' }}
                          >
                            ← Previous
                          </button>

                          {!isSub ? (
                            <button
                              onClick={() => handleAssessmentSubmitQuestion(currentQ.id)}
                              disabled={selectedOpt === undefined}
                              style={{ background: selectedOpt !== undefined ? '#1d4ed8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem', cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed' }}
                            >
                              Confirm Answer
                            </button>
                          ) : (
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                              {isCorrect ? '✓ Recorded Correctly' : '✗ Recorded'}
                            </div>
                          )}

                          <button
                            onClick={() => setAssessmentIndex(prev => Math.min(finalAssessmentQuestions.length - 1, prev + 1))}
                            disabled={assessmentIndex === finalAssessmentQuestions.length - 1}
                            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: assessmentIndex === finalAssessmentQuestions.length - 1 ? 'not-allowed' : 'pointer' }}
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                      onClick={handleFinishAssessment}
                      style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.75rem 1.75rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                      Finish & Grade Assessment Early →
                    </button>
                  </div>
                </div>
              ) : (
                /* Assessment Score Card & Results */
                <div>
                  <div style={{
                    background: savedProgress.assessmentPassed ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: `2px solid ${savedProgress.assessmentPassed ? '#2563eb' : '#f59e0b'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#1e40af' : '#92400e', marginBottom: '0.25rem' }}>
                      {savedProgress.assessmentScore} / {finalAssessmentQuestions.length} ({savedProgress.assessmentPercentage}%)
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: savedProgress.assessmentPassed ? '#1d4ed8' : '#b45309', marginBottom: '0.5rem' }}>
                      {savedProgress.assessmentPercentage >= 90
                        ? "🌟 Excellent (90–100%) – Strong Structured Problem-Solving Mastery!"
                        : savedProgress.assessmentPercentage >= 75
                        ? "🎯 Good (75–89%) – Minor practice required."
                        : savedProgress.assessmentPercentage >= 60
                        ? "📈 Developing (60–74%) – Improve analysis and solution evaluation."
                        : "⚠️ Needs Improvement (<60%) – Review core concepts and retry."}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                      Time Taken: {formatTimer(1500 - assessmentTimer)} out of 25:00 minutes. Accuracy threshold for Day 10 completion is 60% (12/20).
                    </div>

                    {/* Domain Breakdown / Weak Area Diagnosis */}
                    <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', maxWidth: '700px', margin: '0 auto 1.5rem', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                      <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                        📊 Skill Area Breakdown & Diagnosis:
                      </h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {Object.entries(getDomainBreakdown()).map(([dom, data]) => {
                          const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                          return (
                            <div key={dom} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                              <span style={{ color: '#334155', fontWeight: 600 }}>{dom}:</span>
                              <span style={{ fontWeight: 800, color: pct >= 75 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626' }}>
                                {data.correct} / {data.total} ({pct}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setIsReviewOpen(true)}
                        style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Review All {finalAssessmentQuestions.length} Answers
                      </button>
                      <button
                        onClick={handleResetAssessment}
                        style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <RotateCcw size={16} /> Retry Assessment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Modal */}
              {isReviewOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '850px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Assessment Review & Feedback</div>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => setReviewFilter('all')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'all' ? '#1d4ed8' : '#f1f5f9', color: reviewFilter === 'all' ? '#fff' : '#334155', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>All (20)</button>
                        <button onClick={() => setReviewFilter('Easy')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'Easy' ? '#16a34a' : '#dcfce7', color: reviewFilter === 'Easy' ? '#fff' : '#166534', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Easy (7)</button>
                        <button onClick={() => setReviewFilter('Medium')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'Medium' ? '#d97706' : '#fef3c7', color: reviewFilter === 'Medium' ? '#fff' : '#92400e', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Medium (7)</button>
                        <button onClick={() => setReviewFilter('Hard')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'Hard' ? '#dc2626' : '#fee2e2', color: reviewFilter === 'Hard' ? '#fff' : '#991b1b', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Hard (6)</button>
                        <button onClick={() => setReviewFilter('incorrect')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'incorrect' ? '#dc2626' : '#fee2e2', color: reviewFilter === 'incorrect' ? '#fff' : '#991b1b', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Incorrect</button>
                        <button onClick={() => setReviewFilter('correct')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'correct' ? '#16a34a' : '#dcfce7', color: reviewFilter === 'correct' ? '#fff' : '#166534', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>Correct</button>
                        <button onClick={() => setIsReviewOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'grid', gap: '1rem' }}>
                      {finalAssessmentQuestions.filter(q => {
                        const isCorrect = assessmentAnswers[q.id] === q.correctAnswer;
                        if (reviewFilter === 'incorrect') return !isCorrect;
                        if (reviewFilter === 'correct') return isCorrect;
                        if (reviewFilter === 'Easy') return q.difficulty === 'Easy';
                        if (reviewFilter === 'Medium') return q.difficulty === 'Medium';
                        if (reviewFilter === 'Hard') return q.difficulty === 'Hard';
                        return true;
                      }).map((q, idx) => {
                        const userAns = assessmentAnswers[q.id];
                        const isCorrect = userAns === q.correctAnswer;
                        return (
                          <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>
                                {q.domain}
                              </span>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: q.difficulty === 'Easy' ? '#166534' : q.difficulty === 'Medium' ? '#92400e' : '#991b1b', background: q.difficulty === 'Easy' ? '#dcfce7' : q.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                                {q.difficulty}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', whiteSpace: 'pre-line' }}>{q.question}</div>
                            <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                              Your Answer: <strong style={{ color: isCorrect ? '#16a34a' : '#dc2626' }}>{userAns !== undefined ? `${q.options[userAns]}` : 'Unanswered'}</strong>
                            </div>
                            {!isCorrect && (
                              <div style={{ fontSize: '0.85rem', color: '#16a34a', marginBottom: '0.5rem' }}>
                                Correct Answer: <strong>{q.options[q.correctAnswer]}</strong>
                              </div>
                            )}
                            <div style={{ fontSize: '0.82rem', color: '#334155', background: '#ffffff', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
                              {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Mistakes & Tips
                </button>
                <button onClick={() => handleTabChange('summary')} style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Next: Revision & Framework Sheet →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 15: REVISION SUMMARY CHEAT SHEET                     */}
        {/* ======================================================== */}
        {currentTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXECUTIVE SUMMARY
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {revisionCheatSheet.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                Bookmark this reference sheet to review the universal 8-step problem solving cycle and golden operational principles before technical interviews and exam sittings.
              </p>

              {/* Framework Step Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {revisionCheatSheet.frameworkSteps.map((st) => (
                  <div key={st.code} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ display: 'inline-block', background: '#1e3a8a', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.4rem' }}>
                      {st.code}
                    </div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {st.step}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {st.summary}
                    </div>
                  </div>
                ))}
              </div>

              {/* Golden Rules */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                5 Golden Examination & Decision Rules
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {revisionCheatSheet.goldenRules.map((rule, idx) => (
                  <div key={idx} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#1e40af', fontWeight: 600 }}>
                    <Check size={18} style={{ color: '#2563eb', flexShrink: 0 }} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              {/* Completion Congratulatory Card */}
              <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px -4px rgba(30, 58, 138, 0.3)'
              }}>
                <Award size={48} color="#93c5fd" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Congratulations on Completing Level 2, Day 10!
                </h3>
                <p style={{ color: '#bfdbfe', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You have mastered defining problems with empirical data, isolating root causes, building MECE decomposition trees, and generating creative alternatives. Continue to Day 11 to master Decision Criteria, Risk Analysis, and Action Planning!
                </p>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{
                    background: '#ffffff',
                    color: '#1e3a8a',
                    border: 'none',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Return to Assessment & Review Results
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
