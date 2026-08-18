import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Play, CheckCircle, ArrowRight, Layers, Cpu, Code, Clipboard, Award } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SUB_TABS = [
  { id: 'overview', label: '📋 Project Spec' },
  { id: 'architecture', label: '🏗️ Architecture' },
  { id: 'guide', label: '🛠️ Implementation Guide' },
  { id: 'simulator', label: '💻 Sandbox Simulator' },
  { id: 'submission', label: '🚀 Final Submission' }
];

export default function AgenticAIModule7Project({ onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStep, setSimStep] = useState(0);

  // Input states
  const [companyName, setCompanyName] = useState('Google LLC');
  const [expectedSection, setExpectedSection] = useState('AI Cloud Revenue');

  // Submission states
  const [repoUrl, setRepoUrl] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyBoilerplate = () => {
    const code = `from crewai import Agent, Task, Crew, Process\nfrom crewai_tools import SerperDevTool\nfrom langchain_openai import ChatOpenAI\n\n# 1. Initialize Tools\nsearch_tool = SerperDevTool()\n\n# 2. Declare Specialist Agents\nresearcher = Agent(\n    role="Senior Market Analyst",\n    goal="Extract current financial statistics",\n    backstory="You search websites and extract market figures.",\n    tools=[search_tool],\n    verbose=True\n)\n\nwriter = Agent(\n    role="Investment Copywriter",\n    goal="Write executive stock summaries",\n    backstory="You synthesize statistics into investor recommendations.",\n    verbose=True\n)\n\n# 3. Wire Tasks with Context Handover\nresearch_task = Task(\n    description="Analyze AI revenues and stock performance for target company.",\n    expected_outcome="Markdown bullet summary containing numbers.",\n    agent=researcher\n)\n\nwrite_task = Task(\n    description="Draft a stock analysis summary report.",\n    expected_outcome="A 300-word investor brief.",\n    context=[research_task],  # Context Handover\n    agent=writer\n)\n\n# 4. Assemble with Caching Memory\ncrew = Crew(\n    agents=[researcher, writer],\n    tasks=[research_task, write_task],\n    process=Process.sequential,\n    memory=True  # SQLite database memory\n)\n\n# 5. Execute\nresult = crew.kickoff()\nprint(result)`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulator = () => {
    setIsRunning(true);
    setSimLogs([]);
    setSimStep(0);
    const logs = [
      `📡 Initiating financial research crew (Target: ${companyName})`,
      "💾 Loading SQLite local checkpointer entity cache...",
      "🔍 Researcher Agent: Querying SerperDevTools for: " + expectedSection + "...",
      "🤖 Researcher Agent: Parsed sources. Found: 'AI revenues grew 26% year-over-year'",
      "💾 Saved stats to Local SQLite memory cache.",
      "🔀 Context Handover: Transferring stats to Investment Copywriter...",
      "✍️ Copywriter Agent: Reading stats. Referencing entity memory cache...",
      `✍️ Copywriter Agent: Compiled 300-word stock brief for ${companyName}.`,
      "🟢 Crew execution complete. Output markdown verified."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, log]);
        setSimStep(index + 1);
        if (index === logs.length - 1) {
          setIsRunning(false);
        }
      }, delay);
      delay += 800;
    });
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.3rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '0.4rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {SUB_TABS.map(tab => (
          <button key={tab.id} onClick={() => changeTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? '#0284c7' : '#64748b', border: 'none', padding: '0.55rem 1rem', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', transition: 'all .15s', boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div key="overview" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: 28, padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,.08), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.2rem' }}>
                  <Trophy size={14} color="#fef08a" /> MODULE 7 FINAL PROJECT
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0' }}>CrewAI Financial Research Agency</h1>
                <p style={{ color: '#e0f2fe', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                  Build a collaborative financial analyst crew. Write research and writing agent roles, configure search tool modules, configure SQLite database cache saving, and kickoff sequential research workflows.
                </p>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Project Goal</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Your objective is to construct a Crew that scrapes market updates and drafts investor briefs.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  You will code a Python application utilizing CrewAI. Establish distinct roles (Market Analyst and Investment Copywriter), bind search tools, implement context task output passing, enable memory database variables, and execute testing configurations.
                </p>
              </div>
              <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 20, padding: '1.8rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369a1', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Requirements:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#475569' }}>
                  {['✅ Create Analyst & Copywriter Agents', '✅ Assign Serper search tools to Analyst', '✅ Configure write_task using context=[research_task]', '✅ Enable memory=True on Crew wrapper', '✅ Output final reports as markdown briefs'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => onNavigate('agentic_ai_module7', 'day35')}>← Back to Day 35</button>
              <button className="btn btn-primary" onClick={() => changeTab('architecture')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                View Architecture <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div key="architecture" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🏗️ Financial Research Crew Flow</h2>
              <p style={{ color: '#64748b', marginBottom: '1.8rem', fontSize: '1rem' }}>How context handovers occur during sequential multi-agent execution:</p>
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: 16, border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', background: '#1e293b', padding: '1rem 2rem', borderRadius: 12 }}>
                  <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>START</div>
                  <div>➔</div>
                  <div style={{ background: '#0284c7', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>research_task (Analyst + Web Search)</div>
                  <div>➔</div>
                  <div style={{ background: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem' }}>write_task (Copywriter Analyst)</div>
                </div>

                <div style={{ background: '#fbbf24', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', color: '#0f172a' }}>
                  💾 sqlite local database memory (caching search results)
                </div>

                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>▼</div>

                <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', color: 'white' }}>END</div>

              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('overview')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('guide')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Guide <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <motion.div key="guide" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, overflow: 'hidden', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.8rem 2.2rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', margin: 0 }}>🐍 Python CrewAI Blueprint</h3>
                  <p style={{ color: '#64748b', fontSize: '.85rem', margin: '4px 0 0' }}>Complete multi-agent structure to compile and build your application:</p>
                </div>
                <button onClick={copyBoilerplate} style={{ background: copied ? '#059669' : '#0284c7', color: 'white', border: 'none', padding: '.55rem 1.2rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.84rem' }}>
                  {copied ? 'Copied Blueprint!' : 'Copy Blueprint'}
                </button>
              </div>
              <div style={{ padding: '1.8rem 2.2rem', maxHeight: 450, overflowY: 'auto' }}>
                <pre style={{ margin: 0, fontSize: '.85rem', color: '#60a5fa', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
{`from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool
from langchain_openai import ChatOpenAI

# 1. Initialize Tools
search_tool = SerperDevTool()

# 2. Declare Specialist Agents
researcher = Agent(
    role="Senior Market Analyst",
    goal="Extract current financial statistics",
    backstory="You search websites and extract market figures.",
    tools=[search_tool],
    verbose=True
)

writer = Agent(
    role="Investment Copywriter",
    goal="Write executive stock summaries",
    backstory="You synthesize statistics into investor recommendations.",
    verbose=True
)

# 3. Wire Tasks with Context Handover
research_task = Task(
    description="Analyze AI revenues and stock performance for target company.",
    expected_outcome="Markdown bullet summary containing numbers.",
    agent=researcher
)

write_task = Task(
    description="Draft a stock analysis summary report.",
    expected_outcome="A 300-word investor brief.",
    context=[research_task],  # Context Handover
    agent=writer
)

# 4. Assemble with Caching Memory
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential,
    memory=True  # SQLite database memory
)

# 5. Execute
result = crew.kickoff()
print(result)`}
                </pre>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('architecture')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('simulator')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>View Simulator <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div key="simulator" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>⚙️ Simulator Config</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Company Target:</label>
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '.82rem', color: '#64748b', marginBottom: 6, fontWeight: 700 }}>Analysis Target Section:</label>
                    <input type="text" value={expectedSection} onChange={e => setExpectedSection(e.target.value)} disabled={isRunning} style={{ width: '100%', padding: '.65rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.88rem' }} />
                  </div>
                  <button onClick={runSimulator} disabled={isRunning} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.75rem', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {isRunning ? 'Kickoff Executing...' : 'Kickoff Crew Simulator'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
                <span style={{ display: 'block', fontSize: '.65rem', color: '#94a3b8', fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '.3rem', marginBottom: '.5rem' }}>🖥️ Crew execution logs:</span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '.82rem', color: '#cbd5e1' }}>
                  {simLogs.map((log, idx) => (
                    <div style={{ color: log.includes('Source') || log.includes('grew') ? '#34d399' : log.includes('SQLite') ? '#fbbf24' : '#e2e8f0' }} key={idx}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('guide')}>← Back</button>
              <button className="btn btn-primary" onClick={() => changeTab('submission')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>Go to Submission <ArrowRight size={18}/></button>
            </motion.div>
          </motion.div>
        )}

        {/* SUBMISSION */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={pageVariants} initial="hidden" animate="show" exit="exit">
            <motion.div variants={cardVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '2.5rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>🚀 Submit CrewAI Project</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', color: '#475569', marginBottom: 6, fontWeight: 700 }}>GitHub Repository URL:</label>
                  <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} disabled={submitted} placeholder="https://github.com/username/crewai-financial-crew" style={{ width: '100%', padding: '.7rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.9rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', color: '#475569', marginBottom: 6, fontWeight: 700 }}>Code content (Copy-paste your crew script):</label>
                  <textarea value={codeContent} onChange={e => setCodeContent(e.target.value)} disabled={submitted} placeholder="from crewai import Agent, Task, Crew..." style={{ width: '100%', height: 180, padding: '.7rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '.9rem', resize: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                </div>
                {!submitted ? (
                  <button onClick={() => setSubmitted(true)} disabled={!repoUrl.trim() || !codeContent.trim()} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '.85rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Submit Project For Grading</button>
                ) : (
                  <div style={{ background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', border: '1px solid #a7f3d0', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                    <h4 style={{ color: '#065f46', fontSize: '1.2rem', margin: '0 0 0.3rem 0' }}>🎉 Project Submitted Successfully!</h4>
                    <span style={{ color: '#047857' }}>Your financial research agency crew is being graded. Keep up the great work!</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-outline" onClick={() => changeTab('simulator')}>← Back</button>
              <button className="btn btn-primary" onClick={() => onNavigate('agentic_ai_module8', 'day36')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Start Module 8 (Day 36) <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
