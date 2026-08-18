import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, CheckCircle, XCircle, Sliders, Cpu, Filter, Zap, Bot, Database } from 'lucide-react';

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="learning-card">
    <div style={{ marginBottom:'1.5rem' }}>
      <span style={{ color:'var(--accent-secondary)', fontWeight:600, fontSize:'0.9rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize:'2rem', marginTop:'0.5rem', color:'#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, children }) => (
  <div style={{ borderRadius:'12px', overflow:'hidden', marginBottom:'1.6rem', border:'1px solid #334155' }}>
    {title && <div style={{ background:'#1e293b', padding:'0.55rem 1.2rem', display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #334155' }}>
      <Code size={14} color="#38bdf8"/>
      <span style={{ color:'#94a3b8', fontSize:'0.8rem', fontWeight:600 }}>{title}</span>
    </div>}
    <div style={{ background:'#0f172a', color:'#f8fafc', padding:'1.3rem', fontFamily:'monospace', fontSize:'0.91rem', lineHeight:1.9, overflowX:'auto' }}>{children}</div>
  </div>
);

const kw = t => <span style={{ color:'#f472b6' }}>{t}</span>;
const fn = t => <span style={{ color:'#38bdf8' }}>{t}</span>;
const nm = t => <span style={{ color:'#fbbf24' }}>{t}</span>;
const st = t => <span style={{ color:'#a5b4fc' }}>{t}</span>;
const cm = t => <span style={{ color:'#6b7280', fontStyle:'italic' }}>{t}</span>;

export default function PythonFinalProjects({ activeTab, onNavigate, openAITutor }) {
  const nav = tab => onNavigate('python_final_projects', tab);

  // Playgrounds States
  const [p1Code, setP1Code] = useState(`class AIChatbot:
    def __init__(self, bot_name):
        self.bot_name = bot_name
        self.knowledge = {
            "hello": "Hello! I am your AI assistant. How can I help you today?",
            "python": "Python is a high-level language, perfect for AI and Web apps!",
            "oop": "OOP stands for Object-Oriented Programming, using classes and objects."
        }

    def get_response(self, user_msg):
        msg = user_msg.lower().strip()
        if msg in self.knowledge:
            return self.knowledge[msg]
        return "I am still learning! Ask me about: hello, python, oop"

# Instantiate and test
bot = AIChatbot("Nexus")
print("Response 1:", bot.get_response("hello"))
print("Response 2:", bot.get_response("python"))`);

  const [p2Code, setP2Code] = useState(`class DatabaseManager:
    def __init__(self):
        self.db = {}

    def insert(self, key, value):
        self.db[key] = value
        return f"Inserted {key} -> {value}"

    def select(self, key):
        if key in self.db:
            return f"Found: {key} = {self.db[key]}"
        return "Record not found"

db = DatabaseManager()
print(db.insert("user101", "Alice"))
print(db.select("user101"))
print(db.select("user102"))`);

  const [p3Code, setP3Code] = useState(`class APIDashboard:
    def __init__(self):
        # Simulated temperature metrics API response
        self.data = {"status": 200, "city": "Bengaluru", "temp": 28.5}

    def fetch_metrics(self):
        if self.data["status"] == 200:
            return f"Weather API Success: {self.data['city']} is {self.data['temp']}°C"
        return "API Error: Status 500"

api = APIDashboard()
print(api.fetch_metrics())`);

  const [p1Out, setP1Out] = useState('');
  const [p2Out, setP2Out] = useState('');
  const [p3Out, setP3Out] = useState('');

  const [p1Feedback, setP1Feedback] = useState('');
  const [p2Feedback, setP2Feedback] = useState('');
  const [p3Feedback, setP3Feedback] = useState('');

  const [p1Tab, setP1Tab] = useState('output');
  const [p2Tab, setP2Tab] = useState('output');
  const [p3Tab, setP3Tab] = useState('output');

  const [p1Loading, setP1Loading] = useState(false);
  const [p2Loading, setP2Loading] = useState(false);
  const [p3Loading, setP3Loading] = useState(false);

  const runSimulated = (projectNum) => {
    if (projectNum === 1) {
      setP1Out("Response 1: Hello! I am your AI assistant. How can I help you today?\nResponse 2: Python is a high-level language, perfect for AI and Web apps!\n\n✨ Process finished with exit code 0");
      setP1Tab('output');
    } else if (projectNum === 2) {
      setP2Out("Inserted user101 -> Alice\nFound: user101 = Alice\nRecord not found\n\n✨ Process finished with exit code 0");
      setP2Tab('output');
    } else if (projectNum === 3) {
      setP3Out("Weather API Success: Bengaluru is 28.5°C\n\n✨ Process finished with exit code 0");
      setP3Tab('output');
    }
  };

  const getAIFeedback = (projectNum, codeText, setFeedback, setLoading, setTab) => {
    setLoading(true);
    setTimeout(() => {
      let feedback = "";
      const lines = codeText.split('\n');
      let indentationError = false;
      for (let i = 0; i < lines.length; i++) {
        if ((lines[i].startsWith(' ') && lines[i].length % 4 !== 0 && !lines[i].trim().startsWith('#')) ||
            (lines[i].includes('def ') && lines[i+1] && !lines[i+1].startsWith('    ') && !lines[i+1].trim().startsWith('#') && lines[i+1].trim() !== '')) {
          indentationError = true;
        }
      }
      
      let colonError = false;
      if (/def\s+\w+\s*\([^)]*\)\s*$/m.test(codeText) || /class\s+\w+\s*$/m.test(codeText) || /if\s+.*$/m.test(codeText) || /for\s+.*$/m.test(codeText) || /while\s+.*$/m.test(codeText)) {
        colonError = true;
      }
      
      if (indentationError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Indentation Issue Detected**\n\nMake sure your method/function declarations and class bodies are indented with exactly 4 spaces (or 1 tab).";
      } else if (colonError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Missing Colon (:)**\n\nCheck your conditional statements (`if`), constructor definition (`__init__`), or class headers. They must end with a colon `:` character.";
      } else {
        feedback = `🤖 **AI Co-Pilot Project Code Review:**\n\nYour Project ${projectNum} code looks clean and runs successfully!\n\n- **OOP Design**: Solid class encapsulation separating initialization state and operations.\n- **Data Operations**: Clean use of dictionaries/mappings to retrieve simulated records.\n- **Readability**: High quality structure. Ready to deploy to your portfolio!`;
      }
      setFeedback(feedback);
      setLoading(false);
      setTab('ai');
    }, 600);
  };

  const sections = {
    intro: (
      <Section key="intro" eyebrow="Capstone" title="🚀 Python Final Demo Projects">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Welcome to the final showcase of your Python journey! Having mastered basic syntax, loop operations, collections, exceptions, standard modules, and advanced Object-Oriented Programming (OOP) paradigms, you are now ready to build production-style projects.
        </p>
        <div style={{ background:'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem', boxShadow:'0 10px 25px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fcd34d', marginBottom: '0.8rem', fontWeight: 700 }}>🏆 Graduation Challenges</h3>
          <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.7 }}>
            Explore our 3 built-in AI-powered Python demo projects. Each project simulates real-world tasks that you will encounter as a full-stack engineer: natural language chatbots, dictionary databases, and REST API dashboard monitors.
          </p>
        </div>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What kind of portfolio projects should I build as a beginner Python developer?")}>Ask AI Tutor: Portfolio Ideas</button>
          <button className="btn btn-primary" onClick={()=>nav('project1')}>Next: AI Chatbot Project <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    project1: (
      <Section key="project1" eyebrow="Project 1" title="🤖 Project 1: AI Chat Assistant">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This project demonstrates a console-based conversational AI agent. The `AIChatbot` class stores knowledge keys and responses, handling case insensitivity and input cleaning.
        </p>
        <CodeBlock title="ai_chatbot.py">
          {kw('class')} {fn('AIChatbot')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, bot_name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.bot_name = bot_name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.knowledge = &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"hello"')}: {st('"Hello! I am your AI assistant..."')},<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"python"')}: {st('"Python is a high-level language..."')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
        </CodeBlock>
        
        {/* Playground */}
        <div style={{ marginTop:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <span style={{ fontWeight:700, color:'#0f172a' }}>🧪 AI Chatbot Playground</span>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button className="btn btn-outline" onClick={() => getAIFeedback(1, p1Code, setP1Feedback, setP1Loading, setP1Tab)} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                <Bot size={13} /> {p1Loading ? 'Analyzing...' : 'AI Co-pilot'}
              </button>
              <button className="btn btn-primary" onClick={() => runSimulated(1)} style={{ padding:'0.3rem 0.9rem', fontSize:'0.82rem' }}><Play size={13}/> Run</button>
            </div>
          </div>
          <textarea value={p1Code} onChange={e=>setP1Code(e.target.value)} style={{ width:'100%', minHeight:200, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginTop: '0.6rem', background: '#1e293b', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setP1Tab('output')} style={{ padding: '0.6rem 1.2rem', background: p1Tab === 'output' ? '#0f172a' : 'transparent', color: p1Tab === 'output' ? '#10b981' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Terminal size={14} /> Output</button>
            <button onClick={() => { if (!p1Feedback) getAIFeedback(1, p1Code, setP1Feedback, setP1Loading, setP1Tab); else setP1Tab('ai'); }} style={{ padding: '0.6rem 1.2rem', background: p1Tab === 'ai' ? '#0f172a' : 'transparent', color: p1Tab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Bot size={14} /> ✨ AI Feedback</button>
          </div>
          {p1Tab === 'output' && p1Out && <div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}>{p1Out}</div>}
          {p1Tab === 'ai' && p1Feedback && <div style={{ background:'#f5f3ff', border:'1.5px solid #8b5cf6', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#3b0764' }}>{p1Feedback}</div>}
        </div>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("How can I expand this AI Chatbot database or add custom rules?")}>Ask AI Tutor: Chatbot Tips</button>
          <button className="btn btn-primary" onClick={()=>nav('project2')}>Next: Database Manager <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    project2: (
      <Section key="project2" eyebrow="Project 2" title="🗄️ Project 2: Database Manager">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This project simulates record transactions inside a key-value dictionary database structure, enabling inserts and lookups via class instances.
        </p>
        <CodeBlock title="db_manager.py">
          {kw('class')} {fn('DatabaseManager')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.db = &#123;&#125;<br/>
        </CodeBlock>

        {/* Playground */}
        <div style={{ marginTop:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <span style={{ fontWeight:700, color:'#0f172a' }}>🧪 Database Playground</span>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button className="btn btn-outline" onClick={() => getAIFeedback(2, p2Code, setP2Feedback, setP2Loading, setP2Tab)} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                <Bot size={13} /> {p2Loading ? 'Analyzing...' : 'AI Co-pilot'}
              </button>
              <button className="btn btn-primary" onClick={() => runSimulated(2)} style={{ padding:'0.3rem 0.9rem', fontSize:'0.82rem' }}><Play size={13}/> Run</button>
            </div>
          </div>
          <textarea value={p2Code} onChange={e=>setP2Code(e.target.value)} style={{ width:'100%', minHeight:200, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginTop: '0.6rem', background: '#1e293b', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setP2Tab('output')} style={{ padding: '0.6rem 1.2rem', background: p2Tab === 'output' ? '#0f172a' : 'transparent', color: p2Tab === 'output' ? '#10b981' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Terminal size={14} /> Output</button>
            <button onClick={() => { if (!p2Feedback) getAIFeedback(2, p2Code, setP2Feedback, setP2Loading, setP2Tab); else setP2Tab('ai'); }} style={{ padding: '0.6rem 1.2rem', background: p2Tab === 'ai' ? '#0f172a' : 'transparent', color: p2Tab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Bot size={14} /> ✨ AI Feedback</button>
          </div>
          {p2Tab === 'output' && p2Out && <div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}>{p2Out}</div>}
          {p2Tab === 'ai' && p2Feedback && <div style={{ background:'#f5f3ff', border:'1.5px solid #8b5cf6', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#3b0764' }}>{p2Feedback}</div>}
        </div>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("How can I bind a SQL database to a Python backend application?")}>Ask AI Tutor: DB Connections</button>
          <button className="btn btn-primary" onClick={()=>nav('project3')}>Next: API Dashboard <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    project3: (
      <Section key="project3" eyebrow="Project 3" title="📊 Project 3: API Data Dashboard">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This project loads weather metrics from a dictionary matching API payload responses, parsing outcomes dynamically.
        </p>
        <CodeBlock title="api_dashboard.py">
          {kw('class')} {fn('APIDashboard')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.data = &#123;{st('"status"')}: {nm('200')}, {st('"city"')}: {st('"Bengaluru"')}, {st('"temp"')}: {nm('28.5')}&#125;<br/>
        </CodeBlock>

        {/* Playground */}
        <div style={{ marginTop:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <span style={{ fontWeight:700, color:'#0f172a' }}>🧪 API Dashboard Playground</span>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button className="btn btn-outline" onClick={() => getAIFeedback(3, p3Code, setP3Feedback, setP3Loading, setP3Tab)} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                <Bot size={13} /> {p3Loading ? 'Analyzing...' : 'AI Co-pilot'}
              </button>
              <button className="btn btn-primary" onClick={() => runSimulated(3)} style={{ padding:'0.3rem 0.9rem', fontSize:'0.82rem' }}><Play size={13}/> Run</button>
            </div>
          </div>
          <textarea value={p3Code} onChange={e=>setP3Code(e.target.value)} style={{ width:'100%', minHeight:200, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginTop: '0.6rem', background: '#1e293b', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setP3Tab('output')} style={{ padding: '0.6rem 1.2rem', background: p3Tab === 'output' ? '#0f172a' : 'transparent', color: p3Tab === 'output' ? '#10b981' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Terminal size={14} /> Output</button>
            <button onClick={() => { if (!p3Feedback) getAIFeedback(3, p3Code, setP3Feedback, setP3Loading, setP3Tab); else setP3Tab('ai'); }} style={{ padding: '0.6rem 1.2rem', background: p3Tab === 'ai' ? '#0f172a' : 'transparent', color: p3Tab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Bot size={14} /> ✨ AI Feedback</button>
          </div>
          {p3Tab === 'output' && p3Out && <div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}>{p3Out}</div>}
          {p3Tab === 'ai' && p3Feedback && <div style={{ background:'#f5f3ff', border:'1.5px solid #8b5cf6', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#3b0764' }}>{p3Feedback}</div>}
        </div>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between parsing JSON data and calling API methods?")}>Ask AI Tutor: Explain APIs</button>
          <button className="btn btn-primary" onClick={()=>nav('tasks')}>Next: Final Project Tasks <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    tasks: (
      <Section key="tasks" eyebrow="Graduation" title="📝 3 Final Graduation Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Implement these 3 comprehensive portfolio projects on your system to complete the course:</p>
        <div style={{ display:'grid', gap:'1rem' }}>
          {[
            { n:1, title:'Task 1: AI Sentiment Analyzer', desc:'Create a class SentimentAnalyzer with knowledge of positive/negative keywords. Implement a review() method that takes a sentence, count matches, and prints the sentiment score alongside AI recommendations.', color:'#8b5cf6' },
            { n:2, title:'Task 2: Secure User Authentication File DB', desc:'Create a UserDB class using python file operations. Implement sign_up(user, pwd) and login(user, pwd) methods. Write records into a secure user_data.txt file and wrap operations in exception-safety try/except blocks.', color:'#ec4899' },
            { n:3, title:'Task 3: Crypto Live Price Alert Terminal', desc:'Write a script utilizing standard library datetime, random, and requests modules to simulate hitting a crypto price endpoint. Monitor price limits and print warnings if values exceed set thresholds.', color:'#10b981' },
          ].map(task=>(
            <div key={task.n} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:`2px solid ${task.color}30`, display:'flex', gap:'1.2rem', alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:`${task.color}15`, border:`2px solid ${task.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, color:task.color }}>{task.n}</div>
              <div>
                <strong style={{ color:'#1e293b', display:'block', marginBottom:4, fontSize:'1.1rem' }}>{task.title}</strong>
                <span style={{ color:'#64748b', fontSize:'0.95rem', lineHeight:1.6 }}>{task.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:'2rem', background:'#eff6ff', borderRadius:12, padding:'1.5rem', border:'1px solid #3b82f6', textAlign:'center' }}>
          <strong style={{ color:'#1d4ed8', fontSize:'1.15rem', display:'block', marginBottom:'0.5rem' }}>🎓 Course Completed!</strong>
          <p style={{ color:'#1e3a8a', margin:0, fontSize:'0.95rem' }}>
            Submit your completed tasks scripts to the student dashboard portal to generate your official **AI-Powered Python Developer Certificate**!
          </p>
        </div>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("Can you help me design the structure of Task 1 (AI Sentiment Analyzer) or Task 2 (Secure Auth DB)?")}>Ask AI Tutor: Task Help</button>
          <button className="btn btn-primary" style={{ background:'#10b981', borderColor:'#10b981' }} onClick={() => alert("Congratulations on completing your graduation projects! +1000 XP granted!")}>Finish Course & Graduate! 🎉</button>
        </div>
      </Section>
    ),
  };

  return (
    <AnimatePresence mode="wait">
      {sections[activeTab] || sections['intro']}
    </AnimatePresence>
  );
}
