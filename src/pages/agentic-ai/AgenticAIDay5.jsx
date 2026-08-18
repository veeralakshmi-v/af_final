import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, Sparkles, Code, Terminal, Play, 
  RefreshCw, CheckCircle, ArrowRight, BookOpen,
  Calendar, Mail, User, Clock, Settings
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'code', label: '⚙️ Code Walkthrough' },
  { id: 'sandbox', label: '💻 Booking Agent Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Why should the AI check the calendar BEFORE booking the appointment?',
    opts: [
      'To prevent booking conflicts (double-booking) by letting the AI check if the slot is free first.',
      'To make the internet browser load the page faster.',
      'To change the colors of the dashboard headers.'
    ],
    ans: 0
  },
  {
    q: 'What is the "Observation" step in an AI loop?',
    opts: [
      'It stops the program and shows an error code.',
      'It is where the AI looks at the result of a tool (like seeing that a time slot is "Busy") and decides what to do next.',
      'It deletes the AI\'s memory data.'
    ],
    ans: 1
  },
  {
    q: 'What represents the "Action" step in our email assistant?',
    opts: [
      'Setting the rules and personality of the AI helper.',
      'Actually calling the tool (like running the send_email function) with the details written by the AI.',
      'The user clicking the "Execute Agent" button on their keyboard.'
    ],
    ans: 1
  },
  {
    q: 'How does an AI connect multiple actions together step-by-step?',
    opts: [
      'By running all tools at the exact same time without checking if they work.',
      'By using the result of one tool (like a booking confirmation number) to fill in the next tool (like drafting the confirmation email).',
      'By compiling code files into a database file.'
    ],
    ans: 1
  },
  {
    q: 'What is the main benefit of the ReAct (Reason + Act) loop for booking systems?',
    opts: [
      'It allows the AI to think and solve problems (like finding a backup time slot if the first choice is already booked).',
      'It removes the need for passwords and API credentials.',
      'It saves computer memory.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay5({ activeTab, onNavigate, openAITutor }) {
  const [activeSubTab, setActiveSubTab] = useState('intro');

  // Interactive Sandbox state
  const [guestName, setGuestName] = useState('Sarah Connor');
  const [guestEmail, setGuestEmail] = useState('sarah@sky-net.com');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [hasConflict, setHasConflict] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [activeTool, setActiveTool] = useState(null); // 'calendar', 'booking', 'email' or null
  const [simMode, setSimMode] = useState('auto'); // 'auto' or 'manual'

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
    resetSimulation();
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate steps dynamically based on parameters
  const generateSteps = () => {
    const timeText = preferredTime;
    const fallbackText = '03:00 PM';

    if (hasConflict) {
      return [
        {
          phase: 'Goal Received',
          text: `🏁 Goal: Book a meeting for ${guestName} (${guestEmail}) next Tuesday at ${timeText}. If that slot is busy, try ${fallbackText} instead. Send a confirmation email.`,
          tool: null,
          log: `🏁 Goal: Book appointment for ${guestName} at ${timeText} (Backup: ${fallbackText}).`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: I will check the calendar first to see if Tuesday at ${timeText} is available.`,
          tool: null,
          log: `🧠 Thought: Let's check the calendar database for Tuesday at ${timeText}.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call check_calendar(time="Tuesday ${timeText}")`,
          tool: 'calendar',
          log: `🛠️ Tool Run: check_calendar(time="Tuesday ${timeText}")`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: The calendar says Tuesday ${timeText} is BUSY (Reason: "Weekly Team Meeting").`,
          tool: 'calendar',
          log: `📡 Result: Slot is Busy. Conflict detected.`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: Since the preferred time is busy, I will try the backup time of ${fallbackText} as requested in my goal.`,
          tool: null,
          log: `🧠 Thought: Preferred slot is occupied. Let's check the backup slot: Tuesday at ${fallbackText}.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call check_calendar(time="Tuesday ${fallbackText}")`,
          tool: 'calendar',
          log: `🛠️ Tool Run: check_calendar(time="Tuesday ${fallbackText}")`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: The calendar says Tuesday ${fallbackText} is FREE.`,
          tool: 'calendar',
          log: `📡 Result: Backup slot is Free!`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: Great! The backup slot of Tuesday ${fallbackText} is free. I will book it now.`,
          tool: null,
          log: `🧠 Thought: Slot is free. Proceeding to book meeting.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call book_appointment(name="${guestName}", email="${guestEmail}", time="Tuesday ${fallbackText}")`,
          tool: 'booking',
          log: `🛠️ Tool Run: book_appointment(name="${guestName}", email="${guestEmail}", time="Tuesday ${fallbackText}")`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: Booking confirmed successfully! Reference ID: BK-9942.`,
          tool: 'booking',
          log: `📡 Result: Appointment booked! ID: BK-9942.`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: Now that the meeting is booked, I need to send a confirmation email with Reference ID BK-9942.`,
          tool: null,
          log: `🧠 Thought: Preparing to send confirmation email.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call send_email_notification(to="${guestEmail}", subject="Meeting Confirmed", message="Hi ${guestName}, your meeting is booked for Tuesday at ${fallbackText}. Ref ID: BK-9942.")`,
          tool: 'email',
          log: `🛠️ Tool Run: send_email_notification(to="${guestEmail}", subject="Meeting Confirmed", ...)`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: Email successfully sent to ${guestEmail}.`,
          tool: 'email',
          log: `📡 Result: Email sent successfully.`
        },
        {
          phase: 'Final Answer',
          text: `🏁 Answer: I have successfully scheduled ${guestName}'s meeting for Tuesday at ${fallbackText} (the 10:00 AM slot was busy). The confirmation ID is BK-9942, and the email has been sent.`,
          tool: null,
          log: `🏁 Final Answer: Done! Booked at ${fallbackText} and confirmation email sent.`
        }
      ];
    } else {
      return [
        {
          phase: 'Goal Received',
          text: `🏁 Goal: Book a meeting for ${guestName} (${guestEmail}) next Tuesday at ${timeText}. If that slot is busy, try ${fallbackText} instead. Send a confirmation email.`,
          tool: null,
          log: `🏁 Goal: Book appointment for ${guestName} at ${timeText} (Backup: ${fallbackText}).`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: Let's check the calendar to see if Tuesday at ${timeText} is available.`,
          tool: null,
          log: `🧠 Thought: Let's check the calendar database for Tuesday at ${timeText}.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call check_calendar(time="Tuesday ${timeText}")`,
          tool: 'calendar',
          log: `🛠️ Tool Run: check_calendar(time="Tuesday ${timeText}")`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: The calendar says Tuesday ${timeText} is FREE.`,
          tool: 'calendar',
          log: `📡 Result: Preferred slot is Free!`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: The preferred slot is free! I will book the meeting now.`,
          tool: null,
          log: `🧠 Thought: Slot is free. Proceeding to book meeting.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call book_appointment(name="${guestName}", email="${guestEmail}", time="Tuesday ${timeText}")`,
          tool: 'booking',
          log: `🛠️ Tool Run: book_appointment(name="${guestName}", email="${guestEmail}", time="Tuesday ${timeText}")`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: Booking confirmed successfully! Reference ID: BK-1105.`,
          tool: 'booking',
          log: `📡 Result: Appointment booked! ID: BK-1105.`
        },
        {
          phase: 'Thought',
          text: `🧠 Thought: Now I will send the confirmation email to ${guestName}.`,
          tool: null,
          log: `🧠 Thought: Preparing to send confirmation email.`
        },
        {
          phase: 'Action',
          text: `🛠️ Action: Call send_email_notification(to="${guestEmail}", subject="Meeting Confirmed", message="Hi ${guestName}, your meeting is booked for Tuesday at ${timeText}. Ref ID: BK-1105.")`,
          tool: 'email',
          log: `🛠️ Tool Run: send_email_notification(to="${guestEmail}", subject="Meeting Confirmed", ...)`
        },
        {
          phase: 'Observation',
          text: `📡 Observation: Email successfully sent to ${guestEmail}.`,
          tool: 'email',
          log: `📡 Result: Email sent successfully.`
        },
        {
          phase: 'Final Answer',
          text: `🏁 Answer: I have successfully booked the meeting for Tuesday at ${timeText}. The confirmation ID is BK-1105, and the email has been sent.`,
          tool: null,
          log: `🏁 Final Answer: Done! Booked at ${timeText} and confirmation email sent.`
        }
      ];
    }
  };

  const stepsList = generateSteps();

  const handleNextStep = () => {
    if (currentStepIndex < stepsList.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const stepObj = stepsList[nextIndex];
      setLogs(prev => [...prev, stepObj.log]);
      setActiveTool(stepObj.tool);
    } else {
      setIsRunning(false);
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
      }
    }
  };

  const startSimulation = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
    }
    resetSimulation();
    setIsRunning(true);

    if (simMode === 'auto') {
      let index = 0;
      setCurrentStepIndex(0);
      setLogs([stepsList[0].log]);
      setActiveTool(stepsList[0].tool);

      simIntervalRef.current = setInterval(() => {
        index++;
        if (index < stepsList.length) {
          setCurrentStepIndex(index);
          const currentStep = stepsList[index];
          setLogs(prev => [...prev, currentStep.log]);
          setActiveTool(currentStep.tool);
        } else {
          clearInterval(simIntervalRef.current);
          simIntervalRef.current = null;
          setIsRunning(false);
          setActiveTool(null);
        }
      }, 1500);
    } else {
      // Manual mode
      setCurrentStepIndex(0);
      setLogs([stepsList[0].log]);
      setActiveTool(stepsList[0].tool);
    }
  };

  const resetSimulation = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setLogs([]);
    setActiveTool(null);
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
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
                <Sparkles size={14} color="#fef08a" /> MODULE 1 • DAY 5
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                How AI Agents Work (Booking & Email)
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how an AI Agent thinks, makes choices, uses digital tools, and solves problems (like scheduling conflicts) in simple, everyday terms.
              </p>
            </div>

            {/* Introduction info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What is an Agent Loop?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  Instead of just printing static text answers, an **AI Agent** can take actions. You give it a final goal, and it will run a loop of thinking, taking an action (like checking a calendar), looking at the result, and repeating until the goal is achieved.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  If a tool fails—for example, if a calendar slot is already booked—the AI does not crash. It simply notices the issue, thinks of a backup plan (like checking a different time slot), and keeps going until the task is complete.
                </p>
              </div>

              {/* ReAct cycle diagram */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.8rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <GitBranch size={18} color="#7c3aed" /> The 4 Steps of an AI Thought Loop:
                </h4>
                
                {/* Visual steps representing the cycle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <strong style={{ color: '#7c3aed' }}>1. GOAL:</strong> What you want the AI to do.
                  </div>
                  <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.8rem', margin: '-0.3rem 0' }}>▼</div>
                  <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <strong style={{ color: '#3b82f6' }}>2. THOUGHT:</strong> AI plans which tool to run next.
                  </div>
                  <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.8rem', margin: '-0.3rem 0' }}>▼</div>
                  <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <strong style={{ color: '#10b981' }}>3. ACTION:</strong> AI runs the tool (like an API).
                  </div>
                  <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.8rem', margin: '-0.3rem 0' }}>▼</div>
                  <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <strong style={{ color: '#f59e0b' }}>4. OBSERVATION:</strong> AI checks the result and loops back.
                  </div>
                </div>
              </div>
            </div>

            {/* Key benefits list */}
            <div style={{ background: '#ede9fe', border: '1px solid #c4b5fd', padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#4c1d95', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} color="#7c3aed" /> Why is this useful?
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#4c1d95', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>No manual effort:</strong> The AI coordinates the entire workflow automatically.</li>
                <li><strong>Connects systems:</strong> The AI can take a value from one database and insert it into an email draft.</li>
                <li><strong>Handles errors:</strong> If a meeting time is taken, it automatically tries backup times.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('code')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Explore Code Walkthrough <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. CODE WALKTHROUGH ──────────────────────────────────────── */}
        {activeSubTab === 'code' && (
          <motion.div key="code" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚙️ Simple Python Code Walkthrough</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Here is a simple Python program showing how an AI agent looks up schedules and sends emails step-by-step:</p>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '2.5rem', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '0.94rem', fontFamily: 'Courier New, monospace', color: '#e2e8f0', lineHeight: 1.6, whiteSpace: 'pre' }}>
                {`# 1. First, we write the tools (actions) the AI is allowed to use:

def check_calendar_db(time_slot):
    # This checks if a time slot is free or busy
    busy_slots = ["Tuesday 10:00 AM", "Thursday 02:00 PM"]
    if time_slot in busy_slots:
        return "BUSY"
    return "FREE"

def book_appointment(guest_name, guest_email, time_slot):
    # This books the meeting and returns a confirmation ID
    ref_id = "BK-9942"
    print(f"Saving booking to database: {guest_name} at {time_slot}")
    return ref_id

def send_notification_email(recipient_email, subject, body_content):
    # This sends an email notification
    print(f"Email successfully sent to: {recipient_email}")
    return "EMAIL_SENT"


# 2. Next, the AI Agent runs its workflow logic step-by-step:

def run_agent_booking_workflow(customer_name, customer_email, preferred_time, backup_time):
    print("🏁 Goal: Book client and email confirmation.")
    
    # Step A: Check the preferred time
    print(f"🧠 Thought: I will check the calendar for {preferred_time}.")
    status = check_calendar_db(preferred_time)
    print(f"🛠️ Action: check_calendar_db('{preferred_time}') -> Result: {status}")
    
    selected_slot = None
    
    # Step B: If busy, try the backup time
    if status == "BUSY":
        print(f"🧠 Thought: That slot is busy. I will try the backup slot: {backup_time}.")
        status_backup = check_calendar_db(backup_time)
        print(f"🛠️ Action: check_calendar_db('{backup_time}') -> Result: {status_backup}")
        
        if status_backup == "FREE":
            selected_slot = backup_time
        else:
            return "❌ Agent Failure: Both slots are booked."
    else:
        selected_slot = preferred_time
        
    # Step C: Book the meeting
    print(f"🧠 Thought: Slot is free. I will book it now.")
    booking_ref = book_appointment(customer_name, customer_email, selected_slot)
    print(f"🛠️ Action: book_appointment(...) -> Result Reference: {booking_ref}")
    
    # Step D: Send confirmation email
    print(f"🧠 Thought: Booking complete. Sending confirmation email.")
    email_body = f"Hi {customer_name}, your meeting is booked for {selected_slot}. ID: {booking_ref}."
    email_status = send_notification_email(customer_email, "Meeting Confirmed", email_body)
    print(f"🛠️ Action: send_notification_email(...) -> Result: {email_status}")
    
    return f"🏁 Final Answer: Booked at {selected_slot}. Ref ID: {booking_ref}."`}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Interactive Sandbox <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE SANDBOX ──────────────────────────────────── */}
        {activeSubTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Live Booking & Email Agent Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2.0rem' }}>Fill in the details, choose if the preferred slot is busy or free, and click run to watch the AI work:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Controls Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* 1. CONFIGURATION CARD */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={18} style={{ color: '#7c3aed' }} /> Customize Settings
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Guest Name:</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                          <User size={15} />
                        </span>
                        <input
                          type="text"
                          value={guestName}
                          disabled={isRunning || currentStepIndex !== -1}
                          onChange={(e) => setGuestName(e.target.value)}
                          style={{ width: '100%', padding: '0.65rem 0.6rem 0.65rem 2.2rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Guest Email:</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                          <Mail size={15} />
                        </span>
                        <input
                          type="email"
                          value={guestEmail}
                          disabled={isRunning || currentStepIndex !== -1}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          style={{ width: '100%', padding: '0.65rem 0.6rem 0.65rem 2.2rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Preferred Slot Status:</label>
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button
                          onClick={() => setHasConflict(true)}
                          disabled={isRunning || currentStepIndex !== -1}
                          style={{
                            flex: 1,
                            padding: '0.6rem',
                            borderRadius: '8px',
                            border: hasConflict ? '2px solid #ef4444' : '1px solid #cbd5e1',
                            background: hasConflict ? '#fef2f2' : 'white',
                            color: hasConflict ? '#991b1b' : '#64748b',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.88rem'
                          }}
                        >
                          🔴 10:00 AM is Busy
                        </button>
                        <button
                          onClick={() => setHasConflict(false)}
                          disabled={isRunning || currentStepIndex !== -1}
                          style={{
                            flex: 1,
                            padding: '0.6rem',
                            borderRadius: '8px',
                            border: !hasConflict ? '2px solid #10b981' : '1px solid #cbd5e1',
                            background: !hasConflict ? '#ecfdf5' : 'white',
                            color: !hasConflict ? '#065f46' : '#64748b',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.88rem'
                          }}
                        >
                          🟢 10:00 AM is Free
                        </button>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.4rem', fontStyle: 'italic' }}>
                        * Backup slot is always set to Tuesday 03:00 PM (Free).
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.8rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Run Speed:</label>
                        <select
                          value={simMode}
                          disabled={isRunning || currentStepIndex !== -1}
                          onChange={(e) => setSimMode(e.target.value)}
                          style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', width: '100%' }}
                        >
                          <option value="auto">⏳ Auto-Play Mode</option>
                          <option value="manual">🧑‍💻 Step-by-Step Manual</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        {currentStepIndex !== -1 && (
                          <button
                            onClick={resetSimulation}
                            style={{
                              background: '#f1f5f9',
                              color: '#475569',
                              border: '1px solid #cbd5e1',
                              padding: '0.55rem',
                              borderRadius: '6px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px'
                            }}
                          >
                            <RefreshCw size={13} /> Reset
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. TOOLS DASHBOARD CARD */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} style={{ color: '#7c3aed' }} /> AI Agent Tool Drawer
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 1.2rem 0', lineHeight: 1.4 }}>
                    See which tool gets turned on by the AI in real-time:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {/* Tool 1 */}
                    <div style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: activeTool === 'calendar' ? '2px solid #10b981' : '1px solid #e2e8f0',
                      background: activeTool === 'calendar' ? '#ecfdf5' : '#f8fafc',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} style={{ color: '#10b981' }} /> check_calendar_db(time)
                        </strong>
                        {activeTool === 'calendar' && <span style={{ fontSize: '0.72rem', background: '#10b981', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>RUNNING</span>}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Checks if the calendar slot is free or busy.</span>
                    </div>

                    {/* Tool 2 */}
                    <div style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: activeTool === 'booking' ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                      background: activeTool === 'booking' ? '#f5f3ff' : '#f8fafc',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Settings size={14} style={{ color: '#7c3aed' }} /> book_appointment(name, email, time)
                        </strong>
                        {activeTool === 'booking' && <span style={{ fontSize: '0.72rem', background: '#7c3aed', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>RUNNING</span>}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Saves the booking details and returns a ref ID.</span>
                    </div>

                    {/* Tool 3 */}
                    <div style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: activeTool === 'email' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      background: activeTool === 'email' ? '#eff6ff' : '#f8fafc',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={14} style={{ color: '#3b82f6' }} /> send_email_notification(to, subject, body)
                        </strong>
                        {activeTool === 'email' && <span style={{ fontSize: '0.72rem', background: '#3b82f6', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>RUNNING</span>}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Sends the confirmation email to the guest.</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Console & Pipeline Output Column */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                
                {/* Header */}
                <div>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.95rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={16} style={{ color: '#7c3aed' }} /> LIVE AI CONSOLE
                    </strong>
                    <span style={{ fontSize: '0.75rem', background: isRunning ? '#065f46' : '#1e293b', color: isRunning ? '#34d399' : '#94a3b8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {isRunning ? '⏳ RUNNING' : '■ IDLE'}
                    </span>
                  </div>

                  {/* Goal Header */}
                  {currentStepIndex !== -1 && (
                    <div style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '0.9rem 1.1rem', marginBottom: '1.2rem', color: '#c4b5fd', fontSize: '0.88rem', lineHeight: 1.4 }}>
                      <strong style={{ display: 'block', color: 'white', marginBottom: '0.2rem' }}>🎯 TARGET GOAL:</strong>
                      Book a meeting for {guestName} next Tuesday. If Tuesday 10:00 AM is busy, book 3:00 PM. Send confirmation email.
                    </div>
                  )}
                </div>

                {/* Steps Log Feed */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto', maxHeight: '310px', paddingRight: '0.4rem', margin: '0.5rem 0' }}>
                  {currentStepIndex === -1 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>
                      <Terminal size={32} style={{ opacity: 0.3, marginBottom: '0.8rem' }} />
                      Fill in the settings and click "Execute Agent" to see the AI's step-by-step logs output here in simple terms.
                    </div>
                  ) : (
                    stepsList.slice(0, currentStepIndex + 1).map((step, idx) => {
                      let logColor = '#e2e8f0'; // observation
                      let leftBorder = '3px solid #64748b';
                      let bg = 'transparent';

                      if (step.phase === 'Goal Received') {
                        logColor = '#a78bfa';
                        leftBorder = '3px solid #7c3aed';
                        bg = 'rgba(124,58,237,0.04)';
                      } else if (step.phase === 'Thought') {
                        logColor = '#fcd34d';
                        leftBorder = '3px solid #fbbf24';
                        bg = 'rgba(251,191,36,0.04)';
                      } else if (step.phase === 'Action') {
                        logColor = '#60a5fa';
                        leftBorder = '3px solid #3b82f6';
                        bg = 'rgba(59,130,246,0.04)';
                      } else if (step.phase === 'Observation') {
                        logColor = '#34d399';
                        leftBorder = '3px solid #10b981';
                        bg = 'rgba(16,185,129,0.04)';
                      } else if (step.phase === 'Final Answer') {
                        logColor = '#22d3ee';
                        leftBorder = '3px solid #06b6d4';
                        bg = 'rgba(6,182,212,0.06)';
                      }

                      const isLatest = idx === currentStepIndex;

                      return (
                        <div
                          key={idx}
                          style={{
                            borderLeft: leftBorder,
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.85rem',
                            lineHeight: 1.45,
                            color: logColor,
                            fontFamily: 'monospace',
                            borderRadius: '0 8px 8px 0',
                            background: bg,
                            animation: isLatest ? 'fadeIn 0.2s ease-out' : 'none'
                          }}
                        >
                          {step.text}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Simulation Control Board */}
                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.2rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  
                  {currentStepIndex === -1 ? (
                    <button
                      onClick={startSimulation}
                      style={{
                        flex: 1,
                        background: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(124,58,237,0.3)'
                      }}
                    >
                      <Play size={16} /> Execute Real-Time Agent
                    </button>
                  ) : (
                    <>
                      {simMode === 'manual' && currentStepIndex < stepsList.length - 1 && (
                        <button
                          onClick={handleNextStep}
                          style={{
                            flex: 1.5,
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '0.85rem',
                            borderRadius: '10px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          Click to Run Next Step <ArrowRight size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={resetSimulation}
                        style={{
                          flex: 1,
                          background: 'rgba(239,68,68,0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.3)',
                          padding: '0.85rem',
                          borderRadius: '10px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '0.95rem'
                        }}
                      >
                        Stop / Reset
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('code')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Code
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
                Day 5 Assignment: Booking a Backup Hotel
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You are writing down steps for a Hotel Booking Agent.
                <br />
                The goal is to book a room at the <em>"Royal Palm Hotel"</em> for client <em>"Alex Mercer"</em>. If the Royal Palm is fully booked, search and book the <em>"Seaside Resort"</em> instead. Send a confirmation email.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>✍️ Write down the steps the AI agent will take:</span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>1. 🏁 <strong>Goal:</strong> What is the AI trying to do?</li>
                  <li>2. 🧠 <strong>Thought:</strong> What will the AI think to check first?</li>
                  <li>3. 🛠️ <strong>Action:</strong> Which tool does it run?</li>
                  <li>4. 📡 <strong>Observation:</strong> What result does it get (pretend Royal Palm is booked)?</li>
                  <li>5. 🧠 <strong>Thought & Action 2:</strong> What backup action does it take?</li>
                  <li>6. 🏁 <strong>Final Answer:</strong> What summary does it tell the user?</li>
                </ul>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your step-by-step logs description in simple terms here..."
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
              <button className="btn btn-outline" onClick={() => handleSubTabChange('sandbox')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Sandbox
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 5 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeSubTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 5 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered agent loops!' : 'Review the correct options highlighted green above.'}
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
