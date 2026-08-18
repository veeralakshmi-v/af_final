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
  { num: '01', title: 'Install Toolkits', icon: '📦', tag: 'Setup',
    body: 'Install Agno prebuilt toolkits. Prebuilt toolkits compile standard capabilities like DuckDuckGo search or Yahoo Finance API.',
    code: { 
      Terminal: 'pip install duckduckgo-search yfinance\n# DuckDuckGo and YFinance packages provide search & finance data feeds.', 
      JSON: '{\n  "tool_dependencies": {\n    "duckduckgo-search": "^6.1.7",\n    "yfinance": "^0.2.40"\n  }\n}', 
      Python: '# Verify toolkit package imports\nimport yfinance as yf\nimport duckduckgo_search\nprint("Tools loaded successfully.")',
      JavaScript: '// Node.js equivalents usually involve npm libraries like: \n// npm install yahoo-finance2 ddg-api'
    } 
  },
  { num: '02', title: 'Bind Prebuilt Toolkits', icon: '🔧', tag: 'Tool Bindings',
    body: 'Import toolkits from agno.tools and register their functions or instanced classes inside the Agent tools parameter.',
    code: { 
      Terminal: '# Configure prebuilt tools integration', 
      JSON: '{\n  "agent_tools": ["duckduckgo", "yfinance"]\n}', 
      Python: 'from agno.agent import Agent\nfrom agno.tools.duckduckgo import DuckDuckGo\nfrom agno.tools.yfinance import YFinanceTools\n\nagent = Agent(\n    tools=[DuckDuckGo(), YFinanceTools(stock_price=True, analyst_recommendations=True)],\n    show_tool_calls=True\n)',
      JavaScript: '// Binding tool handlers in JS workflows:\nconst searchTool = new DynamicTool({ name: "search", description: "Search web" });'
    } 
  },
  { num: '03', title: 'Write Custom Tools', icon: '✍️', tag: 'Custom Logic',
    body: 'In Agno, any plain Python function can be a tool. Define your function with type hints and a docstring, then register it in tools.',
    code: { 
      Terminal: '# Plain python functions automatically map schemas via Docstrings', 
      JSON: '{\n  "tool": "get_weather",\n  "parameters": {\n    "location": "string"\n  }\n}', 
      Python: 'def get_current_weather(location: str) -> str:\n    """Get current weather for a city.\n\n    Args:\n        location (str): Name of city.\n    """\n    # Custom integration logic here\n    return f"The weather in {location} is 22C."\n\nagent = Agent(tools=[get_current_weather])',
      JavaScript: '// Custom tool schema definitions in JS:\nconst weatherTool = tool(\n  async ({ location }) => { return "22C"; },\n  { name: "get_current_weather", description: "Get city weather" }\n);'
    } 
  },
  { num: '04', title: 'Execute and Check Call Stack', icon: '🚀', tag: 'Running',
    body: 'Kick off the agent run. Enabling show_tool_calls=True allows you to view when and how the agent triggers tools in the console.',
    code: { 
      Terminal: 'python finance_agent.py', 
      JSON: '{\n  "execution": "stream_mode",\n  "show_logs": true\n}', 
      Python: '# Trigger financial metrics query\nagent.print_response("What is the stock price of AAPL and is it recommended to buy?")',
      JavaScript: '// Invoke JS node workflows:\nconst result = await app.invoke({ input: "AAPL stock price" });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'How are custom Python functions converted to Tool schemas in Agno?', opts: ['You must parse them to raw JSON files manually.', 'Agno reads the function signature type hints and the docstring description automatically.', 'You need to compile them to C++ binaries.'], ans: 1 },
  { q: 'Which tool parameter configuration shows execution logs of agent tool calls in the terminal?', opts: ['print_execution=True', 'show_tool_calls=True', 'verbose_actions=True'], ans: 1 },
  { q: 'Which of the following is a pre-built toolkit available in Agno?', opts: ['WindowsRegistryTools', 'YFinanceTools', 'LinuxKernelTools'], ans: 1 }
];

export default function AgenticAIDay37({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [selectedStock, setSelectedStock] = useState("TSLA");
  const [useSearch, setUseSearch] = useState(true);
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
    setSimLogs([`[Agno] Loading Agent (Tools: [YFinanceTools${useSearch ? ', DuckDuckGo' : ''}])`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `🔍 Prompt received: "Find current market status for ${selectedStock}."`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `⚙️ Tool Call triggered: YFinanceTools.get_stock_price(ticker='${selectedStock}')`]);

        setTimeout(() => {
          const fakePrice = selectedStock === 'TSLA' ? '248.50 USD' : selectedStock === 'AAPL' ? '189.20 USD' : '415.10 USD';
          setSimLogs(prev => [...prev, `🟢 Tool Return: '${selectedStock} price is ${fakePrice}'`]);

          if (useSearch) {
            setTimeout(() => {
              setSimLogs(prev => [...prev, `⚙️ Tool Call triggered: DuckDuckGo.search(query='${selectedStock} stock latest news')`]);

              setTimeout(() => {
                setSimLogs(prev => [...prev, `🟢 Tool Return: 'Tesla launches next-gen self-driving beta tests in California.'`]);

                setTimeout(() => {
                  setSimLogs(prev => [...prev, `🧠 Synthesizing financial tools outcome...`]);

                  setTimeout(() => {
                    setSimLogs(prev => [...prev, `🟢 Output compiled.`]);
                    setSimOutput(
                      `### Market Report: ${selectedStock}\n\n- **Current Stock Price:** ${fakePrice}\n- **Latest Web Updates:** Tesla self-driving features are undergoing live beta testing in California, creating positive analyst momentum.\n\n*Source: Yahoo Finance & DuckDuckGo Search Tools*`
                    );
                    setIsRunning(false);
                  }, 1200);
                }, 1000);
              }, 1200);
            }, 800);
          } else {
            setTimeout(() => {
              setSimLogs(prev => [...prev, `🧠 Synthesizing financial tools outcome...`]);

              setTimeout(() => {
                setSimLogs(prev => [...prev, `🟢 Output compiled.`]);
                setSimOutput(
                  `### Market Report: ${selectedStock}\n\n- **Current Stock Price:** ${fakePrice}\n\n*(Web search tool was disabled; no web news included)*`
                );
                setIsRunning(false);
              }, 1200);
            }, 1000);
          }

        }, 1200);

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
                <Sparkles size={14} color="#fef08a" /> MODULE 8 • DAY 37
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 37: Agno Tools & Toolkits</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Master function calling interfaces in Agno. Bind pre-built tool packages for web searches or financial analysis, and expose custom Python routines as agent tools.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Implicit Tool Registration</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Agno utilizes type reflection to convert Python code into JSON schemas that LLMs can understand. Rather than writing long schema parameters, you specify type hints (`ticker: str`) and describe variables in the docstring.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75 }}>
                  The agent reads the signature, packages it as a tool description, and sends it to the LLM. When the model requests a function call, Agno intercept, runs the Python code locally, and returns the result back to the model.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🛠️ Built-in Toolkits
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>DuckDuckGo:</strong> Immediate access to web searches.
                  <strong>YFinanceTools:</strong> Retrieve real-time stock prices, analyst consensus figures, and balance sheet metrics.
                  <strong>ShellTools:</strong> Execute safe shell commands.
                  <strong>FileTools:</strong> Direct file CRUD operations.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Tool Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Tool Call Lifecycle</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How Agno maps model requests to execution nodes:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', color: '#cbd5e1' }}>
                  <div style={{ background: '#0284c7', padding: '10px 15px', borderRadius: 10, fontSize: '.85rem', fontWeight: 700 }}>1. LLM Model (Tool call required)</div>
                  <div>➔</div>
                  <div style={{ background: '#7c3aed', padding: '10px 15px', borderRadius: 10, fontSize: '.85rem', fontWeight: 700 }}>2. Agno Runtime Intercept</div>
                  <div>➔</div>
                  <div style={{ background: '#10b981', padding: '10px 15px', borderRadius: 10, fontSize: '.85rem', fontWeight: 700 }}>3. Local Python Execution</div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#1e293b', padding: '1rem 2rem', borderRadius: 12, color: '#cbd5e1', fontSize: '.9rem', border: '1px solid #334155' }}>
                  <strong>4. Return local output payload back to LLM to complete final summary synthesis.</strong>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Code Guide: Incorporating Toolkits & Functions</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define code dependencies, configure tool bindings, define functions, and review outputs:</p>
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Simulator Console</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Ticker Symbol:</label>
                    <select value={selectedStock} onChange={e => setSelectedStock(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }}>
                      <option value="TSLA">TSLA (Tesla Motors)</option>
                      <option value="AAPL">AAPL (Apple Inc.)</option>
                      <option value="MSFT">MSFT (Microsoft Corp.)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" id="search-check" checked={useSearch} onChange={e => setUseSearch(e.target.checked)} disabled={isRunning} />
                    <label htmlFor="search-check" style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>Enable DuckDuckGo Web Search Tool</label>
                  </div>
                  <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Executing Tools...' : 'Trigger Tool Agent Run'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Tool Output Logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('Tool Call') ? '#fbbf24' : log.includes('Tool Return') ? '#34d399' : '#e2e8f0' }} key={idx}>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Tools Quick Reference</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Registering tools in code:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    Agent(tools=[my_custom_function, YFinanceTools(...)])
                  </code>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Exposing standard library toolkits:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    from agno.tools.duckduckgo import DuckDuckGo
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📝 Assignment: Real Estate Custom Search Agent</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Build a custom Python function acting as a local mortgage calculator tool. Register it and bind the DuckDuckGo search tool to compile home listings.</p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>Requirements:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Create a custom function <code>calculate_mortgage(principal: int, rate: float, years: int) {"->"} float</code>. Include variable type annotations and docstring documentation.</li>
                  <li>Bind this function along with DuckDuckGo search tools inside `Agent(tools=[...])`.</li>
                  <li>Perform execution by requesting AAPL home listing summaries with mortgage estimations.</li>
                </ol>
              </div>

              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} disabled={assignmentSubmitted} placeholder="Paste your custom tool python script here..." style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
              
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>🧠 Day 37 Conceptual Quiz</h2>
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'day38')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 38) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
