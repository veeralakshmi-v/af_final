import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Code, Terminal, CheckCircle, 
  RefreshCw, Bot, Sliders, Shield, BookOpen, User, Layers, Play 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'anatomy', label: '🔬 Prompt Anatomy' },
  { id: 'builder', label: '💻 Interactive Builder' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const PRESETS = {
  sql: {
    name: 'Database Search Helper',
    emoji: '🗄️',
    role: 'You are a simple database helper.',
    mission: 'Your job is to write simple database search commands (SQL) and explain how tables are set up.',
    constraints: {
      strict: true,
      tablesOnly: true,
      noEdits: false
    },
    tools: ['database_lookup', 'table_viewer'],
    testPrompt: 'Find all customers from Germany who spent more than $100.',
    simResponse: `Thought: Checking my rules. The user wants to find data. I must output a database search command.
Tool Call: none required.
Rule Check: output database code only. Do not make up tables.

Response:
Here is the search command to find those customers:
\`\`\`sql
SELECT * FROM customers 
WHERE country = 'Germany' AND total_spent > 100;
\`\`\`
Explanation: This query filters the "customers" list by country and spending amount.`
  },
  medical: {
    name: 'Basic Health Advisor',
    emoji: '🩺',
    role: 'You are a friendly first aid advisor.',
    mission: 'Your job is to explain common symptoms (like colds or scrapes) and remind users to consult a doctor.',
    constraints: {
      strict: true,
      tablesOnly: false,
      noEdits: true
    },
    tools: ['first_aid_guide', 'symptom_list'],
    testPrompt: 'I have a scratchy throat and a mild headache. What should I do?',
    simResponse: `Thought: Checking health advice rules. I must warn the user to see a doctor.
Rule Check: MUST start with a warning disclaimer. Do not name strong medications.

Response:
⚠️ IMPORTANT: I am an AI, not a doctor. Please talk to a professional if you feel very sick.

For a mild scratchy throat and headache:
1. Drink lots of warm water or tea.
2. Get plenty of rest.
3. Gargle with warm salt water to soothe your throat.

If you develop a high fever or have trouble breathing, seek medical help immediately.`
  },
  coder: {
    name: 'Python Code Tutor',
    emoji: '🐍',
    role: 'You are a Python programming tutor.',
    mission: 'Your job is to look at broken Python code, explain why it does not work in simple terms, and show how to fix it.',
    constraints: {
      strict: false,
      tablesOnly: false,
      noEdits: false
    },
    tools: ['code_runner', 'syntax_checker'],
    testPrompt: 'Why does this code show an error? \ndef hello(name):\nprint("Hello " + name)',
    simResponse: `Thought: Analyzing Python code indentation. The print statement is not indented correctly.
Rule Check: explain simply and provide fixed code.

Response:
In Python, lines of code inside a function must be indented (pushed to the right using spaces or a tab). 

Here is the correct code:
\`\`\`python
def hello(name):
    print("Hello " + name)  # Indented with 4 spaces
\`\`\`
Indenting tells Python that this print action belongs inside the "hello" function.`
  }
};

const QUIZ_QUESTIONS = [
  {
    q: 'What is the main difference between a System Prompt and a User Prompt?',
    opts: [
      'A System Prompt sets the rules and personality of the AI behind the scenes; a User Prompt is the actual message typed by the user.',
      'System prompts can only accept numbers.',
      'User prompts are only for advanced developers.'
    ],
    ans: 0
  },
  {
    q: 'Why do we list available tools in the system instructions?',
    opts: [
      'So the AI knows what helpers it is allowed to use (like a calendar search or calculator) and how to ask for them.',
      'To change the layout colors of the chatbot buttons.',
      'To make the computer use less memory.'
    ],
    ans: 0
  },
  {
    q: 'What happens when we add a "Rule Constraint" (like "Never name competitor brands")?',
    opts: [
      'The AI checks its guidelines before responding and blocks itself from typing those competitor names.',
      'The AI runs faster on the internet.',
      'The AI crashes and displays a coding warning.'
    ],
    ans: 0
  },
  {
    q: 'What is a system prompt "jailbreak"?',
    opts: [
      'When a user tricks the AI into ignoring its system rules and guardrails.',
      'When the web server database crashes.',
      'When the internet speed gets too slow.'
    ],
    ans: 0
  },
  {
    q: 'How do you force the AI to format its answers in a specific way (like a simple list)?',
    opts: [
      'By writing a clear rule in the system prompt asking it to "Respond only as a bulleted list".',
      'By installing external software on the web browser.',
      'By turning off the system prompt completely.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay6({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');

  // Interactive Builder States
  const [activePreset, setActivePreset] = useState('sql');
  const [customRole, setCustomRole] = useState(PRESETS.sql.role);
  const [customMission, setCustomMission] = useState(PRESETS.sql.mission);
  
  // Rule Toggles
  const [ruleTone, setRuleTone] = useState(true);
  const [ruleMarkdown, setRuleMarkdown] = useState(true);
  const [ruleNoCompetitors, setRuleNoCompetitors] = useState(false);
  const [ruleShowReasoning, setRuleShowReasoning] = useState(true);

  // Tools Selection
  const [selectedTools, setSelectedTools] = useState(PRESETS.sql.tools);
  
  // Test Terminal States
  const [userQuery, setUserQuery] = useState(PRESETS.sql.testPrompt);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [agentAnswer, setAgentAnswer] = useState('');

  // Sync builder textboxes when preset changes
  useEffect(() => {
    const preset = PRESETS[activePreset];
    if (preset) {
      setCustomRole(preset.role);
      setCustomMission(preset.mission);
      setSelectedTools(preset.tools);
      setUserQuery(preset.testPrompt);
      setAgentAnswer('');
      setSimLogs([]);
    }
  }, [activePreset]);

  // Compile system prompt based on active configurations
  const compileSystemPrompt = () => {
    let rules = [];
    if (ruleTone) rules.push('- Always speak in a polite, helpful, and professional tone.');
    if (ruleMarkdown) rules.push('- Format all code, lists, and tables using clean Markdown.');
    if (ruleNoCompetitors) rules.push('- Do NOT mention or refer to other competitor brands.');
    if (ruleShowReasoning) rules.push('- Show your "Thought" logic step before printing the final answer.');

    const compiled = `# SYSTEM PROMPT (AI RULES)
Who you are (Role): ${customRole}

# YOUR CORE JOB (Mission)
${customMission}

# ALLOWED TOOLS (Actions you can take)
You are authorized to use these tools:
${selectedTools.map(t => `- \`${t}\``).join('\n')}

# RULES & GUARDRAILS (What you can and cannot do)
${rules.length > 0 ? rules.join('\n') : '- Help the user safely.'}`;

    return compiled;
  };

  const handlePresetSelect = (key) => {
    setActivePreset(key);
  };

  const handleToolToggle = (toolName) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(prev => prev.filter(t => t !== toolName));
    } else {
      setSelectedTools(prev => [...prev, toolName]);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimLogs([]);
    setAgentAnswer('');

    const preset = PRESETS[activePreset];
    const steps = [
      '🔍 Loading your Compiled System Prompt rules...',
      '🛡️ Checking rules: checking tone, constraints, and limitations...',
      '🛠️ Checking tools: identifying allowed helpers...',
      `⚡ User asked: "${userQuery}"`,
      ruleShowReasoning ? '🧠 AI Thought: Checking guidelines and formatting constraints...' : '🧠 Processing inputs...',
      '📡 Generating response...'
    ];

    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setAgentAnswer(preset ? preset.simResponse : '✅ Success! Response processed.');
            setIsSimulating(false);
          }, 800);
        }
      }, delay);
      delay += 500;
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizScore = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: isActive ? '#059669' : 'transparent',
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
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(5,150,105,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 2 • DAY 6
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                AI Instructions & System Prompts
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to set the rules, identity, and behavior of an AI assistant behind the scenes so it answers correctly and safely every time.
              </p>
            </div>

            {/* Core Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                  What is a System Prompt?
                </h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  A **System Prompt** is a set of master instructions given to the AI *before* the user starts chatting. It is invisible to the end user. It acts like backstage directions for an actor—telling the AI how to behave, what tone to use, and what rules to follow.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7 }}>
                  While the user can ask whatever they want, the system prompt acts as a guardrail. It prevents the AI from getting distracted, helps it avoid talking about forbidden topics (like competitor brands), and forces it to present answers in a clean layout (like a simple list).
                </p>
              </div>

              {/* Quick Info Box */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} style={{ color: '#059669' }} /> The 4 Core Parts:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#475569' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>👤 Identity:</span>
                    <span>Who the AI pretends to be (e.g. "Python Tutor").</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>🎯 Job:</span>
                    <span>What the AI is supposed to help with.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>🛡️ Guardrails:</span>
                    <span>Safety rules (e.g. "Do not give medical dosage suggestions").</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>🛠️ Tools:</span>
                    <span>Helpful functions the AI is allowed to trigger.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px' }}>
                <div style={{ background: '#ecfdf5', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <Bot size={20} style={{ color: '#059669' }} />
                </div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem' }}>Persona (Identity)</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Choose the AI\'s tone, background experience, and style of speaking.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px' }}>
                <div style={{ background: '#ecfdf5', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <Shield size={20} style={{ color: '#059669' }} />
                </div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem' }}>Safety Rules</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Keep the AI focused and stop it from talking about unsafe or off-topic things.</span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px' }}>
                <div style={{ background: '#ecfdf5', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <Code size={20} style={{ color: '#059669' }} />
                </div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem' }}>Format Rules</strong>
                <span style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Force the AI to output answers as clean bullet points, code blocks, or simple tables.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('anatomy')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Explore Prompt Anatomy <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. PROMPT ANATOMY ───────────────────────────────────────── */}
        {activeTab === 'anatomy' && (
          <motion.div key="anatomy" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🔬 Anatomy of a System Prompt</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>A good system prompt is structured in simple sections so the AI stays focused:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Detailed Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: '1. Who is the AI? (Persona)', desc: 'Sets the AI\'s identity, background, and expert knowledge.', tag: '[ROLE]' },
                  { title: '2. What is the Job? (Mission)', desc: 'Explains what tasks the AI is supposed to accomplish.', tag: '[MISSION]' },
                  { title: '3. What can it use? (Tools)', desc: 'List of actions (like search or running code) the AI is allowed to trigger.', tag: '[TOOLS]' },
                  { title: '4. What is forbidden? (Constraints)', desc: 'Safety rules, topic blocks, or length limits the AI must respect.', tag: '[GUARDRAILS]' },
                  { title: '5. How should it look? (Formatting)', desc: 'Directions on how the final response should be presented (e.g. lists or tables).', tag: '[FORMATTING]' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.2rem 1.5rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.8rem', background: '#ecfdf5', color: '#047857', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {item.tag}
                    </span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a', marginBottom: '0.2rem' }}>{item.title}</strong>
                      <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Combined View */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', color: '#e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>
                  <strong style={{ color: '#059669', fontSize: '0.9rem', fontFamily: 'monospace' }}>📝 SIMPLE SYSTEM PROMPT EXAMPLE</strong>
                </div>

                <div style={{ flex: 1, fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.6, overflowY: 'auto' }}>
                  <span style={{ color: '#38bdf8' }}># ROLE (Who you are)</span><br />
                  You are a simple Python programming tutor.<br /><br />

                  <span style={{ color: '#38bdf8' }}># MISSION (Your job)</span><br />
                  Help beginners write clean code and find syntax errors.<br /><br />

                  <span style={{ color: '#38bdf8' }}># TOOLS (What you can use)</span><br />
                  - \`code_syntax_checker()\` to inspect indent errors.<br /><br />

                  <span style={{ color: '#38bdf8' }}># GUARDRAILS (What is forbidden)</span><br />
                  - Do NOT use complex library functions. Only use basic standard library features.<br /><br />

                  <span style={{ color: '#38bdf8' }}># FORMATTING (How it should look)</span><br />
                  - Write the corrected code inside a Markdown code block, followed by a 1-sentence explanation.
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('builder')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Interactive Builder <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. INTERACTIVE BUILDER ───────────────────────────────────── */}
        {activeTab === 'builder' && (
          <motion.div key="builder" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 System Prompt Builder & Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Set your rules, compile the prompt, and test how it controls the AI\'s responses:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Profile Config Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                {/* Profile selection */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <label style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>Select Preset Persona:</label>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {Object.entries(PRESETS).map(([key, item]) => {
                      const isActive = activePreset === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handlePresetSelect(key)}
                          style={{
                            flex: 1,
                            padding: '0.6rem 0.4rem',
                            border: isActive ? '2px solid #059669' : '1px solid #cbd5e1',
                            background: isActive ? '#ecfdf5' : 'white',
                            color: isActive ? '#047857' : '#64748b',
                            borderRadius: '8px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.1s'
                          }}
                        >
                          <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text customization block */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div>
                    <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>AI\'s Role:</label>
                    <textarea
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      style={{ width: '100%', height: '54px', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>AI\'s Job (Mission):</label>
                    <textarea
                      value={customMission}
                      onChange={(e) => setCustomMission(e.target.value)}
                      style={{ width: '100%', height: '72px', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                </div>

                {/* Toggles Guardrails */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>AI Rules (Toggle):</strong>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                      <input type="checkbox" checked={ruleTone} onChange={(e) => setRuleTone(e.target.checked)} />
                      Polite and Helpful Tone
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                      <input type="checkbox" checked={ruleMarkdown} onChange={(e) => setRuleMarkdown(e.target.checked)} />
                      Format Outputs clearly (Lists/Code blocks)
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                      <input type="checkbox" checked={ruleNoCompetitors} onChange={(e) => setRuleNoCompetitors(e.target.checked)} />
                      Do NOT mention competitor brands
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                      <input type="checkbox" checked={ruleShowReasoning} onChange={(e) => setRuleShowReasoning(e.target.checked)} />
                      Show reasoning steps (Thought logs)
                    </label>
                  </div>
                </div>

                {/* Tool Authorization */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block', marginBottom: '0.6rem' }}>Authorized Tools (Click to allow):</strong>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['database_lookup', 'table_viewer', 'first_aid_guide', 'code_runner', 'syntax_checker'].map((tool) => {
                      const isAuth = selectedTools.includes(tool);
                      return (
                        <button
                          key={tool}
                          onClick={() => handleToolToggle(tool)}
                          style={{
                            padding: '0.35rem 0.6rem',
                            fontSize: '0.78rem',
                            border: isAuth ? '1px solid #059669' : '1px solid #cbd5e1',
                            background: isAuth ? '#ecfdf5' : '#f8fafc',
                            color: isAuth ? '#047857' : '#64748b',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          {isAuth ? '✓' : '+'} {tool}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Visual Compiler & Simulation Console */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Compiled System Prompt Window */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '1.8rem', display: 'flex', flexDirection: 'column', height: '240px', boxSizing: 'border-box' }}>
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.6rem', marginBottom: '0.8rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ color: 'white', fontSize: '0.85rem', fontFamily: 'monospace' }}>⚙️ ACTIVE SYSTEM RULES (COMPILED)</strong>
                    <span style={{ fontSize: '0.72rem', background: '#064e3b', color: '#a7f3d0', padding: '0.1rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                      AUTO-COMPILED
                    </span>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.78rem', fontFamily: 'monospace', color: '#a7f3d0', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {compileSystemPrompt()}
                  </div>
                </div>

                {/* Simulator Console Chat */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1, boxSizing: 'border-box', minHeight: '320px' }}>
                  
                  <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'white', fontSize: '0.88rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={14} style={{ color: '#059669' }} /> AI SIMULATION SCREEN
                    </strong>
                    <span style={{ fontSize: '0.72rem', background: isSimulating ? '#78350f' : '#1e293b', color: isSimulating ? '#fbbf24' : '#94a3b8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                      {isSimulating ? '⏳ PROCESSING' : '■ IDLE'}
                    </span>
                  </div>

                  {/* Log Trace Terminal */}
                  {simLogs.length > 0 && (
                    <div style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: '10px', padding: '0.6rem 0.8rem', fontSize: '0.78rem', color: '#a7f3d0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem', maxHeight: '110px', overflowY: 'auto' }}>
                      {simLogs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                      ))}
                    </div>
                  )}

                  {/* Simulator Text Area Input */}
                  {simLogs.length === 0 && !agentAnswer && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                      <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'monospace' }}>Type a query to test the rules:</label>
                      <textarea
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="Type test request..."
                        style={{ width: '100%', flex: 1, background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '8px', padding: '0.8rem', outline: 'none', fontSize: '0.88rem', resize: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  )}

                  {/* Output Display */}
                  {agentAnswer && (
                    <div style={{ flex: 1, overflowY: 'auto', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '1rem', boxSizing: 'border-box', margin: '0.4rem 0' }}>
                      <div style={{ borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, fontFamily: 'monospace' }}>AI RESPONSE</span>
                        <button onClick={() => { setAgentAnswer(''); setSimLogs([]); }} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}>Clear</button>
                      </div>
                      <pre style={{ color: '#e2e8f0', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}>
                        {agentAnswer}
                      </pre>
                    </div>
                  )}

                  {/* Simulator Action Trigger */}
                  <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1rem', display: 'flex', justifyItems: 'center' }}>
                    <button
                      onClick={handleSimulate}
                      disabled={isSimulating || !userQuery.trim()}
                      style={{
                        width: '100%',
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Play size={14} /> Simulate Response
                    </button>
                  </div>

                </div>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('anatomy')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Anatomy
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={22} style={{ color: '#059669' }} />
                Day 6 Assignment: Database Helper System Prompt
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> Write system rules for a Database Auditor Agent. 
                <br />
                The rules must specify:
                <br />
                1. **Role**: Senior Database Administrator.<br />
                2. **Mission**: Help the developer optimize search commands and index allocations.<br />
                3. **Constraint**: Never recommend creating more than 3 indexes.<br />
                4. **Format**: Display suggestions inside a simple Markdown list.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #059669', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Draft the rules using these headings:</span>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li># ROLE (Who you are)</li>
                  <li># MISSION (What you do)</li>
                  <li># RULES (What is forbidden)</li>
                  <li># FORMAT (How the answer looks)</li>
                </ul>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your system rules prompt here in simple terms..."
                style={{ width: '100%', height: '180px', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.98rem', outline: 'none', resize: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.5 }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                disabled={!assignmentText.trim() || assignmentSubmitted}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✅ Assignment Submitted Successfully' : 'Submit Assignment'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('builder')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Builder
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('quiz')} style={{ background: '#059669', borderColor: '#059669', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Day 6 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 6 Knowledge Quiz</h2>
              
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
                            bg = '#f0fdf4';
                            border = '1px solid #059669';
                            textColor = '#059669';
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
                    background: '#059669',
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
                <div style={{ marginTop: '2rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#065f46', display: 'block', marginBottom: '0.4rem' }}>
                    Quiz Score: {quizScore} / {QUIZ_QUESTIONS.length}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#047857' }}>
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered system prompts!' : 'Review the correct options highlighted green above.'}
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
