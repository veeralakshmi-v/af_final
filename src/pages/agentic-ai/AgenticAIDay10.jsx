import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Trophy, Terminal, CheckCircle, 
  RefreshCw, Bot, Sliders, Shield, Play, Settings, Code, Layers 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Project Overview' },
  { id: 'blueprint', label: '🏗️ Step-by-Step Code Guide' },
  { id: 'sandbox', label: '💻 Real-Time Agent Builder' },
  { id: 'assignment', label: '📝 Code Submission' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const TARGETS = {
  weather: {
    name: 'Weather Advisor Agent ☀️',
    endpoint: 'https://api.open-meteo.com/v1/forecast',
    options: [
      { id: 'tokyo', label: 'Tokyo 🇯🇵', query: '?latitude=35.67&longitude=139.65&current=temperature_2m' },
      { id: 'london', label: 'London 🇬🇧', query: '?latitude=51.50&longitude=-0.12&current=temperature_2m' },
      { id: 'newyork', label: 'New York 🇺🇸', query: '?latitude=40.71&longitude=-74.00&current=temperature_2m' }
    ]
  },
  crypto: {
    name: 'Crypto Tracker Agent 🪙',
    endpoint: 'https://api.coingecko.com/api/v3/simple/price',
    options: [
      { id: 'bitcoin', label: 'Bitcoin (BTC) ₿', query: '?ids=bitcoin&vs_currencies=usd' },
      { id: 'ethereum', label: 'Ethereum (ETH) ♦', query: '?ids=ethereum&vs_currencies=usd' },
      { id: 'solana', label: 'Solana (SOL) ☀️', query: '?ids=solana&vs_currencies=usd' }
    ]
  }
};

const QUIZ_QUESTIONS = [
  {
    q: 'What is the main goal of the Day 10 Capstone Project?',
    opts: [
      'To build a real-time information agent that queries live APIs, validates the output JSON data, and formats a friendly user advisory.',
      'To compile SQL database schemas into static HTML files.',
      'To set up password logins for external servers.'
    ],
    ans: 0
  },
  {
    q: 'What role does Pydantic play in this real-time agent workflow?',
    opts: [
      'It acts as a validation gatekeeper, checking that the values returned from the live API are correct and contain the right fields.',
      'It makes the browser load styles faster.',
      'It sends automated emails directly to the client.'
    ],
    ans: 0
  },
  {
    q: 'Why do we use native fetch() inside the host application instead of letting the AI call the website directly?',
    opts: [
      'Because AI models cannot execute net queries or run HTTP requests directly; they only output formatting templates.',
      'To reduce database hosting costs.',
      'To encrypt private user files.'
    ],
    ans: 0
  },
  {
    q: 'What does a "Validation Error" in Pydantic tell the developer?',
    opts: [
      'That the AI output JSON is missing required fields or has wrong data types, meaning it must be repaired.',
      'That the local internet speed is too slow.',
      'That the styling classes are not aligned.'
    ],
    ans: 0
  },
  {
    q: 'Which component coordinates the entire real-time agent cycle?',
    opts: [
      'The host application code, which manages the input, fetches the API data, runs the validators, and forwards context to the AI.',
      'The static CSS layout guidelines.',
      'The database index optimizer.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay10({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Builder States
  const [agentType, setAgentType] = useState('weather'); // 'weather' or 'crypto'
  const [selectedParam, setSelectedParam] = useState('tokyo');
  const [isDeployed, setIsDeployed] = useState(false);
  
  // Custom Rules
  const [ruleStrict, setRuleStrict] = useState(true);
  const [ruleTone, setRuleTone] = useState(true);

  // Simulation execution logs
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [liveJson, setLiveJson] = useState(null);
  const [agentOutput, setAgentOutput] = useState('');

  // Form Submissions
  const [codeSubmission, setCodeSubmission] = useState('');
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Sync default parameter when agent type changes
  const handleAgentTypeChange = (type) => {
    setAgentType(type);
    setSelectedParam(type === 'weather' ? 'tokyo' : 'bitcoin');
    setIsDeployed(false);
    setLiveJson(null);
    setAgentOutput('');
    setSimLogs([]);
  };

  const deployAgent = () => {
    setIsDeployed(true);
    setSimLogs([`📡 Deploying ${TARGETS[agentType].name} project workspace...`, `🟢 Deploy successful. Agent server is ONLINE.`]);
  };

  const runAgentQuery = async () => {
    setIsRunning(true);
    setSimLogs([`🧠 Agent: Goal received. Starting workflow loop...`]);
    setLiveJson(null);
    setAgentOutput('');

    const targetConfig = TARGETS[agentType];
    const parameterConfig = targetConfig.options.find(o => o.id === selectedParam);

    try {
      const targetUrl = `${targetConfig.endpoint}${parameterConfig.query}`;
      setSimLogs(prev => [...prev, `📡 App Wrapper: Triggering fetch request to target URL...\nGET ${targetUrl}`]);

      const response = await fetch(targetUrl);
      const data = await response.json();

      if (response.ok) {
        setLiveJson(data);
        setSimLogs(prev => [...prev, `🟢 Server Response: 200 OK (Connection Successful)`]);
        setSimLogs(prev => [...prev, `🛡️ Pydantic: Initializing model validation schema...`]);

        // Pydantic checks simulator logs
        setTimeout(() => {
          if (agentType === 'weather') {
            const temp = data.current?.temperature_2m;
            setSimLogs(prev => [
              ...prev,
              `✅ Field "temperature" validated: ${temp}°C (Type: float)`,
              `✅ Field "city" validated: "${parameterConfig.label}" (Type: string)`,
              `🎉 Validation successful! Context fed into AI model.`
            ]);

            setTimeout(() => {
              let weatherAdvice = `☀️ Travel Advisory: The temperature in ${parameterConfig.label} is currently ${temp}°C. `;
              if (ruleStrict) weatherAdvice += `All parameters verified with Pydantic validation. `;
              if (ruleTone) weatherAdvice += `Have a wonderful day!`;
              
              setAgentOutput(weatherAdvice);
              setIsRunning(false);
            }, 600);

          } else {
            // Crypto checks
            const price = data[selectedParam]?.usd;
            setSimLogs(prev => [
              ...prev,
              `✅ Field "price_usd" validated: $${price} (Type: float)`,
              `✅ Field "token_id" validated: "${selectedParam}" (Type: string)`,
              `🎉 Validation successful! Context fed into AI model.`
            ]);

            setTimeout(() => {
              let cryptoAdvice = `🪙 Market Advisory: ${parameterConfig.label} is currently trading at $${price} USD. `;
              if (ruleStrict) cryptoAdvice += `Validated secure ledger pricing. `;
              if (ruleTone) cryptoAdvice += `Trade safely and verify alerts.`;

              setAgentOutput(cryptoAdvice);
              setIsRunning(false);
            }, 600);
          }
        }, 800);

      } else {
        throw new Error('API server returned error.');
      }

    } catch (err) {
      setSimLogs(prev => [...prev, `❌ Connection Error: API failed. ${err.message}`]);
      setIsRunning(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinue = handleTabChange;

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Top Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: isActive ? '#059669' : 'transparent',
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

        {/* ── 1. PROJECT OVERVIEW ───────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Trophy size={14} color="#fef08a" /> CAPSTONE PROJECT • DAY 10
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Capstone: Build a Real-Time Agent Tool
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Bring all Module 2 concepts together. You will build and deploy a live information agent that queries real internet databases (APIs), validates structured data using Pydantic, and formats friendly travel/market advisories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What are you building?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  You will construct a complete, end-to-end AI Agent application. The agent takes a user instruction, checks dynamic options, executes a live outbound request to the target site, and runs Pydantic data validation constraints to verify fields.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  By packaging this pipeline into a clean dashboard interface, you prove how real AI tools are deployed to customers in software development.
                </p>
              </div>

              {/* Requirement Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>
                  📋 Project Requirements:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>✓ Step 1:</span>
                    <span>Set system instructions and agent persona prompts.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>✓ Step 2:</span>
                    <span>Query a live web API endpoint (Weather or Crypto).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>✓ Step 3:</span>
                    <span>Validate fields using a Pydantic Model check.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>✓ Step 4:</span>
                    <span>Display a formatted conversational answer.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('blueprint')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Project Blueprint & Code <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. BLUEPRINT & CODE GUIDE ───────────────────────────────── */}
        {activeTab === 'blueprint' && (
          <motion.div key="blueprint" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ Step-by-Step Code Guide</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Follow these simple coding steps to build the real-time agent in Python:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Step-by-step checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Step 1: Install Libraries', desc: 'Run "pip install requests pydantic openai" to get all required libraries.' },
                  { title: 'Step 2: Write Pydantic Rules', desc: 'Create a Python class extending BaseModel to list required fields (e.g. temperature, wind_speed).' },
                  { title: 'Step 3: Connect Live API Link', desc: 'Use requests.get() to fetch actual weather or crypto data from the internet.' },
                  { title: 'Step 4: Validate Data', desc: 'Load the API response dictionary into your Pydantic class to check for errors.' },
                  { title: 'Step 5: Query LLM with Data', desc: 'Insert validated numbers into your prompt instructions template, and call OpenAI to get the conversational response.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.1rem 1.3rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '6px', fontFamily: 'monospace' }}>
                      STEP {idx + 1}
                    </span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a', marginBottom: '0.1rem' }}>{item.title}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.4, display: 'block' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete Python Code File */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ color: '#059669', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COMPLETE PYTHON CODE IMPLEMENTATION
                  </strong>
                </div>

                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{`import requests
from pydantic import BaseModel, Field
from openai import OpenAI

# 1. Initialize client
client = OpenAI(api_key="your_api_key_here")

# 2. Define Pydantic Schema Rules
class WeatherData(BaseModel):
    city_name: str = Field(description="Target city")
    temp: float = Field(description="Temperature in C")
    wind: float = Field(description="Wind speed km/h")

# 3. Fetch data from live open API
def get_live_weather(lat: float, lon: float, city: str):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m"
    response = requests.get(url).json()
    
    # 4. Parse & Validate with Pydantic
    data = WeatherData(
        city_name=city,
        temp=response["current"]["temperature_2m"],
        wind=response["current"]["wind_speed_10m"]
    )
    return data

# 5. Call LLM with validated context
def run_weather_agent(city: str, lat: float, lon: float):
    weather_info = get_live_weather(lat, lon, city)
    
    prompt = f"""
    You are a helpful travel guide. Summarize the weather:
    City: {weather_info.city_name}
    Temperature: {weather_info.temp}°C
    Wind Speed: {weather_info.wind} km/h
    
    Provide simple travel tips based on temperature numbers.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    print(response.choices[0].message.content)

# Example run: Tokyo weather
run_weather_agent("Tokyo", 35.67, 139.65)
`}</pre>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Agent Builder <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE BUILDER ───────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Deploy Your Capstone Agent</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure settings, deploy the project to an online status, and query live endpoints:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Configuration panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Step 1: Settings config */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#059669' }} /> Agent Configuration
                  </h3>

                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Agent Persona:</label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleAgentTypeChange('weather')}
                        disabled={isRunning}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          borderRadius: '8px',
                          border: agentType === 'weather' ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: agentType === 'weather' ? '#ecfdf5' : 'white',
                          color: agentType === 'weather' ? '#047857' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '0.82rem'
                        }}
                      >
                        ☀️ Weather Agent
                      </button>
                      <button
                        onClick={() => handleAgentTypeChange('crypto')}
                        disabled={isRunning}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          borderRadius: '8px',
                          border: agentType === 'crypto' ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: agentType === 'crypto' ? '#ecfdf5' : 'white',
                          color: agentType === 'crypto' ? '#047857' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '0.82rem'
                        }}
                      >
                        🪙 Crypto Agent
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Select Target Parameter:</label>
                    <select
                      value={selectedParam}
                      disabled={isRunning}
                      onChange={(e) => { setSelectedParam(e.target.value); setIsDeployed(false); }}
                      style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    >
                      {TARGETS[agentType].options.map(o => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Guardrails (Toggle):</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569', cursor: 'pointer' }}>
                        <input type="checkbox" checked={ruleStrict} onChange={(e) => { setRuleStrict(e.target.checked); setIsDeployed(false); }} />
                        Enable Strict Pydantic Type Checks
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569', cursor: 'pointer' }}>
                        <input type="checkbox" checked={ruleTone} onChange={(e) => { setRuleTone(e.target.checked); setIsDeployed(false); }} />
                        Enforce Friendly Tone Constraint
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={deployAgent}
                    disabled={isDeployed}
                    style={{
                      background: isDeployed ? '#cbd5e1' : '#059669',
                      color: isDeployed ? '#64748b' : 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: isDeployed ? 'default' : 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle size={15} />
                    {isDeployed ? 'Agent Workspace Deployed' : 'Deploy Live Agent Project'}
                  </button>
                </div>

              </div>

              {/* Console & Debugger screen */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#059669' }} /> AGENT SERVER MONITOR
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isDeployed ? '#064e3b' : '#1e293b', color: isDeployed ? '#34d399' : '#94a3b8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ PROCESSING' : isDeployed ? '🟢 SERVER ONLINE' : '■ OFFLINE'}
                    </span>
                  </div>

                  {/* Logs stream */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure settings and deploy the agent workspace to get started...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('🧠')) color = '#fcd34d';
                      if (log.includes('✅') || log.includes('🟢') || log.includes('successful') || log.includes('Success')) color = '#34d399';
                      if (log.includes('❌')) color = '#f87171';
                      if (log.includes('🛡️') || log.includes('Pydantic')) color = '#60a5fa';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Raw response payload */}
                {liveJson && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
                      RAW API GET RESPONSE BODY (LIVE INTERNET DATA)
                    </span>
                    <pre style={{ margin: 0, fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace', maxHeight: '100px', overflowY: 'auto' }}>
                      {JSON.stringify(liveJson, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Final advice statement */}
                {agentOutput && (
                  <div style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, boxSizing: 'border-box' }}>
                    <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>💬 DEPLOYED AGENT ADVISORY OUTPUT:</strong>
                    {agentOutput}
                  </div>
                )}

                {/* Execute query */}
                <button
                  onClick={runAgentQuery}
                  disabled={!isDeployed || isRunning}
                  style={{
                    background: isDeployed ? '#059669' : '#1e293b',
                    color: isDeployed ? 'white' : '#475569',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: isDeployed ? 'pointer' : 'default',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Play size={14} />
                  Run Live Agent Pipeline
                </button>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('blueprint')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Blueprint
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Submit Project Code <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. CODE SUBMISSION ───────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={22} style={{ color: '#059669' }} />
                Submit Day 10 Capstone Code
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Task:</strong> Paste the complete Python script for your Real-Time Agent below. 
                <br />
                Your script should declare a Pydantic Model schema, define a function to query an external weather or stock API endpoint, validate the JSON return dictionary variables, and pass them to your system prompt template instructions.
              </p>

              <textarea
                value={codeSubmission}
                onChange={(e) => setCodeSubmission(e.target.value)}
                placeholder={`# Day 10 Real-Time Agent Capstone Script\nfrom pydantic import BaseModel, Field\nimport requests\n\nclass LiveAgentSchema(BaseModel):\n  ...\n\n# Query live endpoint and validation checks here...`}
                style={{ width: '100%', height: '220px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setSubmissionCompleted(true)}
                disabled={!codeSubmission.trim() || submissionCompleted}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {submissionCompleted ? '✅ Capstone Project Submitted Successfully' : 'Submit Project Code'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Builder
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 10 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 10 Assessment Quiz</h2>
              
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
                            bg = '#ecfdf5';
                            border = '1px solid #059669';
                            textColor = '#059669';
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
                    background: '#059669',
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
                <div style={{ marginTop: '2rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#065f46', display: 'block', marginBottom: '0.4rem' }}>
                    Quiz Score: {quizScore} / {QUIZ_QUESTIONS.length}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#047857' }}>
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have successfully completed Module 2 capstone project!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Submission
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
