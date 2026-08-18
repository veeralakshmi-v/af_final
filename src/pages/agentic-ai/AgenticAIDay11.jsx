import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, GitBranch, Play, RefreshCw, 
  CheckCircle, Terminal, HelpCircle, AlertCircle, Settings, Layers, Code, Clipboard, Info, Eye
} from 'lucide-react';
import n8nInterfaceImg11 from '../../assets/n8n_interface_overview.png';
import leaveWorkflowImg from '../../assets/employee_leave_workflow_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'interface', label: '🖥️ n8n Interface Tour' },
  { id: 'practical', label: '🛠️ Practical Guide' },
  { id: 'sandbox', label: '💻 Interactive Canvas' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is n8n in simple terms?',
    opts: [
      'A node-based workflow automation tool that lets you connect different apps, databases, and APIs together without writing complex code.',
      'A computer graphics card used to paint game elements.',
      'A database server that only stores image files.'
    ],
    ans: 0
  },
  {
    q: 'In n8n, what is a "Trigger Node"?',
    opts: [
      'A node that starts the workflow when an event happens (like a form submission or a scheduled time).',
      'A function that deletes your workflow logs.',
      'A stylesheet rule that colors button elements.'
    ],
    ans: 0
  },
  {
    q: 'What is the main difference between n8n Cloud and Self-hosted n8n?',
    opts: [
      'n8n Cloud is hosted by n8n on their servers for a fee; Self-hosted is run on your own computer or server for free.',
      'n8n Cloud can only run on cellphones.',
      'Self-hosted does not support Javascript expressions.'
    ],
    ans: 0
  },
  {
    q: 'What is a "Set Node" used for in n8n?',
    opts: [
      'To insert, edit, or configure variable fields and values in the workflow memory data.',
      'To turn off the local server.',
      'To design dashboard layout styles.'
    ],
    ans: 0
  },
  {
    q: 'What happens when an "IF Node" checks a condition in n8n?',
    opts: [
      'It splits the execution flow into two branches: a "True" branch and a "False" branch depending on the check results.',
      'It immediately deletes the database parameters.',
      'It stops the workflow and prints an error code.'
    ],
    ans: 0
  }
];

const INTERFACE_SECTIONS = [
  {
    id: 'canvas',
    title: '1. The Workflow Canvas Grid',
    coords: 'Center Workspace',
    description: 'The visual designer grid where you drag, drop, and link nodes together using connection paths. It supports zoom, panning, and multi-selection of nodes.',
    hotspotStyle: { top: '45%', left: '50%' }
  },
  {
    id: 'nodes',
    title: '2. The Nodes Panel Search',
    coords: 'Right Sidebar Panel',
    description: 'Contains all available node types categorized by Action, Trigger, and Integration type. Search for tools like Gmail, Slack, OpenAI, or database triggers here.',
    hotspotStyle: { top: '50%', left: '92%' }
  },
  {
    id: 'parameters',
    title: '3. Node Configuration Drawer',
    coords: 'Double-Click Modal Drawer',
    description: 'Double-clicking any node opens this parameter drawer, allowing you to configure credential authorizations, input fields, and toggle between static inputs and JavaScript expression values.',
    hotspotStyle: { top: '35%', left: '80%' }
  },
  {
    id: 'executions',
    title: '4. Executions Console',
    coords: 'Bottom Execution Bar',
    description: 'Displays active run states. Click the orange "Execute Workflow" button to run the canvas locally and review real-time step outputs.',
    hotspotStyle: { top: '92%', left: '48%' }
  },
  {
    id: 'dashboard',
    title: '5. Main Sidebar Controls',
    coords: 'Left Navigation Bar',
    description: 'Access your files templates library, manage secure OAuth credentials keys, view running execution logs, and toggle workflows to Active.',
    hotspotStyle: { top: '40%', left: '5%' }
  }
];

