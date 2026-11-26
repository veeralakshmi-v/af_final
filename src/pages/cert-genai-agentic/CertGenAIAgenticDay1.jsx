import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Bot, Sparkles, Layers, Terminal, Database, Shield, 
  Workflow, Code, CheckCircle, Zap, Award, ArrowRight, HelpCircle, 
  Trophy, BookOpen, Clock, Calendar, Check, ExternalLink, RefreshCw, 
  ChevronRight, Play, Eye, FileCode, Server, Sliders, AlertCircle
} from 'lucide-react';
import bannerImg from '../../assets/generative_ai_day1_banner.png';
import mlImg from '../../assets/ml_patterns_diagram.png';
import aiImg from '../../assets/ai_logic_flowchart.png';
import archImg from '../../assets/agentic_ai_architecture.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

const SUB_TABS = [
  { id: 'orientation', label: '🧭 Course Orientation & Roadmap', icon: <Calendar size={16} /> },
  { id: 'comparison', label: '⚖️ ML vs DL vs Gen AI', icon: <Layers size={16} /> },
  { id: 'aistack', label: '🏗️ Real-World AI Stack', icon: <Server size={16} /> },
  { id: 'simulator', label: '⚡ Interactive Paradigm Simulator', icon: <Cpu size={16} /> },
  { id: 'pythonready', label: '🐍 Python API Readiness', icon: <Terminal size={16} /> },
  { id: 'quiz', label: '✍️ Knowledge Check', icon: <HelpCircle size={16} /> },
  { id: 'assignment', label: '📝 Day 1 Assignment', icon: <Award size={16} /> }
];

const QUIZ_QUESTIONS = [
  {
    q: 'How does Generative AI fundamentally differ from Traditional Machine Learning in terms of output and paradigm?',
    opts: [
      'Traditional ML produces numbers or discrete class labels from hand-engineered features, whereas Generative AI generates novel, high-dimensional artifacts (text, code, synthetic media) from natural language prompts.',
      'Traditional ML only runs in Python, whereas Generative AI runs strictly inside web browsers.',
      'Generative AI does not require training data, while Traditional ML requires millions of GPUs.',
      'Traditional ML only operates on images, while Generative AI only processes tabular numbers.'
    ],
    ans: 0,
    explanation: 'Traditional ML focuses on predictive/discriminative tasks (e.g. classification or regression based on structured features), whereas Generative AI models learned the joint probability distribution of vast multi-modal data to synthesize original content.'
  },
  {
    q: 'What is the role of Deep Learning in the AI hierarchy?',
    opts: [
      'It is an outdated technology completely replaced by basic spreadsheet calculations.',
      'It is a subset of Machine Learning based on multi-layered artificial neural networks capable of learning hierarchical feature representations directly from raw unstructured data.',
      'It is a database management software similar to MySQL.',
      'It is an automation tool exclusively designed for sending marketing emails.'
    ],
    ans: 1,
    explanation: 'Deep Learning utilizes deep neural architectures (Transformers, CNNs, RNNs) that extract abstract feature hierarchies automatically without requiring manual feature engineering.'
  },
  {
    q: 'In the modern 6-Layer Real-World AI Stack, what role does Layer 4 (Storage, Vector Databases & Retrieval) fulfill?',
    opts: [
      'It replaces the physical server CPU with a virtual battery.',
      'It grounds foundation models with domain-specific knowledge via embeddings and vector similarity search (RAG) to eliminate hallucinations.',
      'It only stores the student attendance records.',
      'It compiles Python syntax into machine binary code.'
    ],
    ans: 1,
    explanation: 'Vector databases (Pinecone, ChromaDB, Qdrant) index semantic embeddings of proprietary documents, enabling accurate context injection during retrieval-augmented generation (RAG).'
  },
  {
    q: 'Why are LLMs alone not considered fully "Agentic" in production systems?',
    opts: [
      'LLMs lack internet connection and cannot run on Nvidia GPUs.',
      'Pure LLMs are next-token predictors operating in a single forward pass; they lack memory persistence, tool execution autonomy, and iterative decision-making loops without an agent framework.',
      'LLMs only speak binary code and cannot read JSON.',
      'LLMs require human operators to manually type every internal neural weight.'
    ],
    ans: 1,
    explanation: 'An agent requires an autonomous environment: observing states, reasoning, selecting external tools (APIs, calculators, SQL), evaluating execution feedback, and looping until the objective is accomplished.'
  },
  {
    q: 'Which tool calling / orchestration framework is industry standard for building production multi-agent systems and stateful graphs in Month 3 of this certification?',
    opts: [
      'jQuery and Apache Cordova.',
      'LangChain & LangGraph (with CrewAI & Agno).',
      'Flash Macromedia Player.',
      'Notepad++ plugins.'
    ],
    ans: 1,
    explanation: 'LangChain and LangGraph are the leading industry frameworks for deterministic multi-agent state graphs, cyclical reasoning loops, and enterprise workflow orchestration.'
  }
];

