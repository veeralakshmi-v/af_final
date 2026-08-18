import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Database, Play, Settings, Code, Clipboard, GitBranch, BookOpen, Layers, Cpu, Compass, ShieldAlert } from 'lucide-react';
import flowiseRagImg from '../../assets/flowise_rag_pipeline_diagram.png';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.15 } } };
const SUB_TABS = [{ id: 'intro', label: '📋 Lesson Overview' }, { id: 'rag', label: '📚 RAG Deep Dive' }, { id: 'practical', label: '🛠️ Practical Guide' }, { id: 'sandbox', label: '💻 RAG Simulator' }, { id: 'assignment', label: '📝 Assignment' }, { id: 'quiz', label: '✍️ Quiz' }];
const QUIZ_QUESTIONS = [
  { q: 'What does RAG stand for in AI?', opts: ['Retrieval Augmented Generation — a method of feeding external knowledge to an LLM to ground its answers in facts.', 'Random Automated Generation — a technique to shuffle text outputs.', 'Regular Application Gateway — a database protocol.'], ans: 0 },
  { q: 'Why do we use a Vector Store in a RAG pipeline?', opts: ['To store document chunks as mathematical number embeddings so the system can do fast similarity searches to find the most relevant passage.', 'To store video and image files.', 'To compress API response size.'], ans: 0 },
  { q: 'What is the purpose of the Text Splitter node in Flowise RAG?', opts: ['To divide large documents into smaller overlapping chunks so each piece fits inside the LLM context window without losing key information.', 'To translate documents from one language to another.', 'To convert PDF files into CSV tables.'], ans: 0 },
  { q: 'What is "Embedding" in the context of RAG?', opts: ['Converting text into a high-dimensional numeric vector so that similar text passages have similar numbers and can be ranked by relevance.', 'Inserting an HTML iframe link.', 'Generating a QR code from text.'], ans: 0 },
  { q: 'What does the "Conversational Retrieval QA Chain" do in Flowise?', opts: ['It retrieves relevant chunks from the vector store based on the query, inserts them as context, then sends the combined prompt to the LLM to answer.', 'It converts the chatbot into a video call interface.', 'It schedules automatic database backups.'], ans: 0 }
];

