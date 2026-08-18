import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'use_cases', label: '📝 Workplace Use Cases' },
  { id: 'workspace_sandbox', label: '💻 API Simulator Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const API_SCENARIOS = [
  {
    id: 'keys',
    title: 'Generating Developer API Keys',
    desc: 'Creating secret connection tokens on cloud portals to authenticating your local code commands.',
    steps: [
      'Navigate to Google AI Studio (aistudio.google.com) or the OpenAI Platform Portal (platform.openai.com).',
      'Sign in with your developer account credentials.',
      'Click the "Get API Key" or "API Keys" navigation button on the dashboard sidebar.',
      'Select "Create Secret Key", copy the generated key string immediately, and store it safely. (It will not be visible again).'
    ],
    tip: 'Never share API keys in public chat rooms or code commits; they grant access to your billing account.'
  },
  {
    id: 'headers',
    title: 'Formatting HTTP Authorization Headers',
    desc: 'Setting up security parameter fields in your code requests to let LLM servers verify your key credentials.',
    steps: [
      'Open your code file or REST client tool (like Postman).',
      'Set the request method parameter to "POST".',
      'Navigate to the headers configuration section.',
      'Add the key "Authorization" and set its value string to "Bearer YOUR_SECRET_API_KEY". (Or "x-goog-api-key" matching Gemini guidelines).',
      'Bearer authentication expects a single space separation between the Bearer keyword and the secret key string.'
    ],
    tip: 'Bearer authentication expects a single space separation between the Bearer keyword and the secret key string.'
  },
  {
    id: 'security',
    title: 'Hiding Secret Keys in Env Variables',
    desc: 'Using local configuration configuration files to prevent leaking keys onto public GitHub repositories.',
    steps: [
      'Create a new file named exactly ".env" in the root directory of your project.',
      'Enter the variable name and value: "VITE_GEMINI_API_KEY=AIzaSyYourKeyHere" (or "REACT_APP_..." matching your bundler framework).',
      'Open your ".gitignore" configuration file and add ".env" on a new line to instruct Git to ignore this file.',
      'Access the key in your React code using "import.meta.env.VITE_GEMINI_API_KEY" to keep keys hidden from source commits.'
    ],
    tip: 'If you accidentally commit an API key to GitHub, immediately revoke it on the developer portal and generate a new key.'
  }
];

const TOOLS_DIRECTORY = [
  { name: 'Google AI Studio', category: 'Developer Portal', highlight: 'Free portal to prototype prompt structures, test parameters, and obtain Gemini API keys.', link: 'https://aistudio.google.com' },
  { name: 'OpenAI Developer Portal', category: 'Developer Portal', highlight: 'Comprehensive billing control panel and keys generator workspace for GPT model integrations.', link: 'https://platform.openai.com' },
  { name: 'Postman / Thunder Client', category: 'REST Tool', highlight: 'Desktop/extension utility to test raw endpoint requests and inspect headers without coding.', link: 'https://postman.com' },
  { name: 'dotenv (npm library)', category: 'Node Package', highlight: 'Loads secret credentials from local .env config files into server environment environments.', link: 'https://npmjs.com/package/dotenv' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is the primary purpose of an AI API Key?',
    opts: [
      'To compile local HTML layouts fast',
      'To authenticate developer identity, track requests usage, and bill accounts accurately for model calls',
      'To encrypt user hard drives'
    ],
    ans: 1
  },
  {
    q: 'Which header key is standard for sending authentication keys to most LLM cloud endpoints?',
    opts: [
      'x-goog-api-key or Authorization (Bearer)',
      'Content-Type: text/html',
      'Accept-Encoding: gzip'
    ],
    ans: 0
  },
  {
    q: 'Where should you store your developer API keys in a local project?',
    opts: [
      'Pasted directly into a public JavaScript file',
      'Inside a local ".env" configuration file that is listed inside your ".gitignore" file',
      'In the HTML footer tag'
    ],
    ans: 1
  },
  {
    q: 'What happens if you accidentally commit an active API key to a public GitHub repository?',
    opts: [
      'The code compiles faster',
      'Security bots will flag it, and malicious actors can steal it to run expensive requests on your billing account',
      'Nothing, the key is automatically encrypted'
    ],
    ans: 1
  },
  {
    q: 'What is a Bearer Token format structure?',
    opts: [
      'The word "Bearer" followed by a single space and the secret key string (e.g. "Bearer sk-proj-...")',
      'A JSON object containing keys coordinates',
      'A query parameter suffix'
    ],
    ans: 0
  },
  {
    q: 'Which tool allows you to visually test HTTP request headers before writing connection code?',
    opts: [
      'Postman or Thunder Client',
      'Google AI Studio playground',
      'The dotenv node module'
    ],
    ans: 0
  },
  {
    q: 'How do you refer to variable credentials declared inside a React Vite environment file?',
    opts: [
      'process.env.API_KEY',
      'import.meta.env.VITE_API_KEY',
      'window.VITE_API_KEY'
    ],
    ans: 1
  },
  {
    q: 'What should you do immediately if you suspect an API key has been exposed?',
    opts: [
      'Change your local system login passwords',
      'Revoke (delete) the key on the developer portal dashboard and generate a new replacement key string',
      'Write a macro script to clean it'
    ],
    ans: 1
  }
];

