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
  { num: '01', title: 'Install CrewAI Package', icon: '📦', tag: 'Setup',
    body: 'Set up environment dependencies. Install CrewAI along with the standard prebuilt tools package.',
    code: { 
      Terminal: 'pip install crewai crewai-tools\n# CrewAI is python-native; JS uses langchain/langgraph equivalents', 
      JSON: '{\n  "python_dependencies": {\n    "crewai": "^0.28.8",\n    "crewai-tools": "^0.1.7"\n  }\n}', 
      Python: '# Verify CrewAI package imports\nimport crewai\nprint("CrewAI version:", crewai.__version__)',
      JavaScript: '// CrewAI is a Python framework. In JS, multi-agent flows are typically handled via LangGraph:\nimport { StateGraph } from "@langchain/langgraph";\nconsole.log("Multi-agent setup ready.");'
    } 
  },
  { num: '02', title: 'Define Agent Roles', icon: '👤', tag: 'Agents Config',
    body: 'Agents require three critical attributes: Role (title), Goal (mission objectives), and Backstory (personality constraints).',
    code: { 
      Terminal: '# Configure agent personalities', 
      JSON: '{\n  "agent": {\n    "role": "Researcher",\n    "goal": "Find trending news",\n    "backstory": "Experienced reporter"\n  }\n}', 
      Python: 'from crewai import Agent\n\nresearcher = Agent(\n    role="Senior Market Analyst",\n    goal="Identify emerging trends in autonomous AI agents",\n    backstory="You are an expert analyst specialized in decoding AI technology sectors.",\n    verbose=True,\n    memory=True\n)',
      JavaScript: '// Multi-agent setups in JS define custom instructions per agent node:\nconst researcherPrompt = "You are a Senior Market Analyst. Identify trends in autonomous agents...";'
    } 
  },
  { num: '03', title: 'Declare Agent Tasks', icon: '📝', tag: 'Tasks Config',
    body: 'Tasks represent clear actions for agents. You must describe the task and define its exact expected outcome.',
    code: { 
      Terminal: '# Define task outcomes', 
      JSON: '{\n  "task": {\n    "description": "Write summary report",\n    "expected_outcome": "3 paragraph markdown text"\n  }\n}', 
      Python: 'from crewai import Task\n\nresearch_task = Task(\n    description="Analyze the top 3 open-source multi-agent frameworks in 2026.",\n    expected_outcome="A detailed markdown report detailing pros and cons.",\n    agent=researcher  # Assigning task to our analyst agent\n)',
      JavaScript: '// In JS setups, structure agent state tasks sequentially:\nconst taskDescription = "Analyze the top 3 open-source frameworks in 2026...";'
    } 
  },
  { num: '04', title: 'Assemble the Crew', icon: '🔗', tag: 'Crew Setup',
    body: 'A Crew groups agents and tasks together, automating task execution configurations.',
    code: { 
      Terminal: '# Setup crew workflow', 
      JSON: '{\n  "crew": {\n    "agents": ["researcher"],\n    "tasks": ["research_task"]\n  }\n}', 
      Python: 'from crewai import Crew, Process\n\ntech_crew = Crew(\n    agents=[researcher],\n    tasks=[research_task],\n    process=Process.sequential  # Run tasks in order\n)',
      JavaScript: '// Wire tasks in JS using StateGraphs:\nconst builder = new StateGraph(State).addNode("researcher", researchNode);'
    } 
  },
  { num: '05', title: 'Execute Crew Kickoff', icon: '🚀', tag: 'Execution',
    body: 'Run crew.kickoff() to start the pipeline. Output results and review the agent reasoning logs.',
    code: { 
      Terminal: 'python run_crew.py', 
      JSON: '{\n  "status": "success",\n  "output": "Markdown report text"\n}', 
      Python: '# Kickoff the multi-agent crew execution loop\nresult = tech_crew.kickoff()\nprint("Crew Execution Output:\\n", result)',
      JavaScript: '// Execute the StateGraph compilation in JS:\nconst app = builder.compile();\nconst result = await app.invoke({ input: "Analyze frameworks..." });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What are the three mandatory configuration inputs for a CrewAI Agent?', opts: ['Name, Email, Password', 'Role, Goal, and Backstory', 'Model name, Temperature, Tools list'], ans: 1 },
  { q: 'What is a "Task" in CrewAI?', opts: ['A local database script.', 'A concrete objective containing a description, expected outcome, and assigned agent handler.', 'An API token validation method.'], ans: 1 },
  { q: 'What does process=Process.sequential configure in a Crew?', opts: ['Tasks run in parallel.', 'Tasks execute one after another in the exact sequence they are defined in the tasks list.', 'The manager agent schedules tasks randomly.'], ans: 1 }
];

