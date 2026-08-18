import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Briefcase, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, FileText, Upload, Mail, Code, Clipboard 
} from 'lucide-react';
import pdfSlackWorkflowImg from '../../assets/pdf_slack_workflow_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'business_apps', label: '📂 Business Apps Integrations' },
  { id: 'practical', label: '🛠️ Practical Guide' },
  { id: 'sandbox', label: '💻 Pipeline Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'How does n8n handle file attachments like PDFs or CSVs in workflows?',
    opts: [
      'By using binary data variables that pass the actual file bytes securely from one node (like Google Drive) to another (like Gmail).',
      'By printing out the file contents to plain text comments only.',
      'By asking the user to copy-paste the documents manually.'
    ],
    ans: 0
  },
  {
    q: 'Which node would you use to record project logs in a structured web spreadsheet table?',
    opts: [
      'The Airtable Node or Google Sheets Node.',
      'The Manual Trigger Node.',
      'The Switch Node.'
    ],
    ans: 0
  },
  {
    q: 'What is the benefit of adding a Slack or Telegram notification node to a business workflow?',
    opts: [
      'To alert team members instantly on their chat apps when key events happen (like a new recruit resume upload or invoice payment).',
      'To make the computer boot faster.',
      'To format PDF files into HTML styles.'
    ],
    ans: 0
  },
  {
    q: 'What is "Error Handling" in workflow automation?',
    opts: [
      'Adding rules (like "On Fail: Continue workflow" or sending an alert email) so that if one node breaks, the entire script doesn\'t crash quietly.',
      'A method of deleting old logs automatically.',
      'A way to bypass API passwords.'
    ],
    ans: 0
  },
  {
    q: 'Why should you include scheduling nodes (Cron / Interval Triggers) in business workflows?',
    opts: [
      'To run actions automatically at set times (like compiling a daily report spreadsheet at 8:00 AM every morning).',
      'To encrypt private database folders.',
      'To reduce server hosting prices.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay14({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [pipelineType, setPipelineType] = useState('invoice'); // 'invoice' or 'report'
  const [clientName, setClientName] = useState('Skynet Inc');
  const [billingAmount, setBillingAmount] = useState(1500);
  const [reportDate, setReportDate] = useState('2026-07-28');

  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [driveFileId, setDriveFileId] = useState('');
  const [emailStatus, setEmailStatus] = useState('');

  // Quiz and assignment states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Copy success indicator
  const [copiedIndex, setCopiedIndex] = useState(false);

  const runPipelineSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setPdfGenerated(false);
    setDriveFileId('');
    setEmailStatus('');

    const isInvoice = pipelineType === 'invoice';

    const steps = [
      isInvoice ? `📄 PDF Generator: Formatting Invoice Document template...` : `📊 Report Node: Compiling database metrics for date: ${reportDate}...`,
      isInvoice ? `📄 PDF Compiled: INVOICE_${clientName}.pdf` : `📄 Report Compiled: DAILY_REPORT_${reportDate}.pdf`,
      `💾 Google Drive Node: Locating destination folder...`,
      `💾 Google Drive Node: File uploaded successfully. (ID: gd_file_82937)`,
      `✉️ Gmail Node: Building draft envelope and attaching binary PDF file...`,
      isInvoice ? `✉️ Gmail Node: Invoice emailed to finance@${clientName.toLowerCase().replace(/\s+/g, '')}.com` : `✉️ Gmail Node: Digest emailed to manager@company.com`
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        
        if (idx === 1) setPdfGenerated(true);
        if (idx === 3) setDriveFileId('gd_file_82937');
        
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setEmailStatus(isInvoice ? `Invoice emailed to finance@${clientName.toLowerCase().replace(/\s+/g, '')}.com` : `Daily report emailed to manager@company.com`);
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

  // Day 14 n8n JSON Export structure
  const rawN8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": {},
      "id": "1",
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [100, 300]
    },
    {
      "parameters": {
        "html": "<h1>Invoice</h1><p>Client: {{ $json.client_name }}</p><p>Amount Owed: {{ $json.amount }}</p>",
        "options": {}
      },
      "id": "2",
      "name": "Generate PDF Node",
      "type": "n8n-nodes-base.htmlToPdf",
      "typeVersion": 1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "authentication": "serviceAccount",
        "operation": "upload",
        "fileKey": "data",
        "parents": ["your_google_drive_folder_id"]
      },
      "id": "3",
      "name": "Upload to Google Drive",
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 2,
      "position": [500, 300],
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "channel": "admissions-alerts",
        "text": "🚨 Warning: PDF Drive upload failed for Client: {{ $node.Manual Trigger.json.client_name }}. Please review immediately."
      },
      "id": "4",
      "name": "Send Slack Error Notification",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2,
      "position": [700, 420]
    }
  ],
  "connections": {
    "Manual Trigger": {
      "main": [
        [
          { "node": "Generate PDF Node", "type": "main", "index": 0 }
        ]
      ]
    },
    "Generate PDF Node": {
      "main": [
        [
          { "node": "Upload to Google Drive", "type": "main", "index": 0 }
        ]
      ]
    },
    "Upload to Google Drive": {
      "main": [
        [],
        [
          { "node": "Send Slack Error Notification", "type": "main", "index": 0 }
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
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 14
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Business Automation
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Master integrating everyday business software. We learn how to automate PDF invoices, connect folders in Google Drive, push database updates, log error alerts, and send automated notifications on Slack and email.
              </p>
            </div>

            {/* PDF/Slack Workflow Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                🗺️ PDF Compiler + Slack Error-Fallback Pipeline
              </span>
              <img
                src={pdfSlackWorkflowImg}
                alt="n8n Schedule to PDF to Drive to Gmail and Slack fallback workflow"
                style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  Connecting Business Applications
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  Real-world company operations rely on files, reports, and team chat channels. In this lesson, we study how to compile custom reports using spreadsheet rows and attach PDF files in Gmail automatically.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  We also cover **Error Handling** basics: defining what n8n should do if an external server is down. Setting fallback actions ensures your pipeline continues running safely.
                </p>
              </div>

              {/* Requirement Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} style={{ color: '#7c3aed' }} /> Integrations Explored:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>📂 Google Drive:</span>
                    <span>Creates folders and uploads compiled PDFs.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>📝 Notion / Airtable:</span>
                    <span>Logs records and keeps database rows in sync.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>💬 Slack / Telegram:</span>
                    <span>Sends instant text message updates to team members.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>⚠️ Error Logging:</span>
                    <span>Flags database failures to prevent silent failures.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('business_apps')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Business Integrations <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. BUSINESS APP INTEGRATIONS ────────────────────────────── */}
        {activeTab === 'business_apps' && (
          <motion.div key="business_apps" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📁 Business Apps Integration Patterns</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Learn how n8n interacts with different business systems:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Binary Data Objects</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Binary is how n8n manages raw files (like images, PDF invoices, or CSV spreadsheets) in memory.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Error Fallbacks</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Setting nodes to "Continue on Fail" allows workflows to log errors and complete other operations.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Scheduling Triggers</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Trigger workflows daily, weekly, or hourly using standard cron expressions.</span>
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
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step Business Integrations & Fallbacks</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Learn how to generate PDFs, upload files to Drive, connect Notion columns, and configure Slack fallback alerts:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Detailed Node setup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>1. Generate PDF Node</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Drag the **HTML to PDF Node** to your canvas. Write basic HTML structure in parameter box. Link variables using double brackets:
                    <br />
                    <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"<h1>Invoice Owed</h1><p>{{ $json.client_name }}</p>"}</code>.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>2. Google Drive Storage & Upload</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Drag the **Google Drive Node**. Select Action: **Upload**. Match target folder path keys.
                    Under inputs, link the binary file reference from the PDF Compiler Node.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>3. Error Handling (Slack Fallback)</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Select Google Drive Node Settings. Toggle **On Fail: Continue**. This exposes a second, dotted error output circle on the node.
                    Drag a **Slack Node** and link it to this error output circle to send alerts if files fail to upload.
                  </span>
                </div>

              </div>

              {/* Copy-pasteable json */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COPY-PASTE DRIVE WORKFLOW JSON
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
                  💡 Tip: Import this workflow JSON directly into n8n to see a fully configured HTML-to-PDF compiler connected to Google Drive uploaders.
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('business_apps')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Apps
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Go to Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>

            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Business Pipeline Sandbox</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure parameters, run the automation loop, and monitor how file logs are written:</p>

            {/* Visual 4-Node Pipeline Canvas */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', overflowX: 'auto' }}>
              {[
                { icon: '⏰', label: 'Schedule Trigger', sub: 'Cron: 8:00 AM daily', color: '#5b21b6', border: '#a78bfa', idx: 0 },
                { icon: '📄', label: 'PDF Generator', sub: 'HTML-to-PDF', color: '#1e3a5f', border: '#60a5fa', idx: 1 },
                { icon: '💾', label: 'Google Drive', sub: 'Upload to Folder', color: '#14532d', border: '#4ade80', idx: 2 },
                { icon: '📧', label: 'Gmail + Slack', sub: 'Send + Notify', color: '#78350f', border: '#fbbf24', idx: 3 }
              ].map((node, nIdx, arr) => {
                const isActive = simLogs.length > node.idx;
                return (
                  <React.Fragment key={nIdx}>
                    <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.7rem 1.1rem', textAlign: 'center', minWidth: '110px', transition: 'all 0.4s', boxShadow: isActive ? `0 0 16px ${node.border}55` : 'none' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Config Panel */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Config Parameters
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Select Task Category:</label>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => setPipelineType('invoice')}
                          disabled={isRunning}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: pipelineType === 'invoice' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: pipelineType === 'invoice' ? '#f5f3ff' : 'white',
                            color: pipelineType === 'invoice' ? '#7c3aed' : '#475569',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem'
                          }}
                        >
                          📄 Invoice Automator
                        </button>
                        <button
                          onClick={() => setPipelineType('report')}
                          disabled={isRunning}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: pipelineType === 'report' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: pipelineType === 'report' ? '#f5f3ff' : 'white',
                            color: pipelineType === 'report' ? '#7c3aed' : '#475569',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem'
                          }}
                        >
                          📊 Daily Performance
                        </button>
                      </div>
                    </div>

                    {pipelineType === 'invoice' ? (
                      <>
                        <div>
                          <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Client Name:</label>
                          <input type="text" value={clientName} disabled={isRunning} onChange={(e) => setClientName(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Total Billing Amount ($):</label>
                          <input type="number" value={billingAmount} disabled={isRunning} onChange={(e) => setBillingAmount(Number(e.target.value))} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                      </>
                    ) : (
                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Report Log Date:</label>
                        <input type="date" value={reportDate} disabled={isRunning} onChange={(e) => setReportDate(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    )}

                  </div>
                </div>

                <button
                  onClick={runPipelineSimulator}
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
                  Run Business Pipeline
                </button>
              </div>

              {/* Console monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> BUSINESS FLOW LOGS
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ GENERATING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  {/* Execution logs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure the settings and click Run to start business pipeline simulation...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('📄') || log.includes('Report')) color = '#fcd34d';
                      if (log.includes('🟢') || log.includes('successful') || log.includes('uploaded') || log.includes('Success')) color = '#34d399';
                      if (log.includes('Google Drive') || log.includes('Gmail')) color = '#60a5fa';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PDF generation mock UI */}
                {pdfGenerated && (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                      <FileText size={12} /> BINARY FILE PREVIEW (IN-MEMORY BYTES)
                    </span>
                    <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                      {pipelineType === 'invoice' ? (
                        <>
                          File: INVOICE_{clientName}.pdf<br />
                          Recipient: Skynet Billing Dept<br />
                          Total Owed: ${billingAmount} USD<br />
                          Signature Hash: MD5_3f82a7
                        </>
                      ) : (
                        <>
                          File: DAILY_REPORT_{reportDate}.pdf<br />
                          Subject: Performance Digest<br />
                          Metrics: compiled from SQL records<br />
                          Encoding: application/pdf
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Drive file confirmation and email */}
                {driveFileId && (
                  <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '1rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.45, boxSizing: 'border-box', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Upload size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>☁️ GOOGLE DRIVE CLOUD UPLOADED:</strong>
                      <span>Stored in Folder: /Business/Reports</span>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>File ID: {driveFileId}</span>
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
                <Briefcase size={22} style={{ color: '#7c3aed' }} />
                Day 14 Assignment: Daily Attendance Automation
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You want to build a workflow that runs every day at 6:00 PM.
                <br />
                Draft the nodes, logic branches, and integrations needed in n8n so that:
                <br />
                1. A **Schedule Trigger** fires at 18:00 (6:00 PM) daily.
                <br />
                2. An **HTTP Request Node** fetches the attendance logs from the company portal.
                <br />
                3. A **Google Sheets Node** appends these logs to an archiving sheet.
                <br />
                4. **Error Handling**: If the attendance portal is down, n8n sends a fallback error message to the manager\'s Slack channel instead of stopping.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`1. Schedule Trigger details...\n2. API error handling logic settings...\n3. Slack notification parameters...`}
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
                Start Day 14 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 14 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered business app integrations!' : 'Review the correct options highlighted green above.'}
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
