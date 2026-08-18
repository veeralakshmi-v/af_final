import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Terminal, CheckCircle, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'use_cases', label: '📝 Ingestion & Query Steps' },
  { id: 'workspace_sandbox', label: '💻 Code Generator Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const PRACTICAL_SCENARIOS = [
  {
    id: 'pinecone_setup',
    title: 'Setting up Pinecone Indexing',
    desc: 'Creating search indexes and dimensions on cloud databases to accommodate embeddings vectors.',
    steps: [
      'Log into the Pinecone Console (app.pinecone.io) and create a project.',
      'Click "Create Index". Set the index name (e.g., "prompt-validator-index").',
      'Set Dimensions to "1536" matching OpenAI embedding model outputs (or "768" matching Gemini).',
      'Select "Cosine" as the metric distance calculation standard, and click Create.'
    ],
    tip: 'Make sure your index dimension coordinate sizes match your embedding output dimensions exactly, or database records will fail to index.'
  },
  {
    id: 'llamaindex_ingestion',
    title: 'Document Ingestion with LlamaIndex',
    desc: 'Writing automation scripts in JS to load files, segment text, and upload vectors automatically.',
    steps: [
      'Install dependencies in your project: npm install pdf-parse dotenv @pinecone-database/pinecone.',
      'Initialize client connections using your local process.env.PINECONE_API_KEY parameters.',
      'Use a text splitter module to parse manuals text into 500-character chunks with a 50-character overlap.',
      'Call index.upsert() to transmit chunk vectors directly to the cloud index storage.'
    ],
    tip: 'Batch your database upserts (e.g. 100 vectors per call) to avoid HTTP timeout errors on large file sets.'
  },
  {
    id: 'rag_query',
    title: 'Retrieving Chunks & Prompt Synthesis',
    desc: 'Running runtime search checks inside your backend routes to serve grounded LLM responses.',
    steps: [
      'Read the user\'s incoming search query on your server endpoint routing.',
      'Convert the query string to embedding coordinates using the cloud embeddings API.',
      'Perform database search: index.query({ vector: queryEmbedding, topK: 3, includeMetadata: true }).',
      'Concatenate retrieved metadata strings, inject them inside your system prompt template context, and trigger model completion.'
    ],
    tip: 'Set your similarity query score threshold (e.g. 0.7) to block matching irrelevant records when users ask unrelated questions.'
  },
  {
    id: 'pdf_chatbot',
    title: 'Building a PDF Chatbot',
    desc: 'Creating a web utility letting users upload private PDFs, chunking pages, and holding real-time grounded chats.',
    steps: [
      'Create an HTML file input: <input type="file" accept=".pdf" /> on your frontend app.',
      'Post the selected file via API to a Node server route using FormData.',
      'Use the npm module `pdf-parse` to convert raw PDF bytes into a clean string on the backend.',
      'Chunk the text, generate embeddings vectors, insert them to a session-specific index partition, and route chats grounded strictly on those papers.'
    ],
    tip: 'Delete temporary vector namespaces when user sessions end to optimize storage costs.'
  },
  {
    id: 'company_chatbot',
    title: 'Company Knowledge Chatbot (Drive & Wiki)',
    desc: 'Integrating enterprise files from Google Drive, Notion, and wikis into a permanent team QA portal.',
    steps: [
      'Configure Notion/Google API connections to authorize reading workspace directory files.',
      'Schedule a nightly background task script to fetch updated files and check document timestamps.',
      'Delete old embeddings vectors and upsert new coordinates to keep search indexing updated.',
      'Apply metadata filters (e.g., department access tags) inside your database queries to prevent unauthorized users from viewing secure documents.'
    ],
    tip: 'Always secure your company bot: filter vector queries on user email domains so interns cannot search restricted HR pages.'
  }
];

