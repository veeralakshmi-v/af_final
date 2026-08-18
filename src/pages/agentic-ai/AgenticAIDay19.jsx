import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Play, Settings, Code, Clipboard, GitBranch, CheckCircle } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.15 } } };
const SUB_TABS = [{ id: 'intro', label: '📋 Lesson Overview' }, { id: 'embed', label: '🌐 Embedding & API' }, { id: 'practical', label: '🛠️ Practical Guide' }, { id: 'sandbox', label: '💻 Deploy Simulator' }, { id: 'assignment', label: '📝 Assignment' }, { id: 'quiz', label: '✍️ Quiz' }];
const QUIZ_QUESTIONS = [
  { q: 'How do you embed a Flowise chatbot widget on a website?', opts: ['Copy the auto-generated script tag from the Flowise "Embed" panel and paste it into your HTML file just before the closing </body> tag.', 'Manually write Python code for each website page.', 'Download and upload the chatbot as an image file.'], ans: 0 },
  { q: 'What is the Flowise API endpoint used for?', opts: ['To send messages to your chatflow programmatically from any application (mobile app, backend server, WhatsApp bot, etc.) using a standard HTTP POST request.', 'To format the font colors of chat bubbles.', 'To download the chatflow as a PDF file.'], ans: 0 },
  { q: 'What does a Flowise Prediction API request look like?', opts: ['A POST request to /api/v1/prediction/{chatflowId} with a JSON body containing { "question": "your message" }.', 'A GET request with a spreadsheet CSV file attached.', 'A DELETE request to remove old chat history.'], ans: 0 },
  { q: 'Why would you use the Flowise REST API instead of the embed widget?', opts: ['When you need to integrate the AI agent into a mobile app, an n8n workflow, a WhatsApp bot, or a backend Python script that cannot run JavaScript widgets.', 'To make the chatbot respond faster on slower computers.', 'To disable the AI agent after business hours.'], ans: 0 },
  { q: 'What is the purpose of the "Session ID" parameter in the Flowise API?', opts: ['It identifies a unique conversation thread so the AI agent can maintain memory and context for each individual user across multiple messages.', 'It encrypts the API key before sending.', 'It controls the maximum number of words in the response.'], ans: 0 }
];

