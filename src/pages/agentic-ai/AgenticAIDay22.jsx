import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';

const pageVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'templates', label: 'LCEL & Templates', icon: <Brain size={15}/> },
  { id: 'practical', label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Sandbox', icon: <Play size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Import Prompt Classes', icon: '📦', tag: 'Imports',
    body: 'Import prompt class utilities like ChatPromptTemplate, SystemMessagePromptTemplate, and UserMessagePromptTemplate.',
    code: { 
      Terminal: '# Python editor or Node environment setup', 
      JSON: '{\n  "imports": ["ChatPromptTemplate", "FewShotPromptTemplate"]\n}', 
      Python: 'from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate',
      JavaScript: 'import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";'
    } 
  },
  { num: '02', title: 'Define Few-Shot Templates', icon: '📝', tag: 'Few-Shot Prompts',
    body: 'Provide custom reasoning examples to teach the LLM patterns directly using FewShotPromptTemplate structures.',
    code: { 
      Terminal: '# Useful for classification or translation models', 
      JSON: '{\n  "examples": [\n    { "input": "Happy", "output": "Positive" }\n  ]\n}', 
      Python: 'from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate\n\n# Configure training inputs\nexamples = [\n    {"input": "The code crashes immediately.", "output": "Severity: HIGH"},\n    {"input": "The text color is slightly wrong.", "output": "Severity: LOW"}\n]\n\nexample_prompt = PromptTemplate(\n    input_variables=["input", "output"],\n    template="Input: {input}\\nOutput: {output}"\n)',
      JavaScript: 'import { PromptTemplate } from "@langchain/core/prompts";\n\n// Configure training inputs\nconst examples = [\n  { input: "The code crashes immediately.", output: "Severity: HIGH" },\n  { input: "The text color is slightly wrong.", output: "Severity: LOW" }\n];\n\nconst examplePrompt = new PromptTemplate({\n  inputVariables: ["input", "output"],\n  template: "Input: {input}\\nOutput: {output}"\n});'
    } 
  },
  { num: '03', title: 'Build LCEL Pipes', icon: '🔗', tag: 'LCEL Operators',
    body: 'Utilize the overloaded OR pipe operator (or .pipe() helper) to route execution states directly through chains without calling invoke manually each step.',
    code: { 
      Terminal: '# LangChain Expression Language (LCEL)', 
      JSON: '{\n  "chain": "prompt | model | parser"\n}', 
      Python: 'from langchain_openai import ChatOpenAI\nfrom langchain_core.output_parsers import JsonOutputParser\n\n# The chain parses response to JSON automatically\nchain = example_prompt | ChatOpenAI() | JsonOutputParser()',
      JavaScript: 'import { ChatOpenAI } from "@langchain/openai";\nimport { JsonOutputParser } from "@langchain/core/output_parsers";\n\n// Compile components using .pipe()\nconst chain = examplePrompt.pipe(new ChatOpenAI()).pipe(new JsonOutputParser());'
    } 
  },
  { num: '04', title: 'Stream Results', icon: '📡', tag: 'Streaming Output',
    body: 'Instead of waiting for the full response to generate, use chain.stream() to print response tokens to the user interface in real-time.',
    code: { 
      Terminal: 'python stream_chain.py\n# Or Node.js:\nnode stream_chain.js', 
      JSON: '{\n  "mode": "streaming"\n}', 
      Python: '# Stream chunk tokens sequentially\nfor chunk in chain.stream({"input": "The user database index returns 404 connection errors"}):\n    print(chunk, end="", flush=True)',
      JavaScript: '// Stream response chunks sequentially in Node.js\nconst stream = await chain.stream({\n  input: "The user database index returns 404 connection errors"\n});\nfor await (const chunk of stream) {\n  process.stdout.write(JSON.stringify(chunk));\n}'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'What does LCEL stand for?', opts: ['LangChain Execution Library.', 'LangChain Expression Language.', 'Language Model Chain Engine.'], ans: 1 },
  { q: 'What is a Few-Shot Prompt Template?', opts: ['A template with multiple parameters.', 'A prompt template that embeds actual few-shot examples inside the final prompt to teach the model patterns.', 'A prompt that executes in under a millisecond.'], ans: 1 },
  { q: 'How do you stream response tokens in LangChain?', opts: ['By calling invoke() repeatedly.', 'By utilizing the stream() method in your pipeline chain.', 'By changing the database index.'], ans: 1 },
  { q: 'What is a SystemMessagePromptTemplate?', opts: ['A template for sending alerts to Slack.', 'A class to define the structural role and background constraints for the Chat model.', 'A database table mapping user queries.'], ans: 1 }
];

