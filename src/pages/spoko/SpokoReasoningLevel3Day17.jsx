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
  CircleDot, HelpCircle as QuestionIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day17Overview,
  section1Fundamentals,
  section2MultiStatement,
  section3Possibility,
  section4VennTechniques,
  section5HiddenAssumptions,
  section6StrongWeakArguments,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  challengeCaseStudy,
  finalAssessmentQuestions,
  revisionData
} from '../../data/reasoningLevel3Day17.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day17({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d17_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 17 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d17:day17';
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
      onNavigate('spoko_reasoning_l3_d17', tabId);
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

  // Section 2 & 4 Interactive Venn Visualizer State
  const vennPresets = [
    {
      id: 'universal_all',
      name: 'All A are B (A ⊆ B)',
      type: 'A (Universal Affirmative)',
      desc: 'Set A is entirely enclosed within Set B. Subsets are asymmetric.',
      svg: (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: '180px' }}>
          <circle cx="160" cy="90" r="75" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="160" cy="90" r="40" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2.5" />
          <text x="160" y="95" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">Set A</text>
          <text x="160" y="40" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">Set B (Superset)</text>
        </svg>
      )
    },
    {
      id: 'universal_no',
      name: 'No A is B (A ∩ B = ∅)',
      type: 'E (Universal Negative)',
      desc: 'Set A and Set B are completely disjoint with a strict prohibition line.',
      svg: (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: '180px' }}>
          <circle cx="95" cy="90" r="55" fill="rgba(2, 132, 199, 0.25)" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="225" cy="90" r="55" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="2.5" />
          <line x1="145" y1="90" x2="175" y2="90" stroke="#b91c1c" strokeWidth="3" strokeDasharray="4" />
          <circle cx="160" cy="90" r="10" fill="#dc2626" />
          <text x="160" y="94" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">✕</text>
          <text x="95" y="95" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">Set A</text>
          <text x="225" y="95" textAnchor="middle" fill="#991b1b" fontWeight="bold" fontSize="13">Set B</text>
        </svg>
      )
    },
    {
      id: 'particular_some',
      name: 'Some A are B (A ∩ B ≠ ∅)',
      type: 'I (Particular Affirmative)',
      desc: 'Sets A and B share at least one member in their intersection.',
      svg: (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: '180px' }}>
          <circle cx="120" cy="90" r="60" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="200" cy="90" r="60" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 160 48 A 60 60 0 0 0 160 132 A 60 60 0 0 0 160 48 Z" fill="rgba(16, 185, 129, 0.6)" />
          <text x="160" y="94" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="11">★ Some</text>
          <text x="90" y="95" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">Set A</text>
          <text x="230" y="95" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="13">Set B</text>
        </svg>
      )
    },
    {
      id: 'chained_transitive',
      name: 'Chained: All A are B + All B are C',
      type: 'Transitive Syllogism (A ⊆ B ⊆ C)',
      desc: 'Set A is inside B, which is inside C. Guaranteed that All A are C.',
      svg: (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: '180px' }}>
          <circle cx="160" cy="90" r="80" fill="rgba(147, 51, 234, 0.15)" stroke="#9333ea" strokeWidth="2" />
          <circle cx="160" cy="90" r="55" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2" />
          <circle cx="160" cy="90" r="30" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2" />
          <text x="160" y="95" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="11">Set A</text>
          <text x="160" y="52" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="11">Set B</text>
          <text x="160" y="25" textAnchor="middle" fill="#6b21a8" fontWeight="bold" fontSize="11">Set C (All A are C)</text>
        </svg>
      )
    }
  ];
  const [activeVenn, setActiveVenn] = useState(vennPresets[0]);

  // Section 5 Interactive Negation Test State
  const [negationActiveIdx, setNegationActiveIdx] = useState(0);

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
    ccq1: '',
    ccq2: '',
    ccq3: '',
    ccq4: '',
    ccq5: ''
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
    { id: 'section1', label: '1. Fundamentals Refresher', icon: <Brain size={17} /> },
    { id: 'section2', label: '2. Advanced Syllogisms', icon: <Layers size={17} /> },
    { id: 'section3', label: '3. Possibility vs Definite', icon: <Compass size={17} /> },
    { id: 'section4', label: '4. Venn Elimination', icon: <CircleDot size={17} /> },
    { id: 'section5', label: '5. Hidden Assumptions', icon: <Target size={17} /> },
    { id: 'section6', label: '6. Strong & Weak Arguments', icon: <Scale size={17} /> },
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
                  Day 6 (Day 17): Advanced Syllogisms, Assumptions & Logical Conclusions
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
                    <span>Alpha Fly Computer Education • Advanced Deductive Reasoning Series</span>
                  </div>

                  <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    Level 3 – Advanced Day 6: Advanced Syllogisms, Assumptions & Logical Conclusions
                  </h1>
                  <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    Master 3-to-5 category categorical syllogisms, evaluate modal possibility vs absolute certainty, construct rigorous multi-circle Venn diagram proofs, detect hidden assumptions using the Negation Test, and eliminate real-world bias from formal deductive logic.
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <Clock size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Duration: {day17Overview.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <Scale size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Difficulty: {day17Overview.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <CheckCircle size={18} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Prerequisite: {day17Overview.prerequisite}</span>
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
                  <span>10 Rigorous Learning Objectives</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                  {day17Overview.learningObjectives.map((obj, idx) => (
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
                    <span>Proceed to Section 1: Fundamentals Refresher</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: SECTION 1 SYLLOGISM FUNDAMENTALS REFRESHER */}
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
                  <Brain size={16} />
                  <span>Section 1 • Categorical Logic Foundations</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section1Fundamentals.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section1Fundamentals.introduction}
                </p>

                {/* 4 Classical Forms */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={20} style={{ color: '#0284c7' }} />
                  <span>The Four Classical Categorical Propositions</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {section1Fundamentals.categoricalPropositions.map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '1.25rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                          Type {p.code.split(' ')[0]}
                        </span>
                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {p.format}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                        {p.code}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        {p.meaning}
                      </p>
                      <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.78rem',
                        color: '#991b1b',
                        fontWeight: 600
                      }}>
                        {p.keyRule}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Principles */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  border: '1px solid #bae6fd',
                  marginBottom: '2.5rem'
                }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={20} />
                    <span>Three Inviolable Principles of Categorical Logic</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    {section1Fundamentals.corePrinciples.map((cp, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                        <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                          {cp.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {cp.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Interactive Warm-Up Questions */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} style={{ color: '#f59e0b' }} />
                    <span>Interactive Warm-Up: 4 Syllogism Diagnostics</span>
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    Test your ability to derive immediate deductive consequences with instant feedback.
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
                            WARM-UP QUESTION {idx + 1}
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
                                    cursor: isSubmitted ? 'default' : 'pointer',
                                    transition: 'all 0.2s ease'
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
                                <span>{isCorrect ? 'Valid Deduction!' : 'Invalid Derivation'}</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                <strong>Logical Proof:</strong> {q.explanation}
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
                    Next: Section 2 (Advanced Syllogisms) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECTION 2 ADVANCED SYLLOGISMS WITH MULTIPLE STATEMENTS */}
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
                  <Layers size={16} />
                  <span>Section 2 • Multi-Statement Chaining</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section2MultiStatement.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section2MultiStatement.theory}
                </p>

                {/* Chaining Rules Grid */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Fundamental Syllogistic Chaining Rules
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section2MultiStatement.chainingRules.map((cr, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.35rem' }}>
                        {cr.rule}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                        {cr.formula}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                        {cr.note}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  6 Solved Multi-Premise Master Problems
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section2MultiStatement.workedExamples.map((ex, idx) => (
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
                        WORKED SYLLOGISM {idx + 1}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Given Statements:
                        </div>
                        {ex.statements.map((s, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
                            {s}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Proposed Conclusions:
                        </div>
                        {ex.proposedConclusions.map((c, cIdx) => (
                          <div key={cIdx} style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}>
                            {c}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Set-Theoretic Step-by-Step Proof:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.stepByStep.map((step, stIdx) => (
                            <li key={stIdx}>{step}</li>
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
                          Definitive Result: {ex.finalResult}
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
                    Next: Section 3 (Possibility vs Definite) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SECTION 3 POSSIBILITY AND DEFINITE CONCLUSIONS */}
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
                  <Compass size={16} />
                  <span>Section 3 • Modal Logic & Possibility</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section3Possibility.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section3Possibility.introduction}
                </p>

                {/* Modality Comparison Table */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Modal Status Matrix: Definite vs Possible vs Impossible
                </h3>
                <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#0f172a', fontWeight: 800 }}>Modal Status</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#0284c7', fontWeight: 800 }}>Formal Set-Theoretic Condition</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#0f172a', fontWeight: 800 }}>Venn Diagram Verification Test</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section3Possibility.modalityComparison.map((m, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: idx === 0 ? '#15803d' : idx === 1 ? '#b91c1c' : idx === 2 ? '#0284c7' : '#854d0e' }}>
                            {m.status}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{m.condition}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.85rem' }}>{m.test}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  5 Solved Possibility Puzzles
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section3Possibility.workedExamples.map((ex, idx) => (
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
                        POSSIBILITY PROBLEM {idx + 1}
                      </div>

                      <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Premises:
                        </div>
                        {ex.statements.map((s, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
                            {s}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Candidate Conclusions:
                        </div>
                        {ex.proposedConclusions.map((c, cIdx) => (
                          <div key={cIdx} style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}>
                            {c}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Modal Evaluation:
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
                          Verified Verdict: {ex.finalResult}
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
                    Next: Section 4 (Venn Elimination) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECTION 4 VENN DIAGRAM & LOGICAL ELIMINATION */}
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
                  <CircleDot size={16} />
                  <span>Section 4 • Visual Elimination & Proof</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section4VennTechniques.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section4VennTechniques.theory}
                </p>

                {/* 🌟 Interactive Venn Diagram Simulator Widget */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                        Alpha Fly Interactive Venn Engine
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                        Live Venn Model Simulator
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {vennPresets.map((vp) => (
                        <button
                          key={vp.id}
                          onClick={() => setActiveVenn(vp)}
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            border: activeVenn.id === vp.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                            background: activeVenn.id === vp.id ? '#0284c7' : 'rgba(255,255,255,0.06)',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {vp.type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Display Area */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ width: '100%', maxWidth: '340px' }}>
                      {activeVenn.svg}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.3rem' }}>
                        {activeVenn.name}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                        {activeVenn.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7-Step Method */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  The 7-Step Venn Elimination Protocol
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {section4VennTechniques.sevenStepMethod.map((step, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155' }}>
                      <span style={{ fontWeight: 800, color: '#0284c7' }}>{idx + 1}. </span>
                      {step.replace(/^\d+\.\s*/, '')}
                    </div>
                  ))}
                </div>

                {/* 5 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  5 Master Solved Venn Elimination Examples
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section4VennTechniques.workedExamples.map((ex, idx) => (
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
                          VENN EXAMPLE {idx + 1}
                        </span>
                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {ex.title}
                        </span>
                      </div>

                      <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Premises:
                        </div>
                        {ex.statements.map((s, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
                            {s}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Conclusions to Test:
                        </div>
                        {ex.conclusions.map((c, cIdx) => (
                          <div key={cIdx} style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}>
                            {c}
                          </div>
                        ))}
                      </div>

                      <div style={{
                        background: '#0f172a',
                        color: '#38bdf8',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        marginBottom: '1rem'
                      }}>
                        {ex.vennModel}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Venn Region Analysis:
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
                          Final Verified Result: {ex.finalResult}
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
                    Next: Section 5 (Hidden Assumptions) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SECTION 5 IDENTIFYING HIDDEN ASSUMPTIONS */}
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
                  <Target size={16} />
                  <span>Section 5 • Critical Reading & Deduction</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section5HiddenAssumptions.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section5HiddenAssumptions.introduction}
                </p>

                {/* Negation Test Callout Box */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  border: '1px solid #fcd34d',
                  marginBottom: '2.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#92400e', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                    <Zap size={22} />
                    <span>{section5HiddenAssumptions.negationTest.title}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                    {section5HiddenAssumptions.negationTest.steps.map((st, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #fcd34d', fontSize: '0.85rem', color: '#78350f', fontWeight: 600 }}>
                        {st}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  6 Solved Assumption Problems (Industry & EdTech Scenarios)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section5HiddenAssumptions.workedExamples.map((ex, idx) => (
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
                        ASSUMPTION CASE {idx + 1}
                      </div>

                      <div style={{
                        background: '#ffffff',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '1rem',
                        lineHeight: 1.5
                      }}>
                        {ex.statement}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem' }}>
                          Candidate Assumptions:
                        </div>
                        {ex.proposedAssumptions.map((pa, paIdx) => (
                          <div key={paIdx} style={{ fontSize: '0.88rem', color: '#334155', marginBottom: '0.3rem' }}>
                            {pa}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                          Negation Test Auditing:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                          {ex.analysis.map((an, anIdx) => (
                            <li key={anIdx}>{an}</li>
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
                          Verdict: {ex.finalResult}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.2rem' }}>
                          <strong>Reasoning:</strong> {ex.whyCorrect}
                        </div>
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
                    Next: Section 6 (Strong & Weak Arguments) →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: SECTION 6 STRONG AND WEAK ARGUMENTS */}
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
                  <span>Section 6 • Argumentation & Critical Inquiry</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  {section6StrongWeakArguments.title}
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section6StrongWeakArguments.theory}
                </p>

                {/* 4 Criteria Grid */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  The 4 Pillars of a Strong Logical Argument
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section6StrongWeakArguments.evaluationCriteria.map((c, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.4rem' }}>
                        {c.criterion}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 Worked Examples */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  5 Evaluated Policy & Technology Debates
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section6StrongWeakArguments.workedExamples.map((ex, idx) => (
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
                        ARGUMENT ANALYSIS {idx + 1}
                      </div>

                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                        {ex.question}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.3rem' }}>
                            ARGUMENT I
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                            {ex.argument1}
                          </div>
                        </div>

                        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b91c1c', marginBottom: '0.3rem' }}>
                            ARGUMENT II
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                            {ex.argument2}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e40af' }}>
                          Evaluation Verdict: {ex.evaluation}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#1e3a8a', marginTop: '0.3rem', lineHeight: 1.5 }}>
                          <strong>Critical Rationale:</strong> {ex.reasoning}
                        </div>
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
                    { key: 'setA', label: 'Practice Set A: Advanced Syllogisms (5 Qs)' },
                    { key: 'setB', label: 'Practice Set B: Possibility & Conclusions (5 Qs)' },
                    { key: 'setC', label: 'Practice Set C: Assumptions & Arguments (5 Qs)' }
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
                                    <span>{isCorrect ? 'Valid Deduction!' : 'Invalid Derivation'}</span>
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
                  <span>Section 8 • Applied Real-World Case Study</span>
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

                {/* 8 Interconnected Premises */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Council Audited Claims & Observations (8 Premises)
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '1.25rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {challengeCaseStudy.premises.map((p, idx) => (
                      <div key={idx} style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Study Audit Questions */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  Analytical Audit Questions (5 Items)
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
                      Check Answers & Audit Logical Consistency
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
                          {challengeResult.isPerfect ? '🎉 Perfect Audit: All 5 Claims Verified!' : `Audit Score: ${challengeResult.count} / ${challengeResult.total} Correct`}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                          Full formal audit breakdown verified under the Alpha Fly Computer Education pedagogical standard.
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
                              <strong>Audit Note:</strong> {cq.explanation}
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
                        {assessmentScore >= 18 ? 'Excellent – Advanced Logical Analyst'
                          : assessmentScore >= 15 ? 'Very Good – Strong Deductive Reasoning'
                            : assessmentScore >= 11 ? 'Good – Practise Complex Conclusions'
                              : 'Needs Improvement – Revise Syllogisms and Assumptions'}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                        Official educational feedback for Alpha Fly Computer Education students. Not an official certification.
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
                      Advanced Syllogisms & Logic Conclusions Reference Sheet
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
                  Core Logical Invariants & Deductive Cheat Sheets
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
                    Congratulations! You Have Completed Day 6 (Day 17)
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#e0f2fe', maxWidth: '750px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                    You have mastered multi-premise syllogisms, modal possibility versus certainty, multi-set Venn elimination proofs, and hidden assumption auditing under the Alpha Fly Computer Education curriculum.
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
                          onNavigate('spoko_reasoning_l3_d18', 'overview');
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
                      Next: Day 18 (Level 3 Day 7) →
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
