import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, 
  Cpu, Database, Award, Clipboard, Code, HelpCircle, Terminal, RefreshCw, Zap, Sliders
} from 'lucide-react';

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
  { id: 'architecture', label: '🏗️ Tool Architecture' },
  { id: 'guide', label: '🛠️ Code Implementation' },
  { id: 'simulator', label: '💻 Live Agent Workspace' },
  { id: 'submission', label: '🚀 Project Submission' }
];

const PRESET_TASKS = [
  {
    id: 'weather_crypto',
    label: 'Tokyo Weather + Bitcoin Price',
    prompt: 'Check the current temperature in Tokyo and fetch the latest Bitcoin price in USD. Formulate an investment briefing.',
    tools: ['get_current_weather', 'get_crypto_price'],
    steps: [
      { type: 'thought', text: 'User wants Tokyo temperature and Bitcoin USD price. I need to call get_current_weather for Tokyo and get_crypto_price for bitcoin.' },
      { type: 'tool_call', tool: 'get_current_weather', args: { location: 'Tokyo', lat: 35.6762, lon: 139.6503 } },
      { type: 'tool_result', result: { temp_c: 18.4, condition: 'Clear Sky', humidity: 55 } },
      { type: 'thought', text: 'Weather obtained (18.4°C). Now calling get_crypto_price for bitcoin.' },
      { type: 'tool_call', tool: 'get_crypto_price', args: { coin_id: 'bitcoin', currency: 'usd' } },
      { type: 'tool_result', result: { coin: 'bitcoin', price_usd: 88450.00, change_24h: '+3.4%' } },
      { type: 'final', text: 'Tokyo is currently enjoying clear skies at 18.4°C. Meanwhile, Bitcoin is trading strongly at $88,450 USD (+3.4% in the last 24h). All conditions nominal for cross-border operations.' }
    ]
  },
  {
    id: 'london_audit',
    label: 'London Weather + Ethereum Valuation',
    prompt: 'Check if it is raining in London and verify current Ethereum price.',
    tools: ['get_current_weather', 'get_crypto_price'],
    steps: [
      { type: 'thought', text: 'I need to check London rain status and Ethereum price.' },
      { type: 'tool_call', tool: 'get_current_weather', args: { location: 'London', lat: 51.5074, lon: -0.1278 } },
      { type: 'tool_result', result: { temp_c: 11.2, condition: 'Light Drizzle', humidity: 82 } },
      { type: 'tool_call', tool: 'get_crypto_price', args: { coin_id: 'ethereum', currency: 'usd' } },
      { type: 'tool_result', result: { coin: 'ethereum', price_usd: 3120.50, change_24h: '-1.1%' } },
      { type: 'final', text: 'London is currently experiencing light drizzle at 11.2°C with high humidity (82%). Ethereum is trading at $3,120.50 USD (-1.1% over 24h).' }
    ]
  },
  {
    id: 'budget_calc',
    label: 'Solana Price + ROI Calculator',
    prompt: 'Fetch Solana price and calculate purchasing power for a $5,000 budget.',
    tools: ['get_crypto_price', 'math_calculator'],
    steps: [
      { type: 'thought', text: 'First query Solana price, then calculate total tokens for $5,000 budget.' },
      { type: 'tool_call', tool: 'get_crypto_price', args: { coin_id: 'solana', currency: 'usd' } },
      { type: 'tool_result', result: { coin: 'solana', price_usd: 195.00, change_24h: '+5.8%' } },
      { type: 'tool_call', tool: 'math_calculator', args: { expression: '5000 / 195.00' } },
      { type: 'tool_result', result: { computation: '5000 / 195.00', value: 25.641 } },
      { type: 'final', text: 'Solana is trading at $195.00 USD (+5.8%). With a budget of $5,000 USD, the client can acquire approximately 25.64 SOL tokens.' }
    ]
  }
];

