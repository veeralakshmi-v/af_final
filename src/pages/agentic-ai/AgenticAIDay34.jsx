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
  { num: '01', title: 'Sequential vs Hierarchical', icon: '🔀', tag: 'Process Theory',
    body: 'Sequential process executes tasks linearly. Hierarchical process creates a Manager Agent model to dynamically allocate tasks.',
    code: { 
      Terminal: '# No packages needed, configured inside CrewAI', 
      JSON: '{\n  "processes": ["sequential", "hierarchical"]\n}', 
      Python: '# CrewAI imports Process definitions\nfrom crewai import Process',
      JavaScript: '// In JS setups, hierarchical is modeled via dynamic coordinator nodes...'
    } 
  },
  { num: '02', title: 'Implement Sequential Crew', icon: '🔗', tag: 'Sequential Flow',
    body: 'By default, Crews execute tasks sequentially in the order they are defined in the tasks list.',
    code: { 
      Terminal: '# Execute sequential flows', 
      JSON: '{\n  "process": "sequential"\n}', 
      Python: '# Sequential tasks list execution\nseq_crew = Crew(\n    agents=[researcher, writer],\n    tasks=[research_task, write_task],\n    process=Process.sequential  # Default process flow\n)',
      JavaScript: '// In JS, code linear node flows:\nconst seqBuilder = new StateGraph(State).addEdge("nodeA", "nodeB");'
    } 
  },
  { num: '03', title: 'Initialize Manager LLM', icon: '🧠', tag: 'Manager LLM',
    body: 'Hierarchical flows require specifying a manager LLM model instance to evaluate inputs and delegate tasks.',
    code: { 
      Terminal: '# Initialize Manager LLM client', 
      JSON: '{\n  "manager": "gpt-4o"\n}', 
      Python: 'from langchain_openai import ChatOpenAI\n\n# Manager model must be robust (like gpt-4o)\nmanager_llm = ChatOpenAI(model="gpt-4o", temperature=0.1)',
      JavaScript: '// In JS, define a coordinator LLM node:\nconst managerModel = new ChatOpenAI({ modelName: "gpt-4o" });'
    } 
  },
  { num: '04', title: 'Assemble Hierarchical Crew', icon: '👑', tag: 'Hierarchical Flow',
    body: 'Instantiate Crew setting process=Process.hierarchical and binding manager_llm. Do not assign tasks to specific agents; the manager assigns them.',
    code: { 
      Terminal: '# Configure manager settings', 
      JSON: '{\n  "process": "hierarchical",\n  "manager": true\n}', 
      Python: '# Hierarchical crew configuration\nhier_crew = Crew(\n    agents=[researcher, writer],  # Specialist list pool\n    tasks=[research_task, write_task],\n    process=Process.hierarchical,\n    manager_llm=manager_llm  # Manager oversees specialists\n)',
      JavaScript: '// In JS, map coordinator routing node to specialist node handlers...'
    } 
  },
  { num: '05', title: 'Kickoff and Compare Logs', icon: '🚀', tag: 'Execution',
    body: 'Launch the hierarchical crew, inspect execution logs, and analyze the manager\'s task delegation decisions.',
    code: { 
      Terminal: 'python run_hierarchical.py', 
      JSON: '{\n  "managerDelegations": ["researcher", "writer"]\n}', 
      Python: '# Kickoff crew process execution\noutput = hier_crew.kickoff()\nprint("Crew Output:", output)',
      JavaScript: '// Run JS state workflow...'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is a key requirement for setting up Process.hierarchical in CrewAI?', opts: ['A local directory tool.', 'You must instantiate a manager_llm model configuration.', 'All agents must have allow_delegation=False.'], ans: 1 },
  { q: 'In a Hierarchical Crew process, who assigns tasks to agents?', opts: ['The developer defines them manually in code.', 'The Manager LLM evaluates the state and dynamically delegates tasks to specialist agents.', 'Tasks run in parallel automatically.'], ans: 1 },
  { q: 'Which process flow type is the default in CrewAI?', opts: ['Process.hierarchical', 'Process.sequential', 'Process.random'], ans: 1 }
];

export default function AgenticAIDay34({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [processType, setProcessType] = useState('Sequential'); // Sequential or Hierarchical
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodesPath, setActiveNodesPath] = useState(['START']);
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
    setActiveNodesPath(['START']);
    setSimLogs([`[Process Control] Starting crew process thread...`]);

    setTimeout(() => {
      if (processType === 'Sequential') {
        // Sequential path: START -> researcher -> writer -> END
        setActiveNodesPath(prev => [...prev, 'researcher']);
        setSimLogs(prev => [...prev, `📋 Sequential step: Executing researcher_task...`, `🤖 [Researcher]: Market trends compiled.`]);

        setTimeout(() => {
          setActiveNodesPath(prev => [...prev, 'writer']);
          setSimLogs(prev => [...prev, `📋 Sequential step: Executing writer_task...`, `🤖 [Writer]: Draft report written.`]);

          setTimeout(() => {
            setActiveNodesPath(prev => [...prev, 'END']);
            setSimLogs(prev => [...prev, `🟢 Execution complete.`]);
            setIsRunning(false);
          }, 1000);

        }, 1200);

      } else {
        // Hierarchical path: START -> manager -> researcher -> manager -> writer -> END
        setActiveNodesPath(prev => [...prev, 'manager']);
        setSimLogs(prev => [...prev, `👑 [Manager LLM] Node active: Evaluating task lists...`, `🔀 [Manager] delegating Task 1 to researcher specialist...`]);

        setTimeout(() => {
          setActiveNodesPath(prev => [...prev, 'researcher']);
          setSimLogs(prev => [...prev, `🤖 [Researcher] processing assigned task...`, `🤖 [Researcher] finished. Returning outcomes to Manager.`]);

          setTimeout(() => {
            setActiveNodesPath(prev => [...prev, 'manager']);
            setSimLogs(prev => [...prev, `👑 [Manager LLM] Node active: Reviewing research outputs...`, `🔀 [Manager] delegating Task 2 to writer specialist...`]);

            setTimeout(() => {
              setActiveNodesPath(prev => [...prev, 'writer']);
              setSimLogs(prev => [...prev, `🤖 [Writer] processing assigned task...`, `🤖 [Writer] finished. Returning draft to Manager.`]);

              setTimeout(() => {
                setActiveNodesPath(prev => [...prev, 'END']);
                setSimLogs(prev => [...prev, `👑 [Manager LLM]: Outcomes verified. Crew shutdown complete.`]);
                setIsRunning(false);
              }, 1000);

            }, 1200);

          }, 1000);

        }, 1200);

      }
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
                <Sparkles size={14} color="#fef08a" /> MODULE 7 • DAY 34
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Process Flows: Sequential vs Hierarchical</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Master crew process execution behaviors. Compare linear task sequences to dynamically-delegated hierarchical supervisor manager structures.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Orchestrating Process Flows</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  By default, tasks run in sequence. However, when complex tasks are involved, a static order isn't sufficient.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  **Hierarchical Process** introduces a Manager Agent. The manager evaluates incoming tasks, coordinates delegation to specialist agents, reviews their work, and determines when the project is successfully completed.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  ⚖️ Flow Comparisons
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>Process.sequential:</strong>
                  <span style={{ color: '#64748b' }}>Executes tasks one by one. Straightforward but rigid.</span>
                  <strong style={{ borderTop: '1px solid #bae6fd', paddingTop: '0.8rem' }}>Process.hierarchical:</strong>
                  <span style={{ color: '#64748b' }}>Dynamic delegation overseen by a Manager LLM. Needs a strong supervisor model (GPT-4o).</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Process Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Process Flow Comparison</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Structural differences between sequential and hierarchical process structures:</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: 16, border: '1px solid #1e293b', color: 'white', textAlign: 'center' }}>
                  <strong style={{ color: '#38bdf8', display: 'block', marginBottom: 12 }}>🔗 Sequential Process</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>START</div>
                    <div>➔</div>
                    <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>research_task</div>
                    <div>➔</div>
                    <div style={{ background: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>write_task</div>
                    <div>➔</div>
                    <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>END</div>
                  </div>
                </div>

                <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: 16, border: '1px solid #1e293b', color: 'white', textAlign: 'center' }}>
                  <strong style={{ color: '#fbbf24', display: 'block', marginBottom: 12 }}>👑 Hierarchical Process</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                    <div style={{ background: '#fbbf24', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem', color: '#0f172a', fontWeight: 700 }}>Manager LLM Agent</div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: 10 }}>
                      <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>research specialist</div>
                      <div style={{ background: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontSize: '.75rem' }}>writing specialist</div>
                    </div>
                    <p style={{ fontSize: '.7rem', color: '#64748b', marginTop: 10 }}>Manager evaluates tasks and routes them dynamically to specialists.</p>
                  </div>
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
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define, code, and execute different process flows:</p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Process Flow Execution Trace Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Toggle crew process type and trace execution path shifts:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Crew Process settings</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Simulated Process Type:</label>
                  <select value={processType} onChange={e => setProcessType(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                    <option value="Sequential">Process.sequential (Linear Flow)</option>
                    <option value="Hierarchical">Process.hierarchical (Manager Delegation)</option>
                  </select>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Executing Trace...' : 'Start Trace Running'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', minHeight: 340 }}>
                {/* Visual Graph Layout */}
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🗺️ Flow Path Node Map</span>
                  
                  {processType === 'Sequential' ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '0.8rem', borderRadius: 10 }}>
                      <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath.includes('START') && activeNodesPath[activeNodesPath.length - 1] === 'START' ? '#10b981' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>START</div>
                      <div style={{ color: '#475569' }}>➔</div>
                      <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath[activeNodesPath.length - 1] === 'researcher' ? '#0284c7' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>researcher</div>
                      <div style={{ color: '#475569' }}>➔</div>
                      <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath[activeNodesPath.length - 1] === 'writer' ? '#7c3aed' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>writer</div>
                      <div style={{ color: '#475569' }}>➔</div>
                      <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath[activeNodesPath.length - 1] === 'END' ? '#ef4444' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>END</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '0.8rem', borderRadius: 10 }}>
                      <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodesPath[activeNodesPath.length - 1] === 'manager' ? '#fbbf24' : '#334155', color: activeNodesPath[activeNodesPath.length - 1] === 'manager' ? '#0f172a' : 'white', fontWeight: 700, fontSize: '.75rem' }}>Manager Node</div>
                      <div style={{ color: '#475569', fontSize: '.6rem' }}>Delegates to specialists:</div>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath[activeNodesPath.length - 1] === 'researcher' ? '#0284c7' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>researcher</div>
                        <div style={{ padding: '4px 8px', borderRadius: 4, background: activeNodesPath[activeNodesPath.length - 1] === 'writer' ? '#7c3aed' : '#334155', color: 'white', fontSize: '.72rem', fontWeight: 700 }}>writer</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* State Inspector */}
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 180 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>📋 Trace Execution Logs</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem', color: '#e2e8f0' }}>
                    {simLogs.map((log, i) => (
                      <div style={{ color: log.includes('Manager') ? '#fbbf24' : log.includes('Sequential') ? '#38bdf8' : '#e2e8f0' }} key={i}>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 34 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference configuration syntax comparisons for CrewAI Processes:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Process.sequential Config</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`from crewai import Crew, Process

seq_crew = Crew(
    agents=[researcher, writer],
    tasks=[task_1, task_2],
    # Executes tasks 1 -> 2 linearly
    process=Process.sequential
)`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #fbbf24', paddingBottom: '0.4rem' }}>🐍 Process.hierarchical Config</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`from crewai import Crew, Process
from langchain_openai import ChatOpenAI

manager_llm = ChatOpenAI(model="gpt-4o")

hier_crew = Crew(
    agents=[researcher, writer],
    tasks=[task_1, task_2],
    process=Process.hierarchical,
    # Assign supervisor model
    manager_llm=manager_llm
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 34 Assignment: Hierarchical Supervisor Setup</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script that sets up a Crew with `process=Process.hierarchical`. Configure three agents as specialist pools and instantiate a supervisor `manager_llm` ChatOpenAI client.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from crewai import Crew, Process&#10;...&#10;crew = Crew(&#10;    ...&#10;    process=Process.hierarchical,&#10;    manager_llm=ChatOpenAI(model='gpt-4o')&#10;)" style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 34 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module7', 'day35')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 35) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
