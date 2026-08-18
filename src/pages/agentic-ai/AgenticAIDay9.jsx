import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Terminal, Check, Sliders, CheckCircle, HelpCircle, Shield, Layers, HelpCircle as HelpIcon } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'intro', label: '📋 Overview' },
  { id: 'json_theory', label: '🗂️ Structured Outputs' },
  { id: 'pydantic_deepdive', label: '🛡️ Pydantic Deep Dive' },
  { id: 'json_sandbox', label: '💻 JSON & Pydantic Sandbox' },
  { id: 'assignment', label: '📝 Assignment' },
  { id: 'quiz', label: '✍️ Quiz Assessment' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Why are structured outputs (like JSON) critical when building AI software applications?',
    opts: [
      'They make the text look more colorful.',
      'They provide a consistent key-value format that software programs can easily parse and read programmatically without crashing.',
      'They decrease model temperature automatically.'
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
    q: 'What is Pydantic in Python AI applications?',
    opts: [
      'A library used to define data schemas and automatically validate that the AI\'s response matches those rules (checking keys and types).',
      'A visual UI tool used to generate animations in CSS.',
      'A compiler that turns Python code into raw SQL.'
    ],
    ans: 0
  },
  {
    q: 'What happens if Pydantic detects that an AI output is missing a required field or has a wrong type?',
    opts: [
      'It raises a Validation Error, allowing the hosting application to catch the issue and ask the AI to correct it.',
      'It automatically changes the database passwords.',
      'It restarts the user\'s internet browser.'
    ],
    ans: 0
  },
  {
    q: 'What is Pydantic "Type Coercion" (Auto-fixing)?',
    opts: [
      'Pydantic automatically converts similar values (like converting the string "4.5" to a float number 4.5) to fit the schema.',
      'It forces the AI to output responses in uppercase letters.',
      'It deletes invalid JSON text before you run the code.'
    ],
    ans: 0
  },
  {
    q: 'How does an AI SDK (like OpenAI or Gemini) use a Pydantic class to guarantee outputs?',
    opts: [
      'By passing the Pydantic model class directly in the "response_format" field, which builds the JSON schema constraint behind the scenes.',
      'By converting the Pydantic python script to HTML text.',
      'By asking the developer to compile the model manually on their database.'
    ],
    ans: 0
  }
];

