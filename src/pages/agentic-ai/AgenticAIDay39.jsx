import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Play, Settings, Code, Clipboard, Terminal, FileJson, Brain, BookOpen, HelpCircle } from 'lucide-react';

const pageVariants = { 
  hidden: { opacity: 0, y: 15 }, 
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }, 
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } } 
};
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = [
  { id: 'intro', label: 'Overview', icon: <BookOpen size={15}/> },
  { id: 'architecture', label: 'Architecture', icon: <Brain size={15}/> },
  { id: 'practical', label: 'Practical Guide', icon: <Terminal size={15}/> },
  { id: 'sandbox', label: 'Sandbox', icon: <Play size={15}/> },
  { id: 'cheatsheet', label: 'Cheat Sheet', icon: <FileJson size={15}/> },
  { id: 'assignment', label: 'Assignment', icon: <Code size={15}/> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15}/> },
];

const STEPS = [
  { num: '01', title: 'Initialize Model Wrapper', icon: '📦', tag: 'Setup',
    body: 'Set up your shared LLM model interface. Multi-agent teams can share the same model reference or target different models per specialist.',
    code: { 
      Terminal: 'pip install agno openai\n# Ensure environment keys are configured.', 
      JSON: '{\n  "shared_model": "gpt-4o"\n}', 
      Python: 'from agno.agent import Agent\nfrom agno.models.openai import OpenAIChat\n\nmodel = OpenAIChat(id="gpt-4o")',
      JavaScript: '// Initialize shared model configuration in JS node graphs:\nconst model = new ChatOpenAI({ modelName: "gpt-4o" });'
    } 
  },
  { num: '02', title: 'Declare Specialist Agents', icon: '👤', tag: 'Specialists',
    body: 'Create the specialist agents. Assign unique names, specific instruction templates, and tools (e.g. Search tools for the researcher).',
    code: { 
      Terminal: '# Define specialist roles and tools', 
      JSON: '{\n  "specialists": ["web_researcher", "finance_analyst"]\n}', 
      Python: 'from agno.tools.duckduckgo import DuckDuckGo\n\nresearcher = Agent(\n    name="Web Researcher",\n    role="Search the web for target information",\n    model=model,\n    tools=[DuckDuckGo()],\n    instructions=["Always list your sources"]\n)\n\nwriter = Agent(\n    name="Writer Specialist",\n    role="Summarize research notes in engaging summaries",\n    model=model,\n    instructions=["Use professional headings", "Keep summaries under 300 words"]\n)',
      JavaScript: '// Define distinct nodes with specific prompt personalities in JS:\nconst researcherNode = async (state) => { /* search logic */ };'
    } 
  },
  { num: '03', title: 'Create Team Leader Container', icon: '👑', tag: 'Collaboration',
    body: 'Instantiate the leader Agent. Pass the list of specialists inside the team parameter, and provide coordinating instructions.',
    code: { 
      Terminal: '# Leader agent delegates queries to specialists', 
      JSON: '{\n  "leader": {\n    "name": "Team Lead",\n    "team": ["Web Researcher", "Writer Specialist"]\n  }\n}', 
      Python: 'leader_agent = Agent(\n    name="Research Lead",\n    model=model,\n    team=[researcher, writer],\n    instructions=["Delegate search queries to the Web Researcher", "Have the Writer Specialist format the final report"],\n    markdown=True\n)',
      JavaScript: '// In JS graphs, link nodes using routers or supervisor models:\nconst supervisor = async (state) => { return "Web Researcher"; };'
    } 
  },
  { num: '04', title: 'Kickoff Collaboration', icon: '🚀', tag: 'Execution',
    body: 'Run the leader agent print_response(). The leader coordinates the specialists, passes data back and forth, and aggregates findings.',
    code: { 
      Terminal: 'python run_team.py', 
      JSON: '{\n  "query": "Analyze AI industry CAGR and summarize it.",\n  "status": "active"\n}', 
      Python: '# Run multi-agent pipeline\nleader_agent.print_response("Research the CAGR of AI agents in 2026 and compile a summary report.")',
      JavaScript: '// Trigger supervisor graph execution in JS:\nconst result = await app.invoke({ input: "Research CAGR..." });'
    } 
  }
];

const QUIZ_QUESTIONS = [
  { q: 'How do you define a collaborative team of agents in Agno?', opts: ['By linking agents using sequential execution queues.', 'By passing a list of specialist agents to the team parameter of a leader Agent.', 'By deploying them to separate Docker containers.'], ans: 1 },
  { q: 'Can individual specialist agents in a team use different LLM models?', opts: ['No, all agents in a team must share the same LLM.', 'Yes, each agent can have its own independent model configuration.', 'Only if they use the same OpenAI API key.'], ans: 1 },
  { q: 'What is the role of the Leader Agent in a team?', opts: ['It stores the database embeddings.', 'It coordinates and delegates query segments to specialists, then compiles the final aggregated response.', 'It compiles Python code to assembly.'], ans: 1 }
];

