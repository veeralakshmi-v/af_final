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
  { num: '01', title: 'Pre-built CrewAI Tools', icon: '🔍', tag: 'Standard Tools',
    body: 'CrewAI provides ready-to-use search, directory, and web scraping tools out of the box.',
    code: { 
      Terminal: 'pip install crewai[tools]', 
      JSON: '{\n  "tool": "SerperDevTool"\n}', 
      Python: 'from crewai_tools import SerperDevTool\n\n# Initialize pre-built Google Search tool\nsearch_tool = SerperDevTool()',
      JavaScript: '// In LangGraph JS, use langchain prebuilt tools:\nimport { TavilySearchResults } from "@langchain/community/tools/tavily_search";\nconst searchTool = new TavilySearchResults();'
    } 
  },
  { num: '02', title: 'Write Function-Based Tools', icon: '⚡', tag: 'Decorator Tools',
    body: 'For simple calculations or custom API gets, write regular functions annotated with the @tool helper decorator.',
    code: { 
      Terminal: '# Create decorator utility', 
      JSON: '{\n  "decorator": "@tool"\n}', 
      Python: 'from crewai.tools import tool\n\n@tool("currency_converter")\ndef convert_currency(amount: float, rate: float) -> float:\n    """Converts a currency amount to a target currency using exchange rates."""\n    return amount * rate',
      JavaScript: 'import { tool } from "@langchain/core/tools";\nimport { z } from "zod";\n\nconst convertCurrency = tool(\n  async ({ amount, rate }) => amount * rate,\n  {\n    name: "currency_converter",\n    description: "Converts currency amounts",\n    schema: z.object({ amount: z.number(), rate: z.number() })\n  }\n);'
    } 
  },
  { num: '03', title: 'Write Class-Based BaseTools', icon: '🏗️', tag: 'Custom BaseTool',
    body: 'Extend CrewAI\'s BaseTool class to build robust custom tools with strict type parsing and Zod schemas.',
    code: { 
      Terminal: '# Setup pydantic schemas', 
      JSON: '{\n  "customToolClass": "BaseTool"\n}', 
      Python: 'from crewai.tools import BaseTool\nfrom pydantic import BaseModel, Field\n\nclass ConverterInput(BaseModel):\n    amount: float = Field(..., description="Amount of cash")\n\nclass CustomConverter(BaseTool):\n    name: str = "custom_cash_converter"\n    description: str = "Converts standard cash values"\n    args_schema: type[BaseModel] = ConverterInput\n\n    def _run(self, amount: float) -> str:\n        return f"Converted Cash: {amount * 1.1}"',
      JavaScript: '// In JS, extend standard Tool classes:\nimport { Tool } from "@langchain/core/tools";\n// Custom JS Tool implementation...'
    } 
  },
  { num: '04', title: 'Bind Tools to Agents', icon: '👤', tag: 'Agent Binding',
    body: 'Assign the list of tools directly to your Agent instance configuration blocks so they can use them during task executions.',
    code: { 
      Terminal: '# Bind tool assets', 
      JSON: '{\n  "agentTools": ["SerperDevTool"]\n}', 
      Python: 'from crewai import Agent\n\npricing_agent = Agent(\n    role="Finance Specialist",\n    goal="Verify item values",\n    backstory="You search currency records.",\n    tools=[search_tool, convert_currency],  # Binding tools\n    verbose=True\n)',
      JavaScript: '// In JS, assign tools array to model binders:\nconst modelWithTools = model.bindTools([searchTool]);'
    } 
  },
  { num: '05', title: 'Run Task Executions', icon: '🚀', tag: 'Tasks Run',
    body: 'Create a task that explicitly instructs the agent to run the converted cash analysis and output reports.',
    code: { 
      Terminal: 'python run_tools.py', 
      JSON: '{\n  "result": "Analyses reports successfully saved"\n}', 
      Python: 'from crewai import Task, Crew\n\nfinance_task = Task(\n    description="Convert 500 USD to EUR and search for current news.",\n    expected_outcome="Markdown bullet summary.",\n    agent=pricing_agent\n)\n\ncrew = Crew(agents=[pricing_agent], tasks=[finance_task])\nprint(crew.kickoff())',
      JavaScript: '// Invoke JS multi-agent pipelines...'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What does SerperDevTool do in CrewAI?', opts: ['It generates random email texts.', 'It queries the Google Search API to retrieve active web search results.', 'It compiles python modules.'], ans: 1 },
  { q: 'What is the purpose of args_schema in class-based Custom Tools?', opts: ['To style command prompt fonts.', 'It enforces strict input validation using Pydantic parameters before executing tool logic.', 'It defines database ports.'], ans: 1 },
  { q: 'Where do you bind tools in CrewAI so agents can access them?', opts: ['Inside the Task class parameters.', 'Inside the Agent instantiation block under the tools attribute.', 'In the main crew setup parameters only.'], ans: 1 }
];

export default function AgenticAIDay32({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [selectedTool, setSelectedTool] = useState("Scraper");
  const [toolParam, setToolParam] = useState("https://example.com/api");
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

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
    setSimLogs([`[Tool Validation] Instantiating custom BaseTool: ${selectedTool}...`]);

    setTimeout(() => {
      setSimLogs(prev => [...prev, `📦 Schema Verification: Checking inputs: param='${toolParam}'`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `⚡ Executing tool._run() matching custom definitions...`]);

        setTimeout(() => {
          let outputResult = '';
          if (selectedTool === 'Scraper') {
            outputResult = `[Scraper Output]: Extracted content: "Autonomous Agents are software entities that can interact..."`;
          } else {
            outputResult = `[Calculator Output]: Calculated custom output is: 8774.22`;
          }
          setSimLogs(prev => [...prev, outputResult, `🟢 Verification Success! Output formats matched schemas.`]);
          setIsRunning(false);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 7 • DAY 32
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>CrewAI Tools & Custom Tools</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Expand agent capability limits. Learn how to load standard search tools and develop custom class-based python BaseTools to query secure internal company API datasets.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Extending Agent Capabilities</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  An AI agent without tools can only answer questions using its model training weights. To perform real-world work, it needs APIs.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  CrewAI makes tool configuration straightforward. You can bind pre-built Google Search SerperDevTools or DirectoryReaders. For bespoke internal work, you can subclass BaseTool with Zod schemas.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  🛠️ Tool Architectures
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  <strong>BaseTool:</strong> Pydantic class validator framework forcing type checks.
                  <strong style={{ display: 'block', marginTop: 8 }}>@tool Decorator:</strong> Quick function annotations for simple converter math tools.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Tool Binding <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Agent-Tool Binding Architecture</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How tools are nested and queried inside CrewAI agent structures:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
                  <div style={{ border: '2px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1rem', borderRadius: 12, minWidth: 200 }}>
                    <span style={{ fontSize: '.7rem', color: '#38bdf8', display: 'block', fontWeight: 700 }}>AGENT OBJECT</span>
                    <strong style={{ fontSize: '.9rem' }}>Finance Specialist</strong>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: 6, fontSize: '.78rem' }}>SerperDevTool (Web Search)</div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: 6, fontSize: '.78rem' }}>custom_converter (Custom Math Tool)</div>
                  </div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '10px 0 0 0', maxWidth: '600px' }}>
                  Tools are assigned to specific agents. When the agent receives a task, its internal planner selects and queries the appropriate tool.
                </p>
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
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step Graph Building</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Define, code, and bind custom tools to agents:</p>
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
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 Tool Schema Verification</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Configure parameters and watch custom tools parse input variables:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>⚙️ Input Parameters</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Select Tool:</label>
                  <select value={selectedTool} onChange={e => setSelectedTool(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                    <option value="Scraper">API Scraper (URL input)</option>
                    <option value="Converter">Calculator converter (amount input)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Input Value:</label>
                  <input type="text" value={toolParam} onChange={e => setToolParam(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}/>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {isRunning ? 'Running Verification...' : 'Run Tool Verification'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 340 }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Tool execution outputs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.78rem', color: '#e2e8f0' }}>
                  {simLogs.map((log, i) => (
                    <div style={{ color: log.includes('Output') ? '#34d399' : log.includes('Checking') ? '#fbbf24' : '#e2e8f0' }} key={i}>
                      {log}
                    </div>
                  ))}
                </div>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📋 Day 32 Cheat Sheet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Quick reference for pre-built tools and custom class tools:</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem' }}>🐍 Custom BaseTool Python imports</h3>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1.2rem', borderRadius: 12, fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
{`# 1. Custom tool class structure
from crewai.tools import BaseTool
from pydantic import BaseModel, Field

class ScraperInput(BaseModel):
    url: str = Field(..., description="Target webpage URL link")

class WebScraperTool(BaseTool):
    name: str = "web_scraper"
    description: str = "Scrapes page markup"
    args_schema: type[BaseModel] = ScraperInput

    def _run(self, url: str) -> str:
        # custom scraping logic goes here
        return "page content summary"

# 2. pre-built serper tool
from crewai_tools import SerperDevTool
search_tool = SerperDevTool()`}
                  </pre>
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 32 Assignment: Custom Tool Implementation</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script defining a class-based tool named `UserDatabaseTool` extending `BaseTool`. Setup args_schema requiring an email string, mock search logic, and return user name updates.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from crewai.tools import BaseTool&#10;from pydantic import BaseModel, Field&#10;...&#10;class UserInput(BaseModel):&#10;    email: str = Field(...)&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
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
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 32 Quiz Assessment</h2>
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
                          return <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))} style={{ bg, border, color, padding: '.8rem 1.1rem', borderRadius: 10, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '.92rem', transition: 'all .15s' }}>{opt}</div>;
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module7', 'day33')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 33) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
