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
  day11Overview,
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
} from '../../data/reasoningLevel2Day11.js';

export default function SpokoReasoningDay11({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d11_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for Day 11 progress tracking
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
        completedDay: false
      };
    }
  });

  // Save Day 11 progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 11 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync with global completedLessons
  useEffect(() => {
    if (savedProgress.completedDay && typeof window !== 'undefined') {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l2_d11:day11';
      if (!completedLessons.includes(lessonKey)) {
        try {
          const raw = localStorage.getItem('lms_completed_lessons');
          const currentList = raw ? JSON.parse(raw) : [];
          if (!currentList.includes(lessonKey)) {
            currentList.push(lessonKey);
            localStorage.setItem('lms_completed_lessons', JSON.stringify(currentList));
          }
        } catch {}
      }
    }
  }, [savedProgress.completedDay, completedLessons]);

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
      onNavigate('spoko_reasoning_l2_d11', tabId);
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

  const handlePracticeSelect = (setId, qId, optLetter) => {
    if (practiceSubmitted[setId]?.[qId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: optLetter }
    }));
    if (setId === 'set_a' && !isTimerARunning) setIsTimerARunning(true);
    if (setId === 'set_b' && !isTimerBRunning) setIsTimerBRunning(true);
    if (setId === 'set_c' && !isTimerCRunning) setIsTimerCRunning(true);
  };

  const handlePracticeSubmitQuestion = (setId, qId) => {
    if (practiceSubmitted[setId]?.[qId]) return;
    if (!practiceAnswers[setId]?.[qId]) return;

    setPracticeSubmitted(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: true }
    }));
  };

  const handleResetPracticeSet = (setId) => {
    setPracticeAnswers(prev => ({ ...prev, [setId]: {} }));
    setPracticeSubmitted(prev => ({ ...prev, [setId]: {} }));
    if (setId === 'set_a') { setTimerA(practiceSetA.timeLimitSeconds); setIsTimerARunning(false); }
    if (setId === 'set_b') { setTimerB(practiceSetB.timeLimitSeconds); setIsTimerBRunning(false); }
    if (setId === 'set_c') { setTimerC(practiceSetC.timeLimitSeconds); setIsTimerCRunning(false); }
  };

  // Case Study User Answers
  const [caseStudyNotes, setCaseStudyNotes] = useState({});
  const [showCaseStudyModel, setShowCaseStudyModel] = useState(false);

  // ==========================================
  // FINAL ASSESSMENT INTERACTIVE STATE
  // ==========================================
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentTimer, setAssessmentTimer] = useState(1500); // 25 mins
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentCurrentIdx, setAssessmentCurrentIdx] = useState(0);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [pillDifficultyFilter, setPillDifficultyFilter] = useState('all');
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
    const passed = percentage >= 60;

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
    const allSubmitted = {};
    finalAssessmentQuestions.forEach(q => {
      allSubmitted[q.id] = true;
    });
    setAssessmentSubmitted(allSubmitted);
    calculateAndFinishAssessment(allSubmitted, assessmentAnswers);
  };

  const handleRetakeAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentSubmitted({});
    setAssessmentFinished(false);
    setAssessmentTimer(1500);
    setIsAssessmentTimerRunning(false);
    setAssessmentCurrentIdx(0);
    setSavedProgress(prev => ({
      ...prev,
      assessmentAnswers: {},
      assessmentSubmitted: {},
      assessmentFinished: false
    }));
  };

  // Format MM:SS helper
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Performance classification text
  const getPerformanceBadge = (pct) => {
    if (pct >= 90) return { label: "Excellent – Exceptional Decision & Execution Skills!", color: "#166534", bg: "#dcfce7", border: "#86efac" };
    if (pct >= 75) return { label: "Good – Solid Evaluation and Planning Ability!", color: "#1e40af", bg: "#dbeafe", border: "#93c5fd" };
    if (pct >= 60) return { label: "Developing – Review Risk Management & Matrix Math", color: "#854d0e", bg: "#fef9c3", border: "#fde047" };
    return { label: "Needs Improvement – Revisit Core Concepts & Practice", color: "#991b1b", bg: "#fee2e2", border: "#fca5a5" };
  };

  // Filtered questions for pill view
  const filteredAssessmentQuestions = finalAssessmentQuestions.filter(q => {
    if (pillDifficultyFilter === 'all') return true;
    return q.level === pillDifficultyFilter;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#0f172a'
    }}>
      {/* Top Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        color: '#ffffff',
        padding: '2.5rem 2rem 2rem',
        borderBottom: '4px solid #10b981',
        boxShadow: '0 4px 20px rgba(6, 78, 59, 0.15)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={14} color="#6ee7b7" />
            AlphaFly Logical Reasoning • Level 2 – Intermediate • Day 11
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Structured Problem Solving (Part 2)
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#a7f3d0',
            maxWidth: '820px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Decision Criteria, Risk Analysis, and Action Planning: Learn how to compare competing solutions with weighted matrices, evaluate trade-offs, justify selections, and execute 5W1H implementation plans.
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
              <Clock size={15} color="#6ee7b7" /> 45–60 Minutes
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={15} color="#6ee7b7" /> 4 Core Concepts
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#6ee7b7" /> 4 Solved Master Examples
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={15} color="#6ee7b7" /> 20 Timed Assessment Qs (Easy, Medium, Hard)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}>
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & LEARNING OBJECTIVES                     */}
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
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Welcome to Day 11: Evaluation, Decision & Execution
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {day11Overview.description}
              </p>

              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534', margin: '0 0 0.75rem 0' }}>
                  🎯 Day 11 Learning Objectives
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#14532d', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {day11Overview.learningObjectives.map((obj, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Starter Scenario Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <HelpCircle size={20} color="#059669" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lessonIntro.starterScenario.title}
                  </h3>
                </div>
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {lessonIntro.starterScenario.context}
                </p>
                <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem', color: '#991b1b', fontSize: '0.9rem' }}>
                  <strong>The Hasty Urge:</strong> {lessonIntro.starterScenario.initialUrge}
                </div>
                <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1.25rem', color: '#92400e', fontSize: '0.9rem' }}>
                  <strong>Why it's Dangerous:</strong> {lessonIntro.starterScenario.whyUrgeIsDangerous}
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Key Diagnostic Questions:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {lessonIntro.starterScenario.diagnosticQuestions.map((q, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem' }}>
                      <div style={{ fontWeight: 700, color: '#065f46', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                        {q.question}
                      </div>
                      <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.4 }}>
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7-Step Cycle Cards */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                The Decision & Execution Lifecycle
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {lessonIntro.cycleSteps.map(st => (
                  <div key={st.step} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#059669' }} />
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', marginBottom: '0.25rem' }}>
                      STEP {st.step}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 }}>
                      {st.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: '#059669',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
                  }}
                >
                  Start Concept 1: Decision Criteria & Matrices <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONCEPT 1 - DECISION CRITERIA & MATRICES          */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 1
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept1.title}
              </h2>
              <p style={{ color: '#059669', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>
                {coreConcepts.concept1.subtitle}
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept1.theory}
              </p>

              {/* 5-Step Guide */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Steps to Build an Objective Decision Matrix
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {coreConcepts.concept1.matrixGuide.map((step, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {step.step}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {step.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Worked Decision Matrix */}
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>
                  📊 {coreConcepts.concept1.workedMatrix.title}
                </h3>
                <p style={{ color: '#14532d', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Weights: Effectiveness (3), Low Cost (2), Quick Setup (2), Low Friction (1).
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead>
                      <tr style={{ background: '#059669', color: '#ffffff', textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Alternative</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Eff. (×3)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Cost (×2)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Speed (×2)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Friction (×1)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Calculation & Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coreConcepts.concept1.workedMatrix.rows.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{row.option}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.scores.eff}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.scores.cost}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.scores.speed}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.scores.friction}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: row.total >= 33 ? '#059669' : '#dc2626' }}>
                            {row.total} pts ({row.weightedScore})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#ffffff', borderLeft: '4px solid #059669', padding: '0.75rem 1rem', borderRadius: '4px', color: '#166534', fontSize: '0.9rem' }}>
                  <strong>Strategic Synthesis:</strong> {coreConcepts.concept1.workedMatrix.synthesis}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('overview')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Overview
                </button>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Risks & Trade-offs →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONCEPT 2 - RISKS, TRADE-OFFS & COSTS             */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 2
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept2.title}
              </h2>
              <p style={{ color: '#059669', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>
                {coreConcepts.concept2.subtitle}
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept2.theory}
              </p>

              {/* 4 Risk Types */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                4 Categories of Hidden Decision Risks
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept2.riskFramework.map((rf, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {rf.type}
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                      <strong>Definition:</strong> {rf.definition}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
                      <strong>Example:</strong> {rf.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mitigation Grid */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Proactive Risk Mitigation Examples
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {coreConcepts.concept2.mitigationGrid.map((mg, idx) => (
                  <div key={idx} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                      ⚠️ Potential Risk: {mg.risk}
                    </div>
                    <div style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 600 }}>
                      🛡️ Built-in Mitigation: {mg.mitigation}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section1')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 1
                </button>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Selection & Justification →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONCEPT 3 - SELECTION & JUSTIFICATION             */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 3
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept3.title}
              </h2>
              <p style={{ color: '#059669', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>
                {coreConcepts.concept3.subtitle}
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept3.theory}
              </p>

              {/* 5-Part Justification Framework */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 5-Part Stakeholder Defense Structure
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.justificationStructure.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {item.element}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {item.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 2
                </button>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Action Planning & Results →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONCEPT 4 - ACTION PLANS, MILESTONES & KPIS       */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 4
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept4.title}
              </h2>
              <p style={{ color: '#059669', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>
                {coreConcepts.concept4.subtitle}
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept4.theory}
              </p>

              {/* 5W1H Grid */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 5W1H Implementation Blueprint
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4.fiveWOneH.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {item.component}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.4 }}>
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Post-Launch Monitoring */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Post-Launch Verification & KPIs
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4.postLaunchMonitoring.map((pl, idx) => (
                  <div key={idx} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {pl.concept}
                    </div>
                    <div style={{ color: '#14532d', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {pl.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 3
                </button>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 4 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: 4 SOLVED MASTER EXAMPLES                          */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                PRACTICAL MASTERY
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                4 Detailed Solved Master Examples
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Study these comprehensive breakdowns covering decision matrix math, secondary risk analysis, priority trade-offs, and stakeholder defense.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {workedExamples.map(ex => (
                  <div key={ex.id} style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                        {ex.title}
                      </span>
                      <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {ex.domain}
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.85rem', fontSize: '0.9rem', color: '#334155' }}>
                      <strong>Scenario:</strong> {ex.scenario}
                    </div>

                    <div style={{ marginBottom: '0.85rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '0.35rem' }}>Options Considered:</div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155' }}>
                        {ex.options.map((opt, oIdx) => (
                          <li key={oIdx}>{opt}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.85rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#166534', marginBottom: '0.35rem' }}>Analytical Reasoning Steps:</div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#14532d' }}>
                        {ex.analysisSteps.map((step, sIdx) => (
                          <li key={sIdx} style={{ marginBottom: '0.2rem' }}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: '#ecfdf5', borderLeft: '4px solid #10b981', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#065f46' }}>Recommended Choice:</strong> <span style={{ color: '#047857' }}>{ex.recommendedChoice}</span>
                      <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#065f46' }}><strong>Why:</strong> {ex.whyCorrect}</div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      <strong>Distractor Analysis:</strong> {ex.distractorAnalysis}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 4
                </button>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 3 Timed Practice Sets →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: 3 TIMED PRACTICE SETS (A, B, C)                   */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                INTERACTIVE DRILLS
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                3 Progressive Timed Practice Sets
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Complete these three timed sets with live timers, instant scoring, and step-by-step explanations.
              </p>

              {/* PRACTICE SET A */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {practiceSetA.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                      {practiceSetA.subtitle} • 5 Questions • 6 Minutes
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: timerA < 60 ? '#fee2e2' : '#f1f5f9', color: timerA < 60 ? '#dc2626' : '#0f172a', padding: '0.4rem 0.75rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={16} /> {formatTimer(timerA)}
                    </div>
                    <button onClick={() => handleResetPracticeSet('set_a')} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <RotateCcw size={13} /> Reset
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {practiceSetA.questions.map((q, qIdx) => {
                    const isSubmitted = practiceSubmitted.set_a?.[q.id];
                    const selected = practiceAnswers.set_a?.[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{qIdx + 1}. {q.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, oIdx) => {
                            const optLetter = opt.charAt(0);
                            const isOptSelected = selected === optLetter;
                            let btnBg = '#f8fafc';
                            let btnBorder = '#e2e8f0';
                            let btnColor = '#1e293b';

                            if (isSubmitted) {
                              if (optLetter === q.correctAnswer) {
                                btnBg = '#dcfce7'; btnBorder = '#86efac'; btnColor = '#166534';
                              } else if (isOptSelected) {
                                btnBg = '#fee2e2'; btnBorder = '#fca5a5'; btnColor = '#991b1b';
                              }
                            } else if (isOptSelected) {
                              btnBg = '#ecfdf5'; btnBorder = '#10b981'; btnColor = '#065f46';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handlePracticeSelect('set_a', q.id, optLetter)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${btnBorder}`,
                                  borderRadius: '8px',
                                  padding: '0.65rem 0.85rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  color: btnColor,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  fontWeight: isOptSelected ? 700 : 500,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={!selected}
                            onClick={() => handlePracticeSubmitQuestion('set_a', q.id)}
                            style={{
                              background: selected ? '#059669' : '#cbd5e1',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: selected ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.85rem' }}>
                            <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                              {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct answer is (${q.correctAnswer})`}
                            </div>
                            <div style={{ color: '#334155', lineHeight: 1.4 }}>{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRACTICE SET B */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {practiceSetB.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                      {practiceSetB.subtitle} • 5 Questions • 7 Minutes
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: timerB < 60 ? '#fee2e2' : '#f1f5f9', color: timerB < 60 ? '#dc2626' : '#0f172a', padding: '0.4rem 0.75rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={16} /> {formatTimer(timerB)}
                    </div>
                    <button onClick={() => handleResetPracticeSet('set_b')} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <RotateCcw size={13} /> Reset
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {practiceSetB.questions.map((q, qIdx) => {
                    const isSubmitted = practiceSubmitted.set_b?.[q.id];
                    const selected = practiceAnswers.set_b?.[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{qIdx + 1}. {q.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, oIdx) => {
                            const optLetter = opt.charAt(0);
                            const isOptSelected = selected === optLetter;
                            let btnBg = '#f8fafc';
                            let btnBorder = '#e2e8f0';
                            let btnColor = '#1e293b';

                            if (isSubmitted) {
                              if (optLetter === q.correctAnswer) {
                                btnBg = '#dcfce7'; btnBorder = '#86efac'; btnColor = '#166534';
                              } else if (isOptSelected) {
                                btnBg = '#fee2e2'; btnBorder = '#fca5a5'; btnColor = '#991b1b';
                              }
                            } else if (isOptSelected) {
                              btnBg = '#ecfdf5'; btnBorder = '#10b981'; btnColor = '#065f46';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handlePracticeSelect('set_b', q.id, optLetter)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${btnBorder}`,
                                  borderRadius: '8px',
                                  padding: '0.65rem 0.85rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  color: btnColor,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  fontWeight: isOptSelected ? 700 : 500
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={!selected}
                            onClick={() => handlePracticeSubmitQuestion('set_b', q.id)}
                            style={{
                              background: selected ? '#059669' : '#cbd5e1',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: selected ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.85rem' }}>
                            <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                              {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct answer is (${q.correctAnswer})`}
                            </div>
                            <div style={{ color: '#334155', lineHeight: 1.4 }}>{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRACTICE SET C */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {practiceSetC.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                      {practiceSetC.subtitle} • 5 Questions • 8 Minutes
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: timerC < 60 ? '#fee2e2' : '#f1f5f9', color: timerC < 60 ? '#dc2626' : '#0f172a', padding: '0.4rem 0.75rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={16} /> {formatTimer(timerC)}
                    </div>
                    <button onClick={() => handleResetPracticeSet('set_c')} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <RotateCcw size={13} /> Reset
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {practiceSetC.questions.map((q, qIdx) => {
                    const isSubmitted = practiceSubmitted.set_c?.[q.id];
                    const selected = practiceAnswers.set_c?.[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                          Q{qIdx + 1}. {q.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, oIdx) => {
                            const optLetter = opt.charAt(0);
                            const isOptSelected = selected === optLetter;
                            let btnBg = '#f8fafc';
                            let btnBorder = '#e2e8f0';
                            let btnColor = '#1e293b';

                            if (isSubmitted) {
                              if (optLetter === q.correctAnswer) {
                                btnBg = '#dcfce7'; btnBorder = '#86efac'; btnColor = '#166534';
                              } else if (isOptSelected) {
                                btnBg = '#fee2e2'; btnBorder = '#fca5a5'; btnColor = '#991b1b';
                              }
                            } else if (isOptSelected) {
                              btnBg = '#ecfdf5'; btnBorder = '#10b981'; btnColor = '#065f46';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handlePracticeSelect('set_c', q.id, optLetter)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${btnBorder}`,
                                  borderRadius: '8px',
                                  padding: '0.65rem 0.85rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  color: btnColor,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  fontWeight: isOptSelected ? 700 : 500
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={!selected}
                            onClick={() => handlePracticeSubmitQuestion('set_c', q.id)}
                            style={{
                              background: selected ? '#059669' : '#cbd5e1',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: selected ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.85rem' }}>
                            <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                              {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct answer is (${q.correctAnswer})`}
                            </div>
                            <div style={{ color: '#334155', lineHeight: 1.4 }}>{q.explanation}</div>
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
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Real-World Case Study →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: REAL-WORLD CASE STUDY (PART 2)                    */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                REAL-WORLD APPLICATION
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {caseStudyData.title}
              </h2>
              <p style={{ color: '#059669', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>
                {caseStudyData.subtitle}
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {caseStudyData.context}
              </p>

              {/* Proposals Comparison */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 3 Candidate Proposals
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {caseStudyData.alternativesEvaluated.map(prop => (
                  <div key={prop.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {prop.name}
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                      {prop.desc}
                    </p>
                    <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>Cost: {prop.cost}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>Time: {prop.time}</div>
                  </div>
                ))}
              </div>

              {/* Case Study Decision Matrix */}
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#166534', margin: '0 0 0.75rem 0' }}>
                  📊 Case Study Weighted Decision Matrix
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#ffffff', borderRadius: '6px' }}>
                    <thead>
                      <tr style={{ background: '#059669', color: '#ffffff', textAlign: 'left' }}>
                        <th style={{ padding: '0.6rem 0.85rem' }}>Criteria (Weights)</th>
                        <th style={{ padding: '0.6rem 0.85rem' }}>Proposal 1 (Fee Slash)</th>
                        <th style={{ padding: '0.6rem 0.85rem' }}>Proposal 2 (WhatsApp SLA)</th>
                        <th style={{ padding: '0.6rem 0.85rem' }}>Proposal 3 (Hire 2 Staff)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudyData.decisionMatrixTable.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0', fontWeight: rIdx === 4 ? 800 : 500 }}>
                          <td style={{ padding: '0.6rem 0.85rem', color: rIdx === 4 ? '#059669' : '#0f172a' }}>{row.criterion}</td>
                          <td style={{ padding: '0.6rem 0.85rem' }}>{row.sol1}</td>
                          <td style={{ padding: '0.6rem 0.85rem', color: '#059669' }}>{row.sol2}</td>
                          <td style={{ padding: '0.6rem 0.85rem' }}>{row.sol3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Guided Reflection Prompts */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Your Strategic Analysis (Guided Tasks)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {caseStudyData.tasks.map(t => (
                  <div key={t.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                      {t.prompt}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#059669', marginBottom: '0.5rem' }}>
                      💡 Hint: {t.hint}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Type your notes or analysis here..."
                      value={caseStudyNotes[t.id] || ''}
                      onChange={(e) => setCaseStudyNotes({ ...caseStudyNotes, [t.id]: e.target.value })}
                      style={{
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        padding: '0.5rem',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Reveal Model Answer Button */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <button
                  onClick={() => setShowCaseStudyModel(!showCaseStudyModel)}
                  style={{
                    background: showCaseStudyModel ? '#f1f5f9' : '#059669',
                    color: showCaseStudyModel ? '#475569' : '#ffffff',
                    border: '1px solid #059669',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {showCaseStudyModel ? 'Hide Expert Model Solution' : 'Reveal Expert Model Solution'}
                </button>
              </div>

              {showCaseStudyModel && (
                <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', margin: '0 0 0.5rem 0' }}>
                    🏆 Expert Model Analysis & Execution Plan
                  </h4>
                  <div style={{ marginBottom: '0.75rem', color: '#047857', fontSize: '0.9rem' }}>
                    <strong>Selected Solution:</strong> {caseStudyData.modelAnswer.winningSolution}
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    <strong>Justification:</strong> {caseStudyData.modelAnswer.rationale}
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    <strong>Risk Mitigations:</strong> {caseStudyData.modelAnswer.riskManagement}
                  </div>
                  <div style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    <strong>Target KPI Scorecard:</strong> {caseStudyData.modelAnswer.kpiScorecard}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Practice Sets
                </button>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Decision Mistakes & Checklist →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: COMMON MISTAKES & CHECKLIST                       */}
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
                AVOID PITFALLS
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                5 Common Decision & Execution Traps
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Learn to recognize these common cognitive biases and operational pitfalls before they derail your projects.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {commonMistakes.map((m, idx) => (
                  <div key={idx} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      ❌ {m.mistake}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                      <strong>Why it occurs:</strong> {m.whyItHappens}
                    </div>
                    <div style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 600 }}>
                      ✓ Antidote / Correction: {m.correction}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical Checklist */}
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', margin: '0 0 1rem 0' }}>
                  ✓ Decision-Making & Execution Master Checklist
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {practicalChecklist.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#14532d' }}>
                      <CheckSquare size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Case Study
                </button>
                <button onClick={() => handleTabChange('assessment')} style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Final Assessment (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: 20-QUESTION FINAL ASSESSMENT                     */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                    LEVEL 2 DAY 11 FINAL ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Decision & Execution Mastery Assessment
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: assessmentTimer < 180 ? '#fee2e2' : '#f1f5f9', color: assessmentTimer < 180 ? '#dc2626' : '#0f172a', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} /> {formatTimer(assessmentTimer)}
                  </div>
                </div>
              </div>

              {/* Progress Bar & Filter Pills */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem' }}>
                  <span>Progress: {Object.keys(assessmentSubmitted).length} / 20 Questions Completed</span>
                  <span>Target: ≥ 60% (12 / 20)</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(Object.keys(assessmentSubmitted).length / 20) * 100}%`, height: '100%', background: '#059669', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {['all', 'Easy', 'Medium', 'Hard'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setPillDifficultyFilter(lvl)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      border: '1px solid',
                      borderColor: pillDifficultyFilter === lvl ? '#059669' : '#cbd5e1',
                      background: pillDifficultyFilter === lvl ? '#ecfdf5' : '#ffffff',
                      color: pillDifficultyFilter === lvl ? '#065f46' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    {lvl === 'all' ? 'All (20)' : `${lvl} (${finalAssessmentQuestions.filter(q => q.level === lvl).length})`}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredAssessmentQuestions.map((q, idx) => {
                  const isSubmitted = assessmentSubmitted[q.id];
                  const selected = assessmentAnswers[q.id];
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div key={q.id} style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669' }}>
                          QUESTION {finalAssessmentQuestions.findIndex(x => x.id === q.id) + 1} OF 20
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: q.level === 'Easy' ? '#dcfce7' : q.level === 'Medium' ? '#fef9c3' : '#fee2e2',
                          color: q.level === 'Easy' ? '#166534' : q.level === 'Medium' ? '#854d0e' : '#991b1b'
                        }}>
                          {q.level} • {q.domain}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#0f172a', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                        {q.question}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        {q.options.map((opt, oIdx) => {
                          const optLetter = opt.charAt(0);
                          const isOptSelected = selected === optLetter;
                          let optBg = '#ffffff';
                          let optBorder = '#cbd5e1';
                          let optColor = '#1e293b';

                          if (isSubmitted || assessmentFinished) {
                            if (optLetter === q.correctAnswer) {
                              optBg = '#dcfce7'; optBorder = '#86efac'; optColor = '#166534';
                            } else if (isOptSelected) {
                              optBg = '#fee2e2'; optBorder = '#fca5a5'; optColor = '#991b1b';
                            }
                          } else if (isOptSelected) {
                            optBg = '#ecfdf5'; optBorder = '#10b981'; optColor = '#065f46';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isSubmitted || assessmentFinished}
                              onClick={() => handleAssessmentSelect(q.id, optLetter)}
                              style={{
                                background: optBg,
                                border: `1.5px solid ${optBorder}`,
                                borderRadius: '8px',
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                fontSize: '0.9rem',
                                color: optColor,
                                cursor: (isSubmitted || assessmentFinished) ? 'default' : 'pointer',
                                fontWeight: isOptSelected ? 700 : 500,
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {!(isSubmitted || assessmentFinished) ? (
                        <button
                          disabled={!selected}
                          onClick={() => handleAssessmentSubmitQuestion(q.id)}
                          style={{
                            background: selected ? '#059669' : '#cbd5e1',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.45rem 1rem',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: selected ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Confirm Answer
                        </button>
                      ) : (
                        <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '8px', padding: '0.85rem', fontSize: '0.85rem' }}>
                          <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                            {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct answer is (${q.correctAnswer})`}
                          </div>
                          <div style={{ color: '#334155', lineHeight: 1.4, marginBottom: '0.25rem' }}>{q.explanation}</div>
                          <div style={{ color: '#64748b', fontSize: '0.8rem' }}><strong>Distractor Note:</strong> {q.distractorNotes}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Assessment Footer / Finish Controls */}
              {!assessmentFinished ? (
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={handleFinishAssessment}
                    style={{
                      background: '#059669',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 2rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                    }}
                  >
                    Finish & Submit Full Assessment (20 Qs)
                  </button>
                </div>
              ) : (
                <div style={{
                  marginTop: '2.5rem',
                  background: getPerformanceBadge(savedProgress.assessmentPercentage).bg,
                  border: `2px solid ${getPerformanceBadge(savedProgress.assessmentPercentage).border}`,
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <Award size={48} color={getPerformanceBadge(savedProgress.assessmentPercentage).color} style={{ margin: '0 auto 0.5rem' }} />
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: getPerformanceBadge(savedProgress.assessmentPercentage).color, margin: '0 0 0.5rem 0' }}>
                    {getPerformanceBadge(savedProgress.assessmentPercentage).label}
                  </h3>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Score: {savedProgress.assessmentScore} / 20 ({savedProgress.assessmentPercentage}%)
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                    Accuracy threshold for Day 11 completion is 60% (12/20). Your progress and score have been saved to your profile.
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      onClick={handleRetakeAssessment}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      <RotateCcw size={15} style={{ verticalAlign: 'middle', marginRight: '0.35rem' }} /> Retake Assessment
                    </button>
                    <button
                      onClick={() => handleTabChange('summary')}
                      style={{
                        background: '#059669',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      View Revision Summary & Complete Lesson →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 11: REVISION SUMMARY & FRAMEWORK SHEET               */}
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                SUMMARY & REVISION
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {revisionCheatSheet.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Keep this concise revision guide handy for aptitude examinations, interviews, and business project leadership.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {revisionCheatSheet.corePrinciples.map((cp, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {cp.title}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {cp.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Checklist Card */}
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', margin: '0 0 1rem 0' }}>
                  📋 6-Point Decision-Making Checklist
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {revisionCheatSheet.decisionChecklist.map((ch, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#14532d' }}>
                      <CheckCircle size={16} color="#059669" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Banner */}
              <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 0.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46', margin: '0 0 0.5rem 0' }}>
                  Congratulations on Completing Level 2, Day 11!
                </h3>
                <p style={{ color: '#047857', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                  You have mastered both Problem Framing (Day 10) and Decision-Making & Execution (Day 11). You are now prepared to advance to Level 3: Advanced Logical Deduction on Day 12!
                </p>
                <button
                  onClick={() => {
                    markSectionCompleted('summary');
                    setSavedProgress(prev => ({ ...prev, completedDay: true }));
                    alert("Day 11 Completed and Saved! 🎉 Ready for Level 3 on Day 12!");
                  }}
                  style={{
                    background: '#059669',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Save Progress & Complete Day 11 ✓
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