export default function AgenticAIModule2Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPreset, setSelectedPreset] = useState('weather_crypto');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);
  const [copied, setCopied] = useState(false);

  // Submission State
  const [studentNotes, setStudentNotes] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunSimulator = () => {
    setIsSimulating(true);
    setSimLogs([]);
    setSimStep(0);

    const preset = PRESET_TASKS.find(p => p.id === selectedPreset) || PRESET_TASKS[0];
    const steps = preset.steps;

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        setSimStep(idx + 1);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const sampleToolCode = `import json
import requests
from openai import OpenAI

client = OpenAI()

# 1. Define Tool Schemas
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Fetch current live temperature and weather condition for a coordinates location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "lat": {"type": "number"},
                    "lon": {"type": "number"}
                },
                "required": ["location", "lat", "lon"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_crypto_price",
            "description": "Get real-time cryptocurrency price from public market APIs",
            "parameters": {
                "type": "object",
                "properties": {
                    "coin_id": {"type": "string", "enum": ["bitcoin", "ethereum", "solana"]},
                    "currency": {"type": "string", "default": "usd"}
                },
                "required": ["coin_id"]
            }
        }
    }
]

# 2. Agent Execution Loop with Tool Calling
messages = [
    {"role": "system", "content": "You are an autonomous intelligence agent with real-time tool calling capability."},
    {"role": "user", "content": "What is the temperature in Tokyo and current Bitcoin price?"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)

# Inspect tool calls
tool_calls = response.choices[0].message.tool_calls
print("Agent decided to call tools:", [tc.function.name for tc in tool_calls])`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleToolCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-tabs selector */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              style={{
                background: isActive ? '#7c3aed' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.98rem',
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

        {/* ── 1. PROJECT SPEC ────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.18)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 700, color: '#f3e8ff', marginBottom: '1.2rem' }}>
                <Trophy size={15} color="#fef08a" /> MODULE 2 CAPSTONE PROJECT
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Final Project: Real-Time Multi-Tool AI Agent Workspace
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.15rem', lineHeight: 1.7, margin: 0, maxWidth: '850px' }}>
                Build and deploy an autonomous AI Agent that receives unstructured natural language instructions, reasons through required operations, calls external REST APIs via function calling, and formats guaranteed structured JSON responses.
              </p>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>🎯 Project Deliverables & Objectives</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '0.8rem' }}>
                  <Zap size={24} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>1. Multi-Tool Function Schemas</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Define JSON Schema parameter definitions for live external tools: Open-Meteo Weather API, CoinGecko Crypto Market API, and a custom Arithmetic/Unit Engine.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '0.8rem' }}>
                  <RefreshCw size={24} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>2. Autonomous Tool Calling Loop</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Implement the full ReAct loop: Model Reason → Function Call Decision → Live Tool Execution → Output Injection → Final Answer Synthesis.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '0.8rem' }}>
                  <Sliders size={24} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>3. Structured Output Guarantee</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Ensure responses adhere to Pydantic or JSON Schema specifications with strict validation for automated ingestion into downstream services.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '0.8rem' }}>
                  <ShieldCheck size={24} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>4. Error Handling & Self-Correction</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Implement fallback logic when an API times out or returns bad data, allowing the agent to self-heal and explain the failure cleanly.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("How does function calling work under the hood in modern LLMs?")}>Ask AI Tutor: Function Calling</button>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.75rem 1.5rem', fontWeight: 700 }}>
                View Tool Architecture <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. ARCHITECTURE ────────────────────────────────────────────── */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ Architecture: The Autonomous Tool Calling Loop</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>How user queries flow through the Agent reasoning loop, tool execution, and structured generation.</p>

            <div style={{ background: '#0f172a', color: 'white', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.95rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                  <strong>[1. Human Input]</strong> "Check Tokyo temperature and current Bitcoin price."
                </div>
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>↓ sends input + tool JSON schemas</div>
                <div style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #a855f7' }}>
                  <strong>[2. Agent Reasoning Brain]</strong> Thought: "I need to call get_current_weather for Tokyo and get_crypto_price for bitcoin."
                </div>
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>↓ emits tool_calls array</div>
                <div style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                  <strong>[3. Tool Executor Gateway]</strong> Calls Open-Meteo REST API (lat:35.67, lon:139.65) & CoinGecko API (ids:bitcoin)
                </div>
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>↓ returns raw API responses into conversation history</div>
                <div style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                  <strong>[4. Final Synthesis & Schema Validation]</strong> Generates friendly response + validated JSON payload.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')}>Back to Overview</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.75rem 1.5rem', fontWeight: 700 }}>
                Implementation Guide <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. CODE IMPLEMENTATION ──────────────────────────────────────── */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>🛠️ Code Implementation Guide</h2>
                <p style={{ color: '#64748b', fontSize: '0.98rem', margin: '0.3rem 0 0' }}>Production-grade Python script implementing multi-tool function calling.</p>
              </div>
              <button
                onClick={copyCode}
                style={{ background: copied ? '#10b981' : '#7c3aed', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Clipboard size={16} /> {copied ? 'Copied to Clipboard!' : 'Copy Python Code'}
              </button>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem' }}>
              <pre style={{ margin: 0, padding: '1.8rem', color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
                <code>{sampleToolCode}</code>
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>Back to Architecture</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.75rem 1.5rem', fontWeight: 700 }}>
                Try Live Agent Simulator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. LIVE AGENT SIMULATOR ─────────────────────────────────────── */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={22} color="#7c3aed" /> Live Multi-Tool Agent Simulator
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.96rem', marginBottom: '1.5rem' }}>
                Select a user scenario below and run the agent. Watch how the agent autonomously determines required tools, executes them, and formats the response.
              </p>

              {/* Preset Selector */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {PRESET_TASKS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => { setSelectedPreset(preset.id); setSimLogs([]); setSimStep(0); }}
                    style={{
                      background: selectedPreset === preset.id ? '#ede9fe' : '#f8fafc',
                      color: selectedPreset === preset.id ? '#7c3aed' : '#475569',
                      border: `1.5px solid ${selectedPreset === preset.id ? '#7c3aed' : '#cbd5e1'}`,
                      padding: '0.6rem 1.1rem',
                      borderRadius: '8px',
                      fontWeight: selectedPreset === preset.id ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.92rem'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Task Details */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '4px solid #7c3aed', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#7c3aed', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>Selected Goal:</span>
                <p style={{ margin: 0, color: '#0f172a', fontSize: '1rem', fontWeight: 600 }}>
                  "{PRESET_TASKS.find(p => p.id === selectedPreset)?.prompt}"
                </p>
              </div>

              <button
                onClick={handleRunSimulator}
                disabled={isSimulating}
                style={{
                  background: isSimulating ? '#94a3b8' : '#7c3aed',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: isSimulating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Play size={18} /> {isSimulating ? 'Agent is Executing Tools...' : 'Run Agent Execution Loop'}
              </button>
            </div>

            {/* Execution Trace Terminal */}
            <div style={{ background: '#0f172a', color: '#f8fafc', borderRadius: '20px', padding: '2rem', fontFamily: 'monospace', minHeight: '300px', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '8px' }}>agent_trace_output.log</span>
              </div>

              {simLogs.length === 0 && !isSimulating && (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '3rem 0' }}>
                  Click "Run Agent Execution Loop" above to trigger autonomous tool calls.
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {simLogs.map((log, lIdx) => {
                  if (log.type === 'thought') {
                    return (
                      <div key={lIdx} style={{ color: '#c084fc', borderLeft: '3px solid #c084fc', paddingLeft: '1rem' }}>
                        <strong>💭 [AGENT THOUGHT]:</strong> {log.text}
                      </div>
                    );
                  }
                  if (log.type === 'tool_call') {
                    return (
                      <div key={lIdx} style={{ color: '#38bdf8', borderLeft: '3px solid #38bdf8', paddingLeft: '1rem' }}>
                        <strong>⚡ [TOOL CALL DISPATCHED]:</strong> <code>{log.tool}({JSON.stringify(log.args)})</code>
                      </div>
                    );
                  }
                  if (log.type === 'tool_result') {
                    return (
                      <div key={lIdx} style={{ color: '#fde047', borderLeft: '3px solid #fde047', paddingLeft: '1rem', background: '#1e293b', padding: '0.6rem 1rem', borderRadius: '6px' }}>
                        <strong>📥 [OBSERVATION RECEIVED]:</strong>
                        <pre style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#fef08a' }}>{JSON.stringify(log.result, null, 2)}</pre>
                      </div>
                    );
                  }
                  if (log.type === 'final') {
                    return (
                      <div key={lIdx} style={{ color: '#86efac', borderLeft: '3px solid #86efac', paddingLeft: '1rem', background: 'rgba(34,197,94,0.1)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                        <strong style={{ color: '#4ade80' }}>✅ [FINAL SYNTHESIZED RESPONSE]:</strong>
                        <p style={{ margin: '0.5rem 0 0', color: '#f0fdf4', lineHeight: 1.6 }}>{log.text}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')}>Back to Guide</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.75rem 1.5rem', fontWeight: 700 }}>
                Proceed to Project Submission <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. PROJECT SUBMISSION ───────────────────────────────────────── */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={24} color="#7c3aed" /> Submit Your Module 2 Final Capstone
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '2rem' }}>
                Submit your GitHub repository link or code notes for staff evaluation and badge certification.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    GitHub Repository / Colab Notebook URL:
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/your-username/agentic-ai-tool-calling-workspace"
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    Implementation Notes / Tool Definitions Summary:
                  </label>
                  <textarea
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="Explain which tools you implemented, how schema validation was achieved, and your error fallback strategy..."
                    style={{ width: '100%', height: '120px', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  disabled={(!githubUrl && !studentNotes) || submitted}
                  style={{
                    background: submitted ? '#10b981' : '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.9rem 2rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: submitted ? 'default' : 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  {submitted ? '✅ Project Submitted for Staff Evaluation!' : 'Submit Module 2 Capstone'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => onNavigate && onNavigate('agentic_ai_module2', 'day10')}>
                ← Back to Day 10
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline" onClick={() => onNavigate && onNavigate('dashboard')}>
                  Return to Dashboard
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate && onNavigate('agentic_ai_module3', 'day11')}
                  style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.75rem 1.6rem', fontWeight: 700 }}
                >
                  Proceed to Module 3 (n8n AI Automation) →
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
