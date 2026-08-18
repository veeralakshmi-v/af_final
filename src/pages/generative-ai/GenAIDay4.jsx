import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, HelpCircle, Layers, Shield, Search, Sliders } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

// ─── POPULAR MODELS DATA ──────────────────────────────────────────────────────
const POPULAR_MODELS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (GPT-4)',
    maker: 'OpenAI',
    type: 'Proprietary (Closed Source)',
    icon: '🤖',
    color: '#10b981',
    highlight: 'Frontier Coding & Logical Reasoning',
    strength: 'General reasoning, coding, and logical breakdown',
    weakness: 'Can be overly verbose; strict alignment guardrails',
    desc: 'The model that started the consumer AI wave. GPT-4 is exceptional at complex problem-solving, generating high-quality source code, and interpreting structured datasets.',
    fact: 'Uses Reinforcement Learning from Human Feedback (RLHF) to behave like a helpful assistant.'
  },
  {
    id: 'claude',
    name: 'Claude 3',
    maker: 'Anthropic',
    type: 'Proprietary (Closed Source)',
    icon: '✍️',
    color: '#d97706',
    highlight: 'Superior Writing & 200K Context Memory',
    strength: 'Long document analysis, technical writing, and nuances',
    weakness: 'Slightly slower response speeds for large tasks',
    desc: 'Created by Anthropic with a focus on "Constitutional AI" (safety guidelines written into the model\'s constitution). Highly praised for writing in a warm, natural, human voice.',
    fact: 'Can read up to 200,000 tokens of text at once — equal to a whole textbook.'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    maker: 'Google',
    type: 'Proprietary (Closed Source)',
    icon: '♊',
    color: '#2563eb',
    highlight: 'Native Multimodal & 2M Context Memory',
    strength: 'Multimodal processing (native video, audio, image support)',
    weakness: 'Can hallucinate links or citations in web queries',
    desc: 'Google\'s flagship model built from the ground up to be multimodal. It doesn\'t just convert audio or video to text first; it understands sound waves and pixel frames directly.',
    fact: 'Gemini 1.5 Pro features a massive 2 million token context window.'
  },
  {
    id: 'llama',
    name: 'Llama 3',
    maker: 'Meta',
    type: 'Open Weights (Open Source-ish)',
    icon: '🦙',
    color: '#ec4899',
    highlight: 'Most Popular Customizable Open Model',
    strength: 'Fully customizable, hostable on local hardware, free',
    weakness: 'Requires technical setup and cloud servers to run at scale',
    desc: 'Meta released Llama to the public for free, triggering a massive wave of open-source AI development. Developers can download Llama, train it on private data, and run it locally without an internet connection.',
    fact: 'Meta spends hundreds of millions on compute power just to give the resulting weights away.'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    maker: 'Perplexity',
    type: 'Search Engine AI',
    icon: '🔍',
    color: '#06b6d4',
    highlight: 'Real-Time Cited Web Search',
    strength: 'Real-time facts, current events, automatic citations',
    weakness: 'Not built for coding from scratch or long creative stories',
    desc: 'An AI-native search engine. Instead of chatting with general historical facts, Perplexity searches the live web for every query, summarizes the findings, and cites every source with clickable links.',
    fact: 'Aggregates outputs using various models (GPT-4, Claude) underneath.'
  },
  {
    id: 'mistral',
    name: 'Mistral / Mixtral',
    maker: 'Mistral AI (France)',
    type: 'Open Weights / Proprietary',
    icon: '🇪🇺',
    color: '#f97316',
    highlight: 'Fast European Mixture-of-Experts',
    strength: 'High efficiency, fast response times, multilingual',
    weakness: 'Less reasoning power than frontier models like GPT-4',
    desc: 'A European champion in generative AI. They specialize in "Mixture of Experts" (MoE) architectures, which route questions to sub-specialized parts of the model, saving processing power and reducing compute costs.',
    fact: 'Runs surprisingly fast on small hardware resources.'
  },
  {
    id: 'grok',
    name: 'Grok',
    maker: 'xAI (Elon Musk)',
    type: 'Proprietary',
    icon: '✖️',
    color: '#0f172a',
    highlight: 'Real-Time X Data & Witty Persona',
    strength: 'Real-time access to X posts/trends, humorous persona',
    weakness: 'Can include unverified news or tweets as fact',
    desc: 'Trained to answer questions with a bit of wit and has a rebellious streak. Its unique value is direct integration with the live stream of global posts on the X platform.',
    fact: 'Designed to answer spicy questions that other AI models refuse.'
  }
];

