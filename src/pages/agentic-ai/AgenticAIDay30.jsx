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
  { num: '01', title: 'State Schema Definition', icon: '📝', tag: 'State Setup',
    body: 'Define a shared HelpdeskState schema to store conversation messages and routing target next_handler key.',
    code: { 
      Terminal: '# Install libraries', 
      JSON: '{\n  "state": {\n    "messages": "list",\n    "next_handler": "str"\n  }\n}', 
      Python: 'from typing import TypedDict, Annotated, Literal\nfrom langgraph.graph.message import add_messages\n\nclass HelpdeskState(TypedDict):\n    messages: Annotated[list, add_messages]\n    next_handler: Literal["billing", "tech", "end"]',
      JavaScript: 'import { Annotation } from "@langchain/langgraph";\n\nconst HelpdeskState = Annotation.define({\n  messages: Annotation({\n    reducer: (x, y) => x.concat(y),\n    default: () => [],\n  }),\n  nextHandler: Annotation(),\n});'
    } 
  },
  { num: '02', title: 'Implement Node Handlers', icon: '⚙️', tag: 'Graph Nodes',
    body: 'Implement the Triage node classifier (evaluates queries) and the specialist agent nodes.',
    code: { 
      Terminal: '# Setup node functions', 
      JSON: '{\n  "nodes": ["triage", "billing", "tech"]\n}', 
      Python: 'def triage_node(state: HelpdeskState):\n    content = state["messages"][-1].content.lower()\n    if "refund" in content or "invoice" in content:\n        return {"next_handler": "billing"}\n    elif "error" in content or "server" in content:\n        return {"next_handler": "tech"}\n    return {"next_handler": "end"}\n\ndef billing_node(state: HelpdeskState):\n    return {"messages": [("assistant", "Billing Agent: Checked invoice and refund processed.")]}\n\ndef tech_node(state: HelpdeskState):\n    return {"messages": [("assistant", "Tech Agent: Server error logs examined. Resolved.")]}',
      JavaScript: 'async function triageNode(state) {\n  const content = state.messages[state.messages.length - 1].content.toLowerCase();\n  if (content.includes("refund") || content.includes("invoice")) {\n    return { nextHandler: "billing" };\n  } else if (content.includes("error") || content.includes("server")) {\n    return { nextHandler: "tech" };\n  }\n  return { nextHandler: "end" };\n}\n\nasync function billingNode(state) {\n  return { messages: [{ role: "assistant", content: "Billing Agent: Checked invoice and refund processed." }] };\n}\n\nasync function techNode(state) {\n  return { messages: [{ role: "assistant", content: "Tech Agent: Server error logs examined. Resolved." }] };\n}'
    } 
  },
  { num: '03', title: 'Register Nodes and Routes', icon: '🔗', tag: 'Graph Assembly',
    body: 'Initialize the builder, register nodes, and set the entrypoint.',
    code: { 
      Terminal: '# Register nodes in workflow builder', 
      JSON: '{\n  "entry": "triage"\n}', 
      Python: 'from langgraph.graph import StateGraph, START\n\nbuilder = StateGraph(HelpdeskState)\nbuilder.add_node("triage", triage_node)\nbuilder.add_node("billing", billing_node)\nbuilder.add_node("tech", tech_node)\n\nbuilder.add_edge(START, "triage")',
      JavaScript: 'import { StateGraph, START } from "@langchain/langgraph";\n\nconst builder = new StateGraph(HelpdeskState)\n  .addNode("triage", triageNode)\n  .addNode("billing", billingNode)\n  .addNode("tech", techNode)\n  .addEdge(START, "triage");'
    } 
  },
  { num: '04', title: 'Define Conditional Edges', icon: '🔀', tag: 'Edges Setup',
    body: 'Add conditional routing edge map targeting the router key outputs to billing/tech/END.',
    code: { 
      Terminal: '# Add mapping conditional routes', 
      JSON: '{\n  "conditional_edges": "triage -> route_choice"\n}', 
      Python: 'from langgraph.graph import END\n\ndef route_choice(state: HelpdeskState):\n    return state["next_handler"]\n\nbuilder.add_conditional_edges(\n    "triage",\n    route_choice,\n    {\n        "billing": "billing",\n        "tech": "tech",\n        "end": END\n    }\n)\nbuilder.add_edge("billing", END)\nbuilder.add_edge("tech", END)',
      JavaScript: 'import { END } from "@langchain/langgraph";\n\nfunction routeChoice(state) {\n  return state.nextHandler;\n}\n\nbuilder.addConditionalEdges("triage", routeChoice, {\n  billing: "billing",\n  tech: "tech",\n  end: END\n});\nbuilder.addEdge("billing", END);\nbuilder.addEdge("tech", END);'
    } 
  },
  { num: '05', title: 'Compile and Execute Threads', icon: '🚀', tag: 'Execution',
    body: 'Compile passing checkpointer memory instances. Execute invoking unique thread IDs.',
    code: { 
      Terminal: 'python run_capstone.py', 
      JSON: '{\n  "output": "Refund processed"\n}', 
      Python: 'from langgraph.checkpoint.memory import MemorySaver\n\nmemory = MemorySaver()\napp = builder.compile(checkpointer=memory)\n\nconfig = {"configurable": {"thread_id": "cust_101"}}\nresponse = app.invoke({"messages": [("user", "Need refund on invoice #44")]}, config)\nprint(response["messages"][-1].content)',
      JavaScript: 'import { MemorySaver } from "@langchain/langgraph";\n\nconst app = builder.compile({ checkpointer: new MemorySaver() });\nconst response = await app.invoke({\n  messages: [{ role: "user", content: "Need refund on invoice #44" }]\n}, { configurable: { threadId: "cust_101" } });\nconsole.log(response.messages[response.messages.length - 1].content);'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'In this capstone project, what is the role of the Triage node?', opts: ['To answer billing questions directly.', 'To evaluate the incoming user ticket, write routing keys to state, and delegate to the appropriate specialist agent node.', 'To delete support logs.'], ans: 1 },
  { q: 'Why is next_handler stored in the graph State instead of passed as direct returns?', opts: ['Because nodes must communicate exclusively by writing variables to the shared persistent state schema in LangGraph.', 'It reduces compiler compile times.', 'To make it run on local CPUs.'], ans: 0 },
  { q: 'How is persistence added to this multi-agent support center?', opts: ['Through a standard LLM prompt system.', 'By compiling the StateGraph using checkpointer=MemorySaver().', 'It cannot be persisted.'], ans: 1 }
];

