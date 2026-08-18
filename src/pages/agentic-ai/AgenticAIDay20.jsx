import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Trophy, Play, Settings, Code, Clipboard, CheckCircle, Award } from 'lucide-react';
import flowiseCapsImg from '../../assets/flowise_capstone_diagram.png';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.15 } } };
const SUB_TABS = [{ id: 'intro', label: '📋 Capstone Specs' }, { id: 'blueprint', label: '🏗️ System Blueprint' }, { id: 'practical', label: '🛠️ Build Guide' }, { id: 'sandbox', label: '💻 Live System Portal' }, { id: 'submission', label: '📝 Final Submission' }, { id: 'quiz', label: '✍️ Final Quiz' }];
const QUIZ_QUESTIONS = [
  { q: 'In the Flowise capstone system, what handles multi-turn conversation memory across API calls?', opts: ['The Buffer Memory sub-node attached to the Conversational Agent, using a unique sessionId per user to maintain separate memory threads.', 'A local text file that Flowise writes to after each message.', 'A scheduled cleanup node that runs every 5 minutes.'], ans: 0 },
  { q: 'How does the capstone system handle document-based questions (like fee structure or course brochure)?', opts: ['Via a RAG chain connected to a Pinecone vector store containing embedded documents, retrieving relevant chunks before generating the answer.', 'By hardcoding all answers directly into the system prompt.', 'By emailing the user a PDF attachment.'], ans: 0 },
  { q: 'How does the Tool Agent in the capstone know WHICH tool to call?', opts: ['The OpenAI Function Calling model reads each tool\'s description and intelligently selects the most relevant one based on the user\'s question.', 'It always calls all tools in sequence regardless of the question.', 'The user manually selects the tool from a dropdown in the chat.'], ans: 0 },
  { q: 'How is the capstone chatbot integrated into n8n for automated notifications?', opts: ['An n8n HTTP Request node calls the Flowise prediction API, processes the JSON response, and passes it to Gmail or Slack send nodes.', 'Flowise directly emails users without any external workflow tool.', 'n8n calls the Flowise embed script from a CDN.'], ans: 0 },
  { q: 'What makes this capstone an "enterprise-grade" AI system?', opts: ['It combines RAG (document knowledge), tool calling (live data), memory (context), API deployment (integration), and n8n automation — all in one coherent pipeline.', 'It uses a very large database table with more than 10 columns.', 'It runs on a paid cloud server that costs more than $100/month.'], ans: 0 }
];

