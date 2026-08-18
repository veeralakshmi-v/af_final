import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Database, Award, Clipboard, Code, Shield } from 'lucide-react';
import flowiseProjectDiagram from '../../assets/flowise_final_project_diagram.png';

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

export default function AgenticAIModule4Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);

  // Form input state
  const [sessionUser, setSessionUser] = useState('Sarah Connor');
  const [sessionId, setSessionId] = useState('sarah_002');
  const [queryInput, setQueryInput] = useState('Estimate my monthly EMI for a 15,000 rupee course price over 3 months, then search the web for when the next cohort starts.');

  // Submission state
  const [repoUrl, setRepoUrl] = useState('');
  const [workflowJson, setWorkflowJson] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleFlowiseJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleFlowiseJson = {
    "nodes": [
      {
        "id": "agent_01",
        "type": "toolAgent",
        "data": {
          "label": "Master Tool Agent",
          "systemMessage": "You are the master coordinator. Route queries to appropriate tools."
        }
      },
      {
        "id": "rag_01",
        "type": "conversationalRetrievalQAChain",
        "data": {
          "label": "RAG Document Retrieval"
        }
      },
      {
        "id": "calc_01",
        "type": "calculator",
        "data": {
          "label": "Calculator Node"
        }
      }
    ],
    "edges": [
      { "source": "calc_01", "target": "agent_01", "targetHandle": "tools" },
      { "source": "rag_01", "target": "agent_01", "targetHandle": "tools" }
    ]
  };

  const runSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimStep(0);
    const logs = [
      "📡 REST API Triggered: Post prediction request received from " + sessionUser,
      "🧠 Master Tool Agent: Parsing question intent...",
      "🔢 Calculator Tool triggered: calculating EMI (15000 / 3)...",
      "🔢 Calculator Response: Monthly EMI = 5,000 INR",
      "🌐 SerpAPI Web Search Tool triggered: querying 'Alphafly Academy next cohort start date'...",
      "🌐 SerpAPI Response: Found cohort start date on alphafly.com (Aug 15th, 2026)",
      "💾 Buffer Memory: Loading session history for user '" + sessionId + "' to preserve conversation state",
      "🎉 Response compiled successfully: Formatted calculations and web information."
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
      delay += 850;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* 📋 Sub Tabs Nav */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#7c3aed' : '#64748b',
              border: 'none',
              padding: '0.55rem 1rem',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              transition: 'all .15s',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#f3e8ff', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 4 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Master Enterprise AI Agent Platform</h1>
                <p style={{ color: '#e9d5ff', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Design, implement, and deploy a visual AI platform using Flowise. Integrate RAG (Retrieval Augmented Generation) with dynamic multi-tool calling agents, conversation memory, and deploy as a live REST API.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Scenario</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Students need answers about course brochures, syllabus materials, cost calculations, early bird pricing, and session dates. You are tasked to construct a singular Flowise platform that can take a user's question, decide if it needs custom knowledge (RAG), a calculator, or a web search, execute the response, and store memory context.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  <strong>Your Goal:</strong> Build a complete visual flow containing a Master Tool Agent, connecting a Vector Store retriever node, a Calculator tool node, a Serper Google Search node, and a Buffer Memory node. Finally, deploy this as a custom web widget on a local site and test via prediction endpoints.
                </p>
              </div>
              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#5b21b6', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} style={{ color: '#7c3aed' }} /> Requirements Checklist
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ Flowise Master Tool Agent', '✅ RAG connection to Pinecone / Chroma', '✅ Calculator tool node integration', '✅ Serper Web Search tool node connection', '✅ REST API implementation and widget embed', '✅ Conversational Buffer memory integration'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.8rem 1.6rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,.35)' }}>
                System Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ── ARCHITECTURE ── */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ platform Architecture Map</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>This diagram illustrates the visual Flowise architecture of the Master Agent platform:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center' }}>
                <img src={flowiseProjectDiagram} alt="Flowise Final Project Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: 10 }} />
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Spec</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Implementation Guide <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── GUIDE ── */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🛠️ Step-by-Step Implementation</h2>
                {[
                  { title: 'Step 1: Build the RAG Retriever', body: 'Upload your course PDF brochure into a PDF loader node. Connect to character text splitter (500 limit). Set up Pinecone node to store vector embeddings.' },
                  { title: 'Step 2: Initialize Master Tool Agent', body: 'Drag the Tool Agent node to your canvas. Attach a ChatOpenAI model (gpt-4o-mini). Put the RAG retriever node inside a retriever tool node.' },
                  { title: 'Step 3: Setup Mathematical and Search Capabilities', body: 'Connect a Calculator tool node and a Serper Web Search tool node directly to the tools input port of the Master Agent.' },
                  { title: 'Step 4: Attach Buffer Memory', body: 'Connect Buffer Memory to the Agent memory port, set session IDs and window size to keep contextual details alive.' },
                  { title: 'Step 5: REST API deployment', body: 'Expose the Flowise Chatflow as a REST API endpoint. Configure the prediction URL and copy the embed widget HTML snippet for your website.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: 16 }}>
                    <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1rem', marginBottom: '0.4rem' }}>{step.title}</strong>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{step.body}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> Flowise Export Snippet
                  </strong>
                  <button onClick={copyJson} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                    {copied ? 'Copied!' : 'Copy Schema'}
                  </button>
                </div>
                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '350px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{JSON.stringify(sampleFlowiseJson, null, 2)}</pre>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '1.2rem', lineHeight: 1.4 }}>
                  💡 Hint: Import this boilerplate inside Flowise using 'Load Chatflow' to start building immediately.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Architecture</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Try Simulator <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── SIMULATOR ── */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Visual Agent Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Test how the Master Agent maps calculations and web searches using multi-tool outputs:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Cpu size={16} style={{ color: '#7c3aed' }} /> Agent API Request Input
                </h3>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Student Name</label>
                  <input type="text" value={sessionUser} onChange={e => setSessionUser(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Session ID (Memory Key)</label>
                  <input type="text" value={sessionId} onChange={e => setSessionId(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>User Query</label>
                  <textarea value={queryInput} onChange={e => setQueryInput(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 100, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <button onClick={runSimulator} disabled={isRunning} style={{ background: isRunning ? '#94a3b8' : '#7c3aed', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: isRunning ? 'default' : 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: isRunning ? 'none' : '0 4px 14px rgba(124,58,237,.25)', marginTop: 'auto', transition: 'all .2s' }}>
                  <Play size={15} /> {isRunning ? 'Running Master Agent...' : 'Predict Output'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', flex: 1, minHeight: 280, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Execution History & Logs</span>
                  {simLogs.length === 0 ? (
                    <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Fill details and click "Predict Output" to run sandbox.</span>
                  ) : (
                    simLogs.map((l, i) => (
                      <div key={i} style={{ fontSize: '.78rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 6, lineHeight: 1.4 }}>
                        {l}
                      </div>
                    ))
                  )}
                </div>

                {simStep >= 6 && (
                  <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 12, padding: '1rem' }}>
                    <span style={{ fontSize: '.65rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>🤖 API JSON Response</span>
                    <p style={{ margin: 0, fontSize: '.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                      <strong>text:</strong> Hi {sessionUser}, your estimated course EMI is 5,000 INR per month for 3 months. Based on our latest database query, the next cohort of the Agentic AI program starts on August 15th, 2026. Let me know if you would like me to book your slot.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div cardVariants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Guide</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Submit Project <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── SUBMISSION ── */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#f5f3ff', border: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
                  <Trophy size={20} style={{ color: '#7c3aed' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Final Project Submission</h2>
                  <span style={{ fontSize: '.8rem', color: '#7c3aed', fontWeight: 700 }}>Master Enterprise AI Agent Platform</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>GitHub / Project Repository URL</label>
                  <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/yourusername/flowise-enterprise-platform" style={{ width: '100%', padding: '.65rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Flowise Chatflow JSON Export</label>
                  <textarea value={workflowJson} onChange={e => setWorkflowJson(e.target.value)} placeholder="Paste the complete exported JSON of your Flowise chatflow here..." style={{ width: '100%', height: 180, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace', background: '#f8fafc' }} />
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} disabled={submitted || !repoUrl.trim() || !workflowJson.trim()} style={{ background: submitted ? '#059669' : '#7c3aed', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                {submitted ? <><CheckCircle size={16} /> Submitted Successfully! 🎉</> : 'Submit Final Project'}
              </button>

              {submitted && (
                <div style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid #c4b5fd', borderRadius: 16, padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#4c1d95', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Congratulations! Module 4 Completed!</h3>
                  <p style={{ color: '#6d28d9', margin: 0, fontSize: '0.98rem' }}>
                    Your master Flowise visual agent chatbot is validated. You have unlocked complete Enterprise visual workflow agent building superpowers!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
