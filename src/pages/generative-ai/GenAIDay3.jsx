import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import tokenizerImg from '../../assets/llm_tokenizer_visual.png';
import temperatureImg from '../../assets/temperature_explained.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// ─── CONTEXT WINDOW MODELS ────────────────────────────────────────────────────
const CONTEXT_MODELS = [
  { name: 'GPT-3.5', tokens: 4000,    max: 1000000, color: '#10b981', maker: 'OpenAI', note: 'Older, fast, affordable' },
  { name: 'GPT-4',   tokens: 128000,  max: 1000000, color: '#4f46e5', maker: 'OpenAI', note: 'Most capable standard model' },
  { name: 'Claude 3',tokens: 200000,  max: 1000000, color: '#8b5cf6', maker: 'Anthropic', note: 'Longest memory for documents' },
  { name: 'Gemini 1.5',tokens:1000000,max: 1000000, color: '#f59e0b', maker: 'Google', note: 'Full books, entire codebases' },
];

// ─── TEMPERATURE PRESETS ──────────────────────────────────────────────────────
const TEMP_EXAMPLES = [
  {
    range: '0.0 – 0.3',
    label: '🧊 Precise & Factual',
    color: '#0ea5e9',
    bg: '#eff6ff',
    use: 'Code generation, data extraction, medical diagnosis',
    sample: 'Q: What is the capital of France?\nA: Paris.',
    desc: 'Very deterministic — almost the same answer every time. Great for tasks where accuracy matters more than creativity.'
  },
  {
    range: '0.4 – 0.7',
    label: '⚖️ Balanced',
    color: '#10b981',
    bg: '#f0fdf4',
    use: 'Chatbots, customer support, general writing assistance',
    sample: 'Q: Describe a sunset.\nA: The sky painted itself in warm shades of orange and pink as the sun dipped below the horizon.',
    desc: 'A good middle ground — coherent and relevant but with natural variety in phrasing. Default for most applications.'
  },
  {
    range: '0.8 – 2.0',
    label: '🔥 Creative & Wild',
    color: '#ef4444',
    bg: '#fef2f2',
    use: 'Story writing, brainstorming, poetry, creative campaigns',
    sample: 'Q: Describe a sunset.\nA: The universe bled gold, the clouds catching fire like forgotten gods screaming beauty into the dark.',
    desc: 'Highly random and imaginative. The AI takes risks. Some outputs are brilliant — some are nonsense. Perfect for creative work.'
  }
];

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: 'What is a "token" in the context of LLMs?',
    opts: ['A full sentence the model processes', 'A word or word-piece the model reads — roughly 3/4 of a word on average', 'A binary digit (0 or 1) in the model'],
    ans: 1
  },
  {
    q: 'The sentence "unbelievable" is likely split into how many tokens?',
    opts: ['1 token (it\'s one word)', '2-3 tokens (un + believ + able)', '10 tokens (one per letter)'],
    ans: 1
  },
  {
    q: 'What does the "context window" represent in an LLM?',
    opts: ['The screen size of the AI interface', 'The maximum amount of text (tokens) the AI can read and remember at once', 'The number of GPUs used to run the model'],
    ans: 1
  },
  {
    q: 'If your context window is full and you keep chatting, what happens?',
    opts: ['The model crashes', 'The oldest messages are forgotten to make room for new ones', 'The model saves everything to disk'],
    ans: 1
  },
  {
    q: 'Which model has the largest context window as of 2024?',
    opts: ['GPT-3.5 (4K tokens)', 'GPT-4 (128K tokens)', 'Gemini 1.5 (1 million tokens)'],
    ans: 2
  },
  {
    q: 'What does setting temperature = 0.0 mean?',
    opts: ['The model turns off', 'The model gives the most likely, deterministic answer every time', 'The model only responds in formal English'],
    ans: 1
  },
  {
    q: 'You are building a medical diagnosis assistant. Which temperature should you use?',
    opts: ['2.0 — for creative, varied responses', '0.1 — for precise, consistent, factual answers', '1.5 — for imaginative medical stories'],
    ans: 1
  },
  {
    q: 'Why do LLMs convert text into tokens (numbers) instead of working with raw text?',
    opts: [
      'Because computers can only process numbers mathematically — not raw letters',
      'To make the text smaller in file size',
      'To hide the user\'s data for privacy'
    ],
    ans: 0
  }
];