// ─── COMPARISON FILTERS ───────────────────────────────────────────────────────
const USE_CASES = [
  { id: 'code', label: '💻 Coding & Logic', best: 'chatgpt', why: 'GPT-4 is currently the most robust model for debugging and writing code.' },
  { id: 'document', label: '📄 Large PDF Analysis', best: 'claude', why: 'Claude\'s huge context window allows it to process whole files in seconds.' },
  { id: 'multimodal', label: '🎥 Native Video / Audio', best: 'gemini', why: 'Gemini excels because it natively interprets video files and sounds.' },
  { id: 'privacy', label: '🔒 Offline / Private hosting', best: 'llama', why: 'Llama can be downloaded and hosted on your company\'s private server.' },
  { id: 'search', label: '🔍 Live Web Research', best: 'perplexity', why: 'Perplexity summarizes live web data and automatically cites sources.' }
];

// ─── QUIZ QUESTIONS ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: 'Which model is open-weights (free to download, modify, and host locally)?',
    opts: ['ChatGPT (GPT-4)', 'Llama 3', 'Claude 3'],
    ans: 1
  },
  {
    q: 'What is unique about Perplexity AI compared to general chat models?',
    opts: ['It is hosted entirely on local laptops', 'It search the live web and automatically cites sources with clickable links', 'It only generates images'],
    ans: 1
  },
  {
    q: 'Anthropic\'s Claude 3 is famous for which particular strength?',
    opts: ['Offline execution', 'Large context memory (up to 200K tokens) and natural human tone', 'Real-time tweets integration'],
    ans: 1
  },
  {
    q: 'Which company created the multimodal Gemini model?',
    opts: ['Meta', 'Google', 'OpenAI'],
    ans: 1
  },
  {
    q: 'What is a "Mixture of Experts" (MoE) architecture (like Mistral)?',
    opts: ['Having humans read the model outputs in real time', 'Routing inputs to sub-specialized parts of the model to save processing costs', 'Combining OpenAI and Google models into one single app'],
    ans: 1
  },
  {
    q: 'Grok has direct access to real-time data from which platform?',
    opts: ['Wikipedia', 'Google Search', 'X (formerly Twitter)'],
    ans: 2
  },
  {
    q: 'If a company has strict privacy rules and cannot send customer data over the internet, which model should they choose?',
    opts: ['Llama 3 (downloaded and hosted locally)', 'ChatGPT API', 'Gemini Web Interface'],
    ans: 0
  },
  {
    q: 'Who developed the famous ChatGPT / GPT-4 model?',
    opts: ['Meta', 'OpenAI', 'Anthropic'],
    ans: 1
  }
];