export default function AgenticAIDay31({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [agentRole, setAgentRole] = useState("AI News Researcher");
  const [agentGoal, setAgentGoal] = useState("Find top AI news headlines today");
  const [agentBackstory, setAgentBackstory] = useState("Experienced Tech journalist");
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

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
    setSimLogs([`[CrewAI] Initializing Agent configuration...`]);

    setTimeout(() => {
      setSimLogs(prev => [...prev, `👤 Configured Agent: Role='${agentRole}', Goal='${agentGoal}'`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `📋 Creating Task: 'Extract 3 hot topics matching: ${agentGoal}'`]);

        setTimeout(() => {
          setSimLogs(prev => [...prev, `🔗 Assembling Crew & setting Process.sequential...`, `🚀 Kickoff! Agent '${agentRole}' is executing task reasoning loops...`]);

          setTimeout(() => {
            setSimLogs(prev => [...prev, `🤖 [${agentRole}]: Reasoned: Searching web sources. Found top headlines: [OpenAI GPT-5, CrewAI Memory, LangGraph updates].`, `🟢 Crew execution complete. Output compiled.`]);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 7 • DAY 31
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Introduction to CrewAI</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to orchestrate role-playing AI agents. Explore CrewAI foundations: defining distinct agent personas, declaring concrete tasks, and compiling cohesive collaboration Crews.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>The Power of Persona-Driven Agents</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Standard LLM prompt queries execute a single request. CrewAI operates on the idea of role-playing groups of agents collaborating like a software team.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Each agent is defined by its role, goals, and backstory. This forces the model to stay inside a persona (e.g. Senior Tech Editor vs junior content writer), resulting in highly optimized outcomes.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔩 Core Components
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>Agent:</strong> Persona-driven LLM wrapper holding specific goals and tools.
                  <strong>Task:</strong> A clear job description with assigned handler.
                  <strong>Crew:</strong> The container organizing agents list and execution process flow.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Crew Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ CrewAI Core Layout</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Below is the structural configuration of a basic single-agent CrewAI team:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ border: '2px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1.5rem', borderRadius: 16, width: '90%', maxWidth: '500px', color: 'white', textAlign: 'left' }}>
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: '#38bdf8', marginBottom: 8 }}>🚢 Crew Container</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.9rem', color: '#cbd5e1' }}>
                    <div>👥 <strong>Agents List:</strong> [ Senior Analyst ]</div>
                    <div>📋 <strong>Tasks List:</strong> [ Trend Research Task ]</div>
                    <div>🔄 <strong>Process:</strong> Process.sequential</div>
                  </div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '10px 0 0 0', maxWidth: '600px' }}>
                  The Crew sets up the target execution pipeline, assigns the task to the researcher agent, tracks output schemas, and handles compilation.
                </p>
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
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define, code, and execute your first stateful agent graph:</p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Crew Builder Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Configure your first agent and run a sequential task simulation:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Agent Settings</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Agent Role:</label>
                  <input type="text" value={agentRole} onChange={e => setAgentRole(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Agent Goal:</label>
                  <input type="text" value={agentGoal} onChange={e => setAgentGoal(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Agent Backstory:</label>
                  <textarea value={agentBackstory} onChange={e => setAgentBackstory(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 60, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Kickoff Run...' : 'Kickoff Crew'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 340 }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Crew Verbose Reasoning Logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem', color: '#e2e8f0' }}>
                  {simLogs.map((log, i) => (
                    <div style={{ color: log.includes('Agent:') ? '#38bdf8' : log.includes('Outcome') ? '#34d399' : '#e2e8f0' }} key={i}>
                      {log}
                    </div>
                  ))}
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 31 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick syntax reference for initializing Crews, Agents, and Tasks:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python CrewAI imports</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`from crewai import Agent, Task, Crew, Process

# 1. Initialize Agent
agent = Agent(
    role="Research Writer",
    goal="Write technical summaries",
    backstory="Ex-Journalist specialized in AI technology trends.",
    verbose=True
)

# 2. Declare Task
task = Task(
    description="Write a summary of autonomous multi-agent tech in 2026.",
    expected_outcome="A three-paragraph markdown bulleted summary.",
    agent=agent
)

# 3. Assemble and Run Crew
crew = Crew(
    agents=[agent],
    tasks=[task],
    process=Process.sequential
)
result = crew.kickoff()`}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 31 Assignment: Custom Agent Setup</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program using CrewAI that instantiates an Analyst Agent (with goal="Identify AI software pricing details") and a Task (with expected_outcome="Markdown table containing prices"). Assemble them in a Crew and invoke kickoff.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from crewai import Agent, Task, Crew&#10;...&#10;analyst = Agent(&#10;    role='Pricing Analyst',&#10;    goal='...'&#10;)" style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 31 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module7', 'day32')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 32) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
