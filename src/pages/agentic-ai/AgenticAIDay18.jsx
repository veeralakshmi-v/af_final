import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Play, Settings, Code, Clipboard, GitBranch } from 'lucide-react';
import flowiseToolImg from '../../assets/flowise_tool_agent_diagram.png';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.15 } } };
const SUB_TABS = [{ id: 'intro', label: '📋 Lesson Overview' }, { id: 'tools', label: '🔧 Tool Nodes' }, { id: 'practical', label: '🛠️ Practical Guide' }, { id: 'sandbox', label: '💻 Tool Agent Sim' }, { id: 'assignment', label: '📝 Assignment' }, { id: 'quiz', label: '✍️ Quiz' }];
const QUIZ_QUESTIONS = [
  { q: 'What is a "Tool Node" in Flowise?', opts: ['A special node that gives the AI agent a specific capability like searching the web, running math calculations, or calling a custom API.', 'A node that styles the font color of chat bubbles.', 'A node that deletes old conversation logs.'], ans: 0 },
  { q: 'Why use a Tool Agent instead of a basic Conversational Agent?', opts: ['A Tool Agent can decide WHICH tool to call (like a calculator or web search) based on the question, giving it dynamic problem-solving ability beyond text generation.', 'A Tool Agent is faster at formatting PDF files.', 'A Tool Agent reduces API costs by 90%.'], ans: 0 },
  { q: 'What is the SerpAPI tool used for in Flowise?', opts: ['To perform real-time web searches and return current information that was not in the AI\'s training data.', 'To resize and compress image files.', 'To translate SQL queries into Python.'], ans: 0 },
  { q: 'What does the "OpenAI Function Call Model" node enable?', opts: ['It instructs the LLM to output structured JSON tool-call commands that Flowise then executes on the selected tools.', 'It converts audio speech to text.', 'It encrypts user login sessions.'], ans: 0 },
  { q: 'How does Flowise decide which tool to use for a given query?', opts: ['The Tool Agent reads the query, selects the most relevant tool based on each tool\'s description, calls it, and feeds the result back to the LLM to form the final answer.', 'It randomly picks a tool from the list each time.', 'It always uses the first tool listed in the sidebar.'], ans: 0 }
];

