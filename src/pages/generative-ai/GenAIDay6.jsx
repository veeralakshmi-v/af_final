import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// ─── PROMPT TYPES ─────────────────────────────────────────────────────────────
const PROMPT_TYPES = [
  {
    id: 'zero',
    name: 'Zero-Shot Prompting',
    icon: '🎯',
    color: '#4f46e5',
    tagline: 'Ask directly — no examples needed',
    what: 'You give the AI just the task, nothing else. You trust it already knows the topic from its training.',
    when: 'Use for simple, general tasks the AI is well-trained on.',
    example: {
      prompt: 'Translate this to French:\n"Good morning, how are you?"',
      response: 'Bonjour, comment allez-vous?'
    },
    tip: 'Best for: translation, summarization, basic Q&A.'
  },
  {
    id: 'few',
    name: 'Few-Shot Prompting',
    icon: '📋',
    color: '#0ea5e9',
    tagline: 'Show examples first, then ask',
    what: 'You give the AI 2–3 worked examples before your actual question. This teaches it the pattern you want.',
    when: 'Use when you need a specific format or style in the output.',
    example: {
      prompt: 'Classify as Positive or Negative:\n\nReview: "Great product!"\nSentiment: Positive\n\nReview: "Very disappointed."\nSentiment: Negative\n\nReview: "Works perfectly for me!"\nSentiment:',
      response: 'Positive'
    },
    tip: 'Best for: classification, data extraction, format-sensitive tasks.'
  },
  {
    id: 'chain',
    name: 'Chain-of-Thought (CoT)',
    icon: '🔗',
    color: '#10b981',
    tagline: 'Ask the AI to think step-by-step',
    what: "You add \"Let's think step by step\" or show a reasoning example. The AI works through logic before giving a final answer, which reduces mistakes on hard problems.",
    when: 'Use for math problems, logic puzzles, multi-step reasoning.',
    example: {
      prompt: "Q: A bakery makes 48 muffins and sells them in packs of 6. How many packs?\nA: Let's think step by step.\nStep 1: Total muffins = 48\nStep 2: Each pack = 6 muffins\nStep 3: 48 ÷ 6 = 8 packs\nAnswer:",
      response: '8 packs'
    },
    tip: 'Best for: math, logic, multi-step decisions, debugging.'
  },
  {
    id: 'system',
    name: 'System Prompt',
    icon: '⚙️',
    color: '#f59e0b',
    tagline: "Set the AI's identity before the conversation",
    what: "A system prompt sets WHO the AI is and HOW it should behave before any user message. It is invisible to the end user — like backstage instructions for an actor.",
    when: 'Use in apps and chatbots to create a consistent AI persona.',
    example: {
      prompt: '[SYSTEM]\nYou are a friendly cooking assistant named "Chef Buddy". You only talk about vegetarian recipes. Always be cheerful and end each response with a cooking tip.\n\n[USER]\nHow do I make pasta?',
      response: "Great choice! Here's a simple pasta recipe... 🍝\n\nChef's Tip: Always salt your pasta water generously!"
    },
    tip: 'Best for: chatbots, customer service bots, branded AI assistants.'
  }
];

// ─── ANATOMY PARTS ────────────────────────────────────────────────────────────
const ANATOMY_PARTS = [
  { label: 'Role / Persona',     color: '#4f46e5', example: 'You are an expert data analyst.',                                                      why: "Sets the AI's identity and expertise level — frames all its answers through that lens." },
  { label: 'Task / Instruction', color: '#0ea5e9', example: 'Analyze the following sales data and identify the top 3 trends.',                       why: 'The core command — what you actually want the AI to do.' },
  { label: 'Context / Background',color:'#10b981', example: 'The data is from Q3 2024 for an e-commerce company selling electronics.',              why: 'Gives the AI the background it needs to give a relevant, specific answer.' },
  { label: 'Format / Output style',color:'#f59e0b',example: 'Return the result as a numbered list with one sentence per trend.',                    why: 'Controls HOW the answer looks — critical for integrating into apps or reports.' },
  { label: 'Constraints / Rules', color: '#ef4444', example: 'Do NOT reference any data before 2023. Keep the entire response under 100 words.',    why: 'Safety guardrails and scope limits — keeps the AI focused and prevents hallucinations.' }
];

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: 'Which prompting technique gives the AI examples before asking the real question?',                opts: ['Zero-Shot Prompting', 'Few-Shot Prompting', 'System Prompting'],                                                              ans: 1 },
  { q: 'What does "Zero-Shot" mean in the context of prompting?',                                        opts: ['The AI gets zero training', 'You ask directly with no examples given', 'You give zero constraints'],                          ans: 1 },
  { q: "Adding \"Let's think step by step\" is a technique from which prompting method?",                opts: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought (CoT)'],                                                                           ans: 2 },
  { q: 'A System Prompt is typically...',                                                                 opts: ['Visible to the end user in the chat window', 'Set invisibly before the conversation to define AI behavior', 'Only used in Zero-Shot tasks'], ans: 1 },
  { q: 'Which part of a prompt controls HOW the answer is formatted?',                                   opts: ['Role / Persona', 'Context / Background', 'Format / Output style'],                                                          ans: 2 },
  { q: 'You want an AI to extract product names from reviews consistently. Which technique is BEST?',    opts: ['Zero-Shot (just ask)', 'Few-Shot (show 2-3 examples first)', 'Chain-of-Thought (show reasoning steps)'],                    ans: 1 },
  { q: 'Chain-of-Thought prompting is especially useful for...',                                         opts: ['Translating simple sentences', 'Multi-step math and logical reasoning', "Setting the AI's persona"],                         ans: 1 },
  { q: 'What happens if you do NOT give any constraints in a system prompt?',                            opts: ['The AI refuses to answer', 'The AI may go off-topic or produce unsafe/irrelevant content', 'The AI always gives a perfect answer'], ans: 1 }
];

