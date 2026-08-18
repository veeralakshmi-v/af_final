import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Database, HelpCircle, Layers, Cpu, Code, BookOpen, AlertCircle, Compass } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'concepts', label: '💡 Interactive RAG Concepts' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

export default function GenAIDay17({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeConcept, setActiveConcept] = useState('what_is_rag');

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Embeddings simulator state
  const [embeddingInput, setEmbeddingInput] = useState("React component");
  const [embeddingResult, setEmbeddingResult] = useState([0.15, -0.42, 0.89, -0.04, 0.73, -0.56, 0.12, 0.31]);
  
  // Chunking simulator state
  const [chunkText, setChunkText] = useState("React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.");
  const [chunkSize, setChunkSize] = useState(60);

  // Vector DB simulator state
  const [dbQuery, setDbQuery] = useState("dynamic updates");
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const CONCEPT_LIST = [
    { id: 'what_is_rag', label: '📕 What is RAG?', icon: <BookOpen size={18} /> },
    { id: 'why_needed', label: '❓ Why RAG is Needed', icon: <AlertCircle size={18} /> },
    { id: 'embeddings', label: '🧮 Embeddings (Basic)', icon: <Cpu size={18} /> },
    { id: 'chunking', label: '✂️ Chunking (Basic)', icon: <Layers size={18} /> },
    { id: 'vector_db', label: '🗄️ Vector Database', icon: <Database size={18} /> },
    { id: 'retrieval', label: '🔍 Document Retrieval', icon: <Compass size={18} /> }
  ];

  const handleGenerateEmbedding = () => {
    // Generate deterministic mock embedding floats based on text input
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

  // Helper to split text by chunks
  const getChunks = () => {
    const chunks = [];
    for (let i = 0; i < chunkText.length; i += chunkSize) {
      chunks.push(chunkText.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const getVectorDBMatches = () => {
    const records = [
      { id: 1, text: "React efficiently updates and renders UI components.", embedding: [0.12, 0.45, -0.67, 0.81], similarity: 0.92 },
      { id: 2, text: "Declarative views make code easy to debug.", embedding: [-0.34, 0.78, 0.12, -0.49], similarity: 0.61 },
      { id: 3, text: "Create interactive custom web applications.", embedding: [0.55, -0.12, 0.88, 0.23], similarity: 0.44 }
    ];
    // Scale similarity slightly based on query input length
    return records.map(r => {
      const scoreScale = Math.min(1, Math.max(0.2, (dbQuery.length * 0.08) + (r.id === 1 ? 0.6 : 0.2)));
      return {
        ...r,
        similarity: Number((r.similarity * scoreScale).toFixed(2))
      };
    }).sort((a,b) => b.similarity - a.similarity);
  };

  const QUIZ_QUESTIONS = [
    {
      q: 'What is RAG (Retrieval-Augmented Generation)?',
      opts: [
        'A pattern that fine-tunes deep neural networks in real-time',
        'An architectural pattern that retrieves relevant external files coordinates and injects them as prompt context to ground model outputs',
        'A system configuration for parsing query directories'
      ],
      ans: 1
    },
    {
      q: 'Why is RAG needed in modern LLM applications?',
      opts: [
        'To prevent model code execution bugs',
        'To solve LLM knowledge cutoff dates and prevent hallucinations by grounding responses strictly in verified private document chunks',
        'To download local index templates'
      ],
      ans: 1
    },
    {
      q: 'What is a text embedding?',
      opts: [
        'An HTML styling formatting tag',
        'A mathematical array of floating-point numbers representing the conceptual meaning of a segment of text',
        'A folder structure mapping files'
      ],
      ans: 1
    },
    {
      q: 'What is the purpose of document chunking?',
      opts: [
        'To split massive manuals into smaller sections to fit inside the model context window and retrieve precise passages',
        'To encrypt secret variables and keys',
        'To compress images inside slides decks'
      ],
      ans: 0
    },
    {
      q: 'What is a Vector Database?',
      opts: [
        'A database optimized to index text coordinates (embeddings) and perform rapid mathematical similarity searches (like Cosine Similarity)',
        'An SQL database containing relational tables',
        'A file server repository'
      ],
      ans: 0
    },
    {
      q: 'What does "Document Retrieval" do in the RAG loop?',
      opts: [
        'It translates documents into multi-languages',
        'It searches the vector database using the query embedding coordinates and extracts the top K most similar text chunks',
        'It formats Excel table fields'
      ],
      ans: 1
    },
    {
      q: 'How does overlap help during text chunking?',
      opts: [
        'It prevents splitting context or phrases in half at chunk boundary lines',
        'It saves database storage space',
        'It accelerates connection speeds'
      ],
      ans: 0
    },
    {
      q: 'In the open-book exam analogy, what does the LLM represent?',
      opts: [
        'The textbook library database',
        'The student taking the exam (using facts retrieved from the open textbook to answer the questions)',
        'The desk table coordinate'
      ],
      ans: 1
    }
  ];

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#0f766e' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">

        {/* ── 1. OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(15,118,110,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#ccfbf1', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 17
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                RAG Foundations: Conceptual Overview
              </h1>
              <p style={{ color: '#ccfbf1', fontSize: '1.2rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Before writing orchestration code or configuring vector indices, developers must understand the mathematical vectors, chunk partition boundaries, and retrieval mechanisms of RAG. Today we explore these concepts interactively.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('concepts')} style={{ background: '#0f766e', borderColor: '#0f766e', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Interactive RAG Workshop <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. INTERACTIVE CONCEPTUAL UI ──────────────────────────────── */}
        {activeTab === 'concepts' && (
          <motion.div key="concepts" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💡 Interactive RAG Mechanics</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Select a concept tab on the left to explore RAG dynamics interactively:</p>

            <div style={{ display: 'flex', gap: '2rem', minHeight: '480px', alignItems: 'stretch' }}>
              
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
                        borderColor: isSelected ? '#0f766e' : '#cbd5e1',
                        background: isSelected ? '#f0fdfa' : 'white',
                        color: isSelected ? '#0f766e' : '#475569',
                        fontWeight: 700,
                        fontSize: '1rem',
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
                      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>📕 What is RAG in Simple Words?</h3>
                      <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        Think of standard AI (like ChatGPT) as a student taking a history test <strong>without any books</strong>. They have to answer from memory. If the question is about your personal company files, they won't know it and might just make something up (hallucinate).
                        <br /><br />
                        <strong>RAG (Retrieval-Augmented Generation)</strong> turns the test into an <strong>"open-book exam"</strong>:
                        <br />
                        1. You type a question.<br />
                        2. The system searches your document files to find the exact pages containing the answer.<br />
                        3. The system hands those pages to the AI alongside your question.<br />
                        4. The AI reads the pages and answers you accurately.
                      </p>
                      
                      <div style={{ background: '#f8fafc', borderLeft: '4px solid #0f766e', padding: '1.2rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#0f766e', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>💡 Simple summary</span>
                        <p style={{ margin: 0, color: '#475569', fontSize: '1rem', lineHeight: 1.5 }}>
                          RAG = **Search your files first** ➔ **Paste the matching text into the prompt** ➔ **Let the AI write the answer**.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: WHY NEEDED */}
                  {activeConcept === 'why_needed' && (
                    <motion.div key="why_needed" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>❓ Why is RAG Needed?</h3>
                      <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        Normally, an AI model only knows things it learned during its initial training years ago. It cannot read your personal computer or internal company spreadsheets.
                        <br /><br />
                        RAG is the easiest way to give the AI access to new information for three reasons:
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        {[
                          { title: '🔒 Private Files Access', desc: 'Allows the AI to securely read your private PDFs, emails, and guides.' },
                          { title: '🛑 Stops Hallucinations', desc: 'Forces the AI to answer strictly based on the text pages found in your library, rather than guessing.' },
                          { title: '⚡ Instant Updates', desc: 'If your company policy changes today, you just swap the text files in your folder. No need to retrain the AI.' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.3rem', fontSize: '0.95rem' }}>{item.title}</strong>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: EMBEDDINGS BASIC */}
                  {activeConcept === 'embeddings' && (
                    <motion.div key="embeddings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>🧮 Embeddings (Basic)</h3>
                      <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        Computers cannot read semantic meaning from plain string characters. They require mathematical numbers.
                        An **Embedding** model translates textual strings into an array of floats (coordinates) representing conceptual values.
                      </p>

                      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>Type text to generate vector coordinates:</label>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                          <input
                            type="text"
                            value={embeddingInput}
                            onChange={(e) => setEmbeddingInput(e.target.value)}
                            style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                          />
                          <button onClick={handleGenerateEmbedding} style={{ background: '#0f766e', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                            Vectorize
                          </button>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>🤖 Generated Float Coordinate Array (8-Dimension representation):</span>
                      <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#22d3ee', fontFamily: 'monospace', fontSize: '0.95rem', marginTop: '0.4rem' }}>
                        [ {embeddingResult.join(', ')} ]
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: CHUNKING BASIC */}
                  {activeConcept === 'chunking' && (
                    <motion.div key="chunking" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>✂️ Chunking (Basic)</h3>
                      <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        LLM APIs charge fees based on tokens, and they cannot read a 100-page catalog file for every user question.
                        We slice files into **Chunks** so we can retrieve only the specific paragraphs needed.
                      </p>

                      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <label style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>Chunk Character Size: <strong>{chunkSize} chars</strong></label>
                          <input
                            type="range"
                            min="20"
                            max="150"
                            value={chunkSize}
                            onChange={(e) => setChunkSize(Number(e.target.value))}
                            style={{ width: '120px' }}
                          />
                        </div>
                      </div>

                      <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Visualizing Output Chunks:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {getChunks().map((chunk, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: idx % 2 === 0 ? '#ccfbf1' : '#fef9c3',
                              color: idx % 2 === 0 ? '#115e59' : '#713f12',
                              padding: '0.5rem 0.8rem',
                              borderRadius: '8px',
                              fontSize: '0.9rem',
                              fontFamily: 'monospace',
                              border: '1px solid #cbd5e1',
                              lineHeight: 1.4
                            }}
                          >
                            <strong>Chunk {idx+1}:</strong> "{chunk}"
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: VECTOR DATABASE */}
                  {activeConcept === 'vector_db' && (
                    <motion.div key="vector_db" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>🗄️ Vector Database Introduction</h3>
                      <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        A standard relational database searches by matching letters (e.g. searching for "car" won't find "automobile").
                        A **Vector Database** searches by calculating the geometric distance between embeddings: it matches words based on conceptual meanings.
                      </p>

                      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1rem 1.2rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#0f766e', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>Concept Database Indices:</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem' }}>
                            <span style={{ color: '#0f172a' }}>Word: "Laptop"</span>
                            <span style={{ fontFamily: 'monospace', color: '#64748b' }}>Vector: [0.88, -0.12, 0.44]</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem' }}>
                            <span style={{ color: '#0f172a' }}>Word: "Computer"</span>
                            <span style={{ fontFamily: 'monospace', color: '#64748b' }}>Vector: [0.85, -0.10, 0.42] (Very close!)</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#0f172a' }}>Word: "Banana"</span>
                            <span style={{ fontFamily: 'monospace', color: '#64748b' }}>Vector: [-0.34, 0.78, -0.91] (Far away!)</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CONCEPT: DOCUMENT RETRIEVAL */}
                  {activeConcept === 'retrieval' && (
                    <motion.div key="retrieval" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>🔍 Document Retrieval</h3>
                      <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        Type a keyword below. The mock vector database will retrieve stored database records, sorting them by semantic similarity percentage.
                      </p>

                      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                          <input
                            type="text"
                            value={dbQuery}
                            onChange={(e) => setDbQuery(e.target.value)}
                            placeholder="Type search terms (e.g. updates, debug)..."
                            style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                          />
                        </div>

                        <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Similarity Match Results:</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {getVectorDBMatches().map((rec) => (
                            <div key={rec.id} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.8rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <span style={{ display: 'block', color: '#0f172a', fontSize: '0.95rem' }}>"{rec.text}"</span>
                                <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>Vector: [{rec.embedding.join(', ')}]</span>
                              </div>
                              <span style={{ background: rec.similarity > 0.8 ? '#dcfce7' : '#f1f5f9', color: rec.similarity > 0.8 ? '#15803d' : '#475569', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                                Match: {Math.round(rec.similarity * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#0f766e', borderColor: '#0f766e', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Day 17 Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 17 Assignment</h2>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0' }}>
                ✏️ Practice: Explaining the RAG Loop in your own words
              </h4>
              <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Write a 3-sentence summary describing the RAG loop to a non-technical developer.
                Mention:
                <br />
                1. What **Chunking** does to original files.
                <br />
                2. What **Embeddings** represent.
                <br />
                3. How the **LLM** utilizes the retrieved coordinates.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`To explain RAG to a beginner...\nFirst, chunking parses documents into...\nNext, embeddings convert text into vectors...\nFinally, the model uses these facts...`}
                style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1.02rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.8rem', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Grounding Analogy Registered!' : 'Submit Grounding Analogy'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1.2rem 1.5rem', marginBottom: '1.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem' }}>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.98rem' }}>
                  <strong>Grounded explanation saved successfully!</strong> Start the assessment quiz below to finish Day 17.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#0f766e', borderColor: '#0f766e', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Assessment Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 17 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1.02rem' }}>{QUIZ_QUESTIONS.length} questions — select your answers:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.8rem', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 1rem 0', fontSize: '1.12rem', lineHeight: 1.5 }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#e6f4ea'; border = '1.5px solid #0f766e'; color = '#115e59'; }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.8rem 1.1rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '1.02rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400, lineHeight: 1.4 }}
                        >
                          {opt}
                          {quizSubmitted && isCorrect && <span style={{ float: 'right' }}>✓</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span style={{ float: 'right' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{ background: '#0f766e', borderColor: '#0f766e', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
                >
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12', fontSize: '1.05rem' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great Job!' : '📖 Review the lessons!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                    Retry Quiz
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
