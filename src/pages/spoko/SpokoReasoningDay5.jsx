import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, AlertCircle, Eye, CheckSquare,
  TrendingUp, TrendingDown, Home, GraduationCap, Filter, Calculator,
  Compass, Search, Trophy, Shield, Activity, Hash, LayoutGrid,
  Type as TypeIcon, Key, Link as LinkIcon, Flame, Droplets, Dumbbell,
  Stethoscope, Briefcase, RefreshCw, FastForward
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day5Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day5Revision,
  day5PracticeQuestions
} from '../../data/reasoningLevel1Day5.js';

export default function SpokoReasoningDay5({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d5_progress_${userKey}`;

  // Current active sub-tab (driven by sidebar or in-page navigation)
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');

  // Sync internal currentTab when prop activeTab changes
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

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedProgress));
    } catch (e) {
      console.error("Failed to save Day 5 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d5:day5';
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
      onNavigate('spoko_reasoning_l1_d5', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // INTERACTIVE WIDGET STATES
  // ==========================================
  // Section 1: Interactive Analogy Explorer
  const [selectedSec1Example, setSelectedSec1Example] = useState(0);

  // Section 2: Word Analogy Category Filter
  const [selectedWordCategory, setSelectedWordCategory] = useState(0);

  // Section 3: Interactive Relationship Tester (Object-Function vs Part-Whole)
  const [userTestedRelation, setUserTestedRelation] = useState({});

  // Section 4: Interactive Number Analogy Calculator
  const [calcInputNumber, setCalcInputNumber] = useState(6);
  const [calcOperation, setCalcOperation] = useState('square');

  // Section 5: Alphabet Shift Explorer
  const [selectedLetterPos, setSelectedLetterPos] = useState(3); // C (pos 3)
  const [selectedShift, setSelectedShift] = useState(2); // +2

  // Section 6: Cause & Effect Cards
  const [activeCauseIdx, setActiveCauseIdx] = useState(0);

  // Section 7: Step-by-Step Worked Example index
  const [workedExIdx, setWorkedExIdx] = useState(0);

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
    const currentQ = day5PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    let score = 0;
    day5PracticeQuestions.forEach(q => {
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
    const allAnswered = day5PracticeQuestions.every(q => newSubmitted[q.id]);

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
          confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
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

  // Calculate overall Day 5 lesson progress percentage
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
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 5: Analogies & Relationships</span>
        </div>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #3730a3 100%)',
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
                <span>Level 1 • Day 5 of 6</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Analogies and Relationships
              </h1>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', lineHeight: 1.6, margin: 0 }}>
                {day5Overview.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c7d2fe', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 5 Mastery
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
              <BookOpen size={16} /> <strong>7 Lesson Sections</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> <strong>45–60 Mins</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={16} /> <strong>20 Practice Questions</strong>
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
                What You Will Master in Day 5
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Analogies are one of the most critical topics in aptitude tests, competitive examinations, and technical campus interviews. They evaluate your ability to decode logical connections, recognize underlying mathematical structures, and transfer that exact rule to a new pair without deviation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day5Overview.objectives.map((obj, i) => (
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

              {/* The Golden Rule of Analogies Card */}
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} />
                  <span>The Golden Law: Same Relationship, Same Direction!</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#312e81', lineHeight: 1.6, margin: 0 }}>
                  In an analogy <code>A : B :: C : D</code>, the connection between A and B must strictly parallel the connection between C and D. If A creates B, then C must create D (not vice versa). Consistency in both <strong>type</strong> and <strong>direction</strong> is the secret to 100% accuracy!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d4', 'overview')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Go to Day 4: Classification
                </button>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Section 1: Intro to Analogies →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: INTRODUCTION TO ANALOGIES */}
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

              {/* The Formula Box */}
              <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  The Standard Analogy Notation
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e1b4b', letterSpacing: '0.15em', margin: '0.5rem 0' }}>
                  A : B :: C : D
                </div>
                <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0 }}>
                  {section1Content.formulaMeaning}
                </p>
              </div>

              {/* Core Principles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.corePrinciples.map((cp, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                      {cp.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {cp.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Analogy Explorer */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Interactive Worked Examples: Deconstruct the Relationship
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {section1Content.examples.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedSec1Example(idx)}
                    style={{
                      background: selectedSec1Example === idx ? '#4f46e5' : '#f1f5f9',
                      color: selectedSec1Example === idx ? '#ffffff' : '#334155',
                      border: '1px solid',
                      borderColor: selectedSec1Example === idx ? '#4f46e5' : '#cbd5e1',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    Example {idx + 1}: {ex.pair1}
                  </button>
                ))}
              </div>

              {/* Active Example Card */}
              {(() => {
                const ex = section1Content.examples[selectedSec1Example];
                return (
                  <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '2px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#166534' }}>
                        {ex.pair1} :: {ex.pair2}
                      </span>
                      <span style={{ background: '#bbf7d0', color: '#14532d', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
                        {ex.relationType}
                      </span>
                    </div>
                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #bbf7d0', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6 }}>
                      💡 <strong>Logic Breakdown:</strong> {ex.explanation}
                    </div>
                  </div>
                );
              })()}

              {/* 4-Step Method */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The Universal 4-Step Method for Analogy Questions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.fourStepMethod.map(st => (
                  <div key={st.step} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', position: 'relative' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      {st.step}
                    </div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {st.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {st.desc}
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
                  Next: Section 2 (Word Analogies) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: WORD ANALOGIES */}
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

              {/* Interactive Category Selector */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The 8 Foundational Word Relationships
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
                Click on any relationship type below to explore its logic pattern, clue, and sample aptitude question:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {section2Content.relationshipCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWordCategory(idx)}
                    style={{
                      background: selectedWordCategory === idx ? '#4f46e5' : '#f8fafc',
                      color: selectedWordCategory === idx ? '#ffffff' : '#1e293b',
                      border: `2px solid ${selectedWordCategory === idx ? '#4338ca' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      padding: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: selectedWordCategory === idx ? '0 4px 10px rgba(79, 70, 229, 0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      {cat.type}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: selectedWordCategory === idx ? '#c7d2fe' : '#64748b' }}>
                      {cat.pair}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Category Details Display */}
              {(() => {
                const cat = section2Content.relationshipCategories[selectedWordCategory];
                return (
                  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4338ca' }}>
                        {cat.type}: <code>{cat.pair}</code>
                      </span>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Aptitude Pattern
                      </span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      <strong>Mental Clue:</strong> {cat.clue}
                    </p>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#166534', fontWeight: 600 }}>
                      ✓ Applied Example: {cat.sampleQuestion}
                    </div>
                  </div>
                );
              })()}

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Word Analogy Examples with Explanations
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {section2Content.workedExamples.map(we => (
                  <div key={we.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                      {we.question}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {we.options.map((opt, i) => (
                        <span
                          key={i}
                          style={{
                            background: opt === we.correct ? '#dcfce7' : '#ffffff',
                            color: opt === we.correct ? '#15803d' : '#475569',
                            border: `1px solid ${opt === we.correct ? '#86efac' : '#cbd5e1'}`,
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: opt === we.correct ? 800 : 500
                          }}
                        >
                          {opt} {opt === we.correct ? '✓' : ''}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#334155', background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      💡 <strong>Explanation:</strong> {we.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Context Note Box */}
              <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#92400e' }}>
                {section2Content.contextNote}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 1 (Intro)
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 3 (Object & Function) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: OBJECT, FUNCTION, AND PART-WHOLE */}
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

              {/* Comparison Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: '#eef2ff', border: '2px solid #c7d2fe', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3730a3', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <Zap size={20} />
                    <span>Object and Function (Tool / Action)</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#312e81', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {section3Content.distinction.objectFunction}
                  </p>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {section3Content.pairs[0].items.map((it, i) => (
                      <div key={i} style={{ background: '#ffffff', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #c7d2fe', fontSize: '0.85rem', color: '#1e293b' }}>
                        <strong>{it.pair}</strong> — {it.desc}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#ecfdf5', border: '2px solid #a7f3d0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <Layers size={20} />
                    <span>Part and Whole (Sub-unit / System)</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#047857', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {section3Content.distinction.partWhole}
                  </p>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {section3Content.pairs[1].items.map((it, i) => (
                      <div key={i} style={{ background: '#ffffff', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.85rem', color: '#1e293b' }}>
                        <strong>{it.pair}</strong> — {it.desc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Practice Activity: Identify the Relationship First! */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Target size={20} style={{ color: '#4f46e5' }} />
                  Interactive Practice: Identify the Relationship Before Answering!
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  Test your classification instinct! Click on what kind of relationship each pair represents:
                </p>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {section3Content.practiceActivity.map(act => {
                    const answered = userTestedRelation[act.id];
                    return (
                      <div key={act.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                            Pair: <code>{act.pair}</code>
                          </span>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Parallel match: <strong>{act.parallelPair}</strong>
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          <button
                            onClick={() => setUserTestedRelation(prev => ({ ...prev, [act.id]: 'Object-Function' }))}
                            style={{
                              background: answered === 'Object-Function' ? '#4f46e5' : '#f1f5f9',
                              color: answered === 'Object-Function' ? '#ffffff' : '#334155',
                              border: '1px solid #cbd5e1',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Object & Function
                          </button>
                          <button
                            onClick={() => setUserTestedRelation(prev => ({ ...prev, [act.id]: 'Part-Whole' }))}
                            style={{
                              background: answered === 'Part-Whole' ? '#4f46e5' : '#f1f5f9',
                              color: answered === 'Part-Whole' ? '#ffffff' : '#334155',
                              border: '1px solid #cbd5e1',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Part & Whole
                          </button>
                        </div>

                        {answered && (
                          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px', padding: '0.6rem 0.85rem', fontSize: '0.85rem', color: '#166534', marginTop: '0.5rem' }}>
                            <strong>Official Classification:</strong> {act.classification}. {act.reason}
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
                  onClick={() => handleTabChange('section2')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 2 (Word Analogies)
                </button>
                <button
                  onClick={() => handleTabChange('section4')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 4 (Number Analogies) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: NUMBER ANALOGIES */}
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

              {/* Rules Catalog */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Standard Arithmetic & Algebraic Analogy Rules
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section4Content.rulesCatalog.map((rc, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                      {rc.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#0f172a', background: '#e0e7ff', display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px', marginBottom: '0.4rem' }}>
                      {rc.formula}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Example: {rc.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Number Analogy Calculator Widget */}
              <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '2px solid #86efac', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <Calculator size={22} />
                  <span>Interactive Number Analogy Simulator</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#14532d', marginBottom: '1.25rem' }}>
                  Pick a test number and an operation to see how the analogy pair is constructed in real time:
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
                      Choose Base Number (n):
                    </label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[3, 4, 5, 6, 8, 9, 12].map(num => (
                        <button
                          key={num}
                          onClick={() => setCalcInputNumber(num)}
                          style={{
                            background: calcInputNumber === num ? '#166534' : '#ffffff',
                            color: calcInputNumber === num ? '#ffffff' : '#1e293b',
                            border: '1px solid #86efac',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
                      Choose Mathematical Rule:
                    </label>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {[
                        { id: 'square', label: 'Square (n²)' },
                        { id: 'double', label: 'Double (2n)' },
                        { id: 'triple', label: 'Triple (3n)' },
                        { id: 'half', label: 'Half (n ÷ 2)' },
                        { id: 'plusOne', label: 'n² + 1' }
                      ].map(op => (
                        <button
                          key={op.id}
                          onClick={() => setCalcOperation(op.id)}
                          style={{
                            background: calcOperation === op.id ? '#166534' : '#ffffff',
                            color: calcOperation === op.id ? '#ffffff' : '#1e293b',
                            border: '1px solid #86efac',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculation Output */}
                {(() => {
                  let result = 0;
                  let formulaStr = '';
                  if (calcOperation === 'square') {
                    result = calcInputNumber * calcInputNumber;
                    formulaStr = `${calcInputNumber} × ${calcInputNumber} = ${result}`;
                  } else if (calcOperation === 'double') {
                    result = calcInputNumber * 2;
                    formulaStr = `${calcInputNumber} × 2 = ${result}`;
                  } else if (calcOperation === 'triple') {
                    result = calcInputNumber * 3;
                    formulaStr = `${calcInputNumber} × 3 = ${result}`;
                  } else if (calcOperation === 'half') {
                    result = (calcInputNumber / 2).toFixed(1);
                    formulaStr = `${calcInputNumber} ÷ 2 = ${result}`;
                  } else if (calcOperation === 'plusOne') {
                    result = calcInputNumber * calcInputNumber + 1;
                    formulaStr = `${calcInputNumber}² + 1 = ${calcInputNumber * calcInputNumber} + 1 = ${result}`;
                  }

                  const parallelBase = calcInputNumber === 4 ? 7 : 4;
                  let parallelResult = 0;
                  if (calcOperation === 'square') parallelResult = parallelBase * parallelBase;
                  else if (calcOperation === 'double') parallelResult = parallelBase * 2;
                  else if (calcOperation === 'triple') parallelResult = parallelBase * 3;
                  else if (calcOperation === 'half') parallelResult = (parallelBase / 2).toFixed(1);
                  else if (calcOperation === 'plusOne') parallelResult = parallelBase * parallelBase + 1;

                  return (
                    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '1rem', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Generated Analogy Problem:</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#166534', margin: '0.4rem 0' }}>
                        {calcInputNumber} : {result} :: {parallelBase} : <span style={{ color: '#4f46e5' }}>? ({parallelResult})</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                        Applied Rule: <strong>{formulaStr}</strong>, so for {parallelBase}, the answer is <strong>{parallelResult}</strong>.
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Worked Examples from Syllabus */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Core Worked Numerical Examples
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {section4Content.detailedExamples.map(de => (
                  <div key={de.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#4338ca' }}>
                        {de.analogy}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                        Answer: {de.answer}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                      💡 <strong>Step-by-step:</strong> {de.stepByStep}
                    </p>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
                      Note: {de.distractorNote}
                    </div>
                  </div>
                ))}
              </div>

              {/* Golden Tip */}
              <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#065f46' }}>
                <strong>Golden Principle:</strong> {section4Content.goldenTip}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 3 (Object & Function)
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 5 (Alphabet Analogies) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: ALPHABET AND LETTER ANALOGIES */}
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

              {/* The 1-to-26 Alphabet Position Chart */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Master Reference: 1–26 Alphabet Numbers
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                Click any letter to test positional distance shifts in the interactive simulator below:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(36px, 1fr))', gap: '0.35rem', marginBottom: '2rem' }}>
                {section5Content.alphabetMap.map(item => (
                  <button
                    key={item.letter}
                    onClick={() => setSelectedLetterPos(item.pos)}
                    style={{
                      background: selectedLetterPos === item.pos ? '#4f46e5' : '#f8fafc',
                      color: selectedLetterPos === item.pos ? '#ffffff' : '#1e293b',
                      border: `1px solid ${selectedLetterPos === item.pos ? '#4338ca' : '#cbd5e1'}`,
                      borderRadius: '6px',
                      padding: '0.35rem 0.1rem',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.letter}</div>
                    <div style={{ fontSize: '0.68rem', color: selectedLetterPos === item.pos ? '#c7d2fe' : '#64748b' }}>
                      {item.pos}
                    </div>
                  </button>
                ))}
              </div>

              {/* Interactive Alphabet Shift Visualizer */}
              <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <FastForward size={20} />
                  <span>Interactive Letter Positional Shift Explorer</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
                  Selected Base Letter: <strong>{section5Content.alphabetMap[selectedLetterPos - 1].letter} (Pos {selectedLetterPos})</strong>
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {[
                    { val: 1, label: '+1 (Next)' },
                    { val: 2, label: '+2 Steps' },
                    { val: 3, label: '+3 Steps' },
                    { val: -1, label: '-1 (Previous)' },
                    { val: -2, label: '-2 Steps' }
                  ].map(sh => (
                    <button
                      key={sh.val}
                      onClick={() => setSelectedShift(sh.val)}
                      style={{
                        background: selectedShift === sh.val ? '#4f46e5' : '#ffffff',
                        color: selectedShift === sh.val ? '#ffffff' : '#334155',
                        border: '1px solid #cbd5e1',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>

                {/* Visual Jump Output */}
                {(() => {
                  let targetPos = selectedLetterPos + selectedShift;
                  if (targetPos > 26) targetPos = targetPos - 26;
                  if (targetPos < 1) targetPos = targetPos + 26;
                  const targetLetter = section5Content.alphabetMap[targetPos - 1].letter;
                  const startLetter = section5Content.alphabetMap[selectedLetterPos - 1].letter;

                  return (
                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>FIRST ITEM</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>{startLetter}</div>
                        <div style={{ fontSize: '0.8rem', color: '#4338ca', fontWeight: 600 }}>Pos {selectedLetterPos}</div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontWeight: 800, fontSize: '0.9rem' }}>
                          {selectedShift > 0 ? `+${selectedShift}` : selectedShift} Positions
                        </span>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Shift Operation</div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>RESULTING PAIR</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#16a34a' }}>{targetLetter}</div>
                        <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Pos {targetPos}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Movement Types Cards */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Key Letter Analogy Movement Patterns
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section5Content.movementTypes.map((mt, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{mt.type}</span>
                      <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>{mt.shift}</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#4f46e5', margin: '0.25rem 0' }}>
                      {mt.example}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {mt.explanation}
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
                  ← Section 4 (Number Analogies)
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 6 (Cause & Effect) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: CAUSE-EFFECT AND RELATIONSHIP ANALOGIES */}
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

              {/* Interactive Causality Cards */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Explore the 5 Core Dynamic Causality Structures
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section6Content.categories.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveCauseIdx(idx)}
                    style={{
                      background: activeCauseIdx === idx ? '#f5f3ff' : '#f8fafc',
                      border: `2px solid ${activeCauseIdx === idx ? '#8b5cf6' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.25rem' }}>
                      {cat.category}
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0.25rem 0' }}>
                      {cat.pair}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0.5rem 0' }}>
                      {cat.explanation}
                    </p>
                    <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.82rem', color: '#6d28d9', fontWeight: 600 }}>
                      Parallel Match: {cat.analogousPair}
                    </div>
                  </div>
                ))}
              </div>

              {/* Critical Clarification Note */}
              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#92400e' }}>
                <strong>Logical Nuance:</strong> {section6Content.criticalClarification}
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 5 (Alphabet Analogies)
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 7 (Step-by-Step Solving Guide) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: HOW TO SOLVE ANALOGIES STEP BY STEP */}
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

              {/* The 7-Step Protocol Checklist */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                The 7-Step Solution Protocol
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {section7Content.checklistSteps.map(step => (
                  <div key={step.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                      {step.num}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Comprehensive Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Comprehensive Worked Examples Across All Domains
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
                Switch between these 5 worked examples to see the 7-step method applied in practice:
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {section7Content.fiveWorkedExamples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setWorkedExIdx(idx)}
                    style={{
                      background: workedExIdx === idx ? '#4f46e5' : '#f1f5f9',
                      color: workedExIdx === idx ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {ex.type.split(' ')[0]} {ex.type.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Active Worked Example Breakdown */}
              {(() => {
                const ex = section7Content.fiveWorkedExamples[workedExIdx];
                return (
                  <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4338ca' }}>
                        {ex.type}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                        Correct: {ex.answer}
                      </span>
                    </div>

                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
                      {ex.question}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {ex.options.map((opt, i) => (
                        <span
                          key={i}
                          style={{
                            background: opt === ex.answer ? '#dcfce7' : '#ffffff',
                            color: opt === ex.answer ? '#166534' : '#475569',
                            border: `1px solid ${opt === ex.answer ? '#86efac' : '#cbd5e1'}`,
                            padding: '0.3rem 0.75rem',
                            borderRadius: '6px',
                            fontWeight: opt === ex.answer ? 800 : 500,
                            fontSize: '0.9rem'
                          }}
                        >
                          {opt} {opt === ex.answer ? '✓' : ''}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                      <div>1️⃣ <strong>{ex.step1}</strong></div>
                      <div>2️⃣ <strong>{ex.step2}</strong></div>
                      <div>3️⃣ <strong>{ex.step3}</strong></div>
                      <div>4️⃣ <strong>{ex.step4}</strong></div>
                      <div style={{ marginTop: '0.5rem', color: '#166534', fontWeight: 700 }}>
                        🏆 Conclusion: {ex.conclusion}
                      </div>
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
                  ← Section 6 (Cause & Effect)
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
                Quick Revision
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {day5Revision.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {day5Revision.subtitle}
              </p>

              {/* 10 Core Takeaways Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day5Revision.tenTakeaways.map((item, idx) => (
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

              {/* 5 Revision Self-Check Questions */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                5 Revision Rapid-Check Questions
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day5Revision.revisionQuestions.map((rq, idx) => {
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

              {/* Launch Quiz CTA */}
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '12px', padding: '1.5rem', color: '#ffffff', textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
                  Ready for the 20-Question Day 5 Practice Assessment?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#c7d2fe', maxWidth: '600px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
                  Test your skills on words, numbers, letters, functions, parts, and causes. Passing threshold is 70% (14 out of 20).
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
                  Launch Practice Quiz (20 Qs) →
                </button>
              </div>

              {/* Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 7 (Solving Guide)
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
                    Practice Quiz • Question {currentQuizIdx + 1} of 20
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
                    Analogies & Relationships Assessment
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
                {day5PracticeQuestions.map((q, idx) => {
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
                const q = day5PracticeQuestions[currentQuizIdx];
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
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.4 }}>
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
                            <span style={{ fontSize: '1rem', fontWeight: isChosen ? 700 : 500, color: '#1e293b' }}>
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
                          <span>{isCorrect ? 'Correct! Analogy Relationship Confirmed!' : 'Incorrect. Notice the Relationship Rule Below:'}</span>
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

                      {currentQuizIdx < day5PracticeQuestions.length - 1 ? (
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
                          View Assessment Results 🏆
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
        {/* TAB 10: ASSESSMENT SUMMARY & PASS/FAIL CRITERIA */}
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
                {savedProgress.quizPassed ? 'Day 5 Assessment Passed!' : 'More Practice Recommended'}
              </h2>

              {/* Dynamic Result Message as Required by Prompt */}
              <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                {savedProgress.quizPercentage >= 90
                  ? '🌟 Excellent! You understand analogy relationships very well.'
                  : savedProgress.quizPercentage >= 70
                  ? '🎉 Good progress! Continue practising to improve your accuracy.'
                  : savedProgress.quizPercentage >= 50
                  ? '⚠️ Keep practising. Review the examples and try again.'
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

              {/* Status Pill */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  background: savedProgress.quizPassed ? '#dcfce7' : '#fee2e2',
                  color: savedProgress.quizPassed ? '#166534' : '#991b1b',
                  border: `1px solid ${savedProgress.quizPassed ? '#86efac' : '#fca5a5'}`,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }}>
                  Status: {savedProgress.quizPassed ? 'PASSED (≥ 70%)' : 'NEEDS MORE PRACTICE (< 70%)'}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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

                {savedProgress.quizPassed && (
                  <button
                    onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d6', 'overview')}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Proceed to Day 6: Deductive Reasoning →
                  </button>
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
                {day5PracticeQuestions
                  .filter(q => {
                    const isCorrect = quizSubmitted[q.id] && quizAnswers[q.id] === q.correctAnswer;
                    if (reviewFilter === 'correct') return isCorrect;
                    if (reviewFilter === 'incorrect') return !isCorrect;
                    return true;
                  })
                  .map((q, i) => {
                    const originalIdx = day5PracticeQuestions.findIndex(item => item.id === q.id);
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

                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem' }}>
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
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d4', 'overview')}
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
              ← Previous: Day 4 (Classification)
            </button>

            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d6', 'overview')}
              style={{
                background: savedProgress.completedDay ? '#4f46e5' : '#64748b',
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
              Next: Day 6 (Deductive Reasoning) →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
