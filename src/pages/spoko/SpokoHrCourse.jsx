import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark, ChevronDown, ChevronUp,
  ArrowRight, ArrowLeft, Award, AlertTriangle, Lightbulb,
  Clock, Play, Pause, RotateCcw, Search, Sparkles, CheckSquare,
  User, Briefcase, Eye, Target, Bot
} from 'lucide-react';
import AiMockInterviewModal from '../../components/AiMockInterviewModal.jsx';
import {
  allHrQuestions,
  HR_DAYS_CONFIG,
  TOTAL_QUESTIONS_COUNT,
  getQuestionsByDay
} from '../../data/spokoHrQuestions.js';

export default function SpokoHrCourse({
  activeNode = { moduleId: 'spoko_hr_overview', tabId: 'dashboard' },
  onNavigate,
  session
}) {
  // Determine storage key based on session
  const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
  const completedStorageKey = `spoko_hr_completed_${userKey}`;
  const bookmarksStorageKey = `spoko_hr_bookmarks_${userKey}`;
  const mockStorageKey = `spoko_hr_mock_interviews_${userKey}`;

  const [mockInterviews, setMockInterviews] = useState(() => {
    try {
      const saved = localStorage.getItem(mockStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isMockModalOpen, setIsMockModalOpen] = useState(false);
  const [mockModalDay, setMockModalDay] = useState(1);

  // Sync mock interviews from backend if logged in
  useEffect(() => {
    const studentId = session?.studentId || session?.accessCode;
    if (studentId) {
      fetch(`/api/students/${studentId}/mock-interviews`)
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setMockInterviews(data);
            try {
              localStorage.setItem(mockStorageKey, JSON.stringify(data));
            } catch { }
          }
        })
        .catch(() => { });
    }
  }, [session, mockStorageKey]);

  const openMockModal = (dayNum = 1) => {
    setMockModalDay(Number(dayNum) || 1);
    setIsMockModalOpen(true);
  };

  const handleMockSaved = (newReport) => {
    setMockInterviews(prev => {
      const filtered = prev.filter(m => Number(m.day) !== Number(newReport.day));
      const updated = [...filtered, newReport];
      try {
        localStorage.setItem(mockStorageKey, JSON.stringify(updated));
      } catch { }
      return updated;
    });
    showToast(`Day ${newReport.day} Mock Interview Score (${newReport.totalScore}/100) saved to your Dashboard! 🎉`);
  };

  // Local state for completed questions and bookmarks
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(completedStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(bookmarksStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current view: 'dashboard' | 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'bookmarks' | 'summary'
  const [currentView, setCurrentView] = useState(() => {
    if (activeNode.moduleId?.startsWith('spoko_hr_day')) {
      const d = activeNode.moduleId.replace('spoko_hr_day', '');
      return `day${d}`;
    }
    if (activeNode.tabId === 'bookmarks') return 'bookmarks';
    if (activeNode.tabId === 'summary') return 'summary';
    return 'dashboard';
  });

  // Sync internal view when activeNode prop changes from Sidebar
  useEffect(() => {
    if (activeNode.moduleId?.startsWith('spoko_hr_day')) {
      const d = activeNode.moduleId.replace('spoko_hr_day', '');
      setCurrentView(`day${d}`);
    } else if (activeNode.tabId === 'bookmarks') {
      setCurrentView('bookmarks');
    } else if (activeNode.tabId === 'summary') {
      setCurrentView('summary');
    } else if (activeNode.tabId === 'dashboard' || activeNode.moduleId === 'spoko_hr_overview') {
      setCurrentView('dashboard');
    }
  }, [activeNode.moduleId, activeNode.tabId]);

  // Persist completions
  useEffect(() => {
    try {
      localStorage.setItem(completedStorageKey, JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Failed to save HR completions:', e);
    }
  }, [completedIds, completedStorageKey]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(bookmarksStorageKey, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Failed to save HR bookmarks:', e);
    }
  }, [bookmarkedIds, bookmarksStorageKey]);

  // UI state for question cards
  const [expandedCards, setExpandedCards] = useState({});
  const [activePersona, setActivePersona] = useState('both'); // 'fresher' | 'experienced' | 'both'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'uncompleted' | 'completed' | 'bookmarked'
  const [toastMessage, setToastMessage] = useState(null);

  // Practice Timer state: { [qId]: { seconds: 60, isRunning: false, remaining: 60 } }
  const [timers, setTimers] = useState({});

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleComplete = (id) => {
    const isNowCompleted = !completedIds.includes(id);
    setCompletedIds(prev =>
      isNowCompleted ? [...prev, id] : prev.filter(x => x !== id)
    );
    showToast(isNowCompleted ? `Question #${id} marked completed! 🎉` : `Question #${id} marked incomplete`);
  };

  const toggleBookmark = (id) => {
    const isBookmarked = bookmarkedIds.includes(id);
    setBookmarkedIds(prev =>
      isBookmarked ? prev.filter(x => x !== id) : [...prev, id]
    );
    showToast(isBookmarked ? `Removed from Saved Revision` : `Question #${id} saved for revision! 🔖`);
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = (qList) => {
    const next = {};
    qList.forEach(q => { next[q.id] = true; });
    setExpandedCards(next);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  // Timer controls for practice
  const handleStartTimer = (qId, duration = 60) => {
    setTimers(prev => ({
      ...prev,
      [qId]: {
        isRunning: true,
        remaining: prev[qId]?.remaining > 0 ? prev[qId].remaining : duration,
        total: duration
      }
    }));
  };

  const handlePauseTimer = (qId) => {
    setTimers(prev => ({
      ...prev,
      [qId]: { ...prev[qId], isRunning: false }
    }));
  };

  const handleResetTimer = (qId, duration = 60) => {
    setTimers(prev => ({
      ...prev,
      [qId]: { isRunning: false, remaining: duration, total: duration }
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        let hasRunning = false;
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          if (next[id]?.isRunning) {
            hasRunning = true;
            if (next[id].remaining <= 1) {
              next[id] = { ...next[id], remaining: 0, isRunning: false };
              showToast(`Practice time completed for Question #${id}! ⏱️`);
            } else {
              next[id] = { ...next[id], remaining: next[id].remaining - 1 };
            }
          }
        });
        return hasRunning ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate metrics
  const totalCompleted = completedIds.length;
  const progressPercent = Math.round((totalCompleted / TOTAL_QUESTIONS_COUNT) * 100);

  // Find first incomplete question
  const firstIncompleteQ = useMemo(() => {
    return allHrQuestions.find(q => !completedIds.includes(q.id)) || allHrQuestions[0];
  }, [completedIds]);

  const handleContinueLearning = () => {
    if (firstIncompleteQ) {
      const targetDay = `day${firstIncompleteQ.day}`;
      setCurrentView(targetDay);
      setExpandedCards({ [firstIncompleteQ.id]: true });
      if (typeof onNavigate === 'function') {
        onNavigate(`spoko_hr_day${firstIncompleteQ.day}`, 'questions');
      }
      setTimeout(() => {
        const el = document.getElementById(`question-card-${firstIncompleteQ.id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  };

  const switchView = (newView) => {
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof onNavigate === 'function') {
      if (newView.startsWith('day')) {
        const d = newView.replace('day', '');
        onNavigate(`spoko_hr_day${d}`, 'questions');
      } else if (newView === 'bookmarks') {
        onNavigate('spoko_hr_overview', 'bookmarks');
      } else if (newView === 'summary') {
        onNavigate('spoko_hr_overview', 'summary');
      } else {
        onNavigate('spoko_hr_overview', 'dashboard');
      }
    }
  };

  // Helper to render placeholder highlighted text
  const renderFormattedAnswer = (text) => {
    if (!text) return null;
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={i}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              padding: '2px 6px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.9em',
              border: '1px dashed #6366f1',
              margin: '0 2px',
              display: 'inline-block'
            }}
            title="Replace this placeholder with your personal details"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Filter questions for the current day or bookmarks view
  const currentDayNumber = currentView.startsWith('day') ? parseInt(currentView.replace('day', '')) : null;
  const currentDayConfig = currentDayNumber ? HR_DAYS_CONFIG.find(d => d.day === currentDayNumber) : null;

  const displayedQuestions = useMemo(() => {
    let list = [];
    if (currentView.startsWith('day') && currentDayNumber) {
      list = getQuestionsByDay(currentDayNumber);
    } else if (currentView === 'bookmarks') {
      list = allHrQuestions.filter(q => bookmarkedIds.includes(q.id));
    } else {
      list = allHrQuestions;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item =>
        item.question.toLowerCase().includes(q) ||
        item.whyHRAsks.toLowerCase().includes(q) ||
        item.fresherAnswer.toLowerCase().includes(q) ||
        item.experiencedAnswer.toLowerCase().includes(q) ||
        item.commonMistake.toLowerCase().includes(q) ||
        item.personalisationGuidance.toLowerCase().includes(q)
      );
    }

    if (filterMode === 'completed') {
      list = list.filter(item => completedIds.includes(item.id));
    } else if (filterMode === 'uncompleted') {
      list = list.filter(item => !completedIds.includes(item.id));
    } else if (filterMode === 'bookmarked') {
      list = list.filter(item => bookmarkedIds.includes(item.id));
    }

    return list;
  }, [currentView, currentDayNumber, searchQuery, filterMode, completedIds, bookmarkedIds]);

  return (
    <div style={{
      maxWidth: 1180,
      margin: '0 auto',
      padding: '1.5rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#0f172a'
    }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              background: '#1e1b4b',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              fontSize: '0.92rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Sparkles size={18} color="#818cf8" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────────── TOP HERO BANNER & NAVIGATION ────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '24px',
        padding: '2.25rem 2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 12px 30px rgba(49, 46, 129, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow circle */}
        <div style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            color: '#e0e7ff',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            SPOKO Platform
          </span>
          <span style={{
            background: 'rgba(99, 102, 241, 0.3)',
            color: '#c7d2fe',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700
          }}>
            5 Days • 100 Questions
          </span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.25)',
            color: '#a7f3d0',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700
          }}>
            Freshers & Experienced
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: 680 }}>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
              fontWeight: 900,
              margin: '0 0 0.6rem 0',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}>
              HR Interview Mastery
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#c7d2fe',
              margin: 0,
              lineHeight: 1.6
            }}>
              Master the top 100 human resource interview questions with verified answers, STAR method frameworks, fresher and experienced perspectives, and actionable delivery tips.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '18px',
            padding: '1.25rem 1.5rem',
            minWidth: 220,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#c7d2fe', fontWeight: 600, marginBottom: 4 }}>
              Course Progress
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
              {totalCompleted} <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#a5b4fc' }}>/ 100</span>
            </div>
            <div style={{
              height: 6,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              margin: '0.75rem 0 0.5rem 0',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #34d399, #10b981)',
                borderRadius: 3,
                transition: 'width 0.4s ease'
              }} />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: 700 }}>
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleContinueLearning}
            style={{
              background: '#ffffff',
              color: '#312e81',
              border: 'none',
              padding: '0.75rem 1.4rem',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Play size={16} fill="#312e81" />
            Continue Learning (Q #{firstIncompleteQ?.id || 1})
          </button>

          <button
            onClick={() => openMockModal(currentDayNumber || 1)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.3rem',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
            }}
          >
            <Bot size={18} />
            Daily AI Mock Interview (10 Qs)
          </button>

          <button
            onClick={() => switchView('bookmarks')}
            style={{
              background: currentView === 'bookmarks' ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Bookmark size={16} fill={bookmarkedIds.length > 0 ? '#fbbf24' : 'transparent'} color="#fbbf24" />
            Saved for Revision ({bookmarkedIds.length})
          </button>

          <button
            onClick={() => switchView('summary')}
            style={{
              background: currentView === 'summary' ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Award size={16} color="#34d399" />
            Progress Summary
          </button>
        </div>
      </div>


      {/* ────────────────── VIEW 1: DASHBOARD OVERVIEW ────────────────── */}
      {currentView === 'dashboard' && (
        <div>
          {/* Method highlight banner */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              The Read, Understand & Practise Method 📖
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0', lineHeight: 1.6 }}>
              This course is built for active verbal mastery without pre-recorded video lectures. Follow this 4-step framework for each question:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              {[
                { step: '01', title: 'Read Intent', desc: 'Read Why HR Asks to decipher what the interviewer genuinely assesses behind the question.' },
                { step: '02', title: 'Study Sample', desc: 'Review the tailored Fresher or Experienced answer to observe structured phrasing.' },
                { step: '03', title: 'Personalise', desc: 'Swap out highlighted bracketed placeholders with your genuine projects, degrees, or metrics.' },
                { step: '04', title: 'Practise Aloud', desc: 'Speak your answer aloud using the built-in 60s speech timer until it flows naturally.' }
              ].map(item => (
                <div key={item.step} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.25rem 1rem'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    color: '#6366f1',
                    marginBottom: '0.25rem'
                  }}>
                    STEP {item.step}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Day Cards Grid */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.25rem 0' }}>
              5-Day Curriculum Roadmap
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {HR_DAYS_CONFIG.map(d => {
                const dayQuestions = getQuestionsByDay(d.day);
                const dayDone = dayQuestions.filter(q => completedIds.includes(q.id)).length;
                const dayPercent = Math.round((dayDone / 20) * 100);

                return (
                  <div
                    key={d.day}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '18px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => switchView(`day${d.day}`)}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{
                          background: d.bgLight,
                          color: d.color,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}>
                          Day {d.day} • {d.badge}
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
                          Questions {d.range}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
                        {d.topic}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                        {d.description}
                      </p>
                    </div>

                    <div>
                      {/* Day Progress Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                        <span>Progress</span>
                        <span>{dayDone} / 20 ({dayPercent}%)</span>
                      </div>
                      <div style={{
                        height: 7,
                        background: '#f1f5f9',
                        borderRadius: 4,
                        overflow: 'hidden',
                        marginBottom: '1.25rem'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${dayPercent}%`,
                          background: d.gradient,
                          borderRadius: 4,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>

                      <button
                        style={{
                          width: '100%',
                          background: dayDone > 0 ? '#f8fafc' : d.gradient,
                          color: dayDone > 0 ? d.color : '#ffffff',
                          border: dayDone > 0 ? `1px solid ${d.color}` : 'none',
                          padding: '0.65rem 1rem',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        {dayDone === 20 ? 'Review Day (100% Done)' : dayDone > 0 ? `Continue Day (${dayDone}/20)` : 'Start Day 🚀'}
                        <ArrowRight size={15} />
                      </button>

                      {/* Mock Interview Badge / Quick Launcher */}
                      {(() => {
                        const dayMock = mockInterviews.find(m => Number(m.day) === Number(d.day));
                        return (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              openMockModal(d.day);
                            }}
                            style={{
                              marginTop: '0.6rem',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: dayMock ? '#ecfdf5' : '#f1f5f9',
                              border: `1px dashed ${dayMock ? '#10b981' : '#cbd5e1'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: dayMock ? '#065f46' : '#64748b',
                              cursor: 'pointer'
                            }}
                            title="Click to take or retake this day's AI Mock Interview"
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <Bot size={14} color={dayMock ? '#059669' : '#6366f1'} />
                              {dayMock ? `Mock Score: ${dayMock.totalScore}/100` : 'Take 10-Q AI Mock'}
                            </span>
                            <span style={{
                              background: dayMock ? '#059669' : '#e0e7ff',
                              color: dayMock ? '#ffffff' : '#4338ca',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              fontSize: '0.72rem'
                            }}>
                              {dayMock ? `Grade ${dayMock.grade}` : 'Launch →'}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── VIEW 2: DAY-SPECIFIC QUESTION LIST (DAYS 1 TO 5) ────────────────── */}
      {currentView.startsWith('day') && currentDayConfig && (
        <div>
          {/* Day Header Box */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: currentDayConfig.bgLight,
                  color: currentDayConfig.color,
                  padding: '5px 12px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  textTransform: 'uppercase'
                }}>
                  Day {currentDayConfig.day} of 5
                </span>
                <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
                  Questions {currentDayConfig.range}
                </span>
              </div>

              {/* Day completion pill */}
              {(() => {
                const dayDone = getQuestionsByDay(currentDayConfig.day).filter(q => completedIds.includes(q.id)).length;
                return (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#334155'
                  }}>
                    <span>Completed:</span>
                    <span style={{
                      background: dayDone === 20 ? '#dcfce7' : '#e0e7ff',
                      color: dayDone === 20 ? '#166534' : '#3730a3',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontWeight: 800
                    }}>
                      {dayDone} / 20 ({Math.round((dayDone / 20) * 100)}%)
                    </span>
                  </div>
                );
              })()}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              {currentDayConfig.topic}
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#64748b', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
              {currentDayConfig.description}
            </p>

            {/* Day AI Mock Interview Interactive Banner */}
            {(() => {
              const dayMock = mockInterviews.find(m => Number(m.day) === Number(currentDayConfig.day));
              return (
                <div style={{
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  color: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  boxShadow: '0 6px 20px rgba(49, 46, 129, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: 640 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      🎙️
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                          Day {currentDayConfig.day} One-to-One AI Mock Interview
                        </span>
                        <span style={{
                          background: 'rgba(255,255,255,0.2)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          textTransform: 'uppercase'
                        }}>
                          10 Live Questions
                        </span>
                        {dayMock && (
                          <span style={{
                            background: '#10b981',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '999px'
                          }}>
                            Score: {dayMock.totalScore}/100 • Grade {dayMock.grade}
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#c7d2fe', lineHeight: 1.4 }}>
                        {dayMock
                          ? `Completed on ${new Date(dayMock.completedAt).toLocaleDateString()} with AI feedback. Marks are recorded in your dashboard and visible to Staff/Admin. You can retake to improve anytime!`
                          : `Simulate a real 1-on-1 interview with our AI interviewer. Answer verbally or by text. Scored out of 100 marks and saved to your Student, Staff & Admin dashboards.`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openMockModal(currentDayConfig.day)}
                    style={{
                      background: dayMock ? '#ffffff' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: dayMock ? '#312e81' : '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.4rem',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Bot size={18} />
                    {dayMock ? `Retake Day ${currentDayConfig.day} Mock` : `Start 10-Q AI Mock 🎙️`}
                  </button>
                </div>
              );
            })()}

            {/* Global Controls Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #f1f5f9'
            }}>
              {/* Persona Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>Show Answer:</span>
                <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '10px', padding: '3px' }}>
                  {[
                    { id: 'both', label: 'All Answers' },
                    { id: 'fresher', label: '🎓 Fresher' },
                    { id: 'experienced', label: '💼 Experienced' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePersona(tab.id)}
                      style={{
                        background: activePersona === tab.id ? '#ffffff' : 'transparent',
                        color: activePersona === tab.id ? '#1e1b4b' : '#64748b',
                        border: 'none',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: activePersona === tab.id ? 800 : 600,
                        cursor: 'pointer',
                        boxShadow: activePersona === tab.id ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expand / Collapse All */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => expandAll(displayedQuestions)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: 1,
              minWidth: 260,
              position: 'relative'
            }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions, tips, or keywords..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: 'All (20)' },
                { id: 'uncompleted', label: 'Pending' },
                { id: 'completed', label: 'Completed' },
                { id: 'bookmarked', label: 'Saved 🔖' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterMode(f.id)}
                  style={{
                    padding: '0.65rem 0.9rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: filterMode === f.id ? '#4f46e5' : '#e2e8f0',
                    background: filterMode === f.id ? '#eef2ff' : '#ffffff',
                    color: filterMode === f.id ? '#4338ca' : '#64748b'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          {displayedQuestions.length === 0 ? (
            <div style={{
              background: '#ffffff',
              border: '1px dashed #cbd5e1',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              color: '#64748b'
            }}>
              <Search size={36} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>No questions match your filter</h3>
              <p style={{ fontSize: '0.9rem' }}>Try clearing your search query or switching filters above.</p>
              <button
                onClick={() => { setSearchQuery(''); setFilterMode('all'); }}
                style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {displayedQuestions.map(q => {
                const isExpanded = Boolean(expandedCards[q.id]);
                const isDone = completedIds.includes(q.id);
                const isBookmarked = bookmarkedIds.includes(q.id);
                const timerState = timers[q.id] || { isRunning: false, remaining: 60, total: 60 };

                return (
                  <div
                    key={q.id}
                    id={`question-card-${q.id}`}
                    style={{
                      background: '#ffffff',
                      border: '1px solid',
                      borderColor: isDone ? '#bbf7d0' : isExpanded ? '#c7d2fe' : '#e2e8f0',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: isExpanded ? '0 8px 24px rgba(99, 102, 241, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  >
                    {/* Question Card Header (Always Visible) */}
                    <div
                      onClick={() => toggleExpand(q.id)}
                      style={{
                        padding: '1.25rem 1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        background: isDone ? '#f0fdf4' : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                        {/* Completion Indicator */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(q.id);
                          }}
                          style={{
                            background: isDone ? '#10b981' : 'transparent',
                            border: `2px solid ${isDone ? '#10b981' : '#cbd5e1'}`,
                            borderRadius: '50%',
                            width: 26,
                            height: 26,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            padding: 0,
                            transition: 'all 0.15s ease'
                          }}
                          title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isDone && <CheckSquare size={14} color="#ffffff" />}
                        </button>

                        {/* Number Badge */}
                        <span style={{
                          background: isDone ? '#dcfce7' : '#eef2ff',
                          color: isDone ? '#166534' : '#4338ca',
                          padding: '3px 9px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          flexShrink: 0
                        }}>
                          Q{q.id}
                        </span>

                        {/* Question Text */}
                        <h3 style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: isDone ? '#1e293b' : '#0f172a',
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {q.question}
                        </h3>
                      </div>

                      {/* Header Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(q.id);
                          }}
                          style={{
                            background: isBookmarked ? '#fef3c7' : '#f8fafc',
                            border: `1px solid ${isBookmarked ? '#f59e0b' : '#e2e8f0'}`,
                            borderRadius: '8px',
                            padding: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title={isBookmarked ? 'Remove bookmark' : 'Save for revision'}
                        >
                          <Bookmark
                            size={16}
                            color={isBookmarked ? '#d97706' : '#94a3b8'}
                            fill={isBookmarked ? '#f59e0b' : 'transparent'}
                          />
                        </button>

                        {/* Expand Chevron */}
                        <div style={{
                          background: '#f8fafc',
                          borderRadius: '8px',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748b'
                        }}>
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                    </div>

                    {/* Question Card Expanded Details */}
                    {isExpanded && (
                      <div style={{
                        padding: '0 1.5rem 1.5rem',
                        borderTop: '1px solid #f1f5f9',
                        background: '#fafafa'
                      }}>
                        {/* 1. Why HR Asks Callout */}
                        <div style={{
                          marginTop: '1.25rem',
                          marginBottom: '1.25rem',
                          background: '#eef2ff',
                          borderLeft: '4px solid #6366f1',
                          borderRadius: '0 12px 12px 0',
                          padding: '0.85rem 1.1rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: '#4338ca',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            <Eye size={15} />
                            Why HR Asks This Question
                          </div>
                          <div style={{ fontSize: '0.92rem', color: '#1e1b4b', lineHeight: 1.5 }}>
                            {q.whyHRAsks}
                          </div>
                        </div>

                        {/* 2. Sample Answers Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                          {/* Fresher Answer Block */}
                          {(activePersona === 'both' || activePersona === 'fresher') && (
                            <div style={{
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '14px',
                              padding: '1.25rem',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem',
                                flexWrap: 'wrap',
                                gap: '8px'
                              }}>
                                <span style={{
                                  background: '#dbeafe',
                                  color: '#1e40af',
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}>
                                  <User size={13} />
                                  Fresher Sample Answer
                                </span>
                                <span style={{
                                  fontSize: '0.76rem',
                                  color: '#64748b',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <Clock size={13} /> ~45-60 seconds speaking time
                                </span>
                              </div>
                              <p style={{
                                fontSize: '0.95rem',
                                color: '#1e293b',
                                lineHeight: 1.65,
                                margin: 0
                              }}>
                                {renderFormattedAnswer(q.fresherAnswer)}
                              </p>
                            </div>
                          )}

                          {/* Experienced Answer Block */}
                          {(activePersona === 'both' || activePersona === 'experienced') && (
                            <div style={{
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '14px',
                              padding: '1.25rem',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem',
                                flexWrap: 'wrap',
                                gap: '8px'
                              }}>
                                <span style={{
                                  background: '#fef3c7',
                                  color: '#92400e',
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}>
                                  <Briefcase size={13} />
                                  Experienced Candidate Sample Answer
                                </span>
                                <span style={{
                                  fontSize: '0.76rem',
                                  color: '#64748b',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <Clock size={13} /> ~60-90 seconds speaking time
                                </span>
                              </div>
                              <p style={{
                                fontSize: '0.95rem',
                                color: '#1e293b',
                                lineHeight: 1.65,
                                margin: 0
                              }}>
                                {renderFormattedAnswer(q.experiencedAnswer)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* 3. Actionable Coaching Grid: Tips, Common Mistake, Personalisation */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '1rem',
                          marginBottom: '1.25rem'
                        }}>
                          {/* Answer Tips */}
                          <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1rem 1.1rem'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              color: '#0369a1',
                              marginBottom: '0.5rem'
                            }}>
                              <Lightbulb size={16} color="#0284c7" />
                              Practical Answer Tips
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                              {q.answerTips.map((tip, idx) => (
                                <li key={idx} style={{ marginBottom: idx < q.answerTips.length - 1 ? 6 : 0 }}>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Common Mistake to Avoid */}
                          <div style={{
                            background: '#fff1f2',
                            border: '1px solid #fecdd3',
                            borderRadius: '12px',
                            padding: '1rem 1.1rem'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              color: '#be123c',
                              marginBottom: '0.5rem'
                            }}>
                              <AlertTriangle size={16} color="#e11d48" />
                              Common Mistake to Avoid
                            </div>
                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#881337', lineHeight: 1.5 }}>
                              {q.commonMistake}
                            </p>
                          </div>
                        </div>

                        {/* Personalisation Guidance */}
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '12px',
                          padding: '0.9rem 1.1rem',
                          marginBottom: '1.25rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px'
                        }}>
                          <Target size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', marginBottom: 2 }}>
                              Personalisation Guidance
                            </div>
                            <div style={{ fontSize: '0.86rem', color: '#14532d', lineHeight: 1.5 }}>
                              {q.personalisationGuidance}
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Bar: Speech Practice Timer + Mark Done Button */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid #e2e8f0'
                        }}>
                          {/* Practice Aloud Timer Widget */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '4px 10px'
                          }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
                              Practise Aloud:
                            </span>
                            <span style={{
                              fontSize: '0.88rem',
                              fontWeight: 800,
                              color: timerState.isRunning ? '#6366f1' : '#334155',
                              minWidth: 42,
                              textAlign: 'center'
                            }}>
                              {timerState.remaining}s
                            </span>

                            {timerState.isRunning ? (
                              <button
                                onClick={() => handlePauseTimer(q.id)}
                                style={{
                                  background: '#fef3c7',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: '#92400e',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Pause size={12} /> Pause
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStartTimer(q.id, 60)}
                                style={{
                                  background: '#e0e7ff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: '#3730a3',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Play size={12} fill="#3730a3" /> Start 60s
                              </button>
                            )}

                            <button
                              onClick={() => handleResetTimer(q.id, 60)}
                              style={{
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '4px 6px',
                                cursor: 'pointer',
                                color: '#64748b'
                              }}
                              title="Reset Timer"
                            >
                              <RotateCcw size={12} />
                            </button>
                          </div>

                          {/* Mark Done and Bookmark buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => toggleBookmark(q.id)}
                              style={{
                                background: isBookmarked ? '#fef3c7' : '#ffffff',
                                border: `1px solid ${isBookmarked ? '#f59e0b' : '#cbd5e1'}`,
                                color: isBookmarked ? '#92400e' : '#475569',
                                borderRadius: '10px',
                                padding: '0.5rem 0.9rem',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Bookmark size={15} fill={isBookmarked ? '#f59e0b' : 'transparent'} color={isBookmarked ? '#d97706' : '#64748b'} />
                              {isBookmarked ? 'Saved' : 'Save for Revision'}
                            </button>

                            <button
                              onClick={() => toggleComplete(q.id)}
                              style={{
                                background: isDone ? '#10b981' : '#ffffff',
                                border: `1px solid ${isDone ? '#10b981' : '#cbd5e1'}`,
                                color: isDone ? '#ffffff' : '#1e293b',
                                borderRadius: '10px',
                                padding: '0.5rem 1.1rem',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: isDone ? '0 2px 6px rgba(16, 185, 129, 0.2)' : 'none'
                              }}
                            >
                              <CheckSquare size={15} />
                              {isDone ? 'Completed ✓' : 'Mark as Completed'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Previous / Next Day Bottom Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.5rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px'
          }}>
            {currentDayConfig.day > 1 ? (
              <button
                onClick={() => switchView(`day${currentDayConfig.day - 1}`)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={16} />
                Previous: Day {currentDayConfig.day - 1}
              </button>
            ) : (
              <button
                onClick={() => switchView('dashboard')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </button>
            )}

            <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
              Day {currentDayConfig.day} of 5
            </div>

            {currentDayConfig.day < 5 ? (
              <button
                onClick={() => switchView(`day${currentDayConfig.day + 1}`)}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)'
                }}
              >
                Next: Day {currentDayConfig.day + 1}
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => switchView('summary')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
                }}
              >
                View Final Progress Summary 🎉
                <Award size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ────────────────── VIEW 3: SAVED FOR REVISION ────────────────── */}
      {currentView === 'bookmarks' && (
        <div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <Bookmark size={22} color="#d97706" fill="#f59e0b" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Saved for Revision & Practice ({bookmarkedIds.length})
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              Review the questions you flagged for extra rehearsal. Practice speaking these aloud until your delivery feels confident and unscripted.
            </p>
          </div>

          {bookmarkedIds.length === 0 ? (
            <div style={{
              background: '#ffffff',
              border: '1px dashed #cbd5e1',
              borderRadius: '16px',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              color: '#64748b'
            }}>
              <Bookmark size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                No questions saved yet
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: 440, margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                While studying questions on any day, click the bookmark icon to save high-priority or challenging questions here for quick revision.
              </p>
              <button
                onClick={() => switchView('day1')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Go to Day 1 Questions
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {displayedQuestions.map(q => (
                <div
                  key={q.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          background: '#e0e7ff',
                          color: '#3730a3',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>
                          Day {q.day}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                          Question #{q.id}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {q.question}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => toggleComplete(q.id)}
                        style={{
                          background: completedIds.includes(q.id) ? '#dcfce7' : '#f8fafc',
                          border: `1px solid ${completedIds.includes(q.id) ? '#86efac' : '#cbd5e1'}`,
                          color: completedIds.includes(q.id) ? '#166534' : '#475569',
                          padding: '5px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {completedIds.includes(q.id) ? 'Completed ✓' : 'Mark Done'}
                      </button>

                      <button
                        onClick={() => toggleBookmark(q.id)}
                        style={{
                          background: '#fee2e2',
                          border: '1px solid #fca5a5',
                          color: '#991b1b',
                          padding: '5px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    <strong>Sample Answer:</strong> {renderFormattedAnswer(q.fresherAnswer)}
                  </div>

                  <div style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    💡 <strong>Tip:</strong> {q.answerTips[0]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ────────────────── VIEW 4: FINAL PROGRESS SUMMARY ────────────────── */}
      {currentView === 'summary' && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 12px 30px rgba(5, 150, 105, 0.25)'
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <Award size={36} color="#ffffff" />
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              HR Interview Mastery Progress
            </h2>
            <p style={{ fontSize: '1rem', color: '#a7f3d0', maxWidth: 600, margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Review your overall completion across all 5 days and 100 questions. Practice speaking answers aloud to cement muscle memory before real interviews.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2rem',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              padding: '1rem 2rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 600 }}>Questions Completed</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900 }}>{totalCompleted} / 100</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 600 }}>Mastery Rate</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900 }}>{progressPercent}%</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 600 }}>Saved for Practice</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900 }}>{bookmarkedIds.length}</div>
              </div>
            </div>
          </div>

          {/* Day-Wise Breakdown Cards */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
            Day-Wise Progress Breakdown
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {HR_DAYS_CONFIG.map(d => {
              const qs = getQuestionsByDay(d.day);
              const done = qs.filter(q => completedIds.includes(q.id)).length;
              const pct = Math.round((done / 20) * 100);

              return (
                <div
                  key={d.day}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: d.color }}>
                      Day {d.day}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
                      {done} / 20 Done ({pct}%)
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.75rem 0' }}>
                    {d.topic}
                  </h4>

                  <div style={{
                    height: 6,
                    background: '#f1f5f9',
                    borderRadius: 3,
                    overflow: 'hidden',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: d.gradient,
                      borderRadius: 3
                    }} />
                  </div>

                  <button
                    onClick={() => switchView(`day${d.day}`)}
                    style={{
                      width: '100%',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: d.color,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Review Day {d.day} →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Motivational Practise Aloud Box */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #6366f1',
            borderRadius: '18px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.75rem 0' }}>
              🎙️ The Final Step: Practise Aloud!
            </h3>
            <p style={{
              fontSize: '0.96rem',
              color: '#475569',
              maxWidth: 680,
              margin: '0 auto 1.5rem',
              lineHeight: 1.6
            }}>
              Reading answers silently builds intellectual comprehension, but speaking them aloud builds verbal fluency and emotional composure under interview pressure. Stand in front of a mirror, use the 60-second timer on challenging cards, and practise speaking naturally without memorising word-for-word.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => switchView('day1')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Rehearse Day 1 (Self Intro)
              </button>

              <button
                onClick={() => switchView('bookmarks')}
                style={{
                  background: '#f8fafc',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Rehearse Saved Questions ({bookmarkedIds.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── AI ONE-TO-ONE MOCK INTERVIEW MODAL (10 QUESTIONS) ────────────────── */}
      <AiMockInterviewModal
        isOpen={isMockModalOpen}
        onClose={() => setIsMockModalOpen(false)}
        day={mockModalDay}
        dayTopic={HR_DAYS_CONFIG.find(d => d.day === mockModalDay)?.topic || `Day ${mockModalDay}`}
        session={session}
        onSaved={handleMockSaved}
      />
    </div>
  );
}