export default function AgenticAIDay39({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeStep, setActiveStep] = useState(0);
  const [codeTab, setCodeTab] = useState('Python');
  const [copied, setCopied] = useState(false);

  // Sandbox states
  const [teamTopic, setTeamTopic] = useState("Quantum Computing Advancements");
  const [criticAgentActive, setCriticAgentActive] = useState(true);
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
    setSimLogs([`[Agno Team] Activating Research Lead Coordinator...`]);
    setSimOutput('');

    setTimeout(() => {
      setSimLogs(prev => [...prev, `🔀 Delegating to specialist: 'Web Researcher' (Task: Find facts on ${teamTopic})`]);

      setTimeout(() => {
        setSimLogs(prev => [...prev, `🔍 [Web Researcher] active: Triggered DuckDuckGo search for: '${teamTopic}'`]);

        setTimeout(() => {
          setSimLogs(prev => [...prev, `🟢 [Web Researcher] completed. Found: 'Superconducting chip counts doubled in 2026; error correction rates improved by 10x.'`]);

          setTimeout(() => {
            setSimLogs(prev => [...prev, `🔀 Delegating to specialist: 'Writer Specialist' (Task: Summarize notes)`]);

            setTimeout(() => {
              setSimLogs(prev => [...prev, `✍️ [Writer Specialist] active: Writing executive report draft...`]);

              if (criticAgentActive) {
                setTimeout(() => {
                  setSimLogs(prev => [...prev, `🔀 Delegating to specialist: 'Validator Critic' (Task: Review draft accuracy)`]);

                  setTimeout(() => {
                    setSimLogs(prev => [...prev, `🛡️ [Validator Critic] active: checking metrics... Verified: '10x error correction rates verified against source.'`]);

                    setTimeout(() => {
                      setSimLogs(prev => [...prev, `🟢 Research Lead: Merging final outputs...`]);

                      setTimeout(() => {
                        setSimLogs(prev => [...prev, `🟢 Team execution complete.`]);
                        setSimOutput(
                          `### Collaborative Report: ${teamTopic}\n\n1. **Hardware Progress:** Superconducting quantum processor quantum-dot metrics have successfully doubled over the past year.\n2. **Reliability:** Error correction capabilities have increased by **10x**.\n\n*Draft compiled by Writer Specialist and verified by Validator Critic.*`
                        );
                        setIsRunning(false);
                      }, 1200);
                    }, 1000);
                  }, 1200);
                }, 1000);
              } else {
                setTimeout(() => {
                  setSimLogs(prev => [...prev, `🟢 Research Lead: Merging final outputs...`]);

                  setTimeout(() => {
                    setSimLogs(prev => [...prev, `🟢 Team execution complete.`]);
                    setSimOutput(
                      `### Collaborative Report: ${teamTopic}\n\nSuperconducting chip counts have doubled. Error correction rates improved by 10x. \n\n*Draft compiled by Writer Specialist (Critic verification bypassed).*`
                    );
                    setIsRunning(false);
                  }, 1200);
                }, 1000);
              }

            }, 1200);

          }, 1000);

        }, 1200);

      }, 1000);

    }, 800);
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
                <Sparkles size={14} color="#fef08a" /> MODULE 8 • DAY 39
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Day 39: Agno Teams & Agent Collaboration</h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Learn how to orchestrate multi-agent collaboration with Agno Teams. Build a supervisory coordinator agent, delegate sub-queries to specialists, and merge output summaries.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Slick Collaboration Systems</h3>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Solving complex problems requires dividing them into smaller, focused tasks. In Agno, you achieve this using **Teams**. You declare standard specialist agents and then create a coordinator agent that delegates tasks to them.
                </p>
                <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75 }}>
                  The coordinator handles user inputs, determines which specialist to trigger, passes context data arrays, validates outputs, and formats the aggregated findings. This abstracts manual routing edges.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>
                  👥 Collaborative Personas
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  <strong>Web Searcher:</strong> Extracts live figures using search toolkits.
                  <strong>Technical Writer:</strong> Summarizes research notes in markdown.
                  <strong>Validator Critic:</strong> Cross-checks drafted facts against retrieved documents.
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Explore Team Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Supervisor Routing Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How a leader agent delegates tasks to team specialists:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ border: '2px solid #7c3aed', background: 'rgba(124,58,237,0.05)', padding: '1.2rem', borderRadius: 12, color: 'white', width: '80%' }}>
                  👑 <strong>Leader Agent (Research Lead)</strong>
                </div>

                <div style={{ display: 'flex', gap: '40px', color: '#94a3b8' }}>
                  <div>↙</div>
                  <div>↘</div>
                </div>

                <div style={{ display: 'flex', gap: '15px', width: '90%', justifyContent: 'center' }}>
                  <div style={{ border: '1px solid #0284c7', background: 'rgba(2,132,199,0.05)', padding: '1rem', borderRadius: 10, color: 'white', flex: 1 }}>
                    🔍 <strong>Web Searcher Specialist</strong>
                  </div>
                  <div style={{ border: '1px solid #10b981', background: 'rgba(16,185,129,0.05)', padding: '1rem', borderRadius: 10, color: 'white', flex: 1 }}>
                    ✍️ <strong>Writer Specialist</strong>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: 10 }}>
                  The leader receives user queries, calls the Web Searcher, forwards matches to the Writer, and prints the result.
                </p>
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('intro')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('practical')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Practical Guide <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* PRACTICAL GUIDE */}
        {activeTab === 'practical' && (
          <motion.div key="practical" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', marginBottom: '.4rem' }}>🛠️ Code Guide: Building Collaborative Teams</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Configure shared parameters, initialize specialists, declare leader agent, and run workflows:</p>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'stretch', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button onClick={() => setActiveStep(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', background: activeStep === i ? '#0284c7' : 'white', border: activeStep === i ? '1px solid #0284c7' : '1px solid #e2e8f0', color: activeStep === i ? 'white' : '#1e293b', padding: '0.9rem 1rem', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: activeStep === i ? 'rgba(255,255,255,.2)' : '#f1f5f9', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
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

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 400 }}>
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
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('sandbox')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Sandbox <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* SANDBOX */}
        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Team Playground</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Research Topic:</label>
                    <input type="text" value={teamTopic} onChange={e => setTeamTopic(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" id="critic-check" checked={criticAgentActive} onChange={e => setCriticAgentActive(e.target.checked)} disabled={isRunning} />
                    <label htmlFor="critic-check" style={{ fontSize: '.82rem', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>Include Validator Critic Specialist Agent</label>
                  </div>
                  <button onClick={runSimulation} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Running Team Collaboration...' : 'Trigger Team Collaboration'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Collaboration Logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('Delegating') ? '#fbbf24' : log.includes('active') ? '#60a5fa' : log.includes('completed') || log.includes('Verified') ? '#34d399' : '#e2e8f0' }} key={idx}>
                      {log}
                    </div>
                  ))}
                </div>
                {simOutput && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: '1.2rem', color: '#cbd5e1', fontSize: '.9rem', lineHeight: 1.6, overflowY: 'auto', maxHeight: '180px' }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{simOutput}</div>
                  </div>
                )}
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('practical')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('cheatsheet')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Cheat Sheet <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* CHEATSHEET */}
        {activeTab === 'cheatsheet' && (
          <motion.div key="cheatsheet" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Teams Quick Reference</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Declaring Agent Teams:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    Agent(name="Leader", team=[specialist1, specialist2])
                  </code>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>Leader Instructions constraints:</strong>
                  <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.88rem', fontFamily: 'monospace' }}>
                    instructions=["Delegate query to Web Searcher...", "Summarize output using Writer..."]
                  </code>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('sandbox')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Assignment <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <motion.div key="assignment" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📝 Assignment: Coding a Product Dev Agent Team</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Create a Python script that sets up an Agent Team consisting of a Product Manager Specialist and a Software Quality Engineer Specialist.</p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>Requirements:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Create a `pm_agent` that writes product specifications for feature requests.</li>
                  <li>Create a `qa_agent` that writes unit testing scenarios for product specifications.</li>
                  <li>Create a `team_lead_agent` coordinating both PM and QA agents.</li>
                  <li>Trigger code validation using print_response() for: "Create a payments checkout feature".</li>
                </ol>
              </div>

              <textarea value={assignmentText} onChange={e => setAssignmentText(e.target.value)} disabled={assignmentSubmitted} placeholder="Paste your collaborative agent team script here..." style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}/>
              
              <button onClick={() => setAssignmentSubmitted(true)} disabled={assignmentSubmitted || !assignmentText.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem' }}>
                {assignmentSubmitted ? 'Submitted!' : 'Submit Code'}
              </button>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('cheatsheet')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Take Quiz <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {/* QUIZ */}
        {activeTab === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>🧠 Day 39 Conceptual Quiz</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {QUIZ_QUESTIONS.map((q, qi) => {
                  return (
                    <div key={qi} style={{ borderBottom: qi < QUIZ_QUESTIONS.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', margin: '0 0 1rem 0' }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                        {q.opts.map((opt, oi) => {
                          const isSelected = quizAnswers[qi] === oi;
                          const showCorrect = quizSubmitted && q.ans === oi;
                          const showWrong = quizSubmitted && isSelected && q.ans !== oi;
                          let bg = 'white';
                          let border = '1px solid #cbd5e1';
                          if (isSelected) { bg = '#f0f9ff'; border = '1px solid #3b82f6'; }
                          if (showCorrect) { bg = '#ecfdf5'; border = '2px solid #10b981'; }
                          if (showWrong) { bg = '#fef2f2'; border = '2px solid #ef4444'; }
                          return (
                            <button key={oi} disabled={quizSubmitted} onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1.2rem', borderRadius: 10, background: bg, border: border, cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '0.92rem', transition: 'all 0.1s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{opt}</span>
                              {showCorrect && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                              {showWrong && <span style={{ color: '#ef4444', fontWeight: 800 }}>✗</span>}
                            </button>
                          );
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
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'day40')} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 700 }}>Next Day (Day 40) →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
