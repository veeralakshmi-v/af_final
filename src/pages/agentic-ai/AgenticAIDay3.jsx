import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Sparkles, MessageSquare, Terminal, Sliders, 
  Play, RefreshCw, CheckCircle, ArrowRight, Layers 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Lesson Overview' },
  { id: 'techniques', label: '⚙️ Key Prompting Techniques' },
  { id: 'sandbox', label: '💻 Interactive Prompt Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is the role of a "System Prompt" in AI applications?',
    opts: [
      'It acts as the global safety rules, personality, and operational constraints for the AI, overriding normal conversational directions.',
      'It represents the compiler code runtime.',
      'It is a backup database table copy.'
    ],
    ans: 0
  },
  {
    q: 'What is "Few-Shot Prompting"?',
    opts: [
      'Triggering query calls multiple times in a row.',
      'Providing one or more input-output examples in the prompt to teach the model a desired pattern before asking it to write a new one.',
      'Using very short prompt strings.'
    ],
    ans: 1
  },
  {
    q: 'How does "Chain-of-Thought (CoT)" prompting help the AI?',
    opts: [
      'It forces the model to write out its intermediate reasoning steps ("let\'s think step by step") before producing a final answer, improving logical accuracy.',
      'It formats texts in HTML style.',
      'It encrypts database tables.'
    ],
    ans: 0
  },
  {
    q: 'Why are Structured Outputs (like JSON) important in Agentic pipelines?',
    opts: [
      'They make layouts render faster on mobile displays.',
      'They force the model to respond in a strict format (JSON) that backend server code can easily parse to trigger programmatic actions.',
      'They prevent users from copying prompt text.'
    ],
    ans: 1
  },
  {
    q: 'What is a "Negative Constraint" in a prompt?',
    opts: [
      'A command instructing the AI what NOT to do (e.g., "Do not speculate if the answer is missing").',
      'An error code thrown by local servers.',
      'A style template that removes page borders.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay3({ activeTab, onNavigate, openAITutor }) {
  const [activeSubTab, setActiveSubTab] = useState('intro');

  // Sandbox Compiler State
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful customer assistant. Format your response in clean JSON: { \"response\": \"your text\", \"mood\": \"happy\" }"
  );
  const [userQuery, setUserQuery] = useState("Hello, can you help me check my order?");
  const [isCompiling, setIsCompiling] = useState(false);
  const [sandboxResult, setSandboxResult] = useState(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleSubTabChange = (tabId) => {
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompilePrompt = () => {
    setIsCompiling(true);
    setSandboxResult(null);

    // Simulate Prompt validation check rules
    setTimeout(() => {
      const pLower = systemPrompt.toLowerCase();
      const roleFound = pLower.includes("you are") || pLower.includes("role") || pLower.includes("persona");
      const formatFound = pLower.includes("json") || pLower.includes("format") || pLower.includes("{");
      const constraintFound = pLower.includes("do not") || pLower.includes("never") || pLower.includes("limit") || pLower.includes("strictly");

      let responseText = "Hello! I would be delighted to assist you in verifying your order details. Could you please provide your 6-digit transaction ID?";
      if (pLower.includes("angry") || pLower.includes("rude")) {
        responseText = "What do you want? Give me your order number quickly.";
      }

      setSandboxResult({
        validation: {
          role: roleFound ? '✅ Role defined successfully' : '⚠️ No clear persona role assigned',
          format: formatFound ? '✅ Output format defined' : '⚠️ No format rules (e.g. JSON)',
          constraints: constraintFound ? '✅ Constraints present' : '⚠️ No negative constraints set'
        },
        payload: {
          role: roleFound ? "Assistant" : "Default Model",
          queryProcessed: userQuery,
          formattedOutput: formatFound 
            ? `{\n  "response": "${responseText}",\n  "mood": "${pLower.includes("angry") ? "annoyed" : "happy"}"\n}` 
            : responseText
        }
      });
      setIsCompiling(false);
    }, 700);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 1 • DAY 3
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Day 3: Mastering Prompt Engineering
              </h1>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to program AI models using natural language. Explore role assignments, constraints configurations, dynamic formatting styles, and JSON schema outputs.
              </p>
            </div>

            {/* Core Pillars */}
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.2rem' }}>⚙️ The 5 Pillars of a Perfect Prompt:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>1. Role & Persona</strong>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Gives the AI a clear identity (e.g. <em>"You are a senior SQL database administrator"</em>). This narrows down its vocabulary and focuses its knowledge fields.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>2. Context & Background</strong>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Provides the necessary details (e.g., <em>"We are querying a VIP tables schema with 3 rows"</em>) so the model answers contextually rather than guessing general assumptions.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>3. Instructions & Task</strong>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  The explicit action command (e.g., <em>"Extract the driver name and compile a bulleted list summary"</em>). Keep instructions clear, direct, and actionable.
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>4. Constraints & Rules</strong>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Negative boundaries telling the model what NOT to do (e.g., <em>"Do not use markdown wrappers, and say 'unknown' if facts are missing"</em>) to stop hallucinations.
                </p>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('techniques')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Explore Techniques <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. TECHNIQUES ────────────────────────────────────────────── */}
        {activeSubTab === 'techniques' && (
          <motion.div key="techniques" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>⚙️ Advanced Prompting Strategies</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Compressing core strategies used to control agent outputs:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Few-Shot */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Sliders size={30} color="#7c3aed" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>A. Few-Shot Prompting (Give Examples First)</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.8rem', display: 'inline-block' }}>
                      💡 Analogy: Giving a student practice questions before a test.
                    </div>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      Instead of just describing what you want, paste <strong>real input-output examples</strong>. This shows the AI the exact pattern, tone, and style it must replicate.
                    </p>
                    <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>Example template to include in your prompt:</strong>
                    <pre style={{ margin: 0, background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a', lineHeight: 1.4, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      Input: "I need to check order 491"<br />
                      Output: CHECK_ORDER_ACTION(id: 491)<br /><br />
                      Input: "Send receipt to user"<br />
                      Output: SEND_EMAIL_ACTION(template: "receipt")
                    </pre>
                  </div>
                </div>
              </div>

              {/* Chain of thought */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Layers size={30} color="#7c3aed" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>B. Chain-of-Thought Prompting (Think Step-by-Step)</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.8rem', display: 'inline-block' }}>
                      💡 Analogy: Showing your calculations in math class to avoid simple mistakes.
                    </div>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      If you ask the AI to calculate or take action immediately, it might jump to a wrong guess. Force the AI to write down its <strong>Thought Process</strong> first before writing the answer.
                    </p>
                    <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>How to write it:</strong>
                    <p style={{ margin: 0, fontStyle: 'italic', color: '#7c3aed' }}>
                      "Before responding, write a 'Thought:' section explaining your logical steps, and only then write your final decision."
                    </p>
                  </div>
                </div>
              </div>

              {/* Structured JSON */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.8rem', borderRadius: '12px', display: 'inline-flex' }}>
                  <Terminal size={30} color="#7c3aed" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.6rem 0' }}>C. Structured Output (Use Clean JSON)</h3>
                  <div style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.8rem', display: 'inline-block' }}>
                      💡 Analogy: Asking someone to fill out a form instead of writing a free-form letter.
                    </div>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      To hook an AI output up to a database or code, the response must be formatted perfectly. Instruct the model to return raw JSON data instead of conversational paragraphs.
                    </p>
                    <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.4rem' }}>How to write it:</strong>
                    <pre style={{ margin: 0, background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a', lineHeight: 1.4, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      "Return your response strictly as a JSON object: &#123; \"username\": \"text\", \"needs_reset\": true &#125;. Do not include markdown code block wrappers."
                    </pre>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleSubTabChange('sandbox')} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Launch Sandbox Compiler <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX PLAYGROUND ────────────────────────────────────── */}
        {activeSubTab === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 Dynamic Prompt Validator</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Write or tweak your system prompt constraints and compile outputs validator logs:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
              
              {/* Left Form */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.95rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>System Prompt Configuration:</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    style={{ width: '100%', height: '110px', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.96rem', fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.4 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.95rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>User Query Input:</label>
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.96rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  onClick={handleCompilePrompt}
                  disabled={isCompiling || !systemPrompt.trim()}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 10px rgba(124,58,237,0.2)'
                  }}
                >
                  {isCompiling ? '⏳ Analyzing Prompt Parameters...' : '🔬 Compile & Validate Output'}
                </button>
              </div>

              {/* Right Output Monitor */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
                <strong style={{ color: 'white', fontSize: '0.92rem', fontFamily: 'monospace', borderBottom: '1px solid #1e293b', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'block' }}>
                  📡 COMPILED RESULTS MONITOR
                </strong>

                {sandboxResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    
                    {/* Validation tags */}
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>⚙️ Prompt Structural Rules Checks:</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'white' }}>
                        <div>{sandboxResult.validation.role}</div>
                        <div>{sandboxResult.validation.format}</div>
                        <div>{sandboxResult.validation.constraints}</div>
                      </div>
                    </div>

                    {/* Output JSON payload */}
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>📦 AI Output Payload:</span>
                      <pre style={{ margin: 0, background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155', color: '#22d3ee', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                        {sandboxResult.payload.formattedOutput}
                      </pre>
                    </div>

                  </div>
                ) : (
                  <span style={{ color: '#475569', fontSize: '0.88rem', fontStyle: 'italic', fontFamily: 'monospace' }}>Compile your configurations to view validated mock responses logs...</span>
                )}
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleSubTabChange('techniques')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Techniques
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
                <MessageSquare size={22} style={{ color: '#7c3aed' }} />
                Day 3 Assignment: Designing a Translator System Prompt
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <strong>Scenario:</strong> You need to write a system prompt for a **"Professional English-to-Spanish Translation Agent"** that:
                <br />
                1. Assumes the role of a professional translator.
                <br />
                2. Outputs strictly a JSON object: <code>{`{ "original": "text", "translation": "text", "confidence": float }`}</code>.
                <br />
                3. Constraint: Never include markdown formatting block wrappers (like ```json), and if the input contains inappropriate text, return confidence score 0.0 with empty strings translation.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>✍️ Write the complete System Prompt:</span>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Ensure you clearly define Role, Context, Task, format details, and safety negative constraints bounds.
                </p>
              </div>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Write your system prompt design here..."
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
                Start Day 3 Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ASSESSMENT ───────────────────────────────────────── */}
        {activeSubTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>✍️ Day 3 Knowledge Quiz</h2>
              
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
                    {quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score! You have mastered Prompt Engineering!' : 'Review the correct options highlighted green above.'}
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
