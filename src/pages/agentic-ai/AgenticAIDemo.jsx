import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Brain, Cpu, Layers, GitBranch, Terminal, 
  Play, RefreshCw, Send, CheckCircle, ArrowRight, HelpCircle 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'comparison', label: '⚔️ LLM vs GenAI vs Agents' },
  { id: 'simulator', label: '💻 Interactive Loop Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is the primary characteristic that makes an AI system "Agentic"?',
    opts: [
      'It compiles React code faster than standard models.',
      'It has autonomy to evaluate environments, call external tools, and loop decisions to achieve a goal.',
      'It uses high CSS gradients values.'
    ],
    ans: 1
  },
  {
    q: 'How does Agentic AI differ from standard RAG (Generative AI)?',
    opts: [
      'Standard RAG follows a rigid, single-pass pipeline (retrieve -> paste -> generate), whereas Agentic AI autonomously decides if it needs tools, runs them, and loops based on results.',
      'Agentic AI does not use LLMs as its core brain.',
      'Standard RAG requires database keys while Agentic AI does not.'
    ],
    ans: 0
  },
  {
    q: 'In Agentic AI, what is a "Tool"?',
    opts: [
      'A layout style tag.',
      'An external API, function, or script (like Google Search, Database Upserts, or Email APIs) that the agent chooses to call.',
      'The hosting server hardware.'
    ],
    ans: 1
  },
  {
    q: 'What does the "Reasoning Loop" (ReAct framework) stand for?',
    opts: [
      'React Components rendering states.',
      'Reasoning and Acting: The agent explains its thoughts, runs an action tool, reads the output, and loops again if the goal is not met.',
      'Recursive Action validation.'
    ],
    ans: 1
  },
  {
    q: 'Why are LLMs alone not considered fully agentic?',
    opts: [
      'They are static text predictors that cannot autonomously execute external code or make live system decisions without human inputs.',
      'They do not understand English grammar.',
      'They run strictly on local GPUs.'
    ],
    ans: 0
  }
];

