import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, ArrowRight, Sparkles, Map, Layers, CheckCircle, Upload, X, BookOpen } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const TIMELINE_EVENTS = [
  {
    year: "1940s–1950s",
    title: "AI Founders & Pioneers",
    desc: "The concept of artificial intelligence was born. In 1950, Alan Turing proposed the famous Turing Test in his paper 'Computing Machinery and Intelligence' — asking 'Can machines think?'. In 1956, John McCarthy coined the term 'Artificial Intelligence' at the Dartmouth Conference, widely considered the birth moment of AI as a formal field. Marvin Minsky and Claude Shannon also contributed foundational theories on neural networks and information.",
    status: "Founding Era",
    color: "#f59e0b",
    icon: "🧑‍🔬",
    pioneers: [
      { name: "Alan Turing", year: "1950", role: "Father of Computer Science", contribution: "Proposed the 'Turing Test' to measure machine intelligence in his landmark paper.", emoji: "🧠" },
      { name: "John McCarthy", year: "1956", role: "Father of AI", contribution: "Coined the term 'Artificial Intelligence' and organized the Dartmouth AI Conference.", emoji: "🎓" },
      { name: "Marvin Minsky", year: "1950s", role: "AI Pioneer", contribution: "Co-founder of MIT's AI Lab. Built early neural network simulators and cognitive models.", emoji: "🔬" },
      { name: "Claude Shannon", year: "1948", role: "Father of Information Theory", contribution: "Developed information theory, laying the mathematical foundation for digital computation and AI.", emoji: "📡" }
    ]
  },
  {
    year: "1950s–1980s",
    title: "Symbolic AI (Rule-Based)",
    desc: "Computer programs relied on hand-written conditional logic. If-Else statements ruled the systems. There was no learning; if a programmer didn't write a rule, the computer couldn't handle it.",
    status: "AI Winter Era",
    color: "#64748b",
    icon: "🧮"
  },
  {
    year: "1990s–2010s",
    title: "Machine Learning & GPUs",
    desc: "The rise of internet data and GPU computing enabled algorithms to recognize patterns automatically. Neural networks (CNNs/RNNs) began classifying images and translate phrases step-by-step.",
    status: "Classification Era",
    color: "#0ea5e9",
    icon: "📊"
  },
  {
    year: "2017",
    title: "The Transformer Breakthrough",
    desc: "Google researchers published the 'Attention Is All You Need' paper, introducing the Transformer architecture. This allowed neural networks to process all words in a sentence simultaneously instead of word-by-word.",
    status: "Attention Revolution",
    color: "#8b5cf6",
    icon: "⚡"
  },
  {
    year: "2020s",
    title: "Foundation Models & LLMs",
    desc: "Scaling models to billions of parameters led to the emergence of 'Foundation Models' (like GPT-4) trained on web-scale data, demonstrating general reasoning, translation, and coding skills.",
    status: "Generative Scale Era",
    color: "#ec4899",
    icon: "🚀"
  }
];