export default function AgenticAIDay19({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [chatflowId, setChatflowId] = useState('af2026-demo-chatflow-001');
  const [sessionId, setSessionId] = useState('student_sarah_001');
  const [apiMessage, setApiMessage] = useState('What AI courses do you offer?');
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [apiResponse, setApiResponse] = useState('');
  const [deployTarget, setDeployTarget] = useState('website');
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (id) => { setActiveTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length : 0;

  const PIPELINE_NODES = [
    { icon: '🌐', label: 'Your Website/App', sub: 'Client', color: '#5b21b6', border: '#a78bfa', idx: 0 },
    { icon: '📡', label: 'REST API Call', sub: 'POST /prediction', color: '#1e3a5f', border: '#60a5fa', idx: 1 },
    { icon: '🤖', label: 'Flowise Engine', sub: 'Chatflow Process', color: '#14532d', border: '#4ade80', idx: 2 },
    { icon: '📤', label: 'JSON Response', sub: 'text + sessionId', color: '#78350f', border: '#fbbf24', idx: 3 }
  ];

  const runDeploySimulator = () => {
    setIsRunning(true); setSimLogs([]); setApiResponse('');
    const steps = [
      `🌐 Client: Sending POST request to Flowise API...`,
      `📡 API: POST http://localhost:3000/api/v1/prediction/${chatflowId}`,
      `📦 Body: { "question": "${apiMessage}", "sessionId": "${sessionId}" }`,
      `🤖 Flowise: Routing to chatflow "${chatflowId}"...`,
      `🧠 Chatflow: Processing with conversational memory for session "${sessionId}"...`,
      `✅ Flowise: Response generated successfully.`,
    ];
    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setApiResponse(JSON.stringify({
              "text": "Alphafly Academy offers the following AI courses:\n1. Agentic AI Development (40 Days)\n2. Generative AI Foundations (20 Days)\n3. AI-Powered Data Analytics\n4. Python Full Stack with AI\n\nWould you like details on any specific course?",
              "question": apiMessage,
              "sessionId": sessionId,
              "chatId": `chat_${Date.now()}`,
              "memoryType": "BufferMemory",
              "sourceDocuments": null
            }, null, 2));
            setIsRunning(false);
          }, 700);
        }
      }, delay);
      delay += 700;
    });
  };

  const embedCode = `<!-- Flowise Chat Widget Embed -->
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
  Chatbot.init({
    chatflowid: '${chatflowId}',
    apiHost: 'http://localhost:3000',
    theme: {
      button: { backgroundColor: '#7c3aed', right: 20, bottom: 20 },
      chatWindow: { title: 'Alphafly AI Assistant', welcomeMessage: 'Hello! How can I help?' }
    }
  })
</script>`;

  const apiCode = `import requests

# Flowise Prediction API Call
url = "http://localhost:3000/api/v1/prediction/${chatflowId}"
headers = { "Content-Type": "application/json" }
payload = {
    "question": "${apiMessage}",
    "sessionId": "${sessionId}"
}
response = requests.post(url, json=payload, headers=headers)
answer = response.json()['text']
print("AI Response:", answer)`;

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
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 19
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>Deploying Flowise: Embed & REST API</h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>Deploy your Flowise chatflows to the real world. Learn how to embed the chat widget on any website, integrate your agent via the REST API into Python scripts, WhatsApp bots, or n8n workflows, and manage session memory across users.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>Two Ways to Deploy Flowise</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>Once your chatflow is built and tested, you can make it accessible to users in two powerful ways:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[['🌐 Embed Widget', 'Copy a single <script> tag from Flowise and paste it into any HTML file. A floating chat button appears on your website instantly. No backend code needed.', '#dbeafe', '#1e40af'], ['📡 REST API', 'Call the Flowise prediction endpoint via HTTP POST from Python, JavaScript, n8n, WhatsApp API, or any backend. Returns a JSON response with the AI answer and session ID.', '#d1fae5', '#065f46']].map(([title, desc, bg, col]) => (
                    <div key={title} style={{ background: bg, border: `1px solid ${col}33`, borderRadius: '14px', padding: '1.2rem' }}>
                      <strong style={{ color: col, display: 'block', marginBottom: '0.3rem', fontSize: '1.05rem' }}>{title}</strong>
                      <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={18} style={{ color: '#7c3aed' }} /> Integration Targets:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.92rem', color: '#475569' }}>
                  {[['🌐 Website Widget','One-line embed for any HTML site.'],['🐍 Python Script','requests.post() to get AI responses.'],['⚡ n8n Workflow','HTTP Request node calls Flowise API.'],['💬 WhatsApp Bot','Twilio/WhatsApp webhook → Flowise API.'],['📱 Mobile App','React Native / Flutter calls REST API.']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#7c3aed', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('embed')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Embedding & API Deep Dive <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'embed' && (
          <motion.div key="embed" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🌐 Deploy Methods Deep Dive</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Select a deployment method to see the code:</p>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
              {[['website', '🌐 Website Embed'], ['python', '🐍 Python API'], ['n8n', '⚡ n8n Workflow']].map(([id, label]) => (
                <button key={id} onClick={() => setDeployTarget(id)} style={{ background: deployTarget === id ? '#f5f3ff' : 'white', border: deployTarget === id ? '2px solid #7c3aed' : '1px solid #cbd5e1', color: deployTarget === id ? '#7c3aed' : '#475569', padding: '0.55rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.15s' }}>{label}</button>
              ))}
            </div>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong style={{ color: '#7c3aed', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                  {deployTarget === 'website' ? '<!-- HTML Embed Code -->' : deployTarget === 'python' ? '# Python API Integration' : '# n8n HTTP Request Node Config'}
                </strong>
                <button onClick={() => { navigator.clipboard.writeText(deployTarget === 'website' ? embedCode : deployTarget === 'python' ? apiCode : '{"method":"POST","url":"http://localhost:3000/api/v1/prediction/' + chatflowId + '","body":{"question":"{{$json.question}}","sessionId":"{{$json.sessionId}}"}}'); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Clipboard size={12} /> {copied ? 'Copied!' : 'Copy'}</button>
              </div>
              <pre style={{ margin: 0, fontSize: '0.82rem', color: '#a7f3d0', fontFamily: 'monospace', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                {deployTarget === 'website' ? embedCode : deployTarget === 'python' ? apiCode : `# n8n HTTP Request Node Settings
Method: POST
URL: http://localhost:3000/api/v1/prediction/${chatflowId}
Headers: Content-Type: application/json
Body (JSON):
{
  "question": "{{ $json.message }}",
  "sessionId": "{{ $json.userId }}"
}
# Connect this node output to your Slack / Gmail / WhatsApp send node`}
              </pre>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Overview</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Practical Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'practical' && (
          <motion.div key="practical" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Deploy Your Chatflow Live</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Step-by-step deployment from Flowise canvas to real-world integration:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[['1. Save & Activate Chatflow','In Flowise, click the Save button at top-right. Then toggle the "Active" switch ON. Your chatflow is now live and accepting API requests.'],['2. Get Your Chatflow ID','Click the Share icon (↗) or API documentation button. Copy your unique Chatflow ID (e.g. af2026-demo-chatflow-001). This is required for all API calls.'],['3. Embed on Your Website','Click "Embed" → Copy the script tag → Paste it into your website HTML just before </body>. A chat bubble appears instantly.'],['4. Call via Python/Backend','Use the requests library: POST to /api/v1/prediction/{chatflowId} with JSON body {"question": "...", "sessionId": "..."}'],['5. Integrate with n8n','Add an HTTP Request node in n8n → Method: POST → URL: your Flowise endpoint → Body: JSON with question and sessionId fields.']].map(([title, body]) => (
                  <div key={title} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                    <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{title}</strong>
                    <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, display: 'block' }}>{body}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px' }}>
                <strong style={{ color: '#7c3aed', fontFamily: 'monospace', fontSize: '0.88rem', display: 'block', marginBottom: '1rem' }}>🧪 API Response Format</strong>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#a7f3d0', fontFamily: 'monospace', lineHeight: 1.6 }}>{`{
  "text": "AI agent's answer here...",
  "question": "Original user query",
  "sessionId": "unique_user_session",
  "chatId": "chat_1722170400000",
  "memoryType": "BufferMemory",
  "sourceDocuments": [
    {
      "pageContent": "Context chunk used...",
      "metadata": { "source": "file.pdf" }
    }
  ]
}`}</pre>
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e293b', paddingTop: '1rem', fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  💡 The <code style={{ color: '#a7f3d0' }}>sessionId</code> is key — pass the same value for the same user to maintain conversation memory across messages.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('embed')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Back to Embed Methods</button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>Deploy Simulator <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 API Deploy Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '1.5rem' }}>Configure your chatflow ID and session, then simulate a full API call to Flowise:</p>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', overflowX: 'auto' }}>
              {PIPELINE_NODES.map((node, nIdx, arr) => {
                const isActive = simLogs.length > node.idx;
                return (
                  <React.Fragment key={nIdx}>
                    <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.7rem 1.1rem', textAlign: 'center', minWidth: '110px', transition: 'all 0.4s', boxShadow: isActive ? `0 0 16px ${node.border}55` : 'none' }}>
                      <div style={{ fontSize: '1.3rem' }}>{node.icon}</div>
                      <div style={{ color: 'white', fontSize: '0.73rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem' }}>{node.label}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.62rem', fontFamily: 'monospace', marginTop: '0.1rem' }}>{node.sub}</div>
                      {isActive && <div style={{ fontSize: '0.62rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ OK</div>}
                    </div>
                    {nIdx < arr.length - 1 && <div style={{ color: isActive ? '#a78bfa' : '#334155', fontSize: '1.3rem', transition: 'color 0.4s' }}>➔</div>}
                  </React.Fragment>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={18} style={{ color: '#7c3aed' }} /> API Request Config</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[['Chatflow ID:', chatflowId, setChatflowId, 'text'], ['Session ID:', sessionId, setSessionId, 'text'], ['Message:', apiMessage, setApiMessage, 'text']].map(([label, val, setter, type]) => (
                      <div key={label}>
                        <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                        <input type={type} value={val} disabled={isRunning} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={runDeploySimulator} disabled={isRunning} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Play size={15} /> {isRunning ? 'Sending Request...' : 'Fire API Call'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', maxHeight: '160px', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>💻 Request / Response Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Press "Fire API Call"...</span> : simLogs.map((log, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#34d399', marginBottom: '0.3rem' }}>{log}</div>
                  ))}
                </div>
                {apiResponse && (
                  <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '0.8rem', flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>📦 API JSON Response</span>
                    <pre style={{ margin: 0, fontSize: '0.75rem', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '200px', whiteSpace: 'pre-wrap' }}>{apiResponse}</pre>
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
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><GitBranch size={22} style={{ color: '#7c3aed' }} /> Day 19 Assignment: Multi-Channel Deployment Plan</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Design a deployment plan for an Alphafly Academy AI assistant that is accessible via: (1) website chat widget, (2) Python backend API, and (3) an n8n workflow that sends AI answers via email.<br/><br/>Write: the embed snippet, Python request code, and the n8n HTTP node config for all three channels.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="Channel 1 - Website: Copy Flowise embed script with chatflowid into index.html before </body>&#10;Channel 2 - Python: POST to /api/v1/prediction/{chatflowId} with requests library&#10;Channel 3 - n8n: HTTP Request node → POST → body: {question: {{$json.question}}, sessionId: {{$json.email}}}" style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
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
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 19 Quiz — Flowise Deployment</h2>
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
                  <span style={{ color: '#6d28d9' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Deployment expert!' : 'Review the green answers above.'}</span>
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
