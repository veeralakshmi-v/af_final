import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Bot, GitBranch, Zap, Cpu, Map, Briefcase, 
  CheckCircle, ArrowRight, Brain, Database, Code, 
  Layers, ShieldCheck, Terminal, Sparkles, Server, Globe,
  Lightbulb, HelpCircle, Smile, Check, Star, Trophy, List, Eye, DollarSign, TrendingUp, Copy, Lock
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
      <span className="eyebrow" style={{ color: '#0ea5e9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const COVERED_DOMAINS = [
  {
    title: "1. Advanced Prompt Engineering",
    desc: "Master structural instructions, role-prompting, few-shot conditioning, chain-of-thought, and prompt chaining to achieve precise LLM outputs.",
    skills: ["System Prompt Design", "JSON Structured Output Parsing", "Avoiding Hallucinations"]
  },
  {
    title: "2. Office & Business Productivity",
    desc: "Automate repetitive daily tasks. Speed up writing professional reports, summarizing PDF research documentation, and analyzing data using AI Excel sheets.",
    skills: ["Automated Document Drafting", "Smart Spreadsheet formulas", "Instant Meeting Summaries"]
  },
  {
    title: "3. Content & Media Synthesis",
    desc: "Generate production-grade graphics, marketing copy, voiceovers, video reels, and branding guides using visual Generative AI engines.",
    skills: ["High-Res Image Prompts", "Video script to clip synthesis", "Adobe Firefly & Canva AI"]
  },
  {
    title: "4. AI Coding & Custom App Development",
    desc: "Use AI code completion tools to write scripts, debug databases, style frontends, and implement full Retrieval-Augmented Generation (RAG) PDF search tools.",
    skills: ["Cursor AI & GitHub Copilot", "HTML/CSS/JS Autocomplete", "RAG & LLM API connections"]
  }
];

const TOOLS = [
  { name: "ChatGPT (GPT-4o)", cat: "Language & Logic" },
  { name: "Claude 3.5 Sonnet", cat: "Coding & Reasoning" },
  { name: "Gemini 1.5 Pro", cat: "Multimodal Analysis" },
  { name: "DeepSeek-V3", cat: "Smart Reasoning" },
  { name: "Microsoft Copilot", cat: "Office Productivity" },
  { name: "Notion AI", cat: "Doc Automation" },
  { name: "Midjourney v6", cat: "Visual Generation" },
  { name: "Flux.1", cat: "Visual Generation" },
  { name: "Stable Diffusion", cat: "Custom Models" },
  { name: "Runway Gen-3", cat: "Video Generation" },
  { name: "Pika Labs", cat: "Video Generation" },
  { name: "Kling AI", cat: "Video Generation" },
  { name: "Canva Magic Studio", cat: "Marketing Design" },
  { name: "Adobe Firefly", cat: "Vector & Editing" },
  { name: "Figma AI", cat: "UI wireframing" },
  { name: "Cursor IDE", cat: "AI Code Editing" },
  { name: "GitHub Copilot", cat: "In-line Completion" },
  { name: "ElevenLabs", cat: "Voice & Audio" },
  { name: "Suno AI", cat: "Music Synthesis" }
];

const JOBS = [
  { role: "Prompt Architect / Engineer", demand: "High", salary: "$110,000 - $180,000", localSalary: "₹12 - 25 LPA", desc: "Design, refine, and optimize prompts for enterprise customer service, writing, and search systems." },
  { role: "AI Workflow Specialist", demand: "Critical", salary: "$120,000 - $190,000", localSalary: "₹15 - 28 LPA", desc: "Integrate generative tools (ChatGPT, Notion AI, custom APIs) into daily corporate operations to boost productivity." },
  { role: "Generative Content Specialist", demand: "Very High", salary: "$85,000 - $130,000", localSalary: "₹8 - 15 LPA", desc: "Produce SEO-driven blogs, social media marketing campaigns, voiceovers, and promotional videos at scale." },
  { role: "AI Systems Developer", demand: "Explosive", salary: "$140,000 - $210,000", localSalary: "₹18 - 35 LPA", desc: "Connect LLM API endpoints (OpenAI, Gemini), customize retrieval frameworks (RAG), and build custom AI-powered apps." }
];

export default function GenerativeAIDemo({ activeTab, onNavigate, openAITutor }) {

  const handleContinue = (nextTabId) => {
    onNavigate('generative_ai_demo', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="demo-page" style={{ paddingBottom: '5rem' }}>
      <AnimatePresence mode="wait">

        {/* 1. WELCOME TAB */}
        {activeTab === 'intro' && (
          <Section key="intro" id="intro" eyebrow="Induction • Welcome" title="Welcome to Generative AI">
            <div className="panel">
              <motion.div variants={itemVariants} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(2,132,199,0.15)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1.5rem' }}>
                    <Sparkles size={16} color="#38bdf8" /> AlphaFly AI Career Accelerator
                  </div>
                  <h3 style={{ fontSize: '2.3rem', margin: '0 0 1rem 0', color: 'white', lineHeight: 1.3, fontWeight: 800 }}>
                    The Biggest Job Disruption Since the Internet
                  </h3>
                  <p style={{ fontSize: '1.15rem', color: '#e0f2fe', maxWidth: '780px', margin: '0 0 1.5rem 0', lineHeight: 1.7 }}>
                    Generative AI isn't just a fun chat tool—it is the new operating system for professional work. Today, professionals who know how to collaborate with AI are executing tasks <strong>10x faster</strong>, outpacing competitors, and commanding top salary premiums.
                  </p>
                  <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.12)', borderLeft: '4px solid #38bdf8', padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                    📢 "AI will not replace you. But a person using AI will."
                  </div>
                </div>
              </motion.div>

              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1.2rem', fontWeight: 800 }}>Why this course is essential for you:</h3>
              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #0284c7' }}>
                  <div style={{ background: '#e0f2fe', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Zap size={24} color="#0284c7" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Maximize Productivity</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Learn how to draft emails, analyze reports, and format massive Excel data blocks in seconds instead of hours.</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #10b981' }}>
                  <div style={{ background: '#dcfce7', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Brain size={24} color="#10b981" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Prompt Mastery</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Go beyond basic chat. Master structured outputs, few-shot prompting, and chain-of-thought engineering for production success.</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #f59e0b' }}>
                  <div style={{ background: '#fef9c3', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <TrendingUp size={24} color="#f59e0b" />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>Future-Proof Careers</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>Prepare for new, high-paying career tracks like AI Business Consultant, Prompt Architect, or Automation Specialist.</p>
                </motion.div>
              </motion.div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("What job profiles can I apply for after learning Generative AI?")}>Ask AI Tutor: Job Roles</button>
              <button className="btn btn-primary" onClick={() => handleContinue('what_is_it')}>What is Gen AI? <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 2. WHAT IS GEN AI */}
        {activeTab === 'what_is_it' && (
          <Section key="what_is_it" id="what_is_it" eyebrow="Induction • Foundations" title="What is Generative AI?">
            <div className="panel" style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ background: '#e0f2fe', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Brain size={32} color="#0284c7" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.6rem', fontWeight: 800 }}>Definition of Generative AI</h3>
                  <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                    <strong>Generative AI (Gen AI)</strong> is a category of artificial intelligence systems capable of generating new content—including text, high-res images, programming code, custom audio, and video—in response to simple text prompts. Unlike traditional AI that only analyzes existing records, Gen AI actually <em>creates something completely original</em>.
                  </p>
                </div>
              </div>

              <div style={{ borderLeft: '4px solid #10b981', background: '#f0fdf4', padding: '1.2rem 1.5rem', borderRadius: '8px', color: '#166534', fontSize: '0.98rem', lineHeight: 1.6 }}>
                💡 <strong>Analogy:</strong> Think of it as a super-powered digital creator sitting at your desk. You describe what you want in simple English, and it outputs the draft, script, formula, or layout in less than 5 seconds.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between traditional ML models and Generative AI?")}>Ask AI Tutor: ML vs Gen AI</button>
              <button className="btn btn-primary" onClick={() => handleContinue('vs')}>Gen AI vs Agentic AI <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 3. GEN AI VS AGENTIC AI */}
        {activeTab === 'vs' && (
          <Section key="vs" id="vs" eyebrow="Induction • Comparison" title="Generative AI vs. Agentic AI">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              It is important to understand how standard models (Generative AI) compare to autonomous smart workers (Agentic AI):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              {/* Gen AI Card */}
              <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd', borderRadius: '20px', padding: '2rem', boxShadow: '0 10px 25px rgba(14,165,233,0.04)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <div style={{ background: '#0284c7', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>
                    Generative AI (Content Creator)
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#0369a1', fontWeight: 800, margin: 0 }}>A Super-Smart Creative Assistant</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {[
                    { t: "What it does", d: "Creates texts, images, emails, and code instantly from your prompts.", icon: <Sparkles size={16} /> },
                    { t: "How it works", d: "Needs your prompt for every single step. It waits for you to tell it what to do next.", icon: <Eye size={16} /> },
                    { t: "Action scope", d: "Only talks, writes, or draws inside its chat window. It cannot perform external actions.", icon: <Terminal size={16} /> },
                    { t: "Memory", d: "Forgets what you talked about as soon as you close or start a new chat.", icon: <Lock size={16} /> },
                    { t: "Best Analogy", d: "A fast digital ghostwriter or graphic designer at your desk.", icon: <Smile size={16} /> }
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#0369a1', display: 'block', marginBottom: '0.15rem' }}>{item.t}</strong>
                        <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>{item.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agentic AI Card */}
              <div style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '1px solid #e9d5ff', borderRadius: '20px', padding: '2rem', boxShadow: '0 10px 25px rgba(124,58,237,0.04)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <div style={{ background: '#7c3aed', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>
                    Agentic AI (Smart Worker)
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#6b21a8', fontWeight: 800, margin: 0 }}>An Independent Digital Worker</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {[
                    { t: "What it does", d: "Runs on autopilot to achieve a big goal you set (like booking flights or sorting resumes).", icon: <Cpu size={16} /> },
                    { t: "How it works", d: "Plans its own steps, loops through tasks, and fixes its own mistakes without asking you.", icon: <Brain size={16} /> },
                    { t: "Action scope", d: "Can browse the internet, access databases, read computer files, and call other apps.", icon: <Globe size={16} /> },
                    { t: "Memory", d: "Remembers past conversations and work by saving them to persistent memory vaults.", icon: <Database size={16} /> },
                    { t: "Best Analogy", d: "A virtual employee who works for you and handles tasks end-to-end.", icon: <Bot size={16} /> }
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#6b21a8', display: 'block', marginBottom: '0.15rem' }}>{item.t}</strong>
                        <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>{item.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("How does Agentic AI call external tools?")}>Ask AI Tutor: Agentic Tools</button>
              <button className="btn btn-primary" onClick={() => handleContinue('why_important')}>Why is it Important? <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 4. WHY IS IT IMPORTANT */}
        {activeTab === 'why_important' && (
          <Section key="why_important" id="why_important" eyebrow="Induction • Impact" title="Why is Generative AI Important?">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
                Generative AI democratizes specialized skills. Instead of learning complex design suites, video rendering tools, or programming languages for years, anyone can now output professional quality products instantly.
              </p>
              
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Trophy size={32} color="#0284c7" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>Democratized Skillsets</h4>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>By explaining concepts to AI, you bypass traditional syntax blockades, allowing you to build, test, and write features without years of technical overhead.</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Zap size={32} color="#10b981" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>Enterprise Speed Up (10x Productivity)</h4>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>In corporate offices, tasks that used to take days now take less than 10 seconds. Staff who implement AI workflows outpace team targets consistently.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("What corporate industries are shifting fastest towards Generative AI?")}>Ask AI Tutor: Industry Shifts</button>
              <button className="btn btn-primary" onClick={() => handleContinue('topics')}>What We Cover <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 5. WHAT WE COVER */}
        {activeTab === 'topics' && (
          <Section key="topics" id="topics" eyebrow="Induction • Curriculum" title="What We Cover in this Course">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              We've structured the training into 4 core focus areas, starting with basic rules and moving all the way to building working applications:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {COVERED_DOMAINS.map((domain, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.8rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.6rem', fontWeight: 800 }}>{domain.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>{domain.desc}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {domain.skills.map((skill, si) => (
                      <span key={si} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 600 }}>
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("What is RAG (Retrieval-Augmented Generation) in plain English?")}>Ask AI Tutor: Explain RAG</button>
              <button className="btn btn-primary" onClick={() => handleContinue('tools')}>Covered AI Tools <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 6. COVERED TOOLS */}
        {activeTab === 'tools' && (
          <Section key="tools" id="tools" eyebrow="Induction • Stack" title="🛠️ 19 Industry-Standard AI Tools Covered">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              We do not just talk about theory. You will gain hands-on access and build portfolio projects with the top tools used in the global marketplace:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {TOOLS.map((tool, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                    <Bot size={16} color="#0284c7" />
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{tool.name}</strong>
                  </div>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.72rem', alignSelf: 'flex-start', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {tool.cat}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => openAITutor("Which image generators like Midjourney are best for business marketing graphics?")}>Ask AI Tutor: Visual Tools</button>
              <button className="btn btn-primary" onClick={() => handleContinue('careers')}>Jobs & Salaries <ArrowRight size={16}/></button>
            </div>
          </Section>
        )}

        {/* 7. JOBS AND SALARIES */}
        {activeTab === 'careers' && (
          <Section key="careers" id="careers" eyebrow="Induction • Careers" title="💼 Jobs, Salaries & Career Scope">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              The job market is shifting rapidly. Companies are looking for AI-native workers who can optimize operations, write code, and build RAG tools.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {JOBS.map((job, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.01)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', color: '#0f172a', margin: '0 0 0.3rem 0', fontWeight: 800 }}>{job.role}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>{job.desc}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>Global Salaries</span>
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>{job.salary}</strong>
                  </div>
                  <div style={{ textAlign: 'center', background: '#f0fdf4', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#166534', display: 'block', fontWeight: 700, marginBottom: '0.2rem' }}>Indian Package</span>
                    <strong style={{ fontSize: '1.1rem', color: '#15803d', fontWeight: 800 }}>{job.localSalary}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '14px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <Trophy size={28} color="#d97706" />
              <div>
                <strong style={{ fontSize: '0.98rem', color: '#92400e', display: 'block' }}>🔥 Demand Multiplier Indicator</strong>
                <span style={{ fontSize: '0.88rem', color: '#78350f', lineHeight: 1.5 }}>
                  Over <strong>82% of managers</strong> prefer hiring candidates with confirmed AI credentials over candidates without AI exposure. Promoted staff who introduce AI integrations report an average 35% speedup in leadership reviews.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary" 
                style={{ background: '#10b981', borderColor: '#10b981', padding: '0.8rem 2.2rem', fontSize: '1rem', fontWeight: 700 }}
                onClick={() => alert("Registration successful! Welcome to the Generative AI Career Bootcamp.")}
              >
                Enroll in Generative AI Program 🎉
              </button>
            </div>
          </Section>
        )}

      </AnimatePresence>
    </div>
  );
}
