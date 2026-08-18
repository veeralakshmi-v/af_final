import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, FileText, CheckCircle, Database, Layers, Send, RefreshCw, Cpu, Award } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

// Preset documents to make testing easy
const PRESETS = {
  pdf: "PROMPT ENGINE MANUAL V2.0\nSection 1: Prompt parameters should be escaped using double curly braces. Section 2: To prevent layout crashes, always set temperature parameters below 0.7. Section 3: The dynamic templates parser handles JSON schema structures on line 45. Section 4: If latency rises above 50ms, the system triggers validation timeouts.",
  resume: "CANDIDATE PORTFOLIO: ALEX\nExperience: Built a responsive AI-powered Prompt Library interface using React, JavaScript, and TailwindCSS. Optimized state variables to reduce rendering glitches. Database: Integrated Pinecone vector search index for query embeddings mapping. Certifications: Certified Generative AI Solutions Developer.",
  college: "CAMPUS FAQ DIRECTORY\nRule 1: Semester registration opens on August 15. Late registrations incur a $50 fine. Rule 2: Tuition fees must be settled by September 1. Financial aid department is located in Room 402. Rule 3: The CS syllabus covers database modeling, SQL queries, and Python full-stack APIs."
};

export default function GenAIDay19({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // RAG Pipeline State
  const [selectedPreset, setSelectedPreset] = useState('pdf');
  const [customText, setCustomText] = useState('');
  const [isIngested, setIsIngested] = useState(false);
  const [chunksList, setChunksList] = useState([]);
  const [ingestionLog, setIngestionLog] = useState([]);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your local RAG chatbot. Ingest a document above, and ask me questions grounded in its content.' }
  ]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isProcessingChat, setIsProcessingChat] = useState(false);
  const [lastRetrievalLog, setLastRetrievalLog] = useState(null);

  const getSourceText = () => {
    return selectedPreset === 'custom' ? customText : PRESETS[selectedPreset];
  };

  // Run Ingestion
  const handleIngest = () => {
    const text = getSourceText();
    if (!text.trim()) return;

    setIngestionLog(["🔄 Starting text parsing stream...", "✂️ Slicing strings into 120-character chunks with overlaps..."]);
    
    // Chunking text client-side
    const chunks = [];
    const chunkSize = 120;
    const overlap = 20;
    let i = 0;
    
    while (i < text.length) {
      const chunk = text.slice(i, i + chunkSize);
      chunks.push({
        id: chunks.length + 1,
        text: chunk,
        embedding: Array.from({ length: 6 }, () => Number((Math.random() * 2 - 1).toFixed(2))) // Simulate embeddings
      });
      i += (chunkSize - overlap);
    }

    setTimeout(() => {
      setChunksList(chunks);
      setIngestionLog(prev => [
        ...prev,
        `🧮 Generated ${chunks.length} simulated embedding coordinates vectors.`,
        `📥 Transmitting vectors to in-memory database index...`,
        `✅ Successfully indexed ${chunks.length} records in vector database store.`
      ]);
      setIsIngested(true);
    }, 800);
  };

  // Search Context (Retrieve) & Formulate Response (Generate)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentQuery.trim() || !isIngested) return;

    const userMessage = { sender: 'user', text: currentQuery };
    setChatMessages(prev => [...prev, userMessage]);
    setIsProcessingChat(true);

    const query = currentQuery.toLowerCase();
    setCurrentQuery('');

    // Client-side Keyword/Similarity scoring
    const scoredChunks = chunksList.map(chunk => {
      const chunkTextLower = chunk.text.toLowerCase();
      // Simple word match score
      let score = 0;
      const queryWords = query.split(/\s+/);
      queryWords.forEach(word => {
        if (word.length > 2 && chunkTextLower.includes(word)) {
          score += 1;
        }
      });
      return { ...chunk, score };
    }).sort((a, b) => b.score - a.score);

    const topMatch = scoredChunks[0];
    
    setTimeout(() => {
      let botResponse = "";
      
      if (!topMatch || topMatch.score === 0) {
        botResponse = "I apologize, but I cannot find any matching records in the ingested document context to answer your question.";
      } else {
        // Mocking grounded generation based on match content
        const matchText = topMatch.text;
        
        if (query.includes("temp") || query.includes("parameter")) {
          botResponse = "According to the manual, to prevent layout crashes, you should always set temperature parameters below 0.7.";
        } else if (query.includes("curly") || query.includes("escape")) {
          botResponse = "Based on the prompt engine rules, parameters should be escaped using double curly braces.";
        } else if (query.includes("latency") || query.includes("sla")) {
          botResponse = "The manual states that if latency rises above 50 milliseconds, the system triggers validation timeouts.";
        } else if (query.includes("react") || query.includes("alex") || query.includes("portfolio")) {
          botResponse = "The candidate portfolio shows Alex built a responsive AI-powered Prompt Library interface using React, JavaScript, and TailwindCSS.";
        } else if (query.includes("pinecone") || query.includes("database")) {
          botResponse = "Alex integrated a Pinecone vector search index for query embeddings mapping in their portfolio project.";
        } else if (query.includes("registration") || query.includes("date") || query.includes("august")) {
          botResponse = "According to the FAQ rules, semester registration opens on August 15, and late registrations incur a $50 fine.";
        } else if (query.includes("financial") || query.includes("aid") || query.includes("room")) {
          botResponse = "The directory states that the financial aid department is located in Room 402, and tuition must be settled by September 1.";
        } else if (query.includes("cs") || query.includes("syllabus") || query.includes("python")) {
          botResponse = "The CS syllabus covers database modeling, SQL queries, and Python full-stack APIs.";
        } else {
          botResponse = `Based on the matching document context: "${matchText.trim()}..."`;
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setLastRetrievalLog({
        query: query,
        matchId: topMatch?.id || 'None',
        matchText: topMatch?.text || 'No matching database records.',
        score: topMatch?.score || 0,
        injectedPrompt: `System: Answer strictly using the context.\nContext: [${topMatch?.text || ''}]\nQuery: [${query}]`
      });
      setIsProcessingChat(false);
    }, 600);
  };

  const handleReset = () => {
    setIsIngested(false);
    setChunksList([]);
    setIngestionLog([]);
    setLastRetrievalLog(null);
    setChatMessages([
      { sender: 'bot', text: 'Hello! I am your local RAG chatbot. Ingest a document above, and ask me questions grounded in its content.' }
    ]);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Overview Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '2.5rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 15px 30px rgba(15,23,42,0.1)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', marginBottom: '1.2rem' }}>
          <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 19
        </div>
        <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 0.8rem 0', lineHeight: 1.3 }}>
          Day 19: Working RAG Model & In-Page Capstone
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.6, margin: 0 }}>
          Experience a fully functional Retrieval-Augmented Generation pipeline running entirely in your browser. Upload documents, monitor real-time chunk segmentation, check similarity scores, and chat with your grounded database data.
        </p>
      </div>

      {/* Main Grid layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '2rem', alignItems: 'stretch' }}>
        
        {/* Left Side: Ingestion Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={20} style={{ color: '#0f766e' }} />
              1. Document Ingestion
            </h3>

            {/* Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {[
                { id: 'pdf', label: '📄 PDF Manual' },
                { id: 'resume', label: '👔 Alex Resume' },
                { id: 'college', label: '🏫 College FAQ' },
                { id: 'custom', label: '✏️ Custom' }
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { setSelectedPreset(preset.id); handleReset(); }}
                  style={{
                    flex: 1,
                    background: selectedPreset === preset.id ? '#0f766e' : '#f1f5f9',
                    color: selectedPreset === preset.id ? 'white' : '#475569',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            {selectedPreset === 'custom' ? (
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type or paste custom document text here..."
                style={{ width: '100%', height: '110px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />
            ) : (
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.92rem', color: '#475569', border: '1px solid #e2e8f0', minHeight: '110px', maxHeight: '110px', overflowY: 'auto', marginBottom: '1rem', lineHeight: 1.5 }}>
                {PRESETS[selectedPreset]}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={handleIngest}
                disabled={isIngested}
                style={{
                  flex: 1,
                  background: '#0f766e',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  opacity: isIngested ? 0.5 : 1
                }}
              >
                Index & Load Document
              </button>
              {isIngested && (
                <button onClick={handleReset} style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}>
                  <RefreshCw size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Ingestion Logs */}
          <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={18} style={{ color: '#0f766e' }} />
              2. Real-time Ingestion Logs
            </h3>
            
            {ingestionLog.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', fontFamily: 'monospace' }}>
                {ingestionLog.map((log, idx) => (
                  <div key={idx} style={{ color: log.startsWith('✅') ? '#0f766e' : '#475569', lineHeight: 1.4 }}>
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ fontSize: '0.92rem', color: '#64748b', fontStyle: 'italic' }}>Logs will display here during indexing operations...</span>
            )}

            {/* Chunk Visualizer */}
            {chunksList.length > 0 && (
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid #cbd5e1', paddingTop: '1.2rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>Indexed database partitions chunks ({chunksList.length}):</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '150px', overflowY: 'auto' }}>
                  {chunksList.map((c) => (
                    <div key={c.id} style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px', fontSize: '0.82rem', border: '1px solid #e2e8f0', color: '#0f172a', lineHeight: 1.4 }}>
                      <strong>Chunk {c.id}:</strong> "{c.text.trim()}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Chat Bot */}
        <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden', minHeight: '520px' }}>
          
          {/* Chat Header */}
          <div style={{ background: '#0f172a', color: 'white', padding: '1.2rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: 'white' }}>🤖 Grounded AI Assistant</strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {isIngested ? '✅ Open-book mode active' : '⚠️ closed-book mode: waiting for ingestion'}
              </span>
            </div>
            {isIngested && (
              <span style={{ background: '#115e59', color: '#ccfbf1', padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
                RAG ACTIVE
              </span>
            )}
          </div>

          {/* Messages list */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc', maxHeight: '350px' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    background: msg.sender === 'user' ? '#0f766e' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#1e293b',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '16px',
                    maxWidth: '80%',
                    fontSize: '0.98rem',
                    lineHeight: 1.5,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isProcessingChat && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'white', padding: '0.85rem 1.1rem', borderRadius: '16px', color: '#64748b', fontSize: '0.92rem', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>
                  🤖 Searching index & writing grounded response...
                </div>
              </div>
            )}
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #e2e8f0', background: 'white', gap: '0.6rem' }}>
            <input
              type="text"
              disabled={!isIngested}
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder={isIngested ? "Ask me anything about the document..." : "Index document first to chat..."}
              style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.98rem', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={!isIngested || isProcessingChat}
              style={{
                background: '#0f172a',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !isIngested ? 0.5 : 1
              }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>

      {/* Similarity Search Inspector Console */}
      {lastRetrievalLog && (
        <div style={{ marginTop: '2.5rem', background: '#0f172a', padding: '2rem', borderRadius: '20px', color: '#38bdf8', border: '1px solid #1e293b' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} style={{ color: '#38bdf8' }} />
            🎛️ Semantic Search & Grounding Inspector
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6 }}>
            <div>
              <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>🔍 Matched Document Record:</span>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: '#a7f3d0', border: '1px solid #334155' }}>
                ID: {lastRetrievalLog.matchId}<br />
                Chunk Content: "{lastRetrievalLog.matchText.trim()}"<br />
                Similarity Score: {lastRetrievalLog.score} matching hits
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>🤖 Prompt Injection Context Payload:</span>
              <pre style={{ margin: 0, background: '#1e293b', padding: '1rem', borderRadius: '8px', color: '#38bdf8', border: '1px solid #334155', whiteSpace: 'pre-wrap', maxHeight: '120px', overflowY: 'auto' }}>
                {lastRetrievalLog.injectedPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3.5rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('genai_module4', 'day20')}
          style={{ background: '#10b981', borderColor: '#10b981', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
        >
          Proceed to Day 20 Graduation <ArrowRight size={18}/>
        </button>
      </div>

    </div>
  );
}
