import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, Sparkles, Brain, CheckCircle, Terminal, 
  Play, Compass, ArrowRight, HelpCircle 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'loops', label: '🔄 Reasoning Loops' },
  { id: 'trace', label: '💻 Interactive Loop Simulator' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What does the "ReAct" framework stand for in Agentic AI?',
    opts: [
      'Reacting to User interfaces with buttons and links.',
      'Reasoning + Acting: Combining thinking steps (Thoughts) with action executions (Tool Calls) in a loop.',
      'Re-indexing and Activating databases.'
    ],
    ans: 1
  },
  {
    q: 'What is the "Thought" step in a ReAct loop?',
    opts: [
      'It is where the AI model decides what it needs to achieve next and plans which tool to call.',
      'It is the formatted database SQL query string.',
      'It is the CSS styling animation.'
    ],
    ans: 0
  },
  {
    q: 'In a reasoning loop, what is an "Observation"?',
    opts: [
      'The raw visual output of HTML page templates.',
      'The feedback or result returned by a tool (e.g. database values or API output) that the AI brain inspects.',
      'The time taken to run the server compiler.'
    ],
    ans: 1
  },
  {
    q: 'How does a "Plan-and-Execute" agent differ from a standard ReAct agent?',
    opts: [
      'A Plan-and-Execute agent drafts a full list of steps first and executes them sequentially, rather than deciding only one step at a time.',
      'A Plan-and-Execute agent cannot use any external API tools.',
      'There is no difference between them.'
    ],
    ans: 0
  },
  {
    q: 'Why are decision loops crucial when API tools fail?',
    opts: [
      'They speed up network requests.',
      'They allow the AI to reflect on the error observation, change its strategy, and call a different tool instead of crashing.',
      'They force the user to rewrite their inputs.'
    ],
    ans: 1
  }
];

