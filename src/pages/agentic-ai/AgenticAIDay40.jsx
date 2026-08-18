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
  { num: '01', title: 'Install Storage Packages', icon: '📦', tag: 'Setup',
    body: 'Set up persistence libraries. Agno supports SQLite, PostgreSQL, and SQLAlchemy storage backends to persist agent session memory.',
    code: { 
      Terminal: 'pip install sqlalchemy\n# SQLAlchemy enables SQL local DB wrappers for session states storage.', 
      JSON: '{\n  "dependencies": {\n    "sqlalchemy": "^2.0.0"\n  }\n}', 
      Python: '# Verify SQL connection packages\nimport sqlalchemy\nprint("Storage dependencies ready.")',
      JavaScript: '// Node.js persistent state handlers typically rely on RedisSaver or SqliteSaver checkpointers:\n// npm install @langchain/langgraph-checkpoint-sqlite'
    } 
  },
  { num: '02', title: 'Define SQL Session Storage', icon: '💾', tag: 'Storage Config',
    body: 'Declare the SQL storage table config. Expose a local database file target URL (e.g. SQLite database file path).',
    code: { 
      Terminal: '# Initialize SQLite state database local file', 
      JSON: '{\n  "storage": {\n    "type": "sqlite",\n    "table_name": "agent_sessions",\n    "db_url": "tmp/sessions.db"\n  }\n}', 
      Python: 'from agno.storage.agent.sqlite import SqlAgentStorage\n\n# Configure persistent session DB table\nstorage = SqlAgentStorage(\n    table_name="production_assistant",\n    db_file="tmp/sessions.db"\n)',
      JavaScript: '// SQL database checkpointer initialization in JS:\nconst checkpointer = new SqliteSaver(new sqlite.Database("tmp/checkpoint.db"));'
    } 
  },
  { num: '03', title: 'Assemble Production Agent', icon: '⚙️', tag: 'Assembly',
    body: 'Pass the storage object to the Agent class wrapper. This automatically saves user chat sessions and retrieves historical inputs matching a unique session ID.',
    code: { 
      Terminal: '# Assemble RAG, tools, and storage entities', 
      JSON: '{\n  "agent": {\n    "storage": "SqlAgentStorage",\n    "session_id": "user-uuid-123"\n  }\n}', 
      Python: 'from agno.agent import Agent\nfrom agno.tools.duckduckgo import DuckDuckGo\n\nagent = Agent(\n    storage=storage,\n    tools=[DuckDuckGo()],\n    show_tool_calls=True,\n    read_chat_history=True, # Read past inputs automatically\n    markdown=True\n)',
      JavaScript: '// Add checkpointer when compiling node graphs in JS:\nconst app = builder.compile({ checkpointer });'
    } 
  },
  { num: '04', title: 'Execute with Session ID', icon: '🚀', tag: 'Execution',
    body: 'Provide a target session_id parameter when running the agent. Session variables persist across multiple independent script runs.',
    code: { 
      Terminal: 'python capstone_agent.py', 
      JSON: '{\n  "session_id": "session-456",\n  "query": "What is my username?"\n}', 
      Python: '# Run session query 1\nagent.print_response("Hello, I am Alex", session_id="user-session-40")\n\n# Run query 2 (history is retained)\nagent.print_response("What is my name?", session_id="user-session-40")',
      JavaScript: '// Run graph utilizing unique thread configuration in JS:\nconst config = { configurable: { thread_id: "user-session-40" } };\nawait app.invoke({ input: "What is my name?" }, config);'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'Which class configures local SQLite session storage in Agno?', opts: ['SqlAgentStorage', 'LocalMemoryStorage', 'RedisAgentStorage'], ans: 0 },
  { q: 'What parameter must be passed during print_response() execution to retrieve corresponding chat histories?', opts: ['thread_uuid', 'session_id', 'user_id'], ans: 1 },
  { q: 'What does enabling read_chat_history=True accomplish on the Agent?', opts: ['It extracts web data feeds.', 'It tells the agent to automatically load and inject past chat turns from the SQL database into the current model prompt context.', 'It logs runtime traces to the Agno Cloud dashboard.'], ans: 1 }
];

