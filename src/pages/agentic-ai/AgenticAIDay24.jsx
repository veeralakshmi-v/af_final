import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';
import agentLoopDiagImg from '../../assets/langchain_agent_loop_diagram.png';

const pageVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'architecture', label: 'Agent Loop', icon: <Brain size={15}/> },
  { id: 'practical', label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Sandbox', icon: <Play size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Define a Tool via Decorator', icon: '🛠️', tag: 'Tool Decorator',
    body: 'Create custom functions and annotate them using the @tool helper. Write detailed docstrings/descriptions — the LLM reads them to decide when to call the tool.',
    code: { 
      Terminal: '# Install core modules', 
      JSON: '{\n  "toolName": "get_word_length"\n}', 
      Python: 'from langchain_core.tools import tool\n\n@tool\ndef get_word_length(word: str) -> int:\n    """Returns the length of a word."""\n    return len(word)',
      JavaScript: 'import { tool } from "@langchain/core/tools";\nimport { z } from "zod";\n\n// In JS, define a tool with name, description, and zod validation schema\nconst getWordLength = tool(\n  (input) => input.word.length,\n  {\n    name: "get_word_length",\n    description: "Returns the length of a word.",\n    schema: z.object({\n      word: z.string().describe("The word to measure")\n    })\n  }\n);'
    } 
  },
  { num: '02', title: 'Initialize Model & Tool Bindings', icon: '🧠', tag: 'Agent Setup',
    body: 'Bind the tools list directly to the LLM client instance to authorize function calling schemas.',
    code: { 
      Terminal: '# Initialize agent brain', 
      JSON: '{\n  "boundTools": ["get_word_length"]\n}', 
      Python: 'from langchain_openai import ChatOpenAI\n\ntools = [get_word_length]\nllm = ChatOpenAI(model="gpt-4o-mini", temperature=0)\n\n# Bind tools to client\nllm_with_tools = llm.bind_tools(tools)',
      JavaScript: 'import { ChatOpenAI } from "@langchain/openai";\n\nconst tools = [getWordLength];\nconst llm = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0 });\n\n// Bind tools schema to the model\nconst llmWithTools = llm.bindTools(tools);'
    } 
  },
  { num: '03', title: 'Create Agent Executor', icon: '🚀', tag: 'Agent Executor',
    body: 'Set up the prompt template containing an agent_scratchpad, construct the tool agent, and wrap it inside AgentExecutor.',
    code: { 
      Terminal: 'python run_agent.py\n# Or Node.js:\nnode run_agent.js', 
      JSON: '{\n  "executor": "AgentExecutor"\n}', 
      Python: 'from langchain.agents import AgentExecutor, create_tool_calling_agent\nfrom langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder\n\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "You are a helpful assistant. Use tools when needed."),\n    ("user", "{input}"),\n    MessagesPlaceholder(variable_name="agent_scratchpad")\n])\n\nagent = create_tool_calling_agent(llm, tools, prompt)\nexecutor = AgentExecutor(agent=agent, tools=tools, verbose=True)',
      JavaScript: 'import { AgentExecutor, createToolCallingAgent } from "langchain/agents";\nimport { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";\n\nconst prompt = ChatPromptTemplate.fromMessages([\n  ["system", "You are a helpful assistant. Use tools when needed."],\n  ["human", "{input}"],\n  new MessagesPlaceholder("agent_scratchpad")\n]);\n\n// Assemble tool calling agent and runner executor\nconst agent = await createToolCallingAgent({ llm, tools, prompt });\nconst executor = new AgentExecutor({ agent, tools, verbose: true });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What is the role of an Agent Executor in LangChain?', opts: ['It compiles python scripts into C++.', 'It manages the runtime loop of the agent, calling tools, observing outputs, and feeding results back to the LLM brain.', 'It decreases server token costs.'], ans: 1 },
  { q: 'Why is the docstring of a custom @tool function critical?', opts: ['It styles UI elements.', 'The LLM reads the description to understand what the tool does and decide whether to call it.', 'It verifies the API key.'], ans: 1 },
  { q: 'What is the ReAct loop framework?', opts: ['A react rendering state hook.', 'Reason + Act: A loop where the agent explains its reasoning (Thought), calls a tool (Action), and evaluates the outcome (Observation).', 'A scheduled database backup.'], ans: 1 }
];