export default function GenAIDay3({ onNavigate, openAITutor }) {
  const [temperature, setTemperature] = useState(0.7);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [predictionGameChoice, setPredictionGameChoice] = useState(null);
  const [activeTab, setActiveTab] = useState('intro');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTempPreset = (t) => {
    if (t <= 0.35) return TEMP_EXAMPLES[0];
    if (t <= 0.75) return TEMP_EXAMPLES[1];
    return TEMP_EXAMPLES[2];
  };
  const currentPreset = getTempPreset(temperature);

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  const SUB_TABS = [
    { id: 'intro', label: '📋 Overview' },
    { id: 'what_is_llm', label: '🧠 What is an LLM?' },
    { id: 'tokens', label: '🧩 What Are Tokens?' },
    { id: 'context_window', label: '🧠 Context Window' },
    { id: 'temperature', label: '🌡️ Temperature' },
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
                background: isActive ? '#7c3aed' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.2)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 3 • LLMs, TOKENS & PARAMETERS
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Understanding LLMs — Tokens, Context Window & Temperature
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Ever wonder how ChatGPT "reads" your message? Or why it sometimes forgets what you said earlier? Today we demystify how Large Language Models actually work — from turning words into numbers, to memory limits and creativity dials.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 3 Goal:</strong> Understand how LLMs process text (tokens), how much they can remember (context window), and how to control their creativity (temperature).
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: '🧩', label: 'Tokens', sub: 'How LLMs "read" text as numbered pieces', color: '#7c3aed' },
                { icon: '🧠', label: 'Context Window', sub: 'The AI\'s short-term memory limit', color: '#0ea5e9' },
                { icon: '🌡️', label: 'Temperature', sub: 'The creativity vs. accuracy dial', color: '#ef4444' },
              ].map(({ icon, label, sub, color }) => (
                <div key={label} style={{ background: 'white', border: `2px solid ${color}22`, borderTop: `4px solid ${color}`, padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{icon}</div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('what_is_llm')}>Start: What is an LLM? <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── WHAT IS AN LLM? ───────────────────────────────────────────── */}
        {activeTab === 'what_is_llm' && (
          <motion.div key="what_is_llm" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🧠 What is a Large Language Model (LLM)?</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              An LLM is a deep learning system trained on vast amounts of text data to understand, generate, and reason with human language.
            </p>

            {/* The Autocomplete Analogy */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#e0d9ff', fontWeight: 700, marginBottom: '0.6rem' }}>💡 Simple Definition</div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                At its absolute core, an LLM is a **super-advanced autocomplete engine**. 
                Just like your phone keyboard tries to guess the next word you want to type, an LLM looks at all the text you've written (the prompt) and **calculates the mathematical probability** of what the next word should be. It repeats this process word-by-word to write full sentences, code, or stories.
              </p>
            </div>

            {/* Interactive Predict the Next Word Game */}
            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.5rem 0' }}>🎛️ Interactive Prediction Sandbox</h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 1.2rem 0' }}>
                See how a model calculates the next token. Click a word below to complete the sentence:
              </p>

              {/* Prompt bar */}
              <div style={{ background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontFamily: 'monospace' }}>[PROMPT]</span>
                <span style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>
                  "The weather forecast says it will rain today, so I should bring my..."
                </span>
                <span style={{ background: predictionGameChoice ? '#10b981' : '#7c3aed', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace', animation: predictionGameChoice ? 'none' : 'pulse 1.5s infinite' }}>
                  {predictionGameChoice ? predictionGameChoice.word : ' [ ? ] '}
                </span>
              </div>

              {/* Option probabilities */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
                {[
                  { word: 'umbrella', prob: '82%', desc: 'Highly logical', color: '#10b981' },
                  { word: 'jacket', prob: '12%', desc: 'Reasonable', color: '#3b82f6' },
                  { word: 'sunglasses', prob: '2%', desc: 'Contradictory', color: '#f59e0b' },
                  { word: 'cactus', prob: '0.01%', desc: 'Random nonsense', color: '#ef4444' },
                ].map((opt) => (
                  <button
                    key={opt.word}
                    onClick={() => setPredictionGameChoice(opt)}
                    style={{
                      background: 'white',
                      border: `2px solid ${predictionGameChoice?.word === opt.word ? opt.color : '#e2e8f0'}`,
                      borderRadius: '12px',
                      padding: '1rem 0.5rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: predictionGameChoice?.word === opt.word ? `0 4px 12px ${opt.color}22` : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{opt.word}</div>
                    <div style={{ fontSize: '0.78rem', color: opt.color, fontWeight: 700, margin: '0.2rem 0' }}>Probability: {opt.prob}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>

              {predictionGameChoice && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#14532d', lineHeight: 1.5 }}>
                  🎉 <strong>Explanation:</strong> You completed the sentence with <strong>"{predictionGameChoice.word}"</strong>. An LLM works exactly like this! It scores every word in its dictionary, and samples from the highest probability options (tempered by your temperature settings) to generate its final output.
                </div>
              )}
            </div>

            {/* Parameters and Training explanation cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Concept 1: Parameters */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ⚙️ What are Parameters?
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  Parameters are the internal mathematical settings (connections or "knobs") inside the neural network. 
                  During training, the model adjusts these settings trillions of times. The more parameters a model has, the more complex patterns, logic, and facts it can memorize.
                  <br/><br/>
                  • <strong>GPT-3</strong>: 175 Billion parameters.<br/>
                  • <strong>GPT-4</strong>: Estimated over 1 Trillion parameters.
                </p>
              </div>

              {/* Concept 2: The Two Training Steps */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🏋️ How LLMs are Trained
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  Building a chatbot requires two distinct training steps:
                  <br/><br/>
                  1. <strong>Pre-Training (Reading)</strong>: The model reads raw text on the internet to learn grammar, vocabulary, facts, and code. This creates a raw, unstructured "Base Model".
                  <br/><br/>
                  2. <strong>Alignment (RLHF)</strong>: Humans grade the model's outputs. It learns to be helpful, reject harmful prompts, and follow a conversational chatbot format.
                </p>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('tokens')}>Next: What are Tokens? <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 2. TOKENS ────────────────────────────────────────────────── */}
        {activeTab === 'tokens' && (
          <motion.div key="tokens" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🧩 What Are Tokens?</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              LLMs don't read words like you do. They break everything into <strong>tokens</strong> — small chunks of text — and convert them into numbers before processing.
            </p>

            {/* Simple Analogy */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#c4b5fd', fontWeight: 700, marginBottom: '0.6rem' }}>💡 Think of it this way</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                Imagine breaking a sentence into LEGO bricks before feeding it to the model. Each brick is a token. The model only understands these bricks — not the original sentence. It converts each brick into a number (like a code), then does math on those numbers to predict what comes next.
              </p>
            </div>

            {/* Interactive Token Visualizer */}
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem' }}>
                🔬 Live Token Visualizer — hover any token
              </div>
              {/* Token Sentence */}
              {[
                { text: 'The', id: 1342, color: '#818cf8' },
                { text: 'cat', id: 8821, color: '#38bdf8' },
                { text: 'sat', id: 3712, color: '#34d399' },
                { text: 'on', id: 665, color: '#fbbf24' },
                { text: 'the', id: 1342, color: '#f87171' },
                { text: 'mat', id: 9041, color: '#c084fc' },
              ].map((token, idx) => (
                <span
                  key={idx}
                  title={`Token ID: ${token.id}`}
                  style={{ display: 'inline-block', background: `${token.color}22`, border: `1.5px solid ${token.color}`, color: token.color, padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', marginRight: '0.6rem', marginBottom: '0.6rem', cursor: 'default', fontFamily: 'monospace', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.target.style.background = token.color; e.target.style.color = 'white'; e.target.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.target.style.background = `${token.color}22`; e.target.style.color = token.color; e.target.style.transform = 'scale(1)'; }}
                >
                  {token.text}
                  <sup style={{ fontSize: '0.6rem', marginLeft: '4px', opacity: 0.8 }}>#{token.id}</sup>
                </span>
              ))}
              <div style={{ borderTop: '1px solid #1e293b', marginTop: '1.2rem', paddingTop: '1rem', color: '#64748b', fontSize: '0.82rem' }}>
                <span style={{ color: '#94a3b8' }}>Hover each token to highlight it → It maps to a Token ID number → The model does math on these IDs</span>
              </div>
            </div>

            {/* Key facts grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {[
                { title: '1 Token ≈ ¾ of a word', detail: '"Hello" = 1 token. "unbelievable" = 3 tokens: un + believ + able. Rare or long words split into more pieces.', color: '#7c3aed', icon: '🔤' },
                { title: '100 tokens ≈ 75 words', detail: 'A typical paragraph is ~100 tokens. A short story is ~2,000 tokens. A novel is ~200,000 tokens.', color: '#0ea5e9', icon: '📏' },
                { title: 'Pricing is per token', detail: 'GPT-4 charges per 1,000 tokens. Longer prompts cost more. Efficient prompting saves money.', color: '#f59e0b', icon: '💰' },
                { title: 'Numbers are model-specific', detail: 'GPT-4 and Gemini use different token IDs for the same word. Every model has its own "vocabulary" (tokenizer).', color: '#10b981', icon: '🗺️' },
              ].map(({ title, detail, color, icon }) => (
                <div key={title} style={{ background: 'white', border: `1px solid ${color}33`, borderRadius: '14px', padding: '1.3rem', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                    <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{title}</strong>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{detail}</p>
                </div>
              ))}
            </div>

            {/* Explanation Image */}
            <div
              onClick={() => setZoomedImg(tokenizerImg)}
              style={{ cursor: 'zoom-in', borderRadius: '16px', overflow: 'hidden', border: '2px solid #7c3aed33', marginBottom: '1.5rem', background: '#0f172a' }}
            >
              <img src={tokenizerImg} alt="LLM Tokenizer Diagram" style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'contain' }} />
              <div style={{ background: '#0f172a', padding: '0.6rem 1rem', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
                🔍 Click to zoom — How LLMs tokenize and convert text to numbers
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('context_window')}>Context Window <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 3. CONTEXT WINDOW ────────────────────────────────────────── */}
        {activeTab === 'context_window' && (
          <motion.div key="context_window" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🧠 Context Window — The AI's Memory</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              The context window is the maximum number of tokens an LLM can "see" and remember at once in a conversation.
            </p>

            {/* Analogy */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#bae6fd', fontWeight: 700, marginBottom: '0.6rem' }}>💡 Simple Analogy</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                Imagine the AI is a student reading through a <strong style={{ color: '#ffffff' }}>very long paper</strong>, but they can only hold a <strong style={{ color: '#ffffff' }}>certain number of pages in front of them at once</strong>. When a new page comes in from the right, the oldest page slides off the left and is forgotten. That "reading desk" is the context window.
              </p>
            </div>

            {/* Memory Tape Visual */}
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '2rem', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.2rem' }}>📼 Context Window — Memory Tape</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {/* Forgotten messages */}
                {['Msg 1', 'Msg 2', 'Msg 3'].map((m) => (
                  <div key={m} style={{ background: '#1e293b', border: '1px dashed #334155', padding: '0.5rem 0.8rem', borderRadius: '8px', color: '#475569', fontSize: '0.72rem', fontWeight: 600, flexShrink: 0, opacity: 0.5 }}>
                    {m} <br/><span style={{ fontSize: '0.6rem' }}>FORGOTTEN</span>
                  </div>
                ))}
                <div style={{ color: '#475569', fontSize: '1.2rem', flexShrink: 0 }}>···</div>
                {/* Active context window */}
                <div style={{ position: 'relative', border: '2px solid #38bdf8', borderRadius: '12px', padding: '0.8rem', display: 'flex', gap: '6px', flexShrink: 0, background: '#0f172a' }}>
                  <div style={{ fontSize: '0.55rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', position: 'absolute', top: '-7px', left: '10px', background: '#0f172a', padding: '0 0.4rem' }}>← Active Context Window →</div>
                  {[
                    { label: 'User: What is Python?', color: '#818cf8' },
                    { label: 'AI: Python is...', color: '#34d399' },
                    { label: 'User: Give example', color: '#818cf8' },
                    { label: 'AI: print("Hello")', color: '#34d399' },
                    { label: 'User: Explain loops', color: '#818cf8' },
                    { label: 'AI: A loop repeats...', color: '#34d399' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: `${item.color}22`, border: `1px solid ${item.color}55`, padding: '0.5rem 0.7rem', borderRadius: '8px', color: item.color, fontSize: '0.65rem', fontWeight: 600, flexShrink: 0, maxWidth: '90px', lineHeight: 1.4 }}>
                      {item.label}
                    </div>
                  ))}
                </div>
                <div style={{ color: '#38bdf8', fontSize: '0.85rem', flexShrink: 0, marginLeft: '6px' }}>← New msgs push in</div>
              </div>
            </div>

            {/* Model comparison */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 1.5rem 0', fontSize: '1rem' }}>📊 Context Window Comparison (2024)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {CONTEXT_MODELS.map((m) => {
                  const pct = Math.min((m.tokens / m.max) * 100, 100);
                  const pctDisplay = m.tokens >= 1000000 ? '1M' : m.tokens >= 1000 ? `${(m.tokens/1000).toFixed(0)}K` : m.tokens;
                  return (
                    <div key={m.name}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 2fr', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                          <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{m.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>by {m.maker}</span>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <span style={{ background: `${m.color}22`, color: m.color, padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block' }}>{pctDisplay} tokens</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'right' }}>
                          {m.note}
                        </div>
                      </div>
                      <div style={{ background: '#f1f5f9', borderRadius: '99px', height: '10px', overflow: 'hidden' }}>
                        <div style={{ background: m.color, width: `${pct}%`, height: '100%', borderRadius: '99px', transition: 'width 0.5s ease', minWidth: '2%' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '1rem', marginBottom: 0 }}>
                💡 GPT-3.5 (4K tokens) can hold ~3,000 words. Gemini 1.5 (1M tokens) can process an entire novel or a large codebase in one shot.
              </p>
            </div>

            {/* Why it matters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1.3rem', borderRadius: '14px' }}>
                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.88rem', marginBottom: '0.6rem' }}>⚠️ When context runs out</div>
                <ul style={{ color: '#7f1d1d', fontSize: '0.82rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                  <li>AI forgets earlier messages</li>
                  <li>Gives contradictory answers</li>
                  <li>Can't reference your original instruction</li>
                  <li>Long documents get cut off</li>
                </ul>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.3rem', borderRadius: '14px' }}>
                <div style={{ fontWeight: 800, color: '#15803d', fontSize: '0.88rem', marginBottom: '0.6rem' }}>✅ Practical tips</div>
                <ul style={{ color: '#14532d', fontSize: '0.82rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                  <li>Start a new chat for unrelated topics</li>
                  <li>Summarize long chats and paste the summary</li>
                  <li>Use Gemini 1.5 for huge document analysis</li>
                  <li>Trim your system prompt to save space</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('temperature')}>Temperature <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 4. TEMPERATURE ───────────────────────────────────────────── */}
        {activeTab === 'temperature' && (
          <motion.div key="temperature" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🌡️ Temperature — The Creativity Dial</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Temperature controls how <strong>random</strong> or <strong>predictable</strong> the AI's responses are. It's a number from 0.0 to 2.0.
            </p>

            {/* Analogy */}
            <div style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#fca5a5', fontWeight: 700, marginBottom: '0.6rem' }}>💡 Simple Analogy</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                Think of it like a <strong style={{ color: '#fff' }}>creativity knob</strong> on a music mixer. At <strong style={{ color: '#fef08a' }}>low temperature (0)</strong>, the AI plays the safest, most predictable note every time — like a classical pianist strictly following sheet music. At <strong style={{ color: '#fef08a' }}>high temperature (2)</strong>, it improvises wildly — like a jazz musician riffing freely. Great for art, risky for facts.
              </p>
            </div>

            {/* Interactive Slider */}
            <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>🎛️ Interactive Temperature Explorer</h4>
                <div style={{ background: currentPreset.color, color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontWeight: 800, fontSize: '1rem' }}>
                  {temperature.toFixed(1)}
                </div>
              </div>

              {/* Slider */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <input
                  type="range" min="0" max="2" step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: currentPreset.color, height: '6px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  <span>0.0 — Precise</span>
                  <span>0.7 — Balanced</span>
                  <span>2.0 — Creative</span>
                </div>
              </div>

              {/* Dynamic result card */}
              <div style={{ background: currentPreset.bg, border: `2px solid ${currentPreset.color}55`, borderRadius: '14px', padding: '1.5rem', transition: 'all 0.3s' }}>
                <div style={{ fontWeight: 800, color: currentPreset.color, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{currentPreset.label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Best used for</div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>{currentPreset.use}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>What happens</div>
                    <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.5 }}>{currentPreset.desc}</div>
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>🤖 Sample Output at {temperature.toFixed(1)}</div>
                  <pre style={{ color: '#a7f3d0', fontSize: '0.82rem', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.6 }}>{currentPreset.sample}</pre>
                </div>
              </div>
            </div>

            {/* Temperature image */}
            <div
              onClick={() => setZoomedImg(temperatureImg)}
              style={{ cursor: 'zoom-in', borderRadius: '16px', overflow: 'hidden', border: '2px solid #ef444433', marginBottom: '1.5rem', background: '#0f172a' }}
            >
              <img src={temperatureImg} alt="Temperature Explained Diagram" style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'contain' }} />
              <div style={{ background: '#0f172a', padding: '0.6rem 1rem', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
                🔍 Click to zoom — AI Temperature Spectrum Explained
              </div>
            </div>

            {/* Quick reference */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {TEMP_EXAMPLES.map((t) => (
                <div key={t.range} style={{ background: t.bg, border: `1px solid ${t.color}33`, borderRadius: '12px', padding: '1rem', borderTop: `3px solid ${t.color}` }}>
                  <div style={{ fontWeight: 800, color: t.color, fontSize: '0.82rem', marginBottom: '0.3rem' }}>{t.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.3rem' }}>{t.range}</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>{t.use}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Day 3 Assignment <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ─────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 3 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Answer these 3 short practical tasks to confirm you understand Tokens, Context Window, and Temperature.
            </p>

            {[
              {
                num: '1', emoji: '🧩', title: 'Token Count Estimation',
                simple: 'Estimate how many tokens the sentence below contains.',
                example: '"Artificial intelligence is transforming every industry at an unprecedented speed."\n→ Count: approximately ___ tokens\n→ Hint: count words and add ~20% for sub-word splits.',
                tip: 'Rule of thumb: 1 token ≈ 0.75 words.',
                color: '#7c3aed'
              },
              {
                num: '2', emoji: '🧠', title: 'Context Window Scenario',
                simple: 'Explain in your own words what would happen in this situation.',
                example: 'You are using GPT-3.5 (4K token limit) for a 10,000-word document analysis.\nQuestion: What problems will you face? How would you solve them?',
                tip: 'Think about what gets forgotten and what strategies help.',
                color: '#0ea5e9'
              },
              {
                num: '3', emoji: '🌡️', title: 'Temperature Choice',
                simple: 'For each task below, write the best temperature (0.0–2.0):',
                example: 'Task A: Generating a SQL query from user input → Temperature: ___\nTask B: Writing a creative product tagline → Temperature: ___\nTask C: A customer service chatbot → Temperature: ___',
                tip: 'Think: does this task need precision or creativity?',
                color: '#ef4444'
              }
            ].map(({ num, emoji, title, simple, example, tip, color }) => (
              <div key={num} style={{ background: 'white', border: `1px solid ${color}33`, borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ background: `${color}11`, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: `1px solid ${color}22` }}>
                  <div style={{ background: color, color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>{num}</div>
                  <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{title}</div>
                    <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{simple}</div>
                  </div>
                </div>
                <div style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ background: '#0f172a', padding: '0.8rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.82rem', color: '#a7f3d0', marginBottom: '0.6rem', whiteSpace: 'pre-wrap' }}>{example}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>💬 <em>{tip}</em></div>
                </div>
              </div>
            ))}

            <div style={{ background: 'white', border: '2px solid #7c3aed', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.2rem' }}>
              <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>✍️ Write your answers below:</h4>
              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`TASK 1 - Token Count:\n[Your answer]\n\nTASK 2 - Context Window Scenario:\n[Your answer]\n\nTASK 3 - Temperature Choices:\nTask A: Temperature = \nTask B: Temperature = \nTask C: Temperature = `}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e9d5ff', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#7c3aed', borderColor: '#7c3aed', marginBottom: '1rem' }}
            >
              {assignmentSubmitted ? '✓ Assignment Submitted!' : 'Submit Assignment'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#f3e8ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎉</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#4c1d95', fontSize: '0.95rem' }}>Well done! Assignment complete.</div>
                  <div style={{ color: '#6d28d9', fontSize: '0.85rem' }}>Now test your understanding in the quiz.</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted}>
                Start Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 3 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — select an answer then submit.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #e2e8f0', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#f3e8ff'; border = '1.5px solid #7c3aed'; color = '#4c1d95'; }
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

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {!quizSubmitted ? (
                <button className="btn btn-primary" onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Excellent!' : '📖 Review & retry!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>Retry Quiz</button>
                </>
              )}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)', border: '1px solid #c4b5fd', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f172a' }}>🎉 Day 3 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You now understand Tokens, Context Window & Temperature. Next: Embeddings & Vector Stores.</p>
              </div>
              <button onClick={() => handleContinue('intro')} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Zoom Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomedImg(null)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15,23,42,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out', padding: '2rem', boxSizing: 'border-box' }}
          >
            <button onClick={() => setZoomedImg(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <X size={18} color="#0f172a" />
            </button>
            <motion.img
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              src={zoomedImg}
              alt="Zoomed diagram"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '16px', objectFit: 'contain', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
