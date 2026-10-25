import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
  Clock, Sparkles, BookOpen, Layers, Target, Zap, HelpCircle,
  AlertTriangle, FileText, CheckCircle, Scale, Eye, GitBranch,
  ShieldAlert, Award, CheckSquare, MessageSquare, Briefcase,
  ChevronDown, ChevronRight, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day12Overview,
  lessonIntro,
  coreConcepts,
  interactiveClassificationItems,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  caseStudyData,
  commonMistakes,
  practicalChecklist,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel3Day12.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day12({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d12_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 12 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d12:day12';
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
      onNavigate('spoko_reasoning_l3_d12', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Concept 1 Interactive Statement Classifier State
  const [classifierUserAnswers, setClassifierUserAnswers] = useState({});
  const [classifierSubmitted, setClassifierSubmitted] = useState(false);

  const handleClassifierSelect = (itemId, category) => {
    if (classifierSubmitted) return;
    setClassifierUserAnswers(prev => ({ ...prev, [itemId]: category }));
  };

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
    if (setId === 'set_a') { setTimerA(practiceSetA?.timeLimitSeconds || 360); setIsTimerARunning(false); }
    if (setId === 'set_b') { setTimerB(practiceSetB?.timeLimitSeconds || 480); setIsTimerBRunning(false); }
    if (setId === 'set_c') { setTimerC(practiceSetC?.timeLimitSeconds || 600); setIsTimerCRunning(false); }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Case Study State
  const [caseStudyNotes, setCaseStudyNotes] = useState('');
  const [isCaseSubmitted, setIsCaseSubmitted] = useState(false);

  // Worked Examples Selector
  const [selectedExample, setSelectedExample] = useState(workedExamples?.[0]?.id || 'ex1');

  // Final Assessment State
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentTimer, setAssessmentTimer] = useState(1500); // 25 minutes
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
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
        confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
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
      const d = q.domain || 'General Logic';
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
        background: 'linear-gradient(135deg, #3b0764 0%, #4c1d95 40%, #1e3a8a 100%)',
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
            AlphaFly Logical Reasoning • Level 3 – Advanced • Day 12
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Advanced Critical Thinking & Logical Deduction (Part 1)
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e9d5ff',
            maxWidth: '820px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Master argument structure, unmask hidden assumptions, evaluate deductive validity vs inductive strength, and formulate airtight multi-statement deductions.
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
              <Clock size={15} color="#d8b4fe" /> 50–60 Minutes
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={15} color="#d8b4fe" /> 4 Core Concepts
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#d8b4fe" /> 5 Master Solved Examples
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={15} color="#d8b4fe" /> 20 Timed Assessment Qs (Easy, Medium, Hard)
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
        {/* TAB 1: OVERVIEW & LESSON INTRODUCTION                    */}
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
                  background: '#f3e8ff',
                  color: '#6b21a8',
                  padding: '0.6rem',
                  borderRadius: '12px'
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    Welcome to Level 3: Advanced Critical Thinking (Part 1)
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Deductive Rigor, Hidden Assumptions, and Multi-Statement Deductions
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {day12Overview?.description}
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
                  🎯 Learning Objectives:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                  {(day12Overview?.learningObjectives || []).map((obj, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#7e22ce" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Shift from Basic to Advanced */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                ⚡ The Cognitive Leap: Basic Reasoning vs. Advanced Critical Thinking
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                {(lessonIntro?.foundationalShift || []).map((item, idx) => (
                  <div key={idx} style={{
                    background: idx === 1 ? 'linear-gradient(135deg, #fdf4ff 0%, #ede9fe 100%)' : '#f8fafc',
                    border: `1.5px solid ${idx === 1 ? '#c084fc' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontWeight: 800, color: idx === 1 ? '#6b21a8' : '#334155', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                      {item.level}
                    </div>
                    <div style={{ color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                      <strong>Core Focus:</strong> {item.focus}
                    </div>
                    <div style={{ color: idx === 1 ? '#7e22ce' : '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      {idx === 1 ? `✨ Advantage: ${item.power}` : `⚠️ Bound: ${item.limitation}`}
                    </div>
                  </div>
                ))}
              </div>

              {/* Starter Scenario */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #ede9fe 100%)',
                borderRadius: '14px',
                border: '1.5px solid #c4b5fd',
                padding: '1.75rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={20} color="#6b21a8" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4c1d95', margin: 0 }}>
                    {lessonIntro?.starterScenario?.title}
                  </h3>
                </div>
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {lessonIntro?.starterScenario?.context}
                </p>

                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <strong style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <AlertTriangle size={16} /> The Unwarranted Causal Leap:
                  </strong>
                  <span style={{ color: '#7f1d1d', fontSize: '0.9rem' }}>
                    {lessonIntro?.starterScenario?.initialClaim}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#3b0764', marginBottom: '0.75rem' }}>
                  4 Critical Diagnostic Reflections:
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {(lessonIntro?.starterScenario?.reflectiveQuestions || []).map((item, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {item.question}
                      </div>
                      <div style={{ color: '#4c1d95', fontSize: '0.86rem', lineHeight: 1.5 }}>
                        💡 <strong>Analytical Answer:</strong> {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Core Distinctions */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                4 Foundational Dimensions of Critical Reasoning
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {(lessonIntro?.coreDistinctions || []).map((el, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {el.term}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.45 }}>
                      {el.definition}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: '#6b21a8',
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
                  Start Concept 1: Facts, Opinions & Assumptions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONCEPT 1 - FACTS, OPINIONS, ASSUMPTIONS, CONCLUSIONS */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 1
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts?.concept1?.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept1?.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '2rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts?.concept1?.theory}
              </div>

              {/* 4 Definitions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {(coreConcepts?.concept1?.definitions || []).map((def, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                      {def.term}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '0.75rem', flex: 1, lineHeight: 1.5 }}>
                      {def.meaning}
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '8px', fontSize: '0.8rem', color: '#1e293b' }}>
                      <div style={{ marginBottom: '4px' }}><strong>Education:</strong> {def.educationExample}</div>
                      <div style={{ marginBottom: '4px' }}><strong>Tech:</strong> {def.techExample}</div>
                      <div><strong>Business:</strong> {def.businessExample}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Statement Classifier */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Target size={20} color="#7e22ce" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#581c87', margin: 0 }}>
                    Interactive Statement Classifier: Test Your Discernment
                  </h3>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Select the correct category (Fact, Opinion, Assumption, or Conclusion) for each statement:
                </p>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {(interactiveClassificationItems || []).map((item, idx) => {
                    const selected = classifierUserAnswers[item.id];
                    const isRight = selected === item.category;

                    return (
                      <div key={item.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                          {idx + 1}. "{item.text}"
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                          {['Fact', 'Opinion', 'Assumption', 'Conclusion'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => handleClassifierSelect(item.id, cat)}
                              disabled={classifierSubmitted}
                              style={{
                                padding: '0.35rem 0.8rem',
                                borderRadius: '6px',
                                border: selected === cat ? (classifierSubmitted ? (cat === item.category ? '2px solid #16a34a' : '2px solid #dc2626') : '2px solid #7e22ce') : '1px solid #cbd5e1',
                                background: selected === cat ? (classifierSubmitted ? (cat === item.category ? '#dcfce7' : '#fee2e2') : '#f3e8ff') : '#ffffff',
                                color: selected === cat ? (classifierSubmitted ? (cat === item.category ? '#166534' : '#991b1b') : '#6b21a8') : '#475569',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                cursor: classifierSubmitted ? 'default' : 'pointer'
                              }}
                            >
                              {cat}
                            </button>
                          ))}

                          {classifierSubmitted && (
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isRight ? '#16a34a' : '#dc2626', marginLeft: '0.5rem' }}>
                              {isRight ? '✓ Correct' : `✗ Correct: ${item.category}`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                  {!classifierSubmitted ? (
                    <button
                      onClick={() => setClassifierSubmitted(true)}
                      style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Check All Classifications
                    </button>
                  ) : (
                    <button
                      onClick={() => { setClassifierSubmitted(false); setClassifierUserAnswers({}); }}
                      style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Reset Classifier
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('overview')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Overview
                </button>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Hidden Assumptions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONCEPT 2 - IDENTIFYING HIDDEN ASSUMPTIONS         */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 2
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts?.concept2?.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept2?.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts?.concept2?.theory}
              </div>

              {/* The Negation Test Callout */}
              {coreConcepts?.concept2?.theNegationTest && (
                <div style={{ background: '#fef3c7', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400e', margin: '0 0 0.5rem 0' }}>
                    🔍 {coreConcepts.concept2.theNegationTest.name}
                  </h3>
                  <div style={{ color: '#78350f', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {coreConcepts.concept2.theNegationTest.explanation}
                  </div>
                  {coreConcepts.concept2.theNegationTest.example && (
                    <div style={{ background: '#ffffff', border: '1px solid #fcd34d', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem', color: '#92400e', whiteSpace: 'pre-line' }}>
                      <strong>Practical Example:</strong><br />
                      {coreConcepts.concept2.theNegationTest.example}
                    </div>
                  )}
                </div>
              )}

              {/* 5 Hidden Assumption Worked Examples */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                5 Detailed Hidden Assumption Examples & Bridging Analysis
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept2?.workedExamples || coreConcepts?.concept2?.scenarios || []).map((sc, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#3b0764', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      Scenario {idx + 1}: "{sc.statement}"
                    </div>
                    {sc.premises && (
                      <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.35rem' }}>
                        <strong>Stated Premise:</strong> {sc.premises}
                      </div>
                    )}
                    {sc.conclusion && (
                      <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
                        <strong>Claimed Conclusion:</strong> {sc.conclusion}
                      </div>
                    )}

                    {/* Hidden Assumptions List */}
                    {Array.isArray(sc.hiddenAssumptions) ? (
                      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                          🎭 Unmasked Hidden Assumptions:
                        </div>
                        {sc.hiddenAssumptions.map((ha, hai) => (
                          <div key={hai} style={{ fontSize: '0.84rem', color: '#581c87', marginBottom: '2px' }}>
                            • {ha}
                          </div>
                        ))}
                      </div>
                    ) : sc.hiddenAssumption ? (
                      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.86rem', color: '#6b21a8', marginBottom: '0.4rem' }}>
                        🎭 <strong>Hidden Assumption:</strong> {sc.hiddenAssumption}
                      </div>
                    ) : null}

                    {sc.probingQuestions && (
                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#1e40af' }}>
                        💡 <strong>Probing Inquiry:</strong> {sc.probingQuestions}
                      </div>
                    )}
                    {sc.negationTest && (
                      <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.84rem', color: '#991b1b', marginTop: '0.4rem' }}>
                        ⚠️ <strong>Negation Test:</strong> {sc.negationTest}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section1')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 1
                </button>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Evaluating Arguments →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONCEPT 3 - EVALUATING ARGUMENTS                  */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 3
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts?.concept3?.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept3?.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts?.concept3?.theory}
              </div>

              {/* 4 Core Dimensions of Argument Evaluation */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                4 Essential Dimensions of Argument Evaluation
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept3?.dimensions || []).map((dim, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                      {dim.dimension}
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '0.75rem', flex: 1 }}>
                      {dim.detail}
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem', fontSize: '0.82rem', color: '#1e293b' }}>
                      <strong>Example:</strong> {dim.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 2
                </button>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Multi-Statement Deductions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONCEPT 4 - COMPLEX MULTI-STATEMENT DEDUCTIONS   */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 4
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts?.concept4?.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept4?.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts?.concept4?.theory}
              </div>

              {/* Quantifiers Guide */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Formal Quantifiers Quick Reference
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept4?.quantifierRules || []).map((q, idx) => (
                  <div key={idx} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '1rem', marginBottom: '0.25rem' }}>
                      "{q.word}"
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <strong>Formal Rule:</strong> {q.meaning}
                    </div>
                    <div style={{ color: '#dc2626', fontSize: '0.8rem', background: '#fee2e2', padding: '0.35rem 0.6rem', borderRadius: '4px' }}>
                      ⚠️ <strong>Trap:</strong> {q.trap}
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Worked Multi-Premise Deductions */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                3 Worked Multi-Premise Deduction Chains
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept4?.workedDeductions || []).map((d, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#3b0764', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {d.title || `Example ${idx + 1}`}:
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.5rem', fontSize: '0.86rem', color: '#1e293b' }}>
                      {(d.premises || []).map((p, pi) => <div key={pi} style={{ marginBottom: '2px' }}>• {p}</div>)}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.84rem', color: '#166534', marginBottom: '0.4rem' }}>
                      ✓ <strong>Valid Deduction:</strong> {d.validConclusion}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.35rem' }}>
                      <strong>Why Valid:</strong> {d.whyValid}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#991b1b', background: '#fee2e2', padding: '0.35rem 0.65rem', borderRadius: '4px' }}>
                      ❌ {d.invalidTrap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 3
                </button>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 5 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: 5 SOLVED MASTER EXAMPLES                          */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                ADVANCED WORKED EXAMPLES
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                5 Master Solved Reasoning & Critical Thinking Examples
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Study 5 comprehensive multi-premise reasoning scenarios progressing from moderate to advanced difficulty. Each example details step-by-step logic and dismantles wrong options:
              </p>

              {/* Example Selector Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {(workedExamples || []).map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(ex.id)}
                    style={{
                      padding: '0.5rem 0.9rem',
                      borderRadius: '8px',
                      border: selectedExample === ex.id ? '2px solid #6b21a8' : '1px solid #cbd5e1',
                      background: selectedExample === ex.id ? '#faf5ff' : '#ffffff',
                      color: selectedExample === ex.id ? '#581c87' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ex {idx + 1}: {ex.type}
                  </button>
                ))}
              </div>

              {/* Active Example Display */}
              {(() => {
                const ex = (workedExamples || []).find(e => e.id === selectedExample) || (workedExamples || [])[0];
                if (!ex) return null;
                return (
                  <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6b21a8', background: '#f3e8ff', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                        {ex.type}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        background: '#faf5ff',
                        color: '#6b21a8'
                      }}>
                        Master Example
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
                      {ex.title}
                    </h3>

                    {/* Scenario / Context */}
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', color: '#1e293b', fontSize: '0.92rem', whiteSpace: 'pre-line' }}>
                      {ex.scenario && <div style={{ marginBottom: '0.5rem' }}>{ex.scenario}</div>}
                      {ex.question && <div style={{ fontWeight: 700, color: '#3b0764' }}>{ex.question}</div>}
                    </div>

                    {/* Options */}
                    {ex.options && (
                      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {ex.options.map((opt, i) => {
                          const isCorrectOpt = isAnswerCorrect(i, ex.correctAnswer) || isAnswerCorrect(opt, ex.correctAnswer);
                          return (
                            <div key={i} style={{
                              padding: '0.65rem 0.85rem',
                              borderRadius: '6px',
                              border: isCorrectOpt ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                              background: isCorrectOpt ? '#dcfce7' : '#ffffff',
                              fontSize: '0.88rem',
                              fontWeight: isCorrectOpt ? 700 : 500,
                              color: isCorrectOpt ? '#166534' : '#334155'
                            }}>
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step-by-Step Analysis */}
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                        🧠 Step-by-Step Critical Analysis:
                      </div>
                      <div style={{ color: '#1e3a8a', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {Array.isArray(ex.stepByStepReasoning) ? (
                          ex.stepByStepReasoning.map((step, si) => (
                            <div key={si} style={{ marginBottom: '0.35rem' }}>• {step}</div>
                          ))
                        ) : (
                          ex.stepByStepReasoning || ex.explanation || ex.analysis
                        )}
                      </div>
                    </div>

                    {/* Distractor Breakdown */}
                    {(ex.distractorAnalysis || ex.distractorBreakdown) && (
                      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                          ❌ Why Other Options Fail:
                        </div>
                        <div style={{ display: 'grid', gap: '0.35rem' }}>
                          {(ex.distractorAnalysis || ex.distractorBreakdown || []).map((d, di) => (
                            <div key={di} style={{ fontSize: '0.82rem', color: '#881337' }}>• {d}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 4
                </button>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 3 Timed Practice Sets →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: 3 TIMED PRACTICE SETS                             */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                PRACTICE LABS
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                3 Timed Progressive Practice Sets
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Sharpen your logical deduction speed under strict countdown constraints with instant explanations and retry functionality.
              </p>

              {/* SET A */}
              {practiceSetA && (
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3b0764', margin: 0 }}>
                        {practiceSetA.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetA.subtitle}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <Clock size={16} color="#7e22ce" />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerA < 60 ? '#dc2626' : '#6b21a8' }}>
                        {formatTimer(timerA)}
                      </span>
                      <button onClick={() => handlePracticeReset('set_a')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set A">
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {(practiceSetA?.questions || []).map((q, idx) => {
                      const sel = practiceAnswers.set_a?.[q.id];
                      const isSub = practiceSubmitted.set_a?.[q.id];
                      const isCorrect = isAnswerCorrect(sel, q.correctAnswer);

                      return (
                        <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                            Q{idx + 1}. {q.question}
                          </div>
                          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            {(q.options || []).map((opt, optIdx) => {
                              const optLetter = getLetter(opt) || ['A', 'B', 'C', 'D'][optIdx];
                              const isSelected = sel === optLetter;
                              const isCorrectOpt = isAnswerCorrect(optLetter, q.correctAnswer);

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handlePracticeSelect('set_a', q.id, optLetter)}
                                  disabled={isSub}
                                  style={{
                                    padding: '0.65rem 0.9rem',
                                    borderRadius: '6px',
                                    border: isSelected ? (isSub ? (isCorrectOpt ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                    background: isSelected ? (isSub ? (isCorrectOpt ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
                                    textAlign: 'left',
                                    color: '#1e293b',
                                    fontSize: '0.86rem',
                                    cursor: isSub ? 'default' : 'pointer'
                                  }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!isSub && sel !== undefined && (
                            <button
                              onClick={() => handlePracticeSubmit('set_a', q.id)}
                              style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                              Submit Answer
                            </button>
                          )}

                          {isSub && (
                            <div style={{ marginTop: '0.75rem', background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem' }}>
                              <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#9f1239', marginBottom: '0.25rem' }}>
                                {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct Answer: (${q.correctAnswer})`}
                              </div>
                              <div style={{ color: '#334155' }}>{q.explanation}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SET B */}
              {practiceSetB && (
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3b0764', margin: 0 }}>
                        {practiceSetB.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetB.subtitle}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <Clock size={16} color="#7e22ce" />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerB < 60 ? '#dc2626' : '#6b21a8' }}>
                        {formatTimer(timerB)}
                      </span>
                      <button onClick={() => handlePracticeReset('set_b')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set B">
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {(practiceSetB?.questions || []).map((q, idx) => {
                      const sel = practiceAnswers.set_b?.[q.id];
                      const isSub = practiceSubmitted.set_b?.[q.id];
                      const isCorrect = isAnswerCorrect(sel, q.correctAnswer);

                      return (
                        <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                            Q{idx + 1}. {q.question}
                          </div>
                          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            {(q.options || []).map((opt, optIdx) => {
                              const optLetter = getLetter(opt) || ['A', 'B', 'C', 'D'][optIdx];
                              const isSelected = sel === optLetter;
                              const isCorrectOpt = isAnswerCorrect(optLetter, q.correctAnswer);

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handlePracticeSelect('set_b', q.id, optLetter)}
                                  disabled={isSub}
                                  style={{
                                    padding: '0.65rem 0.9rem',
                                    borderRadius: '6px',
                                    border: isSelected ? (isSub ? (isCorrectOpt ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                    background: isSelected ? (isSub ? (isCorrectOpt ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
                                    textAlign: 'left',
                                    color: '#1e293b',
                                    fontSize: '0.86rem',
                                    cursor: isSub ? 'default' : 'pointer'
                                  }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!isSub && sel !== undefined && (
                            <button
                              onClick={() => handlePracticeSubmit('set_b', q.id)}
                              style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                              Submit Answer
                            </button>
                          )}

                          {isSub && (
                            <div style={{ marginTop: '0.75rem', background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem' }}>
                              <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#9f1239', marginBottom: '0.25rem' }}>
                                {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct Answer: (${q.correctAnswer})`}
                              </div>
                              <div style={{ color: '#334155' }}>{q.explanation}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SET C */}
              {practiceSetC && (
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3b0764', margin: 0 }}>
                        {practiceSetC.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{practiceSetC.subtitle}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <Clock size={16} color="#7e22ce" />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: timerC < 60 ? '#dc2626' : '#6b21a8' }}>
                        {formatTimer(timerC)}
                      </span>
                      <button onClick={() => handlePracticeReset('set_c')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Reset Set C">
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {(practiceSetC?.questions || []).map((q, idx) => {
                      const sel = practiceAnswers.set_c?.[q.id];
                      const isSub = practiceSubmitted.set_c?.[q.id];
                      const isCorrect = isAnswerCorrect(sel, q.correctAnswer);

                      return (
                        <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                            Q{idx + 1}. {q.question}
                          </div>
                          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            {(q.options || []).map((opt, optIdx) => {
                              const optLetter = getLetter(opt) || ['A', 'B', 'C', 'D'][optIdx];
                              const isSelected = sel === optLetter;
                              const isCorrectOpt = isAnswerCorrect(optLetter, q.correctAnswer);

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handlePracticeSelect('set_c', q.id, optLetter)}
                                  disabled={isSub}
                                  style={{
                                    padding: '0.65rem 0.9rem',
                                    borderRadius: '6px',
                                    border: isSelected ? (isSub ? (isCorrectOpt ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                    background: isSelected ? (isSub ? (isCorrectOpt ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
                                    textAlign: 'left',
                                    color: '#1e293b',
                                    fontSize: '0.86rem',
                                    cursor: isSub ? 'default' : 'pointer'
                                  }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!isSub && sel !== undefined && (
                            <button
                              onClick={() => handlePracticeSubmit('set_c', q.id)}
                              style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                              Submit Answer
                            </button>
                          )}

                          {isSub && (
                            <div style={{ marginTop: '0.75rem', background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem' }}>
                              <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#9f1239', marginBottom: '0.25rem' }}>
                                {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct Answer: (${q.correctAnswer})`}
                              </div>
                              <div style={{ color: '#334155' }}>{q.explanation}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Solved Examples
                </button>
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Real-World Case Study →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: REAL-WORLD CASE STUDY (PART 1)                    */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CRITICAL INQUIRY LAB
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {caseStudyData?.title}
              </h2>
              <p style={{ color: '#6b21a8', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {caseStudyData?.subtitle}
              </p>
              <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {caseStudyData?.context}
              </p>

              {/* Claim Breakdown Card */}
              {caseStudyData?.claimBreakdown && (
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3b0764', margin: '0 0 0.75rem 0' }}>
                    Deconstructing the Advertisement's Stated Structure:
                  </h3>
                  <div style={{ display: 'grid', gap: '0.6rem' }}>
                    {(caseStudyData?.claimBreakdown || []).map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                          {item.component}
                        </span>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 600 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5 Analytical Tasks */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Structured Critical Thinking Exercises
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {(caseStudyData?.tasks || []).map((t) => (
                  <div key={t.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {t.prompt}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.82rem' }}>💡 <strong>Guiding Hint:</strong> {t.hint}</div>
                  </div>
                ))}
              </div>

              {/* Student Response Area */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.5rem 0' }}>
                  ✍️ Your Deconstruction & Revision:
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  Write your critical response identifying the hidden assumptions, survivorship bias, and your sound revision:
                </p>
                <textarea
                  value={caseStudyNotes}
                  onChange={(e) => setCaseStudyNotes(e.target.value)}
                  placeholder="Example: The advertisement confuses graduates with enrollees (survivorship bias). Hidden assumptions include that all jobs are high-paying developer roles..."
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
                  style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  Submit Analysis & Reveal Expert Model Breakdown
                </button>
              </div>

              {/* Model Answer Reveal */}
              {isCaseSubmitted && caseStudyData?.modelAnswer && (
                <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '14px', padding: '1.75rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <CheckCircle size={22} color="#16a34a" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                      Official Expert Methodological Breakdown
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                    {caseStudyData.modelAnswer.factsVsAssumptions && (
                      <div>
                        <strong>1. Facts vs. Unverified Assumptions:</strong> {caseStudyData.modelAnswer.factsVsAssumptions}
                      </div>
                    )}
                    {caseStudyData.modelAnswer.enrollmentVsGraduationGap && (
                      <div>
                        <strong>2. Enrollment vs. Graduation Gap (Survivorship Bias):</strong> {caseStudyData.modelAnswer.enrollmentVsGraduationGap}
                      </div>
                    )}
                    {caseStudyData.modelAnswer.hiddenAssumptions && (
                      <div>
                        <strong>3. Unmasked Hidden Assumptions:</strong> {caseStudyData.modelAnswer.hiddenAssumptions}
                      </div>
                    )}
                    {caseStudyData.modelAnswer.negationTest && (
                      <div>
                        <strong>4. Negation Test Applied:</strong> {caseStudyData.modelAnswer.negationTest}
                      </div>
                    )}
                    {caseStudyData.modelAnswer.soundRevision && (
                      <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.75rem', color: '#065f46', fontWeight: 600 }}>
                        ⚖️ <strong>Logically Sound Revision:</strong> {caseStudyData.modelAnswer.soundRevision}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Practice Sets
                </button>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Common Traps & Strategies →
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
                EXAMINATION & DECISION TRAPS
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {(commonMistakes || []).length} Critical Thinking Pitfalls & Countermeasures
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Review these common cognitive traps that mislead placement candidates and competitive examination learners:
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                {(commonMistakes || []).map((m, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      Pitfall {i + 1}: {m.mistake}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {m.whyItHappens || m.explanation}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
                      💡 <strong>Disciplined Strategy:</strong> {m.correction || m.strategy}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical Checklist */}
              {practicalChecklist && (
                <div style={{ background: '#faf5ff', border: '2px solid #c084fc', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.75rem 0' }}>
                    🛡️ Practical Deduction Checklist
                  </h3>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {(practicalChecklist || []).map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.88rem', color: '#3b0764', fontWeight: 600 }}>
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('casestudy')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Case Study
                </button>
                <button onClick={() => handleTabChange('assessment')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Final Assessment (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: TIMED FINAL ASSESSMENT (20 QUESTIONS)            */}
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
                  <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                    LEVEL 3 DAY 12 FINAL ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Timed Final Assessment (20 Questions: Easy, Medium & Hard)
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: assessmentTimer < 180 ? '#fee2e2' : '#f8fafc', padding: '0.5rem 1rem', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}>
                  <Clock size={18} style={{ color: assessmentTimer < 180 ? '#dc2626' : '#7e22ce' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: assessmentTimer < 180 ? '#dc2626' : '#581c87' }}>
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
                            border: isSelected ? `2px solid ${filter.color || '#7e22ce'}` : '1px solid #cbd5e1',
                            background: isSelected ? (filter.bg || '#faf5ff') : '#ffffff',
                            color: isSelected ? (filter.color || '#581c87') : '#475569',
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
                    {(finalAssessmentQuestions || []).map((q, idx) => {
                      if (pillDifficultyFilter !== 'all' && q.difficulty !== pillDifficultyFilter) {
                        return null;
                      }

                      const isAns = assessmentAnswers[q.id] !== undefined;
                      const isSub = assessmentSubmitted[q.id];
                      const isCurr = assessmentIndex === idx;

                      let bg = '#ffffff';
                      let color = '#475569';
                      let borderColor = '#cbd5e1';

                      if (isSub) {
                        const correct = isAnswerCorrect(assessmentAnswers[q.id], q.correctAnswer);
                        bg = correct ? '#dcfce7' : '#fee2e2';
                        color = correct ? '#166534' : '#991b1b';
                        borderColor = correct ? '#86efac' : '#fecaca';
                      } else if (isAns) {
                        bg = '#eff6ff';
                        color = '#1e40af';
                        borderColor = '#93c5fd';
                      }

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
                            border: isCurr ? '2px solid #581c87' : `1.5px solid ${borderColor}`,
                            borderBottom: !isCurr ? `3px solid ${diffColor}` : '2px solid #581c87',
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
                    const currentQ = (finalAssessmentQuestions || [])[assessmentIndex];
                    if (!currentQ) return null;
                    const selectedOpt = assessmentAnswers[currentQ.id];
                    const isSub = Boolean(assessmentSubmitted[currentQ.id]);
                    const isCorrect = isAnswerCorrect(selectedOpt, currentQ.correctAnswer);

                    return (
                      <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#581c87', background: '#f3e8ff', padding: '2px 8px', borderRadius: '4px' }}>
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
                            Question {assessmentIndex + 1} of {(finalAssessmentQuestions || []).length}
                          </span>
                        </div>

                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                          {currentQ.question}
                        </div>

                        <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {(currentQ.options || []).map((opt, optIdx) => {
                            const optLetter = getLetter(opt) || ['A', 'B', 'C', 'D'][optIdx];
                            const isSelected = selectedOpt === optLetter;
                            const isCorrectOpt = isAnswerCorrect(optLetter, currentQ.correctAnswer);

                            let bg = '#ffffff';
                            let border = '#cbd5e1';

                            if (isSub) {
                              if (isCorrectOpt) { bg = '#dcfce7'; border = '#16a34a'; }
                              else if (isSelected) { bg = '#fee2e2'; border = '#dc2626'; }
                            } else if (isSelected) {
                              bg = '#faf5ff';
                              border = '#7e22ce';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleAssessmentSelect(currentQ.id, optLetter)}
                                disabled={isSub}
                                style={{
                                  padding: '0.85rem 1rem',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${border}`,
                                  background: bg,
                                  textAlign: 'left',
                                  fontSize: '0.9rem',
                                  color: '#1e293b',
                                  fontWeight: isSelected ? 700 : 500,
                                  cursor: isSub ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  transition: 'all 0.15s'
                                }}
                              >
                                <span style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: isSelected ? '#6b21a8' : '#f1f5f9',
                                  color: isSelected ? '#ffffff' : '#475569',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                  flexShrink: 0
                                }}>
                                  {optLetter}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Submit / Explanation */}
                        {!isSub && selectedOpt !== undefined && (
                          <button
                            onClick={() => handleAssessmentSubmitQuestion(currentQ.id)}
                            style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                          >
                            Submit This Answer
                          </button>
                        )}

                        {isSub && (
                          <div style={{ marginTop: '1rem', background: isCorrect ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isCorrect ? '#86efac' : '#fecdd3'}`, borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#9f1239', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                              {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct Option is (${currentQ.correctAnswer})`}
                            </div>
                            <div style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                              {currentQ.explanation}
                            </div>
                            {currentQ.distractorNotes && (
                              <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
                                💡 {currentQ.distractorNotes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Navigation Prev / Next */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setAssessmentIndex(prev => Math.max(0, prev - 1))}
                        disabled={assessmentIndex === 0}
                        style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: assessmentIndex === 0 ? 'default' : 'pointer' }}
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={() => setAssessmentIndex(prev => Math.min((finalAssessmentQuestions || []).length - 1, prev + 1))}
                        disabled={assessmentIndex === (finalAssessmentQuestions || []).length - 1}
                        style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: assessmentIndex === (finalAssessmentQuestions || []).length - 1 ? 'default' : 'pointer' }}
                      >
                        Next →
                      </button>
                    </div>

                    <button
                      onClick={handleFinishAssessment}
                      style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                    >
                      Finish Assessment Now
                    </button>
                  </div>
                </div>
              ) : (
                /* Assessment Completed Summary */
                <div>
                  <div style={{
                    background: savedProgress.assessmentPassed ? 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' : '#fff1f2',
                    border: `2px solid ${savedProgress.assessmentPassed ? '#86efac' : '#fecdd3'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <Award size={52} color={savedProgress.assessmentPassed ? '#16a34a' : '#dc2626'} style={{ margin: '0 auto 0.75rem auto' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#166534' : '#991b1b', margin: '0 0 0.5rem 0' }}>
                      {savedProgress.assessmentPassed ? '🎉 Assessment Passed!' : 'Needs Review & Practice'}
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
                      You scored <strong>{savedProgress.assessmentScore}</strong> out of <strong>{(finalAssessmentQuestions || []).length}</strong> ({savedProgress.assessmentPercentage}%)
                    </p>

                    <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        onClick={() => setIsReviewOpen(!isReviewOpen)}
                        style={{ background: '#581c87', color: '#ffffff', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {isReviewOpen ? 'Hide Answer Review' : 'Review All 20 Answers'}
                      </button>
                      <button
                        onClick={handleResetAssessment}
                        style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Retake Assessment
                      </button>
                    </div>
                  </div>

                  {/* Domain Performance Breakdown */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                    Domain Competency Breakdown
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                    {Object.entries(getDomainBreakdown()).map(([dom, data]) => {
                      const pct = Math.round((data.correct / (data.total || 1)) * 100);
                      return (
                        <div key={dom} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.25rem' }}>
                            {dom}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: pct >= 60 ? '#16a34a' : '#dc2626' }}>
                              {data.correct} / {data.total}
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>
                              {pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Review Section */}
                  {isReviewOpen && (
                    <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          Detailed Question Review
                        </h4>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          {['all', 'incorrect', 'correct'].map(rf => (
                            <button
                              key={rf}
                              onClick={() => setReviewFilter(rf)}
                              style={{
                                padding: '0.3rem 0.75rem',
                                borderRadius: '6px',
                                border: reviewFilter === rf ? '1.5px solid #6b21a8' : '1px solid #cbd5e1',
                                background: reviewFilter === rf ? '#f3e8ff' : '#ffffff',
                                color: reviewFilter === rf ? '#581c87' : '#475569',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                textTransform: 'capitalize',
                                cursor: 'pointer'
                              }}
                            >
                              {rf}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gap: '1rem' }}>
                        {(finalAssessmentQuestions || []).map((q, idx) => {
                          const userAns = assessmentAnswers[q.id];
                          const isCorrect = isAnswerCorrect(userAns, q.correctAnswer);

                          if (reviewFilter === 'incorrect' && isCorrect) return null;
                          if (reviewFilter === 'correct' && !isCorrect) return null;

                          return (
                            <div key={q.id} style={{ background: '#ffffff', border: `1px solid ${isCorrect ? '#86efac' : '#fecaca'}`, borderRadius: '10px', padding: '1rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                                <span style={{ fontWeight: 800, color: '#6b21a8' }}>Q{idx + 1} • {q.domain}</span>
                                <span style={{ fontWeight: 800, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                                  {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                </span>
                              </div>
                              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                                {q.question}
                              </div>
                              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.4rem' }}>
                                Your Answer: <strong>{userAns ? `(${userAns})` : 'Skipped'}</strong> | Correct Answer: <strong style={{ color: '#16a34a' }}>({q.correctAnswer})</strong>
                              </div>
                              <div style={{ background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#334155' }}>
                                {q.explanation}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Mistakes & Traps
                </button>
                <button onClick={() => handleTabChange('summary')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Revision & Checklist →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 11: REVISION SUMMARY CHEAT SHEET                     */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXECUTIVE SUMMARY
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {revisionCheatSheet?.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                Review key critical thinking principles and commit this 6-question stress-testing checklist to memory for interviews, technical audits, and aptitude exams.
              </p>

              {/* Core Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {(revisionCheatSheet?.corePrinciples || revisionCheatSheet?.summaryPoints || []).map((pt, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {pt.title}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {pt.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* 6-Question Critical Thinking Checklist */}
              {revisionCheatSheet?.criticalThinkingChecklist && (
                <div style={{ background: '#faf5ff', border: '2px solid #c084fc', borderRadius: '14px', padding: '1.75rem', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                    🛡️ The 6-Question Critical-Thinking Master Checklist
                  </h3>
                  <div style={{ display: 'grid', gap: '0.65rem' }}>
                    {(revisionCheatSheet?.criticalThinkingChecklist || []).map((ch, idx) => (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #d8b4fe', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 600, color: '#3b0764' }}>
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Congratulatory Card & Link to Day 13 */}
              <div style={{
                background: 'linear-gradient(135deg, #3b0764 0%, #4c1d95 60%, #1e3a8a 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px -4px rgba(76, 29, 149, 0.3)'
              }}>
                <Award size={48} color="#e9d5ff" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Congratulations on Completing Level 3, Day 12!
                </h3>
                <p style={{ color: '#e9d5ff', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You have mastered facts vs opinions, unmasked hidden assumptions, evaluated deductive validity, and drawn airtight multi-premise conclusions. Next, advance to Day 13 to explore necessary vs sufficient conditions, contradictions, 8 classic logical fallacies, and empirical evidence evaluation.
                </p>
                <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate('spoko_reasoning_l3_d13', 'overview');
                      }
                    }}
                    style={{
                      background: '#ffffff',
                      color: '#4c1d95',
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
                    Proceed to Day 13: Conditions, Fallacies & Evidence →
                  </button>
                  <button
                    onClick={() => handleTabChange('assessment')}
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
                    Review Assessment Results
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