export default function AgenticAIDay24({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [query, setQuery] = useState("What is the length of the word 'Alphafly'?");
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
    const logs = [
      "🧠 Agent Brain: Analyzing input query...",
      "🔍 Thought: The user wants the length of the word 'Alphafly'. I should call get_word_length.",
      "🛠️ Action: calling tool get_word_length(word='Alphafly')...",
      "👁️ Observation: Tool response is 8.",
      "🧠 Agent Brain: Preparing final answer using tool result...",
      "🟢 Done!"
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setSimOutput("The word 'Alphafly' has 8 letters. I verified this using the get_word_length tool!");
            setIsRunning(false);
          }, 400);
        }
      }, delay);
      delay += 800;
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
                <Sparkles size={14} color="#fef08a" /> MODULE 5 • DAY 24
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>LangChain Agents & Custom Tools</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Build dynamic, goal-oriented AI agents in Python. Learn how to write custom functions, decorate them as tools using `@tool`, configure the ReAct agent framework, and run the execution loop.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Tool Calling Autonomy</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Instead of static chains, Agents use the LLM to decide the execution path. The agent evaluates the query, selects the appropriate tool, runs it, reads the output (Observation), and decides its next step.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  By packaging calculators, web searches, database search commands, or code execution APIs as custom tools, your agent can solve complex real-world tasks autonomously.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>🔄 The ReAct Framework (Reasoning + Acting)</h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  The ReAct paradigm models human problem-solving through a cycle:
                </p>
                <ul style={{ fontSize: '0.88rem', color: '#475569', paddingLeft: 20, margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                  <li><strong>Thought:</strong> The agent explains why it is taking a certain step (e.g., "I need to query the current weather in Paris").</li>
                  <li><strong>Action:</strong> The agent selects and runs a registered tool with specific arguments (e.g. call `get_weather(city="Paris")`).</li>
                  <li><strong>Observation:</strong> The tool returns the response (e.g., "Paris is 22°C with light rain"). The agent reads this observation to plan its next response or action.</li>
                </ul>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>⚙️ How Tool Binding Works</h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                  When you decorate a Python function with `@tool` or build a tool object in JS, LangChain parses your function signature, types, and docstrings/descriptions. It builds a standardized JSON schema and attaches it to the request payload to the model (e.g. `bind_tools`). The model then returns a structured `tool_calls` payload instead of a text string when it decides to delegate work.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} /> Tool Components:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {[['🛠️ @tool Decorator', 'Converts regular Python functions into LangChain tool objects.'], ['🧠 LLM Bindings', 'Attaches tool schemas directly to the LLM client.'], ['🔄 ReAct Loop', 'The reasoning-action iteration loop of the agent.'], ['🚀 Agent Executor', 'The orchestrator governing tool runs and error safety.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Agent Loop <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🔄 The ReAct Agent loop Blueprint</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How LangChain agents use reasoning to evaluate environments and call tools dynamically:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center' }}>
                <img src={agentLoopDiagImg} alt="LangChain Agent Loop Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: 10 }} />
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step Agent Implementation</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Learn how to code custom tool bindings and run agent executors in LangChain:</p>
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
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Agent Loop Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Input word query checks and trace the tool calling reasoning iteration steps:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🔧 Input Configuration</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>User Query Input:</label>
                  <textarea value={query} onChange={e => setQuery(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 100, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                <button onClick={() => {
                  setIsRunning(true);
                  setSimLogs([]);
                  setSimOutput('');
                  const stepsLogs = [
                    `🧠 [Thought] The user is asking for the length of the word "${query}". I should check if I have a tool that can do this.`,
                    `🧠 [Thought] I see the tool "get_word_length" which calculates word length. I will execute it with parameter word="${query}".`,
                    `🛠️ [Action] Triggering function call "get_word_length" with arguments: { word: "${query}" }`,
                    `📡 [Observation] Function "get_word_length" returned output: ${query.length}`,
                    `🧠 [Thought] I received the observation. The length is indeed ${query.length}. I will formulate the final answer to the user.`
                  ];
                  let delay = 0;
                  stepsLogs.forEach((log, idx) => {
                    setTimeout(() => {
                      setSimLogs(prev => [...prev, log]);
                      if (idx === stepsLogs.length - 1) {
                        setTimeout(() => {
                          setSimOutput(`Final Response: The word "${query}" has exactly ${query.length} letters, verified using the 'get_word_length' custom tool.`);
                          setIsRunning(false);
                        }, 500);
                      }
                    }, delay);
                    delay += 900;
                  });
                }} disabled={isRunning || !query.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Running Agent Loop...' : 'Trigger Agent Run'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: 480 }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>
                  💻 Agent Execution Trace Logs (ReAct Thought Loop)
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                  {simLogs.length === 0 && <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Ready to trace...</span>}
                  
                  {simLogs.map((l, i) => {
                    let border = '1px solid #334155', bg = 'transparent', color = '#e2e8f0';
                    if (l.includes('[Thought]')) { border = '1px solid rgba(168,85,247,0.3)'; bg = 'rgba(168,85,247,0.04)'; color = '#c084fc'; }
                    else if (l.includes('[Action]')) { border = '1px solid rgba(59,130,246,0.3)'; bg = 'rgba(59,130,246,0.04)'; color = '#60a5fa'; }
                    else if (l.includes('[Observation]')) { border = '1px solid rgba(234,179,8,0.3)'; bg = 'rgba(234,179,8,0.04)'; color = '#facc15'; }

                    return (
                      <div key={i} style={{ padding: '0.6rem 0.8rem', borderRadius: 10, border, background: bg, color, fontSize: '0.78rem', fontFamily: 'monospace', lineHeight: 1.5 }}>
                        {l}
                      </div>
                    );
                  })}

                  {simOutput && (
                    <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, padding: '1rem', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '.65rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📄 Final Agent Response</span>
                      <pre style={{ margin: 0, fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
                    </div>
                  )}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 24 Assignment: Custom File Writer Tool Agent</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python program that defines a custom function decorated with `@tool` to write input logs into a local text file `agent_output.txt`. Construct an AgentExecutor to execute it.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from langchain_core.tools import tool&#10;from langchain.agents import AgentExecutor, create_tool_calling_agent&#10;&#10;@tool&#10;def write_to_log(content: str) -> str:&#10;    # python file write code here&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 24 Quiz Assessment</h2>
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
