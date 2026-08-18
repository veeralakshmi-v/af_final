import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';

const pageVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'practical', label: 'Syllabus Spec', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Live Portal', icon: <Play size={15}/> },
  { id: 'submission', label: 'Final Submission', icon: <Trophy size={15}/> },
  { id: 'quiz', label: 'Final Quiz', icon: <HelpCircle size={15}/> },
];

const QUIZ_QUESTIONS = [
  { q: 'In your LangChain capstone agent, how is document search integrated?', opts: ['By running a database script.', 'By passing a Retriever tool to the AgentExecutor, which is selected automatically when the query involves static documents.', 'By hardcoding PDF content in prompts.'], ans: 1 },
  { q: 'What component maintains user memory threads in this system?', opts: ['A local text log file.', 'A memory key inside ChatMessageHistory that reads the sessionId parameters.', 'A script compiler.'], ans: 1 },
  { q: 'Why is a custom Tool Agent better than a conversational chatbot?', opts: ['Because the agent autonomously evaluates if external tools are needed and handles calculations/lookups.', 'It runs faster on CPUs.', 'It decreases network request latency.'], ans: 0 }
];

export default function AgenticAIDay25({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [query, setQuery] = useState("Search the course PDF for fees, then calculate the 3-month EMI.");
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simOutput, setSimOutput] = useState('');

  // Submission states
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const changeTab = (tabId) => { setActiveTab(tabId); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[+qi]?.ans === ans).length : 0;

  const runSimulation = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimOutput('');
    const logs = [
      "📡 Client: Prediction API request received...",
      "🧠 Agent Brain: Parsing inputs and loading sliding session history...",
      "🛠️ Action: calling retriever_tool(query='course fees')...",
      "👁️ Observation: Found PDF chunk: 'Agentic AI tuition is 18,000 INR.'",
      "🛠️ Action: calling calculator(expression='18000 / 3')...",
      "👁️ Observation: Response is 6,000.00",
      "🧠 Agent Brain: Formatting result...",
      "🟢 Done!"
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setSimOutput("The tuition fee for the Agentic AI course is 18,000 INR. If paid over 3 months, your monthly EMI will be 6,000 INR.");
            setIsRunning(false);
          }, 400);
        }
      }, delay);
      delay += 850;
    });
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
                <Trophy size={14} color="#fef08a" /> MODULE 5 CAPSTONE • DAY 25
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 25: Capstone: LangChain Orchestrator</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build the ultimate Python LangChain AI Agent. Orchestrate a program that loads a local course document, exposes it as a custom RAG tool, integrates computational tools, and maintains conversation session states.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Capstone Objectives</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Your goal is to build a standalone Python service using LangChain. Expose an endpoint that takes a student session ID and query. The agent must parse the query and decide whether to fetch document records (RAG) or solve math calculations (Calculator tool) to write a verified reply.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, marginBottom: '1.2rem' }}>Project Checklist:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#475569' }}>
                  {['✅ Load custom PDF using PyPDFLoader', '✅ Create vector retriever store tool', '✅ Set up custom @tool math calculator', '✅ Build ReAct agent loop wrapper', '✅ Implement thread session histories'].map(item => (
                    <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span>{item}</span></div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                View Spec Sheets <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* SYLLABUS SPEC */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Python LangChain Boilerplate</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>Code outline to orchestrate the RAG + Tool Calling ReAct Agent:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', color: '#a7f3d0', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6, overflowX: 'auto' }}>
                {`# Capstone LangChain Agent Template
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import InMemoryVectorStore
from langchain.tools.retriever import create_retriever_tool
from langchain.agents import AgentExecutor, create_tool_calling_agent

# 1. Setup Retriever Tool
loader = PyPDFLoader("syllabus.pdf")
docs = loader.load_and_split()
db = InMemoryVectorStore.from_documents(docs, OpenAIEmbeddings())
retriever_tool = create_retriever_tool(
    db.as_retriever(), "search_syllabus", "Use this to search course details."
)

# 2. Setup Calculator and Agents
# Build your agent executor pipeline with tools list...`}
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Live Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Live Capstone Portal</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Check how the LangChain orchestration agent queries and outputs data dynamically:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🔧 Input Configuration</h3>
                <div>
                  <textarea value={query} onChange={e => setQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 100, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Predicting...' : 'Predict Output'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', maxHeight: 150, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Agent Execution Trace Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Ready to run...</span> : simLogs.map((l, i) => <div key={i} style={{ fontSize: '.75rem', fontFamily: 'monospace', color: l.includes('🛠️') ? '#38bdf8' : '#34d399', marginBottom: 3 }}>{l}</div>)}
                </div>
                {simOutput && (
                  <div style={{ background: 'rgba(2,132,199,0.08)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: 12, padding: '1rem', flex: 1 }}>
                    <span style={{ fontSize: '.65rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📄 Structured Response</span>
                    <pre style={{ margin: 0, fontSize: '.9rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
                  </div>
                )}
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Final Submission <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SUBMISSION */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🚀 Capstone Code Submission</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Expose your completed LangChain Python Agent code repo link for evaluations:</p>
              <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/yourusername/langchain-rag-agent" style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem' }}/>
              <button onClick={() => setSubmitted(true)} disabled={!repoUrl.trim() || submitted} style={{ background: submitted ? '#059669' : '#0284c7', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
                {submitted ? '✅ Project Submitted!' : 'Submit Capstone'}
              </button>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Take Final Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 25 Quiz Assessment</h2>
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
                          return <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))} style={{ background: bg, border, color, padding: '.8rem 1.1rem', borderRadius: 10, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '.92rem', transition: 'all .15s' }}>{opt}</div>;
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
                  <span style={{ color: '#0284c7' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! Capstone complete!' : 'Review highlighted answers.'}</span>
                </div>
              )}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('submission')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Return to Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
