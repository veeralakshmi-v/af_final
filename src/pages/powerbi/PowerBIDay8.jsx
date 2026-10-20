import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, Radio, Activity, Terminal, FileSpreadsheet, Database, Copy, Check, 
  Play, Pause, RefreshCw, CheckCircle, AlertTriangle, 
  Layers, Zap, Clock, ArrowRight, Server, Globe, Wifi, 
  Sparkles, HelpCircle, Scale, CheckSquare
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SHARED SECTION WRAPPER
───────────────────────────────────────────── */
const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.25 }}
    className="learning-card"
    style={{ background: '#ffffff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}
  >
    <div style={{ marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Sparkles size={14} /> {eyebrow}
      </span>
      <h2 style={{ fontSize: '2.1rem', marginTop: '0.4rem', color: '#0f172a', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
        {title}
      </h2>
    </div>
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   COPYABLE CODE BLOCK COMPONENT
───────────────────────────────────────────── */
const CodeBlock = ({ code, language = 'python', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #1e293b', background: '#090d16', marginBottom: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
      <div style={{ background: '#111827', padding: '0.65rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginLeft: '8px', fontFamily: 'monospace' }}>
            {title || language.toUpperCase()}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: copied ? '#059669' : '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s'
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '1.25rem', color: '#e2e8f0', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.88rem', lineHeight: 1.65, overflowX: 'auto', whiteSpace: 'pre' }}>
        {code}
      </pre>
    </div>
  );
};

/* ─────────────────────────────────────────────
   INTERACTIVE LIVE PIPELINE VS STATIC EXPLAINER
   Answers: "Why do these examples have few data rows? How come this is live data?"
───────────────────────────────────────────── */
const LivePipelineVsStaticExplainer = () => {
  const [activeScenario, setActiveScenario] = useState('sheets');
  
  // Sheet demo state
  const [sheetRows, setSheetRows] = useState([
    { id: 'ORD-101', rep: 'Priya', region: 'South', item: 'Laptop', amount: 55000, time: '10:15 AM' },
    { id: 'ORD-102', rep: 'Karthik', region: 'South', item: 'Headphones', amount: 3500, time: '10:30 AM' },
    { id: 'ORD-103', rep: 'Sneha', region: 'North', item: 'Phone', amount: 28000, time: '11:00 AM' },
  ]);
  const [syncingSheet, setSyncingSheet] = useState(false);

  // DirectQuery demo state
  const [selectedRegion, setSelectedRegion] = useState('South');

  const simulateAddSheetOrder = () => {
    setSyncingSheet(true);
    setTimeout(() => {
      const reps = ['Ananya', 'Rahul', 'Deepak', 'Kavita', 'Vignesh'];
      const items = ['Smartwatch', 'Monitor', 'Tablet', 'Keyboard', 'Speaker'];
      const amounts = [4500, 14000, 22000, 2500, 6800];
      const newOrder = {
        id: `ORD-${104 + sheetRows.length - 3}`,
        rep: reps[Math.floor(Math.random() * reps.length)],
        region: 'South',
        item: items[Math.floor(Math.random() * items.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: 'Just now'
      };
      setSheetRows(prev => [newOrder, ...prev]);
      setSyncingSheet(false);
    }, 350);
  };

  const totalRevenue = sheetRows.reduce((acc, r) => acc + r.amount, 0);

  const dqDataByRegion = {
    South: { totalInDb: '3,450,000 rows in SQL', rowsReturned: '1 row', revenue: '₹4,12,000' },
    North: { totalInDb: '3,450,000 rows in SQL', rowsReturned: '1 row', revenue: '₹3,56,000' },
    West:  { totalInDb: '3,450,000 rows in SQL', rowsReturned: '1 row', revenue: '₹4,89,000' },
  };

  return (
    <div style={{ background: '#0f172a', borderRadius: '18px', padding: '1.75rem', color: '#ffffff', marginBottom: '2rem', border: '1px solid #1e293b' }}>
      
      {/* Title */}
      <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          <HelpCircle size={14} /> Quick Question
        </div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: '#f8fafc' }}>
          "If there are only 3 or 4 rows, how is this 'Live Data'?"
        </h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
          <strong style={{ color: '#38bdf8' }}>In simple words:</strong> Live data does <em>not</em> mean having millions of rows on your screen! It means the <strong>connection is alive</strong>. If someone adds a row at the source, Power BI gets it automatically without downloading a new file.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {[
          { id: 'sheets', label: '1. Google Sheets Live Test', color: '#10b981' },
          { id: 'directquery', label: '2. DirectQuery Database Test', color: '#3b82f6' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveScenario(tab.id)}
            style={{
              background: activeScenario === tab.id ? 'rgba(255,255,255,0.1)' : '#1e293b',
              border: `1.5px solid ${activeScenario === tab.id ? tab.color : '#334155'}`,
              color: activeScenario === tab.id ? '#ffffff' : '#94a3b8',
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DEMO 1: GOOGLE SHEETS */}
      {activeScenario === 'sheets' && (
        <div style={{ background: '#131d31', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Try It: Add a Sale in Google Sheets
              </h4>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>See how Power BI detects the new row instantly:</span>
            </div>
            <button
              type="button"
              onClick={simulateAddSheetOrder}
              disabled={syncingSheet}
              style={{
                background: syncingSheet ? '#334155' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.6rem 1.1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: syncingSheet ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {syncingSheet ? <RefreshCw size={14} className="animate-spin" /> : <Zap size={14} />}
              {syncingSheet ? 'Syncing...' : '+ Add 1 Sale to Google Sheet'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Rows in Sheet</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#38bdf8' }}>{sheetRows.length} Rows</div>
            </div>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Revenue</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10b981' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
            </div>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Laptop Storage</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f59e0b' }}>0 MB</div>
            </div>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left', background: '#090d16' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#cbd5e1' }}>
                  <th style={{ padding: '6px 10px' }}>Order ID</th>
                  <th style={{ padding: '6px 10px' }}>Sales Rep</th>
                  <th style={{ padding: '6px 10px' }}>Item</th>
                  <th style={{ padding: '6px 10px' }}>Amount</th>
                  <th style={{ padding: '6px 10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sheetRows.slice(0, 4).map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '6px 10px', color: '#38bdf8', fontWeight: 700 }}>{r.id}</td>
                    <td style={{ padding: '6px 10px', color: '#f8fafc' }}>{r.rep}</td>
                    <td style={{ padding: '6px 10px', color: '#cbd5e1' }}>{r.item}</td>
                    <td style={{ padding: '6px 10px', color: '#10b981', fontWeight: 700 }}>₹{r.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '6px 10px', color: '#94a3b8' }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.82rem', color: '#a7f3d0' }}>
            💡 <strong>Why this is Live:</strong> When you clicked the button, a new row was added. Power BI's web connection pulls this new row automatically on refresh. You never had to save or re-upload any file!
          </p>
        </div>
      )}

      {/* DEMO 2: DIRECTQUERY */}
      {activeScenario === 'directquery' && (
        <div style={{ background: '#131d31', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Why DirectQuery Shows Only 1 Row
              </h4>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Click a region to see how SQL returns only the summary:</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['South', 'North', 'West'].map(reg => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  style={{
                    background: selectedRegion === reg ? '#2563eb' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid #3b82f6',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Rows in SQL Database</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc' }}>{dqDataByRegion[selectedRegion].totalInDb}</div>
            </div>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Rows on Power BI Screen</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#38bdf8' }}>{dqDataByRegion[selectedRegion].rowsReturned}</div>
            </div>
            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Calculated Total</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#10b981' }}>{dqDataByRegion[selectedRegion].revenue}</div>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '0.82rem', color: '#bfdbfe' }}>
            💡 <strong>Why you only see 1 row:</strong> The SQL server calculates the total in 0.02 seconds and sends <em>only the answer</em> to Power BI. You don't need 3.4 million rows sitting on your screen to see the total sales!
          </p>
        </div>
      )}

    </div>
  );
};

/* ─────────────────────────────────────────────
   INTERACTIVE LIVE STREAMING SIMULATOR
───────────────────────────────────────────── */
const LiveStreamSimulator = () => {
  const [streaming, setStreaming] = useState(false);
  const [currentBtc, setCurrentBtc] = useState(67450.20);
  const [streamCount, setStreamCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (streaming) {
      interval = setInterval(() => {
        const delta = (Math.random() - 0.48) * 120;
        setCurrentBtc(prev => Math.max(60000, Number((prev + delta).toFixed(2))));
        setStreamCount(c => c + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [streaming]);

  return (
    <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '2rem', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#38bdf8' }}>
            Live Stream Demo
          </span>
          <h4 style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color={streaming ? '#10b981' : '#94a3b8'} className={streaming ? 'animate-pulse' : ''} />
            Real-Time Data Simulation (Like a Stock Ticker)
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setStreaming(!streaming)}
          style={{
            background: streaming ? '#ef4444' : '#10b981',
            border: 'none',
            color: '#ffffff',
            padding: '0.55rem 1.2rem',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {streaming ? <Pause size={14} /> : <Play size={14} />}
          {streaming ? 'Stop Stream' : 'Start Live Stream'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '0.85rem', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>Live Price (Updates Every Sec)</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc', marginTop: '2px' }}>
            ${currentBtc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span style={{ fontSize: '0.75rem', color: streaming ? '#10b981' : '#64748b' }}>
            {streaming ? '● Streaming live...' : '○ Paused'}
          </span>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '0.85rem', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>Updates Received</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>
            {streamCount} ticks
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No refresh button clicked!</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PowerBIDay8({ activeTab, onNavigate }) {

  const handleContinue = (nextTabId) => {
    onNavigate('powerbi_module8', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizedTab = [
    'intro_day8',
    'architecture_differences',
    'google_sheets_connection',
    'live_connections',
    'realtime_streaming',
    'python_powerbi',
    'assignment_day8'
  ].includes(activeTab) 
    ? activeTab 
    : (activeTab === 'python_powerbi' ? 'python_powerbi' : 'intro_day8');

  // Simple Decision Helper State
  const [selectedScenario, setSelectedScenario] = useState('scen1');

  const simpleScenarios = [
    {
      id: 'scen1',
      title: '📂 Huge SQL Database (Millions of Rows)',
      question: 'Your company has 10 million sales records in SQL Server. Your laptop would freeze if you tried to download all of it.',
      answer: 'Use DirectQuery',
      badge: 'DirectQuery',
      badgeColor: '#3b82f6',
      why: 'DirectQuery keeps all 10 million rows inside SQL Server. Power BI only asks for the final summary numbers you see on screen, keeping your file super light (under 1 MB)!'
    },
    {
      id: 'scen2',
      title: '📊 Google Sheet (Team Updates Daily)',
      question: 'Your sales team enters daily sales in a Google Sheet. You want Power BI to show new rows automatically without manual re-uploading.',
      answer: 'Use Google Sheets Live Sync',
      badge: 'Google Sheets',
      badgeColor: '#10b981',
      why: 'Publish the Google Sheet as a CSV web link. Whenever someone adds a row on their phone or laptop, Power BI automatically syncs it on scheduled refresh!'
    },
    {
      id: 'scen3',
      title: '⏱️ Live Sensor or Stock Price (Second-by-Second)',
      question: 'You are monitoring factory machine heat or live Bitcoin prices. You need to see numbers change every second without clicking refresh.',
      answer: 'Use Real-Time Streaming',
      badge: 'Streaming Dataset',
      badgeColor: '#f59e0b',
      why: 'A Streaming Dataset pushes live numbers directly to Power BI dashboard tiles like a speedometer in a car!'
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─────────────────────────────────────────────
          TAB 1: DAY 8 OVERVIEW
      ───────────────────────────────────────────── */}
      {normalizedTab === 'intro_day8' && (
        <Section key="intro_day8" id="intro_day8" eyebrow="Day 8 • Simple Guide" title="Connecting Power BI to Live & Real-Time Data">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Friendly Hero Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              borderRadius: '20px',
              padding: '2rem',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(49, 46, 129, 0.2)',
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                <Zap size={14} color="#facc15" /> Say Goodbye to Static Excel Files!
              </div>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.75rem 0', fontWeight: 900, lineHeight: 1.25 }}>
                Learn How to Connect Power BI to Live Data
              </h3>
              <p style={{ fontSize: '1rem', color: '#c7d2fe', margin: 0, lineHeight: 1.6, maxWidth: '750px' }}>
                Until now, you loaded static CSV or Excel files. Today you will learn how to connect Power BI to <strong>live sources</strong> so your reports update automatically when new data is added!
              </p>
            </div>

            {/* The 4 Pillars (Clean Balanced 2x2 Grid with Simple Language) */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                The 4 Things You Will Learn Today (In Simple Words):
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  {
                    icon: <FileSpreadsheet size={22} color="#10b981" />,
                    title: '1. Live Google Sheets',
                    badge: 'Auto-Sync',
                    badgeColor: '#dcfce7',
                    textColor: '#166534',
                    desc: 'Connect to Google Sheets. When a teammate adds a new row, your dashboard updates automatically without downloading any files!'
                  },
                  {
                    icon: <Radio size={22} color="#3b82f6" />,
                    title: '2. Live & DirectQuery',
                    badge: 'Huge Databases',
                    badgeColor: '#dbeafe',
                    textColor: '#1d4ed8',
                    desc: 'Query millions of rows in SQL Server or Snowflake without slowing down your laptop. Power BI only asks for the numbers on your screen.'
                  },
                  {
                    icon: <Activity size={22} color="#f59e0b" />,
                    title: '3. Real-Time Streaming',
                    badge: 'Cloud Only ☁️',
                    badgeColor: '#fee2e2',
                    textColor: '#dc2626',
                    desc: 'Watch numbers update live every second (like a live cricket score). Note: Streaming datasets are ONLY available in Power BI Service (Cloud at app.powerbi.com), NOT in Desktop mode!'
                  },
                  {
                    icon: <Terminal size={22} color="#8b5cf6" />,
                    title: '4. Python in Power BI',
                    badge: 'Smart Visuals',
                    badgeColor: '#f3e8ff',
                    textColor: '#6b21a8',
                    desc: 'Write simple 5-line Python scripts to clean messy columns and create beautiful color heatmaps that standard charts cannot do.'
                  }
                ].map((pillar, i) => (
                  <div key={i} style={{ background: '#ffffff', padding: '1.35rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>{pillar.icon}</div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, background: pillar.badgeColor, color: pillar.textColor, padding: '3px 8px', borderRadius: '12px' }}>{pillar.badge}</span>
                      </div>
                      <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{pillar.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EMBEDDED SIMPLE EXPLAINER WIDGET */}
            <LivePipelineVsStaticExplainer />

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('architecture_differences')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to: Live vs DirectQuery vs Streaming Differences <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 2: ARCHITECTURE DIFFERENCES (SIMPLE VERSION)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'architecture_differences' && (
        <Section 
          key="architecture_differences" 
          id="architecture_differences" 
          eyebrow="Simple Comparison" 
          title="Differences: Live Connection vs DirectQuery vs Streaming"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Simple Real-Life Analogies */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
                💡 Understanding the 3 Types with Real-Life Analogies:
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📺</div>
                  <strong style={{ color: '#4338ca', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>1. Live Connection</strong>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                    <strong>Like watching YouTube:</strong> The video is stored on Google's servers. You are just watching it on your screen. You cannot edit the video, only view it!
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🍽️</div>
                  <strong style={{ color: '#1d4ed8', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>2. DirectQuery</strong>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                    <strong>Like a restaurant menu:</strong> When you order pizza, the chef cooks it fresh in the kitchen. You don't store 500 pizzas at home in your fridge!
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🏎️</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#b45309', fontSize: '1rem' }}>3. Real-Time Streaming</strong>
                    <span style={{ fontSize: '0.68rem', fontWeight: 900, background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '10px' }}>CLOUD ONLY ☁️</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                    <strong>Like a car speedometer:</strong> Continuously shows your speed right now. <em>Notice:</em> Streaming datasets are <strong>only available online in Power BI Cloud (Service)</strong>, NOT in Desktop mode!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Cheat Sheet Table */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 800 }}>
                  📋 Quick Cheat Sheet: Which One Does What?
                </h4>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '10px 14px', fontWeight: 800, color: '#334155' }}>Feature</th>
                      <th style={{ padding: '10px 14px', fontWeight: 800, color: '#4338ca' }}>1. Live Connection</th>
                      <th style={{ padding: '10px 14px', fontWeight: 800, color: '#1d4ed8' }}>2. DirectQuery</th>
                      <th style={{ padding: '10px 14px', fontWeight: 800, color: '#b45309' }}>3. Real-Time Streaming</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Where is data stored?</td>
                      <td style={{ padding: '10px 14px', color: '#4338ca' }}>In the IT Semantic Model</td>
                      <td style={{ padding: '10px 14px', color: '#1d4ed8' }}>In the SQL Database</td>
                      <td style={{ padding: '10px 14px', color: '#b45309' }}>In Cloud Live Cache</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fffbeb' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: '#92400e' }}>Available in Desktop?</td>
                      <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>✅ Yes (Desktop & Cloud)</td>
                      <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>✅ Yes (Desktop & Cloud)</td>
                      <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 800 }}>❌ CLOUD ONLY! (app.powerbi.com)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Does it take laptop RAM?</td>
                      <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>Zero RAM</td>
                      <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>Zero RAM</td>
                      <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>Zero RAM</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>How fast does it update?</td>
                      <td style={{ padding: '10px 14px', color: '#4338ca' }}>When IT refreshes model</td>
                      <td style={{ padding: '10px 14px', color: '#1d4ed8' }}>Instant on every click</td>
                      <td style={{ padding: '10px 14px', color: '#b45309' }}>Every 1 second automatically</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Best for?</td>
                      <td style={{ padding: '10px 14px', color: '#4338ca' }}>Company standard reports</td>
                      <td style={{ padding: '10px 14px', color: '#1d4ed8' }}>Huge data (millions of rows)</td>
                      <td style={{ padding: '10px 14px', color: '#b45309' }}>Sensors, stock tickers, IoT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simple Interactive Decision Helper */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                🎯 Simple Practice: Which one should you pick?
              </h4>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {simpleScenarios.map(sc => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScenario(sc.id)}
                    style={{
                      background: selectedScenario === sc.id ? '#1e1b4b' : '#ffffff',
                      color: selectedScenario === sc.id ? '#ffffff' : '#334155',
                      border: `1.5px solid ${selectedScenario === sc.id ? '#6366f1' : '#cbd5e1'}`,
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>

              {(() => {
                const active = simpleScenarios.find(s => s.id === selectedScenario);
                return (
                  <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1.5px solid #10b981' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#475569' }}>
                      <strong>Situation:</strong> {active.question}
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px' }}>
                      <CheckCircle size={14} /> Answer: {active.answer}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      <strong>Why?</strong> {active.why}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('google_sheets_connection')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 1: Google Sheets Live Connection <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 3: GOOGLE SHEETS CONNECTION (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'google_sheets_connection' && (
        <Section key="google_sheets_connection" id="google_sheets_connection" eyebrow="Step 1 • Easy Guide" title="How to Connect Live Google Sheets to Power BI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1px solid #86efac' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#166534', lineHeight: 1.6 }}>
                <strong>Why do this?</strong> When people in your office enter sales or inventory into Google Sheets, your Power BI dashboard automatically gets the updates without anyone having to save or email Excel files!
              </p>
            </div>

            {/* 4 Simple Steps */}
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                Follow These 4 Easy Steps:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    action: 'Publish Google Sheet as CSV',
                    desc: 'Open your Google Sheet ➔ Click File ➔ Share ➔ Publish to web. Choose your sheet, select "Comma-separated values (.csv)", click Publish, and copy the link!'
                  },
                  {
                    step: 'Step 2',
                    action: 'Open Power BI & Paste Link',
                    desc: 'Open Power BI Desktop ➔ Click Get Data ➔ Web. Paste your Google Sheet CSV link and click OK.'
                  },
                  {
                    step: 'Step 3',
                    action: 'Click Load',
                    desc: 'Power BI will show a preview of your table. Click Load. Your Google Sheet table is now in Power BI!'
                  },
                  {
                    step: 'Step 4',
                    action: 'Watch It Update',
                    desc: 'Whenever anyone adds or edits a row in Google Sheets, click the Refresh button in Power BI. The new rows appear automatically!'
                  }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#16a34a', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>{s.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.95rem', display: 'block', marginBottom: '2px' }}>{s.action}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Link Box */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                🧪 Try with this Sample Google Sheet CSV Link:
              </span>
              <div style={{ background: '#0f172a', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <code style={{ color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  https://docs.google.com/spreadsheets/d/e/2PACX-1vT17aIqR6Q-sample-sales/pub?output=csv
                </code>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem', background: '#1e293b', padding: '2px 6px', borderRadius: '4px' }}>Sample CSV URL</span>
              </div>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('live_connections')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 2: Live Connections & DirectQuery <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 4: LIVE CONNECTIONS & DIRECTQUERY (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'live_connections' && (
        <Section key="live_connections" id="live_connections" eyebrow="Step 2 • Easy Guide" title="How to Connect to Big Databases with DirectQuery">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#1e40af', lineHeight: 1.6 }}>
                <strong>What is DirectQuery?</strong> Instead of downloading 10 million rows to your computer (which would crash Power BI), DirectQuery leaves the data inside the database. When you click a slicer, Power BI asks the database for the answer in less than a second!
              </p>
            </div>

            {/* 3 Simple Steps */}
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                How to Set Up DirectQuery in 3 Clicks:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    action: 'Click Get Data ➔ SQL Server',
                    desc: 'In Power BI Desktop Home ribbon, click Get Data and pick SQL Server (or Azure SQL / PostgreSQL).'
                  },
                  {
                    step: 'Step 2',
                    action: 'Select DirectQuery (Important!)',
                    desc: 'Type your Server Name. Under "Data Connectivity Mode", select the DirectQuery radio button (do NOT pick Import!).'
                  },
                  {
                    step: 'Step 3',
                    action: 'Select Your Table & Click Load',
                    desc: 'Check the bottom right corner of Power BI. You will see: "Storage Mode: DirectQuery". Notice your .pbix file stays tiny (under 1MB) because data stays on the server!'
                  }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>{s.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.95rem', display: 'block', marginBottom: '2px' }}>{s.action}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connecting Live Crypto API */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                🌐 Bonus: Connecting to a Live Web API (Bitcoin Live Price)
              </h4>
              <p style={{ margin: '0 0 0.75rem 0', color: '#475569', fontSize: '0.88rem' }}>
                You can also connect Power BI to live web feeds that change every second:
              </p>
              <ol style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
                <li>Click <strong>Get Data ➔ Web</strong>.</li>
                <li>Paste this free live Bitcoin API URL: <code>https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT</code></li>
                <li>Click <strong>Load</strong>. Power BI now has the real-time price!</li>
              </ol>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('realtime_streaming')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 3: Real-Time Data Streaming <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 5: REAL-TIME STREAMING (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'realtime_streaming' && (
        <Section key="realtime_streaming" id="realtime_streaming" eyebrow="Step 3 • Easy Guide" title="Real-Time Data Streaming (Live Telemetry)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ background: '#fef3c7', padding: '1.25rem', borderRadius: '12px', border: '1px solid #fde68a' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#b45309', lineHeight: 1.6 }}>
                <strong>What is Real-Time Streaming?</strong> Think of a live cricket score or heart-rate monitor in a hospital. Numbers update second-by-second automatically without clicking any refresh button!
              </p>
            </div>

            {/* IMPORTANT NOTE: CLOUD POWER BI SERVICE ONLY */}
            <div style={{ background: '#eff6ff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '2px solid #3b82f6', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#3b82f6', color: '#ffffff', padding: '8px', borderRadius: '10px', flexShrink: 0, marginTop: '2px' }}>
                <Globe size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a' }}>
                  ☁️ Critical Rule: Streaming Data is ONLY Available in Power BI Cloud (Service), NOT in Desktop Mode!
                </h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#1e40af', lineHeight: 1.6 }}>
                  You <strong>cannot create pure Streaming Datasets inside Power BI Desktop</strong> on your laptop. 
                  Streaming datasets require Microsoft's live cloud memory buffer, which is <strong>only available online at <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>app.powerbi.com</code> (Power BI Service)</strong>. 
                  Always use your web browser to create and view real-time streaming tiles!
                </p>
              </div>
            </div>

            {/* Live Widget */}
            <LiveStreamSimulator />

            {/* Simple Steps in Power BI Service */}
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                How to Set Up a Streaming Dataset in 3 Easy Steps:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    action: 'Go to Power BI Service (app.powerbi.com)',
                    desc: 'Log in and open My Workspace. Click + New ➔ Streaming dataset ➔ Choose API ➔ Click Next.'
                  },
                  {
                    step: 'Step 2',
                    action: 'Name Your Fields',
                    desc: 'Give it a name (e.g. "Live_Temperature"). Add fields: timestamp (DateTime) and temperature (Number).'
                  },
                  {
                    step: 'Step 3',
                    action: 'Copy Your Push URL',
                    desc: 'Power BI gives you a private Push URL. Any app, sensor, or Python script can now send live numbers to this URL every second!'
                  }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#f59e0b', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>{s.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.95rem', display: 'block', marginBottom: '2px' }}>{s.action}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Python Script */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                🐍 Simple Python Script to Push Live Numbers
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#64748b' }}>
                Run this small script on your computer to push a random temperature reading every second:
              </p>

              <CodeBlock
                language="python"
                title="simple_live_stream.py"
                code={`import requests, time, random
from datetime import datetime

# Paste your Power BI Push URL here:
URL = "YOUR_POWER_BI_PUSH_URL_HERE"

while True:
    data = [{
        "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "temperature": round(random.uniform(70.0, 95.0), 1)
    }]
    requests.post(URL, json=data)
    print("Sent live temperature:", data[0]['temperature'])
    time.sleep(1)  # wait 1 second`}
              />
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('python_powerbi')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 4: Python in Power BI <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 6: PYTHON IN POWER BI (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'python_powerbi' && (
        <Section key="python_powerbi" id="python_powerbi" eyebrow="Step 4 • Easy Guide" title="Using Python in Power BI Made Simple">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ background: '#f3e8ff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #d8b4fe' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#581c87', lineHeight: 1.6 }}>
                <strong>Why use Python?</strong> Power BI's built-in charts are great, but with 5 lines of Python, you can create colorful correlation heatmaps, clean data automatically, and impress your boss!
              </p>
            </div>

            {/* 3 Simple Steps */}
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
                How to Add a Python Visual in 3 Steps:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    action: 'Click the Python Icon (Py)',
                    desc: 'In Power BI Visualizations pane on the right, click the "Py" icon to add a Python visual to your report.'
                  },
                  {
                    step: 'Step 2',
                    action: 'Drag Your Columns into Values',
                    desc: 'Drag the columns you want to visualize (like Sales, Profit, Discount) into the Values box.'
                  },
                  {
                    step: 'Step 3',
                    action: 'Paste 5 Lines of Code & Click Run',
                    desc: 'In the Python script editor at the bottom, paste the code below and click the small Play button ▶️!'
                  }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#8b5cf6', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>{s.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.95rem', display: 'block', marginBottom: '2px' }}>{s.action}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Code Block */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                📊 The 5-Line Heatmap Script (Copy & Paste):
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#64748b' }}>
                This creates a colorful heatmap showing how your columns relate to each other:
              </p>

              <CodeBlock
                language="python"
                title="Python Visual Script"
                code={`import matplotlib.pyplot as plt
import seaborn as sns

# dataset is automatically created by Power BI
sns.heatmap(dataset.corr(), annot=True, cmap='coolwarm')
plt.show()  # renders the chart in Power BI!`}
              />
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('assignment_day8')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Day 8 Mini Project & Assignment <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 7: DAY 8 MINI PROJECT & ASSIGNMENT
      ───────────────────────────────────────────── */}
      {normalizedTab === 'assignment_day8' && (
        <Section key="assignment_day8" id="assignment_day8" eyebrow="Practical Homework" title="Day 8 Mini Project: Build Your Live Dashboard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{
              background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
              borderRadius: '20px',
              padding: '2rem',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.5rem 0', fontWeight: 900 }}>
                🎯 Your Mission: Build a Simple Live Dashboard
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#a7f3d0', margin: 0, lineHeight: 1.6 }}>
                Create a 1-page Power BI dashboard combining a live Google Sheet and a Python chart!
              </p>
            </div>

            {/* Checklist */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                ✅ Simple 3-Task Checklist:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { num: '1', text: 'Connect Power BI to a live Google Sheet (using published CSV link).' },
                  { num: '2', text: 'Add 1 or 2 visual cards (e.g. Total Sales and Total Orders).' },
                  { num: '3', text: 'Add a Python visual (Heatmap or Bar chart) or a Bitcoin live price card.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                      {item.num}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Action Button */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onNavigate('powerbi_module9', 'ai_retail_capstone')}
                style={{
                  background: '#facc15',
                  color: '#0f172a',
                  border: 'none',
                  padding: '1rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Day 9: Final Capstone Projects 🚀
              </button>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
