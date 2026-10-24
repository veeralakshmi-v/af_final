import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, ChevronDown, ChevronUp, AlertCircle,
  Eye, CheckSquare, ShieldCheck, TrendingUp, TrendingDown, Home, GraduationCap,
  Briefcase, Filter, Info, FileText, Hash, Calculator, Split, Grid, CheckCheck,
  Lightbulb, Compass, Search, Play, Trophy, Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day2Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day2PracticeQuestions
} from '../../data/reasoningLevel1Day2.js';

export default function SpokoReasoningDay2({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d2_progress_${userKey}`;

  // Current active sub-tab (driven by Sidebar or section progression)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
      markSectionCompleted(activeTab);
    }
  }, [activeTab]);

  // Persistence State
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : {
        completedSections: ['overview'],
        quizAnswers: {},
        quizSubmitted: {},
        quizScore: 0,
        quizFinished: false,
        completedDay: false,
        attemptCount: 0,
        lastActivity: new Date().toISOString()
      };
    } catch {
      return {
        completedSections: ['overview'],
        quizAnswers: {},
        quizSubmitted: {},
        quizScore: 0,
        quizFinished: false,
        completedDay: false,
        attemptCount: 0,
        lastActivity: new Date().toISOString()
      };
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.warn('Failed to save Day 2 reasoning progress', e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d2:day2';
      // 1. Post to progress toggle endpoint
      fetch(`/api/students/${studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonKey, completed: true })
      }).catch(() => {});

      // 2. Also notify lessons endpoint for score record
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
      onNavigate('spoko_reasoning_l1_d2', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 1: Interactive 5-Step Series Studio
  const [solverActivePattern, setSolverActivePattern] = useState(0);
  const [solverCurrentStep, setSolverCurrentStep] = useState(1);
  const [solverStep1Answer, setSolverStep1Answer] = useState(null);
  const [solverStep5Answer, setSolverStep5Answer] = useState(null);

  const solverPatterns = [
    {
      id: 'pattern_add',
      name: 'Challenge 1: Steady Steps (+2)',
      badge: 'Constant Addition',
      color: '#4f46e5',
      lightBg: '#e0e7ff',
      sequence: [2, 4, 6, 8, '__'],
      speedVerdict: 'Gentle, steady growth (+2 per jump) → Suggests ADDITION!',
      speedType: 'Addition',
      speedOptions: [
        { label: '🚀 Explosive Rocket Jump (Multiplication)', isCorrect: false, hint: 'Numbers are only growing by 2, not multiplying fast.' },
        { label: '🐢 Calm, Steady Uniform Steps (Addition)', isCorrect: true, hint: 'Spot on! Each number increases by just 2.' },
        { label: '📉 Sharp Plunge (Division)', isCorrect: false, hint: 'The numbers are increasing, not decreasing.' }
      ],
      differences: [
        { from: 2, to: 4, diff: '+2', calc: '4 − 2 = +2' },
        { from: 4, to: 6, diff: '+2', calc: '6 − 4 = +2' },
        { from: 6, to: 8, diff: '+2', calc: '8 − 6 = +2' }
      ],
      ruleText: 'Add 2 to each consecutive term',
      ruleFormula: 'Next Term = Current Term + 2',
      verifications: [
        { term: 'Term 1 → Term 2', calc: '2 + 2 = 4', valid: true },
        { term: 'Term 2 → Term 3', calc: '4 + 2 = 6', valid: true },
        { term: 'Term 3 → Term 4', calc: '6 + 2 = 8', valid: true }
      ],
      finalPrompt: 'Apply the verified rule (+2) to the last term 8:',
      finalChoices: ['8', '10', '12'],
      correctAnswer: '10',
      finalExplanation: 'Each term increases by 2. Therefore, 8 + 2 = 10.'
    },
    {
      id: 'pattern_mult',
      name: 'Challenge 2: Rapid Jumps (×3)',
      badge: 'Multiplication Power',
      color: '#7c3aed',
      lightBg: '#ede9fe',
      sequence: [3, 9, 27, 81, '__'],
      speedVerdict: 'Explosive, accelerating leaps (×3 per jump) → Suggests MULTIPLICATION!',
      speedType: 'Multiplication',
      speedOptions: [
        { label: '🚀 Rapid Accelerating Jumps (Multiplication)', isCorrect: true, hint: 'Bingo! 3 jumps to 9, then 27, then 81—multiplying fast!' },
        { label: '🐢 Slow Steps (Addition)', isCorrect: false, hint: 'Notice the huge jumps: 81 − 27 = 54! This is too fast for simple addition.' },
        { label: '⚖️ Alternating Jumps', isCorrect: false, hint: 'The sequence goes purely upward in a single direction.' }
      ],
      differences: [
        { from: 3, to: 9, diff: '×3', calc: '9 ÷ 3 = 3' },
        { from: 9, to: 27, diff: '×3', calc: '27 ÷ 9 = 3' },
        { from: 27, to: 81, diff: '×3', calc: '81 ÷ 27 = 3' }
      ],
      ruleText: 'Multiply each term by 3 (Tripling)',
      ruleFormula: 'Next Term = Current Term × 3',
      verifications: [
        { term: 'Term 1 → Term 2', calc: '3 × 3 = 9', valid: true },
        { term: 'Term 2 → Term 3', calc: '9 × 3 = 27', valid: true },
        { term: 'Term 3 → Term 4', calc: '27 × 3 = 81', valid: true }
      ],
      finalPrompt: 'Apply the verified rule (×3) to the last term 81:',
      finalChoices: ['162', '243', '324'],
      correctAnswer: '243',
      finalExplanation: 'Each term is multiplied by 3. Therefore, 81 × 3 = 243.'
    },
    {
      id: 'pattern_square',
      name: 'Challenge 3: Perfect Squares (n²)',
      badge: 'Square Powers',
      color: '#059669',
      lightBg: '#d1fae5',
      sequence: [1, 4, 9, 16, '__'],
      speedVerdict: 'Quadratic expansion (1², 2², 3², 4²) → Suggests PERFECT SQUARES!',
      speedType: 'Squares',
      speedOptions: [
        { label: '🐢 Constant Addition (+3, +3...)', isCorrect: false, hint: 'Differences are 3, 5, 7—they keep changing!' },
        { label: '📐 Consecutive Perfect Squares (n²)', isCorrect: true, hint: 'Excellent! 1=1², 4=2², 9=3², 16=4².' },
        { label: '📉 Sharp Drops (Division)', isCorrect: false, hint: 'The values are increasing.' }
      ],
      differences: [
        { from: 1, to: 4, diff: '2²', calc: '1 = 1², 4 = 2²' },
        { from: 4, to: 9, diff: '3²', calc: '4 = 2², 9 = 3²' },
        { from: 9, to: 16, diff: '4²', calc: '9 = 3², 16 = 4²' }
      ],
      ruleText: 'Square of consecutive integers (1², 2², 3², 4²...)',
      ruleFormula: 'Term n = n²',
      verifications: [
        { term: 'Term 1', calc: '1 × 1 = 1', valid: true },
        { term: 'Term 2', calc: '2 × 2 = 4', valid: true },
        { term: 'Term 3', calc: '3 × 3 = 9', valid: true },
        { term: 'Term 4', calc: '4 × 4 = 16', valid: true }
      ],
      finalPrompt: 'Apply the rule to find the 5th square (5² = 5 × 5):',
      finalChoices: ['20', '25', '36'],
      correctAnswer: '25',
      finalExplanation: 'The sequence consists of squares: 1, 4, 9, 16. The 5th term is 5² = 25.'
    }
  ];

  const handleSelectPattern = (idx) => {
    setSolverActivePattern(idx);
    setSolverCurrentStep(1);
    setSolverStep1Answer(null);
    setSolverStep5Answer(null);
  };

  // Section 2: Interactive Difference Checker State
  const [diffUserInputs, setDiffUserInputs] = useState({});
  const [diffCheckFeedback, setDiffCheckFeedback] = useState({});
  const handleDiffCheck = (exId, selectedVal, correctVal) => {
    setDiffUserInputs(prev => ({ ...prev, [exId]: selectedVal }));
    setDiffCheckFeedback(prev => ({
      ...prev,
      [exId]: selectedVal === correctVal ? 'correct' : 'incorrect'
    }));
  };

  // Section 3: Beginner Spotter Game State
  const [spotterActiveIdx, setSpotterActiveIdx] = useState(0);
  const [spotterAnswers, setSpotterAnswers] = useState({});

  // Section 4: 2-Level Ladder Step
  const [ladderRevealStep, setLadderRevealStep] = useState(2);

  // Section 5: Alternating Splitter Toggle
  const [isAlternatingSplit, setIsAlternatingSplit] = useState(false);

  // Section 6: Squares vs Cubes Tab
  const [activeMathPowerTab, setActiveMathPowerTab] = useState('squares');

  // Section 7: Strategy Checklist Interactive State
  const [strategyChecks, setStrategyChecks] = useState({
    step1: true,
    step2: true,
    step3: false,
    step4: false,
    step5: false,
    step6: false
  });
  const toggleStrategyCheck = (key) => {
    setStrategyChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Day 3 Preview Modal
  const [showDay3Modal, setShowDay3Modal] = useState(false);

  // PRACTICE QUIZ STATE (20 QUESTIONS)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(savedProgress.quizAnswers || {});
  const [quizSubmitted, setQuizSubmitted] = useState(savedProgress.quizSubmitted || {});
  const [quizFinished, setQuizFinished] = useState(savedProgress.quizFinished || false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleOptionSelect = (qId, optionIdx) => {
    if (quizSubmitted[qId]) return; // locked once submitted
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuestion = (qId) => {
    if (quizSubmitted[qId] || quizAnswers[qId] === undefined) return;
    const currentQ = day2PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    // Calculate score
    let score = 0;
    day2PracticeQuestions.forEach(q => {
      if (newSubmitted[q.id] && newAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const isAllSubmitted = day2PracticeQuestions.every(q => newSubmitted[q.id]);

    setQuizSubmitted(newSubmitted);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: newAnswers,
      quizSubmitted: newSubmitted,
      quizScore: score,
      quizFinished: isAllSubmitted || prev.quizFinished,
      completedDay: score >= 14 ? true : prev.completedDay,
      lastActivity: new Date().toISOString()
    }));

    markSectionCompleted('practice');
  };

  // Final Score calculation
  const totalCorrect = useMemo(() => {
    let count = 0;
    day2PracticeQuestions.forEach(q => {
      if (quizSubmitted[q.id] && quizAnswers[q.id] === q.correctAnswer) {
        count++;
      }
    });
    return count;
  }, [quizAnswers, quizSubmitted]);

  const percentage = Math.round((totalCorrect / 20) * 100);
  const isPassing = percentage >= 70; // 14 out of 20 = 70%

  const handleCompleteQuiz = () => {
    setQuizFinished(true);
    setSavedProgress(prev => ({
      ...prev,
      quizFinished: true,
      quizScore: totalCorrect,
      completedDay: totalCorrect >= 14,
      lastActivity: new Date().toISOString()
    }));
    handleTabChange('assessment');
  };

  const handleRetryQuiz = () => {
    if (!window.confirm("Are you sure you want to retry the quiz? Your previous answers will be cleared.")) return;
    setQuizAnswers({});
    setQuizSubmitted({});
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setIsReviewOpen(false);
    setSavedProgress(prev => ({
      ...prev,
      quizAnswers: {},
      quizSubmitted: {},
      quizScore: 0,
      quizFinished: false,
      attemptCount: (prev.attemptCount || 0) + 1,
      lastActivity: new Date().toISOString()
    }));
    handleTabChange('practice');
  };

  // Mark Day 2 complete in LMS
  const handleMarkDayComplete = () => {
    setSavedProgress(prev => ({
      ...prev,
      completedDay: true,
      lastActivity: new Date().toISOString()
    }));
    markSectionCompleted('assessment');
    alert("Congratulations! Level 1 – Day 2 (Number Series) has been marked complete in your progress tracker.");
  };

  // Analyze topics to revise based on incorrect answers
  const topicsToRevise = useMemo(() => {
    const wrongByCategory = {};
    day2PracticeQuestions.forEach(q => {
      if (quizSubmitted[q.id] && quizAnswers[q.id] !== q.correctAnswer) {
        wrongByCategory[q.category] = (wrongByCategory[q.category] || 0) + 1;
      }
    });
    return Object.entries(wrongByCategory).map(([cat, count]) => ({
      category: cat,
      count
    }));
  }, [quizAnswers, quizSubmitted]);

  // Overall progress percentage across 7 sections + quiz
  const overallProgressPercentage = useMemo(() => {
    let points = 0;
    const sections = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7'];
    sections.forEach(s => {
      if (savedProgress.completedSections?.includes(s)) points += 10;
    });
    const answeredCount = Object.keys(quizSubmitted).length;
    points += Math.round((answeredCount / 20) * 30);
    return Math.min(100, points);
  }, [savedProgress.completedSections, quizSubmitted]);


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      paddingBottom: '5rem'
    }}>
      {/* 🧭 BREADCRUMB NAVIGATION */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        fontSize: '0.85rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
        >
          Courses
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d1', 'overview')}
          style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0, fontWeight: 500 }}
        >
          Logical Reasoning & Analytical Thinking
        </button>
        <span>/</span>
        <span style={{ color: '#475569', fontWeight: 500 }}>Level 1 – Beginner</span>
        <span>/</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 2: Number Series and Pattern Recognition</span>
      </div>

      {/* 🌟 HERO / HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 80%, #6366f1 100%)',
        color: '#ffffff',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Level 1 – Beginner
            </span>
            <span style={{
              background: '#10b981',
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Day 2 of 30
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              Interactive Written Masterclass
            </span>
            {savedProgress.completedDay && (
              <span style={{
                background: '#fbbf24',
                color: '#78350f',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={13} /> Day 2 Completed
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 0.75rem 0'
          }}>
            Day 2: Number Series and Pattern Recognition
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#e0e7ff',
            maxWidth: '850px',
            lineHeight: 1.6,
            margin: '0 0 1.5rem 0'
          }}>
            Master the core mathematical patterns tested in aptitude exams and technical interviews. Learn constant differences, multiplication factors, changing gaps, alternating sequences, squares and cubes, and solve 20 interactive practice questions.
          </p>

          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>DAY COMPLETION</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {overallProgressPercentage}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>PRACTICE QUIZ</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {Object.keys(quizSubmitted).length} / 20 Submitted
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>ACCURACY SCORE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a7f3d0' }}>
                {totalCorrect} / 20 ({percentage}%)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c7d2fe', fontWeight: 600 }}>PASSING STATUS (70%)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isPassing ? '#6ee7b7' : '#fde047' }}>
                {savedProgress.completedDay ? 'Certified Complete' : isPassing ? 'Passed (Ready to Mark)' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 📦 MAIN CONTENT CONTAINER */}
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>

        {/* ========================================================== */}
        {/* TAB 0: OVERVIEW & OBJECTIVES */}
        {/* ========================================================== */}
        {currentTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#e0e7ff', padding: '0.6rem', borderRadius: '12px', color: '#4f46e5' }}>
                  <Hash size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#1e1b4b' }}>
                    Welcome to Day 2: Number Series and Pattern Recognition
                  </h2>
                  <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                    Written interactive lessons, real aptitude test examples, and instant feedback
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                borderLeft: '4px solid #4f46e5',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                color: '#334155'
              }}>
                <strong>Why Number Series Matter:</strong> In hiring aptitude tests, campus recruitment exams (TCS, Infosys, Cognizant, Wipro), bank exams, and competitive interviews, number series questions test how quickly you can see patterns in raw data. Instead of randomly guessing numbers, this course trains you in seven exact pattern archetypes and a 6-step checklist to crack any series.
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Day 2 Learning Objectives
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day2Overview.objectives.map((obj, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}>
                    <div style={{
                      background: '#10b981',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.5 }}>
                      {obj}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ready to Begin Card */}
              <div style={{
                background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#312e81', fontSize: '1.1rem' }}>
                    Ready to begin Section 1?
                  </div>
                  <div style={{ color: '#4338ca', fontSize: '0.9rem' }}>
                    Discover what a number series is, why tests love it, and master the fundamental step-by-step method.
                  </div>
                </div>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{
                    background: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
                  }}
                >
                  Start Section 1 <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: INTRODUCTION TO NUMBER SERIES */}
        {/* ========================================================== */}
        {currentTab === 'section1' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 1
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Foundations of Number Patterns</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section1Content.title}
              </h2>

              {/* Core Definition Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Hash size={20} color="#4f46e5" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1e1b4b' }}>What is a Number Series?</h3>
                  </div>
                  <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {section1Content.definition.core}
                  </p>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Sparkles size={20} color="#16a34a" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#065f46' }}>What is a Pattern?</h3>
                  </div>
                  <p style={{ margin: 0, color: '#166534', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {section1Content.definition.patternConcept}
                  </p>
                </div>
              </div>

              {/* Why Aptitude Tests Use Number Series */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Why Do Aptitude Tests Use Number Series?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.definition.whyAptitudeTestsUseIt.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '1rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} color="#4f46e5" /> {item.reason}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* 🎮 INTERACTIVE 5-STEP PATTERN SOLVER STUDIO */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                borderRadius: '16px',
                padding: '2rem',
                color: '#ffffff',
                marginBottom: '2.5rem',
                boxShadow: '0 10px 25px -5px rgba(49, 46, 129, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Header & Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{
                        background: 'rgba(99, 102, 241, 0.3)',
                        border: '1px solid #818cf8',
                        color: '#c7d2fe',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Sparkles size={13} color="#a5b4fc" /> Interactive Solver Studio
                      </span>
                      <span style={{ background: '#10b981', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        Active Learning Mode
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                      How to Solve a Series Step by Step
                    </h3>
                    <p style={{ color: '#c7d2fe', fontSize: '0.9rem', margin: '0.35rem 0 0 0' }}>
                      Walk through the 5 master steps with a live interactive number series. Switch patterns to test different sequence types!
                    </p>
                  </div>

                  {/* Pattern Preset Switcher */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {solverPatterns.map((pat, pIdx) => (
                      <button
                        key={pat.id}
                        onClick={() => handleSelectPattern(pIdx)}
                        style={{
                          background: solverActivePattern === pIdx ? '#4f46e5' : 'rgba(255, 255, 255, 0.1)',
                          border: solverActivePattern === pIdx ? '2px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {pat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Sequence Board */}
                {(() => {
                  const currPat = solverPatterns[solverActivePattern];
                  const isSolved = solverStep5Answer === currPat.correctAnswer;

                  return (
                    <div>
                      {/* Visual 3D Number Sequence Rail */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '14px',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        {currPat.sequence.map((term, tIdx) => {
                          const isMissing = term === '__';
                          const diffInfo = tIdx < currPat.differences.length ? currPat.differences[tIdx] : null;

                          return (
                            <React.Fragment key={tIdx}>
                              {/* Number Tile */}
                              <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '12px',
                                background: isMissing
                                  ? (isSolved ? '#059669' : 'rgba(245, 158, 11, 0.2)')
                                  : 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
                                border: isMissing
                                  ? (isSolved ? '2px solid #34d399' : '2px dashed #f59e0b')
                                  : '1px solid #cbd5e1',
                                color: isMissing ? (isSolved ? '#ffffff' : '#fef3c7') : '#0f172a',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '1.4rem',
                                boxShadow: isMissing && !isSolved
                                  ? '0 0 15px rgba(245, 158, 11, 0.4)'
                                  : '0 4px 6px -1px rgba(0,0,0,0.2)',
                                transition: 'all 0.2s ease'
                              }}>
                                <div>{isMissing ? (isSolved ? currPat.correctAnswer : '?') : term}</div>
                                <div style={{ fontSize: '0.65rem', color: isMissing ? 'rgba(255,255,255,0.7)' : '#64748b', fontWeight: 600 }}>
                                  Term {tIdx + 1}
                                </div>
                              </div>

                              {/* Difference Connector Badge */}
                              {diffInfo && (
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}>
                                  <span style={{
                                    background: solverCurrentStep >= 2 ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    border: solverCurrentStep >= 2 ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.2)',
                                    transition: 'all 0.2s ease'
                                  }}>
                                    {solverCurrentStep >= 2 ? diffInfo.diff : '→'}
                                  </span>
                                  <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                                    {solverCurrentStep >= 2 ? diffInfo.calc : ''}
                                  </span>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* 5-Step Interactive Timeline Tabs */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                        gap: '0.5rem',
                        marginBottom: '1.5rem'
                      }}>
                        {[
                          { num: 1, label: '1. Speed of Change', icon: Zap },
                          { num: 2, label: '2. Differences', icon: Search },
                          { num: 3, label: '3. Formulate Rule', icon: Lightbulb },
                          { num: 4, label: '4. Test All Terms', icon: CheckCircle2 },
                          { num: 5, label: '5. Solve Number', icon: Target }
                        ].map(st => {
                          const IconComponent = st.icon;
                          const isActive = solverCurrentStep === st.num;
                          const isDone = solverCurrentStep > st.num;

                          return (
                            <button
                              key={st.num}
                              onClick={() => setSolverCurrentStep(st.num)}
                              style={{
                                background: isActive
                                  ? '#4f46e5'
                                  : isDone
                                  ? 'rgba(16, 185, 129, 0.2)'
                                  : 'rgba(255, 255, 255, 0.08)',
                                border: isActive
                                  ? '2px solid #818cf8'
                                  : isDone
                                  ? '1px solid #10b981'
                                  : '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                padding: '0.75rem 0.85rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: isActive ? '#ffffff' : isDone ? '#10b981' : 'rgba(255,255,255,0.2)',
                                color: isActive ? '#4f46e5' : '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                flexShrink: 0
                              }}>
                                {isDone ? '✓' : st.num}
                              </div>
                              <span style={{ color: isActive ? '#ffffff' : '#cbd5e1' }}>{st.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamic Interactive Stage for Active Step */}
                      <div style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        padding: '1.75rem',
                        color: '#0f172a',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                        marginBottom: '1.5rem'
                      }}>
                        {/* STEP 1: SPEED OF CHANGE */}
                        {solverCurrentStep === 1 && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                                STEP 1 OF 5
                              </span>
                              <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem' }}>
                                Look at the Speed of Change
                              </span>
                            </div>
                            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                              Before calculating anything, look at how the numbers evolve. Are they growing slowly (addition), jumping rapidly (multiplication/cubes), falling gradually (subtraction), or plunging steeply (division)?
                            </p>

                            <div style={{
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              borderRadius: '10px',
                              padding: '1rem',
                              marginBottom: '1.25rem'
                            }}>
                              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                ⚡ Detective Check: What does the speed of change in this sequence indicate?
                              </div>
                              <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {currPat.speedOptions.map((opt, oIdx) => {
                                  const isSelected = solverStep1Answer === oIdx;
                                  return (
                                    <div
                                      key={oIdx}
                                      onClick={() => setSolverStep1Answer(oIdx)}
                                      style={{
                                        background: isSelected ? (opt.isCorrect ? '#dcfce7' : '#fee2e2') : '#ffffff',
                                        border: isSelected ? (opt.isCorrect ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                                        borderRadius: '8px',
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#1e293b'
                                      }}
                                    >
                                      <span>{opt.label}</span>
                                      {isSelected && (
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: opt.isCorrect ? '#166534' : '#991b1b' }}>
                                          {opt.hint}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div style={{ background: '#eff6ff', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', fontSize: '0.88rem', color: '#1e40af' }}>
                              💡 <strong>Conclusion:</strong> {currPat.speedVerdict}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: CALCULATE CONSECUTIVE DIFFERENCES */}
                        {solverCurrentStep === 2 && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                                STEP 2 OF 5
                              </span>
                              <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem' }}>
                                Calculate Consecutive Differences
                              </span>
                            </div>
                            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                              Write down the difference (or ratio) between consecutive pairs. In over 70% of aptitude questions, this step alone reveals the rule immediately!
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                              {currPat.differences.map((d, dIdx) => (
                                <div key={dIdx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Pair {dIdx + 1}: {d.from} → {d.to}</div>
                                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4f46e5', margin: '0.25rem 0' }}>{d.diff}</div>
                                  <div style={{ fontSize: '0.82rem', color: '#334155' }}>Math: {d.calc}</div>
                                </div>
                              ))}
                            </div>

                            <div style={{ background: '#f0fdf4', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #10b981', fontSize: '0.88rem', color: '#065f46' }}>
                              ✓ <strong>Notice:</strong> The relationship between every consecutive pair is completely uniform ({currPat.differences[0].diff}).
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: FORMULATE YOUR RULE */}
                        {solverCurrentStep === 3 && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                                STEP 3 OF 5
                              </span>
                              <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem' }}>
                                Formulate Your Rule
                              </span>
                            </div>
                            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                              State the rule clearly in one sentence instead of keeping a vague feeling in your head. When an interviewer asks <em>"How did you solve this?"</em>, this formula is your answer!
                            </p>

                            <div style={{ background: '#1e1b4b', color: '#ffffff', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                              <div style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                                Synthesized Rule Statement:
                              </div>
                              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem' }}>
                                "{currPat.ruleText}"
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#e0e7ff', display: 'inline-block' }}>
                                Formula: <code>{currPat.ruleFormula}</code>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: TEST AGAINST EVERY GIVEN TERM */}
                        {solverCurrentStep === 4 && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                                STEP 4 OF 5
                              </span>
                              <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem' }}>
                                Test Against Every Given Term
                              </span>
                            </div>
                            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                              <strong>Crucial exam rule:</strong> Never jump to an answer after testing just one pair! A rule might look right between terms 1 & 2, but fail between terms 3 & 4. Verify the entire sequence:
                            </p>

                            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.25rem' }}>
                              {currPat.verifications.map((v, vIdx) => (
                                <div key={vIdx} style={{
                                  background: '#f8fafc',
                                  border: '1px solid #bbf7d0',
                                  padding: '0.75rem 1rem',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>
                                    {v.term}: {v.calc}
                                  </span>
                                  <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                    <Check size={12} /> Verified True
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div style={{ background: '#f0fdf4', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #16a34a', fontSize: '0.88rem', color: '#166534' }}>
                              ✓ 100% Verified! The rule holds true from start to finish without exception.
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 5: COMPUTE THE MISSING NUMBER */}
                        {solverCurrentStep === 5 && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                                STEP 5 OF 5
                              </span>
                              <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem' }}>
                                Compute the Missing Number
                              </span>
                            </div>
                            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                              Now that your rule has been verified across all terms, apply it to the final given number to calculate the missing term:
                            </p>

                            <div style={{
                              background: '#f8fafc',
                              border: '2px solid #cbd5e1',
                              borderRadius: '12px',
                              padding: '1.25rem',
                              textAlign: 'center',
                              marginBottom: '1.25rem'
                            }}>
                              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                                {currPat.finalPrompt}
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {currPat.finalChoices.map(choice => {
                                  const isChosen = solverStep5Answer === choice;
                                  const isCorrectChoice = choice === currPat.correctAnswer;

                                  return (
                                    <button
                                      key={choice}
                                      onClick={() => {
                                        setSolverStep5Answer(choice);
                                        if (isCorrectChoice) {
                                          try {
                                            confetti({ particleCount: 70, spread: 65, origin: { y: 0.7 } });
                                          } catch (e) {}
                                        }
                                      }}
                                      style={{
                                        background: isChosen
                                          ? (isCorrectChoice ? '#10b981' : '#dc2626')
                                          : '#ffffff',
                                        color: isChosen ? '#ffffff' : '#0f172a',
                                        border: isChosen
                                          ? (isCorrectChoice ? '2px solid #059669' : '2px solid #b91c1c')
                                          : '2px solid #cbd5e1',
                                        borderRadius: '10px',
                                        padding: '0.65rem 1.5rem',
                                        fontSize: '1.2rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        transition: 'all 0.15s ease'
                                      }}
                                    >
                                      {choice}
                                    </button>
                                  );
                                })}
                              </div>

                              {solverStep5Answer && (
                                <div style={{
                                  background: solverStep5Answer === currPat.correctAnswer ? '#dcfce7' : '#fee2e2',
                                  color: solverStep5Answer === currPat.correctAnswer ? '#166534' : '#991b1b',
                                  padding: '0.75rem 1rem',
                                  borderRadius: '8px',
                                  fontWeight: 700,
                                  fontSize: '0.95rem'
                                }}>
                                  {solverStep5Answer === currPat.correctAnswer
                                    ? `🎉 Correct! ${currPat.finalExplanation}`
                                    : '✗ Not quite. Review the formula and calculate again!'}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Studio Step Controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                          <button
                            onClick={() => setSolverCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={solverCurrentStep === 1}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              padding: '0.45rem 1rem',
                              borderRadius: '8px',
                              cursor: solverCurrentStep === 1 ? 'not-allowed' : 'pointer',
                              color: solverCurrentStep === 1 ? '#94a3b8' : '#475569',
                              fontWeight: 600,
                              fontSize: '0.85rem'
                            }}
                          >
                            ← Previous Step
                          </button>

                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setSolverCurrentStep(1);
                                setSolverStep1Answer(null);
                                setSolverStep5Answer(null);
                              }}
                              style={{
                                background: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#475569',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <RotateCcw size={13} /> Reset
                            </button>

                            {solverCurrentStep < 5 ? (
                              <button
                                onClick={() => setSolverCurrentStep(prev => Math.min(5, prev + 1))}
                                style={{
                                  background: '#4f46e5',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.45rem 1.2rem',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                Next Step (Step {solverCurrentStep + 1}) →
                              </button>
                            ) : (
                              <button
                                onClick={() => handleTabChange('section2')}
                                style={{
                                  background: '#10b981',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.45rem 1.2rem',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                Continue to Section 2 →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
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
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 2 (Addition & Subtraction) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: ADDITION AND SUBTRACTION PATTERNS */}
        {/* ========================================================== */}
        {currentTab === 'section2' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 2
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Constant Differences</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section2Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section2Content.concept}
              </p>

              <div style={{
                background: '#eff6ff',
                borderLeft: '4px solid #3b82f6',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                color: '#1e40af'
              }}>
                <strong>Formula & Rule:</strong> {section2Content.formulaNote}
              </div>

              {/* 3 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Examples with Constant Differences
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section2Content.examples.map(ex => (
                  <div key={ex.id} style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        {ex.rule}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                        Answer: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {ex.series.map((num, i) => (
                        <span key={i} style={{
                          background: num === '__' ? '#fef3c7' : '#ffffff',
                          border: num === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: num === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {num === '__' ? '?' : num}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        DIFFERENCES BETWEEN ADJACENT TERMS:
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {ex.differences.map((d, idx) => (
                          <span key={idx} style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                            {d}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginTop: '0.5rem', color: '#16a34a', fontWeight: 700 }}>
                        Calculation: {ex.calculation}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      💡 Tip: {ex.tip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Mini-Exercise */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                border: '2px solid #86efac',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Calculator size={20} color="#16a34a" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#065f46' }}>
                    Interactive Check: Calculate the Difference
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#166534', margin: '0 0 1.25rem 0' }}>
                  Test your skills on these three quick sequences. Select the correct missing number:
                </p>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {section2Content.interactiveExercises.map((quizItem, idx) => {
                    const chosen = diffUserInputs[quizItem.id];
                    const feedback = diffCheckFeedback[quizItem.id];

                    return (
                      <div key={quizItem.id} style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                            {idx + 1}. Series: {quizItem.series.join(', ')}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          {quizItem.options.map(opt => {
                            const isSelected = chosen === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleDiffCheck(quizItem.id, opt, quizItem.correct)}
                                style={{
                                  background: isSelected ? (feedback === 'correct' ? '#dcfce7' : '#fee2e2') : '#f8fafc',
                                  border: isSelected ? (feedback === 'correct' ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                                  padding: '0.4rem 0.9rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  color: isSelected ? (feedback === 'correct' ? '#166534' : '#991b1b') : '#334155'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {feedback && (
                          <div style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: feedback === 'correct' ? '#16a34a' : '#dc2626',
                            marginTop: '0.35rem'
                          }}>
                            {feedback === 'correct' ? `✓ Correct! ${quizItem.explanation}` : '✗ Incorrect. Try calculating the difference again!'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 1
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 3 (Multiplication & Division) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: MULTIPLICATION AND DIVISION PATTERNS */}
        {/* ========================================================== */}
        {currentTab === 'section3' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 3
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Geometric & Exponential Rates</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section3Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section3Content.concept}
              </p>

              {/* Beginner Quick Clue */}
              <div style={{
                background: '#f0fdf4',
                borderLeft: '4px solid #10b981',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                fontSize: '0.92rem',
                color: '#065f46',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.4rem' }}>💡</span>
                <div>
                  <strong style={{ color: '#047857' }}>Beginner Quick Tip:</strong> {section3Content.identificationClue}
                </div>
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Multiplication & Division Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section3Content.examples.map(ex => (
                  <div key={ex.id} style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        {ex.operation}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                        Answer: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {ex.series.map((num, i) => (
                        <span key={i} style={{
                          background: num === '__' ? '#fef3c7' : '#ffffff',
                          border: num === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: num === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {num === '__' ? '?' : num}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        HOW TO TEST THE MULTIPLIER / DIVISOR:
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {ex.ratios.map((r, idx) => (
                          <span key={idx} style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                            {r}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginTop: '0.5rem', color: '#16a34a', fontWeight: 700 }}>
                        Calculation: {ex.calculation}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      💡 Note: {ex.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* Beginner Friendly Comparison Guide: Walking vs Rocket */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.75rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fef3c7', color: '#b45309', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <span>⚡</span> 3-Second Rule of Thumb
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem' }}>
                    How to Tell (+ / −) from (× / ÷) in 3 Seconds
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    The most common mistake for beginners is getting stuck trying to add numbers when they are actually multiplying. Look at how they behave:
                  </p>
                </div>

                {/* 2 Visual Cards: Walking Steps vs Rocket Jumps */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                  
                  {/* Card 1: Walking Steps */}
                  <div style={{
                    background: '#f0fdf4',
                    border: '2px solid #86efac',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                          ➕ Plus / ➖ Minus
                        </span>
                        <span style={{ fontSize: '1.25rem' }}>🚶</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14532d', margin: '0 0 0.5rem' }}>
                        Walking Steps (Slow & Steady)
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#166534', lineHeight: 1.5, marginBottom: '1rem' }}>
                        Numbers take small, peaceful steps. The gap between them is <strong>always the exact same small number</strong>.
                      </p>

                      {/* Visual Example 1: Growing */}
                      <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', marginBottom: '0.35rem' }}>
                          🌱 Growing (+5 steady steps):
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', fontWeight: 700, fontSize: '0.95rem' }}>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>5</span>
                          <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>+5</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>10</span>
                          <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>+5</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>15</span>
                          <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>+5</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>20</span>
                        </div>
                      </div>

                      {/* Visual Example 2: Shrinking */}
                      <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', marginBottom: '0.35rem' }}>
                          🍂 Shrinking (−4 steady steps):
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', fontWeight: 700, fontSize: '0.95rem' }}>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>30</span>
                          <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>−4</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>26</span>
                          <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>−4</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>22</span>
                          <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>−4</span>
                          <span>→</span>
                          <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#14532d' }}>18</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', borderTop: '1px dashed #86efac', paddingTop: '0.75rem', fontSize: '0.82rem', color: '#14532d', fontWeight: 600 }}>
                      ✅ <strong>Quick Rule:</strong> Subtract 1st number from 2nd. If that small gap repeats every time, it is simple Addition (+) or Subtraction (−)!
                    </div>
                  </div>

                  {/* Card 2: Rocket Leaps */}
                  <div style={{
                    background: '#eef2ff',
                    border: '2px solid #a5b4fc',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', background: '#e0e7ff', color: '#4338ca', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                          ✖️ Multiply / ➗ Divide
                        </span>
                        <span style={{ fontSize: '1.25rem' }}>🚀</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#312e81', margin: '0 0 0.5rem' }}>
                        Rocket Leaps (Fast & Massive)
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#3730a3', lineHeight: 1.5, marginBottom: '1rem' }}>
                        Numbers explode into big numbers or drop steeply. The gap <strong>gets wider and wider with every single step</strong>!
                      </p>

                      {/* Visual Example 1: Growing */}
                      <div style={{ background: '#ffffff', border: '1px solid #c7d2fe', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338ca', marginBottom: '0.35rem' }}>
                          🚀 Exploding (Doubles ×2 each step):
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', fontWeight: 700, fontSize: '0.95rem' }}>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>2</span>
                          <span style={{ color: '#4f46e5', fontSize: '0.75rem' }}>×2</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>4</span>
                          <span style={{ color: '#4f46e5', fontSize: '0.75rem' }}>×2</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>8</span>
                          <span style={{ color: '#4f46e5', fontSize: '0.75rem' }}>×2</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>16</span>
                          <span style={{ color: '#4f46e5', fontSize: '0.75rem' }}>×2</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>32</span>
                        </div>
                      </div>

                      {/* Visual Example 2: Shrinking */}
                      <div style={{ background: '#ffffff', border: '1px solid #c7d2fe', borderRadius: '10px', padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338ca', marginBottom: '0.35rem' }}>
                          ✂️ Deep Cut (Divided by 3 each step):
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', fontWeight: 700, fontSize: '0.95rem' }}>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>81</span>
                          <span style={{ color: '#7c3aed', fontSize: '0.75rem' }}>÷3</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>27</span>
                          <span style={{ color: '#7c3aed', fontSize: '0.75rem' }}>÷3</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>9</span>
                          <span style={{ color: '#7c3aed', fontSize: '0.75rem' }}>÷3</span>
                          <span>→</span>
                          <span style={{ background: '#eef2ff', border: '1px solid #a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', color: '#312e81' }}>3</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', borderTop: '1px dashed #a5b4fc', paddingTop: '0.75rem', fontSize: '0.82rem', color: '#312e81', fontWeight: 600 }}>
                      🚀 <strong>Quick Rule:</strong> If numbers jump from single digits into huge double/triple digits in 3-4 steps, don't check plus! Check if they are doubling (×2) or tripling (×3)!
                    </div>
                  </div>

                </div>

                {/* Interactive Practice Game: "3-Second Pattern Spotter" */}
                {section3Content.beginnerComparison?.spotterChallenges && (
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🎮</span>
                        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                          Interactive Mini-Game: Spot the Pattern in 3 Seconds!
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {section3Content.beginnerComparison.spotterChallenges.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setSpotterActiveIdx(dotIdx)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: spotterActiveIdx === dotIdx ? '#4f46e5' : spotterAnswers[section3Content.beginnerComparison.spotterChallenges[dotIdx].id] ? '#10b981' : '#e2e8f0',
                              color: spotterActiveIdx === dotIdx || spotterAnswers[section3Content.beginnerComparison.spotterChallenges[dotIdx].id] ? '#ffffff' : '#475569'
                            }}
                          >
                            {dotIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Spotter Challenge Card */}
                    {(() => {
                      const curChallenge = section3Content.beginnerComparison.spotterChallenges[spotterActiveIdx];
                      const chosenOption = spotterAnswers[curChallenge.id];
                      const isAnswered = chosenOption !== undefined;
                      const isCorrect = chosenOption === curChallenge.correctType;

                      return (
                        <div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                            Challenge {spotterActiveIdx + 1} of {section3Content.beginnerComparison.spotterChallenges.length}: Look at this sequence:
                          </div>

                          {/* Sequence Badges */}
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {curChallenge.series.map((val, vIdx) => (
                              <React.Fragment key={vIdx}>
                                <span style={{
                                  background: '#ffffff',
                                  border: '2px solid #cbd5e1',
                                  padding: '0.45rem 0.85rem',
                                  borderRadius: '8px',
                                  fontWeight: 800,
                                  fontSize: '1.15rem',
                                  color: '#0f172a',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}>
                                  {val}
                                </span>
                                {vIdx < curChallenge.series.length - 1 && (
                                  <span style={{ color: '#94a3b8', fontWeight: 700 }}>→</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.75rem' }}>
                            What type of pattern is this?
                          </div>

                          {/* 2 Choice Buttons */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                            {curChallenge.options.map((opt, optIdx) => {
                              const isSelected = chosenOption === opt.type;
                              let btnBg = '#ffffff';
                              let btnBorder = '#cbd5e1';
                              let btnColor = '#0f172a';

                              if (isSelected) {
                                if (opt.isCorrect) {
                                  btnBg = '#dcfce7';
                                  btnBorder = '#16a34a';
                                  btnColor = '#15803d';
                                } else {
                                  btnBg = '#fee2e2';
                                  btnBorder = '#dc2626';
                                  btnColor = '#991b1b';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setSpotterAnswers(prev => ({ ...prev, [curChallenge.id]: opt.type }));
                                    if (opt.isCorrect) {
                                      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
                                    }
                                  }}
                                  style={{
                                    background: btnBg,
                                    border: `2px solid ${btnBorder}`,
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    color: btnColor,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.15s ease'
                                  }}
                                >
                                  <span>{opt.label}</span>
                                  {isSelected && (opt.isCorrect ? <span>✓</span> : <span>✕</span>)}
                                </button>
                              );
                            })}
                          </div>

                          {/* Instant Feedback */}
                          {isAnswered && (
                            <div style={{
                              background: isCorrect ? '#ecfdf5' : '#fef2f2',
                              border: `1px solid ${isCorrect ? '#6ee7b7' : '#fca5a5'}`,
                              borderRadius: '8px',
                              padding: '0.85rem 1rem',
                              fontSize: '0.88rem',
                              color: isCorrect ? '#065f46' : '#991b1b',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }}>
                              <span>{isCorrect ? curChallenge.explanation : '💡 Not quite! Look at how the numbers are changing between each step. Click the other option to verify!'}</span>
                              {spotterActiveIdx < section3Content.beginnerComparison.spotterChallenges.length - 1 && (
                                <button
                                  onClick={() => setSpotterActiveIdx(spotterActiveIdx + 1)}
                                  style={{
                                    background: '#4f46e5',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.35rem 0.8rem',
                                    borderRadius: '6px',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Next Challenge →
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 2
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 4 (Changing Differences) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: INCREASING AND DECREASING DIFFERENCES */}
        {/* ========================================================== */}
        {currentTab === 'section4' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 4
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Two-Level Patterns</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section4Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section4Content.concept}
              </p>

              <div style={{
                background: '#eff6ff',
                borderLeft: '4px solid #3b82f6',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                color: '#1e40af'
              }}>
                <strong>Key Strategy:</strong> {section4Content.keyRule}
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Examples: Changing Gaps
              </h3>
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {section4Content.examples.map(ex => (
                  <div key={ex.id} style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '1.05rem' }}>
                        {ex.patternOfDifferences}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                        Answer: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {ex.series.map((num, i) => (
                        <span key={i} style={{
                          background: num === '__' ? '#fef3c7' : '#ffffff',
                          border: num === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: num === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {num === '__' ? '?' : num}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                        LEVEL 1 DIFFERENCES:
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        {ex.level1Differences.map((diffStr, idx) => (
                          <span key={idx} style={{ background: '#f1f5f9', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {diffStr}
                          </span>
                        ))}
                      </div>
                      <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.9rem' }}>
                        Final Calculation: {ex.calculation}
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                      {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Visual Ladder Interactive Widget */}
              <div style={{
                background: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)',
                border: '2px solid #c4b5fd',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <TrendingUp size={20} color="#6d28d9" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#4c1d95' }}>
                    Visualizing the Difference Ladder: 2, 5, 9, 14, 20, __
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#5b21b6', margin: '0 0 1.25rem 0' }}>
                  See how the second level of differences reveals a hidden constant (+1):
                </p>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {section4Content.visualLadder.steps.map((st, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      border: '1px solid #ddd6fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#5b21b6', fontSize: '0.85rem', width: '220px' }}>
                        {st.level}:
                      </span>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {st.values.map((v, vIdx) => (
                          <span key={vIdx} style={{
                            background: idx === 0 && v === '?' ? '#fef3c7' : '#f1f5f9',
                            color: idx === 0 && v === '?' ? '#b45309' : '#0f172a',
                            padding: '0.3rem 0.65rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.95rem'
                          }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 3
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 5 (Alternating Patterns) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: ALTERNATING NUMBER PATTERNS */}
        {/* ========================================================== */}
        {currentTab === 'section5' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 5
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Interleaved Sequences</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section5Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section5Content.concept}
              </p>

              {/* Clues & Techniques */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.35rem' }}>
                    🔍 How to Spot It:
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                    {section5Content.howToSpotIt}
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '0.35rem' }}>
                    🎯 The Splitting Technique:
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                    {section5Content.technique}
                  </div>
                </div>
              </div>

              {/* Interactive Splitter Toggle */}
              <div style={{
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                    Interactive Sequence Color-Splitter
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Toggle below to highlight Odd positions (Indigo) and Even positions (Emerald):
                  </div>
                </div>

                <button
                  onClick={() => setIsAlternatingSplit(!isAlternatingSplit)}
                  style={{
                    background: isAlternatingSplit ? '#4f46e5' : '#f1f5f9',
                    color: isAlternatingSplit ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Split size={16} /> {isAlternatingSplit ? 'Hide Color Split' : 'Highlight Alternating Series'}
                </button>
              </div>

              {/* Worked Examples */}
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {section5Content.examples.map(ex => (
                  <div key={ex.id} style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                        Series: {ex.series.join(', ')}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                        Answer: {ex.answer}
                      </span>
                    </div>

                    {/* Series Visual with conditional coloring */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {ex.series.map((term, i) => {
                        const isOdd = i % 2 === 0; // 0th index is 1st term (odd)
                        let bg = '#ffffff';
                        let border = '1px solid #cbd5e1';
                        let textCol = '#0f172a';

                        if (isAlternatingSplit) {
                          if (isOdd) {
                            bg = '#e0e7ff';
                            border = '2px solid #6366f1';
                            textCol = '#312e81';
                          } else {
                            bg = '#d1fae5';
                            border = '2px solid #10b981';
                            textCol = '#064e3b';
                          }
                        }

                        if (term === '__') {
                          bg = '#fef3c7';
                          border = '2px dashed #b45309';
                          textCol = '#b45309';
                        }

                        return (
                          <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: bg,
                              border: border,
                              padding: '0.45rem 0.9rem',
                              borderRadius: '8px',
                              fontWeight: 800,
                              fontSize: '1.1rem',
                              color: textCol
                            }}>
                              {term === '__' ? '?' : term}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                              Pos {i + 1} ({isOdd ? 'Odd' : 'Even'})
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Breakdown of Sub-Sequences */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
                        <div style={{ fontWeight: 700, color: '#4338ca', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                          🔵 Odd-Positioned Sub-Series:
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.25rem' }}>
                          {ex.oddPositions.terms.join(', ')}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          Rule: {ex.oddPositions.rule}
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                        <div style={{ fontWeight: 700, color: '#047857', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                          🟢 Even-Positioned Sub-Series:
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#064e3b', marginBottom: '0.25rem' }}>
                          {ex.evenPositions.terms.join(', ')}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          Rule: {ex.evenPositions.rule}
                        </div>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                      <strong>Conclusion:</strong> {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 4
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 6 (Squares & Cubes) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: SQUARE AND CUBE PATTERNS */}
        {/* ========================================================== */}
        {currentTab === 'section6' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 6
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Powers & Exponential Shapes</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section6Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section6Content.concept}
              </p>

              {/* Sub-tab Switcher for Squares vs Cubes */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setActiveMathPowerTab('squares')}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeMathPowerTab === 'squares' ? '#4f46e5' : '#f1f5f9',
                    color: activeMathPowerTab === 'squares' ? '#ffffff' : '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Grid size={16} /> Perfect Squares (n²)
                </button>
                <button
                  onClick={() => setActiveMathPowerTab('cubes')}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeMathPowerTab === 'cubes' ? '#4f46e5' : '#f1f5f9',
                    color: activeMathPowerTab === 'cubes' ? '#ffffff' : '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Layers size={16} /> Perfect Cubes (n³)
                </button>
              </div>

              {/* Squares Content */}
              {activeMathPowerTab === 'squares' && (
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    Square Numbers: 1, 4, 9, 16, 25, 36, 49, 64...
                  </div>
                  <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.9rem' }}>
                    {section6Content.squares.definition}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {section6Content.squares.table.map(sq => (
                      <div key={sq.n} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{sq.n}²</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#4f46e5', margin: '0.2rem 0' }}>{sq.val}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{sq.calc}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                      Worked Square Example: 1, 4, 9, 16, __
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                      Logic: {section6Content.squares.example.logic} → Next is {section6Content.squares.example.next}.
                      <span style={{ fontWeight: 700, color: '#16a34a', marginLeft: '0.5rem' }}>Answer: {section6Content.squares.example.answer}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cubes Content */}
              {activeMathPowerTab === 'cubes' && (
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    Cube Numbers: 1, 8, 27, 64, 125, 216...
                  </div>
                  <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.9rem' }}>
                    {section6Content.cubes.definition}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {section6Content.cubes.table.map(cb => (
                      <div key={cb.n} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{cb.n}³</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>{cb.val}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{cb.calc}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                      Worked Cube Example: 1, 8, 27, 64, __
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                      Logic: {section6Content.cubes.example.logic} → Next is {section6Content.cubes.example.next}.
                      <span style={{ fontWeight: 700, color: '#16a34a', marginLeft: '0.5rem' }}>Answer: {section6Content.cubes.example.answer}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pro-Tip Box: Offsets */}
              <div style={{
                background: '#fef3c7',
                borderLeft: '4px solid #f59e0b',
                padding: '1.25rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#92400e',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                <strong>⭐ Candidate Secret (Offset Patterns):</strong> {section6Content.proTip}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 5
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Next: Section 7 (Strategy Checklist) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: MISSING NUMBER STRATEGY */}
        {/* ========================================================== */}
        {currentTab === 'section7' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  SECTION 7
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>The Master Strategy</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                {section7Content.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {section7Content.concept}
              </p>

              {/* The 6-Step Checklist Cards */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The 6-Step Universal Checklist
              </h3>
              <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2.5rem' }}>
                {section7Content.checklist.map(chk => (
                  <div key={chk.stepNumber} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    background: '#f8fafc',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1'
                  }}>
                    <div style={{
                      background: '#4f46e5',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}>
                      {chk.stepNumber}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>
                        {chk.name}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.2rem', lineHeight: 1.5 }}>
                        {chk.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Worked Example: 4, 8, 16, 32, __ */}
              <div style={{
                background: '#f0fdf4',
                border: '2px solid #86efac',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={20} color="#16a34a" />
                  <span style={{ fontWeight: 800, color: '#065f46', fontSize: '1.1rem' }}>
                    Worked Example Applying the Checklist
                  </span>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.25rem' }}>
                  {section7Content.workedExample.problem}
                </div>

                <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
                  {section7Content.workedExample.walkthrough.map((stepItem, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 700, color: '#166534' }}>{stepItem.step}:</span>{' '}
                      <span style={{ color: '#334155' }}>{stepItem.observation}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontWeight: 800, color: '#15803d', fontSize: '1.1rem' }}>
                  Final Answer: {section7Content.workedExample.answer}
                </div>
              </div>

              {/* Start Practice Callout */}
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '1.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                    You Have Completed All 7 Learning Sections!
                  </div>
                  <div style={{ color: '#e0e7ff', fontSize: '0.9rem', maxWidth: '600px' }}>
                    Put your pattern recognition skills to the test with 20 interactive questions covering addition, subtraction, multiplication, division, changing gaps, alternating series, squares, and cubes.
                  </div>
                </div>

                <button
                  onClick={() => handleTabChange('practice')}
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                  }}
                >
                  Start Practice Quiz (20 Qs) <ArrowRight size={20} />
                </button>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 6
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Go to Practice Quiz →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* STEP 8: PRACTICE QUIZ (EXACTLY 20 QUESTIONS) */}
        {/* ========================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              {/* Quiz Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      DAY 2 PRACTICE QUIZ
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>20 Interactive Questions</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Number Series Practice Quiz
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#334155',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    Score: {totalCorrect} / {Object.keys(quizSubmitted).length}
                  </span>
                  <button
                    onClick={handleRetryQuiz}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RotateCcw size={14} /> Restart Quiz
                  </button>
                </div>
              </div>

              {/* Question Navigator Palette */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap',
                background: '#f8fafc',
                padding: '0.75rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                {day2PracticeQuestions.map((q, idx) => {
                  const isSubmitted = quizSubmitted[q.id];
                  const isCorrect = isSubmitted && quizAnswers[q.id] === q.correctAnswer;
                  const isCurrent = currentQuizIdx === idx;

                  let bgColor = '#ffffff';
                  let textColor = '#475569';
                  let border = '1px solid #cbd5e1';

                  if (isSubmitted) {
                    if (isCorrect) {
                      bgColor = '#dcfce7';
                      textColor = '#166534';
                      border = '1px solid #86efac';
                    } else {
                      bgColor = '#fee2e2';
                      textColor = '#991b1b';
                      border = '1px solid #fca5a5';
                    }
                  }

                  if (isCurrent) {
                    border = '2px solid #4f46e5';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuizIdx(idx)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '6px',
                        background: bgColor,
                        color: textColor,
                        border: border,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Single Question Card Display */}
              {(() => {
                const currentQ = day2PracticeQuestions[currentQuizIdx];
                const isSubmitted = quizSubmitted[currentQ.id];
                const selectedOption = quizAnswers[currentQ.id];
                const isCorrect = isSubmitted && selectedOption === currentQ.correctAnswer;

                return (
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Header: Question Number & Difficulty */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#4f46e5' }}>
                        QUESTION {currentQuizIdx + 1} OF 20
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{
                          background: currentQ.difficulty === 'Easy' ? '#ecfdf5' : currentQ.difficulty === 'Moderate' ? '#fffbeb' : '#f5f3ff',
                          color: currentQ.difficulty === 'Easy' ? '#047857' : currentQ.difficulty === 'Moderate' ? '#b45309' : '#6d28d9',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {currentQ.difficulty}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {currentQ.category}
                        </span>
                      </div>
                    </div>

                    {/* Question Text */}
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                      whiteSpace: 'pre-line'
                    }}>
                      {currentQ.question}
                    </h3>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {currentQ.options.map((opt, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        let optBorder = '1px solid #cbd5e1';
                        let optBg = '#ffffff';

                        if (isSubmitted) {
                          if (optIdx === currentQ.correctAnswer) {
                            optBg = '#dcfce7';
                            optBorder = '2px solid #16a34a';
                          } else if (isChosen && !isCorrect) {
                            optBg = '#fee2e2';
                            optBorder = '2px solid #dc2626';
                          }
                        } else if (isChosen) {
                          optBg = '#e0e7ff';
                          optBorder = '2px solid #4f46e5';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleOptionSelect(currentQ.id, optIdx)}
                            style={{
                              background: optBg,
                              border: optBorder,
                              borderRadius: '10px',
                              padding: '0.9rem 1.2rem',
                              cursor: isSubmitted ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: isChosen ? '#4f46e5' : '#f1f5f9',
                                color: isChosen ? '#ffffff' : '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.85rem',
                                fontWeight: 700
                              }}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                                {opt}
                              </span>
                            </div>

                            {isSubmitted && optIdx === currentQ.correctAnswer && (
                              <CheckCircle2 size={18} color="#16a34a" />
                            )}
                            {isSubmitted && isChosen && !isCorrect && (
                              <XCircle size={18} color="#dc2626" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Button (if not yet submitted) */}
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleSubmitQuestion(currentQ.id)}
                        disabled={selectedOption === undefined}
                        style={{
                          background: selectedOption === undefined ? '#cbd5e1' : '#4f46e5',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.75rem 1.75rem',
                          borderRadius: '8px',
                          fontWeight: 700,
                          cursor: selectedOption === undefined ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      /* Post-Submission Feedback and Explanation */
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{
                          background: isCorrect ? '#f0fdf4' : '#fff5f5',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          borderRadius: '10px',
                          padding: '1.25rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {isCorrect ? <CheckCircle2 size={20} color="#16a34a" /> : <AlertCircle size={20} color="#dc2626" />}
                            <span style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', fontSize: '0.95rem' }}>
                              {isCorrect ? 'Correct! Pattern Verified.' : 'Incorrect Response'}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                            <strong>Step-by-Step Logic:</strong> {currentQ.explanation}
                          </div>

                          {!isCorrect && selectedOption !== undefined && currentQ.whyIncorrect && currentQ.whyIncorrect[selectedOption] && (
                            <div style={{ fontSize: '0.85rem', color: '#991b1b', background: '#fee2e2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                              <strong>Why option {String.fromCharCode(65 + selectedOption)} is wrong:</strong> {currentQ.whyIncorrect[selectedOption]}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Previous / Next Question Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                      <button
                        onClick={() => setCurrentQuizIdx(prev => Math.max(0, prev - 1))}
                        disabled={currentQuizIdx === 0}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          cursor: currentQuizIdx === 0 ? 'not-allowed' : 'pointer',
                          color: currentQuizIdx === 0 ? '#94a3b8' : '#475569',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        ← Previous
                      </button>

                      {currentQuizIdx < day2PracticeQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuizIdx(prev => Math.min(day2PracticeQuestions.length - 1, prev + 1))}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Next Question →
                        </button>
                      ) : (
                        <button
                          onClick={handleCompleteQuiz}
                          style={{
                            background: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700
                          }}
                        >
                          View Assessment Summary
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
        {/* STEP 9: DAY 2 FINAL ASSESSMENT SUMMARY */}
        {/* ========================================================== */}
        {currentTab === 'assessment' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: isPassing ? '#dcfce7' : '#fee2e2',
                  color: isPassing ? '#16a34a' : '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Award size={36} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Day 2 Assessment Report
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                  Number Series and Pattern Recognition • Level 1 Beginner
                </p>
              </div>

              {/* Performance Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>TOTAL QUESTIONS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>20</div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>CORRECT ANSWERS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '0.25rem' }}>{totalCorrect}</div>
                </div>
                <div style={{ background: '#fff5f5', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>INCORRECT ANSWERS</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '0.25rem' }}>{20 - totalCorrect}</div>
                </div>
                <div style={{ background: '#eef2ff', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #c7d2fe' }}>
                  <div style={{ fontSize: '0.8rem', color: '#4338ca', fontWeight: 700 }}>FINAL PERCENTAGE</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.25rem' }}>{percentage}%</div>
                </div>
              </div>

              {/* Feedback Band Banner */}
              <div style={{
                background: percentage >= 90 ? '#ecfdf5' : percentage >= 70 ? '#f0fdf4' : percentage >= 50 ? '#fffbeb' : '#fff1f2',
                border: `2px solid ${percentage >= 90 ? '#a7f3d0' : percentage >= 70 ? '#bbf7d0' : percentage >= 50 ? '#fde68a' : '#fecdd3'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: percentage >= 90 ? '#065f46' : percentage >= 70 ? '#166534' : percentage >= 50 ? '#92400e' : '#9f1239',
                  marginBottom: '0.35rem'
                }}>
                  {percentage >= 90 ? '🌟 90–100%: Excellent! You understand number series and patterns very well.' :
                   percentage >= 70 ? '🎉 70–89%: Good progress! Keep practising to improve your speed.' :
                   percentage >= 50 ? '📚 50–69%: Keep practising. Review the explanations and try again.' :
                   '⚠️ Below 50%: Revisit the lessons and retry the quiz.'}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                  {percentage >= 70
                    ? `Passing score is 70% (14 out of 20). You scored ${totalCorrect}/20 (${percentage}%) and successfully qualified Level 1 – Day 2!`
                    : `Passing score is 70% (14 out of 20). You scored ${totalCorrect}/20 (${percentage}%). Please review the worked examples and retry the assessment.`}
                </p>
              </div>

              {/* Topics to Revise Section */}
              {topicsToRevise.length > 0 && (
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={18} color="#4f46e5" /> Recommended Revision Areas (Based on Missed Questions)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {topicsToRevise.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontWeight: 700, color: '#b91c1c', fontSize: '0.85rem' }}>
                          • {item.category}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                          {item.count} question{item.count > 1 ? 's' : ''} missed
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Eye size={17} /> {isReviewOpen ? 'Hide Full Answer Review' : 'Review All 20 Answers'}
                </button>

                <button
                  onClick={handleRetryQuiz}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <RotateCcw size={17} /> Retry Assessment
                </button>

                {isPassing && (
                  <button
                    onClick={handleMarkDayComplete}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <CheckCircle2 size={18} /> Mark Day 2 Complete in LMS
                  </button>
                )}
              </div>

              {/* Collapsible Review Mode */}
              {isReviewOpen && (
                <div style={{ marginTop: '2rem', borderTop: '2px dashed #cbd5e1', paddingTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                    Full 20-Question Answer Review & Rationales
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {day2PracticeQuestions.map((q, idx) => {
                      const userAns = quizAnswers[q.id];
                      const isCorrect = userAns === q.correctAnswer;

                      return (
                        <div key={q.id} style={{
                          background: '#f8fafc',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.85rem' }}>
                              Question {idx + 1} ({q.difficulty} • {q.category})
                            </span>
                            <span style={{
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: isCorrect ? '#dcfce7' : '#fee2e2',
                              color: isCorrect ? '#166534' : '#991b1b'
                            }}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                            {q.question}
                          </div>

                          <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.5rem' }}>
                            <div><strong>Your Choice:</strong> {userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'Not answered'}</div>
                            <div style={{ color: '#16a34a', fontWeight: 600 }}><strong>Correct Answer:</strong> {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</div>
                          </div>

                          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, border: '1px solid #e2e8f0' }}>
                            <strong>Why:</strong> {q.explanation}
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
      </div>

      {/* 🧭 BOTTOM GLOBAL NAVIGATION FOOTER */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
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
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d1', 'overview')}
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
            ← Previous Day: Day 1
          </button>

          <button
            onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d3', 'overview')}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            Next: Day 3 (Alphabet & Symbols) →
          </button>
        </div>
      </div>

      {/* Day 3 Preview Modal */}
      {showDay3Modal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
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
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clock size={24} color="#4f46e5" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1e1b4b' }}>
                Day 3: Alphabet & Symbol Patterns
              </h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              In Day 3, you will learn how to apply pattern recognition techniques to alphabetical positions (A=1 to Z=26), reverse positions, vowel-consonant rules, and abstract geometric symbols.
            </p>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
              🔒 <strong>Status:</strong> Coming up in next release. Make sure you complete Day 2's practice assessment with at least 70% score first!
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowDay3Modal(false)}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
