import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Database, Terminal, ArrowRight, Zap, Trophy, Play, Check, HelpCircle, Star, Sparkles, Sliders, Upload, X } from 'lucide-react';
import bannerImg from '../../assets/generative_ai_day1_banner.png';
import aiImg from '../../assets/ai_logic_flowchart.png';
import mlImg from '../../assets/ml_patterns_diagram.png';
import dlImg from '../../assets/dl_neural_network_nodes.png';
import genaiImg from '../../assets/generative_ai_day1_banner.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function GenAIDay1({ onNavigate, openAITutor }) {
  const VENN_LAYERS = [
    {
      id: "ai",
      name: "Artificial Intelligence (AI)",
      color: "#3b82f6",
      desc: "Computer programs designed to mimic human logic (like playing chess using rules).",
      analogy: "A smart logic rules engine.",
      example: "Rule-based solvers, chess algorithms.",
      img: aiImg
    },
    {
      id: "ml",
      name: "Machine Learning (ML)",
      color: "#10b981",
      desc: "Algorithms that learn patterns from large datasets automatically without manually coded rules.",
      analogy: "Teaching a system using examples (data).",
      example: "Email spam checkers, feed recommendations.",
      img: mlImg
    },
    {
      id: "dl",
      name: "Deep Learning (DL)",
      color: "#8b5cf6",
      desc: "A subset of ML that uses layered neural networks (like brain cells) to analyze raw files or speech.",
      analogy: "Multi-layered neural processing.",
      example: "Face ID filters, voice speech translators.",
      img: dlImg
    },
    {
      id: "genai",
      name: "Generative AI (Gen AI)",
      color: "#ec4899",
      desc: "The subset of DL that synthesizes brand-new content (text, image, code) from input prompts.",
      analogy: "A creative digital assistant artist.",
      example: "ChatGPT drafts, Midjourney graphic art.",
      img: genaiImg
    }
  ];

  const [selectedVenn, setSelectedVenn] = useState(VENN_LAYERS[0]);
  const [promptText, setPromptText] = useState("Explain gravity using a trampoline analogy.");
  const [simulatedOutput, setSimulatedOutput] = useState("");
  const [generationLoading, setGenerationLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [submittedFile, setSubmittedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('intro');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runSimulatedLLM = () => {
    setSimulatedOutput("");
    setGenerationLoading(true);
    
    const responses = {
      trampoline: "🎯 Gravity is like putting a heavy bowling ball on a trampoline. It bends the surface, causing smaller marbles nearby to roll towards it. Massive objects like Earth bend the fabric of space-time, pulling objects (like apples and humans) down!",
      code: "💻 Here is your HTML/CSS Card:\n\n```html\n<div class='ui-card'>\n  <h4>Prompt Loaded</h4>\n</div>\n```",
      default: "🤖 AI Output: Hello! To get better results, clarify the role (e.g. 'Act as a coder') and specify output constraints."
    };

    let targetText = responses.default;
    if (promptText.toLowerCase().includes("trampoline") || promptText.toLowerCase().includes("gravity")) {
      targetText = responses.trampoline;
    } else if (promptText.toLowerCase().includes("code") || promptText.toLowerCase().includes("html")) {
      targetText = responses.code;
    }

    setTimeout(() => {
      setGenerationLoading(false);
      let charIdx = 0;
      const interval = setInterval(() => {
        setSimulatedOutput(prev => prev + targetText[charIdx]);
        charIdx++;
        if (charIdx >= targetText.length) {
          clearInterval(interval);
        }
      }, 15);
    }, 600);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmittedFile(e.target.files[0].name);
    }
  };

  const QUIZ_QUESTIONS = [
    { q: "What does Generative AI do?", opts: ["It only scores customer records", "It creates new content (text, image, code) from input prompts", "It repairs database servers automatically"], ans: 1 },
    { q: "How do you command a Generative AI model?", opts: ["By compiling C++ scripts", "By writing a natural language instruction (Prompt)", "By editing binary code"], ans: 1 },
    { q: "What is an AI 'hallucination' in Large Language Models?", opts: ["When the system completely turns off", "When the model confidently generates incorrect, false, or fabricated facts", "When it translates text too quickly"], ans: 1 },
    { q: "Which of the following is the most nested and creative subset of AI?", opts: ["Deep Learning", "Machine Learning", "Generative AI"], ans: 2 },
    { q: "Why should system prompt instructions contain negative constraints (e.g., 'Do NOT answer queries outside this context')?", opts: ["To reduce character cost", "To prevent prompt injections and lock chatbot scopes securely", "To enforce code comments"], ans: 1 },
    { q: "Which parameter is typically adjusted to control the randomness and creativity of an AI output?", opts: ["Batch size", "Token context window", "Temperature"], ans: 2 }
  ];

  const SUB_TABS = [
    { id: 'intro', label: '📋 Overview' },
    { id: 'what_is_ai', label: '🧩 AI vs ML vs DL' },
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
                background: isActive ? '#3b82f6' : 'transparent',
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
            <div style={{ background: '#0f172a', borderRadius: '24px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
                <div style={{ padding: '3rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', marginBottom: '1.2rem' }}>
                    <Sparkles size={14} /> DAY 1 • WELCOME
                  </div>
                  <h1 style={{ fontSize: '2.3rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0' }}>
                    Welcome to Day 1: AI Basics
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                    Learn how AI, Machine Learning, and Generative models connect. Then, test prompting in our live simulator. No complicated theory—only pure hands-on practice.
                  </p>
                  <div style={{ background: 'rgba(56,189,248,0.10)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#e2e8f0', fontSize: '0.92rem', borderLeft: '4px solid #38bdf8' }}>
                    🎯 <strong style={{ color: '#38bdf8' }}>Day 1 Goal:</strong> <span style={{ color: '#f1f5f9' }}>Explore the nested scopes of AI and build your first template prompt.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '2rem' }}>
                  <img src={bannerImg} alt="Gen AI Day 1 Banner" style={{ width: '100%', maxWidth: '350px', borderRadius: '16px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('what_is_ai')}>Start: AI vs ML vs DL <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 2. AI VS ML VS DL VENN DIAGRAM */}
        {activeTab === 'what_is_ai' && (
          <motion.div key="what_is_ai" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>🔬 How the Technologies Connect</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2.5rem' }}>Click each nested circle layer in the visual diagram below to check the simple differences. Click the image on the right to zoom: </p>

            {/* Stacked concentric circle menu centered at top */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem 1rem', borderRadius: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '340px', height: '340px' }}>
                
                {/* AI Layer */}
                <button
                  onClick={() => setSelectedVenn(VENN_LAYERS[0])}
                  style={{
                    position: 'absolute',
                    width: '320px',
                    height: '320px',
                    borderRadius: '50%',
                    background: 'rgba(59,130,246,0.04)',
                    border: selectedVenn.id === 'ai' ? '3px solid #3b82f6' : '1px dashed #93c5fd',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '0.8rem',
                    transition: 'all 0.2s',
                    boxShadow: selectedVenn.id === 'ai' ? '0 0 20px rgba(59,130,246,0.1)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase' }}>1. AI Scope</span>
                </button>

                {/* ML Layer */}
                <button
                  onClick={() => setSelectedVenn(VENN_LAYERS[1])}
                  style={{
                    position: 'absolute',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.05)',
                    border: selectedVenn.id === 'ml' ? '3px solid #10b981' : '1px dashed #6ee7b7',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '0.8rem',
                    transition: 'all 0.2s',
                    boxShadow: selectedVenn.id === 'ml' ? '0 0 20px rgba(16,185,129,0.1)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#064e3b', textTransform: 'uppercase' }}>2. ML Layer</span>
                </button>

                {/* DL Layer */}
                <button
                  onClick={() => setSelectedVenn(VENN_LAYERS[2])}
                  style={{
                    position: 'absolute',
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    background: 'rgba(139,92,246,0.06)',
                    border: selectedVenn.id === 'dl' ? '3px solid #8b5cf6' : '1px dashed #c4b5fd',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '0.8rem',
                    transition: 'all 0.2s',
                    boxShadow: selectedVenn.id === 'dl' ? '0 0 20px rgba(139,92,246,0.1)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3b0764', textTransform: 'uppercase' }}>3. DL Layer</span>
                </button>

                {/* Gen AI Layer */}
                <button
                  onClick={() => setSelectedVenn(VENN_LAYERS[3])}
                  style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(236,72,153,0.09)',
                    border: selectedVenn.id === 'genai' ? '3px solid #ec4899' : '1px dashed #fbcfe8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    color: '#4c0519',
                    transition: 'all 0.2s',
                    boxShadow: selectedVenn.id === 'genai' ? '0 0 20px rgba(236,72,153,0.2)' : 'none'
                  }}
                >
                  Gen AI ✨
                </button>

              </div>
            </div>

            {/* Full-width explanation horizontal split layout */}
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', border: '1px solid #cbd5e1', display: 'grid', gridTemplateColumns: '1.2fr 1.1fr', gap: '2.5rem', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              
              {/* Left Column: Text Info details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <span style={{ background: selectedVenn.color, color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' }}>
                    Active Layer Scope Details
                  </span>
                  <h3 style={{ fontSize: '1.6rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>{selectedVenn.name}</h3>
                </div>
                <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>{selectedVenn.desc}</p>
                
                <div style={{ background: '#f8fafc', padding: '0.8rem 1.2rem', borderRadius: '8px', borderLeft: `3px solid ${selectedVenn.color}` }}>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>💡 In simple words:</strong>
                  <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{selectedVenn.analogy}</span>
                </div>

                <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#a7f3d0' }}>
                  <span style={{ color: '#94a3b8' }}># Example:</span> {selectedVenn.example}
                </div>
              </div>

              {/* Right Column: Massive explanation image container (Zoomable) */}
              <div 
                onClick={() => setZoomedImg(selectedVenn.img)}
                style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #1e293b', height: '360px', cursor: 'zoom-in', transition: 'transform 0.2s' }}
                className="zoom-image-hover"
              >
                <img src={selectedVenn.img} alt={selectedVenn.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Hands-on Playground <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 3. PROMPT PLAYGROUND */}
        {activeTab === 'playground' && (
          <motion.div key="playground" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>💻 Live Prompt Playground</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              A <strong>prompt</strong> is the natural language instruction you write to instruct an AI model. Write a prompt below or click a template, then click **Synthesize** to watch it stream:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: '#f8fafc', padding: '2rem', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
              
              <div>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  style={{ width: '100%', height: '120px', padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', resize: 'none' }}
                />
                
                <div style={{ display: 'flex', gap: '6px', margin: '0.8rem 0' }}>
                  <button onClick={() => setPromptText("Explain gravity using a trampoline analogy.")} style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>Trampoline Analogy</button>
                  <button onClick={() => setPromptText("Generate code for an HTML/CSS card.")} style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>HTML Card Code</button>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={runSimulatedLLM}
                  disabled={generationLoading || !promptText.trim()}
                  style={{ background: '#0ea5e9', borderColor: '#0ea5e9', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  {generationLoading ? "Generating..." : "Synthesize Output ⚡"}
                </button>
              </div>

              <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.5rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', border: '1px solid #1e293b' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700 }}>AI Output</span>
                <div style={{ flex: 1, minHeight: '140px', marginTop: '0.8rem', fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {simulatedOutput ? simulatedOutput : <span style={{ color: '#475569' }}>Output will print here...</span>}
                  {generationLoading && <span className="blinking-cursor">|</span>}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Day 1 Assignment <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 4. DAY 1 ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 1 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              You will write your <strong>first AI prompt</strong>. Follow the steps below — it is very simple!
            </p>

            {/* What is a prompt — quick reminder */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '16px', padding: '1.5rem 2rem', color: 'white', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '2rem' }}>💡</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>Quick Reminder: What is a Prompt?</div>
                <div style={{ fontSize: '0.9rem', color: '#e0f2fe', lineHeight: 1.6 }}>
                  A <strong>prompt</strong> = a message you type to an AI to tell it what to do. Like texting instructions to a very smart assistant.
                </div>
              </div>
            </div>

            {/* Step-by-step guide */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>

              {[
                {
                  num: '1',
                  emoji: '🎭',
                  title: 'Give the AI a Role',
                  simple: 'Tell the AI WHO it should act as.',
                  example: 'You are a helpful customer service assistant for a mobile phone company.',
                  tip: 'Think of it like giving someone a job title before they start working.',
                  color: '#4f46e5'
                },
                {
                  num: '2',
                  emoji: '🚫',
                  title: 'Add Rules (What NOT to do)',
                  simple: 'Tell the AI what it should NEVER do.',
                  example: 'Do NOT discuss competitor products. Do NOT give medical or legal advice.',
                  tip: 'Rules keep the AI focused and safe.',
                  color: '#ef4444'
                },
                {
                  num: '3',
                  emoji: '📋',
                  title: 'Set the Format',
                  simple: 'Tell the AI HOW to reply — short, long, list, etc.',
                  example: 'Always reply in simple bullet points. Keep each reply under 3 sentences.',
                  tip: 'This makes the AI\'s output clean and readable.',
                  color: '#10b981'
                }
              ].map(({ num, emoji, title, simple, example, tip, color }) => (
                <div key={num} style={{ background: 'white', border: `1px solid ${color}33`, borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ background: `${color}11`, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: `1px solid ${color}22` }}>
                    <div style={{ background: color, color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>{num}</div>
                    <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{title}</div>
                      <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{simple}</div>
                    </div>
                  </div>
                  <div style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '0.78rem', color: color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>✏️ Example you can copy:</div>
                    <div style={{ background: '#0f172a', padding: '0.8rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#a7f3d0', marginBottom: '0.6rem' }}>
                      {example}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <span>💬</span> <em>{tip}</em>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Combine all 3 — write your own */}
            <div style={{ background: 'white', border: '2px solid #0ea5e9', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                ✍️ Now combine all 3 steps and write your own prompt below:
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>
                Write a prompt for an AI assistant of your choice (e.g. a study helper, a recipe bot, a coding assistant).
              </p>
              <textarea
                value={submittedFile || ''}
                onChange={(e) => setSubmittedFile(e.target.value)}
                placeholder={`Example:\nYou are a helpful cooking assistant.\nDo NOT suggest recipes with meat — only vegetarian food.\nAlways give recipes in numbered steps and keep them under 10 steps.`}
                style={{ width: '100%', height: '140px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => { setAssignmentSubmitted(true); }}
              disabled={!submittedFile || submittedFile.trim().length < 20 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Assignment Done! Proceed to Quiz →' : 'Submit My Prompt'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎉</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#14532d', fontSize: '0.95rem' }}>Great job! You just wrote your first AI prompt!</div>
                  <div style={{ color: '#166534', fontSize: '0.85rem' }}>Now take the quiz to test what you've learned today.</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted}>Start Assessment Quiz <ArrowRight size={16}/></button>
            </div>
          </motion.div>
        )}

        {/* 5. QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>📝 Day 1 Assessment Quiz (6 Questions)</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.6rem 0' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = "white";
                      let border = "1px solid #cbd5e1";
                      if (quizSubmitted) {
                        if (isCorrect) { bg = "#dcfce7"; border = "1.5px solid #10b981"; }
                        else if (isSelected) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; }
                      } else if (isSelected) {
                        bg = "#e0f2fe"; border = "1.5px solid #0ea5e9";
                      }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border: border, padding: '0.6rem 0.8rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {!quizSubmitted ? (
                <button className="btn btn-primary" onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ width: '150px' }}>Submit Answers</button>
              ) : (
                <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} style={{ width: '150px' }}>Retry Quiz</button>
              )}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#0f172a' }}>🎉 Day 1 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Congratulations! You have completed Day 1 basics successfully.</p>
              </div>
              <button 
                onClick={() => handleContinue('intro')}
                style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                Return to Overview
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Lightbox Zoom Modal overlay */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImg(null)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out', padding: '2rem' }}
          >
            <button 
              onClick={() => setZoomedImg(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#0f172a" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={zoomedImg} 
              alt="Zoomed diagram" 
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
