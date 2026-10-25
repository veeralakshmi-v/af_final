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
  CircleDot, BarChart3, PieChart, TrendingUp, Calculator, Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day18Overview,
  section1Fundamentals,
  section2MathReasoning,
  section3ComplexTables,
  section4MultiStepAnalysis,
  section5CriticalDataAnalysis,
  section6DecisionMaking,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  challengeCaseStudy,
  finalAssessmentQuestions,
  revisionData
} from '../../data/reasoningLevel3Day18.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day18({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d18_progress_${userKey}`;

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

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Level 3 Day 18 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d18:day18';
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
          total: (finalAssessmentQuestions || []).length,
          completed: true,
          percentage: savedProgress.assessmentPercentage
        })
      }).catch(() => { });
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, savedProgress.assessmentPercentage, session]);

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
      onNavigate('spoko_reasoning_l3_d18', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 1 Warmup state
  const [warmupAnswers, setWarmupAnswers] = useState({});
  const [warmupSubmitted, setWarmupSubmitted] = useState({});

  const handleWarmupSelect = (qId, optionIdx) => {
    if (warmupSubmitted[qId]) return;
    setWarmupAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleWarmupSubmit = (qId) => {
    setWarmupSubmitted(prev => ({ ...prev, [qId]: true }));
    const q = section1Fundamentals.warmupQuestions.find(w => w.id === qId);
    if (q && isAnswerCorrect(warmupAnswers[qId], q.correct)) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    }
  };

  // Section 2 Interactive Percentage Calculator Widget State
  const [calcOldVal, setCalcOldVal] = useState('80');
  const [calcNewVal, setCalcNewVal] = useState('120');
  const [calcIsRate, setCalcIsRate] = useState(false);

  const parsedOld = parseFloat(calcOldVal) || 0;
  const parsedNew = parseFloat(calcNewVal) || 0;
  const calcAbsDiff = parsedNew - parsedOld;
  const calcPctChange = parsedOld !== 0 ? ((calcAbsDiff / parsedOld) * 100).toFixed(2) : '0';
  const calcPpDiff = (parsedNew - parsedOld).toFixed(2);

  // Section 6 Interactive Decision Matrix Simulator State
  const [weightRel, setWeightRel] = useState(40);
  const [weightScale, setWeightScale] = useState(30);
  const [weightCost, setWeightCost] = useState(30);

  const normalizedWRel = weightRel / 100;
  const normalizedWScale = weightScale / 100;
  const normalizedWCost = weightCost / 100;

  const scoreOptA = (normalizedWRel * 9 + normalizedWScale * 9 + normalizedWCost * 5).toFixed(2);
  const scoreOptB = (normalizedWRel * 10 + normalizedWScale * 10 + normalizedWCost * 3).toFixed(2);
  const scoreOptC = (normalizedWRel * 7 + normalizedWScale * 6 + normalizedWCost * 9).toFixed(2);

  // Practice Sets State (A, B, C)
  const [practiceActiveTab, setPracticeActiveTab] = useState('setA');
  const [practiceAnswers, setPracticeAnswers] = useState({ setA: {}, setB: {}, setC: {} });
  const [practiceSubmitted, setPracticeSubmitted] = useState({ setA: {}, setB: {}, setC: {} });
  const [practiceTimers, setPracticeTimers] = useState({ setA: 0, setB: 0, setC: 0 });
  const [isPracticeTimerRunning, setIsPracticeTimerRunning] = useState({ setA: true, setB: false, setC: false });

  useEffect(() => {
    const timer = setInterval(() => {
      setPracticeTimers(prev => ({
        ...prev,
        [practiceActiveTab]: isPracticeTimerRunning[practiceActiveTab] ? prev[practiceActiveTab] + 1 : prev[practiceActiveTab]
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [practiceActiveTab, isPracticeTimerRunning]);

  const handlePracticeSelect = (setKey, qId, optIdx) => {
    if (practiceSubmitted[setKey]?.[qId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setKey]: { ...prev[setKey], [qId]: optIdx }
    }));
  };

  const handlePracticeSubmit = (setKey, qId) => {
    setPracticeSubmitted(prev => ({
      ...prev,
      [setKey]: { ...prev[setKey], [qId]: true }
    }));
  };

  const handlePracticeRetry = (setKey, qId) => {
    setPracticeAnswers(prev => ({
      ...prev,
      [setKey]: { ...prev[setKey], [qId]: undefined }
    }));
    setPracticeSubmitted(prev => ({
      ...prev,
      [setKey]: { ...prev[setKey], [qId]: false }
    }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Section 8 Challenge Workbench State
  const [challengeAnswers, setChallengeAnswers] = useState({
    ch1: '',
    ch2: '',
    ch3: '',
    ch4: '',
    ch5: ''
  });
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeResult, setChallengeResult] = useState(null);

  const handleChallengeCheck = () => {
    const results = challengeCaseStudy.questions.map(q => {
      const userAns = challengeAnswers[q.qId];
      return isAnswerCorrect(userAns, q.correct);
    });
    const correctCount = results.filter(Boolean).length;
    setChallengeSubmitted(true);
    setChallengeResult({
      count: correctCount,
      total: challengeCaseStudy.questions.length,
      isPerfect: correctCount === challengeCaseStudy.questions.length
    });
    if (correctCount === challengeCaseStudy.questions.length) {
      confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
    }
  };

  // Section 9 Final Assessment State (20 Qs, 25 Mins)
  const [assessmentCurrentQ, setAssessmentCurrentQ] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentFlagged, setAssessmentFlagged] = useState({});
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState(25 * 60);
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentScore, setAssessmentScore] = useState(savedProgress.assessmentScore || 0);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (currentTab === 'assessment' && !assessmentFinished && !isAssessmentTimerRunning) {
      setIsAssessmentTimerRunning(true);
    }
  }, [currentTab, assessmentFinished, isAssessmentTimerRunning]);

  useEffect(() => {
    let interval = null;
    if (isAssessmentTimerRunning && assessmentTimeLeft > 0 && !assessmentFinished) {
      interval = setInterval(() => {
        setAssessmentTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinalAssessmentSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAssessmentTimerRunning, assessmentTimeLeft, assessmentFinished]);

  const handleAssessmentAnswer = (qIdx, optIdx) => {
    if (assessmentFinished) return;
    setAssessmentAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const toggleAssessmentFlag = (qIdx) => {
    setAssessmentFlagged(prev => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  const handleFinalAssessmentSubmit = () => {
    let score = 0;
    const submittedMap = {};
    finalAssessmentQuestions.forEach((q, idx) => {
      const userChoice = assessmentAnswers[idx];
      const isCorrect = isAnswerCorrect(userChoice, q.correct);
      if (isCorrect) score += 1;
      submittedMap[idx] = true;
    });

    const percentage = Math.round((score / finalAssessmentQuestions.length) * 100);
    const passed = score >= 12;

    setAssessmentScore(score);
    setAssessmentSubmitted(submittedMap);
    setAssessmentFinished(true);
    setIsAssessmentTimerRunning(false);
    setShowSubmitModal(false);

    setSavedProgress(prev => ({
      ...prev,
      assessmentScore: score,
      assessmentPercentage: percentage,
      assessmentPassed: passed,
      assessmentSubmitted: submittedMap,
      assessmentAnswers: assessmentAnswers,
      assessmentFinished: true,
      completedDay: true
    }));

    if (score >= 15) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleAssessmentRetake = () => {
    setAssessmentAnswers({});
    setAssessmentFlagged({});
    setAssessmentSubmitted({});
    setAssessmentScore(0);
    setAssessmentFinished(false);
    setAssessmentTimeLeft(25 * 60);
    setIsAssessmentTimerRunning(true);
    setAssessmentCurrentQ(0);
  };

  // Section 10 Rapid-fire state
  const [revealedRapid, setRevealedRapid] = useState({});
  const toggleRapid = (idx) => {
    setRevealedRapid(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={17} /> },
    { id: 'section1', label: '1. DI Fundamentals', icon: <BarChart3 size={17} /> },
    { id: 'section2', label: '2. Math Reasoning with Data', icon: <Calculator size={17} /> },
    { id: 'section3', label: '3. Complex Tables & Charts', icon: <Table size={17} /> },
    { id: 'section4', label: '4. Multi-Step Analysis', icon: <TrendingUp size={17} /> },
    { id: 'section5', label: '5. Critical Data Analysis', icon: <Eye size={17} /> },
    { id: 'section6', label: '6. Decision-Making Matrices', icon: <Scale size={17} /> },
    { id: 'practice', label: '7. 3 Practice Sets', icon: <Clock size={17} /> },
    { id: 'challenge', label: '8. Case Study Challenge', icon: <Briefcase size={17} /> },
    { id: 'assessment', label: '9. Final Assessment (20 Qs)', icon: <Award size={17} /> },
    { id: 'summary', label: '10. Revision & Rapid-Fire', icon: <FileText size={17} /> }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      paddingBottom: '4rem'
    }}>
      {/* 🚀 Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#ffffff',
                padding: '0.5rem 0.75rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}>
                <Brain size={18} />
                <span>Alpha Fly</span>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Logical Reasoning • Level 3 – Advanced
                </div>
                <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                  Day 7 (Day 18): Advanced Data Interpretation, Analytical Reasoning & Decision-Making
                </h1>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Lesson Progress</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0284c7' }}>
                  {savedProgress.completedSections?.length || 1} / {tabs.length} Tabs Completed
                </div>
              </div>
              <div style={{
                width: '100px',
                height: '8px',
                background: '#e2e8f0',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round(((savedProgress.completedSections?.length || 1) / tabs.length) * 100))}%`,
                  background: 'linear-gradient(90deg, #0284c7, #38bdf8)',
                  borderRadius: '999px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Navigation Tab Bar */}
          <nav style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingTop: '0.75rem',
            paddingBottom: '0.25rem',
            scrollbarWidth: 'none'
          }}>
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              const isCompleted = savedProgress.completedSections?.includes(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 600,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive
                      ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                      : isCompleted ? '#e0f2fe' : '#ffffff',
                    color: isActive ? '#ffffff' : isCompleted ? '#0369a1' : '#475569',
                    boxShadow: isActive ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {isCompleted && !isActive && (
                    <CheckCircle2 size={13} style={{ color: '#0284c7' }} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 📖 Main Container */}
      <main style={{ maxWidth: '1280px', margin: '1.5rem auto', padding: '0 1rem' }}>
        <AnimatePresence mode="wait">

          {/* TAB 0: OVERVIEW */}
          {currentTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                marginBottom: '2rem',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(2, 132, 199, 0.2)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                    marginBottom: '1rem'
                  }}>
                    <Sparkles size={14} />
                    <span>Alpha Fly Computer Education • Advanced Analytical Reasoning Series</span>
                  </div>

                  <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    Level 3 – Advanced Day 7: Advanced Data Interpretation, Analytical Reasoning & Decision-Making
                  </h1>
                  <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    Interpret multi-tier tables, grouped bar charts, dual-axis graphs, and proportional pie charts. Execute precise percentage changes, weighted averages, and compounded growth calculations. Audit statistical fallacies, and synthesize multi-criteria trade-offs using formal Weighted Decision Matrices.
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <Clock size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Duration: {day18Overview.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <Scale size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Difficulty: {day18Overview.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <CheckCircle size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Prerequisite: {day18Overview.prerequisite}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Objectives Grid */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Target size={22} style={{ color: '#0284c7' }} />
                  <span>10 Rigorous Quantitative & Analytical Objectives</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                  {day18Overview.learningObjectives.map((obj, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{
                        background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                        color: '#ffffff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)'
                    }}
                  >
                    <span>Proceed to Section 1: Fundamentals</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: SECTION 1 DI FUNDAMENTALS & WARM-UP */}
          {currentTab === 'section1' && (
            <motion.div
              key="section1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <BarChart3 size={16} />
                  <span>Section 1 • Foundations & Visual Formats</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section1Fundamentals.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section1Fundamentals.introduction}
                </p>

                {/* Core Chart Types Grid */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Primary Data Presentation Archetypes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {section1Fundamentals.coreChartTypes.map((c, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.4rem' }}>
                        {c.type}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        {c.purpose}
                      </p>
                      <div style={{ background: '#e0f2fe', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#0369a1', fontWeight: 600 }}>
                        <strong>Audit Focus:</strong> {c.analysisFocus}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audit Checklist Box */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  border: '1px solid #bae6fd',
                  marginBottom: '2.5rem'
                }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={20} />
                    <span>The 4-Point Data Audit Checklist</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    {section1Fundamentals.keyAuditChecklist.map((ch, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                        <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                          {ch.item}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ch.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Interactive Warm-Up Questions */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} style={{ color: '#f59e0b' }} />
                    <span>Interactive Warm-Up: 3 Diagnostic Calculations</span>
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    Verify baseline arithmetic and percentage conversion before tackling complex matrices.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {section1Fundamentals.warmupQuestions.map((q, idx) => {
                      const userChoice = warmupAnswers[q.id];
                      const isSubmitted = warmupSubmitted[q.id];
                      const isCorrect = isAnswerCorrect(userChoice, q.correct);

                      return (
                        <div
                          key={q.id}
                          style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            border: isSubmitted
                              ? isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                              : '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.25rem' }}>
                            DIAGNOSTIC QUESTION {idx + 1}
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.5 }}>
                            {q.question}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userChoice === optIdx;
                              const isOptionCorrect = isAnswerCorrect(optIdx, q.correct);

                              let optBg = '#ffffff';
                              let optBorder = '#cbd5e1';
                              let optColor = '#0f172a';

                              if (isSubmitted) {
                                if (isOptionCorrect) {
                                  optBg = '#dcfce7';
                                  optBorder = '#22c55e';
                                  optColor = '#15803d';
                                } else if (isSelected) {
                                  optBg = '#fee2e2';
                                  optBorder = '#ef4444';
                                  optColor = '#b91c1c';
                                }
                              } else if (isSelected) {
                                optBg = '#e0f2fe';
                                optBorder = '#0284c7';
                                optColor = '#0369a1';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleWarmupSelect(q.id, optIdx)}
                                  disabled={isSubmitted}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${optBorder}`,
                                    background: optBg,
                                    color: optColor,
                                    fontSize: '0.9rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    textAlign: 'left',
                                    cursor: isSubmitted ? 'default' : 'pointer'
                                  }}
                                >
                                  <span style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: isSelected ? '#0284c7' : '#f1f5f9',
                                    color: isSelected ? '#ffffff' : '#64748b',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                  }}>
                                    {['A', 'B', 'C', 'D'][optIdx]}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {!isSubmitted ? (
                            <button
                              onClick={() => handleWarmupSubmit(q.id)}
                              disabled={userChoice === undefined}
                              style={{
                                background: userChoice !== undefined ? '#0284c7' : '#cbd5e1',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: userChoice !== undefined ? 'pointer' : 'not-allowed'
                              }}
                            >
                              Check Answer
                            </button>
                          ) : (
                            <div style={{
                              marginTop: '1rem',
                              padding: '1rem',
                              borderRadius: '8px',
                              background: isCorrect ? '#f0fdf4' : '#fef2f2',
                              border: isCorrect ? '1px solid #bbf7d0' : '1px solid #fecaca'
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                color: isCorrect ? '#166534' : '#991b1b',
                                marginBottom: '0.4rem'
                              }}>
                                {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                <span>{isCorrect ? 'Correct Calculation!' : 'Calculation Error'}</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                <strong>Derivation:</strong> {q.explanation}
                              </p>
                              {q.distractors && (
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                  <strong>Distractor Audit:</strong>
                                  <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0 }}>
                                    {q.distractors.map((d, dIdx) => (
                                      <li key={dIdx}>{d}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('overview')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Overview
                  </button>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 2 (Math Reasoning) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECTION 2 MATHEMATICAL REASONING WITH DATA */}
          {currentTab === 'section2' && (
            <motion.div
              key="section2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Calculator size={16} />
                  <span>Section 2 • Mathematical Operations & Formulas</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section2MathReasoning.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section2MathReasoning.theory}
                </p>

                {/* 🌟 Interactive Percentage & Points Calculator Widget */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Alpha Fly Live Interactive Tool
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
                    Interactive Percentage Change & Points Simulator
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>
                        Original Base Value (V_old):
                      </label>
                      <input
                        type="number"
                        value={calcOldVal}
                        onChange={(e) => setCalcOldVal(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>
                        New Final Value (V_new):
                      </label>
                      <input
                        type="number"
                        value={calcNewVal}
                        onChange={(e) => setCalcNewVal(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: '1rem',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Absolute Difference</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: calcAbsDiff >= 0 ? '#4ade80' : '#f87171' }}>
                        {calcAbsDiff >= 0 ? `+${calcAbsDiff}` : calcAbsDiff}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Relative Percentage Change</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: parsedOld !== 0 ? (calcPctChange >= 0 ? '#38bdf8' : '#f87171') : '#94a3b8' }}>
                        {calcPctChange >= 0 ? `+${calcPctChange}%` : `${calcPctChange}%`}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Percentage Points (if Rates)</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#facc15' }}>
                        {calcPpDiff >= 0 ? `+${calcPpDiff} pp` : `${calcPpDiff} pp`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulas Grid */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Core Mathematical Formulas
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section2MathReasoning.formulas.map((f, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.35rem' }}>
                        {f.name}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                        {f.formula}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                        {f.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 8 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  8 Master Solved Mathematical Problems
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section2MathReasoning.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                          WORKED PROBLEM {idx + 1}
                        </span>
                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {ex.topic}
                        </span>
                      </div>

                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {ex.question}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Step-by-Step Calculation:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.stepByStep.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065f46' }}>
                          Final Verified Answer: {ex.finalAnswer}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.2rem' }}>
                          <strong>Proof:</strong> {ex.whyCorrect}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 1
                  </button>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 3 (Complex Tables) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SECTION 3 COMPLEX TABLES AND CHARTS */}
          {currentTab === 'section3' && (
            <motion.div
              key="section3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Table size={16} />
                  <span>Section 3 • Multi-Dimensional Matrix Analysis</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section3ComplexTables.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section3ComplexTables.theory}
                </p>

                {/* Primary Complex Table Display */}
                {section3ComplexTables.datasets.map((ds) => (
                  <div key={ds.id} style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      {ds.title}
                    </h3>
                    <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ background: '#0284c7', color: '#ffffff' }}>
                            {ds.headers.map((h, hIdx) => (
                              <th key={hIdx} style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ds.rows.map((row, rIdx) => {
                            const isLast = rIdx === ds.rows.length - 1;
                            return (
                              <tr key={rIdx} style={{
                                borderBottom: '1px solid #e2e8f0',
                                background: isLast ? '#e0f2fe' : (rIdx % 2 === 0 ? '#ffffff' : '#f8fafc'),
                                fontWeight: isLast ? 800 : 500,
                                color: isLast ? '#0369a1' : '#0f172a'
                              }}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} style={{ padding: '0.75rem 1rem' }}>{cell}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* 6 Worked Examples Based on Table */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  6 Solved Matrix Interpretation Problems
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section3ComplexTables.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        INTERPRETATION QUERY {idx + 1}
                      </div>

                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {ex.question}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Analytical Breakdown:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.calculationSteps.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065f46' }}>
                          Verified Result: {ex.finalAnswer}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.2rem' }}>
                          <strong>Verification:</strong> {ex.whyCorrect}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 2
                  </button>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 4 (Multi-Step Analysis) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECTION 4 MULTI-STEP DATA ANALYSIS */}
          {currentTab === 'section4' && (
            <motion.div
              key="section4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <TrendingUp size={16} />
                  <span>Section 4 • Multi-Stage Computational Pipelines</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section4MultiStepAnalysis.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section4MultiStepAnalysis.theory}
                </p>

                {/* 6 Multi-Step Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  6 Solved Multi-Step Case Problems
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section4MultiStepAnalysis.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        PIPELINE PROBLEM {idx + 1} • {ex.scenario}
                      </div>

                      <div style={{
                        background: '#0f172a',
                        color: '#38bdf8',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        whiteSpace: 'pre-line',
                        marginBottom: '1rem'
                      }}>
                        {ex.givenData}
                      </div>

                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {ex.question}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Step-by-Step Computational Chain:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.calculationSteps.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065f46' }}>
                          Verified Result: {ex.finalAnswer}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.2rem' }}>
                          <strong>Proof:</strong> {ex.whyCorrect}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 3
                  </button>
                  <button
                    onClick={() => handleTabChange('section5')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 5 (Critical Analysis) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SECTION 5 CRITICAL ANALYSIS OF DATA */}
          {currentTab === 'section5' && (
            <motion.div
              key="section5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Eye size={16} />
                  <span>Section 5 • Deceptive Statistics & Bias Detection</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section5CriticalDataAnalysis.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section5CriticalDataAnalysis.theory}
                </p>

                {/* 5 Fallacy Audits Grid */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  The 5 Classic Deceptions in Statistical Reporting
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section5CriticalDataAnalysis.fallacyAudits.map((fa, idx) => (
                    <div key={idx} style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '10px', border: '1px solid #fecaca' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#b91c1c', marginBottom: '0.35rem' }}>
                        {fa.fallacy}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.5 }}>
                        {fa.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 Worked Case Audits */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  5 Real-World Case Audits: Uncovering Statistical Distortions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section5CriticalDataAnalysis.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        CRITICAL AUDIT {idx + 1}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                        {ex.scenario}
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.5rem' }}>
                        {ex.question}
                      </div>

                      <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                        <strong>Analytical Flaw:</strong> {ex.analysis}
                      </div>

                      <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        fontSize: '0.85rem',
                        color: '#1e40af'
                      }}>
                        <strong>Responsible Interpretation:</strong> {ex.responsibleInterpretation}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 4
                  </button>
                  <button
                    onClick={() => handleTabChange('section6')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 6 (Decision Matrices) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: SECTION 6 DECISION-MAKING & WEIGHTED MATRICES */}
          {currentTab === 'section6' && (
            <motion.div
              key="section6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Scale size={16} />
                  <span>Section 6 • Multi-Criteria Rational Optimization</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section6DecisionMaking.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section6DecisionMaking.theory}
                </p>

                {/* 🌟 Interactive Decision Matrix Simulator Widget */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Alpha Fly Dynamic Sensitivity Engine
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
                    Interactive Weighted Decision Matrix Simulator
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        <span>Reliability Weight:</span>
                        <span style={{ color: '#38bdf8', fontWeight: 800 }}>{weightRel}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={weightRel}
                        onChange={(e) => setWeightRel(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#0284c7' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        <span>Scalability Weight:</span>
                        <span style={{ color: '#38bdf8', fontWeight: 800 }}>{weightScale}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={weightScale}
                        onChange={(e) => setWeightScale(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#0284c7' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        <span>Cost Weight (Inverted):</span>
                        <span style={{ color: '#38bdf8', fontWeight: 800 }}>{weightCost}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={weightCost}
                        onChange={(e) => setWeightCost(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#0284c7' }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Score Comparison Display */}
                  <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: scoreOptA >= scoreOptB && scoreOptA >= scoreOptC ? 'rgba(2, 132, 199, 0.4)' : 'transparent',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: scoreOptA >= scoreOptB && scoreOptA >= scoreOptC ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Option A: AWS Aurora</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{scoreOptA}</div>
                      {scoreOptA >= scoreOptB && scoreOptA >= scoreOptC && (
                        <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>★ CURRENT WINNER</div>
                      )}
                    </div>

                    <div style={{
                      background: scoreOptB >= scoreOptA && scoreOptB >= scoreOptC ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: scoreOptB >= scoreOptA && scoreOptB >= scoreOptC ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Option B: Cloud Spanner</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{scoreOptB}</div>
                      {scoreOptB >= scoreOptA && scoreOptB >= scoreOptC && (
                        <div style={{ fontSize: '0.7rem', color: '#4ade80', fontWeight: 800 }}>★ CURRENT WINNER</div>
                      )}
                    </div>

                    <div style={{
                      background: scoreOptC >= scoreOptA && scoreOptC >= scoreOptB ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: scoreOptC >= scoreOptA && scoreOptC >= scoreOptB ? '2px solid #facc15' : '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Option C: Open-Source</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{scoreOptC}</div>
                      {scoreOptC >= scoreOptA && scoreOptC >= scoreOptB && (
                        <div style={{ fontSize: '0.7rem', color: '#facc15', fontWeight: 800 }}>★ CURRENT WINNER</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 10-Step Process */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  The 10-Step Rational Decision Architecture
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {section6DecisionMaking.tenStepProcess.map((st, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155' }}>
                      <span style={{ fontWeight: 800, color: '#0284c7' }}>{idx + 1}. </span>
                      {st.replace(/^\d+\.\s*/, '')}
                    </div>
                  ))}
                </div>

                {/* 5 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  5 Evaluated Organizational Decision Matrices
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section6DecisionMaking.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        DECISION SCENARIO {idx + 1}
                      </div>

                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                        {ex.decisionScenario}
                      </div>

                      <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                        <strong>Criteria Weights:</strong> {ex.weights}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Weighted Matrix Calculations:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.calculations.map((c, cIdx) => (
                            <li key={cIdx}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065f46' }}>
                          Evidence-Backed Recommendation: {ex.recommendation}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#92400e', background: '#fffbeb', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #fde68a' }}>
                        <strong>Sensitivity Caveat:</strong> {ex.sensitivityNote}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section5')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 5
                  </button>
                  <button
                    onClick={() => handleTabChange('practice')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 7 (Practice Sets) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: SECTION 7 INTERACTIVE PRACTICE SETS */}
          {currentTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Clock size={16} />
                  <span>Section 7 • Timed Interactive Drills</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Section 7 – 3 Interactive Practice Sets (15 Questions)
                </h2>

                {/* Sub-Tabs for Set A, Set B, Set C */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { key: 'setA', label: 'Practice Set A: Charts, Tables & Calculations (5 Qs)' },
                    { key: 'setB', label: 'Practice Set B: Multi-Step Data Analysis (5 Qs)' },
                    { key: 'setC', label: 'Practice Set C: Analytical Reasoning & Decisions (5 Qs)' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setPracticeActiveTab(tab.key)}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: practiceActiveTab === tab.key ? '#0284c7' : '#f1f5f9',
                        color: practiceActiveTab === tab.key ? '#ffffff' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Active Practice Timer Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>
                    <Clock size={18} style={{ color: '#0284c7' }} />
                    <span>Active Set Elapsed Time: <span style={{ color: '#0284c7', fontFamily: 'monospace' }}>{formatTime(practiceTimers[practiceActiveTab])}</span></span>
                  </div>
                  <button
                    onClick={() => setIsPracticeTimerRunning(prev => ({ ...prev, [practiceActiveTab]: !prev[practiceActiveTab] }))}
                    style={{
                      background: 'none',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {isPracticeTimerRunning[practiceActiveTab] ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPracticeTimerRunning[practiceActiveTab] ? 'Pause Timer' : 'Resume Timer'}</span>
                  </button>
                </div>

                {/* Questions List for Active Practice Set */}
                {(() => {
                  const setQuestions = practiceActiveTab === 'setA'
                    ? practiceSetA
                    : practiceActiveTab === 'setB'
                      ? practiceSetB
                      : practiceSetC;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {setQuestions.map((q, idx) => {
                        const userChoice = practiceAnswers[practiceActiveTab]?.[q.id];
                        const isSubmitted = practiceSubmitted[practiceActiveTab]?.[q.id];
                        const isCorrect = isAnswerCorrect(userChoice, q.correct);

                        return (
                          <div
                            key={q.id}
                            style={{
                              background: '#f8fafc',
                              borderRadius: '12px',
                              padding: '1.5rem',
                              border: isSubmitted
                                ? isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                                : '1px solid #e2e8f0'
                            }}
                          >
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.3rem' }}>
                              QUESTION {idx + 1} OF 5
                            </div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                              {q.question}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                              {q.options.map((opt, optIdx) => {
                                const isSelected = userChoice === optIdx;
                                const isOptionCorrect = isAnswerCorrect(optIdx, q.correct);

                                let optBg = '#ffffff';
                                let optBorder = '#cbd5e1';
                                let optColor = '#0f172a';

                                if (isSubmitted) {
                                  if (isOptionCorrect) {
                                    optBg = '#dcfce7';
                                    optBorder = '#22c55e';
                                    optColor = '#15803d';
                                  } else if (isSelected) {
                                    optBg = '#fee2e2';
                                    optBorder = '#ef4444';
                                    optColor = '#b91c1c';
                                  }
                                } else if (isSelected) {
                                  optBg = '#e0f2fe';
                                  optBorder = '#0284c7';
                                  optColor = '#0369a1';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => handlePracticeSelect(practiceActiveTab, q.id, optIdx)}
                                    disabled={isSubmitted}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.6rem',
                                      padding: '0.75rem 1rem',
                                      borderRadius: '8px',
                                      border: `1px solid ${optBorder}`,
                                      background: optBg,
                                      color: optColor,
                                      fontSize: '0.9rem',
                                      fontWeight: isSelected ? 700 : 500,
                                      textAlign: 'left',
                                      cursor: isSubmitted ? 'default' : 'pointer'
                                    }}
                                  >
                                    <span style={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      background: isSelected ? '#0284c7' : '#f1f5f9',
                                      color: isSelected ? '#ffffff' : '#64748b',
                                      fontSize: '0.8rem',
                                      fontWeight: 700
                                    }}>
                                      {['A', 'B', 'C', 'D'][optIdx]}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {!isSubmitted ? (
                              <button
                                onClick={() => handlePracticeSubmit(practiceActiveTab, q.id)}
                                disabled={userChoice === undefined}
                                style={{
                                  background: userChoice !== undefined ? '#0284c7' : '#cbd5e1',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1.5rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  cursor: userChoice !== undefined ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Submit Answer
                              </button>
                            ) : (
                              <div style={{
                                background: isCorrect ? '#f0fdf4' : '#fef2f2',
                                border: isCorrect ? '1px solid #bbf7d0' : '1px solid #fecaca',
                                borderRadius: '8px',
                                padding: '1rem'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  marginBottom: '0.5rem'
                                }}>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontWeight: 800,
                                    color: isCorrect ? '#166534' : '#991b1b',
                                    fontSize: '0.9rem'
                                  }}>
                                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                    <span>{isCorrect ? 'Correct Calculation!' : 'Calculation Error'}</span>
                                  </div>
                                  <button
                                    onClick={() => handlePracticeRetry(practiceActiveTab, q.id)}
                                    style={{
                                      background: 'none',
                                      border: '1px solid #cbd5e1',
                                      padding: '0.25rem 0.6rem',
                                      borderRadius: '4px',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Retry Question
                                  </button>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                  <strong>Step-by-Step Reason:</strong> {q.explanation}
                                </p>
                                {q.distractors && (
                                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    <strong>Distractor Audit:</strong>
                                    <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0 }}>
                                      {q.distractors.map((d, dIdx) => (
                                        <li key={dIdx}>{d}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('section6')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 6
                  </button>
                  <button
                    onClick={() => handleTabChange('challenge')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 8 (Case Challenge) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: SECTION 8 REAL-WORLD APPLICATION CHALLENGE */}
          {currentTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Briefcase size={16} />
                  <span>Section 8 • Applied Institutional Case Study</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {challengeCaseStudy.title}
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #bae6fd',
                  marginBottom: '1.75rem',
                  fontSize: '0.95rem',
                  color: '#0369a1',
                  lineHeight: 1.6
                }}>
                  {challengeCaseStudy.context}
                </div>

                {/* Challenge Dataset Table */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                  Audited Cohort Operational Metrics
                </h3>
                <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0284c7', color: '#ffffff' }}>
                        {challengeCaseStudy.dataset.headers.map((h, hIdx) => (
                          <th key={hIdx} style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {challengeCaseStudy.dataset.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc'
                        }}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} style={{ padding: '0.75rem 1rem', fontWeight: cIdx === 0 ? 700 : 500 }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Challenge Questions */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Executive Decision Queries (5 Items)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  {challengeCaseStudy.questions.map((cq) => (
                    <div
                      key={cq.qId}
                      style={{
                        background: '#f8fafc',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                        {cq.question}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
                        {cq.options.map((opt, oIdx) => (
                          <label
                            key={oIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.6rem 0.85rem',
                              borderRadius: '6px',
                              background: challengeAnswers[cq.qId] === opt ? '#e0f2fe' : '#ffffff',
                              border: challengeAnswers[cq.qId] === opt ? '1px solid #0284c7' : '1px solid #cbd5e1',
                              cursor: challengeSubmitted ? 'default' : 'pointer',
                              fontSize: '0.88rem',
                              fontWeight: challengeAnswers[cq.qId] === opt ? 700 : 500
                            }}
                          >
                            <input
                              type="radio"
                              name={cq.qId}
                              value={opt}
                              checked={challengeAnswers[cq.qId] === opt}
                              onChange={(e) => setChallengeAnswers(prev => ({ ...prev, [cq.qId]: e.target.value }))}
                              disabled={challengeSubmitted}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit & Result Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  {!challengeSubmitted ? (
                    <button
                      onClick={handleChallengeCheck}
                      disabled={Object.values(challengeAnswers).some(v => !v)}
                      style={{
                        background: Object.values(challengeAnswers).every(Boolean) ? '#0284c7' : '#cbd5e1',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.85rem 2rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: Object.values(challengeAnswers).every(Boolean) ? 'pointer' : 'not-allowed',
                        boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)'
                      }}
                    >
                      Check Solution & Verify Executive Findings
                    </button>
                  ) : (
                    <div>
                      <div style={{
                        padding: '1.25rem',
                        borderRadius: '12px',
                        background: challengeResult.isPerfect ? '#f0fdf4' : '#fffbeb',
                        border: challengeResult.isPerfect ? '1px solid #86efac' : '1px solid #fcd34d',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: challengeResult.isPerfect ? '#15803d' : '#b45309', marginBottom: '0.5rem' }}>
                          {challengeResult.isPerfect ? '🎉 Perfect Analytical Audit: All 5 Findings Validated!' : `Score: ${challengeResult.count} / ${challengeResult.total} Correct`}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                          Full formal breakdown verified under the Alpha Fly Computer Education institutional standard.
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {challengeCaseStudy.questions.map((cq, idx) => (
                          <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.3rem' }}>
                              Question {idx + 1}: {cq.question}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700, marginBottom: '0.2rem' }}>
                              Correct Answer: {cq.options[['A', 'B', 'C', 'D'].indexOf(cq.correct)]}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                              <strong>Executive Rationale:</strong> {cq.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('practice')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 7
                  </button>
                  <button
                    onClick={() => handleTabChange('assessment')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 9 (Final Assessment) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 9: SECTION 9 FINAL ASSESSMENT */}
          {currentTab === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem' }}>
                      <Award size={16} />
                      <span>Section 9 • Formal Certification Assessment</span>
                    </div>
                    <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0 0' }}>
                      Final Assessment (20 Questions • 25 Minutes)
                    </h2>
                  </div>

                  {!assessmentFinished && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: assessmentTimeLeft < 300 ? '#fee2e2' : '#f0f9ff',
                      color: assessmentTimeLeft < 300 ? '#b91c1c' : '#0369a1',
                      border: assessmentTimeLeft < 300 ? '1px solid #fca5a5' : '1px solid #bae6fd',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      fontFamily: 'monospace'
                    }}>
                      <Clock size={20} />
                      <span>Time Remaining: {formatTime(assessmentTimeLeft)}</span>
                    </div>
                  )}
                </div>

                {!assessmentFinished ? (
                  <div>
                    {/* Question Palette Indicator Bar */}
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '10px',
                      padding: '1rem',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                        Question Navigation Palette
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {finalAssessmentQuestions.map((_, qIdx) => {
                          const isAnswered = assessmentAnswers[qIdx] !== undefined;
                          const isCurrent = assessmentCurrentQ === qIdx;
                          const isFlagged = assessmentFlagged[qIdx];

                          let bg = '#ffffff';
                          let text = '#475569';
                          let border = '#cbd5e1';

                          if (isCurrent) {
                            bg = '#0284c7';
                            text = '#ffffff';
                            border = '#0284c7';
                          } else if (isFlagged) {
                            bg = '#fef08a';
                            text = '#854d0e';
                            border = '#eab308';
                          } else if (isAnswered) {
                            bg = '#dcfce7';
                            text = '#15803d';
                            border = '#86efac';
                          }

                          return (
                            <button
                              key={qIdx}
                              onClick={() => setAssessmentCurrentQ(qIdx)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                border: `1px solid ${border}`,
                                background: bg,
                                color: text,
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {qIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Question Card */}
                    {(() => {
                      const q = finalAssessmentQuestions[assessmentCurrentQ];
                      const userChoice = assessmentAnswers[assessmentCurrentQ];

                      return (
                        <div style={{
                          background: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          padding: '1.75rem',
                          marginBottom: '1.75rem'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                              QUESTION {assessmentCurrentQ + 1} OF {finalAssessmentQuestions.length} • {q.category}
                            </div>
                            <button
                              onClick={() => toggleAssessmentFlag(assessmentCurrentQ)}
                              style={{
                                background: assessmentFlagged[assessmentCurrentQ] ? '#fef08a' : '#ffffff',
                                color: assessmentFlagged[assessmentCurrentQ] ? '#854d0e' : '#64748b',
                                border: '1px solid #cbd5e1',
                                padding: '0.3rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {assessmentFlagged[assessmentCurrentQ] ? '★ Flagged for Review' : '☆ Flag Question'}
                            </button>
                          </div>

                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                            {q.question}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userChoice === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleAssessmentAnswer(assessmentCurrentQ, optIdx)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.85rem 1rem',
                                    borderRadius: '8px',
                                    border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                                    background: isSelected ? '#e0f2fe' : '#ffffff',
                                    color: isSelected ? '#0369a1' : '#0f172a',
                                    fontWeight: isSelected ? 700 : 500,
                                    fontSize: '0.95rem',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <span style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: isSelected ? '#0284c7' : '#f1f5f9',
                                    color: isSelected ? '#ffffff' : '#64748b',
                                    fontSize: '0.8rem',
                                    fontWeight: 700
                                  }}>
                                    {['A', 'B', 'C', 'D'][optIdx]}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                              onClick={() => setAssessmentCurrentQ(prev => Math.max(0, prev - 1))}
                              disabled={assessmentCurrentQ === 0}
                              style={{
                                background: '#f1f5f9',
                                color: assessmentCurrentQ === 0 ? '#cbd5e1' : '#475569',
                                border: '1px solid #cbd5e1',
                                padding: '0.6rem 1.25rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: assessmentCurrentQ === 0 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              ← Previous
                            </button>

                            {assessmentCurrentQ < finalAssessmentQuestions.length - 1 ? (
                              <button
                                onClick={() => setAssessmentCurrentQ(prev => prev + 1)}
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
                                Next Question →
                              </button>
                            ) : (
                              <button
                                onClick={() => setShowSubmitModal(true)}
                                style={{
                                  background: 'linear-gradient(135deg, #10b981, #059669)',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1.75rem',
                                  borderRadius: '8px',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                }}
                              >
                                Submit Assessment Test
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Assessment Results View */
                  <div>
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      color: '#ffffff',
                      borderRadius: '16px',
                      padding: '2rem',
                      textAlign: 'center',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Performance Diagnostic Report
                      </div>
                      <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                        {assessmentScore} / {finalAssessmentQuestions.length} ({Math.round((assessmentScore / finalAssessmentQuestions.length) * 100)}%)
                      </h3>
                      <div style={{
                        display: 'inline-block',
                        padding: '0.4rem 1.25rem',
                        borderRadius: '999px',
                        background: assessmentScore >= 18 ? '#059669' : assessmentScore >= 15 ? '#0284c7' : assessmentScore >= 11 ? '#d97706' : '#dc2626',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        marginBottom: '1rem'
                      }}>
                        {assessmentScore >= 18 ? 'Excellent – Advanced Data Analyst'
                          : assessmentScore >= 15 ? 'Very Good – Strong Analytical Reasoning'
                            : assessmentScore >= 11 ? 'Good – Practise Multi-Step Analysis'
                              : 'Needs Improvement – Revise Data Interpretation'}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                        Official learning feedback for Alpha Fly Computer Education students. Not an official certification.
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Question-by-Question Solution Review
                      </h3>
                      <button
                        onClick={handleAssessmentRetake}
                        style={{
                          background: '#0284c7',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Retake Assessment
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {finalAssessmentQuestions.map((q, idx) => {
                        const userChoice = assessmentAnswers[idx];
                        const isCorrect = isAnswerCorrect(userChoice, q.correct);

                        return (
                          <div
                            key={q.id}
                            style={{
                              background: '#f8fafc',
                              borderRadius: '10px',
                              padding: '1.25rem',
                              border: isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7' }}>
                                QUESTION {idx + 1} • {q.category}
                              </span>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: isCorrect ? '#15803d' : '#b91c1c'
                              }}>
                                {isCorrect ? '✓ CORRECT (+1)' : '✗ INCORRECT (0)'}
                              </span>
                            </div>

                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                              {q.question}
                            </div>

                            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                              <strong>Your Choice:</strong> {userChoice !== undefined ? `${['A', 'B', 'C', 'D'][userChoice]} (${q.options[userChoice]})` : 'Not Attempted'}
                              {' • '}
                              <strong>Correct Answer:</strong> {q.correct} ({q.options[['A', 'B', 'C', 'D'].indexOf(q.correct)]})
                            </div>

                            <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                            {q.distractorReason && (
                              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                                <strong>Distractor Reason:</strong> {q.distractorReason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Submission Confirmation Modal */}
                {showSubmitModal && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    padding: '1rem'
                  }}>
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '2rem',
                      maxWidth: '450px',
                      width: '100%',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                        Submit Assessment Test?
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                        You have answered <strong>{Object.keys(assessmentAnswers).length}</strong> of <strong>{finalAssessmentQuestions.length}</strong> questions.
                        Are you ready to submit for final evaluation?
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button
                          onClick={() => setShowSubmitModal(false)}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            color: '#475569',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Review Answers
                        </button>
                        <button
                          onClick={handleFinalAssessmentSubmit}
                          style={{
                            background: '#0284c7',
                            border: 'none',
                            color: '#ffffff',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Confirm & Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleTabChange('challenge')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Section 8
                  </button>
                  <button
                    onClick={() => handleTabChange('summary')}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Next: Section 10 (Revision Sheet) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 10: SECTION 10 REVISION SHEET & RAPID-FIRE */}
          {currentTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem' }}>
                      <FileText size={16} />
                      <span>Section 10 • Quick Revision & Rapid-Fire</span>
                    </div>
                    <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0 0' }}>
                      Data Interpretation & Decision-Making Reference Sheet
                    </h2>
                  </div>
                  <button
                    onClick={() => window.print()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#f8fafc',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Printer size={16} />
                    <span>Print Revision Sheet</span>
                  </button>
                </div>

                {/* Key Summary Cards */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Core Quantitative Invariants & Cheat Sheets
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {revisionData.summaryPoints.map((item, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.4rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 5 Rapid-Fire Questions */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  5 Rapid-Fire Revision Drills (Click to Reveal)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {revisionData.rapidFireQuestions.map((rf, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        onClick={() => toggleRapid(idx)}
                        style={{
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: '#0f172a'
                        }}
                      >
                        <span>{rf.q}</span>
                        <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 800 }}>
                          {revealedRapid[idx] ? '▲ Hide Answer' : '▼ Reveal Answer'}
                        </span>
                      </div>
                      {revealedRapid[idx] && (
                        <div style={{
                          background: '#ecfdf5',
                          borderTop: '1px solid #a7f3d0',
                          padding: '0.85rem 1.25rem',
                          fontSize: '0.88rem',
                          color: '#065f46',
                          fontWeight: 600
                        }}>
                          <strong>Answer:</strong> {rf.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Course Completion Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: '#ffffff',
                  textAlign: 'center'
                }}>
                  <Award size={36} style={{ color: '#ffffff', margin: '0 auto 0.75rem auto' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    Congratulations! You Have Completed Day 7 (Day 18)
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#e0f2fe', maxWidth: '750px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                    You have mastered advanced data interpretation, percentage reasoning, multi-step analytical pipelines, statistical fallacy audits, and weighted decision matrices under the Alpha Fly Computer Education Logical Reasoning curriculum.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleTabChange('assessment')}
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.3)',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      Review Assessment
                    </button>
                    <button
                      onClick={() => handleTabChange('overview')}
                      style={{
                        background: '#ffffff',
                        color: '#0369a1',
                        border: 'none',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      Return to Course Dashboard
                    </button>
                    <button
                      onClick={() => {
                        if (typeof onNavigate === 'function') {
                          onNavigate('spoko_reasoning_l3_d19', 'overview');
                        }
                      }}
                      style={{
                        background: '#38bdf8',
                        color: '#0f172a',
                        border: 'none',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                      }}
                    >
                      Next: Day 19 (Level 3 Day 8) →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
