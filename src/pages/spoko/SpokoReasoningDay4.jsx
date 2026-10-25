import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, AlertCircle, Eye, CheckSquare,
  TrendingUp, TrendingDown, Home, GraduationCap, Filter, Calculator,
  Compass, Search, Trophy, Shield, Activity, Shapes, Grid, Box
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day4Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day4Revision,
  day4PracticeQuestions
} from '../../data/reasoningLevel1Day4.js';

export default function SpokoReasoningDay4({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d4_progress_${userKey}`;

  // Current active sub-tab (driven by Sidebar or in-page next/prev buttons)
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
      console.error("Failed to save Day 4 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d4:day4';
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
      onNavigate('spoko_reasoning_l1_d4', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Widget States:
  // Section 3: Interactive Number Property Tester
  const [testerNumber, setTesterNumber] = useState(25);

  // Section 5: Interactive Polygon Selector
  const [selectedPolygonSides, setSelectedPolygonSides] = useState(4);

  // Day 5 Preview Modal State
  const [showDay5Modal, setShowDay5Modal] = useState(false);

  // PRACTICE QUIZ STATE (20 QUESTIONS)
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
    const currentQ = day4PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    let score = 0;
    day4PracticeQuestions.forEach(q => {
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
    const allAnswered = day4PracticeQuestions.every(q => newSubmitted[q.id]);

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

  // Calculate overall course day progress percentage
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

        {/* Breadcrumb Header */}
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
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 4: Classification & Odd One Out</span>
        </div>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          borderRadius: '20px',
          padding: '2rem 1.75rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(49, 46, 129, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Sparkles size={14} />
                <span>Level 1 • Day 4 of 5</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Classification and Odd One Out
              </h1>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', lineHeight: 1.6, margin: 0 }}>
                {day4Overview.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c7d2fe', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 4 Mastery
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
              <BookOpen size={16} /> <strong>7 Core Sections</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> <strong>45–60 Mins</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={16} /> <strong>20 Practice Questions</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Trophy size={16} /> <strong>Pass Threshold: 70%</strong>
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
                What You Will Master in Day 4
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Classification and Odd-One-Out problems appear in almost every campus placement, banking, and civil services aptitude test. They test your ability to spot subtle commonalities, categorize information accurately, and eliminate items that violate logical rules.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day4Overview.objectives.map((obj, i) => (
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

              {/* The Master Classification Secret */}
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} />
                  <span>The Master Secret: Define the Rule for the OTHER THREE!</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#312e81', lineHeight: 1.6, margin: 0 }}>
                  Beginners often make the mistake of looking for an item that "feels strange". Top scorers do the opposite: they identify the <strong>exact shared feature uniting three items</strong>. The fourth item that lacks that exact feature is your indisputable answer!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Section 1: Intro to Classification →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: INTRODUCTION TO CLASSIFICATION */}
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

              <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#065f46' }}>
                <strong>Golden Rule:</strong> {section1Content.goldenRule}
              </div>

              {/* Worked Examples Cards */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Foundational Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section1Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        Common Group: {ex.commonFeature}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    {/* Pill options */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem;
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: isOdd ? '#991b1b' : '#0f172a',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                          }}>
                            {item} {isOdd ? '✕' : '✓'}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 <strong>Logic Breakdown:</strong> {ex.explanation}
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
                  Next: Section 2 (Word Classification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: WORD CLASSIFICATION */}
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

              {/* Common Categorization Dimensions */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                  Key Word Categories Frequently Tested in Exams:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
                  {section2Content.categoriesList.map((cat, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                      <div style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {cat.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{cat.rule}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Word Classification Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section2Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#166534', fontSize: '0.95rem' }}>
                        Category: {ex.commonGroup}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem;
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: isOdd ? '#991b1b' : '#0f172a'
                          }}>
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 {ex.explanation}
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
                  ← Section 1
                </button>
                <button
                  onClick={() => handleTabChange('section3')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 3 (Number Classification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: NUMBER CLASSIFICATION */}
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

              {/* Number Rules Card */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {section3Content.numberRules.map((r, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '0.85rem' }}>
                    <div style={{ fontWeight: 800, color: '#312e81', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {r.rule}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{r.clue}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Number Property Inspector */}
              <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calculator size={18} style={{ color: '#4f46e5' }} />
                  Interactive Number Property Inspector
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  Test any number to see which mathematical buckets it falls into:
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <input
                    type="number"
                    value={testerNumber}
                    onChange={(e) => setTesterNumber(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '1.2rem', fontWeight: 800, width: '120px' }}
                  />
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {[9, 16, 21, 27, 49].map(n => (
                      <button
                        key={n}
                        onClick={() => setTesterNumber(n)}
                        style={{ padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Try {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Property Badges */}
                {(() => {
                  const n = testerNumber;
                  const isEven = n % 2 === 0;
                  const isSquare = Number.isInteger(Math.sqrt(n));
                  const isCube = Number.isInteger(Math.cbrt(n));
                  let isPrime = n > 1;
                  for (let i = 2; i <= Math.sqrt(n); i++) {
                    if (n % i === 0) { isPrime = false; break; }
                  }

                  return (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ background: isEven ? '#dcfce7' : '#fee2e2', color: isEven ? '#15803d' : '#991b1b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                        {isEven ? '✓ Even Number' : '✕ Odd Number'}
                      </span>
                      <span style={{ background: isPrime ? '#dcfce7' : '#fee2e2', color: isPrime ? '#15803d' : '#991b1b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                        {isPrime ? '✓ Prime Number' : '✕ Composite Number'}
                      </span>
                      <span style={{ background: isSquare ? '#dcfce7' : '#f1f5f9', color: isSquare ? '#15803d' : '#64748b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                        {isSquare ? `✓ Perfect Square (${Math.sqrt(n)}²)` : '✕ Not a Square'}
                      </span>
                      <span style={{ background: isCube ? '#dcfce7' : '#f1f5f9', color: isCube ? '#15803d' : '#64748b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                        {isCube ? `✓ Perfect Cube (${Math.round(Math.cbrt(n))}³)` : '✕ Not a Cube'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Number Classification Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section3Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.95rem' }}>
                        Shared Property: {ex.property}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem;
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            color: isOdd ? '#991b1b' : '#0f172a'
                          }}>
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 {ex.explanation}
                    </div>
                  </div>
                ))}
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
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 4 (Alphabet Classification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: ALPHABET CLASSIFICATION */}
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

              <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#1e40af' }}>
                <strong>Alphabet Strategy:</strong> {section4Content.goldenRule}
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Alphabet Classification Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section4Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        Rule: {ex.ruleApplied}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem;
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            color: isOdd ? '#991b1b' : '#0f172a'
                          }}>
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 {ex.explanation}
                    </div>
                  </div>
                ))}
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
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 5 (Shape & Symbol Classification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: SHAPE AND SYMBOL CLASSIFICATION */}
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

              {/* Polygon Sides & Vertices Explorer */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shapes size={18} style={{ color: '#4f46e5' }} />
                  Polygon Sides Reference Studio:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { name: 'Triangle', sides: 3, vertices: 3 },
                    { name: 'Quadrilateral', sides: 4, vertices: 4 },
                    { name: 'Pentagon', sides: 5, vertices: 5 },
                    { name: 'Hexagon', sides: 6, vertices: 6 },
                    { name: 'Circle', sides: 0, vertices: 0 }
                  ].map(shape => (
                    <div key={shape.name} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{shape.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 700, marginTop: '0.2rem' }}>
                        Sides: {shape.sides}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Corners: {shape.vertices}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Shape & Symbol Worked Examples
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section5Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        Shared Feature: {ex.feature}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem || item.startsWith(ex.oddItem);
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: isOdd ? '#991b1b' : '#0f172a'
                          }}>
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 {ex.explanation}
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
                  ← Section 4
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 6 (Everyday Classification) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: EVERYDAY AND PRACTICAL CLASSIFICATION */}
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

              {/* Worked Examples Cards */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section6Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#047857', fontSize: '0.95rem' }}>
                        Domain: {ex.intendedCategory}
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        Odd One Out: {ex.oddItem}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.items.map((item, idx) => {
                        const isOdd = item === ex.oddItem;
                        return (
                          <span key={idx} style={{
                            background: isOdd ? '#fee2e2' : '#ffffff',
                            border: `2px solid ${isOdd ? '#ef4444' : '#cbd5e1'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: isOdd ? '#991b1b' : '#0f172a'
                          }}>
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      💡 {ex.explanation}
                    </div>
                  </div>
                ))}
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
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 7 (The 7-Step Strategy) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: HOW TO SOLVE ODD-ONE-OUT QUESTIONS */}
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

              {/* 7 Step Action Checklist */}
              <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2rem' }}>
                {section7Content.steps.map(s => (
                  <div key={s.num} style={{ display: 'flex', gap: '0.85rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                      {s.num}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{s.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Worked Strategy Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Step-by-Step Problem Solving Demonstrations
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section7Content.workedStrategyExamples.map((ex, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {ex.question}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.25rem' }}>
                      <strong>1. Observation:</strong> {ex.step1}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.25rem' }}>
                      <strong>2. Finding Property:</strong> {ex.step2}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                      <strong>3. Testing:</strong> {ex.step3}
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.88rem', color: '#166534', fontWeight: 700 }}>
                      Verdict: {ex.answer} is the odd one out ({ex.explanation})
                    </div>
                  </div>
                ))}
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
                  onClick={() => handleTabChange('revision')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Revision & Checklist →
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
              <div style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Summary & Exam Strategy
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {day4Revision.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem' }}>
                {day4Revision.subtitle}
              </p>

              {/* 6-Point Revision Checklist */}
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day4Revision.checklist.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{item.category}:</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', marginLeft: '0.35rem' }}>{item.rule}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 5 Revision Questions */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Quick Mental Warmups Before the Assessment:
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {day4Revision.revisionQuestions.map((rev, i) => (
                  <div key={i} style={{ background: '#f1f5f9', borderLeft: '4px solid #4f46e5', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{rev.q}</div>
                    <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.25rem' }}>Odd One Out: {rev.ans}</div>
                    <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>💡 {rev.exp}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Section 7
                </button>
                <button
                  onClick={() => handleTabChange('practice')}
                  style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Start Practice Quiz (20 Questions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* TAB 9: PRACTICE QUIZ (20 QUESTIONS) */}
        {/* ========================================================== */}
        {currentTab === 'practice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              
              {/* Quiz Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                    <Target size={14} /> DAY 4 PRACTICE ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Question {currentQuizIdx + 1} of {day4PracticeQuestions.length}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>
                    Score: {savedProgress.quizScore} / 20
                  </span>
                  <button
                    onClick={handleRetryQuiz}
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>

              {/* Progress Steps Indicator */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {day4PracticeQuestions.map((q, idx) => {
                  const isSubmitted = quizSubmitted[q.id];
                  const isCorrect = isSubmitted && quizAnswers[q.id] === q.correctAnswer;
                  const isCurrent = idx === currentQuizIdx;

                  let dotColor = '#e2e8f0';
                  if (isSubmitted) {
                    dotColor = isCorrect ? '#10b981' : '#ef4444';
                  } else if (isCurrent) {
                    dotColor = '#4f46e5';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuizIdx(idx)}
                      style={{
                        flex: 1,
                        minWidth: '18px',
                        height: '8px',
                        background: dotColor,
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                      title={`Go to Question ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Current Question View */}
              {(() => {
                const q = day4PracticeQuestions[currentQuizIdx];
                const selectedOpt = quizAnswers[q.id];
                const isSubmitted = quizSubmitted[q.id];
                const isCorrect = isSubmitted && selectedOpt === q.correctAnswer;

                return (
                  <div>
                    {/* Meta Tags */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {q.topic}
                      </span>
                      <span style={{
                        background: q.difficulty === 'Easy' ? '#dcfce7' : q.difficulty === 'Moderate' ? '#fef3c7' : '#fee2e2',
                        color: q.difficulty === 'Easy' ? '#15803d' : q.difficulty === 'Moderate' ? '#b45309' : '#991b1b',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {q.difficulty}
                      </span>
                    </div>

                    {/* Question Prompt */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '1.5rem' }}>
                      {q.question}
                    </h3>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.75rem' }}>
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let optionBg = '#ffffff';
                        let optionBorder = '#cbd5e1';
                        let optionColor = '#0f172a';

                        if (isSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            optionBg = '#dcfce7';
                            optionBorder = '#16a34a';
                            optionColor = '#15803d';
                          } else if (isSelected && !isCorrect) {
                            optionBg = '#fee2e2';
                            optionBorder = '#dc2626';
                            optionColor = '#991b1b';
                          }
                        } else if (isSelected) {
                          optionBg = '#eef2ff';
                          optionBorder = '#6366f1';
                          optionColor = '#312e81';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            style={{
                              background: optionBg,
                              border: `2px solid ${optionBorder}`,
                              borderRadius: '12px',
                              padding: '1rem 1.25rem',
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
                                background: isSelected ? (isSubmitted ? (isCorrect ? '#16a34a' : '#dc2626') : '#4f46e5') : '#f1f5f9',
                                color: isSelected ? '#ffffff' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.85rem'
                              }}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span style={{ fontSize: '1rem', fontWeight: 700, color: optionColor }}>
                                {opt}
                              </span>
                            </div>

                            {isSubmitted && optIdx === q.correctAnswer && (
                              <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
                            )}
                            {isSubmitted && isSelected && !isCorrect && (
                              <XCircle size={20} style={{ color: '#dc2626' }} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit / Feedback Button */}
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
                          <span>{isCorrect ? 'Correct! Logical Reasoning Confirmed!' : 'Incorrect. Notice the Group Rule Below:'}</span>
                        </div>
                        <p style={{ fontSize: '0.92rem', color: isCorrect ? '#166534' : '#7f1d1d', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                        <div style={{ fontSize: '0.82rem', color: isCorrect ? '#15803d' : '#991b1b', fontStyle: 'italic' }}>
                          💡 Shared Feature of Other 3: {q.distractorNotes}
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

                      {currentQuizIdx < day4PracticeQuestions.length - 1 ? (
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
                {savedProgress.quizPassed ? 'Day 4 Assessment Passed!' : 'More Practice Recommended'}
              </h2>

              <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                {savedProgress.quizPercentage >= 90
                  ? '🌟 Outstanding! You can identify categories and differences with top-tier precision.'
                  : savedProgress.quizPercentage >= 70
                  ? '🎉 Good progress! You cleared the 70% threshold. Keep practising to reach 100% accuracy.'
                  : savedProgress.quizPercentage >= 50
                  ? '⚠️ Close, but not quite at the 70% passing threshold. Review the worked examples and try again.'
                  : '📘 You scored below 50%. Revisit the 7 lesson sections before re-attempting the quiz.'}
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
                    onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d5', 'overview')}
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
                    Proceed to Day 5: Analogies & Relationships →
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
            background: 'rgba(15, 23, 42, 0.65)',
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
                    Day 4 Assessment: Full Question Review
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Score: {savedProgress.quizScore} / 20 ({savedProgress.quizPercentage}%)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: '2px', borderRadius: '8px' }}>
                    {['all', 'incorrect', 'correct'].map(f => (
                      <button
                        key={f}
                        onClick={() => setReviewFilter(f)}
                        style={{
                          background: reviewFilter === f ? '#ffffff' : 'transparent',
                          border: 'none',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: reviewFilter === f ? '#0f172a' : '#64748b',
                          textTransform: 'capitalize'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsReviewOpen(false)}
                    style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, color: '#475569' }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'grid', gap: '1.25rem' }}>
                {day4PracticeQuestions
                  .filter(q => {
                    const isSubmitted = quizSubmitted[q.id];
                    const isCorrect = isSubmitted && quizAnswers[q.id] === q.correctAnswer;
                    if (reviewFilter === 'incorrect') return isSubmitted && !isCorrect;
                    if (reviewFilter === 'correct') return isSubmitted && isCorrect;
                    return true;
                  })
                  .map((q, idx) => {
                    const isSubmitted = quizSubmitted[q.id];
                    const chosenIdx = quizAnswers[q.id];
                    const isCorrect = isSubmitted && chosenIdx === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        style={{
                          background: '#f8fafc',
                          border: `1px solid ${isCorrect ? '#86efac' : isSubmitted ? '#fca5a5' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                            Question {q.id.replace('d4_q', '')}: {q.topic}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: isCorrect ? '#dcfce7' : isSubmitted ? '#fee2e2' : '#f1f5f9',
                            color: isCorrect ? '#15803d' : isSubmitted ? '#991b1b' : '#64748b'
                          }}>
                            {isCorrect ? 'Correct' : isSubmitted ? 'Incorrect' : 'Unanswered'}
                          </span>
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.75rem' }}>
                          {q.question}
                        </div>

                        <div style={{ display: 'grid', gap: '0.35rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, optI) => {
                            const isUserChoice = chosenIdx === optI;
                            const isRightChoice = optI === q.correctAnswer;
                            let bColor = '#e2e8f0';
                            let tColor = '#475569';
                            let bg = '#ffffff';

                            if (isRightChoice) {
                              bg = '#dcfce7';
                              bColor = '#86efac';
                              tColor = '#15803d';
                            } else if (isUserChoice) {
                              bg = '#fee2e2';
                              bColor = '#fca5a5';
                              tColor = '#991b1b';
                            }

                            return (
                              <div key={optI} style={{ background: bg, border: `1px solid ${bColor}`, borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: tColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{String.fromCharCode(65 + optI)}. {opt}</span>
                                {isRightChoice && <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>✓ Correct Answer</span>}
                                {isUserChoice && !isRightChoice && <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>✕ Your Choice</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.82rem', color: '#475569' }}>
                          <strong style={{ color: '#0f172a' }}>Reasoning:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setIsReviewOpen(false)}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* DAY 5 PREVIEW MODAL */}
        {/* ========================================================== */}
        {showDay5Modal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
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
              maxWidth: '550px',
              width: '100%',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ede9fe', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <Clock size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                Day 5: Analogies and Relationships
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Congratulations on completing Day 4! In Day 5, you will learn to decode word pairs, numerical analogies, functional relationships, and causal pairs.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDay5Modal(false)}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Stay on Day 4
                </button>
                <button
                  onClick={() => {
                    setShowDay5Modal(false);
                    if (onNavigate) onNavigate('spoko_reasoning_l1_d5', 'overview');
                  }}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Start Day 5 Lesson →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Footer Navigation */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #cbd5e1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
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
            ← Back to Level 1 Curriculum
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d3', 'overview')}
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
              ← Previous: Day 3 (Alphabet & Symbols)
            </button>

            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d5', 'overview')}
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
              Next: Day 5 (Analogies) →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
