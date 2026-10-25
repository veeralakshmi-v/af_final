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
  ShieldAlert, Split, CheckCheck, FileText, CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  day6Overview,
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  day6Revision,
  day6PracticeQuestions
} from '../../data/reasoningLevel1Day6.js';

export default function SpokoReasoningDay6({
  activeTab = 'overview',
  onNavigate,
  session,
  completedLessons = []
}) {
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const storageKey = `spoko_reasoning_d6_progress_${userKey}`;

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
      console.error("Failed to save Day 6 progress:", e);
    }
  }, [savedProgress, storageKey]);

  // Sync completedDay with LMS backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId && savedProgress.completedDay) {
      const lessonKey = 'spoko_reasoning:spoko_reasoning_l1_d6:day6';
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
      onNavigate('spoko_reasoning_l1_d6', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // INTERACTIVE WIDGET STATES
  // ==========================================
  // Section 1: Premise / Conclusion / Assumption Explorer
  const [selectedPcaItem, setSelectedPcaItem] = useState('premise');

  // Section 2: Facts vs Assumptions Classifier
  const [testedAssumptionId, setTestedAssumptionId] = useState(null);

  // Section 3: All / Some / None Visual Quantifier Explorer
  const [selectedQuantifier, setSelectedQuantifier] = useState('all');

  // Section 4: Invalid Reverse Statement Tester
  const [reverseTestAnswer, setReverseTestAnswer] = useState({});

  // Section 5: Contradiction Auditor
  const [testedContradiction, setTestedContradiction] = useState(null);

  // Section 6: Real World Scenarios tab
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

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
    const currentQ = day6PracticeQuestions.find(q => q.id === qId);

    const newSubmitted = { ...quizSubmitted, [qId]: true };
    const newAnswers = { ...quizAnswers };

    let score = 0;
    day6PracticeQuestions.forEach(q => {
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
    const allAnswered = day6PracticeQuestions.every(q => newSubmitted[q.id]);

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

  // Calculate overall Day 6 lesson progress percentage
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
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Day 6: Basic Deductive Reasoning</span>
        </div>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #4338ca 100%)',
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
                <span>Level 1 • Day 6 of 7</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
                Basic Deductive Reasoning
              </h1>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', lineHeight: 1.6, margin: 0 }}>
                {day6Overview.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', minWidth: '180px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c7d2fe', marginBottom: '0.35rem', fontWeight: 600 }}>
                Day 6 Mastery
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
                What You Will Master in Day 6
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Deductive reasoning is the gold standard of analytical logic. It tests your ability to take accepted rules and premises, process them without personal bias, and draw airtight, necessary conclusions. It is one of the most critical topics tested in campus hiring, technical interviews, and aptitude exams.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day6Overview.objectives.map((obj, i) => (
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

              {/* The Master Law Card */}
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)', border: '2px solid #c7d2fe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Shield size={20} />
                  <span>The Deductive Law: Only What Must Follow, Follows!</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#312e81', lineHeight: 1.6, margin: 0 }}>
                  In deductive reasoning, if there is even a 1% possibility that a conclusion could be false while all given premises are true, then that conclusion <strong>DOES NOT FOLLOW</strong>! A valid deduction must be 100% airtight and inescapable.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d5', 'overview')}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  ← Go to Day 5: Analogies
                </button>
                <button
                  onClick={() => handleTabChange('section1')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Start Section 1: Intro to Deduction →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 1: INTRODUCTION TO DEDUCTIVE REASONING */}
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

              {/* Core Definitions Grid */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                The Three Pillars of Deductive Logic
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.coreDefinitions.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4338ca', fontSize: '1.05rem' }}>{item.term}</span>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>{item.badge}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>

              {/* Foundational Syllogism Box */}
              <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Classic Syllogism Example
                </div>
                <div style={{ fontSize: '1rem', color: '#14532d', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  <div><strong>Statement 1 (Premise):</strong> {section1Content.primaryExample.statement1}</div>
                  <div><strong>Statement 2 (Premise):</strong> {section1Content.primaryExample.statement2}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d', marginTop: '0.25rem' }}>
                    ➡️ <strong>Conclusion:</strong> {section1Content.primaryExample.conclusion}
                  </div>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #bbf7d0', fontSize: '0.88rem', color: '#1e293b' }}>
                  💡 <strong>Why it follows:</strong> {section1Content.primaryExample.explanation}
                </div>
              </div>

              {/* Additional Beginner Examples */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Two Additional Beginner-Friendly Examples
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section1Content.additionalExamples.map(ex => (
                  <div key={ex.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                      <div>• {ex.statement1}</div>
                      <div>• {ex.statement2}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      Conclusion: {ex.conclusion} (Valid ✓)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      {ex.explanation}
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
        {/* SECTION 2: FACTS, STATEMENTS, AND ASSUMPTIONS */}
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

              {/* Golden Rule Callout */}
              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.92rem', color: '#92400e' }}>
                <strong>Important Principle:</strong> {section2Content.ruleCard}
              </div>

              {/* Contrast Case Matrix */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                A Critical Contrast: Universal Statement vs Particular Statement
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                
                {/* Valid Case */}
                <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} />
                    <span>{section2Content.contrastCase.validCase.title}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    <div><strong>Premise:</strong> {section2Content.contrastCase.validCase.statement}</div>
                    <div><strong>Given:</strong> {section2Content.contrastCase.validCase.given}</div>
                    <div style={{ color: '#166534', fontWeight: 700, marginTop: '0.25rem' }}>
                      ➡️ Conclusion: {section2Content.contrastCase.validCase.conclusion}
                    </div>
                  </div>
                  <div style={{ background: '#ffffff', borderRadius: '6px', padding: '0.65rem 0.85rem', border: '1px solid #bbf7d0', fontSize: '0.85rem', color: '#14532d' }}>
                    <strong>Verdict:</strong> {section2Content.contrastCase.validCase.result}. {section2Content.contrastCase.validCase.reasoning}
                  </div>
                </div>

                {/* Invalid Case */}
                <div style={{ background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    <XCircle size={18} />
                    <span>{section2Content.contrastCase.invalidCase.title}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    <div><strong>Premise:</strong> {section2Content.contrastCase.invalidCase.statement}</div>
                    <div><strong>Given:</strong> {section2Content.contrastCase.invalidCase.given}</div>
                    <div style={{ color: '#991b1b', fontWeight: 700, marginTop: '0.25rem' }}>
                      ➡️ Conclusion: {section2Content.contrastCase.invalidCase.conclusion}
                    </div>
                  </div>
                  <div style={{ background: '#ffffff', borderRadius: '6px', padding: '0.65rem 0.85rem', border: '1px solid #fecaca', fontSize: '0.85rem', color: '#7f1d1d' }}>
                    <strong>Verdict:</strong> {section2Content.contrastCase.invalidCase.result} {section2Content.contrastCase.invalidCase.reasoning}
                  </div>
                </div>

              </div>

              {/* Checklist */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Mental Checklist to Avoid Assumption Traps
              </h3>
              <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '2rem' }}>
                {section2Content.checklistItems.map((chk, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckSquare size={16} style={{ color: '#4f46e5', flexShrink: 0 }} />
                    <span>{chk}</span>
                  </div>
                ))}
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
                  Next: Section 3 (All, Some & None) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 3: ALL, SOME, AND NONE */}
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

              {/* Quantifier Tabs Switcher */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {section3Content.quantifiers.map(q => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuantifier(q.id)}
                    style={{
                      background: selectedQuantifier === q.id ? '#4f46e5' : '#f1f5f9',
                      color: selectedQuantifier === q.id ? '#ffffff' : '#334155',
                      border: '1px solid',
                      borderColor: selectedQuantifier === q.id ? '#4f46e5' : '#cbd5e1',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer'
                    }}
                  >
                    {q.name.split(' ')[0]} ({q.id.toUpperCase()})
                  </button>
                ))}
              </div>

              {/* Active Quantifier Deep Dive Card */}
              {(() => {
                const q = section3Content.quantifiers.find(item => item.id === selectedQuantifier);
                return (
                  <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                        {q.name}
                      </span>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
                        Logical Scope
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      <strong>Strict Definition:</strong> {q.definition}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                          ✓ WHAT IT DEFINITIVELY ESTABLISHES
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: 1.5 }}>
                          {q.whatItEstablishes}
                        </div>
                      </div>

                      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                          ✕ WHAT IT DOES NOT ESTABLISH
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.5 }}>
                          {q.whatItDoesNotEstablish}
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}>
                      💡 <strong>Standard Example:</strong> {q.example}
                    </div>
                  </div>
                );
              })()}

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
                  Next: Section 4 (Logical Conclusions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 4: DRAWING LOGICAL CONCLUSIONS */}
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

              {/* Side by side comparison: Valid vs Invalid Reverse */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                
                {/* Valid */}
                <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Valid Deductive Chain
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    <div>• {section4Content.validExample.statement1}</div>
                    <div>• {section4Content.validExample.statement2}</div>
                    <div style={{ color: '#15803d', fontWeight: 800, marginTop: '0.35rem' }}>
                      Conclusion: {section4Content.validExample.conclusion} (Follows ✓)
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#14532d', background: '#ffffff', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    {section4Content.validExample.explanation}
                  </div>
                </div>

                {/* Invalid Reverse */}
                <div style={{ background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Invalid Reverse Trap
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    <div>• {section4Content.invalidReverseExample.statement1}</div>
                    <div style={{ color: '#dc2626', fontWeight: 800, marginTop: '0.35rem' }}>
                      Conclusion: {section4Content.invalidReverseExample.conclusion} (Does NOT follow ✕)
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#7f1d1d', background: '#ffffff', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #fecaca' }}>
                    {section4Content.invalidReverseExample.explanation}
                  </div>
                </div>

              </div>

              {/* Common Logical Traps */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Three Major Deductive Fallacies to Avoid
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section4Content.commonTraps.map((tr, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                      {tr.trap}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                      {tr.badLogic}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                      Example: {tr.example}
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
                  ← Section 3 (All, Some, None)
                </button>
                <button
                  onClick={() => handleTabChange('section5')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 5 (Contradictions) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 5: IDENTIFYING CONTRADICTIONS */}
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

              {/* Contradiction Example Showcase */}
              <div style={{ background: '#fff1f2', border: '2px solid #fda4af', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#be123c', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <AlertTriangle size={20} />
                  <span>The Anatomy of a Direct Contradiction</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: '#881337', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                  <div>• {section5Content.contradictionExample.statement1}</div>
                  <div>• {section5Content.contradictionExample.statement2}</div>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #fecdd3', fontSize: '0.88rem', color: '#1e293b' }}>
                  💡 <strong>Analysis:</strong> {section5Content.contradictionExample.analysis}
                </div>
              </div>

              {/* The 4-Step Contradiction Audit Checklist */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                4-Point Audit Checklist to Spot Contradictions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {section5Content.auditChecklist.map((ac, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                      {ac.step}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {ac.desc}
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
                  ← Section 4 (Logical Conclusions)
                </button>
                <button
                  onClick={() => handleTabChange('section6')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 6 (Everyday Situations) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 6: DEDUCTIVE REASONING IN EVERYDAY SITUATIONS */}
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

              {/* Real World Scenario Cards */}
              <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
                {section6Content.realWorldScenarios.map((sc, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: '#4338ca', fontSize: '1.05rem' }}>
                        {sc.domain}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
                        {sc.status} ✓
                      </span>
                    </div>

                    <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      <div><strong>Stated Rule:</strong> {sc.statement}</div>
                      <div><strong>Given Case:</strong> {sc.given}</div>
                      <div style={{ color: '#166534', fontWeight: 800, marginTop: '0.25rem' }}>
                        ➡️ Conclusion: {sc.conclusion}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#475569' }}>
                      💡 <strong>Deductive Rationale:</strong> {sc.explanation}
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
                  ← Section 5 (Contradictions)
                </button>
                <button
                  onClick={() => handleTabChange('section7')}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Next: Section 7 (Step-by-Step Method) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* SECTION 7: A STEP-BY-STEP DEDUCTIVE REASONING METHOD */}
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

              {/* The 7 Steps Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {section7Content.sevenSteps.map(step => (
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

              {/* 5 Worked Examples Across All Domains */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                5 Comprehensive Worked Examples
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
                Switch between these 5 worked examples to see how the 7-step method resolves different logic challenges:
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
                    {ex.type.split('.')[1] || ex.type}
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
                        {ex.answer}
                      </span>
                    </div>

                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.6, marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                      {ex.statements}
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Proposed Conclusion: {ex.conclusion}
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                      💡 <strong>Deductive Verification:</strong> {ex.explanation}
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
                  ← Section 6 (Everyday Situations)
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
                {day6Revision.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {day6Revision.subtitle}
              </p>

              {/* 8 Core Principles Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {day6Revision.eightPrinciples.map((item, idx) => (
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
                5 Rapid Revision Self-Check Questions
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {day6Revision.revisionQuestions.map((rq, idx) => {
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
                  Ready for the 20-Question Day 6 Practice Assessment?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#c7d2fe', maxWidth: '600px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
                  Evaluate direct deductions, All/Some/None rules, invalid reverse statements, and contradictions. Passing threshold is 70% (14 out of 20).
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
                    Deductive Reasoning Assessment
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
                {day6PracticeQuestions.map((q, idx) => {
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
                const q = day6PracticeQuestions[currentQuizIdx];
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
                          <span>{isCorrect ? 'Correct! Deductive Verification Confirmed!' : 'Incorrect. Notice the Deductive Boundary Below:'}</span>
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

                      {currentQuizIdx < day6PracticeQuestions.length - 1 ? (
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
                {savedProgress.quizPassed ? 'Day 6 Assessment Passed!' : 'More Practice Recommended'}
              </h2>

              {/* Dynamic Result Message as Required by Prompt */}
              <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                {savedProgress.quizPercentage >= 90
                  ? '🌟 Excellent! You can draw logical conclusions accurately.'
                  : savedProgress.quizPercentage >= 70
                  ? '🎉 Good progress! Continue practising deductive reasoning.'
                  : savedProgress.quizPercentage >= 50
                  ? '⚠️ Keep practising. Review the statements and explanations.'
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
                    onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d7', 'overview')}
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
                    Proceed to Day 7: Everyday Problem Solving →
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
                {day6PracticeQuestions
                  .filter(q => {
                    const isCorrect = quizSubmitted[q.id] && quizAnswers[q.id] === q.correctAnswer;
                    if (reviewFilter === 'correct') return isCorrect;
                    if (reviewFilter === 'incorrect') return !isCorrect;
                    return true;
                  })
                  .map((q, i) => {
                    const originalIdx = day6PracticeQuestions.findIndex(item => item.id === q.id);
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
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d5', 'overview')}
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
              ← Previous: Day 5 (Analogies)
            </button>

            <button
              onClick={() => onNavigate && onNavigate('spoko_reasoning_l1_d7', 'overview')}
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
              Next: Day 7 (Everyday Problem Solving) →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
