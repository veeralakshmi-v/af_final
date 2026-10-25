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
  CircleDot, BarChart3, PieChart, TrendingUp, Calculator, Sliders,
  GitFork, GitPullRequest, Search, FileSpreadsheet, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day19Overview,
  section1UnderstandingProblems,
  section2FiveWhysAnalysis,
  section3FishboneAnalysis,
  section4RootCausePrioritization,
  section5StrategicProblemSolving,
  section6DecisionTreesAndExpectedValue,
  section7PracticeSets,
  section8RealWorldChallenge,
  section9FinalAssessment,
  section10RevisionAndDrills
} from '../../data/reasoningLevel3Day19.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

export default function SpokoReasoningLevel3Day19({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d19_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 19 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d19:day19';
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonKey,
          completed: true,
          score: savedProgress.assessmentScore,
          total: 20
        })
      }).catch(err => console.log('LMS sync skipped/offline:', err));
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, session]);

  const markSectionComplete = (secId) => {
    setSavedProgress(prev => {
      const existing = prev.completedSections || [];
      if (!existing.includes(secId)) {
        return { ...prev, completedSections: [...existing, secId] };
      }
      return prev;
    });
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionComplete(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l3_d19', tabId);
    }
  };

  // Section 1: Warmup state
  const [warmupAnswers, setWarmupAnswers] = useState({});
  const [warmupSubmitted, setWarmupSubmitted] = useState({});

  const handleWarmupSelect = (qId, optIdx) => {
    if (warmupSubmitted[qId]) return;
    setWarmupAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleWarmupSubmit = (qId) => {
    if (warmupAnswers[qId] === undefined) return;
    setWarmupSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  // Section 3: Interactive Fishbone state
  const [fishboneAnswers, setFishboneAnswers] = useState({});
  const [fishboneScore, setFishboneScore] = useState(null);

  const handleFishboneSelect = (itemId, cat) => {
    setFishboneAnswers(prev => ({ ...prev, [itemId]: cat }));
  };

  const checkFishbone = () => {
    let correct = 0;
    section3FishboneAnalysis.interactiveExercise.items.forEach(item => {
      if (fishboneAnswers[item.id] === item.category) correct++;
    });
    setFishboneScore(correct);
    if (correct >= 6) {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  // Section 4: Interactive Prioritization Index Calculator
  const [calcImpact, setCalcImpact] = useState(4);
  const [calcFrequency, setCalcFrequency] = useState(4);
  const [calcRisk, setCalcRisk] = useState(4);
  const [calcEvidence, setCalcEvidence] = useState(3);
  const [calcEase, setCalcEase] = useState(4);

  const computedPriorityIndex = (
    calcImpact * 0.30 +
    calcFrequency * 0.25 +
    calcRisk * 0.20 +
    calcEvidence * 0.15 +
    calcEase * 0.10
  ).toFixed(2);

  // Section 6: Interactive Expected Value Calculator
  const [evProbSuccess, setEvProbSuccess] = useState(0.70);
  const [evPayoffSuccess, setEvPayoffSuccess] = useState(100000);
  const [evPayoffFailure, setEvPayoffFailure] = useState(-20000);
  const [evInitialCost, setEvInitialCost] = useState(15000);

  const probFailure = Math.max(0, 1 - evProbSuccess);
  const grossEV = (evProbSuccess * evPayoffSuccess) + (probFailure * evPayoffFailure);
  const netEV = grossEV - evInitialCost;

  // Section 7: Practice Sets state
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceSubmitted, setPracticeSubmitted] = useState({});
  const [practiceActiveSet, setPracticeActiveSet] = useState('setA');

  const handlePracticeSelect = (qId, optIdx) => {
    if (practiceSubmitted[qId]) return;
    setPracticeAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handlePracticeSubmit = (qId) => {
    if (practiceAnswers[qId] === undefined) return;
    setPracticeSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  const handlePracticeRetry = (qId) => {
    setPracticeAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setPracticeSubmitted(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Section 8: Challenge state
  const [challengeUserText, setChallengeUserText] = useState('');
  const [challengeShowSolution, setChallengeShowSolution] = useState(false);

  // Section 9: Assessment state
  const [assessAnswers, setAssessAnswers] = useState(savedProgress.assessmentAnswers || {});
  const [assessSubmitted, setAssessSubmitted] = useState(savedProgress.assessmentFinished || false);
  const [assessTimeRemaining, setAssessTimeRemaining] = useState(25 * 60);
  const [assessTimerActive, setAssessTimerActive] = useState(false);
  const [currentAssessQIdx, setCurrentAssessQIdx] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (assessTimerActive && assessTimeRemaining > 0 && !assessSubmitted) {
      interval = setInterval(() => {
        setAssessTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [assessTimerActive, assessTimeRemaining, assessSubmitted]);

  const handleStartAssessment = () => {
    setAssessTimerActive(true);
  };

  const handleAssessSelect = (qId, optIdx) => {
    if (assessSubmitted) return;
    setAssessAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleAutoSubmitAssessment = () => {
    calculateAndSaveScore();
  };

  const calculateAndSaveScore = () => {
    let correctCount = 0;
    section9FinalAssessment.questions.forEach(q => {
      if (assessAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / section9FinalAssessment.questions.length) * 100);
    const passed = correctCount >= section9FinalAssessment.passingScore;

    setAssessSubmitted(true);
    setAssessTimerActive(false);

    setSavedProgress(prev => ({
      ...prev,
      assessmentScore: correctCount,
      assessmentPercentage: percentage,
      assessmentPassed: passed,
      assessmentAnswers: assessAnswers,
      assessmentFinished: true,
      completedDay: passed || prev.completedDay,
      completedSections: [...new Set([...(prev.completedSections || []), 'assessment', 'summary'])]
    }));

    if (passed) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRetakeAssessment = () => {
    if (window.confirm("Are you sure you want to retake the assessment? Previous answers will be cleared.")) {
      setAssessAnswers({});
      setAssessSubmitted(false);
      setAssessTimeRemaining(25 * 60);
      setAssessTimerActive(true);
      setCurrentAssessQIdx(0);
    }
  };

  // Section 10: Rapid Fire state
  const [revealedRapidFire, setRevealedRapidFire] = useState({});
  const toggleRapidFire = (id) => {
    setRevealedRapidFire(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
    { id: 'section1', label: '1. Problem Types', icon: <AlertTriangle size={16} /> },
    { id: 'section2', label: '2. 5 Whys Analysis', icon: <Search size={16} /> },
    { id: 'section3', label: '3. Fishbone Diagrams', icon: <GitFork size={16} /> },
    { id: 'section4', label: '4. Prioritization Matrix', icon: <Sliders size={16} /> },
    { id: 'section5', label: '5. Strategic Solving', icon: <Layers size={16} /> },
    { id: 'section6', label: '6. Decision Trees & EV', icon: <GitBranch size={16} /> },
    { id: 'practice', label: '7. Practice Sets (15 Qs)', icon: <Clock size={16} /> },
    { id: 'challenge', label: '8. Real-World Challenge', icon: <Briefcase size={16} /> },
    { id: 'assessment', label: '9. Final Assessment (20 Qs)', icon: <Award size={16} /> },
    { id: 'summary', label: '10. Revision & Drills', icon: <FileText size={16} /> }
  ];

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#0f172a',
      background: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* 🧭 HEADER & BRANDING */}
      <header style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              <Brain size={14} /> Alpha Fly Computer Education • Logical Reasoning
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', lineHeight: 1.2 }}>
              Level 3 – Advanced Day 8: Advanced Root Cause Analysis, Strategic Problem-Solving & Decision Trees
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', maxWidth: '850px', lineHeight: 1.5 }}>
              Master diagnostic investigation techniques (5 Whys, Ishikawa Fishbone), candidate cause prioritization, 10-step strategic frameworks, and backward-induction Decision Trees with Expected Monetary Value calculations.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            minWidth: '170px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>
              Lesson Status
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '0.25rem' }}>
              {savedProgress.completedDay ? 'COMPLETED 🎉' : 'IN PROGRESS'}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>
              Score: {savedProgress.assessmentScore}/20 ({savedProgress.assessmentPercentage}%)
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION SCROLL BAR */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          marginTop: '1.75rem',
          paddingBottom: '0.5rem'
        }}>
          {navTabs.map(tab => {
            const isActive = currentTab === tab.id;
            const isCompleted = (savedProgress.completedSections || []).includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                  color: isActive ? '#0369a1' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {isCompleted && !isActive && <CheckCircle size={14} style={{ color: '#86efac' }} />}
              </button>
            );
          })}
        </div>
      </header>

      {/* 🚀 TAB CONTENT CONTAINER */}
      <main>
        <AnimatePresence mode="wait">

          {/* TAB 0: OVERVIEW */}
          {currentTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Curriculum Specifications
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {day19Overview.title}
                    </h2>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                    <div><strong>Duration:</strong> {day19Overview.duration}</div>
                    <div><strong>Difficulty:</strong> <span style={{ color: '#dc2626', fontWeight: 700 }}>{day19Overview.difficulty}</span></div>
                    <div><strong>Prerequisite:</strong> {day19Overview.prerequisite}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  🎯 Comprehensive Learning Objectives
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '0.85rem' }}>
                  {day19Overview.learningObjectives.map((obj, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '10px',
                        borderLeft: '4px solid #0284c7',
                        fontSize: '0.9rem',
                        lineHeight: 1.45,
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem' }}>#{i + 1}</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontWeight: 800, fontSize: '0.95rem' }}>
                    💡 Institutional Philosophy at Alpha Fly Computer Education
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d', lineHeight: 1.5 }}>
                    "Shallow organizations treat symptoms by reprimanding employees, rebooting servers, or offering superficial discounts. High-performing analytical organizations deconstruct systemic architectures, ask rigorous 'Why?' questions backed by empirical logs, prioritize candidate causes via objective risk indices, and make capital decisions using expected value backward induction."
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
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
                    Start Section 1: Problem Types <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: SECTION 1 - UNDERSTANDING COMPLEX PROBLEMS */}
          {currentTab === 'section1' && (
            <motion.div
              key="section1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Conceptual Foundation
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section1UnderstandingProblems.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section1UnderstandingProblems.introduction}
                </p>

                {/* HIERARCHY CARDS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The Causal Hierarchy: Symptoms vs. Immediate Causes vs. Contributing Factors vs. Root Causes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section1UnderstandingProblems.hierarchy.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{
                        display: 'inline-block',
                        background: idx === 0 ? '#fef3c7' : idx === 1 ? '#fed7aa' : idx === 2 ? '#e0f2fe' : '#dcfce7',
                        color: idx === 0 ? '#92400e' : idx === 1 ? '#9a3412' : idx === 2 ? '#0369a1' : '#166534',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase'
                      }}>
                        {item.term}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {item.definition}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#0284c7' }}>Example:</strong> {item.example}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#b91c1c', background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>
                        ⚠️ <strong>Analytical Trap:</strong> {item.trap}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 CORE PRINCIPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Structural Axioms of Root Cause Analysis
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section1UnderstandingProblems.corePrinciples.map((cp, idx) => (
                    <div key={idx} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {cp.principle}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.45 }}>
                        {cp.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 WARM-UP QUESTIONS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  3. Diagnostic Warm-Up Exercises
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section1UnderstandingProblems.warmupQuestions.map((q, idx) => {
                    const isSubmitted = warmupSubmitted[q.id];
                    const selectedOpt = warmupAnswers[q.id];
                    const isCorrect = isSubmitted && isAnswerCorrect(selectedOpt, q.correct);

                    return (
                      <div
                        key={q.id}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          WARM-UP DRILL {idx + 1}
                        </div>
                        <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 1rem 0', color: '#0f172a', lineHeight: 1.45 }}>
                          {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                          {q.options.map((opt, oIdx) => {
                            let btnBg = '#ffffff';
                            let borderCol = '#cbd5e1';
                            let textCol = '#0f172a';

                            if (selectedOpt === oIdx) {
                              btnBg = '#e0f2fe';
                              borderCol = '#0284c7';
                              textCol = '#0369a1';
                            }
                            if (isSubmitted) {
                              if (oIdx === q.correct) {
                                btnBg = '#dcfce7';
                                borderCol = '#16a34a';
                                textCol = '#166534';
                              } else if (selectedOpt === oIdx) {
                                btnBg = '#fee2e2';
                                borderCol = '#dc2626';
                                textCol = '#991b1b';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handleWarmupSelect(q.id, oIdx)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${borderCol}`,
                                  color: textCol,
                                  borderRadius: '8px',
                                  padding: '0.75rem 1rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  fontWeight: selectedOpt === oIdx ? 700 : 500,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  transition: 'all 0.15s'
                                }}
                              >
                                <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={selectedOpt === undefined}
                            onClick={() => handleWarmupSubmit(q.id)}
                            style={{
                              background: selectedOpt !== undefined ? '#0284c7' : '#94a3b8',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.5rem 1.25rem',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{
                            background: isCorrect ? '#ecfdf5' : '#fef2f2',
                            border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                            borderRadius: '8px',
                            padding: '1rem',
                            fontSize: '0.85rem',
                            color: isCorrect ? '#065f46' : '#991b1b',
                            lineHeight: 1.45
                          }}>
                            <div style={{ fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                              {isCorrect ? 'Correct Analysis!' : 'Analysis Incorrect'}
                            </div>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('overview')}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      padding: '0.65rem 1.25rem',
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
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.65rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Section 2: 5 Whys Analysis <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECTION 2 - 5 WHYS ANALYSIS */}
          {currentTab === 'section2' && (
            <motion.div
              key="section2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Diagnostic Methodologies
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section2FiveWhysAnalysis.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section2FiveWhysAnalysis.introduction}
                </p>

                {/* METHODOLOGY STEPS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The 7-Step Evidentiary 5 Whys Execution Framework
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section2FiveWhysAnalysis.methodologySteps.map((m, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        {m.step}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.4 }}>
                        {m.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 WORKED EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Comprehensive Solved 5 Whys Master Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section2FiveWhysAnalysis.workedExamples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        CASE STUDY {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <strong>Problem Statement:</strong> {ex.problemStatement}
                      </div>

                      {/* 5 WHYS CHAIN */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                        {ex.chain.map((link, lIdx) => (
                          <div
                            key={lIdx}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              padding: '0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.35rem'
                            }}
                          >
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7' }}>
                              Level {lIdx + 1}: {link.why}
                            </div>
                            <div style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 600 }}>
                              ↳ Answer: {link.answer}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#059669', background: '#ecfdf5', padding: '0.35rem 0.6rem', borderRadius: '4px' }}>
                              🔍 <strong>Empirical Evidence:</strong> {link.evidence}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div>
                          <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Alternative Explanations Tested:</strong>
                          <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '0.2rem' }}>{ex.alternativeExplanations}</div>
                        </div>
                        <div>
                          <strong style={{ color: '#166534', fontSize: '0.8rem', textTransform: 'uppercase' }}>Defensible Root Cause:</strong>
                          <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, marginTop: '0.2rem' }}>{ex.defensibleRootCause}</div>
                        </div>
                        <div>
                          <strong style={{ color: '#0369a1', fontSize: '0.8rem', textTransform: 'uppercase' }}>Corrective & Preventive Action:</strong>
                          <div style={{ fontSize: '0.82rem', color: '#0369a1', marginTop: '0.2rem' }}>{ex.correctiveAction}</div>
                        </div>
                        <div>
                          <strong style={{ color: '#7c3aed', fontSize: '0.8rem', textTransform: 'uppercase' }}>Measurable KPI Indicator:</strong>
                          <div style={{ fontSize: '0.82rem', color: '#7c3aed', fontWeight: 700, marginTop: '0.2rem' }}>{ex.measurableMetric}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section1')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 1
                  </button>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 3: Fishbone Diagrams <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SECTION 3 - FISHBONE ANALYSIS */}
          {currentTab === 'section3' && (
            <motion.div
              key="section3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Cause-and-Effect Architecture
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section3FishboneAnalysis.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section3FishboneAnalysis.introduction}
                </p>

                {/* THE 6 CORE CATEGORIES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The Standard 6-Rib Operational Categorization
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section3FishboneAnalysis.categories.map((cat, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #0284c7', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                        {cat.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {cat.focus}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4 WORKED DIAGRAMS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Four Solved Fishbone Cause-and-Effect Architectures
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
                  {section3FishboneAnalysis.workedDiagrams.map((diag, idx) => (
                    <div
                      key={diag.id}
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        FISHBONE DIAGRAM {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {diag.title}
                      </h4>
                      <div style={{ background: '#fef2f2', borderLeft: '4px solid #dc2626', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#991b1b', marginBottom: '1.25rem' }}>
                        📌 Problem / Effect (The Fish Head): {diag.effect}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                        {diag.branches.map((b, bIdx) => (
                          <div key={bIdx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem', borderBottom: '1.5px solid #0284c7', paddingBottom: '0.35rem', marginBottom: '0.65rem' }}>
                              🦴 {b.category}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {b.causes.map((c, cIdx) => (
                                <div key={cIdx} style={{ fontSize: '0.8rem', color: '#0f172a', lineHeight: 1.35 }}>
                                  • {c.cause}
                                  <div style={{ fontSize: '0.72rem', color: '#059669', fontStyle: 'italic', marginTop: '0.15rem' }}>
                                    ↳ {c.status}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem', color: '#166534' }}>
                        🔍 <strong>Investigation Finding:</strong> {diag.investigationFinding}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE FISHBONE DRILL */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                  3. Interactive Fishbone Categorization Drill
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  {section3FishboneAnalysis.interactiveExercise.instructions}
                </p>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {section3FishboneAnalysis.interactiveExercise.items.map((item) => {
                      const selectedCat = fishboneAnswers[item.id];
                      const isSubmitted = fishboneScore !== null;
                      const isCorrect = isSubmitted && selectedCat === item.category;

                      return (
                        <div
                          key={item.id}
                          style={{
                            background: '#ffffff',
                            border: `1.5px solid ${isSubmitted ? (isCorrect ? '#16a34a' : '#dc2626') : '#e2e8f0'}`,
                            borderRadius: '8px',
                            padding: '1rem'
                          }}
                        >
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem' }}>
                            {item.text}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {['People', 'Process', 'Technology', 'Environment', 'Measurement', 'Information'].map((cat) => (
                              <button
                                key={cat}
                                disabled={isSubmitted}
                                onClick={() => handleFishboneSelect(item.id, cat)}
                                style={{
                                  background: selectedCat === cat ? '#0284c7' : '#f1f5f9',
                                  color: selectedCat === cat ? '#ffffff' : '#334155',
                                  border: 'none',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: isSubmitted ? 'default' : 'pointer'
                                }}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                          {isSubmitted && !isCorrect && (
                            <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.5rem', fontWeight: 700 }}>
                              Correct Category: {item.category}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <button
                      onClick={checkFishbone}
                      style={{
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      Check Categorization
                    </button>
                    {fishboneScore !== null && (
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: fishboneScore >= 6 ? '#166534' : '#b91c1c' }}>
                        Score: {fishboneScore} / 8 Correct {fishboneScore >= 6 ? '🎉 Great Job!' : '⚠️ Review mistakes'}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 2
                  </button>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 4: Cause Prioritization <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECTION 4 - CAUSE PRIORITIZATION */}
          {currentTab === 'section4' && (
            <motion.div
              key="section4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Triage & Investigation Ranking
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section4RootCausePrioritization.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section4RootCausePrioritization.introduction}
                </p>

                {/* PRIORITIZATION CRITERIA */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The 6 Dimensions of the Analytical Prioritization Matrix
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                  {section4RootCausePrioritization.prioritizationCriteria.map((crit, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {crit.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.4 }}>
                        {crit.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE PRIORITIZATION CALCULATOR */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <Sliders size={18} /> Interactive Tool: Composite Priority Index (PI) Simulator
                  </div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>
                    Test How Multi-Variable Weighting Ranks a Candidate Cause
                  </h3>
                  <div style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    Formula: <code>PI = (Impact × 0.30) + (Frequency × 0.25) + (Risk of Inaction × 0.20) + (Evidence × 0.15) + (Ease of Testing × 0.10)</code>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Impact (1–5): <strong>{calcImpact}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={calcImpact}
                        onChange={(e) => setCalcImpact(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Frequency (1–5): <strong>{calcFrequency}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={calcFrequency}
                        onChange={(e) => setCalcFrequency(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Inaction Risk (1–5): <strong>{calcRisk}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={calcRisk}
                        onChange={(e) => setCalcRisk(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Evidence (1–5): <strong>{calcEvidence}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={calcEvidence}
                        onChange={(e) => setCalcEvidence(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Ease of Test (1–5): <strong>{calcEase}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={calcEase}
                        onChange={(e) => setCalcEase(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Resulting Priority Index:</div>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8' }}>
                        {computedPriorityIndex} / 5.00
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Analytical Recommendation:</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: parseFloat(computedPriorityIndex) >= 4.0 ? '#86efac' : parseFloat(computedPriorityIndex) >= 3.0 ? '#fde047' : '#fca5a5' }}>
                        {parseFloat(computedPriorityIndex) >= 4.0
                          ? '🔥 TIER 1: Investigate and Validate Immediately'
                          : parseFloat(computedPriorityIndex) >= 3.0
                            ? '⚡ TIER 2: Secondary Investigation Queue'
                            : '💤 TIER 3: Low-Priority / Log for Future Monitoring'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 WORKED TRIAGE EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Worked Prioritization & Triage Case Studies
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section4RootCausePrioritization.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        PRIORITIZATION CASE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                        <strong>Problem Context:</strong> {ex.problem}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {ex.candidates.map((cand, cIdx) => (
                          <div key={cIdx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{cand.cause}</span>
                              <span style={{
                                background: cand.compositeScore >= 4.0 ? '#dcfce7' : cand.compositeScore >= 3.0 ? '#fef3c7' : '#f1f5f9',
                                color: cand.compositeScore >= 4.0 ? '#166534' : cand.compositeScore >= 3.0 ? '#92400e' : '#475569',
                                fontWeight: 800,
                                fontSize: '0.8rem',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '6px'
                              }}>
                                Priority Index: {cand.compositeScore.toFixed(2)}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '0.35rem' }}>
                              <strong>Analytical Rationale:</strong> {cand.rationale}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700 }}>
                              ↳ Next Action: {cand.action}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section3')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 3
                  </button>
                  <button
                    onClick={() => handleTabChange('section5')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 5: Strategic Solving <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SECTION 5 - STRATEGIC PROBLEM SOLVING */}
          {currentTab === 'section5' && (
            <motion.div
              key="section5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Solution Architecture
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section5StrategicProblemSolving.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section5StrategicProblemSolving.introduction}
                </p>

                {/* 10-STEP PROCESS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The 10-Step Repeatable Strategic Problem-Solving Process
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section5StrategicProblemSolving.tenStepProcess.map((step, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                        {step.step}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.4 }}>
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 WORKED STRATEGIC EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Realistic Strategic Problem-Solving Case Studies
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section5StrategicProblemSolving.workedStrategicExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        STRATEGIC CASE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
                        {ex.title}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ color: '#0284c7', fontSize: '0.8rem', textTransform: 'uppercase' }}>Target Future State:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#0f172a', marginTop: '0.2rem' }}>{ex.desiredState}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ color: '#dc2626', fontSize: '0.8rem', textTransform: 'uppercase' }}>Current Baseline Reality:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#0f172a', marginTop: '0.2rem' }}>{ex.currentReality}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ color: '#b45309', fontSize: '0.8rem', textTransform: 'uppercase' }}>Quantified Gap:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700, marginTop: '0.2rem' }}>{ex.gap}</div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        {ex.solutionsCompared.map((sol, sIdx) => (
                          <div key={sIdx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                              {sol.name}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#166534', marginBottom: '0.35rem' }}>
                              ✅ <strong>Benefits:</strong> {sol.pros}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#991b1b', marginBottom: '0.35rem' }}>
                              ⚠️ <strong>Trade-offs & Risks:</strong> {sol.cons}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#475569', background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                              Classification: {sol.reversibility}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Selected Strategic Decision & Rationale:
                        </div>
                        <div style={{ fontSize: '0.88rem', color: '#065f46', lineHeight: 1.45 }}>
                          {ex.selectedStrategy}
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.82rem', color: '#475569' }}>
                        📅 <strong>Implementation Milestones:</strong> {ex.implementationMilestones}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section4')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 4
                  </button>
                  <button
                    onClick={() => handleTabChange('section6')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 6: Decision Trees & EV <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: SECTION 6 - DECISION TREES & EXPECTED VALUE */}
          {currentTab === 'section6' && (
            <motion.div
              key="section6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Quantitative Risk Modeling
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section6DecisionTreesAndExpectedValue.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section6DecisionTreesAndExpectedValue.introduction}
                </p>

                {/* ANATOMY & BACKWARD INDUCTION */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. Decision Tree Anatomy & The 4 Backward Induction Rules
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                  {section6DecisionTreesAndExpectedValue.anatomy.map((item, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                        {item.symbol} {item.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section6DecisionTreesAndExpectedValue.backwardInductionRules.map((r, idx) => (
                    <div key={idx} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        {r.rule}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#0c4a6e', lineHeight: 1.35 }}>
                        {r.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE EXPECTED VALUE CALCULATOR */}
                <div style={{
                  background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e0f2fe', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <Calculator size={18} /> Interactive Tool: Single-Stage Chance Node EV Calculator
                  </div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>
                    Calculate Net Expected Monetary Value (EMV) in Real Time
                  </h3>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    Formula: <code>Net EV = [P(Success) × Payoff(Success) + P(Failure) × Payoff(Failure)] - Initial Cost</code>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        P(Success): <strong>{(evProbSuccess * 100).toFixed(0)}%</strong> | P(Failure): <strong>{(probFailure * 100).toFixed(0)}%</strong>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={evProbSuccess}
                        onChange={(e) => setEvProbSuccess(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Success Gross Payoff (₹):
                      </label>
                      <input
                        type="number"
                        step="5000"
                        value={evPayoffSuccess}
                        onChange={(e) => setEvPayoffSuccess(parseFloat(e.target.value) || 0)}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: 'none', color: '#0f172a', fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Failure Gross Payoff (₹):
                      </label>
                      <input
                        type="number"
                        step="5000"
                        value={evPayoffFailure}
                        onChange={(e) => setEvPayoffFailure(parseFloat(e.target.value) || 0)}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: 'none', color: '#0f172a', fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', opacity: 0.9, display: 'block', marginBottom: '0.3rem' }}>
                        Upfront Cost (₹):
                      </label>
                      <input
                        type="number"
                        step="1000"
                        value={evInitialCost}
                        onChange={(e) => setEvInitialCost(parseFloat(e.target.value) || 0)}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: 'none', color: '#0f172a', fontWeight: 700 }}
                      />
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '1.25rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Calculated Net Expected Value (EMV):</div>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: netEV >= 0 ? '#86efac' : '#fca5a5' }}>
                        {netEV >= 0 ? `+₹${netEV.toLocaleString('en-IN')}` : `-₹${Math.abs(netEV).toLocaleString('en-IN')}`}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Risk Viability:</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                        {netEV > 0 ? '✅ Mathematically Favorable (Positive EV)' : '❌ Mathematically Unfavorable (Negative EV)'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 WORKED DECISION TREE EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Solved Decision Tree Master Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section6DecisionTreesAndExpectedValue.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        DECISION TREE CASE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                        <strong>Scenario:</strong> {ex.scenario}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        {ex.branches.map((b, bIdx) => (
                          <div key={bIdx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                              Branch {bIdx + 1}: {b.choice}
                            </div>
                            {b.outcomes && (
                              <div style={{ fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                                {b.outcomes.map((out, oIdx) => (
                                  <div key={oIdx} style={{ color: '#334155', marginBottom: '0.25rem' }}>
                                    • {out.event}
                                  </div>
                                ))}
                              </div>
                            )}
                            <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#0f172a', whiteSpace: 'pre-wrap' }}>
                              {b.calculation}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', fontSize: '0.88rem', color: '#065f46', lineHeight: 1.45 }}>
                        ⚖️ <strong>Decision Synthesis:</strong> {ex.decisionSynthesis}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section5')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 5
                  </button>
                  <button
                    onClick={() => handleTabChange('practice')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 7: Practice Sets <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: SECTION 7 - PRACTICE SETS */}
          {currentTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Interactive Validation
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section7PracticeSets.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {section7PracticeSets.introduction}
                </p>

                {/* PRACTICE SET SELECTOR */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'setA', label: 'Set A: Root Cause Analysis (5 Qs)' },
                    { id: 'setB', label: 'Set B: Cause & Prioritization (5 Qs)' },
                    { id: 'setC', label: 'Set C: Decisions & Trees (5 Qs)' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setPracticeActiveSet(s.id)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: practiceActiveSet === s.id ? '#0284c7' : '#f1f5f9',
                        color: practiceActiveSet === s.id ? '#ffffff' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SET QUESTIONS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {section7PracticeSets[practiceActiveSet].questions.map((q, qIdx) => {
                    const isSubmitted = practiceSubmitted[q.id];
                    const selectedOpt = practiceAnswers[q.id];
                    const isCorrect = isSubmitted && selectedOpt === q.correct;

                    return (
                      <div
                        key={q.id}
                        style={{
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '12px',
                          padding: '1.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                            QUESTION {qIdx + 1} OF 5
                          </span>
                          {isSubmitted && (
                            <span style={{
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              color: isCorrect ? '#166534' : '#991b1b',
                              background: isCorrect ? '#dcfce7' : '#fee2e2',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px'
                            }}>
                              {isCorrect ? 'CORRECT' : 'INCORRECT'}
                            </span>
                          )}
                        </div>

                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem 0', lineHeight: 1.45 }}>
                          {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                          {q.options.map((opt, oIdx) => {
                            let btnBg = '#ffffff';
                            let borderCol = '#cbd5e1';
                            let textCol = '#0f172a';

                            if (selectedOpt === oIdx) {
                              btnBg = '#e0f2fe';
                              borderCol = '#0284c7';
                              textCol = '#0369a1';
                            }
                            if (isSubmitted) {
                              if (oIdx === q.correct) {
                                btnBg = '#dcfce7';
                                borderCol = '#16a34a';
                                textCol = '#166534';
                              } else if (selectedOpt === oIdx) {
                                btnBg = '#fee2e2';
                                borderCol = '#dc2626';
                                textCol = '#991b1b';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handlePracticeSelect(q.id, oIdx)}
                                style={{
                                  background: btnBg,
                                  border: `1.5px solid ${borderCol}`,
                                  color: textCol,
                                  borderRadius: '8px',
                                  padding: '0.75rem 1rem',
                                  textAlign: 'left',
                                  fontSize: '0.88rem',
                                  fontWeight: selectedOpt === oIdx ? 700 : 500,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  transition: 'all 0.15s'
                                }}
                              >
                                <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={selectedOpt === undefined}
                            onClick={() => handlePracticeSubmit(q.id)}
                            style={{
                              background: selectedOpt !== undefined ? '#0284c7' : '#94a3b8',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.6rem 1.5rem',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              cursor: selectedOpt !== undefined ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{
                              background: isCorrect ? '#ecfdf5' : '#fef2f2',
                              border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                              borderRadius: '8px',
                              padding: '1rem',
                              fontSize: '0.88rem',
                              color: isCorrect ? '#065f46' : '#991b1b',
                              lineHeight: 1.45
                            }}>
                              <div style={{ fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                {isCorrect ? 'Step-by-Step Proof' : 'Explanation & Diagnostic Reason'}
                              </div>
                              {q.explanation}
                            </div>
                            <div>
                              <button
                                onClick={() => handlePracticeRetry(q.id)}
                                style={{
                                  background: '#f1f5f9',
                                  color: '#475569',
                                  border: '1px solid #cbd5e1',
                                  padding: '0.45rem 1rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem'
                                }}
                              >
                                <RotateCcw size={14} /> Retry Question
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('section6')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 6
                  </button>
                  <button
                    onClick={() => handleTabChange('challenge')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 8: Real-World Challenge <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: SECTION 8 - REAL-WORLD CHALLENGE */}
          {currentTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Case Study Challenge
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
                  {section8RealWorldChallenge.title}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  {section8RealWorldChallenge.disclaimer}
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.75rem', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                  {section8RealWorldChallenge.background}
                </div>

                {/* STARTING METRICS TABLE */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                  1. Baseline Operational Telemetry (60-Day Campaign)
                </h3>
                <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Channel Source</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Enquiries</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Admissions</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Conversion Rate</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Avg Response Latency</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Operational Observations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section8RealWorldChallenge.fictionalEvidenceLog.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{row.source}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{row.enquiries}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#166534', fontWeight: 700 }}>{row.admissions}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#0284c7', fontWeight: 800 }}>{row.convRate}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#dc2626', fontWeight: 700 }}>{row.avgFirstResponse}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.8rem' }}>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* INTERACTIVE WORKBENCH */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                  2. Student Strategic RCA Workbench
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Formulate your root cause hypotheses, 5 Whys chain, and strategic countermeasure in the interactive workspace below. Then compare your reasoning against Alpha Fly’s verified model solution.
                </p>

                <textarea
                  rows={6}
                  value={challengeUserText}
                  onChange={(e) => setChallengeUserText(e.target.value)}
                  placeholder="Draft your 10-step investigation notes here (e.g., Conversion calculations, 5 Whys chain for the 38-hour social media delay, Fishbone categories, and recommended API automation action plan)..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    marginBottom: '1rem',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <button
                    onClick={() => setChallengeShowSolution(prev => !prev)}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.65rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {challengeShowSolution ? 'Hide Model Solution' : 'Check Solution & Model Report'}
                  </button>
                </div>

                {challengeShowSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ background: '#f8fafc', border: '1.5px solid #0284c7', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      <CheckCircle2 size={18} /> Official Alpha Fly Institutional Model Solution
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {section8RealWorldChallenge.tenStepInvestigationTasks.map((t) => (
                        <div key={t.step} style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            Step {t.step}: {t.task}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.45 }}>
                            {t.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => handleTabChange('practice')}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Section 7
                  </button>
                  <button
                    onClick={() => handleTabChange('assessment')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 9: Final Assessment <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 9: SECTION 9 - FINAL ASSESSMENT */}
          {currentTab === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Timed Certification Assessment
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {section9FinalAssessment.title}
                    </h2>
                  </div>

                  {/* TIMER DISPLAY */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: assessTimeRemaining < 300 ? '#fef2f2' : '#f0f9ff',
                    border: `1.5px solid ${assessTimeRemaining < 300 ? '#dc2626' : '#0284c7'}`,
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px'
                  }}>
                    <Clock size={20} color={assessTimeRemaining < 300 ? '#dc2626' : '#0284c7'} />
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: assessTimeRemaining < 300 ? '#dc2626' : '#0284c7', textTransform: 'uppercase' }}>
                        Time Remaining
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: assessTimeRemaining < 300 ? '#dc2626' : '#0284c7', fontFamily: 'monospace' }}>
                        {formatTime(assessTimeRemaining)}
                      </div>
                    </div>
                  </div>
                </div>

                {!assessTimerActive && !assessSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Award size={64} style={{ color: '#0284c7', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                      Ready to Start the Final Assessment?
                    </h3>
                    <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 1.75rem auto', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      This assessment contains 20 multiple-choice questions covering all 5 core analytical domains with a strict 25-minute timer. A passing score of 15/20 (75%) certifies your mastery of Root Cause Analysis & Decision Trees.
                    </p>
                    <button
                      onClick={handleStartAssessment}
                      style={{
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.85rem 2.25rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
                      }}
                    >
                      Start 25-Minute Assessment Now
                    </button>
                  </div>
                ) : !assessSubmitted ? (
                  <div>
                    {/* QUESTION PROGRESS PALETTE */}
                    <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
                      {section9FinalAssessment.questions.map((q, idx) => {
                        const isAnswered = assessAnswers[q.id] !== undefined;
                        const isCurrent = currentAssessQIdx === idx;
                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentAssessQIdx(idx)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              border: isCurrent ? '2px solid #0284c7' : '1px solid #cbd5e1',
                              background: isAnswered ? '#0284c7' : '#ffffff',
                              color: isAnswered ? '#ffffff' : '#475569',
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* CURRENT QUESTION CARD */}
                    {(() => {
                      const q = section9FinalAssessment.questions[currentAssessQIdx];
                      const selectedOpt = assessAnswers[q.id];

                      return (
                        <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                              QUESTION {currentAssessQIdx + 1} OF 20 • DOMAIN: {q.domain}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              Answered: {Object.keys(assessAnswers).length}/20
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem 0', lineHeight: 1.45 }}>
                            {q.question}
                          </h3>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleAssessSelect(q.id, oIdx)}
                                  style={{
                                    background: isSelected ? '#e0f2fe' : '#ffffff',
                                    border: `1.5px solid ${isSelected ? '#0284c7' : '#cbd5e1'}`,
                                    color: isSelected ? '#0369a1' : '#0f172a',
                                    borderRadius: '8px',
                                    padding: '0.85rem 1rem',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  <span style={{ fontWeight: 800 }}>{getLetter(oIdx)}.</span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                              disabled={currentAssessQIdx === 0}
                              onClick={() => setCurrentAssessQIdx(prev => prev - 1)}
                              style={{
                                background: '#f1f5f9',
                                color: currentAssessQIdx === 0 ? '#94a3b8' : '#475569',
                                border: 'none',
                                padding: '0.6rem 1.25rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: currentAssessQIdx === 0 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              ← Previous
                            </button>

                            {currentAssessQIdx < 19 ? (
                              <button
                                onClick={() => setCurrentAssessQIdx(prev => prev + 1)}
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
                                Next →
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you ready to submit your assessment for scoring?")) {
                                    calculateAndSaveScore();
                                  }
                                }}
                                style={{
                                  background: '#16a34a',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1.75rem',
                                  borderRadius: '8px',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                Finalize & Submit Test
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* POST-ASSESSMENT RESULTS VIEW */
                  <div>
                    <div style={{
                      background: savedProgress.assessmentPassed ? '#f0fdf4' : '#fef2f2',
                      border: `1.5px solid ${savedProgress.assessmentPassed ? '#86efac' : '#fca5a5'}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ fontSize: '3rem', fontWeight: 900, color: savedProgress.assessmentPassed ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                        {savedProgress.assessmentScore} / 20
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: savedProgress.assessmentPassed ? '#166534' : '#991b1b', marginBottom: '0.5rem' }}>
                        Score: {savedProgress.assessmentPercentage}% — {savedProgress.assessmentPassed ? 'PASSED 🎉' : 'RETAKE RECOMMENDED'}
                      </div>
                      <p style={{ margin: '0 auto 1.25rem auto', maxWidth: '600px', fontSize: '0.9rem', color: savedProgress.assessmentPassed ? '#14532d' : '#7f1d1d' }}>
                        {section9FinalAssessment.rubric.find(r => {
                          const [min, max] = r.range.split('–').map(n => parseInt(n, 10));
                          return savedProgress.assessmentScore >= min && savedProgress.assessmentScore <= max;
                        })?.desc}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={handleRetakeAssessment}
                          style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            border: '1.5px solid #cbd5e1',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <RotateCcw size={16} /> Retake Assessment
                        </button>
                        <button
                          onClick={() => handleTabChange('summary')}
                          style={{
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                          }}
                        >
                          View Quick Revision & Drills →
                        </button>
                      </div>
                    </div>

                    {/* COMPREHENSIVE REVIEW LIST */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                      Detailed Question-by-Question Diagnostic Review
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {section9FinalAssessment.questions.map((q, idx) => {
                        const userAns = assessAnswers[q.id];
                        const isCorrect = userAns === q.correct;

                        return (
                          <div
                            key={q.id}
                            style={{
                              background: '#ffffff',
                              border: `1.5px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                              borderRadius: '10px',
                              padding: '1.25rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                                #{idx + 1} • {q.domain}
                              </span>
                              <span style={{ fontWeight: 800, fontSize: '0.78rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                                {isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                              {q.question}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.25rem' }}>
                              Your Answer: <strong>{userAns !== undefined ? `${getLetter(userAns)}. ${q.options[userAns]}` : 'Unanswered'}</strong>
                            </div>
                            {!isCorrect && (
                              <div style={{ fontSize: '0.85rem', color: '#166534', marginBottom: '0.5rem', fontWeight: 700 }}>
                                Correct Answer: {getLetter(q.correct)}. {q.options[q.correct]}
                              </div>
                            )}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                              💡 <strong>Diagnostic Explanation:</strong> {q.explanation}
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

          {/* TAB 10: SECTION 10 - REVISION & DRILLS */}
          {currentTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Executive Summary & Printable Reference
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                      {section10RevisionAndDrills.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => window.print()}
                    style={{
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.6rem 1.25rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={16} /> Print Revision Sheet
                  </button>
                </div>

                {/* SUMMARY BULLETS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. Core Tenets of Advanced Problem-Solving & Decision Trees
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section10RevisionAndDrills.summaryPoints.map((pt, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #0284c7', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                        {pt.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                        {pt.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 RAPID-FIRE QUESTIONS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Rapid-Fire Cognitive Drills (Click to Reveal Answers)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section10RevisionAndDrills.rapidFireQuestions.map((rf, idx) => {
                    const isRevealed = revealedRapidFire[rf.id];
                    return (
                      <div
                        key={rf.id}
                        onClick={() => toggleRapidFire(rf.id)}
                        style={{
                          background: isRevealed ? '#f0fdf4' : '#f8fafc',
                          border: `1.5px solid ${isRevealed ? '#86efac' : '#cbd5e1'}`,
                          borderRadius: '10px',
                          padding: '1.25rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                            Drill #{idx + 1}: {rf.question}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                            {isRevealed ? '▲ Hide Answer' : '▼ Click to Reveal'}
                          </span>
                        </div>
                        {isRevealed && (
                          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0', fontSize: '0.88rem' }}>
                            <div style={{ fontWeight: 900, color: '#166534', marginBottom: '0.25rem' }}>
                              Answer: {rf.answer}
                            </div>
                            <div style={{ color: '#14532d', fontSize: '0.82rem', lineHeight: 1.4 }}>
                              {rf.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* COURSE COMPLETION BANNER */}
                <div style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: '#ffffff',
                  textAlign: 'center',
                  boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)'
                }}>
                  <Award size={48} style={{ color: '#ffffff', marginBottom: '0.75rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
                    Congratulations on Completing Level 3 Day 8!
                  </h3>
                  <p style={{ margin: '0 auto 1.5rem auto', maxWidth: '650px', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
                    You have mastered advanced Root Cause Analysis, 5 Whys evidentiary tracing, Ishikawa Fishbone structures, strategic solution trade-offs, and backward induction Decision Trees with Expected Monetary Value calculations.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
                          onNavigate('spoko_reasoning_l3_d20', 'overview');
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
                      Next: Day 20 (Level 3 Day 9) →
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
