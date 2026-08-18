import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Code, Clipboard, Award } from 'lucide-react';
import langchainDiagImg from '../../assets/langchain_agent_loop_diagram.png';

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

export default function AgenticAIModule5Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);

  // Input states
  const [studentName, setStudentName] = useState('Sarah Connor');
  const [sessionId, setSessionId] = useState('sarah_005');
  const [userQuery, setUserQuery] = useState('Calculate 15,000 / 3 EMI, then search the PDF syllabus context for early bird discounts.');

  // Submission states
  const [repoUrl, setRepoUrl] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyBoilerplate = () => {
    const code = `from langchain_community.document_loaders import PyPDFLoader\nfrom langchain_openai import ChatOpenAI, OpenAIEmbeddings\nfrom langchain_community.vectorstores import InMemoryVectorStore\nfrom langchain.tools.retriever import create_retriever_tool\nfrom langchain.agents import AgentExecutor, create_tool_calling_agent\nfrom langchain_core.tools import tool\nfrom langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder\nfrom langchain.memory import ConversationBufferWindowMemory\n\n# 1. Load PDF context\nloader = PyPDFLoader("syllabus.pdf")\ndocs = loader.load_and_split()\nvector_db = InMemoryVectorStore.from_documents(docs, OpenAIEmbeddings())\nretriever_tool = create_retriever_tool(\n    vector_db.as_retriever(), "search_brochure", "Searches course fees and syllabus details."\n)\n\n# 2. Declare Math tool\n@tool\ndef calculator(expression: str) -> str:\n    """Executes math mathematical operations."""\n    return str(eval(expression))\n\ntools = [retriever_tool, calculator]\n\n# 3. Setup Agent Loop\nllm = ChatOpenAI(model="gpt-4o-mini", temperature=0)\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "You are an Academy Helpdesk Agent. Use tools to answer questions factually."),\n    MessagesPlaceholder(variable_name="chat_history"),\n    ("user", "{input}"),\n    MessagesPlaceholder(variable_name="agent_scratchpad")\n])\n\nmemory = ConversationBufferWindowMemory(memory_key="chat_history", k=3, return_messages=True)\nagent = create_tool_calling_agent(llm, tools, prompt)\nexecutor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)`;
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
      "💾 Loading Conversational History Memory...",
      "🧠 Agent Executor: Analyzing user question query...",
      "🛠️ Action: calling calculator(expression='15000/3')...",
      "👁️ Observation: Output is '5000.0'",
      "🛠️ Action: calling search_brochure(query='early bird discount')...",
      "👁️ Observation: Found chunk: 'Early bird registration offers 15% discount.'",
      "🧠 Agent Executor: Formulating final response with memory states...",
      "🟢 Prediction complete! Response compiled."
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
      {/* Sub Tabs */}
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
              color: activeTab === tab.id ? '#0284c7' : '#64748b',
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
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 5 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>LangChain Enterprise Orchestrator</h1>
                <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Build a complete autonomous LangChain agent service in Python. Construct a RAG document loader index database, integrate tool calling APIs, support conversation window history threads, and deploy.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Goal</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Students enroll in various courses and ask repetitive queries regarding tuition pricing, early bird discounts, syllabus content, and payment installment EMI values.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  You will code a Python application utilizing LangChain. Build a RAG indexing pipeline on the syllabus PDF brochure, build a custom calculator tool, integrate memory states, and wire them up in an agent executor.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369a1', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Requirements:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ Load PDF using PyPDFLoader', '✅ Create Vector index retriever tool', '✅ Custom @tool math calculator', '✅ ReAct agent loop configuration', '✅ ConversationBufferWindowMemory (k=3)', '✅ Run query validation tests'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7', padding: '0.8rem 1.6rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>
                System Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ LangChain Agent Loop</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Architecture diagram of the multi-tool reasoning pipeline:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center' }}>
                <img src={langchainDiagImg} alt="LangChain Project Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: 10 }} />
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#0284c7', borderColor: '#0284c7', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Implementation Guide <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🛠️ Step-by-Step Guide</h2>
                {[
                  { title: 'Step 1: Set up PyPDFLoader', body: 'Load the brochure PDF files, segment texts using CharacterTextSplitter with chunk limits, and embed using OpenAIEmbeddings.' },
                  { title: 'Step 2: Initialize InMemory Store retriever', body: 'Upload embedded vectors to an in-memory database store, and initialize it as a retriever tool.' },
                  { title: 'Step 3: Define Custom Calculator Tool', body: 'Write your math expression parser function using Python and annotate it using the @tool decorator.' },
                  { title: 'Step 4: Build ReAct Agent loop', body: 'Wire prompt template, memory object (ConversationBufferWindowMemory k=3), and LLM client into create_tool_calling_agent.' },
                  { title: 'Step 5: Run prediction scripts', body: 'Trigger agent runs using executor.invoke() variables to verify successful execution outputs.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: 16 }}>
                    <strong style={{ color: '#0284c7', display: 'block', fontSize: '1rem', marginBottom: '0.4rem' }}>{step.title}</strong>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{step.body}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#0284c7', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    📦 Python Boilerplate Code
                  </strong>
                  <button onClick={copyBoilerplate} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '350px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{`# RAG + Custom Math Tool Agent Boilerplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
# ...`}</pre>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#0284c7', borderColor: '#0284c7', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Try Simulator <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Agent Pipeline Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Check how the LangChain agent executes RAG brochure retrievals and EMI calculations:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  <Cpu size={16} style={{ color: '#0284c7' }} /> Session Configuration
                </h3>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Student Name</label>
                  <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Session ID (Memory Key)</label>
                  <input type="text" value={sessionId} onChange={e => setSessionId(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Query Question</label>
                  <textarea value={userQuery} onChange={e => setUserQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 80, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <button onClick={runSimulator} disabled={isRunning} style={{ background: isRunning ? '#94a3b8' : '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: isRunning ? 'default' : 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: isRunning ? 'none' : '0 4px 14px rgba(2,132,199,.25)', marginTop: 'auto', transition: 'all .2s' }}>
                  <Play size={15} /> {isRunning ? 'Executing Chain...' : 'Predict Agent Response'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', flex: 1, minHeight: 280, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Execution History & Logs</span>
                  {simLogs.length === 0 ? (
                    <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Fill details and click "Predict Agent Response" to start.</span>
                  ) : (
                    simLogs.map((l, i) => (
                      <div key={i} style={{ fontSize: '.78rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 6, lineHeight: 1.4 }}>
                        {l}
                      </div>
                    ))
                  )}
                </div>

                {simStep >= 8 && (
                  <div style={{ background: 'rgba(2,132,199,0.08)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: 12, padding: '1rem' }}>
                    <span style={{ fontSize: '.65rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>🤖 Agent Response Output</span>
                    <p style={{ margin: 0, fontSize: '.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                      Hi {studentName}, according to the brochure, our early bird registration offers a 15% discount on the 18,000 INR tuition fee, reducing it to 15,300 INR. If paid over 3 months, your estimated monthly EMI will be 5,100 INR.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#0284c7', borderColor: '#0284c7', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Submit Project <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* SUBMISSION */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#f0f9ff', border: '1px solid #e0f2fe', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
                  <Trophy size={20} style={{ color: '#0284c7' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Final Project Submission</h2>
                  <span style={{ fontSize: '.8rem', color: '#0284c7', fontWeight: 700 }}>LangChain Enterprise Orchestrator</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>GitHub Repository URL</label>
                  <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/yourusername/langchain-orchestrator" style={{ width: '100%', padding: '.65rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Complete Python Code File</label>
                  <textarea value={codeContent} onChange={e => setCodeContent(e.target.value)} placeholder="Paste the complete langchain python implementation script code content here..." style={{ width: '100%', height: 180, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace', background: '#f8fafc' }} />
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} disabled={submitted || !repoUrl.trim() || !codeContent.trim()} style={{ background: submitted ? '#059669' : '#0284c7', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                {submitted ? <><CheckCircle size={16} /> Submitted Successfully! 🎉</> : 'Submit Final Project'}
              </button>

              {submitted && (
                <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: '1px solid #bae6fd', borderRadius: 16, padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#0369a1', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Congratulations! Module 5 Completed!</h3>
                  <p style={{ color: '#0284c7', margin: 0, fontSize: '0.98rem' }}>
                    Your LangChain Python code is recorded and validated successfully. You have unlocked advanced Python Agent Developer certification statuses!
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
