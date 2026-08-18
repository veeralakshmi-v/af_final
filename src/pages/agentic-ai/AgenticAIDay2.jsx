import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Sparkles, Brain, Database, Terminal, Layers, 
  Play, RefreshCw, CheckCircle, ArrowRight, Compass 
} from 'lucide-react';
import archImg from '../../assets/agentic_ai_architecture.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'layers', label: '⚙️ Architecture Layers' },
  { id: 'sandbox', label: '💻 Interactive Planning Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Which layer of Agentic AI handles tool selection and instruction parsing?',
    opts: [
      'The Memory Layer',
      'The Core Brain (LLM) Layer',
      'The Database Infrastructure'
    ],
    ans: 1
  },
  {
    q: 'What is "Task Decomposition" in the Planning Layer?',
    opts: [
      'Deleting code files to optimize performance.',
      'Slicing a complex, multi-step goal into a sequenced checklist of smaller, manageable sub-tasks.',
      'Connecting API tokens variables.'
    ],
    ans: 1
  },
  {
    q: 'How does Short-term Memory differ from Long-term Memory in an agent?',
    opts: [
      'Short-term memory holds active session logs (conversation history context), while Long-term memory reads permanent vector databases.',
      'Short-term memory stores database values forever.',
      'Long-term memory is cleared after every user prompt.'
    ],
    ans: 0
  },
  {
    q: 'What is the role of the Tools & Execution layer?',
    opts: [
      'It formats custom CSS themes gradients.',
      'It contains the actual APIs, search engines, and scripts that the agent brain chooses to call to execute actions.',
      'It represents the compiler code parser.'
    ],
    ans: 1
  },
  {
    q: 'What does "Self-Reflection" enable an AI Agent to do?',
    opts: [
      'Evaluate tool output errors, inspect if the response matches constraints, and rewrite the plan dynamically.',
      'Display graphic UI visual diagrams.',
      'Speed up database server requests.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay2({ activeTab, onNavigate, openAITutor }) {
  const [activeSubTab, setActiveSubTab] = useState('intro');

  // Sandbox Planner state
  const [selectedTask, setSelectedTask] = useState('report_workflow');
  const [plannerLogs, setPlannerLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunningPlanner, setIsRunningPlanner] = useState(false);

  const simIntervalRef = React.useRef(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  React.useEffect(() => {
    return () => {
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
    };
  }, []);

  const handleSubTabChange = (tabId) => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setIsRunningPlanner(false);
    setPlannerLogs([]);
    setCurrentStep(0);
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startPlannerSim = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
    }
    setIsRunningPlanner(true);
    setPlannerLogs([]);
    setCurrentStep(0);

    const logs = {
      report_workflow: [
        { layer: '🧠 BRAIN', msg: "Goal parsed: 'Draft report, query customer database table, email results.'", details: "Thought: I need to fetch customer database table records first." },
        { layer: '🗄️ MEMORY', msg: "Read Long-term index: Fetching customer database connection parameters...", details: "Memory: Loaded DB row credentials securely." },
        { layer: '🛠️ TOOL EXECUTION', msg: "Calling database_query(query='SELECT * FROM customer_vIP') ➔ Returns 3 records.", details: "Output: [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}]" },
        { layer: '🧠 BRAIN', msg: "Decomposing next step: Write report summary using DB results.", details: "Thought: Summary compiled. Now I must dispatch the email alert." },
        { layer: '🛠️ TOOL EXECUTION', msg: "Calling send_email(to='manager@firm.com', body='Summary: 3 VIPs...') ➔ Status 200 OK.", details: "Output: Email queued for delivery." },
        { layer: '🧠 BRAIN', msg: "Check complete constraint: Database retrieved and email dispatched successfully.", details: "Task Complete." }
      ],
      alert_workflow: [
        { layer: '🧠 BRAIN', msg: "Goal parsed: 'Check local system files space, alert if disk is full.'", details: "Thought: I need to query the filesystem storage tool." },
        { layer: '🛠️ TOOL EXECUTION', msg: "Calling get_disk_space() ➔ Returns 96% full.", details: "Output: Warning threshold exceeded!" },
        { layer: '🧠 BRAIN', msg: "Decomposing step: Alert user of critical disk warning status.", details: "Thought: System warning flag active. Dispatching Slack alert tool." },
        { layer: '🛠️ TOOL EXECUTION', msg: "Calling post_slack_alert(channel='#syslogs', message='Disk full warning!') ➔ Success.", details: "Output: Alert posted." },
        { layer: '🧠 BRAIN', msg: "Constraint match: System state evaluated and warning dispatched.", details: "Task Complete." }
      ]
    };

    const taskLogs = logs[selectedTask] || [];
    let stepIdx = 0;
    
    simIntervalRef.current = setInterval(() => {
      if (stepIdx < taskLogs.length) {
        setPlannerLogs(prev => [...prev, taskLogs[stepIdx]]);
        setCurrentStep(stepIdx + 1);
        stepIdx++;
      } else {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        setIsRunningPlanner(false);
      }
    }, 900);
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Sub-tabs selector navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSubTabChange(tab.id)}
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
        {activeSubTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 1 • DAY 2
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Agentic AI Architecture Layers
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Explore the blueprints and architecture stacks that power autonomous agents. Learn how LLM Brain layers, Memory modules, Planning loops, and API tools integrate into one unified program.
              </p>
            </div>

            {/* In-page Architecture Diagram */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>📐 System Architecture Diagram Overview</span>
              <img 
                src={archImg} 
                alt="Agentic AI Architecture Diagram" 
                style={{ maxWidth: '600px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('layers')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Explore Architecture Layers <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. ARCHITECTURE LAYERS ──────────────────────────────────── */}
        {activeSubTab === 'layers' && (
          <motion.div key="layers" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚙️ Inside the 3 Core Layers</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>How does each layer contribute to autonomous task completions?</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Layer 1: Core Brain */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Brain size={30} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>1. The Core Brain Layer (LLM)</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    The **LLM (Large Language Model)** acts as the cognitive engine:
                    <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li><strong>Natural Language Parser:</strong> Understands user goals and raw prompt requirements.</li>
                      <li><strong>Decision Engine:</strong> Decides *what* actions to take next and *when* to execute external tools.</li>
                      <li><strong>Prompt Guardrails:</strong> Adheres to strict instructions to secure data integrity.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Layer 2: Planning & Memory */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Database size={30} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>2. The Planning & Memory Layer</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    Manages sequencing logs and information retention:
                    <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li>⚙️ <strong>Task Decomposition:</strong> Breaks a complex main task into a logical step-by-step checklist.</li>
                      <li>🔄 <strong>Self-Reflection (ReAct):</strong> Evaluates errors, rewrites plans, and retries alternate paths.</li>
                      <li>🧠 <strong>Short-term Memory:</strong> Stores ongoing chat dialogues context in active session memory.</li>
                      <li>🗄️ <strong>Long-term Memory:</strong> Integrates vector database indexes (like Pinecone/pgvector) to retain historical data indefinitely.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Layer 3: Tools & Execution */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Terminal size={30} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>3. The Tools & Execution Layer (APIs)</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    This layer represents the agent's hands. It contains the external software plugins:
                    <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li>🔍 <strong>Search Tools:</strong> Web crawlers and Google Search API lookups.</li>
                      <li>📁 <strong>File Handlers:</strong> Node script code execution runtimes, PDF readers, and text chunk splitters.</li>
                      <li>🌐 <strong>Integrations APIs:</strong> Database query tables selectors, Slack webhooks, and SMTP email mailer APIs.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Launch Planning Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE PLANNING SANDBOX ──────────────────────────── */}
        {activeSubTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Interactive Planning Sandbox</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure a workflow goal and watch the agent orchestrate its internal layers step-by-step:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Column: Configure and Run */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0' }}>1. Select Agent Goal</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.92rem', color: '#475569', fontWeight: 700 }}>Choose Workflow Target:</label>
                    <select
                      value={selectedTask}
                      onChange={(e) => { setSelectedTask(e.target.value); setPlannerLogs([]); }}
                      style={{ padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.98rem', outline: 'none' }}
                    >
                      <option value="report_workflow">Goal: Draft VIP summary, email manager</option>
                      <option value="alert_workflow">Goal: Check disk space, Slack alert warnings</option>
                    </select>
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Clicking "Execute Planner Loop" will simulate how the Core Brain decomposes the task, retrieves credentials from Memory, and dispatches external tool calls.
                  </p>
                </div>

                <button
                  onClick={startPlannerSim}
                  disabled={isRunningPlanner}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(124,58,237,0.2)'
                  }}
                >
                  <Play size={16} /> Execute Planner Loop
                </button>
              </div>

              {/* Right Column: Execution Live Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'white', fontSize: '0.95rem', fontFamily: 'monospace' }}>🖥️ AGENT EXECUTION TERMINAL</strong>
                  <span style={{ fontSize: '0.75rem', background: '#1e1b4b', color: '#c4b5fd', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                    {isRunningPlanner ? '⏳ RUNNING' : '■ IDLE'}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto', maxHeight: '280px' }}>
                  {plannerLogs.length > 0 ? (
                    plannerLogs.map((log, idx) => {
                      if (!log) return null;
                      return (
                        <div key={idx} style={{ borderLeft: '3px solid #7c3aed', paddingLeft: '0.8rem', fontSize: '0.85rem', lineHeight: 1.4 }}>
                          <span style={{ color: '#a7f3d0', fontWeight: 700, fontFamily: 'monospace', marginRight: '0.5rem' }}>{log.layer}:</span>
                          <span style={{ color: '#e2e8f0', fontFamily: 'monospace' }}>{log.msg}</span>
                          <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontFamily: 'monospace', fontStyle: 'italic', marginTop: '0.15rem' }}>
                            ➔ {log.details}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span style={{ color: '#475569', fontSize: '0.88rem', fontStyle: 'italic', fontFamily: 'monospace' }}>Waiting to launch planner execution...</span>
                  )}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('layers')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Layers
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeSubTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={22} style={{ color: '#7c3aed' }} />
                Day 2 Assignment: Food Tracker Agent Architecture
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>The Scenario:</strong> You need to plan the system layers for a **"Food Delivery Tracker Agent"**. 
                <br />
                The agent must solve this goal: <em>"Check if order #827 has shipped. If shipped, send a WhatsApp alert with the delivery driver's name. If not shipped, wait 5 minutes and check again."</em>
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>✍️ Sketch the Architecture Layer components:</span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>1. **Core Brain:** What logic parameters must the prompt tell the model (e.g. strict format rules, retry loops instructions)?</li>
                  <li>2. **Memory:** What variables must it store (e.g., driver details, order status history, retry counts)?</li>
                  <li>3. **Tools & Execution:** List the three APIs the agent must connect to (e.g., Delivery Database API, Timer API, WhatsApp SMS API).</li>
                </ul>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your layer analysis answers here..."
                style={{ width: '100%', height: '140px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
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
              <button className="btn btn-outline" onClick={() => handleSubTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 2 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeSubTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 2 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered Day 2 Architecture layers!' : 'Review the correct options highlighted green above.'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('assignment')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
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
