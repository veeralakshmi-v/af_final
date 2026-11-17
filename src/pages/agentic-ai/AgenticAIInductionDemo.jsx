import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Bot, GitBranch, Zap, Cpu, Map, Briefcase, 
  CheckCircle, ArrowRight, Brain, Database, Code, 
  Layers, ShieldCheck, Terminal, Sparkles, Globe,
  HelpCircle, Smile, Check, Star, Trophy, RefreshCw, Sliders
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    key={id}
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}
  >
    <div className="section-header" style={{ marginBottom: '2.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem' }}>
      <span className="eyebrow" style={{ color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const ROADMAP_MODULES = [
  {
    num: "Module 1",
    days: "Days 1 – 5",
    title: "Agentic AI Foundation",
    tech: "Agent Architecture, ReAct Loop, Reasoning Chains",
    desc: "Understand what distinguishes agents from LLMs. Build reasoning loops and basic agent workflows."
  },
  {
    num: "Module 2",
    days: "Days 6 – 10",
    title: "Prompting & Tool Calling",
    tech: "Function Calling, Live REST APIs, JSON Schemas",
    desc: "Give agents hands and eyes. Connect agents to external tools and real-time APIs with strict output guarantees."
  },
  {
    num: "Module 3",
    days: "Days 11 – 15",
    title: "AI Automation with n8n",
    tech: "n8n Workflows, Webhooks, Google Sheets, Email Automation",
    desc: "Visual workflow automation with AI logic nodes. Build enterprise automated student and customer onboarding systems."
  },
  {
    num: "Module 4",
    days: "Days 16 – 20",
    title: "Flowise & Visual AI Agents",
    tech: "Flowise, Vector Stores, Document QA, Embeddable Chat",
    desc: "Build drag-and-drop conversational agents with RAG memory, tool routing, and web widget deployment."
  },
  {
    num: "Module 5",
    days: "Days 21 – 25",
    title: "LangChain & Agent Development",
    tech: "LangChain, LCEL, Custom Tools, Memory Stores",
    desc: "Production code-first agent development. Build autonomous orchestrators that parse multi-step requests."
  },
  {
    num: "Module 6",
    days: "Days 26 – 30",
    title: "LangGraph & Stateful Agents",
    tech: "LangGraph, StateGraph, Conditional Routing, Human-in-the-Loop",
    desc: "Create stateful cyclic graphs with persistent checkpointing, time-travel debugging, and supervisor patterns."
  },
  {
    num: "Module 7",
    days: "Days 31 – 35",
    title: "CrewAI Multi-Agent Systems",
    tech: "CrewAI, Hierarchical Crews, Delegated Tasks, Shared Memory",
    desc: "Orchestrate collaborative teams of specialized agents (Researcher, Writer, Reviewer, QA) that solve complex projects."
  },
  {
    num: "Module 8",
    days: "Days 36 – 40",
    title: "Agno AI & Production Systems",
    tech: "Agno (formerly Phidata), Fast Agents, Vector DBs, Cloud Deploy",
    desc: "High-performance multimodal agents with blazing fast execution, knowledge bases, and production Docker deployment."
  }
];

const STACK_TOOLS = [
  { name: "n8n", cat: "Workflow Automation", desc: "Open-source node automation platform with native AI agent nodes." },
  { name: "Flowise", cat: "Visual Agent Builder", desc: "No-code UI for LangChain and LlamaIndex agents & RAG pipelines." },
  { name: "LangChain", cat: "Framework", desc: "Industry standard Python framework for chaining models and tools." },
  { name: "LangGraph", cat: "Stateful Graphs", desc: "Cyclic graph orchestration for resilient, multi-step autonomous workflows." },
  { name: "CrewAI", cat: "Multi-Agent Teams", desc: "Role-based collaborative agent teams with hierarchical leadership." },
  { name: "Agno AI", cat: "High-Speed Agents", desc: "Lightweight, ultra-fast Python framework with memory and toolkits." },
  { name: "Pinecone / Chroma", cat: "Vector DBs", desc: "Semantic retrieval and long-term memory vaults for AI agents." },
  { name: "OpenAI & Anthropic APIs", cat: "Model Brains", desc: "GPT-4o, Claude 3.5 Sonnet, and tool-calling model backbones." }
];

export default function AgenticAIInductionDemo({ activeTab, onNavigate, openAITutor }) {

  const handleContinue = (nextTabId) => {
    onNavigate('agentic_ai_demo', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="demo-page" style={{ paddingBottom: '5rem' }}>
      <AnimatePresence mode="wait">

        {/* 1. WELCOME TAB */}
        {activeTab === 'intro' && (
          <Section key="intro" id="intro" eyebrow="Induction • Welcome" title="Welcome to Agentic AI Development">
            <div className="panel">
              <motion.div variants={itemVariants} style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(124,58,237,0.18)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.16)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#f3e8ff', marginBottom: '1.5rem' }}>
                    <Sparkles size={16} color="#c084fc" /> The Next Frontier in Artificial Intelligence
                  </div>
                  <h3 style={{ fontSize: '2.4rem', margin: '0 0 1rem 0', color: 'white', lineHeight: 1.3, fontWeight: 800 }}>
                    From Chatbots to Autonomous Digital Workers
                  </h3>
                  <p style={{ fontSize: '1.15rem', color: '#e9d5ff', maxWidth: '800px', margin: '0 0 1.5rem 0', lineHeight: 1.7 }}>
                    Generative AI creates text and images when you prompt it. <strong>Agentic AI goes ten steps further:</strong> it plans its own tasks, calls live software tools, reads databases, fixes errors on the fly, and works autonomously like a full-time digital employee.
                  </p>
                  <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.12)', borderLeft: '4px solid #c084fc', padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                    🚀 "The future of software is not writing code by hand; it is orchestrating autonomous AI agents that solve business problems."
                  </div>
                </div>
              </motion.div>

              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1.2rem', fontWeight: 800 }}>Key Pillars of this 40-Day Masterclass:</h3>
              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #7c3aed' }}>
                  <div style={{ background: '#ede9fe', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Bot size={24} color="#7c3aed" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Autonomous Execution</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Learn how agents break down open-ended goals into steps, loop through decisions, and achieve tasks end-to-end without human intervention.</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #0284c7' }}>
                  <div style={{ background: '#e0f2fe', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Zap size={24} color="#0284c7" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Tool & API Mastery</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Equip agents with function calling, REST APIs, database connectors, and web browsing capabilities to take live real-world actions.</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #10b981' }}>
                  <div style={{ background: '#dcfce7', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Layers size={24} color="#10b981" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Multi-Agent Collaboration</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Deploy teams of agents with CrewAI and LangGraph that collaborate, debate, peer-review, and solve enterprise-scale software tasks.</p>
                </motion.div>
              </motion.div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("What is the difference between an LLM chatbot and an AI Agent?")}>Ask AI Tutor: Agents vs Chatbots</button>
              <button className="btn btn-primary" onClick={() => handleContinue('what_is_it')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>What are AI Agents? <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 2. WHAT IS AN AI AGENT */}
        {activeTab === 'what_is_it' && (
          <Section key="what_is_it" id="what_is_it" eyebrow="Induction • Core Concept" title="What are AI Agents?">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                An <strong>AI Agent</strong> is a software system where an AI model (the brain) is paired with memory, planning frameworks, and tools to act autonomously towards an assigned goal.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Brain size={26} color="#7c3aed" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: 800 }}>1. The Perception & Brain</h4>
                  <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                    Powered by high-reasoning LLMs (Claude 3.5 Sonnet, GPT-4o). It evaluates human goals, breaks down problems, decides what step comes next, and reviews previous execution results.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <RefreshCw size={26} color="#7c3aed" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: 800 }}>2. Planning & The ReAct Loop</h4>
                  <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                    <strong>Reasoning + Acting:</strong> The agent thinks, selects an action tool, observes output, and loops until the target is accomplished. If an API returns an error, it self-corrects without crashing.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Database size={26} color="#7c3aed" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: 800 }}>3. Short & Long-Term Memory</h4>
                  <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                    Maintains conversational context during active sessions (short-term) and queries Vector DBs (Pinecone, Chroma) to retrieve past files, guidelines, and user preferences (long-term).
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <div style={{ background: '#ede9fe', padding: '0.6rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
                    <Terminal size={26} color="#7c3aed" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: 800 }}>4. Tools & Actions</h4>
                  <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                    The hands and feet of the agent. Allows execution of Python code, calling web search, reading PDFs, sending Slack/Email notifications, and modifying SQL database records.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("Explain the ReAct framework for AI agents with a concrete example.")}>Ask AI Tutor: ReAct Loop</button>
              <button className="btn btn-primary" onClick={() => handleContinue('vs')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Agentic vs Automation <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 3. AGENTIC VS AUTOMATION */}
        {activeTab === 'vs' && (
          <Section key="vs" id="vs" eyebrow="Induction • Comparison" title="Agentic AI vs Automation vs Generative AI">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Many people confuse traditional workflow automation with modern AI agents. Here is the critical distinction:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Box 1: Traditional Automation */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#e2e8f0', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex' }}>
                  <Code size={24} color="#475569" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>1. Traditional Automation (RPA / Zapier)</h4>
                <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li><strong>Rigid IF/THEN rules:</strong> If email received, copy attachment to Google Drive.</li>
                    <li><strong>Zero Reasoning:</strong> If an attachment format changes slightly, the script crashes.</li>
                    <li><strong>No Adaptability:</strong> Cannot summarize text or handle ambiguous instructions.</li>
                  </ul>
                </div>
              </div>

              {/* Box 2: Generative AI (Chat) */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#e0f2fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex' }}>
                  <Sparkles size={24} color="#0284c7" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#0369a1', margin: 0, fontWeight: 800 }}>2. Generative AI (ChatGPT / RAG)</h4>
                <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li><strong>Text In → Text Out:</strong> Creates drafts, summaries, and images on command.</li>
                    <li><strong>Passive:</strong> Waits for human input at every single step.</li>
                    <li><strong>No System Action:</strong> Cannot execute actions or run code on remote servers.</li>
                  </ul>
                </div>
              </div>

              {/* Box 3: Agentic AI */}
              <div style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '2px solid #a855f7', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 25px rgba(124,58,237,0.08)' }}>
                <div style={{ background: '#ede9fe', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex' }}>
                  <Bot size={24} color="#7c3aed" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#6b21a8', margin: 0, fontWeight: 800 }}>3. Agentic AI (Smart Worker)</h4>
                <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li><strong>Autonomous Autopilot:</strong> Takes high-level goals and figures out the sequence of steps.</li>
                    <li><strong>Live Tool Access:</strong> Calls APIs, searches the web, and modifies databases.</li>
                    <li><strong>Self-Healing:</strong> Detects errors, adjusts parameters, and re-runs until goal is met.</li>
                  </ul>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("How does an agent recover when an external API fails?")}>Ask AI Tutor: Self-Healing</button>
              <button className="btn btn-primary" onClick={() => handleContinue('why_important')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Why AI Agents? <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 4. WHY AI AGENTS */}
        {activeTab === 'why_important' && (
          <Section key="why_important" id="why_important" eyebrow="Induction • Impact" title="Why is Agentic AI So Important?">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
                Every Fortune 500 company and modern tech startup is currently building or adopting AI Agent frameworks. Here is why the demand is skyrocketing:
              </p>

              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Trophy size={32} color="#7c3aed" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>Massive Cost & Time Savings (10x Speedup)</h4>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Instead of a human employee spending 4 hours researching, drafting emails, and updating CRM records, an agentic system executes the entire flow in under 45 seconds with 100% data consistency.
                  </p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Briefcase size={32} color="#0284c7" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>Explosive Job Market & Salary Premiums</h4>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Agentic AI engineers command starting global salaries of <strong>$120,000 – $220,000</strong> (₹15 – 35 LPA in India). Roles like AI Automation Architect, Multi-Agent Specialist, and LangGraph Developer are the most sought-after profiles of 2026.
                  </p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Globe size={32} color="#10b981" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>True Enterprise Scalability</h4>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                    AI agents scale without fatigue. A multi-agent system can handle 10,000 customer inquiries, audit thousands of financial transactions, or generate personalized reports simultaneously 24 hours a day.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("What enterprise industries are hiring Agentic AI engineers most actively?")}>Ask AI Tutor: Industry Roles</button>
              <button className="btn btn-primary" onClick={() => handleContinue('topics')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Technologies & Tools <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 5. TECHNOLOGIES & TOOLS */}
        {activeTab === 'topics' && (
          <Section key="topics" id="topics" eyebrow="Induction • Curriculum" title="Enterprise Technologies & Tools Covered">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              This course is 100% practical. You will master the industry-leading open-source and enterprise frameworks used to build production AI agents:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {STACK_TOOLS.map((tool, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <Cpu size={18} color="#7c3aed" />
                    <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{tool.name}</strong>
                  </div>
                  <span style={{ background: '#f5f3ff', color: '#7c3aed', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>
                    {tool.cat}
                  </span>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor && openAITutor("What is the difference between CrewAI and LangGraph?")}>Ask AI Tutor: CrewAI vs LangGraph</button>
              <button className="btn btn-primary" onClick={() => handleContinue('syllabus')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>40-Day Roadmap <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 6. 40-DAY ROADMAP SYLLABUS */}
        {activeTab === 'syllabus' && (
          <Section key="syllabus" id="syllabus" eyebrow="Induction • Curriculum" title="Complete 40-Day Curriculum Roadmap">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              The curriculum is divided into 8 intensive 5-day modules. Each module culminates in a live capstone project:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {ROADMAP_MODULES.map((mod, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.6rem', boxShadow: '0 4px 6px rgba(0,0,0,0.01)', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ borderRight: '2px solid #f1f5f9', paddingRight: '1rem' }}>
                    <span style={{ background: '#f5f3ff', color: '#7c3aed', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 800, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.4rem' }}>
                      {mod.num}
                    </span>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{mod.days}</strong>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: '#0f172a', margin: '0 0 0.3rem 0', fontWeight: 800 }}>{mod.title}</h4>
                    <span style={{ fontSize: '0.82rem', color: '#7c3aed', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>🛠️ Stack: {mod.tech}</span>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
              <Trophy size={36} color="#7c3aed" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#4c1d95', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Ready to Build Production AI Agents?</h3>
              <p style={{ color: '#6b21a8', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Join the AlphaFly Agentic AI Career Accelerator. Build 8 production portfolio projects and graduate with verified enterprise credentials.
              </p>
              <button
                className="btn btn-primary"
                style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.85rem 2.4rem', fontSize: '1.05rem', fontWeight: 700 }}
                onClick={() => alert("Welcome! Please contact admissions or enroll to activate your full 40-Day Agentic AI track.")}
              >
                Enroll in Agentic AI Accelerator 🚀
              </button>
            </div>
          </Section>
        )}

      </AnimatePresence>
    </div>
  );
}