export default function GenAIDay4({ onNavigate, openAITutor }) {
  const [selectedModel, setSelectedModel] = useState(POPULAR_MODELS[0]);
  const [selectedUseCase, setSelectedUseCase] = useState(USE_CASES[0]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  const SUB_TABS = [
    { id: 'intro', label: '📋 Overview' },
    { id: 'models_explorer', label: '🚀 Model Explorer' },
    { id: 'recommendation_matrix', label: '📊 Recommendation Matrix' },
    { id: 'assignment', label: '📝 Assignment' },
    { id: 'quiz', label: '✍️ Quiz Assessment' }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">

        {/* ── 1. OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fbbf24" /> DAY 4 • AI LANDSCAPE
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                The AI Model Landscape — Who is Who?
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Not all AI models are created equal. Some models excel at logic, others read whole books in seconds, some can be hosted offline for privacy, and others search the live web. Let\'s explore the top AI models in 2024.
              </p>
              <div style={{ background: 'rgba(56,189,248,0.10)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#e2e8f0', fontSize: '0.92rem', borderLeft: '4px solid #38bdf8' }}>
                🎯 <strong style={{ color: '#38bdf8' }}>Day 4 Goal:</strong> <span style={{ color: '#f1f5f9' }}>Learn the core strengths, weaknesses, and license types of ChatGPT, Claude, Gemini, Llama, Perplexity, Mistral, and Grok.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('models_explorer')}>Explore Models <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 2. MODEL EXPLORER ────────────────────────────────────────── */}
        {activeTab === 'models_explorer' && (
          <motion.div key="models_explorer" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🤖 Popular AI Models</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2.5rem' }}>Select a model to see its builder, characteristics, and ideal use cases:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem' }}>
              {/* Left sidebar list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {POPULAR_MODELS.map((m) => {
                  const isSelected = selectedModel.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m)}
                      style={{
                        background: isSelected ? '#f1f5f9' : 'white',
                        border: `1.5px solid ${isSelected ? '#cbd5e1' : '#e2e8f0'}`,
                        padding: '1rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        color: isSelected ? '#0f172a' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
                      {m.name}
                    </button>
                  );
                })}
              </div>

              {/* Right detail panel */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: '#f8fafc', padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {selectedModel.icon} {selectedModel.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>by {selectedModel.maker}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      ✨ {selectedModel.highlight}
                    </span>
                    <span style={{ background: `${selectedModel.color}22`, color: selectedModel.color, padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {selectedModel.type}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Description</div>
                    <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{selectedModel.desc}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.82rem', marginBottom: '0.3rem' }}>🟢 Core Strength</div>
                      <p style={{ color: '#14532d', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{selectedModel.strength}</p>
                    </div>
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.82rem', marginBottom: '0.3rem' }}>🔴 Limitation</div>
                      <p style={{ color: '#7f1d1d', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{selectedModel.weakness}</p>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '10px', borderLeft: '4px solid #64748b', fontSize: '0.82rem', color: '#475569' }}>
                    ⚡ <strong>Fast Fact:</strong> {selectedModel.fact}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('recommendation_matrix')}>Recommendation Matrix <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 3. RECOMMENDATION MATRIX ─────────────────────────────────── */}
        {activeTab === 'recommendation_matrix' && (
          <motion.div key="recommendation_matrix" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🎛️ AI Recommendation Matrix</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              How do you choose the right model for your project? Click a use case to see the recommended system:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '1.8rem' }}>
              {USE_CASES.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => setSelectedUseCase(uc)}
                  style={{
                    background: selectedUseCase.id === uc.id ? '#0f172a' : 'white',
                    color: selectedUseCase.id === uc.id ? 'white' : '#475569',
                    border: `1.5px solid ${selectedUseCase.id === uc.id ? '#0f172a' : '#cbd5e1'}`,
                    padding: '0.8rem 0.4rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    textAlign: 'center',
                    transition: 'all 0.15s'
                  }}
                >
                  {uc.label}
                </button>
              ))}
            </div>

            {/* Recommendation Result Card */}
            {(() => {
              const modelObj = POPULAR_MODELS.find(m => m.id === selectedUseCase.best);
              return (
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <span style={{ background: `${modelObj.color}22`, color: modelObj.color, padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                      Best Choice
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>for {selectedUseCase.label}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{modelObj.icon}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{modelObj.name}</h3>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Developed by {modelObj.maker}</span>
                    </div>
                  </div>

                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    <strong>Why this model:</strong> {selectedUseCase.why}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                    {modelObj.desc}
                  </p>
                </div>
              );
            })()}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Day 4 Assignment <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 4 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Complete the comparison assessment below to show you understand target workflows:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Scenario: Setup an AI System for a Law Firm
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                You have been hired to configure AI for a corporate law firm. They have 2 key requirements:
                <br />
                1. They must analyze entire contracts of up to 100,000 words securely.
                2. They want to check live regulations web search updates automatically.
              </p>
              <div style={{ background: '#f8fafc', borderLeft: '3px solid #7c3aed', padding: '1rem', fontSize: '0.82rem', color: '#334155', marginBottom: '1rem' }}>
                <strong>Your Task:</strong> Write down which models (Claude, GPT-4, Llama, Perplexity, Gemini, etc.) you would recommend for each requirement and explain why in 2–3 sentences.
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`Requirement 1 (Contract Analysis):\nRecommended model: [Your choice]\nReasoning: [Write here]\n\nRequirement 2 (Live Regulations Web Search):\nRecommended model: [Your choice]\nReasoning: [Write here]`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 40 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Assignment Submitted!' : 'Submit Assignment'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Well done!</strong> Your layout analysis has been successfully recorded. Go ahead and take the quiz!
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted}>Start Assessment Quiz <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 4 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — select your answers:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#f1f5f9'; border = '1.5px solid #334155'; color = '#0f172a'; }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.65rem 0.9rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400 }}
                        >
                          {opt}
                          {quizSubmitted && isCorrect && <span style={{ float: 'right' }}>✓</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span style={{ float: 'right' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                >
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great Job!' : '📖 Review the lessons!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                    Retry Quiz
                  </button>
                </>
              )}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f172a' }}>🎉 Day 4 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You now understand the strengths of popular AI models.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