export default function GenAIDay6({ onNavigate, openAITutor }) {
  const [selectedType, setSelectedType] = useState(PROMPT_TYPES[0]);
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulate = () => {
    if (!playgroundInput.trim()) return;
    setPlaygroundOutput('');
    setIsStreaming(true);
    const responses = {
      zero:   '✅ Zero-Shot result: The AI answered directly without any examples. This works well for general knowledge tasks.',
      few:    '✅ Few-Shot result: By providing 2–3 examples, the AI learned the exact pattern and replicated it perfectly.',
      chain:  '✅ Chain-of-Thought result:\nStep 1: Identified the problem type.\nStep 2: Broke it into sub-problems.\nStep 3: Solved each step.\nFinal Answer: [derived logically]',
      system: '✅ System Prompt applied! The AI is now acting as the persona you defined. All future responses follow your rules and style.'
    };
    const text = responses[selectedType.id] || '✅ Prompt processed successfully!';
    let i = 0;
    const interval = setInterval(() => {
      setPlaygroundOutput(text.slice(0, i));
      i++;
      if (i > text.length) { clearInterval(interval); setIsStreaming(false); }
    }, 18);
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  const SUB_TABS = [
    { id: 'intro', label: '📋 Overview' },
    { id: 'prompt_types', label: '🎭 Prompting Techniques' },
    { id: 'anatomy', label: '🔬 Prompt Anatomy' },
    { id: 'playground', label: '💻 Prompt Playground' },
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
                background: isActive ? '#059669' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 6 • PROMPT ENGINEERING
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Prompt Engineering — Talk to AI Like a Pro
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Prompt Engineering is the skill of writing instructions that get the best responses from AI. Learn the 4 main techniques — Zero-Shot, Few-Shot, Chain-of-Thought, and System Prompts — and understand the anatomy of a perfect prompt.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 6 Goal:</strong> <span style={{ color: '#ffffff' }}>Master the 4 prompting techniques and write your own well-structured prompt using the 5-part anatomy.</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: '🎯', label: 'Zero-Shot',    sub: 'Ask directly' },
                { icon: '📋', label: 'Few-Shot',     sub: 'Show examples first' },
                { icon: '🔗', label: 'Chain-of-Thought', sub: 'Step-by-step reasoning' },
                { icon: '⚙️', label: 'System Prompts', sub: 'Set AI identity' },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{icon}</div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('prompt_types')} style={{ background: '#059669', borderColor: '#059669' }}>
                Prompting Techniques <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. PROMPT TYPES ──────────────────────────────────────────── */}
        {activeTab === 'prompt_types' && (
          <motion.div key="prompt_types" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🎭 4 Prompting Techniques</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>Click each technique to explore it with a real example.</p>

            {/* Technique tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
              {PROMPT_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedType(pt)}
                  style={{
                    background: selectedType.id === pt.id ? pt.color : 'white',
                    color: selectedType.id === pt.id ? 'white' : '#475569',
                    border: `2px solid ${selectedType.id === pt.id ? pt.color : '#e2e8f0'}`,
                    padding: '0.9rem 0.5rem', borderRadius: '12px', cursor: 'pointer',
                    fontWeight: 800, fontSize: '0.82rem', textAlign: 'center',
                    boxShadow: selectedType.id === pt.id ? `0 4px 12px ${pt.color}44` : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{pt.icon}</div>
                  {pt.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Detail card */}
            <div style={{ background: 'white', border: `2px solid ${selectedType.color}33`, borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ background: selectedType.color, padding: '1.5rem 2rem', color: 'white' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.75)', marginBottom: '0.3rem' }}>Technique</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.3rem 0' }}>{selectedType.icon} {selectedType.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '0.95rem' }}>{selectedType.tagline}</p>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', borderLeft: `3px solid ${selectedType.color}` }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem', marginBottom: '0.4rem' }}>💡 What it is</div>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{selectedType.what}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', borderLeft: `3px solid ${selectedType.color}` }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem', marginBottom: '0.4rem' }}>📌 When to use</div>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{selectedType.when}</p>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: selectedType.color, textTransform: 'uppercase', marginBottom: '0.6rem' }}>✏️ Real Example</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>📤 Your Prompt</div>
                      <pre style={{ color: '#a7f3d0', fontSize: '0.8rem', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'monospace' }}>{selectedType.example.prompt}</pre>
                    </div>
                    <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>🤖 AI Response</div>
                      <pre style={{ color: '#e2e8f0', fontSize: '0.8rem', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'monospace' }}>{selectedType.example.response}</pre>
                    </div>
                  </div>
                </div>
                <div style={{ background: `${selectedType.color}11`, padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: `3px solid ${selectedType.color}`, fontSize: '0.85rem', color: '#334155' }}>
                  ⭐ <strong>Pro tip:</strong> {selectedType.tip}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('anatomy')} style={{ background: '#059669', borderColor: '#059669' }}>
                Prompt Anatomy <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. ANATOMY ───────────────────────────────────────────────── */}
        {activeTab === 'anatomy' && (
          <motion.div key="anatomy" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔬 Anatomy of a Perfect Prompt</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              A well-structured prompt has <strong>5 key parts</strong>. You don't need all 5 every time — but the more you include, the better the result.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {ANATOMY_PARTS.map((part, idx) => (
                <div key={idx} style={{ background: 'white', border: `1px solid ${part.color}33`, borderRadius: '14px', display: 'flex', overflow: 'hidden' }}>
                  <div style={{ background: part.color, color: 'white', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div style={{ padding: '1rem 1.2rem', flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 2fr 1.6fr', gap: '1rem', alignItems: 'start' }}>
                    <div style={{ fontWeight: 800, color: part.color, fontSize: '0.85rem' }}>{part.label}</div>
                    <div style={{ background: '#0f172a', padding: '0.5rem 0.8rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#a7f3d0', lineHeight: 1.5 }}>{part.example}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>{part.why}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full combined example */}
            <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '20px', border: '1px solid #1e293b', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
                🏆 All 5 parts combined — a complete, powerful prompt:
              </div>
              {[
                { label: '① Role',    text: 'You are an expert data analyst.',                                             color: '#818cf8' },
                { label: '② Task',    text: 'Analyze the following sales data and identify the top 3 trends.',             color: '#38bdf8' },
                { label: '③ Context', text: 'The data is from Q3 2024 for an e-commerce company selling electronics.',     color: '#34d399' },
                { label: '④ Format',  text: 'Return the result as a numbered list with one sentence per trend.',           color: '#fbbf24' },
                { label: '⑤ Rules',   text: 'Do NOT reference any data before 2023. Keep under 100 words.',               color: '#f87171' },
              ].map(({ label, text, color }) => (
                <div key={label} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color, fontSize: '0.72rem', fontWeight: 700, minWidth: '72px', paddingTop: '1px' }}>{label}</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')} style={{ background: '#059669', borderColor: '#059669' }}>
                Try it in Playground <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. PLAYGROUND ────────────────────────────────────────────── */}
        {activeTab === 'playground' && (
          <motion.div key="playground" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Prompt Playground</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Pick a technique, write a prompt, then click <strong>Simulate</strong> to see the AI-style response.
            </p>

            {/* Technique pills */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
              {PROMPT_TYPES.map((pt) => (
                <button key={pt.id} onClick={() => setSelectedType(pt)}
                  style={{ background: selectedType.id === pt.id ? pt.color : '#f1f5f9', color: selectedType.id === pt.id ? 'white' : '#475569', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', transition: 'all 0.15s' }}>
                  {pt.icon} {pt.name}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '0.5rem' }}>📤 Your Prompt ({selectedType.name})</div>
                <textarea
                  value={playgroundInput}
                  onChange={(e) => setPlaygroundInput(e.target.value)}
                  placeholder={`Try a ${selectedType.name} prompt here...\n\nExample:\n${selectedType.example.prompt}`}
                  style={{ width: '100%', height: '220px', padding: '1rem', borderRadius: '12px', border: `2px solid ${selectedType.color}55`, fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
                <button onClick={handleSimulate} disabled={!playgroundInput.trim() || isStreaming}
                  style={{ marginTop: '0.8rem', background: isStreaming ? '#94a3b8' : selectedType.color, color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', cursor: isStreaming ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.88rem', width: '100%' }}>
                  {isStreaming ? '⏳ Simulating...' : '▶ Simulate AI Response'}
                </button>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '0.5rem' }}>🤖 AI Response</div>
                <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', minHeight: '220px', border: '1px solid #1e293b', display: 'flex', alignItems: playgroundOutput ? 'flex-start' : 'center', justifyContent: playgroundOutput ? 'flex-start' : 'center' }}>
                  {playgroundOutput ? (
                    <pre style={{ color: '#a7f3d0', fontSize: '0.85rem', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7, fontFamily: 'monospace' }}>{playgroundOutput}{isStreaming ? '▌' : ''}</pre>
                  ) : (
                    <span style={{ color: '#334155', fontSize: '0.88rem', fontStyle: 'italic' }}>Response will appear here after simulation...</span>
                  )}
                </div>
                {playgroundOutput && !isStreaming && (
                  <div style={{ marginTop: '0.8rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.82rem', color: '#14532d', fontWeight: 600 }}>
                    ✅ Technique used: <strong>{selectedType.name}</strong>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#059669', borderColor: '#059669' }}>
                Day 6 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ─────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 6 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Practice all 3 prompting techniques by completing these tasks:
            </p>

            {[
              {
                num: '1', emoji: '🎯', title: 'Write a Zero-Shot Prompt',
                simple: 'Ask an AI something directly with no examples.',
                example: 'Summarize the following article in 3 bullet points: [paste any article text]',
                tip: 'Keep it direct — one sentence, one task.',
                color: '#4f46e5'
              },
              {
                num: '2', emoji: '📋', title: 'Write a Few-Shot Prompt',
                simple: 'Give 2 examples, then ask your real question.',
                example: "Classify the mood:\nSentence: \"I love this!\" → Mood: Happy\nSentence: \"This is awful.\" → Mood: Sad\nSentence: \"I can't stop laughing!\" → Mood:",
                tip: 'Your 2 examples should match the same pattern as your real question.',
                color: '#0ea5e9'
              },
              {
                num: '3', emoji: '⚙️', title: 'Write a System Prompt',
                simple: 'Define a role, at least 1 rule, and a format style for an AI assistant.',
                example: 'You are a travel guide assistant for India.\nDo NOT suggest destinations outside India.\nAlways reply in a friendly tone and end with a local food recommendation.',
                tip: 'Think of a chatbot you would build — write its instructions.',
                color: '#f59e0b'
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
                  <div style={{ fontSize: '0.78rem', color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>✏️ Example you can use:</div>
                  <div style={{ background: '#0f172a', padding: '0.8rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.82rem', color: '#a7f3d0', marginBottom: '0.6rem', whiteSpace: 'pre-wrap' }}>{example}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>💬 <em>{tip}</em></div>
                </div>
              </div>
            ))}

            <div style={{ background: 'white', border: '2px solid #059669', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.2rem' }}>
              <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>✍️ Write all 3 prompts below:</h4>
              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`ZERO-SHOT PROMPT:\n[Write here]\n\nFEW-SHOT PROMPT:\n[Write here]\n\nSYSTEM PROMPT:\n[Write here]`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #d1fae5', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#059669', borderColor: '#059669', marginBottom: '1rem' }}
            >
              {assignmentSubmitted ? '✓ Submitted!' : 'Submit My Prompts'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎉</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem' }}>Excellent! You wrote 3 real AI prompts!</div>
                  <div style={{ color: '#047857', fontSize: '0.85rem' }}>Take the quiz now to complete Day 6.</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#059669', borderColor: '#059669' }}>
                Start Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 6 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — answer all before submitting.</p>

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
                      } else if (isSelected) { bg = '#f0fdf4'; border = '1.5px solid #059669'; color = '#065f46'; }
                      return (
                        <button key={oi} disabled={quizSubmitted} onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.65rem 0.9rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400 }}>
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
                <button className="btn btn-primary" onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#059669', borderColor: '#059669' }}>
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great job!' : '📖 Keep practicing!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>Retry Quiz</button>
                </>
              )}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #86efac', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f172a' }}>🎉 Day 6 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've mastered Prompt Engineering. Next: RAG & Vector Databases.</p>
              </div>
              <button onClick={() => handleContinue('intro')} style={{ background: '#059669', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
