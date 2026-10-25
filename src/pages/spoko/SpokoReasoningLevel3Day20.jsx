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
  day20Overview,
  section1Fundamentals,
  section2Transformations,
  section3ShapeAndShading,
  section4MatrixReasoning,
  section5OddFigureOut,
  section6CombinedPatterns,
  section7PracticeSets,
  section8VisualChallenge,
  section9FinalAssessment,
  section10RevisionAndDrills
} from '../../data/reasoningLevel3Day20.js';

const getLetter = (val) => {
  if (typeof val === 'number') return ['A', 'B', 'C', 'D', 'E'][val];
  if (typeof val === 'string') return val.trim().toUpperCase()[0];
  return null;
};

const isAnswerCorrect = (userVal, correctVal) => {
  if (userVal === undefined || userVal === null) return false;
  return getLetter(userVal) === getLetter(correctVal);
};

// CRISP GEOMETRIC SVG RENDERER FOR SHAPES & SYMBOLS
const VisualShape = ({ type = 'circle', size = 48, rotation = 0, fill = 'white', stroke = '#0284c7', strokeWidth = 2, mirrorH = false, mirrorV = false, dot = false }) => {
  const transform = `rotate(${rotation} 25 25) ${mirrorH ? 'scale(-1, 1) translate(-50, 0)' : ''} ${mirrorV ? 'scale(1, -1) translate(0, -50)' : ''}`;
  
  let fillCol = '#ffffff';
  let patternId = null;
  if (fill === 'black') fillCol = '#0f172a';
  if (fill === 'gray') fillCol = '#94a3b8';
  if (fill === 'striped') fillCol = 'url(#diagonalHatch)';

  return (
    <svg width={size} height={size} viewBox="0 0 50 50" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <defs>
        <pattern id="diagonalHatch" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#0284c7" strokeWidth="1" />
        </pattern>
      </defs>
      <g transform={transform}>
        {type === 'triangle' && (
          <polygon points="25,7 43,40 7,40" fill={fillCol} stroke={stroke} strokeWidth={strokeWidth} />
        )}
        {type === 'square' && (
          <rect x="8" y="8" width="34" height="34" fill={fillCol} stroke={stroke} strokeWidth={strokeWidth} rx="2" />
        )}
        {type === 'circle' && (
          <circle cx="25" cy="25" r="18" fill={fillCol} stroke={stroke} strokeWidth={strokeWidth} />
        )}
        {type === 'pentagon' && (
          <polygon points="25,6 44,20 37,42 13,42 6,20" fill={fillCol} stroke={stroke} strokeWidth={strokeWidth} />
        )}
        {type === 'hexagon' && (
          <polygon points="25,6 42,16 42,34 25,44 8,34 8,16" fill={fillCol} stroke={stroke} strokeWidth={strokeWidth} />
        )}
        {type === 'arrow' && (
          <g fill={fillCol} stroke={stroke} strokeWidth={strokeWidth}>
            <line x1="25" y1="42" x2="25" y2="10" stroke={stroke} strokeWidth={strokeWidth + 1} />
            <polygon points="25,6 17,18 33,18" fill={stroke} />
          </g>
        )}
        {type === 'letterF' && (
          <g stroke={stroke} strokeWidth={strokeWidth + 2} strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="16" y1="8" x2="16" y2="42" />
            <line x1="16" y1="8" x2="36" y2="8" />
            <line x1="16" y1="23" x2="30" y2="23" />
          </g>
        )}
        {dot && (
          <circle cx="25" cy="16" r="3.5" fill="#dc2626" />
        )}
      </g>
    </svg>
  );
};