export default function AgenticAIDay40({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [userName, setUserName] = useState("Alex");
  const [selectedSession, setSelectedSession] = useState("session-alpha");
  const [simQuery, setSimQuery] = useState("Recommend one book based on my interests.");
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
    setSimLogs([`[Agno Engine] Initializing persistent SqlAgentStorage...`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `💾 Connected to: 'tmp/sessions.db' (Table: production_assistant)`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `🔍 Checking session history matching session_id: "${selectedSession}"`]);

        setTimeout(() => {
          const fakeHistory = selectedSession === "session-alpha"
            ? `[User: "My name is ${userName}. I love reading classic science fiction novels like Dune." ➔ Agent: "Noted! Science fiction interest logged."]`
            : `[User: "My name is ${userName}. I study financial markets and day trading." ➔ Agent: "Noted! Markets interest logged."]`;

          setSimLogs(prev => [...prev, `🟢 History Records Retrieved:\n"${fakeHistory}"`]);

          setTimeout(() => {
            setSimLogs(prev => [...prev, `🚀 Processing new query: "${simQuery}"`]);

            setTimeout(() => {
              setSimLogs(prev => [...prev, `🧠 LLM Reasoning loop active (history context appended)...`]);

              setTimeout(() => {
                setSimLogs(prev => [...prev, `💾 Saving updated turns to SQLite storage...`]);

                setTimeout(() => {
                  setSimLogs(prev => [...prev, `🟢 Production execution complete.`]);
                  setSimOutput(
                    `### Recommendation for ${userName} (${selectedSession})\n\nBased on your history of **${
                      selectedSession === "session-alpha" 
                        ? "classic science fiction novels" 
                        : "financial markets and day trading"
                    }**, I highly recommend reading:\n\n${
                      selectedSession === "session-alpha"
                        ? "📖 **'Foundation' by Isaac Asimov** — A masterpiece detailing mathematical history projections and galactic empires."
                        : "📖 **'Reminiscences of a Stock Operator' by Edwin Lefèvre** — A timeless classic illustrating market trading psychology and financial maneuvers."
                    }`
                  );
                  setIsRunning(false);
                }, 1200);
              }, 1000);
            }, 1000);

          }, 1200);

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
                <Sparkles size={14} color="#fef08a" /> MODULE 8 • DAY 40
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 40: Capstone Production Agent</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Synthesize and deploy a production-grade Agno Agent. Configure persistent session memory in SQLite database files, enable search tools, and manage state indexes.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Structuring Persistent Memory</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Standard agent configurations retain chat history strictly inside in-memory arrays. Once the script terminates, the context is lost. In production, session storage databases like SQLite are connected.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75 }}>
                  By adding a storage table object, Agno intercepts incoming inputs, retrieves history records matching the user's `session_id`, runs LLM completions, and commits new turns to the SQL tables.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔩 Storage Providers
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>SqlAgentStorage:</strong> Serverless SQLite storage table creation.
                  <strong>PostgresAgentStorage:</strong> Production-grade hosting for multi-tenant users.
                  <strong>RedisAgentStorage:</strong> Fast key-value caches for immediate state retrievals.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Storage Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Persistent Session Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How session checkpointers preserve historical state in Agno:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>User Input (session_id)</div>
                  <div>➔</div>
                  <div style={{ background: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>SQL DB Lookup</div>
                  <div>➔</div>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>Context Synthesized</div>
                </div>

                <div style={{ background: '#fbbf24', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', color: '#0f172a' }}>
                  💾 sqlite database storage (commit new conversation turns)
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', color: 'white' }}>Stream Output Response</div>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Configuring SQL Session Databases</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define persistent structures, set database parameters, wire session layers, and run operations:</p>
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Capstone Sandbox</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>User Name:</label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Session Target:</label>
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }}>
                      <option value="session-alpha">Session Alpha (Sci-Fi Book Lover)</option>
                      <option value="session-beta">Session Beta (Financial Market Trader)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Query:</label>
                    <input type="text" value={simQuery} onChange={e => setSimQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Running Capstone...' : 'Trigger Capstone Run'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Runtime logs & Storage commit:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('💾') ? '#fbbf24' : log.includes('🟢') ? '#34d399' : '#e2e8f0' }} key={idx}>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Production Quick Reference</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Exposing SQL Storage backend:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    from agno.storage.agent.sqlite import SqlAgentStorage
                  </code>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Debugging console tool traces:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    Agent(show_tool_calls=True, debug_mode=True)
                  </code>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📝 Assignment: Coding a Persistent Assistant with SQL Storage</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Create a complete python script initializing a persistent assistant using SqlAgentStorage. Enable storage table triggers, register searches, and stream replies.</p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>Requirements:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Initialize `SqlAgentStorage` targeting `tmp/agent_storage.db` database.</li>
                  <li>Bind storage triggers and standard search tools.</li>
                  <li>Perform execution matching session IDs. Run two print_response queries sequentially to check name retention.</li>
                </ol>
              </div>

              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} disabled={assignmentSubmitted} placeholder="Paste your persistent storage python agent script here..." style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
              
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>🧠 Day 40 Conceptual Quiz</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'module8_project')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Finish Module (View Project) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
