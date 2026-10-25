import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
  Clock, Sparkles, BookOpen, Layers, Target, Zap, HelpCircle,
  AlertTriangle, FileText, CheckCircle, Scale, Eye, GitBranch,
  ShieldAlert, Award, CheckSquare, MessageSquare, Briefcase,
  ChevronDown, ChevronRight, Check, Hash, RefreshCw, FastForward,
  Filter, Lock, Unlock, Play, Pause, Key, Compass, Terminal,
  Cpu, Activity, ListFilter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day14Overview,
  lessonIntro,
  coreConcepts,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  challengeData,
  commonMistakes,
  examChecklist,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel3Day14.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day14({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d14_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 14 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d14:day14';
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
      onNavigate('spoko_reasoning_l3_d14', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Starter Examples State
  const [revealedStarters, setRevealedStarters] = useState({});
  const toggleStarterReveal = (id) => {
    setRevealedStarters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Interactive Cipher Sandbox State
  const [sandboxWord, setSandboxWord] = useState('ALPHAFLY');
  const [sandboxShift, setSandboxShift] = useState(3);
  const [sandboxMode, setSandboxMode] = useState('forward'); // 'forward', 'reverse_alpha', 'word_reverse'

  const computeSandboxCipher = () => {
    const clean = sandboxWord.toUpperCase().replace(/[^A-Z]/g, '');
    if (!clean) return '';
    if (sandboxMode === 'word_reverse') {
      return clean.split('').reverse().join('');
    }
    return clean.split('').map(ch => {
      const code = ch.charCodeAt(0) - 65; // 0 to 25
      if (sandboxMode === 'reverse_alpha') {
        const rev = 25 - code;
        return String.fromCharCode(65 + rev);
      }
      // forward / backward shift
      const shifted = (code + sandboxShift + 26) % 26;
      return String.fromCharCode(65 + shifted);
    }).join('');
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

  // Real-World Challenge State ("Decode the Hidden Message")
  const [challengeAnswers, setChallengeAnswers] = useState({
    seg1: '',
    seg2: '',
    seg3: '',
    seg4: '',
    seg5: ''
  });
  const [isChallengeSubmitted, setIsChallengeSubmitted] = useState(false);
  const [showChallengeSolution, setShowChallengeSolution] = useState(false);

  const handleChallengeSubmit = () => {
    setIsChallengeSubmitted(true);
    setShowChallengeSolution(true);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch { }
  };

  // Worked Examples Category Filter & Selected
  const [exampleFilter, setExampleFilter] = useState('all');
  const [selectedExample, setSelectedExample] = useState(workedExamples?.[0]?.id || 'we_1');

  // Final Assessment State
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(savedProgress.assessmentSubmitted || {});
  const [assessmentFinished, setAssessmentFinished] = useState(savedProgress.assessmentFinished || false);
  const [assessmentTimer, setAssessmentTimer] = useState(1500); // 25 minutes
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
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
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
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

  // Filtered worked examples list
  const filteredWorkedExamples = (workedExamples || []).filter(ex => {
    if (exampleFilter === 'all') return true;
    return ex.category.toLowerCase().includes(exampleFilter.toLowerCase());
  });

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
            AlphaFly Logical Reasoning • Level 3 – Advanced • Day 3 (Cumulative Day 14)
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Advanced Coding-Decoding and Symbolic Logic
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e9d5ff',
            maxWidth: '860px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            Master high-difficulty multi-rule letter ciphers, word-to-number algorithms, artificial language sentence elimination, operational symbol substitution, conditional rule engines, and chained inequality logic.
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
              <CheckSquare size={15} color="#d8b4fe" /> 20 Solved Master Examples
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Target size={15} color="#d8b4fe" /> 3 Timed Practice Sets
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
        {/* TAB 1: OVERVIEW & STARTER EXAMPLES                       */}
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
                    Welcome to Level 3, Day 3: Advanced Coding & Symbolic Logic
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Multi-Rule Encryption, Sentence Elimination, and Transitive Inequality Chains
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {day14Overview?.description}
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
                  {(day14Overview?.learningObjectives || []).map((obj, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#7e22ce" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter Challenge Scenarios */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                  🧠 Starter Warm-Up: Crack the Rule Before Revealing the Answer!
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  Coding questions test your ability to infer hidden transformations from provided clues. Examine these three foundational cases:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                  {(lessonIntro?.starterExamples || []).map(ex => {
                    const isRevealed = revealedStarters[ex.id];
                    return (
                      <div key={ex.id} style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            background: '#f3e8ff',
                            color: '#6b21a8',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            marginBottom: '0.75rem'
                          }}>
                            {ex.title}
                          </div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem 0' }}>
                            {ex.prompt}
                          </h4>
                          <div style={{
                            background: '#f8fafc',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            border: '1px solid #f1f5f9',
                            fontSize: '0.85rem',
                            color: '#475569',
                            marginBottom: '1rem'
                          }}>
                            <div><strong>Input:</strong> {ex.plain}</div>
                            <div><strong>Coded:</strong> {ex.coded}</div>
                            <div><strong>Target:</strong> {ex.target}</div>
                          </div>
                        </div>

                        <div>
                          {isRevealed && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginBottom: '1rem' }}>
                              <div style={{
                                background: '#ecfdf5',
                                border: '1px solid #a7f3d0',
                                borderRadius: '8px',
                                padding: '0.85rem',
                                fontSize: '0.85rem',
                                color: '#065f46'
                              }}>
                                <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>
                                  Rule: {ex.rule}
                                </div>
                                <div style={{ marginBottom: '0.35rem' }}>
                                  <strong>Correct Answer:</strong> <span style={{ fontWeight: 800 }}>{ex.answer}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#047857', borderTop: '1px dashed #6ee7b7', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                                  💡 <em>Takeaway: {ex.takeaway}</em>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          <button
                            onClick={() => toggleStarterReveal(ex.id)}
                            style={{
                              width: '100%',
                              padding: '0.55rem',
                              borderRadius: '8px',
                              border: isRevealed ? '1px solid #cbd5e1' : 'none',
                              background: isRevealed ? '#f8fafc' : '#4c1d95',
                              color: isRevealed ? '#475569' : '#ffffff',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <Eye size={15} />
                            {isRevealed ? 'Hide Explanation' : 'Reveal Rule & Answer'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Cipher Sandbox Tool */}
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Terminal size={20} color="#a5b4fc" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#e0e7ff' }}>
                    Interactive Cipher Cracker & Alphabet Positional Sandbox
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#c7d2fe', margin: '0 0 1rem 0' }}>
                  Test how different shifting operations transform letters in real-time. Type any word or change the offset:
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>
                      Input Word (Letters Only):
                    </label>
                    <input
                      type="text"
                      value={sandboxWord}
                      onChange={(e) => setSandboxWord(e.target.value.toUpperCase())}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #4338ca',
                        background: '#0f172a',
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        marginTop: '0.25rem',
                        boxSizing: 'border-box'
                      }}
                      maxLength={14}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>
                      Transformation Mode:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <button
                        onClick={() => setSandboxMode('forward')}
                        style={{
                          flex: 1,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: sandboxMode === 'forward' ? '#6366f1' : '#1e1b4b',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Shift (+/- N)
                      </button>
                      <button
                        onClick={() => setSandboxMode('reverse_alpha')}
                        style={{
                          flex: 1,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: sandboxMode === 'reverse_alpha' ? '#6366f1' : '#1e1b4b',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Opposite (Sum 27)
                      </button>
                      <button
                        onClick={() => setSandboxMode('word_reverse')}
                        style={{
                          flex: 1,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: sandboxMode === 'word_reverse' ? '#6366f1' : '#1e1b4b',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Word Reverse
                      </button>
                    </div>
                  </div>

                  {sandboxMode === 'forward' && (
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>
                        Shift Offset: {sandboxShift > 0 ? `+${sandboxShift}` : sandboxShift}
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                        <input
                          type="range"
                          min="-13"
                          max="13"
                          value={sandboxShift}
                          onChange={(e) => setSandboxShift(parseInt(e.target.value))}
                          style={{ flex: 1, cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, width: '40px', textAlign: 'right' }}>
                          {sandboxShift > 0 ? `+${sandboxShift}` : sandboxShift}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-Time Cipher Display */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Cipher Output:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.15em', color: '#38bdf8' }}>
                      {computeSandboxCipher() || '---'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a5b4fc', maxWidth: '380px' }}>
                    {sandboxMode === 'forward' && `Shift rule applied: (Letter Position + ${sandboxShift}) mod 26.`}
                    {sandboxMode === 'reverse_alpha' && `Opposite alphabet rule: Each letter X is replaced by (27 - Position).`}
                    {sandboxMode === 'word_reverse' && `Positional reflection: The word order is reversed end-to-end.`}
                  </div>
                </div>
              </div>

              {/* Navigation to Concepts */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('section1')}
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
                  Start Concept 1: Advanced Letter Shifting <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 1 - ADVANCED LETTER SHIFTING               */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <FastForward size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept1?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept1?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept1?.theory}
              </p>

              {/* Memory Aids */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {(coreConcepts?.concept1?.memoryAids || []).map((aid, idx) => (
                  <div key={idx} style={{
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      🔑 {aid.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.35rem' }}>
                      {aid.formula}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {aid.use}
                    </div>
                  </div>
                ))}
              </div>

              {/* Alphabet Reference Strip */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '2rem',
                overflowX: 'auto'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Standard Alphabet Positions (A = 1 to Z = 26):
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', minWidth: '700px' }}>
                  {(coreConcepts?.concept1?.alphabetTable || []).map(item => (
                    <div key={item.letter} style={{
                      flex: 1,
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '0.4rem 0.2rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{item.letter}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6366f1' }}>{item.pos}</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.rev}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem', textAlign: 'right' }}>
                  Blue = Forward Position (1–26) • Grey = Reverse Position (26–1)
                </div>
              </div>

              {/* 5 Worked Examples for Concept 1 */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Progressive Difficulty
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept1?.examples || []).map((ex, i) => (
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
                        Step-by-Step
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Application:</div>
                      <div style={{ whiteSpace: 'pre-line' }}>{ex.application}</div>
                      <div style={{ marginTop: '0.5rem', fontWeight: 800, fontSize: '0.95rem' }}>
                        Correct Answer: {ex.answer}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap to Avoid:</strong> {ex.trap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
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
                  onClick={() => handleTabChange('section2')}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Next: Reverse & Rearrangement Coding →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 2 - REVERSE & REARRANGEMENT CODING          */}
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
                  <RefreshCw size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept2?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept2?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept2?.theory}
              </p>

              {/* Rearrangement Archetypes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {(coreConcepts?.concept2?.rearrangementTypes || []).map((t, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Reversal, Block Swaps & Cyclic Permutations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept2?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4338ca', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
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
                  ← Back to Letter Shifting
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
                  Next: Multiple-Rule Coding →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 3 - MULTIPLE-RULE CODING                    */}
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
                  <Layers size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept3?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept3?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept3?.theory}
              </p>

              {/* 5-Step Protocol */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🛡️ The 5-Step Multi-Rule Protocol:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(coreConcepts?.concept3?.fiveStepMethod || []).map(s => (
                    <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
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
                      </div>
                      <div>
                        <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{s.title}: </span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Multi-Transformation Scenarios
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept3?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
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
                  ← Back to Rearrangement
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
                  Next: Number-Based Coding →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 4 - NUMBER-BASED CODING                    */}
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
                  <Hash size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept4?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept4?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept4?.theory}
              </p>

              {/* Common Numerical Formulas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {(coreConcepts?.concept4?.commonFormulas || []).map((f, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {f.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      {f.formula}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Positional Sums, Scaling & Reverse Values
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept4?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
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
                  ← Back to Multiple-Rule
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
                  Next: Artificial Languages →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 5 - ARTIFICIAL LANGUAGES & WORD CODING     */}
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
                  <Compass size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept5?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept5?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept5?.theory}
              </p>

              {/* Demonstration Starter Matrix */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  📊 Step-by-Step Sentence Matrix Demonstration:
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong>Sentence 1:</strong> "mi na po" = <em>students learn logic</em>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong>Sentence 2:</strong> "na ki su" = <em>learn coding daily</em>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong>Sentence 3:</strong> "po su te" = <em>logic daily improves</em>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(coreConcepts?.concept5?.starterSentenceExample?.deductions || []).map((d, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      background: 'rgba(255,255,255,0.7)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px'
                    }}>
                      <CheckCircle2 size={15} color="#7e22ce" />
                      <span><strong>{d.comparison}</strong> → {d.token}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Sentence Matrices, Synthesis & Morphology
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept5?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
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
                  ← Back to Number Coding
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
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
                  Next: Symbol Substitution →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 6 - SYMBOL SUBSTITUTION                    */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept6?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept6?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept6?.theory}
              </p>

              {/* BODMAS Rules Card */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.75rem 0' }}>
                  📐 Mandatory Operator Precedence (BODMAS / PEMDAS):
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {(coreConcepts?.concept6?.bodmasRules || []).map((r, i) => (
                    <div key={i} style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontWeight: 800, color: '#7e22ce' }}>{r.letter}:</span> <span style={{ fontSize: '0.85rem', color: '#334155' }}>{r.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Arithmetic & Inequality Substitution
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept6?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
                    </div>
                  </div>
                ))}
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
                  ← Back to Artificial Languages
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
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
                  Next: Conditional Coding →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 7 - CONDITIONAL & RULE-BASED CODING         */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept7?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept7?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept7?.theory}
              </p>

              {/* Rule Hierarchy Engine */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  ⚙️ Execution Engine: How to Evaluate Conditional Coding Questions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                  {(coreConcepts?.concept7?.ruleHierarchy || []).map(r => (
                    <div key={r.step} style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#7e22ce', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        Step {r.step}: {r.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                        {r.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Bank PO & Placement Aptitude Conditional Systems
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept7?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section6')}
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
                  ← Back to Symbol Substitution
                </button>
                <button
                  onClick={() => handleTabChange('section8')}
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
                  Next: Multi-Step Symbolic Logic →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: SECTION 8 - MULTI-STEP SYMBOLIC LOGIC               */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <GitBranch size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {coreConcepts?.concept8?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {coreConcepts?.concept8?.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {coreConcepts?.concept8?.theory}
              </p>

              {/* Golden Rules of Inequality Gates */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  🚪 The 4 Golden Rules of Inequality Gates:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                  {(coreConcepts?.concept8?.goldenRules || []).map((g, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {g.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                        {g.rule}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Worked Examples: Chained Inequalities & Either-Or Deductions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {(coreConcepts?.concept8?.examples || []).map(ex => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.question}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                      {ex.analysis}
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#166534' }}>
                      <div>{ex.application}</div>
                      <div style={{ marginTop: '0.4rem', fontWeight: 800 }}>Answer: {ex.answer}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      ⚠️ <strong>Trap:</strong> {ex.trap}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section7')}
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
                  ← Back to Conditional Coding
                </button>
                <button
                  onClick={() => handleTabChange('examples')}
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
                  View 20 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: 20 SOLVED MASTER EXAMPLES                           */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                      20 Solved Master Examples
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      Comprehensive Coverage of All 8 Core Archetypes with Traps & Checks
                    </p>
                  </div>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All 20' },
                    { id: 'shift', label: 'Shifting' },
                    { id: 'rearrangement', label: 'Rearrangement' },
                    { id: 'multiple', label: 'Multi-Rule' },
                    { id: 'number', label: 'Number' },
                    { id: 'artificial', label: 'Artificial' },
                    { id: 'symbol', label: 'Symbol / Logic' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setExampleFilter(f.id)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '9999px',
                        border: exampleFilter === f.id ? '1px solid #7e22ce' : '1px solid #e2e8f0',
                        background: exampleFilter === f.id ? '#f3e8ff' : '#ffffff',
                        color: exampleFilter === f.id ? '#7e22ce' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Examples Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {filteredWorkedExamples.map((ex, index) => (
                  <div key={ex.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          background: '#4c1d95',
                          color: '#ffffff',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>
                          Example {index + 1} of {filteredWorkedExamples.length}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b21a8' }}>
                          {ex.category}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: ex.difficulty === 'Moderate' ? '#eff6ff' : '#fef2f2',
                        color: ex.difficulty === 'Moderate' ? '#1d4ed8' : '#b91c1c',
                        fontWeight: 700
                      }}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                      {ex.question}
                    </h3>

                    {/* Given Cipher */}
                    <div style={{
                      background: '#f8fafc',
                      borderLeft: '4px solid #6366f1',
                      padding: '0.65rem 0.85rem',
                      marginBottom: '1rem',
                      fontSize: '0.85rem',
                      color: '#475569'
                    }}>
                      <strong>Given Information:</strong> {ex.given}
                    </div>

                    {/* Rule Discovery */}
                    <div style={{
                      background: '#faf5ff',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      marginBottom: '1rem',
                      fontSize: '0.85rem',
                      color: '#581c87',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line'
                    }}>
                      <div style={{ fontWeight: 800, marginBottom: '0.35rem' }}>🔍 Rule Identification Process:</div>
                      {ex.ruleDiscovery}
                    </div>

                    {/* Step-by-Step Breakdown */}
                    {ex.stepByStep && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                          Step-by-Step Transformations:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {ex.stepByStep.map((s, idx) => (
                            <div key={idx} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '0.4rem' }}>
                              <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Correct Answer & Verification */}
                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      marginBottom: '0.85rem',
                      fontSize: '0.9rem',
                      color: '#166534'
                    }}>
                      <div style={{ fontWeight: 800 }}>✅ Correct Answer: {ex.correctAnswer}</div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.25rem' }}>
                        <strong>Verification:</strong> {ex.verification}
                      </div>
                    </div>

                    {/* Trap Note */}
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#991b1b',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '6px'
                    }}>
                      ⚠️ <strong>Common Pitfall:</strong> {ex.commonError}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => handleTabChange('section8')}
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
                  ← Back to Concepts
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
                  Start Timed Practice Sets (A, B, C) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: 3 TIMED PRACTICE SETS (A, B, C)                     */}
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
                    3 Progressive Practice Sets with Live Timers, Instant Feedback, and Complete Explanations
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
                  if (submitted[q.id] && isAnswerCorrect(answers[q.id], q.correctAnswer)) {
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
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0' }}>
                          {data.description}
                        </p>
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

                    {/* Questions in this set */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {(data.questions || []).map((q, qIndex) => {
                        const isQSubmitted = submitted[q.id];
                        const userAns = answers[q.id];
                        const isCorrect = isAnswerCorrect(userAns, q.correctAnswer);

                        return (
                          <div key={q.id} style={{
                            background: '#ffffff',
                            borderRadius: '10px',
                            padding: '1.25rem',
                            border: isQSubmitted
                              ? isCorrect ? '1px solid #86efac' : '1px solid #fca5a5'
                              : '1px solid #e2e8f0'
                          }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                              Q{qIndex + 1}. {q.question}
                            </div>

                            {/* Options */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                              {(q.options || []).map(opt => {
                                const optLetter = getLetter(opt);
                                const isSelected = userAns === optLetter;
                                const isOptCorrect = optLetter === getLetter(q.correctAnswer);

                                let optBg = '#ffffff';
                                let optBorder = '#cbd5e1';
                                let optColor = '#1e293b';

                                if (isQSubmitted) {
                                  if (isOptCorrect) {
                                    optBg = '#f0fdf4';
                                    optBorder = '#86efac';
                                    optColor = '#166534';
                                  } else if (isSelected) {
                                    optBg = '#fef2f2';
                                    optBorder = '#fca5a5';
                                    optColor = '#991b1b';
                                  }
                                } else if (isSelected) {
                                  optBg = '#f3e8ff';
                                  optBorder = '#a855f7';
                                  optColor = '#581c87';
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

                            {/* Submit Single Question Button */}
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
                                Check Answer
                              </button>
                            )}

                            {/* Instant Feedback & Complete Explanation */}
                            {isQSubmitted && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
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
                                    {isCorrect ? 'Correct!' : `Incorrect — Correct answer is (${q.correctAnswer})`}
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
                              </motion.div>
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
                  onClick={() => handleTabChange('examples')}
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
                  ← Back to Solved Examples
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
                  Next: Decode the Hidden Message Challenge →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: REAL-WORLD CHALLENGE: DECODE THE HIDDEN MESSAGE     */}
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
                    Real-World Application Challenge: "Decode the Hidden Message"
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    An Educational Multi-Layered Transmission Decryption Mission
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
                <strong>Scenario Notice:</strong> {challengeData?.context}
                <br />
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                  <em>Note: This scenario is an educational logical reasoning exercise designed to evaluate your deductive skills and does not represent real-world security encryption.</em>
                </span>
              </div>

              {/* Transmission 5 Segments */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Segment 1 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {challengeData?.transmission?.segment1?.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                    <strong>Ciphertext:</strong> <code style={{ background: '#e0e7ff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>{challengeData?.transmission?.segment1?.ciphertext}</code> • {challengeData?.transmission?.segment1?.clue}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment1?.question}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter decoded word..."
                    value={challengeAnswers.seg1}
                    onChange={(e) => setChallengeAnswers(prev => ({ ...prev, seg1: e.target.value.toUpperCase() }))}
                    disabled={isChallengeSubmitted}
                    style={{
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      width: '260px'
                    }}
                  />
                  {showChallengeSolution && (
                    <div style={{ marginTop: '0.75rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                      <strong>Solution: {challengeData?.solutions?.segment1Solution?.plaintext}</strong>
                      <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                        {challengeData?.solutions?.segment1Solution?.derivation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Segment 2 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {challengeData?.transmission?.segment2?.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                    <strong>Ciphertext:</strong> <code style={{ background: '#e0e7ff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>{challengeData?.transmission?.segment2?.ciphertext}</code> • {challengeData?.transmission?.segment2?.clue}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment2?.question}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter reversed word..."
                    value={challengeAnswers.seg2}
                    onChange={(e) => setChallengeAnswers(prev => ({ ...prev, seg2: e.target.value.toUpperCase() }))}
                    disabled={isChallengeSubmitted}
                    style={{
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      width: '260px'
                    }}
                  />
                  {showChallengeSolution && (
                    <div style={{ marginTop: '0.75rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                      <strong>Solution: {challengeData?.solutions?.segment2Solution?.plaintext}</strong>
                      <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                        {challengeData?.solutions?.segment2Solution?.derivation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Segment 3 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {challengeData?.transmission?.segment3?.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment3?.clue}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment3?.question}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter integer..."
                    value={challengeAnswers.seg3}
                    onChange={(e) => setChallengeAnswers(prev => ({ ...prev, seg3: e.target.value }))}
                    disabled={isChallengeSubmitted}
                    style={{
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      width: '260px'
                    }}
                  />
                  {showChallengeSolution && (
                    <div style={{ marginTop: '0.75rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                      <strong>Solution: {challengeData?.solutions?.segment3Solution?.passkey}</strong>
                      <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                        {challengeData?.solutions?.segment3Solution?.derivation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Segment 4 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {challengeData?.transmission?.segment4?.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment4?.clue}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment4?.question}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['YES', 'NO', 'CANNOT BE DETERMINED'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setChallengeAnswers(prev => ({ ...prev, seg4: opt }))}
                        disabled={isChallengeSubmitted}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: challengeAnswers.seg4 === opt ? '1.5px solid #4338ca' : '1px solid #cbd5e1',
                          background: challengeAnswers.seg4 === opt ? '#e0e7ff' : '#ffffff',
                          color: '#1e293b',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: isChallengeSubmitted ? 'default' : 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {showChallengeSolution && (
                    <div style={{ marginTop: '0.75rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                      <strong>Solution: {challengeData?.solutions?.segment4Solution?.verdict}</strong>
                      <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                        {challengeData?.solutions?.segment4Solution?.derivation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Segment 5 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {challengeData?.transmission?.segment5?.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment5?.clue}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                    {challengeData?.transmission?.segment5?.question}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['YES', 'NO (REQUIRES MORE DATA)'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setChallengeAnswers(prev => ({ ...prev, seg5: opt }))}
                        disabled={isChallengeSubmitted}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: challengeAnswers.seg5 === opt ? '1.5px solid #4338ca' : '1px solid #cbd5e1',
                          background: challengeAnswers.seg5 === opt ? '#e0e7ff' : '#ffffff',
                          color: '#1e293b',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: isChallengeSubmitted ? 'default' : 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {showChallengeSolution && (
                    <div style={{ marginTop: '0.75rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', border: '1px solid #a7f3d0' }}>
                      <strong>Solution: {challengeData?.solutions?.segment5Solution?.verdict}</strong>
                      <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                        {challengeData?.solutions?.segment5Solution?.derivation}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Challenge Button */}
              {!isChallengeSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  style={{
                    background: '#4c1d95',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(76, 29, 149, 0.3)'
                  }}
                >
                  Submit & Reveal Decrypted Mission Solution
                </button>
              ) : (
                <div style={{ display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#16a34a' }}>✅ Transmission Successfully Decrypted!</span>
                  <button
                    onClick={() => {
                      setIsChallengeSubmitted(false);
                      setShowChallengeSolution(false);
                      setChallengeAnswers({ seg1: '', seg2: '', seg3: '', seg4: '', seg5: '' });
                    }}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Retry Challenge
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
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
                  Next: Common Mistakes & Exam Strategy →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: COMMON MISTAKES & EXAM STRATEGIES                   */}
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
                    Common Mistakes and High-Stakes Exam Strategies
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Classic Pitfalls That Trap Competitive Test Candidates & How to Avoid Them
                  </p>
                </div>
              </div>

              {/* Mistakes Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}>
                {(commonMistakes || []).map((m, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #fee2e2',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ fontWeight: 800, color: '#b91c1c', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={16} />
                      {m.mistake}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                      {m.detail}
                    </p>
                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      color: '#15803d'
                    }}>
                      🛡️ <strong>Prevention:</strong> {m.prevention}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical 7-Step Examination Checklist */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#581c87', margin: '0 0 1rem 0' }}>
                  📋 7-Step Timed Examination Action Checklist:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(examChecklist || []).map((step, i) => (
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
                  ← Back to Challenge
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
                  Take Final Timed Assessment (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: TIMED FINAL ASSESSMENT (20 QUESTIONS)              */}
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
                      Day 14 Final Assessment: 20 Advanced Aptitude Questions
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      Time Limit: 25 Minutes (1500s) • 4 Options Each • Automatic Domain Analysis
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

              {/* Assessment Status Bar / Palette */}
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
                          <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#64748b', fontWeight: 700 }}>
                            {q.difficulty}
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

                        {/* Action Controls */}
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
                                Finish Assessment
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
                    background: savedProgress.assessmentPercentage >= 60 ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${savedProgress.assessmentPercentage >= 60 ? '#86efac' : '#fca5a5'}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    <Award size={48} color={savedProgress.assessmentPercentage >= 60 ? '#16a34a' : '#dc2626'} style={{ margin: '0 auto 0.5rem' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: savedProgress.assessmentPercentage >= 60 ? '#166534' : '#991b1b', margin: '0 0 0.5rem 0' }}>
                      {savedProgress.assessmentPercentage >= 90 && "Outstanding Mastery! (Tier: Excellent)"}
                      {savedProgress.assessmentPercentage >= 75 && savedProgress.assessmentPercentage < 90 && "Great Job! (Tier: Good - Placement Ready)"}
                      {savedProgress.assessmentPercentage >= 60 && savedProgress.assessmentPercentage < 75 && "Passed! (Tier: Developing - Review Complex Shifts)"}
                      {savedProgress.assessmentPercentage < 60 && "Needs Improvement - Revisit Core Concepts & Retake"}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>
                          {savedProgress.assessmentScore} / {(finalAssessmentQuestions || []).length}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>Final Score</div>
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
                        <RotateCcw size={16} /> Retake Assessment
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

                  {/* Domain-By-Domain Breakdown & Weakness Detection */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
                      📊 Cognitive Skill Domain Breakdown:
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
                              {isWeak ? '⚠️ Recommended for targeted practice' : '✅ Proficient'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Collapsible Complete Question Review */}
                  {isReviewOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                        Detailed Answer Review & Distractor Breakdown:
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

                            {q.distractorNotes && (
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                💡 <em>Why distractors fail: {q.distractorNotes}</em>
                              </div>
                            )}
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
                  View Lesson Summary & Quick-Reference Sheet →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB: REVISION & QUICK-REFERENCE SHEET                    */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.6rem', borderRadius: '12px' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#3b0764' }}>
                    {revisionCheatSheet?.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Rapid Recall Formula Reference & Master Identification Matrix
                  </p>
                </div>
              </div>

              {/* Core Alphabet Formulas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {(revisionCheatSheet?.alphabetMappingRules || []).map((r, idx) => (
                  <div key={idx} style={{
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {r.rule}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                      {r.details}
                    </div>
                  </div>
                ))}
              </div>

              {/* Master Comparison Table */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem' }}>
                Master Quick-Reference Comparison Table:
              </h3>

              <div style={{
                overflowX: 'auto',
                marginBottom: '2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.85rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#334155' }}>
                      <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #cbd5e1' }}>Coding Type</th>
                      <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #cbd5e1' }}>Common Identifying Clues</th>
                      <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #cbd5e1' }}>First Method to Try</th>
                      <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #cbd5e1' }}>Common Mistakes to Avoid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(revisionCheatSheet?.masterComparisonTable || []).map((row, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#4338ca' }}>{row.codingType}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>{row.identifyingClues}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#166534', fontWeight: 600 }}>{row.firstMethodToTry}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#991b1b' }}>{row.mistakesToAvoid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Golden Summary Axioms */}
              <div style={{
                background: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#581c87', margin: '0 0 0.75rem 0' }}>
                  ⭐ 4 Inviolable Axioms of Competitive Coding-Decoding:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(revisionCheatSheet?.goldenSummaryRules || []).map((axiom, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#7e22ce" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{axiom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Progression Badge & Navigation */}
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
                  Congratulations on Completing Level 3, Day 3 (Cumulative Day 14)!
                </h3>
                <p style={{ color: '#e9d5ff', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You have mastered advanced letter transformations, multi-rule algorithms, sentence elimination matrices, conditional decision systems, and symbolic inequality chains.
                </p>
                <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate('spoko_reasoning_l3_d13', 'overview');
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
                    ← Review Day 13
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
                    Review Day 14 Assessment
                  </button>
                  <button
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate('spoko_reasoning_l3_d15', 'overview');
                      }
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Next: Day 15 (Level 3 Day 4) →
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
