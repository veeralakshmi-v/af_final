import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle, Database } from 'lucide-react';

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
  { num: '01', title: 'Prepare workspace imports', icon: '📦', tag: 'Setup',
    body: 'Import standard libraries, type checking libraries, and the StateGraph compiler elements.',
    code: { 
      Terminal: 'pip install langgraph langchain-openai', 
      JSON: '{\n  "dependencies": {\n    "langgraph": "latest"\n  }\n}', 
      Python: 'from typing import Annotated, TypedDict\nfrom langgraph.graph import StateGraph, START, END\nprint("Imports successful!")',
      JavaScript: 'import { StateGraph, START, END } from "@langchain/langgraph";\nconsole.log("StateGraph loaded successfully!");'
    } 
  },
  { num: '02', title: 'Define Custom Reducer', icon: '⚡', tag: 'Reducers',
    body: 'Reducers specify how updates merge into existing state variables. Use python Annotated custom functions to append logs lists.',
    code: { 
      Terminal: '# No shell commands required', 
      JSON: '{\n  "reducer": "append_lists"\n}', 
      Python: 'def append_reducer(left: list, right: list) -> list:\n    return left + right\n\nclass GraphState(TypedDict):\n    query: str\n    logs: Annotated[list[str], append_reducer]',
      JavaScript: 'import { Annotation } from "@langchain/langgraph";\n\nconst GraphState = Annotation.define({\n  query: Annotation(),\n  logs: Annotation({\n    reducer: (left, right) => left.concat(right),\n    default: () => [],\n  })\n});'
    } 
  },
  { num: '03', title: 'Implement Node A: Formatter', icon: '⚙️', tag: 'Formatter Node',
    body: 'Create the first processing node that reads the state, formats/normalizes raw string queries, and writes to logs.',
    code: { 
      Terminal: '# Formatter step operation', 
      JSON: '{\n  "node": "formatter"\n}', 
      Python: 'def format_query(state: GraphState):\n    raw_query = state.get("query", "")\n    clean_query = raw_query.strip().upper()\n    return {\n        "query": clean_query,\n        "logs": [f"Formatter node: cleaned query to \'{clean_query}\'"]\n    }',
      JavaScript: 'async function formatQuery(state) {\n  const cleanQuery = state.query.trim().toUpperCase();\n  return {\n    query: cleanQuery,\n    logs: [`Formatter node: cleaned query to \x27\${cleanQuery}\x27`]\n  };\n}'
    } 
  },
  { num: '04', title: 'Implement Node B: Database search', icon: '🔍', tag: 'Searcher Node',
    body: 'Create the second node that retrieves formatted queries, executes mock queries, and appends to the log list.',
    code: { 
      Terminal: '# Searcher step operation', 
      JSON: '{\n  "node": "searcher"\n}', 
      Python: 'def db_search(state: GraphState):\n    # Mock DB search\n    results = ["Invoice_A", "Invoice_B"]\n    return {\n        "logs": [f"Searcher node: completed database lookup. Found {len(results)} results."]\n    }',
      JavaScript: 'async function dbSearch(state) {\n  const results = ["Invoice_A", "Invoice_B"];\n  return {\n    logs: [`Searcher node: completed database lookup. Found \${results.length} results.`]\n  };\n}'
    } 
  },
  { num: '05', title: 'Connect and execute', icon: '🚀', tag: 'Wiring',
    body: 'Wire start edge to Formatter, connect Formatter to Searcher, and exit at END.',
    code: { 
      Terminal: 'python run_sequence.py', 
      JSON: '{\n  "pipeline": "START -> formatter -> searcher -> END"\n}', 
      Python: 'builder = StateGraph(GraphState)\nbuilder.add_node("formatter", format_query)\nbuilder.add_node("searcher", db_search)\n\nbuilder.add_edge(START, "formatter")\nbuilder.add_edge("formatter", "searcher")\nbuilder.add_edge("searcher", END)\n\napp = builder.compile()\nprint(app.invoke({"query": "   find items   ", "logs": []}))',
      JavaScript: 'const builder = new StateGraph(GraphState)\n  .addNode("formatter", formatQuery)\n  .addNode("searcher", dbSearch)\n  .addEdge(START, "formatter")\n  .addEdge("formatter", "searcher")\n  .addEdge("searcher", END);\n\nconst app = builder.compile();\nconsole.log(await app.invoke({ query: "   find items   ", logs: [] }));'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is a State Reducer function used for in LangGraph?', opts: ['To speed up computation.', 'To specify how partial updates returned by nodes merge into the main graph state database.', 'To delete local system databases.'], ans: 1 },
  { q: 'What happens if a node returns a dictionary containing a key not defined in the State schema?', opts: ['LangGraph throws a compilation error or ignores the extra key depending on strict schemas.', 'It deletes the workspace.', 'It formats your hard disk.'], ans: 0 },
  { q: 'What is a normal edge in LangGraph?', opts: ['A visual arrow showing conditional branch splits.', 'A direct, static transition line routing execution from one node straight to another.', 'A CSS border layout.'], ans: 1 }
];

export default function AgenticAIDay27({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [userQuery, setUserQuery] = useState("  find invoices  ");
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeName, setActiveNodeName] = useState('START');
  const [simState, setSimState] = useState({ query: '', logs: [] });

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
    setActiveNodeName('START');
    setSimState({ query: userQuery, logs: [] });

    // Step 1: Start -> formatter node
    setTimeout(() => {
      setActiveNodeName('formatter');
      setSimState(prev => ({
        ...prev,
        logs: [...prev.logs, `[formatter]: Formatted query to "${userQuery.trim().toUpperCase()}"`]
      }));

      // Step 2: formatter -> searcher node
      setTimeout(() => {
        setActiveNodeName('searcher');
        setSimState(prev => ({
          ...prev,
          logs: [...prev.logs, `[searcher]: Running database query search for "${userQuery.trim().toUpperCase()}"...`, `[searcher]: Search completed. Found logs: [Invoice_1, Invoice_2]`]
        }));

        // Step 3: searcher -> END
        setTimeout(() => {
          setActiveNodeName('END');
          setSimState(prev => ({
            ...prev,
            logs: [...prev.logs, `[System]: Pipeline complete.`]
          }));
          setIsRunning(false);
        }, 1000);

      }, 1200);

    }, 1000);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 6 • DAY 27
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Nodes, Edges & State Updates</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Master how graph logic progresses step by step. Learn how custom State Reducer functions merge state values and how sequential normal edges route data between nodes.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>The Flow of State Mutations</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Nodes behave like pure functions in functional programming. They read the current global state (AgentState), compute values, and return a dictionary of state modifications.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  By default, returning a key like `query` will overwrite `state["query"]`. However, list fields require appending rather than overwriting. This is where **State Reducer functions** play a vital role.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔩 Edge Mechanics
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Normal edges connect a source node to a destination node:
                  <code style={{ display: 'block', background: '#e0f2fe', padding: '0.5rem', borderRadius: 6, margin: '6px 0', fontFamily: 'monospace', fontSize: '0.8rem' }}>builder.add_edge("formatter", "searcher")</code>
                  This creates a deterministic flow where formatter always proceeds to searcher upon completion.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Sequence Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Sequential Nodes Pipeline</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Below is the sequential node layout of multiple nodes processing state:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>formatter node</div>
                  <div>➔</div>
                  <div style={{ background: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>searcher node</div>
                  <div>➔</div>
                  <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>END</div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '10px 0 0 0', maxWidth: '600px' }}>
                  The <code>formatter node</code> processes inputs and outputs list updates, which merge into the shared state using the <code>append_reducer</code>. Then, the <code>searcher node</code> reads that formatted query and performs a search.
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
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define states, create step nodes, and wire sequential execution paths:</p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Node Flow & State Reducer Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Input queries and watch how nodes append entries dynamically to the shared state logs list:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Input Configuration</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>User Query Input:</label>
                  <input type="text" value={userQuery} onChange={e => setUserQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Running Sequential Nodes...' : 'Execute State Workflow'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                {/* Visual Graph Layout */}
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🗺️ Sequential Graph Node Pipeline</span>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '0.8rem', borderRadius: 10 }}>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'START' ? '#10b981' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>START</div>
                    <div style={{ color: '#475569' }}>➔</div>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'formatter' ? '#0284c7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>formatter</div>
                    <div style={{ color: '#475569' }}>➔</div>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'searcher' ? '#7c3aed' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>searcher</div>
                    <div style={{ color: '#475569' }}>➔</div>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'END' ? '#ef4444' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>END</div>
                  </div>
                </div>

                {/* State Inspector */}
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 200 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💾 Current Shared State Schema</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '.78rem' }}>
                    <div><span style={{ color: '#38bdf8' }}>query:</span> <span style={{ color: '#e2e8f0' }}>"{simState.query || 'None'}"</span></div>
                    <div>
                      <span style={{ color: '#38bdf8' }}>logs (Annotated list with Append Reducer):</span>
                      <div style={{ paddingLeft: 12, color: '#f1f5f9' }}>
                        {simState.logs.length === 0 ? '[]' : simState.logs.map((log, i) => (
                          <div style={{ color: log.includes('[formatter]') ? '#38bdf8' : log.includes('[searcher]') ? '#34d399' : '#94a3b8' }} key={i}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 27 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Core syntax reference for custom reducers and sequential edges:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# 1. Custom Reducer
def append_logs(left: list, right: list) -> list:
    return left + right

class State(TypedDict):
    logs: Annotated[list[str], append_logs]

# 2. Sequential Edges
builder = StateGraph(State)
builder.add_node("node_a", func_a)
builder.add_node("node_b", func_b)

builder.add_edge(START, "node_a")
builder.add_edge("node_a", "node_b")
builder.add_edge("node_b", END)`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🟨 JavaScript Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`// 1. Custom Reducer
const State = Annotation.define({
  logs: Annotation({
    reducer: (left, right) => left.concat(right),
    default: () => []
  })
});

// 2. Sequential Edges
const builder = new StateGraph(State)
  .addNode("node_a", funcA)
  .addNode("node_b", funcB)
  .addEdge(START, "node_a")
  .addEdge("node_a", "node_b")
  .addEdge("node_b", END);`}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 27 Assignment: Custom List Reducer</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program that initializes a LangGraph StateGraph containing a custom state with a list of messages. Add a reducer function that appends new nodes observations to the messages list and prints the final state.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from typing import TypedDict, Annotated&#10;...&#10;def custom_reducer(left: list, right: list) -> list:&#10;    return left + right&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 27 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module6', 'day28')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 28) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