const TOOLS_DIRECTORY = [
  { name: 'Pinecone Console', category: 'Vector Index', highlight: 'Cloud platform hosting vector database indexes, monitoring query latency, and tracking storage metrics.', link: 'https://pinecone.io' },
  { name: 'LlamaIndex TS', category: 'Orchestrator Library', highlight: 'TypeScript/JavaScript package designed to load documents, parse chunks, and automate similarity lookups.', link: 'https://ts.llamaindex.ai' },
  { name: 'pgvector (PostgreSQL)', category: 'Local Database', highlight: 'Open-source Postgres extension permitting you to query relational tables and floats arrays side-by-side.', link: 'https://github.com/pgvector/pgvector' },
  { name: 'LangChain JS', category: 'Chaining SDK', highlight: 'Powerful integration library to chain retrieval stages, re-rank inputs, and connect completion parameters.', link: 'https://js.langchain.com' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Which index dimension size is standard when using the OpenAI "text-embedding-3-small" model?',
    opts: [
      '768 dimensions',
      '1536 dimensions',
      '512 dimensions'
    ],
    ans: 1
  },
  {
    q: 'How should you authenticate connection parameters to cloud databases like Pinecone inside code?',
    opts: [
      'By pasting secret keys strings directly into public frontend script files',
      'By loading credentials using dotenv from local process.env variables configurations',
      'By changing database access settings to public read/write'
    ],
    ans: 1
  },
  {
    q: 'What occurs if you attempt to insert a 768-dimension vector into a Pinecone index configured for 1536 dimensions?',
    opts: [
      'The database automatically scales down the query',
      'The database throws an dimension mismatch validation error and rejects the record',
      'The code compiles but searches run twice as slow'
    ],
    ans: 1
  },
  {
    q: 'Why are metadata fields (like title, url, page number) stored alongside vector float arrays?',
    opts: [
      'To verify developer access keys',
      'To allow the retrieval script to extract and display the original source text segment and link paths to the user',
      'To decrease index dimensions'
    ],
    ans: 1
  },
  {
    q: 'What is the purpose of a similarity threshold rating (e.g. score >= 0.72)?',
    opts: [
      'To speed up embedding conversion cycles',
      'To block irrelevant database records from getting injected into your prompt context when search matches are weak',
      'To format page titles structures'
    ],
    ans: 1
  },
  {
    q: 'Which database extension allows Postgres servers to run Cosine similarity calculations natively inside SQL queries?',
    opts: [
      'pgvector',
      'dotenv library',
      'Postman client'
    ],
    ans: 0
  },
  {
    q: 'What is the correct sequencing of operations when answering a user prompt under RAG?',
    opts: [
      'Model completion ➔ Ingest file ➔ Vector similarity search',
      'Convert query to embedding ➔ Query Vector DB ➔ Inject matching chunks into prompt context ➔ LLM completions API call',
      'Chunk document ➔ Model completions API call ➔ Revoke API key'
    ],
    ans: 1
  },
  {
    q: 'Which Node library converts raw PDF file binaries into text strings to prepare for chunking splits?',
    opts: [
      'pdf-parse or pdfjs-dist',
      'dotenv configs',
      'pgvector modules'
    ],
    ans: 0
  }
];

