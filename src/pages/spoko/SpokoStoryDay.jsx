import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Volume2, VolumeX, Play, Pause, RotateCcw,
  Sparkles, CheckCircle2, Circle, ArrowRight, ArrowLeft,
  MessageCircle, Video, PenTool, Award, Zap, HelpCircle,
  Clock, Eye, EyeOff, Mic, MicOff, Square, Check, X, FileText,
  Sliders, RefreshCw, ChevronRight, Share2, Star, CheckCircle,
  AlertTriangle, AlertCircle, Activity, Send, Target, TrendingUp,
  Lock, CheckCheck, ShieldAlert, Search, LayoutGrid, ListFilter, Headphones
} from 'lucide-react';
import { storySyllabus } from '../../data/storySyllabus';
import { getAssignmentValidations, saveAssignmentValidation } from '../../utils/htmlCssLocking';

/* ─────────────────────────────── Robust Helper Speech Function ─────────────────────────────── */
let activeGlobalUtterance = null;

function getAvailableVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices() || [];
}

function getVoiceForSpeaker(speaker = '', voices = []) {
  if (!voices || voices.length === 0) return null;
  const englishVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const candidatePool = englishVoices.length > 0 ? englishVoices : voices;

  const isFemaleRole = ['Teacher', 'Mrs. Shanthi', 'Sarah', 'Maya', 'Coach'].includes(speaker);

  if (isFemaleRole) {
    const femaleVoice = candidatePool.find(v => {
      const name = (v.name || '').toLowerCase();
      return name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('karen') || name.includes('victoria') || name.includes('hazel') || name.includes('susan');
    });
    if (femaleVoice) return femaleVoice;
  } else {
    const maleVoice = candidatePool.find(v => {
      const name = (v.name || '').toLowerCase();
      return name.includes('male') || name.includes('david') || name.includes('george') || name.includes('alex') || name.includes('mark') || name.includes('guy') || name.includes('james');
    });
    if (maleVoice) return maleVoice;
  }

  return candidatePool[0] || null;
}

function speakText(text, rate = 0.92, pitch = 1.0, speaker = '') {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch (e) { }

    // Small delay ensures browser speech synthesis queue resets cleanly
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        activeGlobalUtterance = utterance; // Keep active reference to prevent GC in Chromium

        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.lang = 'en-US';

        const voices = getAvailableVoices();
        const voice = getVoiceForSpeaker(speaker, voices);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => {
          activeGlobalUtterance = null;
          resolve();
        };

        utterance.onerror = () => {
          activeGlobalUtterance = null;
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        resolve();
      }
    }, 25);
  });
}

function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeGlobalUtterance = null;
    } catch (e) { }
  }
}