const PARADIGM_EXAMPLES = {
  churn: {
    title: 'Customer Churn Prediction',
    ml: {
      type: 'Traditional ML (Logistic Regression / XGBoost)',
      input: 'Tabular tabular features: tenure_months, monthly_charges, support_tickets_count.',
      process: 'Calculates mathematical decision boundary across normalized columns using GBDT trees.',
      output: 'Churn Probability: 0.84 (Class: At Risk)'
    },
    dl: {
      type: 'Deep Learning (LSTM / Temporal Neural Net)',
      input: 'Sequential time-series event logs and session clickstreams over past 90 days.',
      process: 'Recurrent hidden states capture non-linear behavioral velocity and decay patterns.',
      output: 'Predicted Churn Window: 14 to 21 Days with 89.2% confidence'
    },
    genai: {
      type: 'Generative AI (GPT-4o / Claude 3.5 Sonnet)',
      input: 'Customer support transcripts, cancellation survey feedback, and ticket chat logs.',
      process: 'Understands customer sentiment, uncovers root frustration causes, and drafts a personalized retention offer.',
      output: 'Generates empathetic VIP retention email with customized 20% discount on their favorite feature.'
    },
    agentic: {
      type: 'Agentic AI (Autonomous Retention Agent)',
      input: 'Real-time telemetry signal: High-value account opened cancellation settings page.',
      process: 'Autonomously queries Stripe API for billing history, checks Zendesk tickets, triggers retention flow, and books calendar meeting with account manager.',
      output: 'Autonomous Action: Dispatched slack alert to account manager, applied discount in Stripe, and logged ticket in CRM.'
    }
  },
  code: {
    title: 'Code Vulnerability & Quality Audit',
    ml: {
      type: 'Traditional ML (Random Forest Classifier)',
      input: 'Static metrics: cyclomatic complexity, lines of code, function parameter count.',
      process: 'Compares numerical code metrics against historical defect classification thresholds.',
      output: 'Defect Risk: Moderate (Metric Score: 68/100)'
    },
    dl: {
      type: 'Deep Learning (CodeBERT / Tree-LSTM)',
      input: 'Abstract Syntax Tree (AST) tokens and tokenized dependency graphs.',
      process: 'Deep attention mechanisms detect syntactic pattern anomalies across code paths.',
      output: 'Identified Potential Buffer Overflow at line 142 (91% attention weight).'
    },
    genai: {
      type: 'Generative AI (Claude 3.5 Sonnet / DeepSeek-Coder)',
      input: 'Entire 250-line Python module containing insecure SQL query concatenation.',
      process: 'Explains the SQL injection vulnerability, security implications, and refactors code using parameterized ORM.',
      output: 'Generates rewritten secure code with unit test cases demonstrating safe execution.'
    },
    agentic: {
      type: 'Agentic AI (Autonomous DevSecOps Agent)',
      input: 'GitHub Webhook: Pull Request #48 submitted by junior engineer.',
      process: 'Agent checks out branch, executes AST security linter, runs unit tests in sandboxed docker, refactors vulnerable lines, and pushes review commit.',
      output: 'Autonomous Action: Created fix commit, added inline PR review comment, and approved build.'
    }
  },
  medical: {
    title: 'Healthcare Patient Diagnosis & Triage',
    ml: {
      type: 'Traditional ML (Support Vector Machine / Random Forest)',
      input: 'Biomarkers: blood glucose, systolic BP, cholesterol, age, BMI.',
      process: 'Calculates hyperplane separation across patient health index metrics.',
      output: 'Risk Category: Type-2 Diabetes High Risk (Confidence: 87%)'
    },
    dl: {
      type: 'Deep Learning (Convolutional Vision Transformer)',
      input: 'High-resolution chest X-Ray or MRI scan (DICOM format).',
      process: 'Multi-layer spatial convolutional kernels localize subtle pulmonary nodules and lesions.',
      output: 'Heatmap bounding box identifying 1.4cm nodule in lower right lung lobe.'
    },
    genai: {
      type: 'Generative AI (Medical Foundation LLM / Med-PaLM)',
      input: 'Physician notes, lab report PDF, and historical EHR clinical history.',
      process: 'Synthesizes clinical narrative, references medical literature, and drafts differential diagnosis options for physician review.',
      output: 'Structured clinical summary with medication interaction warnings and referral recommendations.'
    },
    agentic: {
      type: 'Agentic AI (Autonomous Hospital Triage Agent)',
      input: 'Emergency room intake alert for patient with chest pain.',
      process: 'Queries EHR database, cross-references live ICU bed availability via hospital API, alerts on-call cardiologist pager, and reserves CT scanner.',
      output: 'Autonomous Action: Hospital admission protocol launched, doctor paged, and priority lab orders queued.'
    }
  }
};

