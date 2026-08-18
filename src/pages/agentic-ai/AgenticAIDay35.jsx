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
  { id: 'practical', label: 'Source Code', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Live Simulator', icon: <Play size={15}/> },
  { id: 'cheatsheet', label: 'Cheat Sheet', icon: <FileJson size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Declare Specialist Agents', icon: '👤', tag: 'Agents Setup',
    body: 'Create the researcher specialist (bind Serper web tools) and writer specialist (set backstory constraints).',
    code: { 
      Terminal: '# Initialize OpenAI API parameters\nexport OPENAI_API_KEY="sk-..."', 
      JSON: '{\n  "agents": ["researcher", "writer"]\n}', 
      Python: 'from crewai import Agent\nfrom crewai_tools import SerperDevTool\n\nsearch_tool = SerperDevTool()\n\nresearcher = Agent(\n    role="Senior Tech Researcher",\n    goal="Extract tech statistics details",\n    backstory="You search websites to extract data.",\n    tools=[search_tool],\n    verbose=True\n)\n\nwriter = Agent(\n    role="Copywriter Analyst",\n    goal="Summarize research outcomes",\n    backstory="You write marketing drafts.",\n    verbose=True\n)',
      JavaScript: '// Multi-agent setup in JS using StateGraph:\nconst researcherNode = async (state) => { /* call llm with tools */ };\nconst writerNode = async (state) => { /* summarize */ };'
    } 
  },
  { num: '02', title: 'Wire Sequential Tasks', icon: '📝', tag: 'Tasks Setup',
    body: 'Declare the research task and the writing task. Connect the output of research as input context for translation writing.',
    code: { 
      Terminal: '# Define tasks structures', 
      JSON: '{\n  "tasks": ["research_task", "write_task"]\n}', 
      Python: 'from crewai import Task\n\nresearch_task = Task(\n    description="Find the CAGR and size of the AI agent market.",\n    expected_outcome="Markdown bullet list of market size.",\n    agent=researcher\n)\n\nwrite_task = Task(\n    description="Write an engaging blog post summarizing findings.",\n    expected_outcome="A 300-word promotional post.",\n    context=[research_task],  # Pass research outcomes directly\n    agent=writer\n)',
      JavaScript: '// In JS, link linear outputs via state updates:\n// State.researchResult -> read by Writer node'
    } 
  },
  { num: '03', title: 'Enable SQLite Memory Saver', icon: '🧠', tag: 'Memory Settings',
    body: 'Enable memory=True during Crew configuration to save short-term agent variables in a local SQLite file cache.',
    code: { 
      Terminal: '# SQLite DB is auto-initialized locally', 
      JSON: '{\n  "crew": {\n    "memory": true\n  }\n}', 
      Python: '# Memory configuration enables cached queries and checks\n# No external DB setup required',
      JavaScript: '// Compile LangGraph JS with SqliteSaver checkpointers'
    } 
  },
  { num: '04', title: 'Assemble Crew Container', icon: '🔗', tag: 'Assembly',
    body: 'Combine researcher, writer, tasks, and enable sequential execution processes.',
    code: { 
      Terminal: '# Assemble crew', 
      JSON: '{\n  "crew": "sequential_workflow"\n}', 
      Python: 'from crewai import Crew, Process\n\nmarketing_crew = Crew(\n    agents=[researcher, writer],\n    tasks=[research_task, write_task],\n    process=Process.sequential,\n    memory=True\n)',
      JavaScript: 'const app = new StateGraph(State).addNode("researcher", researcherNode).addNode("writer", writerNode).compile();'
    } 
  },
  { num: '05', title: 'Kickoff and Print Output', icon: '🚀', tag: 'Execution',
    body: 'Trigger kickoff() and print the finalized markdown report text output.',
    code: { 
      Terminal: 'python run_marketing.py', 
      JSON: '{\n  "status": "finished",\n  "result": "Final blog post content"\n}', 
      Python: 'result = marketing_crew.kickoff()\nprint("---- FINAL BLOG POST ----")\nprint(result)',
      JavaScript: 'const result = await app.invoke({ input: "AI Agent CAGR" });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'In this capstone Crew, what is the role of context=[research_task]?', opts: ['It deactivates the researcher agent.', 'It guarantees that the writer receives the researcher\'s completed markdown output as input.', 'It saves reports directly to GitHub.'], ans: 1 },
  { q: 'What does enabling memory=True accomplish in the capstone Crew?', opts: ['It caches LLM queries to speed up execution and reduce token costs.', 'It formats output text as JSON automatically.', 'It turns off verbose logging.'], ans: 0 },
  { q: 'Which method starts the multi-agent Crew execution?', opts: ['run()', 'kickoff()', 'compile()'], ans: 1 }
];

