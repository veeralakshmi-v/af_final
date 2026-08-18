import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Terminal, Check, Sliders, CheckCircle, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'json_theory', label: '🗂️ Structured Outputs' },
  { id: 'json_sandbox', label: '💻 JSON Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Why are structured outputs (like JSON) critical when building AI software applications?',
    opts: [
      'They make the text look more colorful',
      'They provide a consistent key-value format that software programs can easily parse and read programmatically without crashing',
      'They decrease model temperature automatically'
    ],
    ans: 1
  },
  {
    q: 'Which format is most commonly used for structured AI responses?',
    opts: ['Word Documents (.docx)', 'JSON (JavaScript Object Notation)', 'Markdown list items'],
    ans: 1
  },
  {
    q: 'What is a JSON Schema?',
    opts: ['A blueprint detailing the exact keys, data types, and required fields the AI must include in its JSON output', 'A method of training models locally', 'A database hosting software'],
    ans: 0
  },
  {
    q: 'What does enabling "JSON Mode" do in frontier APIs (like OpenAI/Gemini)?',
    opts: ['It translates outputs to Spanish', 'It guarantees the model will only generate a response that is syntactically valid JSON (otherwise it errors)', 'It reduces token count by 50%'],
    ans: 1
  },
  {
    q: 'What happens if you do NOT specify constraints for JSON outputs in a general prompt?',
    opts: ['The model refuses to answer', 'The model might add conversational preambles like "Sure, here is your JSON:" which will break program parsers', 'The model turns off'],
    ans: 1
  },
  {
    q: 'Which of the following is a valid JSON snippet?',
    opts: ['{name = "Alice"}', '{"name": "Alice"}', 'name: "Alice"'],
    ans: 1
  },
  {
    q: 'How can you prompt-engineer older models to output JSON if they do not support JSON Mode natively?',
    opts: ['By typing in bold text', 'By providing a Few-Shot example showing the exact JSON format and using negative constraints to block conversational preambles', 'By uploading a JSON file'],
    ans: 1
  },
  {
    q: 'In a schema declaration, what does the "required" field specify?',
    opts: ['The temperature value needed', 'The keys that MUST be present in the output JSON', 'The cost of the API call'],
    ans: 1
  }
];