export default function AgenticAIDay20({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [studentName, setStudentName] = useState('Sarah Connor');
  const [studentEmail, setStudentEmail] = useState('sarah@student.com');
  const [query, setQuery] = useState('What is the fee for the Agentic AI course?');
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [activeNodeIdx, setActiveNodeIdx] = useState(-1);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [workflowJson, setWorkflowJson] = useState('');
  const [docText, setDocText] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (id) => { setActiveTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length : 0;

  const CAPSTONE_NODES = [
    { icon: '🌐', label: 'Client / n8n', sub: 'API Request', color: '#5b21b6', border: '#a78bfa' },
    { icon: '🤖', label: 'Tool Agent', sub: 'Orchestrator', color: '#1e3a5f', border: '#60a5fa' },
    { icon: '📚', label: 'RAG Chain', sub: 'PDF Knowledge', color: '#14532d', border: '#4ade80' },
    { icon: '🌐', label: 'Web Search', sub: 'Live Data', color: '#1c3b2e', border: '#4ade80' },
    { icon: '💾', label: 'Memory', sub: 'Buffer (10 turns)', color: '#7c2d12', border: '#fb923c' },
    { icon: '📤', label: 'API Response', sub: 'JSON Output', color: '#78350f', border: '#fbbf24' }
  ];

  const runCapstone = () => {
    setIsRunning(true); setSimLogs([]); setActiveNodeIdx(-1); setFinalAnswer('');
    const steps = [
      `🌐 API: POST request received from client (sessionId: ${studentEmail})`,
      `🤖 Tool Agent: Analyzing query — needs document knowledge...`,
      `📚 RAG Chain: Searching Pinecone for "${query.slice(0, 30)}..." chunks...`,
      `📚 RAG Chain: Found 3 relevant document chunks (fee_structure.pdf)`,
      `🔢 Calculator: No arithmetic required for this query.`,
      `💾 Buffer Memory: Loading last 3 turns for session "${studentEmail}"...`,
      `🤖 Tool Agent: Composing final answer from retrieved context...`,
      `📤 Response: Returning JSON with text + sessionId to client`
    ];
    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        setActiveNodeIdx(Math.min(idx, CAPSTONE_NODES.length - 1));
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setFinalAnswer('Based on our Fee Structure document:\n\n💰 Agentic AI Development Course Fees:\n• Full Course (40 Days): ₹18,000\n• EMI Option: ₹6,000 × 3 months\n• Early Bird (Book 2 weeks before): ₹15,000\n• Includes: Live sessions, projects, certificate, lifetime recordings\n\nWould you like to know about the payment process or schedule a demo class?');
            setActiveNodeIdx(-1);
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 750;
    });
  };

  const capstoneSummaryJson = `{
  "capstone": {
    "name": "Flowise Enterprise AI Assistant",
    "modules": {
      "rag": { "vectorDB": "Pinecone", "documents": ["fee_structure.pdf", "course_brochure.pdf", "faq.pdf"] },
      "tools": ["Calculator", "SerpAPI", "Custom CRM API"],
      "memory": { "type": "BufferMemory", "k": 10 },
      "deployment": {
        "embed": "<script> Chatbot.init({ chatflowid: 'YOUR_ID' }) </script>",
        "api": "POST /api/v1/prediction/{chatflowId}",
        "n8n": "HTTP Request → Gmail + Slack"
      }
    }
  }
}`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)} style={{ background: activeTab === tab.id ? '#7c3aed' : 'transparent', color: activeTab === tab.id ? 'white' : '#64748b', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>{tab.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1.2rem' }}>
                <Trophy size={14} color="#fef08a" /> MODULE 4 CAPSTONE • DAY 20
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>Capstone: Enterprise AI Agent System</h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>Build the ultimate Flowise AI assistant that combines RAG document knowledge, tool calling, conversation memory, and multi-channel deployment into a single enterprise-grade system. This is your Module 4 final project.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>🗺️ Full Enterprise AI Agent Architecture</span>
              <img src={flowiseCapsImg} alt="Flowise Enterprise Capstone Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>Capstone Requirements</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>Your final project is an AI-powered Academy Assistant that must handle all types of student queries using the appropriate knowledge source or tool:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[['📚 RAG Knowledge', 'Answer questions about fees, courses, schedule from PDF documents.'],['🔢 Tool Calling', 'Perform calculations (EMI, discounts) and web searches.'],['💾 Memory', 'Maintain conversation context across a full session.'],['🌐 Website Embed', 'Deploy as a floating chat bubble on the academy website.'],['⚡ n8n Integration', 'Auto-send AI answers via email/WhatsApp through n8n.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <CheckCircle size={18} style={{ color: '#7c3aed', marginTop: '2px', flexShrink: 0 }} />
                      <div><strong style={{ color: '#0f172a' }}>{k}: </strong><span style={{ color: '#64748b', fontSize: '0.95rem' }}>{v}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} style={{ color: '#7c3aed' }} /> Submission Checklist:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#475569' }}>
                  {['✅ Flowise chatflow JSON export', '✅ Pinecone index with 3+ documents', '✅ Tool nodes: Calculator + SerpAPI + Custom', '✅ Website embed snippet code', '✅ Python API integration script', '✅ n8n workflow screenshot', '✅ System prompt and documentation'].map(item => (
                    <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span>{item}</span></div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('blueprint')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>View System Blueprint <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'blueprint' && (
          <motion.div key="blueprint" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ System Architecture Blueprint</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>The complete node map for the enterprise AI assistant chatflow:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[['🤖 Tool Agent (Core)', 'The central orchestrator that routes queries to the right module — RAG chain for document queries, Calculator for math, SerpAPI for live data. All tools connect to this single node.'],['📚 RAG Chain (Knowledge)', 'Three documents loaded: fee_structure.pdf, course_brochure.pdf, faq.pdf → Split into chunks → Embedded → Stored in Pinecone. Retrieval QA chain returns the 3 most relevant chunks.'],['🔧 Tool Suite', 'Calculator for EMI and discount math, Serper for real-time web searches, Custom CRM API for lead registration. All connected to the Tool Agent\'s "tools" port.'],['💾 Buffer Memory (Context)', 'Set k=10 (last 10 message turns stored). Connected to the Tool Agent\'s "memory" port. Uses unique sessionId per user to isolate memory threads.'],['🌐 Deployment Layer', 'Website: Embed script with custom styling. API: /api/v1/prediction endpoint. n8n: HTTP Request → Email/WhatsApp. All three run simultaneously.'],['📊 Monitoring & Logging', 'Flowise execution history logs all conversations. Export chat logs as CSV. Set up n8n to copy conversation summaries to a Google Sheet daily.']].map(([title, body]) => (
                <div key={title} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.6rem' }}>{title}</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, display: 'block' }}>{body}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong style={{ color: '#7c3aed', fontFamily: 'monospace', fontSize: '0.88rem' }}>📦 Capstone System Config JSON</strong>
                <button onClick={() => { navigator.clipboard.writeText(capstoneSummaryJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Clipboard size={12} /> {copied ? 'Copied!' : 'Copy'}</button>
              </div>
              <pre style={{ margin: 0, fontSize: '0.82rem', color: '#a7f3d0', fontFamily: 'monospace', lineHeight: 1.6, overflowX: 'auto' }}>{capstoneSummaryJson}</pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Specs</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Build Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'practical' && (
          <motion.div key="practical" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step Build Guide</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Build the complete capstone system in Flowise:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {[['Phase 1: Setup RAG Foundation','1. Add PDF File nodes (3 documents)\n2. Connect to Recursive Text Splitter\n3. Wire OpenAI Embeddings\n4. Create Pinecone index and connect\n5. Add Conversational Retrieval QA Chain'],['Phase 2: Add Tool Suite','1. Add Tool Agent node\n2. Connect OpenAI Function Model sub-node\n3. Add Calculator tool\n4. Add Serper API tool\n5. Add Custom API tool (CRM endpoint)'],['Phase 3: Add Memory','1. Add Buffer Memory node (k=10)\n2. Connect to Tool Agent memory port\n3. Test multi-turn conversation to verify context is retained across messages'],['Phase 4: Connect RAG to Agent','1. Connect the Retrieval QA Chain output to the Tool Agent as a "tool"\n2. Write a description: "Use for course fees, schedule, and brochure questions"\n3. The agent will now automatically use RAG for document queries'],['Phase 5: Wire Input & Output','1. Add Chat Input → Tool Agent\n2. Add Tool Agent → Chat Output\n3. Save chatflow\n4. Test with a complex multi-part question'],['Phase 6: Deploy All Channels','1. Copy embed script for website\n2. Test Python API with requests library\n3. Build n8n HTTP Request workflow\n4. Export chatflow JSON for submission']].map(([title, body]) => (
                <div key={title} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.05rem', marginBottom: '0.6rem' }}>{title}</strong>
                  <pre style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{body}</pre>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('blueprint')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Blueprint</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Live System Portal <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Capstone Live System Portal</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '1.5rem' }}>Ask a student query and watch the full enterprise agent route, retrieve, and respond:</p>

            {/* Full 6-Node Capstone Canvas */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace', marginBottom: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Enterprise AI Agent — Live Execution Monitor</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.7rem', minWidth: 'max-content', margin: '0 auto' }}>
                {CAPSTONE_NODES.map((node, nIdx, arr) => {
                  const isActive = simLogs.length > nIdx || activeNodeIdx === nIdx;
                  return (
                    <React.Fragment key={nIdx}>
                      <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.65rem 0.85rem', textAlign: 'center', minWidth: '95px', transition: 'all 0.5s', boxShadow: isActive ? `0 0 14px ${node.border}55` : 'none' }}>
                        <div style={{ fontSize: '1.2rem' }}>{node.icon}</div>
                        <div style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem', lineHeight: 1.3 }}>{node.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.58rem', fontFamily: 'monospace', marginTop: '0.1rem' }}>{node.sub}</div>
                        {(!isRunning && simLogs.length > nIdx) && <div style={{ fontSize: '0.58rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ OK</div>}
                      </div>
                      {nIdx < arr.length - 1 && <div style={{ color: simLogs.length > nIdx ? '#a78bfa' : '#334155', fontSize: '1.1rem', transition: 'color 0.5s', flexShrink: 0 }}>➔</div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={18} style={{ color: '#7c3aed' }} /> Student Query Panel</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[['Student Name:', studentName, setStudentName], ['Email / Session ID:', studentEmail, setStudentEmail]].map(([label, val, setter]) => (
                      <div key={label}>
                        <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>{label}</label>
                        <input type="text" value={val} disabled={isRunning} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Student Query:</label>
                      <textarea value={query} disabled={isRunning} onChange={e => setQuery(e.target.value)} style={{ width: '100%', height: '80px', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                </div>
                <button onClick={runCapstone} disabled={isRunning} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Play size={15} /> {isRunning ? 'Processing...' : 'Submit to Enterprise Agent'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', maxHeight: '160px', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>💻 Execution Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Submit a query to start...</span> : simLogs.map((log, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: log.includes('📚') ? '#60a5fa' : log.includes('🔢') ? '#4ade80' : '#34d399', marginBottom: '0.3rem' }}>{log}</div>
                  ))}
                </div>
                {finalAnswer && (
                  <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '0.8rem', flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>🤖 Enterprise Agent Response</span>
                    <pre style={{ margin: 0, fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{finalAnswer}</pre>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Build Guide</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('submission')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Final Submission <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'submission' && (
          <motion.div key="submission" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={26} style={{ color: '#f59e0b' }} /> Module 4 Final Project Submission</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>Submit your complete Flowise Enterprise AI Agent System. Include the chatflow JSON, documentation, and all deployment code.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>📦 Chatflow Export JSON:</label>
                  <textarea value={workflowJson} onChange={e => setWorkflowJson(e.target.value)} placeholder='Paste your exported Flowise chatflow JSON here...' style={{ width: '100%', height: '180px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', resize: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>📄 System Documentation:</label>
                  <textarea value={docText} onChange={e => setDocText(e.target.value)} placeholder='Describe your agent: what documents did you load? what tools? what system prompt? which channels did you deploy to?...' style={{ width: '100%', height: '180px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <button onClick={() => setProjectSubmitted(true)} disabled={(!workflowJson.trim() && !docText.trim()) || projectSubmitted} style={{ background: projectSubmitted ? '#059669' : '#7c3aed', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {projectSubmitted ? <><CheckCircle size={20} /> Project Submitted! 🎉</> : <><Trophy size={20} /> Submit Final Project</>}
              </button>
              {projectSubmitted && (
                <div style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid #c4b5fd', borderRadius: '16px', padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
                  <h3 style={{ fontSize: '1.5rem', color: '#4c1d95', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Congratulations! You completed Module 4!</h3>
                  <p style={{ color: '#6d28d9', margin: 0, fontSize: '1.05rem' }}>You have successfully built and deployed an enterprise-grade AI agent system using Flowise. You are now a Visual AI Agent Developer! 🚀</p>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Portal</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Final Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Module 4 Final Quiz</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((q, qIdx) => {
                  const sel = quizAnswers[qIdx];
                  return (
                    <div key={qIdx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>Q{qIdx + 1}: {q.q}</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {q.opts.map((opt, oIdx) => {
                          let bg = '#f8fafc', border = '1px solid #cbd5e1', color = '#475569';
                          if (quizSubmitted) { if (oIdx === q.ans) { bg = '#ecfdf5'; border = '1px solid #10b981'; color = '#166534'; } else if (sel === oIdx) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; } }
                          else if (sel === oIdx) { bg = '#f5f3ff'; border = '1px solid #7c3aed'; color = '#7c3aed'; }
                          return <div key={oIdx} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))} style={{ background: bg, border, color, padding: '0.85rem 1.1rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '0.95rem', fontWeight: sel === oIdx ? 700 : 500, transition: 'all 0.15s' }}>{opt}</div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!quizSubmitted ? (
                <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '2rem', fontSize: '1rem' }}>Submit Final Quiz</button>
              ) : (
                <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid #c4b5fd', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🏆</div>
                  <strong style={{ fontSize: '1.4rem', color: '#4c1d95', display: 'block', marginBottom: '0.4rem' }}>Module 4 Final Score: {quizScore} / {QUIZ_QUESTIONS.length}</strong>
                  <span style={{ color: '#6d28d9', fontSize: '1.05rem' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect! You are a certified Flowise AI Agent Developer!' : 'Great effort! Review highlighted answers and revisit any days you need.'}</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('submission')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Submission</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>🚀 Back to Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