export default function GenAIDay18({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [chunkSize, setChunkSize] = useState(500);
  const [overlapSize, setOverlapSize] = useState(50);
  const [selectedDB, setSelectedDB] = useState('pinecone');
  const [selectedEmbedder, setSelectedEmbedder] = useState('openai');
  const [simCode, setSimCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCode = () => {
    setIsGenerating(true);
    setSimCode('');

    const dim = selectedEmbedder === 'openai' ? 1536 : 768;
    const modelStr = selectedEmbedder === 'openai' ? 'text-embedding-3-small' : 'text-embedding-004';
    
    let dbInit = '';
    let dbUpsert = '';

    if (selectedDB === 'pinecone') {
      dbInit = `import { Pinecone } from "@pinecone-database/pinecone";\n\nconst pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });\nconst index = pc.Index("prompt-validator-index");`;
      dbUpsert = `await index.upsert(vectors.map((vec, idx) => ({\n  id: \`chunk-\${idx}\`,\n  values: vec.embedding,\n  metadata: { text: vec.text }\n})));`;
    } else {
      dbInit = `import pg from "pg";\n\nconst pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });`;
      dbUpsert = `// Save to SQL pgvector coordinates column\nfor (const vec of vectors) {\n  await pool.query(\n    "INSERT INTO prompt_records (content, embedding) VALUES ($1, $2::vector)",\n    [vec.text, \`[\${vec.embedding.join(",")}]\`]\n  );\n}`;
    }

    const fullCode = `// ⚡ AUTOGENERATED RAG ORCHESTRATION PIPELINE CODE
// Configuration: Chunk Size: ${chunkSize} | Overlap: ${overlapSize} | DB: ${selectedDB}

${dbInit}

import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function ingestDocument(rawText) {
  // 1. CHUNKING (Size: ${chunkSize}, Overlap: ${overlapSize})
  const chunks = [];
  for (let i = 0; i < rawText.length; i += ${chunkSize - overlapSize}) {
    chunks.push(rawText.slice(i, i + ${chunkSize}));
  }

  // 2. EMBEDDINGS (Model: ${modelStr}, Dimensions: ${dim})
  const vectors = [];
  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      model: "${modelStr}",
      input: chunk
    });
    vectors.push({
      text: chunk,
      embedding: response.data[0].embedding
    });
  }

  // 3. VECTOR DATABASE UPSERT
  ${dbUpsert}
  console.log("Successfully ingested " + chunks.length + " chunks into ${selectedDB}!");
}`;

    let idx = 0;
    const interval = setInterval(() => {
      setSimCode(fullCode.slice(0, idx));
      idx += 5;
      if (idx > fullCode.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 4);
  };

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
                background: isActive ? '#0f172a' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 18
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Practical RAG Implementation & Orchestration
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Understanding the theory of RAG is the first step; now you must build the pipeline. Today we explore practical execution scripts, database indexing configurations on cloud consoles like Pinecone, and orchestration setups inside Node/TypeScript.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('use_cases')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Practical Use Cases <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. PRACTICAL SCENARIOS ───────────────────────────────────── */}
        {activeTab === 'use_cases' && (
          <motion.div key="use_cases" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>💼 Developer Connection & Query Guides</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {PRACTICAL_SCENARIOS.map((sc) => (
                <div key={sc.id} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 0.6rem 0', fontWeight: 800, color: '#0f172a', fontSize: '1.35rem' }}>{sc.title}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '1.02rem', lineHeight: 1.6 }}>{sc.desc}</p>
                  <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', fontSize: '0.98rem', color: '#0f172a', borderLeft: '4px solid #475569', marginBottom: '0.8rem', lineHeight: 1.6 }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem' }}>🛠️ How to configure this step-by-step:</strong>
                    <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {sc.steps.map((st, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{st}</li>
                      ))}
                    </ol>
                  </div>
                  <span style={{ fontSize: '0.92rem', color: '#64748b' }}>💡 <strong>Pro Tip:</strong> {sc.tip}</span>
                </div>
              ))}
            </div>

            {/* Tools Directory */}
            <div style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>🛠️ Developer SDKs & Databases Directory</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {TOOLS_DIRECTORY.map((t) => (
                  <div key={t.name} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', alignItems: 'center' }}>
                      <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>{t.name}</strong>
                      <span style={{ fontSize: '0.85rem', background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 600 }}>{t.category}</span>
                    </div>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>{t.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('workspace_sandbox')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Code Generator Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'workspace_sandbox' && (
          <motion.div key="workspace_sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>💻 Code Generator Sandbox</h2>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Target Vector Database</label>
                  <select
                    value={selectedDB}
                    onChange={(e) => setSelectedDB(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none' }}
                  >
                    <option value="pinecone">Pinecone Cloud DB</option>
                    <option value="pgvector">pgvector (Postgres SQL)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Embedding API Model</label>
                  <select
                    value={selectedEmbedder}
                    onChange={(e) => setSelectedEmbedder(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none' }}
                  >
                    <option value="openai">OpenAI text-embedding-3-small (1536 dim)</option>
                    <option value="gemini">Google Vertex AI text-embedding-004 (768 dim)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Chunk Size (chars)</label>
                  <input
                    type="number"
                    value={chunkSize}
                    onChange={(e) => setChunkSize(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Overlap Window (chars)</label>
                  <input
                    type="number"
                    value={overlapSize}
                    onChange={(e) => setOverlapSize(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateCode}
                disabled={isGenerating}
                style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '2rem', fontSize: '1.02rem' }}
              >
                {isGenerating ? '⏳ Formulating Connection Scripts...' : '✨ Generate RAG Orchestration Code'}
              </button>

              <div>
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>🤖 Output JS connection file</span>
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', minHeight: '260px', border: '1px solid #1e293b' }}>
                  {simCode ? (
                    <pre style={{ margin: 0, color: '#38bdf8', fontSize: '0.92rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{simCode}</pre>
                  ) : (
                    <span style={{ color: '#475569', fontSize: '0.95rem', fontStyle: 'italic' }}>Click the button above to generate Node.js code files...</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Day 18 Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 18 Assignment</h2>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0' }}>
                ✏️ Practice: Writing query similarity lookup configurations
              </h4>
              <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Write the JavaScript code using Pinecone\'s SDK syntax to query your index for similarity.
                Requirements:
                <br />
                - Query vector float array should represent user query embedding.
                <br />
                - Return the top 4 matching segments.
                <br />
                - Explicitly include metadata strings variables.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`const searchMatches = await index.query({\n  vector: queryEmbeddingVector,\n  topK: 4,\n  includeMetadata: true\n});`}
                style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1.02rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.8rem', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Query Setup Registered!' : 'Submit Query Setup'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1.2rem 1.5rem', marginBottom: '1.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem' }}>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.98rem' }}>
                  <strong>Code snippet compiled successfully!</strong> Start the assessment quiz below to finish Day 18.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Assessment Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 18 Assessment Quiz</h2>
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
                      } else if (isSelected) { bg = '#f1f5f9'; border = '1.5px solid #0f172a'; color = '#0f172a'; }
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
                  style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
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