/* ─────────────────────────────── UI Section Wrapper ─────────────────────────────── */
const SectionCard = ({ eyebrow, title, icon: Icon, color = '#6366f1', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    className="learning-card"
    style={{ marginBottom: '2rem' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 8 }}>
      <div>
        <span style={{ color, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon && <Icon size={16} />} {eyebrow}
        </span>
        <h2 style={{ fontSize: '1.85rem', marginTop: '0.35rem', color: '#0f172a', fontWeight: 800 }}>{title}</h2>
      </div>
    </div>
    {children}
  </motion.div>
);

export default function SpokoStoryDay({ day = 1, activeTab = 'story_reading', onNavigate, session }) {
  const lessonData = storySyllabus[day] || storySyllabus[1];

  const go = (tabId) => {
    onNavigate(`spoko_story_day${day}`, tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clean up speech synthesis when unmounting or switching tabs
  useEffect(() => {
    return () => stopSpeech();
  }, [activeTab, day]);

  /* ──────────────────────────────────────────────────────────────────
     1. READING STORY STATE
  ────────────────────────────────────────────────────────────────── */
  const [readingAudioActive, setReadingAudioActive] = useState(false);
  const [readingParagraphIndex, setReadingParagraphIndex] = useState(-1);
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  const handlePlayFullStory = () => {
    if (readingAudioActive) {
      stopSpeech();
      setReadingAudioActive(false);
      setReadingParagraphIndex(-1);
      return;
    }

    setReadingAudioActive(true);
    const fullText = lessonData.story.paragraphs.join(' ');
    speakText(fullText, audioSpeed);
  };

  const handleReadParagraph = (para, idx) => {
    setReadingParagraphIndex(idx);
    setReadingAudioActive(true);
    speakText(para, audioSpeed);
  };

  /* ──────────────────────────────────────────────────────────────────
     2. VOCABULARY STATE
  ────────────────────────────────────────────────────────────────── */
  const [selectedVocab, setSelectedVocab] = useState(lessonData.vocabulary[0] || null);
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabFilterPos, setVocabFilterPos] = useState('all'); // 'all' | 'verb' | 'noun' | 'adjective'
  const [vocabViewMode, setVocabViewMode] = useState('grid'); // 'grid' | 'table' | 'quiz'
  const [playingWordId, setPlayingWordId] = useState(null);
  const [vocabQuizIndex, setVocabQuizIndex] = useState(0);
  const [selectedVocabOption, setSelectedVocabOption] = useState(null);
  const [vocabQuizScore, setVocabQuizScore] = useState(0);

  const filteredVocab = lessonData.vocabulary.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.meaning.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.tamil.includes(vocabSearch);

    if (!matchesSearch) return false;

    if (vocabFilterPos === 'all') return true;
    const pos = (v.partOfSpeech || '').toLowerCase();
    if (vocabFilterPos === 'verb') return pos.includes('verb');
    if (vocabFilterPos === 'noun') return pos.includes('noun');
    if (vocabFilterPos === 'adjective') return pos.includes('adj');
    return true;
  });

  const handlePronounceWord = async (item, speed = 0.9) => {
    setPlayingWordId(item.id || item.word);
    await speakText(item.word, speed);
    setPlayingWordId(null);
  };

  const handlePronounceFullContext = async (item) => {
    setPlayingWordId(item.id || item.word);
    await speakText(`${item.word}. ${item.meaning}. Story sentence: ${item.example}`, 0.92);
    setPlayingWordId(null);
  };

  /* ──────────────────────────────────────────────────────────────────
     3. CONVERSATION / DIALOGUE STATE
  ────────────────────────────────────────────────────────────────── */
  const [showTamilSubs, setShowTamilSubs] = useState(true);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(-1);
  const [dialoguePlaying, setDialoguePlaying] = useState(false);
  const dialogueAbortedRef = useRef(false);

  useEffect(() => {
    // Stop speech when tab changes or component unmounts
    return () => {
      dialogueAbortedRef.current = true;
      stopSpeech();
    };
  }, [activeTab]);

  const handlePlayDialogueLine = async (item, idx) => {
    if (dialoguePlaying) {
      dialogueAbortedRef.current = true;
      setDialoguePlaying(false);
    }
    stopSpeech();
    setActiveDialogueIndex(idx);
    const isSpeaker1 = idx % 2 === 0;
    const pitch = isSpeaker1 ? 1.15 : 0.88;
    await speakText(item.line, 0.92, pitch, item.speaker);
    if (!dialoguePlaying) {
      setTimeout(() => {
        setActiveDialogueIndex(prev => (prev === idx ? -1 : prev));
      }, 400);
    }
  };

  const handlePlayFullDialogue = async () => {
    if (dialoguePlaying) {
      dialogueAbortedRef.current = true;
      stopSpeech();
      setDialoguePlaying(false);
      setActiveDialogueIndex(-1);
      return;
    }

    dialogueAbortedRef.current = false;
    setDialoguePlaying(true);

    for (let i = 0; i < lessonData.dialogue.length; i++) {
      if (dialogueAbortedRef.current) break;
      const item = lessonData.dialogue[i];
      setActiveDialogueIndex(i);
      const isSpeaker1 = i % 2 === 0;
      const pitch = isSpeaker1 ? 1.15 : 0.88;

      await speakText(item.line, 0.92, pitch, item.speaker);
      if (dialogueAbortedRef.current) break;

      // Natural conversational breath between speaker turns
      await new Promise(r => setTimeout(r, 650));
    }

    setDialoguePlaying(false);
    setActiveDialogueIndex(-1);
  };

  /* ──────────────────────────────────────────────────────────────────
     4. VOICE RECOGNITION READING PRACTICE & REAL-TIME HIGHLIGHTER ENGINE
  ────────────────────────────────────────────────────────────────── */
  const normalizeWord = (w) => (w || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();

  // Tokenize story words for real-time speech matching
  const storyTokens = React.useMemo(() => {
    const rawTokens = lessonData.story.paragraphs.join(' ').split(/\s+/).filter(Boolean);
    return rawTokens.map((orig, i) => ({
      index: i,
      original: orig,
      clean: normalizeWord(orig)
    }));
  }, [lessonData]);

  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [currentReadIndex, setCurrentReadIndex] = useState(0);
  const [wordStatuses, setWordStatuses] = useState(() => new Array(storyTokens.length).fill('pending'));
  const [voiceMistakes, setVoiceMistakes] = useState([]);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [readingFinished, setReadingFinished] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isSubmittingToStaff, setIsSubmittingToStaff] = useState(false);
  const [staffSubmissionSuccess, setStaffSubmissionSuccess] = useState(false);
  const [micErrorMsg, setMicErrorMsg] = useState(null);
  const [recentHeardWords, setRecentHeardWords] = useState('');

  const recognitionRef = useRef(null);
  const readingTimerRef = useRef(null);
  const isListeningRef = useRef(false);
  const currentReadIndexRef = useRef(0);
  const activeWordElemRef = useRef(null);

  // Sync ref with current word index pointer
  useEffect(() => {
    currentReadIndexRef.current = currentReadIndex;
  }, [currentReadIndex]);

  // Reset states when day changes
  useEffect(() => {
    setWordStatuses(new Array(storyTokens.length).fill('pending'));
    setCurrentReadIndex(0);
    currentReadIndexRef.current = 0;
    setVoiceMistakes([]);
    setReadingSeconds(0);
    setReadingFinished(false);
    setAssessmentResult(null);
    setStaffSubmissionSuccess(false);
    setMicErrorMsg(null);
    setRecentHeardWords('');
  }, [day, storyTokens.length]);

  // Live stopwatch when reading is active
  useEffect(() => {
    if (isVoiceListening) {
      readingTimerRef.current = setInterval(() => {
        setReadingSeconds(s => s + 1);
      }, 1000);
    } else {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    }
    return () => {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    };
  }, [isVoiceListening]);

  // Auto-scroll active word into view smoothly
  useEffect(() => {
    if (isVoiceListening && activeWordElemRef.current) {
      activeWordElemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentReadIndex, isVoiceListening]);

  // Cleanup on unmount or tab switch
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { }
      }
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    };
  }, [activeTab]);

  const startVoicePractice = () => {
    stopSpeech(); // Ensure AI TTS is never speaking
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      setMicErrorMsg('Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge for microphone speech recognition.');
      return;
    }

    setMicErrorMsg(null);
    setReadingFinished(false);
    setAssessmentResult(null);
    setStaffSubmissionSuccess(false);

    if (currentReadIndex >= storyTokens.length) {
      setCurrentReadIndex(0);
      currentReadIndexRef.current = 0;
      setWordStatuses(new Array(storyTokens.length).fill('pending'));
      setVoiceMistakes([]);
      setReadingSeconds(0);
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsVoiceListening(true);
        isListeningRef.current = true;
      };

      recognition.onresult = (event) => {
        if (!isListeningRef.current) return;

        let latestTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          latestTranscript += event.results[i][0].transcript + ' ';
        }

        const spokenWords = latestTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
        if (spokenWords.length === 0) return;

        setRecentHeardWords(spokenWords.slice(-4).join(' '));

        let ptr = currentReadIndexRef.current;
        let newStatuses = null;
        let newMistakes = null;

        for (const spoken of spokenWords) {
          if (ptr >= storyTokens.length) break;

          const target = storyTokens[ptr];
          const targetClean = target.clean;

          if (spoken === targetClean || (targetClean.length > 3 && (spoken.startsWith(targetClean) || targetClean.startsWith(spoken)))) {
            if (!newStatuses) newStatuses = [...wordStatuses];
            newStatuses[ptr] = 'correct';
            ptr++;
          } else if (spoken.length > 2) {
            if (ptr + 1 < storyTokens.length && spoken === storyTokens[ptr + 1].clean) {
              if (!newStatuses) newStatuses = [...wordStatuses];
              newStatuses[ptr] = 'mistake';
              if (!newMistakes) newMistakes = [...voiceMistakes];
              newMistakes.push({
                index: ptr,
                expected: target.original,
                heard: '(skipped)'
              });
              ptr++;
              newStatuses[ptr] = 'correct';
              ptr++;
            } else {
              if (!newMistakes) newMistakes = [...voiceMistakes];
              const alreadyLogged = newMistakes.some(m => m.index === ptr);
              if (!alreadyLogged) {
                newMistakes.push({
                  index: ptr,
                  expected: target.original,
                  heard: spoken
                });
              }
              if (!newStatuses) newStatuses = [...wordStatuses];
              newStatuses[ptr] = 'mistake';
            }
          }
        }

        if (newStatuses) setWordStatuses(newStatuses);
        if (newMistakes) setVoiceMistakes(newMistakes);

        if (ptr !== currentReadIndexRef.current) {
          setCurrentReadIndex(ptr);
          currentReadIndexRef.current = ptr;
        }

        if (ptr >= storyTokens.length) {
          finishReadingPractice(ptr, newMistakes || voiceMistakes);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed') {
          setMicErrorMsg('Microphone access was denied. Please allow microphone permissions in your browser address bar.');
          stopVoicePractice();
        } else if (e.error === 'no-speech') {
          if (isListeningRef.current) {
            try { recognition.start(); } catch (err) { }
          }
        }
      };

      recognition.onend = () => {
        if (isListeningRef.current) {
          try {
            recognition.start();
          } catch (e) { }
        } else {
          setIsVoiceListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setMicErrorMsg('Could not initialize speech recognition. Please check your microphone.');
    }
  };

  const stopVoicePractice = () => {
    isListeningRef.current = false;
    setIsVoiceListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) { }
    }
    if (readingTimerRef.current) clearInterval(readingTimerRef.current);
  };

  const resetVoicePractice = () => {
    stopVoicePractice();
    setCurrentReadIndex(0);
    currentReadIndexRef.current = 0;
    setWordStatuses(new Array(storyTokens.length).fill('pending'));
    setVoiceMistakes([]);
    setReadingSeconds(0);
    setReadingFinished(false);
    setAssessmentResult(null);
    setStaffSubmissionSuccess(false);
    setRecentHeardWords('');
  };

  const finishReadingPractice = async (finalIdx = currentReadIndex, currentMistakes = voiceMistakes) => {
    stopVoicePractice();

    const wordsReadCount = Math.max(finalIdx, 1);
    const totalWords = storyTokens.length;
    const elapsed = Math.max(readingSeconds, 1);
    const minutes = elapsed / 60;
    const wpm = Math.round(wordsReadCount / minutes);

    const mistakeCount = currentMistakes.length;
    const correctCount = Math.max(0, wordsReadCount - mistakeCount);
    const accuracy = totalWords > 0 ? Math.min(100, Math.round((correctCount / wordsReadCount) * 100)) : 100;

    let speedBadge = 'Fluent Reader';
    let speedColor = '#10b981';
    if (wpm >= 160) {
      speedBadge = '🚀 Advanced Fluent Reader (160+ WPM)';
      speedColor = '#6366f1';
    } else if (wpm >= 120) {
      speedBadge = '🌟 Fluent Conversational Speed (120–160 WPM)';
      speedColor = '#10b981';
    } else if (wpm >= 85) {
      speedBadge = '💡 Moderate Practice Pace (85–120 WPM)';
      speedColor = '#f59e0b';
    } else {
      speedBadge = '📖 Developing Practice Pace (< 85 WPM)';
      speedColor = '#ec4899';
    }

    const resultObj = {
      wpm,
      accuracy,
      elapsedSeconds: elapsed,
      wordsRead: wordsReadCount,
      totalWords,
      correctCount,
      mistakeCount,
      mistakes: currentMistakes,
      speedBadge,
      speedColor
    };

    setAssessmentResult(resultObj);
    setReadingFinished(true);

    // Intimate / send reading assessment to staff dashboard
    await sendAssessmentToStaffDashboard(resultObj);
  };

  const sendAssessmentToStaffDashboard = async (result) => {
    const userSession = session || (() => {
      try {
        const saved = localStorage.getItem('lms_user_session');
        return saved ? JSON.parse(saved) : null;
      } catch (e) { return null; }
    })();

    if (!userSession || !userSession.studentId) return;

    setIsSubmittingToStaff(true);
    try {
      const mistakesSummary = result.mistakes.length > 0
        ? result.mistakes.map(m => `"${m.expected}" (heard as "${m.heard}")`).slice(0, 8).join(', ')
        : 'None (100% Accurate)';

      const timeFormatted = `${Math.floor(result.elapsedSeconds / 60).toString().padStart(2, '0')}:${(result.elapsedSeconds % 60).toString().padStart(2, '0')}`;

      const res = await fetch(`/api/students/${userSession.studentId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: `spoko_story_day${day}`,
          tabId: 'story_speed_highlighter',
          taskUrl: 'https://spoko-assessment.alphafly.internal/reading-speed',
          taskText: `🎙️ Voice Reading Assessment: Speed: ${result.wpm} WPM (${result.speedBadge}) | Accuracy: ${result.accuracy}% | Time: ${timeFormatted} | Read: ${result.wordsRead}/${result.totalWords} words | Mistakes Identified: ${mistakesSummary}`
        })
      });

      if (res.ok) {
        setStaffSubmissionSuccess(true);
      }
    } catch (err) {
      console.warn('Failed to intimate reading assessment to staff dashboard:', err);
    } finally {
      setIsSubmittingToStaff(false);
    }
  };

  /* ──────────────────────────────────────────────────────────────────
     5. VIDEO STORY & VIDEO OBSERVATION SUBMISSION STATE
  ────────────────────────────────────────────────────────────────── */
  const [validations, setValidations] = useState(getAssignmentValidations());

  useEffect(() => {
    const handleSync = () => setValidations(getAssignmentValidations());
    window.addEventListener('html_css_validation_changed', handleSync);
    return () => window.removeEventListener('html_css_validation_changed', handleSync);
  }, []);

  const currentDayValidation = validations[`spoko_story_day${day}`] || {};
  const prevDay = day > 1 ? day - 1 : 1;
  const prevDayValidation = validations[`spoko_story_day${prevDay}`] || {};
  const prevDayLesson = storySyllabus[prevDay] || {};

  const isStaffUser = Boolean(
    session && (session.role === 'staff' || session.role === 'admin' || session.role === 'instructor')
  );

  const isPrevDayApproved = Boolean(
    prevDayValidation.status === 'approved' || prevDayValidation.status === 'Approved'
  );

  const isDayLocked = day > 1 && !isStaffUser && !isPrevDayApproved;

  const [videoObservationText, setVideoObservationText] = useState(currentDayValidation.observationText || '');
  const [videoSubmitting, setVideoSubmitting] = useState(false);
  const [videoSubmitSuccess, setVideoSubmitSuccess] = useState(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');

  // Submit Video Observation to Staff Dashboard
  const handleVideoObservationSubmit = async () => {
    if (!videoObservationText.trim()) {
      alert('Please write what you observed from the video story before submitting.');
      return;
    }

    setVideoSubmitting(true);
    const userSession = session || (() => {
      try {
        const saved = localStorage.getItem('lms_user_session');
        return saved ? JSON.parse(saved) : null;
      } catch (e) { return null; }
    })();

    const record = {
      status: 'pending',
      studentName: userSession?.name || 'Student',
      studentId: userSession?.studentId || 'Anonymous',
      videoTitle: lessonData.youtubeVideo?.title || 'Story Video',
      observationText: videoObservationText,
      submittedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      moduleId: `spoko_story_day${day}`
    };

    saveAssignmentValidation(`spoko_story_day${day}`, record);
    setValidations(getAssignmentValidations());

    if (userSession?.studentId) {
      try {
        await fetch(`/api/students/${userSession.studentId}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: `spoko_story_day${day}`,
            tabId: 'story_video',
            taskUrl: lessonData.youtubeVideo?.embedUrl || 'https://www.youtube.com/watch?v=' + (lessonData.youtubeVideo?.videoId || ''),
            taskText: `🎬 Video Story Observation Report (Day ${day} - ${lessonData.title}):\n\n${videoObservationText}`
          })
        });
      } catch (err) {
        console.warn('Failed to intimate video observation to staff dashboard:', err);
      }
    }

    setVideoSubmitting(false);
    setVideoSubmitSuccess(true);
  };

  // Staff Quick Evaluation Action
  const handleStaffApproveVideo = (status) => {
    const updated = {
      ...currentDayValidation,
      status: status === 'approved' ? 'approved' : 'rejected',
      staffFeedback: status === 'approved'
        ? 'Great observation! Character development and story insights are well captured. Approved for next class.'
        : 'Please provide a more detailed observation summarizing character actions and key English phrases.',
      validatedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      validatedBy: session?.name || 'Staff Instructor'
    };
    saveAssignmentValidation(`spoko_story_day${day}`, updated);
    setValidations(getAssignmentValidations());
  };

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);

  const scenes = [
    {
      title: `Scene 1: Introduction & Setting`,
      desc: lessonData.story.paragraphs[0] || '',
      moralPoint: 'Recognizing our fear is the first step to conquering it.',
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      accentColor: '#818cf8',
      icon: '😰'
    },
    {
      title: `Scene 2: Inner Doubts & Struggle`,
      desc: lessonData.story.paragraphs[1] || '',
      moralPoint: 'Fear of negative judgment keeps us quiet.',
      bgGradient: 'linear-gradient(135deg, #311042 0%, #581c87 100%)',
      accentColor: '#c084fc',
      icon: '💭'
    },
    {
      title: `Scene 3: The Challenge in Class`,
      desc: lessonData.story.paragraphs[2] || '',
      moralPoint: 'A supportive teacher or friend creates a safe learning space.',
      bgGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
      accentColor: '#34d399',
      icon: '👩‍🏫'
    },
    {
      title: `Scene 4: The Moment of Courage`,
      desc: lessonData.story.paragraphs[6] || lessonData.story.paragraphs[4] || '',
      moralPoint: 'Mistakes are proof that you are trying.',
      bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
      accentColor: '#fcd34d',
      icon: '🌱'
    },
    {
      title: `Scene 5: Triumph & Transformation`,
      desc: lessonData.story.paragraphs[9] || lessonData.story.paragraphs[8] || '',
      moralPoint: 'Consistent practice turns fear into permanent confidence.',
      bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
      accentColor: '#38bdf8',
      icon: '🏆'
    }
  ];

  const handlePlayScene = (idx) => {
    setCurrentSceneIdx(idx);
    speakText(scenes[idx].desc, 0.95);
  };

  /* ──────────────────────────────────────────────────────────────────
     6. WRITING & RETELLING EXERCISE STATE
  ────────────────────────────────────────────────────────────────── */
  const [retellingSubmission, setRetellingSubmission] = useState('');
  const [retellingFeedback, setRetellingFeedback] = useState(null);

  const checkRetellingWriting = () => {
    if (!retellingSubmission.trim()) return;

    const usedWords = lessonData.vocabulary.filter(v =>
      retellingSubmission.toLowerCase().includes(v.word.toLowerCase())
    );

    const wordCount = retellingSubmission.trim().split(/\s+/).length;

    setRetellingFeedback({
      wordCount,
      vocabScore: usedWords.length,
      vocabWordsUsed: usedWords.map(w => w.word),
      grade: wordCount >= 30 && usedWords.length >= 2 ? 'Excellent' : 'Good Effort',
      message: wordCount >= 30
        ? `🎉 Great job! You wrote ${wordCount} words and correctly used ${usedWords.length} target vocabulary words (${usedWords.map(w => `"${w.word}"`).join(', ') || 'None'}).`
        : `📝 Nice start! You wrote ${wordCount} words. Try writing at least 30-50 words and include words like "${lessonData.vocabulary[0]?.word || ''}" or "${lessonData.vocabulary[1]?.word || ''}".`
    });
  };

  /* ──────────────────────────────────────────────────────────────────
     7. SPEAKING CHALLENGE & MORAL STATE
  ────────────────────────────────────────────────────────────────── */
  const [challengeSeconds, setChallengeSeconds] = useState(60);
  const [challengeRunning, setChallengeRunning] = useState(false);
  const [challengeTranscript, setChallengeTranscript] = useState('');
  const challengeTimerRef = useRef(null);
  const [moralSelectedOption, setMoralSelectedOption] = useState(null);

  useEffect(() => {
    if (challengeRunning) {
      challengeTimerRef.current = setInterval(() => {
        setChallengeSeconds(s => {
          if (s <= 1) {
            clearInterval(challengeTimerRef.current);
            setChallengeRunning(false);
            setChallengeTranscript(prev => prev + ' [Time Completed! Awesome speaking!]');
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (challengeTimerRef.current) clearInterval(challengeTimerRef.current);
    }
    return () => {
      if (challengeTimerRef.current) clearInterval(challengeTimerRef.current);
    };
  }, [challengeRunning]);

  const startSpeakingChallenge = () => {
    setChallengeSeconds(60);
    setChallengeRunning(true);
    setChallengeTranscript('🎤 Recording active... Speak aloud using the guidance structure below!');
  };

  const stopSpeakingChallenge = () => {
    setChallengeRunning(false);
    if (challengeTimerRef.current) clearInterval(challengeTimerRef.current);
    setChallengeTranscript(prev => prev + ' (Recording stopped)');
  };

  if (isDayLocked) {
    return (
      <div style={{ maxWidth: 840, margin: '2rem auto', padding: '2.5rem 2rem', background: '#ffffff', borderRadius: 20, border: '2px solid #fed7aa', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff7ed', border: '3px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <Lock size={36} color="#ea580c" />
        </div>
        <span style={{ background: '#ffedd5', color: '#c2410c', fontWeight: 800, fontSize: '0.85rem', padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Class Locked • Staff Approval Required
        </span>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '1rem 0 0.5rem' }}>
          Day {day} Class is Locked 🔒
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: 580, margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
          To unlock Day {day} (<strong>{lessonData.title}</strong>), you must first watch the Day {prevDay} Video Story, submit your observation report, and receive approval from your instructor/staff.
        </p>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem 1.5rem', maxWidth: 560, margin: '0 auto 2rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.1rem' }}>📋</span>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>Day {prevDay} Video Observation Status:</strong>
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 6,
              background: prevDayValidation.status === 'approved' ? '#dcfce7' : prevDayValidation.status === 'pending' ? '#fef3c7' : prevDayValidation.status === 'rejected' ? '#fee2e2' : '#f1f5f9',
              color: prevDayValidation.status === 'approved' ? '#15803d' : prevDayValidation.status === 'pending' ? '#d97706' : prevDayValidation.status === 'rejected' ? '#dc2626' : '#64748b'
            }}>
              {prevDayValidation.status === 'approved' ? '✅ Approved' : prevDayValidation.status === 'pending' ? '⏳ Pending Staff Review' : prevDayValidation.status === 'rejected' ? '❌ Revision Requested' : '⚠️ Not Submitted Yet'}
            </span>
          </div>
          {prevDayValidation.status === 'pending' ? (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              Your Day {prevDay} Video Observation report is currently under evaluation by your staff instructor. Once approved, this class will unlock automatically.
            </p>
          ) : prevDayValidation.status === 'rejected' ? (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#dc2626', lineHeight: 1.6 }}>
              Staff Feedback: {prevDayValidation.staffFeedback || 'Please update and resubmit your observation.'}
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              Please complete the Day {prevDay} Video Story task and submit your observation report to request approval.
            </p>
          )}
        </div>

        <button
          onClick={() => onNavigate(`spoko_story_day${prevDay}`, 'story_video')}
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '12px 28px',
            fontSize: '1rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          Go to Day {prevDay} Video Story & Submit Observation <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">

      {/* ──────────────────────────────────────────────────────────────────
          TAB 1: 📖 READING STORY
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_reading' && (
        <SectionCard
          key="reading"
          eyebrow={`Day ${day} • Spoko Story Learning`}
          title={lessonData.title}
          icon={BookOpen}
          color="#f59e0b"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Story Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: 16,
              padding: '1.75rem',
              color: 'white',
              marginBottom: '1.5rem',
              border: '1px solid #334155',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '0.75rem' }}>
                <span style={{ background: '#f59e0b', color: '#000', fontWeight: 800, fontSize: '0.78rem', padding: '4px 12px', borderRadius: 20 }}>
                  Day {day} Core Story
                </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  ⏱️ {lessonData.story.readTime}
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px', color: '#f8fafc' }}>{lessonData.title}</h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', margin: '0 0 1rem', lineHeight: 1.6 }}>{lessonData.subtitle}</p>

              {/* Moral highlight */}
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 8, borderLeft: '4px solid #f59e0b', fontSize: '0.85rem' }}>
                <strong style={{ color: '#fcd34d' }}>💡 Story Moral:</strong> {lessonData.moral}
                {lessonData.moralTamil && <span style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginTop: 2 }}>{lessonData.moralTamil}</span>}
              </div>

              {/* Play / Listen Button */}
              <div style={{ display: 'flex', gap: 10, marginTop: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={handlePlayFullStory}
                  style={{
                    background: readingAudioActive ? '#ef4444' : '#f59e0b',
                    color: readingAudioActive ? 'white' : '#000000',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  {readingAudioActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {readingAudioActive ? 'Stop Story Audio' : 'Listen to Full Story (AI Voice)'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>Speed:</span>
                  {[0.75, 1.0, 1.25].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setAudioSpeed(spd)}
                      style={{
                        background: audioSpeed === spd ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                        color: audioSpeed === spd ? '#000' : 'white',
                        border: 'none',
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Paragraphs Reader */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {lessonData.story.paragraphs.map((para, idx) => (
                <div
                  key={idx}
                  style={{
                    background: readingParagraphIndex === idx ? '#fef3c7' : '#ffffff',
                    border: readingParagraphIndex === idx ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                    borderRadius: 14,
                    padding: '1.5rem 1.75rem',
                    transition: 'all 0.2s',
                    position: 'relative',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '4px 12px', borderRadius: 6, letterSpacing: '0.02em' }}>
                      Paragraph {idx + 1}
                    </span>
                    <button
                      onClick={() => handleReadParagraph(para, idx)}
                      style={{
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        padding: '6px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <Volume2 size={15} /> Listen
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '1.22rem', color: '#0f172a', lineHeight: 2.15, letterSpacing: '0.012em', fontWeight: 450 }}>
                    {para}
                  </p>
                </div>
              ))}
            </div>

            {/* Next Action Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('story_vocab')} style={{ background: '#f59e0b', borderColor: '#f59e0b', color: '#000000', fontWeight: 800, fontSize: '0.95rem', padding: '10px 20px' }}>
                Next: Vocabulary & Tamil Meanings <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </SectionCard>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 2: 📝 VOCABULARY & TAMIL
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_vocab' && (
        <SectionCard
          key="vocab"
          eyebrow={`Day ${day} • Vocabulary`}
          title="Essential Communication Vocabulary"
          icon={FileText}
          color="#10b981"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* 1. Top Control Bar (Search, POS Filters, View Mode) */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Row 1: Intro info & Search Input */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.8rem', padding: '3px 10px', borderRadius: 20 }}>
                      🔥 {lessonData.vocabulary.length} Tough Story Words
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Master phonetics, Tamil definitions & story usage
                    </span>
                  </div>
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', minWidth: 'min(100%, 280px)', flex: '1 1 auto', maxWidth: 400 }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search word, Tamil meaning, phonetic..."
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 34px 8px 36px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: 10,
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border 0.2s',
                      background: '#f8fafc'
                    }}
                  />
                  {vocabSearch && (
                    <button
                      onClick={() => setVocabSearch('')}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Row 2: Category Filter Chips & View Mode Switcher */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem' }}>
                {/* POS Category Chips */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginRight: 2 }}>
                    Filter by:
                  </span>
                  {[
                    { id: 'all', label: `All Words (${lessonData.vocabulary.length})` },
                    { id: 'verb', label: `Verbs (${lessonData.vocabulary.filter(v => (v.partOfSpeech || '').toLowerCase().includes('verb')).length})` },
                    { id: 'noun', label: `Nouns (${lessonData.vocabulary.filter(v => (v.partOfSpeech || '').toLowerCase().includes('noun')).length})` },
                    { id: 'adjective', label: `Adjectives (${lessonData.vocabulary.filter(v => (v.partOfSpeech || '').toLowerCase().includes('adj')).length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setVocabFilterPos(tab.id)}
                      style={{
                        background: vocabFilterPos === tab.id ? '#10b981' : '#f1f5f9',
                        color: vocabFilterPos === tab.id ? 'white' : '#475569',
                        border: 'none',
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* View Mode Buttons */}
                <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 8, padding: 3, gap: 2 }}>
                  <button
                    onClick={() => setVocabViewMode('grid')}
                    style={{
                      background: vocabViewMode === 'grid' ? '#ffffff' : 'transparent',
                      color: vocabViewMode === 'grid' ? '#0f172a' : '#64748b',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      boxShadow: vocabViewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <LayoutGrid size={14} /> Cards
                  </button>
                  <button
                    onClick={() => setVocabViewMode('table')}
                    style={{
                      background: vocabViewMode === 'table' ? '#ffffff' : 'transparent',
                      color: vocabViewMode === 'table' ? '#0f172a' : '#64748b',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      boxShadow: vocabViewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <ListFilter size={14} /> Table
                  </button>
                  <button
                    onClick={() => setVocabViewMode('quiz')}
                    style={{
                      background: vocabViewMode === 'quiz' ? '#10b981' : 'transparent',
                      color: vocabViewMode === 'quiz' ? '#ffffff' : '#64748b',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      boxShadow: vocabViewMode === 'quiz' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <Target size={14} /> Matcher Quiz
                  </button>
                </div>
              </div>
            </div>

            {/* Empty state if search returns no matches */}
            {filteredVocab.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f8fafc', borderRadius: 16, border: '1px dashed #cbd5e1', marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontSize: '1rem', color: '#64748b' }}>
                  No vocabulary words found matching "<strong>{vocabSearch}</strong>".
                </p>
                <button
                  onClick={() => { setVocabSearch(''); setVocabFilterPos('all'); }}
                  style={{ marginTop: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────────
                VIEW 1: RESPONSIVE INTERACTIVE FLASHCARD GRID
            ────────────────────────────────────────────────────────────────── */}
            {vocabViewMode === 'grid' && filteredVocab.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}>
                {filteredVocab.map((item, idx) => {
                  const isPlaying = playingWordId === (item.id || item.word);
                  const isVerb = (item.partOfSpeech || '').toLowerCase().includes('verb');
                  const isNoun = (item.partOfSpeech || '').toLowerCase().includes('noun');
                  const posBadgeColor = isVerb ? '#059669' : isNoun ? '#6366f1' : '#d97706';
                  const posBadgeBg = isVerb ? '#ecfdf5' : isNoun ? '#eef2ff' : '#fef3c7';

                  return (
                    <motion.div
                      key={item.id || idx}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        background: '#ffffff',
                        border: isPlaying ? '2px solid #10b981' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: '1.4rem',
                        boxShadow: isPlaying ? '0 8px 20px rgba(16, 185, 129, 0.15)' : '0 3px 12px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Top Accent Gradient Bar */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: isVerb ? 'linear-gradient(90deg, #10b981, #059669)' : isNoun ? 'linear-gradient(90deg, #6366f1, #4f46e5)' : 'linear-gradient(90deg, #f59e0b, #d97706)'
                      }} />

                      <div>
                        {/* Header: Index, POS & Audio Controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>
                              #{String(idx + 1).padStart(2, '0')}
                            </span>
                            <span style={{ fontSize: '0.76rem', background: posBadgeBg, color: posBadgeColor, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>
                              {item.partOfSpeech}
                            </span>
                          </div>

                          {/* Quick Sound Buttons */}
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button
                              onClick={() => handlePronounceWord(item, 0.8)}
                              title="Listen slow pronunciation (0.8x)"
                              style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: 6,
                                padding: '3px 7px',
                                fontSize: '0.72rem',
                                color: '#64748b',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              🐢 0.8x
                            </button>
                            <button
                              onClick={() => handlePronounceWord(item, 1.0)}
                              title="Listen normal pronunciation"
                              style={{
                                background: isPlaying ? '#10b981' : '#f1f5f9',
                                color: isPlaying ? 'white' : '#10b981',
                                border: 'none',
                                borderRadius: 6,
                                width: 30,
                                height: 26,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <Volume2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Word Title & Phonetic Badge */}
                        <div style={{ marginBottom: 10 }}>
                          <h3 style={{ margin: '0 0 2px', fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                            {item.word}
                          </h3>
                          <span style={{ fontSize: '0.84rem', color: '#64748b', fontFamily: 'monospace', background: '#f8fafc', padding: '2px 8px', borderRadius: 6, display: 'inline-block' }}>
                            {item.phonetic}
                          </span>
                        </div>

                        {/* Tamil Meaning Box */}
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderLeft: '4px solid #10b981',
                          borderRadius: 10,
                          padding: '10px 14px',
                          marginBottom: 10
                        }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#15803d', fontWeight: 800, display: 'block', marginBottom: 2 }}>
                            Tamil Meaning:
                          </span>
                          <strong style={{ fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.4, display: 'block' }}>
                            {item.tamil}
                          </strong>
                        </div>

                        {/* English Meaning */}
                        <p style={{ margin: '0 0 10px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.55 }}>
                          {item.meaning}
                        </p>

                        {/* Story Context Sentence */}
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: 10,
                          padding: '10px 12px',
                          fontSize: '0.88rem',
                          color: '#475569',
                          lineHeight: 1.6,
                          fontStyle: 'italic',
                          marginBottom: 12
                        }}>
                          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontStyle: 'normal', fontWeight: 800, display: 'block', marginBottom: 2 }}>
                            📖 Story Passage Context:
                          </span>
                          "{item.example}"
                        </div>
                      </div>

                      {/* Card Action: Speak Sentence */}
                      <button
                        onClick={() => handlePronounceFullContext(item)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          padding: '7px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#334155',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          width: '100%',
                          transition: 'all 0.15s'
                        }}
                      >
                        <Headphones size={14} color="#10b981" /> Listen Word in Story Sentence
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────────
                VIEW 2: RESPONSIVE TABLE VIEW
            ────────────────────────────────────────────────────────────────── */}
            {vocabViewMode === 'table' && filteredVocab.length > 0 && (
              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: '2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 680 }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569', width: 45 }}>#</th>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>Word & Phonetics</th>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>Type</th>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>Tamil Meaning</th>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>English Meaning & Story Sentence</th>
                        <th style={{ padding: '12px 14px', fontSize: '0.8rem', fontWeight: 800, color: '#475569', textAlign: 'center', width: 90 }}>Audio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVocab.map((item, idx) => (
                        <tr
                          key={item.id || idx}
                          style={{
                            borderBottom: '1px solid #f1f5f9',
                            background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                            transition: 'background 0.15s'
                          }}
                        >
                          <td style={{ padding: '12px 14px', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8' }}>
                            {idx + 1}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <strong style={{ fontSize: '1.02rem', color: '#0f172a', display: 'block' }}>{item.word}</strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{item.phonetic}</span>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: 6, fontWeight: 700, whiteSpace: 'nowrap' }}>
                              {item.partOfSpeech}
                            </span>
                          </td>
                          <td style={{ padding: '12px 14px', fontWeight: 700, color: '#15803d', fontSize: '0.95rem' }}>
                            {item.tamil}
                          </td>
                          <td style={{ padding: '12px 14px', fontSize: '0.88rem', color: '#334155' }}>
                            <div style={{ marginBottom: 4 }}>{item.meaning}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                              "{item.example}"
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <button
                              onClick={() => handlePronounceWord(item, 0.9)}
                              style={{
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                width: 32,
                                height: 32,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                              title="Listen pronunciation"
                            >
                              <Volume2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────────
                VIEW 3: INTERACTIVE MATCHER QUIZ
            ────────────────────────────────────────────────────────────────── */}
            {vocabViewMode === 'quiz' && (
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #10b981',
                borderRadius: 16,
                padding: '1.75rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800 }}>
                      🎯 Matcher Quiz Check
                    </span>
                    <h3 style={{ margin: '6px 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                      Test Your Vocabulary Recall
                    </h3>
                  </div>

                  <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 800, background: '#f0fdf4', padding: '4px 12px', borderRadius: 8 }}>
                    Question {vocabQuizIndex + 1} of {lessonData.vocabulary.length}
                  </span>
                </div>

                {lessonData.vocabulary[vocabQuizIndex] && (
                  <div>
                    {/* Prompt Box */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                        <div>
                          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>What is the Tamil meaning for this word?</span>
                          <h4 style={{ margin: '4px 0 0', fontSize: '1.6rem', color: '#0f172a', fontWeight: 800 }}>
                            {lessonData.vocabulary[vocabQuizIndex].word}
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'monospace' }}>
                            {lessonData.vocabulary[vocabQuizIndex].phonetic} • {lessonData.vocabulary[vocabQuizIndex].partOfSpeech}
                          </span>
                        </div>

                        <button
                          onClick={() => handlePronounceWord(lessonData.vocabulary[vocabQuizIndex], 0.9)}
                          style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                          <Volume2 size={16} /> Listen Word
                        </button>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 10, marginBottom: '1.25rem' }}>
                      {[
                        lessonData.vocabulary[vocabQuizIndex].tamil,
                        lessonData.vocabulary[(vocabQuizIndex + 1) % lessonData.vocabulary.length].tamil,
                        lessonData.vocabulary[(vocabQuizIndex + 2) % lessonData.vocabulary.length].tamil
                      ].sort().map((opt, i) => {
                        const isCorrect = opt === lessonData.vocabulary[vocabQuizIndex].tamil;
                        const isSelected = selectedVocabOption === opt;
                        let bg = '#ffffff', border = '1.5px solid #cbd5e1', color = '#1e293b';

                        if (isSelected) {
                          bg = isCorrect ? '#dcfce7' : '#fee2e2';
                          border = isCorrect ? '2px solid #10b981' : '2px solid #ef4444';
                          color = isCorrect ? '#166534' : '#991b1b';
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedVocabOption(opt)}
                            style={{
                              background: bg,
                              border,
                              color,
                              borderRadius: 10,
                              padding: '14px 16px',
                              textAlign: 'left',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Result and Next control */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        {selectedVocabOption && (
                          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: selectedVocabOption === lessonData.vocabulary[vocabQuizIndex].tamil ? '#166534' : '#b91c1c' }}>
                            {selectedVocabOption === lessonData.vocabulary[vocabQuizIndex].tamil ? '🎉 Correct! Well done!' : '❌ Incorrect. Try again or check the cards!'}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedVocabOption(null);
                          setVocabQuizIndex(i => (i + 1) % lessonData.vocabulary.length);
                        }}
                        style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontSize: '0.88rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        Next Word Check →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Next Action Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => go('story_conversation')}
                style={{ background: '#10b981', borderColor: '#10b981', fontWeight: 800, fontSize: '0.95rem', padding: '10px 22px' }}
              >
                Next: Conversation & Dialogue <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </SectionCard>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 3: 💬 CONVERSATION & DIALOGUE
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_conversation' && (
        <SectionCard
          key="conversation"
          eyebrow={`Day ${day} • Spoken English`}
          title="Interactive Conversational Dialogue"
          icon={MessageCircle}
          color="#3b82f6"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                Practice real-world English conversation. Click any line to listen, or click <strong>Play Full Dialogue</strong> to practice along.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowTamilSubs(v => !v)}
                  style={{ background: showTamilSubs ? '#e0f2fe' : '#f1f5f9', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {showTamilSubs ? <Eye size={14} /> : <EyeOff size={14} />} {showTamilSubs ? 'Tamil Subtitles: ON' : 'Tamil Subtitles: OFF'}
                </button>
                <button
                  onClick={handlePlayFullDialogue}
                  style={{ background: dialoguePlaying ? '#ef4444' : '#3b82f6', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {dialoguePlaying ? <Square size={14} /> : <Play size={14} />} {dialoguePlaying ? 'Stop Dialogue' : 'Play Full Dialogue'}
                </button>
              </div>
            </div>

            {/* Chat Style Dialogue Box */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {lessonData.dialogue.map((item, idx) => {
                const isSpeaker1 = idx % 2 === 0;
                const isActive = activeDialogueIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handlePlayDialogueLine(item, idx)}
                    style={{
                      display: 'flex',
                      flexDirection: isSpeaker1 ? 'row' : 'row-reverse',
                      alignItems: 'flex-start',
                      gap: 12,
                      cursor: 'pointer'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: isSpeaker1 ? '#6366f1' : '#10b981',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                      {item.speaker[0]}
                    </div>

                    {/* Speech Bubble */}
                    <div style={{
                      maxWidth: '82%',
                      background: isActive ? '#fef3c7' : isSpeaker1 ? '#ffffff' : '#f0fdf4',
                      border: isActive ? '2px solid #f59e0b' : isSpeaker1 ? '1px solid #e2e8f0' : '1px solid #bbf7d0',
                      borderRadius: isSpeaker1 ? '0 16px 16px 16px' : '16px 0 16px 16px',
                      padding: '14px 18px',
                      boxShadow: isActive ? '0 4px 12px rgba(245, 158, 11, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease',
                      transform: isActive ? 'scale(1.01)' : 'scale(1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                        <strong style={{ fontSize: '0.88rem', color: isSpeaker1 ? '#4338ca' : '#15803d', display: 'flex', alignItems: 'center', gap: 4 }}>
                          {item.speaker} {isActive && <span style={{ background: '#f59e0b', color: 'white', fontSize: '0.68rem', padding: '2px 7px', borderRadius: 4, fontWeight: 700 }}>Speaking</span>}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: isActive ? '#d97706' : '#94a3b8', fontWeight: isActive ? 700 : 400 }}>
                          {isActive ? '🔊 Playing...' : '🔊 Click to listen'}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '1.12rem', color: '#0f172a', fontWeight: 550, lineHeight: 1.65 }}>
                        "{item.line}"
                      </p>
                      {showTamilSubs && item.tamil && (
                        <p style={{ margin: '8px 0 0', fontSize: '0.94rem', color: '#475569', borderTop: '1px dashed #cbd5e1', paddingTop: 6, lineHeight: 1.5 }}>
                          {item.tamil}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Action Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('story_speed_highlighter')} style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                Next: Reading Speed & Highlighter <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </SectionCard>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 4: ⚡ VOICE RECOGNITION READING PRACTICE & REAL-TIME HIGHLIGHTER
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_speed_highlighter' && (
        <SectionCard
          key="highlighter"
          eyebrow={`Day ${day} • Voice Reading Assessment`}
          title="Live Voice-Recognition Reading Practice"
          icon={Mic}
          color="#ec4899"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Instruction Banner */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mic size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.92rem', color: '#1e3a8a', display: 'block' }}>
                  Student Speaking Practice • AI Listens & Evaluates
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Click <strong>Start Voice Reading Practice</strong> and read the story aloud. Your voice will highlight words in real-time, detect pronunciation mistakes, track reading speed (WPM), and send your performance report directly to your staff dashboard!
                </span>
              </div>
            </div>

            {/* Microphone Error Alert if Any */}
            {micErrorMsg && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '1rem', color: '#991b1b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                <AlertTriangle size={18} color="#ef4444" />
                <span>{micErrorMsg}</span>
              </div>
            )}

            {/* Control Toolbar */}
            <div style={{ background: '#0f172a', color: 'white', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {!isVoiceListening ? (
                  <button
                    onClick={startVoicePractice}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 22px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                    }}
                  >
                    <Mic size={18} /> Start Voice Reading Practice
                  </button>
                ) : (
                  <button
                    onClick={stopVoicePractice}
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 22px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                    }}
                  >
                    <Square size={16} fill="white" /> Pause / Stop Practice
                  </button>
                )}

                {(isVoiceListening || currentReadIndex > 0) && (
                  <button
                    onClick={() => finishReadingPractice(currentReadIndex, voiceMistakes)}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <CheckCircle2 size={16} /> Finish & Evaluate
                  </button>
                )}

                <button
                  onClick={resetVoicePractice}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: '#cbd5e1',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 10,
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <RotateCcw size={15} /> Reset
                </button>
              </div>

              {/* Live Mic Animation Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isVoiceListening ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '6px 14px', borderRadius: 20 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', animation: 'pulse 1s infinite' }} />
                    <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 800 }}>Listening to your voice...</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: '0.82rem' }}>
                    <MicOff size={16} /> Microphone Inactive
                  </div>
                )}
              </div>
            </div>

            {/* Live Metrics HUD */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <Clock size={14} color="#3b82f6" /> Elapsed Time
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: '1.6rem', color: '#0f172a', fontWeight: 900, fontFamily: 'monospace' }}>
                  {Math.floor(readingSeconds / 60).toString().padStart(2, '0')}:{(readingSeconds % 60).toString().padStart(2, '0')}
                </h3>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <TrendingUp size={14} color="#ec4899" /> Live Pace
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: '1.6rem', color: '#ec4899', fontWeight: 900 }}>
                  {Math.round((currentReadIndex / Math.max(readingSeconds / 60, 0.05))) || 0} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>WPM</span>
                </h3>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <Target size={14} color="#10b981" /> Progress
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: '1.6rem', color: '#10b981', fontWeight: 900 }}>
                  {currentReadIndex} <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>/ {storyTokens.length}</span>
                </h3>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <AlertCircle size={14} color="#ef4444" /> Identified Mistakes
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: '1.6rem', color: voiceMistakes.length > 0 ? '#ef4444' : '#10b981', fontWeight: 900 }}>
                  {voiceMistakes.length}
                </h3>
              </div>
            </div>

            {/* Live Heard Words Strip */}
            {isVoiceListening && recentHeardWords && (
              <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 10, padding: '8px 14px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#475569' }}>
                <Activity size={16} color="#6366f1" />
                <span>Captured Audio Input: <strong style={{ color: '#0f172a' }}>"{recentHeardWords}"</strong></span>
              </div>
            )}

            {/* Interactive Teleprompter Story Canvas */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: 18,
              padding: '2.25rem',
              marginBottom: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              maxHeight: '440px',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}>
              <div style={{ fontSize: '1.28rem', lineHeight: 2.3, color: '#1e293b', fontFamily: 'Georgia, serif' }}>
                {storyTokens.map((token, wIdx) => {
                  const isCurrent = wIdx === currentReadIndex && isVoiceListening;
                  const status = wordStatuses[wIdx] || 'pending';

                  let bg = 'transparent';
                  let color = '#334155';
                  let fontWeight = 400;
                  let border = 'none';

                  if (status === 'correct') {
                    bg = '#dcfce7';
                    color = '#15803d';
                    fontWeight = 700;
                  } else if (status === 'mistake') {
                    bg = '#fee2e2';
                    color = '#b91c1c';
                    fontWeight = 700;
                    border = '1.5px dashed #ef4444';
                  }

                  if (isCurrent) {
                    bg = '#fef08a';
                    color = '#854d0e';
                    fontWeight = 900;
                    border = '2px solid #eab308';
                  }

                  return (
                    <span
                      key={wIdx}
                      ref={isCurrent ? activeWordElemRef : null}
                      style={{
                        display: 'inline-block',
                        padding: isCurrent ? '2px 8px' : '2px 5px',
                        margin: '2px 3px',
                        borderRadius: 6,
                        background: bg,
                        color: color,
                        fontWeight: fontWeight,
                        border: border,
                        boxShadow: isCurrent ? '0 0 10px rgba(234, 179, 8, 0.45)' : 'none',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                      title={status === 'mistake' ? 'Mistake detected here' : isCurrent ? 'Speak this word now' : ''}
                    >
                      {token.original}
                      {isCurrent && (
                        <span style={{
                          position: 'absolute',
                          top: -20,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#ca8a04',
                          color: 'white',
                          fontSize: '0.62rem',
                          padding: '1px 5px',
                          borderRadius: 4,
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}>
                          Next 👇
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Assessment Result Summary Modal / Panel */}
            {readingFinished && assessmentResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #6366f1',
                  borderRadius: 20,
                  padding: '2rem',
                  marginBottom: '2rem',
                  boxShadow: '0 12px 36px rgba(99, 102, 241, 0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <span style={{ color: '#6366f1', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🏆 Reading Assessment Report
                    </span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '1.45rem', fontWeight: 900, color: '#0f172a' }}>
                      Performance & Voice Evaluation
                    </h3>
                  </div>

                  {/* Staff Intimation Status Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isSubmittingToStaff ? (
                      <span style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '6px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <RefreshCw size={14} className="spin" /> Intimating Staff Dashboard...
                      </span>
                    ) : staffSubmissionSuccess ? (
                      <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '6px 14px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={15} color="#16a34a" /> Recorded in Staff Review Dashboard!
                      </span>
                    ) : (
                      <button
                        onClick={() => sendAssessmentToStaffDashboard(assessmentResult)}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Send size={14} /> Send to Staff Dashboard
                      </button>
                    )}
                  </div>
                </div>

                {/* Big Score Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>READING SPEED</span>
                    <h2 style={{ margin: '6px 0 2px', fontSize: '2rem', color: assessmentResult.speedColor, fontWeight: 900 }}>
                      {assessmentResult.wpm} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>WPM</span>
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: assessmentResult.speedColor, fontWeight: 800 }}>
                      {assessmentResult.speedBadge}
                    </span>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>PRONUNCIATION ACCURACY</span>
                    <h2 style={{ margin: '6px 0 2px', fontSize: '2rem', color: assessmentResult.accuracy >= 85 ? '#10b981' : '#f59e0b', fontWeight: 900 }}>
                      {assessmentResult.accuracy}%
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {assessmentResult.correctCount} / {assessmentResult.wordsRead} words correct
                    </span>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>TIME TAKEN</span>
                    <h2 style={{ margin: '6px 0 2px', fontSize: '2rem', color: '#3b82f6', fontWeight: 900, fontFamily: 'monospace' }}>
                      {Math.floor(assessmentResult.elapsedSeconds / 60).toString().padStart(2, '0')}:{(assessmentResult.elapsedSeconds % 60).toString().padStart(2, '0')}
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      Total Duration
                    </span>
                  </div>
                </div>

                {/* Identified Mistakes Breakdown */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertCircle size={16} color={assessmentResult.mistakes.length > 0 ? '#ef4444' : '#10b981'} />
                    Pronunciation Mistakes & Feedback ({assessmentResult.mistakes.length}):
                  </h4>

                  {assessmentResult.mistakes.length === 0 ? (
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '10px 14px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 700 }}>
                      🎉 Outstanding! Zero pronunciation mistakes detected. Excellent fluency!
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 10 }}>
                      {assessmentResult.mistakes.map((m, idx) => (
                        <div key={idx} style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: '#9f1239', fontWeight: 700, display: 'block' }}>Expected:</span>
                            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>"{m.expected}"</strong>
                            <span style={{ fontSize: '0.75rem', color: '#e11d48', display: 'block', marginTop: 2 }}>Heard: "{m.heard}"</span>
                          </div>
                          <button
                            onClick={() => speakText(m.expected, 0.85)}
                            style={{ background: '#ffffff', border: '1px solid #fda4af', color: '#be123c', borderRadius: 6, padding: '6px 10px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                            title="Listen correct pronunciation"
                          >
                            <Volume2 size={13} /> Listen
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Practice Again CTA */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    onClick={resetVoicePractice}
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: 10, padding: '8px 16px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <RotateCcw size={15} /> Practice This Story Again
                  </button>
                  <button
                    onClick={() => go('story_challenge')}
                    style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', color: 'white', border: 'none', borderRadius: 10, padding: '8px 20px', fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    Next: Speaking Challenge & Moral <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Next Action Button (when not finished) */}
            {!readingFinished && (
              <div className="card-actions" style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={() => go('story_challenge')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                  Next: Speaking Challenge & Moral <ArrowRight size={16} />
                </button>
              </div>
            )}

          </div>
        </SectionCard>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 5: 🎤 SPEAKING CHALLENGE & MORAL
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_challenge' && (
        <SectionCard
          key="challenge"
          eyebrow={`Day ${day} • Speaking Challenge`}
          title="Daily 1-Minute Speaking Challenge & Moral"
          icon={Award}
          color="#0284c7"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* 1. Daily 1-Minute Speaking Challenge */}
            {(() => {
              const challengeObj = lessonData.speakingChallenge || lessonData.challenge || {
                topic: lessonData.title || 'Speaking Practice',
                guidance: 'Speak for 1 minute clearly with steady pace and confidence.',
                structure: ['Introduce your main point.', 'Share your thoughts.', 'Conclude with confidence.']
              };
              const challengeStructure = Array.isArray(challengeObj.structure) ? challengeObj.structure : ['Read and express your thoughts clearly.'];

              return (
                <div style={{ background: '#0f172a', color: 'white', borderRadius: 16, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
                    <div>
                      <span style={{ background: '#38bdf8', color: '#000000', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                        🎙️ 60s Speaking Challenge
                      </span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '6px 0 2px', color: '#f8fafc' }}>
                        Topic: {challengeObj.topic || challengeObj.title || '1-Minute Speaking Practice'}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                        {challengeObj.guidance || challengeObj.prompt || 'Speak for 1 minute on this topic with clarity.'}
                      </p>
                    </div>

                    {/* Countdown Dial */}
                    <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#1e293b', border: '3px solid #38bdf8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'monospace', color: '#facc15' }}>{challengeSeconds}</span>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#94a3b8' }}>Secs</span>
                    </div>
                  </div>

                  {/* Speech Template Structure */}
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      Speaking Framework (Read aloud line by line):
                    </span>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.7 }}>
                      {challengeStructure.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenge Controls */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    {!challengeRunning ? (
                      <button
                        onClick={startSpeakingChallenge}
                        style={{ background: '#38bdf8', color: '#000000', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Play size={16} /> Start 1-Minute Challenge
                      </button>
                    ) : (
                      <button
                        onClick={stopSpeakingChallenge}
                        style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Square size={16} /> Stop Recording
                      </button>
                    )}
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{challengeTranscript}</span>
                  </div>
                </div>
              );
            })()}

            {/* 2. Story Moral Section & Quiz */}
            {(() => {
              const moralObj = lessonData.moralSection || {
                title: lessonData.moral || 'Story Moral & Life Reflection',
                enSummary: lessonData.moral || 'Practice makes progress.',
                taSummary: lessonData.moralTamil || 'தொடர் பயிற்சி வெற்றியைத் தரும்.',
                question: 'What is the main takeaway from today\'s lesson?',
                options: ['Stay calm and keep practicing', 'Give up immediately', 'Ignore all learning'],
                correctIndex: 0,
                feedback: 'Great job! Staying consistent is key.'
              };
              const moralOptions = Array.isArray(moralObj.options) ? moralObj.options : ['Understand and apply the lesson'];

              return (
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    🌟 Story Moral & Life Application: {moralObj.title}
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, margin: '0 0 6px' }}>
                    <strong>English Summary:</strong> {moralObj.enSummary}
                  </p>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 16px', background: '#f1f5f9', padding: '8px 12px', borderRadius: 6 }}>
                    <strong>Tamil Translation:</strong> {moralObj.taSummary}
                  </p>

                  {/* Moral Quiz Question */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: 8 }}>
                      Question: {moralObj.question}
                    </strong>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {moralOptions.map((opt, i) => {
                        const isCorrect = i === moralObj.correctIndex;
                        const isSelected = moralSelectedOption === i;
                        let bg = 'white', border = '1px solid #cbd5e1';

                        if (isSelected) {
                          bg = isCorrect ? '#dcfce7' : '#fee2e2';
                          border = isCorrect ? '1.5px solid #10b981' : '1.5px solid #ef4444';
                        }

                    return (
                      <button
                        key={i}
                        onClick={() => setMoralSelectedOption(i)}
                        style={{ background: bg, border, borderRadius: 8, padding: '10px 14px', textAlign: 'left', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {moralSelectedOption !== null && (
                  <div style={{ marginTop: 10, padding: '10px 14px', background: moralSelectedOption === moralObj.correctIndex ? '#dcfce7' : '#fee2e2', borderRadius: 8, fontSize: '0.85rem', color: moralSelectedOption === moralObj.correctIndex ? '#166534' : '#991b1b', fontWeight: 700 }}>
                    {moralSelectedOption === moralObj.correctIndex ? `🎉 ${moralObj.feedback || 'Great job!'}` : '❌ Try again! Review the story moral above.'}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

            {/* Next Action Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('story_video')} style={{ background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}>
                Next: Video Story & Observation Submission <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </SectionCard>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 6: 🎬 VIDEO STORY & OBSERVATION SUBMISSION
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'story_video' && (
        <SectionCard
          key="video_story"
          eyebrow={`Day ${day} • Video Story & Observation`}
          title="Watch Video Story & Submit Your Observations"
          icon={Video}
          color="#8b5cf6"
        >
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* 1. YouTube Video Player Embed Card */}
            <div style={{
              background: '#0f172a',
              borderRadius: 20,
              padding: '1.5rem',
              color: 'white',
              marginBottom: '2rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              border: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <span style={{ background: '#8b5cf6', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800 }}>
                    🎬 Day {day} YouTube Story Video
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '6px 0 2px', color: '#f8fafc' }}>
                    {lessonData.youtubeVideo?.title || `${lessonData.title} - Video Story`}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {lessonData.youtubeVideo?.channel || 'Spoko English Studio'} • ⏱️ Duration: {lessonData.youtubeVideo?.duration || '5 Mins'}
                  </span>
                </div>

                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '4px 12px', borderRadius: 8, fontSize: '0.78rem' }}>
                  📺 HD Interactive Player
                </span>
              </div>

              {/* Responsive 16:9 Video Frame */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 14,
                background: '#000000',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                border: '1px solid #1e293b'
              }}>
                <iframe
                  src={customYoutubeUrl || lessonData.youtubeVideo?.embedUrl || `https://www.youtube-nocookie.com/embed/${lessonData.youtubeVideo?.videoId || 'tbnzAVRZ9Xc'}`}
                  title={lessonData.youtubeVideo?.title || 'Spoko Story Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: 14
                  }}
                />
              </div>

              {/* Instructions banner below video */}
              <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>💡</span>
                <span>{lessonData.youtubeVideo?.instructions || 'Watch the video from start to finish. Observe how the characters interact, take note of spoken phrases, and write your observation report below.'}</span>
              </div>
            </div>

            {/* 2. Student Video Observation Submission Studio */}
            <div style={{
              background: '#ffffff',
              border: currentDayValidation.status === 'approved' ? '2px solid #10b981' : currentDayValidation.status === 'pending' ? '2px solid #f59e0b' : '2px solid #8b5cf6',
              borderRadius: 16,
              padding: '1.75rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    ✍️ Submit Observed Content from the Video & Reading Passage Story
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Submit what you observed from the video animation and the reading passage. Staff approval is required to unlock Day {day + 1}.
                  </span>
                </div>

                {/* Status Badge */}
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: currentDayValidation.status === 'approved' ? '#dcfce7' : currentDayValidation.status === 'pending' ? '#fef3c7' : currentDayValidation.status === 'rejected' ? '#fee2e2' : '#f1f5f9',
                  color: currentDayValidation.status === 'approved' ? '#15803d' : currentDayValidation.status === 'pending' ? '#b45309' : currentDayValidation.status === 'rejected' ? '#b91c1c' : '#475569'
                }}>
                  {currentDayValidation.status === 'approved' ? '✅ Approved by Staff' : currentDayValidation.status === 'pending' ? '⏳ Awaiting Staff Approval' : currentDayValidation.status === 'rejected' ? '❌ Revision Requested' : '⚠️ Pending Your Submission'}
                </span>
              </div>

              {/* Feedback Alert from Staff if present */}
              {currentDayValidation.staffFeedback && (
                <div style={{
                  background: currentDayValidation.status === 'approved' ? '#f0fdf4' : '#fff1f2',
                  border: currentDayValidation.status === 'approved' ? '1px solid #86efac' : '1px solid #fecdd3',
                  borderRadius: 10,
                  padding: '12px 16px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  color: currentDayValidation.status === 'approved' ? '#14532d' : '#9f1239'
                }}>
                  <strong>Staff Reviewer Feedback:</strong> "{currentDayValidation.staffFeedback}"
                </div>
              )}

              {/* Textarea for Observation */}
              <textarea
                value={videoObservationText}
                onChange={(e) => setVideoObservationText(e.target.value)}
                placeholder="Write in English what you observed from both this YouTube video and the reading story passage:
1. Video Story Observation: What characters, dialogue, and struggles did you watch?
2. Reading Passage Observation: What key points and insights did you observe from reading the text?
3. Integrated Moral: What is the core lesson and your personal reflection?..."
                rows={7}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  marginBottom: '0.75rem',
                  transition: 'border 0.2s'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {videoObservationText.trim().split(/\s+/).filter(Boolean).length} words written • Recommended: 30+ words
                </span>

                <button
                  onClick={handleVideoObservationSubmit}
                  disabled={videoSubmitting}
                  style={{
                    background: currentDayValidation.status === 'approved' ? '#10b981' : '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 22px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <Send size={16} /> {videoSubmitting ? 'Submitting to Staff...' : currentDayValidation.status ? 'Update Observation Submission' : 'Submit Observation to Staff'}
                </button>
              </div>

              {/* Submission confirmation toast */}
              {videoSubmitSuccess && (
                <div style={{ marginTop: '1rem', padding: '10px 14px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, color: '#166534', fontSize: '0.88rem', fontWeight: 700 }}>
                  🎉 Your video observation has been submitted successfully to the staff portal! Your instructor will verify and approve your submission to unlock Day {day + 1}.
                </div>
              )}
            </div>

            {/* 4. Staff Direct Action Panel (Visible to Staff / Admin) */}
            {isStaffUser && (
              <div style={{ background: '#fdf4ff', border: '2px solid #d946ef', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <strong style={{ fontSize: '0.95rem', color: '#86198f', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🛡️ Staff Evaluation Panel (Staff / Instructor Mode)
                  </strong>
                  <span style={{ fontSize: '0.8rem', background: '#f5d0fe', color: '#701a75', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    Instructor Controls
                  </span>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: '#4a044e' }}>
                  As an instructor, you can review the student's video observation and approve or request revision to unlock Day {day + 1} class:
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleStaffApproveVideo('approved')}
                    style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <CheckCheck size={16} /> Approve & Unlock Day {day + 1}
                  </button>
                  <button
                    onClick={() => handleStaffApproveVideo('rejected')}
                    style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <X size={16} /> Request Revision
                  </button>
                </div>
              </div>
            )}

            {/* 5. Next Day Navigation (Only enabled when approved) */}
            {currentDayValidation.status === 'approved' && (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>
                <CheckCircle2 size={36} color="#16a34a" style={{ marginBottom: 6 }} />
                <h3 style={{ margin: '0 0 4px', fontSize: '1.25rem', color: '#14532d', fontWeight: 800 }}>
                  Day {day} Story Learning Approved! 🎉
                </h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#166534' }}>
                  {day < 3
                    ? `Your staff instructor has approved your observations. Day ${day + 1} class is now unlocked!`
                    : 'Your staff instructor has approved your observations. You have successfully mastered Day 3 HR Interview Communication!'}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate(day < 3 ? `spoko_story_day${day + 1}` : 'spoko_story_day1', 'story_reading')}
                  style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 800 }}
                >
                  {day < 3 ? `Proceed to Day ${day + 1} Class →` : 'Review Day 1 Story Class'}
                </button>
              </div>
            )}

          </div>
        </SectionCard>
      )}

    </AnimatePresence>
  );
}
