import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Code, Clipboard, Award } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SUB_TABS = [
  { id: 'overview', label: '📋 Project Spec' },
  { id: 'architecture', label: '🏗️ Architecture' },
  { id: 'guide', label: '🛠️ Implementation Guide' },
  { id: 'simulator', label: '💻 Sandbox Simulator' },
  { id: 'submission', label: '🚀 Final Submission' }
];

export default function AgenticAIModule8Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simOutput, setSimOutput] = useState('');

  // Input states
  const [targetStock, setTargetStock] = useState('NVDA');
  const [riskTolerance, setRiskTolerance] = useState('Medium');

  // Submission states
  const [repoUrl, setRepoUrl] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyBoilerplate = () => {
    const code = `from agno.agent import Agent\nfrom agno.models.openai import OpenAIChat\nfrom agno.tools.yfinance import YFinanceTools\nfrom agno.tools.duckduckgo import DuckDuckGo\nfrom agno.storage.agent.sqlite import SqlAgentStorage\n\n# 1. Initialize Persistent Session Storage\nstorage = SqlAgentStorage(\n    table_name="portfolio_advisory_sessions",\n    db_file="tmp/portfolio_advisor.db"\n)\n\n# 2. Define Specialist: Financial Analyst Agent\nanalyst_agent = Agent(\n    name="Financial Analyst",\n    role="Retrieve stock metrics and current financial news",\n    model=OpenAIChat(id="gpt-4o"),\n    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True), DuckDuckGo()],\n    instructions=["Always state ticker symbols and list dates of news reports."]\n)\n\n# 3. Define Specialist: Risk Estimator Agent\ndef check_volatility(ticker: str) -> str:\n    \"\"\"Analyze the risk profile and volatility coefficient of a stock ticker.\n\n    Args:\n        ticker (str): Stock ticker symbol.\n    \"\"\"\n    # Mock/Custom volatility check logic\n    return f"Volatility coefficient for {ticker} is 1.45 (Stable growth profile)."\n\nrisk_agent = Agent(\n    name="Risk Estimator",\n    role="Evaluate volatility and risk factors of target tickers",\n    model=OpenAIChat(id="gpt-4o"),\n    tools=[check_volatility],\n    instructions=["Categorize risk levels as Low, Medium, or High."]\n)\n\n# 4. Define Coordinating Portfolio Manager (Team Lead)\nportfolio_manager = Agent(\n    name="Portfolio Manager",\n    role="Synthesize analyst news and risk profiles into actionable investment recommendations",\n    model=OpenAIChat(id="gpt-4o"),\n    team=[analyst_agent, risk_agent],\n    storage=storage,\n    read_chat_history=True,\n    instructions=[\n        "Delegate research to the Financial Analyst.",\n        "Delegate risk assessments to the Risk Estimator.",\n        "Combine findings into a comprehensive investment report.",\n        "Always state the user session details."\n    ],\n    markdown=True\n)\n\n# 5. Run pipeline\nportfolio_manager.print_response(\n    "Provide an investment report for NVDA. User risk profile is Medium.",\n    session_id="alex-advisor-session"\n)`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimOutput('');
    const logs = [
      `📡 Initializing Agno Portfolio Coordinator...`,
      "💾 SQLite Storage: Connecting to 'tmp/portfolio_advisor.db'...",
      "💾 SQLite Storage: Reading previous chat session: 'user-cohort-session'...",
      "👑 Portfolio Manager (Lead): Delegating fact gathering to Financial Analyst...",
      `🔍 Financial Analyst: Querying YFinance API for: ${targetStock}...`,
      "🔍 Financial Analyst: Stock price retrieved: 114.50 USD.",
      "👑 Portfolio Manager (Lead): Delegating volatility analysis to Risk Estimator...",
      `⚙️ Risk Estimator: Running custom check_volatility for: ${targetStock}...`,
      `⚙️ Risk Estimator: Volatility parsed. Profile matches: '${riskTolerance} Risk tolerance'.`,
      "👑 Portfolio Manager (Lead): Synthesizing data blocks...",
      "💾 SQLite Storage: Saving session details to database...",
      "🟢 Portfolio Lead: Response generated successfully."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setSimOutput(
            `### Portfolio Advisory Report: ${targetStock}\n\n- **Target Ticker:** ${targetStock}\n- **Market Price:** 114.50 USD\n- **Client Risk Tolerance:** ${riskTolerance}\n\n**Advisory Summary:**\nBased on real-time parameters, ${targetStock} exhibits robust revenue metrics. Since your risk profile is **${riskTolerance}**, we recommend a phased dollar-cost averaging strategy. Volatility coefficient metrics remain within normal parameters.\n\n*Report synthesized by Agno multi-agent collaborative pipeline.*`
          );
          setIsRunning(false);
        }
      }, delay);
      delay += 700;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button key={tab.id} onClick={() => changeTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? '#0284c7' : '#64748b', border: 'none', padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', transition: 'all .15s', boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 8 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Agno AI Portfolio Advisory Agency</h1>
                <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Build a production-grade multi-agent financial advisory platform. Set up persistent SQLite session memory, prebuilt financial tools, custom volatility algorithms, and coordinating supervisor teams.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Goal</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Your objective is to construct an Agno Agent Team capable of calculating financial risk profiles, extracting pricing details, and generating advisory reports.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  The coordinator must read session chat turn variables from a persistent SQLite local storage engine, load the analyst and risk specialists inside its team, validate output recommendations, and run the pipeline successfully.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369a1', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Requirements:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ Setup persistent SQLAgentStorage table', '✅ Create Financial Analyst with YFinance Tools', '✅ Code custom check_volatility Python function', '✅ Define Risk Estimator agent binding custom function', '✅ Create Portfolio Manager leader coordinating the team', '✅ Enable print_response() mapping session IDs'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => onNavigate('agentic_ai_module8', 'day40')}>← Back to Day 40</button>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                View Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Portfolio Agency Data Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How session checkpointers and team routers interact during multi-agent run loops:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ border: '1px solid #fbbf24', background: 'rgba(251,191,36,0.05)', padding: '0.8rem 1.5rem', borderRadius: 10, color: 'white', fontSize: '.85rem' }}>
                  💾 sqlite storage table checkpointer (session states)
                </div>
                
                <div style={{ color: '#94a3b8' }}>▼</div>

                <div style={{ border: '2px solid #7c3aed', background: 'rgba(124,58,237,0.05)', padding: '1.2rem', borderRadius: 12, color: 'white', width: '85%', maxWidth: '400px' }}>
                  👑 <strong>Portfolio Lead (Team Coordinator)</strong>
                </div>

                <div style={{ display: 'flex', gap: '30px', color: '#94a3b8' }}>
                  <div>↙</div>
                  <div>↘</div>
                </div>

                <div style={{ display: 'flex', gap: '15px', width: '90%', justifyContent: 'center' }}>
                  <div style={{ border: '1px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1rem', borderRadius: 10, color: 'white', flex: 1 }}>
                    📊 <strong>Financial Analyst</strong> <br/>
                    <small style={{ color: '#64748b' }}>YFinance + Search</small>
                  </div>
                  <div style={{ border: '1px solid #10b981', background: 'rgba(16,185,129,0.05)', padding: '1rem', borderRadius: 10, color: 'white', flex: 1 }}>
                    🛡️ <strong>Risk Estimator</strong> <br/>
                    <small style={{ color: '#64748b' }}>Custom Volatility Tool</small>
                  </div>
                </div>

              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Guide <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, overflow: 'hidden', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.8rem 2.2rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', margin: 0 }}>🐍 Python Agno Team Blueprint</h3>
                  <p style={{ color: '#64748b', fontSize: '.85rem', margin: '4px 0 0' }}>Production-ready blueprint mapping RAG, memory, and custom tools in Agno:</p>
                </div>
                <button onClick={copyBoilerplate} style={{ background: copied ? '#059669' : '#0284c7', color: 'white', border: 'none', padding: '.55rem 1.2rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.84rem' }}>
                  {copied ? 'Copied Blueprint!' : 'Copy Blueprint'}
                </button>
              </div>
              <div style={{ padding: '1.8rem 2.2rem', maxHeight: 450, overflowY: 'auto' }}>
                <pre style={{ margin: 0, fontSize: '.85rem', color: '#60a5fa', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
{`from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from agno.tools.duckduckgo import DuckDuckGo
from agno.storage.agent.sqlite import SqlAgentStorage

# 1. Initialize Persistent Session Storage
storage = SqlAgentStorage(
    table_name="portfolio_advisory_sessions",
    db_file="tmp/portfolio_advisor.db"
)

# 2. Define Specialist: Financial Analyst Agent
analyst_agent = Agent(
    name="Financial Analyst",
    role="Retrieve stock metrics and current financial news",
    model=OpenAIChat(id="gpt-4o"),
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True), DuckDuckGo()],
    instructions=["Always state ticker symbols and list dates of news reports."]
)

# 3. Define Specialist: Risk Estimator Agent
def check_volatility(ticker: str) -> str:
    """Analyze the risk profile and volatility coefficient of a stock ticker.

    Args:
        ticker (str): Stock ticker symbol.
    """
    return f"Volatility coefficient for {ticker} is 1.45 (Stable growth profile)."

risk_agent = Agent(
    name="Risk Estimator",
    role="Evaluate volatility and risk factors of target tickers",
    model=OpenAIChat(id="gpt-4o"),
    tools=[check_volatility],
    instructions=["Categorize risk levels as Low, Medium, or High."]
)

# 4. Define Coordinating Portfolio Manager (Team Lead)
portfolio_manager = Agent(
    name="Portfolio Manager",
    role="Synthesize analyst news and risk profiles into actionable investment recommendations",
    model=OpenAIChat(id="gpt-4o"),
    team=[analyst_agent, risk_agent],
    storage=storage,
    read_chat_history=True,
    instructions=[
        "Delegate research to the Financial Analyst.",
        "Delegate risk assessments to the Risk Estimator.",
        "Combine findings into a comprehensive investment report.",
        "Always state the user session details."
    ],
    markdown=True
)

# 5. Run pipeline
portfolio_manager.print_response(
    "Provide an investment report for NVDA. User risk profile is Medium.",
    session_id="alex-advisor-session"
)`}
                </pre>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Simulator <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Simulator Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Target Stock Ticker:</label>
                    <input type="text" value={targetStock} onChange={e => setTargetStock(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Client Risk Profile:</label>
                    <select value={riskTolerance} onChange={e => setRiskTolerance(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }}>
                      <option value="Low">Low Risk Tolerance</option>
                      <option value="Medium">Medium Risk Tolerance</option>
                      <option value="High">High Risk Tolerance</option>
                    </select>
                  </div>
                  <button onClick={runSimulator} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Kickoff Executing...' : 'Kickoff Team Simulator'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Team execution logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1.2rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('YFinance') || log.includes('volatility') ? '#fbbf24' : log.includes('SQLite') ? '#60a5fa' : log.includes('successfully') ? '#34d399' : '#e2e8f0' }} key={idx}>
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

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Submission <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SUBMISSION */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>🚀 Submit Agno Portfolio Team Project Spec</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', color: '#475569', marginBottom: 6, fontWeight: 700 }}>GitHub Repository URL:</label>
                  <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} disabled={submitted} placeholder="https://github.com/username/agno-portfolio-team" style={{ width: '100%', padding: '.7rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.9rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', color: '#475569', marginBottom: 6, fontWeight: 700 }}>Code content (Copy-paste your Agno script):</label>
                  <textarea value={codeContent} onChange={e => setCodeContent(e.target.value)} disabled={submitted} placeholder="from agno.agent import Agent..." style={{ width: '100%', height: 180, padding: '.7rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.9rem', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                </div>
                {!submitted ? (
                  <button onClick={() => setSubmitted(true)} disabled={!repoUrl.trim() || !codeContent.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.85rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Submit Project For Grading</button>
                ) : (
                  <div style={{ background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', border: '1px solid #a7f3d0', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                    <h4 style={{ color: '#065f46', fontSize: '1.2rem', margin: '0 0 0.3rem 0' }}>🎉 Project Submitted Successfully!</h4>
                    <span style={{ color: '#047857' }}>Your persistent portfolio advisory team has been submitted. Excellent work completing Module 8!</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('simulator')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Back to Dashboard</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
