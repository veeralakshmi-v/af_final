import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Bot, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, FileText, Mail, Code, Clipboard 
} from 'lucide-react';
import aiAgentWorkflowImg from '../../assets/ai_agent_n8n_workflow_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'ainodes', label: '🧠 AI Nodes in n8n' },
  { id: 'practical', label: '🛠️ Practical Guide' },
  { id: 'sandbox', label: '💻 Deployed AI Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is the "AI Agent Node" used for in n8n?',
    opts: [
      'It acts as an intelligent coordinator that can automatically decide which sub-tools to execute based on the user\'s prompt instructions.',
      'It downloads operating system updates.',
      'It changes the canvas styling configuration.'
    ],
    ans: 0
  },
  {
    q: 'How does n8n connect with AI models like OpenAI or Gemini?',
    opts: [
      'By using API credential keys to securely pass messages to the model servers and return the text outputs.',
      'By installing physical wires into the computer motherboard.',
      'By converting Python script files into Excel tables.'
    ],
    ans: 0
  },
  {
    q: 'What is "Sentiment Analysis" in AI automation?',
    opts: [
      'Using the AI to evaluate a text (like a student support message) and label it as positive, negative, or neutral.',
      'Calculating file size compression rates.',
      'Validating local user password inputs.'
    ],
    ans: 0
  },
  {
    q: 'What does the "Memory" sub-node do when connected to an AI node in n8n?',
    opts: [
      'It saves previous turns of the chat conversation so the AI can remember past user statements in a multi-turn conversation.',
      'It speeds up the computer processor.',
      'It automatically deletes error logs.'
    ],
    ans: 0
  },
  {
    q: 'What is a "Text Summarization" node used for in business workflows?',
    opts: [
      'To take long files (like long customer complaints) and condense them into a brief bullet list.',
      'To translate numbers to letters.',
      'To lock spreadsheet rows.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay13({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [simulationType, setSimulationType] = useState('support'); // 'support' or 'resume'
  const [llmProvider, setLlmProvider] = useState('openai'); // 'openai' or 'gemini'
  
  // Inputs
  const [studentQuestion, setStudentQuestion] = useState('How do I submit my assignment for Day 10?');
  const [resumeText, setResumeText] = useState('Sarah Connor. Experience: 3 years. Skills: Python, SQL, Prompt Engineering.');

  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [agentAnswer, setAgentAnswer] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');

  // Quiz and assignment states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Copy success indicator
  const [copiedIndex, setCopiedIndex] = useState(false);

  const runAISimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setAgentAnswer('');
    setFeedbackEmail('');

    const isSupport = simulationType === 'support';
    const providerName = llmProvider === 'openai' ? 'OpenAI GPT-4' : 'Google Gemini Pro';

    const steps = [
      `🧠 n8n AI Node: Preparing context guidelines...`,
      `📄 Input variable received: "${isSupport ? studentQuestion : resumeText}"`,
      `📡 API Client: Establishing connection to ${providerName} endpoints...`,
      `🛡️ Guardrails: Scanning prompts for safety checks...`,
      `🎉 Response received: 200 OK (Data processed)`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            if (isSupport) {
              const ans = `Hi there! To submit your Day 10 assignment, navigate to the "Code Submission" tab inside the Day 10 screen, paste your Python script into the box, and click the green Submit button. Let me know if you need help!`;
              setAgentAnswer(ans);
              setFeedbackEmail(`Subject: Student Support Reply\nTo: student@alphafly.com\n\n${ans}`);
            } else {
              const score = 88;
              const feedback = `Hello Sarah Connor,\n\nWe analyzed your resume using ${providerName}. \nScore: ${score}/100. \nStrengths: Excellent Python, SQL, and Prompt Engineering skills. \nAdvice: Add more detail about real-time project deployments. Good luck!`;
              setAgentAnswer(`Resume Analysis Complete!\n\nAI Score: ${score}/100\nKey strengths identified: Python, SQL, Prompt Engineering.\nAdvice: Mention folder uploads or API integration examples.`);
              setFeedbackEmail(`Subject: Resume Review Feedback\nTo: applicant@example.com\n\n${feedback}`);
            }
            setIsRunning(false);
          }, 600);
        }
      }, delay);
      delay += 800;
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

  // Day 13 n8n JSON Export structure
  const rawN8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "student-query",
        "responseMode": "onReceived"
      },
      "id": "1",
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [100, 300]
    },
    {
      "parameters": {
        "promptType": "defineBelow",
        "text": "={{ $json.body.question }}",
        "systemMessage": "You are a friendly support assistant for Alphafly Academy. Be concise."
      },
      "id": "2",
      "name": "AI Agent Node",
      "type": "n8n-nodes-base.advancedAgent",
      "typeVersion": 1.1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "model": "gpt-4o-mini",
        "options": {}
      },
      "id": "3",
      "name": "OpenAI Chat Model",
      "type": "n8n-nodes-base.lmChatOpenAi",
      "typeVersion": 1,
      "position": [250, 480]
    },
    {
      "parameters": {
        "contextWindowLength": 5
      },
      "id": "4",
      "name": "Window Buffer Memory",
      "type": "n8n-nodes-base.windowBufferMemory",
      "typeVersion": 1,
      "position": [380, 480]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "to": "={{ $node.Webhook Trigger.json.body.email }}",
        "subject": "Alphafly Support Reply",
        "message": "={{ $node.\\"AI Agent Node\\".json.output }}"
      },
      "id": "5",
      "name": "Send Gmail Response",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [550, 300]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [
          { "node": "AI Agent Node", "type": "main", "index": 0 }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "ai_language_model": [
        [
          { "node": "AI Agent Node", "type": "ai_language_model", "index": 0 }
        ]
      ]
    },
    "Window Buffer Memory": {
      "ai_memory": [
        [
          { "node": "AI Agent Node", "type": "ai_memory", "index": 0 }
        ]
      ]
    },
    "AI Agent Node": {
      "main": [
        [
          { "node": "Send Gmail Response", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-Tabs Selector */}
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
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 13
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                AI Automation using n8n
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to embed artificial intelligence into your n8n workflows. We cover OpenAI, Gemini, and Anthropic nodes, and show how to build smart classifiers, summarizers, and conversational agents.
              </p>
            </div>

            {/* AI Agent Workflow Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                🗺️ AI Agent Sub-Node Configuration Pattern
              </span>
              <img
                src={aiAgentWorkflowImg}
                alt="n8n AI Agent Node connected to OpenAI Model and Memory sub-nodes"
                style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What are AI Nodes in n8n?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  n8n has native nodes for major AI providers (like OpenAI, Google Gemini, and Anthropic). Instead of writing custom HTTP API calls, you drag-and-drop the **AI Agent Node**, select your provider, and provide a prompt.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  You can use these nodes to analyze resumes, score customer reviews, classify emails into categories automatically, or translate text messages before forwarding alerts.
                </p>
              </div>

              {/* AI Node list */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={18} style={{ color: '#7c3aed' }} /> AI Nodes Available:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>👤 AI Agent Node:</span>
                    <span>An agent that can make decisions and use sub-tools automatically.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✍️ Prompt Node:</span>
                    <span>Generates text responses based on specific system rules.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🧠 Memory Node:</span>
                    <span>Connected to agents to store past conversation histories.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🖼️ Image Generator:</span>
                    <span>Triggers models like DALL-E to generate visual assets.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('ainodes')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View AI Node Basics <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. AI NODES IN N8N ───────────────────────────────────────── */}
        {activeTab === 'ainodes' && (
          <motion.div key="ainodes" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🧠 AI Automation Capabilites</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Learn what tasks are commonly automated using AI nodes:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Sentiment Analysis</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Automatically flags if a student\'s question is angry or urgent, alerting staff immediately.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Text Classifiers</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Reads incoming email forms and routes them to either Billing, Admissions, or Technical support.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Document Summarization</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Summarizes candidate resumes or long articles into simple 3-bullet points for quick reading.</span>
              </div>
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
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step AI Nodes Assembly</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Learn how to physically connect AI models, memory sub-nodes, and prompts in n8n:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Detailed Node setup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>1. Place AI Agent Node</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Drag the **AI Agent Node** from the Nodes Panel onto your canvas. This node acts as the main hub. Double-click it, and set the **Prompt** field to <code style={{ fontFamily: 'monospace' }}>{"{{ $json.body.question }}"}</code>.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>2. Snap Chat Model (LLM) sub-node</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Search for "OpenAI Chat Model" or "Gemini Chat Model". Drag and snap it directly into the **Model connector bullet** located on the bottom-left of the AI Agent Node. Provide your API secret token key credentials.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>3. Snap Window Buffer Memory sub-node</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Search for **Window Buffer Memory**. Drag it and snap it directly into the **Memory connector bullet** on the bottom of the AI Agent Node. This lets the AI remember the last 5 turns of conversation context!
                  </span>
                </div>

              </div>

              {/* Copy-pasteable json */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COPY-PASTE AI WORKFLOW JSON
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
                  💡 Tip: Copy this JSON, paste it directly (Ctrl+V) into your n8n workspace, and connect Gmail nodes to build the support responder system.
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('ainodes')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to AI Nodes
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Go to AI Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Live AI Agent Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Choose your scenario, select an LLM provider, and watch the AI Agent sub-node pipeline execute:</p>

            {/* Visual 5-Node Canvas — with sub-nodes branching under the agent */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem' }}>
              {/* Top row: Webhook → Agent → Gmail */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.2rem', overflowX: 'auto' }}>
                {[
                  { id: 'webhook', icon: '🔌', label: 'Webhook', sub: 'POST /student-query', color: '#5b21b6', border: '#a78bfa', idx: 0 },
                  { id: 'agent',   icon: '🤖', label: 'AI Agent Node', sub: 'System Prompt + Query', color: '#1e3a5f', border: '#60a5fa', idx: 1 },
                  { id: 'gmail',   icon: '📧', label: 'Gmail Response', sub: 'Send AI Reply', color: '#14532d', border: '#4ade80', idx: 2 }
                ].map((node, nIdx, arr) => {
                  const isActive = simLogs.length > node.idx;
                  return (
                    <React.Fragment key={node.id}>
                      <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.7rem 1.1rem', textAlign: 'center', minWidth: '120px', transition: 'all 0.4s', boxShadow: isActive ? `0 0 16px ${node.border}55` : 'none' }}>
                        <div style={{ fontSize: '1.3rem' }}>{node.icon}</div>
                        <div style={{ color: 'white', fontSize: '0.73rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem' }}>{node.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.62rem', fontFamily: 'monospace', marginTop: '0.1rem' }}>{node.sub}</div>
                        {isActive && <div style={{ fontSize: '0.62rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ DONE</div>}
                      </div>
                      {nIdx < arr.length - 1 && <div style={{ color: isActive ? '#a78bfa' : '#334155', fontSize: '1.3rem', transition: 'color 0.4s' }}>➔</div>}
                    </React.Fragment>
                  );
                })}
              </div>
              {/* Sub-node row under Agent */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #334155' }}>
                <div style={{ textAlign: 'center', opacity: simLogs.length > 1 ? 1 : 0.35, transition: 'opacity 0.5s' }}>
                  <div style={{ fontSize: '0.62rem', color: '#7c3aed', fontFamily: 'monospace', marginBottom: '0.3rem' }}>⬆ ai_language_model</div>
                  <div style={{ background: simLogs.length > 1 ? '#1e1b4b' : '#1e293b', border: `1px solid ${simLogs.length > 1 ? '#7c3aed' : '#334155'}`, borderRadius: '8px', padding: '0.5rem 0.8rem', color: 'white', fontSize: '0.7rem', fontFamily: 'monospace' }}>🧠 {llmProvider === 'openai' ? 'OpenAI GPT-4o' : 'Gemini Pro'}</div>
                </div>
                <div style={{ textAlign: 'center', opacity: simLogs.length > 1 ? 1 : 0.35, transition: 'opacity 0.5s' }}>
                  <div style={{ fontSize: '0.62rem', color: '#7c3aed', fontFamily: 'monospace', marginBottom: '0.3rem' }}>⬆ ai_memory</div>
                  <div style={{ background: simLogs.length > 1 ? '#1e1b4b' : '#1e293b', border: `1px solid ${simLogs.length > 1 ? '#7c3aed' : '#334155'}`, borderRadius: '8px', padding: '0.5rem 0.8rem', color: 'white', fontSize: '0.7rem', fontFamily: 'monospace' }}>💾 Window Buffer (5 turns)</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Config Panel */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Config AI Settings
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Workflow Scenario:</label>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => setSimulationType('support')}
                          disabled={isRunning}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: simulationType === 'support' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: simulationType === 'support' ? '#f5f3ff' : 'white',
                            color: simulationType === 'support' ? '#7c3aed' : '#475569',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem'
                          }}
                        >
                          👤 AI Student Support
                        </button>
                        <button
                          onClick={() => setSimulationType('resume')}
                          disabled={isRunning}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: simulationType === 'resume' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: simulationType === 'resume' ? '#f5f3ff' : 'white',
                            color: simulationType === 'resume' ? '#7c3aed' : '#475569',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem'
                          }}
                        >
                          📄 Resume Analyzer
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>LLM Model Provider:</label>
                      <select value={llmProvider} disabled={isRunning} onChange={(e) => setLlmProvider(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}>
                        <option value="openai">OpenAI (GPT-4o-mini)</option>
                        <option value="gemini">Google Gemini Pro</option>
                      </select>
                    </div>

                    {simulationType === 'support' ? (
                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Student Question:</label>
                        <textarea value={studentQuestion} disabled={isRunning} onChange={(e) => setStudentQuestion(e.target.value)} style={{ width: '100%', height: '70px', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ) : (
                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Candidate Details:</label>
                        <textarea value={resumeText} disabled={isRunning} onChange={(e) => setResumeText(e.target.value)} style={{ width: '100%', height: '70px', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                      </div>
                    )}

                  </div>
                </div>

                <button
                  onClick={runAISimulator}
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
                  Run Deployed AI Node
                </button>
              </div>

              {/* Right Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> AI NODE TRACE LOGS
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ THINKING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  {/* Execution logs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure inputs and click Run to simulate AI node responses...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('🧠') || log.includes('Prompt')) color = '#fcd34d';
                      if (log.includes('🟢') || log.includes('successful') || log.includes('200 OK') || log.includes('validated') || log.includes('dispatched') || log.includes('written') || log.includes('Success')) color = '#34d399';
                      if (log.includes('API') || log.includes('POST') || log.includes('GET')) color = '#60a5fa';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Advice Output */}
                {agentAnswer && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.82rem', fontFamily: 'monospace', marginBottom: '1rem', boxSizing: 'border-box' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                      <Bot size={12} /> AI AGENT OUTPUT TEXT
                    </span>
                    <div style={{ lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{agentAnswer}</div>
                  </div>
                )}

                {/* Feedback email */}
                {feedbackEmail && (
                  <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, boxSizing: 'border-box', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Mail size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>📧 AUTOMATED FEEDBACK EMAIL SENT:</strong>
                      <pre style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{feedbackEmail}</pre>
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
                <Bot size={22} style={{ color: '#7c3aed' }} />
                Day 13 Assignment: AI Email Reply Generator
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You want to automate responses to incoming client feedback emails.
                <br />
                Write down the nodes list, prompt rules, and connection links needed in n8n so that:
                <br />
                1. An **Email Trigger** detects incoming customer messages.
                <br />
                2. An **OpenAI Node** analyzes if the message is positive or negative.
                <br />
                3. A **Switch Node** routes positive reviews to a "thank you" email, and negative reviews to an "escalate to staff support" Slack alert.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`1. Email trigger and parameters...\n2. AI model provider prompt and system settings...\n3. Switch routing checks...`}
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
                Start Day 13 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 13 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered AI Node integrations!' : 'Review the correct options highlighted green above.'}
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
