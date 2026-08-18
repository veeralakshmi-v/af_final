import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Layers, CheckCircle, Bot, 
  Shield, Terminal, RefreshCw, Cpu 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'integration', label: '🔬 Live Integration Pipeline' },
  { id: 'sandbox', label: '💻 Real-Time API Connector' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const CITIES = {
  tokyo: { name: 'Tokyo 🇯🇵', lat: 35.6762, lon: 139.6503 },
  london: { name: 'London 🇬🇧', lat: 51.5074, lon: -0.1278 },
  newyork: { name: 'New York 🇺🇸', lat: 40.7128, lon: -74.0060 },
  sydney: { name: 'Sydney 🇦🇺', lat: -33.8688, lon: 151.2093 },
  paris: { name: 'Paris 🇫🇷', lat: 48.8566, lon: 2.3522 },
  berlin: { name: 'Berlin 🇩🇪', lat: 52.5200, lon: 13.4050 }
};

const QUIZ_QUESTIONS = [
  {
    q: 'Why do AI agents connect with live internet APIs?',
    opts: [
      'To fetch real-time, current data (like today\'s weather or live prices) instead of relying on old training data.',
      'To speed up the computer\'s graphics processor.',
      'To change the layout style of the HTML page buttons.'
    ],
    ans: 0
  },
  {
    q: 'What is the browser "fetch()" command used for in simple terms?',
    opts: [
      'It is like sending a messenger to a website to request and bring back information in real-time.',
      'It prints text directly to a paper printer.',
      'It stops the AI from running to save battery.'
    ],
    ans: 0
  },
  {
    q: 'How does an agent specify coordinates (latitude and longitude) to a weather API?',
    opts: [
      'By appending them as simple query variables at the end of the URL link (e.g. ?latitude=35.6&longitude=139.6).',
      'By typing them out in the chatbot search box.',
      'By encrypting them inside the CSS stylesheet.'
    ],
    ans: 0
  },
  {
    q: 'What is a JSON response payload in simple terms?',
    opts: [
      'The raw structured response data returned by the website server, containing keys and values (like temperature: 15).',
      'An error message that displays when the computer crashes.',
      'A design style used to color headers.'
    ],
    ans: 0
  },
  {
    q: 'Why is it important for the AI to check the response status (like seeing "200 OK")?',
    opts: [
      'To confirm that the website responded successfully before the AI tries to read the data.',
      'To unlock security features on the local computer.',
      'To clean up cache memory logs.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay8({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [selectedCity, setSelectedCity] = useState('tokyo');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [liveJson, setLiveJson] = useState(null);
  const [agentDecision, setAgentDecision] = useState('');
  const [fetchLatency, setFetchLatency] = useState(0);

  // Quiz & Assignment States
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const triggerLiveApiFetch = async () => {
    setIsRunningSim(true);
    setSimLogs([]);
    setLiveJson(null);
    setAgentDecision('');

    const cityData = CITIES[selectedCity];
    const startTime = performance.now();

    setSimLogs(prev => [...prev, `🧠 AI Thought: The user wants to check the weather in ${cityData.name}.`]);
    setSimLogs(prev => [...prev, `🛠️ Action: Getting coordinate parameters (latitude=${cityData.lat}, longitude=${cityData.lon}).`]);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      setSimLogs(prev => [...prev, `📡 App: Sending request to weather website...\nGET ${url}`]);

      const response = await fetch(url);
      const data = await response.json();
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      setFetchLatency(latency);

      if (response.ok) {
        setLiveJson(data);
        setSimLogs(prev => [...prev, `🟢 Server Response: 200 OK (Connection Successful! Speed: ${latency}ms)`]);
        setSimLogs(prev => [...prev, `🧠 AI Thought: Reading weather details from the website answer...`]);

        const temp = data.current?.temperature_2m;
        const humidity = data.current?.relative_humidity_2m;
        const wind = data.current?.wind_speed_10m;

        setSimLogs(prev => [...prev, `📊 Data Received: Temp is ${temp}°C, Humidity is ${humidity}%, Wind Speed is ${wind} km/h.`]);

        // Evaluate dynamic recommendations based on real live data!
        let recommendation = '';
        if (temp < 10) {
          recommendation = `🧥 Cold Weather Advice: It is currently ${temp}°C in ${cityData.name}. I recommend wearing a thick winter coat, gloves, and a warm scarf today.`;
        } else if (temp >= 10 && temp < 20) {
          recommendation = `🧥 Cool Weather Advice: It is currently ${temp}°C in ${cityData.name}. A comfortable sweater or light jacket should be fine.`;
        } else if (temp >= 20 && temp < 30) {
          recommendation = `👕 Warm Weather Advice: It is currently ${temp}°C in ${cityData.name}. Pleasant conditions! Light t-shirt and pants are suitable.`;
        } else {
          recommendation = `☀️ Hot Weather Advice: It is currently ${temp}°C in ${cityData.name}. Hot conditions! Stay hydrated, wear light clothing, and seek shade.`;
        }

        setTimeout(() => {
          setSimLogs(prev => [...prev, `🧠 AI Thought: Writing final recommendation summary for the user...`]);
          setTimeout(() => {
            setAgentDecision(recommendation);
            setIsRunningSim(false);
          }, 600);
        }, 600);

      } else {
        throw new Error('Website server returned an error.');
      }

    } catch (err) {
      setSimLogs(prev => [...prev, `❌ Error: Could not connect to weather website. ${err.message}`]);
      setIsRunningSim(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-Tabs Selector navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: isActive ? '#6366f1' : 'transparent',
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
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(99,102,241,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 2 • DAY 8
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Connecting Agents with Live APIs
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to connect your AI assistant to the live internet. Get real-time data, parse the response, and make smart decisions.
              </p>
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  Why Connect to Live Data?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  Static AI models cannot tell you today\'s weather or what is happening in the world right now because their training has a cutoff date.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  By connecting the AI to a **Live API** (a messenger that fetches data from websites), the assistant can check real-world information. 
                  The response data is read by the AI, allowing it to give you factual, accurate, and up-to-date answers instead of making things up.
                </p>
              </div>

              {/* Info Box */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} style={{ color: '#6366f1' }} /> Live Connection Steps:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>⚡ Live Info:</span>
                    <span>Get today\'s weather, stock prices, or server logs instantly.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>🔒 Grounded Facts:</span>
                    <span>AI answers based on real database records instead of guessing.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>⚙️ Smart Checks:</span>
                    <span>AI checks if the website request worked before summarizing the results.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('integration')} style={{ background: '#6366f1', borderColor: '#6366f1', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Integration Pipeline <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. INTEGRATION PIPELINE ─────────────────────────────────── */}
        {activeTab === 'integration' && (
          <motion.div key="integration" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔬 Live HTTP Connection Pipeline</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>See how the AI requests info from public websites using Javascript `fetch()` commands:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Detailed Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[
                  { title: '1. Read Request', desc: 'AI reads your question: "What is the temp in Berlin?" and extracts the city.' },
                  { title: '2. Build Web Link', desc: 'Appends latitude & longitude to the weather website URL: ?latitude=52.5&longitude=13.4.' },
                  { title: '3. Fetch Live Data', desc: 'Runs the browser fetch() command to contact the external weather server.' },
                  { title: '4. Read Response', desc: 'Reads the website\'s response note containing variables like temperature_2m.' },
                  { title: '5. Formulate Advice', desc: 'AI reviews the temperature number and writes a recommendation (e.g. telling you to bring a jacket).' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#6366f1', background: '#e0e7ff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a', marginBottom: '0.1rem' }}>{item.title}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.4, display: 'block' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code display */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>
                  <strong style={{ color: '#6366f1', fontSize: '0.9rem', fontFamily: 'monospace' }}>📡 SIMPLE FETCH CODE TEMPLATE</strong>
                </div>

                <div style={{ flex: 1, fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{`// How we fetch live weather data
const getLiveWeather = async (lat, lon) => {
  const link = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m\`;
  
  try {
    // Send messenger to the website
    const response = await fetch(link);
    const data = await response.json();
    
    // Return temperature value
    return data.current.temperature_2m;
  } catch (error) {
    console.log("Could not load data:", error);
    return null;
  }
};`}</pre>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#6366f1', borderColor: '#6366f1', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try Real-Time Connection <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE SANDBOX ──────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Live Internet API Connector</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Select a city, click fetch, and watch the AI query a **real public website** on the internet in real-time:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bot size={18} style={{ color: '#6366f1' }} /> Target City Parameters
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    
                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Select City:</label>
                      <select
                        value={selectedCity}
                        disabled={isRunningSim}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                      >
                        {Object.entries(CITIES).map(([key, item]) => (
                          <option key={key} value={key}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #6366f1', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <strong style={{ color: '#1e3a8a' }}>📍 Location Details:</strong>
                      <span>Latitude: {CITIES[selectedCity].lat}</span>
                      <span>Longitude: {CITIES[selectedCity].lon}</span>
                      <span>HTTP Method: GET</span>
                    </div>

                  </div>
                </div>

                <button
                  onClick={triggerLiveApiFetch}
                  disabled={isRunningSim}
                  style={{
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(99,102,241,0.2)'
                  }}
                >
                  <RefreshCw size={15} className={isRunningSim ? 'animate-spin' : ''} />
                  {isRunningSim ? 'Contacting Server...' : 'Fetch Live Weather'}
                </button>

              </div>

              {/* Right Column Debugger Terminal */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#6366f1' }} /> LIVE LOGS SCREEN
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: liveJson ? '#064e3b' : '#1e293b', color: liveJson ? '#34d399' : '#94a3b8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunningSim ? '⏳ CONNECTING' : liveJson ? '🟢 CONNECTED' : '■ IDLE'}
                    </span>
                  </div>

                  {/* Logs stream */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Click the run button to trigger fetch() and get live weather...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('🧠')) color = '#fcd34d';
                      if (log.includes('❌')) color = '#f87171';
                      if (log.includes('🟢') || log.includes('Successful') || log.includes('Success')) color = '#34d399';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Raw JSON print */}
                {liveJson && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                        RAW RESPONSE NOTE FROM WEATHER WEBSITE (JSON)
                      </span>
                      {fetchLatency > 0 && <span style={{ fontSize: '0.68rem', color: '#6366f1', fontFamily: 'monospace' }}>Speed: {fetchLatency}ms</span>}
                    </div>
                    <pre style={{ margin: 0, fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace', maxHeight: '120px', overflowY: 'auto' }}>
                      {JSON.stringify(liveJson, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Final advice result */}
                {agentDecision && (
                  <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, boxSizing: 'border-box' }}>
                    <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>💬 AI ADVISE RECOMMENDATION:</strong>
                    {agentDecision}
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('integration')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Pipeline
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={22} style={{ color: '#6366f1' }} />
                Day 8 Assignment: Live Bitcoin Price Fetch
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You want to fetch the live price of Bitcoin from a public website. 
                The URL to query is:
                <br />
                `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
                <br /><br />
                Write a simple Javascript function named `fetchBitcoinPrice` that uses `fetch()` to call this link and return the Bitcoin price.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`const fetchBitcoinPrice = async () => {\n  const link = '...';\n  // Write your code here...\n}`}
                style={{ width: '100%', height: '180px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                disabled={!assignmentText.trim() || assignmentSubmitted}
                style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✅ Assignment Submitted Successfully' : 'Submit Assignment'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 8 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 8 Knowledge Quiz</h2>
              
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
                            bg = '#e0e7ff';
                            border = '1px solid #6366f1';
                            textColor = '#6366f1';
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
                    background: '#6366f1',
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
                <div style={{ marginTop: '2rem', background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#3730a3', display: 'block', marginBottom: '0.4rem' }}>
                    Quiz Score: {quizScore} / {QUIZ_QUESTIONS.length}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#312e81' }}>
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered connecting agents to live APIs!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
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