export default function SpokoReasoningLevel3Day20({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_l3_d20_progress_${userKey}`;

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
      console.error("Failed to save Level 3 Day 20 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l3_d20:day20';
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
      onNavigate('spoko_reasoning_l3_d20', tabId);
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

  // Section 2: Interactive Rotation & Reflection Simulator
  const [simShape, setSimShape] = useState('arrow');
  const [simAngle, setSimAngle] = useState(0);
  const [simMirrorH, setSimMirrorH] = useState(false);
  const [simMirrorV, setSimMirrorV] = useState(false);

  const rotateCW = (deg) => setSimAngle(prev => (prev + deg) % 360);
  const rotateCCW = (deg) => setSimAngle(prev => (prev - deg + 360) % 360);
  const toggleMirrorH = () => setSimMirrorH(prev => !prev);
  const toggleMirrorV = () => setSimMirrorV(prev => !prev);
  const resetSim = () => {
    setSimAngle(0);
    setSimMirrorH(false);
    setSimMirrorV(false);
  };

  // Section 4: Interactive Matrix Solver
  const [activeMatrixTab, setActiveMatrixTab] = useState(0);

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
    { id: 'section1', label: '1. Fundamentals', icon: <Eye size={16} /> },
    { id: 'section2', label: '2. Rotation & Reflection', icon: <RefreshCw size={16} /> },
    { id: 'section3', label: '3. Shape & Shading', icon: <Layers size={16} /> },
    { id: 'section4', label: '4. Matrix Reasoning', icon: <Table size={16} /> },
    { id: 'section5', label: '5. Odd Figure Out', icon: <Filter size={16} /> },
    { id: 'section6', label: '6. Combined Patterns', icon: <Sparkles size={16} /> },
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
              Level 3 – Advanced Day 9: Advanced Pattern Recognition, Abstract Reasoning & Non-Verbal Logic
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', maxWidth: '850px', lineHeight: 1.5 }}>
              Master spatial rotation, bilateral reflection, shape-count progressions, 2×2 and 3×3 visual matrices, geometric XOR subtraction, and multi-layer non-verbal problem solving.
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
                      {day20Overview.title}
                    </h2>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                    <div><strong>Duration:</strong> {day20Overview.duration}</div>
                    <div><strong>Difficulty:</strong> <span style={{ color: '#dc2626', fontWeight: 700 }}>{day20Overview.difficulty}</span></div>
                    <div><strong>Prerequisite:</strong> {day20Overview.prerequisite}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                  🎯 Comprehensive Learning Objectives
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '0.85rem' }}>
                  {day20Overview.learningObjectives.map((obj, i) => (
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
                    💡 Core Principle of Non-Verbal Deductive Reasoning
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d', lineHeight: 1.5 }}>
                    "Never treat a visual problem as a single static picture. Treat it as a multi-layered equation where each layer—geometry, vertex count, angular displacement, fill state, and spatial position—evolves according to its own mathematically rigorous function. When you decouple the layers, the answer becomes obvious and unshakeable."
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
                    Start Section 1: Fundamentals <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: SECTION 1 - FUNDAMENTALS */}
          {currentTab === 'section1' && (
            <motion.div
              key="section1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Foundation & Taxonomy
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section1Fundamentals.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section1Fundamentals.introduction}
                </p>

                {/* THE 7 CORE VISUAL PROPERTIES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The Seven Atomic Properties of Visual Figures
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section1Fundamentals.coreProperties.map((prop, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {prop.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {prop.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* THE 6-STEP METHOD */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. The 6-Step Systematic Non-Verbal Deductive Protocol
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section1Fundamentals.systematicMethod.map((m, idx) => (
                    <div key={idx} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                        {m.step}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#0c4a6e', lineHeight: 1.4 }}>
                        {m.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 WARM-UP QUESTIONS */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  3. Diagnostic Warm-Up Drills
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section1Fundamentals.warmupQuestions.map((q, idx) => {
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
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Overview
                  </button>
                  <button
                    onClick={() => handleTabChange('section2')}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Section 2: Rotation & Reflection <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECTION 2 - ROTATION, REFLECTION & ORIENTATION */}
          {currentTab === 'section2' && (
            <motion.div
              key="section2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Transformational Geometry
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section2Transformations.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section2Transformations.introduction}
                </p>

                {/* INTERACTIVE ROTATION & REFLECTION SIMULATOR */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <RefreshCw size={18} /> Interactive Laboratory: 2D Spatial Transformation Simulator
                  </div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>
                    Experiment with Angular Rotation vs. Vertical/Horizontal Reflection
                  </h3>

                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {/* SVG CANVAS PREVIEW */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '2px dashed rgba(56, 189, 248, 0.4)',
                      borderRadius: '16px',
                      width: '140px',
                      height: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <VisualShape
                        type={simShape}
                        size={100}
                        rotation={simAngle}
                        mirrorH={simMirrorH}
                        mirrorV={simMirrorV}
                        stroke="#38bdf8"
                        strokeWidth={2.5}
                        fill="rgba(56, 189, 248, 0.2)"
                      />
                    </div>

                    {/* TELEMETRY & CONTROLS */}
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', opacity: 0.75, display: 'block' }}>Angle:</span>
                          <strong style={{ fontSize: '1.2rem', color: '#38bdf8' }}>{simAngle}°</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', opacity: 0.75, display: 'block' }}>Vertical Mirror (Y-axis):</span>
                          <strong style={{ fontSize: '1rem', color: simMirrorH ? '#86efac' : '#94a3b8' }}>{simMirrorH ? 'ON (Flipped)' : 'OFF'}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', opacity: 0.75, display: 'block' }}>Horizontal Mirror (X-axis):</span>
                          <strong style={{ fontSize: '1rem', color: simMirrorV ? '#86efac' : '#94a3b8' }}>{simMirrorV ? 'ON (Flipped)' : 'OFF'}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', opacity: 0.75, display: 'block' }}>Chirality (Handedness):</span>
                          <strong style={{ fontSize: '1rem', color: (simMirrorH !== simMirrorV) ? '#fca5a5' : '#86efac' }}>
                            {(simMirrorH !== simMirrorV) ? 'Inverted (Improper Motion)' : 'Preserved (Proper Rigid Motion)'}
                          </strong>
                        </div>
                      </div>

                      {/* BUTTON CONTROLS */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => rotateCW(45)}
                          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          +45° CW
                        </button>
                        <button
                          onClick={() => rotateCW(90)}
                          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          +90° CW
                        </button>
                        <button
                          onClick={() => rotateCW(180)}
                          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          180° Turn
                        </button>
                        <button
                          onClick={toggleMirrorH}
                          style={{ background: simMirrorH ? '#0284c7' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Flip Mirror (V)
                        </button>
                        <button
                          onClick={toggleMirrorV}
                          style={{ background: simMirrorV ? '#0284c7' : 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Flip Water (H)
                        </button>
                        <button
                          onClick={resetSim}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Reset
                        </button>
                      </div>

                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Test Shape:</span>
                        {['arrow', 'letterF', 'triangle', 'pentagon'].map(s => (
                          <button
                            key={s}
                            onClick={() => setSimShape(s)}
                            style={{
                              background: simShape === s ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                              color: simShape === s ? '#0f172a' : '#fff',
                              border: 'none',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6 WORKED EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Six Solved Spatial Transformation Master Examples
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section2Transformations.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        WORKED EXAMPLE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {ex.problem}
                      </p>
                      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0369a1', fontWeight: 700, marginBottom: '1rem' }}>
                        Rule: {ex.rule}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          Step-by-Step Spatial Progression:
                        </div>
                        {ex.steps.map((st, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#0284c7', fontWeight: 800 }}>•</span> {st}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {ex.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              background: oIdx === ex.correct ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${oIdx === ex.correct ? '#16a34a' : '#e2e8f0'}`,
                              padding: '0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              color: oIdx === ex.correct ? '#166534' : '#475569',
                              fontWeight: oIdx === ex.correct ? 700 : 500
                            }}
                          >
                            <strong>{getLetter(oIdx)}.</strong> {opt} {oIdx === ex.correct && '✅'}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                        💡 <strong>Analytical Reason:</strong> {ex.explanation}
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
                    Section 3: Shape & Shading <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SECTION 3 - SHAPE, COUNT & SHADING */}
          {currentTab === 'section3' && (
            <motion.div
              key="section3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Cardinality & Fill Invariants
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section3ShapeAndShading.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section3ShapeAndShading.introduction}
                </p>

                {/* RULES OVERVIEW */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. Numerical and Shading Progression Categories
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {section3ShapeAndShading.rulesOverview.map((r, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {r.type}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {r.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6 WORKED EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Six Solved Shape, Count & Shading Master Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section3ShapeAndShading.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        WORKED EXAMPLE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {ex.problem}
                      </p>
                      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0369a1', fontWeight: 700, marginBottom: '1rem' }}>
                        Governing Rule: {ex.rule}
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          Step-by-Step Analytical Proof:
                        </div>
                        {ex.steps.map((st, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#0284c7', fontWeight: 800 }}>↳</span> {st}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {ex.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              background: oIdx === ex.correct ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${oIdx === ex.correct ? '#16a34a' : '#e2e8f0'}`,
                              padding: '0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              color: oIdx === ex.correct ? '#166534' : '#475569',
                              fontWeight: oIdx === ex.correct ? 700 : 500
                            }}
                          >
                            <strong>{getLetter(oIdx)}.</strong> {opt} {oIdx === ex.correct && '✅'}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                        💡 <strong>Analytical Reason:</strong> {ex.explanation}
                      </div>
                    </div>
                  ))}
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
                    Section 4: Matrix Reasoning <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SECTION 4 - MATRIX REASONING */}
          {currentTab === 'section4' && (
            <motion.div
              key="section4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Two-Dimensional Deductive Systems
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section4MatrixReasoning.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section4MatrixReasoning.introduction}
                </p>

                {/* MATRIX RULE TAXONOMY */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The 5 Universal Matrix Transformation Classes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section4MatrixReasoning.matrixRuleTaxonomy.map((tax, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {tax.rule}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {tax.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6 WORKED MATRIX CASES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Six Solved Matrix Master Problems
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
                  {section4MatrixReasoning.workedExamples.map((mat, idx) => (
                    <div key={mat.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                          MATRIX {idx + 1} • {mat.type}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                        {mat.title}
                      </h4>

                      {/* VISUAL MATRIX GRID */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${mat.grid[0].length}, 1fr)`,
                        gap: '0.5rem',
                        maxWidth: '550px',
                        margin: '0 auto 1.5rem auto',
                        background: '#e2e8f0',
                        padding: '0.5rem',
                        borderRadius: '12px'
                      }}>
                        {mat.grid.map((row, rIdx) => (
                          <React.Fragment key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <div
                                key={cIdx}
                                style={{
                                  background: cell === '?' ? '#fef3c7' : '#ffffff',
                                  border: cell === '?' ? '2px dashed #d97706' : '1px solid #cbd5e1',
                                  borderRadius: '8px',
                                  padding: '1rem 0.5rem',
                                  textAlign: 'center',
                                  fontSize: cell === '?' ? '1.5rem' : '0.85rem',
                                  fontWeight: 800,
                                  color: cell === '?' ? '#b45309' : '#0f172a',
                                  minHeight: '65px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {cell}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ color: '#0284c7', fontSize: '0.8rem', textTransform: 'uppercase' }}>Horizontal Row Invariant:</strong>
                          <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{mat.rowRule}</div>
                        </div>
                        {mat.columnRule && (
                          <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#0369a1', fontSize: '0.8rem', textTransform: 'uppercase' }}>Vertical Column Invariant:</strong>
                            <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{mat.columnRule}</div>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {mat.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              background: oIdx === mat.correct ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${oIdx === mat.correct ? '#16a34a' : '#e2e8f0'}`,
                              padding: '0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              color: oIdx === mat.correct ? '#166534' : '#475569',
                              fontWeight: oIdx === mat.correct ? 700 : 500
                            }}
                          >
                            <strong>{getLetter(oIdx)}.</strong> {opt} {oIdx === mat.correct && '✅'}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                        💡 <strong>Analytical Reason:</strong> {mat.explanation}
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
                    Section 5: Odd Figure Out <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SECTION 5 - ODD FIGURE OUT */}
          {currentTab === 'section5' && (
            <motion.div
              key="section5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Classification Invariants
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section5OddFigureOut.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section5OddFigureOut.introduction}
                </p>

                {/* CLASSIFICATION CRITERIA */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The 4 Structural Invariant Categories
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section5OddFigureOut.classificationCriteria.map((crit, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {crit.category}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {crit.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 WORKED EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Solved Odd Figure Out Master Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section5OddFigureOut.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        CLASSIFICATION CASE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {ex.problem}
                      </p>
                      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0369a1', fontWeight: 700, marginBottom: '1rem' }}>
                        Distinguishing Rule: {ex.distinguishingRule}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {ex.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              background: oIdx === ex.correct ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${oIdx === ex.correct ? '#16a34a' : '#e2e8f0'}`,
                              padding: '0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              color: oIdx === ex.correct ? '#166534' : '#475569',
                              fontWeight: oIdx === ex.correct ? 700 : 500
                            }}
                          >
                            <strong>{getLetter(oIdx)}.</strong> {opt} {oIdx === ex.correct && '✅ (ODD ONE OUT)'}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                        💡 <strong>Analytical Reason:</strong> {ex.explanation}
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
                    Section 6: Combined Patterns <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: SECTION 6 - COMBINED & ADVANCED PATTERNS */}
          {currentTab === 'section6' && (
            <motion.div
              key="section6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Multi-Variable Synthesis
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 1rem 0' }}>
                  {section6CombinedPatterns.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {section6CombinedPatterns.introduction}
                </p>

                {/* MULTI-LAYER STRATEGY */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  1. The Feature-Decoupling Protocol
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {section6CombinedPatterns.multiLayerStrategy.map((strat, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {strat.step}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>
                        {strat.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5 WORKED COMBINED EXAMPLES */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  2. Five Solved Multi-Layer Master Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
                  {section6CombinedPatterns.workedExamples.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        MULTI-LAYER CASE {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                        {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.75rem' }}>
                        {ex.problem}
                      </p>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          Decoupled Layer Transformations:
                        </div>
                        {ex.ruleLayer1 && <div style={{ fontSize: '0.85rem', color: '#0284c7', marginBottom: '0.25rem' }}><strong>Layer 1:</strong> {ex.ruleLayer1}</div>}
                        {ex.ruleLayer2 && <div style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '0.25rem' }}><strong>Layer 2:</strong> {ex.ruleLayer2}</div>}
                        {ex.ruleLayer3 && <div style={{ fontSize: '0.85rem', color: '#7c3aed' }}><strong>Layer 3:</strong> {ex.ruleLayer3}</div>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {ex.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              background: oIdx === ex.correct ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${oIdx === ex.correct ? '#16a34a' : '#e2e8f0'}`,
                              padding: '0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              color: oIdx === ex.correct ? '#166534' : '#475569',
                              fontWeight: oIdx === ex.correct ? 700 : 500
                            }}
                          >
                            <strong>{getLetter(oIdx)}.</strong> {opt} {oIdx === ex.correct && '✅'}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                        💡 <strong>Analytical Reason:</strong> {ex.explanation}
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
                  Interactive Practice Workbench
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
                    { id: 'setA', label: 'Set A: Transformations (5 Qs)' },
                    { id: 'setB', label: 'Set B: Matrices & Grids (5 Qs)' },
                    { id: 'setC', label: 'Set C: Classification & Complex (5 Qs)' }
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
                  Cybersecurity Visual Authentication Simulation
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
                  {section8VisualChallenge.title}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  {section8VisualChallenge.disclaimer}
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.75rem', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                  {section8VisualChallenge.scenarioDescription}
                </div>

                {/* THE 4 STAGES SEQUENCE TABLE */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                  1. Observed Authentication Glyph States (Stages 1 through 4)
                </h3>
                <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Stage</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Outer Polygon</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Internal Symbol</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Spatial Orientation</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 800 }}>Border Style</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section8VisualChallenge.startingSequence.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#0284c7' }}>{row.stage}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{row.shape}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#166534' }}>{row.internalSymbol}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#0369a1' }}>{row.orientation}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{row.borderStyle}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#fef3c7', fontWeight: 800 }}>
                        <td style={{ padding: '0.75rem 1rem', color: '#b45309' }}>Stage 5 (Missing)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#b45309' }}>?</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#b45309' }}>?</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#b45309' }}>?</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#b45309' }}>?</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* STUDENT WORKBENCH */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                  2. Student Non-Verbal Deductive Workbench
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Analyze the 4 rules governing the sequence and draft your synthesized Stage 5 glyph parameters in the box below:
                </p>

                <textarea
                  rows={5}
                  value={challengeUserText}
                  onChange={(e) => setChallengeUserText(e.target.value)}
                  placeholder="Record your findings: (1) Vertex count progression, (2) Internal dot count & vertex positions, (3) Orientation flip rule, (4) Border line progression, and (5) Final Stage 5 Glyph specification..."
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
                      <CheckCircle2 size={18} /> Official Alpha Fly Verified Solution
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#0284c7' }}>Rule 1 (Polygon Vertices):</strong> {section8VisualChallenge.modelSolution.polygonRule}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#166534' }}>Rule 2 (Internal Dots):</strong> {section8VisualChallenge.modelSolution.dotsRule}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#0369a1' }}>Rule 3 (Spatial Orientation):</strong> {section8VisualChallenge.modelSolution.orientationRule}
                      </div>
                      <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#7c3aed' }}>Rule 4 (Border Styling):</strong> {section8VisualChallenge.modelSolution.borderRule}
                      </div>
                      <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '8px', border: '1px solid #a7f3d0', color: '#065f46', fontWeight: 700 }}>
                        🛡️ Synthesized Stage 5 Glyph: {section8VisualChallenge.modelSolution.synthesizedGlyph}
                      </div>
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
                      This assessment evaluates your spatial reasoning, matrix solving, and non-verbal pattern deduction across 20 multiple-choice questions. Passing benchmark is 15/20 (75%).
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
                                  if (window.confirm("Are you ready to finalize and submit your assessment?")) {
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
                      Detailed Question-by-Question Review & Explanations
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
                  1. Core Axioms of Non-Verbal Logic & Abstract Reasoning
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

                {/* COMPLETION BANNER */}
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
                    Congratulations on Completing Level 3 Day 9!
                  </h3>
                  <p style={{ margin: '0 auto 1.5rem auto', maxWidth: '650px', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
                    You have mastered advanced non-verbal logic, rotational and reflective geometry, shape cardinality arithmetic, Latin squares, and matrix XOR cancellations.
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
                          onNavigate('spoko_reasoning_l3_d21', 'overview');
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
                      Next: Day 21 (Final Assessment) →
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
