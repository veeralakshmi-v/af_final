import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';
import chainDiagImg from '../../assets/langchain_chain_diagram.png';

const pageVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } };
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
  { num: '01', title: 'Install LangChain Packages', icon: '📦', tag: 'Terminal',
    body: 'Install the core LangChain libraries and OpenAI integration SDK. Ensure you have Node.js or Python installed beforehand.',
    code: { 
      Terminal: 'pip install langchain langchain-openai dotenv\n# For Node.js:\nnpm install @langchain/core @langchain/openai dotenv', 
      JSON: '{\n  "dependencies": {\n    "@langchain/core": "^0.3.0",\n    "@langchain/openai": "^0.3.0"\n  }\n}', 
      Python: '# Verify packages are installed in Python\nimport langchain\nimport langchain_openai\nprint("LangChain version:", langchain.__version__)',
      JavaScript: '// Verify packages are installed in Node.js\nimport { ChatOpenAI } from "@langchain/openai";\nimport { ChatPromptTemplate } from "@langchain/core/prompts";\nconsole.log("LangChain packages imported successfully!");'
    } 
  },
  { num: '02', title: 'Initialize the LLM Client', icon: '🧠', tag: 'Model Configuration',
    body: 'Create your ChatOpenAI or ChatAnthropic client instances and configure system parameters like temperature and max tokens.',
    code: { 
      Terminal: '# Set your API key in .env file\nexport OPENAI_API_KEY="sk-..."', 
      JSON: '{\n  "modelName": "gpt-4o-mini",\n  "temperature": 0.5,\n  "maxTokens": 250\n}', 
      Python: 'from langchain_openai import ChatOpenAI\nimport os\n\n# Automatically picks up OPENAI_API_KEY env variable\nmodel = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)',
      JavaScript: 'import { ChatOpenAI } from "@langchain/openai";\nimport "dotenv/config";\n\n// Automatically picks up OPENAI_API_KEY from process.env\nconst model = new ChatOpenAI({\n  modelName: "gpt-4o-mini",\n  temperature: 0.5\n});'
    } 
  },
  { num: '03', title: 'Create Prompt Templates', icon: '📝', tag: 'Prompt Design',
    body: 'Define a clean ChatPromptTemplate using placeholder variables to generate dynamic prompt strings for query operations.',
    code: { 
      Terminal: '# No CLI installation required for templates', 
      JSON: '{\n  "template": "Translate the following text to {language}: {text}"\n}', 
      Python: 'from langchain_core.prompts import ChatPromptTemplate\n\nprompt_template = ChatPromptTemplate.from_messages([\n    ("system", "You are a professional translator."),\n    ("user", "Translate this text to {language}: {text}")\n])',
      JavaScript: 'import { ChatPromptTemplate } from "@langchain/core/prompts";\n\nconst promptTemplate = ChatPromptTemplate.fromMessages([\n  ["system", "You are a professional translator."],\n  ["user", "Translate this text to {language}: {text}"]\n]);'
    } 
  },
  { num: '04', title: 'Build a Simple Chain', icon: '🔗', tag: 'Chaining Pipeline',
    body: 'Combine your PromptTemplate and LLM client into a single executable object using standard operators or method calls.',
    code: { 
      Terminal: '# Runs within application runtime', 
      JSON: '{\n  "pipeline": "prompt | model | parser"\n}', 
      Python: 'from langchain_core.output_parsers import StrOutputParser\n\n# Create the chain using LCEL pipe operator\nchain = prompt_template | model | StrOutputParser()',
      JavaScript: 'import { StringOutputParser } from "@langchain/core/output_parsers";\n\n// In JS, chain using the .pipe() helper function\nconst chain = promptTemplate.pipe(model).pipe(new StringOutputParser());'
    } 
  },
  { num: '05', title: 'Execute and Check Output', icon: '🚀', tag: 'Execution',
    body: 'Run the chain using invoke() with variable dictionary arguments, and print the output result.',
    code: { 
      Terminal: 'python run_chain.py\n# Or Node.js:\nnode run_chain.js', 
      JSON: '{\n  "input": { "language": "French", "text": "Hello world!" },\n  "output": "Bonjour le monde!"\n}', 
      Python: '# Invoke the chain synchronously or asynchronously\nresponse = chain.invoke({\n    "language": "French",\n    "text": "Hello world! We are building AI Agents."\n})\nprint(response) # Output: Bonjour le monde! Nous construisons des agents IA.',
      JavaScript: '// Invoke the chain asynchronously\nconst response = await chain.invoke({\n  language: "French",\n  text: "Hello world! We are building AI Agents."\n});\nconsole.log(response); // Output: Bonjour le monde!'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is LangChain?', opts: ['A database migration package.', 'An open-source orchestration framework designed to easily build applications with large language models (LLMs).', 'A front-end UI framework.'], ans: 1 },
  { q: 'What is a "Chain" in LangChain?', opts: ['A secure hash encryption method.', 'A sequence of actions or components (like Prompt -> LLM -> Output Parser) that process data sequentially.', 'A local database schema.'], ans: 1 },
  { q: 'What does the LCEL pipe operator (|) do?', opts: ['It joins database tables.', 'It chains components together so the output of one flows as input to the next.', 'It runs calculations in bash.'], ans: 1 },
  { q: 'Why do we use Prompt Templates instead of basic string concatenation?', opts: ['To enforce strict variable types and allow clean, reusable prompt outlines.', 'To decrease API token costs.', 'To change model settings dynamically.'], ans: 0 },
  { q: 'What does the StrOutputParser() class do in a chain?', opts: ['It translates text into French.', 'It parses the complex model response object and returns only the clean string message.', 'It checks the system API key validity.'], ans: 1 }
];

export default function AgenticAIDay21({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Terminal');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [sandboxChainType, setSandboxChainType] = useState('translator');
  const [inputText, setInputText] = useState("AI is changing the world.");
  const [targetLang, setTargetLang] = useState("Spanish");
  
  // SQL Generator Sandbox States
  const [sqlSchema, setSqlSchema] = useState("users(id, name, age, email), orders(id, user_id, amount)");
  const [sqlQuery, setSqlQuery] = useState("Find all users older than 21 who spent more than $100");

  // Email Writer Sandbox States
  const [emailProduct, setEmailProduct] = useState("SuperSaaS Scheduler");
  const [emailBenefits, setEmailBenefits] = useState("AI calendar sync, auto-timezone detection, 1-click scheduling");
  const [emailTone, setEmailTone] = useState("Professional");

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
    setSimLogs([]);
    setSimOutput('');
    
    let logs = [];
    if (sandboxChainType === 'translator') {
      logs = [
        "🧩 Prompt Template: Constructing 'Translate this text to {language}: {text}'",
        "⚙️ Injecting variables {text: '" + inputText + "', language: '" + targetLang + "'}",
        "🧠 Invoking ChatOpenAI model (gpt-4o-mini)...",
        "📤 StrOutputParser: Extracting clean response string from payload...",
        "🟢 Chain completed successfully!"
      ];
    } else if (sandboxChainType === 'sql') {
      logs = [
        "🧩 Prompt Template: Constructing 'Given SQL schema: {schema}, write a SQL query for: {query}'",
        "⚙️ Injecting variables {schema: '" + sqlSchema + "', query: '" + sqlQuery + "'}",
        "🧠 Invoking ChatOpenAI model (gpt-4o-mini)...",
        "📤 StrOutputParser: Extracting raw SQL query...",
        "🟢 Chain completed successfully!"
      ];
    } else {
      logs = [
        "🧩 Prompt Template: Constructing 'Write a promotional email for {product} highlighting {benefits} in a {tone} tone.'",
        "⚙️ Injecting variables {product: '" + emailProduct + "', benefits: '" + emailBenefits + "', tone: '" + emailTone + "'}",
        "🧠 Invoking ChatOpenAI model (gpt-4o-mini)...",
        "📤 StrOutputParser: Extracting formatted HTML/Markdown email content...",
        "🟢 Chain completed successfully!"
      ];
    }

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            if (sandboxChainType === 'translator') {
              const translations = {
                Spanish: "La IA está cambiando el mundo.",
                French: "L'IA change le monde.",
                German: "KI verändert die Welt.",
                Tamil: "செயற்கை நுண்ணறிவு உலகை மாற்றுகிறது."
              };
              setSimOutput(translations[targetLang] || "Translation completed.");
            } else if (sandboxChainType === 'sql') {
              setSimOutput(
                "SELECT u.name, SUM(o.amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.age > 21\nGROUP BY u.id, u.name\nHAVING SUM(o.amount) > 100;"
              );
            } else {
              setSimOutput(
                `Subject: Meet ${emailProduct} - Your Scheduling Superpower!\n\nHi there,\n\nAre you tired of endless back-and-forth emails just to book a simple meeting?\n\nSay hello to ${emailProduct}. With key advantages like:\n- ${emailBenefits}\n\nIt is designed to make calendar organization effortless. Try it today and save hours every week!\n\nBest regards,\nThe Team`
              );
            }
            setIsRunning(false);
          }, 400);
        }
      }, delay);
      delay += 600;
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
                <Sparkles size={14} color="#fef08a" /> MODULE 5 • DAY 21
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Introduction to LangChain & Chains</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to programmatically orchestrate LLM workflows. Get introduced to LangChain, explore Prompt Templates, LLMs, Output Parsers, and chain them together sequentially using LangChain Expression Language (LCEL).
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Why LangChain?</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  While calling an LLM API directly works for single Q&A prompts, complex AI systems require stringing together multiple prompts, integrating search databases, keeping session records, and handling autonomous decisions.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                  LangChain standardizes these building blocks in Python and JavaScript. It provides predefined modules for prompts, memories, models, and tools so you can assemble production-grade agents in hours.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Direct API SDK vs. LangChain Orchestration</h3>
                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: '#475569', border: '1px solid #e2e8f0' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>Feature</th>
                        <th style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>Direct API SDK Calls</th>
                        <th style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'left' }}>LangChain Orchestration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>Prompts</td>
                        <td style={{ padding: '0.75rem', borderRight: '1px solid #e2e8f0' }}>Manual string concatenation, prone to formatting bugs.</td>
                        <td style={{ padding: '0.75rem' }}>Type-safe reusable templates (`PromptTemplate`).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>Output Parsing</td>
                        <td style={{ padding: '0.75rem', borderRight: '1px solid #e2e8f0' }}>Manual `JSON.parse` with regex fallback logic.</td>
                        <td style={{ padding: '0.75rem' }}>Predefined schemas and parsing classes (`JsonOutputParser`).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>Memory Handling</td>
                        <td style={{ padding: '0.75rem', borderRight: '1px solid #e2e8f0' }}>State managed manually in client app databases.</td>
                        <td style={{ padding: '0.75rem' }}>Automatic memory hooks (`ConversationBufferMemory`).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>Resilience</td>
                        <td style={{ padding: '0.75rem', borderRight: '1px solid #e2e8f0' }}>Manual write-up of retry loops and API error handlers.</td>
                        <td style={{ padding: '0.75rem' }}>Automatic fallbacks and retries natively via LCEL.</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>Model Swapping</td>
                        <td style={{ padding: '0.75rem', borderRight: '1px solid #e2e8f0' }}>Requires rewriting payload formats for different providers.</td>
                        <td style={{ padding: '0.75rem' }}>Unified wrapper interfaces; switch providers by changing imports.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 850, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} /> Core Chaining Blocks:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                    {[['📝 PromptTemplate', 'Converts user variables into completed prompt texts.'], ['🧠 ChatModel', 'The central brain client sending raw API calls.'], ['📄 OutputParser', 'Extracts clean strings or JSON objects from the LLM.'], ['🔗 LCEL Pipeline', 'Pipes blocks sequentially using the OR operator (|).']].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 800, marginBottom: '1rem' }}>
                    🚀 Framework Capabilities
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    LangChain operates under a provider-agnostic protocol. This means prompt templates designed on Day 21 will execute flawlessly whether routed to OpenAI, Claude (Anthropic), Gemini (Google), or local models (via Ollama).
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem', textAlign: 'center' }}>🏗️ The 6 Core Pillars of LangChain</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: '1. Model I/O', desc: 'Manage Prompt Templates, bind model parameters, and construct schemas to handle LLM communication interfaces.' },
                  { title: '2. Retrieval (RAG)', desc: 'Integrate external data: load source files, split documents, calculate text embeddings, and index vector stores.' },
                  { title: '3. Chains (LCEL)', desc: 'Compile components into executable pipelines with automated stream, async, batch support using the pipe operator (|).' },
                  { title: '4. Memory State', desc: 'Preserve state across session execution turns, automatically appending user prompts and bot answers.' },
                  { title: '5. Autonomous Agents', desc: 'Provide tools to the LLM. The agent loops dynamically: parses intent, executes tool, observes, and responds.' },
                  { title: '6. Callbacks / Trace', desc: 'Hook into intermediate states. Audit prompt construction, calculate token latency, and debug chains via LangSmith.' }
                ].map((p, idx) => (
                  <div key={idx} style={{ padding: '1.2rem', borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0284c7', marginBottom: '0.4rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Chain Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ LangChain Pipeline Diagram</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How user queries flow through the Prompt, Model, and Output Parser sequentially:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center' }}>
                <img src={chainDiagImg} alt="LangChain Chain Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: 10 }} />
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Practical implementation <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* PRACTICAL GUIDE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step Chain Implementation</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Learn how to code a Prompt-LLM-Parser pipeline using Python and LangChain:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'stretch', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button onClick={() => setActiveStep(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', background: activeStep === i ? '#0284c7' : 'white', border: activeStep === i ? '1px solid #0284c7' : '1px solid #e2e8f0', color: activeStep === i ? 'white' : '#1e293b', padding: '0.9rem 1rem', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifycontent: 'center', width: 36, height: 36, borderRadius: 10, background: activeStep === i ? 'rgba(255,255,255,.2)' : '#f1f5f9', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
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

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 450 }}>
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
                  {['Terminal','JSON','Python','JavaScript'].map(t => (
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
                  <pre style={{ margin: 0, fontSize: '.82rem', fontFamily: 'monospace', lineHeight: 1.8, color: codeTab === 'Terminal' ? '#4ade80' : codeTab === 'JSON' ? '#fbbf24' : '#60a5fa', whiteSpace: 'pre-wrap' }}>{STEPS[activeStep].code[codeTab]}</pre>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Chain Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 LangChain Express Sandbox</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Configure Prompt Chaining parameters and simulate the LCEL pipeline executing live:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🔧 Input Configuration</h3>
                
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 6, fontWeight: 700 }}>Select LCEL Chain Type:</label>
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                    {[
                      { id: 'translator', label: 'Translator' },
                      { id: 'sql', label: 'SQL Gen' },
                      { id: 'email', label: 'Email Writer' }
                    ].map(type => (
                      <button key={type.id} onClick={() => { setSandboxChainType(type.id); setSimOutput(''); setSimLogs([]); }} disabled={isRunning}
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', fontWeight: 700, borderRadius: 8, cursor: 'pointer', border: sandboxChainType === type.id ? 'none' : '1px solid #cbd5e1', background: sandboxChainType === type.id ? '#0284c7' : 'white', color: sandboxChainType === type.id ? 'white' : '#475569', transition: 'all 0.15s' }}>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {sandboxChainType === 'translator' && (
                  <>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Text to Translate:</label>
                      <textarea value={inputText} onChange={e => setInputText(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 70, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Target Language:</label>
                      <select value={targetLang} onChange={e => setTargetLang(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                        <option value="Spanish">Spanish 🇪🇸</option>
                        <option value="French">French 🇫🇷</option>
                        <option value="German">German 🇩🇪</option>
                        <option value="Tamil">Tamil 🇮🇳</option>
                      </select>
                    </div>
                  </>
                )}

                {sandboxChainType === 'sql' && (
                  <>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Database Schema Mock:</label>
                      <textarea value={sqlSchema} onChange={e => setSqlSchema(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 60, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.82rem', fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Natural Language Goal:</label>
                      <textarea value={sqlQuery} onChange={e => setSqlQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 60, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                    </div>
                  </>
                )}

                {sandboxChainType === 'email' && (
                  <>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Product/Service Name:</label>
                      <input type="text" value={emailProduct} onChange={e => setEmailProduct(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', boxSizing: 'border-box' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Key Benefits (comma-separated):</label>
                      <textarea value={emailBenefits} onChange={e => setEmailBenefits(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 50, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Tone:</label>
                      <select value={emailTone} onChange={e => setEmailTone(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                        <option value="Professional">Professional 👔</option>
                        <option value="Friendly">Friendly 😊</option>
                        <option value="Urgent">Urgent 🚨</option>
                      </select>
                    </div>
                  </>
                )}

                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 'auto' }}>
                  {isRunning ? 'Running Pipeline...' : 'Run Chain (LCEL)'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', maxHeight: 150, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 LCEL Pipe Execution Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Ready to run chain...</span> : simLogs.map((l, i) => <div key={i} style={{ fontSize: '.75rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 3 }}>{l}</div>)}
                </div>
                {simOutput && (
                  <div style={{ background: 'rgba(2,132,199,0.08)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: 12, padding: '1rem', flex: 1 }}>
                    <span style={{ fontSize: '.65rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📄 Chain Output Response</span>
                    <pre style={{ margin: 0, fontSize: '.86rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
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

        {/* CHEAT SHEET */}
        {activeTab === 'cheatsheet' && (
          <motion.div key="cheatsheet" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 LangChain & LCEL Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference for core imports and expression syntax in Python and JavaScript:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Python Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# Imports
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

# Model Initialization
model = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3
)

# Chaining (LCEL Pipe)
chain = prompt | model | StrOutputParser()

# Invoke Pipeline
res = chain.invoke({"input": "Hello"})`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🟨 JavaScript / TypeScript Reference</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`// Imports
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Model Initialization
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.3
});

// Chaining (pipe helper)
const chain = prompt.pipe(model).pipe(new StringOutputParser());

// Invoke Pipeline (Async)
const res = await chain.invoke({ input: "Hello" });`}
                  </pre>
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>💡 Advanced LCEL Runnable Protocols</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  LangChain components implement the <strong>Runnable Interface</strong>. This standardizes runtime execution across all chains:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  <div style={{ padding: '0.8rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                    <strong>.invoke(input)</strong><br />
                    <span style={{ color: '#64748b' }}>Executes the chain on a single input synchronously/asynchronously.</span>
                  </div>
                  <div style={{ padding: '0.8rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                    <strong>.stream(input)</strong><br />
                    <span style={{ color: '#64748b' }}>Streams response chunks back dynamically as they generate.</span>
                  </div>
                  <div style={{ padding: '0.8rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                    <strong>.batch(inputs)</strong><br />
                    <span style={{ color: '#64748b' }}>Executes the chain in parallel on a list of inputs.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 21 Assignment: Customer Support Pipeline</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script using LangChain that chains PromptTemplate, ChatOpenAI, and StrOutputParser together. The prompt must take two variables: `customer_name` and `issue_description`, and output a professional helpdesk reply.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from langchain_core.prompts import ChatPromptTemplate&#10;from langchain_openai import ChatOpenAI&#10;from langchain_core.output_parsers import StrOutputParser&#10;&#10;prompt = ChatPromptTemplate.from_template('Hello {customer_name}, we are sorry to hear: {issue_description}')&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                {assignmentSubmitted ? '✅ Submitted!' : 'Submit Code'}
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
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 21 Quiz Assessment</h2>
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
                  <span style={{ color: '#0284c7' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score!' : 'Review the highlighted correct answers.'}</span>
                </div>
              )}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('assignment')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Return to Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