export default function AgenticAIDay11({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Sandbox States
  const [employeeName, setEmployeeName] = useState('Sarah Connor');
  const [leaveDays, setLeaveDays] = useState(4);
  const [activeNode, setActiveNode] = useState(null); // 'trigger', 'set', 'if', 'email', 'slack'
  const [selectedNodeDetails, setSelectedNodeDetails] = useState('trigger'); // node detail key
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [flowOutputs, setFlowOutputs] = useState([]);

  // Interface tour state
  const [selectedSection, setSelectedSection] = useState('canvas');

  // Forms and quiz states
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Copy success indicator
  const [copiedIndex, setCopiedIndex] = useState(false);

  const runWorkflowSimulation = () => {
    setIsRunningSim(true);
    setSimLogs([]);
    setFlowOutputs([]);
    setActiveNode('trigger');

    const steps = [
      { id: 'trigger', log: '🟢 Trigger: Manual execution request detected.' },
      { id: 'set', log: `⚙️ Set Node: Declaring variables { employee_name: "${employeeName}", leave_days: ${leaveDays} }` },
      { id: 'if', log: `⚖️ IF Node: Checking condition (leave_days: ${leaveDays} <= 5)...` },
      { id: 'evaluate_if', log: leaveDays <= 5 ? '✅ Condition Result: TRUE (Leave days <= 5)' : '❌ Condition Result: FALSE (Leave days > 5)' },
      { id: 'email', log: leaveDays <= 5 ? '📧 Gmail Node: Dispatching automatic approval welcome kit!' : '💬 Slack Node: Alerting HR manager to perform manual review.' },
      { id: 'complete', log: '🏁 Workflow executed successfully.' }
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step.log]);

        if (step.id === 'evaluate_if') {
          setActiveNode('if');
        } else if (step.id === 'complete') {
          setActiveNode(null);
          setIsRunningSim(false);
          setFlowOutputs(leaveDays <= 5 ? [
            'status: approved',
            'sender: n8n-automation-system',
            'action: Gmail Auto-Approval Sent'
          ] : [
            'status: pending_review',
            'sender: n8n-automation-system',
            'action: Slack Alert Sent to HR Manager'
          ]);
        } else {
          setActiveNode(step.id);
        }
      }, delay);
      delay += 900;
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

  const rawN8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": {},
      "id": "1",
      "name": "When clicking \\"Execute Workflow\\"",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [250, 360]
    },
    {
      "parameters": {
        "values": {
          "string": [
            { "name": "employee_name", "value": "Sarah Connor" }
          ],
          "number": [
            { "name": "leave_days", "value": 4 }
          ]
        }
      },
      "id": "2",
      "name": "Set Request Details",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [450, 360]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{ $json.leave_days }}",
              "operation": "smallerEqual",
              "value2": 5
            }
          ]
        }
      },
      "id": "3",
      "name": "Is Leave <= 5 Days?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 360]
    }
  ],
  "connections": {
    "When clicking \\"Execute Workflow\\"": {
      "main": [
        [
          { "node": "Set Request Details", "type": "main", "index": 0 }
        ]
      ]
    },
    "Set Request Details": {
      "main": [
        [
          { "node": "Is Leave <= 5 Days?", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Tab Navigation */}
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
            
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e9d5ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 3 • DAY 11
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Introduction to n8n & Workflows
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn the absolute basics of automation with n8n. We compare manual vs automated processes, explain nodes and connections, and see how data flows from trigger events to target actions.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                🗺️ Leave Approval Automation Blueprint
              </span>
              <img 
                src={leaveWorkflowImg} 
                alt="n8n Leave Approval Flow Diagram" 
                style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What is Workflow Automation?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  **Automation** means setting up rules so computers perform repetitive tasks automatically without human intervention. Instead of manually copying details from email forms into Excel sheets and typing alerts on WhatsApp, we build a **workflow** that does it instantly.
                </p>

                <h4 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>
                  Comparison in simple terms:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#f8fafc', padding: '1.2rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                  <div>
                    <strong style={{ color: '#ef4444', display: 'block', fontSize: '0.92rem' }}>❌ Manual Process:</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Student fills form ➔ Staff reads email ➔ Staff copy-pastes to Excel ➔ Staff sends WhatsApp alert manually.</span>
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.8rem' }}>
                    <strong style={{ color: '#059669', display: 'block', fontSize: '0.92rem' }}>🟢 Automated Process (n8n):</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Google Form filled ➔ n8n detects it ➔ n8n inserts row into Google Sheet ➔ n8n calls WhatsApp API automatically.</span>
                  </div>
                </div>
              </div>

              {/* Node terms */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>
                  ⚙️ Key n8n Concepts:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>👤 Nodes:</span>
                    <span>The blocks that do things (like send emails or format text).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>⚡ Triggers:</span>
                    <span>Events that kick off the workflow (e.g. Schedule, Webhook).</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🔗 Connections:</span>
                    <span>Lines that carry data from one node to the next.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>🔑 Credentials:</span>
                    <span>Authorized passcodes to securely log in to Google, Slack, etc.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('interface')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View n8n Interface Tour <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. N8N INTERFACE TOUR ────────────────────────────────────── */}
        {activeTab === 'interface' && (
          <motion.div key="interface" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🖥️ Interactive n8n Interface Tour</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>
              Click on the layout sections below or use the panel controls to explore how n8n dashboard editor works:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Interactive Image Container */}
              <div style={{ position: 'relative', background: '#0f172a', border: '1px solid #1e293b', padding: '1rem', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={n8nInterfaceImg11} 
                  alt="n8n Interface Map" 
                  style={{ maxWidth: '600px', width: '100%', borderRadius: '14px', border: '1px solid #334155' }} 
                />

                {/* Hotspot triggers overlay */}
                {INTERFACE_SECTIONS.map((sec) => {
                  const isSelected = selectedSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSection(sec.id)}
                      style={{
                        position: 'absolute',
                        ...sec.hotspotStyle,
                        transform: 'translate(-50%, -50%)',
                        background: isSelected ? '#a78bfa' : 'rgba(124, 58, 237, 0.75)',
                        border: isSelected ? '2px solid white' : '1px solid #c4b5fd',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        boxShadow: '0 0 15px rgba(124,58,237,0.5)',
                        transition: 'all 0.15s',
                        zIndex: 10
                      }}
                    >
                      {sec.id === 'canvas' && '1'}
                      {sec.id === 'nodes' && '2'}
                      {sec.id === 'parameters' && '3'}
                      {sec.id === 'executions' && '4'}
                      {sec.id === 'dashboard' && '5'}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory sidebar card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    📌 Interface Component Explorer
                  </span>
                  
                  {(() => {
                    const sec = INTERFACE_SECTIONS.find(s => s.id === selectedSection);
                    return (
                      <div key={sec.id}>
                        <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
                          {sec.title}
                        </h3>
                        <span style={{ display: 'inline-block', fontSize: '0.78rem', background: '#ddd6fe', color: '#5b21b6', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700, marginBottom: '1.2rem' }}>
                          📍 Location: {sec.coords}
                        </span>
                        <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
                          {sec.description}
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Section Quick Select List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {INTERFACE_SECTIONS.map((sec) => {
                    const isSelected = selectedSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setSelectedSection(sec.id)}
                        style={{
                          background: isSelected ? '#f5f3ff' : 'white',
                          border: isSelected ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                          color: isSelected ? '#7c3aed' : '#475569',
                          textAlign: 'left',
                          padding: '0.75rem 1.2rem',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          transition: 'all 0.15s'
                        }}
                      >
                        {sec.title}
                      </button>
                    );
                  })}
                </div>
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
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛠️ Step-by-Step Practical Blueprint</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Learn how to physically configure nodes, connect inputs, and write expressions inside the n8n canvas board:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Practical steps list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>1. Drag and Link Nodes</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Open the **Nodes panel** on the right drawer. Search for "Set" and drag it onto the canvas grid. Connect the gray output node bullet of your trigger block to the input bullet of your Set Node.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>2. Writing Data Expressions</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    To reference data dynamically from previous nodes, click on any input field, switch to the **Expression** tab, and write double-curly brackets:
                    <br />
                    • <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"{{ $json.employee_name }}"}</code> targets variables inside the current payload.
                    <br />
                    • <code style={{ color: '#b91c1c', fontFamily: 'monospace' }}>{"{{ $node[\"Set Request Details\"].json.leave_days }}"}</code> reads fields from previous steps.
                  </span>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.3rem', borderRadius: '18px' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>3. How to Save & Run</strong>
                  <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                    Click the orange **"Execute Workflow"** button at the bottom of the screen. Watch n8n light up each node with a green checkmark to confirm successful data passes.
                  </span>
                </div>

              </div>

              {/* Workflow JSON exporter code block */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.9rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={15} /> COPY-PASTE WORKFLOW JSON TEMPLATE
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

                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, overflowY: 'auto', maxHeight: '320px' }}>
                  <pre style={{ margin: 0, color: '#a7f3d0' }}>{rawN8nWorkflowJson}</pre>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic', borderTop: '1px solid #1e293b', paddingTop: '0.5rem' }}>
                  💡 Tip: Copy this JSON, go to n8n canvas board, and press Ctrl+V to import the setup automatically.
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('interface')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Interface
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try Canvas Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. INTERACTIVE CANVAS SANDBOX ────────────────────────────── */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Interactive n8n Canvas Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>
              Configure variables, select nodes to inspect their configurations, and watch data travel across active paths:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Parameter Editor Panel */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Parameter Configuration
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Employee Name:</label>
                      <input
                        type="text"
                        value={employeeName}
                        disabled={isRunningSim}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Leave Duration (Days):</label>
                      <input
                        type="number"
                        value={leaveDays}
                        disabled={isRunningSim}
                        onChange={(e) => setLeaveDays(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Node Details Display Card */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginTop: '1.2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                      ⚙️ Selected Node Parameters
                    </span>
                    {selectedNodeDetails === 'trigger' && (
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Manual Trigger Node</strong>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginTop: '0.2rem' }}>
                          Starts the flow on user request. Output payload: <code>{"{}"}</code>
                        </span>
                      </div>
                    )}
                    {selectedNodeDetails === 'set' && (
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Set Node (Details Generator)</strong>
                        <div style={{ fontSize: '0.8rem', color: '#475569', fontFamily: 'monospace', background: '#f1f5f9', padding: '0.4rem', borderRadius: '6px', marginTop: '0.3rem' }}>
                          {`{\n  "employee_name": "${employeeName}",\n  "leave_days": ${leaveDays}\n}`}
                        </div>
                      </div>
                    )}
                    {selectedNodeDetails === 'if' && (
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>IF Branching Node</strong>
                        <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginTop: '0.2rem' }}>
                          Condition: <code>{"{{ $json.leave_days }} <= 5"}</code>
                          <br />
                          Result: <strong style={{ color: leaveDays <= 5 ? '#10b981' : '#ef4444' }}>{leaveDays <= 5 ? 'TRUE (Auto-Approve)' : 'FALSE (HR Alert)'}</strong>
                        </span>
                      </div>
                    )}
                    {selectedNodeDetails === 'email' && (
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Gmail Auto-Approval Node</strong>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginTop: '0.2rem' }}>
                          Sends a formal welcome confirmation to {employeeName}.
                        </span>
                      </div>
                    )}
                    {selectedNodeDetails === 'slack' && (
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Slack Notification Node</strong>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginTop: '0.2rem' }}>
                          Sends review alert: <code>"Warning: Leave request for {employeeName} requires manual review."</code>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={runWorkflowSimulation}
                  disabled={isRunningSim}
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
                  {isRunningSim ? 'Executing Workflow...' : 'Execute Workflow'}
                </button>
              </div>

              {/* Grid Canvas Panel */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between', minHeight: '520px', boxSizing: 'border-box' }}>
                
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.5rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.88rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Eye size={16} style={{ color: '#7c3aed' }} /> VISUAL CANVAS FLOW
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isRunningSim ? '#78350f' : '#064e3b', color: isRunningSim ? '#fbbf24' : '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                      {isRunningSim ? '⏳ RUNNING' : '🟢 ONLINE'}
                    </span>
                  </div>

                  {/* Flow canvas nodes graphic */}
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0', alignItems: 'center', background: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '16px 16px', border: '1px dashed #334155', borderRadius: '16px', minHeight: '260px', justifyContent: 'center' }}>
                    
                    {/* Linear Row on top */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Node 1: Trigger */}
                      <div 
                        onClick={() => setSelectedNodeDetails('trigger')}
                        style={{ 
                          padding: '0.5rem 0.75rem', 
                          borderRadius: '8px', 
                          border: activeNode === 'trigger' ? '2px solid #a78bfa' : selectedNodeDetails === 'trigger' ? '2px solid #7c3aed' : '1px solid #334155', 
                          background: activeNode === 'trigger' ? '#5b21b6' : '#1e293b',
                          color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        ⚡ Manual Trigger
                      </div>

                      <span style={{ color: '#475569', fontSize: '0.8rem' }}>➔</span>

                      {/* Node 2: Set */}
                      <div 
                        onClick={() => setSelectedNodeDetails('set')}
                        style={{ 
                          padding: '0.5rem 0.75rem', 
                          borderRadius: '8px', 
                          border: activeNode === 'set' ? '2px solid #a78bfa' : selectedNodeDetails === 'set' ? '2px solid #7c3aed' : '1px solid #334155', 
                          background: activeNode === 'set' ? '#5b21b6' : '#1e293b',
                          color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        ⚙️ Set Info
                      </div>

                      <span style={{ color: '#475569', fontSize: '0.8rem' }}>➔</span>

                      {/* Node 3: IF */}
                      <div 
                        onClick={() => setSelectedNodeDetails('if')}
                        style={{ 
                          padding: '0.5rem 0.75rem', 
                          borderRadius: '8px', 
                          border: activeNode === 'if' ? '2px solid #a78bfa' : selectedNodeDetails === 'if' ? '2px solid #7c3aed' : '1px solid #334155', 
                          background: activeNode === 'if' ? '#5b21b6' : '#1e293b',
                          color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        ⚖️ IF Branch
                      </div>
                    </div>

                    {/* Output branches row */}
                    <div style={{ display: 'flex', gap: '3rem', width: '100%', justifyContent: 'center', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>
                      {/* True Branch (Auto-Approve Email) */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', color: '#10b981', fontFamily: 'monospace', fontWeight: 700 }}>TRUE (Days &lt;= 5)</span>
                        <div 
                          onClick={() => setSelectedNodeDetails('email')}
                          style={{ 
                            padding: '0.5rem 0.75rem', 
                            borderRadius: '8px', 
                            border: activeNode === 'email' ? '2px solid #10b981' : selectedNodeDetails === 'email' ? '2px solid #7c3aed' : '1px solid #334155', 
                            background: activeNode === 'email' ? '#064e3b' : '#1e293b',
                            color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer',
                            opacity: isRunningSim && leaveDays > 5 ? 0.3 : 1,
                            transition: 'all 0.15s'
                          }}
                        >
                          📧 Gmail Node
                        </div>
                      </div>

                      {/* False Branch (Manager Alert) */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', color: '#f59e0b', fontFamily: 'monospace', fontWeight: 700 }}>FALSE (Days &gt; 5)</span>
                        <div 
                          onClick={() => setSelectedNodeDetails('slack')}
                          style={{ 
                            padding: '0.5rem 0.75rem', 
                            borderRadius: '8px', 
                            border: activeNode === 'slack' ? '2px solid #f59e0b' : selectedNodeDetails === 'slack' ? '2px solid #7c3aed' : '1px solid #334155', 
                            background: activeNode === 'slack' ? '#78350f' : '#1e293b',
                            color: 'white', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer',
                            opacity: isRunningSim && leaveDays <= 5 ? 0.3 : 1,
                            transition: 'all 0.15s'
                          }}
                        >
                          💬 Slack Node
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Console Log Outputs */}
                <div style={{ background: '#1e293b', padding: '1.2rem', border: '1px solid #334155', borderRadius: '16px', boxSizing: 'border-box', marginTop: '1.5rem', flex: 1, maxHeight: '180px', overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace', borderBottom: '1px solid #334155', paddingBottom: '0.3rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    💻 Real-Time Execution Console Logs
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {simLogs.length === 0 && (
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>
                        Press the orange "Execute Workflow" button on the left panel to execute flow...
                      </span>
                    )}
                    {simLogs.map((log, idx) => (
                      <div key={idx} style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: log.includes('❌') || log.includes('🔴') ? '#f87171' : log.includes('✅') || log.includes('🟢') ? '#34d399' : '#e2e8f0' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('practical')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Practical
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
                <GitBranch size={22} style={{ color: '#7c3aed' }} />
                Day 11 Assignment: Library Request Automation
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You want to build a book request workflow. 
                <br />
                Draft the nodes list and connections needed so that when a student requests a book, the workflow checks if the book is on the "restricted reference shelf". If yes, send an approval email; if no, automatically approve the check-out request.
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="1. Nodes List: Trigger, Set Node, IF, ...&#10;2. Connections descriptions..."
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
                Start Day 11 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 11 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered workflow fundamentals!' : 'Review the correct options highlighted green above.'}
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
