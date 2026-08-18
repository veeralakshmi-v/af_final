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
  { num: '01', title: 'Implement Agent & Action Nodes', icon: '🧠', tag: 'Nodes Setup',
    body: 'Declare the standard model agent node (calls LLM with bound tools) and action tool node (executes requested tools).',
    code: { 
      Terminal: '# Set up OpenAI API Key\nexport OPENAI_API_KEY="sk-..."', 
      JSON: '{\n  "nodes": ["call_model", "call_tools"]\n}', 
      Python: 'from langchain_openai import ChatOpenAI\n\nllm = ChatOpenAI(model="gpt-4o-mini")\n\ndef call_model(state: AgentState):\n    messages = state["messages"]\n    response = llm.invoke(messages)\n    return {"messages": [response]}\n\ndef call_tools(state: AgentState):\n    # Tool execution node logic\n    return {"messages": [("assistant", "Tool executed output")]}',
      JavaScript: 'import { ChatOpenAI } from "@langchain/openai";\n\nconst llm = new ChatOpenAI({ modelName: "gpt-4o-mini" });\n\nasync function callModel(state) {\n  const response = await llm.invoke(state.messages);\n  return { messages: [response] };\n}\n\nasync function callTools(state) {\n  return { messages: [{ role: "assistant", content: "Tool executed output" }] };\n}'
    } 
  },
  { num: '02', title: 'Write Router Function', icon: '🔀', tag: 'Routing Logic',
    body: 'A router reads state messages, looks at the last message, and returns a routing choice key like "call_tools" or "end".',
    code: { 
      Terminal: '# Prepare routing conditions', 
      JSON: '{\n  "router": "route_choice"\n}', 
      Python: 'def route_choice(state: AgentState) -> str:\n    last_message = state["messages"][-1]\n    if last_message.tool_calls:\n        return "call_tools"\n    return "end"',
      JavaScript: 'function routeChoice(state) {\n  const lastMessage = state.messages[state.messages.length - 1];\n  if (lastMessage?.toolCalls?.length > 0) {\n    return "call_tools";\n  }\n  return "end";\n}'
    } 
  },
  { num: '03', title: 'Register Graph Nodes', icon: '⚙️', tag: 'Registration',
    body: 'Create the StateGraph instance and register both the agent node and tool execution nodes.',
    code: { 
      Terminal: '# Initialize StateGraph', 
      JSON: '{\n  "builder": "StateGraph"\n}', 
      Python: 'from langgraph.graph import StateGraph\n\nbuilder = StateGraph(AgentState)\nbuilder.add_node("agent", call_model)\nbuilder.add_node("action", call_tools)',
      JavaScript: 'import { StateGraph } from "@langchain/langgraph";\n\nconst builder = new StateGraph(AgentState)\n  .addNode("agent", callModel)\n  .addNode("action", callTools);'
    } 
  },
  { num: '04', title: 'Configure Conditional Edges', icon: '🔗', tag: 'Conditional Edges',
    body: 'Register the conditional routing path mapping the router output keys to destination node ids.',
    code: { 
      Terminal: '# Register edges', 
      JSON: '{\n  "conditional_edge": "agent -> route_choice"\n}', 
      Python: 'from langgraph.graph import END\n\nbuilder.add_conditional_edges(\n    "agent",\n    route_choice,\n    {\n        "call_tools": "action",\n        "end": END\n    }\n)',
      JavaScript: 'import { END } from "@langchain/langgraph";\n\nbuilder.addConditionalEdges(\n  "agent",\n  routeChoice,\n  {\n    call_tools: "action",\n    end: END\n  }\n);'
    } 
  },
  { num: '05', title: 'Wire Cycle Loop & Compile', icon: '🚀', tag: 'Graph Loop',
    body: 'Wire the static edge from action node back to agent model to loop, set START entry point, and compile.',
    code: { 
      Terminal: 'python run_react.py', 
      JSON: '{\n  "pipeline": "START -> agent -> (conditional router) -> action -> agent"\n}', 
      Python: 'from langgraph.graph import START\n\nbuilder.add_edge("action", "agent")\nbuilder.add_edge(START, "agent")\n\napp = builder.compile()\n# Execution executes loop recursively',
      JavaScript: 'builder.addEdge("action", "agent");\nbuilder.addEdge(START, "agent");\n\nconst app = builder.compile();'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'How does LangGraph execute a conditional edge?', opts: ['It runs all nodes at once.', 'It evaluates the router function to determine which node to activate next dynamically.', 'It pauses execution and waits for human input.'], ans: 1 },
  { q: 'Why do we need a loop cycle in tool agents?', opts: ['To prevent model timeouts.', 'So the model can review tool execution results (Observations) and formulate a final answer or execute additional tools.', 'To delete system variables.'], ans: 1 },
  { q: 'Which method adds conditional transitions to StateGraph?', opts: ['add_node()', 'add_conditional_edges()', 'compile()'], ans: 1 }
];