export default function GenAIDay16({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [mockKey, setMockKey] = useState("sk-proj-4a8b...C2df79");
  const [mockPrompt, setMockPrompt] = useState("Explain REST API keys in one sentence.");
  const [simOutput, setSimOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateCall = () => {
    if (!mockKey.trim() || !mockPrompt.trim()) return;
    setIsProcessing(true);
    setSimOutput('');

    const rawResponse = `🌐 CLIENT REQUEST SIMULATION:\n\nPOST /v1/chat/completions HTTP/1.1\nHost: api.openai.com\nAuthorization: Bearer ${mockKey}\nContent-Type: application/json\n\n{\n  "model": "gpt-4",\n  "messages": [{"role": "user", "content": "${mockPrompt}"}]\n}\n\n----------------------------------------\n\n🌐 SERVER REST RESPONSE (STATUS: 200 OK):\n\n{\n  "id": "chatcmpl-1a2b3c",\n  "object": "chat.completion",\n  "created": 1785160000,\n  "model": "gpt-4",\n  "choices": [\n    {\n      "index": 0,\n      "message": {\n        "role": "assistant",\n        "content": "An API key acts as a secure passport that authenticates your code requests when connecting to server endpoints."\n      },\n      "finish_reason": "stop"\n    }\n  ],\n  "usage": {\n    "prompt_tokens": 12,\n    "completion_tokens": 20,\n    "total_tokens": 32\n  }\n}`;

    let idx = 0;
    const interval = setInterval(() => {
      setSimOutput(rawResponse.slice(0, idx));
      idx += 2;
      if (idx > rawResponse.length) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 8);
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#0f172a' : 'transparent',
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

        {/* ── 1. OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 16
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Introduction to AI APIs & API Keys
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Integrating Large Language Models into applications requires establishing a secure connection channel. Today we learn how to generate authorization keys on cloud developer portals, format HTTP Bearer headers, and lock down credentials using environment files.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('use_cases')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                API Use Cases <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. USE CASES ─────────────────────────────────────────────── */}
        {activeTab === 'use_cases' && (
          <motion.div key="use_cases" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>💼 AI API Integration Workflows</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {API_SCENARIOS.map((sc) => (
                <div key={sc.id} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 0.6rem 0', fontWeight: 800, color: '#0f172a', fontSize: '1.35rem' }}>{sc.title}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '1.02rem', lineHeight: 1.6 }}>{sc.desc}</p>
                  <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', fontSize: '0.98rem', color: '#0f172a', borderLeft: '4px solid #475569', marginBottom: '0.8rem', lineHeight: 1.6 }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem' }}>🛠️ How to configure this step-by-step:</strong>
                    <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {sc.steps.map((st, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{st}</li>
                      ))}
                    </ol>
                  </div>
                  <span style={{ fontSize: '0.92rem', color: '#64748b' }}>💡 <strong>Pro Tip:</strong> {sc.tip}</span>
                </div>
              ))}
            </div>

            {/* Tools Directory */}
            <div style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>🛠️ AI API Portals & REST Testing Tools</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {TOOLS_DIRECTORY.map((t) => (
                  <div key={t.name} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', alignItems: 'center' }}>
                      <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>{t.name}</strong>
                      <span style={{ fontSize: '0.85rem', background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 600 }}>{t.category}</span>
                    </div>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>{t.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('workspace_sandbox')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'workspace_sandbox' && (
          <motion.div key="workspace_sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>💻 API Client Simulator</h2>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Developer API Key</label>
                  <input
                    type="text"
                    value={mockKey}
                    onChange={(e) => setMockKey(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>Model Prompt Request</label>
                  <input
                    type="text"
                    value={mockPrompt}
                    onChange={(e) => setMockPrompt(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.02rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button
                onClick={handleSimulateCall}
                disabled={isProcessing}
                style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '2rem', fontSize: '1.02rem' }}
              >
                {isProcessing ? '⏳ Connecting to LLM Cloud Endpoint...' : '⚡ Fire Simulated REST Request'}
              </button>

              <div>
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>🤖 HTTP Header Console & JSON Response</span>
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', minHeight: '220px', border: '1px solid #1e293b' }}>
                  {simOutput ? (
                    <pre style={{ margin: 0, color: '#38bdf8', fontSize: '0.95rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{simOutput}</pre>
                  ) : (
                    <span style={{ color: '#475569', fontSize: '0.95rem', fontStyle: 'italic' }}>Click the button above to test headers connection...</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Day 16 Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 16 Assignment</h2>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0' }}>
                ✏️ Practice: Writing a Node fetch connection request with headers
              </h4>
              <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Write a JavaScript block using the standard `fetch()` syntax connecting to the endpoint `https://api.openai.com/v1/chat/completions`.
                Ensure:
                <br />
                1. Request method is set to "POST".
                <br />
                2. Include the Authorization Bearer header referencing `process.env.OPENAI_API_KEY`.
                <br />
                3. Include the Content-Type header.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`fetch('https://api.openai.com/v1/chat/completions', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY\n  },\n  body: JSON.stringify({...})\n});`}
                style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1.02rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.8rem', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Fetch Request Registered!' : 'Submit Fetch Code'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1.2rem 1.5rem', marginBottom: '1.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem' }}>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.98rem' }}>
                  <strong>Code parameters validated!</strong> Start the assessment quiz below to finish Day 16.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Assessment Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>📝 Day 16 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1.02rem' }}>{QUIZ_QUESTIONS.length} questions — select your answers:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.8rem', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 1rem 0', fontSize: '1.12rem', lineHeight: 1.5 }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#f1f5f9'; border = '1.5px solid #0f172a'; color = '#0f172a'; }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.8rem 1.1rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '1.02rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400, lineHeight: 1.4 }}
                        >
                          {opt}
                          {quizSubmitted && isCorrect && <span style={{ float: 'right' }}>✓</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span style={{ float: 'right' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{ background: '#0f172a', borderColor: '#0f172a', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
                >
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12', fontSize: '1.05rem' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great Job!' : '📖 Review the lessons!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                    Retry Quiz
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
