import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Layers, Play, Settings, Code,
  Clipboard, GitBranch, ChevronRight, Terminal, FileJson,
  Brain, MessageCircle, Zap, Database, CheckCircle2, BookOpen, HelpCircle
} from 'lucide-react';
import flowiseInterfaceImg from '../../assets/flowise_interface_overview.png';
import flowiseChatbotImg from '../../assets/flowise_chatbot_flow_diagram.png';

/* ─── animation variants ─── */
const page = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -8, transition: { duration: 0.15 } } };
const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

/* ─── constants ─── */
const TABS = [
  { id: 'intro',      label: 'Overview',        icon: <BookOpen size={15}/> },
  { id: 'interface',  label: 'Interface Tour',  icon: <Brain size={15}/> },
  { id: 'practical',  label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox',    label: 'Sandbox',         icon: <Zap size={15}/> },
  { id: 'assignment', label: 'Assignment',      icon: <GitBranch size={15}/> },
  { id: 'quiz',       label: 'Quiz',            icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Install & Launch Flowise', icon: '⚡', tag: 'Terminal',
    body: 'Open your terminal and run the two commands below. Flowise starts a local server at port 3000 — open your browser and go to http://localhost:3000.',
    code: { Terminal: 'npm install -g flowise\nnpx flowise start', JSON: '// No config needed for default launch\n// Optional: set PORT env variable\nPORT=3001 npx flowise start', Python: '# Flowise is a Node.js app\n# Install via npm, then start from Python:\nimport subprocess\nsubprocess.run(["npx", "flowise", "start"])' } },
  { num: '02', title: 'Create a New Chatflow', icon: '🗂️', tag: 'Canvas',
    body: 'Click "Add New" → "Chatflow". A blank canvas grid appears. Search "Conversational Agent" in the left sidebar and drag it to the center of the canvas.',
    code: { Terminal: '# Flowise will open at:\nhttp://localhost:3000\n# Click: Chatflows → Add New → Chatflow', JSON: '{\n  "chatflowType": "CHATFLOW",\n  "name": "My First Chatbot",\n  "deployed": false,\n  "isPublic": false\n}', Python: 'import requests\n# Create chatflow via API\nrequests.post("http://localhost:3000/api/v1/chatflows", json={"name": "My First Chatbot"})' } },
  { num: '03', title: 'Snap the Chat Model Sub-Node', icon: '🧠', tag: 'Node Config',
    body: 'Search "ChatOpenAI". Drag it onto the canvas and connect its output port to the "model" bullet on the Conversational Agent. Enter your OpenAI API key in the right-side drawer.',
    code: { Terminal: '# Get your OpenAI API key from:\nhttps://platform.openai.com/api-keys\n# Paste it into the credential drawer', JSON: '{\n  "type": "chatOpenAI",\n  "modelName": "gpt-4o-mini",\n  "temperature": 0.7,\n  "credential": "openai_api_key"\n}', Python: 'from openai import OpenAI\nclient = OpenAI(api_key="sk-...")\n# Test key with a simple call:\nclient.chat.completions.create(model="gpt-4o-mini", messages=[{"role":"user","content":"hi"}])' } },
  { num: '04', title: 'Add Buffer Memory', icon: '💾', tag: 'Memory',
    body: 'Search "Buffer Memory". Drag it to the canvas and connect its output to the "memory" bullet on the Conversational Agent. Set k=5 to remember last 5 message turns.',
    code: { Terminal: '# In Flowise Node Drawer:\n# Memory Key: chat_history\n# k (window size): 5\n# Session ID: Leave blank (auto)', JSON: '{\n  "type": "bufferMemory",\n  "memoryKey": "chat_history",\n  "k": 5,\n  "sessionId": ""\n}', Python: '# Buffer memory is managed by Flowise automatically\n# Pass the same sessionId to maintain memory:\npayload = {"question": "Hello", "sessionId": "user_001"}' } },
  { num: '05', title: 'Wire Input & Output — Test!', icon: '🚀', tag: 'Deploy',
    body: 'Drag "Chat Input" and "Chat Output" nodes. Connect: Input → Agent → Output. Click Save, then click the chat bubble icon (bottom-right) to open a live test panel.',
    code: { Terminal: '# After saving, test via CLI:\ncurl -X POST http://localhost:3000/api/v1/prediction/YOUR_ID \\\n  -H "Content-Type: application/json" \\\n  -d \'{"question": "Hello!"}\'', JSON: '// Chatflow JSON export snippet:\n{\n  "edges": [\n    {"source": "chatInput_1", "target": "convAgent_1"},\n    {"source": "convAgent_1", "target": "chatOutput_1"}\n  ]\n}', Python: 'import requests\nres = requests.post(\n  "http://localhost:3000/api/v1/prediction/YOUR_ID",\n  json={"question": "Hello!"}\n)\nprint(res.json()[\'text\'])' } },
];

const INTERFACE_SECTIONS = [
  { id: 'canvas',   title: 'Drag-Drop Canvas',        loc: 'Center workspace',          desc: 'The main grid where you drag nodes and connect them with lines. Supports zoom, pan, and multi-select.' },
  { id: 'sidebar',  title: 'Node Categories Sidebar', loc: 'Left panel',                desc: 'Browse all available nodes grouped by category: LLMs, Chains, Memory, Tools, Embeddings, Vector Stores.' },
  { id: 'params',   title: 'Node Config Drawer',      loc: 'Right param drawer',        desc: 'Double-click any node to open its parameter drawer and configure model names, API keys, temperature, prompts.' },
  { id: 'topbar',   title: 'Top Action Bar',          loc: 'Top toolbar',               desc: 'Save your chatflow, deploy it as a widget, export the JSON template, or view API documentation.' },
  { id: 'chattest', title: 'Chat Test Panel',         loc: 'Bottom-right chat bubble',  desc: 'Click the chat icon to open a live test panel and immediately test your chatflow with real queries.' }
];

const QUIZ_QUESTIONS = [
  { q: 'What is Flowise in simple terms?', opts: ['A drag-and-drop visual builder for creating AI agent flows and chatbots without writing Python or JavaScript code.', 'A terminal command to compile Node.js applications.', 'A CSS framework for styling web pages.'], ans: 0 },
  { q: 'What type of nodes does Flowise support?', opts: ['LLMs, Chains, Memory, Tools, Document Loaders, Vector Stores, Embeddings, and API connectors.', 'Only text formatting and layout nodes.', 'Only database query language commands.'], ans: 0 },
  { q: 'How do you install Flowise locally?', opts: ['Run "npm install -g flowise" in the terminal, then start it with "npx flowise start".', 'Download a .exe file and double-click it.', 'It is a cloud-only tool that cannot be self-hosted.'], ans: 0 },
  { q: 'What is a "Chatflow" in Flowise?', opts: ['A saved visual diagram of connected nodes that defines how a chatbot or AI agent processes input and generates output.', 'A Python function that reads text files.', 'A SQL query result table.'], ans: 0 },
  { q: 'What does the "Chat Model" node do inside Flowise?', opts: ['It connects to an AI language provider (like OpenAI or Gemini) and passes the prompt to get a generated text response.', 'It formats web page fonts.', 'It manages SQL database row deletions.'], ans: 0 }
];

/* ─── component ─── */
export default function AgenticAIDay16({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab]       = useState('intro');
  const [selectedSection, setSelectedSection] = useState('canvas');
  const [activeStep, setActiveStep]     = useState(0);
  const [codeTab, setCodeTab]           = useState('Terminal');

  /* sandbox */
  const [systemPrompt, setSystemPrompt] = useState('You are a friendly AI assistant for Alphafly Academy. Be helpful and concise.');
  const [userQuery, setUserQuery]       = useState('What courses does Alphafly Academy offer?');
  const [temperature, setTemperature]   = useState(0.7);
  const [isRunning, setIsRunning]       = useState(false);
  const [simLogs, setSimLogs]           = useState([]);
  const [agentReply, setAgentReply]     = useState('');
  const [activeNodeId, setActiveNodeId] = useState(null);

  /* assignment / quiz */
  const [assignmentText, setAssignmentText]     = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers]           = useState({});
  const [quizSubmitted, setQuizSubmitted]       = useState(false);
  const [copied, setCopied]                     = useState(false);

  const changeTab = (id) => { setActiveTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[+qi]?.ans === ans).length : 0;

  const PIPELINE_NODES = [
    { id: 'input',  icon: '💬', label: 'Chat Input',  sub: 'User Message',  color: '#4c1d95', border: '#a78bfa' },
    { id: 'agent',  icon: '🤖', label: 'Conv. Agent', sub: 'System Prompt', color: '#1e3a5f', border: '#60a5fa' },
    { id: 'output', icon: '📤', label: 'Chat Output', sub: 'AI Response',   color: '#14532d', border: '#4ade80' },
  ];
  const SUB_NODES = [
    { id: 'model',  icon: '🧠', label: 'OpenAI Chat Model', port: 'ai_language_model' },
    { id: 'memory', icon: '💾', label: 'Buffer Memory (k=5)', port: 'ai_memory' },
  ];

  const runSimulator = () => {
    setIsRunning(true); setSimLogs([]); setAgentReply('');
    const nodes = [
      { id: 'input',  log: '💬 Chat Input Node — user message received.' },
      { id: 'agent',  log: `🤖 Conversational Agent — processing (temp ${temperature})…` },
      { id: 'model',  log: '🧠 OpenAI Chat Model — calling gpt-4o-mini…' },
      { id: 'memory', log: '💾 Buffer Memory — loading last 5 turns…' },
      { id: 'output', log: '📤 Chat Output — generating final response…' },
    ];
    let delay = 0;
    nodes.forEach((n, i) => {
      setTimeout(() => {
        setSimLogs(p => [...p, n.log]);
        setActiveNodeId(n.id);
        if (i === nodes.length - 1)
          setTimeout(() => { setAgentReply('Alphafly Academy offers:\n\n• Agentic AI Development (40 Days)\n• AI-Powered Data Analytics with Power BI\n• Python Full Stack Development\n• Generative AI Foundations\n• HTML, CSS & JavaScript\n• SQL & Database Management\n\nWould you like details on any specific course?'); setActiveNodeId(null); setIsRunning(false); }, 700);
      }, delay);
      delay += 800;
    });
  };

  /* ── render ──────────────────────────────────────────────────────────── */
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── TAB NAV ── */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => changeTab(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === t.id ? 'white' : 'transparent',
              color: activeTab === t.id ? '#7c3aed' : '#64748b', border: 'none',
              padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
              whiteSpace: 'nowrap', transition: 'all .15s',
              boxShadow: activeTab === t.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ════════════════ 1. OVERVIEW ════════════════ */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={page} initial="hidden" animate="show" exit="exit">

            {/* Hero */}
            <motion.div variants={card} style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: 28, padding: '3rem 3.5rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(255,255,255,.06),transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', padding: '.35rem .9rem', borderRadius: 30, fontSize: '.8rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1rem' }}>
                  <Sparkles size={13} color="#fef08a"/> MODULE 4 · DAY 16
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.25, margin: '0 0 1rem' }}>Introduction to Flowise & Visual AI Agents</h1>
                <p style={{ color: '#ddd6fe', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 620, margin: 0 }}>Discover Flowise — an open-source, drag-and-drop platform for building LLM-powered chatbots and AI agents with zero code.</p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1.8rem' }}>
                  {[['5 lessons','Today\'s coverage'],['3 simulators','Interactive practice'],['5 quiz Qs','Knowledge check']].map(([n,l]) => (
                    <div key={n}><div style={{ fontSize: '1.35rem', fontWeight: 800 }}>{n}</div><div style={{ fontSize: '.78rem', color: '#c4b5fd' }}>{l}</div></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Diagram banner */}
            <motion.div variants={card} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '1.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '.75rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: '1rem' }}>🗺 First Chatbot Flow Blueprint</span>
              <img src={flowiseChatbotImg} alt="Flowise Chatbot Flow" style={{ maxWidth: '600px', width: '100%', borderRadius: 14, border: '1px solid #334155' }}/>
            </motion.div>

            {/* 2-col cards */}
            <motion.div variants={card} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '.8rem' }}>What is Flowise?</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}><strong>Flowise</strong> is a visual AI agent builder built on top of <strong>LangChain</strong>. Instead of writing Python scripts, you drag-and-drop nodes onto a canvas to define how an AI agent thinks, retrieves knowledge, uses tools, and responds.</p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>It runs locally or on your server, integrates with OpenAI / Gemini / Anthropic, and lets you embed a chat widget on any website in minutes.</p>
              </div>
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#4c1d95', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Layers size={16} style={{ color: '#7c3aed' }}/> Key Concepts</h4>
                {[['🔷 Chatflow','A saved visual diagram of connected nodes.'],['🧠 LLM Node','Connects to AI model providers like OpenAI.'],['💾 Memory Node','Stores conversation history for multi-turn chat.'],['🔧 Tool Node','Plugs in calculators, web search, or APIs.'],['📄 Document Loader','Loads PDFs, URLs, or text for RAG knowledge.']].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', gap: 8, marginBottom: '.65rem', fontSize: '.88rem' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 700, whiteSpace: 'nowrap' }}>{k}:</span>
                    <span style={{ color: '#4b5563' }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => changeTab('interface')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(124,58,237,.3)' }}>
                Interface Tour <ArrowRight size={17}/>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ 2. INTERFACE TOUR ════════════════ */}
        {activeTab === 'interface' && (
          <motion.div key="interface" variants={page} initial="hidden" animate="show" exit="exit">
            <motion.div variants={card}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🖥️ Flowise Interface Tour</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Click a numbered hotspot or the list to explore each section of the Flowise editor:</p>
            </motion.div>
            <motion.div variants={card} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ position: 'relative', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={flowiseInterfaceImg} alt="Flowise Interface" style={{ maxWidth: '600px', width: '100%', borderRadius: 12, border: '1px solid #334155' }}/>
                {INTERFACE_SECTIONS.map((s, i) => (
                  <button key={s.id} onClick={() => setSelectedSection(s.id)} style={{ position: 'absolute', top: `${16 + i * 15}%`, left: i % 2 === 0 ? '14%' : '80%', transform: 'translate(-50%,-50%)', background: selectedSection === s.id ? '#7c3aed' : 'rgba(124,58,237,.75)', border: selectedSection === s.id ? '2px solid white' : '1px solid #c4b5fd', borderRadius: '50%', width: 30, height: 30, color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: '.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: selectedSection === s.id ? '0 0 20px rgba(124,58,237,.6)' : 'none', transition: 'all .15s', zIndex: 10 }}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* info card */}
                {(() => { const s = INTERFACE_SECTIONS.find(x => x.id === selectedSection); return (
                  <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 18, padding: '1.5rem', flex: 1 }}>
                    <span style={{ fontSize: '.7rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: '.4rem' }}>📌 Component Explorer</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 .4rem' }}>{s.title}</h3>
                    <span style={{ display: 'inline-block', fontSize: '.7rem', background: '#ede9fe', color: '#5b21b6', padding: '.2rem .6rem', borderRadius: 4, fontWeight: 700, marginBottom: '.8rem' }}>📍 {s.loc}</span>
                    <p style={{ color: '#475569', fontSize: '.9rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                ); })()}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  {INTERFACE_SECTIONS.map(s => (
                    <button key={s.id} onClick={() => setSelectedSection(s.id)} style={{ background: selectedSection === s.id ? '#f5f3ff' : 'white', border: selectedSection === s.id ? '1px solid #7c3aed' : '1px solid #e2e8f0', color: selectedSection === s.id ? '#7c3aed' : '#64748b', textAlign: 'left', padding: '.6rem .9rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.84rem', transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChevronRight size={14} style={{ opacity: selectedSection === s.id ? 1 : 0.3 }}/> {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => changeTab('intro')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '.75rem 1.4rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>← Overview</button>
              <button onClick={() => changeTab('practical')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(124,58,237,.3)' }}>Practical Guide <ArrowRight size={17}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ 3. PRACTICAL (premium stepper) ════════════════ */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={page} initial="hidden" animate="show" exit="exit">
            <motion.div variants={card}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Build Your First Chatbot</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Click each numbered step to read the guide and see live code for Terminal, JSON, and Python:</p>
            </motion.div>

            <motion.div variants={card} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'stretch', marginBottom: '2.5rem' }}>

              {/* ── LEFT: Step list ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button onClick={() => setActiveStep(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', background: activeStep === i ? '#7c3aed' : 'white', border: activeStep === i ? '1px solid #7c3aed' : '1px solid #e2e8f0', color: activeStep === i ? 'white' : '#1e293b', padding: '0.9rem 1rem', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all .2s', boxShadow: activeStep === i ? '0 4px 14px rgba(124,58,237,.25)' : 'none' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: activeStep === i ? 'rgba(255,255,255,.2)' : '#f1f5f9', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '.75rem', opacity: .65, marginBottom: 1 }}>{s.num}</div>
                        <div style={{ fontWeight: 700, fontSize: '.88rem', lineHeight: 1.3 }}>{s.title}</div>
                      </div>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 2, height: 10, background: i < activeStep ? '#7c3aed' : '#e2e8f0', margin: '0 0 0 26px', transition: 'background .3s' }}/>
                    )}
                  </div>
                ))}
              </div>

              {/* ── RIGHT: Step detail + code viewer ── */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 480 }}>

                {/* step header */}
                <div style={{ padding: '1.4rem 1.8rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{STEPS[activeStep].icon}</span>
                  <div>
                    <div style={{ fontSize: '.7rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>Step {STEPS[activeStep].num} · {STEPS[activeStep].tag}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>{STEPS[activeStep].title}</div>
                  </div>
                </div>

                {/* description */}
                <div style={{ padding: '1.2rem 1.8rem', borderBottom: '1px solid #1e293b' }}>
                  <p style={{ color: '#94a3b8', fontSize: '.92rem', lineHeight: 1.7, margin: 0 }}>{STEPS[activeStep].body}</p>
                </div>

                {/* code tabs */}
                <div style={{ display: 'flex', gap: '.3rem', padding: '.75rem 1.8rem .4rem', borderBottom: '1px solid #1e293b' }}>
                  {['Terminal','JSON','Python'].map(t => (
                    <button key={t} onClick={() => setCodeTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: codeTab === t ? '#7c3aed' : 'transparent', color: codeTab === t ? 'white' : '#64748b', border: codeTab === t ? 'none' : '1px solid #334155', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '.78rem', transition: 'all .15s' }}>
                      {t === 'Terminal' ? <Terminal size={12}/> : t === 'JSON' ? <FileJson size={12}/> : <Code size={12}/>}
                      {t}
                    </button>
                  ))}
                  <div style={{ flex: 1 }}/>
                  <button onClick={() => copy(STEPS[activeStep].code[codeTab])} style={{ display: 'flex', alignItems: 'center', gap: 5, background: copied ? '#059669' : '#1e293b', color: 'white', border: 'none', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontSize: '.75rem', fontWeight: 700, transition: 'all .15s' }}>
                    <Clipboard size={12}/> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* code content */}
                <div style={{ flex: 1, padding: '1.2rem 1.8rem', overflowY: 'auto' }}>
                  <pre style={{ margin: 0, fontSize: '.82rem', fontFamily: "'Fira Code', 'Courier New', monospace", lineHeight: 1.8, color: codeTab === 'Terminal' ? '#4ade80' : codeTab === 'JSON' ? '#fbbf24' : '#60a5fa', whiteSpace: 'pre-wrap' }}>{STEPS[activeStep].code[codeTab]}</pre>
                </div>

                {/* step navigation */}
                <div style={{ padding: '1rem 1.8rem', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setActiveStep(s => Math.max(0, s - 1))} disabled={activeStep === 0} style={{ background: 'transparent', color: activeStep === 0 ? '#334155' : '#94a3b8', border: '1px solid #334155', padding: '.45rem 1rem', borderRadius: 8, cursor: activeStep === 0 ? 'default' : 'pointer', fontWeight: 700, fontSize: '.82rem' }}>← Prev</button>
                  <span style={{ fontSize: '.75rem', color: '#64748b', fontFamily: 'monospace' }}>{activeStep + 1} / {STEPS.length}</span>
                  <button onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={activeStep === STEPS.length - 1} style={{ background: activeStep < STEPS.length - 1 ? '#7c3aed' : 'transparent', color: 'white', border: 'none', padding: '.45rem 1rem', borderRadius: 8, cursor: activeStep < STEPS.length - 1 ? 'pointer' : 'default', fontWeight: 700, fontSize: '.82rem', opacity: activeStep < STEPS.length - 1 ? 1 : .3 }}>Next →</button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => changeTab('interface')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '.75rem 1.4rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>← Interface Tour</button>
              <button onClick={() => changeTab('sandbox')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(124,58,237,.3)' }}>Canvas Sandbox <ArrowRight size={17}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ 4. SANDBOX ════════════════ */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={page} initial="hidden" animate="show" exit="exit">
            <motion.div variants={card}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Flowise Canvas Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Configure the agent, run a query, and watch the pipeline execute step by step:</p>
            </motion.div>

            {/* Pipeline visual */}
            <motion.div variants={card} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem' }}>
                {PIPELINE_NODES.map((n, ni, arr) => {
                  const done = simLogs.length > ni && !isRunning;
                  const active = activeNodeId === n.id;
                  return (
                    <React.Fragment key={n.id}>
                      <div style={{ background: active || done ? n.color : '#1e293b', border: `2px solid ${active || done ? n.border : '#334155'}`, borderRadius: 14, padding: '.8rem 1.2rem', textAlign: 'center', minWidth: 115, transition: 'all .4s', boxShadow: active ? `0 0 20px ${n.border}66` : 'none' }}>
                        <div style={{ fontSize: '1.4rem' }}>{n.icon}</div>
                        <div style={{ color: 'white', fontSize: '.72rem', fontWeight: 700, fontFamily: 'monospace', marginTop: 3 }}>{n.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '.6rem', fontFamily: 'monospace', marginTop: 1 }}>{n.sub}</div>
                        {done && <div style={{ fontSize: '.6rem', color: n.border, fontWeight: 700, marginTop: 4 }}>✓ DONE</div>}
                      </div>
                      {ni < arr.length - 1 && <div style={{ color: simLogs.length > ni ? '#a78bfa' : '#334155', fontSize: '1.3rem', transition: 'color .4s' }}>➔</div>}
                    </React.Fragment>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', paddingTop: '.8rem', marginTop: '.8rem', borderTop: '1px dashed #334155' }}>
                {SUB_NODES.map(sn => (
                  <div key={sn.id} style={{ textAlign: 'center', opacity: activeNodeId === 'agent' || simLogs.length >= 3 ? 1 : .3, transition: 'opacity .5s' }}>
                    <div style={{ fontSize: '.58rem', color: '#7c3aed', fontFamily: 'monospace', marginBottom: 4 }}>⬆ {sn.port}</div>
                    <div style={{ background: simLogs.length >= 3 ? '#1e1b4b' : '#1e293b', border: `1px solid ${simLogs.length >= 3 ? '#7c3aed' : '#334155'}`, borderRadius: 8, padding: '.45rem .8rem', color: 'white', fontSize: '.68rem', fontFamily: 'monospace' }}>{sn.icon} {sn.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={card} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {/* config panel */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}><Settings size={16} style={{ color: '#7c3aed' }}/> Agent Config</h3>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>System Prompt</label>
                  <textarea value={systemPrompt} disabled={isRunning} onChange={e => setSystemPrompt(e.target.value)} style={{ width: '100%', height: 80, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', background: '#f8fafc' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>User Question</label>
                  <input value={userQuery} disabled={isRunning} onChange={e => setUserQuery(e.target.value)} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Temperature <strong style={{ color: '#7c3aed' }}>{temperature}</strong></label>
                  <input type="range" min="0" max="1" step="0.1" value={temperature} disabled={isRunning} onChange={e => setTemperature(+e.target.value)} style={{ width: '100%', accentColor: '#7c3aed' }}/>
                </div>
                <button onClick={runSimulator} disabled={isRunning} style={{ background: isRunning ? '#94a3b8' : '#7c3aed', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: isRunning ? 'default' : 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: isRunning ? 'none' : '0 4px 14px rgba(124,58,237,.25)', marginTop: 'auto', transition: 'all .2s' }}>
                  <Play size={15}/> {isRunning ? 'Processing…' : 'Run Agent'}
                </button>
              </div>

              {/* log + reply panel */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', maxHeight: 160, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Execution Logs</span>
                  {simLogs.length === 0
                    ? <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Press "Run Agent" to start…</span>
                    : simLogs.map((l, i) => <div key={i} style={{ fontSize: '.75rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 3 }}>{l}</div>)}
                </div>
                {agentReply && (
                  <div style={{ background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.25)', borderRadius: 12, padding: '1rem', flex: 1 }}>
                    <span style={{ fontSize: '.65rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>🤖 Agent Response</span>
                    <pre style={{ margin: 0, fontSize: '.85rem', color: '#e2e8f0', lineHeight: 1.65, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{agentReply}</pre>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => changeTab('practical')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '.75rem 1.4rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>← Practical Guide</button>
              <button onClick={() => changeTab('assignment')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(124,58,237,.3)' }}>Assignment <ArrowRight size={17}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ 5. ASSIGNMENT ════════════════ */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={page} initial="hidden" animate="show" exit="exit">
            <motion.div variants={card} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.2rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GitBranch size={20} style={{ color: '#7c3aed' }}/></div>
                <div><h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Day 16 Assignment</h2><span style={{ fontSize: '.8rem', color: '#7c3aed', fontWeight: 700 }}>Design Your Own Chatbot</span></div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
                <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}><strong>Scenario:</strong> Design a Flowise chatbot for a restaurant that can answer customer questions about the menu, opening hours, and reservation policy. Write: (1) the list of Flowise nodes you would use, (2) how you would connect them, and (3) the system prompt for the Conversational Agent.</p>
              </div>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder={"Nodes List: Chat Input, Conversational Agent, OpenAI Chat Model, Buffer Memory, Chat Output\nConnections: Input → Agent → Output; Model → Agent model port; Memory → Agent memory port\nSystem Prompt: You are a helpful assistant for Mario's Italian Restaurant..."} style={{ width: '100%', height: 200, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6, background: '#f8fafc' }}/>
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: assignmentSubmitted ? '#059669' : '#7c3aed', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem', fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                {assignmentSubmitted ? <><CheckCircle2 size={16}/> Submitted!</> : 'Submit Assignment'}
              </button>
            </motion.div>
            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => changeTab('sandbox')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '.75rem 1.4rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>← Sandbox</button>
              <button onClick={() => changeTab('quiz')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(124,58,237,.3)' }}>Take Quiz <ArrowRight size={17}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ 6. QUIZ ════════════════ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={page} initial="hidden" animate="show" exit="exit">
            <motion.div variants={card} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}><HelpCircle size={22} style={{ color: '#7c3aed' }}/> Day 16 Knowledge Quiz</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((q, qi) => {
                  const sel = quizAnswers[qi];
                  return (
                    <div key={qi} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: 10, marginBottom: '.8rem', alignItems: 'flex-start' }}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 28, background: '#f5f3ff', color: '#7c3aed', borderRadius: 8, fontSize: '.78rem', fontWeight: 800 }}>Q{qi+1}</span>
                        <strong style={{ fontSize: '.97rem', color: '#0f172a', lineHeight: 1.5 }}>{q.q}</strong>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', paddingLeft: 38 }}>
                        {q.opts.map((opt, oi) => {
                          let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                          if (quizSubmitted) { if (oi === q.ans) { bg = '#ecfdf5'; border = '1px solid #10b981'; color = '#166534'; } else if (sel === oi) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; } }
                          else if (sel === oi) { bg = '#f5f3ff'; border = '1px solid #7c3aed'; color = '#7c3aed'; }
                          return <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))} style={{ background: bg, border, color, padding: '.8rem 1.1rem', borderRadius: 10, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '.92rem', fontWeight: sel === oi ? 700 : 500, transition: 'all .15s' }}>{opt}</div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!quizSubmitted
                ? <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '2rem', fontSize: '.95rem' }}>Submit Quiz</button>
                : (
                  <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', border: '1px solid #c4b5fd', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '.3rem' }}>🏆</div>
                    <strong style={{ fontSize: '1.3rem', color: '#4c1d95', display: 'block', marginBottom: '.3rem' }}>Score: {quizScore} / {QUIZ_QUESTIONS.length}</strong>
                    <span style={{ color: '#6d28d9' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect! You mastered Flowise basics!' : 'Review the green highlighted answers above.'}</span>
                  </div>
                )}
            </motion.div>
            <motion.div variants={card} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => changeTab('assignment')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '.75rem 1.4rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>← Assignment</button>
              <button onClick={() => onNavigate && onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' }}>Return to Dashboard 🚀</button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