export default function AgenticAIDay35({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [blogTopic, setBlogTopic] = useState("AI in Robotic Surgeries");
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
    setSimLogs([`[CrewAI] Initializing Capstone Crew agents...`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `🔍 [Researcher Agent] active: Querying SerperDevTools for: '${blogTopic}'...`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `💾 [Short-Term Memory] Saved: 'Surgeons using autonomous robot guidance report 40% precision gains.'`]);

        setTimeout(() => {
          setSimLogs(prev => [...prev, `🔀 Task Context: Forwarding research stats to Copywriter agent...`, `✍️ [Copywriter Agent] active: Summarizing and drafting marketing post...`]);

          setTimeout(() => {
            setSimLogs(prev => [...prev, `🟢 Crew execution complete. Output generated.`]);
            setSimOutput(
              `### Precision Surgery: AI-Driven Robotics\n\nDid you know autonomous surgical robots achieve **40% precision gains**? In our latest study on "${blogTopic}", AI-guided precision systems are transforming surgery outcomes, decreasing patient recovery times, and increasing safety margins.\n\n*Generated by CrewAI marketing crew.*`
            );
            setIsRunning(false);
          }, 1500);

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
                <Sparkles size={14} color="#fef08a" /> MODULE 7 • DAY 35
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 35: Capstone Multi-Agent Crew</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build a marketing content creation Crew. Set up researcher and writer agents, establish SQLite cache memory layers, and execute collaborative article workflows.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Capstone Project Scope</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  This capstone wraps up Module 7. You will implement a complete, production-ready marketing agency crew in Python.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  The research specialist runs web searches, writes data details in markdown tables, saves variables to local SQLite cache folders, and passes results to the writer agent to construct the final draft.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  ⚙️ Key Project Specs
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#475569' }}>
                  <div>🧩 Two active agents (Researcher, Writer)</div>
                  <div>📂 Explicit sequential task dependency (context)</div>
                  <div>💾 Enabled local SQLite cache memory</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Project Layout <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Project Data Handover Map</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Data structure of sequential task context mappings:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,0.05)', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>research_task (Researcher Agent)</div>
                  <div>➔</div>
                  <div style={{ border: '1px solid #fbbf24', background: 'rgba(251,191,36,0.05)', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>context output pass</div>
                  <div>➔</div>
                  <div style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,0.05)', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>write_task (Writer Agent)</div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '10px 0 0 0', maxWidth: '600px' }}>
                  The Writer Agent reads the researcher's output from the task context variable, using SQLite cache to optimize API queries.
                </p>
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Source Code <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SOURCE CODE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Project Source Code Steps</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Copy and execute this script locally to run the multi-agent crew:</p>
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
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Live Simulator <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* LIVE SIMULATOR */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Marketing Crew Generator Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define a blog topic and simulate sequential agent collaboration:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Setup Parameters</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Blog Target Topic:</label>
                  <input type="text" value={blogTopic} onChange={e => setBlogTopic(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Executing Crew...' : 'Generate Article'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto', maxHeight: 420 }}>
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 180 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>📋 Trace Execution Logs</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem', color: '#e2e8f0' }}>
                    {simLogs.map((log, i) => (
                      <div style={{ color: log.includes('Memory') ? '#34d399' : log.includes('Context') ? '#fbbf24' : '#cbd5e1' }} key={i}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {simOutput && (
                  <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, padding: '1rem' }}>
                    <span style={{ fontSize: '.65rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📄 Final Blog Post Markdown Output</span>
                    <pre style={{ margin: 0, fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
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

        {/* CHEAT SHEET */}
        {activeTab === 'cheatsheet' && (
          <motion.div key="cheatsheet" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 35 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference configurations for Capstone Multi-Agent marketing setups:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`from crewai import Agent, Task, Crew, Process

# 1. Specialist setup
agent_a = Agent(role="Searcher", goal="Find facts", tools=[serper_tool])
agent_b = Agent(role="Writer", goal="Write drafts")

# 2. Sequential tasks context wiring
task_a = Task(description="Search CAGR details", expected_outcome="Markdown table", agent=agent_a)
task_b = Task(description="Blog summary", expected_outcome="Markdown post", context=[task_a], agent=agent_b)

# 3. Assemble with sqlite memory
marketing_crew = Crew(
    agents=[agent_a, agent_b],
    tasks=[task_a, task_b],
    process=Process.sequential,
    memory=True
)
result = marketing_crew.kickoff()`}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 35 Assignment: Write Marketing Crew code</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a complete Python script implementing a two-agent Crew to write technical product release posts. Enable SQLite caching memory parameters, and run the crew kickoff thread.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from crewai import Agent, Task, Crew&#10;...&#10;release_crew = Crew(...)&#10;print(release_crew.kickoff())" style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 35 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module7', 'module7_project')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Finish Module (View Project) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