const AI_STACK_LAYERS = [
  {
    layer: 6,
    name: 'Applications & Agentic UI',
    color: '#ec4899',
    badge: 'Presentation & Interaction',
    summary: 'The interface layer where users and enterprise software interact with AI workflows.',
    tools: ['Streamlit', 'Chainlit', 'Next.js / React', 'FastAPI', 'Slack / Discord Bots', 'Vercel AI SDK'],
    description: 'Bridges the gap between raw model outputs and end users. Includes conversational web interfaces, chat widgets, IDE extensions (Cursor, Copilot), and headless microservices.'
  },
  {
    layer: 5,
    name: 'Evaluation, Guardrails & Observability',
    color: '#8b5cf6',
    badge: 'Safety & Monitoring',
    summary: 'Monitoring model hallucination, latency, token costs, security, and prompt injection defense.',
    tools: ['LangSmith', 'Arize Phoenix', 'NeMo Guardrails', 'TruLens', 'Weights & Biases', 'OpenTelemetry'],
    description: 'Ensures enterprise safety and compliance. Traces token consumption, debugs multi-step agent reasoning failures, blocks PII leakage, and monitors latency metrics in real time.'
  },
  {
    layer: 4,
    name: 'Storage, Memory & Vector Databases (RAG)',
    color: '#3b82f6',
    badge: 'Domain Knowledge Grounding',
    summary: 'Storing long-term memory, conversation history, and indexing multi-modal data for retrieval.',
    tools: ['Pinecone', 'ChromaDB', 'Weaviate', 'Milvus', 'Qdrant', 'pgvector (PostgreSQL)', 'Redis'],
    description: 'LLMs have fixed context windows and static knowledge cutoffs. Vector databases convert enterprise PDFs, documentation, and database records into dense numerical vectors (embeddings) for millisecond semantic retrieval.'
  },
  {
    layer: 3,
    name: 'Frameworks, Orchestration & Tool Calling',
    color: '#10b981',
    badge: 'Agent Logic & Pipelines',
    summary: 'Chaining prompts, connecting external APIs, and managing autonomous cyclical reasoning loops.',
    tools: ['LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'Agno (Phidata)', 'LiteLLM', 'n8n', 'Flowise'],
    description: 'The core engineering tier of Agentic AI. Allows models to call external REST APIs, execute Python scripts, parse structured JSON, and coordinate teams of specialized agents with persistent state.'
  },
  {
    layer: 2,
    name: 'Foundation Models & Model Serving',
    color: '#f59e0b',
    badge: 'Intelligence Engine',
    summary: 'The foundational neural weights trained on internet-scale data providing general reasoning capability.',
    tools: ['OpenAI (GPT-4o)', 'Anthropic (Claude 3.5 Sonnet)', 'Google (Gemini 1.5 Pro)', 'Meta (Llama 3.3 70B)', 'DeepSeek-V3', 'Mistral Large', 'vLLM', 'Ollama', 'Hugging Face'],
    description: 'Proprietary APIs and open-weights models that accept multimodal inputs (tokens, images, audio) and generate structured reasoning outputs.'
  },
  {
    layer: 1,
    name: 'Compute, Acceleration & Cloud Infrastructure',
    color: '#64748b',
    badge: 'Hardware & Silicon',
    summary: 'The physical GPUs, TPUs, and specialized accelerators that execute billions of matrix multiplications.',
    tools: ['Nvidia H100 / A100 / B200 GPUs', 'Cloud TPUs (v5p)', 'AWS Bedrock / SageMaker', 'Azure OpenAI', 'Google Cloud Vertex AI', 'RunPod / Lambda Labs', 'CUDA'],
    description: 'The computational bedrock of all AI. Massive parallel GPU clusters capable of petabyte-scale floating-point operations (FLOPS) required for pre-training, fine-tuning, and ultra-low-latency model inference.'
  }
];

export default function CertGenAIAgenticDay1({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('orientation');
  const [selectedParadigmProblem, setSelectedParadigmProblem] = useState('churn');
  const [activeStackLayer, setActiveStackLayer] = useState(AI_STACK_LAYERS[2]); // Default to Layer 4/3

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.ans) score++;
    });
    return score;
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1200, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 🚀 TOP HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
        borderRadius: 20,
        padding: '2.5rem 2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 15px 35px -10px rgba(15, 23, 42, 0.45)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', 
              color: 'white', 
              fontWeight: 800, 
              fontSize: '0.78rem', 
              padding: '4px 14px', 
              borderRadius: 20, 
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.35)'
            }}>
              🎓 3-Month Industry Certification (60 Days)
            </span>
            <span style={{ background: 'rgba(255,255,255,0.12)', color: '#e2e8f0', fontSize: '0.8rem', padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>
              Cognitive AI Development Track
            </span>
            <span style={{ background: '#10b981', color: '#022c22', fontSize: '0.78rem', padding: '3px 10px', borderRadius: 20, fontWeight: 800 }}>
              Month 1 • Week 1 • Day 1
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 1rem 0', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Certification in Generative AI &amp; Agentic AI
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: 0, maxWidth: 850, lineHeight: 1.6 }}>
            <strong>Day 1:</strong> Course Orientation • Traditional ML vs. Deep Learning vs. Generative AI • The 6-Layer Real-World Enterprise AI Stack • Python API Readiness.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#93c5fd' }}>
              <Clock size={16} /> <strong>Daily Commitment:</strong> 60–90 Mins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#86efac' }}>
              <Trophy size={16} /> <strong>Total Duration:</strong> 60 Days (3 Months)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#fbcfe8' }}>
              <Award size={16} /> <strong>Credential:</strong> Certified Generative &amp; Agentic AI Engineer
            </div>
          </div>
        </div>

        {/* Decorative Background Blob */}
        <div style={{
          position: 'absolute',
          right: -50,
          bottom: -50,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)',
          pointerEvents: 'none',
          filter: 'blur(30px)'
        }}></div>
      </div>

      {/* 🧭 NAVIGATION SUB-TABS */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 10,
        marginBottom: '2rem',
        borderBottom: '2px solid #e2e8f0'
      }}>
        {SUB_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.65rem 1.15rem',
                borderRadius: 12,
                border: 'none',
                background: isActive ? '#0f172a' : '#f1f5f9',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: COURSE ORIENTATION & 60-DAY ROADMAP */}
      {/* ========================================================= */}
      {activeTab === 'orientation' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Calendar size={22} style={{ color: '#ec4899' }} /> Welcome to the 3-Month (60 Days) Master Curriculum
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
              Welcome to the premier professional certification in <strong>Generative AI &amp; Agentic AI</strong> under the Cognitive AI Development track. 
              Over the next 60 days, you will evolve from understanding LLM tokens and vector embeddings into architecting 
              autonomous, self-healing, multi-agent enterprise systems capable of executing complex workflows in production.
            </p>

            {/* 3-Month Journey Timeline Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              
              {/* Month 1 Card */}
              <div style={{ background: '#fdf2f8', border: '2px solid #fbcfe8', borderRadius: 14, padding: '1.5rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#ec4899', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 1 (DAYS 1–20)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#be185d' }}>Current Milestone</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#831843' }}>
                  LLM Foundations, Prompt Engineering &amp; APIs
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#9d174d', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Master core deep learning architectures, Transformer attention mechanisms, prompt engineering frameworks, OpenAI/Anthropic/Gemini Python APIs, token economics, and structured outputs.
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.82rem', color: '#9d174d', lineHeight: 1.6 }}>
                  <li>Week 1: Gen AI &amp; Python API Readiness</li>
                  <li>Week 2: Advanced Prompt Engineering &amp; Reasoning</li>
                  <li>Week 3: Multimodal Generation &amp; Structured Outputs</li>
                  <li>Week 4: Real-World API Automation &amp; Function Calling</li>
                </ul>
              </div>

              {/* Month 2 Card */}
              <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#16a34a', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 2 (DAYS 21–40)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>Next Milestone</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#14532d' }}>
                  Visual AI Agents, RAG, n8n &amp; Flowise
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#166534', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Transition from static text generation into active agents. Build visual autonomous workflows, enterprise RAG pipelines, vector database embeddings, and no-code/low-code agent platforms.
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.82rem', color: '#166534', lineHeight: 1.6 }}>
                  <li>Vector Databases (Pinecone, ChromaDB, Qdrant)</li>
                  <li>n8n Autonomous Enterprise Workflows &amp; Webhooks</li>
                  <li>Flowise Visual Agent Canvas &amp; Document QA</li>
                  <li>Production RAG &amp; Tool Calling Implementations</li>
                </ul>
              </div>

              {/* Month 3 Card */}
              <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#2563eb', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 3 (DAYS 41–60)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d4ed8' }}>Graduation Tier</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>
                  LangChain, LangGraph &amp; Multi-Agent Systems
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#1e40af', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  The peak of agent engineering. Build stateful cyclical agent graphs, supervisor-worker multi-agent teams with CrewAI/Agno, human-in-the-loop controls, and deploy enterprise capstones.
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.6 }}>
                  <li>LangChain Expressions (LCEL) &amp; Memory Stores</li>
                  <li>LangGraph Cycles, State Checkpointing &amp; Time-Travel</li>
                  <li>CrewAI Multi-Agent Collaborative Systems</li>
                  <li>Enterprise Capstone &amp; Production Deployment</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Banner Diagram Embed */}
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              🖼️ Architecture Blueprint: From Foundation Models to Autonomous Production Agents
            </h3>
            <img 
              src={bannerImg} 
              alt="Generative & Agentic AI Blueprint" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} 
            />
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 10 }}>
              Figure 1.1: Evolution from foundation model weights into grounded, tool-equipped autonomous agent systems.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => handleTabChange('comparison')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Continue to ML vs DL vs Gen AI <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: TRADITIONAL ML VS DEEP LEARNING VS GENERATIVE AI */}
      {/* ========================================================= */}
      {activeTab === 'comparison' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Layers size={22} style={{ color: '#2563eb' }} /> Understanding the Paradigm Shift
            </h2>
            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              To engineer world-class AI systems, you must know when to reach for Traditional Machine Learning, when to train a Deep Neural Network, when to invoke a Generative AI model, and when an Agentic loop is required.
            </p>

            {/* Comparison Matrix Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 800, color: '#0f172a' }}>Dimension</th>
                    <th style={{ padding: '12px 16px', fontWeight: 800, color: '#2563eb' }}>Traditional ML</th>
                    <th style={{ padding: '12px 16px', fontWeight: 800, color: '#7c3aed' }}>Deep Learning (DL)</th>
                    <th style={{ padding: '12px 16px', fontWeight: 800, color: '#ec4899' }}>Generative AI (Gen AI)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Core Objective</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Predict values / Classify categories</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Learn abstract feature patterns</td>
                    <td style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Create brand new content (Text, Code, Media)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Input Data Type</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Structured tabular tables, numbers</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Unstructured images, audio, sensor streams</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Natural language prompts &amp; multimodal inputs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Feature Engineering</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}><strong>Manual:</strong> Data scientists engineer columns</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}><strong>Automatic:</strong> Extracted via deep layers</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}><strong>Self-Supervised:</strong> Pre-trained on web-scale corpora</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Typical Output</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Number, boolean, probability score</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Bounding box, segmentation, speech text</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Full articles, Python functions, SQL queries, UI code</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Representative Models</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>XGBoost, Random Forest, Logistic Reg</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>ResNet, EfficientNet, LSTM, BERT</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>GPT-4o, Claude 3.5 Sonnet, Llama 3.3, Gemini</td>
                  </tr>
                  <tr style={{ background: '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#334155' }}>Compute Footprint</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>CPU / Single GPU (Seconds to minutes)</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Multi-GPU clusters (Hours to days)</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>Massive Datacenter Superclusters (Thousands of GPUs)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Visual Deep Dive: 3 Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Cpu size={18} /> 1. Traditional ML
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                  Operates by finding mathematical relationships between handcrafted features ($X$) and targets ($Y$). Fast, explainable, and ideal for tabular fraud scores and numerical forecasts.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#7c3aed', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Brain size={18} /> 2. Deep Learning
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                  Stacks multiple layers of artificial neurons to automatically compress and decode high-dimensional raw inputs (pixels, waveforms, characters) without manual feature engineering.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ec4899', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={18} /> 3. Generative &amp; Agentic AI
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                  Pre-trained on trillions of tokens using the Transformer architecture. When paired with tool-calling and memory loops, it behaves as an autonomous agent reasoning across tools and APIs.
                </p>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('orientation')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Roadmap
            </button>
            <button
              onClick={() => handleTabChange('aistack')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Explore the Real-World AI Stack <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: THE REAL-WORLD PRODUCTION AI STACK (6 LAYERS) */}
      {/* ========================================================= */}
      {activeTab === 'aistack' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Server size={22} style={{ color: '#10b981' }} /> The 6-Layer Real-World Enterprise AI Stack
                </h2>
                <p style={{ color: '#475569', fontSize: '0.94rem', margin: 0 }}>
                  Click each tier in the architectural pyramid to inspect its role, modern technologies, and engineering best practices.
                </p>
              </div>
              <span style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700 }}>
                Enterprise Blueprint 2026
              </span>
            </div>

            {/* Interactive Stack Visualizer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
              
              {/* Stack Layers Clickable Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {AI_STACK_LAYERS.map(item => {
                  const isSelected = activeStackLayer.layer === item.layer;
                  return (
                    <div
                      key={item.layer}
                      onClick={() => setActiveStackLayer(item)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: 12,
                        background: isSelected ? `${item.color}10` : '#f8fafc',
                        border: `2px solid ${isSelected ? item.color : '#e2e8f0'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? `0 4px 12px ${item.color}20` : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ 
                          width: 28, 
                          height: 28, 
                          borderRadius: '50%', 
                          background: item.color, 
                          color: 'white', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 800, 
                          fontSize: '0.8rem' 
                        }}>
                          {item.layer}
                        </span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? item.color : '#0f172a' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {item.badge}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: isSelected ? item.color : '#94a3b8' }} />
                    </div>
                  );
                })}
              </div>

              {/* Selected Layer Detailed Panel */}
              <div style={{ 
                background: '#fafafa', 
                border: `2px solid ${activeStackLayer.color}40`, 
                borderRadius: 14, 
                padding: '1.75rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ background: activeStackLayer.color, color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 12 }}>
                    LAYER {activeStackLayer.layer}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
                    {activeStackLayer.badge}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                  {activeStackLayer.name}
                </h3>
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  {activeStackLayer.description}
                </p>

                <div style={{ background: 'white', borderRadius: 10, padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    🛠️ Standard Technologies &amp; Industry Leaders:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {activeStackLayer.tools.map((tool, idx) => (
                      <span key={idx} style={{ 
                        background: '#f1f5f9', 
                        color: '#1e293b', 
                        padding: '4px 10px', 
                        borderRadius: 8, 
                        fontSize: '0.82rem', 
                        fontWeight: 700, 
                        border: '1px solid #cbd5e1' 
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: `${activeStackLayer.color}15`, borderRadius: 10, padding: '1rem', border: `1px solid ${activeStackLayer.color}30` }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.86rem', display: 'block', marginBottom: 4 }}>
                    💡 Course Alignment Note:
                  </strong>
                  <span style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                    In this certification, you will deeply engineer Layers 2, 3, 4, 5, and 6 — building hands-on projects with Claude 3.5 Sonnet, GPT-4o, Pinecone, LangChain, Flowise, and LangGraph.
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('comparison')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Comparison
            </button>
            <button
              onClick={() => handleTabChange('simulator')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Try the Paradigm Simulator <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: INTERACTIVE PARADIGM SIMULATOR */}
      {/* ========================================================= */}
      {activeTab === 'simulator' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={22} style={{ color: '#ec4899' }} /> Interactive AI Paradigm Simulator
            </h2>
            <p style={{ color: '#475569', fontSize: '0.94rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
              Select a real-world enterprise problem below to observe how each tier — from Traditional ML to Autonomous Agentic AI — solves the challenge differently.
            </p>

            {/* Problem Selection Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {Object.keys(PARADIGM_EXAMPLES).map(key => {
                const isSelected = selectedParadigmProblem === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedParadigmProblem(key)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: 12,
                      border: isSelected ? '2px solid #ec4899' : '1px solid #cbd5e1',
                      background: isSelected ? '#fdf2f8' : '#ffffff',
                      color: isSelected ? '#be185d' : '#334155',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 3px 10px rgba(236,72,153,0.15)' : 'none'
                    }}
                  >
                    🎯 {PARADIGM_EXAMPLES[key].title}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Comparison Cards */}
            {(() => {
              const current = PARADIGM_EXAMPLES[selectedParadigmProblem];
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  
                  {/* ML Approach */}
                  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: '#2563eb', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>1</span>
                      <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.9rem' }}>Traditional ML</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8, fontWeight: 600 }}>{current.ml.type}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Input:</strong> {current.ml.input}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Method:</strong> {current.ml.process}</div>
                    <div style={{ background: '#eff6ff', padding: '8px 10px', borderRadius: 8, fontSize: '0.82rem', color: '#1e40af', fontWeight: 700 }}>
                      📌 Result: {current.ml.output}
                    </div>
                  </div>

                  {/* Deep Learning Approach */}
                  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: '#7c3aed', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>2</span>
                      <span style={{ fontWeight: 800, color: '#7c3aed', fontSize: '0.9rem' }}>Deep Learning</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8, fontWeight: 600 }}>{current.dl.type}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Input:</strong> {current.dl.input}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Method:</strong> {current.dl.process}</div>
                    <div style={{ background: '#f5f3ff', padding: '8px 10px', borderRadius: 8, fontSize: '0.82rem', color: '#5b21b6', fontWeight: 700 }}>
                      📌 Result: {current.dl.output}
                    </div>
                  </div>

                  {/* Generative AI Approach */}
                  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: '#ec4899', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>3</span>
                      <span style={{ fontWeight: 800, color: '#ec4899', fontSize: '0.9rem' }}>Generative AI</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8, fontWeight: 600 }}>{current.genai.type}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Input:</strong> {current.genai.input}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Method:</strong> {current.genai.process}</div>
                    <div style={{ background: '#fdf2f8', padding: '8px 10px', borderRadius: 8, fontSize: '0.82rem', color: '#9d174d', fontWeight: 700 }}>
                      📌 Result: {current.genai.output}
                    </div>
                  </div>

                  {/* Agentic AI Approach */}
                  <div style={{ background: '#faf5ff', border: '2px solid #a855f7', borderRadius: 12, padding: '1.25rem', boxShadow: '0 4px 12px rgba(168,85,247,0.12)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: '#9333ea', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>4</span>
                      <span style={{ fontWeight: 800, color: '#9333ea', fontSize: '0.9rem' }}>Agentic AI (Autonomous)</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#7e22ce', marginBottom: 8, fontWeight: 600 }}>{current.agentic.type}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Input:</strong> {current.agentic.input}</div>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b', marginBottom: 8 }}><strong>Method:</strong> {current.agentic.process}</div>
                    <div style={{ background: '#f3e8ff', padding: '8px 10px', borderRadius: 8, fontSize: '0.82rem', color: '#6b21a8', fontWeight: 700 }}>
                      🚀 Action: {current.agentic.output}
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('aistack')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to AI Stack
            </button>
            <button
              onClick={() => handleTabChange('pythonready')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Check Python API Readiness <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PYTHON API READINESS & QUICKSTART */}
      {/* ========================================================= */}
      {activeTab === 'pythonready' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Terminal size={22} style={{ color: '#10b981' }} /> Week 1: Python Environment &amp; API Readiness
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              To complete the practical projects in this certification, you will prepare your local development environment with Python 3.10+, isolated virtual environments, and industry SDKs.
            </p>

            {/* Step 1: Virtual Env */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ background: '#0f172a', color: 'white', fontWeight: 800, fontSize: '0.8rem', padding: '2px 8px', borderRadius: 6 }}>STEP 1</span>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>Create &amp; Activate an Isolated Virtual Environment</span>
              </div>
              <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
                <span style={{ color: '#94a3b8' }}># 1. Open Terminal or PowerShell</span><br/>
                python -m venv ai_cert_env<br/><br/>
                <span style={{ color: '#94a3b8' }}># 2. Activate Environment (Windows):</span><br/>
                .\ai_cert_env\Scripts\activate<br/><br/>
                <span style={{ color: '#94a3b8' }}># 2. Activate Environment (Mac/Linux):</span><br/>
                source ai_cert_env/bin/activate
              </div>
            </div>

            {/* Step 2: Install Libraries */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ background: '#0f172a', color: 'white', fontWeight: 800, fontSize: '0.8rem', padding: '2px 8px', borderRadius: 6 }}>STEP 2</span>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>Install Core Foundation SDKs</span>
              </div>
              <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
                pip install openai anthropic google-generativeai langchain-core python-dotenv pydantic requests
              </div>
            </div>

            {/* Step 3: Minimal Sample Script */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ background: '#0f172a', color: 'white', fontWeight: 800, fontSize: '0.8rem', padding: '2px 8px', borderRadius: 6 }}>STEP 3</span>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>Standard Multi-Provider API Pattern (day1_test.py)</span>
              </div>
              <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.85rem', overflowX: 'auto', lineHeight: 1.6 }}>
                <span style={{ color: '#64748b' }}># day1_test.py — Verifying Foundation Model API Connectivity</span><br/>
                <span style={{ color: '#ec4899' }}>import</span> os<br/>
                <span style={{ color: '#ec4899' }}>from</span> dotenv <span style={{ color: '#ec4899' }}>import</span> load_dotenv<br/>
                <span style={{ color: '#ec4899' }}>from</span> openai <span style={{ color: '#ec4899' }}>import</span> OpenAI<br/><br/>
                <span style={{ color: '#64748b' }}># Load secure environment variables from .env file</span><br/>
                load_dotenv()<br/>
                client = OpenAI(api_key=os.getenv(<span style={{ color: '#a7f3d0' }}>"OPENAI_API_KEY"</span>))<br/><br/>
                response = client.chat.completions.create(<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;model=<span style={{ color: '#a7f3d0' }}>"gpt-4o"</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;messages=[<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<span style={{ color: '#a7f3d0' }}>"role"</span>: <span style={{ color: '#a7f3d0' }}>"system"</span>, <span style={{ color: '#a7f3d0' }}>"content"</span>: <span style={{ color: '#a7f3d0' }}>"You are an expert AI Architect assisting in a 60-day certification."</span>&#125;,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<span style={{ color: '#a7f3d0' }}>"role"</span>: <span style={{ color: '#a7f3d0' }}>"user"</span>, <span style={{ color: '#a7f3d0' }}>"content"</span>: <span style={{ color: '#a7f3d0' }}>"Explain why agents require tools to operate in production in 2 sentences."</span>&#125;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;],<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;temperature=<span style={{ color: '#fbcfe8' }}>0.3</span><br/>
                )<br/><br/>
                <span style={{ color: '#64748b' }}># Output the generated response &amp; token count</span><br/>
                <span style={{ color: '#38bdf8' }}>print</span>(<span style={{ color: '#a7f3d0' }}>"Generated Output:\n"</span>, response.choices[<span style={{ color: '#fbcfe8' }}>0</span>].message.content)<br/>
                <span style={{ color: '#38bdf8' }}>print</span>(<span style={{ color: '#a7f3d0' }}>"\nTotal Tokens Consumed:"</span>, response.usage.total_tokens)
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('simulator')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Simulator
            </button>
            <button
              onClick={() => handleTabChange('quiz')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Take Day 1 Knowledge Quiz <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: KNOWLEDGE ASSESSMENT (QUIZ) */}
      {/* ========================================================= */}
      {activeTab === 'quiz' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <HelpCircle size={22} style={{ color: '#6366f1' }} /> Day 1 Knowledge Check Assessment
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                  Answer the 5 conceptual questions below to validate your mastery of Day 1 topics.
                </p>
              </div>
              {quizSubmitted && (
                <div style={{ 
                  background: calculateScore() >= 4 ? '#dcfce7' : '#fee2e2', 
                  color: calculateScore() >= 4 ? '#166534' : '#991b1b', 
                  padding: '6px 14px', 
                  borderRadius: 20, 
                  fontWeight: 800, 
                  fontSize: '0.9rem' 
                }}>
                  Score: {calculateScore()} / {QUIZ_QUESTIONS.length} ({Math.round((calculateScore() / QUIZ_QUESTIONS.length) * 100)}%)
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {QUIZ_QUESTIONS.map((question, qIdx) => {
                const selected = quizAnswers[qIdx];
                return (
                  <div key={qIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: 10, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#6366f1' }}>Q{qIdx + 1}.</span> {question.q}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {question.opts.map((opt, optIdx) => {
                        let optStyle = {
                          padding: '10px 14px',
                          borderRadius: 8,
                          fontSize: '0.88rem',
                          border: '1px solid #cbd5e1',
                          background: 'white',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s'
                        };

                        if (selected === optIdx) {
                          optStyle.borderColor = '#6366f1';
                          optStyle.background = '#eef2ff';
                          optStyle.fontWeight = 700;
                        }

                        if (quizSubmitted) {
                          if (optIdx === question.ans) {
                            optStyle.borderColor = '#16a34a';
                            optStyle.background = '#dcfce7';
                            optStyle.color = '#14532d';
                            optStyle.fontWeight = 700;
                          } else if (selected === optIdx) {
                            optStyle.borderColor = '#dc2626';
                            optStyle.background = '#fee2e2';
                            optStyle.color = '#991b1b';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            style={optStyle}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div style={{ marginTop: 10, background: '#f1f5f9', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', color: '#334155' }}>
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  onClick={() => setQuizSubmitted(true)}
                  style={{
                    background: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? '#2563eb' : '#94a3b8',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 10,
                    border: 'none',
                    fontWeight: 800,
                    cursor: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? 'pointer' : 'not-allowed'
                  }}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  style={{ background: '#f1f5f9', color: '#334155', padding: '0.65rem 1.25rem', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Retake Quiz
                </button>
              )}
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('pythonready')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Python Readiness
            </button>
            <button
              onClick={() => handleTabChange('assignment')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Go to Day 1 Practical Assignment <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: DAY 1 PRACTICAL ASSIGNMENT & TASKS */}
      {/* ========================================================= */}
      {activeTab === 'assignment' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
          
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Award size={22} style={{ color: '#16a34a' }} /> Day 1 Practical Assignment &amp; Staff Evaluation
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
                  Complete the hands-on practical questions below, formulate your learning reflection, and submit for staff review.
                </p>
              </div>
              <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: '0.82rem' }}>
                4 Practical Tasks
              </span>
            </div>

            {/* Practical Task Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>1</span>
                  Task 1: AI Stack Architecture Mapping
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Choose any real-world AI product you use regularly (e.g., ChatGPT, GitHub Copilot, Midjourney, Perplexity, Cursor IDE). Map out which technologies power each of its 6 layers (Hardware, Foundation Model, Orchestration, Vector Storage, Observability, and UI).
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>2</span>
                  Task 2: Traditional ML vs. Gen AI Tradeoff Analysis
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Suppose a fintech company wants to detect fraudulent credit card transactions in under 50 milliseconds. Explain why Traditional ML (e.g., LightGBM / XGBoost) is vastly superior for this task compared to invoking a large Generative AI LLM like GPT-4o. Contrast latency, compute cost, determinism, and explainability.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>3</span>
                  Task 3: Local Python AI Environment Setup
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Initialize a virtual environment named <code>ai_cert_env</code> on your local machine. Install <code>openai</code>, <code>anthropic</code>, and <code>python-dotenv</code>. Create a <code>.env.example</code> template illustrating how API keys must be kept secure outside Git repositories.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>4</span>
                  Task 4: Comprehensive Learning Reflection
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Write a comprehensive self-reflection (at least 100 characters) detailing your key takeaways from Day 1, your personal 60-day learning objective, and how you will apply the 6-layer AI stack in your career or startup projects.
                </p>
              </div>

            </div>

            {/* Call to Action Banner to Submit on Assignment Page */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
              border: '2px solid #86efac', 
              borderRadius: 14, 
              padding: '1.75rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '1rem' 
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.35rem 0', color: '#14532d', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={20} color="#16a34a" /> Ready to Submit Your Day 1 Reflection?
                </h3>
                <p style={{ margin: 0, color: '#166534', fontSize: '0.9rem', maxWidth: 650, lineHeight: 1.5 }}>
                  Submitting your reflection unlocks the Day 1 milestone and queues your submission in the Instructor Evaluation Panel for review.
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('genai_agentic_m1', 'assignment')}
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                Open Day 1 Submission Form <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </motion.div>
      )}

    </div>
  );
}
