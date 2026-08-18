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
  { num: '01', title: 'Enable Crew Memory', icon: '🧠', tag: 'Memory Config',
    body: 'CrewAI supports short-term, long-term, and entity memory systems. Enable memory=True during Crew initialization.',
    code: { 
      Terminal: '# No packages needed, compiled internally', 
      JSON: '{\n  "crew_config": {\n    "memory": true\n  }\n}', 
      Python: 'from crewai import Crew\n\n# Enable first-class crew memory\ncrew = Crew(\n    agents=[researcher],\n    tasks=[task],\n    memory=True\n)',
      JavaScript: '// LangGraph JS supports checkpoint memory savers:\nconst memory = new MemorySaver();'
    } 
  },
  { num: '02', title: 'Configure Agent delegation', icon: '👥', tag: 'Agent Delegation',
    body: 'Allow agents to dynamically delegate sub-tasks to other specialist agents or ask clarifying questions.',
    code: { 
      Terminal: '# Configure delegation flags', 
      JSON: '{\n  "agent": {\n    "allow_delegation": true\n  }\n}', 
      Python: 'from crewai import Agent\n\nmanager = Agent(\n    role="Project Manager",\n    goal="Organize reports",\n    backstory="You direct technical writers.",\n    allow_delegation=True  # Authorize task delegating\n)',
      JavaScript: '// Multi-agent routing logic in JS is configured via conditional edges...'
    } 
  },
  { num: '03', title: 'Configure Task Context', icon: '📂', tag: 'Task Context',
    body: 'You can explicitly pass the output of previous tasks as context to downstream tasks using the context attribute.',
    code: { 
      Terminal: '# Define task relationships', 
      JSON: '{\n  "task": {\n    "context": ["task_a"]\n  }\n}', 
      Python: 'from crewai import Task\n\nresearch_task = Task(description="Search stats...", expected_outcome="markdown list")\nwrite_task = Task(\n    description="Draft article based on research stats.",\n    expected_outcome="500 word post",\n    context=[research_task]  # Pass previous output as context\n)',
      JavaScript: '// In JS StateGraphs, state values are shared automatically across nodes...'
    } 
  },
  { num: '04', title: 'Verify Entity Memory Cache', icon: '💾', tag: 'Cache & SQLite',
    body: 'CrewAI stores entity and short-term memory parameters inside a local SQLite database to prevent redundant API token costs.',
    code: { 
      Terminal: '# Local cache directory is auto-created at ~/.crewai/', 
      JSON: '{\n  "cache": "enabled",\n  "db": "sqlite"\n}', 
      Python: '# Memory configurations enable local sqlite storage automatically\n# No manual query configurations required',
      JavaScript: '// Custom checkpointers in JS can be SQLite or Postgres checkpointers...'
    } 
  },
  { num: '05', title: 'Assemble and Run Crew', icon: '🚀', tag: 'Execution',
    body: 'Launch the collaborative multi-agent execution pipeline and inspect logs to verify state handover.',
    code: { 
      Terminal: 'python run_memory.py', 
      JSON: '{\n  "result": "Draft compiled with research stats"\n}', 
      Python: 'collaborative_crew = Crew(\n    agents=[manager],\n    tasks=[research_task, write_task],\n    memory=True\n)\n\nprint(collaborative_crew.kickoff())',
      JavaScript: '// Run multi-agent pipeline...'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is the role of the "context" parameter in a CrewAI Task?', opts: ['It styles log text color.', 'It explicitly passes outputs of previous tasks as dependencies to downstream tasks.', 'It connects to OpenAI APIs.'], ans: 1 },
  { q: 'What happens if allow_delegation=True is set on an agent?', opts: ['The agent can assign sub-tasks to other agents in the Crew or ask them queries dynamically.', 'The agent is deactivated.', 'It executes tasks in parallel.'], ans: 0 },
  { q: 'Where does CrewAI locally store memory databases by default?', opts: ['In a local SQLite database cache.', 'On a remote AWS S3 bucket.', 'In raw text log files.'], ans: 0 }
];

export default function AgenticAIDay33({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState('START');
  const [logs, setLogs] = useState([]);

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
    setActiveNode('START');
    setLogs([`[System] Starting Crew collaboration pipeline...`]);

    setTimeout(() => {
      setActiveNode('research');
      setLogs(prev => [...prev, `🔍 [Researcher Analyst] node active: Extracting market data...`, `💾 [Short-Term Memory] Saved: 'AI Agent market growth = 33% CAGR'`]);

      setTimeout(() => {
        setActiveNode('handover');
        setLogs(prev => [...prev, `🔀 Context Handover: Passing researcher outputs as task context dependencies...`]);

        setTimeout(() => {
          setActiveNode('writer');
          setLogs(prev => [...prev, `✍️ [Content Writer] node active. Reading context inputs...`, `🧠 [Entity Memory] Retrieved: 'CAGR: 33%'`, `✍️ [Content Writer]: Compiled final marketing draft report.`]);

          setTimeout(() => {
            setActiveNode('END');
            setLogs(prev => [...prev, `🟢 Pipeline completed.`]);
            setIsRunning(false);
          }, 1000);

        }, 1200);

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
                <Sparkles size={14} color="#fef08a" /> MODULE 7 • DAY 33
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Memory & Context Collaboration</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build collaborative agent teams. Learn how to configure CrewAI memory parameters (short-term, long-term, entity) and bind context across sequential task paths.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Collaboration & Context</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  In single-agent chains, context is simply the last message input string. In complex crews, context represents a formal handover dependency.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  You configure this using the `context` attribute in Tasks. This specifies that Task B requires the output generated by Task A. Furthermore, setting allow_delegation=True lets agents dynamically split tasks and collaborate.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🧠 Memory Types
                </h4>
                <div style={{ fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <strong>Short-Term Memory:</strong> Retains context variables within the active execution thread.
                  <strong>Long-Term Memory:</strong> Saves execution results to storage to optimize future crew runs.
                  <strong>Entity Memory:</strong> Extracts and saves entity attributes (like user settings).
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Memory Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Context Handover & Memory</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How data context and memory saver databases integrate within Crews:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>Task A (Research)</div>
                  <div>➔</div>
                  <div style={{ border: '1px solid #fbbf24', background: 'rgba(251,191,36,0.05)', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>Context Handover</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>Task B (Write)</div>
                </div>

                <div style={{ background: '#10b981', padding: '8px 16px', borderRadius: 8, fontSize: '.8rem', color: 'white', fontWeight: 700 }}>
                  💾 SQLite Local Cache DB (Stores short-term & entity memories)
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step Graph Building</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define, code, and execute memory-guided Crews:</p>
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
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Agent Collaboration Timeline Sandbox</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Run simulator and watch context handing over variables between research and writing tasks:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Control Center</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.82rem', color: '#475569' }}>
                  <div>👥 <strong>Agent 1:</strong> Researcher (allow_delegation=False)</div>
                  <div>👥 <strong>Agent 2:</strong> Writer (memory=True)</div>
                </div>

                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Collaborating...' : 'Run Collaboration Trace'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Visual flowchart */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifycontent: 'center', background: '#1e293b', padding: '0.8rem', borderRadius: 10 }}>
                  <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNode === 'START' ? '#10b981' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>START</div>
                  <div style={{ color: '#475569' }}>➔</div>
                  <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNode === 'research' ? '#0284c7' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>researcher_task</div>
                  <div style={{ color: '#475569' }}>➔</div>
                  <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNode === 'handover' ? '#fbbf24' : '#334155', color: activeNode === 'handover' ? '#0f172a' : 'white', fontSize: '.72rem', fontWeight: 700 }}>handover</div>
                  <div style={{ color: '#475569' }}>➔</div>
                  <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNode === 'writer' ? '#7c3aed' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>writer_task</div>
                  <div style={{ color: '#475569' }}>➔</div>
                  <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNode === 'END' ? '#ef4444' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>END</div>
                </div>

                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 180 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💾 Active Memory Registers & Logs</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem', color: '#e2e8f0' }}>
                    {logs.map((log, i) => (
                      <div style={{ color: log.includes('Memory') ? '#34d399' : log.includes('Handover') ? '#fbbf24' : '#cbd5e1' }} key={i}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('cheatsheet')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Cheat Sheet <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* CHEAT SHEET */}
        {activeTab === 'cheatsheet' && (
          <motion.div key="cheatsheet" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 33 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick references for context variables and memory declarations:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`from crewai import Agent, Task, Crew

# 1. Enable memory on crew level
crew = Crew(
    agents=[researcher],
    tasks=[task_a],
    memory=True
)

# 2. Allow agent delegation
analyst = Agent(
    role="Analyst",
    goal="Collect reports",
    allow_delegation=True
)

# 3. Wire task context dependencies
task_b = Task(
    description="Summarize",
    expected_outcome="Markdown summary.",
    context=[task_a], # Handover output of task_a
    agent=analyst
)`}
                  </pre>
                </div>
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 33 Assignment: Task Context Mapping</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script that instantiates two sequential Tasks: `task_scraping` and `task_translation`. Configure `task_translation` such that `context=[task_scraping]` is set. Build a Crew with memory enabled.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="task_scraping = Task(...)&#10;task_translation = Task(&#10;    ...&#10;    context=[task_scraping]&#10;)" style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                {assignmentSubmitted ? '✅ Submitted!' : 'Submit Code'}
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
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 33 Quiz Assessment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((q, qi) => {
                  const sel = quizAnswers[qi];
                  return (
                    <div key={qi} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '.97rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>Q{qi+1}: {q.q}</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        {q.opts.map((opt, oi) => {
                          let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                          if (quizSubmitted) { if (oi === q.ans) { bg = '#ecfdf5'; border = '1px solid #10b981'; color = '#166534'; } else if (sel === oi) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; } }
                          else if (sel === oi) { bg = '#e0f2fe'; border = '1px solid #0284c7'; color = '#0284c7'; }
                          return <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))} style={{ bg, border, color, padding: '.8rem 1.1rem', borderRadius: 10, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '.92rem', transition: 'all .15s' }}>{opt}</div>;
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module7', 'day34')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 34) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
