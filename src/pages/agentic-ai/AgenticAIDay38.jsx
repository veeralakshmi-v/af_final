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
  { num: '01', title: 'Install DB & Embed Packages', icon: '📦', tag: 'Setup',
    body: 'Set up dependencies for vector storing. Install LanceDB (a zero-setup, lightning-fast database) along with openai embeddings dependencies.',
    code: { 
      Terminal: 'pip install lancedb tantivy\n# LanceDB runs serverless, saving vector databases as files in local directories.', 
      JSON: '{\n  "rag_dependencies": {\n    "lancedb": "^0.6.0",\n    "tantivy": "^0.22.0"\n  }\n}', 
      Python: '# Verify LanceDB imports\nimport lancedb\nprint("LanceDB packages verified.")',
      JavaScript: '// LanceDB also works serverless in Node.js:\n// npm install @lancedb/lancedb'
    } 
  },
  { num: '02', title: 'Define Knowledge Base', icon: '📚', tag: 'Knowledge Base',
    body: 'Instantiate your Knowledge Base. Expose document paths (PDFs, text files, URLs) and define the vector database target directory.',
    code: { 
      Terminal: '# Configure files storage destination', 
      JSON: '{\n  "knowledge_base": {\n    "storage": "tmp/lancedb",\n    "documents_path": "data/documents/"\n  }\n}', 
      Python: 'from agno.knowledge.pdf import PDFUrlKnowledgeBase\nfrom agno.vectordb.lancedb import LanceDb\n\n# Configure LanceDB and embeddings generator\nknowledge_base = PDFUrlKnowledgeBase(\n    urls=["https://agno-public.s3.amazonaws.com/recipes/RecipeBook.pdf"],\n    vector_db=LanceDb(\n        table_name="recipes",\n        uri="tmp/lancedb",\n    )\n)',
      JavaScript: '// Initialize vector storage target in JS:\nconst db = await lancedb.connect("tmp/lancedb");'
    } 
  },
  { num: '03', title: 'Ingest Documents', icon: '💾', tag: 'Ingestion',
    body: 'Before running queries, call knowledge_base.load() to chunk documents, generate embeddings, and save the vectors to database.',
    code: { 
      Terminal: '# Run document ingestion script', 
      JSON: '{\n  "action": "load_knowledge",\n  "status": "pending"\n}', 
      Python: '# Run once to parse documents and save vector database tables\nknowledge_base.load(recreate=True)',
      JavaScript: '// Chunk documents and write records in JS:\nconst table = await db.createTable("recipes", [{ vector: [0.1, 0.2], text: "recipe data" }]);'
    } 
  },
  { num: '04', title: 'Expose to Agent class', icon: '🤖', tag: 'Agent RAG',
    body: 'Pass the initialized Knowledge Base reference to the Agent. When queries arrive, the agent automatically retrieves relevant context matches.',
    code: { 
      Terminal: 'python run_rag.py', 
      JSON: '{\n  "query": "How do you cook Pad Thai?",\n  "retrieval_enabled": true\n}', 
      Python: 'from agno.agent import Agent\n\nagent = Agent(\n    knowledge=knowledge_base,\n    search_knowledge=True, # Allow RAG searches\n    markdown=True\n)\n\nagent.print_response("How do you make Pad Thai?")',
      JavaScript: '// Supply retrieved vector segments as prompts in JS execution:\nconst context = await retrieveDocs(query);\nconst prompt = `Context: ${context}\\nQuery: ${query}`;'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What database setup is required to run LanceDB in Agno?', opts: ['A local file directory path (it is serverless).', 'A live running PostgreSQL engine.', 'A Redis caching cluster.'], ans: 0 },
  { q: 'Which method ingests documents and saves embeddings to the vector database in Agno?', opts: ['knowledge_base.load()', 'knowledge_base.ingest()', 'knowledge_base.save_vectors()'], ans: 0 },
  { q: 'What parameter must be enabled on the Agent class to allow the agent to run RAG search queries against its knowledge base?', opts: ['enable_rag=True', 'search_knowledge=True', 'use_vector_db=True'], ans: 1 }
];

export default function AgenticAIDay38({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [selectedDoc, setSelectedDoc] = useState("Corporate Policies.pdf");
  const [ragQuery, setRagQuery] = useState("What is the holiday policy?");
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
    setSimLogs([`[Agno Knowledge] Initializing Vector DB connection (LanceDB local index)...`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `📂 Reading document chunks for: "${selectedDoc}"`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `🔍 Embedding search query: "${ragQuery}" using OpenAI text-embedding-3-small`]);

        setTimeout(() => {
          setSimLogs(prev => [...prev, `⚙️ LanceDB Vector Match query: executing cosine similarity search (top_k=2)`]);

          setTimeout(() => {
            const mockDocMatch = selectedDoc === "Corporate Policies.pdf" 
              ? "MATCH [Similarity: 0.88]: Section 4.2: Full-time employees receive 25 paid holidays annually."
              : "MATCH [Similarity: 0.91]: Section 1.5: Security policies enforce 2FA and password updates every 90 days.";

            setSimLogs(prev => [...prev, `🟢 Document Context Retrieved:\n"${mockDocMatch}"`]);

            setTimeout(() => {
              setSimLogs(prev => [...prev, `🧠 Forwarding context payload to LLM model for final RAG response...`]);

              setTimeout(() => {
                setSimLogs(prev => [...prev, `🟢 Response synthesized successfully.`]);
                setSimOutput(
                  `### RAG Search Result: ${selectedDoc}\n\nBased on the corporate guidelines retrieved from **${selectedDoc}**:\n\n${
                    selectedDoc === "Corporate Policies.pdf" 
                      ? "Full-time team members are allotted **25 paid holidays per calendar year**. You can submit holiday requests through the central portal."
                      : "All employees must configure **Two-Factor Authentication (2FA)** immediately. Additionally, passwords must be rotated **every 90 days** to ensure security compliance."
                  }`
                );
                setIsRunning(false);
              }, 1200);
            }, 1000);

          }, 1200);

        }, 1000);

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
                <Sparkles size={14} color="#fef08a" /> MODULE 8 • DAY 38
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 38: Agno Knowledge Bases & Vector DBs</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Configure RAG pipelines using Agno. Learn to automatically load external resource files (PDF, TXT, CSV), map their semantic embeddings into LanceDB, and retrieve matches.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>RAG Made Simple</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Retrieval-Augmented Generation (RAG) is essential to provide agents with domain-specific knowledge. Agno simplifies this. By binding a Knowledge Base to the agent, search matches are retrieved and injected into prompt cycles under the hood.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75 }}>
                  Agno supports multiple vector databases including PgVector, Qdrant, Pinecone, and LanceDB. LanceDB is highly favored for local setups, as it runs directly as a file inside your project structure without server installations.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  📚 Document Formats
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>PDF Knowledge Base:</strong> Parse pages from online URLs or local directories.
                  <strong>CSV & JSON:</strong> Retain structured rows and data key relations.
                  <strong>Text & Markdown:</strong> Read manuals, guides, and text documentation files directly.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore RAG Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Knowledge Base Semantic Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How documents are processed, embedded, and queried in Agno:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ border: '2px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1.5rem', borderRadius: 16, width: '95%', color: 'white', textAlign: 'left' }}>
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: '#38bdf8', marginBottom: 8 }}>Ingestion Pipeline:</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.9rem', color: '#cbd5e1' }}>
                    <div>📄 <strong>Read PDF/URL:</strong> Text extraction</div>
                    <div>✂️ <strong>Text Chunking:</strong> Splitting into overlap blocks</div>
                    <div>🔠 <strong>Embeddings API:</strong> Generate vector vectors</div>
                    <div>💾 <strong>Write to LanceDB:</strong> Local directory indexing</div>
                  </div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#1e293b', padding: '1rem 2rem', borderRadius: 12, color: '#cbd5e1', fontSize: '.9rem', border: '1px solid #334155' }}>
                  <strong>Execution: Agent queries ➔ Search DB table ➔ Injects matching text block into instructions.</strong>
                </div>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Ingesting Documents & Running RAG</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define code packages, create knowledge bases, load variables, and pass them to agents:</p>
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ RAG Sandbox</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Knowledge Base File:</label>
                    <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }}>
                      <option value="Corporate Policies.pdf">Corporate Policies.pdf</option>
                      <option value="Security Standards.pdf">Security Standards.pdf</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Semantic Search Query:</label>
                    <input type="text" value={ragQuery} onChange={e => setRagQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Searching Vector DB...' : 'Trigger RAG Query'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ RAG execution logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('MATCH') ? '#34d399' : log.includes('Embedding') ? '#60a5fa' : '#e2e8f0' }} key={idx}>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Knowledge Bases Quick Reference</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Supported Formats:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    PDFUrlKnowledgeBase, PDFKnowledgeBase, CSVKnowledgeBase, TextKnowledgeBase
                  </code>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Vector DB classes:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    LanceDb(table_name=..., uri="tmp/lancedb"), PgVector(table_name=..., connection_string=...)
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📝 Assignment: Building a Text Knowledge Base Agent</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Create a Python script that loads a text file into an Agno knowledge base and connects it to an Agent using LanceDB.</p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>Submission Requirements:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Use `TextKnowledgeBase` targeting `data/manual.txt`.</li>
                  <li>Configure `LanceDb` with uri="tmp/lancedb".</li>
                  <li>Call `knowledge_base.load(recreate=True)` to parse data.</li>
                  <li>Create the Agent binding the knowledge base and set `search_knowledge=True`.</li>
                </ol>
              </div>

              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} disabled={assignmentSubmitted} placeholder="Paste your text knowledge base python script here..." style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
              
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>🧠 Day 38 Conceptual Quiz</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'day39')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 39) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