export default function AgenticAIDay18({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedTool, setSelectedTool] = useState('calculator');
  const [query, setQuery] = useState('What is 847 x 293? Also, who won the FIFA World Cup 2022?');
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [toolResult, setToolResult] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (id) => { setActiveTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length : 0;

  const TOOL_NODES = [
    { id: 'agent', icon: '🤖', label: 'Tool Agent', sub: 'Orchestrator', color: '#1e3a5f', border: '#60a5fa', idx: 0 },
    { id: 'model', icon: '🧠', label: 'OpenAI Function', sub: 'gpt-4o-mini', color: '#5b21b6', border: '#a78bfa', idx: 1 },
  ];
  const TOOL_BRANCHES = [
    { id: 'calculator', icon: '🔢', label: 'Calculator', color: '#14532d', border: '#4ade80' },
    { id: 'serpapi', icon: '🌐', label: 'SerpAPI Search', color: '#1c3b2e', border: '#4ade80' },
    { id: 'custom', icon: '⚙️', label: 'Custom API', color: '#78350f', border: '#fbbf24' }
  ];

  const runToolAgent = () => {
    setIsRunning(true); setSimLogs([]); setToolResult(''); setFinalAnswer('');
    const steps = [
      '🤖 Tool Agent: Analyzing user query for required tool...',
      '🧠 OpenAI Function Model: Detecting multi-tool query (math + web search)...',
      '🔢 Calculator Tool → Executing: 847 × 293 = ?',
      '🌐 SerpAPI Tool → Searching: "FIFA World Cup 2022 winner"...',
      '📦 Tool Agent: Collecting results from both tools...',
      '🤖 Tool Agent: Generating combined answer...'
    ];
    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        if (idx === 2) setToolResult('🔢 Calculator result: 847 × 293 = 248,171');
        if (idx === 3) setTimeout(() => setToolResult(prev => prev + '\n🌐 SerpAPI result: Argentina won FIFA World Cup 2022, defeating France.'), 300);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setFinalAnswer('I can answer both parts of your question:\n\n📐 Math: 847 × 293 = 248,171\n\n⚽ FIFA World Cup 2022: Argentina won the tournament, defeating France in the final on penalties. Lionel Messi lifted the trophy for the first time.\n\nIs there anything else you would like to know?');
            setIsRunning(false);
          }, 700);
        }
      }, delay);
      delay += 750;
    });
  };

  const toolJson = `{
  "nodes": [
    { "id": "agent_1", "type": "toolAgent", "data": { "label": "Tool Agent", "systemMessage": "You are a helpful assistant. Use tools when needed." } },
    { "id": "model_1", "type": "chatOpenAI", "data": { "modelName": "gpt-4o-mini", "temperature": 0 } },
    { "id": "calc_1", "type": "calculator", "data": { "label": "Calculator" } },
    { "id": "serp_1", "type": "serper", "data": { "label": "SerpAPI" } },
    { "id": "chatOutput_1", "type": "chatOutput" }
  ],
  "edges": [
    { "source": "model_1", "target": "agent_1", "targetHandle": "model" },
    { "source": "calc_1", "target": "agent_1", "targetHandle": "tools" },
    { "source": "serp_1", "target": "agent_1", "targetHandle": "tools" },
    { "source": "agent_1", "target": "chatOutput_1" }
  ]
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
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 18
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>Tool-Calling Agents in Flowise</h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>Build powerful AI agents that can call tools in real time — calculators, web search, custom APIs — and combine results into intelligent answers. Learn to wire Tool Nodes and create multi-tool agent pipelines.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>🗺️ Tool Agent Architecture Diagram</span>
              <img src={flowiseToolImg} alt="Flowise Tool Agent Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>What are Tool Agents?</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1rem' }}>A Tool Agent in Flowise is an AI agent that can dynamically select and call external tools based on the user's query. Unlike a basic chatbot, a tool agent can do real calculations, fetch live internet data, and call your own backend APIs.</p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>The agent uses an LLM with <strong>Function Calling</strong> to decide which tool is needed, calls it, retrieves the result, and incorporates it into its answer — all automatically.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} style={{ color: '#7c3aed' }} /> Available Tool Nodes:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.92rem', color: '#475569' }}>
                  {[['🔢 Calculator','Performs accurate arithmetic and formula calculations.'],['🌐 SerpAPI / Serper','Runs real-time Google web searches.'],['⚙️ Custom Tool (API)','Calls your own backend endpoints via HTTP.'],['📄 Document Retriever','Searches a vector store for relevant document chunks.'],['🐍 Python Code Tool','Executes Python code snippets as a tool.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#7c3aed', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('tools')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Explore Tool Nodes <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div key="tools" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔧 Tool Nodes Deep Dive</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Select a tool to learn how to configure it in Flowise:</p>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
              {TOOL_BRANCHES.map(t => (
                <button key={t.id} onClick={() => setSelectedTool(t.id)} style={{ background: selectedTool === t.id ? '#f5f3ff' : 'white', border: selectedTool === t.id ? '2px solid #7c3aed' : '1px solid #cbd5e1', color: selectedTool === t.id ? '#7c3aed' : '#475569', padding: '0.55rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.15s' }}>{t.icon} {t.label}</button>
              ))}
            </div>
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              {selectedTool === 'calculator' && (<>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>🔢 Calculator Tool</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.2rem' }}>The Calculator Tool gives your agent the ability to solve any mathematical expression accurately. Without it, LLMs often make arithmetic errors on large numbers. Simply drag the Calculator node onto the canvas and connect it to the Tool Agent's "tools" port. No configuration needed — it works out of the box.</p>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a' }}>
                  <strong>Example:</strong> User: "What is 15% of 8,450?"<br/>
                  → Agent detects math → Calls Calculator → 8450 × 0.15 = 1,267.5 → Returns: "15% of 8,450 is 1,267.50"
                </div>
              </>)}
              {selectedTool === 'serpapi' && (<>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>🌐 SerpAPI / Serper Web Search Tool</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.2rem' }}>This tool gives your agent access to real-time Google search results. Drag the "Serper" node onto the canvas → Enter your Serper API key in the credential drawer → Connect to the Tool Agent. The agent will automatically use this tool when the query needs fresh, current information.</p>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a' }}>
                  <strong>Example:</strong> User: "What's the weather in Chennai today?"<br/>
                  → Agent detects real-time data needed → Calls Serper → Gets weather result → Returns formatted weather answer
                </div>
              </>)}
              {selectedTool === 'custom' && (<>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>⚙️ Custom API Tool</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.2rem' }}>Build your own tool by defining a custom API call. Drag the "Custom Tool" node → Define the tool name and description (the LLM reads this to decide when to use it) → Enter the endpoint URL, HTTP method, and headers. The agent will call your API when relevant and inject the response into its answer.</p>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a' }}>
                  <strong>Example:</strong> Tool name: "getCoursePrice" | URL: "https://api.alphafly.com/pricing"<br/>
                  → User: "How much does the AI course cost?" → Agent calls getCoursePrice → Returns price from your API
                </div>
              </>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Overview</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Practical Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'practical' && (
          <motion.div key="practical" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Build a Multi-Tool Research Agent</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Step-by-step guide to wiring up a Tool Agent that can search the web AND do calculations:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[['1. Add Tool Agent Node','Search "Tool Agent" and drag it to canvas. Open its settings drawer and write a system prompt like: "You are a research assistant. Use tools when needed."'],['2. Connect OpenAI Function Model','Drag "ChatOpenAI" → In settings, use model gpt-4o-mini, temperature 0 → Connect output to the "model" connector on the Tool Agent.'],['3. Add Calculator Tool','Drag "Calculator" node → Connect its output to the "tools" connector on the Tool Agent. The agent will now use it for math.'],['4. Add SerpAPI Tool','Drag "Serper" (or SerpAPI) node → Enter API key → Connect to Tool Agent "tools" connector.'],['5. Wire Input/Output','Drag Chat Input → Agent → Chat Output. Save and test by asking a question that needs both math and web search!']].map(([title, body]) => (
                  <div key={title} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                    <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{title}</strong>
                    <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, display: 'block' }}>{body}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.88rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={15} /> TOOL AGENT CHATFLOW JSON</strong>
                  <button onClick={() => { navigator.clipboard.writeText(toolJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Clipboard size={12} /> {copied ? 'Copied!' : 'Copy'}</button>
                </div>
                <div style={{ flex: 1, fontSize: '0.78rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '360px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{toolJson}</pre>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('tools')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Tools</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Try Simulator <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Tool Agent Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '1.5rem' }}>Ask a multi-part question and watch the agent automatically select and call the right tools:</p>

            {/* Visual Node Canvas */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem' }}>
              {/* Main row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
                {TOOL_NODES.map((node, nIdx, arr) => {
                  const isActive = simLogs.length > node.idx;
                  return (
                    <React.Fragment key={node.id}>
                      <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.7rem 1.1rem', textAlign: 'center', minWidth: '120px', transition: 'all 0.4s', boxShadow: isActive ? `0 0 16px ${node.border}55` : 'none' }}>
                        <div style={{ fontSize: '1.3rem' }}>{node.icon}</div>
                        <div style={{ color: 'white', fontSize: '0.73rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem' }}>{node.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.62rem', fontFamily: 'monospace', marginTop: '0.1rem' }}>{node.sub}</div>
                        {(!isRunning && simLogs.length > node.idx) && <div style={{ fontSize: '0.62rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ DONE</div>}
                      </div>
                      {nIdx < arr.length - 1 && <div style={{ color: simLogs.length > nIdx ? '#a78bfa' : '#334155', fontSize: '1.3rem', transition: 'color 0.4s' }}>➔</div>}
                    </React.Fragment>
                  );
                })}
                <div style={{ color: simLogs.length > 1 ? '#a78bfa' : '#334155', fontSize: '1.3rem', transition: 'color 0.4s' }}>➔</div>
                <div style={{ background: simLogs.length >= 5 ? '#14532d' : '#1e293b', border: `2px solid ${simLogs.length >= 5 ? '#4ade80' : '#334155'}`, borderRadius: '12px', padding: '0.7rem 1.1rem', textAlign: 'center', minWidth: '120px', transition: 'all 0.4s', boxShadow: simLogs.length >= 5 ? '0 0 16px #4ade8055' : 'none' }}>
                  <div style={{ fontSize: '1.3rem' }}>📤</div>
                  <div style={{ color: 'white', fontSize: '0.73rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem' }}>Chat Output</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.62rem', fontFamily: 'monospace' }}>Final Answer</div>
                </div>
              </div>
              {/* Tool branches */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #334155' }}>
                {TOOL_BRANCHES.map(t => (
                  <div key={t.id} style={{ textAlign: 'center', opacity: simLogs.length >= 3 ? 1 : 0.35, transition: 'opacity 0.5s' }}>
                    <div style={{ fontSize: '0.62rem', color: '#7c3aed', fontFamily: 'monospace', marginBottom: '0.3rem' }}>⬆ tools</div>
                    <div style={{ background: simLogs.length >= 3 ? '#1e1b4b' : '#1e293b', border: `1px solid ${simLogs.length >= 3 ? t.border : '#334155'}`, borderRadius: '8px', padding: '0.5rem 0.8rem', color: 'white', fontSize: '0.7rem', fontFamily: 'monospace' }}>{t.icon} {t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={18} style={{ color: '#7c3aed' }} /> Query Config</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Multi-tool Query:</label>
                      <textarea value={query} disabled={isRunning} onChange={e => setQuery(e.target.value)} style={{ width: '100%', height: '80px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem', fontSize: '0.78rem', color: '#64748b' }}>
                      💡 Try queries that need both math and web search for best results!
                    </div>
                  </div>
                </div>
                <button onClick={runToolAgent} disabled={isRunning} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Play size={15} /> {isRunning ? 'Calling Tools...' : 'Run Tool Agent'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', maxHeight: '140px', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>💻 Tool Execution Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Press "Run Tool Agent" to start...</span> : simLogs.map((log, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: log.includes('🔢') ? '#4ade80' : log.includes('🌐') ? '#60a5fa' : '#34d399', marginBottom: '0.3rem' }}>{log}</div>
                  ))}
                </div>
                {toolResult && (
                  <div style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: '10px', padding: '0.8rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fb923c', fontWeight: 700, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>🔧 Tool Results</span>
                    <pre style={{ margin: 0, fontSize: '0.78rem', color: '#fed7aa', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{toolResult}</pre>
                  </div>
                )}
                {finalAnswer && (
                  <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '0.8rem', flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>🤖 Final Agent Answer</span>
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

        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><GitBranch size={22} style={{ color: '#7c3aed' }} /> Day 18 Assignment: E-commerce Support Agent</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Design a Tool Agent chatbot for an e-commerce company. It must be able to:<br/>1. Calculate order totals and discounts (Calculator Tool)<br/>2. Check for latest product prices and shipping updates (SerpAPI Tool)<br/>3. Fetch customer order status from your backend (Custom API Tool)<br/><br/>Write: the full node list, all connections, tool descriptions, and the system prompt.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="Nodes: Tool Agent, OpenAI Function Model, Calculator, Serper, Custom API Tool, Chat Input, Chat Output&#10;Tool descriptions: Calculator - 'Use for price calculations and discount math'&#10;System prompt: You are a helpful e-commerce assistant for ShopNow. Use tools to answer accurately..." style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
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

        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 18 Quiz — Tool-Calling Agents</h2>
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
                  <span style={{ color: '#6d28d9' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Tool Agent expert!' : 'Review highlighted answers above.'}</span>
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
