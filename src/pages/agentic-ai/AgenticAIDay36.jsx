import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';

const pageVariants = { 
  hidden: { opacity: 0, y: 15 }, 
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, 
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } 
};
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'architecture', label: 'Architecture', icon: <Brain size={15}/> },
  { id: 'practical', label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Sandbox', icon: <Play size={15}/> },
  { id: 'cheatsheet', label: 'Cheat Sheet', icon: <FileJson size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Install Agno Package', icon: '📦', tag: 'Setup',
    body: 'Set up your project environment. Install the agno python library, which contains the lightweight agent orchestrator.',
    code: { 
      Terminal: 'pip install agno openai\n# Agno runs natively in Python and supports multiple LLM providers.', 
      JSON: '{\n  "dependencies": {\n    "agno": "^1.0.0",\n    "openai": "^1.0.0"\n  }\n}', 
      Python: '# Verify Agno installation\nimport agno\nprint("Agno version:", agno.__version__)',
      JavaScript: '// Agno is Python-native. Node.js alternatives for simple agents include Vercel AI SDK:\nimport { generateText } from "ai";'
    } 
  },
  { num: '02', title: 'Import Agent & Model', icon: '📥', tag: 'Imports',
    body: 'Import Agno agent utilities. Set up the LLM provider using the Model wrappers (e.g., OpenAI, Gemini, Claude).',
    code: { 
      Terminal: 'export OPENAI_API_KEY="your-api-key-here"', 
      JSON: '{\n  "agent_config": {\n    "provider": "openai",\n    "model": "gpt-4o"\n  }\n}', 
      Python: 'from agno.agent import Agent\nfrom agno.models.openai import OpenAIChat\n\n# Configure your model\nmodel = OpenAIChat(id="gpt-4o")',
      JavaScript: '// Vercel AI SDK setup:\nimport { openai } from "@ai-sdk/openai";\nconst model = openai("gpt-4o");'
    } 
  },
  { num: '03', title: 'Define Agent Persona', icon: '👤', tag: 'Agent Setup',
    body: 'Instantiate an Agent. Pass the model reference, add clear instructions (system prompts), and customize behavior settings.',
    code: { 
      Terminal: '# Set agent role and system instructions', 
      JSON: '{\n  "agent": {\n    "name": "Math Tutor",\n    "instructions": "Be friendly and write explanations step-by-step."\n  }\n}', 
      Python: 'agent = Agent(\n    model=model,\n    name="Study Assistant",\n    description="Help students learn with simple terms.",\n    instructions=["Always summarize details", "Explain step-by-step"],\n    markdown=True\n)',
      JavaScript: '// Define system prompt in JS generator:\nconst system = "Always summarize details and explain step-by-step.";'
    } 
  },
  { num: '04', title: 'Invoke Agent Runs', icon: '🚀', tag: 'Execution',
    body: 'Run agent requests using print_response() to stream/print outputs to console, or run() to capture the full response object.',
    code: { 
      Terminal: 'python my_agent.py', 
      JSON: '{\n  "query": "Explain quantum computing",\n  "response_format": "markdown"\n}', 
      Python: '# Run and stream directly to the terminal\nagent.print_response("Explain quantum computing in one sentence.")',
      JavaScript: 'const { text } = await generateText({\n  model,\n  prompt: "Explain quantum computing in one sentence."\n});'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is Agno (formerly known as Phidata)?', opts: ['A database migration tool.', 'A lightweight Python framework for building agents with memory, knowledge, and tools.', 'An AI image editing software.'], ans: 1 },
  { q: 'How do you stream a response to the terminal in Agno?', opts: ['agent.stream()', 'agent.print_response()', 'agent.execute_and_show()'], ans: 1 },
  { q: 'Which parameter on the Agno Agent class is used to configure system prompt instructions?', opts: ['system_prompt', 'instructions', 'prompt_list'], ans: 1 }
];

export default function AgenticAIDay36({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [agentName, setAgentName] = useState("Finance Guru");
  const [agentInstructions, setAgentInstructions] = useState("Explain financial terms using funny analogies.");
  const [simQuery, setSimQuery] = useState("What is compound interest?");
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simOutput, setSimOutput] = useState('');

  // Assignment / Quiz States
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const changeTab = (tabId) => { setActiveTab(tabId); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[+qi]?.ans === ans).length : 0;

  const runSimulation = () => {
    setIsRunning(true);
    setSimLogs([`[Agno] Initializing Agent: ${agentName}...`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `⚙️ Loading instructions: "${agentInstructions}"`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `🚀 Running query: "${simQuery}"`]);

        setTimeout(() => {
          setSimLogs(prev => [...prev, `🧠 LLM Reasoning loop active...`]);

          setTimeout(() => {
            setSimLogs(prev => [...prev, `🟢 Agent execution complete. Markdown response generated.`]);
            setSimOutput(
              `### Compound Interest: Explained by ${agentName}\n\nThink of compound interest like a **snowball fight**! ☃️ \n\nYou start with a tiny snowball (your initial savings). As you roll it down the hill, it picks up snow. But instead of just growing linearly, the new snow also gathers more snow! \n\nEventually, you have a giant boulder of cash, because you earned interest on your interest! 💰`
            );
            setIsRunning(false);
          }, 1500);

        }, 1000);

      }, 1000);

    }, 800);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => changeTab(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === t.id ? 'white' : 'transparent', color: activeTab === t.id ? '#0284c7' : '#64748b', border: 'none', padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', transition: 'all .15s', boxShadow: activeTab === t.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.06), transparent 60%)' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 8 • DAY 36
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 36: Intro to Agno & Agno Agents</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to construct clean, modular, and developer-friendly AI agents using the Agno (formerly Phidata) framework. Set up agent instances and define instruction prompts.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>What makes Agno Unique?</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Many agent frameworks force complex graphing abstractions or rigid class structures. Agno emphasizes a clean code first design. Agents are treated as simple configuration schemas.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Agno combines the flexibility of raw Python functions with LLMs. With it, developers can quickly add memory, search tools, semantic databases, and monitor workflows without writing extensive code layers.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔩 Core Components of Agno
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>Agent:</strong> Orchestrates the models, prompt templates, tools, and execution processes.
                  <strong>Model:</strong> Adapts prompts and responses to specific LLMs (OpenAI, Gemini, Ollama).
                  <strong>Tools:</strong> Executable code (Python functions) registered with the LLM.
                  <strong>Knowledge:</strong> Integrates vector storage directly.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Agent Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Agno Agent Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How a basic Agno Agent interacts with LLMs and structures prompts:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ border: '2px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1.5rem', borderRadius: 16, width: '90%', maxWidth: '500px', color: 'white', textAlign: 'left' }}>
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: '#38bdf8', marginBottom: 8 }}>🚢 Agno Agent Container</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.9rem', color: '#cbd5e1' }}>
                    <div>🤖 <strong>LLM Model:</strong> OpenAIChat(id="gpt-4o")</div>
                    <div>📋 <strong>Instructions:</strong> String Array / System prompts</div>
                    <div>🛠️ <strong>Tools / Storage / Knowledge:</strong> Configured on Agent Class</div>
                  </div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#1e293b', padding: '1rem 2rem', borderRadius: 12, color: '#cbd5e1', fontSize: '.9rem', border: '1px solid #334155' }}>
                  <strong>print_response("Query text")</strong> streams text response to the terminal.
                </div>
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Practical Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* PRACTICAL GUIDE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Creating Your First Agno Agent</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define imports, choose a model, write instructions, and run your agent:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'stretch', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button onClick={() => setActiveStep(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', background: activeStep === i ? '#0284c7' : 'white', border: activeStep === i ? '1px solid #0284c7' : '1px solid #e2e8f0', color: activeStep === i ? 'white' : '#1e293b', padding: '0.9rem 1rem', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: activeStep === i ? 'rgba(255,255,255,.2)' : '#f1f5f9', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '.75rem', opacity: .65, marginBottom: 1 }}>Step {s.num}</div>
                        <div style={{ fontWeight: 700, fontSize: '.88rem', lineHeight: 1.3 }}>{s.title}</div>
                      </div>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 2, height: 10, background: i < activeStep ? '#0284c7' : '#e2e8f0', margin: '0 0 0 26px', transition: 'background .3s' }}/>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 400 }}>
                <div style={{ padding: '1.4rem 1.8rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{STEPS[activeStep].icon}</span>
                  <div>
                    <div style={{ fontSize: '.7rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>{STEPS[activeStep].tag}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>{STEPS[activeStep].title}</div>
                  </div>
                </div>
                <div style={{ padding: '1.2rem 1.8rem', borderBottom: '1px solid #1e293b' }}>
                  <p style={{ color: '#94a3b8', fontSize: '.92rem', lineHeight: 1.7, margin: 0 }}>{STEPS[activeStep].body}</p>
                </div>
                <div style={{ display: 'flex', gap: '.3rem', padding: '.75rem 1.8rem .4rem', borderBottom: '1px solid #1e293b' }}>
                  {['JSON','Python','JavaScript'].map(t => (
                    <button key={t} onClick={() => setCodeTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: codeTab === t ? '#0284c7' : 'transparent', color: codeTab === t ? 'white' : '#64748b', border: codeTab === t ? 'none' : '1px solid #334155', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '.78rem' }}>
                      {t}
                    </button>
                  ))}
                  <div style={{ flex: 1 }}/>
                  <button onClick={() => copy(STEPS[activeStep].code[codeTab])} style={{ display: 'flex', alignItems: 'center', gap: 5, background: copied ? '#059669' : '#1e293b', color: 'white', border: 'none', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontSize: '.75rem', fontWeight: 700 }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div style={{ flex: 1, padding: '1.2rem 1.8rem', overflowY: 'auto' }}>
                  <pre style={{ margin: 0, fontSize: '.82rem', fontFamily: 'monospace', lineHeight: 1.8, color: codeTab === 'JSON' ? '#fbbf24' : '#60a5fa', whiteSpace: 'pre-wrap' }}>{STEPS[activeStep].code[codeTab]}</pre>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Agent Playground</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Agent Name:</label>
                    <input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Instructions:</label>
                    <textarea value={agentInstructions} onChange={e => setAgentInstructions(e.target.value)} disabled={isRunning} style={{ width: '100%', height: '80px', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem', resize: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>User Query:</label>
                    <input type="text" value={simQuery} onChange={e => setSimQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Running Agent...' : 'Trigger Agno Run'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Runtime Output:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('🟢') ? '#34d399' : log.includes('🚀') ? '#60a5fa' : '#e2e8f0' }} key={idx}>
                      {log}
                    </div>
                  ))}
                </div>
                {simOutput && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: '1.2rem', color: '#cbd5e1', fontSize: '.9rem', lineHeight: 1.6, overflowY: 'auto', maxHeight: '180px' }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{simOutput}</div>
                  </div>
                )}
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('cheatsheet')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Cheat Sheet <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* CHEATSHEET */}
        {activeTab === 'cheatsheet' && (
          <motion.div key="cheatsheet" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Agno Quick Reference</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Agent Configuration Options:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    Agent(model=OpenAIChat(...), markdown=True, show_tool_calls=True)
                  </code>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Common Model Wrappers:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem' }}>
                    {['OpenAIChat', 'GeminiChat', 'GroqChat', 'OllamaChat'].map(m => (
                      <span key={m} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '.8rem', fontWeight: 700 }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📝 Assignment: Coding a Tech Analyst Agent</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Create a Python script that sets up an Agno Agent. Configure the agent to write engaging tech blogs on demand.</p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>Submission Requirements:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Initialize the OpenAIChat model.</li>
                  <li>Set up the Agent class with name "Blogger Agent".</li>
                  <li>Provide at least three instruction strings in a list to format outputs in markdown with rich emojis.</li>
                  <li>Call agent.print_response("Write a post about AI Agents").</li>
                </ol>
              </div>

              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} disabled={assignmentSubmitted} placeholder="Paste your python agent script here..." style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
              
              <button onClick={() => setAssignmentSubmitted(true)} disabled={assignmentSubmitted || !assignmentText.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem' }}>
                {assignmentSubmitted ? 'Submitted!' : 'Submit Code'}
              </button>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('cheatsheet')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Take Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>🧠 Day 36 Conceptual Quiz</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {QUIZ_QUESTIONS.map((q, qi) => {
                  return (
                    <div key={qi} style={{ borderBottom: qi < QUIZ_QUESTIONS.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', margin: '0 0 1rem 0' }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                        {q.opts.map((opt, oi) => {
                          const isSelected = quizAnswers[qi] === oi;
                          const showCorrect = quizSubmitted && q.ans === oi;
                          const showWrong = quizSubmitted && isSelected && q.ans !== oi;
                          let bg = 'white';
                          let border = '1px solid #cbd5e1';
                          if (isSelected) { bg = '#f0f9ff'; border = '1px solid #3b82f6'; }
                          if (showCorrect) { bg = '#ecfdf5'; border = '2px solid #10b981'; }
                          if (showWrong) { bg = '#fef2f2'; border = '2px solid #ef4444'; }
                          return (
                            <button key={oi} disabled={quizSubmitted} onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1.2rem', borderRadius: 10, background: bg, border: border, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '0.92rem', transition: 'all 0.1s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{opt}</span>
                              {showCorrect && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                              {showWrong && <span style={{ color: '#ef4444', fontWeight: 800 }}>✗</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!quizSubmitted ? (
                <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '2rem' }}>Submit Answers</button>
              ) : (
                <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '1px solid #bae6fd', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.3rem', color: '#0369a1', display: 'block', marginBottom: '.3rem' }}>Score: {quizScore} / {QUIZ_QUESTIONS.length}</strong>
                  <span style={{ color: '#0284c7' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score!' : 'Review the highlighted correct answers.'}</span>
                </div>
              )}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('assignment')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'day37')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 37) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