export default function AgenticAIDay30({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [ticketInput, setTicketInput] = useState("Need refund on invoice #4422");
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeName, setActiveNodeName] = useState('START');
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
    setActiveNodeName('START');
    setSimLogs([`[START] Customer ticket received: "${ticketInput}"`]);
    setSimOutput('');

    setTimeout(() => {
      // Step 1: START -> triage
      setActiveNodeName('triage');
      setSimLogs(prev => [...prev, `[triage]: Inspecting keywords in human ticket content...`]);

      setTimeout(() => {
        let routedTo = 'end';
        let actionLog = '';
        let finalReply = '';

        if (ticketInput.toLowerCase().includes('refund') || ticketInput.toLowerCase().includes('invoice')) {
          routedTo = 'billing';
          actionLog = `🔀 [Router]: Match found (Billing). Delegating to billing_agent node.`;
          finalReply = `Billing Agent: Checked transaction records for invoice #4422. Refunding has been processed. Output payload verified.`;
        } else if (ticketInput.toLowerCase().includes('error') || ticketInput.toLowerCase().includes('server')) {
          routedTo = 'tech';
          actionLog = `🔀 [Router]: Match found (Tech). Delegating to tech_agent node.`;
          finalReply = `Tech Support: Diagnostic logs indicate 500 error. Recommending node process recycle.`;
        } else {
          actionLog = `🔀 [Router]: No match found. Routing directly to END.`;
          finalReply = `Triage Agent: Thank you for your inquiry. Resolving ticket.`;
        }

        setSimLogs(prev => [...prev, actionLog]);
        
        if (routedTo !== 'end') {
          setTimeout(() => {
            setActiveNodeName(routedTo);
            setSimLogs(prev => [...prev, `[${routedTo}]: Node active. Executing specialist responses...`]);

            setTimeout(() => {
              setActiveNodeName('END');
              setSimLogs(prev => [...prev, `[System]: specialist output successfully updated in State. Thread closed.`]);
              setSimOutput(finalReply);
              setIsRunning(false);
            }, 1000);

          }, 1000);
        } else {
          setTimeout(() => {
            setActiveNodeName('END');
            setSimLogs(prev => [...prev, `[System]: Thread closed.`]);
            setSimOutput(finalReply);
            setIsRunning(false);
          }, 1000);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 6 • DAY 30
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 30: Capstone LangGraph Agent</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build a real-time Multi-Agent Customer Support Router. Triage customer queries, write routing parameters to the shared state, call specialist agents dynamically, and persist messages.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Multi-Agent Routing Patterns</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  In large enterprise workflows, a single agent model becomes slow and error-prone when handles too many tasks. We solve this by splitting duties.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  This capstone project implements a Triage router node which classifies tickets. It delegates work to specialist billing agents or technical advisors.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🔩 Source Code Overview
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  The source code tab provides a fully functional, production-ready implementation of a multi-agent helpdesk in Python and Node.js.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Helpdesk Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Multi-Agent Triage Diagram</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Below is the dynamic layout of the triage agent routing user queries:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>triage node</div>
                </div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>▼ (Evaluates next_handler value)</div>
                
                <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
                  <div style={{ border: '1px solid #fbbf24', background: 'rgba(251,191,36,0.05)', padding: '0.8rem', borderRadius: 10 }}>
                    <span style={{ fontSize: '.65rem', color: '#fbbf24', display: 'block', fontWeight: 700 }}>billing</span>
                    <strong style={{ fontSize: '.84rem' }}>billing_node</strong>
                  </div>
                  <div style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,0.05)', padding: '0.8rem', borderRadius: 10 }}>
                    <span style={{ fontSize: '.65rem', color: '#a855f7', display: 'block', fontWeight: 700 }}>tech</span>
                    <strong style={{ fontSize: '.84rem' }}>tech_node</strong>
                  </div>
                  <div style={{ border: '1px solid #ef4444', background: 'rgba(239,68,68,0.05)', padding: '0.8rem', borderRadius: 10 }}>
                    <span style={{ fontSize: '.65rem', color: '#ef4444', display: 'block', fontWeight: 700 }}>end</span>
                    <strong style={{ fontSize: '.84rem' }}>END</strong>
                  </div>
                </div>
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
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Copy and run this code locally to launch your multi-agent support agent:</p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Multi-Agent Support Helpdesk</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Input standard support queries and watch Triage route to specialist billing or tech nodes:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🔧 Submit Support Ticket</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Support Ticket Text:</label>
                  <textarea value={ticketInput} onChange={e => setTicketInput(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 95, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>Quick Templates:</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['Need refund on invoice #4422', 'Server error 500 in auth log', 'How do I log in?'].map((t) => (
                      <button key={t} onClick={() => setTicketInput(t)} disabled={isRunning} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, padding: '3px 8px', fontSize: '0.72rem', color: '#475569', cursor: 'pointer' }} key={t}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: '1rem' }}>
                  {isRunning ? 'Routing Ticket...' : 'Submit Support Ticket'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto', maxHeight: 480 }}>
                
                {/* Visual Graph Layout */}
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🗺️ Multi-Agent Routing Map</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center', background: '#1e293b', padding: '1rem', borderRadius: 10 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'START' ? '#10b981' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>START</div>
                      <div style={{ color: '#475569' }}>➔</div>
                      <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'triage' ? '#0284c7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>Triage Node</div>
                    </div>
                    
                    <div style={{ color: '#475569', fontSize: '0.8rem', margin: '-4px 0' }}>🔀 Triage Classifier routing</div>
                    
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#fbbf24', fontWeight: 700 }}>[Billing]</span>
                        <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'billing' ? '#fbbf24' : '#334155', color: activeNodeName === 'billing' ? '#0f172a' : 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>billing_agent</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 700 }}>[Tech]</span>
                        <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'tech' ? '#a855f7' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem', transition: 'all 0.3s' }}>tech_agent</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 700 }}>[Other]</span>
                        <div style={{ padding: '4px 10px', borderRadius: 6, background: activeNodeName === 'END' && !simOutput ? '#ef4444' : '#334155', color: 'white', fontWeight: 700, fontSize: '.75rem' }}>END</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Inspector */}
                <div style={{ flex: 1, background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>📋 Trace Execution Logs</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem' }}>
                    {simLogs.map((log, i) => (
                      <div style={{ color: log.includes('Router') ? '#fbbf24' : log.includes('Triage') || log.includes('specialist') ? '#38bdf8' : '#e2e8f0' }} key={i}>
                        {log}
                      </div>
                    ))}
                  </div>
                  
                  {simOutput && (
                    <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, padding: '1rem', marginTop: '1rem' }}>
                      <span style={{ fontSize: '.65rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📄 Triage & Specialist Final Answer</span>
                      <pre style={{ margin: 0, fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
                    </div>
                  )}
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 30 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Comprehensive syntax configurations for multi-agent support setups:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# 1. State definition
class SupportState(TypedDict):
    messages: list
    next_handler: str

# 2. Add specialist nodes
builder.add_node("triage", triage_node)
builder.add_node("billing", billing_node)

# 3. Router logic
builder.add_conditional_edges(
    "triage",
    lambda state: state["next_handler"],
    {"billing": "billing", "end": END}
)`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🟨 JavaScript Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`// 1. State definition
const SupportState = Annotation.define({
  messages: Annotation({ reducer: (x,y) => x.concat(y) }),
  nextHandler: Annotation()
});

// 2. Assembler
builder.addNode("triage", triageNode);
builder.addNode("billing", billingNode);

// 3. Router logic in JS
builder.addConditionalEdges(
  "triage",
  (state) => state.nextHandler,
  { billing: "billing", end: END }
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 30 Assignment: Multi-Agent Route compilation</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program that integrates a triage agent and two specialist sub-agents (Feedback Agent and Order Agent) inside a unified LangGraph graph. Test using thread persistence memory.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="def feedback_agent(state):&#10;    # feedback agent code&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 30 Quiz Assessment</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module6', 'module6_project')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Finish Module (View Project) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