export default function AgenticAIDay22({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [reviewText, setReviewText] = useState("The product arrived 2 days late and was scratched.");
  const [outputFormat, setOutputFormat] = useState("JSON");
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simOutput, setSimOutput] = useState('');

  // Assignment / Quiz States
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const changeTab = (tabId) => { setActiveTab(tabId); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([qi, ans]) => QUIZ_QUESTIONS[+qi]?.ans === ans).length : 0;

  const runSimulation = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimOutput('');
    const logs = [
      "🧩 Formatting prompt with dynamic review text...",
      "🧠 Calling LLM Client (gpt-4o-mini)...",
      "📄 Parsing output using " + outputFormat + " parser...",
      "🟢 Done!"
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            const formatted = outputFormat === "JSON"
              ? '{\n  "sentiment": "Negative",\n  "reasons": ["Late delivery", "Damaged product"],\n  "severity": "High"\n}'
              : 'Sentiment: Negative\nReasons: Late delivery, Scratched item\nSeverity: High';
            setSimOutput(formatted);
            setIsRunning(false);
          }, 400);
        }
      }, delay);
      delay += 800;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => changeTab(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === t.id ? 'white' : 'transparent', color: activeTab === t.id ? '#0284c7' : '#64748b', border: 'none', padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', transition: 'all .15s', boxShadow: activeTab === t.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === 'intro' && (
          <motion.div key="intro" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.06), transparent 60%)' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 5 • DAY 22
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>LCEL & Advanced Prompt Templates</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Master LangChain Expression Language (LCEL) and custom prompting structures. Learn how to write Few-Shot Prompt Templates to inject model examples and stream response text output interactively.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Expression Language Power</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  LCEL makes it incredibly easy to connect prompts, LLMs, and parsers. It supports custom configuration overlays, automated parallel execution mapping, retries, and fallback models dynamically out-of-the-box.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Additionally, it handles both synchronous requests, asynchronous calls, and streaming output formats automatically depending on how you invoke the execution.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>🧠 Few-Shot Prompting vs. Zero-Shot</h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  While <strong>Zero-Shot</strong> prompting expects the LLM to complete a task with no examples, <strong>Few-Shot Prompting</strong> embeds concrete input-output examples directly inside the prompt context. This is highly effective for complex classifications, parsing structured text patterns, or controlling tone, without the expensive overhead of model fine-tuning.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>📄 Core LangChain Output Parsers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.86rem', color: '#475569' }}>
                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                    <strong style={{ color: '#0284c7' }}>StrOutputParser</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Extracts and returns only the text content string, skipping metadata.</p>
                  </div>
                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                    <strong style={{ color: '#0284c7' }}>JsonOutputParser</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Ensures output adheres to a JSON object, parsed automatically as a dictionary.</p>
                  </div>
                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                    <strong style={{ color: '#0284c7' }}>PydanticOutputParser</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Enforces type-safe schema validation against runtime classes.</p>
                  </div>
                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                    <strong style={{ color: '#0284c7' }}>CommaSeparatedListOutputParser</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Splits comma-separated lists directly into code arrays.</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} /> Templates & Pipes:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                    {[['👥 Few-Shot', 'Provide clear output examples inside prompt classes.'], ['📡 streaming', 'Stream token chunks dynamically as they generate.'], ['🔗 LCEL chaining', 'Prompt | Model | Parser standard structure.'], ['⚙️ Fallbacks', 'Define fallback chains if the primary LLM client fails.']].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{k}:</span><span>{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('templates')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore LCEL & Templates <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* TEMPLATES & LCEL */}
        {activeTab === 'templates' && (
          <motion.div key="templates" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ LCEL Pipeline Chain Setup</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How LangChain maps inputs to outputs inside a custom code template:</p>
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', color: '#a7f3d0', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
                <span style={{ color: '#60a5fa' }}>from</span> langchain_core.prompts <span style={{ color: '#60a5fa' }}>import</span> ChatPromptTemplate<br />
                <span style={{ color: '#60a5fa' }}>from</span> langchain_openai <span style={{ color: '#60a5fa' }}>import</span> ChatOpenAI<br />
                <span style={{ color: '#60a5fa' }}>from</span> langchain_core.output_parsers <span style={{ color: '#60a5fa' }}>import</span> StrOutputParser<br /><br />
                
                prompt = ChatPromptTemplate.from_template(<span style={{ color: '#a7f3d0' }}>"Analyze: {"{"}input{"}"}"</span>)<br />
                model = ChatOpenAI(model=<span style={{ color: '#a7f3d0' }}>"gpt-4o-mini"</span>)<br />
                parser = StrOutputParser()<br /><br />
                
                <span style={{ color: '#94a3b8' }}># LCEL piping chain construction</span><br />
                chain = prompt | model | parser<br /><br />
                
                response = chain.invoke({"{"}<span style={{ color: '#a7f3d0' }}>"input"</span>: <span style={{ color: '#a7f3d0' }}>"Scratched item"</span>{"}"})
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Practical implementation <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* PRACTICAL GUIDE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Step-by-Step LCEL Implementation</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Learn how to code advanced prompt templates and stream prediction values:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'stretch', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button onClick={() => setActiveStep(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', background: activeStep === i ? '#0284c7' : 'white', border: activeStep === i ? '1px solid #0284c7' : '1px solid #e2e8f0', color: activeStep === i ? 'white' : '#1e293b', padding: '0.9rem 1rem', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifycontent: 'center', width: 36, height: 36, borderRadius: 10, background: activeStep === i ? 'rgba(255,255,255,.2)' : '#f1f5f9', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '.75rem', opacity: .65, marginBottom: 1 }}>Step {s.num}</div>
                        <div style={{ fontWeight: 700, fontSize: '.88rem', lineHeight: 1.3 }}>{s.title}</div>
                      </div>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 2, height: 10, background: i < activeStep ? '#0284c7' : '#e2e8f0', margin: '0 0 0 26px', transition: 'background .3s' }}/>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 450 }}>
                <div style={{ padding: '1.4rem 1.8rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{STEPS[activeStep].icon}</span>
                  <div>
                    <div style={{ fontSize: '.7rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>{STEPS[activeStep].tag}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>{STEPS[activeStep].title}</div>
                  </div>
                </div>
                <div style={{ padding: '1.2rem 1.8rem', borderBottom: '1px solid #1e293b' }}>
                  <p style={{ color: '#94a3b8', fontSize: '.92rem', lineHeight: 1.7, margin: 0 }}>{STEPS[activeStep].body}</p>
                </div>
                <div style={{ display: 'flex', gap: '.3rem', padding: '.75rem 1.8rem .4rem', borderBottom: '1px solid #1e293b' }}>
                  {['JSON','Python','JavaScript'].map(t => (
                    <button key={t} onClick={() => setCodeTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: codeTab === t ? '#0284c7' : 'transparent', color: codeTab === t ? 'white' : '#64748b', border: codeTab === t ? 'none' : '1px solid #334155', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '.78rem' }}>
                      {t}
                    </button>
                  ))}
                  <div style={{ flex: 1 }}/>
                  <button onClick={() => copy(STEPS[activeStep].code[codeTab])} style={{ display: 'flex', alignItems: 'center', gap: 5, background: copied ? '#059669' : '#1e293b', color: 'white', border: 'none', padding: '.35rem .8rem', borderRadius: 8, cursor: 'pointer', fontSize: '.75rem', fontWeight: 700 }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div style={{ flex: 1, padding: '1.2rem 1.8rem', overflowY: 'auto' }}>
                  <pre style={{ margin: 0, fontSize: '.82rem', fontFamily: 'monospace', lineHeight: 1.8, color: codeTab === 'JSON' ? '#fbbf24' : '#60a5fa', whiteSpace: 'pre-wrap' }}>{STEPS[activeStep].code[codeTab]}</pre>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('templates')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Try Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>💻 LCEL Parser Simulator</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Input review details and watch how the parser maps output formats dynamically:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🔧 Input Configuration</h3>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Review Content:</label>
                  <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} disabled={isRunning} style={{ width: '100%', height: 75, padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Target Parser Format:</label>
                  <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '.84rem' }}>
                    <option value="JSON">JSON Schema Parser</option>
                    <option value="Text">Plain String Parser</option>
                  </select>
                </div>
                <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 'auto' }}>
                  {isRunning ? 'Extracting...' : 'Execute LCEL Chain'}
                </button>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: 520 }}>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 12, border: '1px solid #334155', maxHeight: 110, overflowY: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #334155', paddingBottom: '.3rem', marginBottom: '.5rem' }}>💻 Pipe Chain Execution Logs</span>
                  {simLogs.length === 0 ? <span style={{ fontSize: '.75rem', color: '#64748b', fontStyle: 'italic', fontFamily: 'monospace' }}>Ready to run chain...</span> : simLogs.map((l, i) => <div key={i} style={{ fontSize: '.75rem', fontFamily: 'monospace', color: '#34d399', marginBottom: 3 }}>{l}</div>)}
                </div>
                
                {simOutput && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: '1rem' }}>
                      <span style={{ fontSize: '.65rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.4rem' }}>1️⃣ Formatted Prompt Injected to Model</span>
                      <pre style={{ margin: 0, fontSize: '.75rem', color: '#94a3b8', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`System: You are an AI analyzing feedback. Respond in ${outputFormat === 'JSON' ? 'JSON format: {"sentiment", "reasons", "severity"}' : 'Plain Text format: "Sentiment: ... Reasons: ... Severity: ..."'}

Examples:
Input: The code crashes immediately.
Output: ${outputFormat === 'JSON' ? '{"sentiment": "Negative", "reasons": ["code crashes"], "severity": "High"}' : 'Sentiment: Negative\\nReasons: code crashes\\nSeverity: High'}

Input: ${reviewText}
Output:`}
                      </pre>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: '1rem' }}>
                      <span style={{ fontSize: '.65rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.4rem' }}>2️⃣ Raw Model Output (Tokens)</span>
                      <pre style={{ margin: 0, fontSize: '.75rem', color: '#fcd34d', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{simOutput}</pre>
                    </div>

                    <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, padding: '1rem' }}>
                      <span style={{ fontSize: '.65rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>3️⃣ Parsed Structured Output</span>
                      {outputFormat === 'JSON' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
                          <div style={{ display: 'flex', gap: '6px' }}><span style={{ color: '#94a3b8' }}>Sentiment:</span><span style={{ color: '#ef4444', fontWeight: 700 }}>Negative 🔴</span></div>
                          <div style={{ display: 'flex', gap: '6px' }}><span style={{ color: '#94a3b8' }}>Severity:</span><span style={{ color: '#f59e0b', fontWeight: 700 }}>High ⚠️</span></div>
                          <div>
                            <span style={{ color: '#94a3b8', display: 'block', marginBottom: 2 }}>Extracted Reasons:</span>
                            <ul style={{ margin: 0, paddingLeft: 16, color: '#e2e8f0' }}>
                              <li>Late delivery</li>
                              <li>Damaged/scratched product</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem', color: '#e2e8f0' }}>
                          <div><strong>Line 1:</strong> Sentiment: Negative</div>
                          <div><strong>Line 2:</strong> Reasons: Late delivery, Scratched item</div>
                          <div><strong>Line 3:</strong> Severity: High</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📝 Day 22 Assignment: Sentiment Classification Chain</h2>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>Write a Python script that sets up a FewShotPromptTemplate with 2 examples mapping text inputs to sentiment labels (Positive, Neutral, Negative). Pipe it to a ChatOpenAI client and JsonOutputParser.</p>
              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} placeholder="from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate&#10;from langchain_core.output_parsers import JsonOutputParser&#10;...&#10;examples = [...]&#10;..." style={{ width: '100%', height: 180, padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}/>
              <button onClick={() => setAssignmentSubmitted(true)} disabled={!assignmentText.trim() || assignmentSubmitted} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem 1.5rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                {assignmentSubmitted ? '✅ Submitted!' : 'Submit Code'}
              </button>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Take Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>✍️ Day 22 Quiz Assessment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {QUIZ_QUESTIONS.map((q, qi) => {
                  const sel = quizAnswers[qi];
                  return (
                    <div key={qi} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '.97rem', color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>Q{qi+1}: {q.q}</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        {q.opts.map((opt, oi) => {
                          let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                          if (quizSubmitted) { if (oi === q.ans) { bg = '#ecfdf5'; border = '1px solid #10b981'; color = '#166534'; } else if (sel === oi) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; } }
                          else if (sel === oi) { bg = '#e0f2fe'; border = '1px solid #0284c7'; color = '#0284c7'; }
                          return <div key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))} style={{ background: bg, border, color, padding: '.8rem 1.1rem', borderRadius: 10, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '.92rem', transition: 'all .15s' }}>{opt}</div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!quizSubmitted ? (
                <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '2rem' }}>Submit Answers</button>
              ) : (
                <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '1px solid #bae6fd', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.3rem', color: '#0369a1', display: 'block', marginBottom: '.3rem' }}>Score: {quizScore} / {QUIZ_QUESTIONS.length}</strong>
                  <span style={{ color: '#0284c7' }}>{quizScore === QUIZ_QUESTIONS.length ? '⭐ Perfect score!' : 'Review the highlighted correct answers.'}</span>
                </div>
              )}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('assignment')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Return to Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