export default function AgenticAIDemo({ activeTab: initialTab, onNavigate, openAITutor }) {
  const [activeSubTab, setActiveSubTab] = useState('intro');

  // Simulator State
  const [selectedTask, setSelectedTask] = useState('stock_alert');
  const [simOutput, setSimOutput] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleSubTabChange = (tabId) => {
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulated run comparing the three levels of AI
  const runComparisonSim = () => {
    setIsSimulating(true);
    setSimOutput(null);

    const simulations = {
      stock_alert: {
        task: "Check Apple stock price, verify if below $200, and send email alert.",
        llm: [
          "💭 [LLM Thought]: User wants Apple stock price and email alert.",
          "❌ [LLM Action]: FAILED. Output: 'I apologize, but I do not have real-time internet access to fetch live stock prices, nor do I have credentials to send emails.'"
        ],
        genai: [
          "💭 [GenAI Thought]: Run pre-configured stock lookup pipeline.",
          "⚙️ [Pipeline Trigger]: Fetch API https://api.stocks.com/AAPL ➔ Returns $195.40.",
          "📝 [Generation Output]: 'The current stock price of Apple is $195.40 (which is below $200).'",
          "❌ [Pipeline Limitation]: FAILED. Cannot dynamically route or trigger action scripts like email alerts."
        ],
        agentic: [
          "💭 [Agent Thought]: I need to fetch the stock price first. I will call the stock_lookup tool.",
          "🛠️ [Tool Executed]: stock_lookup(ticker='AAPL') ➔ Returns $195.40.",
          "💭 [Agent Thought]: The price is $195.40. This is below the limit of $200. Now I need to trigger the alert tool.",
          "🛠️ [Tool Executed]: send_email(to='boss@company.com', subject='Alert: AAPL Stock', body='Current price is $195.40.') ➔ Status: 200 OK.",
          "💭 [Agent Thought]: Stock price fetched and email alert dispatched. Task complete.",
          "✅ [Final Output]: 'Completed: AAPL stock was fetched ($195.40) and email notification alert successfully dispatched to boss@company.com.'"
        ]
      },
      news_digest: {
        task: "Find 3 latest articles on 'TypeScript 5.0', summarize, and save summary to database.",
        llm: [
          "💭 [LLM Thought]: Search recent articles and save to database.",
          "❌ [LLM Action]: FAILED. Output: 'I do not have access to live web browsing or active database systems to fetch or store records.'"
        ],
        genai: [
          "💭 [GenAI Thought]: Execute static Google Custom Search API.",
          "⚙️ [Pipeline Trigger]: Retrieve query search records ➔ Returns 3 text snippets.",
          "📝 [Generation Output]: 'Here is a list of recent TypeScript 5.0 updates gathered from search results: [List items].'",
          "❌ [Pipeline Limitation]: FAILED. Cannot write to target database stores or handle write connection protocols."
        ],
        agentic: [
          "💭 [Agent Thought]: I need to retrieve web records. I will call web_search(query='TypeScript 5.0 updates').",
          "🛠️ [Tool Executed]: web_search(...) ➔ Returns 3 articles text.",
          "💭 [Agent Thought]: I have the texts. Let me summarize them. Summarized successfully. Now I will write the summaries database record.",
          "🛠️ [Tool Executed]: db_insert(table='tech_news', content='TS 5.0 summary...') ➔ Returns row_id: 412.",
          "💭 [Agent Thought]: Search complete, summarized, and saved row 412. Task complete.",
          "✅ [Final Output]: 'Completed: Web search executed, summaries compiled, and records successfully saved under row_id 412.'"
        ]
      }
    };

    setTimeout(() => {
      setSimOutput(simulations[selectedTask]);
      setIsSimulating(false);
    }, 1000);
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-tabs selector navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSubTabChange(tab.id)}
              style={{
                background: isActive ? '#7c3aed' : 'transparent',
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
        
        {/* ── 1. LESSON OVERVIEW ───────────────────────────────────────── */}
        {activeSubTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 1 • DAY 1
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Introduction to Agentic AI
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to transition from static text calculators to autonomous AI Agents that can analyze environments, plan sequences, execute software tools, and work like digital employees.
              </p>
            </div>

            {/* Core concepts grid */}
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>💡 Core Concepts We Will Cover:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                  <Bot size={28} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.8rem' }}>What is an AI Agent?</strong>
                <div style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  An <strong>AI Agent</strong> is an autonomous software worker:
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>🎯 <strong>Goal-Driven:</strong> You give it a final target (e.g. "schedule a meet"), and it works out the steps.</li>
                    <li>🛠️ <strong>Tool Access:</strong> It can call external APIs, fetch web content, or run code script processes.</li>
                    <li>🔄 <strong>Self-Correction:</strong> It runs loops, inspects tool outputs, and adjusts plans if errors happen.</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                  <Layers size={28} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.8rem' }}>Why is Agentic AI Needed?</strong>
                <div style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  Standard LLM models are static brains with limitations:
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>🚫 <strong>No Action Power:</strong> They can talk about actions, but cannot click buttons or run programs.</li>
                    <li>🔒 <strong>Outdated Info:</strong> They cannot fetch live database values or search real-time news sources.</li>
                    <li>🔗 <strong>The Bridge:</strong> Agentic AI connects the model brain to active APIs to execute actual workflows.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('comparison')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Compare LLMs vs GenAI vs Agents <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. SYSTEM COMPARISON ────────────────────────────────────── */}
        {activeSubTab === 'comparison' && (
          <motion.div key="comparison" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚔️ Conceptual Differences</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>How does Agentic AI differ from standard large language models and Generative AI pipelines?</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Box 1: LLM */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#e2e8f0', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Brain size={24} color="#475569" />
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>1. LLMs (The Brain)</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>🧠 <strong>Static Predictors:</strong> Generates text answers using only memorized training data.</li>
                      <li>🚫 <strong>No Action Power:</strong> Cannot search live search engines or trigger API alerts.</li>
                      <li>🔒 <strong>No System Access:</strong> Cannot read project files or local variables.</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block', background: '#e2e8f0', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  STATIC RESPONSE ONLY
                </span>
              </div>

              {/* Box 2: Gen AI */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#e0f2fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Layers size={24} color="#0284c7" />
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>2. Generative AI (RAG)</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>⛓️ <strong>Rigid Pipeline:</strong> Follows a fixed order (Search database ➔ Paste matches ➔ Generate response).</li>
                      <li>📂 <strong>Connected Data:</strong> Connects search modules to feed custom files context to LLM.</li>
                      <li>🚫 <strong>No Decision-Making:</strong> Cannot dynamically adjust plans if initial query steps fail.</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#0284c7', display: 'block', background: '#e0f2fe', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  FIXED PIPELINE MATCH
                </span>
              </div>

              {/* Box 3: Agentic AI */}
              <div style={{ background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Bot size={24} color="#7c3aed" />
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>3. Agentic AI (Workers)</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>🔄 <strong>Reasoning Loops:</strong> Thinks (ReAct), takes actions, checks outcomes, and retries.</li>
                      <li>🛠️ <strong>Flexible Tool Use:</strong> Chooses which API tool (email, code runtime) to use.</li>
                      <li>⚡ <strong>Error Recovery:</strong> Self-corrects runtime script exceptions autonomously.</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#7c3aed', display: 'block', background: '#ede9fe', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  AUTONOMOUS ITERATIVE LOOP
                </span>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('simulator')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Launch Loop Simulator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SIMULATOR PLAYGROUND ──────────────────────────────────── */}
        {activeSubTab === 'simulator' && (
          <motion.div key="simulator" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Reasoning Loop Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Choose a multi-step task and trigger executions logs to see the loop comparison differences:</p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Select Target Task:</strong>
                <select
                  value={selectedTask}
                  onChange={(e) => { setSelectedTask(e.target.value); setSimOutput(null); }}
                  style={{ padding: '0.6rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="stock_alert">Task 1: Stock Limit Alert & Email Dispatch</option>
                  <option value="news_digest">Task 2: Web Search, Summarize & DB Row Save</option>
                </select>
                
                <button
                  onClick={runComparisonSim}
                  disabled={isSimulating}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isSimulating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                  Run Comparison
                </button>
              </div>

              {simOutput && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem' }}>
                  
                  {/* LLM Block */}
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>1. LLM ONLY</span>
                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', minHeight: '220px', border: '1px solid #1e293b' }}>
                      {simOutput.llm.map((line, i) => (
                        <div key={i} style={{ color: line.startsWith('❌') ? '#ef4444' : '#94a3b8', fontSize: '0.82rem', fontFamily: 'monospace', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GenAI Pipeline Block */}
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>2. GenAI PIPELINE (RAG)</span>
                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', minHeight: '220px', border: '1px solid #1e293b' }}>
                      {simOutput.genai.map((line, i) => (
                        <div key={i} style={{ color: line.startsWith('❌') ? '#ef4444' : line.startsWith('⚙️') ? '#38bdf8' : '#94a3b8', fontSize: '0.82rem', fontFamily: 'monospace', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agentic AI loop Block */}
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>3. AGENTIC AI (ReAct Loop)</span>
                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', minHeight: '220px', border: '1px solid #7c3aed' }}>
                      {simOutput.agentic.map((line, i) => {
                        let color = '#94a3b8';
                        if (line.startsWith('✅')) color = '#10b981';
                        else if (line.startsWith('🛠️')) color = '#a7f3d0';
                        return (
                          <div key={i} style={{ color: color, fontSize: '0.82rem', fontFamily: 'monospace', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('comparison')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Comparison
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeSubTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={22} style={{ color: '#7c3aed' }} />
                Day 1 Assignment: Designing Your First Smart Agent Loop
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>The Scenario:</strong> You want to build a simple "Smart Travel Weather Agent" that solves this goal:
                <br />
                <em>"Check if it will rain in London tomorrow. If it will rain, book a ticket for an indoor museum tour. If it will not rain, book a ticket for an outdoor walking city tour."</em>
                <br /><br />
                As an Agent designer, your task is to break down how this agent will think and act.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>✍️ Write down:</span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>1. What is the final **Goal** of the agent?</li>
                  <li>2. Which **Tools** (e.g. Weather API, Ticket Booking API) does it need to use?</li>
                  <li>3. Write the step-by-step loop: What does the agent think, what action tool does it call, and what does it do next after seeing the tool outcome?</li>
                </ul>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your step-by-step agent loop design here..."
                style={{ width: '100%', height: '140px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                disabled={!assignmentText.trim() || assignmentSubmitted}
                style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✅ Assignment Submitted Successfully' : 'Submit Assignment'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('simulator')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Simulator
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 1 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeSubTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 1 Knowledge Quiz</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((question, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  return (
                    <div key={qIdx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>
                        Q{qIdx + 1}: {question.q}
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {question.opts.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          let bg = '#f8fafc';
                          let border = '1px solid #cbd5e1';
                          let textColor = '#475569';

                          if (quizSubmitted) {
                            if (oIdx === question.ans) {
                              bg = '#ecfdf5';
                              border = '1px solid #10b981';
                              textColor = '#166534';
                            } else if (isSelected) {
                              bg = '#fef2f2';
                              border = '1px solid #ef4444';
                              textColor = '#991b1b';
                            }
                          } else if (isSelected) {
                            bg = '#f5f3ff';
                            border = '1px solid #7c3aed';
                            textColor = '#7c3aed';
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              style={{
                                background: bg,
                                border: border,
                                color: textColor,
                                padding: '0.85rem 1.1rem',
                                borderRadius: '8px',
                                cursor: quizSubmitted ? 'default' : 'pointer',
                                fontSize: '0.98rem',
                                fontWeight: isSelected ? 700 : 500,
                                transition: 'all 0.1s'
                              }}
                            >
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '2rem',
                    fontSize: '1rem'
                  }}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <div style={{ marginTop: '2rem', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#4c1d95', display: 'block', marginBottom: '0.4rem' }}>
                    Quiz Score: {quizScore} / {QUIZ_QUESTIONS.length}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#6d28d9' }}>
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered Day 1 Agentic foundations!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Assignment
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('dashboard')}
                style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
