import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Zap, RefreshCw, Layers, 
  CheckCircle, Bot, Shield, Key, Terminal, User, AlertTriangle 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'flow', label: '🔬 Calling Lifecycle' },
  { id: 'sandbox', label: '💻 Interactive Tool Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is an API in simple terms?',
    opts: [
      'It is like a waiter in a restaurant that carries your request to a server (kitchen) and brings back the response (food).',
      'It is a layout design software used to paint websites.',
      'It is a special machine coding language used by computers.'
    ],
    ans: 0
  },
  {
    q: 'How does an API key authenticate (verify) a request?',
    opts: [
      'It acts like a ticket or secret passcode passed along with the request to prove you are authorized to use the service.',
      'It downloads security files directly to your computer hard drive.',
      'It translates the text from English to French.'
    ],
    ans: 0
  },
  {
    q: 'Does the AI model (LLM) run the tool code itself?',
    opts: [
      'Yes, the AI runs the code directly in its neural pathways.',
      'No. The AI only writes a structured "JSON note" saying which tool it wants and what values to use. The app host executes the actual code.',
      'Yes, but only if the code has no bugs.'
    ],
    ans: 1
  },
  {
    q: 'What format does the AI use to output a tool request?',
    opts: [
      'A structured JSON note detailing the function name and argument values (e.g. { "tool": "get_weather", "city": "London" }).',
      'A long binary file of ones and zeros.',
      'An image showing a flowchart of actions.'
    ],
    ans: 0
  },
  {
    q: 'What happens in an AI system if a tool returns a "401 Unauthorized" status code?',
    opts: [
      'The AI notices the authentication error and can tell the user to check their API key passcode.',
      'The AI automatically guesses the password and logs in.',
      'The browser crash and deletes the coding page.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay7({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [apiKey, setApiKey] = useState('sb-key-live-9902');
  const [simulateInvalidKey, setSimulateInvalidKey] = useState(false);
  const [selectedTool, setSelectedTool] = useState('stock'); // 'stock', 'slack', 'invoice'
  
  // Dynamic Tool Inputs
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [slackChannel, setSlackChannel] = useState('#sales-alerts');
  const [slackMessage, setSlackMessage] = useState('New consultation booked! 🚀');
  const [invoiceName, setInvoiceName] = useState('Jane Connor');
  const [invoiceAmount, setInvoiceAmount] = useState('450.00');

  // Live output logs
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [jsonPayload, setJsonPayload] = useState(null);
  const [finalAgentAnswer, setFinalAgentAnswer] = useState('');

  const getActiveJsonPayload = () => {
    if (selectedTool === 'stock') {
      return {
        tool_name: 'get_stock_price',
        description: 'Look up real-time stock prices.',
        arguments: {
          symbol: stockSymbol.toUpperCase()
        }
      };
    } else if (selectedTool === 'slack') {
      return {
        tool_name: 'send_slack_message',
        description: 'Post updates to a Slack channel.',
        arguments: {
          channel: slackChannel,
          message: slackMessage
        }
      };
    } else {
      return {
        tool_name: 'create_invoice',
        description: 'Create an invoice entry in the billing database.',
        arguments: {
          client_name: invoiceName,
          amount_usd: parseFloat(invoiceAmount) || 0.00
        }
      };
    }
  };

  const executeSandboxSimulation = () => {
    setIsRunningSim(true);
    setSimLogs([]);
    setFinalAgentAnswer('');
    setJsonPayload(null);

    const payload = getActiveJsonPayload();
    const token = simulateInvalidKey ? 'EXPIRED_KEY' : apiKey;

    const steps = [
      '🧠 AI Thought: The user wants to run an action. I will select the matching tool.',
      '⚡ AI Output: Writing a structured JSON note requesting the tool call:',
      'payload_ready', // Flag to display JSON payload
      `📡 App: Intercepting the AI's request note. Starting API request...`,
      `🔒 Auth: Injecting password header (Bearer Token: "${token}")...`,
      'http_call_sent', // Flag for network response
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        if (step === 'payload_ready') {
          setJsonPayload(payload);
        } else if (step === 'http_call_sent') {
          // Process network response
          if (simulateInvalidKey) {
            setSimLogs(prev => [...prev, 
              `❌ Server Response: 401 Unauthorized (Access Denied)`,
              `❌ Error: Invalid API Key passcode.`
            ]);
            setTimeout(() => {
              setSimLogs(prev => [...prev, '🧠 AI Thought: The API request failed because the passcode is wrong. I must tell the user to fix their API key.']);
              setTimeout(() => {
                setFinalAgentAnswer(`❌ Access Denied: The tool failed to run because the API Key password was wrong (401 Unauthorized). Please check your Sandbox API Key.`);
                setIsRunningSim(false);
              }, 600);
            }, 600);
          } else {
            // Success response mock data
            let mockResponse = '';
            let explanation = '';
            if (selectedTool === 'stock') {
              mockResponse = `Status: 200 OK\n{\n  "symbol": "${stockSymbol.toUpperCase()}",\n  "price": 195.42,\n  "currency": "USD"\n}`;
              explanation = `📈 Stock Update: ${stockSymbol.toUpperCase()} is currently trading at $195.42 USD. (Connection Successful!)`;
            } else if (selectedTool === 'slack') {
              mockResponse = `Status: 201 Created\n{\n  "channel": "${slackChannel}",\n  "status": "message_sent"\n}`;
              explanation = `💬 Slack Alert: Sent message successfully to channel ${slackChannel}.`;
            } else {
              mockResponse = `Status: 200 OK\n{\n  "invoice_id": "INV-992",\n  "client": "${invoiceName}",\n  "amount": ${invoiceAmount}\n}`;
              explanation = `🧾 Invoice Created: Generated invoice INV-992 for ${invoiceName} in the amount of $${invoiceAmount} USD.`;
            }

            setSimLogs(prev => [...prev, 
              `🟢 Server Response: 200 OK (Success!)`,
              `📡 Live Data: \n${mockResponse}`
            ]);
            setTimeout(() => {
              setSimLogs(prev => [...prev, '🧠 AI Thought: The API returned the correct information. I will summarize it for the user now.']);
              setTimeout(() => {
                setFinalAgentAnswer(explanation);
                setIsRunningSim(false);
              }, 600);
            }, 600);
          }
        } else {
          setSimLogs(prev => [...prev, step]);
        }
      }, delay);
      delay += 600;
    });
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
      
      {/* Sub-Tabs selector navigation */}
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
        
        {/* ── 1. LESSON OVERVIEW ───────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 2 • DAY 7
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                APIs, Passcodes, & Tool Calling
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how AI assistants talk to other websites (APIs), verify who they are using passcodes (tokens), and request helper actions.
              </p>
            </div>

            {/* Core Concepts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What is an API?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  An **API** (Application Programming Interface) is like a **waiter in a restaurant**. 
                  You (the client) look at the menu and give your request to the waiter (API). The waiter walks to the kitchen (server database), grabs the food, and brings it back to your table (response data). It is a bridge between two applications.
                </p>

                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.6rem' }}>
                  API Passcodes (Authentication)
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  To stop bad actors, websites require a secret password called an **API Key** or **Bearer Token**. 
                  It is sent with the request like a ticket or ID card so the server knows who is asking for the data.
                </p>
              </div>

              {/* Explaining Function Calling */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} style={{ color: '#059669' }} /> What is Tool Calling?
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  The AI model cannot search Google or send emails on its own. Instead, it follows a simple process:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>1. List Helpers:</span>
                    <span>We tell the AI what tools are available.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>2. Write Request:</span>
                    <span>AI writes a short note (JSON) stating which helper it wants.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>3. App Executes:</span>
                    <span>The website wrapper runs the code and feeds the answer back to the AI.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('flow')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Calling Lifecycle <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. CALLING LIFECYCLE ────────────────────────────────────── */}
        {activeTab === 'flow' && (
          <motion.div key="flow" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔬 The Tool Calling Round-Trip Lifecycle</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Here is the simple pathway when an AI uses a tool:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Flow Steps list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: 'Step 1: User Request', desc: 'The client prompts: "Check the stock value of Apple."', color: '#3b82f6' },
                  { title: 'Step 2: AI Writes Note', desc: 'The AI matches this to the stock tool and writes a request note: { "symbol": "AAPL" }.', color: '#059669' },
                  { title: 'Step 3: App Runs Code', desc: 'Our backend app intercepts the note, adds the secret passcode, and queries the stock website.', color: '#8b5cf6' },
                  { title: 'Step 4: Answer Received', desc: 'The stock website responds with the price. The app sends this result back to the AI.', color: '#f59e0b' },
                  { title: 'Step 5: AI Responds', desc: 'The AI reads the price, writes a friendly explanation, and prints it for the user.', color: '#06b6d4' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '16px', display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: step.color, background: `${step.color}11`, width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a', marginBottom: '0.1rem' }}>{step.title}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.4, display: 'block' }}>{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Graphic Code/JSON view */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>
                  <strong style={{ color: '#059669', fontSize: '0.9rem', fontFamily: 'monospace' }}>🔧 SIMPLE TOOL DESCRIPTION FOR THE AI</strong>
                </div>

                <div style={{ flex: 1, fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{`{
  "name": "get_stock_price",
  "description": "Checks the stock price.",
  "parameters": {
    "symbol": {
      "type": "string",
      "description": "Stock symbol (e.g. AAPL)"
    }
  }
}`}</pre>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Sandbox Simulator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE SANDBOX ──────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Tool Calling Sandbox</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Choose a tool, configure parameters, and watch the AI request actions:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Controls Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* 1. API KEY CARD */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={18} style={{ color: '#059669' }} /> API Key (Passcode)
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Passcode String:</label>
                      <input
                        type="text"
                        value={apiKey}
                        disabled={isRunningSim}
                        onChange={(e) => setApiKey(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={simulateInvalidKey}
                        disabled={isRunningSim}
                        onChange={(e) => setSimulateInvalidKey(e.target.checked)}
                      />
                      Simulate Wrong API Key (401 Error)
                    </label>
                  </div>
                </div>

                {/* 2. CHOOSE API TOOL CARD */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                    🛠️ Select Tool & Inputs
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    
                    {/* Tool Select buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedTool('stock')}
                        disabled={isRunningSim}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: selectedTool === 'stock' ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: selectedTool === 'stock' ? '#ecfdf5' : 'white',
                          color: selectedTool === 'stock' ? '#047857' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.88rem'
                        }}
                      >
                        📈 Tool: get_stock_price()
                      </button>
                      <button
                        onClick={() => setSelectedTool('slack')}
                        disabled={isRunningSim}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: selectedTool === 'slack' ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: selectedTool === 'slack' ? '#ecfdf5' : 'white',
                          color: selectedTool === 'slack' ? '#047857' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.88rem'
                        }}
                      >
                        💬 Tool: send_slack_message()
                      </button>
                      <button
                        onClick={() => setSelectedTool('invoice')}
                        disabled={isRunningSim}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: selectedTool === 'invoice' ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: selectedTool === 'invoice' ? '#ecfdf5' : 'white',
                          color: selectedTool === 'invoice' ? '#047857' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.88rem'
                        }}
                      >
                        🧾 Tool: create_invoice()
                      </button>
                    </div>

                    {/* Conditional inputs details */}
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      {selectedTool === 'stock' && (
                        <div>
                          <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Stock Symbol:</label>
                          <input type="text" value={stockSymbol} disabled={isRunningSim} onChange={(e) => setStockSymbol(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                        </div>
                      )}

                      {selectedTool === 'slack' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <div>
                            <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Channel Name:</label>
                            <input type="text" value={slackChannel} disabled={isRunningSim} onChange={(e) => setSlackChannel(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Message Text:</label>
                            <input type="text" value={slackMessage} disabled={isRunningSim} onChange={(e) => setSlackMessage(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                          </div>
                        </div>
                      )}

                      {selectedTool === 'invoice' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <div>
                            <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Client Name:</label>
                            <input type="text" value={invoiceName} disabled={isRunningSim} onChange={(e) => setInvoiceName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Invoice Amount ($):</label>
                            <input type="number" value={invoiceAmount} disabled={isRunningSim} onChange={(e) => setInvoiceAmount(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              {/* Console logs and payload Column */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                
                <div>
                  {/* Header */}
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#059669' }} /> AI PROCESS CONSOLE
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: simulateInvalidKey ? '#7f1d1d' : '#064e3b', color: simulateInvalidKey ? '#fecaca' : '#a7f3d0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {simulateInvalidKey ? '🔐 WRONG PASSCODE' : '🔓 SECURED LINK'}
                    </span>
                  </div>

                  {/* Logs stream */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', overflowY: 'auto', maxHeight: '200px', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Click the button below to simulate tool execution...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('🧠')) color = '#fcd34d';
                      if (log.includes('❌')) color = '#f87171';
                      if (log.includes('🟢') || log.includes('Success')) color = '#34d399';
                      if (log.includes('Auth') || log.includes('passcode')) color = '#60a5fa';

                      return (
                        <div key={idx} style={{ color, fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* JSON payload display */}
                {jsonPayload && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>
                      REQUEST NOTE WRITTEN BY THE AI (JSON)
                    </span>
                    <pre style={{ margin: 0, fontSize: '0.78rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                      {JSON.stringify(jsonPayload, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Final conversational output */}
                {finalAgentAnswer && (
                  <div style={{ background: simulateInvalidKey ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.08)', border: simulateInvalidKey ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '1rem', color: simulateInvalidKey ? '#f87171' : '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, marginBottom: '1rem' }}>
                    <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>💬 AI AGENT FINAL ANSWER:</strong>
                    {finalAgentAnswer}
                  </div>
                )}

                {/* Execution Button */}
                <button
                  onClick={executeSandboxSimulation}
                  disabled={isRunningSim}
                  style={{
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={14} className={isRunningSim ? 'animate-spin' : ''} />
                  {isRunningSim ? 'Triggering Tool Action...' : 'Run Tool Action'}
                </button>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('flow')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Lifecycle
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
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
                <Terminal size={22} style={{ color: '#059669' }} />
                Day 7 Assignment: Slack Message Tool Note
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You are adding a tool so the AI can send alerts to Slack.
                <br />
                1. Write down a simple **JSON request note** representing a function named `send_slack_message` which sends the message "Hello!" to a channel named "#alerts".
                <br />
                2. Below the note, write down the format of the Authorization header if this Slack API required the bearer token "slack-token-xyz".
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`1. JSON request note:\n{\n  ...\n}\n\n2. Passcode header:\nAuthorization: ...`}
                style={{ width: '100%', height: '180px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                disabled={!assignmentText.trim() || assignmentSubmitted}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✅ Assignment Submitted Successfully' : 'Submit Assignment'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 7 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 7 Knowledge Quiz</h2>
              
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
                            bg = '#f0fdf4';
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered APIs and tool calling!' : 'Review the correct options highlighted green above.'}
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