export default function AgenticAIDay28({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [queryType, setQueryType] = useState('WithTool'); // WithTool or Direct
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
    setSimLogs([`[START] Entering StateGraph...`]);

    setTimeout(() => {
      // Step 1: START -> agent
      setActiveNodesPath(prev => [...prev, 'agent']);
      setSimLogs(prev => [...prev, `[agent]: Analyzing query...`]);

      setTimeout(() => {
        if (queryType === 'WithTool') {
          // Route to action
          setActiveNodesPath(prev => [...prev, 'action']);
          setSimLogs(prev => [...prev, `🔀 [Router]: Tool call detected! Routing to [action] node.`, `[action]: Running tool calculations...`]);

          setTimeout(() => {
            // Loop back: action -> agent
            setActiveNodesPath(prev => [...prev, 'agent']);
            setSimLogs(prev => [...prev, `🔄 Loop Back: Tool complete. Routing back to [agent] node to evaluate...`]);

            setTimeout(() => {
              // Final answer -> END
              setActiveNodesPath(prev => [...prev, 'END']);
              setSimLogs(prev => [...prev, `🔀 [Router]: Complete. Routing to [END] node.`, `[System]: Termination successful.`]);
              setIsRunning(false);
            }, 1000);

          }, 1200);

        } else {
          // Direct response -> END
          setActiveNodesPath(prev => [...prev, 'END']);
          setSimLogs(prev => [...prev, `🔀 [Router]: Direct answer complete. Routing to [END] node.`, `[System]: Termination successful.`]);
          setIsRunning(false);
        }
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
                <Sparkles size={14} color="#fef08a" /> MODULE 6 • DAY 28
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Conditional Edges & Routing</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build intelligent routers. Learn how router functions dynamically navigate based on model tool calling decisions to create robust, self-correcting agent execution loops.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Dynamically Branching Graphs</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Static normal edges are useful for simple linear execution pipelines. However, a true AI agent must decide where to go next based on LLM outputs.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  In LangGraph, you construct dynamic paths using **conditional edges**. A routing function receives the graph state, performs logic (e.g. checks if the model output contains tool calls), and outputs the target node identifier.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔄 Closing Loop Cycles
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  By drawing a normal edge from the **Action (Tool)** node back to the **Agent (Model)** node, you close the cycle. The agent receives the tool output as a new observation and decides whether to output a final reply or activate tools again.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Routing Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Cyclic Loop Architecture Diagram</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Below is the ReAct loop structure connecting agents and tools dynamically:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>agent (Calls LLM)</div>
                </div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>▼ (Evaluates Conditional Edge Router)</div>
                
                <div style={{ display: 'flex', gap: '30px', color: 'white' }}>
                  <div style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,0.05)', padding: '0.8rem', borderRadius: 10 }}>
                    <span style={{ fontSize: '.65rem', color: '#a855f7', display: 'block', fontWeight: 700 }}>IF TOOLS REQUESTED</span>
                    <strong style={{ fontSize: '.84rem' }}>action (Calls Tool)</strong>
                  </div>
                  <div style={{ border: '1px solid #ef4444', background: 'rgba(239,68,68,0.05)', padding: '0.8rem', borderRadius: 10 }}>
                    <span style={{ fontSize: '.65rem', color: '#ef4444', display: 'block', fontWeight: 700 }}>IF COMPLETE</span>
                    <strong style={{ fontSize: '.84rem' }}>END</strong>
                  </div>
                </div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>▲ (action node static edge links back to agent)</div>
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
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define conditional routers, add branching edges, and compile loops:</p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Dynamic Routing Path Trace Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Toggle query type to trace visual edge branch splits across node paths:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Routing Configuration</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Simulated Query Type:</label>
                  <select value={queryType} onChange={e => setQueryType(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                    <option value="WithTool">Requires Calculator Tool ("What is 55 + 87?")</option>
                    <option value="Direct">Simple Direct Conversation ("Hi there")</option>
                  </select>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Tracing Path...' : 'Start Trace Running'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                {/* Visual Graph Layout */}
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🗺️ Conditional Graph Cycle Map</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '1rem', borderRadius: 10 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodesPath.includes('START') && activeNodesPath[activeNodesPath.length - 1] === 'START' ? '#10b981' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>START</div>
                      <div style={{ color: '#475569' }}>➔</div>
                      <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodesPath[activeNodesPath.length - 1] === 'agent' ? '#0284c7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>agent_model</div>
                    </div>
                    
                    <div style={{ color: '#475569', fontSize: '0.8rem', margin: '-4px 0' }}>🔀 (Conditional Router Edge)</div>
                    
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700 }}>[True]</span>
                        <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodesPath[activeNodesPath.length - 1] === 'action' ? '#a855f7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>calculator_node</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 700 }}>[False]</span>
                        <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodesPath[activeNodesPath.length - 1] === 'END' ? '#ef4444' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>END</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Inspector */}
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto', maxHeight: 180 }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>📋 Trace Execution Logs</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem' }}>
                    {simLogs.map((log, i) => (
                      <div style={{ color: log.includes('Router') ? '#fbbf24' : log.includes('Loop') ? '#a855f7' : '#e2e8f0' }} key={i}>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 28 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference imports and wiring syntax for conditional routers:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# 1. Routing Function
def router(state: AgentState):
    if len(state["messages"]) > 5:
        return "end"
    return "continue"

# 2. Add Conditional Edge
builder.add_conditional_edges(
    "agent_node",
    router,
    {
        "continue": "tool_node",
        "end": END
    }
)`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🟨 JavaScript Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`// 1. Routing Function
function router(state) {
  if (state.messages.length > 5) {
    return "end";
  }
  return "continue";
}

// 2. Add Conditional Edge in JS
builder.addConditionalEdges(
  "agent_node",
  router,
  {
    continue: "tool_node",
    end: END
  }
);`}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 28 Assignment: Build a Tool Router</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program that integrates `add_conditional_edges` with a router function. It should read a message list state, determine if a string payload contains the keyword 'API', and route to an 'api_node' or END accordingly.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="def api_router(state: AgentState) -> str:&#10;    # return 'call_api' or 'end'&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 28 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module6', 'day29')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 29) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
