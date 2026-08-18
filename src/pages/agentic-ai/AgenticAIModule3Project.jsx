import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Database, Award, Clipboard, Code, HelpCircle } from 'lucide-react';
import n8nProjectDiagram from '../../assets/n8n_final_project_diagram.png';

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
  { id: 'submission', label: '🚀 Project Submission' }
];

export default function AgenticAIModule3Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);

  // Form input state
  const [studentName, setStudentName] = useState('John Doe');
  const [studentEmail, setStudentEmail] = useState('john.doe@example.com');
  const [selectedCourse, setSelectedCourse] = useState('Agentic AI Development');
  const [score, setScore] = useState(85);

  // Submission state
  const [repoUrl, setRepoUrl] = useState('');
  const [workflowJson, setWorkflowJson] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleWorkflowJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleWorkflowJson = {
    "nodes": [
      {
        "parameters": {
          "path": "admission-webhook",
          "options": {}
        },
        "id": "1",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [250, 300]
      },
      {
        "parameters": {
          "model": "gpt-4o-mini",
          "options": {
            "temperature": 0.5
          }
        },
        "id": "2",
        "name": "OpenAI Email Generator",
        "type": "n8n-nodes-base.openAi",
        "typeVersion": 1,
        "position": [450, 300]
      },
      {
        "parameters": {
          "sendTo": "={{$json.body.email}}",
          "subject": "Welcome to Alphafly Academy",
          "message": "={{$json.generatedText}}"
        },
        "id": "3",
        "name": "Gmail Node",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 1,
        "position": [650, 300]
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "OpenAI Email Generator",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "OpenAI Email Generator": {
        "main": [
          [
            {
              "node": "Gmail Node",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  };

  const runSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimStep(0);
    const logs = [
      "⚡ Webhook Triggered: Form submission received from " + studentName + " (" + studentEmail + ")",
      "🔍 Validating email format and score profile (Score: " + score + "%)",
      "💾 Google Sheets Node: Adding row with registration details...",
      "🧠 OpenAI Node: Generating custom welcome email based on course '" + selectedCourse + "'",
      "📧 Gmail Node: Dispatching email to " + studentEmail,
      "💬 Slack Node: Sending team alert 'New admission alert: " + studentName + " enrolled in " + selectedCourse + "'",
      "🎉 Workflow complete! Database, CRM, and Communication channels updated successfully."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        setSimStep(index + 1);
        if (index === logs.length - 1) {
          setIsRunning(false);
        }
      }, delay);
      delay += 850;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* 📋 Sub Tabs Nav */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#f97316' : '#64748b',
              border: 'none',
              padding: '0.55rem 1rem',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              transition: 'all .15s',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#ffedd5', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 3 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>AI-Powered Student Admission System</h1>
                <p style={{ color: '#ffedd5', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Build a production-ready lead automation workflow using n8n. Capture inbound students, generate personalized AI response emails, update databases, notify the sales team on Slack, and orchestrate calendar scheduling automatically.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Scenario</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Alphafly Academy needs an automated system to manage incoming student enrollment queries. Right now, students fill a Google Form, and sales staff manually email them back, write their details into spreadsheets, and coordinate team notifications. This process takes hours and loses valuable leads.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  <strong>Your Goal:</strong> Construct an n8n workflow that triggers instantly when a form is submitted, stores student information in a database, uses a Generative AI node to craft personalized course recommendations, and notifies stakeholders across channels in real-time.
                </p>
              </div>
              <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9a3412', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} style={{ color: '#ea580c' }} /> Requirements Checklist
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ n8n Webhook/Form trigger', '✅ Conditional Routing based on scores', '✅ OpenAI Node to generate dynamic content', '✅ Google Sheets database connection', '✅ Gmail automated notification', '✅ Slack Team alert notification'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#f97316', borderColor: '#f97316', padding: '0.8rem 1.6rem', borderRadius: 12, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(249,115,22,.35)' }}>
                System Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ── ARCHITECTURE ── */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Workflow Architecture Map</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>This diagram illustrates the flow of student data through the automation pipeline:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center' }}>
                <img src={n8nProjectDiagram} alt="n8n Final Project Diagram" style={{ maxWidth: '600px', width: '100%', borderRadius: 10 }} />
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Spec</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#f97316', borderColor: '#f97316', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Implementation Guide <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── GUIDE ── */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🛠️ Step-by-Step Implementation</h2>
                {[
                  { title: 'Step 1: Set Up Trigger Node', body: 'Create a Webhook node in n8n. Change Method to POST and Path to "student-admission". Alternatively, use the Google Forms Trigger node.' },
                  { title: 'Step 2: Database Storage', body: 'Add a Google Sheets / Postgres Node to write all student variables (Name, Email, Course, Score) directly into a new row for tracking.' },
                  { title: 'Step 3: OpenAI Text Generation', body: 'Connect an OpenAI / Llama node. Input the student\'s name and score in the prompt, asking the AI to write a personalized congratulations email.' },
                  { title: 'Step 4: Delivery via Gmail', body: 'Connect Gmail or SendGrid nodes. Map the destination email field to the input webhook email, and map the body to the OpenAI response text.' },
                  { title: 'Step 5: Alert Team via Slack', body: 'Add a Slack node to send a message to #admissions-leads alerting sales team reps to contact the prospective student immediately.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: 16 }}>
                    <strong style={{ color: '#f97316', display: 'block', fontSize: '1rem', marginBottom: '0.4rem' }}>{step.title}</strong>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{step.body}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#f97316', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> n8n JSON Export Snippet
                  </strong>
                  <button onClick={copyJson} style={{ background: copied ? '#059669' : '#3b82f6', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                    {copied ? 'Copied!' : 'Copy Schema'}
                  </button>
                </div>
                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '350px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{JSON.stringify(sampleWorkflowJson, null, 2)}</pre>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '1.2rem', lineHeight: 1.4 }}>
                  💡 Hint: Paste this JSON inside your n8n workspace canvas to auto-create the fundamental outline.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Architecture</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#f97316', borderColor: '#f97316', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Try Simulator <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── SIMULATOR ── */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 n8n Pipeline Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Fill custom webhook parameters below to trigger and trace the workflow execution steps:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Cpu size={16} style={{ color: '#f97316' }} /> Webhook Trigger Data
                </h3>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Student Name</label>
                  <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Student Email</label>
                  <input type="email" value={studentEmail} onChange={e => setStudentEmail(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Selected Course</label>
                  <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }}>
                    <option value="Agentic AI Development">Agentic AI Development</option>
                    <option value="AI-Powered Data Analytics">AI-Powered Data Analytics</option>
                    <option value="Python Full Stack with AI">Python Full Stack with AI</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>Admission Assessment Score: <strong style={{ color: '#f97316' }}>{score}%</strong></label>
                  <input type="range" min="30" max="100" step="5" value={score} onChange={e => setScore(Number(e.target.value))} disabled={isRunning} style={{ width: '100%', accentColor: '#f97316' }} />
                </div>
                <button onClick={runSimulator} disabled={isRunning} style={{ background: isRunning ? '#94a3b8' : '#f97316', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: isRunning ? 'default' : 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: isRunning ? 'none' : '0 4px 14px rgba(249,115,22,.25)', marginTop: 'auto', transition: 'all .2s' }}>
                  <Play size={15} /> {isRunning ? 'Executing Workflow...' : 'Trigger n8n Webhook'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '1.8rem', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', flex: 1, minHeight: 280, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Execution History & Logs</span>
                  {simLogs.length === 0 ? (
                    <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Fill details and click "Trigger n8n Webhook" to run sandbox.</span>
                  ) : (
                    simLogs.map((l, i) => (
                      <div key={i} style={{ fontSize: '.78rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 6, lineHeight: 1.4 }}>
                        {l}
                      </div>
                    ))
                  )}
                </div>

                {simStep >= 5 && (
                  <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 12, padding: '1rem' }}>
                    <span style={{ fontSize: '.65rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>📧 Generated AI Email Output</span>
                    <p style={{ margin: 0, fontSize: '.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                      <strong>Subject:</strong> Course Enrolment Update - Alphafly Academy<br /><br />
                      Hi {studentName},<br />
                      Congratulations on scoring {score}% in your entrance test! We are excited to enroll you in our <strong>{selectedCourse}</strong> program. Your credentials have been registered. Expect a follow-up call from our advisor shortly.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')} style={{ border: '1px solid #cbd5e1', padding: '0.8rem 1.6rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>← Back to Guide</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#f97316', borderColor: '#f97316', padding: '0.8rem 1.6rem', borderRadius: 12, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}>Submit Project <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}

        {/* ── SUBMISSION ── */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
                  <Trophy size={20} style={{ color: '#f97316' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Final Project Submission</h2>
                  <span style={{ fontSize: '.8rem', color: '#f97316', fontWeight: 700 }}>AI Student Admission System</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>GitHub / Project Repository URL</label>
                  <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/yourusername/n8n-student-admission" style={{ width: '100%', padding: '.65rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: 4 }}>n8n Workflow JSON Export</label>
                  <textarea value={workflowJson} onChange={e => setWorkflowJson(e.target.value)} placeholder="Paste the complete exported JSON of your workflow nodes here..." style={{ width: '100%', height: 180, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace', background: '#f8fafc' }} />
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} disabled={submitted || !repoUrl.trim() || !workflowJson.trim()} style={{ background: submitted ? '#059669' : '#f97316', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                {submitted ? <><CheckCircle size={16} /> Submitted Successfully! 🎉</> : 'Submit Final Project'}
              </button>

              {submitted && (
                <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', border: '1px solid #fed7aa', borderRadius: 16, padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#9a3412', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Congratulations! Module 3 Completed!</h3>
                  <p style={{ color: '#ea580c', margin: 0, fontSize: '0.98rem' }}>
                    Your n8n automation workflow was saved successfully. You have unlocked visual agent orchestration skills! Day 16 awaits your transition to Flowise!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
