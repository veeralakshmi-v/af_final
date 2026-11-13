import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Terminal, Zap, Bot, Database, Sliders, CheckCircle, PenTool, Smartphone } from 'lucide-react';

/* ─────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────── */
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

  // ─── PLAYGROUND DEFAULT CODES ───
  const [p1Code, setP1Code] = useState(`class BankAccount:
    def __init__(self, account_holder, account_number, initial_balance=0.0):
        self.account_holder = account_holder
        self.account_number = account_number
        self.balance = float(initial_balance)
        self.transactions = []
        self._record_transaction("Account Opened", self.balance)

    def _record_transaction(self, tx_type, amount):
        entry = {
            "type": tx_type,
            "amount": amount,
            "balance": self.balance
        }
        self.transactions.append(entry)

    def deposit(self, amount):
        if amount <= 0:
            return "❌ Error: Deposit amount must be greater than 0."
        self.balance += amount
        self._record_transaction("Deposit (+)", amount)
        return f"✅ Deposited Rs. {amount:.2f} | New Balance: Rs. {self.balance:.2f}"

    def withdraw(self, amount):
        if amount <= 0:
            return "❌ Error: Withdrawal amount must be greater than 0."
        if amount > self.balance:
            return f"❌ Insufficient Funds! Requested Rs. {amount:.2f}, available Rs. {self.balance:.2f}"
        self.balance -= amount
        self._record_transaction("Withdrawal (-)", amount)
        return f"✅ Withdrew Rs. {amount:.2f} | Remaining Balance: Rs. {self.balance:.2f}"

    def check_balance(self):
        return f"💰 Available Balance: Rs. {self.balance:.2f}"

    def print_statement(self):
        print(f"\\n{'='*48}")
        print(f"       🏦 STATE BANK MINI-STATEMENT")
        print(f"{'='*48}")
        print(f"Account Holder: {self.account_holder}")
        print(f"Account Number: {self.account_number}")
        print(f"{'-'*48}")
        for idx, t in enumerate(self.transactions, 1):
            print(f"{idx}. {t['type']:<16} : Rs. {t['amount']:>8.2f} (Bal: Rs. {t['balance']:.2f})")
        print(f"{'='*48}")
        print(f"CLOSING BALANCE: Rs. {self.balance:.2f}\\n")

# --- Test BankAccount Execution ---
account = BankAccount("Priya Sharma", "SB-IN-40912", 5000.0)
print(account.deposit(2500.0))
print(account.withdraw(1200.0))
print(account.withdraw(9000.0))
account.print_statement()`);

  const [p2Code, setP2Code] = useState(`class DatabaseManager:
    def __init__(self, table_name):
        self.table_name = table_name
        self.records = {}

    def insert(self, record_id, data_dict):
        if record_id in self.records:
            return f"❌ Conflict: Record '{record_id}' already exists!"
        self.records[record_id] = data_dict
        return f"✅ Inserted record [{record_id}] into '{self.table_name}'."

    def select(self, record_id):
        if record_id in self.records:
            return self.records[record_id]
        return f"❌ Error: Record '{record_id}' not found."

    def update(self, record_id, updated_fields):
        if record_id not in self.records:
            return f"❌ Error: Cannot update. Record '{record_id}' does not exist."
        self.records[record_id].update(updated_fields)
        return f"✅ Record [{record_id}] successfully updated."

    def delete(self, record_id):
        if record_id in self.records:
            deleted_item = self.records.pop(record_id)
            return f"🗑️ Record [{record_id}] removed successfully."
        return f"❌ Error: Cannot delete. Record '{record_id}' not found."

    def list_all(self):
        print(f"\\n{'='*48}")
        print(f"     🗄️ DATABASE TABLE: {self.table_name.upper()} ({len(self.records)} records)")
        print(f"{'='*48}")
        if not self.records:
            print(" (Table is currently empty)")
        for r_id, details in self.records.items():
            print(f" • Key: {r_id:<10} | Data: {details}")
        print(f"{'='*48}\\n")

# --- Test DatabaseManager Execution ---
db = DatabaseManager("users")
print(db.insert("usr_101", {"name": "Alice", "role": "Engineer", "dept": "AI"}))
print(db.insert("usr_102", {"name": "Bob", "role": "Designer", "dept": "UI/UX"}))
print(db.insert("usr_101", {"name": "Duplicate"}))
print("Fetch usr_101:", db.select("usr_101"))
print(db.update("usr_101", {"role": "Senior Engineer"}))
print(db.delete("usr_102"))
db.list_all()`);

  const [p3Code, setP3Code] = useState(`class APIDashboard:
    def __init__(self, service_name, base_url):
        self.service_name = service_name
        self.base_url = base_url
        # Simulated cloud service endpoints database
        self.endpoints = {
            "/api/v1/weather": {
                "status": 200,
                "city": "Bengaluru",
                "temp_c": 28.5,
                "humidity": 65,
                "condition": "Partly Cloudy ⛅"
            },
            "/api/v1/system": {
                "status": 200,
                "cpu_usage": 42.1,
                "memory_mb": 1024,
                "active_users": 1580,
                "server_health": "Healthy 🟢"
            },
            "/api/v1/payments": {
                "status": 503,
                "error": "Payment Gateway Temporarily Unavailable 🔴"
            }
        }

    def get(self, endpoint):
        if endpoint not in self.endpoints:
            return {"status": 404, "error": f"Endpoint '{endpoint}' not found"}
        return self.endpoints[endpoint]

    def render_dashboard(self):
        print(f"\\n{'='*52}")
        print(f"      📊 {self.service_name.upper()} - CLOUD API DASHBOARD")
        print(f"      Base URL: {self.base_url}")
        print(f"{'='*52}")
        
        for ep, res in self.endpoints.items():
            status_code = res.get("status", 500)
            if status_code == 200:
                print(f"[HTTP {status_code} OK] {ep}")
                for key, val in res.items():
                    if key != "status":
                        print(f"   ↳ {key:<14}: {val}")
            else:
                print(f"[HTTP {status_code} ERROR] {ep}")
                print(f"   ↳ error: {res.get('error', 'Unknown Error')}")
            print(f"{'-'*52}")

# --- Test APIDashboard Execution ---
dashboard = APIDashboard("CloudMetrics Suite", "https://api.cloudmetrics.internal")
print("Single Fetch /weather:", dashboard.get("/api/v1/weather"))
print("Single Fetch /unknown:", dashboard.get("/api/v1/orders"))
dashboard.render_dashboard()`);

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
      setP1Out(`✅ Deposited Rs. 2500.00 | New Balance: Rs. 7500.00
✅ Withdrew Rs. 1200.00 | Remaining Balance: Rs. 6300.00
❌ Insufficient Funds! Requested Rs. 9000.00, available Rs. 6300.00

================================================
       🏦 STATE BANK MINI-STATEMENT
================================================
Account Holder: Priya Sharma
Account Number: SB-IN-40912
------------------------------------------------
1. Account Opened   : Rs.  5000.00 (Bal: Rs. 5000.00)
2. Deposit (+)      : Rs.  2500.00 (Bal: Rs. 7500.00)
3. Withdrawal (-)   : Rs.  1200.00 (Bal: Rs. 6300.00)
================================================
CLOSING BALANCE: Rs. 6300.00

✨ Process finished with exit code 0`);
      setP1Tab('output');
    } else if (projectNum === 2) {
      setP2Out(`✅ Inserted record [usr_101] into 'users'.
✅ Inserted record [usr_102] into 'users'.
❌ Conflict: Record 'usr_101' already exists!
Fetch usr_101: {'name': 'Alice', 'role': 'Engineer', 'dept': 'AI'}
✅ Record [usr_101] successfully updated.
🗑️ Record [usr_102] removed successfully.

================================================
     🗄️ DATABASE TABLE: USERS (1 records)
================================================
 • Key: usr_101    | Data: {'name': 'Alice', 'role': 'Senior Engineer', 'dept': 'AI'}
================================================

✨ Process finished with exit code 0`);
      setP2Tab('output');
    } else if (projectNum === 3) {
      setP3Out(`Single Fetch /weather: {'status': 200, 'city': 'Bengaluru', 'temp_c': 28.5, 'humidity': 65, 'condition': 'Partly Cloudy ⛅'}
Single Fetch /unknown: {'status': 404, 'error': "Endpoint '/api/v1/orders' not found"}

====================================================
      📊 CLOUDMETRICS SUITE - CLOUD API DASHBOARD
      Base URL: https://api.cloudmetrics.internal
====================================================
[HTTP 200 OK] /api/v1/weather
   ↳ city          : Bengaluru
   ↳ temp_c        : 28.5
   ↳ humidity      : 65
   ↳ condition     : Partly Cloudy ⛅
----------------------------------------------------
[HTTP 200 OK] /api/v1/system
   ↳ cpu_usage     : 42.1
   ↳ memory_mb     : 1024
   ↳ active_users  : 1580
   ↳ server_health : Healthy 🟢
----------------------------------------------------
[HTTP 503 ERROR] /api/v1/payments
   ↳ error: Payment Gateway Temporarily Unavailable 🔴
----------------------------------------------------

✨ Process finished with exit code 0`);
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
        feedback = `🤖 **AI Co-Pilot Project Code Review:**\n\nYour Project ${projectNum} code looks clean, robust, and runs successfully!\n\n- **OOP Encapsulation**: Solid class architecture separating state initialization, validation, and operations.\n- **Data Integrity**: Clean handling of edge cases, dictionary records, and error messages.\n- **Production Readiness**: High quality structure ready to add to your engineering portfolio!`;
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
            Explore our 3 built-in Python demo projects. Each project simulates real-world tasks that you will encounter as a full-stack engineer: smart banking accounts, dictionary databases, and REST API dashboard monitors.
          </p>
        </div>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What kind of portfolio projects should I build as a beginner Python developer?")}>Ask AI Tutor: Portfolio Ideas</button>
          <button className="btn btn-primary" onClick={()=>nav('project1')}>Next: Smart Bank Account <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    project1: (
      <Section key="project1" eyebrow="Project 1 • Object-Oriented Banking" title="📱 Project 1: Smart Bank Account & ATM">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This project demonstrates real-world Object-Oriented Programming (OOP) in banking. The <code>BankAccount</code> class encapsulates account holder data, tracks a running balance, validates transactions (rejecting negative inputs and overdrafts), and maintains an audit trail transaction statement.
        </p>
        
        {/* Full Complete Code Display */}
        <CodeBlock title="bank_account.py — Full Complete BankAccount Class">
          {cm('# Complete Object-Oriented BankAccount Implementation')}<br/>
          {kw('class')} {fn('BankAccount')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, account_holder, account_number, initial_balance={nm('0.0')}):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.account_holder = account_holder<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.account_number = account_number<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.balance = {fn('float')}(initial_balance)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.transactions = []<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._record_transaction({st('"Account Opened"')}, self.balance)<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('_record_transaction')}(self, tx_type, amount):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entry = &#123;{st('"type"')}: tx_type, {st('"amount"')}: amount, {st('"balance"')}: self.balance&#125;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.transactions.append(entry)<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('deposit')}(self, amount):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} amount &lt;= {nm('0')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"❌ Error: Deposit amount must be greater than 0."')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.balance += amount<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._record_transaction({st('"Deposit (+)"')}, amount)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"✅ Deposited Rs. {amount:.2f} | New Balance: Rs. {self.balance:.2f}"')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('withdraw')}(self, amount):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} amount &lt;= {nm('0')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"❌ Error: Withdrawal amount must be greater than 0."')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} amount &gt; self.balance:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"❌ Insufficient Funds! Requested Rs. {amount:.2f}, available Rs. {self.balance:.2f}"')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.balance -= amount<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._record_transaction({st('"Withdrawal (-)"')}, amount)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"✅ Withdrew Rs. {amount:.2f} | Remaining Balance: Rs. {self.balance:.2f}"')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('print_statement')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"\\n================================================"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"       🏦 STATE BANK MINI-STATEMENT"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"================================================"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"Account Holder: {self.account_holder}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"Account Number: {self.account_number}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"------------------------------------------------"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} idx, t {kw('in')} {fn('enumerate')}(self.transactions, {nm('1')}):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"{idx}. {t[\\"type\\"]:<16} : Rs. {t[\\"amount\\"]:>8.2f} (Bal: Rs. {t[\\"balance\\"]:.2f})"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"================================================"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"CLOSING BALANCE: Rs. {self.balance:.2f}\\n"')})<br/><br/>

          {cm('# --- Test Execution ---')}<br/>
          account = {fn('BankAccount')}({st('"Priya Sharma"')}, {st('"SB-IN-40912"')}, {nm('5000.0')})<br/>
          {fn('print')}(account.{fn('deposit')}({nm('2500.0')}))<br/>
          {fn('print')}(account.{fn('withdraw')}({nm('1200.0')}))<br/>
          {fn('print')}(account.{fn('withdraw')}({nm('9000.0')}))<br/>
          account.{fn('print_statement')}()
        </CodeBlock>
        
        {/* Playground */}
        <div style={{ marginTop:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <span style={{ fontWeight:700, color:'#0f172a' }}>🧪 Smart Bank Account Playground</span>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button className="btn btn-outline" onClick={() => getAIFeedback(1, p1Code, setP1Feedback, setP1Loading, setP1Tab)} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                <Bot size={13} /> {p1Loading ? 'Analyzing...' : 'AI Co-pilot'}
              </button>
              <button className="btn btn-primary" onClick={() => runSimulated(1)} style={{ padding:'0.3rem 0.9rem', fontSize:'0.82rem' }}><Play size={13}/> Run</button>
            </div>
          </div>
          <textarea value={p1Code} onChange={e=>setP1Code(e.target.value)} style={{ width:'100%', minHeight:280, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginTop: '0.6rem', background: '#1e293b', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setP1Tab('output')} style={{ padding: '0.6rem 1.2rem', background: p1Tab === 'output' ? '#0f172a' : 'transparent', color: p1Tab === 'output' ? '#10b981' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Terminal size={14} /> Output</button>
            <button onClick={() => { if (!p1Feedback) getAIFeedback(1, p1Code, setP1Feedback, setP1Loading, setP1Tab); else setP1Tab('ai'); }} style={{ padding: '0.6rem 1.2rem', background: p1Tab === 'ai' ? '#0f172a' : 'transparent', color: p1Tab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}><Bot size={14} /> ✨ AI Feedback</button>
          </div>
          {p1Tab === 'output' && p1Out && <div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}>{p1Out}</div>}
          {p1Tab === 'ai' && p1Feedback && <div style={{ background:'#f5f3ff', border:'1.5px solid #8b5cf6', borderTop:'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#3b0764' }}>{p1Feedback}</div>}
        </div>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("How can I add interest calculation or pin authentication to the BankAccount class?")}>Ask AI Tutor: OOP Tips</button>
          <button className="btn btn-primary" onClick={()=>nav('project2')}>Next: Database Manager <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    project2: (
      <Section key="project2" eyebrow="Project 2 • Data Systems" title="🗄️ Project 2: In-Memory Database Manager">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Real backend frameworks use data access layers to manage data records. The <code>DatabaseManager</code> class implements complete <strong>CRUD operations (Create, Read, Update, Delete)</strong> with primary-key uniqueness validation, record retrieval, and formatted table exports.
        </p>

        {/* Full Complete Code Display */}
        <CodeBlock title="db_manager.py — Complete CRUD DatabaseManager Class">
          {cm('# Complete Object-Oriented DatabaseManager Implementation')}<br/>
          {kw('class')} {fn('DatabaseManager')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, table_name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.table_name = table_name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.records = &#123;&#125;<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('insert')}(self, record_id, data_dict):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} record_id {kw('in')} self.records:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"❌ Conflict: Record \\"{record_id}\\" already exists!"')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.records[record_id] = data_dict<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"✅ Inserted record [{record_id}] into \\"{self.table_name}\\"."')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('select')}(self, record_id):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} record_id {kw('in')} self.records:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.records[record_id]<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"❌ Error: Record \\"{record_id}\\" not found."')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('update')}(self, record_id, updated_fields):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} record_id {kw('not in')} self.records:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"❌ Error: Cannot update. Record \\"{record_id}\\" does not exist."')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.records[record_id].update(updated_fields)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"✅ Record [{record_id}] successfully updated."')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('delete')}(self, record_id):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} record_id {kw('in')} self.records:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deleted_item = self.records.pop(record_id)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"🗑️ Record [{record_id}] removed successfully."')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('f"❌ Error: Cannot delete. Record \\"{record_id}\\" not found."')}<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('list_all')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"\\n================================================"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"     🗄️ DATABASE TABLE: {self.table_name.upper()} ({len(self.records)} records)"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"================================================"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {kw('not')} self.records:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('" (Table is currently empty)"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} r_id, details {kw('in')} self.records.items():<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f" • Key: {r_id:<10} | Data: {details}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"================================================\\n"')})<br/><br/>

          {cm('# --- Test Execution ---')}<br/>
          db = {fn('DatabaseManager')}({st('"users"')})<br/>
          {fn('print')}(db.{fn('insert')}({st('"usr_101"')}, &#123;{st('"name"')}: {st('"Alice"')}, {st('"role"')}: {st('"Engineer"')}&#125;))<br/>
          {fn('print')}(db.{fn('insert')}({st('"usr_102"')}, &#123;{st('"name"')}: {st('"Bob"')}, {st('"role"')}: {st('"Designer"')}&#125;))<br/>
          {fn('print')}(db.{fn('insert')}({st('"usr_101"')}, &#123;{st('"name"')}: {st('"Duplicate"')}&#125;))<br/>
          {fn('print')}({st('"Fetch usr_101:"')}, db.{fn('select')}({st('"usr_101"')}))<br/>
          {fn('print')}(db.{fn('update')}({st('"usr_101"')}, &#123;{st('"role"')}: {st('"Senior Engineer"')}&#125;))<br/>
          {fn('print')}(db.{fn('delete')}({st('"usr_102"')}))<br/>
          db.{fn('list_all')}()
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
          <textarea value={p2Code} onChange={e=>setP2Code(e.target.value)} style={{ width:'100%', minHeight:280, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
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
      <Section key="project3" eyebrow="Project 3 • Backend Microservices" title="📊 Project 3: API Data Dashboard & Health Monitor">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Microservice web architectures communicate over REST APIs. The <code>APIDashboard</code> class models a multi-endpoint REST gateway that handles routing requests (<code>/weather</code>, <code>/system</code>, <code>/payments</code>), parses JSON responses, formats status codes (200 OK, 404 Not Found, 503 Unavailable), and outputs a visual system health board.
        </p>

        {/* Full Complete Code Display */}
        <CodeBlock title="api_dashboard.py — Complete REST API Dashboard Class">
          {cm('# Complete Object-Oriented APIDashboard Implementation')}<br/>
          {kw('class')} {fn('APIDashboard')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, service_name, base_url):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.service_name = service_name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.base_url = base_url<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.endpoints = &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"/api/v1/weather"')}: &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"status"')}: {nm('200')}, {st('"city"')}: {st('"Bengaluru"')},<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"temp_c"')}: {nm('28.5')}, {st('"condition"')}: {st('"Partly Cloudy ⛅"')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"/api/v1/system"')}: &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"status"')}: {nm('200')}, {st('"cpu_usage"')}: {nm('42.1')},<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"server_health"')}: {st('"Healthy 🟢"')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"/api/v1/payments"')}: &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{st('"status"')}: {nm('503')}, {st('"error"')}: {st('"Payment Gateway Unavailable 🔴"')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('get')}(self, endpoint):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} endpoint {kw('not in')} self.endpoints:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} &#123;{st('"status"')}: {nm('404')}, {st('"error"')}: {st('f"Endpoint \\"{endpoint}\\" not found"')}&#125;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.endpoints[endpoint]<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('render_dashboard')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"\\n===================================================="')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"      📊 {self.service_name.upper()} - CLOUD API DASHBOARD"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"      Base URL: {self.base_url}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"===================================================="')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} ep, res {kw('in')} self.endpoints.items():<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code = res.get({st('"status"')}, {nm('500')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} code == {nm('200')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"[HTTP {code} OK] {ep}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} k, v {kw('in')} res.items():<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} k != {st('"status"')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"   ↳ {k:<14}: {v}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"[HTTP {code} ERROR] {ep}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('f"   ↳ error: {res.get(\\"error\\", \\"Unknown\\")}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"----------------------------------------------------"')})<br/><br/>

          {cm('# --- Test Execution ---')}<br/>
          dashboard = {fn('APIDashboard')}({st('"CloudMetrics Suite"')}, {st('"https://api.cloudmetrics.internal"')})<br/>
          {fn('print')}({st('"Single Fetch /weather:"')}, dashboard.{fn('get')}({st('"/api/v1/weather"')}))<br/>
          {fn('print')}({st('"Single Fetch /unknown:"')}, dashboard.{fn('get')}({st('"/api/v1/orders"')}))<br/>
          dashboard.{fn('render_dashboard')}()
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
          <textarea value={p3Code} onChange={e=>setP3Code(e.target.value)} style={{ width:'100%', minHeight:280, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
          
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