export default function AgenticAIDay17({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeConcept, setActiveConcept] = useState('what_is_rag');
  
  // Embeddings simulator state
  const [embeddingInput, setEmbeddingInput] = useState("Agentic AI Development");
  const [embeddingResult, setEmbeddingResult] = useState([0.23, -0.54, 0.76, 0.12, -0.09, 0.88, -0.31, 0.45]);

  const [query, setQuery] = useState('What are the prerequisites for the Agentic AI course?');
  const [chunkSize, setChunkSize] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (id) => { setActiveTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length : 0;

  const CONCEPT_LIST = [
    { id: 'what_is_rag', label: '📘 RAG Framework', icon: <BookOpen size={18} /> },
    { id: 'embeddings', label: '🧮 Embeddings & Math', icon: <Cpu size={18} /> },
    { id: 'chunking', label: '✂️ Chunking & Overlap', icon: <Layers size={18} /> },
    { id: 'vector_db', label: '🗄️ Vector Databases', icon: <Database size={18} /> },
    { id: 'qa_chain', label: '🤖 Conversational QA', icon: <Compass size={18} /> }
  ];

  const handleGenerateEmbedding = () => {
    let hash = 0;
    for (let i = 0; i < embeddingInput.length; i++) {
      hash = embeddingInput.charCodeAt(i) + ((hash << 5) - hash);
    }
    const result = [];
    for (let i = 0; i < 8; i++) {
      const val = Math.sin(hash + i) * 0.95;
      result.push(Number(val.toFixed(3)));
    }
    setEmbeddingResult(result);
  };

  const PIPELINE_NODES = [
    { id: 'pdf', icon: '📄', label: 'PDF Loader', sub: 'Course_Brochure.pdf', color: '#7c2d12', border: '#fb923c', idx: 0 },
    { id: 'split', icon: '✂️', label: 'Text Splitter', sub: `Chunk: ${chunkSize} chars`, color: '#14532d', border: '#4ade80', idx: 1 },
    { id: 'embed', icon: '🔢', label: 'Embeddings', sub: 'OpenAI text-embed-3', color: '#1e3a5f', border: '#60a5fa', idx: 2 },
    { id: 'vector', icon: '🗄️', label: 'Pinecone Store', sub: 'Vector DB Upsert', color: '#5b21b6', border: '#a78bfa', idx: 3 },
    { id: 'qa', icon: '🤖', label: 'Conv. Retrieval QA', sub: 'Retrieve + Answer', color: '#1e293b', border: '#f1f5f9', idx: 4 },
    { id: 'out', icon: '📤', label: 'Chat Output', sub: 'Final Answer', color: '#14532d', border: '#4ade80', idx: 5 }
  ];

  const runRagSimulator = () => {
    setIsRunning(true); setSimLogs([]); setRetrievedChunks([]); setFinalAnswer('');
    const steps = [
      '📄 PDF Loader: Reading Course_Brochure.pdf (14 pages)...',
      `✂️ Text Splitter: Dividing document into chunks of ${chunkSize} characters with 50-char overlap...`,
      '🔢 Embeddings: Converting 42 text chunks to 1536-dim vectors via OpenAI API...',
      '🗄️ Pinecone Vector Store: Upserting 42 vectors into index "alphafly-docs"...',
      `🔍 Retrieval: Searching for top-3 relevant chunks matching query: "${query.slice(0, 40)}..."`,
      '🤖 Conv. QA Chain: Injecting retrieved context into LLM system prompt...',
      '📤 Chat Output: Generating grounded answer...'
    ];
    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        if (idx === 4) setRetrievedChunks([
          'Chunk #7: "Prerequisites: No prior coding experience required. Basic computer literacy recommended..."',
          'Chunk #12: "Module 1 covers Agentic AI fundamentals including Agent reasoning, tool calling, and memory..."',
          'Chunk #29: "Certification: Students receive a verified digital certificate upon completing all 40 days..."'
        ]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setFinalAnswer('Based on the course brochure:\n\n✅ No prior coding experience is required.\n✅ Basic computer literacy is recommended.\n✅ The course starts from fundamentals in Module 1.\n✅ You will receive a verified certificate upon completing all 40 days.\n\nWould you like to know about specific modules or the project requirements?');
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 750;
    });
  };

  const ragJson = `{
  "nodes": [
    { "id": "pdf_1", "type": "pdfFile", "data": { "label": "PDF File" }, "position": { "x": 80, "y": 200 } },
    { "id": "splitter_1", "type": "recursiveCharacterTextSplitter", "data": { "label": "Text Splitter", "chunkSize": ${chunkSize}, "chunkOverlap": 50 }, "position": { "x": 280, "y": 200 } },
    { "id": "embed_1", "type": "openAIEmbeddings", "data": { "label": "OpenAI Embeddings", "modelName": "text-embedding-3-small" }, "position": { "x": 480, "y": 200 } },
    { "id": "vector_1", "type": "pinecone", "data": { "label": "Pinecone Vector Store", "index": "alphafly-docs" }, "position": { "x": 680, "y": 200 } },
    { "id": "qa_1", "type": "conversationalRetrievalQAChain", "data": { "label": "Conversational Retrieval QA Chain" }, "position": { "x": 880, "y": 200 } },
    { "id": "chatOutput_1", "type": "chatOutput", "data": { "label": "Chat Output" }, "position": { "x": 1080, "y": 200 } }
  ]
}`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Sub tabs Nav */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)} style={{ background: activeTab === tab.id ? '#7c3aed' : 'transparent', color: activeTab === tab.id ? 'white' : '#64748b', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* LESSON OVERVIEW */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 17
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>RAG & Document QA in Flowise</h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>Build a powerful Document Q&A chatbot that reads your PDFs and answers questions from them using Retrieval Augmented Generation (RAG). Learn about PDF loaders, text splitters, embeddings, and vector stores in Flowise.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>🗺️ RAG Pipeline Architecture</span>
              <img src={flowiseRagImg} alt="Flowise RAG Pipeline Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>How RAG Works</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1rem' }}>Without RAG, AI models only know what they were trained on. With RAG, you give the AI access to your own private documents (company manuals, course brochures, FAQ files) so it answers from verified data instead of hallucinating.</p>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.2rem' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.6rem' }}>RAG Flow (simplified):</strong>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#475569', lineHeight: 2 }}>
                    📄 Your PDF → ✂️ Split into Chunks → 🔢 Convert to Vectors → 🗄️ Store in Pinecone<br />
                    ↳ User asks question → 🔍 Find top-3 similar chunks → 📋 Inject as context → 🤖 LLM answers
                  </div>
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={18} style={{ color: '#7c3aed' }} /> Key RAG Nodes:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.92rem', color: '#475569' }}>
                  {[['📄 PDF File Loader','Reads and extracts text from uploaded PDF files.'],['✂️ Text Splitter','Divides text into 500-char chunks with 50-char overlap.'],['🔢 OpenAI Embeddings','Converts each chunk into a 1536-dimension number vector.'],['🗄️ Vector Store','Pinecone / Chroma DB to store and search vectors by similarity.'],['🤖 Conv. QA Chain','Retrieves top chunks, inserts them into the prompt, calls LLM.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#7c3aed', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('rag')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>RAG Deep Dive <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* DETAILED RAG DEEP DIVE WITH TABS */}
        {activeTab === 'rag' && (
          <motion.div key="rag" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📚 RAG Concepts Deep Dive</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Explore the detailed RAG mathematical foundations, vector coordinates, and indexing structures below:</p>
            
            <div style={{ display: 'flex', gap: '2rem', minHeight: '480px', alignItems: 'stretch', marginBottom: '2.5rem' }}>
              {/* Left Selector List */}
              <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                {CONCEPT_LIST.map((c) => {
                  const isSelected = activeConcept === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveConcept(c.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: isSelected ? '#7c3aed' : '#cbd5e1',
                        background: isSelected ? '#f5f3ff' : 'white',
                        color: isSelected ? '#7c3aed' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {c.icon}
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Panel Display */}
              <div style={{ flex: 1, background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                <AnimatePresence mode="wait">
                  {/* CONCEPT: WHAT IS RAG */}
                  {activeConcept === 'what_is_rag' && (
                    <motion.div key="what_is_rag" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>📘 RAG (Retrieval-Augmented Generation)</h3>
                      <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        Large Language Models are static text generators. They only know what was in their training data. When queried on private enterprise context, catalog parameters, or custom databases, they fail.
                        <br /><br />
                        <strong>RAG solves this by implementing an open-book workflow:</strong>
                      </p>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                            <th style={{ padding: '0.6rem' }}>Stage</th>
                            <th style={{ padding: '0.6rem' }}>What happens</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#7c3aed' }}>1. Retrieval</td>
                            <td style={{ padding: '0.6rem', color: '#475569' }}>The system vectorizes the user's query and fetches relevant text fragments from a vector database.</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#7c3aed' }}>2. Augmentation</td>
                            <td style={{ padding: '0.6rem', color: '#475569' }}>The retrieved facts are dynamically injected directly into the LLM system prompt template context.</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#7c3aed' }}>3. Generation</td>
                            <td style={{ padding: '0.6rem', color: '#475569' }}>The LLM reads this verified background context to formulate a response, eliminating hallucination.</td>
                          </tr>
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  {/* CONCEPT: EMBEDDINGS */}
                  {activeConcept === 'embeddings' && (
                    <motion.div key="embeddings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>🧮 Vector Embeddings & Metrics</h3>
                      <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        An embedding model converts plain text strings into high-dimensional coordinate arrays (vectors) that mathematically capture semantic concepts.
                      </p>

                      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>Type text to generate vector coordinates:</label>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                          <input
                            type="text"
                            value={embeddingInput}
                            onChange={(e) => setEmbeddingInput(e.target.value)}
                            style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                          />
                          <button onClick={handleGenerateEmbedding} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                            Vectorize
                          </button>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>🤖 Vector Coordinates representation:</span>
                      <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#a78bfa', fontFamily: 'monospace', fontSize: '0.95rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
                        [ {embeddingResult.join(', ')} ]
                      </div>
                      
                      <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #0284c7', fontSize: '0.88rem', color: '#0369a1' }}>
                        💡 <strong>Cosine Similarity:</strong> Measures the angle between two vectors. If two sentences are conceptually similar, the angle between their coordinates is tiny, resulting in a similarity score close to <strong>1.0</strong>.
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: CHUNKING */}
                  {activeConcept === 'chunking' && (
                    <motion.div key="chunking" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>✂️ Document Chunking & Overlap</h3>
                      <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        Sending a full 100-page catalog to the LLM is expensive and hits token limits. Chunking partitions the document into smaller pieces.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                        <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                          <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem', fontSize: '0.92rem' }}>Chunk Size</strong>
                          <span style={{ fontSize: '0.84rem', color: '#6d28d9', lineHeight: 1.4, display: 'block' }}>
                            Optimal length (usually 500-1000 characters). Smaller chunks keep inputs precise; larger chunks retain surrounding narrative context.
                          </span>
                        </div>
                        <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                          <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem', fontSize: '0.92rem' }}>Chunk Overlap</strong>
                          <span style={{ fontSize: '0.84rem', color: '#6d28d9', lineHeight: 1.4, display: 'block' }}>
                            Maintains duplicate content (e.g. 50-100 characters) across split borders so key sentences aren't split in half mid-thought.
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ background: '#fff7ed', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #ea580c', fontSize: '0.88rem', color: '#9a3412' }}>
                        ⚠️ <strong>Recursive Splitting:</strong> Best practice in Flowise. It splits text using paragraph breaks (\n\n) first, then falls back to sentences (\n), and finally words (" ") to avoid awkward text splits.
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: VECTOR DB */}
                  {activeConcept === 'vector_db' && (
                    <motion.div key="vector_db" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>🗄️ Vector Database Storage</h3>
                      <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        Vector stores index multi-dimensional floats arrays to allow mathematical distance lookups in fractions of a millisecond.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                        {[
                          { name: 'Pinecone', type: 'Cloud Managed', desc: 'Fully managed vector store built for enterprise scale, indexing billions of records easily.' },
                          { name: 'Chroma / FAISS', type: 'Local In-Memory', desc: 'Ideal for prototyping, loading search indexes directly inside local RAM structures.' },
                          { name: 'PGVector', type: 'Relational Plugin', desc: 'PostgreSQL database extension storing vectors alongside typical SQL tables.' }
                        ].map((db, idx) => (
                          <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.95rem' }}>{db.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, display: 'block', margin: '0.2rem 0' }}>{db.type}</span>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>{db.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: QA CHAIN */}
                  {activeConcept === 'qa_chain' && (
                    <motion.div key="qa_chain" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>🤖 Conversational Retrieval QA Chains</h3>
                      <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        The conversational chain acts as the controller. It translates user requests, fetches text logs, binds memory history, and calls completion APIs.
                      </p>

                      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                        <span style={{ fontSize: '0.82rem', color: '#7c3aed', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>🔄 QA Chain Prompt Construction:</span>
                        <pre style={{ margin: 0, padding: '0.8rem', background: '#0f172a', color: '#a7f3d0', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {`System Prompt:\nUse the following retrieved context passages to answer the question.\nIf the context doesn't contain the answer, say "I don't know".\n\nContext:\n{retrieved_context}\n\nChat History:\n{chat_history}\n\nQuestion: {query}`}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Overview</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Practical Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* PRACTICAL GUIDE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Build a Document Q&A Bot</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Step-by-step configuration of all RAG nodes in Flowise:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[['1. Add PDF File Loader','Drag "PDF File" node → Upload your document → It automatically extracts raw text from all pages.'],['2. Configure Text Splitter','Drag "Recursive Character Text Splitter" → Set Chunk Size: 500, Chunk Overlap: 50 → Connect PDF Loader output to this node.'],['3. Add Embeddings Node','Drag "OpenAI Embeddings" → Add your OpenAI API key → Connect Text Splitter → This converts each chunk to a vector.'],['4. Attach Vector Store','Drag "Pinecone Vector Store" → Enter your Pinecone API key and index name → Connect Embeddings → Click "Upsert" to upload all vectors.'],['5. Add Conv. Retrieval QA Chain','Drag "Conversational Retrieval QA Chain" → Connect the Vector Store as retriever → Connect your Chat Model → Wire Chat Input and Output.']].map(([title, body]) => (
                  <div key={title} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                    <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{title}</strong>
                    <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, display: 'block' }}>{body}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.88rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={15} /> RAG CHATFLOW JSON</strong>
                  <button onClick={() => { navigator.clipboard.writeText(ragJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clipboard size={12} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div style={{ flex: 1, fontSize: '0.78rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '340px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{ragJson}</pre>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('rag')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to RAG Concepts</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Try RAG Simulator <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SIMULATOR */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 RAG Pipeline Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '1.5rem' }}>Configure chunk size, enter a question, and watch the full RAG pipeline retrieve document context and generate an answer:</p>

            {/* Visual Pipeline Canvas */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.7rem', minWidth: 'max-content', margin: '0 auto' }}>
                {PIPELINE_NODES.map((node, nIdx, arr) => {
                  const isActive = simLogs.length > node.idx;
                  return (
                    <React.Fragment key={node.id}>
                      <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.65rem 0.85rem', textAlign: 'center', minWidth: '90px', transition: 'all 0.4s', boxShadow: isActive ? `0 0 14px ${node.border}55` : 'none' }}>
                        <div style={{ fontSize: '1.2rem' }}>{node.icon}</div>
                        <div style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem', lineHeight: 1.3 }}>{node.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.58rem', fontFamily: 'monospace', marginTop: '0.1rem' }}>{node.sub}</div>
                        {isActive && <div style={{ fontSize: '0.58rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ OK</div>}
                      </div>
                      {nIdx < arr.length - 1 && <div style={{ color: isActive ? '#a78bfa' : '#334155', fontSize: '1.1rem', transition: 'color 0.4s', flexShrink: 0 }}>➔</div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={18} style={{ color: '#7c3aed' }} /> RAG Config Panel</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Your Question:</label>
                      <input type="text" value={query} disabled={isRunning} onChange={e => setQuery(e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Chunk Size: <strong style={{ color: '#7c3aed' }}>{chunkSize} chars</strong></label>
                      <input type="range" min="200" max="1000" step="100" value={chunkSize} disabled={isRunning} onChange={e => setChunkSize(Number(e.target.value))} style={{ width: '100%' }} />
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>📄 Document: <strong>Course_Brochure.pdf</strong> (14 pages, ~8,400 words)</span>
                    </div>
                  </div>
                </div>
                <button onClick={runRagSimulator} disabled={isRunning} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Play size={15} /> {isRunning ? 'Retrieving...' : 'Run RAG Pipeline'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', maxHeight: '140px', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>💻 Execution Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Press "Run RAG Pipeline"...</span> : simLogs.map((log, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#34d399', marginBottom: '0.3rem' }}>{log}</div>
                  ))}
                </div>
                {retrievedChunks.length > 0 && (
                  <div style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: '10px', padding: '0.8rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fb923c', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>🔍 Retrieved Context Chunks</span>
                    {retrievedChunks.map((chunk, idx) => <div key={idx} style={{ fontSize: '0.75rem', color: '#fed7aa', fontFamily: 'monospace', marginBottom: '0.3rem', lineHeight: 1.4 }}>{chunk}</div>)}
                  </div>
                )}
                {finalAnswer && (
                  <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '0.8rem', flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>🤖 Grounded AI Answer</span>
                    <pre style={{ margin: 0, fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{finalAnswer}</pre>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Practical</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>View Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><GitBranch size={22} style={{ color: '#7c3aed' }} /> Day 17 Assignment: Hospital FAQ Bot</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Design a Flowise RAG chatbot for a hospital that can answer patient queries using a PDF document containing appointment procedures, emergency contacts, and department listings.<br /><br />Write: (1) the full node list and connections, (2) what chunk size you would use and why, (3) your system prompt for the QA chain.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="Nodes: PDF File → Text Splitter (Chunk: 400) → OpenAI Embeddings → Pinecone → Conv. QA Chain → Chat Output&#10;Chunk Size: 400 chars — hospital documents have short procedural steps that fit in small chunks&#10;System Prompt: You are a hospital information assistant. Only answer from the provided document..." style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                {assignmentSubmitted ? '✅ Submitted!' : 'Submit Assignment'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Sandbox</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Take Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 17 Quiz — RAG & Document QA</h2>
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
                <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '2rem', fontSize: '1rem' }}>Submit Quiz</button>
              ) : (
                <div style={{ marginTop: '2rem', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#4c1d95', display: 'block', marginBottom: '0.4rem' }}>Score: {quizScore} / {QUIZ_QUESTIONS.length}</strong>
                  <span style={{ color: '#6d28d9' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect! RAG master!' : 'Review the green answers above.'}</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Assignment</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Return to Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
