import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, PieChart as PieChartIcon, TrendingUp, TrendingDown,
  Table as TableIcon, Calculator, CheckCircle2, XCircle, ArrowRight,
  ArrowLeft, RotateCcw, Clock, Sparkles, BookOpen, Layers, Target,
  Zap, HelpCircle, ChevronRight, AlertCircle, Eye, CheckSquare,
  Award, Filter, Shield, Activity, RefreshCw, AlertTriangle, FileText,
  CheckCircle, Play, Pause, Compass, Users, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day8Overview,
  coreConcepts,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  instituteCaseStudy,
  commonMistakes,
  examStrategies,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel2Day8.js';

export default function SpokoReasoningDay8({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d8_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for Day 8 progress tracking
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

  // Save Day 8 progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 8 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l2_d8:day8';
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonKey, completed: true })
      }).catch(() => {});

      fetch(`/api/students/${studentId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lessonKey,
          course: 'spoko_reasoning',
          score: savedProgress.assessmentScore,
          total: finalAssessmentQuestions.length
        })
      }).catch(() => {});
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, session]);

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
      onNavigate('spoko_reasoning_l2_d8', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // INTERACTIVE TOOLS / WIDGET STATES
  // ==========================================
  // Calculator Widget: % Change
  const [calcOld, setCalcOld] = useState(150);
  const [calcNew, setCalcNew] = useState(225);
  const percentChange = calcOld !== 0 ? (((calcNew - calcOld) / calcOld) * 100).toFixed(1) : 0;

  // Pie Chart Slices
  const [activePieIndex, setActivePieIndex] = useState(0);

  // Worked Examples Accordion
  const [activeExampleIdx, setActiveExampleIdx] = useState(0);

  // ==========================================
  // PRACTICE SETS (A, B, C) STATE & TIMERS
  // ==========================================
  const [activePracticeSet, setActivePracticeSet] = useState('set_a'); // 'set_a' | 'set_b' | 'set_c'
  
  // Practice state stores per set
  const [practiceAnswers, setPracticeAnswers] = useState({ set_a: {}, set_b: {}, set_c: {} });
  const [practiceSubmitted, setPracticeSubmitted] = useState({ set_a: {}, set_b: {}, set_c: {} });
  
  // Practice Timers
  const [timerA, setTimerA] = useState(practiceSetA.timeLimitSeconds);
  const [timerB, setTimerB] = useState(practiceSetB.timeLimitSeconds);
  const [timerC, setTimerC] = useState(practiceSetC.timeLimitSeconds);
  const [isTimerARunning, setIsTimerARunning] = useState(false);
  const [isTimerBRunning, setIsTimerBRunning] = useState(false);
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

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePracticeSelect = (setId, qId, optIdx) => {
    if (practiceSubmitted[setId]?.[qId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: optIdx }
    }));
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

  // ==========================================
  // CASE STUDY INTERACTIVE STATE
  // ==========================================
  const [caseStudyAnswers, setCaseStudyAnswers] = useState({});
  const [caseStudySubmitted, setCaseStudySubmitted] = useState({});

  const handleCaseStudySelect = (qId, optIdx) => {
    if (caseStudySubmitted[qId]) return;
    setCaseStudyAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleCaseStudySubmit = (qId) => {
    if (caseStudySubmitted[qId] || caseStudyAnswers[qId] === undefined) return;
    setCaseStudySubmitted(prev => ({ ...prev, [qId]: true }));
  };

  // ==========================================
  // FINAL ASSESSMENT (20 QUESTIONS: EASY, MEDIUM, HARD)
  // ==========================================
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentTimer, setAssessmentTimer] = useState(1200); // 20 minutes (1200s)
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

    // Check if all 20 answered
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
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
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
    setAssessmentTimer(1200);
    setIsAssessmentTimerRunning(false);
    setSavedProgress(prev => ({
      ...prev,
      assessmentAnswers: {},
      assessmentSubmitted: {},
      assessmentFinished: false,
      assessmentScore: 0,
      assessmentPercentage: 0,
      assessmentPassed: false
    }));
  };

  // Overall completed tabs calculation
  const allSectionTabs = ['overview', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'examples', 'practice', 'casestudy', 'mistakes', 'assessment', 'summary'];
  const progressPercent = Math.min(100, Math.round(((savedProgress.completedSections?.length || 1) / allSectionTabs.length) * 100));

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1.5rem', color: '#1e293b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
          >
            Dashboard
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d1', 'overview')}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
          >
            Logical Reasoning
          </button>
          <span>/</span>
          <span style={{ color: '#047857', fontWeight: 700 }}>Level 2: Intermediate</span>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 800 }}>Day 8: Data Interpretation</span>
        </div>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
          borderRadius: '20px',
          padding: '2rem 1.75rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(6, 78, 59, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Sparkles size={14} />
                <span>Level 2: Intermediate • Day 8</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Data Interpretation
              </h1>
              <p style={{ fontSize: '1.05rem', color: '#a7f3d0', lineHeight: 1.5, margin: 0 }}>
                {day8Overview.subtitle}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a7f3d0', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 8 Completion
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
                {progressPercent}%
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', marginTop: '0.5rem', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: '#34d399', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap', fontSize: '0.85rem', color: '#d1fae5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} /> <strong>7 Core Concepts</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TableIcon size={16} /> <strong>8 Solved Master Examples</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> <strong>3 Timed Practice Sets (15 Qs)</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} /> <strong>15-Question Final Assessment (20 Mins)</strong>
            </div>
          </div>
        </div>


        {/* ========================================================== */}
        {/* TAB 0: OVERVIEW & OBJECTIVES */}
        {/* ========================================================== */}
        {currentTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={24} style={{ color: '#059669' }} />
                What is Data Interpretation?
              </h2>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: '#334155', marginBottom: '1.5rem' }}>
                {coreConcepts.intro.summary}
              </p>

              <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} />
                  {coreConcepts.intro.goldenRule}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Why is Data Interpretation Critical?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.intro.importance.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Day 8 Learning Objectives
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day8Overview.learningObjectives.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ background: '#d1fae5', color: '#059669', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.5 }}>{obj}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Concept 1: Reading Tables <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 1: READING TABLES */}
        {/* ========================================================== */}
        {currentTab === 'section1' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 1 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept1_tables.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept1_tables.description}
              </p>

              {/* 4-Step Protocol */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The 4-Step Table Inspection Protocol
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept1_tables.readingProtocol.map((p, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem', marginBottom: '0.35rem' }}>{p.step}</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{p.detail}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Sample Table */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Live Table: {coreConcepts.concept1_tables.sampleDataset.title}
              </h3>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      {coreConcepts.concept1_tables.sampleDataset.columns.map((col, cIdx) => (
                        <th key={cIdx} style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#1e293b' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coreConcepts.concept1_tables.sampleDataset.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0', background: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        {row.map((cell, idx) => (
                          <td key={idx} style={{ padding: '0.75rem 1rem', fontWeight: idx === 0 || idx === row.length - 1 ? 700 : 500, color: idx === 0 ? '#0f172a' : idx === row.length - 1 ? '#059669' : '#334155' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr style={{ background: '#e2e8f0', fontWeight: 800, color: '#0f172a' }}>
                      {coreConcepts.concept1_tables.sampleDataset.totals.map((t, idx) => (
                        <td key={idx} style={{ padding: '0.75rem 1rem' }}>{t}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Key Insights from Table:</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#1e40af', lineHeight: 1.6 }}>
                  {coreConcepts.concept1_tables.keyInsights.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('overview')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Overview
                </button>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Bar Charts →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: BAR CHARTS */}
        {/* ========================================================== */}
        {currentTab === 'section2' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 2 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept2_barcharts.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept2_barcharts.description}
              </p>

              {/* Visual SVG Grouped Bar Chart */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>
                  Comparison: January vs April Shipments Across Medical Device Models
                </h4>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '14px', height: '14px', background: '#3b82f6', borderRadius: '3px' }} />
                    <span style={{ fontWeight: 600 }}>January Shipments (Units)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '14px', height: '14px', background: '#10b981', borderRadius: '3px' }} />
                    <span style={{ fontWeight: 600 }}>April Shipments (Units)</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {coreConcepts.concept2_barcharts.dataset.map((item, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 700 }}>
                        <span>{item.model}</span>
                        <span style={{ color: '#059669' }}>Growth: +{item.apr - item.jan} units</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ width: '45px', fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700 }}>Jan: {item.jan}</div>
                        <div style={{ flex: 1, background: '#e2e8f0', height: '12px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${(item.jan / 110) * 100}%`, height: '100%', background: '#3b82f6' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                        <div style={{ width: '45px', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Apr: {item.apr}</div>
                        <div style={{ flex: 1, background: '#e2e8f0', height: '12px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${(item.apr / 110) * 100}%`, height: '100%', background: '#10b981' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem' }}>Analytical Warning:</div>
                <div style={{ fontSize: '0.88rem', color: '#78350f', marginTop: '0.25rem' }}>
                  {coreConcepts.concept2_barcharts.workedNote}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Tables
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Pie Charts →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: PIE CHARTS */}
        {/* ========================================================== */}
        {currentTab === 'section3' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 3 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept3_piecharts.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept3_piecharts.description}
              </p>

              {/* Core Formulas */}
              <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065f46' }}>
                  {coreConcepts.concept3_piecharts.formula}
                </div>
              </div>

              {/* Interactive Pie Chart Explorer */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
                {/* SVG Visual Pie */}
                <div style={{ textAlign: 'center' }}>
                  <svg width="220" height="220" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)', borderRadius: '50%' }}>
                    {/* Circle sectors using dasharray: 30%, 25%, 20%, 15%, 10% */}
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="0" />
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-30" />
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="-55" />
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="15 85" strokeDashoffset="-75" />
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ec4899" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-90" />
                  </svg>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 600 }}>Total Fleet: 600 Installed Medical Devices (100%)</div>
                </div>

                {/* Slices list */}
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {coreConcepts.concept3_piecharts.dataset.distribution.map((d, idx) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
                    return (
                      <div
                        key={idx}
                        onClick={() => setActivePieIndex(idx)}
                        style={{
                          background: activePieIndex === idx ? '#f0fdf4' : '#ffffff',
                          border: `1.5px solid ${activePieIndex === idx ? '#059669' : '#e2e8f0'}`,
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors[idx] }} />
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>{d.category}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                          <strong>{d.percentage}%</strong> ({d.count} units / {d.angle}°)
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Solved Examples */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                  Worked Pie Calculations:
                </h4>
                {coreConcepts.concept3_piecharts.examples.map((ex, i) => (
                  <div key={i} style={{ marginBottom: i === 0 ? '0.75rem' : 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{ex.question}</div>
                    <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>{ex.steps}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Bar Charts
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Percentages & % Change →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: PERCENTAGES AND PERCENTAGE CHANGE */}
        {/* ========================================================== */}
        {currentTab === 'section4' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 4 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept4_percentages.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept4_percentages.description}
              </p>

              {/* Master Formula Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4_percentages.formulas.map((f, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', marginBottom: '0.25rem' }}>{f.name}</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{f.formula}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Percentage Change Playground */}
              <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800, color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calculator size={18} />
                  Interactive Percentage Change Tester
                </h4>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#065f46', marginBottom: '0.25rem' }}>
                      Old Value (Original Base):
                    </label>
                    <input
                      type="number"
                      value={calcOld}
                      onChange={(e) => setCalcOld(Number(e.target.value))}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '120px', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#065f46', marginBottom: '0.25rem' }}>
                      New Value (Updated):
                    </label>
                    <input
                      type="number"
                      value={calcNew}
                      onChange={(e) => setCalcNew(Number(e.target.value))}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '120px', fontWeight: 700 }}
                    />
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Computed Result:</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: percentChange >= 0 ? '#059669' : '#dc2626' }}>
                      {percentChange >= 0 ? `+${percentChange}% (Increase)` : `${percentChange}% (Decrease)`}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#065f46' }}>
                  Calculation: (({calcNew} − {calcOld}) ÷ {calcOld}) × 100 = ({calcNew - calcOld} ÷ {calcOld}) × 100 = {percentChange}%
                </div>
              </div>

              <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.95rem' }}>Critical Rule:</div>
                <div style={{ fontSize: '0.88rem', color: '#7f1d1d', marginTop: '0.25rem' }}>
                  {coreConcepts.concept4_percentages.criticalWarning}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Pie Charts
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Ratios & Averages →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: RATIOS AND AVERAGES */}
        {/* ========================================================== */}
        {currentTab === 'section5' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 5 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept5_ratios_averages.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept5_ratios_averages.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    1. Ratios in Data Interpretation
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {coreConcepts.concept5_ratios_averages.ratiosGuide}
                  </p>
                  <div style={{ marginTop: '1rem', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <strong>Pro-Tip:</strong> Never reverse numerator and denominator. "Ratio of Boys to Girls" is B/G, NOT G/B.
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    2. Averages in Data Interpretation
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {coreConcepts.concept5_ratios_averages.averagesGuide}
                  </p>
                  <div style={{ marginTop: '1rem', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <strong>Pro-Tip:</strong> Look for column or row totals in tables first! Total ÷ Count is instantaneous if the total is already provided.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Percentages
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Line Charts & Trends →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 6: LINE CHARTS AND TREND ANALYSIS */}
        {/* ========================================================== */}
        {currentTab === 'section6' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 6 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept6_linecharts.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept6_linecharts.description}
              </p>

              {/* Trend Classifications */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept6_linecharts.trendTypes.map((t, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.92rem', marginBottom: '0.25rem' }}>{t.type}</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              {/* Visual SVG Line Trend Graph */}
              <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800, color: '#a7f3d0', textAlign: 'center' }}>
                  6-Month Revenue Trajectory (₹ in Thousands)
                </h4>
                
                {/* SVG Graph */}
                <div style={{ overflowX: 'auto', textAlign: 'center' }}>
                  <svg width="500" height="180" viewBox="0 0 500 180" style={{ maxWidth: '100%' }}>
                    {/* Grid lines */}
                    <line x1="50" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="50" y1="70" x2="480" y2="70" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="50" y1="120" x2="480" y2="120" stroke="#334155" strokeDasharray="3 3" />

                    {/* Polyline line: Jan(120), Feb(150), Mar(140), Apr(180), May(210), Jun(200) */}
                    {/* Coords: (80,120), (150,90), (220,100), (290,60), (360,30), (430,40) */}
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      points="80,120 150,90 220,100 290,60 360,30 430,40"
                    />

                    {/* Data Points & Labels */}
                    {[
                      { m: "Jan", v: "₹1.2L", x: 80, y: 120 },
                      { m: "Feb", v: "₹1.5L", x: 150, y: 90 },
                      { m: "Mar", v: "₹1.4L*", x: 220, y: 100 },
                      { m: "Apr", v: "₹1.8L", x: 290, y: 60 },
                      { m: "May", v: "₹2.1L (Peak)", x: 360, y: 30 },
                      { m: "Jun", v: "₹2.0L", x: 430, y: 40 }
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#34d399" />
                        <text x={pt.x} y={pt.y - 10} fill="#f1f5f9" fontSize="11" fontWeight="700" textAnchor="middle">{pt.v}</text>
                        <text x={pt.x} y="160" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">{pt.m}</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  * March marks the first decline (-₹10k). May represents the all-time peak (₹2.1L).
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Ratios
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Drawing Conclusions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 7: DRAWING CONCLUSIONS VS ASSUMPTIONS */}
        {/* ========================================================== */}
        {currentTab === 'section7' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CONCEPT 7 OF 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {coreConcepts.concept7_conclusions.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {coreConcepts.concept7_conclusions.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={20} />
                    Valid Conclusion
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#14532d', lineHeight: 1.6, margin: 0 }}>
                    Must be mathematically proven by the numbers directly given in the table or graph. No outside opinions required.
                  </p>
                </div>

                <div style={{ background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <XCircle size={20} />
                    Unsupported Assumption
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#7f1d1d', lineHeight: 1.6, margin: 0 }}>
                    Introduces subjective causes ("teacher was great", "students lost interest", "economy improved") that cannot be established from raw numbers.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Line Trends
                </button>
                <button
                  onClick={() => handleTabChange('examples')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: 8 Solved Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 8: 8 SOLVED MASTER EXAMPLES */}
        {/* ========================================================== */}
        {currentTab === 'examples' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                PRACTICE & MASTERY
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                8 Worked Master Examples
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Step-by-step solutions demonstrating how to dissect question prompts, extract target data, apply formulas, and avoid distractor traps.
              </p>

              {/* Selector Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {workedExamples.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExampleIdx(idx)}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      background: activeExampleIdx === idx ? '#059669' : '#f1f5f9',
                      color: activeExampleIdx === idx ? '#ffffff' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Ex {idx + 1}
                  </button>
                ))}
              </div>

              {/* Selected Example Card */}
              {(() => {
                const ex = workedExamples[activeExampleIdx];
                return (
                  <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>
                      {ex.datasetDesc}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                        <strong>Question:</strong> {ex.question}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                      <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <strong>Required Data:</strong> {ex.requiredInfo}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <strong>Method:</strong> {ex.method}
                      </div>
                    </div>

                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.9rem', marginBottom: '0.35rem' }}>Step-by-Step Calculation:</div>
                      {ex.steps.map((st, sIdx) => (
                        <div key={sIdx} style={{ fontSize: '0.88rem', color: '#14532d', marginBottom: '0.25rem' }}>
                          • {st}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', background: '#059669', color: '#ffffff', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>Final Answer: {ex.finalAnswer}</span>
                      <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>{ex.explanation}</span>
                    </div>
                  </div>
                );
              })()}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Previous: Conclusions
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: 3 Timed Practice Sets →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 9: 3 TIMED PRACTICE SETS (A, B, C) */}
        {/* ========================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                TIMED ACTIVITIES
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Progressive Practice Activities
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Test your skills across 3 progressive tiers with countdown timers, immediate feedback, and step-by-step explanations.
              </p>

              {/* Set Switcher */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { id: 'set_a', label: 'Set A: Basic Intermediate (5 Qs)', time: '5 Mins' },
                  { id: 'set_b', label: 'Set B: Intermediate (5 Qs)', time: '7 Mins' },
                  { id: 'set_c', label: 'Set C: Advanced Intermediate (5 Qs)', time: '10 Mins' }
                ].map(s => {
                  const isActive = activePracticeSet === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActivePracticeSet(s.id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${isActive ? '#059669' : '#cbd5e1'}`,
                        background: isActive ? '#ecfdf5' : '#ffffff',
                        color: isActive ? '#065f46' : '#475569',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>Limit: {s.time}</div>
                    </button>
                  );
                })}
              </div>

              {/* Render Current Set */}
              {(() => {
                const currentSetData = activePracticeSet === 'set_a' ? practiceSetA : activePracticeSet === 'set_b' ? practiceSetB : practiceSetC;
                const currentTimer = activePracticeSet === 'set_a' ? timerA : activePracticeSet === 'set_b' ? timerB : timerC;
                const isTimerRunning = activePracticeSet === 'set_a' ? isTimerARunning : activePracticeSet === 'set_b' ? isTimerBRunning : isTimerCRunning;
                const toggleTimer = () => {
                  if (activePracticeSet === 'set_a') setIsTimerARunning(!isTimerARunning);
                  if (activePracticeSet === 'set_b') setIsTimerBRunning(!isTimerBRunning);
                  if (activePracticeSet === 'set_c') setIsTimerCRunning(!isTimerCRunning);
                };

                const currentSetAnswers = practiceAnswers[activePracticeSet] || {};
                const currentSetSubmitted = practiceSubmitted[activePracticeSet] || {};

                return (
                  <div>
                    {/* Header with Countdown Timer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{currentSetData.title}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{currentSetData.description}</div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: currentTimer < 60 ? '#fee2e2' : '#ffffff', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 800, color: currentTimer < 60 ? '#dc2626' : '#059669' }}>
                          <Clock size={16} />
                          <span>{formatTimer(currentTimer)}</span>
                        </div>
                        <button
                          onClick={toggleTimer}
                          style={{ background: isTimerRunning ? '#f59e0b' : '#059669', color: '#ffffff', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                          <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                        </button>
                        <button
                          onClick={() => handlePracticeReset(activePracticeSet)}
                          style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Dataset Display */}
                    {currentSetData.dataset.headers && (
                      <div style={{ overflowX: 'auto', marginBottom: '1.5rem', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                          <thead>
                            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                              {currentSetData.dataset.headers.map((h, i) => (
                                <th key={i} style={{ padding: '0.6rem 0.85rem', fontWeight: 800 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {currentSetData.dataset.rows.map((r, rI) => (
                              <tr key={rI} style={{ borderBottom: '1px solid #e2e8f0', background: rI % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                                {r.map((c, cI) => (
                                  <td key={cI} style={{ padding: '0.6rem 0.85rem', fontWeight: cI === 0 ? 700 : 500 }}>{c}</td>
                                ))}
                              </tr>
                            ))}
                            {currentSetData.dataset.totals && (
                              <tr style={{ background: '#e2e8f0', fontWeight: 800 }}>
                                {currentSetData.dataset.totals.map((t, tI) => (
                                  <td key={tI} style={{ padding: '0.6rem 0.85rem' }}>{t}</td>
                                ))}
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {currentSetData.dataset.sectors && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {currentSetData.dataset.sectors.map((s, idx) => (
                          <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem' }}>
                            <div style={{ fontWeight: 700 }}>{s.category}</div>
                            <div style={{ color: '#059669', fontWeight: 800 }}>{s.percentage}% (₹{s.amount.toLocaleString()})</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Questions */}
                    <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                      {currentSetData.questions.map((q, qIdx) => {
                        const isSubmitted = Boolean(currentSetSubmitted[q.id]);
                        const selectedOpt = currentSetAnswers[q.id];
                        const isCorrect = selectedOpt === q.correctAnswer;

                        return (
                          <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                              Q{qIdx + 1}. {q.question}
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selectedOpt === optIdx;
                                let bg = '#ffffff';
                                let border = '#cbd5e1';
                                let color = '#1e293b';

                                if (isSubmitted) {
                                  if (optIdx === q.correctAnswer) {
                                    bg = '#d1fae5';
                                    border = '#10b981';
                                    color = '#065f46';
                                  } else if (isSelected) {
                                    bg = '#fee2e2';
                                    border = '#ef4444';
                                    color = '#991b1b';
                                  }
                                } else if (isSelected) {
                                  bg = '#ecfdf5';
                                  border = '#059669';
                                  color = '#065f46';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => handlePracticeSelect(activePracticeSet, q.id, optIdx)}
                                    disabled={isSubmitted}
                                    style={{
                                      padding: '0.65rem 1rem',
                                      borderRadius: '8px',
                                      border: `1.5px solid ${border}`,
                                      background: bg,
                                      color: color,
                                      fontWeight: isSelected || (isSubmitted && optIdx === q.correctAnswer) ? 700 : 500,
                                      fontSize: '0.88rem',
                                      textAlign: 'left',
                                      cursor: isSubmitted ? 'default' : 'pointer'
                                    }}
                                  >
                                    <span style={{ marginRight: '0.5rem' }}>{String.fromCharCode(65 + optIdx)}.</span>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {!isSubmitted ? (
                              <button
                                onClick={() => handlePracticeSubmit(activePracticeSet, q.id)}
                                disabled={selectedOpt === undefined}
                                style={{
                                  background: selectedOpt !== undefined ? '#059669' : '#cbd5e1',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Submit Answer
                              </button>
                            ) : (
                              <div style={{ background: isCorrect ? '#f0fdf4' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '8px', padding: '0.85rem' }}>
                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: isCorrect ? '#166534' : '#9f1239', marginBottom: '0.25rem' }}>
                                  {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Selection'}
                                </div>
                                <div style={{ fontSize: '0.84rem', color: isCorrect ? '#14532d' : '#881337', lineHeight: 1.5 }}>
                                  {q.explanation}
                                </div>
                                {!isCorrect && (
                                  <div style={{ fontSize: '0.8rem', color: '#be123c', fontStyle: 'italic', marginTop: '0.25rem' }}>
                                    Pitfall: {q.distractorNotes}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('examples')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Solved Examples
                </button>
                <button
                  onClick={() => handleTabChange('casestudy')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: MedTech Product Sales Study →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 10: REAL-WORLD MEDTECH PRODUCT SALES CASE STUDY */}
        {/* ========================================================== */}
        {currentTab === 'casestudy' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                REAL-WORLD APPLICATION
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {instituteCaseStudy.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {instituteCaseStudy.description}
              </p>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#1e40af', fontWeight: 600, marginBottom: '1.5rem' }}>
                📌 {instituteCaseStudy.benchmarkNote}
              </div>

              {/* Case Study Table */}
              <div style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Month</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Hospital Inquiries (RFPs)</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Confirmed Orders</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Ultrasound Systems</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Patient Monitors</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Infusion Pumps</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>ECG Recorders</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Sales Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instituteCaseStudy.tableData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{row.month}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row.enquiries}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#059669' }}>{row.admissions}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row.python}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row.web}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row.data}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row.tally}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#1e40af' }}>₹{row.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#e2e8f0', fontWeight: 800, color: '#0f172a' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>4-Mo Total</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.enquiries}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.admissions}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.python}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.web}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.data}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{instituteCaseStudy.totals.tally}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>₹{instituteCaseStudy.totals.revenue.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 7 Case Study Interactive Questions */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Case Study Diagnostic Questions (7 Tasks)
              </h3>

              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {instituteCaseStudy.questions.map((q, idx) => {
                  const isSubmitted = Boolean(caseStudySubmitted[q.id]);
                  const selectedOpt = caseStudyAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctAnswer;

                  return (
                    <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '0.25rem' }}>{q.task}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>{q.prompt}</div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          let bg = '#ffffff';
                          let border = '#cbd5e1';

                          if (isSubmitted) {
                            if (optIdx === q.correctAnswer) { bg = '#d1fae5'; border = '#10b981'; }
                            else if (isSelected) { bg = '#fee2e2'; border = '#ef4444'; }
                          } else if (isSelected) {
                            bg = '#ecfdf5'; border = '#059669';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleCaseStudySelect(q.id, optIdx)}
                              disabled={isSubmitted}
                              style={{
                                padding: '0.6rem 0.85rem',
                                borderRadius: '6px',
                                border: `1.5px solid ${border}`,
                                background: bg,
                                fontWeight: isSelected ? 700 : 500,
                                fontSize: '0.85rem',
                                textAlign: 'left',
                                cursor: isSubmitted ? 'default' : 'pointer'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {!isSubmitted ? (
                        <button
                          onClick={() => handleCaseStudySubmit(q.id)}
                          disabled={selectedOpt === undefined}
                          style={{
                            background: selectedOpt !== undefined ? '#059669' : '#cbd5e1',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Submit Response
                        </button>
                      ) : (
                        <div style={{ background: isCorrect ? '#f0fdf4' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.84rem', color: isCorrect ? '#14532d' : '#881337' }}>
                          <strong>{isCorrect ? '✓ Correct:' : '✗ Incorrect:'}</strong> {q.analysis}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Practice Sets
                </button>
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Common Mistakes & Tips →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 11: COMMON MISTAKES & EXAM STRATEGIES */}
        {/* ========================================================== */}
        {currentTab === 'mistakes' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXAM PREPARATION
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Top 8 Data Interpretation Pitfalls to Avoid
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Examiners construct answer options specifically targeting these 8 universal calculation and reasoning blunders.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {commonMistakes.map((m, idx) => (
                  <div key={idx} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#b45309', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      {m.mistake}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5 }}>
                      {m.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Time-Saving Exam Shortcuts
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {examStrategies.map((str, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
                    <Sparkles size={16} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>{str}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleTabChange('casestudy')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Case Study
                </button>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Final Assessment (15 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 12: TIMED FINAL ASSESSMENT (15 QUESTIONS, 20 MINS) */}
        {/* ========================================================== */}
        {currentTab === 'assessment' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                    LEVEL 2 DAY 8 ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Timed Final Assessment (20 Questions: Easy, Medium & Hard)
                  </h2>
                </div>

                {/* 20-Minute Countdown Clock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: assessmentTimer < 180 ? '#fee2e2' : '#f8fafc', padding: '0.5rem 1rem', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}>
                  <Clock size={18} style={{ color: assessmentTimer < 180 ? '#dc2626' : '#059669' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: assessmentTimer < 180 ? '#dc2626' : '#059669' }}>
                    {formatTimer(assessmentTimer)}
                  </span>
                </div>
              </div>

              {!assessmentFinished ? (
                <div>
                  {/* Difficulty Filter Tabs */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginRight: '0.25rem' }}>Difficulty:</span>
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
                            border: isSelected ? `2px solid ${filter.color || '#059669'}` : '1px solid #cbd5e1',
                            background: isSelected ? (filter.bg || '#ecfdf5') : '#ffffff',
                            color: isSelected ? (filter.color || '#065f46') : '#475569',
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
                      if (isSub) { bg = '#d1fae5'; color = '#065f46'; borderColor = '#10b981'; }
                      else if (isAns) { bg = '#fef3c7'; color = '#92400e'; borderColor = '#f59e0b'; }
                      if (isCurr) { bg = '#059669'; color = '#ffffff'; borderColor = '#047857'; }

                      const diffColor = q.difficulty === 'Easy' ? '#16a34a' : q.difficulty === 'Medium' ? '#d97706' : '#dc2626';

                      return (
                        <button
                          key={q.id}
                          onClick={() => setAssessmentIndex(idx)}
                          title={`Q${idx + 1} (${q.difficulty} - ${q.category})`}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            border: isCurr ? '2px solid #047857' : `1.5px solid ${borderColor}`,
                            borderBottom: !isCurr ? `3px solid ${diffColor}` : '2px solid #047857',
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
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                              {currentQ.category}
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

                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                          {currentQ.question}
                        </div>

                        <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {currentQ.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            let bg = '#ffffff';
                            let border = '#cbd5e1';

                            if (isSub) {
                              if (optIdx === currentQ.correctAnswer) { bg = '#d1fae5'; border = '#10b981'; }
                              else if (isSelected) { bg = '#fee2e2'; border = '#ef4444'; }
                            } else if (isSelected) {
                              bg = '#ecfdf5'; border = '#059669';
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
                                <span style={{ fontWeight: 800, marginRight: '0.5rem' }}>{String.fromCharCode(65 + optIdx)}.</span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Submit single question button or navigation */}
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
                              style={{ background: selectedOpt !== undefined ? '#059669' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem', cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed' }}
                            >
                              Confirm Answer
                            </button>
                          ) : (
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isCorrect ? '#059669' : '#dc2626' }}>
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
                    background: savedProgress.assessmentPassed ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: `2px solid ${savedProgress.assessmentPassed ? '#10b981' : '#f59e0b'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#065f46' : '#92400e', marginBottom: '0.25rem' }}>
                      {savedProgress.assessmentScore} / {finalAssessmentQuestions.length} ({savedProgress.assessmentPercentage}%)
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: savedProgress.assessmentPassed ? '#047857' : '#b45309', marginBottom: '0.5rem' }}>
                      {savedProgress.assessmentPercentage >= 90
                        ? "🌟 Excellent – Strong Data Interpretation Mastery!"
                        : savedProgress.assessmentPercentage >= 75
                        ? "🎯 Good Progress – Minor practice required."
                        : savedProgress.assessmentPercentage >= 60
                        ? "📈 Developing – Review calculations and category comparisons."
                        : "⚠️ Needs Improvement – Revisit core concepts and retry."}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                      Time Taken: {formatTimer(1200 - assessmentTimer)} out of 20:00 minutes. Accuracy threshold for Day 8 completion is 60% (12/20).
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setIsReviewOpen(true)}
                        style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
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
                  <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Assessment Review</div>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => setReviewFilter('all')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'all' ? '#059669' : '#f1f5f9', color: reviewFilter === 'all' ? '#fff' : '#334155', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>All (20)</button>
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
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>{q.category}</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{q.question}</div>
                            <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                              Your Answer: <strong style={{ color: isCorrect ? '#059669' : '#dc2626' }}>{userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'Unanswered'}</strong>
                            </div>
                            {!isCorrect && (
                              <div style={{ fontSize: '0.85rem', color: '#059669', marginBottom: '0.5rem' }}>
                                Correct Answer: <strong>{String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</strong>
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
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Mistakes & Tips
                </button>
                <button
                  onClick={() => handleTabChange('summary')}
                  style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Next: Revision Cheat Sheet →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 13: REVISION SUMMARY CHEAT SHEET */}
        {/* ========================================================== */}
        {currentTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                QUICK REVISION
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Data Interpretation Cheat Sheet & Formulas
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Bookmark this high-yield revision sheet to review key formulas, baseline denominator rules, and quick estimation methods before tests.
              </p>

              {/* Formula Table */}
              <div style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Calculation Name</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Standard Formula</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>Practical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revisionCheatSheet.formulas.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{item.title}</td>
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 700, color: '#059669' }}>{item.formula}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 4 Golden Rules */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                4 Golden Examination Rules
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {revisionCheatSheet.rules.map((rule, idx) => (
                  <div key={idx} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    <Check size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Back to Assessment
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('spoko_reasoning_l2_d9', 'overview')}
                  style={{ background: '#1d4ed8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Proceed to Day 9: Root Cause Analysis →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Bottom Navigation Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.25rem 0',
          borderTop: '1px solid #e2e8f0',
          marginTop: '1.5rem'
        }}>
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#475569',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            ← Back to Dashboard
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d7', 'overview')}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              ← Previous: Day 7 (Everyday Problem Solving)
            </button>

            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l2_d9', 'overview')}
              style={{
                background: '#1d4ed8',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
              }}
            >
              Next: Day 9 (Root Cause Analysis) →
            </button>

            <button
              onClick={() => handleTabChange('assessment')}
              style={{
                background: savedProgress.completedDay ? '#10b981' : '#059669',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: savedProgress.completedDay ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {savedProgress.completedDay ? 'View Day 8 Results 🎓' : 'View Final Assessment 📊'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
