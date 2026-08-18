import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Trophy, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, FileText, Share2, Award, QrCode, Code, Clipboard 
} from 'lucide-react';
import capstonePipelineImg from '../../assets/capstone_pipeline_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Capstone Project Specs' },
  { id: 'flow', label: '🏗️ Pipeline Blueprint' },
  { id: 'practical', label: '🛠️ Practical Guide' },
  { id: 'sandbox', label: '💻 Deployed System Portal' },
  { id: 'submission', label: '📝 Final Deliverables' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What does the "Duplicate Student Check" do in the Capstone workflow?',
    opts: [
      'It queries the Google Sheet first to see if the applicant\'s email already exists. If yes, it redirects to a staff alert; if no, it continues registration.',
      'It automatically formats the spreadsheet colors.',
      'It deletes the contact information.'
    ],
    ans: 0
  },
  {
    q: 'How is the custom Student ID (e.g. AF2026-004) generated in n8n?',
    opts: [
      'By using expressions (e.g. counting the current spreadsheet rows and prefixing it with the year, like "AF2026-00" + (row_count + 1)).',
      'By asking the AI to guess a random word.',
      'By checking the local computer password.'
    ],
    ans: 0
  },
  {
    q: 'What is the purpose of generating a QR Code and attaching it to the Welcome Letter PDF?',
    opts: [
      'To provide a scan link where the student can verify their ID, check-in for attendance, and download campus schedules easily.',
      'To make the PDF load faster.',
      'To bypass internet security checks.'
    ],
    ans: 0
  },
  {
    q: 'How does the workflow handle sending welcome kit attachments (Course Brochure, Fee Structure, Location)?',
    opts: [
      'By loading files from Google Drive and passing them as binary attachments to the Gmail and WhatsApp send nodes.',
      'By copy-pasting raw text links into plain comments.',
      'By requesting the student to log in to n8n directly.'
    ],
    ans: 0
  },
  {
    q: 'Why do we set up multiple triggers (Webhook & Scheduling) in a single industrial workspace?',
    opts: [
      'To support both instant web form registrations (via Webhook) and automated daily digests or follow-up email campaigns (via Schedule).',
      'To backup files automatically.',
      'To bypass API token validation.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay15({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Capstone Interactive Sandbox States
  const [studentName, setStudentName] = useState('Sarah Connor');
  const [studentEmail, setStudentEmail] = useState('sarah@connor.com');
  const [studentPhone, setStudentPhone] = useState('+1-555-0199');
  const [targetCourse, setTargetCourse] = useState('Agentic AI Development');

  // Bonus Features Configuration
  const [enableDuplicateCheck, setEnableDuplicateCheck] = useState(true);
  const [attachWelcomeKit, setAttachWelcomeKit] = useState(true);
  const [generateQrCode, setGenerateQrCode] = useState(true);

  // Simulation execution state
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [filesGeneratedList, setFilesGeneratedList] = useState([]);
  const [notificationDispatched, setNotificationDispatched] = useState(false);

  // Forms and Quiz
  const [workflowJson, setWorkflowJson] = useState('');
  const [documentationText, setDocumentationText] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Copy success indicator
  const [copiedIndex, setCopiedIndex] = useState(false);

  const runCapstoneSimulation = () => {
    setIsRunning(true);
    setSimLogs([]);
    setStudentId('');
    setQrCodeGenerated(false);
    setFilesGeneratedList([]);
    setNotificationDispatched(false);

    const logsList = [];
    const addLog = (logMsg, timeout) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setSimLogs(prev => [...prev, logMsg]);
          resolve();
        }, timeout);
      });
    };

    const runSteps = async () => {
      await addLog(`📡 Webhook Trigger: Received applicant details packet...`, 400);
      
      if (enableDuplicateCheck) {
        await addLog(`🔍 Step 1: Duplicate Check - Searching Google Sheets for "${studentEmail}"...`, 600);
        await addLog(`🟢 Duplicate Check result: OK (Unique record. Continuing admission flow.)`, 500);
      }

      await addLog(`🗄️ Step 2: Database Store - Appending applicant row into Master Sheet...`, 600);
      
      // Auto-generate ID
      const computedId = `AF2026-004`;
      await addLog(`⚙️ Step 3: Expression evaluation - Student ID generated: ${computedId}`, 500);
      setStudentId(computedId);

      if (generateQrCode) {
        await addLog(`🔲 Step 4: QR Code Service - Compiling unique badge scan URL...`, 600);
        await addLog(`🟢 QR Code generated successfully. Attached to output metadata.`, 400);
        setQrCodeGenerated(true);
      }

      await addLog(`📂 Step 5: Google Drive Node - Creating folder: "/Admissions/2026/${studentName.replace(/\s+/g, '_')}"...`, 600);
      await addLog(`📄 Step 6: PDF compiler - Formatting Welcome_Letter_${computedId}.pdf...`, 600);
      
      const files = [`Welcome_Letter_${computedId}.pdf`];
      if (attachWelcomeKit) {
        files.push(`Course_Brochure_${targetCourse.replace(/\s+/g, '_')}.pdf`, 'Fee_Structure_2026.pdf', 'Campus_Location_Map.pdf');
      }
      setFilesGeneratedList(files);
      await addLog(`📄 Welcome letter PDF written to Drive folder. Attached ${files.length} document references.`, 400);

      await addLog(`✉️ Step 7: Gmail Node - Welcome kit emailed to: ${studentEmail}`, 600);
      await addLog(`💬 Step 8: WhatsApp API - Dispatched text alerts to: ${studentPhone}`, 600);
      await addLog(`🔔 Step 9: Slack Integration - Staff alerted: "New Admission Registered. Welcome Sarah Connor!"`, 600);
      await addLog(`🏁 Step 10: CRM Node - Pipeline category changed to: "Admitted - Follow Up Scheduled"`, 500);

      setNotificationDispatched(true);
      setIsRunning(false);
    };

    runSteps();
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

  // Day 15 n8n JSON Export structure (Complete Capstone System)
  const rawN8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "admissions-webhook",
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
        "operation": "read",
        "documentId": "your_spreadsheet_id",
        "sheetName": "Students",
        "filters": {
          "mappingMode": "defineBelow",
          "value": [
            { "columnName": "Email", "value": "={{ $json.body.email }}" }
          ]
        }
      },
      "id": "2",
      "name": "Check Duplicate Student",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 3,
      "position": [280, 300]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{ $json.length }}",
              "operation": "larger",
              "value2": 0
            }
          ]
        }
      },
      "id": "3",
      "name": "Already Exists?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "channel": "admission-errors",
        "text": "🚨 Warning: Duplicate registration blocked for Email: {{ $node.Webhook Trigger.json.body.email }}"
      },
      "id": "4",
      "name": "Notify Duplicate Alert",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2,
      "position": [620, 180]
    },
    {
      "parameters": {
        "values": {
          "string": [
            { "name": "student_id", "value": "=AF2026-{{ $node.Check Duplicate Student.json.length + 1 }}" }
          ]
        }
      },
      "id": "5",
      "name": "Generate Student ID",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [620, 420]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "your_spreadsheet_id",
        "sheetName": "Students",
        "columns": {
          "mappingMode": "defineBelow",
          "value": [
            { "columnName": "StudentID", "value": "={{ $json.student_id }}" },
            { "columnName": "Name", "value": "={{ $node.Webhook Trigger.json.body.name }}" },
            { "columnName": "Email", "value": "={{ $node.Webhook Trigger.json.body.email }}" }
          ]
        }
      },
      "id": "6",
      "name": "Store Student Row",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 3,
      "position": [800, 420]
    },
    {
      "parameters": {
        "action": "create",
        "name": "={{ $node.Webhook Trigger.json.body.name }} Folder",
        "parents": ["your_google_drive_admissions_folder"]
      },
      "id": "7",
      "name": "Create Drive Folder",
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 2,
      "position": [980, 420]
    },
    {
      "parameters": {
        "html": "<h1>Welcome</h1><p>Student ID: {{ $node.\\"Generate Student ID\\".json.student_id }}</p>"
      },
      "id": "8",
      "name": "Compile PDF Letter",
      "type": "n8n-nodes-base.htmlToPdf",
      "typeVersion": 1,
      "position": [1160, 420]
    },
    {
      "parameters": {
        "operation": "upload",
        "fileKey": "data",
        "parents": ["={{ $node.Create Drive Folder.json.id }}"]
      },
      "id": "9",
      "name": "Upload PDF to Folder",
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 2,
      "position": [1320, 420]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "to": "={{ $node.Webhook Trigger.json.body.email }}",
        "subject": "Your Welcome Kit!",
        "message": "Hi, check your PDF welcome letter attached here!"
      },
      "id": "10",
      "name": "Gmail Welcome Kit",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [1480, 420]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [
          { "node": "Check Duplicate Student", "type": "main", "index": 0 }
        ]
      ]
    },
    "Check Duplicate Student": {
      "main": [
        [
          { "node": "Already Exists?", "type": "main", "index": 0 }
        ]
      ]
    },
    "Already Exists?": {
      "main": [
        [
          { "node": "Notify Duplicate Alert", "type": "main", "index": 0 }
        ],
        [
          { "node": "Generate Student ID", "type": "main", "index": 0 }
        ]
      ]
    },
    "Generate Student ID": {
      "main": [
        [
          { "node": "Store Student Row", "type": "main", "index": 0 }
        ]
      ]
    },
    "Store Student Row": {
      "main": [
        [
          { "node": "Create Drive Folder", "type": "main", "index": 0 }
        ]
      ]
    },
    "Create Drive Folder": {
      "main": [
        [
          { "node": "Compile PDF Letter", "type": "main", "index": 0 }
        ]
      ]
    },
    "Compile PDF Letter": {
      "main": [
        [
          { "node": "Upload PDF to Folder", "type": "main", "index": 0 }
        ]
      ]
    },
    "Upload PDF to Folder": {
      "main": [
        [
          { "node": "Gmail Welcome Kit", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Top Navigation */}
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
                <Trophy size={14} color="#fef08a" /> MODULE 3 CAPSTONE • DAY 15
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Capstone: AI Student Admission System
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Build a real-world enterprise admission workflow from scratch. We combine webhooks, duplicate student filters, database logging, PDF generators, Drive file folders, emails, and automatic WhatsApp alerts.
              </p>
            </div>

            {/* Capstone Pipeline Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                🗺️ Full 10-Step Student Admission Pipeline Blueprint
              </span>
              <img
                src={capstonePipelineImg}
                alt="Full Capstone Onboarding Pipeline - Webhook to DB to PDF to Gmail to Slack"
                style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  The Capstone Challenge
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  In this final module capstone project, you act as the Lead Automation Engineer. You will design a complete, multi-branch workflow that coordinates student applications.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  Your system must automatically calculate student IDs, attach course materials, generate PDF letters, notify school staff on Slack, and update database dashboard figures.
                </p>
              </div>

              {/* Requirement Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} style={{ color: '#7c3aed' }} /> Capstone Specs Check:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Webhook Trigger & Form Data parsing.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Duplicate Checks (already exists logic).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Automatic Student ID generation (AF2026-XXX).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Drive folder generation & Welcome Letter PDF compile.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>✓</span>
                    <span>Multi-channel alert (Email, WhatsApp, Slack).</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('flow')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Blueprint Flow <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. PIPELINE BLUEPRINT ───────────────────────────────────── */}
        {activeTab === 'flow' && (
          <motion.div key="flow" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ Capstone Workflow Pipeline Blueprint</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.5rem' }}>Follow the logic routing of your deployed n8n project:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 800 }}>⚡ Main Path execution</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#475569' }}>
                  <div><strong>1. Webhook Payload:</strong> Receives Name, Email, Phone, and chosen course.</div>
                  <div><strong>2. Duplicate Check:</strong> Searches Google Sheet. If exists, exits and emails staff.</div>
                  <div><strong>3. Generate ID:</strong> Expression code counts rows + prefixes string formatting.</div>
                  <div><strong>4. Google Drive folder:</strong> Generates unique directory folder path.</div>
                  <div><strong>5. PDF welcome letter:</strong> Compiles layout and embeds unique QR code scanning link.</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 800 }}>📢 Notification Dispatch Path</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#475569' }}>
                  <div><strong>6. Email Student:</strong> Attaches Welcome kit brochure and fee structures.</div>
                  <div><strong>7. WhatsApp Student:</strong> Dispatches PDF confirmation link to cell number.</div>
                  <div><strong>8. Notify Staff:</strong> Slack node pings admissions room channel.</div>
                  <div><strong>9. CRM Integration:</strong> Creates card inside Notion Board categories.</div>
                  <div><strong>10. Scheduler:</strong> Queues follow-up reminder wait node task for 7 days.</div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
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
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step Capstone Assembly Instructions</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Follow this 10-step sequence to build the complete admission system in n8n:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Deployed Capstone steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto' }}>
                {[
                  { s: 'Step 1: Webhook Trigger', d: 'Set path to "admissions-webhook" and HTTP Method to "POST".' },
                  { s: 'Step 2: Check Duplicate', d: 'Google Sheets Node: Action: "Read". Check if Applicant Email matches incoming payload body.' },
                  { s: 'Step 3: Branch Condition', d: 'IF Node: Splits flow. If exists ➔ Send Slack duplicate alert to staff. If not exists ➔ Continue.' },
                  { s: 'Step 4: Generate ID', d: 'Set Node: Create "student_id" string expression: "=AF2026-{{ $node.CheckDuplicate.json.length + 1 }}".' },
                  { s: 'Step 5: Store in Sheet', d: 'Google Sheets Node: Action: "Append". Map Name, Email, Phone, and calculated Student ID.' },
                  { s: 'Step 6: Create Drive Folder', d: 'Google Drive Node: Action: "Create Folder" with student name as directory path.' },
                  { s: 'Step 7: Compile PDF Letter', d: 'HTML to PDF Node: Enter welcome markup and inject unique ID variables.' },
                  { s: 'Step 8: Upload to Drive', d: 'Google Drive Node: Action: "Upload". Targets student folder ID and uploads PDF.' },
                  { s: 'Step 9: Gmail Welcome Kit', d: 'Gmail Node: Action: "Send". Attach brochure documents and welcome letter PDF.' },
                  { s: 'Step 10: Alert Staff', d: 'Slack Node: Send instant webhook notification alert to admissions room channel.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '14px' }}>
                    <strong style={{ color: '#7c3aed', display: 'block', fontSize: '0.92rem', marginBottom: '0.1rem' }}>{step.s}</strong>
                    <span style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.4, display: 'block' }}>{step.d}</span>
                  </div>
                ))}
              </div>

              {/* Copy-pasteable json */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COPY CAPSTONE PIPELINE JSON
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

                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '300px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{rawN8nWorkflowJson}</pre>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic', borderTop: '1px solid #1e293b', paddingTop: '0.5rem' }}>
                  💡 Tip: Copy this JSON, go to n8n canvas board, and press Ctrl+V. It imports the complete 10-node capstone system pipeline!
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('flow')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Blueprint
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Go to System Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Deployed Capstone System Portal</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '1.5rem' }}>Configure student options, enable bonus features, and watch n8n execute the complete 10-step pipeline:</p>

            {/* Visual 7-Node Capstone Canvas */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.5rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace', marginBottom: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Live Pipeline Execution Monitor</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.7rem', minWidth: 'max-content', margin: '0 auto' }}>
                {[
                  { icon: '🔌', label: 'Webhook', sub: 'Receive Form', color: '#5b21b6', border: '#a78bfa', idx: 0 },
                  { icon: '🔍', label: 'DB Search', sub: 'Duplicate Check', color: '#1c3b2e', border: '#4ade80', idx: 1 },
                  { icon: '⚖️', label: 'IF Filter', sub: 'Pass/Reject', color: '#1e293b', border: '#94a3b8', idx: 2 },
                  { icon: '💾', label: 'Google Sheets', sub: 'Append Row', color: '#14532d', border: '#4ade80', idx: 3 },
                  { icon: '📄', label: 'PDF Letter', sub: 'Compile Welcome Kit', color: '#1e3a5f', border: '#60a5fa', idx: 4 },
                  { icon: '📧', label: 'Gmail', sub: 'Send Welcome Email', color: '#1c1917', border: '#f87171', idx: 5 },
                  { icon: '💬', label: 'Slack + WA', sub: 'Team Alerts', color: '#78350f', border: '#fbbf24', idx: 6 }
                ].map((node, nIdx, arr) => {
                  const isActive = simLogs.length > node.idx;
                  return (
                    <React.Fragment key={nIdx}>
                      <div style={{ background: isActive ? node.color : '#1e293b', border: `2px solid ${isActive ? node.border : '#334155'}`, borderRadius: '12px', padding: '0.65rem 0.85rem', textAlign: 'center', minWidth: '95px', transition: 'all 0.5s', boxShadow: isActive ? `0 0 14px ${node.border}55` : 'none' }}>
                        <div style={{ fontSize: '1.2rem' }}>{node.icon}</div>
                        <div style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', marginTop: '0.2rem', lineHeight: 1.3 }}>{node.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.58rem', fontFamily: 'monospace', marginTop: '0.1rem', lineHeight: 1.3 }}>{node.sub}</div>
                        {isActive && <div style={{ fontSize: '0.58rem', color: node.border, fontWeight: 700, marginTop: '0.3rem' }}>✓ OK</div>}
                      </div>
                      {nIdx < arr.length - 1 && <div style={{ color: isActive ? '#a78bfa' : '#334155', fontSize: '1.1rem', transition: 'color 0.5s', flexShrink: 0 }}>➔</div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
               
               {/* Left Column Config */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Admission Controls
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Applicant Name:</label>
                      <input type="text" value={studentName} disabled={isRunning} onChange={(e) => setStudentName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Email Address:</label>
                      <input type="email" value={studentEmail} disabled={isRunning} onChange={(e) => setStudentEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Phone Number:</label>
                      <input type="text" value={studentPhone} disabled={isRunning} onChange={(e) => setStudentPhone(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Target Course:</label>
                      <select value={targetCourse} disabled={isRunning} onChange={(e) => setTargetCourse(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none' }}>
                        <option value="Agentic AI Development">Agentic AI Development</option>
                        <option value="n8n Workflow Automation">n8n Workflow Automation</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Enable Bonus Features:</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                        <input type="checkbox" checked={enableDuplicateCheck} onChange={(e) => setEnableDuplicateCheck(e.target.checked)} />
                        Duplicate student validation query
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                        <input type="checkbox" checked={attachWelcomeKit} onChange={(e) => setAttachWelcomeKit(e.target.checked)} />
                        Attach welcome brochure kit PDFs
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                        <input type="checkbox" checked={generateQrCode} onChange={(e) => setGenerateQrCode(e.target.checked)} />
                        Generate custom QR code on badge
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runCapstoneSimulation}
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
                  Initiate Capstone Admission
                </button>
              </div>

              {/* Right Column Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '560px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={15} style={{ color: '#7c3aed' }} /> SYSTEM MONITORS TRACK
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunning ? '#78350f' : '#064e3b', color: isRunning ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ VALIDATING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  {/* Execution Logs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Configure the settings and click Initiate to watch n8n process the admission pipeline...
                      </span>
                    )}
                    {simLogs.map((log, idx) => {
                      let color = '#e2e8f0';
                      if (log.includes('📄') || log.includes('Folder') || log.includes('Student ID')) color = '#fcd34d';
                      if (log.includes('🟢') || log.includes('successful') || log.includes('dispatched') || log.includes('Success')) color = '#34d399';
                      if (log.includes('Webhook') || log.includes('Google Drive') || log.includes('WhatsApp') || log.includes('Gmail') || log.includes('Slack')) color = '#60a5fa';
                      return (
                        <div key={idx} style={{ color, fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Outputs Panel Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  
                  {/* Generated files */}
                  {filesGeneratedList.length > 0 && (
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem' }}>
                      <span style={{ block: 'block', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
                        📁 FILES GENERATED
                      </span>
                      <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontFamily: 'monospace', lineHeight: 1.4 }}>
                        {filesGeneratedList.map((f, idx) => (
                          <div key={idx}>• {f}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QR Code details */}
                  {qrCodeGenerated && (
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={40} style={{ color: '#a7f3d0', marginBottom: '4px' }} />
                      <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontFamily: 'monospace', textAlign: 'center' }}>
                        QR Badge URL compiled: /scan/{studentId}
                      </span>
                    </div>
                  )}

                </div>

                {/* Deployed alerts dispatches */}
                {notificationDispatched && (
                  <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '0.8rem 1rem', color: '#e2e8f0', fontSize: '0.82rem', lineHeight: 1.4, boxSizing: 'border-box' }}>
                    <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>📢 PIPELINE DISPATCHED DETAILS:</strong>
                    • Deployed Student ID: <strong style={{ color: '#fcd34d' }}>{studentId}</strong>
                    <br />
                    • Welcome Kit: course brochure and brochures attached.
                    <br />
                    • WhatsApp & Slack alerts successfully sent.
                  </div>
                )}

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Practical Guide
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('submission')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Submit Capstone Project <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. FINAL DELIVERABLES ───────────────────────────────────── */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={22} style={{ color: '#7c3aed' }} />
                Submit n8n Capstone Deliverables
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Submission Checklist:</strong> Paste your workflow config and deployment explanations in the fields below.
                <br />
                Your project submission must contain the full JSON export of your n8n workflow canvas board, along with a deployment guide detailing how you connected your Gmail/Sheets API accounts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>n8n Workflow JSON Export:</label>
                  <textarea
                    value={workflowJson}
                    onChange={(e) => setWorkflowJson(e.target.value)}
                    placeholder={`{\n  "nodes": [\n    { "parameters": {}, "id": "...", "name": "Webhook", "type": "n8n-nodes-base.webhook" },\n    ...\n  ]\n}`}
                    style={{ width: '100%', height: '140px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Documentation & Deployment Guide:</label>
                  <textarea
                    value={documentationText}
                    onChange={(e) => setDocumentationText(e.target.value)}
                    placeholder={`1. API Credential setups...\n2. Duplicate check logic variables...\n3. Error handling path explanation...`}
                    style={{ width: '100%', height: '120px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
                  />
                </div>
              </div>

              <button
                onClick={() => setProjectSubmitted(true)}
                disabled={!workflowJson.trim() || !documentationText.trim() || projectSubmitted}
                style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {projectSubmitted ? '✅ Deployed Capstone System Registered' : 'Submit Deployed Project'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Final Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 15 Capstone Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have successfully graduated from Module 3!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('submission')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
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
