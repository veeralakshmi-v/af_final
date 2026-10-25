import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
  Clock, Sparkles, BookOpen, Layers, Target, Zap, HelpCircle,
  ChevronRight, AlertCircle, Eye, CheckSquare, Award, Filter,
  Shield, Activity, RefreshCw, AlertTriangle, FileText, CheckCircle,
  Play, Pause, Compass, Users, Check, GitCommit, Split, Search,
  TrendingDown, TrendingUp, BarChart3, Database, MessageSquare,
  ChevronDown, ExternalLink, Lightbulb, ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day9Overview,
  lessonIntro,
  coreConcepts,
  workedExamples,
  practiceSetA,
  practiceSetB,
  practiceSetC,
  admissionsCaseStudy,
  commonMistakes,
  practicalChecklist,
  finalAssessmentQuestions,
  revisionCheatSheet
} from '../../data/reasoningLevel2Day9.js';

export default function SpokoReasoningDay9({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d9_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for Day 9 progress tracking
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

  // Save Day 9 progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 9 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l2_d9:day9';
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonKey, completed: true })
      }).catch(() => { });

      fetch(`/api/students/${studentId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonKey,
          score: savedProgress.assessmentScore,
          totalQuestions: 15,
          completed: true,
          percentage: savedProgress.assessmentPercentage
        })
      }).catch(() => { });
    }
  }, [savedProgress.completedDay, savedProgress.assessmentScore, savedProgress.assessmentPercentage, session]);

  const markSectionCompleted = (tabId) => {
    if (!savedProgress.completedSections.includes(tabId)) {
      setSavedProgress(prev => ({
        ...prev,
        completedSections: [...prev.completedSections, tabId]
      }));
    }
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionCompleted(tabId);
    if (onNavigate) {
      onNavigate('spoko_reasoning_l2_d9', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------------------
  // INTERACTIVE WIDGET STATES
  // ----------------------------------------------------

  // 5 Whys Interactive Explorer State
  const [activeWhyExample, setActiveWhyExample] = useState(0);
  const [whyStepVisible, setWhyStepVisible] = useState(5);

  // Fishbone interactive bone selector
  const [selectedBone, setSelectedBone] = useState('people');

  // Interactive Prioritization Matrix Calculator
  const [customCauses, setCustomCauses] = useState([
    { name: "Counselor callback delay > 24h", impact: 5, frequency: 5, actionability: 4 },
    { name: "Website syllabus confusing", impact: 3, frequency: 2, actionability: 5 },
    { name: "Competitor runs street ads", impact: 2, frequency: 4, actionability: 1 },
    { name: "Checkout error on mobile", impact: 5, frequency: 4, actionability: 5 }
  ]);
  const updateCauseScore = (index, field, value) => {
    const next = [...customCauses];
    next[index][field] = Number(value);
    setCustomCauses(next);
  };

  // Facts vs Assumptions interactive game
  const [factAssumpGame, setFactAssumpGame] = useState({
    answers: {},
    submitted: false,
    score: 0
  });
  const factStatements = [
    { id: 1, text: "Customer phone call inquiries took an average of 46.5 hours to be returned.", type: "Fact" },
    { id: 2, text: "Students are dropping inquiries because course fees are too high.", type: "Assumption" },
    { id: 3, text: "The database memory reached 98% utilization prior to the restart.", type: "Fact" },
    { id: 4, text: "The competitor's brochure looks much cooler and modern than ours.", type: "Opinion" }
  ];

  // Worked Examples domain filter
  const [exampleDomainFilter, setExampleDomainFilter] = useState('All');
  const [expandedExampleId, setExpandedExampleId] = useState('ex1');

  // Practice Sets state
  const [practiceActiveTab, setPracticeActiveTab] = useState('setA');
  const [practiceAnswers, setPracticeAnswers] = useState({ setA: {}, setB: {}, setC: {} });
  const [practiceSubmitted, setPracticeSubmitted] = useState({ setA: false, setB: false, setC: false });

  // Timers for practice sets
  const [timerA, setTimerA] = useState(5 * 60);
  const [isTimerARunning, setIsTimerARunning] = useState(false);
  const [timerB, setTimerB] = useState(7 * 60);
  const [isTimerBRunning, setIsTimerBRunning] = useState(false);
  const [timerC, setTimerC] = useState(10 * 60);
  const [isTimerCRunning, setIsTimerCRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerARunning && timerA > 0) {
      interval = setInterval(() => setTimerA(t => t - 1), 1000);
    } else if (timerA === 0) {
      setIsTimerARunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerARunning, timerA]);

  useEffect(() => {
    let interval = null;
    if (isTimerBRunning && timerB > 0) {
      interval = setInterval(() => setTimerB(t => t - 1), 1000);
    } else if (timerB === 0) {
      setIsTimerBRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerBRunning, timerB]);

  useEffect(() => {
    let interval = null;
    if (isTimerCRunning && timerC > 0) {
      interval = setInterval(() => setTimerC(t => t - 1), 1000);
    } else if (timerC === 0) {
      setIsTimerCRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerCRunning, timerC]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePracticeSelect = (setId, qId, optionIdx) => {
    if (practiceSubmitted[setId]) return;
    setPracticeAnswers(prev => ({
      ...prev,
      [setId]: { ...prev[setId], [qId]: optionIdx }
    }));
  };

  const handlePracticeSubmit = (setId) => {
    setPracticeSubmitted(prev => ({ ...prev, [setId]: true }));
    if (setId === 'setA') setIsTimerARunning(false);
    if (setId === 'setB') setIsTimerBRunning(false);
    if (setId === 'setC') setIsTimerCRunning(false);

    let score = 0;
    const questions = setId === 'setA' ? practiceSetA.questions : setId === 'setB' ? practiceSetB.questions : practiceSetC.questions;
    questions.forEach(q => {
      if (practiceAnswers[setId][q.id] === q.correctIndex) {
        score++;
      }
    });

    if (setId === 'setA') setSavedProgress(p => ({ ...p, practiceAScore: score }));
    if (setId === 'setB') setSavedProgress(p => ({ ...p, practiceBScore: score }));
    if (setId === 'setC') setSavedProgress(p => ({ ...p, practiceCScore: score }));

    if (score >= 4) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handlePracticeReset = (setId) => {
    setPracticeAnswers(prev => ({ ...prev, [setId]: {} }));
    setPracticeSubmitted(prev => ({ ...prev, [setId]: false }));
    if (setId === 'setA') setTimerA(5 * 60);
    if (setId === 'setB') setTimerB(7 * 60);
    if (setId === 'setC') setTimerC(10 * 60);
  };

  // Case Study State
  const [caseStudyAnswers, setCaseStudyAnswers] = useState({});
  const [caseStudySubmitted, setCaseStudySubmitted] = useState(false);
  const handleCaseOptionSelect = (taskId, idx) => {
    if (caseStudySubmitted) return;
    setCaseStudyAnswers(prev => ({ ...prev, [taskId]: idx }));
  };
  const handleCaseSubmit = () => {
    setCaseStudySubmitted(true);
    markSectionCompleted('casestudy');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  };

  // Final Assessment State (15 questions, 20 minutes)
  const [assessmentAnswers, setAssessmentAnswers] = useState(() => savedProgress.assessmentAnswers || {});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(() => savedProgress.assessmentFinished || false);
  const [assessmentScore, setAssessmentScore] = useState(() => savedProgress.assessmentScore || 0);
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState(20 * 60);
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isAssessmentTimerRunning && assessmentTimeLeft > 0 && !assessmentSubmitted) {
      interval = setInterval(() => setAssessmentTimeLeft(t => t - 1), 1000);
    } else if (assessmentTimeLeft === 0 && !assessmentSubmitted) {
      setIsAssessmentTimerRunning(false);
      handleAssessmentSubmit();
    }
    return () => clearInterval(interval);
  }, [isAssessmentTimerRunning, assessmentTimeLeft, assessmentSubmitted]);

  const handleAssessmentAnswer = (qId, optionIdx) => {
    if (assessmentSubmitted) return;
    setAssessmentAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    if (!isAssessmentTimerRunning && assessmentTimeLeft > 0) {
      setIsAssessmentTimerRunning(true);
    }
  };

  const handleAssessmentSubmit = () => {
    setIsAssessmentTimerRunning(false);
    let correctCount = 0;
    finalAssessmentQuestions.forEach(q => {
      if (assessmentAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / finalAssessmentQuestions.length) * 100);
    const passed = percentage >= 60;

    setAssessmentScore(correctCount);
    setAssessmentSubmitted(true);

    setSavedProgress(prev => ({
      ...prev,
      assessmentScore: correctCount,
      assessmentPercentage: percentage,
      assessmentPassed: passed,
      assessmentAnswers,
      assessmentFinished: true,
      completedDay: true,
      completedSections: [...new Set([...prev.completedSections, 'assessment'])]
    }));

    if (percentage >= 75) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleAssessmentRetry = () => {
    setAssessmentAnswers({});
    setAssessmentSubmitted(false);
    setAssessmentScore(0);
    setAssessmentTimeLeft(20 * 60);
    setIsAssessmentTimerRunning(false);
    setShowReviewModal(false);
  };

  // Nav Items definition
  const subNavItems = [
    { id: 'overview', label: 'Day 9 Overview & Objectives', icon: <BookOpen size={17} /> },
    { id: 'section1', label: '1. Symptoms vs Root Causes', icon: <Target size={17} /> },
    { id: 'section2', label: '2. The 5 Whys Technique', icon: <Layers size={17} /> },
    { id: 'section3', label: '3. Cause-and-Effect Relationships', icon: <Zap size={17} /> },
    { id: 'section4', label: '4. Fishbone Diagram (Ishikawa)', icon: <GitCommit size={17} /> },
    { id: 'section5', label: '5. Evidence-Based Problem Diagnosis', icon: <Search size={17} /> },
    { id: 'section6', label: '6. Prioritizing Root Causes', icon: <BarChart3 size={17} /> },
    { id: 'section7', label: '7. Corrective Actions & Prevention', icon: <Shield size={17} /> },
    { id: 'examples', label: '8 Solved Master Examples', icon: <CheckSquare size={17} /> },
    { id: 'practice', label: '3 Timed Practice Sets', icon: <CheckCircle2 size={17} /> },
    { id: 'casestudy', label: 'Real-World Case Study', icon: <BriefcaseIcon size={17} /> },
    { id: 'mistakes', label: 'Mistakes & Practical Checklist', icon: <ShieldAlert size={17} /> },
    { id: 'assessment', label: 'Final Assessment (15 Qs)', icon: <Award size={17} /> },
    { id: 'summary', label: 'Revision & Diagnostic Sheet', icon: <FileText size={17} /> }
  ];

  function BriefcaseIcon({ size = 17 }) {
    return <Users size={size} />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Banner / Breadcrumb Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        color: '#ffffff',
        padding: '2rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
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
            <Sparkles size={14} color="#93c5fd" />
            AlphaFly Logical Reasoning • Level 2 – Intermediate • Day 9
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Root Cause Analysis (RCA)
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#bfdbfe',
            maxWidth: '820px',
            margin: '0 0 1.25rem 0',
            lineHeight: 1.5
          }}>
            The 5 Whys, Cause-and-Effect Relationships, Ishikawa Fishbone Diagrams, and Scientific Problem Diagnosis.
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
              <Clock size={15} color="#93c5fd" /> 45–60 Minutes
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={15} color="#93c5fd" /> 7 Core Concepts
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckSquare size={15} color="#93c5fd" /> 8 Master Case Studies
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={15} color="#93c5fd" /> 15 Timed Assessment Qs
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
        {/* TAB 1: OVERVIEW & STARTER SCENARIO                       */}
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
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  padding: '0.6rem',
                  borderRadius: '12px'
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    Welcome to Day 9: Root Cause Analysis (RCA)
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Logical Problem Diagnosis for Students, Job Seekers, and Working Professionals
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {lessonIntro.definition}
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.75rem'
              }}>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700 }}>
                  Why Master RCA?
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  {lessonIntro.whyImportant.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.88rem', color: '#475569' }}>
                      <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter Scenario Interactive Thought-Starter */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
                border: '2px solid #bfdbfe',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <HelpCircle size={20} color="#1d4ed8" />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>
                    {lessonIntro.scenario.title}
                  </h3>
                </div>

                <p style={{ color: '#1e293b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  <strong>The Context:</strong> {lessonIntro.scenario.context}
                </p>

                <div style={{
                  background: '#ffffff',
                  borderLeft: '4px solid #f59e0b',
                  padding: '0.85rem 1rem',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '1.25rem',
                  fontSize: '0.9rem',
                  color: '#78350f',
                  fontWeight: 600
                }}>
                  {lessonIntro.scenario.initialReaction}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {lessonIntro.scenario.diagnosticQuestions.map((qItem, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '1rem'
                    }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                        ❓ Diagnostic Question {idx + 1}: {qItem.question}
                      </div>
                      <div style={{ color: '#047857', fontSize: '0.88rem', lineHeight: 1.5, display: 'flex', gap: '0.4rem' }}>
                        <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Expert Reasoning:</strong> {qItem.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '1.25rem',
                  padding: '0.85rem',
                  background: 'rgba(30, 58, 138, 0.08)',
                  borderRadius: '8px',
                  color: '#1e3a8a',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  💡 {lessonIntro.scenario.takeaway}
                </div>
              </div>

              {/* Learning Objectives List */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
                What You Will Master in This Lesson:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                {day9Overview.learningObjectives.map((obj, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    background: '#f8fafc',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    color: '#334155'
                  }}>
                    <div style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '1px'
                    }}>
                      {idx + 1}
                    </div>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>

              {/* Start Lesson Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
                  }}
                >
                  Start Concept 1: Symptoms vs Root Causes <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONCEPT 1 - SYMPTOMS VS CAUSES                     */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept1.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    The Three Diagnostic Tiers: Symptom, Immediate Cause, and Root Cause
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept1.summary}
              </p>

              {/* 3 Diagnostic Tiers Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept1.tiers.map((tier, idx) => (
                  <div key={idx} style={{
                    border: `2px solid ${tier.color}`,
                    borderRadius: '14px',
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    position: 'relative'
                  }}>
                    <span style={{
                      backgroundColor: tier.color,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}>
                      {tier.badge}
                    </span>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                      {tier.tier}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {tier.definition}
                    </p>
                    <div style={{
                      background: '#f8fafc',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      marginBottom: '0.75rem'
                    }}>
                      <strong>🩺 Analogy:</strong> {tier.analogy}
                    </div>
                    <div style={{
                      color: tier.color,
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      👉 {tier.action}
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Domain Examples: Education, Business, Tech */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Real-World Demonstrations Across 3 Domains:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept1.examples.map((ex, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      marginBottom: '0.5rem'
                    }}>
                      Domain: {ex.domain}
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '0.85rem',
                      fontSize: '0.88rem'
                    }}>
                      <div>
                        <strong style={{ color: '#d97706' }}>⚠️ Visible Symptom:</strong>
                        <div style={{ color: '#334155', marginTop: '0.2rem' }}>{ex.symptom}</div>
                      </div>
                      <div>
                        <strong style={{ color: '#2563eb' }}>⚡ Immediate Cause:</strong>
                        <div style={{ color: '#334155', marginTop: '0.2rem' }}>{ex.immediateCause}</div>
                      </div>
                      <div>
                        <strong style={{ color: '#059669' }}>🌱 Suspected Root Cause:</strong>
                        <div style={{ color: '#334155', marginTop: '0.2rem' }}>{ex.rootCauseHypothesis}</div>
                      </div>
                      <div>
                        <strong style={{ color: '#7c3aed' }}>🔍 Evidence to Verify:</strong>
                        <div style={{ color: '#334155', marginTop: '0.2rem' }}>{ex.evidenceNeeded}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#fef3c7',
                borderLeft: '4px solid #f59e0b',
                padding: '1rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                color: '#92400e',
                fontSize: '0.92rem',
                fontWeight: 600,
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept1.goldenRule}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('overview')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Overview
                </button>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 2 (The 5 Whys) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONCEPT 2 - THE 5 WHYS TECHNIQUE                   */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Layers size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept2.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Iterative Inquiry: Moving Methodically from Surface Error to Actionable Defect
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept2.summary}
              </p>

              {/* 7-Step Process Accordion / Cards */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The 7-Step Methodical Protocol:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '0.85rem',
                marginBottom: '1.75rem'
              }}>
                {coreConcepts.concept2.sevenSteps.map((s) => (
                  <div key={s.step} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {s.step}
                      </span>
                      <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{s.name}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.45 }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                color: '#1e3a8a',
                lineHeight: 1.6
              }}>
                <strong>📌 Important Principle:</strong> {coreConcepts.concept2.ruleOfFive}
              </div>

              {/* Interactive 5 Whys Stepper Widget */}
              <div style={{
                background: '#f8fafc',
                border: '2px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a' }}>
                      Interactive 5 Whys Ladder Explorer
                    </h3>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                      Select a scenario and step through each causal layer:
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {coreConcepts.concept2.workedExamples.map((ex, idx) => (
                      <button
                        key={ex.id}
                        onClick={() => { setActiveWhyExample(idx); setWhyStepVisible(5); }}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: activeWhyExample === idx ? 700 : 500,
                          backgroundColor: activeWhyExample === idx ? '#1d4ed8' : '#e2e8f0',
                          color: activeWhyExample === idx ? '#ffffff' : '#334155',
                          cursor: 'pointer'
                        }}
                      >
                        Scenario {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Example Content */}
                {(() => {
                  const currEx = coreConcepts.concept2.workedExamples[activeWhyExample];
                  return (
                    <div>
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                          Problem Statement:
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626', marginTop: '0.2rem' }}>
                          🚨 {currEx.problem}
                        </div>
                      </div>

                      {/* Ladder steps */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        {currEx.ladder.slice(0, whyStepVisible).map((stepItem, sIdx) => (
                          <motion.div
                            key={sIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              background: '#ffffff',
                              borderLeft: `4px solid ${sIdx === 4 ? '#10b981' : '#3b82f6'}`,
                              borderRadius: '0 8px 8px 0',
                              padding: '0.85rem 1rem',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <span style={{ fontWeight: 800, color: sIdx === 4 ? '#059669' : '#1d4ed8', fontSize: '0.85rem' }}>
                                {stepItem.level}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                                Verified by: {stepItem.evidence}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.2rem' }}>
                              {stepItem.question}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                              ↳ <strong>Answer:</strong> {stepItem.answer}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Corrective Action Box */}
                      <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderRadius: '10px',
                        padding: '1rem',
                        fontSize: '0.88rem',
                        color: '#065f46'
                      }}>
                        <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>
                          🎯 Identified Root Cause & Corrective Action:
                        </div>
                        <div style={{ marginBottom: '0.35rem' }}><strong>Root Cause:</strong> {currEx.rootCause}</div>
                        <div style={{ marginBottom: '0.35rem' }}><strong>Action:</strong> {currEx.correctiveAction}</div>
                        <div style={{ fontSize: '0.8rem', color: '#047857' }}><strong>Note on Verification:</strong> {currEx.verificationNote}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 1
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 3 (Cause & Effect) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONCEPT 3 - CAUSE-AND-EFFECT RELATIONSHIPS        */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Zap size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept3.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Direct vs Indirect, Multi-Causality, Cascading Failures, and Correlation vs Causation
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept3.summary}
              </p>

              {/* Causal Typologies Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept3.causalTypes.map((type, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    background: '#f8fafc'
                  }}>
                    <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1rem', fontWeight: 800, color: '#1e3a8a' }}>
                      {type.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.55 }}>
                      {type.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Visual Cause-Effect Diagram Box */}
              <div style={{
                background: '#ffffff',
                border: '2px dashed #93c5fd',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', textAlign: 'center' }}>
                  Visual Cause-and-Effect Relationship Topologies
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {/* Diagram 1: Multi-Causality */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                      A. Multi-Causality (Multiple Causes → 1 Failure)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
                      <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Cause 1: Worn Tire Treads</div>
                      <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Cause 2: Rain-Slicked Road</div>
                      <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Cause 3: Distracted Phone Use</div>
                      <div style={{ fontSize: '1.2rem', color: '#64748b' }}>↓↓↓</div>
                      <div style={{ background: '#dc2626', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem' }}>
                        💥 Car Skid Accident
                      </div>
                    </div>
                  </div>

                  {/* Diagram 2: Cascading Effect */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                      B. Cascading Failure (1 Root Flaw → Multiple Failures)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
                      <div style={{ background: '#7c3aed', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem' }}>
                        ⚙️ Uncalibrated Factory Scale
                      </div>
                      <div style={{ fontSize: '1.2rem', color: '#64748b' }}>↓↓↓</div>
                      <div style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Effect 1: Faulty Chemical Dosage</div>
                      <div style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Effect 2: Failed Quality Audit</div>
                      <div style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Effect 3: Customer Returns & Disputes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Case: Correlation vs Causation */}
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 800, marginBottom: '0.5rem' }}>
                  <AlertTriangle size={18} />
                  <span>{coreConcepts.concept3.practicalCase.title}</span>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#7f1d1d' }}>
                  <strong>Scenario:</strong> {coreConcepts.concept3.practicalCase.scenario}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', color: '#334155' }}>
                  <strong>Forensic Analysis:</strong> {coreConcepts.concept3.practicalCase.analysis}
                </p>
                <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.88rem' }}>
                  🎯 Lesson: {coreConcepts.concept3.practicalCase.lesson}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 2
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 4 (Fishbone Diagram) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONCEPT 4 - FISHBONE (ISHIKAWA) DIAGRAM           */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <GitCommit size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept4.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    The 6 Adaptable Categories: People, Process, Technology, Materials, Measurement, Environment
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept4.summary}
              </p>

              {/* The 6 Categories Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept4.sixCategories.map((c, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.92rem' }}>{c.name}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem', lineHeight: 1.45 }}>
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Fishbone Visual Explorer */}
              <div style={{
                background: '#f8fafc',
                border: '2px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                    Problem at the Fishbone Head
                  </span>
                  <h3 style={{ margin: '0.4rem 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>
                    🐟 "{coreConcepts.concept4.demonstrationProblem}"
                  </h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    Click on any of the 6 bones below to inspect hypothesized causes:
                  </p>
                </div>

                {/* 6 Bone Selectors */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { key: 'people', label: '1. People' },
                    { key: 'process', label: '2. Process' },
                    { key: 'technology', label: '3. Technology' },
                    { key: 'materials', label: '4. Materials / Info' },
                    { key: 'measurement', label: '5. Measurement' },
                    { key: 'environment', label: '6. Environment' }
                  ].map((b) => (
                    <button
                      key={b.key}
                      onClick={() => setSelectedBone(b.key)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: selectedBone === b.key ? 700 : 500,
                        backgroundColor: selectedBone === b.key ? '#1d4ed8' : '#ffffff',
                        color: selectedBone === b.key ? '#ffffff' : '#334155',
                        border: selectedBone === b.key ? 'none' : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        boxShadow: selectedBone === b.key ? '0 2px 8px rgba(29, 78, 216, 0.25)' : 'none'
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* Selected Bone Hypotheses Box */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem', marginBottom: '0.75rem', textTransform: 'capitalize' }}>
                    🔍 Investigating Hypotheses Under: {selectedBone}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {coreConcepts.concept4.fishboneBranches[selectedBone]?.map((hyp, hIdx) => (
                      <div key={hIdx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.88rem',
                        color: '#334155'
                      }}>
                        <div style={{
                          background: '#dbeafe',
                          color: '#1d4ed8',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '1px'
                        }}>
                          {hIdx + 1}
                        </div>
                        <span><strong>Hypothesis {hIdx + 1}:</strong> {hyp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                background: '#fef3c7',
                borderLeft: '4px solid #f59e0b',
                padding: '1rem',
                borderRadius: '0 8px 8px 0',
                color: '#92400e',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '2rem'
              }}>
                ⚠️ {coreConcepts.concept4.criticalCaution}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 3
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 5 (Evidence-Based Diagnosis) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: CONCEPT 5 - EVIDENCE-BASED DIAGNOSIS              */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Search size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept5.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Facts, Assumptions, Opinions, Hypotheses, and Verified Causes
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept5.summary}
              </p>

              {/* Hierarchy of Validity */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {coreConcepts.concept5.validityHierarchy.map((item, idx) => (
                  <div key={idx} style={{
                    borderLeft: `4px solid ${item.color}`,
                    background: '#f8fafc',
                    borderRadius: '0 10px 10px 0',
                    padding: '1rem 1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1rem', color: item.color }}>{item.type}</strong>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', background: '#e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        Reliability: {item.reliability}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.45 }}>
                      {item.description}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      <strong>Example:</strong> <em>{item.example}</em>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reliable Evidence Catalog */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Catalog of Reliable Evidence Sources:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept5.reliableEvidenceCatalog.map((ev, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>📂 {ev.source}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem', lineHeight: 1.45 }}>
                      {ev.use}
                    </div>
                  </div>
                ))}
              </div>

              {/* Blameless Post-Mortem Callout */}
              <div style={{
                background: '#eff6ff',
                borderLeft: '4px solid #2563eb',
                padding: '1rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                color: '#1e40af',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                <strong>🛡️ Process Over Personal Blame:</strong> {coreConcepts.concept5.blameVsProcess}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 4
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 6 (Prioritizing Causes) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: CONCEPT 6 - PRIORITIZING ROOT CAUSES              */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept6.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Quantitative Scoring Matrix: Impact × Frequency × Actionability
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept6.summary}
              </p>

              {/* 5 Evaluation Criteria */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The 5 Diagnostic Evaluation Filters:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept6.fiveEvaluationCriteria.map((c, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>{c.name}</strong>
                      <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#3730a3', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {c.weight}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.45 }}>
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scoring Methodology Banner */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                color: '#1e3a8a'
              }}>
                <strong>📊 Scoring Formula:</strong> {coreConcepts.concept6.prioritizationMatrix.methodology}
              </div>

              {/* Prioritization Matrix Table */}
              <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.88rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Suspected Root Cause</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Supporting Evidence</th>
                      <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>Impact (1-5)</th>
                      <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>Freq (1-5)</th>
                      <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>Action (1-5)</th>
                      <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>Leverage Score</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Priority Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coreConcepts.concept6.prioritizationMatrix.sampleTable.map((row, idx) => (
                      <tr key={idx} style={{
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        borderBottom: '1px solid #e2e8f0'
                      }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#0f172a' }}>{row.cause}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.82rem' }}>{row.evidence}</td>
                        <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 700 }}>{row.impact}</td>
                        <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 700 }}>{row.frequency}</td>
                        <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 700 }}>{row.actionability}</td>
                        <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            backgroundColor: row.score >= 60 ? '#dcfce7' : '#f1f5f9',
                            color: row.score >= 60 ? '#15803d' : '#475569',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            fontWeight: 800
                          }}>
                            {row.score}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: row.priority.includes('Tier 1') ? '#fee2e2' : '#f3f4f6',
                            color: row.priority.includes('Tier 1') ? '#b91c1c' : '#4b5563'
                          }}>
                            {row.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 5
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Concept 7 (Corrective Actions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CONCEPT 7 - CORRECTIVE ACTIONS & PREVENTION       */}
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
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Shield size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {coreConcepts.concept7.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Hierarchy of Solutions: Mitigation, Root Fix, Systemic Mistake-Proofing, and Monitoring
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.75rem' }}>
                {coreConcepts.concept7.summary}
              </p>

              {/* 4 Solution Action Tiers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {coreConcepts.concept7.actionTiers.map((t, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    background: '#f8fafc'
                  }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.95rem' }}>{t.tier}</strong>
                    <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#475569', lineHeight: 1.45 }}>
                      {t.purpose}
                    </p>
                  </div>
                ))}
              </div>

              {/* Weak vs Strong Solution Comparison */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Weak (Symptomatic) vs. Strong (Evidence-Based Root Cause) Solutions:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {coreConcepts.concept7.solutionComparison.map((comp, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    background: '#ffffff'
                  }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                      Scenario {idx + 1}: {comp.scenario}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                      <div style={{
                        background: '#fef2f2',
                        borderLeft: '4px solid #ef4444',
                        padding: '0.75rem 1rem',
                        borderRadius: '0 8px 8px 0',
                        fontSize: '0.85rem',
                        color: '#991b1b'
                      }}>
                        <strong>❌ Weak Solution:</strong> {comp.weakSolution}
                      </div>
                      <div style={{
                        background: '#f0fdf4',
                        borderLeft: '4px solid #10b981',
                        padding: '0.75rem 1rem',
                        borderRadius: '0 8px 8px 0',
                        fontSize: '0.85rem',
                        color: '#065f46'
                      }}>
                        <strong>✅ Strong Root-Cause Solution:</strong> {comp.strongSolution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 7-Step Action Plan */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The Master 7-Step Action Plan Framework:
              </h3>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {coreConcepts.concept7.sevenStepActionPlan.map((stepStr, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#334155' }}>
                      <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{stepStr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 6
                </button>
                <button
                  onClick={() => handleTabChange('examples')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: 8 Solved Master Examples →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: 8 SOLVED MASTER WORKED EXAMPLES                   */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <CheckSquare size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    8 Solved Master Examples Across Domains
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Complete step-by-step breakdowns: Symptoms, Hypotheses, 5 Whys, Evidence, Actions, and Verification
                  </p>
                </div>
              </div>

              {/* Domain Filter Bar */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem'
              }}>
                {['All', 'Academic & Education', 'Business & Training Institutes', 'Corporate Operations', 'Technology & Web Performance', 'Software & Fintech', 'UX & Customer Conversion', 'Education & Pedagogy', 'Sales & Strategic Management'].map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setExampleDomainFilter(dom)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: exampleDomainFilter === dom ? 700 : 500,
                      backgroundColor: exampleDomainFilter === dom ? '#1d4ed8' : '#f1f5f9',
                      color: exampleDomainFilter === dom ? '#ffffff' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {dom}
                  </button>
                ))}
              </div>

              {/* Examples Accordion List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {workedExamples
                  .filter(ex => exampleDomainFilter === 'All' || ex.domain === exampleDomainFilter)
                  .map((ex) => {
                    const isExpanded = expandedExampleId === ex.id;
                    return (
                      <div key={ex.id} style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}>
                        <div
                          onClick={() => setExpandedExampleId(isExpanded ? null : ex.id)}
                          style={{
                            padding: '1.25rem',
                            backgroundColor: isExpanded ? '#f8fafc' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none'
                          }}
                        >
                          <div>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#1d4ed8',
                              backgroundColor: '#dbeafe',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '4px',
                              display: 'inline-block',
                              marginBottom: '0.35rem'
                            }}>
                              {ex.domain}
                            </span>
                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                              {ex.title}
                            </h3>
                          </div>
                          <ChevronDown size={20} color="#64748b" style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s ease'
                          }} />
                        </div>

                        {isExpanded && (
                          <div style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
                            {/* Problem Statement */}
                            <div style={{
                              background: '#fef2f2',
                              borderLeft: '4px solid #ef4444',
                              padding: '0.85rem 1rem',
                              borderRadius: '0 8px 8px 0',
                              marginBottom: '1rem',
                              fontSize: '0.9rem',
                              color: '#991b1b'
                            }}>
                              <strong>Problem Statement:</strong> {ex.problemStatement}
                            </div>

                            {/* Symptoms & Facts */}
                            <div style={{ marginBottom: '1rem' }}>
                              <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>📋 Symptoms & Available Facts:</strong>
                              <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569' }}>
                                {ex.symptomsAndFacts.map((fact, fIdx) => (
                                  <li key={fIdx} style={{ marginBottom: '0.2rem' }}>{fact}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Possible Causes (Hypotheses) */}
                            <div style={{ marginBottom: '1rem' }}>
                              <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>💡 Possible Causes (Hypotheses to Test):</strong>
                              <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569' }}>
                                {ex.possibleCauses.map((hyp, hIdx) => (
                                  <li key={hIdx} style={{ marginBottom: '0.2rem' }}>{hyp}</li>
                                ))}
                              </ul>
                            </div>

                            {/* 5 Whys Breakdown */}
                            <div style={{
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              borderRadius: '10px',
                              padding: '1rem',
                              marginBottom: '1rem'
                            }}>
                              <strong style={{ fontSize: '0.88rem', color: '#1e3a8a' }}>🪜 5 Whys Causal Ladder:</strong>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.5rem' }}>
                                {ex.fiveWhysAnalysis.map((step, sIdx) => (
                                  <div key={sIdx} style={{ fontSize: '0.85rem', color: '#334155' }}>
                                    <span style={{ fontWeight: 800, color: sIdx === ex.fiveWhysAnalysis.length - 1 ? '#059669' : '#2563eb' }}>
                                      {step.step}
                                    </span> <strong>{step.q}</strong> ↳ {step.a}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Evidence & Action */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                              gap: '0.85rem',
                              fontSize: '0.85rem'
                            }}>
                              <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0', color: '#166534' }}>
                                <strong>🔍 Evidence to Verify:</strong> {ex.evidenceToVerify}
                              </div>
                              <div style={{ background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                                <strong>🎯 Suitable Corrective Action:</strong> {ex.correctiveAction}
                              </div>
                            </div>

                            <div style={{
                              marginTop: '0.75rem',
                              fontSize: '0.85rem',
                              color: '#475569',
                              fontStyle: 'italic'
                            }}>
                              📈 <strong>Way to Measure Improvement:</strong> {ex.measurementOfImprovement}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Concept 7
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: 3 Timed Practice Sets →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: 3 TIMED PRACTICE ACTIVITIES                      */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    3 Interactive Timed Practice Sets
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Test your problem diagnostic intuition across progressive difficulty tiers with working countdown timers
                  </p>
                </div>
              </div>

              {/* Practice Sub-Tabs */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { id: 'setA', label: 'Set A: Identify the Problem (5 Qs, 5m)', score: savedProgress.practiceAScore },
                  { id: 'setB', label: 'Set B: Apply the 5 Whys (5 Qs, 7m)', score: savedProgress.practiceBScore },
                  { id: 'setC', label: 'Set C: Diagnose & Solve (5 Qs, 10m)', score: savedProgress.practiceCScore }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPracticeActiveTab(s.id)}
                    style={{
                      padding: '0.6rem 1.1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: practiceActiveTab === s.id ? 700 : 500,
                      backgroundColor: practiceActiveTab === s.id ? '#1d4ed8' : '#f1f5f9',
                      color: practiceActiveTab === s.id ? '#ffffff' : '#334155',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>{s.label}</span>
                    {practiceSubmitted[s.id] && (
                      <span style={{
                        background: '#10b981',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                        fontWeight: 800
                      }}>
                        {s.score}/5
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Practice Set Render */}
              {(() => {
                const activeSet = practiceActiveTab === 'setA' ? practiceSetA : practiceActiveTab === 'setB' ? practiceSetB : practiceSetC;
                const activeTimer = practiceActiveTab === 'setA' ? timerA : practiceActiveTab === 'setB' ? timerB : timerC;
                const isTimerRunning = practiceActiveTab === 'setA' ? isTimerARunning : practiceActiveTab === 'setB' ? isTimerBRunning : isTimerCRunning;
                const setTimerToggle = practiceActiveTab === 'setA' ? setIsTimerARunning : practiceActiveTab === 'setB' ? setIsTimerBRunning : setIsTimerCRunning;
                const isSubmitted = practiceSubmitted[practiceActiveTab];
                const currentAnswers = practiceAnswers[practiceActiveTab] || {};

                return (
                  <div>
                    {/* Timer & Controls Bar */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      background: '#f8fafc',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1e3a8a' }}>
                          {activeSet.title}
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                          {activeSet.subtitle}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: '#ffffff',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: activeTimer < 60 ? '#dc2626' : '#1e293b'
                        }}>
                          <Clock size={16} />
                          <span>{formatTimer(activeTimer)}</span>
                        </div>

                        {!isSubmitted && (
                          <button
                            onClick={() => setTimerToggle(!isTimerRunning)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              borderRadius: '6px',
                              border: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              backgroundColor: isTimerRunning ? '#f59e0b' : '#10b981',
                              color: '#ffffff'
                            }}
                          >
                            {isTimerRunning ? 'Pause ⏸' : 'Start Timer ▶'}
                          </button>
                        )}

                        {isSubmitted && (
                          <button
                            onClick={() => handlePracticeReset(practiceActiveTab)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              backgroundColor: '#ffffff',
                              color: '#475569'
                            }}
                          >
                            Retry Set ↺
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Questions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                      {activeSet.questions.map((q, qIdx) => {
                        const selectedIdx = currentAnswers[q.id];
                        const isCorrect = selectedIdx === q.correctIndex;

                        return (
                          <div key={q.id} style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            backgroundColor: '#ffffff'
                          }}>
                            {/* Scenario & Question */}
                            <div style={{
                              background: '#f8fafc',
                              borderLeft: '4px solid #2563eb',
                              padding: '0.75rem 1rem',
                              borderRadius: '0 8px 8px 0',
                              fontSize: '0.88rem',
                              color: '#334155',
                              lineHeight: 1.5,
                              marginBottom: '0.75rem'
                            }}>
                              <strong>Scenario {qIdx + 1}:</strong> {q.scenario}
                            </div>

                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.85rem' }}>
                              Question {qIdx + 1}: {q.question}
                            </div>

                            {/* Options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {q.options.map((opt, oIdx) => {
                                const isOptionSelected = selectedIdx === oIdx;
                                let optBg = '#f8fafc';
                                let optBorder = '#cbd5e1';
                                let optColor = '#334155';

                                if (isSubmitted) {
                                  if (oIdx === q.correctIndex) {
                                    optBg = '#dcfce7';
                                    optBorder = '#86efac';
                                    optColor = '#166534';
                                  } else if (isOptionSelected) {
                                    optBg = '#fee2e2';
                                    optBorder = '#fca5a5';
                                    optColor = '#991b1b';
                                  }
                                } else if (isOptionSelected) {
                                  optBg = '#eff6ff';
                                  optBorder = '#2563eb';
                                  optColor = '#1e40af';
                                }

                                return (
                                  <div
                                    key={oIdx}
                                    onClick={() => handlePracticeSelect(practiceActiveTab, q.id, oIdx)}
                                    style={{
                                      padding: '0.75rem 1rem',
                                      borderRadius: '8px',
                                      border: `1.5px solid ${optBorder}`,
                                      backgroundColor: optBg,
                                      color: optColor,
                                      cursor: isSubmitted ? 'default' : 'pointer',
                                      fontSize: '0.88rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.65rem'
                                    }}
                                  >
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      border: `1.5px solid ${optBorder}`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.75rem',
                                      fontWeight: 800,
                                      flexShrink: 0
                                    }}>
                                      {String.fromCharCode(65 + oIdx)}
                                    </span>
                                    <span>{opt}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Rationale feedback */}
                            {isSubmitted && (
                              <div style={{
                                marginTop: '0.85rem',
                                padding: '0.85rem',
                                borderRadius: '8px',
                                backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                                border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                                fontSize: '0.85rem',
                                color: isCorrect ? '#166534' : '#991b1b',
                                lineHeight: 1.5
                              }}>
                                <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.rationale}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Bar */}
                    {!isSubmitted ? (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handlePracticeSubmit(practiceActiveTab)}
                          style={{
                            backgroundColor: '#1d4ed8',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.75rem',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            cursor: 'pointer'
                          }}
                        >
                          Submit {activeSet.title} Answers
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '10px'
                      }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          Score: {savedProgress[`practice${practiceActiveTab.slice(-1)}Score`] || 0} / 5 Correct
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handlePracticeReset(practiceActiveTab)}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Retry This Set
                          </button>
                          {practiceActiveTab !== 'setC' ? (
                            <button
                              onClick={() => setPracticeActiveTab(practiceActiveTab === 'setA' ? 'setB' : 'setC')}
                              style={{
                                background: '#1d4ed8',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Next Practice Set →
                            </button>
                          ) : (
                            <button
                              onClick={() => handleTabChange('casestudy')}
                              style={{
                                background: '#059669',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Go to Real-World Case Study →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <button
                  onClick={() => handleTabChange('examples')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to 8 Examples
                </button>
                <button
                  onClick={() => handleTabChange('casestudy')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Real-World Case Study →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 11: REAL-WORLD CASE STUDY (DECLINING ADMISSIONS)      */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {admissionsCaseStudy.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {admissionsCaseStudy.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ lineHeight: 1.7, color: '#334155', fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                {admissionsCaseStudy.scenario}
              </p>

              {/* Data Metrics Table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
                      {admissionsCaseStudy.metricsTable.headers.map((h, idx) => (
                        <th key={idx} style={{ padding: '0.75rem 1rem' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {admissionsCaseStudy.metricsTable.rows.map((r, rIdx) => (
                      <tr key={rIdx} style={{
                        backgroundColor: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        borderBottom: '1px solid #e2e8f0'
                      }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{r[0]}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{r[1]}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{r[2]}</td>
                        <td style={{
                          padding: '0.75rem 1rem',
                          textAlign: 'center',
                          fontWeight: 700,
                          color: r[3].includes('-') ? '#dc2626' : '#16a34a'
                        }}>
                          {r[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 6 Key Investigation Areas */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Key Investigation Frontiers:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                {admissionsCaseStudy.investigationAreas.map((area, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem'
                  }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.88rem' }}>📍 {area.area}</strong>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '0.2rem' }}>
                      {area.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* 8 Diagnostic Tasks */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Solve the 8 Diagnostic Case Study Tasks:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {admissionsCaseStudy.tasks.map((task, tIdx) => {
                  const selected = caseStudyAnswers[task.id];
                  const isCorrect = selected === task.correctIndex;

                  return (
                    <div key={task.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      background: '#ffffff'
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                        {task.prompt}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {task.options.map((opt, oIdx) => {
                          const isOptSelected = selected === oIdx;
                          let bg = '#f8fafc';
                          let border = '#cbd5e1';
                          let col = '#334155';

                          if (caseStudySubmitted) {
                            if (oIdx === task.correctIndex) {
                              bg = '#dcfce7';
                              border = '#86efac';
                              col = '#166534';
                            } else if (isOptSelected) {
                              bg = '#fee2e2';
                              border = '#fca5a5';
                              col = '#991b1b';
                            }
                          } else if (isOptSelected) {
                            bg = '#eff6ff';
                            border = '#2563eb';
                            col = '#1e40af';
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => handleCaseOptionSelect(task.id, oIdx)}
                              style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: `1.5px solid ${border}`,
                                backgroundColor: bg,
                                color: col,
                                cursor: caseStudySubmitted ? 'default' : 'pointer',
                                fontSize: '0.88rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.65rem'
                              }}
                            >
                              <span style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: `1.5px solid ${border}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                flexShrink: 0
                              }}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {caseStudySubmitted && (
                        <div style={{
                          marginTop: '0.75rem',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          fontSize: '0.85rem',
                          color: isCorrect ? '#166534' : '#991b1b'
                        }}>
                          <strong>{isCorrect ? '✅ Valid Diagnosis!' : '❌ Flawed Deduction.'}</strong> {task.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!caseStudySubmitted ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                  <button
                    onClick={handleCaseSubmit}
                    style={{
                      backgroundColor: '#1d4ed8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 2rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
                    }}
                  >
                    Submit Case Diagnostic & Reveal Model Analysis 🚀
                  </button>
                </div>
              ) : (
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
                  border: '2px solid #86efac',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={22} />
                    <span>Case Study Successfully Solved & Model Analysis Revealed!</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534', lineHeight: 1.6 }}>
                    You correctly avoided the trap of slashing course fees prematurely! By recognizing that the conversion drop was driven by counselor callback latency surging to 46.5 hours due to manual shared-inbox distribution, you implemented an automated CRM round-robin routing rule with a 2-hour SLA—permanently solving the underlying process bottleneck!
                  </p>
                </div>
              )}

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Practice Sets
                </button>
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Next: Common Mistakes & Checklist →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 12: COMMON MISTAKES & PRACTICAL CHECKLIST            */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.6rem', borderRadius: '12px' }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#991b1b' }}>
                    Top 8 Common RCA Mistakes to Avoid
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Critical reasoning traps that sabotage problem diagnosis and how to sidestep them
                  </p>
                </div>
              </div>

              {/* 8 Mistakes Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}>
                {commonMistakes.map((m) => (
                  <div key={m.id} style={{
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    backgroundColor: '#fff5f5'
                  }}>
                    <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#991b1b' }}>
                      {m.title}
                    </h3>
                    <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.45 }}>
                      <strong>The Pitfall:</strong> {m.description}
                    </p>
                    <div style={{
                      background: '#ffffff',
                      borderLeft: '3px solid #10b981',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0 6px 6px 0',
                      fontSize: '0.82rem',
                      color: '#065f46'
                    }}>
                      <strong>💡 Correction:</strong> {m.correction}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical 7-Step Diagnostic Checklist */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
                border: '2px solid #86efac',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <CheckCircle size={22} color="#059669" />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#166534' }}>
                    Practical Problem Solver's 7-Step Quick Checklist
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {practicalChecklist.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      border: '1px solid #bbf7d0',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        background: '#059669',
                        color: '#ffffff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </span>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{item.step}: </strong>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>{item.q}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('casestudy')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Case Study
                </button>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Take Final Assessment (15 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 13: TIMED FINAL ASSESSMENT (15 QUESTIONS)            */}
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
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                      Day 9 Final Assessment: Root Cause Analysis
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      15 Questions • 20 Minutes • Passing Requirement: 60% (9/15)
                    </p>
                  </div>
                </div>

                {/* Countdown Timer Display */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: assessmentTimeLeft < 180 ? '#fee2e2' : '#f1f5f9',
                    color: assessmentTimeLeft < 180 ? '#dc2626' : '#1e293b',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: '1px solid #cbd5e1'
                  }}>
                    <Clock size={18} />
                    <span>{formatTimer(assessmentTimeLeft)}</span>
                  </div>

                  {assessmentSubmitted && (
                    <button
                      onClick={handleAssessmentRetry}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        color: '#475569'
                      }}
                    >
                      Retry Assessment ↺
                    </button>
                  )}
                </div>
              </div>

              {/* Assessment Score Banner (if submitted) */}
              {assessmentSubmitted && (
                <div style={{
                  background: savedProgress.assessmentPassed
                    ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                    : 'linear-gradient(135deg, #fff1f2 0%, #fee2e2 100%)',
                  border: `2px solid ${savedProgress.assessmentPassed ? '#10b981' : '#ef4444'}`,
                  borderRadius: '14px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <span style={{
                      backgroundColor: savedProgress.assessmentPassed ? '#10b981' : '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase'
                    }}>
                      {savedProgress.assessmentPercentage >= 90
                        ? 'Tier 1: Excellent (90-100%)'
                        : savedProgress.assessmentPercentage >= 75
                          ? 'Tier 2: Good (75-89%)'
                          : savedProgress.assessmentPercentage >= 60
                            ? 'Tier 3: Developing (60-74%)'
                            : 'Tier 4: Needs Improvement (<60%)'}
                    </span>
                    <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                      Your Score: {savedProgress.assessmentScore} / 15 ({savedProgress.assessmentPercentage}%)
                    </h3>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#475569' }}>
                      {savedProgress.assessmentPassed
                        ? '🎉 Outstanding work! You have successfully mastered Root Cause Analysis and completed Day 9.'
                        : '⚠️ You scored below the 60% benchmark. Review the explanations below and give it another try.'}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => setShowReviewModal(!showReviewModal)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        color: '#1e293b'
                      }}
                    >
                      {showReviewModal ? 'Hide Explanations' : 'View Full Explanations 📖'}
                    </button>
                    <button
                      onClick={() => handleTabChange('summary')}
                      style={{
                        backgroundColor: '#1d4ed8',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Go to Revision Sheet 🎓
                    </button>
                  </div>
                </div>
              )}

              {/* Question Jump Pills */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
                background: '#f8fafc',
                padding: '0.75rem',
                borderRadius: '10px'
              }}>
                {finalAssessmentQuestions.map((q, idx) => {
                  const answered = assessmentAnswers[q.id] !== undefined;
                  const isCorrect = assessmentAnswers[q.id] === q.correctIndex;

                  let pillBg = '#ffffff';
                  let pillBorder = '#cbd5e1';
                  let pillColor = '#475569';

                  if (assessmentSubmitted) {
                    pillBg = isCorrect ? '#dcfce7' : '#fee2e2';
                    pillBorder = isCorrect ? '#86efac' : '#fca5a5';
                    pillColor = isCorrect ? '#166534' : '#991b1b';
                  } else if (answered) {
                    pillBg = '#dbeafe';
                    pillBorder = '#93c5fd';
                    pillColor = '#1e40af';
                  }

                  return (
                    <a
                      key={q.id}
                      href={`#q_${q.id}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        backgroundColor: pillBg,
                        border: `1px solid ${pillBorder}`,
                        color: pillColor
                      }}
                    >
                      {idx + 1}
                    </a>
                  );
                })}
              </div>

              {/* Assessment Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {finalAssessmentQuestions.map((q, qIdx) => {
                  const selectedIdx = assessmentAnswers[q.id];
                  const isCorrect = selectedIdx === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      id={`q_${q.id}`}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.65rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: '#e0e7ff',
                          color: '#3730a3',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          Question {qIdx + 1} of 15
                        </span>
                        {assessmentSubmitted && (
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: isCorrect ? '#16a34a' : '#dc2626'
                          }}>
                            {isCorrect ? '✓ Correct (+1)' : '✗ Incorrect (0)'}
                          </span>
                        )}
                      </div>

                      <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                        {q.question}
                      </p>

                      {/* Options */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selectedIdx === oIdx;
                          let bg = '#f8fafc';
                          let border = '#cbd5e1';
                          let color = '#334155';

                          if (assessmentSubmitted) {
                            if (oIdx === q.correctIndex) {
                              bg = '#dcfce7';
                              border = '#86efac';
                              color = '#166534';
                            } else if (isOptionSelected) {
                              bg = '#fee2e2';
                              border = '#fca5a5';
                              color = '#991b1b';
                            }
                          } else if (isOptionSelected) {
                            bg = '#eff6ff';
                            border = '#2563eb';
                            color = '#1e40af';
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => handleAssessmentAnswer(q.id, oIdx)}
                              style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: `1.5px solid ${border}`,
                                backgroundColor: bg,
                                color: color,
                                cursor: assessmentSubmitted ? 'default' : 'pointer',
                                fontSize: '0.88rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.65rem'
                              }}
                            >
                              <span style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                border: `1.5px solid ${border}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                flexShrink: 0
                              }}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback if Submitted or Modal open */}
                      {(assessmentSubmitted || showReviewModal) && (
                        <div style={{
                          marginTop: '0.85rem',
                          padding: '0.85rem',
                          borderRadius: '8px',
                          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          fontSize: '0.85rem',
                          color: isCorrect ? '#166534' : '#991b1b',
                          lineHeight: 1.5
                        }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Assessment Button */}
              {!assessmentSubmitted && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                  <button
                    onClick={handleAssessmentSubmit}
                    style={{
                      backgroundColor: '#1d4ed8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 2.25rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)'
                    }}
                  >
                    Submit Final Assessment & Finish Day 9 🎓
                  </button>
                </div>
              )}

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleTabChange('mistakes')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                >
                  ← Back to Mistakes & Tips
                </button>
                <button
                  onClick={() => handleTabChange('summary')}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  View Revision & Diagnostic Sheet →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 14: LESSON SUMMARY & REVISION CHEAT SHEET            */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '12px' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#1e3a8a' }}>
                    {revisionCheatSheet.title}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Quick Reference Summary & 7-Step Diagnostic Framework
                  </p>
                </div>
              </div>

              {/* Core Tiers Summary */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                1. The Three Tiers of Problem Diagnosis
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {revisionCheatSheet.coreTiers.map((t, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    borderLeft: `4px solid ${idx === 0 ? '#f59e0b' : idx === 1 ? '#3b82f6' : '#10b981'}`,
                    padding: '0.75rem 1rem',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.88rem'
                  }}>
                    <strong style={{ color: '#0f172a' }}>{t.term}:</strong> <span style={{ color: '#475569' }}>{t.meaning}</span>
                  </div>
                ))}
              </div>

              {/* 5 Whys Golden Rules */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                2. The 5 Whys Execution Rules
              </h3>
              <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {revisionCheatSheet.fiveWhysRules.map((rule, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: '#1e40af' }}>
                      {rule}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fishbone 6 Categories */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                3. The 6 Fishbone (Ishikawa) Categories
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.75rem'
              }}>
                {revisionCheatSheet.fishboneSixCategories.map((cat, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.88rem' }}>{cat.cat}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                      {cat.items}
                    </div>
                  </div>
                ))}
              </div>

              {/* Facts vs Assumptions */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                4. Facts, Hypotheses & Assumptions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                {revisionCheatSheet.factsVsAssumptions.map((f, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '0.85rem'
                  }}>
                    <strong style={{ color: '#0f172a' }}>{f.type}: </strong>
                    <span style={{ color: '#475569' }}>{f.rule}</span>
                  </div>
                ))}
              </div>

              {/* Graduation Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)',
                border: '2px solid #3b82f6',
                borderRadius: '14px',
                padding: '1.75rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>🎓</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e3a8a', margin: '0.5rem 0' }}>
                  Congratulations on Completing Day 9!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto 1.25rem' }}>
                  You now possess the disciplined cognitive tools to diagnose complex problems, dissect symptoms from root causes, utilize the 5 Whys and Fishbone diagrams, and engineer resilient, mistake-proof solutions.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onNavigate && onNavigate('spoko_reasoning_l2_d8', 'overview')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Review Day 8: Data Interpretation
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('dashboard')}
                    style={{
                      background: '#1d4ed8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
                    }}
                  >
                    Return to Course Dashboard 🏠
                  </button>
                </div>
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
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l2_d8', 'overview')}
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
              ← Previous: Day 8 (Data Interpretation)
            </button>

            <button
              onClick={() => handleTabChange('assessment')}
              style={{
                background: savedProgress.completedDay ? '#10b981' : '#1d4ed8',
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
              {savedProgress.completedDay ? 'View Day 9 Results 🎓' : 'View Final Assessment 📊'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
