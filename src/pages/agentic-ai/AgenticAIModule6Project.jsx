import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Code, Clipboard, Award } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SUB_TABS = [
  { id: 'overview', label: '📋 Project Spec' },
  { id: 'architecture', label: '🏗️ Architecture' },
  { id: 'guide', label: '🛠️ Implementation Guide' },
  { id: 'simulator', label: '💻 Sandbox Simulator' },
  { id: 'submission', label: '🚀 Final Submission' }
];

export default function AgenticAIModule6Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);

  // Input states
  const [ticketQuery, setTicketQuery] = useState('Need a refund on my invoice #9876. The server throws a 500 error.');
  const [sessionId, setSessionId] = useState('session_user_99');

  // Submission states
  const [repoUrl, setRepoUrl] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyBoilerplate = () => {
    const code = `from typing import Annotated, Literal, TypedDict\nfrom langgraph.graph import StateGraph, START, END\nfrom langgraph.checkpoint.memory import MemorySaver\nfrom langchain_core.messages import AIMessage, HumanMessage\nfrom langchain_openai import ChatOpenAI\n\n# 1. State Schema\nclass HelpdeskState(TypedDict):\n    messages: list\n    next_handler: Literal["billing", "tech", "end"]\n\n# 2. Specialist Nodes\ndef triage_node(state: HelpdeskState):\n    last_msg = state["messages"][-1].content.lower()\n    if "refund" in last_msg or "invoice" in last_msg:\n        return {"next_handler": "billing"}\n    elif "error" in last_msg or "server" in last_msg:\n        return {"next_handler": "tech"}\n    return {"next_handler": "end"}\n\ndef billing_node(state: HelpdeskState):\n    # billing response logic\n    return {\n        "messages": [AIMessage(content="Billing Agent: Verified ticket. Refund processed.")],\n        "next_handler": "end"\n    }\n\ndef tech_node(state: HelpdeskState):\n    # tech support response logic\n    return {\n        "messages": [AIMessage(content="Tech Agent: Checked server log. Issue resolved.")],\n        "next_handler": "end"\n    }\n\n# 3. Router Edge Logic\ndef route_choice(state: HelpdeskState):\n    return state["next_handler"]\n\n# 4. Assembly\nbuilder = StateGraph(HelpdeskState)\nbuilder.add_node("triage", triage_node)\nbuilder.add_node("billing", billing_node)\nbuilder.add_node("tech", tech_node)\n\nbuilder.add_edge(START, "triage")\nbuilder.add_conditional_edges(\n    "triage",\n    route_choice,\n    {\n        "billing": "billing",\n        "tech": "tech",\n        "end": END\n    }\n)\nbuilder.add_edge("billing", END)\nbuilder.add_edge("tech", END)\n\n# 5. Compile with persistence checkpointer\nmemory = MemorySaver()\napp = builder.compile(checkpointer=memory)`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimStep(0);
    const logs = [
      "📡 Client POST Request received (Session ID: " + sessionId + ")",
      "💾 Initializing thread checkpoint saver...",
      "🧠 Triage Node: Reading user ticket message...",
      "🔀 Triage Classifier: Refund keyword matched! Routing to [billing_node]",
      "🤖 Billing Specialist node executed: 'Refund processed'",
      "🔀 Triage Classifier: Error keyword matched! Routing to [tech_node]",
      "🤖 Tech Specialist node executed: 'Issue resolved'",
      "💾 State saved at thread ID version checkpointer...",
      "🟢 Graph execution completed successfully."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        setSimStep(index + 1);
        if (index === logs.length - 1) {
          setIsRunning(false);
        }
      }, delay);
      delay += 800;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button key={tab.id} onClick={() => changeTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? '#0284c7' : '#64748b', border: 'none', padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', transition: 'all .15s', boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 6 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Stateful LangGraph Customer Helpdesk</h1>
                <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Build a production-grade multi-agent customer support router. Classify incoming tickets, execute billing or technical specialist agent loops, persist sessions using SQL database checkpointers, and test edge paths.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Goal</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Your team wants to deploy an automated ticketing system. It must route payment requests to the billing agent and technical complaints to the engineering agent.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  You will code a Python application utilizing LangGraph. Construct state schemas, define the triage node, add conditional routing edges, compile with Checkpointers, and write test scenarios to verify thread isolation.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369a1', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Requirements:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ Define HelpdeskState with list & next_handler', '✅ Code Triage node classifier logic', '✅ Code Billing & Tech specialist agent nodes', '✅ Wire conditional edges mapping choices', '✅ Add SQLite/MemorySaver Checkpointer', '✅ Write tests verifying thread state persistence'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => onNavigate('agentic_ai_module6', 'day30')}>← Back to Day 30</button>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                View Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Helpdesk Graph Diagram</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How customer queries traverse through triage, conditional routers, and specialist nodes:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                {/* Visual Architecture flowchart */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>Triage Classifier Node</div>
                </div>
                
                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼ (Conditional routing decision edge)</div>
                
                <div style={{ display: 'flex', gap: '30px', color: 'white' }}>
                  <div style={{ border: '1px solid #fbbf24', background: 'rgba(251,191,36,0.05)', padding: '1rem', borderRadius: 12, minWidth: 150 }}>
                    <span style={{ fontSize: '.7rem', color: '#fbbf24', display: 'block', marginBottom: 4, fontWeight: 700 }}>PAYMENT TICKET</span>
                    <strong style={{ fontSize: '.88rem' }}>billing_agent</strong>
                  </div>
                  
                  <div style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,0.05)', padding: '1rem', borderRadius: 12, minWidth: 150 }}>
                    <span style={{ fontSize: '.7rem', color: '#a855f7', display: 'block', marginBottom: 4, fontWeight: 700 }}>LOG / ERRORS</span>
                    <strong style={{ fontSize: '.88rem' }}>tech_agent</strong>
                  </div>

                  <div style={{ border: '1px solid #ef4444', background: 'rgba(239,68,68,0.05)', padding: '1rem', borderRadius: 12, minWidth: 150 }}>
                    <span style={{ fontSize: '.7rem', color: '#ef4444', display: 'block', marginBottom: 4, fontWeight: 700 }}>NO SPECIALIST</span>
                    <strong style={{ fontSize: '.88rem' }}>END</strong>
                  </div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', color: 'white' }}>END</div>

              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Guide <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, overflow: 'hidden', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.8rem 2.2rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', margin: 0 }}>🐍 Python Boilerplate Blueprint</h3>
                  <p style={{ color: '#64748b', fontSize: '.85rem', margin: '4px 0 0' }}>Complete multi-agent structure to compile and build your application:</p>
                </div>
                <button onClick={copyBoilerplate} style={{ background: copied ? '#059669' : '#0284c7', color: 'white', border: 'none', padding: '.55rem 1.2rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.84rem' }}>
                  {copied ? 'Copied Boilerplate!' : 'Copy Boilerplate'}
                </button>
              </div>
              <div style={{ padding: '1.8rem 2.2rem', maxHeight: 450, overflowY: 'auto' }}>
                <pre style={{ margin: 0, fontSize: '.85rem', color: '#60a5fa', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
{`from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI

# 1. State Schema
class HelpdeskState(TypedDict):
    messages: list
    next_handler: Literal["billing", "tech", "end"]

# 2. Specialist Nodes
def triage_node(state: HelpdeskState):
    last_msg = state["messages"][-1].content.lower()
    if "refund" in last_msg or "invoice" in last_msg:
        return {"next_handler": "billing"}
    elif "error" in last_msg or "server" in last_msg:
        return {"next_handler": "tech"}
    return {"next_handler": "end"}

def billing_node(state: HelpdeskState):
    return {
        "messages": [AIMessage(content="Billing Agent: Verified ticket. Refund processed.")],
        "next_handler": "end"
    }

def tech_node(state: HelpdeskState):
    return {
        "messages": [AIMessage(content="Tech Agent: Checked server log. Issue resolved.")],
        "next_handler": "end"
    }

# 3. Router Edge Logic
def route_choice(state: HelpdeskState):
    return state["next_handler"]

# 4. Assembly
builder = StateGraph(HelpdeskState)
builder.add_node("triage", triage_node)
builder.add_node("billing", billing_node)
builder.add_node("tech", tech_node)

builder.add_edge(START, "triage")
builder.add_conditional_edges(
    "triage",
    route_choice,
    {
        "billing": "billing",
        "tech": "tech",
        "end": END
    }
)
builder.add_edge("billing", END)
builder.add_edge("tech", END)

# 5. Compile with persistence checkpointer
memory = MemorySaver()
app = builder.compile(checkpointer=memory)`}
                </pre>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Simulator <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Sandbox Input Variables</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Session thread ID:</label>
                  <input type="text" value={sessionId} onChange={e => setSessionId(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Simulated ticket text:</label>
                  <textarea value={ticketQuery} onChange={e => setTicketQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 80, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                <button onClick={runSimulator} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Running Simulation...' : 'Start Execution Run'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.4rem', marginBottom: '0.8rem' }}>🖥️ Graph Transaction Execution Log:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '.8rem', color: '#e2e8f0' }}>
                  {simLogs.map((log, index) => (
                    <div key={index} style={{ 
                      color: log.includes('Triage') ? '#38bdf8' : log.includes('Specialist') ? '#34d399' : log.includes('completed') ? '#10b981' : '#e2e8f0', 
                      borderLeft: '2px solid', 
                      borderColor: log.includes('Specialist') ? '#34d399' : '#0284c7', 
                      paddingLeft: 10 
                    }}>
                      {log}
                    </div>
                  ))}
                  {simLogs.length === 0 && (
                    <span style={{ color: '#64748b', fontStyle: 'italic' }}>Logs will display here when execution is started.</span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Proceed to Submit <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SUBMISSION */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🚀 Final Capstone Submission</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Provide the GitHub URL and paste the final working source code to complete the module:</p>

              {!submitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ fontSize: '.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>GitHub Repository Link:</label>
                    <input type="url" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/username/langgraph-support-desk" style={{ width: '100%', padding: '.75rem', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: '.9rem', outline: 'none' }}/>
                  </div>
                  <div>
                    <label style={{ fontSize: '.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Paste Complete Python Code:</label>
                    <textarea value={codeContent} onChange={e => setCodeContent(e.target.value)} placeholder="from typing import..." style={{ width: '100%', height: 200, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '.88rem', fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                  </div>
                  <button onClick={() => setSubmitted(true)} disabled={!repoUrl.trim() || !codeContent.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '1rem' }}>
                    Submit Final Project
                  </button>
                </div>
              ) : (
                <div style={{ background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', border: '1px solid #10b981', borderRadius: 18, padding: '2.5rem', textAlign: 'center' }}>
                  <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46', margin: '0 0 0.5rem 0' }}>Project Submitted Successfully!</h3>
                  <p style={{ color: '#047857', margin: '0 0 1.5rem 0', fontSize: '.95rem' }}>Our automated testing compiler is currently evaluating your code pipeline logic.</p>
                  <button onClick={() => setSubmitted(false)} style={{ background: '#059669', color: 'white', border: 'none', padding: '.6rem 1.2rem', borderRadius: 8, cursor: 'pointer', fontSize: '.82rem', fontWeight: 700 }}>
                    Edit Submission
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('simulator')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Back to Dashboard</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