export default function AgenticAIDay9({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [sandboxScenario, setSandboxScenario] = useState('review');
  const [simulatedJson, setSimulatedJson] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [pydanticLogs, setPydanticLogs] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextTabId) => {
    setActiveTab(nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = handleContinue;

  const handleSimulateJson = () => {
    setIsParsing(true);
    setSimulatedJson('');
    setParsedData(null);
    setPydanticLogs([]);

    const scenarios = {
      review: {
        raw: `{\n  "book_title": "Atomic Habits",\n  "sentiment": "positive",\n  "rating": 5,\n  "key_takeaway": "Build small 1% systems daily."\n}`,
        parsed: { title: "Atomic Habits", sentiment: "positive", rating: "⭐️⭐️⭐️⭐️⭐️", takeaway: "Build small 1% systems daily." },
        pydantic: [
          '⚡ Pydantic Validator initiated...',
          '🔍 Checking schema constraints of UserReview...',
          '✅ Field "book_title" validated: "Atomic Habits" (Type: string)',
          '✅ Field "sentiment" validated: "positive" (Type: string)',
          '✅ Field "rating" validated: 5 (Type: int)',
          '🎉 Validation successful! Data loaded into Pydantic Model.'
        ]
      },
      profile: {
        raw: `{\n  "name": "Jane Doe",\n  "profession": "UI/UX Designer",\n  "skills": ["Figma", "CSS", "Wireframing"],\n  "experience_years": 4\n}`,
        parsed: { title: "Jane Doe", sentiment: "Designer", rating: "4 Years Exp", takeaway: "Figma, CSS, Wireframing" },
        pydantic: [
          '⚡ Pydantic Validator initiated...',
          '🔍 Checking schema constraints of UserProfile...',
          '✅ Field "name" validated: "Jane Doe" (Type: string)',
          '✅ Field "profession" validated: "UI/UX Designer" (Type: string)',
          '✅ Field "skills" validated: ["Figma", "CSS", "Wireframing"] (Type: list[str])',
          '✅ Field "experience_years" validated: 4 (Type: int)',
          '🎉 Validation successful! Data loaded into Pydantic Model.'
        ]
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
        setPydanticLogs(target.pydantic);
        setIsParsing(false);
      }
    }, 15);
  };

  const score = quizSubmitted
    ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[Number(qi)]?.ans === ans).length
    : 0;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Local Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: isActive ? '#3b82f6' : 'transparent',
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

        {/* ── 1. OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(30,64,175,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#bfdbfe', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 2 • DAY 9
              </div>
              <h1 style={{ fontSize: '2.6rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Structured Outputs & Pydantic
              </h1>
              <p style={{ color: '#bfdbfe', fontSize: '1.2rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Learn how to force AI models to output strict, machine-readable JSON data and validate it using Python's leading validation library: Pydantic.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.8rem 1rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', borderLeft: '4px solid #fef08a' }}>
                🎯 <strong style={{ color: '#fef08a' }}>Day 9 Goal:</strong> Declare data structures in Pydantic, validate AI outputs, and secure key-value formatting checks.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleTabChange('json_theory')} style={{ background: '#3b82f6', borderColor: '#3b82f6', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Explore Structured Outputs <ArrowRight size={18}/>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1rem', marginBottom: '0.6rem' }}>🤖 Conversational Output (Hard to Parse)</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', color: '#e2e8f0', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  "I read the profile. The user is Alice. Her role is Developer. She knows JavaScript."
                </div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.5 }}>
                  ⚠️ Custom code would need complex text parsing rules to find the name and language. If the AI changes its wording slightly, the code breaks.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: '18px' }}>
                <h4 style={{ fontWeight: 800, color: '#059669', fontSize: '1rem', marginBottom: '0.6rem' }}>📊 JSON Output (Easy to Parse)</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  {`{\n  "name": "Alice",\n  "role": "Developer",\n  "language": "JavaScript"\n}`}
                </div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.5 }}>
                  ✅ Software programs can parse this string instantly using `JSON.parse()` to read `data.name` or `data.language` safely.
                </p>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #3b82f6', marginBottom: '2.5rem' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('intro')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Overview
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('pydantic_deepdive')} style={{ background: '#3b82f6', borderColor: '#3b82f6', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Open Pydantic Deep Dive <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. PYDANTIC DEEP DIVE ────────────────────────────────────── */}
        {activeTab === 'pydantic_deepdive' && (
          <motion.div key="pydantic_deepdive" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🛡️ Pydantic Deep Dive (Validation Guardrails)</h2>
            <p style={{ color: '#64748b', fontSize: '1.02rem', marginBottom: '2rem' }}>Learn how Python uses Pydantic classes to catch AI format errors before they break your database:</p>

            {/* Pydantic Superpowers list */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '18px' }}>
                <strong style={{ color: '#3b82f6', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>1. Type Validation & Auto-Fixing</strong>
                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                  If the AI outputs a number as a string (like `"15"` instead of `15`), Pydantic automatically converts it into a clean integer. If it cannot convert (like typing `"five"`), it catches the mistake instantly.
                </span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '18px' }}>
                <strong style={{ color: '#3b82f6', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>2. Mandatory vs Optional Keys</strong>
                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                  You define exactly which keys the AI must output. If a key is missing, Pydantic raises a Validation Error, allowing your code to retry the prompt automatically.
                </span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '18px' }}>
                <strong style={{ color: '#3b82f6', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>3. Field Descriptions</strong>
                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                  By adding `Field(description="...")`, Pydantic generates a clear JSON Schema that is passed directly to the AI, acting as clear inline instructions.
                </span>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '18px' }}>
                <strong style={{ color: '#3b82f6', display: 'block', fontSize: '1.05rem', marginBottom: '0.4rem' }}>4. Custom Validation Rules</strong>
                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                  You can add custom checks (using `@field_validator`) to verify values. For example, you can write a check verifying that an email string contains the `@` symbol, or that a price is not a negative number.
                </span>
              </div>
            </div>

            {/* Nested Models Code Block */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={20} style={{ color: '#3b82f6' }} /> Nested Models (Handling Complex Lists)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                AI responses often contain complex, nested elements (for example, a customer profile that has a list of addresses). Pydantic manages this by letting you embed one Model class inside another:
              </p>

              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
                <span style={{ color: '#60a5fa' }}>from</span> pydantic <span style={{ color: '#60a5fa' }}>import</span> BaseModel, Field<br /><br />
                
                <span style={{ color: '#94a3b8' }}># Define the child model first</span><br />
                <span style={{ color: '#60a5fa' }}>class</span> <span style={{ color: '#34d399' }}>SkillItem</span>(BaseModel):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;skill_name: <span style={{ color: '#fcd34d' }}>str</span> = Field(description=<span style={{ color: '#a7f3d0' }}>"Name of skill"</span>)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;level: <span style={{ color: '#fcd34d' }}>str</span> = Field(description=<span style={{ color: '#a7f3d0' }}>"Beginner, Intermediate, or Expert"</span>)<br /><br />

                <span style={{ color: '#94a3b8' }}># Define the parent model referencing the child list</span><br />
                <span style={{ color: '#60a5fa' }}>class</span> <span style={{ color: '#34d399' }}>DeveloperProfile</span>(BaseModel):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;name: <span style={{ color: '#fcd34d' }}>str</span> = Field(description=<span style={{ color: '#a7f3d0' }}>"Full name"</span>)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;skills: <span style={{ color: '#fcd34d' }}>list[SkillItem]</span> = Field(description=<span style={{ color: '#a7f3d0' }}>"List of skills"</span>)<br /><br />

                <span style={{ color: '#94a3b8' }}># Pydantic validates the entire nested structure</span><br />
                json_data = <span style={{ color: '#a7f3d0' }}>{`'{"name": "Alice", "skills": [{"skill_name": "CSS", "level": "Expert"}]}'`}</span><br />
                dev = DeveloperProfile.model_validate_json(json_data)<br />
                print(dev.skills[0].level) <span style={{ color: '#94a3b8' }}># Output: Expert</span>
              </div>
            </div>

            {/* How AI APIs integrate Pydantic */}
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Shield size={24} style={{ color: '#059669', flexShrink: 0 }} />
              <div style={{ color: '#065f46', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <strong>How AI SDKs Use Pydantic Directly:</strong>
                <br />
                Modern AI clients (like OpenAI or Gemini) allow you to pass Pydantic models directly as a configuration variable: 
                <code style={{ background: '#ffffff', color: '#b91c1c', padding: '0.1rem 0.3rem', borderRadius: '4px', margin: '0 0.2rem', fontSize: '0.8rem', fontFamily: 'monospace' }}>response_format=DeveloperProfile</code>.
                This forces the AI model output layer to constrain its predictions to match your class keys, guaranteeing a 100% correct JSON response every single time.
              </div>
            </div>

            {/* Relation to Swagger/FastAPI explanation */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '2rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} style={{ color: '#3b82f6' }} /> Do I need Swagger or FastAPI to use Pydantic?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                <strong>No!</strong> Pydantic is a completely independent library. You can run Pydantic models in any simple, command-line Python script without using Swagger, FastAPI, or any web framework.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                <strong>How does Swagger relate?</strong> Pydantic models are the foundation of <strong>FastAPI</strong>. When you write a web API in FastAPI and pass a Pydantic model class to validate queries, FastAPI reads your model schemas and automatically generates a beautiful interactive documentation page called the <strong>Swagger UI</strong> (usually accessible at <code style={{ fontFamily: 'monospace' }}>/docs</code>). Pydantic tells Swagger exactly what fields, descriptions, and rules to display.
              </p>

              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
                <span style={{ color: '#94a3b8' }}># Complete FastAPI + Pydantic Swagger Demo</span><br />
                <span style={{ color: '#60a5fa' }}>from</span> fastapi <span style={{ color: '#60a5fa' }}>import</span> FastAPI<br />
                <span style={{ color: '#60a5fa' }}>from</span> pydantic <span style={{ color: '#60a5fa' }}>import</span> BaseModel<br /><br />
                
                app = FastAPI()<br /><br />
                
                <span style={{ color: '#60a5fa' }}>class</span> <span style={{ color: '#34d399' }}>Product</span>(BaseModel):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;name: <span style={{ color: '#fcd34d' }}>str</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;price: <span style={{ color: '#fcd34d' }}>float</span><br /><br />

                <span style={{ color: '#94a3b8' }}># FastAPI maps this model to automatically build the Swagger UI page!</span><br />
                <span style={{ color: '#fcd34d' }}>@app.post</span>(<span style={{ color: '#a7f3d0' }}>"/add-product"</span>)<br />
                <span style={{ color: '#60a5fa' }}>def</span> <span style={{ color: '#34d399' }}>add_item</span>(product: Product):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;return {"{"}<span style={{ color: '#a7f3d0' }}>"status"</span>: <span style={{ color: '#a7f3d0' }}>"success"</span>, <span style={{ color: '#a7f3d0' }}>"data"</span>: product{"}"}<br /><br />
                <span style={{ color: '#94a3b8' }}># Visit http://localhost:8000/docs in your browser to test it interactively!</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('json_theory')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Theory
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('json_sandbox')} style={{ background: '#3b82f6', borderColor: '#3b82f6', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Try Sandbox Simulator <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 4. SANDBOX ───────────────────────────────────────────────── */}
        {activeTab === 'json_sandbox' && (
          <motion.div key="json_sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>💻 JSON & Pydantic Output Simulator</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
              Select a scenario, check the raw JSON output generated by the AI, and see how Pydantic validates and parses fields:
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
                {isParsing ? '⏳ Generating and validating JSON Output...' : '▶ Run Prompt to output JSON'}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                
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

              {/* Pydantic verification logs output */}
              {pydanticLogs.length > 0 && (
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.2rem', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '0.4rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem' }}>
                    🛡️ PYDANTIC SCHEMA VALIDATOR LOGS
                  </strong>
                  {pydanticLogs.map((log, lIdx) => (
                    <div key={lIdx} style={{ color: log.includes('✅') || log.includes('🎉') ? '#34d399' : '#e2e8f0' }}>{log}</div>
                  ))}
                </div>
              )}

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn btn-outline" onClick={() => handleTabChange('pydantic_deepdive')} style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Back to Deep Dive
              </button>
              <button className="btn btn-primary" onClick={() => handleTabChange('assignment')} style={{ background: '#3b82f6', borderColor: '#3b82f6', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                View Assignment <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 5. ASSIGNMENT ────────────────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>📝 Day 9 Assignment</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Write a Pydantic Model and System Prompt class to enforce receipt metadata structures:
            </p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>
                ✏️ Pydantic Data Extraction Schema
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Write the Python code declaring a Pydantic Model class named `ReceiptModel` that defines the rules for these keys:
                <br />
                • `merchant_name` (string)
                <br />
                • `total_amount` (float number)
                <br />
                • `items_purchased` (list of strings)
              </p>

              <textarea
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder={`from pydantic import BaseModel, Field\n\nclass ReceiptModel(BaseModel):\n  merchant_name: str = Field(...)\n  # Write your Pydantic properties rules here...`}
                style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setAssignmentSubmitted(true)}
              disabled={!assignmentText || assignmentText.trim().length < 30 || assignmentSubmitted}
              style={{ background: '#10b981', borderColor: '#10b981', marginBottom: '1.5rem' }}
            >
              {assignmentSubmitted ? '✓ Pydantic Class Schema Submitted!' : 'Submit Pydantic Schema'}
            </button>

            {assignmentSubmitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span>🎉</span>
                <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                  <strong>Structured model saved!</strong> Take the Day 9 assessment quiz below.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} disabled={!assignmentSubmitted} style={{ background: '#3b82f6', borderColor: '#3b82f6', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}>
                Start Assessment Quiz <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 6. QUIZ ───────────────────────────────────────────────────── */}
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
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>You've successfully completed the structured outputs and Pydantic validation syllabus.</p>
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
