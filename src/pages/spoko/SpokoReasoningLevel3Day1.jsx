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
  day1Overview,
  lessonIntro,
  coreConcepts,
  interactiveClassificationItems,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  caseStudyData,
  commonMistakes,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel3Day1.js';

export default function SpokoReasoningLevel3Day1({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d1_progress_${userKey}`;

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

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Level 3 Day 1 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d1:day1';
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
      onNavigate('spoko_reasoning_l3_d1', tabId);
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

  // Case Study State
  const [caseStudyNotes, setCaseStudyNotes] = useState('');
  const [isCaseSubmitted, setIsCaseSubmitted] = useState(false);

  // Worked Examples Selector
  const [selectedExample, setSelectedExample] = useState(workedExamples[0].id);

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
    const domains = {
      "Assumptions & Conclusions": { correct: 0, total: 0 },
      "Argument Evaluation": { correct: 0, total: 0 },
      "Logical Deduction & Conditional Reasoning": { correct: 0, total: 0 },
      "Contradictions & Fallacies": { correct: 0, total: 0 },
      "Evidence Evaluation & Alternative Explanations": { correct: 0, total: 0 }
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
            AlphaFly Logical Reasoning • Level 3 – Advanced • Day 1
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Advanced Critical Thinking & Logical Deduction
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e9d5ff',
            maxWidth: '820px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Master argument evaluation, hidden assumptions, deductive validity, necessary vs. sufficient conditions, formal contradictions, and 8 classic logical fallacies.
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
              <Layers size={15} color="#d8b4fe" /> 8 Core Concepts
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#d8b4fe" /> 10 Master Solved Examples
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
                    Welcome to Level 3: Advanced Critical Thinking
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Deductive Rigor, Evidence Evaluation, and Cognitive Bias Defense
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {day1Overview.description}
              </p>

              {/* 9 Learning Objectives */}
              <div style={{
                background: '#faf5ff',
                borderRadius: '12px',
                border: '1px solid #e9d5ff',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🎯 9 Advanced Learning Objectives:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                  {day1Overview.learningObjectives.map((obj, i) => (
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
                {lessonIntro.foundationalShift.map((item, idx) => (
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

              {/* Starter Scenario: Extra Practice Sessions Dilemma */}
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
                    {lessonIntro.starterScenario.title}
                  </h3>
                </div>
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {lessonIntro.starterScenario.context}
                </p>

                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <strong style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <AlertTriangle size={16} /> The Unwarranted Causal Leap:
                  </strong>
                  <span style={{ color: '#7f1d1d', fontSize: '0.9rem' }}>
                    {lessonIntro.starterScenario.initialClaim}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#3b0764', marginBottom: '0.75rem' }}>
                  4 Critical Diagnostic Reflections:
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {lessonIntro.starterScenario.reflectiveQuestions.map((item, idx) => (
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

              {/* 5 Core Pillars */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Foundational Dimensions of Critical Reasoning
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {lessonIntro.starterScenario.coreElements.map((el, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {el.term}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.45 }}>
                      {el.desc}
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
                {coreConcepts.concept1.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept1.subtitle}
              </p>

              {/* 4 Definitions Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept1.definitions.map((def, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                      {def.term}
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {def.meaning}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#475569', marginBottom: '0.5rem' }}>
                      🔍 <strong>Diagnostic Test:</strong> {def.test}
                    </div>
                    <div style={{ background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#581c87', fontStyle: 'italic' }}>
                      <strong>Example:</strong> {def.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* 8 Examples Across Domains Table */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                8 Real-World Multi-Domain Classifications
              </h3>
              <div style={{ overflowX: 'auto', marginBottom: '2.5rem', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Domain</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Statement</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 800 }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coreConcepts.concept1.eightRealExamples.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#475569' }}>{row.domain}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#0f172a' }}>"{row.text}"</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                          <span style={{
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: row.category === 'Fact' ? '#dcfce7' : row.category === 'Opinion' ? '#fef3c7' : row.category === 'Assumption' ? '#fee2e2' : '#dbeafe',
                            color: row.category === 'Fact' ? '#166534' : row.category === 'Opinion' ? '#92400e' : row.category === 'Assumption' ? '#991b1b' : '#1e40af'
                          }}>
                            {row.category}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.82rem' }}>{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interactive Classification Exercise Widget */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.5rem 0' }}>
                  Interactive Exercise: Test Your Classification Skills
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Assign each statement to the correct logical category: Fact, Opinion, Assumption, or Conclusion:
                </p>

                <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  {interactiveClassificationItems.map((item, idx) => {
                    const sel = classifierUserAnswers[item.id];
                    const isCorrect = sel === item.category;

                    return (
                      <div key={item.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                          {idx + 1}. "{item.text}"
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {['Fact', 'Opinion', 'Assumption', 'Conclusion'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => handleClassifierSelect(item.id, cat)}
                              disabled={classifierSubmitted}
                              style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '6px',
                                border: sel === cat ? '2px solid #7e22ce' : '1px solid #cbd5e1',
                                background: sel === cat ? '#ede9fe' : '#ffffff',
                                color: sel === cat ? '#581c87' : '#475569',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                cursor: classifierSubmitted ? 'default' : 'pointer'
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        {classifierSubmitted && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: isCorrect ? '#166534' : '#991b1b', fontWeight: 600 }}>
                            {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct: ${item.category})`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!classifierSubmitted ? (
                  <button
                    onClick={() => setClassifierSubmitted(true)}
                    style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    Check All Classifications
                  </button>
                ) : (
                  <button
                    onClick={() => { setClassifierSubmitted(false); setClassifierUserAnswers({}); }}
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <RotateCcw size={14} /> Retry Exercise
                  </button>
                )}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('overview')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Overview
                </button>
                <button onClick={() => handleTabChange('section2')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Identifying Hidden Assumptions →
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
                {coreConcepts.concept2.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept2.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept2.theory}
              </div>

              {/* Negation Test Card */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e40af', margin: '0 0 0.4rem 0' }}>
                  🔍 The Gold-Standard Negation Test for Assumptions
                </h3>
                <p style={{ color: '#1e3a8a', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  {coreConcepts.concept2.negationTest}
                </p>
              </div>

              {/* Anchor Scenario Breakdown */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.75rem 0' }}>
                  Scenario Breakdown: The Weekend Classes Proposal
                </h3>
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
                  <div style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Original Argument:</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>"{coreConcepts.concept2.anchorScenario.statement}"</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '0.85rem', fontSize: '0.88rem', color: '#1e40af' }}>
                    <strong>Explicit Premise:</strong> {coreConcepts.concept2.anchorScenario.premise}
                  </div>
                  <div style={{ background: '#ecfdf5', borderRadius: '8px', padding: '0.85rem', fontSize: '0.88rem', color: '#065f46' }}>
                    <strong>Explicit Conclusion:</strong> {coreConcepts.concept2.anchorScenario.conclusion}
                  </div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.5rem 0' }}>
                  Unstated Hidden Assumptions Required:
                </h4>
                <div style={{ display: 'grid', gap: '0.4rem', marginBottom: '1rem' }}>
                  {coreConcepts.concept2.anchorScenario.hiddenAssumptions.map((ass, i) => (
                    <div key={i} style={{ background: '#ffffff', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', color: '#334155' }}>
                      🔑 {ass}
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.75rem', fontSize: '0.85rem', color: '#991b1b' }}>
                  ⚠️ <strong>Why It Collapses:</strong> {coreConcepts.concept2.anchorScenario.breakdown}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Worked Assumption Exercises
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept2.fiveWorkedExamples.map((ex, idx) => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                      Case {idx + 1}: "{ex.statement}"
                    </div>
                    <div style={{ background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '0.6rem 0.8rem', fontSize: '0.85rem', color: '#581c87', marginBottom: '0.4rem' }}>
                      🔑 <strong>Hidden Assumption:</strong> {ex.hiddenAssumption}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.6rem 0.8rem', fontSize: '0.82rem', color: '#475569' }}>
                      🔬 <strong>Negation Test Result:</strong> {ex.negationImpact}
                    </div>
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
                {coreConcepts.concept3.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept3.subtitle}
              </p>

              {/* Anatomy of an Argument */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.anatomy.map((a, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '1rem', marginBottom: '0.35rem' }}>
                      {a.component}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {a.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Evaluation Criteria */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 4-Pillar Argument Evaluation Framework
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.strengthCriteria.map((c, i) => (
                  <div key={i} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '8px', padding: '0.9rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: '#581c87', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {c.criterion}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.82rem' }}>{c.question}</div>
                  </div>
                ))}
              </div>

              {/* Argument Comparisons */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Comparative Argument Evaluations
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.argumentComparisons.map((item, idx) => (
                  <div key={idx} style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Case {idx + 1}: {item.type}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: item.type.includes('Strong') ? '#dcfce7' : '#fee2e2',
                        color: item.type.includes('Strong') ? '#166534' : '#991b1b'
                      }}>
                        {item.type.includes('Strong') ? 'STRONG & VALID' : 'WEAK / INVALID'}
                      </span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.86rem', color: '#334155', whiteSpace: 'pre-line', marginBottom: '0.5rem' }}>
                      <strong>Premises:</strong>\n{item.premises}
                    </div>
                    <div style={{ background: '#ede9fe', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.86rem', color: '#581c87', marginBottom: '0.5rem' }}>
                      <strong>Conclusion:</strong> {item.conclusion}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                      🔬 <strong>Analysis:</strong> {item.evaluation}
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
                  Next: Logical Deductions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONCEPT 4 - LOGICAL DEDUCTIONS FROM MULTIPLE STATEMENTS */}
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
                {coreConcepts.concept4.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept4.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept4.theory}
              </div>

              {/* Quantifiers Guide */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Mastering Formal Logical Quantifiers
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4.quantifiersGuide.map((q, i) => (
                  <div key={i} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#581c87', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {q.term}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.45 }}>
                      {q.meaning}
                    </div>
                  </div>
                ))}
              </div>

              {/* Multi-Statement Deductions */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                3 Multi-Statement Syntheses Across Domains
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept4.multiStatementDeductions.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      Domain {idx + 1}: {item.domain}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem', fontSize: '0.86rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                      {item.statements.map((s, si) => <div key={si} style={{ marginBottom: '2px' }}>• {s}</div>)}
                    </div>
                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#166534', marginBottom: '0.4rem' }}>
                      ✓ <strong>Valid Inescapable Deduction:</strong> {item.validDeduction}
                    </div>
                    <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#991b1b' }}>
                      ❌ <strong>Common False Trap:</strong> {item.invalidTrap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section3')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 3
                </button>
                <button onClick={() => handleTabChange('section5')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Necessary vs. Sufficient →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: CONCEPT 5 - NECESSARY VS SUFFICIENT CONDITIONS    */}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                CORE CONCEPT 5
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept5.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept5.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept5.theory}
              </div>

              {/* Comparison Table */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept5.comparisonTable.map((col, idx) => (
                  <div key={idx} style={{
                    background: idx === 0 ? '#ecfdf5' : '#eff6ff',
                    border: `1.5px solid ${idx === 0 ? '#86efac' : '#93c5fd'}`,
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontWeight: 800, color: idx === 0 ? '#15803d' : '#1e40af', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                      {col.type}
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {col.meaning}
                    </div>
                    <div style={{ background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                      Formula: {col.formula}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic' }}>
                      <strong>Example:</strong> {col.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Conditional Phrases */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Translating Common English Conditional Expressions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept5.fourConditionalPhrases.map((cp, idx) => (
                  <div key={idx} style={{ background: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: '8px', padding: '0.9rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: '#581c87', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      "{cp.phrase}"
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.84rem' }}>{cp.translation}</div>
                  </div>
                ))}
              </div>

              {/* Fallacy Warnings */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Beware the Two Deadly Conditional Fallacies
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept5.fallacyWarnings.map((fw, idx) => (
                  <div key={idx} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      ⚠️ {fw.name}
                    </div>
                    <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.82rem', color: '#334155', marginBottom: '0.4rem' }}>
                      {fw.flawedRule}
                    </div>
                    <div style={{ color: '#7f1d1d', fontSize: '0.82rem', lineHeight: 1.45 }}>
                      <strong>Why It Fails:</strong> {fw.whyFlawed}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section4')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 4
                </button>
                <button onClick={() => handleTabChange('section6')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Contradictions & Conflict →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: CONCEPT 6 - CONTRADICTIONS AND INCONSISTENCIES    */}
        {/* ======================================================== */}
        {currentTab === 'section6' && (
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
                CORE CONCEPT 6
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept6.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept6.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept6.theory}
              </div>

              {/* 3 Inconsistency Scenarios */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {coreConcepts.concept6.inconsistencyScenarios.map((sc, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#3b0764', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      Scenario {idx + 1}: {sc.domain}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem', fontSize: '0.86rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                      {sc.statements.map((s, si) => <div key={si} style={{ marginBottom: '2px' }}>• {s}</div>)}
                    </div>
                    <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.84rem', color: '#991b1b', marginBottom: '0.4rem' }}>
                      ⚡ <strong>Direct Inconsistency:</strong> {sc.conflict}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.84rem', color: '#166534' }}>
                      💡 <strong>Resolution Protocol:</strong> {sc.resolutionNeeded}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section5')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 5
                </button>
                <button onClick={() => handleTabChange('section7')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 8 Logical Fallacies →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CONCEPT 7 - LOGICAL FALLACIES CATALOGUE           */}
        {/* ======================================================== */}
        {currentTab === 'section7' && (
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
                CORE CONCEPT 7
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept7.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept7.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept7.theory}
              </div>

              {/* 8 Fallacies Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept7.fallacies.map((f, i) => (
                  <div key={i} style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#7e22ce', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                      {f.name}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.45, marginBottom: '0.75rem' }}>
                      {f.definition}
                    </div>
                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#9f1239', marginBottom: '0.5rem' }}>
                      ❌ <strong>Flawed Example:</strong> {f.example}
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#334155', marginBottom: '0.4rem' }}>
                      🔍 <strong>Why Reasoning Fails:</strong> {f.weakness}
                    </div>
                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#065f46' }}>
                      💡 <strong>Better Critical Response:</strong> {f.betterWay}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section6')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 6
                </button>
                <button onClick={() => handleTabChange('section8')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: Evidence & Counterarguments →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: CONCEPT 8 - EVIDENCE & COUNTERARGUMENTS          */}
        {/* ======================================================== */}
        {currentTab === 'section8' && (
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
                CORE CONCEPT 8
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                {coreConcepts.concept8.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts.concept8.subtitle}
              </p>

              <div style={{ background: '#f8fafc', borderLeft: '4px solid #7e22ce', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
                {coreConcepts.concept8.theory}
              </div>

              {/* 4-Step Stress Testing */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                4-Step Protocol for Stress-Testing Arguments
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept8.stressTestingWorkflow.map((st, i) => (
                  <div key={i} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {st.step}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.45 }}>
                      {st.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pivoting Case Study: The Leaping Bounce Rate */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e40af', margin: '0 0 0.5rem 0' }}>
                  🎯 {coreConcepts.concept8.pivotingCaseStudy.headline}
                </h3>
                <p style={{ color: '#334155', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  <strong>Observation:</strong> {coreConcepts.concept8.pivotingCaseStudy.initialObservation}
                </p>
                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', color: '#991b1b', marginBottom: '1rem' }}>
                  ⚠️ <strong>Hasty Unverified Conclusion:</strong> {coreConcepts.concept8.pivotingCaseStudy.hastyConclusion}
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', margin: '0 0 0.4rem 0' }}>
                  Critical Thinking Alternative Hypotheses Tested:
                </h4>
                <div style={{ display: 'grid', gap: '0.35rem', marginBottom: '1rem' }}>
                  {coreConcepts.concept8.pivotingCaseStudy.criticalThinkingInvestigation.map((h, i) => (
                    <div key={i} style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.84rem', color: '#1e293b', border: '1px solid #bfdbfe' }}>
                      • {h}
                    </div>
                  ))}
                </div>

                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', padding: '0.75rem', fontSize: '0.86rem', color: '#065f46', marginBottom: '0.5rem' }}>
                  ✓ <strong>The Revealed Truth:</strong> {coreConcepts.concept8.pivotingCaseStudy.theRevealedTruth}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#1e40af', fontStyle: 'italic' }}>
                  💡 {coreConcepts.concept8.pivotingCaseStudy.takeaway}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section7')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 7
                </button>
                <button onClick={() => handleTabChange('examples')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                  Next: 10 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: 10 SOLVED MASTER EXAMPLES                        */}
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
                10 Master Solved Reasoning & Critical Thinking Examples
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Study 10 comprehensive multi-premise reasoning scenarios progressing from moderate to advanced difficulty. Each example details the exact step-by-step logic and dismantles tempting wrong options:
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

              {/* Active Example Card */}
              {(() => {
                const ex = workedExamples.find(e => e.id === selectedExample) || workedExamples[0];
                return (
                  <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.75rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, background: '#ede9fe', color: '#6b21a8', padding: '3px 8px', borderRadius: '4px' }}>
                        {ex.type}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                        Step-by-Step Formal Analysis
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      {ex.title}
                    </h3>

                    <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', whiteSpace: 'pre-line', fontSize: '0.9rem', color: '#1e293b', marginBottom: '1rem' }}>
                      <strong>Scenario / Premises:</strong>\n{ex.scenario}
                    </div>

                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      {ex.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          style={{
                            padding: '0.65rem 0.9rem',
                            borderRadius: '6px',
                            border: optIdx === ex.correctAnswer ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                            background: optIdx === ex.correctAnswer ? '#dcfce7' : '#ffffff',
                            color: optIdx === ex.correctAnswer ? '#15803d' : '#475569',
                            fontWeight: optIdx === ex.correctAnswer ? 700 : 500,
                            fontSize: '0.88rem'
                          }}
                        >
                          {opt} {optIdx === ex.correctAnswer && '✓ (CORRECT ANSWER)'}
                        </div>
                      ))}
                    </div>

                    <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
                      <strong style={{ color: '#065f46', display: 'block', marginBottom: '0.25rem' }}>✓ Why this answer is inescapable:</strong>
                      <div style={{ color: '#166534', fontSize: '0.88rem', lineHeight: 1.5 }}>{ex.reasoning}</div>
                    </div>

                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                      <strong style={{ color: '#9f1239', display: 'block', marginBottom: '0.2rem' }}>⚠️ Why alternative options fail:</strong>
                      <div style={{ color: '#881337', fontSize: '0.85rem', lineHeight: 1.45 }}>{ex.distractorAnalysis}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button onClick={() => handleTabChange('section8')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Concept 8
                </button>
                <button onClick={() => handleTabChange('practice')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
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
                  {practiceSetA.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_a?.[q.id];
                    const isSub = practiceSubmitted.set_a?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
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
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
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
                            style={{ background: sel !== undefined ? '#6b21a8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
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

              {/* SET B */}
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
                  {practiceSetB.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_b?.[q.id];
                    const isSub = practiceSubmitted.set_b?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
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
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
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
                            style={{ background: sel !== undefined ? '#6b21a8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
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

              {/* SET C */}
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
                  {practiceSetC.questions.map((q, idx) => {
                    const sel = practiceAnswers.set_c?.[q.id];
                    const isSub = practiceSubmitted.set_c?.[q.id];
                    const isCorrect = sel === q.correctAnswer;

                    return (
                      <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
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
                                border: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '1.5px solid #16a34a' : '1.5px solid #dc2626') : '1.5px solid #7e22ce') : '1px solid #cbd5e1',
                                background: sel === optIdx ? (isSub ? (optIdx === q.correctAnswer ? '#dcfce7' : '#fee2e2') : '#faf5ff') : '#ffffff',
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
                            style={{ background: sel !== undefined ? '#6b21a8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: sel !== undefined ? 'pointer' : 'not-allowed' }}
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EMPIRICAL REASONING LAB
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
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Student Group</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 800 }}>Student Count</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800 }}>Average Exam Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudyData.dataSummary.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i === 0 ? '#faf5ff' : '#ffffff' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{row.group}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#475569' }}>{row.count}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.05rem', color: i === 0 ? '#6b21a8' : '#1e293b' }}>
                          {row.avgScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 8 Reflection Steps */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                8 Structured Inquiries for Empirical Rigor
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem', marginBottom: '2rem' }}>
                {caseStudyData.tasks.map((t) => (
                  <div key={t.step} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.85rem' }}>
                      Task {t.step}: {t.label}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px' }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              {/* Student Response Area */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.5rem 0' }}>
                  ✍️ Your Critical Evaluation:
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  Explain why the +8% score gap does not automatically prove Saturday sessions caused the improvement, identify two alternative factors, and state a balanced conclusion:
                </p>
                <textarea
                  value={caseStudyNotes}
                  onChange={(e) => setCaseStudyNotes(e.target.value)}
                  placeholder="Example: The data indicates correlation, not causation. Voluntary attendance introduces self-selection bias: highly motivated students chose to attend..."
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
              {isCaseSubmitted && (
                <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '14px', padding: '1.75rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <CheckCircle size={22} color="#16a34a" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                      Official Expert Methodological Breakdown
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                    <div>
                      <strong>1. Verified Facts:</strong> {caseStudyData.modelAnswer.verifiedFacts}
                    </div>
                    <div>
                      <strong>2. Supported Association:</strong> {caseStudyData.modelAnswer.supportedConclusion}
                    </div>
                    <div>
                      <strong>3. Required Hidden Assumptions:</strong> {caseStudyData.modelAnswer.hiddenAssumptionsOfCausalClaim}
                    </div>
                    <div>
                      <strong>4. Rival Confounding Hypotheses:</strong> {caseStudyData.modelAnswer.alternativeExplanations}
                    </div>
                    <div>
                      <strong>5. Gold-Standard Controlled Trial Design:</strong> {caseStudyData.modelAnswer.controlledTrialDesign}
                    </div>
                    <div>
                      <strong>6. Critique of 'Every Student' Claim:</strong> {caseStudyData.modelAnswer.critiqueOfUniversalClaim}
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.75rem', color: '#065f46', fontWeight: 600 }}>
                      ⚖️ <strong>Balanced Executive Conclusion:</strong> {caseStudyData.modelAnswer.balancedExecutiveConclusion}
                    </div>
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
        {/* TAB 13: COMMON MISTAKES & STRATEGIES                     */}
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
                9 Critical Thinking Mistakes & Countermeasures
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Review these common cognitive pitfalls that trap placement candidates and competitive examination learners:
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {commonMistakes.map((m, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {m.mistake}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {m.explanation}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
                      💡 <strong>Disciplined Strategy:</strong> {m.strategy}
                    </div>
                  </div>
                ))}
              </div>

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
                  <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                    LEVEL 3 DAY 1 FINAL ASSESSMENT
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
                      if (isCurr) { bg = '#6b21a8'; color = '#ffffff'; borderColor = '#581c87'; }

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
                    const currentQ = finalAssessmentQuestions[assessmentIndex];
                    const selectedOpt = assessmentAnswers[currentQ.id];
                    const isSub = Boolean(assessmentSubmitted[currentQ.id]);
                    const isCorrect = selectedOpt === currentQ.correctAnswer;

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
                              bg = '#faf5ff'; border = '#7e22ce';
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
                              style={{ background: selectedOpt !== undefined ? '#6b21a8' : '#cbd5e1', color: '#ffffff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem', cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed' }}
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
                /* Assessment Score Card */
                <div>
                  <div style={{
                    background: savedProgress.assessmentPassed ? 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: `2px solid ${savedProgress.assessmentPassed ? '#7e22ce' : '#f59e0b'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#581c87' : '#92400e', marginBottom: '0.25rem' }}>
                      {savedProgress.assessmentScore} / {finalAssessmentQuestions.length} ({savedProgress.assessmentPercentage}%)
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: savedProgress.assessmentPassed ? '#6b21a8' : '#b45309', marginBottom: '0.5rem' }}>
                      {savedProgress.assessmentPercentage >= 90
                        ? "🌟 Excellent (90–100%) – Exceptional Advanced Critical Thinking Mastery!"
                        : savedProgress.assessmentPercentage >= 75
                        ? "🎯 Good (75–89%) – Minor refinement required."
                        : savedProgress.assessmentPercentage >= 60
                        ? "📈 Developing (60–74%) – Review argument analysis and deductions."
                        : "⚠️ Needs Improvement (<60%) – Revisit core concepts and retry."}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                      Time Taken: {formatTimer(1500 - assessmentTimer)} out of 25:00 minutes. Accuracy threshold for Day 1 completion is 60% (12/20).
                    </div>

                    {/* Domain Breakdown */}
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
                        style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
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
                        <button onClick={() => setReviewFilter('all')} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', background: reviewFilter === 'all' ? '#6b21a8' : '#f1f5f9', color: reviewFilter === 'all' ? '#fff' : '#334155', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>All (20)</button>
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
                      }).map((q) => {
                        const userAns = assessmentAnswers[q.id];
                        const isCorrect = userAns === q.correctAnswer;
                        return (
                          <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#581c87', background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>
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

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                <button onClick={() => handleTabChange('mistakes')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  ← Mistakes & Traps
                </button>
                <button onClick={() => handleTabChange('summary')} style={{ background: '#6b21a8', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Next: Revision & Checklist →
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
              <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                EXECUTIVE SUMMARY
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {revisionCheatSheet.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                Review key critical thinking principles and commit this 6-question stress-testing checklist to memory for interviews, technical audits, and aptitude exams.
              </p>

              {/* Core Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {revisionCheatSheet.summaryPoints.map((pt, i) => (
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
              <div style={{ background: '#faf5ff', border: '2px solid #c084fc', borderRadius: '14px', padding: '1.75rem', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🛡️ The 6-Question Critical-Thinking Master Checklist
                </h3>
                <div style={{ display: 'grid', gap: '0.65rem' }}>
                  {revisionCheatSheet.criticalThinkingChecklist.map((ch, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #d8b4fe', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 600, color: '#3b0764' }}>
                      {ch}
                    </div>
                  ))}
                </div>
              </div>

              {/* Congratulatory Card */}
              <div style={{
                background: 'linear-gradient(135deg, #3b0764 0%, #4c1d95 60%, #1e3a8a 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px -4px rgba(76, 29, 149, 0.3)'
              }}>
                <Award size={48} color="#e9d5ff" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Congratulations on Completing Level 3, Day 1!
                </h3>
                <p style={{ color: '#e9d5ff', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You now possess the advanced cognitive tools to evaluate arguments, unmask hidden assumptions, dismantle logical fallacies, and deduce airtight conclusions.
                </p>
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
