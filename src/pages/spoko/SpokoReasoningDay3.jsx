import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, CheckCircle2, XCircle, Check, Award, ArrowRight, ArrowLeft,
  RotateCcw, Sparkles, BookOpen, Layers, Target, Zap, Clock,
  HelpCircle, ChevronRight, ChevronDown, ChevronUp, AlertCircle,
  Eye, CheckSquare, ShieldCheck, TrendingUp, TrendingDown, Home, GraduationCap,
  Briefcase, Filter, Info, FileText, Hash, Calculator, Split, Grid, CheckCheck,
  Lightbulb, Compass, Search, Play, Trophy, Gauge, Star, Circle, Triangle, Square,
  Shield, Activity, ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day3Overview,
  alphabetPositionTable,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day3Revision,
  day3PracticeQuestions
} from '../../data/reasoningLevel1Day3.js';

export default function SpokoReasoningDay3({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d3_progress_${userKey}`;

  // Current active sub-tab (driven by Sidebar or in-page navigation)
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
      console.error("Failed to save Day 3 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d3:day3';
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

  // Switch tabs smoothly and notify parent navigation
  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    markSectionCompleted(tabId);
    if (typeof onNavigate === 'function') {
      onNavigate('spoko_reasoning_l1_d3', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 1: Interactive Letter Position Matrix & Live Word Converter
  const [positionFilter, setPositionFilter] = useState('');
  const [wordConverterInput, setWordConverterInput] = useState('SPOKO');
  const [positionMode, setPositionMode] = useState('forward'); // 'forward' | 'reverse'

  // Section 4: Alternating Track Splitter State
  const [showAlternatingColors, setShowAlternatingColors] = useState(true);

  // Section 7: Live Letter Coder Sandbox
  const [coderWord, setCoderWord] = useState('DOG');
  const [coderShift, setCoderShift] = useState(1);

  // Day 4 Preview Modal State
  const [showDay4Modal, setShowDay4Modal] = useState(false);

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
    const currentQ = day3PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    let score = 0;
    day3PracticeQuestions.forEach(q => {
      if (newSubmitted[q.id] && newAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const isCorrect = newAnswers[qId] === currentQ.correctAnswer;
    if (isCorrect) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      } catch {}
    }

    const percentage = Math.round((score / 20) * 100);
    const passed = percentage >= 70;

    const allAnswered = day3PracticeQuestions.every(q => newSubmitted[q.id]);

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
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 3: Alphabet & Symbol Patterns</span>
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
                <span>Level 1 • Day 3 of 4</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Alphabet and Symbol Patterns
              </h1>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', lineHeight: 1.6, margin: 0 }}>
                {day3Overview.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c7d2fe', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 3 Mastery
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
                What You Will Master in Day 3
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Aptitude tests love letter and symbol questions because they test your ability to convert visual information into logical rules. In this lesson, you will learn the golden secret used by top scorers: <strong>every letter is just a number in disguise!</strong>
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day3Overview.objectives.map((obj, i) => (
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

              {/* The Golden Rule Callout */}
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} />
                  <span>The Master Rule: Letters are Just Numbers!</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#312e81', lineHeight: 1.6, margin: 0 }}>
                  Whenever you see an alphabet sequence like <strong>C, F, I, L...</strong>, immediately replace the letters with their numbers: <strong>3, 6, 9, 12...</strong>. Once you do that, the puzzle becomes simple elementary school arithmetic (+3)!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Section 1: Alphabet Positions →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: UNDERSTANDING ALPHABET POSITIONS */}
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

              {/* EJOTY Memory Trick Card */}
              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '10px', padding: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '1.05rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lightbulb size={20} />
                  <span>The Famous "EJOTY" 5-Second Memory Shortcut</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  Never count on your fingers from A to Z! Just remember the word <strong>EJOTY</strong>. Every letter is a clean multiple of 5:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { l: 'E', p: 5 },
                    { l: 'J', p: 10 },
                    { l: 'O', p: 15 },
                    { l: 'T', p: 20 },
                    { l: 'Y', p: 25 }
                  ].map(item => (
                    <div key={item.l} style={{ background: '#ffffff', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 1rem', textAlign: 'center', minWidth: '60px' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#b45309' }}>{item.l}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#78350f' }}>= {item.p}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#92400e', marginTop: '0.75rem' }}>
                  💡 Need letter <strong>G</strong>? E is 5, so F is 6, and G is <strong>7</strong>! Need letter <strong>S</strong>? T is 20, so S is <strong>19</strong>!
                </div>
              </div>

              {/* Alphabet Position Reference Grid with Live Search & Reverse Toggle */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Official A–Z Reference Matrix (A=1 to Z=26)
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => setPositionMode(positionMode === 'forward' ? 'reverse' : 'forward')}
                      style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}
                    >
                      {positionMode === 'forward' ? '🔄 Show Reverse (Z=1)' : '🔄 Show Standard (A=1)'}
                    </button>
                    <input
                      type="text"
                      placeholder="Filter letter (e.g. M)..."
                      value={positionFilter}
                      onChange={(e) => setPositionFilter(e.target.value.toUpperCase())}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', width: '150px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))', gap: '0.5rem' }}>
                  {alphabetPositionTable
                    .filter(item => !positionFilter || item.letter.includes(positionFilter) || String(item.pos).includes(positionFilter))
                    .map(item => {
                      const isEjoty = ['E', 'J', 'O', 'T', 'Y'].includes(item.letter);
                      return (
                        <div
                          key={item.letter}
                          style={{
                            background: isEjoty ? '#ecfdf5' : '#f8fafc',
                            border: `2px solid ${isEjoty ? '#10b981' : '#e2e8f0'}`,
                            borderRadius: '10px',
                            padding: '0.6rem 0.3rem',
                            textAlign: 'center',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isEjoty ? '#047857' : '#0f172a' }}>
                            {item.letter}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isEjoty ? '#059669' : '#6366f1' }}>
                            {positionMode === 'forward' ? item.pos : item.revPos}
                          </div>
                          {isEjoty && (
                            <span style={{ fontSize: '0.65rem', background: '#d1fae5', color: '#065f46', padding: '1px 4px', borderRadius: '4px', fontWeight: 700 }}>
                              EJOTY
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Interactive Word-to-Numbers Converter */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calculator size={18} style={{ color: '#4f46e5' }} />
                  Live Word-to-Position Decoder
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  Type any word to convert its letters into numbers instantly:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={wordConverterInput}
                    onChange={(e) => setWordConverterInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                    placeholder="TYPE ANY WORD..."
                    maxLength={10}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.1em', width: '220px' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    ({wordConverterInput.length} letters)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {wordConverterInput.split('').map((char, idx) => {
                    const match = alphabetPositionTable.find(x => x.letter === char);
                    return (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem 0.85rem', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4f46e5' }}>{char}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                          Pos: {match ? match.pos : '?'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 1 Worked Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Examples: Using Letter Positions
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {section1Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        {ex.rule}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Answer: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.series.map((val, idx) => (
                        <span key={idx} style={{
                          background: val === '__' ? '#fef3c7' : '#ffffff',
                          border: val === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: val === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {val === '__' ? '?' : val}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        NUMERICAL CONVERSION:
                      </div>
                      <div style={{ fontWeight: 700, color: '#4338ca', marginBottom: '0.35rem' }}>
                        {ex.letterPositions.join(' → ')}
                      </div>
                      <div style={{ color: '#16a34a', fontWeight: 700 }}>
                        {ex.calculation}
                      </div>
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
                  Next: Section 2 (Forward Patterns) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 2: FORWARD ALPHABET PATTERNS */}
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

              <div style={{ background: '#ecfdf5', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#065f46' }}>
                <strong>Key Strategy:</strong> {section2Content.goldenRule}
              </div>

              {/* Forward Examples Cards */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section2Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem' }}>
                        Step Jump: {ex.step}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Next Letter: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.series.map((val, idx) => (
                        <span key={idx} style={{
                          background: val === '__' ? '#fef3c7' : '#ffffff',
                          border: val === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: val === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {val === '__' ? '?' : val}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                        STEP VERIFICATION:
                      </div>
                      <div style={{ color: '#16a34a', fontWeight: 700, marginTop: '0.25rem' }}>
                        Calculation: {ex.calculation}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                        💡 {ex.note}
                      </div>
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
                  Next: Section 3 (Backward Patterns) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: BACKWARD ALPHABET PATTERNS */}
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

              <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#991b1b' }}>
                <strong>Key Strategy:</strong> {section3Content.goldenRule}
              </div>

              {/* Backward Examples Cards */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section3Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem' }}>
                        Reverse Step: {ex.step}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Next Letter: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.series.map((val, idx) => (
                        <span key={idx} style={{
                          background: val === '__' ? '#fef3c7' : '#ffffff',
                          border: val === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: val === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {val === '__' ? '?' : val}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                        COUNTDOWN CALCULATION:
                      </div>
                      <div style={{ color: '#dc2626', fontWeight: 700, marginTop: '0.25rem' }}>
                        {ex.calculation}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                        💡 {ex.note}
                      </div>
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
                  Next: Section 4 (Alternating Patterns) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: ALTERNATING ALPHABET PATTERNS */}
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
                <strong>The 2-Track Secret:</strong> {section4Content.goldenRule}
              </div>

              {/* Worked Examples of Dual Tracks */}
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {section4Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem' }}>
                        Sequence: {ex.series.join(' , ')}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                        Correct Answer: {ex.answer}
                      </span>
                    </div>

                    {/* Dual Track Split Visualizer */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      
                      {/* Track 1: Odd Positions */}
                      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#b45309', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          🟡 Track 1: Odd Positions ({ex.oddTrack.positions})
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          {ex.oddTrack.terms.map((t, i) => (
                            <span key={i} style={{ background: '#ffffff', border: '1px solid #fde68a', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 800, color: '#92400e', fontSize: '0.95rem' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#78350f', fontWeight: 600 }}>
                          Rule: {ex.oddTrack.rule}
                        </div>
                      </div>

                      {/* Track 2: Even Positions */}
                      <div style={{ background: '#e0f2fe', border: '1px solid #7dd3fc', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          🔵 Track 2: Even Positions ({ex.evenTrack.positions})
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          {ex.evenTrack.terms.map((t, i) => (
                            <span key={i} style={{ background: '#ffffff', border: '1px solid #bae6fd', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 800, color: '#0c4a6e', fontSize: '0.95rem' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 600 }}>
                          Rule: {ex.evenTrack.rule}
                        </div>
                      </div>

                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155' }}>
                      <strong>Target Slot:</strong> {ex.targetSlot} → Calculation: <span style={{ color: '#16a34a', fontWeight: 800 }}>{ex.calculation}</span>.
                      <div style={{ marginTop: '0.25rem', color: '#64748b', fontSize: '0.82rem' }}>
                        {ex.explanation}
                      </div>
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
                  Next: Section 5 (Missing Letters & Gaps) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: MISSING LETTERS AND LETTER GAPS */}
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

              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#92400e' }}>
                <strong>Gap Strategy:</strong> {section5Content.goldenRule}
              </div>

              {/* Worked Examples Cards */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section5Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        Rule: {ex.gapRule}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Missing Letter: {ex.answer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.series.map((val, idx) => (
                        <span key={idx} style={{
                          background: val === '__' ? '#fef3c7' : '#ffffff',
                          border: val === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: val === '__' ? '#b45309' : '#0f172a'
                        }}>
                          {val === '__' ? '?' : val}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                        GAP VERIFICATION:
                      </div>
                      <div style={{ color: '#16a34a', fontWeight: 700, marginTop: '0.25rem' }}>
                        {ex.calculation}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                        💡 {ex.note}
                      </div>
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
                  Next: Section 6 (Simple Symbol Patterns) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: SIMPLE SYMBOL PATTERNS */}
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

              <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#065f46' }}>
                <strong>Visual Tip:</strong> {section6Content.goldenRule}
              </div>

              {/* Standard Symbol Roster Card */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                  Frequently Tested Symbols in Aptitude Exams:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  {section6Content.symbolLibrary.map(item => (
                    <div key={item.symbol} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: '#4f46e5' }}>{item.symbol}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Examples of Symbol Patterns */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Examples: Solving Symbol Sequences
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section6Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        {ex.type}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Next Symbol: {ex.answerLabel}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {ex.series.map((val, idx) => (
                        <span key={idx} style={{
                          background: val === '__' ? '#fef3c7' : '#ffffff',
                          border: val === '__' ? '2px dashed #b45309' : '1px solid #cbd5e1',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '1.3rem',
                          color: val === '__' ? '#b45309' : '#0f172a',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          {val === '__' ? '?' : val}
                        </span>
                      ))}
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155' }}>
                      <div style={{ color: '#16a34a', fontWeight: 700 }}>
                        Rule: {ex.rule}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                        💡 {ex.explanation}
                      </div>
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
                  Next: Section 7 (Basic Letter Coding) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: BASIC LETTER CODING */}
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

              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#92400e' }}>
                <strong>Vertical Alignment Rule:</strong> {section7Content.goldenRule}
              </div>

              {/* Interactive Coding Sandbox */}
              <div style={{ background: '#f8fafc', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={20} style={{ color: '#4f46e5' }} />
                  Interactive Letter Coder Sandbox
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
                  Type a word and select the shift to see how the code is generated live:
                </p>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>INPUT WORD:</label>
                    <input
                      type="text"
                      value={coderWord}
                      onChange={(e) => setCoderWord(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                      maxLength={6}
                      style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '1.1rem', fontWeight: 800, width: '160px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>SHIFT RULE:</label>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {[-1, 1, 2, 3].map(s => (
                        <button
                          key={s}
                          onClick={() => setCoderShift(s)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            background: coderShift === s ? '#4f46e5' : '#e2e8f0',
                            color: coderShift === s ? '#ffffff' : '#334155'
                          }}
                        >
                          {s > 0 ? `+${s}` : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Output */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {coderWord.split('').map((ch, idx) => {
                    const originalCode = ch.charCodeAt(0) - 65; // 0..25
                    const shiftedCode = (originalCode + coderShift + 26) % 26;
                    const encodedChar = String.fromCharCode(65 + shiftedCode);

                    return (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.65rem 0.85rem', textAlign: 'center', minWidth: '55px' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>{ch}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pos: {originalCode + 1}</div>
                        <div style={{ color: coderShift >= 0 ? '#16a34a' : '#dc2626', fontWeight: 700, fontSize: '0.75rem', margin: '0.2rem 0' }}>
                          {coderShift >= 0 ? `+${coderShift}` : coderShift}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4f46e5' }}>{encodedChar}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Pos: {shiftedCode + 1}</div>
                      </div>
                    );
                  })}
                  {coderWord && (
                    <div style={{ marginLeft: '1rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700, display: 'block' }}>ENCODED RESULT:</span>
                      <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534' }}>
                        {coderWord.split('').map(ch => {
                          const c = ch.charCodeAt(0) - 65;
                          return String.fromCharCode(65 + ((c + coderShift + 26) % 26));
                        }).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Worked Examples Cards */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Worked Examples: 1-to-1 Letter Coding
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {section7Content.examples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>
                        Sample: {ex.givenPair.word} → {ex.givenPair.code}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Code for {ex.targetWord}: {ex.answer}
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#334155', marginBottom: '0.5rem' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        VERTICAL ALIGNMENT & SHIFT:
                      </div>
                      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                        {ex.analysis.map((a, i) => (
                          <div key={i} style={{ background: '#f1f5f9', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
                            <strong>{a.orig}</strong> ──({a.shift})──▶ <strong>{a.coded}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      💡 {ex.explanation}
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
                {day3Revision.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem' }}>
                {day3Revision.subtitle}
              </p>

              {/* 7-Point Revision Checklist */}
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day3Revision.checklist.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{item.rule}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.15rem' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Worked Revision Examples */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Quick Mental Warmups Before the Quiz:
              </h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {day3Revision.revisionExamples.map((ex, i) => (
                  <div key={i} style={{ background: '#f1f5f9', borderLeft: '4px solid #4f46e5', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{ex.q}</div>
                    <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.25rem' }}>Answer: {ex.ans}</div>
                    <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.25rem' }}>💡 {ex.exp}</div>
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
                    <Target size={14} /> DAY 3 PRACTICE ASSESSMENT
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Question {currentQuizIdx + 1} of {day3PracticeQuestions.length}
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
                {day3PracticeQuestions.map((q, idx) => {
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
                const q = day3PracticeQuestions[currentQuizIdx];
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
                          <span>{isCorrect ? 'Correct! Well Done!' : 'Incorrect. Study the Rule Below:'}</span>
                        </div>
                        <p style={{ fontSize: '0.92rem', color: isCorrect ? '#166534' : '#7f1d1d', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                          <strong>Step-by-Step Logic:</strong> {q.explanation}
                        </p>
                        <div style={{ fontSize: '0.82rem', color: isCorrect ? '#15803d' : '#991b1b', fontStyle: 'italic' }}>
                          💡 Distractor Breakdown: {q.distractorNotes}
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

                      {currentQuizIdx < day3PracticeQuestions.length - 1 ? (
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
                {savedProgress.quizPassed ? 'Day 3 Assessment Passed!' : 'More Practice Recommended'}
              </h2>

              <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                {savedProgress.quizPercentage >= 90
                  ? '🌟 Outstanding Mastery! You recognize alphabet and symbol patterns very well.'
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
                    onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d4', 'overview')}
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
                    Proceed to Day 4: Classification →
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
                    Day 3 Assessment: Full Question Review
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
                {day3PracticeQuestions
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
                            Question {q.id.replace('d3_q', '')}: {q.topic}
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
                                {isUserChoice && !isRightChoice && <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>✕ Your Pick</span>}
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
        {/* DAY 4 PREVIEW MODAL */}
        {/* ========================================================== */}
        {showDay4Modal && (
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
                Day 4: Classification and Odd One Out
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Congratulations on completing Day 3! Day 4 covers classification logic, semantic groupings, and identifying the odd element in letter, word, and number sets.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDay4Modal(false)}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Stay on Day 3
                </button>
                <button
                  onClick={() => {
                    setShowDay4Modal(false);
                    if (onNavigate) onNavigate('dashboard');
                  }}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Back to Dashboard
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
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d2', 'overview')}
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
              ← Previous: Day 2 (Number Series)
            </button>

            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d4', 'overview')}
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
              Next: Day 4 (Classification) →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