export default function GenAIDay9({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [sandboxScenario, setSandboxScenario] = useState('review');
  const [simulatedJson, setSimulatedJson] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateJson = () => {
    setIsParsing(true);
    setSimulatedJson('');
    setParsedData(null);

    const scenarios = {
      review: {
        raw: `{\n  "book_title": "Atomic Habits",\n  "sentiment": "positive",\n  "rating": 5,\n  "key_takeaway": "Build small 1% systems daily."\n}`,
        parsed: { title: "Atomic Habits", sentiment: "positive", rating: "⭐️⭐️⭐️⭐️⭐️", takeaway: "Build small 1% systems daily." }
      },
      profile: {
        raw: `{\n  "name": "Jane Doe",\n  "profession": "UI/UX Designer",\n  "skills": ["Figma", "CSS", "Wireframing"],\n  "experience_years": 4\n}`,
        parsed: { title: "Jane Doe", sentiment: "Designer", rating: "4 Years Exp", takeaway: "Figma, CSS, Wireframing" }
      }
    };

    const target = scenarios[sandboxScenario];
    let idx = 0;
    const interval = setInterval(() => {
      setSimulatedJson(target.raw.slice(0, idx));
      idx++;
      if (idx > target.raw.length) {
        clearInterval(interval);
        setParsedData(target.parsed);
        setIsParsing(false);
      }
    }, 15);
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
                background: isActive ? '#3b82f6' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
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
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(30,64,175,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#bfdbfe', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> DAY 9 • STRUCTURED OUTPUTS
              </div>
              <h1 style={{ fontSize: '2.4rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Structured Outputs & JSON Responses
              </h1>
              <p style={{ color: '#bfdbfe', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                When writing code to integrate AI into dashboards or portals, conversational responses like "Sure, here is your answer!" break database parses. Today we learn how to force AI models to output strict, machine-readable JSON data.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 9 Goal:</strong> Force AI models to output valid JSON responses and understand schema declaration constraints.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('json_theory')} style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                Structured Outputs Theory <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 2. THEORY ────────────────────────────────────────────────── */}
        {activeTab === 'json_theory' && (
          <motion.div key="json_theory" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🗂️ Why Structured Outputs?</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              If you ask an AI chatbot for customer profile facts, it might write a paragraph. But code needs fields like `name` and `email` to insert into database rows.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1rem', marginBottom: '0.6rem' }}>🤖 Conversational Output (Hard to Parse)</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', color: '#e2e8f0', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  "I read the profile. The user is Alice. Her role is Developer. She knows JavaScript."
                </div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.5 }}>
                  ⚠️ Custom code would need complex text parsing rules to find the name and language. If the AI changes its wording slightly, the code breaks.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontWeight: 800, color: '#059669', fontSize: '1rem', marginBottom: '0.6rem' }}>📊 JSON Output (Easy to Parse)</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  {`{\n  "name": "Alice",\n  "role": "Developer",\n  "language": "JavaScript"\n}`}
                </div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.5 }}>
                  ✅ Software programs can parse this string instantly using `JSON.parse()` to read `data.name` or `data.language` safely.
                </p>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #3b82f6', marginBottom: '1.5rem' }}>
              💡 <strong>JSON Schema Enforcement:</strong>
              <br />
              When you declare a JSON Schema in a prompt, you define:
              <br />
              • **Properties**: The list of allowed keys (e.g. `user_id`, `age`).
              <br />
              • **Types**: The required variable format (e.g. `string`, `integer`, `array`).
              <br />
              • **Required**: The list of keys that **must** appear in every response.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('json_sandbox')} style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                Try JSON Sandbox <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'json_sandbox' && (
          <motion.div key="json_sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 JSON Output Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Select a scenario, check the raw JSON output generated by the AI, and watch the UI parse and render it dynamically.
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px' }}>
              
              {/* Scenario Toggles */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setSandboxScenario('review')}
                  style={{ flex: 1, background: sandboxScenario === 'review' ? '#3b82f6' : '#f1f5f9', color: sandboxScenario === 'review' ? 'white' : '#475569', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Scenario A: Analyze Book Review
                </button>
                <button
                  onClick={() => setSandboxScenario('profile')}
                  style={{ flex: 1, background: sandboxScenario === 'profile' ? '#3b82f6' : '#f1f5f9', color: sandboxScenario === 'profile' ? 'white' : '#475569', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Scenario B: Extract Profile Details
                </button>
              </div>

              <button
                onClick={handleSimulateJson}
                disabled={isParsing}
                style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem', width: '100%' }}
              >
                {isParsing ? '⏳ Generating JSON Output...' : '▶ Run Prompt to output JSON'}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                
                {/* JSON Display */}
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>🤖 Raw JSON Code Output</span>
                  <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '12px', minHeight: '160px', border: '1px solid #1e293b' }}>
                    {simulatedJson ? (
                      <pre style={{ margin: 0, color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{simulatedJson}</pre>
                    ) : (
                      <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic' }}>JSON will appear here...</span>
                    )}
                  </div>
                </div>

                {/* Parsed Output Card */}
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>🖥️ UI Parsed Render</span>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', minHeight: '160px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {parsedData ? (
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.1rem' }}>{parsedData.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 800 }}>{parsedData.sentiment}</span>
                          <span style={{ fontSize: '0.85rem' }}>{parsedData.rating}</span>
                        </div>
                        <p style={{ margin: 0, color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
                          <strong>Detail:</strong> {parsedData.takeaway}
                        </p>
                      </div>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center' }}>Waiting for JSON parsing...</span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                Day 9 Assignment <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 9 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Write a system prompt template that forces a specific billing extraction schema:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Receipt Data Extraction Schema
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Create a prompt that forces the model to analyze a receipt and output a JSON object containing:
                <br />
                • `merchant_name` (string)
                <br />
                • `total_amount` (number)
                <br />
                • `items_purchased` (array of strings)
                <br />
                Add rules that prevent the model from adding introductory text (e.g. "Here is the JSON:").
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`SYSTEM PROMPT:\nYou are an AI data extractor. Output ONLY valid JSON matching this schema:\n{\n  "merchant_name": "...",\n  "total_amount": 0.00,\n  "items_purchased": []\n}\n\nRULES:\n- Do NOT wrap the JSON in conversational text.`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Schema Prompt Submitted!' : 'Submit Schema Prompt'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Structured prompt saved!</strong> Take the Day 9 assessment quiz below.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                Start Assessment Quiz <ArrowRight size={16}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 9 Assessment Quiz</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{QUIZ_QUESTIONS.length} questions — select your answers:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {QUIZ_QUESTIONS.map((item, qi) => (
                <div key={qi} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizSubmitted) {
                        if (isCorrect) { bg = '#dcfce7'; border = '1.5px solid #10b981'; color = '#065f46'; }
                        else if (isSelected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; color = '#7f1d1d'; }
                      } else if (isSelected) { bg = '#dbeafe'; border = '1.5px solid #3b82f6'; color = '#1e3a8a'; }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          style={{ background: bg, border, color, padding: '0.65rem 0.9rem', borderRadius: '8px', cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 600 : 400 }}
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

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  style={{ background: '#3b82f6', borderColor: '#3b82f6' }}
                >
                  Submit Answers
                </button>
              ) : (
                <>
                  <div style={{ background: score >= 6 ? '#dcfce7' : '#fef9c3', border: `1px solid ${score >= 6 ? '#10b981' : '#ca8a04'}`, padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, color: score >= 6 ? '#065f46' : '#713f12' }}>
                    Score: {score} / {QUIZ_QUESTIONS.length} {score >= 6 ? '🎉 Great Job!' : '📖 Review the lessons!'}
                  </div>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                    Retry Quiz
                  </button>
                </>
              )}
            </div>

            <div style={{ background: '#dbeafe', border: '1px solid #bfdbfe', padding: '1.5rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#1e3a8a' }}>🎉 Day 9 Complete!</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've successfully completed the structured outputs syllabus.</p>
              </div>
              <button
                onClick={() => handleContinue('intro')}
                style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.6rem 1.3rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