export default function AgenticAIDay4({ activeTab, onNavigate, openAITutor }) {
  const [activeSubTab, setActiveSubTab] = useState('intro');

  // Simulator Trace state
  const [selectedGoal, setSelectedGoal] = useState('taxi_workflow');
  const [traceLogs, setTraceLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunningTrace, setIsRunningTrace] = useState(false);

  const traceIntervalRef = React.useRef(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  React.useEffect(() => {
    return () => {
      if (traceIntervalRef.current) {
        clearInterval(traceIntervalRef.current);
      }
    };
  }, []);

  const handleSubTabChange = (tabId) => {
    if (traceIntervalRef.current) {
      clearInterval(traceIntervalRef.current);
      traceIntervalRef.current = null;
    }
    setIsRunningTrace(false);
    setTraceLogs([]);
    setCurrentStep(0);
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startTraceSim = () => {
    if (traceIntervalRef.current) {
      clearInterval(traceIntervalRef.current);
    }
    setIsRunningTrace(true);
    setTraceLogs([]);
    setCurrentStep(0);

    const workflows = {
      taxi_workflow: [
        { type: '🧠 THOUGHT', content: "User wants to travel to London tomorrow. First, I need to check the weather forecast to select appropriate clothing." },
        { type: '🛠️ ACTION', content: "call_tool(weather_lookup_api, city='London', date='tomorrow')" },
        { type: '📡 OBSERVATION', content: "Result: 'Rainy, Temperature: 14°C'" },
        { type: '🧠 THOUGHT', content: "It is going to rain. I should tell the user to carry an umbrella and wear a raincoat. Now I need to book a taxi." },
        { type: '🛠️ ACTION', content: "call_tool(taxi_booking_api, destination='London', type='covered')" },
        { type: '📡 OBSERVATION', content: "Result: 'Taxi booked successfully. Driver: Sam, License: LN491'" },
        { type: '🧠 THOUGHT', content: "All tasks completed. I will write the final update to the user." },
        { type: '🏁 ANSWER', content: "Weather in London tomorrow is Rainy (14°C). Recommended: Raincoat/Umbrella. Taxi booked with driver Sam (LN491)." }
      ],
      doc_workflow: [
        { type: '🧠 THOUGHT', content: "Goal: Find book 'Modern Python' in library inventory. I need to search the database index." },
        { type: '🛠️ ACTION', content: "call_tool(library_database_search, query='Modern Python')" },
        { type: '📡 OBSERVATION', content: "Result: 'Book found at shelf 4B, Status: Checked Out, Return Date: today'" },
        { type: '🧠 THOUGHT', content: "The book is currently checked out but returns today. I must check if we can reserve it for the user." },
        { type: '🛠️ ACTION', content: "call_tool(reserve_item_api, book_id='B8201', user_id='U95')" },
        { type: '📡 OBSERVATION', content: "Result: 'Reservation active. Alert will trigger upon return.'" },
        { type: '🧠 THOUGHT', content: "The book is reserved. I can now inform the user." },
        { type: '🏁 ANSWER', content: "The book 'Modern Python' is currently checked out, but has been reserved for you. You will be alerted once it is returned to shelf 4B." }
      ]
    };

    const logs = workflows[selectedGoal] || [];
    let stepIdx = 0;

    traceIntervalRef.current = setInterval(() => {
      if (stepIdx < logs.length) {
        const logItem = logs[stepIdx];
        if (logItem) {
          setTraceLogs(prev => [...prev, logItem]);
          setCurrentStep(stepIdx + 1);
        }
        stepIdx++;
      } else {
        clearInterval(traceIntervalRef.current);
        traceIntervalRef.current = null;
        setIsRunningTrace(false);
      }
    }, 1000);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 1 • DAY 4
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Reasoning, Planning & Loops
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how AI agents think dynamically. Discover how reasoning models split goals, review database feedbacks, run self-reflection steps, and auto-correct plans in real-time loops.
              </p>
            </div>

            {/* Core Concepts */}
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>💡 Core Concepts We Will Cover:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                  <Brain size={28} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. What is Agent Reasoning?</strong>
                <div style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  It is the active cognitive loop where the AI brain:
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>📝 Explains its goals in logical sub-tasks.</li>
                    <li>🛠️ Evaluates what APIs are needed.</li>
                    <li>🏁 Decides when it has completed the user's task.</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                  <RefreshCw size={28} color="#7c3aed" />
                </div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. What are Agent Loops?</strong>
                <div style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  Continuous execution cycles:
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>🔍 <strong>Listen:</strong> Read tool feedback/observation values.</li>
                    <li>🔄 <strong>Retry:</strong> Catch exceptions and find alternative tools.</li>
                    <li>⛔ <strong>Stop:</strong> Escape loops safely if goals are achieved or limit counts hit.</li>
                  </ul>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('loops')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Compare Reasoning Loops <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. REASONING LOOPS ───────────────────────────────────────── */}
        {activeSubTab === 'loops' && (
          <motion.div key="loops" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔄 Reasoning & Planning Frameworks</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>How agents decide and plan tasks dynamically:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Card 1: ReAct */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
                    💡 Analogy: Cooking step-by-step
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>1. ReAct (Reasoning + Acting)</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <p style={{ margin: '0 0 0.8rem 0', fontStyle: 'italic' }}>
                      Combines vertical logical thinking (Reasoning) with direct tool execution (Acting) in an iterative loop.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>🧠 <strong>Thought (Reason):</strong> Model plans next step (e.g. "I need flour").</li>
                      <li>🛠️ <strong>Action (Act):</strong> Calls API tool (e.g. search pantry).</li>
                      <li>📡 <strong>Observation:</strong> Evaluates tool results (e.g. "Flour is found").</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#7c3aed', display: 'block', background: '#ede9fe', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  REASONING AND ACTING LOOP
                </span>
              </div>

              {/* Card 2: Plan-and-Execute */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
                    💡 Analogy: Writing a shopping list
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>2. Plan-and-Execute</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>📝 <strong>Planning:</strong> Slices the entire goal into 5 sub-steps first.</li>
                      <li>🏃 <strong>Execution:</strong> Runs all 5 steps one-by-one.</li>
                      <li>🏁 <strong>Finish:</strong> Summarizes at the end.</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#7c3aed', display: 'block', background: '#ede9fe', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  PRE-PLANNED SEQUENCE
                </span>
              </div>

              {/* Card 3: Self-Reflection */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
                    💡 Analogy: Recalculating GPS route
                  </div>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.6rem' }}>3. Self-Reflection</strong>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li>⚠️ <strong>Error Catching:</strong> Detects if a tool returned an exception or wrong data.</li>
                      <li>🔄 <strong>Rerouting:</strong> Alters instructions dynamically.</li>
                      <li>🛠️ <strong>Retry:</strong> Calls a different API to complete the goal.</li>
                    </ul>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#7c3aed', display: 'block', background: '#ede9fe', padding: '0.3rem 0.6rem', borderRadius: '6px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
                  ERROR SELF-CORRECTION
                </span>
              </div>

            </div>

            {/* Detailed Explanation on Decision Making & Loops */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🧠 How Decision Making & Loops Work Internally (Behind the Scenes)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem', fontSize: '1.1rem' }}>1. Dynamic Decision Making (Dynamic Branching)</strong>
                  <p style={{ margin: 0 }}>
                    Unlike standard programs that follow hard-coded <code>if/else</code> statements, an AI Agent makes choices at runtime. The core model brain parses the input query, checks its available API tools, and decides which path to branch into based on what will solve the task most efficiently.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem', fontSize: '1.1rem' }}>2. The Execution Loop Cycle</strong>
                  <p style={{ margin: 0 }}>
                    The agent runs inside a continuous loop (often structured as a <code>while</code> loop in backend scripts). In each iteration, it runs: <br />
                    <span style={{ color: '#7c3aed', fontWeight: 700 }}>Thought</span> ➔ <span style={{ color: '#7c3aed', fontWeight: 700 }}>Action (Tool Call)</span> ➔ <span style={{ color: '#7c3aed', fontWeight: 700 }}>Observation (Result)</span>. <br />
                    It reads the result from the previous round to decide what to do in the next round.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem', fontSize: '1.1rem' }}>3. Loop Exit Conditions (When does it stop?)</strong>
                  <p style={{ margin: '0 0 0.8rem 0' }}>
                    To prevent the agent from running forever, we configure three essential loop exit conditions:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>✅ <strong>Goal Satisfaction:</strong> After checking a tool's observation, the agent determines that the target task is finished (e.g., "The weather was checked, and the taxi booking is complete"). It writes a final answer to the user and stops.</li>
                    <li>🛡️ <strong>Max Loop Limit (Safety Guard):</strong> A hard threshold (e.g., maximum 5 or 10 loops). If the agent cannot solve the goal within this limit, the system forcefully terminates the loop to prevent infinite API charges.</li>
                    <li>⚠️ <strong>Unrecoverable Exceptions:</strong> If a critical API connection fails repeatedly (e.g., database server offline), the loop catches the error, records the warning, and gracefully terminates the session with an error report.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('trace')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Loop Simulator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. DYNAMIC SIMULATOR ─────────────────────────────────────── */}
        {activeSubTab === 'trace' && (
          <motion.div key="trace" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 ReAct Tracing Monitor</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Configure a scenario and inspect how the agent executes a ReAct reasoning loop:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Configurator */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0' }}>1. Configure Target</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.92rem', color: '#475569', fontWeight: 700 }}>Choose Goal Scenario:</label>
                    <select
                      value={selectedGoal}
                      onChange={(e) => { setSelectedGoal(e.target.value); setTraceLogs([]); }}
                      style={{ padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.98rem', outline: 'none' }}
                    >
                      <option value="taxi_workflow">Goal: Check weather, book covered London taxi</option>
                      <option value="doc_workflow">Goal: Search and reserve book 'Modern Python'</option>
                    </select>
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Click "Run ReAct Trace" to see how the agent reasons (Thought), performs actions (Tool Call), checks feedback data (Observation), and iterates.
                  </p>
                </div>

                <button
                  onClick={startTraceSim}
                  disabled={isRunningTrace}
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
                  <Play size={16} /> Run ReAct Trace
                </button>
              </div>

              {/* Terminal Trace Logger */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'white', fontSize: '0.95rem', fontFamily: 'monospace' }}>🖥️ ReAct LOG MONITOR</strong>
                  <span style={{ fontSize: '0.75rem', background: '#1e1b4b', color: '#c4b5fd', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                    {isRunningTrace ? '⏳ ACTIVE' : '■ IDLE'}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto', maxHeight: '280px' }}>
                  {traceLogs.length > 0 ? (
                    traceLogs.map((log, idx) => {
                      let color = '#38bdf8'; // Blue for thought
                      if (log.type === '🛠️ ACTION') color = '#fbbf24'; // Yellow for tool call
                      if (log.type === '📡 OBSERVATION') color = '#22d3ee'; // Light blue for tool output
                      if (log.type === '🏁 ANSWER') color = '#34d399'; // Green for final answer

                      return (
                        <div key={idx} style={{ borderLeft: `3px solid ${color}`, paddingLeft: '0.8rem', fontSize: '0.85rem', lineHeight: 1.4 }}>
                          <span style={{ color: color, fontWeight: 700, fontFamily: 'monospace', marginRight: '0.5rem' }}>{log.type}:</span>
                          <span style={{ color: '#e2e8f0', fontFamily: 'monospace' }}>{log.content}</span>
                        </div>
                      );
                    })
                  ) : (
                    <span style={{ color: '#475569', fontSize: '0.88rem', fontStyle: 'italic', fontFamily: 'monospace' }}>Waiting to launch reasoning trace loop...</span>
                  )}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('loops')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Loops
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
                Day 4 Assignment: Designing a Calculator Agent Loop
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You need to plan the ReAct step-by-step trace logs for a **"Smart Calculator Agent"** solving this goal:
                <br />
                <em>"Calculate (15 * 4) + 10."</em>
                <br /><br />
                The agent has access to one tool: <code>calculator(operation, value1, value2)</code>.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>✍️ Write down the trace log sequence:</span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Step 1: **Thought** (What is the first math operation?), **Action** (How does it call the calculator?), and **Observation** (What is the math tool response?).</li>
                  <li>Step 2: **Thought** (What is the final math operation to calculate?), **Action** (How does it call the calculator with the previous result?), and **Observation** (Final result).</li>
                  <li>Step 3: **Thought** (Goal achieved?) and **Answer** (Final output).</li>
                </ul>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your step-by-step ReAct trace design here..."
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
              <button className="btn btn-outline" onClick={() => handleSubTabChange('trace')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Simulator
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 4 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeSubTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 4 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered Agent Reasoning & Loops!' : 'Review the correct options highlighted green above.'}
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
