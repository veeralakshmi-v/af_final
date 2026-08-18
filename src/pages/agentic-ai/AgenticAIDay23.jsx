import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';

const pageVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'memory', label: 'Memory Mechanics', icon: <Brain size={15}/> },
  { id: 'practical', label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Sandbox', icon: <Play size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Import Memory Classes', icon: '📦', tag: 'Imports',
    body: 'Import memory classes like ConversationBufferMemory or ConversationBufferWindowMemory to retain conversation context.',
    code: { 
      Terminal: '# Install LangChain packages', 
      JSON: '{\n  "memoryClasses": ["ConversationBufferMemory", "ConversationBufferWindowMemory"]\n}', 
      Python: 'from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory\nfrom langchain.chains import LLMChain',
      JavaScript: 'import { BufferMemory, BufferWindowMemory } from "langchain/memory";\nimport { ConversationChain } from "langchain/chains";'
    } 
  },
  { num: '02', title: 'Configure Memory Hooks', icon: '💾', tag: 'Configuration',
    body: 'Initialize memory. Set `k=3` for window memory, which keeps only the last 3 turns to prevent token limit overflows.',
    code: { 
      Terminal: '# Configure memory size parameters', 
      JSON: '{\n  "memoryKey": "chat_history",\n  "k": 3\n}', 
      Python: '# Keep only the last 3 conversation turns\nmemory = ConversationBufferWindowMemory(\n    memory_key="chat_history",\n    k=3,\n    return_messages=True\n)',
      JavaScript: '// Keep only the last 3 conversation turns in JS\nconst memory = new BufferWindowMemory({\n  memoryKey: "chat_history",\n  k: 3,\n  returnMessages: true\n});'
    } 
  },
  { num: '03', title: 'Wire LLMChain with Memory', icon: '🔗', tag: 'Chaining Integration',
    body: 'Inject the memory instance directly inside your prompt templates and chains. The chain will automatically read and write history.',
    code: { 
      Terminal: '# Combine elements inside your chain', 
      JSON: '{\n  "chainType": "LLMChain",\n  "historyPlaceholder": "chat_history"\n}', 
      Python: 'from langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder\n\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "You are a helpful assistant."),\n    MessagesPlaceholder(variable_name="chat_history"),\n    ("user", "{input}")\n])\n\n# Combine components\nmodel = ChatOpenAI()\nchain = LLMChain(llm=model, prompt=prompt, memory=memory)',
      JavaScript: 'import { ChatOpenAI } from "@langchain/openai";\nimport { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";\nimport { ConversationChain } from "langchain/chains";\n\nconst prompt = ChatPromptTemplate.fromMessages([\n  ["system", "You are a helpful assistant."],\n  new MessagesPlaceholder("chat_history"),\n  ["human", "{input}"]\n]);\n\nconst model = new ChatOpenAI();\nconst chain = new ConversationChain({ llm: model, prompt, memory });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'Why is conversational memory needed?', opts: ['To speed up computation.', 'Because LLM APIs are stateless by default and do not remember past messages unless they are sent in each request.', 'To encrypt credentials.'], ans: 1 },
  { q: 'What does ConversationBufferWindowMemory(k=3) do?', opts: ['It keeps only the last 3 tokens in memory.', 'It keeps only the last 3 message turns, dropping older ones to optimize context size.', 'It divides the prompt into 3 parts.'], ans: 1 },
  { q: 'What is the role of MessagesPlaceholder?', opts: ['To style chat messages.', 'To reserve a slot in the prompt template where the list of historical chat messages will be inserted.', 'To clear memory history.'], ans: 1 }
];

export default function AgenticAIDay23({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [userMsg, setUserMsg] = useState("Hi, my name is Alex.");
  const [kValue, setKValue] = useState(2);
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', text: "Chat history memory initiated (k=2 window limit)..." }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Assignment / Quiz States
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const changeTab = (tabId) => { setActiveTab(tabId); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[+qi]?.ans === ans).length : 0;

  const handleSendMessage = () => {
    if (!userMsg.trim()) return;
    setIsRunning(true);
    
    // Add user message to chat history
    const updatedHistory = [...chatHistory, { role: 'user', text: userMsg }];
    setChatHistory(updatedHistory);
    setUserMsg('');

    setTimeout(() => {
      let botReply = '';
      if (userMsg.toLowerCase().includes('name is')) {
        const name = userMsg.split(' ').pop();
        botReply = "Nice to meet you, " + name + "! How can I help you today?";
      } else if (userMsg.toLowerCase().includes('my name')) {
        const nameObj = updatedHistory.find(h => h.role === 'user' && h.text.toLowerCase().includes('name is'));
        const name = nameObj ? nameObj.text.split(' ').pop() : 'there';
        botReply = "Your name is " + name + ". I remember from our chat history!";
      } else {
        botReply = "I have recorded that. What's next on your mind?";
      }

      // Maintain dynamic k window limit (k turns = k * 2 messages)
      let slicedHistory = [...updatedHistory, { role: 'bot', text: botReply }];
      const maxMessages = kValue * 2;
      if (slicedHistory.length > maxMessages + 1) {
        slicedHistory = [
          slicedHistory[0], // Keep system message
          ...slicedHistory.slice(slicedHistory.length - maxMessages) // Keep last 2*k messages
        ];
      }

      setChatHistory(slicedHistory);
      setIsRunning(false);
    }, 900);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 5 • DAY 23
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>LangChain Memory & Chat History</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to construct stateful AI agents. Explore Conversation Buffer Memory, windowing mechanisms, and how to maintain persistent user conversation threads across HTTP requests.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Memory Windows & Tokens</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  LLMs do not have native memory. Each question is a separate prompt. To create a continuous chat experience, we must append historical messages to the prompt.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  However, appending all messages will eventually exceed the model's context token limit. LangChain Memory classes solve this by sliding a window (k=3) or summarizing past messages dynamically.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>🔄 The Memory Lifecycle</h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  When a user sends a message, LangChain performs three steps under the hood:
                </p>
                <ol style={{ fontSize: '0.88rem', color: '#475569', paddingLeft: 20, margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                  <li><strong>Read:</strong> The chain reads past message records from the memory store (e.g., in-memory array or Redis database).</li>
                  <li><strong>Inject:</strong> The history is formatted and injected into the prompt template placeholder variable (e.g. `chat_history`).</li>
                  <li><strong>Write:</strong> The model generates a response, and LangChain automatically appends both the user prompt and bot reply back to the memory store.</li>
                </ol>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} /> Memory Strategies:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {[['💾 Buffer Memory', 'Saves the entire message history string in context.'], ['✂️ Window Memory', 'Saves only the last k messages (e.g. k=5 turns).'], ['📝 Summary Memory', 'Asks the LLM to summarize older turns into a short context paragraph.'], ['🌐 Vector Store Memory', 'Retrieves historical turns based on semantic similarity.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('memory')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Memory Mechanics <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* MEMORY MECHANICS */}
        {activeTab === 'memory' && (
          <motion.div key="memory" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Memory Window Context Map</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How ConversationBufferWindowMemory manages context limit buffers:</p>
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 16, padding: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#6b21a8', fontWeight: 700 }}>
                  <span>⏳ Conversation Timeline</span>
                  <span>(k=2 turns window limit)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem' }}>
                  <div style={{ color: '#94a3b8', textDecoration: 'line-through' }}>Turn 1: User: "My favorite color is Blue" | Bot: "Nice choice!" (Dropped out of window)</div>
                  <div style={{ color: '#475569' }}>Turn 2: User: "I live in New York" | Bot: "I love Central Park!" (In active buffer)</div>
                  <div style={{ color: '#475569' }}>Turn 3: User: "What is my name?" | Bot: "You didn't mention it yet!" (In active buffer)</div>
                </div>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step Memory Wiring</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Learn how to code Conversation Buffer Window Memory in LangChain:</p>
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
              <button className="btn btn-outline" onClick={() => changeTab('memory')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Conversational Memory Playground</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Chat with the model and watch the window memory trim older elements dynamically:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Memory Configuration</h3>
                
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 6, fontWeight: 700 }}>Window size (k turns): {kValue}</label>
                  <input type="range" min="1" max="4" value={kValue} onChange={e => {
                    const val = +e.target.value;
                    setKValue(val);
                    setChatHistory(p => [
                      { role: 'system', text: `Memory limits dynamically adjusted to k=${val} (${val * 2} messages)...` },
                      ...p.filter(h => h.role !== 'system')
                    ]);
                  }} disabled={isRunning} style={{ width: '100%', accentColor: '#0284c7' }}/>
                  <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
                    <span>k=1 (1 turn)</span>
                    <span>k=2 (2 turns)</span>
                    <span>k=3 (3 turns)</span>
                    <span>k=4 (4 turns)</span>
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Send Chat Message:</label>
                  <textarea value={userMsg} onChange={e => setUserMsg(e.target.value)} disabled={isRunning} placeholder="Type: 'My name is Alex' or 'What is my name?'" style={{ width: '100%', height: 75, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleSendMessage} disabled={isRunning || !userMsg.trim()} style={{ flex: 2, background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
                    {isRunning ? 'Thinking...' : 'Send Message'}
                  </button>
                  <button onClick={() => setChatHistory([{ role: 'system', text: `Memory reset with active window limit k=${kValue}...` }])} disabled={isRunning} style={{ flex: 1, background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '.75rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
                    Clear History
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 340 }}>
                <div style={{ flex: 1, overflowY: 'auto', background: '#1e293b', padding: '1.2rem', borderRadius: 12, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.4rem' }}>
                    💾 Active Chat History (k={kValue} window limit)
                  </span>

                  {chatHistory.map((m, i) => {
                    if (m.role === 'system') {
                      return <div key={i} style={{ fontSize: '.75rem', color: '#94a3b8', fontFamily: 'monospace', fontStyle: 'italic' }}>⚙️ {m.text}</div>;
                    }

                    // Calculate if this message is inside the active window.
                    // The last maxMessages (kValue * 2) messages excluding the system log are active.
                    const chatEntries = chatHistory.filter(h => h.role !== 'system');
                    const entryIdx = chatEntries.indexOf(m);
                    const isActive = entryIdx >= (chatEntries.length - kValue * 2);

                    return (
                      <div key={i} style={{ 
                        fontSize: '.84rem', 
                        padding: '0.6rem 0.8rem', 
                        borderRadius: 10,
                        border: isActive ? '1px solid rgba(2,132,199,0.3)' : '1px dashed #334155',
                        background: isActive ? (m.role === 'user' ? 'rgba(255,255,255,0.04)' : 'rgba(2,132,199,0.1)') : 'transparent',
                        opacity: isActive ? 1 : 0.45,
                        textDecoration: isActive ? 'none' : 'line-through',
                        color: m.role === 'user' ? '#e2e8f0' : '#38bdf8', 
                        transition: 'all 0.25s' 
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginBottom: 2 }}>
                          <strong>{m.role === 'user' ? '👤 User' : '🤖 LangChain Bot'}</strong>
                          <span style={{ color: isActive ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{isActive ? 'Active Buffer' : 'Pruned (Dropped)'}</span>
                        </div>
                        <div>{m.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 23 Assignment: Sliding Memory Configuration</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script that integrates ConversationBufferWindowMemory (k=2) with ChatOpenAI inside an LLMChain. Demonstrate how the system drops older conversation logs by outputting prediction results.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from langchain.memory import ConversationBufferWindowMemory&#10;from langchain.chains import LLMChain&#10;...&#10;memory = ConversationBufferWindowMemory(k=2)&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                {assignmentSubmitted ? '✅ Submitted!' : 'Submit Code'}
              </button>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Take Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 23 Quiz Assessment</h2>
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
