import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw,
  CheckCircle, ArrowRight, ArrowLeft, Award, Sparkles, X,
  Brain, Send, AlertTriangle, Lightbulb, Clock, Target, CheckSquare,
  Bot, RefreshCw, Layers, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getMockQuestionsForDay,
  evaluateStudentAnswer,
  calculateOverallMockResult
} from '../data/hrMockQuestions.js';

export default function AiMockInterviewModal({
  isOpen,
  onClose,
  day = 1,
  dayTopic = 'Introduction & Personal Background',
  session,
  onSaved
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [questionScores, setQuestionScores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalReport, setFinalReport] = useState(null);

  // Speech Recognition (Mic Dictation)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Text-To-Speech for AI Interviewer
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Timer for current question
  const [secondsSpent, setSecondsSpent] = useState(0);

  // Load 10 curated questions for the selected day
  useEffect(() => {
    if (isOpen) {
      const qList = getMockQuestionsForDay(day);
      setQuestions(qList);
      setCurrentIndex(0);
      setStudentAnswers({});
      setQuestionScores({});
      setIsCompleted(false);
      setFinalReport(null);
      setSecondsSpent(0);
    }
  }, [isOpen, day]);

  // Question timer
  useEffect(() => {
    let timer;
    if (isOpen && !isCompleted) {
      timer = setInterval(() => {
        setSecondsSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isCompleted, currentIndex]);

  const currentQuestion = questions[currentIndex] || null;

  // Web Speech Synthesis (AI Interviewer Voice)
  const speakCurrentQuestion = (text) => {
    if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      const voices = window.speechSynthesis.getVoices() || [];
      const englishVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English')));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  };

  useEffect(() => {
    if (currentQuestion && ttsEnabled && !isCompleted) {
      const prompt = `Question ${currentIndex + 1}: ${currentQuestion.question}`;
      speakCurrentQuestion(prompt);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentIndex, currentQuestion, ttsEnabled]);

  // Web Speech Recognition (Mic Input)
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim() && currentQuestion) {
          setStudentAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: (prev[currentQuestion.id] || '') + ' ' + transcript
          }));
        }
      };

      recognizer.onerror = () => setIsListening(false);
      recognizer.onend = () => setIsListening(false);

      recognitionRef.current = recognizer;
    }
  }, [currentQuestion]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech-to-text recognition is not supported in this browser. Please type your answer.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Mic start error:', e);
      }
    }
  };

  const handleAnswerChange = (val) => {
    if (!currentQuestion) return;
    setStudentAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // Evaluate answer for current question
    const answer = studentAnswers[currentQuestion.id] || '';
    const evaluation = evaluateStudentAnswer(currentQuestion.question, answer, day);

    setQuestionScores(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        studentAnswer: answer,
        ...evaluation
      }
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSecondsSpent(0);
    } else {
      // Session Completed - Calculate final report
      finalizeInterview({
        ...questionScores,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          studentAnswer: answer,
          ...evaluation
        }
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setCurrentIndex(prev => prev - 1);
      setSecondsSpent(0);
    }
  };

  const finalizeInterview = async (allScores) => {
    setIsSubmitting(true);
    const resultsList = questions.map(q => allScores[q.id] || {
      questionId: q.id,
      questionText: q.question,
      studentAnswer: studentAnswers[q.id] || '',
      score: 5,
      feedback: 'Answer submitted.',
      strengths: [],
      improvements: []
    });

    const report = calculateOverallMockResult(resultsList, day, dayTopic);
    setFinalReport(report);
    setIsCompleted(true);
    setIsSubmitting(false);

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch { }

    // Save to server & LocalStorage
    await persistMockInterview(report);
  };

  const persistMockInterview = async (report) => {
    const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
    const storageKey = `spoko_hr_mock_interviews_${userKey}`;

    // 1. Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      // Update or append
      const updated = [...existing.filter(item => item.day !== report.day), report];
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to local storage:', e);
    }

    // 2. Save to Express backend API
    const studentIdentifier = session?.studentId || session?.accessCode || session?.username;
    if (studentIdentifier) {
      try {
        const res = await fetch(`/api/students/${studentIdentifier}/mock-interview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof onSaved === 'function') onSaved(report, data);
        }
      } catch (err) {
        console.warn('Backend sync error (saved locally):', err);
      }
    } else {
      if (typeof onSaved === 'function') onSaved(report);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: 820,
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          color: '#ffffff',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Bot size={24} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI One-to-One Simulator • Day {day}
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                {dayTopic} Mock Interview
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              style={{
                background: ttsEnabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
              title={ttsEnabled ? 'Mute AI voice' : 'Enable AI voice'}
            >
              {ttsEnabled ? <Volume2 size={16} color="#34d399" /> : <VolumeX size={16} color="#94a3b8" />}
              {ttsEnabled ? 'AI Voice On' : 'Muted'}
            </button>

            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#cbd5e1',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          {!isCompleted ? (
            <div>
              {/* Question Progress Tracker */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  <span>Question {currentIndex + 1} of 10</span>
                  <span style={{ color: '#6366f1' }}>{Math.round(((currentIndex) / 10) * 100)}% Progress</span>
                </div>
                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${((currentIndex + 1) / 10) * 100}%`,
                    background: 'linear-gradient(90deg, #6366f1, #4338ca)',
                    borderRadius: 3,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* AI Interviewer Persona Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: isSpeaking ? 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' : '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isSpeaking ? '0 0 15px rgba(99, 102, 241, 0.6)' : 'none',
                  transition: 'all 0.3s'
                }}>
                  <Bot size={26} color={isSpeaking ? '#ffffff' : '#4338ca'} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b' }}>
                      AI Interviewer (HR Lead)
                    </span>
                    {isSpeaking && (
                      <span style={{
                        background: '#dcfce7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Volume2 size={12} /> Speaking...
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.4
                  }}>
                    "{currentQuestion?.question}"
                  </h3>

                  <div style={{ fontSize: '0.84rem', color: '#64748b', fontStyle: 'italic' }}>
                    💡 <strong>What I'm looking for:</strong> {currentQuestion?.whyHRAsks}
                  </div>
                </div>
              </div>

              {/* Student Response Area */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                    Your Answer (Speak or Type):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      ⏱️ {secondsSpent}s spent
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: (studentAnswers[currentQuestion?.id] || '').split(/\s+/).filter(Boolean).length >= 35 ? '#16a34a' : '#d97706',
                      fontWeight: 700
                    }}>
                      {(studentAnswers[currentQuestion?.id] || '').split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <textarea
                    rows={5}
                    value={studentAnswers[currentQuestion?.id] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Type your interview answer here or click the Mic button below to speak your response aloud..."
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '14px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#0f172a',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />

                  {/* Speech Dictation Mic Toggle Button */}
                  <button
                    onClick={toggleMic}
                    style={{
                      position: 'absolute',
                      right: 12,
                      bottom: 16,
                      background: isListening ? '#ef4444' : '#4f46e5',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isListening ? '0 0 12px rgba(239, 68, 68, 0.5)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                    {isListening ? 'Listening (Click to Stop)' : 'Dictate with Mic'}
                  </button>
                </div>
              </div>

              {/* Coaching Helper Pill */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '0.84rem',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lightbulb size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Tip for this question:</strong> {currentQuestion?.answerTips?.[0] || 'State your answer concisely with a clear outcome.'}
                </span>
              </div>
            </div>
          ) : (
            /* ────────────────── FINAL REPORT SCREEN ────────────────── */
            <div>
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Award size={34} color="#ffffff" />
                </div>

                <div style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mock Interview Completed • Day {day}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
                  Score: {finalReport?.totalScore} / 100
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 800
                }}>
                  Grade: {finalReport?.grade} {finalReport?.grade === 'S' || finalReport?.grade === 'A' ? '🌟 (Ready for Hire)' : ''}
                </div>
                <p style={{ fontSize: '0.92rem', color: '#d1fae5', maxWidth: 580, margin: '1rem auto 0', lineHeight: 1.5 }}>
                  {finalReport?.overallFeedback}
                </p>
              </div>

              {/* Rubric Breakdown Grid */}
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
                Evaluation Breakdown
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {[
                  { label: 'Clarity & Delivery', score: finalReport?.clarityScore, max: 25 },
                  { label: 'Content & STAR Fit', score: finalReport?.contentScore, max: 35 },
                  { label: 'Confidence & Tone', score: finalReport?.confidenceScore, max: 20 },
                  { label: 'Personalisation Depth', score: finalReport?.structureScore, max: 20 }
                ].map(metric => (
                  <div key={metric.label} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: 4 }}>
                      {metric.label}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1e1b4b' }}>
                      {metric.score} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ {metric.max}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Improvements */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '14px',
                  padding: '1rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} /> Key Strengths
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#14532d', lineHeight: 1.5 }}>
                    {finalReport?.strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>

                <div style={{
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  borderRadius: '14px',
                  padding: '1rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#9a3412', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target size={16} /> Areas to Polish
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#7c2d12', lineHeight: 1.5 }}>
                    {finalReport?.improvements?.map((i, idx) => <li key={idx}>{i}</li>)}
                  </ul>
                </div>
              </div>

              {/* 10-Question Score Sheet */}
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
                10-Question Response Sheet
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {finalReport?.questions?.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.88rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: '#1e293b' }}>
                        Q{idx + 1}. {item.questionText}
                      </span>
                      <span style={{
                        background: item.score >= 8 ? '#dcfce7' : item.score >= 6 ? '#fef3c7' : '#fee2e2',
                        color: item.score >= 8 ? '#166534' : item.score >= 6 ? '#92400e' : '#991b1b',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.78rem'
                      }}>
                        {item.score} / 10
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', marginBottom: 4 }}>
                      <strong>Your Answer:</strong> "{item.studentAnswer ? (item.studentAnswer.length > 120 ? item.studentAnswer.substring(0, 120) + '...' : item.studentAnswer) : 'No answer provided'}"
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#4338ca' }}>
                      💡 {item.feedback}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#e0e7ff',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                fontSize: '0.86rem',
                color: '#3730a3',
                textAlign: 'center',
                fontWeight: 600
              }}>
                ✅ Your marks have been recorded to your Student Profile, Staff Registry, and Admin Dashboard!
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          {!isCompleted ? (
            <>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentIndex === 0}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: currentIndex === 0 ? '#94a3b8' : '#334155',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={16} /> Previous Question
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={isSubmitting}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.65rem 1.3rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(79, 70, 229, 0.25)'
                }}
              >
                {currentIndex === questions.length - 1 ? (
                  isSubmitting ? 'Evaluating 10 Questions...' : 'Complete & Calculate Marks 🎉'
                ) : (
                  <>Next Question <ArrowRight size={16} /></>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              style={{
                background: '#10b981',
                border: 'none',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CheckSquare size={18} />
              Close & View Scores on Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
