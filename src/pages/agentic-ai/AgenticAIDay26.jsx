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
  { num: '01', title: 'Install Dependencies', icon: '📦', tag: 'Setup',
    body: 'Set up your local environment and install LangGraph alongside LangChain core modules and OpenAI integration SDK.',
    code: { 
      Terminal: 'pip install langgraph langchain-openai dotenv\n# For Node.js:\nnpm install @langchain/langgraph @langchain/core @langchain/openai dotenv', 
      JSON: '{\n  "dependencies": {\n    "@langchain/langgraph": "^0.2.0",\n    "@langchain/core": "^0.3.0",\n    "@langchain/openai": "^0.3.0"\n  }\n}', 
      Python: '# Verify LangGraph installation\nimport langgraph\nprint("LangGraph version:", langgraph.__version__)',
      JavaScript: '// Verify package imports in Node.js\nimport { StateGraph } from "@langchain/langgraph";\nconsole.log("LangGraph library loaded successfully!");'
    } 
  },
  { num: '02', title: 'Define Graph State', icon: '📝', tag: 'State Definition',
    body: 'Create a state schema to act as the shared memory database for all nodes. Use TypedDict in Python and Annotation in JS.',
    code: { 
      Terminal: '# No CLI commands required for schemas', 
      JSON: '{\n  "stateFields": {\n    "messages": "list",\n    "user_name": "str"\n  }\n}', 
      Python: 'from typing import TypedDict, Annotated\nfrom langgraph.graph.message import add_messages\n\n# State schema holds messages list and metadata\nclass AgentState(TypedDict):\n    messages: Annotated[list, add_messages]\n    user_name: str',
      JavaScript: 'import { Annotation } from "@langchain/langgraph";\n\n// Shared graph state in JS\nconst AgentState = Annotation.define({\n  messages: Annotation({\n    reducer: (x, y) => x.concat(y),\n    default: () => [],\n  }),\n  userName: Annotation(),\n});'
    } 
  },
  { num: '03', title: 'Implement Node Functions', icon: '⚙️', tag: 'Graph Nodes',
    body: 'Nodes are regular functions which read the current State, perform work (like API calls or LLM routing), and return state updates.',
    code: { 
      Terminal: '# Node runs within workflow runtime', 
      JSON: '{\n  "node": "welcome_node",\n  "updates": {"messages": "list"}\n}', 
      Python: '# Nodes return partial dictionaries that update State\ndef welcome_node(state: AgentState):\n    user = state.get("user_name", "Valued Guest")\n    return {\n        "messages": [("assistant", f"Hello {user}! Welcome to LangGraph.")]\n    }',
      JavaScript: '// Node function in JS\nasync function welcomeNode(state) {\n  const user = state.userName || "Valued Guest";\n  return {\n    messages: [{ role: "assistant", content: `Hello ${user}! Welcome to LangGraph.` }]\n  };\n}'
    } 
  },
  { num: '04', title: 'Assemble Graph Blueprint', icon: '🔗', tag: 'Wiring',
    body: 'Build the graph by instantiating StateGraph, adding nodes, and adding edges to connect nodes sequentially.',
    code: { 
      Terminal: '# Assemble graph structure', 
      JSON: '{\n  "entry": "START",\n  "nodes": ["welcome"],\n  "exit": "END"\n}', 
      Python: 'from langgraph.graph import StateGraph, START, END\n\n# Initialize builder\nbuilder = StateGraph(AgentState)\nbuilder.add_node("welcome", welcome_node)\n\n# Configure sequence flow edges\nbuilder.add_edge(START, "welcome")\nbuilder.add_edge("welcome", END)',
      JavaScript: 'import { StateGraph, START, END } from "@langchain/langgraph";\n\nconst builder = new StateGraph(AgentState)\n  .addNode("welcome", welcomeNode)\n  .addEdge(START, "welcome")\n  .addEdge("welcome", END);'
    } 
  },
  { num: '05', title: 'Compile and Execute', icon: '🚀', tag: 'Execution',
    body: 'Compile the builder into a runnable application. Invoke it with the initial state inputs to execute.',
    code: { 
      Terminal: 'python run_graph.py\n# Or Node.js:\nnode run_graph.js', 
      JSON: '{\n  "input": { "user_name": "Alex" },\n  "output": "Hello Alex! Welcome to LangGraph."\n}', 
      Python: '# Compile and run graph pipeline\napp = builder.compile()\n\ninputs = {"user_name": "Alex", "messages": []}\nresponse = app.invoke(inputs)\nprint(response["messages"][-1].content)',
      JavaScript: '// Compile and execute in JS\nconst app = builder.compile();\nconst response = await app.invoke({\n  userName: "Alex",\n  messages: []\n});\nconsole.log(response.messages[response.messages.length - 1].content);'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is the primary difference between a LangChain Chain and a LangGraph Graph?', opts: ['LangGraph is slower.', 'LangGraph naturally supports cyclic loop states and workflows, whereas standard chains are linear DAGs.', 'LangChain does not support models.'], ans: 1 },
  { q: 'What is the purpose of the State in LangGraph?', opts: ['To record performance metrics.', 'It acts as the shared, centralized memory database accessed and updated by all nodes in the graph.', 'To host database passwords.'], ans: 1 },
  { q: 'What does START and END represent in LangGraph?', opts: ['CSS classes for margins.', 'Virtual nodes representing the entrypoint boundary (START) and termination boundary (END) of the graph execution.', 'Keyboard keys.'], ans: 1 }
];

export default function AgenticAIDay26({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [userName, setUserName] = useState("Alex");
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeName, setActiveNodeName] = useState('START');
  const [simState, setSimState] = useState({ messages: [], userName: '' });

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
    setSimState({ messages: [], userName });

    // Step 1: Start
    setTimeout(() => {
      setActiveNodeName('welcome_node');
      setSimState(prev => ({
        ...prev,
        messages: [...prev.messages, { sender: 'System', text: 'Initializing AgentState...' }]
      }));

      // Step 2: Welcome Node execution
      setTimeout(() => {
        setSimState(prev => ({
          ...prev,
          messages: [...prev.messages, { sender: 'welcome_node', text: `Welcome response generated: "Hello ${userName}! How can I help you today?"` }]
        }));

        // Step 3: End Node
        setTimeout(() => {
          setActiveNodeName('END');
          setSimState(prev => ({
            ...prev,
            messages: [...prev.messages, { sender: 'System', text: 'Graph execution terminated successfully.' }]
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
                <Sparkles size={14} color="#fef08a" /> MODULE 6 • DAY 26
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Introduction to LangGraph</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to construct highly autonomous AI agents. Unlike standard LangChain chains, LangGraph allows modeling loops, cycles, and persistent shared graph state schemas.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Stateful Cyclic Workflows</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Traditional chains are Directed Acyclic Graphs (DAGs). Execution flows strictly forward from one step to the next.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  However, true agentic behavior requires **loops** — for example, letting an agent correct output based on verification results or re-running a tool search if information is missing. LangGraph introduces cycles while keeping graph states intact.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} /> Stateful vs. Stateless
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>LangChain Chains:</strong>
                  <span style={{ color: '#64748b' }}>Executes steps sequentially. Outputs from Step A feed directly to Step B. Hard to model arbitrary routing loops.</span>
                  <strong style={{ borderTop: '1px solid #bae6fd', paddingTop: '0.8rem' }}>LangGraph Graph:</strong>
                  <span style={{ color: '#64748b' }}>Nodes communicate exclusively by reading and writing to a shared, persistent state schema. Graph routing can loop infinitely until criteria is met.</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Graph Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ LangGraph Basic Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Below is the basic stateful execution layout of a simple single-node LangGraph structure:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>welcome_node (Mutates State)</div>
                  <div>➔</div>
                  <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>END</div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '10px 0 0 0', maxWidth: '600px' }}>
                  The graph starts, registers the initial state payload (like <code>user_name</code>), routes execution into <code>welcome_node</code>, updates state messages, and terminates at <code>END</code>.
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Graph State Visualizer</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Input state variables and watch how data changes as active nodes run:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Input Configuration</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>User Name:</label>
                  <input type="text" value={userName} onChange={e => setUserName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Executing Graph...' : 'Run State Graph'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                {/* Visual Graph Layout */}
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🗺️ Graph Active Node Path</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '0.8rem', borderRadius: 10 }}>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'START' ? '#10b981' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>START</div>
                    <div style={{ color: '#475569' }}>➔</div>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'welcome_node' ? '#0284c7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>welcome_node</div>
                    <div style={{ color: '#475569' }}>➔</div>
                    <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'END' ? '#ef4444' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>END</div>
                  </div>
                </div>

                {/* State Inspector */}
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 200 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💾 Current Shared State Schema</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '.78rem' }}>
                    <div><span style={{ color: '#38bdf8' }}>userName:</span> <span style={{ color: '#e2e8f0' }}>"{simState.userName || 'None'}"</span></div>
                    <div>
                      <span style={{ color: '#38bdf8' }}>messages:</span>
                      <div style={{ paddingLeft: 12, color: '#f1f5f9' }}>
                        {simState.messages.length === 0 ? '[]' : simState.messages.map((m, i) => (
                          <div style={{ color: m.sender === 'welcome_node' ? '#34d399' : '#94a3b8' }} key={i}>
                            - [{m.sender}]: {m.text}
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 26 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference for core imports and state definition syntax:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# 1. State Schema
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages

class State(TypedDict):
    messages: Annotated[list, add_messages]
    name: str

# 2. Builder assembly
from langgraph.graph import StateGraph, START, END

builder = StateGraph(State)
builder.add_node("welcome", welcome_func)
builder.add_edge(START, "welcome")
builder.add_edge("welcome", END)
app = builder.compile()`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🟨 JavaScript Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`// 1. State Definition
import { Annotation } from "@langchain/langgraph";

const State = Annotation.define({
  messages: Annotation({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  name: Annotation()
});

// 2. Builder assembly
import { StateGraph, START, END } from "@langchain/langgraph";

const builder = new StateGraph(State)
  .addNode("welcome", welcomeNode)
  .addEdge(START, "welcome")
  .addEdge("welcome", END);
const app = builder.compile();`}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 26 Assignment: Define a Custom State Graph</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program that initializes a LangGraph StateGraph containing a custom state TypedDict with a single integer count field. Add a node that increments the count and sets the entry and exit edges.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from typing import TypedDict&#10;from langgraph.graph import StateGraph, START, END&#10;...&#10;class State(TypedDict):&#10;    count: int&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 26 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module6', 'day27')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 27) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
