import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Cpu, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, Mail, Database, Code, Clipboard 
} from 'lucide-react';
import registrationWorkflowImg from '../../assets/student_registration_workflow_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'webhooks', label: '🔌 Webhooks & REST APIs' },
  { id: 'practical', label: '🛠️ Practical Guide' },
  { id: 'sandbox', label: '💻 Webhook Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is a Webhook in simple terms?',
    opts: [
      'A digital phone call that lets one app send real-time data to another app automatically as soon as an event occurs.',
      'A physical device used to link local computer mice.',
      'A styling template rule for header elements.'
    ],
    ans: 0
  },
  {
    q: 'What does the n8n "HTTP Request" Node do?',
    opts: [
      'It contacts other websites or API servers on the internet to fetch data or trigger external actions.',
      'It resets the local computer password.',
      'It translates code comments into simple lists.'
    ],
    ans: 0
  },
  {
    q: 'What are API "Headers" used for?',
    opts: [
      'To pass metadata along with the request, such as secret passcodes (Authorization keys) or file types (Content-Type: JSON).',
      'To add styling animations to the browser menu.',
      'To store large image attachments.'
    ],
    ans: 0
  },
  {
    q: 'What is the purpose of the "Merge Node" in n8n?',
    opts: [
      'To combine data streams coming from two different branches or nodes into one single stream.',
      'To shut down local server connections.',
      'To rename spreadsheet file paths.'
    ],
    ans: 0
  },
  {
    q: 'Why do we need a "Wait Node" in long workflow automation pipelines?',
    opts: [
      'To pause the execution for a set duration (e.g. wait 2 days before sending a follow-up email).',
      'To make the computer use less memory.',
      'To bypass API password validations.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay12({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [studentName, setStudentName] = useState('Sarah Connor');
  const [studentEmail, setStudentEmail] = useState('sarah@sky-net.com');
  const [targetCourse, setTargetCourse] = useState('Agentic AI Development');
  
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [sheetRecords, setSheetRecords] = useState([
    { name: 'John Doe', email: 'john@example.com', course: 'Generative AI Foundations' }
  ]);
  const [emailSentState, setEmailSentState] = useState(null);

  // Forms and quiz states
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Copy success indicator
  const [copiedIndex, setCopiedIndex] = useState(false);

  const runWebhookSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setEmailSentState(null);

    const steps = [
      `📡 Webhook Trigger: Incoming HTTP POST request detected...`,
      `📦 Payload parsed: { name: "${studentName}", email: "${studentEmail}", course: "${targetCourse}" }`,
      `🗄️ n8n Database Connector: Appending row into Google Sheets table...`,
      `sheet_append`, // Flag to update sheets list in UI
      `✉️ n8n Email Node: Injecting variables into Welcome Email template...`,
      `✉️ Email successfully dispatched to: ${studentEmail}`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        if (step === 'sheet_append') {
          setSheetRecords(prev => [...prev, { name: studentName, email: studentEmail, course: targetCourse }]);
          setSimLogs(prev => [...prev, `✅ Google Sheets: Row written successfully.`]);
        } else {
          setSimLogs(prev => [...prev, step]);
        }

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setEmailSentState({ to: studentEmail, course: targetCourse });
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 850;
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  // Day 12 n8n JSON Export structure
  const rawN8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "register-student",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "1",
      "name": "Webhook Receiver",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "your_google_sheet_id_here",
        "sheetName": "Sheet1",
        "columns": {
          "mappingMode": "defineBelow",
          "value": [
            { "columnName": "Name", "value": "={{ $json.body.name }}" },
            { "columnName": "Email", "value": "={{ $json.body.email }}" },
            { "columnName": "Course", "value": "={{ $json.body.course }}" }
          ]
        }
      },
      "id": "2",
      "name": "Add to Google Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 3,
      "position": [400, 300]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "to": "={{ $node.Webhook Receiver.json.body.email }}",
        "subject": "Welcome to the Course!",
        "message": "Hi {{ $node.Webhook Receiver.json.body.name }},\\n\\nYour registration for the {{ $node.Webhook Receiver.json.body.course }} course is confirmed! See you in class!\\n\\nBest,\\nSchool Team"
      },
      "id": "3",
      "name": "Send Gmail Alert",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [600, 300]
    }
  ],
  "connections": {
    "Webhook Receiver": {
      "main": [
        [
          { "node": "Add to Google Sheet", "type": "main", "index": 0 }
        ]
      ]
    },
    "Add to Google Sheet": {
      "main": [
        [
          { "node": "Send Gmail Alert", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}`;

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
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 12
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Triggers, Actions & APIs
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how webhooks receive instant signals from other websites, check API parameters, and use the HTTP Request Node to trigger actions on external databases.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                🗺️ Student Registration Webhook Pipeline
              </span>
              <img 
                src={registrationWorkflowImg} 
                alt="Student Registration Webhook to Sheets to Gmail Flow" 
                style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} 
              />
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What is a Webhook Trigger?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  A **Webhook** is like a digital pager. Instead of having n8n ask another website every 5 minutes if there is new data (which is slow and uses battery), the external website sends a signal directly to n8n the exact millisecond a change happens.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  Once the Webhook is triggered, it passes a structured JSON package containing details (like name and email) to n8n. n8n passes this package to next-step nodes like the Google Sheets database node or Gmail node.
                </p>
              </div>

              {/* API terms */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={18} style={{ color: '#7c3aed' }} /> Helper Nodes to Master:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🔌 Webhook Node:</span>
                    <span>Generates a link to receive instant alerts from apps.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🗄️ HTTP Request:</span>
                    <span>Pulls or pushes information to external website APIs.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🔀 Switch Node:</span>
                    <span>Routes execution based on multiple choice categories.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>⏱️ Wait Node:</span>
                    <span>Pauses the workflow for seconds, hours, or days.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('webhooks')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Webhook Basics <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. WEBHOOKS & REST APIS ─────────────────────────────────── */}
        {activeTab === 'webhooks' && (
          <motion.div key="webhooks" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔌 Webhook & REST API Fundamentals</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Understand how different apps pass data packets programmatically:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>REST APIs</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>A set of web addresses (endpoints) that let applications request or update database records.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Request Headers</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Information sent with the request, like your API key password or target response format.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Query Parameters</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Values appended directly to the end of the URL link (e.g. `?course_id=102`).</span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', border: '1px solid #cbd5e1', borderRadius: '16px', marginBottom: '2rem' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>💡 Postman Basics:</strong>
              <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Postman is a popular desktop software tool developers use to test REST APIs manually. 
                Instead of writing backend code, you type in the API address, configure passwords, click Send, and inspect what JSON results the server returns immediately.
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('practical')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Go to Practical Guide <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. PRACTICAL GUIDE ───────────────────────────────────────── */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step API Integration Guide</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure webhooks, record student parameters, and set up automatic emails:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Detailed Node setup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>1. Set up Webhook Trigger</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Drag the **Webhook Node** to the canvas. Set the HTTP Method to <code style={{ fontFamily: 'monospace' }}>POST</code> and path to <code style={{ fontFamily: 'monospace' }}>register-student</code>. 
                    Copy the test URL and trigger a POST request with details in body (name, email, course).
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>2. Link Google Sheets (Database)</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Connect Google credentials. Set Action to **Append Row**. Write the spreadsheet ID and worksheet name. Map fields under columns:
                    <br />
                    • Name: <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"{{ $json.body.name }}"}</code>
                    <br />
                    • Email: <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"{{ $json.body.email }}"}</code>
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>3. Add Gmail Alert Node</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Connect your Gmail credentials. Set Action to **Send Message**.
                    In the Subject box, write `"Welcome to the course!"`. In the Message text box, inject:
                    <br />
                    <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"Hi {{ $json.Name }}, you are registered!"}</code>
                  </span>
                </div>

              </div>

              {/* Copy-pasteable json */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COPY-PASTE WEBHOOK PIPELINE JSON
                  </strong>
                  <button
                    onClick={() => copyToClipboard(rawN8nWorkflowJson)}
                    style={{
                      background: copiedIndex ? '#059669' : '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Clipboard size={12} />
                    {copiedIndex ? 'Copied!' : 'Copy JSON'}
                  </button>
                </div>

                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '340px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{rawN8nWorkflowJson}</pre>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic', borderTop: '1px solid #1e293b', paddingTop: '0.5rem' }}>
                  💡 Tip: Go to n8n canvas board and press Ctrl+V to import this Webhook ➔ Sheets ➔ Gmail flow instantly.
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('webhooks')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Webhooks
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Go to Webhook Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Live Webhook Pipeline Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Fill in student details, fire the webhook, and watch the 3-node pipeline execute in real time — row appended to Sheets, email sent via Gmail:</p>

            {/* Visual 3-Node Canvas Row */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', overflowX: 'auto' }}>
              {[
                { id: 'webhook', icon: '🔌', label: 'Webhook Trigger', subtitle: 'POST /register-student', activeColor: '#5b21b6', activeBorder: '#a78bfa' },
                { id: 'sheets', icon: '🗄️', label: 'Google Sheets', subtitle: 'Append Row', activeColor: '#14532d', activeBorder: '#4ade80' },
                { id: 'gmail', icon: '📧', label: 'Gmail Node', subtitle: 'Send Welcome Email', activeColor: '#1e3a5f', activeBorder: '#60a5fa' }
              ].map((node, nIdx, arr) => {
                const isActive = simLogs.length > nIdx;
                return (
                  <React.Fragment key={node.id}>
                    <div style={{
                      background: isActive ? node.activeColor : '#1e293b',
                      border: `2px solid ${isActive ? node.activeBorder : '#334155'}`,
                      borderRadius: '12px',
                      padding: '0.8rem 1.2rem',
                      textAlign: 'center',
                      minWidth: '130px',
                      transition: 'all 0.4s ease',
                      boxShadow: isActive ? `0 0 18px ${node.activeBorder}55` : 'none'
                    }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{node.icon}</div>
                      <div style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>{node.label}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.65rem', fontFamily: 'monospace', marginTop: '0.2rem' }}>{node.subtitle}</div>
                      {isActive && <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: node.activeBorder, fontWeight: 700 }}>✓ DONE</div>}
                    </div>
                    {nIdx < arr.length - 1 && (
                      <div style={{ color: isActive ? '#a78bfa' : '#334155', fontSize: '1.4rem', transition: 'color 0.4s' }}>➔</div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Registration Form
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Student Name:</label>
                      <input type="text" value={studentName} disabled={isRunning} onChange={(e) => setStudentName(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Student Email:</label>
                      <input type="email" value={studentEmail} disabled={isRunning} onChange={(e) => setStudentEmail(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Choose Course:</label>
                      <select value={targetCourse} disabled={isRunning} onChange={(e) => setTargetCourse(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}>
                        <option value="Agentic AI Development">Agentic AI Development</option>
                        <option value="Generative AI Foundations">Generative AI Foundations</option>
                        <option value="n8n Workflow Automation">n8n Workflow Automation</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runWebhookSimulator}
                  disabled={isRunning}
                  style={{
                    background: '#7c3aed',
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
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(124,58,237,0.2)',
                    marginTop: '1.5rem'
                  }}
                >
                  <Play size={15} />
                  {isRunning ? 'Processing Webhook...' : 'Trigger Webhook POST'}
                </button>
              </div>

              {/* Right Column Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                {/* Visual Logs */}
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> PIPELINE EXECUTIONS MONITOR
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ VALIDATING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure the form inputs and click Trigger to simulate n8n pipeline...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('🟢') || log.includes('successful') || log.includes('parsed') || log.includes('Written')) color = '#34d399';
                      if (log.includes('POST') || log.includes('GET')) color = '#60a5fa';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Google Sheet preview */}
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    <Database size={12} /> GOOGLE SHEETS ACTIVE RECORDS TABLE
                  </span>
                  
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '0.75rem', fontFamily: 'monospace', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sheetRecords.map((rec, rIdx) => (
                          <tr key={rIdx} style={{ borderBottom: '1px solid #273549' }}>
                            <td>{rec.name}</td>
                            <td>{rec.email}</td>
                            <td>{rec.course}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Gmail confirmation card */}
                {emailSentState && (
                  <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, boxSizing: 'border-box', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Mail size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>📧 AUTOMATED WELCOME GMAIL DISPATCHED:</strong>
                      <span>Subject: Welcome to {emailSentState.course}!</span>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Hi {studentName}, your slot is reserved. Let's build.</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Practical Guide
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={22} style={{ color: '#7c3aed' }} />
                Day 12 Assignment: Website Contact Form Automation
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You are setting up an automation for your website's "Contact Us" form.
                <br />
                Write down the nodes list, connection paths, and parameters needed in n8n so that:
                <br />
                1. A **Webhook Node** receives the name, email, and message.
                <br />
                2. An **HTTP Request Node** pushes the data to your company CRM.
                <br />
                3. A **Gmail Node** replies to the customer saying: "We received your message!".
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`1. Trigger node endpoint setup...\n2. API headers and JSON payload fields...\n3. Gmail node parameters...`}
                style={{ width: '100%', height: '180px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
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
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 12 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 12 Knowledge Quiz</h2>
              
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
                                transition: 'all 0.15s'
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered webhook and API integrations!' : 'Review the correct options highlighted green above.'}
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
