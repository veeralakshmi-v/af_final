import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, AlertCircle, Eye, CheckSquare,
  TrendingUp, TrendingDown, Home, GraduationCap, Filter, Calculator,
  Compass, Search, Trophy, Shield, Activity, Hash, LayoutGrid,
  Type as TypeIcon, Key, Link as LinkIcon, Flame, Droplets, Dumbbell,
  Stethoscope, Briefcase, RefreshCw, FastForward, AlertTriangle,
  ShieldAlert, Split, CheckCheck, FileText, CheckCircle, ShoppingBag,
  Timer, Users, HelpCircle as QuestionIcon, Award as CertificateIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day7Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day7Revision,
  day7PracticeQuestions
} from '../../data/reasoningLevel1Day7.js';

export default function SpokoReasoningDay7({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d7_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  // Sync internal currentTab when prop activeTab changes
  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Local state for Day 7 progress tracking
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : {
        completedSections: ['overview'],
        quizScore: 0,
        quizPercentage: 0,
        quizPassed: false,
        quizSubmitted: {},
        quizAnswers: {},
        quizFinished: false,
        completedDay: false
      };
    } catch {
      return {
        completedSections: ['overview'],
        quizScore: 0,
        quizPercentage: 0,
        quizPassed: false,
        quizSubmitted: {},
        quizAnswers: {},
        quizFinished: false,
        completedDay: false
      };
    }
  });

  // Save Day 7 progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 7 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d7:day7';
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
          score: savedProgress.quizScore,
          total: 20
        })
      }).catch(() => {});
    }
  }, [savedProgress.completedDay, savedProgress.quizScore, session]);

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

  // Switch tabs smoothly and notify parent navigation / sidebar
  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionCompleted(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l1_d7', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // LEVEL 1 CURRICULUM AUDIT (DAYS 1 TO 7)
  // ==========================================
  const checkDayStatus = (dayNum) => {
    if (dayNum === 7) {
      return {
        completed: savedProgress.completedDay || savedProgress.quizPassed,
        score: savedProgress.quizScore,
        passed: savedProgress.quizPassed
      };
    }
    try {
      const dKey = `spoko_reasoning_d${dayNum}_progress_${userKey}`;
      const item = localStorage.getItem(dKey);
      if (item) {
        const parsed = JSON.parse(item);
        return {
          completed: Boolean(parsed.completedDay || parsed.quizPassed),
          score: parsed.quizScore || 0,
          passed: Boolean(parsed.quizPassed)
        };
      }
    } catch {}
    // Check fallback completedLessons array
    const altKey = `spoko_reasoning:spoko_reasoning_l1_d${dayNum}:day${dayNum}`;
    const inCompletedList = completedLessons.includes(altKey);
    return { completed: inCompletedList, score: inCompletedList ? 15 : 0, passed: inCompletedList };
  };

  const level1DaysData = [
    { day: 1, title: "Introduction to Logical Thinking", moduleId: "spoko_reasoning_l1_d1", status: checkDayStatus(1) },
    { day: 2, title: "Number Series and Pattern Recognition", moduleId: "spoko_reasoning_l1_d2", status: checkDayStatus(2) },
    { day: 3, title: "Alphabet and Symbol Patterns", moduleId: "spoko_reasoning_l1_d3", status: checkDayStatus(3) },
    { day: 4, title: "Classification and Odd One Out", moduleId: "spoko_reasoning_l1_d4", status: checkDayStatus(4) },
    { day: 5, title: "Analogies and Relationships", moduleId: "spoko_reasoning_l1_d5", status: checkDayStatus(5) },
    { day: 6, title: "Basic Deductive Reasoning", moduleId: "spoko_reasoning_l1_d6", status: checkDayStatus(6) },
    { day: 7, title: "Everyday Problem Solving", moduleId: "spoko_reasoning_l1_d7", status: checkDayStatus(7) }
  ];

  const totalPassedDays = level1DaysData.filter(d => d.status.completed).length;
  const isLevel1FullyCompleted = totalPassedDays === 7;

  // ==========================================
  // INTERACTIVE WIDGET STATES
  // ==========================================
  // Section 1: Problem vs Symptom Explorer
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  // Section 2: Fact vs Assumption Classifier
  const [testedFactAssumption, setTestedFactAssumption] = useState({});

  // Section 3: 5 Whys Step Explorer
  const [activeWhyStep, setActiveWhyStep] = useState(0);

  // Section 4: Solution Matrix Selection
  const [selectedSolutionIdx, setSelectedSolutionIdx] = useState(1);

  // Section 5: Everyday Scenarios Tab
  const [activeEverydayScen, setActiveEverydayScen] = useState('scen_a');

  // Section 6: 6-Stage Framework Interactive Stepper
  const [activeFrameworkStage, setActiveFrameworkStage] = useState(0);

  // Section 7: Integrated Challenge Switcher
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);

  // Section 8: Quick Revision questions toggle
  const [expandedRevQs, setExpandedRevQs] = useState({});

  // ==========================================
  // PRACTICE QUIZ STATE (20 QUESTIONS)
  // ==========================================
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(savedProgress.quizAnswers || {});
  const [quizSubmitted, setQuizSubmitted] = useState(savedProgress.quizSubmitted || {});
  const [quizFinished, setQuizFinished] = useState(savedProgress.quizFinished || false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'incorrect' | 'correct'

  const handleOptionSelect = (qId, optionIdx) => {
    if (quizSubmitted[qId]) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuestion = (qId) => {
    if (quizSubmitted[qId] || quizAnswers[qId] === undefined) return;
    const currentQ = day7PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    let score = 0;
    day7PracticeQuestions.forEach(q => {
      if (newSubmitted[q.id] && newAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const isCorrect = newAnswers[qId] === currentQ.correctAnswer;
    if (isCorrect) {
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
      } catch {}
    }

    const percentage = Math.round((score / 20) * 100);
    const passed = percentage >= 70;
    const allAnswered = day7PracticeQuestions.every(q => newSubmitted[q.id]);

    setQuizSubmitted(newSubmitted);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: newAnswers,
      quizSubmitted: newSubmitted,
      quizScore: score,
      quizPercentage: percentage,
      quizPassed: passed,
      quizFinished: allAnswered,
      completedDay: passed
    }));

    if (allAnswered) {
      setQuizFinished(true);
      if (passed) {
        try {
          confetti({ particleCount: 120, spread: 100, origin: { y: 0.55 } });
        } catch {}
      }
    }
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted({});
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setIsReviewOpen(false);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: {},
      quizSubmitted: {},
      quizFinished: false,
      quizScore: 0,
      quizPercentage: 0,
      quizPassed: false
    }));
  };

  // Calculate overall Day 7 lesson progress percentage
  const totalDaySections = 10; // overview, sec1-sec7, revision, practice
  const sectionsCompletedCount = savedProgress.completedSections?.length || 1;
  const progressPercent = Math.min(
    100,
    Math.round(
      ((sectionsCompletedCount / totalDaySections) * 0.5 +
        (savedProgress.quizFinished ? (savedProgress.quizScore / 20) * 0.5 : 0)) *
        100
    )
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 1rem 4rem', color: '#1e293b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
          >
            <Home size={14} /> Courses
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d1', 'overview')}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
          >
            Logical Reasoning
          </button>
          <span>/</span>
          <span style={{ color: '#475569', fontWeight: 600 }}>Level 1: Beginner</span>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 7: Everyday Problem Solving (Finale)</span>
        </div>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #4338ca 100%)',
          borderRadius: '20px',
          padding: '2rem 1.75rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(30, 27, 75, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Sparkles size={14} />
                <span>Level 1 Finale • Day 7 of 7</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Everyday Problem Solving
              </h1>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', lineHeight: 1.6, margin: 0 }}>
                {day7Overview.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c7d2fe', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 7 Mastery
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
                {progressPercent}%
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', marginTop: '0.5rem', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: '#10b981', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap', fontSize: '0.85rem', color: '#e0e7ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} /> <strong>7 Practical Sections</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> <strong>45–60 Mins</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={16} /> <strong>20 Graduation Questions</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Trophy size={16} /> <strong>Passing Threshold: 70% (14/20)</strong>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* TAB 0: OVERVIEW & LEARNING OBJECTIVES */}
        {/* ========================================================== */}
        {currentTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={24} style={{ color: '#4f46e5' }} />
                What You Will Master in Day 7 (Level 1 Finale)
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Welcome to Day 7! Throughout Days 1 to 6, you developed foundational thinking tools: pattern recognition, spatial alphabet navigation, classification, analogical mapping, and deductive verification. Today, you apply these analytical skills to the real world: student deadlines, shopping comparisons, workplace bottlenecks, and systematic root-cause diagnosis.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day7Overview.objectives.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', alignItems: 'flex-start' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                      {obj}
                    </span>
                  </div>
                ))}
              </div>

              {/* The Problem Solver's Oath */}
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Shield size={20} />
                  <span>The Problem-Solver's Law: Never Fix a Symptom without Finding the Cause!</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#312e81', lineHeight: 1.6, margin: 0 }}>
                  A symptom is merely a red warning light on the dashboard. Taking action without defining the root cause is like putting black tape over the light to ignore the engine heat. Great thinkers define the problem, verify facts, evaluate trade-offs, and measure results!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d6', 'overview')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Go to Day 6: Deductive Reasoning
                </button>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Section 1: Understanding a Problem →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: UNDERSTANDING A PROBLEM */}
        {/* ========================================================== */}
        {currentTab === 'section1' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 1 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section1Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section1Content.concept}
              </p>

              {/* 4 Core Components */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 4 Elements of Every Real-World Situation
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.fourComponents.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '1rem', marginBottom: '0.35rem' }}>
                      {item.term}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {item.desc}
                    </p>
                    <div style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.82rem', color: '#1e293b' }}>
                      💡 {item.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary Case Walkthrough */}
              <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Educational Case Study: Late Assignments
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Situation: {section1Content.primaryCase.situation}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#166534', marginBottom: '0.75rem' }}>
                  <strong>Surface Symptoms:</strong> {section1Content.primaryCase.symptoms.join(', ')}
                </div>
                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #bbf7d0', fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6 }}>
                  💡 <strong>Analytical Investigation:</strong> {section1Content.primaryCase.investigation}
                </div>
              </div>

              {/* Additional Cases Switcher */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Everyday & Workplace Case Studies
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.additionalCases.map((ac, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {ac.domain}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                      {ac.situation}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Symptom: {ac.symptom}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      {ac.rootCauseInvestigation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('overview')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Overview
                </button>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 2 (Facts vs Assumptions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: FACTS VERSUS ASSUMPTIONS */}
        {/* ========================================================== */}
        {currentTab === 'section2' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 2 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section2Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section2Content.concept}
              </p>

              {/* Case Study Box */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Core Case Study: Low Test Score
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                  {section2Content.caseStudy.situation}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      ✓ VERIFIED FACTS (Known with Proof)
                    </div>
                    {section2Content.caseStudy.facts.map((f, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '0.25rem' }}>
                        • {f}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      ✕ UNPROVEN ASSUMPTION (Guess)
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#7f1d1d', fontWeight: 600 }}>
                      "{section2Content.caseStudy.assumption}"
                    </div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155' }}>
                  💡 <strong>Analysis:</strong> {section2Content.caseStudy.explanation}
                </div>
              </div>

              {/* Practical Scenarios Grid */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Everyday Fact vs Assumption Scenarios
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section2Content.practicalScenarios.map((ps, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      {ps.field}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#166534', background: '#f0fdf4', padding: '0.4rem 0.65rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                      <strong>Fact:</strong> {ps.fact}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#991b1b', background: '#fef2f2', padding: '0.4rem 0.65rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                      <strong>Assumption:</strong> {ps.assumption}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      💡 <strong>Reality Check:</strong> {ps.realityCheck}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 1 (Understanding Problems)
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 3 (Root Cause Diagnosis) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: FINDING THE ROOT CAUSE */}
        {/* ========================================================== */}
        {currentTab === 'section3' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 3 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section3Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section3Content.concept}
              </p>

              {/* 6-Step Diagnosis Sequence */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 6-Step Systematic Diagnostic Protocol
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {section3Content.sixStepDiagnosis.map(st => (
                  <div key={st.step} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                      {st.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                        {st.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {st.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive 5 Whys Widget */}
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', border: '2px solid #c4b5fd', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6d28d9', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={22} />
                  <span>Interactive 5 Whys Method: Drilling Down to the Source</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4c1d95', marginBottom: '1.25rem' }}>
                  {section3Content.fiveWhysMethod.desc}
                </p>

                <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {section3Content.fiveWhysMethod.example.map((wh, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #ddd6fe',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}
                    >
                      <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                        {wh.q}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>
                        ➡️ <strong>Finding:</strong> {wh.a}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #a78bfa', fontSize: '0.9rem', color: '#5b21b6', fontWeight: 700 }}>
                  🎯 {section3Content.fiveWhysMethod.rootCauseLesson}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 2 (Facts & Assumptions)
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 4 (Comparing Solutions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: COMPARING POSSIBLE SOLUTIONS */}
        {/* ========================================================== */}
        {currentTab === 'section4' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 4 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section4Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section4Content.concept}
              </p>

              {/* 5 Evaluation Criteria */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 5 Universal Criteria for Comparing Solutions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {section4Content.fiveEvaluationCriteria.map((crit, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {crit.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      {crit.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Solution Comparison Case Study */}
              <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Practical Decision Matrix
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Situation: {section4Content.workedExample.situation}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  {section4Content.workedExample.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: `2px solid ${idx === 1 ? '#10b981' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        padding: '1.25rem',
                        boxShadow: idx === 1 ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                      }}
                    >
                      <div style={{ fontWeight: 800, color: idx === 1 ? '#047857' : '#0f172a', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                        {sol.name} {idx === 1 ? '🌟 (Optimal)' : ''}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#166534', marginBottom: '0.25rem' }}>
                        ✓ {sol.pros}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#991b1b', marginBottom: '0.5rem' }}>
                        ✕ {sol.cons}
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: idx === 1 ? '#047857' : '#64748b', background: '#f8fafc', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                        Verdict: {sol.verdict}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.9rem', color: '#14532d' }}>
                  💡 <strong>Recommendation Rationale:</strong> {section4Content.workedExample.recommendation}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 3 (Root Causes)
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 5 (Everyday Situations) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: APPLYING LOGICAL REASONING TO EVERYDAY SITUATIONS */}
        {/* ========================================================== */}
        {currentTab === 'section5' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 5 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section5Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section5Content.concept}
              </p>

              {/* 4 Realistic Everyday Scenarios Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {section5Content.scenarios.map(scen => (
                  <div key={scen.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {scen.title}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#1e293b', marginBottom: '0.75rem', background: '#ffffff', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <strong>Context:</strong> {scen.context}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      💡 <strong>Logical Breakdown:</strong> {scen.reasoning}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 4 (Comparing Solutions)
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 6 (Decision-Making & Verification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: DECISION-MAKING AND CHECKING RESULTS */}
        {/* ========================================================== */}
        {currentTab === 'section6' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 6 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section6Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section6Content.concept}
              </p>

              {/* The 6-Stage Framework Strip */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  The Closed-Loop Decision Framework
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {section6Content.frameworkStages.map((stg, i) => (
                    <div key={i} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem', textAlign: 'center' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#4f46e5', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem' }}>
                        {i + 1}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                        {stg.stage}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {stg.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Punctuality Audit Case Study */}
              <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Worked Verification Protocol: Student Class Punctuality
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                  {section6Content.punctualityCase.problem}
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {section6Content.punctualityCase.auditPlan.map((stepStr, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.88rem', color: '#1e293b' }}>
                      {stepStr}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 5 (Everyday Scenarios)
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 7 (Capstone Challenges) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: INTEGRATED PROBLEM-SOLVING CHALLENGE */}
        {/* ========================================================== */}
        {currentTab === 'section7' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Section 7 of 7
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                {section7Content.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section7Content.concept}
              </p>

              {/* Challenge Selector */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {section7Content.challenges.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChallengeIdx(idx)}
                    style={{
                      background: activeChallengeIdx === idx ? '#4f46e5' : '#f1f5f9',
                      color: activeChallengeIdx === idx ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Challenge {idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Challenge Deep Dive */}
              {(() => {
                const ch = section7Content.challenges[activeChallengeIdx];
                return (
                  <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>
                        Linked to {ch.dayLink}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                        Expected: {ch.answer}
                      </span>
                    </div>

                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
                      {ch.title}
                    </div>

                    <div style={{ fontSize: '0.95rem', color: '#1e293b', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                      <strong>Problem Scenario:</strong><br />{ch.problem}
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1rem', fontSize: '0.9rem', color: '#14532d', lineHeight: 1.6 }}>
                      💡 <strong>Step-by-Step Resolution:</strong><br />{ch.stepByStep}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 6 (Verification)
                </button>
                <button
                  onClick={() => handleTabChange('revision')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Quick Revision & Checklist →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 8: QUICK REVISION & CHECKLIST */}
        {/* ========================================================== */}
        {currentTab === 'revision' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Level 1 Capstone Revision
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {day7Revision.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {day7Revision.subtitle}
              </p>

              {/* 8 Master Principles Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day7Revision.checklist.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Revision Questions */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                5 Rapid Problem-Solving Self-Check Questions
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day7Revision.revisionQuestions.map((rq, idx) => {
                  const isOpen = expandedRevQs[idx];
                  return (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div
                        onClick={() => setExpandedRevQs(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        style={{
                          padding: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#0f172a'
                        }}
                      >
                        <span>{rq.q}</span>
                        <span style={{ fontSize: '0.82rem', color: '#4f46e5', fontWeight: 800 }}>
                          {isOpen ? 'Hide Answer ▲' : 'Show Answer ▼'}
                        </span>
                      </div>
                      {isOpen && (
                        <div style={{ padding: '0.85rem 1rem', background: '#f0fdf4', borderTop: '1px solid #bbf7d0', fontSize: '0.9rem', color: '#166534' }}>
                          <div><strong>Answer:</strong> {rq.ans}</div>
                          <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#14532d' }}>💡 {rq.exp}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Launch Final Quiz CTA */}
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '12px', padding: '1.5rem', color: '#ffffff', textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
                  Ready for the Final 20-Question Level 1 Graduation Quiz?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#c7d2fe', maxWidth: '600px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
                  This 20-question capstone assessment evaluates your mastery of real-world problem solving, time calculations, classification, and deductive logic. Passing score is 70% (14 out of 20).
                </p>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  Launch Graduation Quiz (20 Qs) →
                </button>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 7 (Challenges)
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Start Practice Quiz (20 Qs) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 9: INTERACTIVE PRACTICE QUIZ (EXACTLY 20 QUESTIONS) */}
        {/* ========================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              
              {/* Header & Question Navigation Jump-Pills */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Level 1 Graduation Quiz • Question {currentQuizIdx + 1} of 20
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
                    Everyday Problem Solving Assessment
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button
                    onClick={() => handleTabChange('assessment')}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                  >
                    View Scorecard 📊
                  </button>
                </div>
              </div>

              {/* 20-Pill Jump Bar */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                {day7PracticeQuestions.map((q, idx) => {
                  const isSubmitted = quizSubmitted[q.id];
                  const isCorrect = isSubmitted && quizAnswers[q.id] === q.correctAnswer;
                  const isCurrent = currentQuizIdx === idx;

                  let bgColor = '#ffffff';
                  let textColor = '#475569';
                  let borderColor = '#cbd5e1';

                  if (isSubmitted) {
                    bgColor = isCorrect ? '#dcfce7' : '#fee2e2';
                    textColor = isCorrect ? '#15803d' : '#dc2626';
                    borderColor = isCorrect ? '#86efac' : '#fca5a5';
                  }

                  if (isCurrent) {
                    borderColor = '#4f46e5';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuizIdx(idx)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: bgColor,
                        color: textColor,
                        border: `2px solid ${borderColor}`,
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isCurrent ? '0 0 0 2px #c7d2fe' : 'none'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Current Question Body */}
              {(() => {
                const q = day7PracticeQuestions[currentQuizIdx];
                const isSubmitted = quizSubmitted[q.id];
                const selectedOpt = quizAnswers[q.id];
                const isCorrect = isSubmitted && selectedOpt === q.correctAnswer;

                return (
                  <div>
                    {/* Topic & Difficulty Badges */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {q.topic}
                      </span>
                      <span style={{
                        background: q.difficulty === 'Easy' ? '#dcfce7' : q.difficulty === 'Easy-to-Moderate' ? '#dbeafe' : q.difficulty === 'Moderate' ? '#fef3c7' : '#f3e8ff',
                        color: q.difficulty === 'Easy' ? '#166534' : q.difficulty === 'Easy-to-Moderate' ? '#1e40af' : q.difficulty === 'Moderate' ? '#92400e' : '#6b21a8',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {q.difficulty}
                      </span>
                    </div>

                    {/* Question Statement */}
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {q.question}
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {q.options.map((optText, optIdx) => {
                        const optLabel = ['A', 'B', 'C', 'D'][optIdx];
                        const isChosen = selectedOpt === optIdx;
                        const isRightAnswer = isSubmitted && optIdx === q.correctAnswer;
                        const isWrongSelection = isSubmitted && isChosen && !isCorrect;

                        let cardBg = '#f8fafc';
                        let cardBorder = '#e2e8f0';
                        let labelBg = '#e2e8f0';
                        let labelColor = '#475569';

                        if (isChosen && !isSubmitted) {
                          cardBg = '#eef2ff';
                          cardBorder = '#6366f1';
                          labelBg = '#4f46e5';
                          labelColor = '#ffffff';
                        }

                        if (isRightAnswer) {
                          cardBg = '#f0fdf4';
                          cardBorder = '#22c55e';
                          labelBg = '#16a34a';
                          labelColor = '#ffffff';
                        } else if (isWrongSelection) {
                          cardBg = '#fef2f2';
                          cardBorder = '#ef4444';
                          labelBg = '#dc2626';
                          labelColor = '#ffffff';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              padding: '1rem 1.25rem',
                              borderRadius: '12px',
                              background: cardBg,
                              border: `2px solid ${cardBorder}`,
                              cursor: isSubmitted ? 'default' : 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              background: labelBg,
                              color: labelColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              flexShrink: 0
                            }}>
                              {optLabel}
                            </div>
                            <span style={{ fontSize: '0.98rem', fontWeight: isChosen ? 700 : 500, color: '#1e293b' }}>
                              {optText}
                            </span>
                            {isRightAnswer && <CheckCircle2 size={20} style={{ color: '#16a34a', marginLeft: 'auto' }} />}
                            {isWrongSelection && <XCircle size={20} style={{ color: '#dc2626', marginLeft: 'auto' }} />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action: Submit Answer button or Explanation Card */}
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleSubmitQuestion(q.id)}
                        disabled={selectedOpt === undefined}
                        style={{
                          background: selectedOpt === undefined ? '#cbd5e1' : '#4f46e5',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.75rem 1.75rem',
                          borderRadius: '10px',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          cursor: selectedOpt === undefined ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          marginBottom: '1.5rem'
                        }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div style={{
                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1rem', color: isCorrect ? '#15803d' : '#991b1b', marginBottom: '0.5rem' }}>
                          {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                          <span>{isCorrect ? 'Correct! Problem-Solving Logic Verified!' : 'Incorrect. Notice the Mathematical/Logical Reasoning Below:'}</span>
                        </div>
                        <p style={{ fontSize: '0.92rem', color: isCorrect ? '#166534' : '#7f1d1d', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                        <div style={{ fontSize: '0.82rem', color: isCorrect ? '#15803d' : '#991b1b', fontStyle: 'italic' }}>
                          💡 Distractor Analysis: {q.distractorNotes}
                        </div>
                      </div>
                    )}

                    {/* Question Navigation Bottom Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                      <button
                        onClick={() => setCurrentQuizIdx(Math.max(0, currentQuizIdx - 1))}
                        disabled={currentQuizIdx === 0}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          padding: '0.65rem 1.25rem',
                          borderRadius: '8px',
                          fontWeight: 600,
                          color: currentQuizIdx === 0 ? '#cbd5e1' : '#475569',
                          cursor: currentQuizIdx === 0 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        ← Previous
                      </button>

                      {currentQuizIdx < day7PracticeQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuizIdx(currentQuizIdx + 1)}
                          style={{
                            background: '#4f46e5',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          Next Question →
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTabChange('assessment')}
                          style={{
                            background: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.65rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          View Final Level 1 Results 🏆
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 10: ASSESSMENT SUMMARY & LEVEL 1 FINAL GRADUATION */}
        {/* ========================================================== */}
        {currentTab === 'assessment' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem 2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '2rem' }}>
              
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: savedProgress.quizPassed ? '#dcfce7' : '#fee2e2',
                color: savedProgress.quizPassed ? '#16a34a' : '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: savedProgress.quizPassed ? '0 8px 20px rgba(22, 163, 74, 0.2)' : 'none'
              }}>
                {savedProgress.quizPassed ? <Trophy size={40} /> : <AlertCircle size={40} />}
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                {savedProgress.quizPassed ? 'Day 7 Assessment Passed!' : 'More Practice Recommended'}
              </h2>

              {/* Dynamic Result Message as Required by Prompt */}
              <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                {savedProgress.quizPercentage >= 90
                  ? '🌟 Excellent! You can apply logical reasoning to everyday problems.'
                  : savedProgress.quizPercentage >= 70
                  ? '🎉 Good progress! You are building practical problem-solving skills.'
                  : savedProgress.quizPercentage >= 50
                  ? '⚠️ Keep practising. Review the scenarios and explanations.'
                  : '📘 Revisit the lessons before retrying the quiz.'}
              </p>

              {/* Score Badges Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL QUESTIONS</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>20</div>
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>CORRECT</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#16a34a', marginTop: '0.2rem' }}>{savedProgress.quizScore}</div>
                </div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b' }}>INCORRECT</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#dc2626', marginTop: '0.2rem' }}>{20 - savedProgress.quizScore}</div>
                </div>
                <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338ca' }}>PERCENTAGE</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4f46e5', marginTop: '0.2rem' }}>{savedProgress.quizPercentage}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  style={{
                    background: '#ffffff',
                    border: '2px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Eye size={18} /> Review All 20 Answers
                </button>

                <button
                  onClick={handleRetryQuiz}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#475569',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <RotateCcw size={18} /> Retry Quiz
                </button>
              </div>

              {/* ======================================================= */}
              {/* LEVEL 1 FINAL COMPLETION SUMMARY CARD (DAYS 1 TO 7) */}
              {/* ======================================================= */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '2px solid #cbd5e1',
                borderRadius: '16px',
                padding: '1.75rem',
                textAlign: 'left',
                marginTop: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GraduationCap size={24} style={{ color: '#4f46e5' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Logical Reasoning • Level 1 Curriculum Audit
                    </h3>
                  </div>
                  <span style={{
                    background: isLevel1FullyCompleted ? '#dcfce7' : '#e0e7ff',
                    color: isLevel1FullyCompleted ? '#166534' : '#3730a3',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 800
                  }}>
                    {totalPassedDays} of 7 Days Completed
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Review your progress across all 7 foundational days of Level 1. In accordance with platform integrity rules, each day must be completed with verified quiz attempts:
                </p>

                {/* 7-Day Audit Table / List */}
                <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {level1DaysData.map(d => {
                    const isDone = d.status.completed;
                    return (
                      <div
                        key={d.day}
                        style={{
                          background: '#ffffff',
                          border: `1px solid ${isDone ? '#86efac' : '#e2e8f0'}`,
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: isDone ? '#dcfce7' : '#f1f5f9',
                            color: isDone ? '#16a34a' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {isDone ? '✓' : d.day}
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>
                            Day {d.day}: {d.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: isDone ? '#166534' : '#64748b',
                            background: isDone ? '#f0fdf4' : '#f8fafc',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px'
                          }}>
                            {isDone ? 'Passed / Completed' : 'Pending Completion'}
                          </span>
                          {!isDone && (
                            <button
                              onClick={() => onNavigate && onNavigate(d.moduleId, 'overview')}
                              style={{
                                background: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#4f46e5',
                                cursor: 'pointer'
                              }}
                            >
                              Go to Day {d.day} →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final Level 1 Status / Level 2 CTA */}
                {isLevel1FullyCompleted ? (
                  <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534', marginBottom: '0.5rem' }}>
                      🎓 Congratulations! You Have Mastered Level 1: Beginner!
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#14532d', maxWidth: '650px', margin: '0 auto 1rem', lineHeight: 1.5 }}>
                      You have passed all 7 days of Logical Reasoning Level 1. You are now equipped with structured analytical skills across patterns, classification, analogies, deductive logic, and everyday problem solving.
                    </p>
                    <button
                      onClick={() => onNavigate && onNavigate('spoko_reasoning_l2_d8', 'overview')}
                      style={{
                        background: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      Continue to Level 2: Day 8 (Data Interpretation) →
                    </button>
                  </div>
                ) : (
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <AlertTriangle size={24} style={{ color: '#d97706', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.88rem', color: '#92400e', lineHeight: 1.5 }}>
                      <strong>Level 1 Completion in Progress:</strong> You have completed {totalPassedDays} of 7 days. Complete and pass all pending days above to unlock full Level 1 graduation status!
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* REVIEW MODAL (FULL 20 QUESTIONS AUDIT) */}
        {/* ========================================================== */}
        {isReviewOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden'
            }}>
              {/* Modal Header */}
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Assessment Answer Review
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Score: {savedProgress.quizScore} / 20 ({savedProgress.quizPercentage}%)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {/* Filter Pills */}
                  <button
                    onClick={() => setReviewFilter('all')}
                    style={{
                      background: reviewFilter === 'all' ? '#4f46e5' : '#f1f5f9',
                      color: reviewFilter === 'all' ? '#ffffff' : '#475569',
                      border: 'none',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    All (20)
                  </button>
                  <button
                    onClick={() => setReviewFilter('incorrect')}
                    style={{
                      background: reviewFilter === 'incorrect' ? '#dc2626' : '#fee2e2',
                      color: reviewFilter === 'incorrect' ? '#ffffff' : '#991b1b',
                      border: 'none',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Incorrect ({20 - savedProgress.quizScore})
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    style={{
                      background: reviewFilter === 'correct' ? '#16a34a' : '#dcfce7',
                      color: reviewFilter === 'correct' ? '#ffffff' : '#166534',
                      border: 'none',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Correct ({savedProgress.quizScore})
                  </button>

                  <button
                    onClick={() => setIsReviewOpen(false)}
                    style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 800, color: '#475569', marginLeft: '0.5rem' }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable Questions */}
              <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {day7PracticeQuestions
                  .filter(q => {
                    const isCorrect = quizSubmitted[q.id] && quizAnswers[q.id] === q.correctAnswer;
                    if (reviewFilter === 'correct') return isCorrect;
                    if (reviewFilter === 'incorrect') return !isCorrect;
                    return true;
                  })
                  .map((q, i) => {
                    const originalIdx = day7PracticeQuestions.findIndex(item => item.id === q.id);
                    const userOptIdx = quizAnswers[q.id];
                    const isCorrect = quizSubmitted[q.id] && userOptIdx === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        style={{
                          background: isCorrect ? '#f0fdf4' : '#fef2f2',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b' }}>
                            Question {originalIdx + 1} • {q.topic}
                          </span>
                          <span style={{
                            background: isCorrect ? '#bbf7d0' : '#fecaca',
                            color: isCorrect ? '#14532d' : '#7f1d1d',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                          </span>
                        </div>

                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                          {q.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, oIdx) => {
                            const isUserPicked = userOptIdx === oIdx;
                            const isAnswer = q.correctAnswer === oIdx;
                            return (
                              <div
                                key={oIdx}
                                style={{
                                  background: isAnswer ? '#bbf7d0' : isUserPicked ? '#fecaca' : '#ffffff',
                                  border: `1px solid ${isAnswer ? '#22c55e' : isUserPicked ? '#ef4444' : '#cbd5e1'}`,
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  fontWeight: isAnswer || isUserPicked ? 700 : 400,
                                  color: '#1e293b'
                                }}
                              >
                                {['A', 'B', 'C', 'D'][oIdx]}. {opt}
                                {isAnswer && ' (Correct)'}
                                {isUserPicked && !isAnswer && ' (Your Choice)'}
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#334155' }}>
                          💡 <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', background: '#f8fafc' }}>
                <button
                  onClick={() => setIsReviewOpen(false)}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BOTTOM GLOBAL COURSE NAVIGATION BAR */}
        {/* ========================================================== */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d1', 'overview')}
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
            ← Back to Level 1 Curriculum
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d6', 'overview')}
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
              ← Previous: Day 6 (Deductive Reasoning)
            </button>

            <button
              onClick={() => handleTabChange('assessment')}
              style={{
                background: savedProgress.completedDay ? '#10b981' : '#4f46e5',
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
              {savedProgress.completedDay ? 'View Level 1 Graduation 🎓' : 'View Day 7 Assessment 📊'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