const ATTENTION_WORDS = [
  { w: "The",    weights: { The: 0.05, animal: 0.05, cross: 0.05, street: 0.05, because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "animal", weights: { The: 0.1,  animal: 0.6,  cross: 0.05, street: 0.05, because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "didn't", weights: { The: 0.05, animal: 0.05, cross: 0.2,  street: 0.05, because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "cross",  weights: { The: 0.05, animal: 0.05, cross: 0.5,  street: 0.15, because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "the",    weights: { The: 0.05, animal: 0.05, cross: 0.05, street: 0.05, because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "street", weights: { The: 0.05, animal: 0.05, cross: 0.2,  street: 0.6,  because: 0.05, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "because",weights: { The: 0.05, animal: 0.05, cross: 0.05, street: 0.05, because: 0.7, it: 0.05, was: 0.05, tired: 0.05 } },
  { w: "it",     weights: { The: 0.02, animal: 0.82, cross: 0.02, street: 0.06, because: 0.02, it: 0.02, was: 0.01, tired: 0.01 } },
  { w: "was",    weights: { The: 0.05, animal: 0.05, cross: 0.05, street: 0.05, because: 0.05, it: 0.05, was: 0.6,  tired: 0.05 } },
  { w: "too",    weights: { The: 0.05, animal: 0.05, cross: 0.05, street: 0.05, because: 0.05, it: 0.05, was: 0.05, tired: 0.6  } },
  { w: "tired",  weights: { The: 0.02, animal: 0.72, cross: 0.02, street: 0.02, because: 0.02, it: 0.02, was: 0.02, tired: 0.14 } }
];

const QUIZ_QUESTIONS = [
  {
    q: "What breakthrough did the 2017 Transformer architecture introduce?",
    opts: ["It allowed networks to run without GPUs", "It introduced parallel attention processing of all words simultaneously", "It restricted models to rule-based logic gates"],
    ans: 1
  },
  {
    q: "How does 'self-attention' help understand word meaning in context?",
    opts: ["It deletes structural pronouns", "It dynamically scores relationships, linking 'it' back to the subject noun", "It forces sentences into numbers only"],
    ans: 1
  },
  {
    q: "What is a 'Foundation Model'?",
    opts: ["A rule template for entry-level tasks", "A large-scale model pre-trained on massive web data as a general-purpose starting point", "A database schema definition"],
    ans: 1
  },
  {
    q: "In the sentence 'The animal didn't cross the street because it was tired', what does 'it' refer to?",
    opts: ["The street", "The animal", "The tiredness"],
    ans: 1
  },
  {
    q: "During the 'AI Winter' era (1950s–1980s), why couldn't computers handle new scenarios?",
    opts: ["GPU memory was too low", "Everything was hand-coded with if-else rules; no learning happened", "The internet had too little data"],
    ans: 1
  },
  {
    q: "What was the key paper title that introduced the Transformer architecture?",
    opts: ["'Deep Learning for All'", "'Attention Is All You Need'", "'Neural Networks and Language Models'"],
    ans: 1
  },
  {
    q: "Which era introduced GPUs that dramatically sped up neural network training?",
    opts: ["1950s–1980s Symbolic AI era", "1990s–2010s Machine Learning era", "2020s Foundation Model era"],
    ans: 1
  },
  {
    q: "What does 'pre-training' in a Foundation Model mean?",
    opts: ["Training the model on one specific company dataset", "Training on billions of web pages to build general knowledge before fine-tuning", "Compiling training rules into if-else statements"],
    ans: 1
  }
];

export default function GenAIDay2({ onNavigate, openAITutor }) {
  const [selectedEvent, setSelectedEvent] = useState(TIMELINE_EVENTS[2]);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [submittedFile, setSubmittedFile] = useState(null);
  const [zoomedDiagram, setZoomedDiagram] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmittedFile(e.target.files[0].name);
    }
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  const SUB_TABS = [
    { id: 'intro', label: '📋 Overview' },
    { id: 'history', label: '⏳ AI History Timeline' },
    { id: 'foundation_models', label: '🏗️ Foundation Models' },
    { id: 'transformer_basics', label: '⚡ Transformer Basics' },
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
                background: isActive ? '#8b5cf6' : 'transparent',
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

        {/* 1. OVERVIEW */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(79,70,229,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#f5f3ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 2 • HISTORY & TRANSFORMERS
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                History of AI, Foundation Models & Transformers
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Where did Generative AI come from? Explore the chronological evolution of AI — from logic calculators to GPUs, the 2017 Transformer breakthrough, and how foundation models power modern tools.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#e0e7ff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong>Goal:</strong> Understand the shift to Parallel Self-Attention models and the concept of pre-training at scale.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('history')}>AI Timeline <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 2. TIMELINE */}
        {activeTab === 'history' && (
          <motion.div key="history" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>📅 AI History Timeline</h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Click each year block to inspect the technological phases:
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: '24px', marginBottom: '2rem' }}>

              {/* Timeline year buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '2.5rem' }}>
                {TIMELINE_EVENTS.map((event) => {
                  const isActive = selectedEvent.year === event.year;
                  return (
                    <button
                      key={event.year}
                      onClick={() => setSelectedEvent(event)}
                      style={{
                        background: isActive ? event.color : 'white',
                        color: isActive ? 'white' : '#475569',
                        border: `2px solid ${isActive ? event.color : '#cbd5e1'}`,
                        padding: '1rem 0.5rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        boxShadow: isActive ? `0 4px 12px ${event.color}44` : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{event.icon}</div>
                      {event.year}
                    </button>
                  );
                })}
              </div>

              {/* Event card */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '18px', border: `2px solid ${selectedEvent.color}33`, minHeight: '200px', marginBottom: selectedEvent.pioneers ? '1.5rem' : 0 }}>
                <span style={{ background: `${selectedEvent.color}22`, color: selectedEvent.color, padding: '0.2rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>
                  {selectedEvent.status}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 0.8rem 0', fontWeight: 800 }}>{selectedEvent.icon} {selectedEvent.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.7, margin: 0 }}>{selectedEvent.desc}</p>
              </div>

              {/* Pioneers spotlight — only shown for founders era */}
              {selectedEvent.pioneers && (
                <div style={{ marginTop: '0' }}>
                  <h4 style={{ fontSize: '1rem', color: '#92400e', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🏆 Key Pioneers who started it all:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {selectedEvent.pioneers.map((p) => (
                      <div key={p.name} style={{ background: 'white', padding: '1.2rem', borderRadius: '14px', border: `1px solid ${selectedEvent.color}44`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '2rem', lineHeight: 1 }}>{p.emoji}</div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: selectedEvent.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>{p.role} · {p.year}</div>
                          <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{p.contribution}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('foundation_models')}>Foundation Models <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 3. FOUNDATION MODELS */}
        {activeTab === 'foundation_models' && (
          <motion.div key="foundation_models" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ What is a Foundation Model?</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>Think of it like a university education vs. a single job training course.</p>

            {/* Simple Analogy Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#e0d9ff', marginBottom: '0.8rem', fontWeight: 700 }}>💡 Simple Analogy</div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                Imagine a student who reads <strong style={{ color: '#ffffff' }}>millions of books, articles, and websites</strong> for 5 years. They become broadly knowledgeable. Now when you hire them as a <em style={{ color: '#e0d9ff' }}>doctor, lawyer, or chef</em>, they learn that specific role quickly — because they already have a huge base knowledge. That student is a <strong style={{ color: '#ffffff' }}>Foundation Model</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* The Old Way vs New Way */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '16px' }}>
                  <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.9rem', marginBottom: '0.8rem' }}>❌ The Old Way (Before Foundation Models)</div>
                  <ul style={{ color: '#7f1d1d', fontSize: '0.88rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                    <li>One model trained just for spam detection</li>
                    <li>Another model trained just for translation</li>
                    <li>Another model trained just for image captions</li>
                    <li>Each required expensive training from scratch</li>
                    <li>Months of work for every new task</li>
                  </ul>
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: '16px' }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem', marginBottom: '0.8rem' }}>✅ The New Way (Foundation Models)</div>
                  <ul style={{ color: '#14532d', fontSize: '0.88rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                    <li>One huge model pre-trained on ALL of the internet</li>
                    <li>Add a simple fine-tune or system prompt for any task</li>
                    <li>Same base model handles chat, code, translation</li>
                    <li>Weeks of effort reduced to hours or minutes</li>
                    <li>GPT-4, Gemini, Claude are all Foundation Models</li>
                  </ul>
                </div>
              </div>

              {/* Pre-training explanation */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>📚 What is Pre-training?</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  Pre-training means the model reads and learns patterns from <strong>trillions of words</strong> on the internet — Wikipedia articles, books, GitHub code, news sites — before it's ever given to a user. During this phase, it learns grammar, facts, reasoning, and even basic coding patterns completely unsupervised.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#334155', borderLeft: '3px solid #4f46e5' }}>
                  <strong>Real number:</strong> GPT-3 was pre-trained on <strong>~300 billion tokens</strong> (roughly 570 GB of text). That's equivalent to reading every English Wikipedia article about <strong>500,000 times</strong>.
                </div>
              </div>

              {/* Fine-tuning */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>🎯 What is Fine-tuning?</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  After pre-training, companies take the base model and train it on a <strong>smaller, focused dataset</strong> to specialize it — like teaching your knowledgeable graduate the specific rules of your hospital or law firm. This is called fine-tuning.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {[
                    { icon: '🏥', label: 'Medical AI', sub: 'Fine-tuned on clinical notes & diagnoses' },
                    { icon: '⚖️', label: 'Legal AI', sub: 'Fine-tuned on contracts & case law' },
                    { icon: '💻', label: 'Code AI', sub: 'Fine-tuned on GitHub repositories' },
                  ].map(({ icon, label, sub }) => (
                    <div key={label} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{label}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-world Examples */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>🌍 Real Foundation Models You Know</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {[
                    { name: 'GPT-4', maker: 'OpenAI', use: 'ChatGPT — writing, coding, reasoning', color: '#10b981' },
                    { name: 'Gemini', maker: 'Google', use: 'Search, Workspace, multimodal tasks', color: '#3b82f6' },
                    { name: 'Claude', maker: 'Anthropic', use: 'Long documents, safe reasoning', color: '#8b5cf6' },
                    { name: 'LLaMA', maker: 'Meta', use: 'Open-source, customizable models', color: '#f59e0b' },
                    { name: 'Mistral', maker: 'Mistral AI', use: 'Lightweight, fast inference', color: '#ec4899' },
                    { name: 'DALL-E', maker: 'OpenAI', use: 'Image generation from text prompts', color: '#06b6d4' },
                  ].map(({ name, maker, use, color }) => (
                    <div key={name} style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', borderLeft: `3px solid ${color}` }}>
                      <div style={{ fontWeight: 800, color: 'white', fontSize: '0.95rem' }}>{name}</div>
                      <div style={{ color, fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.3rem' }}>by {maker}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.5 }}>{use}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('transformer_basics')}>Transformer Basics <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 4. TRANSFORMER SELF-ATTENTION EXPLORER */}
        {activeTab === 'transformer_basics' && (
          <motion.div key="transformer_basics" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚡ How Transformers Work</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>The architecture that powers every modern AI tool — explained simply.</p>

            {/* What is a Transformer */}
            <div style={{ background: 'linear-gradient(135deg, #312e81, #1e1b4b)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#c7d2fe', marginBottom: '0.8rem', fontWeight: 700 }}>💡 Simple Analogy</div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0, color: '#ffffff' }}>
                Before Transformers, AI read sentences like a child reads — <strong style={{ color: '#ffffff' }}>one word at a time</strong>, from left to right. If the sentence was long, it would forget the beginning by the time it reached the end.
                <br /><br />
                Transformers changed this: they read the <strong style={{ color: '#ffffff' }}>entire sentence at once</strong>, and for every word, they calculate: <em style={{ color: '#c7d2fe' }}>"which other words in this sentence are most relevant to understanding me?"</em> This is called <strong style={{ color: '#ffffff' }}>Self-Attention</strong>.
              </p>
            </div>

            {/* Key Concepts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {[
                {
                  icon: '👁️', title: 'Self-Attention', color: '#4f46e5',
                  desc: 'For each word, the model calculates how much it should "attend to" every other word. This lets it resolve pronouns, link context, and understand meaning across long distances in a sentence.'
                },
                {
                  icon: '📍', title: 'Positional Encoding', color: '#0ea5e9',
                  desc: 'Since Transformers process all words simultaneously, they need a way to know word order. Positional Encoding adds a number tag to each word ("I am position 3") so the model knows the sequence.'
                },
                {
                  icon: '🔁', title: 'Multi-Head Attention', color: '#10b981',
                  desc: 'Instead of looking at context just once, Transformers run self-attention 8–16 times in parallel (heads). Each head learns different relationship patterns — syntax, facts, pronoun links — simultaneously.'
                },
                {
                  icon: '🏗️', title: 'Encoder & Decoder', color: '#f59e0b',
                  desc: 'An Encoder reads and understands input (like a reader). A Decoder generates output (like a writer). GPT models use decoder-only architecture. BERT uses encoder-only. T5 uses both.'
                },
              ].map(({ icon, title, color, desc }) => (
                <div key={title} style={{ background: 'white', border: `1px solid ${color}33`, padding: '1.5rem', borderRadius: '14px', borderTop: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{title}</span>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Before vs After Transformers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ fontWeight: 800, color: '#c2410c', fontSize: '0.88rem', marginBottom: '0.8rem' }}>🐢 Before: RNN / Sequential</div>
                <ul style={{ color: '#7c2d12', fontSize: '0.85rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                  <li>Read words one-by-one, left to right</li>
                  <li>Forgot early context on long sentences</li>
                  <li>Could not run in parallel — very slow training</li>
                  <li>Struggled with tasks needing long-range context</li>
                </ul>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ fontWeight: 800, color: '#15803d', fontSize: '0.88rem', marginBottom: '0.8rem' }}>🚀 After: Transformer / Parallel</div>
                <ul style={{ color: '#14532d', fontSize: '0.85rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                  <li>Processes all words simultaneously</li>
                  <li>Self-attention links words across any distance</li>
                  <li>Massively parallelizable — trains 100x faster on GPUs</li>
                  <li>Powers all modern LLMs: GPT, Gemini, Claude</li>
                </ul>
              </div>
            </div>

            {/* Tokens concept */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.8rem 0' }}>🧩 What is a Token?</h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                Transformers don't read words — they read <strong>tokens</strong>. A token is roughly a word or word-piece. The sentence <code style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>"Hello, how are you?"</code> = 6 tokens. Longer or rarer words split into multiple tokens.
              </p>
              <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.82rem', color: '#a7f3d0' }}>
                "un" + "believ" + "able" = 3 tokens &nbsp;|&nbsp; "cat" = 1 token &nbsp;|&nbsp; GPT-4 context = 128,000 tokens
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              Now try the interactive demo below — hover each word to see how the Transformer links pronouns back to their nouns using attention weights:
            </p>

            {/* Sentence Block */}
            <div
              onClick={() => setZoomedDiagram(true)}
              style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '20px', border: '1px solid #1e293b', marginBottom: '2rem', textAlign: 'center', cursor: 'zoom-in' }}
            >
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
                Click to zoom • Hover words to reveal attention weights
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                {ATTENTION_WORDS.map((item, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredWord(item); }}
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'white',
                      cursor: 'pointer',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      background: hoveredWord && hoveredWord.w === item.w ? '#4f46e5' : 'transparent',
                      transition: 'all 0.15s'
                    }}
                  >
                    {item.w}
                  </span>
                ))}
              </div>

              {/* Attention Weights Output */}
              <div style={{ marginTop: '2.5rem', borderTop: '1px solid #1e293b', paddingTop: '1.5rem', minHeight: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {hoveredWord ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: '#fef08a', fontWeight: 700, display: 'block', width: '100%', marginBottom: '0.4rem' }}>
                      🔎 Attention focus for: "{hoveredWord.w}"
                    </span>
                    {Object.entries(hoveredWord.weights).map(([k, val]) => {
                      if (val <= 0.02) return null;
                      return (
                        <span
                          key={k}
                          style={{
                            background: `rgba(79, 70, 229, ${val})`,
                            border: '1px solid #4f46e5',
                            padding: '0.2rem 0.7rem',
                            borderRadius: '20px',
                            fontSize: '0.82rem',
                            color: val > 0.4 ? 'white' : '#cbd5e1',
                            fontWeight: 700
                          }}
                        >
                          {k}: {(val * 100).toFixed(0)}%
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    Hover over a word to trigger attention rendering
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Day 2 Assignment <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 5. DAY 2 ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>📝 Day 2 Practical Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Demonstrate your understanding of Transformers and self-attention by completing this task:
            </p>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', border: '1px solid #cbd5e1', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Task steps */}
              {[
                { num: '1', title: 'Draw an Attention Matrix', desc: 'Write a 3-sentence paragraph. Draw (or describe in text) which words each pronoun in your paragraph attends to most strongly, just like the hover diagram above.' },
                { num: '2', title: 'Foundation Model Map', desc: 'List 3 real Foundation Models (e.g. GPT-4, Gemini, Claude). For each, write one sentence describing what unique tasks or domains it is specialized for.' },
                { num: '3', title: 'Timeline Reflection', desc: 'In your own words, explain why the 2017 Transformer paper was such a turning point. What specifically changed from the previous RNN/sequential approach?' }
              ].map(({ num, title, desc }) => (
                <div key={num} style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1.2rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.3rem 0' }}>Task {num}: {title}</h4>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}

              {/* Upload */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Upload your completed assignment (.txt or .pdf):
                </label>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '2rem', textAlign: 'center', background: 'white', cursor: 'pointer', position: 'relative' }}>
                  <input type="file" onChange={handleFileUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                  <Upload size={32} color="#94a3b8" style={{ margin: '0 auto 0.5rem' }} />
                  {submittedFile ? (
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>✓ File Uploaded: {submittedFile}</span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Drag & drop your file here, or click to browse</span>
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => { setAssignmentSubmitted(true); alert("Day 2 assignment submitted successfully!"); }}
                disabled={!submittedFile || assignmentSubmitted}
                style={{ alignSelf: 'flex-start', background: '#10b981', borderColor: '#10b981' }}
              >
                {assignmentSubmitted ? "✓ Submitted" : "Submit Assignment"}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted}>
                Start Assessment Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* 6. QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 2 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — answer all before submitting.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0' }}>
                    {qi + 1}. {item.q}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) {
                        bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; color = '#0c4a6e';
                      }
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

              <div style={{ display: 'flex', gap: '1rem' }}>
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
                    <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12', display: 'flex', alignItems: 'center' }}>
                      Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉' : '📖 Keep Practicing!'}
                    </div>
                    <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                      Retry Quiz
                    </button>
                  </>
                )}
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f172a' }}>🎉 Day 2 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Excellent work! You've mastered Transformers and Foundation Models.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Lightbox Zoom — Self-Attention Diagram */}
      <AnimatePresence>
        {zoomedDiagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedDiagram(false)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15,23,42,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out', padding: '2rem' }}
          >
            <button
              onClick={() => setZoomedDiagram(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#0f172a" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#0f172a', padding: '3rem', borderRadius: '20px', border: '1px solid #1e293b', maxWidth: '90vw', maxHeight: '85vh', overflow: 'auto' }}
            >
              <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center' }}>
                🔍 Self-Attention Sentence Explorer — Zoomed View
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '2rem' }}>
                {ATTENTION_WORDS.map((item, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={() => setHoveredWord(item)}
                    onMouseLeave={() => setHoveredWord(null)}
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      color: 'white',
                      cursor: 'pointer',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      background: hoveredWord && hoveredWord.w === item.w ? '#4f46e5' : 'transparent',
                      transition: 'all 0.15s'
                    }}
                  >
                    {item.w}
                  </span>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', minHeight: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                {hoveredWord ? (
                  <>
                    <span style={{ fontSize: '0.9rem', color: '#fef08a', fontWeight: 700, width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>
                      🔎 Attention focus for: "{hoveredWord.w}"
                    </span>
                    {Object.entries(hoveredWord.weights).map(([k, val]) => {
                      if (val <= 0.02) return null;
                      return (
                        <span key={k} style={{ background: `rgba(79,70,229,${val})`, border: '1px solid #4f46e5', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.9rem', color: val > 0.4 ? 'white' : '#cbd5e1', fontWeight: 700 }}>
                          {k}: {(val * 100).toFixed(0)}%
                        </span>
                      );
                    })}
                  </>
                ) : (
                  <span style={{ color: '#64748b', fontStyle: 'italic' }}>Hover over a word above to reveal attention weights</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
