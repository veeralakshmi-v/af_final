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
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day15Overview,
  section1Intro,
  section2Linear,
  section3Circular,
  section4MultiCondition,
  section5FloorScheduling,
  section6Mistakes,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  challengeLabScenario,
  finalAssessmentQuestions,
  revisionData
} from '../../data/reasoningLevel3Day15.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day15({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d15_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 15 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d15:day15';
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
      onNavigate('spoko_reasoning_l3_d15', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Warm-Up State
  const [warmUpAnswers, setWarmUpAnswers] = useState({});
  const [warmUpSubmitted, setWarmUpSubmitted] = useState({});

  const handleWarmUpSelect = (qId, letter) => {
    if (warmUpSubmitted[qId]) return;
    setWarmUpAnswers(prev => ({ ...prev, [qId]: letter }));
  };

  const handleWarmUpSubmit = (qId) => {
    if (warmUpAnswers[qId] === undefined) return;
    setWarmUpSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  // Interactive Linear Visualizer State
  const [linearSeatsCount, setLinearSeatsCount] = useState(6);
  const [linearFacingDirection, setLinearFacingDirection] = useState('North');
  const [linearActiveSeat, setLinearActiveSeat] = useState(3);

  // Interactive Circular Visualizer State
  const [circularSeatsCount, setCircularSeatsCount] = useState(6);
  const [circularFacing, setCircularFacing] = useState('Inward');
  const [circularActiveSeat, setCircularActiveSeat] = useState(1);

  // Practice Sets Interactive State
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

  const [timerA, setTimerA] = useState(practiceSetA?.timeLimitSeconds || 360);
  const [isTimerARunning, setIsTimerARunning] = useState(false);
  const [timerB, setTimerB] = useState(practiceSetB?.timeLimitSeconds || 480);
  const [isTimerBRunning, setIsTimerBRunning] = useState(false);
  const [timerC, setTimerC] = useState(practiceSetC?.timeLimitSeconds || 600);
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

  const handlePracticeSelect = (setId, qId, letter) => {
    if (practiceSubmitted[setId]?.[qId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: letter }
    }));
    if (setId === 'set_a' && !isTimerARunning) setIsTimerARunning(true);
    if (setId === 'set_b' && !isTimerBRunning) setIsTimerBRunning(true);
    if (setId === 'set_c' && !isTimerCRunning) setIsTimerCRunning(true);
  };

  const handlePracticeSubmit = (setId, qId) => {
    if (practiceAnswers[setId]?.[qId] === undefined) return;
    setPracticeSubmitted(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: true }
    }));
  };

  const handlePracticeReset = (setId) => {
    setPracticeAnswers(prev => ({ ...prev, [setId]: {} }));
    setPracticeSubmitted(prev => ({ ...prev, [setId]: {} }));
    if (setId === 'set_a') { setTimerA(practiceSetA?.timeLimitSeconds || 360); setIsTimerARunning(false); }
    if (setId === 'set_b') { setTimerB(practiceSetB?.timeLimitSeconds || 480); setIsTimerBRunning(false); }
    if (setId === 'set_c') { setTimerC(practiceSetC?.timeLimitSeconds || 600); setIsTimerCRunning(false); }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Lab Challenge Interactive State
  const [challengeWorkspace, setChallengeWorkspace] = useState({
    seat1: '',
    seat2: '',
    seat3: '',
    seat4: '',
    seat5: '',
    seat6: ''
  });
  const [challengeChecked, setChallengeChecked] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState(null);

  const handleCheckChallenge = () => {
    setChallengeChecked(true);
    const s1 = challengeWorkspace.seat1.trim().toLowerCase();
    const s2 = challengeWorkspace.seat2.trim().toLowerCase();
    const s3 = challengeWorkspace.seat3.trim().toLowerCase();
    const s4 = challengeWorkspace.seat4.trim().toLowerCase();
    const s5 = challengeWorkspace.seat5.trim().toLowerCase();
    const s6 = challengeWorkspace.seat6.trim().toLowerCase();

    const isMatch = s1.includes('divya') && s2.includes('ehsaan') && s3.includes('aarav') && s4.includes('bhavna') && s5.includes('chetan') && s6.includes('fatima');

    if (isMatch) {
      setChallengeFeedback({
        success: true,
        message: "Outstanding! Your workstation allocation strictly satisfies 100% of the clues!"
      });
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch { }
    } else {
      setChallengeFeedback({
        success: false,
        message: "Your workstation layout has one or more conflicts with the clues. Review the clues or see the complete derivation below."
      });
    }
  };

  // Rapid Fire Toggle Answers State
  const [revealedRapid, setRevealedRapid] = useState({});
  const toggleRapidReveal = (id) => {
    setRevealedRapid(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Final Assessment State
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentTimer, setAssessmentTimer] = useState(1500); // 25 minutes
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
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

  const handleAssessmentSelect = (qId, letter) => {
    if (assessmentSubmitted[qId] || assessmentFinished) return;
    setAssessmentAnswers(prev => ({ ...prev, [qId]: letter }));
    if (!isAssessmentTimerRunning) setIsAssessmentTimerRunning(true);
  };

  const handleAssessmentSubmitQuestion = (qId) => {
    if (assessmentSubmitted[qId] || assessmentAnswers[qId] === undefined || assessmentFinished) return;
    const newSubmitted = { ...assessmentSubmitted, [qId]: true };
    setAssessmentSubmitted(newSubmitted);

    const allDone = (finalAssessmentQuestions || []).every(q => newSubmitted[q.id]);
    if (allDone) {
      calculateAndFinishAssessment(newSubmitted, assessmentAnswers);
    }
  };

  const calculateAndFinishAssessment = (submittedObj, answersObj) => {
    let score = 0;
    (finalAssessmentQuestions || []).forEach(q => {
      if (isAnswerCorrect(answersObj[q.id], q.correctAnswer)) score += 1;
    });

    const totalQuestions = (finalAssessmentQuestions || []).length || 1;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 55;

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
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
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
    setAssessmentTimer(1500);
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

  const getDomainBreakdown = () => {
    const domains = {};
    (finalAssessmentQuestions || []).forEach(q => {
      const d = q.domain || 'General Seating';
      if (!domains[d]) {
        domains[d] = { correct: 0, total: 0 };
      }
      domains[d].total += 1;
      if (isAnswerCorrect(assessmentAnswers[q.id], q.correctAnswer)) {
        domains[d].correct += 1;
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
      {/* Top Hero Banner - Alpha Fly Brand (Purple/Indigo Advanced Level Theme) */}
      <div style={{
        background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '2.5rem 1.5rem 2rem',
        boxShadow: '0 4px 20px -2px rgba(76, 29, 149, 0.25)',
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
            <Sparkles size={14} color="#e9d5ff" />
            AlphaFly Logical Reasoning • Level 3 – Advanced • Day 4 (Cumulative Day 15)
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Advanced Seating Arrangements and Complex Logic Puzzles
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e9d5ff',
            maxWidth: '860px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Master linear & circular seating layouts with people facing mixed directions (North/South, Inward/Outward), multi-variable condition grids, vertical floor stacks, and multi-attribute scheduling matrices.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#f3e8ff'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={15} color="#d8b4fe" /> 60–75 Minutes
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Columns size={15} color="#d8b4fe" /> Linear & Circular Seating
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Table size={15} color="#d8b4fe" /> Floor & Scheduling Grids
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#d8b4fe" /> 20+ Master Solved Cases
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={15} color="#d8b4fe" /> 20-Q Final Assessment
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        flex: 1,
        width: '100%',
        boxSizing: 'border-box'
      }}>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & SECTION 1 INTRODUCTION                 */}
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
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    Welcome to Level 3, Day 4: Advanced Seating Arrangements
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Multi-Condition Deductions, Directional Hand Rules & Elimination Grids
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {day15Overview?.description}
              </p>

              {/* Learning Objectives */}
              <div style={{
                background: '#faf5ff',
                borderRadius: '12px',
                border: '1px solid #e9d5ff',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🎯 Lesson Learning Objectives:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                  {(day15Overview?.learningObjectives || []).map((obj, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#7e22ce" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 1 Theory Pillars */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Core Foundations: The Science of Complex Logic Puzzles
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {(section1Intro?.theory || []).map((t, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                      {t.concept}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {t.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Relatable Scenario: Computer Lab Workstation Allocation */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Terminal size={20} color="#7e22ce" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#581c87', margin: 0 }}>
                    {section1Intro?.starterScenario?.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '1rem' }}>
                  {section1Intro?.starterScenario?.context}
                </p>

                {/* Stated Clues */}
                <div style={{ background: '#ffffff', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                    GIVEN CLUES:
                  </div>
                  {(section1Intro?.starterScenario?.clues || []).map((clue, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', color: '#1e293b', marginBottom: '0.35rem' }}>
                      {clue}
                    </div>
                  ))}
                </div>

                {/* Step-by-Step Deduction */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#581c87', marginBottom: '0.5rem' }}>
                    Systematic Deduction Walkthrough:
                  </div>
                  {(section1Intro?.starterScenario?.stepByStepDeduction || []).map((step, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.4rem', display: 'flex', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Visual Row Diagram */}
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #a855f7',
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Final Verified Workstation Layout (Facing North):
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {(section1Intro?.starterScenario?.finalOrder || []).map(student => (
                      <div key={student} style={{
                        background: '#f3e8ff',
                        color: '#581c87',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        border: '1px solid #d8b4fe'
                      }}>
                        {student}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Warm-Up (3 Questions) */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                  ⚡ Interactive Warm-Up: Test Your Baseline Intuition (3 Questions)
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  Lock in your answer to check immediate feedback before diving into deep theory.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {(section1Intro?.warmUpQuestions || []).map((q, idx) => {
                    const userAns = warmUpAnswers[q.id];
                    const isSub = warmUpSubmitted[q.id];
                    const isCorrect = isAnswerCorrect(userAns, q.correctAnswer);

                    return (
                      <div key={q.id} style={{
                        background: '#ffffff',
                        border: isSub
                          ? isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                          : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.75rem' }}>
                          Question {idx + 1}: {q.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {(q.options || []).map(opt => {
                            const optLetter = getLetter(opt);
                            const isSelected = userAns === optLetter;
                            const isOptCorrect = optLetter === getLetter(q.correctAnswer);

                            let optBg = '#ffffff';
                            let optBorder = '#cbd5e1';
                            let optColor = '#1e293b';

                            if (isSub) {
                              if (isOptCorrect) { optBg = '#f0fdf4'; optBorder = '#86efac'; optColor = '#166534'; }
                              else if (isSelected) { optBg = '#fef2f2'; optBorder = '#fca5a5'; optColor = '#991b1b'; }
                            } else if (isSelected) {
                              optBg = '#f3e8ff'; optBorder = '#a855f7'; optColor = '#581c87';
                            }

                            return (
                              <button
                                key={opt}
                                onClick={() => handleWarmUpSelect(q.id, optLetter)}
                                disabled={isSub}
                                style={{
                                  textAlign: 'left',
                                  padding: '0.65rem 0.85rem',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${optBorder}`,
                                  background: optBg,
                                  color: optColor,
                                  fontSize: '0.85rem',
                                  fontWeight: isSelected ? 700 : 500,
                                  cursor: isSub ? 'default' : 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {!isSub && (
                          <button
                            onClick={() => handleWarmUpSubmit(q.id)}
                            disabled={userAns === undefined}
                            style={{
                              padding: '0.45rem 1rem',
                              borderRadius: '6px',
                              border: 'none',
                              background: userAns !== undefined ? '#7e22ce' : '#cbd5e1',
                              color: '#ffffff',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: userAns !== undefined ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Check Answer
                          </button>
                        )}

                        {isSub && (
                          <div style={{
                            background: isCorrect ? '#f0fdf4' : '#fef2f2',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            marginTop: '0.5rem',
                            fontSize: '0.85rem',
                            color: isCorrect ? '#166534' : '#991b1b',
                            border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`
                          }}>
                            <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>
                              {isCorrect ? '✅ Correct!' : `❌ Incorrect — Correct answer is (${q.correctAnswer})`}
                            </div>
                            <div style={{ color: '#334155', lineHeight: 1.5 }}>
                              {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Next: Linear Seating Arrangements <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: LINEAR SEATING ARRANGEMENTS                       */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Columns size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {section2Linear?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Left/Right Hand Axes, North vs South Orientations, and Adjacent Spans
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {section2Linear?.theory}
              </p>

              {/* Interactive Linear Seating Visualizer */}
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Compass size={20} color="#a5b4fc" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#e0e7ff' }}>
                      Interactive Linear Direction Simulator
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setLinearFacingDirection('North')}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: linearFacingDirection === 'North' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <ArrowUp size={14} /> Facing North
                    </button>
                    <button
                      onClick={() => setLinearFacingDirection('South')}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: linearFacingDirection === 'South' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <ArrowDown size={14} /> Facing South
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#c7d2fe', margin: '0 0 1rem 0' }}>
                  Click any seat to see that person's exact <strong>Left Hand</strong> and <strong>Right Hand</strong> direction when facing {linearFacingDirection}:
                </p>

                {/* Seats Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem'
                }}>
                  {[1, 2, 3, 4, 5, 6, 7].map(seatNum => {
                    const isSelected = linearActiveSeat === seatNum;
                    return (
                      <button
                        key={seatNum}
                        onClick={() => setLinearActiveSeat(seatNum)}
                        style={{
                          width: '65px',
                          height: '75px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                          background: isSelected ? '#4338ca' : 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Seat</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{seatNum}</span>
                        {linearFacingDirection === 'North' ? (
                          <ArrowUp size={14} color="#a5b4fc" />
                        ) : (
                          <ArrowDown size={14} color="#fca5a5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Perspective Feedback Box */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#e0e7ff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <strong>Seat {linearActiveSeat} Analysis (Facing {linearFacingDirection}):</strong>
                  <br />
                  {linearFacingDirection === 'North' ? (
                    <span>
                      • <strong>Left of Seat {linearActiveSeat}:</strong> Seats {linearActiveSeat > 1 ? Array.from({ length: linearActiveSeat - 1 }, (_, i) => i + 1).join(', ') : 'None (at extreme left end)'} (Westward toward viewer's left).
                      <br />
                      • <strong>Right of Seat {linearActiveSeat}:</strong> Seats {linearActiveSeat < 7 ? Array.from({ length: 7 - linearActiveSeat }, (_, i) => linearActiveSeat + 1 + i).join(', ') : 'None (at extreme right end)'} (Eastward toward viewer's right).
                    </span>
                  ) : (
                    <span>
                      • <strong>Left of Seat {linearActiveSeat}:</strong> Seats {linearActiveSeat < 7 ? Array.from({ length: 7 - linearActiveSeat }, (_, i) => linearActiveSeat + 1 + i).join(', ') : 'None (at extreme end)'} (Eastward toward viewer's RIGHT!).
                      <br />
                      • <strong>Right of Seat {linearActiveSeat}:</strong> Seats {linearActiveSeat > 1 ? Array.from({ length: linearActiveSeat - 1 }, (_, i) => i + 1).join(', ') : 'None (at extreme end)'} (Westward toward viewer's LEFT!).
                    </span>
                  )}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Linear Seating Mastery
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(section2Linear?.workedExamples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8' }}>{ex.title}</span>
                      <span style={{ fontSize: '0.75rem', background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.problem}
                    </div>

                    {/* Step-by-step reasoning */}
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
                      <div style={{ fontWeight: 800, color: '#475569', marginBottom: '0.35rem' }}>Deduction Pathway:</div>
                      {(ex.stepByStep || []).map((step, idx) => (
                        <div key={idx} style={{ marginBottom: '0.35rem' }}>{step}</div>
                      ))}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div style={{ fontWeight: 800 }}>Answer: {ex.correctAnswer}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.2rem' }}>
                        Verification: {ex.verification}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#991b1b', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Why Alternatives Fail:</strong> {ex.whyAlternativesFail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('overview')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Overview
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Circular Seating Arrangements →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CIRCULAR SEATING ARRANGEMENTS                     */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <RefreshCw size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {section3Circular?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Facing the Centre, Facing Outward, and Opposite Seat Principles
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {section3Circular?.theory}
              </p>

              {/* Seat Counts & Opposite Symmetry Rules */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {(section3Circular?.seatCountsAndOpposites || []).map((s, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: s.count % 2 === 0 ? '#166534' : '#b91c1c', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {s.count} Seats Circle {s.count % 2 === 0 ? '✅ Even Count' : '⚠️ Odd Count'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                      {s.oppositeProperty}
                    </div>
                  </div>
                ))}
              </div>

              {/* Circular Visualizer Simulation */}
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Compass size={20} color="#a5b4fc" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#e0e7ff' }}>
                      Interactive Circular Table Simulator
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setCircularFacing('Inward')}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: circularFacing === 'Inward' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Facing Centre (Inward)
                    </button>
                    <button
                      onClick={() => setCircularFacing('Outward')}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: circularFacing === 'Outward' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Facing Away (Outward)
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#c7d2fe', margin: '0 0 1rem 0' }}>
                  Click any seat around the 6-seat table to trace Left (Clockwise/Counter) and Right relationships:
                </p>

                {/* 6 Circular Seats Grid */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem'
                }}>
                  {[1, 2, 3, 4, 5, 6].map(seatNum => {
                    const isSelected = circularActiveSeat === seatNum;
                    const isOpposite = circularActiveSeat <= 3 ? circularActiveSeat + 3 === seatNum : circularActiveSeat - 3 === seatNum;

                    return (
                      <button
                        key={seatNum}
                        onClick={() => setCircularActiveSeat(seatNum)}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid #38bdf8' : isOpposite ? '2px dashed #f59e0b' : '1px solid rgba(255,255,255,0.2)',
                          background: isSelected ? '#4338ca' : isOpposite ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Seat</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{seatNum}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Circular Feedback */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#e0e7ff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <strong>Seat {circularActiveSeat} Inspection (Facing {circularFacing}):</strong>
                  <br />
                  • <strong>Directly Opposite Seat:</strong> Seat {circularActiveSeat <= 3 ? circularActiveSeat + 3 : circularActiveSeat - 3} (Highlighted in Gold).
                  <br />
                  • <strong>Immediate Left:</strong> {circularFacing === 'Inward' ? `Seat ${(circularActiveSeat % 6) + 1} (Clockwise)` : `Seat ${circularActiveSeat === 1 ? 6 : circularActiveSeat - 1} (Counter-Clockwise)`}.
                  <br />
                  • <strong>Immediate Right:</strong> {circularFacing === 'Inward' ? `Seat ${circularActiveSeat === 1 ? 6 : circularActiveSeat - 1} (Counter-Clockwise)` : `Seat ${(circularActiveSeat % 6) + 1} (Clockwise)`}.
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Circular Seating Scenarios
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(section3Circular?.workedExamples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8' }}>{ex.title}</span>
                      <span style={{ fontSize: '0.75rem', background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.problem}
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
                      <div style={{ fontWeight: 800, color: '#475569', marginBottom: '0.35rem' }}>Step-by-Step Logic:</div>
                      {(ex.stepByStep || []).map((step, idx) => (
                        <div key={idx} style={{ marginBottom: '0.35rem' }}>{step}</div>
                      ))}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div style={{ fontWeight: 800 }}>Answer: {ex.correctAnswer}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.2rem' }}>
                        Verification: {ex.verification}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#991b1b', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap Alert:</strong> {ex.whyAlternativesFail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Linear Seating
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Multi-Condition Logic Puzzles →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: MULTI-CONDITION LOGIC PUZZLES                     */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Layers size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {section4MultiCondition?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Negative Clues, 'If-Then' Conditionals, and Cross-Attribute Grids
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {section4MultiCondition?.theory}
              </p>

              {/* 7-Step Protocol Card */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🛡️ The 7-Step Systematic Solving Protocol:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(section4MultiCondition?.sevenStepMethod || []).map(s => (
                    <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{
                        background: '#7e22ce',
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
                        {s.step}
                      </span>
                      <div>
                        <strong style={{ color: '#1e293b', fontSize: '0.9rem' }}>{s.name}: </strong>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Multi-Condition & Multi-Attribute Logic
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(section4MultiCondition?.workedExamples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8' }}>{ex.title}</span>
                      <span style={{ fontSize: '0.75rem', background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.problem}
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
                      <div style={{ fontWeight: 800, color: '#475569', marginBottom: '0.35rem' }}>Step-by-Step Logic:</div>
                      {(ex.stepByStep || []).map((step, idx) => (
                        <div key={idx} style={{ marginBottom: '0.35rem' }}>{step}</div>
                      ))}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div style={{ fontWeight: 800 }}>Answer: {ex.correctAnswer}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.2rem' }}>
                        Verification: {ex.verification}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#991b1b', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.whyAlternativesFail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Circular Seating
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Floor & Scheduling Puzzles →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: FLOOR, ORDERING & SCHEDULING                      */}
        {/* ======================================================== */}
        {currentTab === 'section5' && (
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
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Table size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {section5FloorScheduling?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Vertical Stacks, Calendar Schedules, Task Queues, and Dual-Attribute Tables
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {section5FloorScheduling?.theory}
              </p>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Floor Stacks, Days & Time-Slot Logic
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(section5FloorScheduling?.workedExamples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8' }}>{ex.title}</span>
                      <span style={{ fontSize: '0.75rem', background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.problem}
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
                      <div style={{ fontWeight: 800, color: '#475569', marginBottom: '0.35rem' }}>Deduction Pathway:</div>
                      {(ex.stepByStep || []).map((step, idx) => (
                        <div key={idx} style={{ marginBottom: '0.35rem' }}>{step}</div>
                      ))}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div style={{ fontWeight: 800 }}>Answer: {ex.correctAnswer}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.2rem' }}>
                        Verification: {ex.verification}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#991b1b', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.whyAlternativesFail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Multi-Condition
                </button>
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Common Mistakes & Strategies →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: MISTAKES & EXAM STRATEGIES                        */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.6rem', borderRadius: '12px' }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#991b1b' }}>
                    {section6Mistakes?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    9 Classic Errors That Derail Seating Deductions & Actionable Examination Tactics
                  </p>
                </div>
              </div>

              {/* 9 Pitfalls Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}>
                {(section6Mistakes?.pitfalls || []).map((m, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #fee2e2',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ fontWeight: 800, color: '#b91c1c', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={16} />
                      {m.mistake}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {m.detail}
                    </div>
                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      color: '#15803d'
                    }}>
                      🛡️ <strong>Remedy:</strong> {m.remedy}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical Strategy Checklist */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  📋 7-Step Practical Examination Checklist:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(section6Mistakes?.strategyChecklist || []).map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#7e22ce" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Floor & Scheduling
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Interactive Practice Sets (A, B, C) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: INTERACTIVE PRACTICE SETS (A, B, C)               */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    Interactive Timed Practice Activities
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    3 Progressive Practice Sets (Linear, Circular, Complex Logic) with Live Timers & Explanations
                  </p>
                </div>
              </div>

              {/* RENDER PRACTICE SET HELPER */}
              {[
                { data: practiceSetA, setId: 'set_a', timer: timerA, isRunning: isTimerARunning, setIsRunning: setIsTimerARunning },
                { data: practiceSetB, setId: 'set_b', timer: timerB, isRunning: isTimerBRunning, setIsRunning: setIsTimerBRunning },
                { data: practiceSetC, setId: 'set_c', timer: timerC, isRunning: isTimerCRunning, setIsRunning: setIsTimerCRunning }
              ].map(({ data, setId, timer, isRunning, setIsRunning }) => {
                const answers = practiceAnswers[setId] || {};
                const submitted = practiceSubmitted[setId] || {};
                let setScore = 0;
                (data.questions || []).forEach(q => {
                  if (submitted[q.id] && isAnswerCorrect(answers[q.id], q.correctAnswerLetter || q.correctAnswer)) {
                    setScore += 1;
                  }
                });

                return (
                  <div key={setId} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '1rem',
                      borderBottom: '1px solid #e2e8f0',
                      paddingBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
                          {data.title}
                        </h3>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          background: timer < 60 ? '#fef2f2' : '#ffffff',
                          color: timer < 60 ? '#b91c1c' : '#4338ca',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          <Clock size={16} />
                          {formatTimer(timer)}
                        </div>

                        <button
                          onClick={() => setIsRunning(!isRunning)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#475569',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isRunning ? 'Pause' : 'Start Timer'}
                        </button>

                        <button
                          onClick={() => handlePracticeReset(setId)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#475569',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Reset Set
                        </button>

                        <div style={{
                          background: '#f3e8ff',
                          color: '#7e22ce',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}>
                          Score: {setScore} / {data.questions?.length}
                        </div>
                      </div>
                    </div>

                    {/* Questions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {(data.questions || []).map((q, qIndex) => {
                        const isQSubmitted = submitted[q.id];
                        const userAns = answers[q.id];
                        const targetAns = q.correctAnswerLetter || q.correctAnswer;
                        const isCorrect = isAnswerCorrect(userAns, targetAns);

                        return (
                          <div key={q.id} style={{
                            background: '#ffffff',
                            borderRadius: '10px',
                            padding: '1.25rem',
                            border: isQSubmitted
                              ? isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                              : '1px solid #e2e8f0'
                          }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                              Q{qIndex + 1}. {q.question}
                            </div>

                            {/* Options */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                              {(q.options || []).map(opt => {
                                const optLetter = getLetter(opt);
                                const isSelected = userAns === optLetter;
                                const isOptCorrect = optLetter === getLetter(targetAns);

                                let optBg = '#ffffff';
                                let optBorder = '#cbd5e1';
                                let optColor = '#1e293b';

                                if (isQSubmitted) {
                                  if (isOptCorrect) { optBg = '#f0fdf4'; optBorder = '#86efac'; optColor = '#166534'; }
                                  else if (isSelected) { optBg = '#fef2f2'; optBorder = '#fca5a5'; optColor = '#991b1b'; }
                                } else if (isSelected) {
                                  optBg = '#f3e8ff'; optBorder = '#a855f7'; optColor = '#581c87';
                                }

                                return (
                                  <button
                                    key={opt}
                                    onClick={() => handlePracticeSelect(setId, q.id, optLetter)}
                                    disabled={isQSubmitted}
                                    style={{
                                      textAlign: 'left',
                                      padding: '0.65rem 0.85rem',
                                      borderRadius: '8px',
                                      border: `1.5px solid ${optBorder}`,
                                      background: optBg,
                                      color: optColor,
                                      fontSize: '0.85rem',
                                      fontWeight: isSelected ? 700 : 500,
                                      cursor: isQSubmitted ? 'default' : 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between'
                                    }}
                                  >
                                    <span>{opt}</span>
                                    {isQSubmitted && isOptCorrect && <CheckCircle size={16} color="#16a34a" />}
                                    {isQSubmitted && isSelected && !isOptCorrect && <XCircle size={16} color="#dc2626" />}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Submit Button */}
                            {!isQSubmitted && (
                              <button
                                onClick={() => handlePracticeSubmit(setId, q.id)}
                                disabled={userAns === undefined}
                                style={{
                                  padding: '0.45rem 1rem',
                                  borderRadius: '6px',
                                  border: 'none',
                                  background: userAns !== undefined ? '#7e22ce' : '#cbd5e1',
                                  color: '#ffffff',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: userAns !== undefined ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Submit Answer
                              </button>
                            )}

                            {/* Feedback */}
                            {isQSubmitted && (
                              <div style={{
                                background: isCorrect ? '#f0fdf4' : '#fef2f2',
                                borderRadius: '8px',
                                padding: '0.85rem',
                                border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
                                marginTop: '0.75rem'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  fontWeight: 800,
                                  fontSize: '0.9rem',
                                  color: isCorrect ? '#166534' : '#991b1b',
                                  marginBottom: '0.35rem'
                                }}>
                                  {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                  {isCorrect ? 'Correct!' : `Incorrect — Correct answer is (${targetAns})`}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.35rem', whiteSpace: 'pre-line' }}>
                                  {q.explanation}
                                </div>
                                {q.distractorNotes && (
                                  <div style={{ fontSize: '0.75rem', color: '#64748b', borderTop: '1px dashed #cbd5e1', paddingTop: '0.35rem' }}>
                                    💡 <em>Distractor Notes: {q.distractorNotes}</em>
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
              })}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Mistakes & Strategy
                </button>
                <button
                  onClick={() => handleTabChange('challenge')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Next: Computer Lab Planning Challenge →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: REAL-WORLD CHALLENGE: LAB PLANNING                */}
        {/* ======================================================== */}
        {currentTab === 'challenge' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {challengeLabScenario?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Multi-Condition Seating & Supervisor Session Assignment Mission
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f1f5f9',
                borderLeft: '4px solid #6366f1',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#334155',
                marginBottom: '1.5rem',
                lineHeight: 1.6
              }}>
                <strong>Operational Context:</strong> {challengeLabScenario?.context}
                <br />
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                  <em>Note: This scenario is an educational logical reasoning challenge designed to test your deduction under constraints and does not represent real-world administrative scheduling.</em>
                </span>
              </div>

              {/* Numbered Clues */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.75rem 0' }}>
                  📋 Stated Constraints & Clues:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {(challengeLabScenario?.clues || []).map((c, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', color: '#1e293b' }}>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Deduction Workspace */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                  Student Workstation Workspace (Type Student Name for Each Seat):
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                  Candidates: <strong>Aarav, Bhavna, Chetan, Divya, Ehsaan, Fatima</strong>.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <div key={num} style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b21a8', display: 'block', marginBottom: '0.25rem' }}>
                        Workstation {num}:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aarav"
                        value={challengeWorkspace[`seat${num}`]}
                        onChange={(e) => setChallengeWorkspace(prev => ({ ...prev, [`seat${num}`]: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCheckChallenge}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(76, 29, 149, 0.25)'
                  }}
                >
                  Check Solution & Reveal Full Proof
                </button>
              </div>

              {/* Feedback & Solution Walkthrough */}
              {challengeChecked && (
                <div style={{
                  background: challengeFeedback?.success ? '#f0fdf4' : '#faf5ff',
                  border: `1px solid ${challengeFeedback?.success ? '#86efac' : '#d8b4fe'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: challengeFeedback?.success ? '#166534' : '#581c87',
                    marginBottom: '0.75rem'
                  }}>
                    {challengeFeedback?.message}
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                    Mathematical Derivation Steps:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    {(challengeLabScenario?.solution?.derivationSteps || []).map((step, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                        {step}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontWeight: 800,
                    color: '#4c1d95',
                    textAlign: 'center',
                    fontSize: '0.95rem'
                  }}>
                    Verified Arrangement: {challengeLabScenario?.solution?.verifiedLayout}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Practice Sets
                </button>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Take Final Assessment (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: FINAL ASSESSMENT (20 QUESTIONS)                   */}
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
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                      Day 15 Final Assessment: 20 Advanced Seating & Logic Questions
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      Time Limit: 25 Minutes (1500s) • 4 Options Each • Automatic Evaluation & Feedback
                    </p>
                  </div>
                </div>

                {/* Live Assessment Timer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    background: assessmentTimer < 180 ? '#fef2f2' : '#ffffff',
                    color: assessmentTimer < 180 ? '#b91c1c' : '#4338ca',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0.5rem 1rem',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={18} />
                    {formatTimer(assessmentTimer)}
                  </div>
                </div>
              </div>

              {/* Assessment Palette & Question */}
              {!assessmentFinished ? (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#64748b',
                    marginBottom: '0.75rem'
                  }}>
                    <span>Question {assessmentIndex + 1} of {(finalAssessmentQuestions || []).length}</span>
                    <span>
                      Answered: {Object.keys(assessmentSubmitted).length} / {(finalAssessmentQuestions || []).length}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: `${((assessmentIndex + 1) / (finalAssessmentQuestions || []).length) * 100}%`,
                      height: '100%',
                      background: '#7e22ce',
                      transition: 'width 0.3s'
                    }} />
                  </div>

                  {/* Question Palette Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                    {(finalAssessmentQuestions || []).map((q, idx) => {
                      const isSub = assessmentSubmitted[q.id];
                      const isCur = assessmentIndex === idx;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setAssessmentIndex(idx)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: isCur ? '2px solid #7e22ce' : '1px solid #cbd5e1',
                            background: isSub ? '#dcfce7' : '#ffffff',
                            color: isSub ? '#15803d' : '#475569',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Current Question View */}
                  {finalAssessmentQuestions[assessmentIndex] && (() => {
                    const q = finalAssessmentQuestions[assessmentIndex];
                    const userAns = assessmentAnswers[q.id];
                    const isSub = assessmentSubmitted[q.id];

                    return (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7e22ce', textTransform: 'uppercase' }}>
                            {q.domain}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: '0 0 1.25rem 0', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                          {q.question}
                        </h3>

                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                          {(q.options || []).map(opt => {
                            const optLetter = getLetter(opt);
                            const isSelected = userAns === optLetter;

                            return (
                              <button
                                key={opt}
                                onClick={() => handleAssessmentSelect(q.id, optLetter)}
                                disabled={isSub}
                                style={{
                                  textAlign: 'left',
                                  padding: '0.85rem 1rem',
                                  borderRadius: '8px',
                                  border: isSelected ? '2px solid #7e22ce' : '1px solid #cbd5e1',
                                  background: isSelected ? '#faf5ff' : '#ffffff',
                                  color: isSelected ? '#581c87' : '#1e293b',
                                  fontSize: '0.9rem',
                                  fontWeight: isSelected ? 700 : 500,
                                  cursor: isSub ? 'default' : 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <button
                            onClick={() => setAssessmentIndex(prev => Math.max(0, prev - 1))}
                            disabled={assessmentIndex === 0}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              color: '#475569',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              cursor: assessmentIndex === 0 ? 'not-allowed' : 'pointer'
                            }}
                          >
                            ← Previous
                          </button>

                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {!isSub && (
                              <button
                                onClick={() => handleAssessmentSubmitQuestion(q.id)}
                                disabled={userAns === undefined}
                                style={{
                                  padding: '0.5rem 1.25rem',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: userAns !== undefined ? '#7e22ce' : '#cbd5e1',
                                  color: '#ffffff',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  cursor: userAns !== undefined ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Lock In Answer
                              </button>
                            )}

                            {assessmentIndex < (finalAssessmentQuestions || []).length - 1 ? (
                              <button
                                onClick={() => setAssessmentIndex(prev => prev + 1)}
                                style={{
                                  padding: '0.5rem 1.25rem',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: '#4c1d95',
                                  color: '#ffffff',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Next Question →
                              </button>
                            ) : (
                              <button
                                onClick={handleFinishAssessment}
                                style={{
                                  padding: '0.5rem 1.25rem',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: '#16a34a',
                                  color: '#ffffff',
                                  fontSize: '0.85rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                Submit Test
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* ASSESSMENT SUMMARY CARD */
                <div>
                  <div style={{
                    background: savedProgress.assessmentPercentage >= 55 ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${savedProgress.assessmentPercentage >= 55 ? '#86efac' : '#fca5a5'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <Award size={48} color={savedProgress.assessmentPercentage >= 55 ? '#16a34a' : '#dc2626'} style={{ margin: '0 auto 0.5rem' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: savedProgress.assessmentPercentage >= 55 ? '#166534' : '#991b1b', margin: '0 0 0.5rem 0' }}>
                      {savedProgress.assessmentScore >= 18 && "18–20: Excellent – Advanced Logic Expert"}
                      {savedProgress.assessmentScore >= 15 && savedProgress.assessmentScore <= 17 && "15–17: Very Good – Strong Logical Reasoning"}
                      {savedProgress.assessmentScore >= 11 && savedProgress.assessmentScore <= 14 && "11–14: Good – Practise Complex Constraints"}
                      {savedProgress.assessmentScore <= 10 && "0–10: Needs Improvement – Revise the Concepts"}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem 0' }}>
                      <em>Note: This score is an educational learning feedback diagnostic, not an official certification.</em>
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>
                          {savedProgress.assessmentScore} / {(finalAssessmentQuestions || []).length}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>Total Score</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#7e22ce' }}>
                          {savedProgress.assessmentPercentage}%
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>Accuracy Rate</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#475569' }}>
                          {formatTimer(1500 - assessmentTimer)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>Time Elapsed</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={handleResetAssessment}
                        style={{
                          background: '#ffffff',
                          color: '#475569',
                          border: '1px solid #cbd5e1',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '10px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <RotateCcw size={16} /> Retry Test
                      </button>

                      <button
                        onClick={() => setIsReviewOpen(!isReviewOpen)}
                        style={{
                          background: '#7e22ce',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '10px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isReviewOpen ? 'Hide Full Question Review' : 'Review All 20 Answers & Explanations'}
                      </button>
                    </div>
                  </div>

                  {/* Domain Breakdown */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                      📊 Skill Domain Performance Analysis:
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      {Object.entries(getDomainBreakdown()).map(([domain, stat]) => {
                        const pct = Math.round((stat.correct / stat.total) * 100);
                        const isWeak = pct < 60;

                        return (
                          <div key={domain} style={{
                            background: '#f8fafc',
                            border: `1px solid ${isWeak ? '#fca5a5' : '#e2e8f0'}`,
                            borderRadius: '10px',
                            padding: '1rem'
                          }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.25rem' }}>
                              {domain}
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: isWeak ? '#dc2626' : '#16a34a', marginBottom: '0.25rem' }}>
                              {stat.correct} / {stat.total} ({pct}%)
                            </div>
                            <div style={{ fontSize: '0.75rem', color: isWeak ? '#b91c1c' : '#64748b' }}>
                              {isWeak ? '⚠️ Review suggested' : '✅ Proficient'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Questions */}
                  {isReviewOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                        Detailed Answer Review:
                      </h4>

                      {(finalAssessmentQuestions || []).map((q, idx) => {
                        const userAns = assessmentAnswers[q.id];
                        const isCorrect = isAnswerCorrect(userAns, q.correctAnswer);

                        return (
                          <div key={q.id} style={{
                            background: '#ffffff',
                            borderRadius: '10px',
                            padding: '1.25rem',
                            border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7e22ce' }}>
                                Question {idx + 1} • {q.domain}
                              </span>
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                                {isCorrect ? '✅ Correct' : `❌ Incorrect (Selected: ${userAns || 'None'})`}
                              </span>
                            </div>

                            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem 0', whiteSpace: 'pre-line' }}>
                              {q.question}
                            </p>

                            <div style={{
                              background: '#f8fafc',
                              padding: '0.75rem',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              lineHeight: 1.5,
                              color: '#334155',
                              marginBottom: '0.5rem',
                              whiteSpace: 'pre-line'
                            }}>
                              <strong>Step-by-Step Explanation:</strong> {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('challenge')}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Lab Planning Challenge
                </button>
                <button
                  onClick={() => handleTabChange('summary')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Revision Sheet & Rapid-Fire →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: QUICK REVISION & RAPID-FIRE                      */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                      {revisionData?.title}
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      Rapid Review Sheet & 5 Interactive Rapid-Fire Verification Questions
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={16} /> Print Revision Sheet
                </button>
              </div>

              {/* Summary Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {(revisionData?.summaryPoints || []).map((pt, idx) => (
                  <div key={idx} style={{
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {pt.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                      {pt.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Rapid-Fire Questions */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                ⚡ 5 Rapid-Fire Check Questions (Click to Reveal Answers):
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {(revisionData?.rapidFireQuestions || []).map((rf, idx) => {
                  const isRev = revealedRapid[rf.id];
                  return (
                    <div key={rf.id} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                          {idx + 1}. {rf.prompt}
                        </span>
                        <button
                          onClick={() => toggleRapidReveal(rf.id)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            border: isRev ? '1px solid #cbd5e1' : 'none',
                            background: isRev ? '#ffffff' : '#6b21a8',
                            color: isRev ? '#475569' : '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isRev ? 'Hide Answer' : 'Reveal Answer'}
                        </button>
                      </div>

                      {isRev && (
                        <div style={{ marginTop: '0.5rem', background: '#ecfdf5', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                          <strong>Answer:</strong> {rf.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Course Progression Badge */}
              <div style={{
                background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px -4px rgba(76, 29, 149, 0.3)'
              }}>
                <Award size={48} color="#e9d5ff" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Congratulations on Completing Level 3, Day 4 (Cumulative Day 15)!
                </h3>
                <p style={{ color: '#e9d5ff', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You have mastered high-stakes linear and circular seating puzzles with mixed facing directions, multi-condition constraint matrices, floor stacks, and multi-attribute scheduling logic.
                </p>
                <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate('spoko_reasoning_l3_d14', 'overview');
                      }
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    ← Review Day 14
                  </button>
                  <button
                    onClick={() => handleTabChange('assessment')}
                    style={{
                      background: '#ffffff',
                      color: '#4c1d95',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    Review Day 15 Assessment
                  </button>
                  <button
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate('spoko_reasoning_l3_d16', 'overview');
                      }
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                    }}
                  >
                    Next: Day 16 (Level 3 Day 5) →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
