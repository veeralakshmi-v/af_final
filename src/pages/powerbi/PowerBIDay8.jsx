import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, Radio, Activity, Terminal, FileSpreadsheet, Database, Copy, Check, 
  ExternalLink, Play, Pause, RefreshCw, Sliders, CheckCircle, AlertTriangle, 
  Layers, Zap, TrendingUp, Clock, ArrowRight, Code, Laptop, Server, Globe, Wifi, 
  PieChart, BarChart2, ShieldAlert, Sparkles, HelpCircle
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
   INTERACTIVE LIVE STREAMING SIMULATOR
───────────────────────────────────────────── */
const LiveStreamSimulator = () => {
  const [streaming, setStreaming] = useState(false);
  const [ticks, setTicks] = useState([]);
  const [streamCount, setStreamCount] = useState(0);
  const [currentBtc, setCurrentBtc] = useState(67450.20);
  const [orderVolume, setOrderVolume] = useState(14);

  useEffect(() => {
    let interval = null;
    if (streaming) {
      interval = setInterval(() => {
        const delta = (Math.random() - 0.48) * 120;
        const newPrice = Math.max(60000, Number((currentBtc + delta).toFixed(2)));
        const newVolume = Math.floor(Math.random() * 40) + 5;
        setCurrentBtc(newPrice);
        setOrderVolume(newVolume);
        setStreamCount(prev => prev + 1);

        const newTick = {
          time: new Date().toLocaleTimeString(),
          price: newPrice,
          volume: newVolume,
          change: delta >= 0 ? `+$${delta.toFixed(2)}` : `-$${Math.abs(delta).toFixed(2)}`,
          isUp: delta >= 0
        };
        setTicks(prev => [newTick, ...prev.slice(0, 4)]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [streaming, currentBtc]);

  return (
    <div style={{ background: '#0f172a', borderRadius: '18px', padding: '1.75rem', color: '#ffffff', marginBottom: '2rem', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8' }}>
            Interactive Demo
          </span>
          <h4 style={{ margin: '4px 0 0 0', fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color={streaming ? '#10b981' : '#94a3b8'} className={streaming ? 'animate-pulse' : ''} />
            Real-Time Push Stream Producer Simulation
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setStreaming(!streaming)}
            style={{
              background: streaming ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              color: '#ffffff',
              padding: '0.6rem 1.4rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: streaming ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            {streaming ? <Pause size={15} /> : <Play size={15} />}
            {streaming ? 'Stop Live Emitter' : 'Start Live Stream Simulation'}
          </button>
          {ticks.length > 0 && (
            <button
              type="button"
              onClick={() => { setTicks([]); setStreamCount(0); }}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '0.6rem 0.9rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1rem', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Live Market Price</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#f8fafc', marginTop: '4px' }}>
            ${currentBtc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span style={{ fontSize: '0.78rem', color: streaming ? '#10b981' : '#64748b', fontWeight: 700 }}>
            {streaming ? '● Live WebSocket/REST feed active' : '○ Stream paused'}
          </span>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1rem', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Orders Pushed</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>
            {streamCount} payload packets
          </div>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Frequency: 1.0 sec tick</span>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1rem', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Real-Time Volume</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#a855f7', marginTop: '4px' }}>
            {orderVolume} BTC / s
          </div>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Latency: ~120ms</span>
        </div>
      </div>

      <div style={{ background: '#090d16', borderRadius: '10px', padding: '0.9rem', border: '1px solid #1e293b' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          Live Payload Log (What Power BI REST API receives):
        </span>
        {ticks.length === 0 ? (
          <div style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic', padding: '0.5rem 0' }}>
            Click "Start Live Stream Simulation" above to observe real-time payload emission...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ticks.map((t, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', fontFamily: 'monospace', padding: '4px 8px', borderRadius: '6px', background: idx === 0 ? 'rgba(56, 189, 248, 0.08)' : 'transparent' }}>
                <span style={{ color: '#94a3b8' }}>[{t.time}] POST /api/v1.0/myorg/datasets/.../rows</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>{`{"price": ${t.price}, "volume": ${t.volume}}`}</span>
                <span style={{ color: t.isUp ? '#10b981' : '#ef4444', fontWeight: 800 }}>{t.change}</span>
              </div>
            ))}
          </div>
        )}
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

  // Safe fallback: Map any legacy tabs (ai_prompt_engineering, etc.) gracefully
  const normalizedTab = [
    'intro_day8',
    'google_sheets_connection',
    'live_connections',
    'realtime_streaming',
    'python_powerbi',
    'assignment_day8'
  ].includes(activeTab) 
    ? activeTab 
    : (activeTab === 'python_powerbi' ? 'python_powerbi' : 'intro_day8');

  return (
    <AnimatePresence mode="wait">

      {/* ─────────────────────────────────────────────
          TAB 1: DAY 8 OVERVIEW
      ───────────────────────────────────────────── */}
      {normalizedTab === 'intro_day8' && (
        <Section key="intro_day8" id="intro_day8" eyebrow="Day 8 Architecture Overview" title="Enterprise Live Connections, Streaming & Python Ingestion">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Hero Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(67, 56, 202, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 800, marginBottom: '1.2rem', backdropFilter: 'blur(8px)' }}>
                  <Radio size={14} color="#a5b4fc" /> Day 8 • Modern BI Architecture
                </div>
                <h3 style={{ fontSize: '2.2rem', margin: '0 0 1rem 0', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  From Static Spreadsheets to Live Real-Time Intelligence
                </h3>
                <p style={{ fontSize: '1.05rem', color: '#c7d2fe', margin: 0, lineHeight: 1.7, maxWidth: '780px' }}>
                  In professional production environments, reports cannot rely on manually copying static CSV files. Today, you will master connecting Power BI directly to <strong>live Google Sheets</strong>, querying enterprise <strong>SQL databases via DirectQuery</strong>, configuring <strong>second-by-second Real-Time Streaming Datasets</strong>, and scripting <strong>Python for advanced statistical visuals</strong>.
                </p>
              </div>
            </div>

            {/* Why Static Data is Not Enough */}
            <div style={{ background: '#f8fafc', borderLeft: '5px solid #6366f1', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} color="#6366f1" /> The Real-World Business Need for Dynamic Connectivity
              </h4>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                When sales reps update opportunities in <strong>Google Sheets</strong>, inventory managers scan barcode items on warehouse floors, or stock markets fluctuate every second, executives need decisions based on <strong>now</strong>, not last week. Mastering live ingestion separates entry-level dashboard designers from full-stack BI data engineers.
              </p>
            </div>

            {/* The 4 Dynamic Ingestion Pillars */}
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.25rem' }}>
                The 4 Production Ingestion Pillars You Will Master Today:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {[
                  {
                    icon: <FileSpreadsheet size={24} color="#10b981" />,
                    title: '1. Live Google Sheets',
                    badge: 'Collaborative Sync',
                    desc: 'Connect via published CSV web links & native OAuth2 connectors so any Google Sheet edit automatically reflects in the dashboard.'
                  },
                  {
                    icon: <Radio size={24} color="#3b82f6" />,
                    title: '2. Live & DirectQuery',
                    badge: 'Zero Local Storage',
                    desc: 'Connect to live REST APIs and enterprise SQL databases where every user slicer click generates instant backend queries without 1GB RAM limits.'
                  },
                  {
                    icon: <Activity size={24} color="#f59e0b" />,
                    title: '3. Real-Time Streaming',
                    badge: 'Sub-Second Latency',
                    desc: 'Create Push & Streaming Datasets in Power BI Service and pipe live simulated sensor/order telemetry with Python emitters.'
                  },
                  {
                    icon: <Terminal size={24} color="#8b5cf6" />,
                    title: '4. Python in Power BI',
                    badge: 'Advanced Visuals',
                    desc: 'Harness Pandas for complex matrix transformations and Matplotlib/Seaborn to generate high-end heatmaps, pairplots, and distribution curves.'
                  }
                ].map((pillar, i) => (
                  <div key={i} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>{pillar.icon}</div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '12px' }}>{pillar.badge}</span>
                      </div>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{pillar.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Mode Comparison Matrix */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '18px', overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: 900 }}>
                  📊 Storage Mode Decision Matrix: When to Use What?
                </h4>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 800, color: '#334155' }}>Feature</th>
                      <th style={{ padding: '12px 16px', fontWeight: 800, color: '#16a34a' }}>Google Sheet Sync</th>
                      <th style={{ padding: '12px 16px', fontWeight: 800, color: '#2563eb' }}>DirectQuery</th>
                      <th style={{ padding: '12px 16px', fontWeight: 800, color: '#d97706' }}>Streaming Dataset</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>Where Data Lives</td>
                      <td style={{ padding: '12px 16px', color: '#16a34a' }}>Google Drive Cloud</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb' }}>Source SQL Server / Cloud DB</td>
                      <td style={{ padding: '12px 16px', color: '#d97706' }}>Azure Streaming Memory Cache</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>Refresh Latency</td>
                      <td style={{ padding: '12px 16px', color: '#16a34a' }}>Hourly / Daily Scheduled</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb' }}>Instant per visual click</td>
                      <td style={{ padding: '12px 16px', color: '#d97706' }}><strong>Sub-second (1s push)</strong></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>Power Query Transformation</td>
                      <td style={{ padding: '12px 16px', color: '#16a34a' }}>Full Power Query M Support</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb' }}>Query Folding Only (limited)</td>
                      <td style={{ padding: '12px 16px', color: '#d97706' }}>Pre-shaped REST JSON Payload</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>Ideal Use Case</td>
                      <td style={{ padding: '12px 16px', color: '#16a34a' }}>Operations, HR rosters, budgets</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb' }}>Multi-million row enterprise DBs</td>
                      <td style={{ padding: '12px 16px', color: '#d97706' }}>Crypto/Stock ticker, IoT factory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('google_sheets_connection')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 1: Google Sheets Connection <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 2: GOOGLE SHEETS CONNECTION (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'google_sheets_connection' && (
        <Section key="google_sheets_connection" id="google_sheets_connection" eyebrow="Live Cloud Data Integration • Method 1" title="Step-by-Step: Connecting Live Google Sheets to Power BI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Google Sheets is the primary collaborative tool used by finance, sales, and operations teams worldwide. In this step-by-step module, you will learn how to connect Power BI to live Google Sheets so that whenever any team member adds or updates a row in the Google Sheet, the Power BI dashboard automatically syncs!
            </p>

            {/* METHOD 1: PUBLISHED WEB CSV LINK */}
            <div style={{ background: '#f0fdf4', borderRadius: '18px', padding: '2rem', border: '2px solid #86efac' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#166534', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                🌟 Method 1 (Recommended • Enterprise Standard)
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#14532d' }}>
                The "Publish to Web CSV" Method (Fastest, Zero Credential Friction)
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', color: '#166534', fontSize: '0.95rem', lineHeight: 1.6 }}>
                By publishing a specific Google Sheet tab as a live CSV web endpoint, Power BI can query it over standard HTTP. It auto-updates and eliminates corporate OAuth login errors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    title: 'Prepare Your Google Sheet Data',
                    desc: 'Ensure Row 1 contains clean, single-row column headers (e.g. Order_ID, Customer, Region, Sales_Amount). Avoid merged cells or empty header titles.'
                  },
                  {
                    step: 'Step 2',
                    title: 'Publish Sheet as CSV Link',
                    desc: 'In your Google Sheet, click File ➔ Share ➔ Publish to web. In the dropdown, switch from "Entire Document" to your specific sheet tab (e.g., "Sheet1"). Change "Web page" to "Comma-separated values (.csv)". Click Publish and copy the generated link.'
                  },
                  {
                    step: 'Step 3',
                    title: 'Connect in Power BI Desktop',
                    desc: 'Open Power BI Desktop. In the Home ribbon, click Get Data ➔ Web. Paste the published Google Sheet CSV URL into the dialog box and click OK.'
                  },
                  {
                    step: 'Step 4',
                    title: 'Power Query Verification & Types',
                    desc: 'Power BI opens the Navigator. Verify the rows, then click Transform Data. Ensure headers are promoted (Use First Row as Headers) and data types (Dates, Decimals, Text) are correctly assigned.'
                  },
                  {
                    step: 'Step 5',
                    title: 'Publish & Setup Automated Cloud Refresh',
                    desc: 'Click Close & Apply. Publish the report to Power BI Service. In dataset settings under Data Source Credentials, set Authentication Method to Anonymous. Enable Scheduled Refresh (e.g. every 1 hour)!'
                  }
                ].map((s, i) => (
                  <div key={i} style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #bbf7d0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#16a34a', color: '#ffffff', fontWeight: 900, fontSize: '0.8rem', padding: '4px 10px', borderRadius: '8px', flexShrink: 0, marginTop: '2px' }}>
                      {s.step}
                    </span>
                    <div>
                      <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{s.title}</h5>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Testing Sandbox Box */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🧪 Try It Right Now: Sample Live Google Sheet Link for Practice
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
                You can copy this official sample live CSV Google Sheet link and paste it into Power BI <strong>Get Data ➔ Web</strong> right away:
              </p>
              <div style={{ background: '#0f172a', padding: '0.85rem 1.25rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <code style={{ color: '#38bdf8', fontSize: '0.82rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  https://docs.google.com/spreadsheets/d/e/2PACX-1vT17aIqR6Q-Q-7GqYQd6vL-sample-sales/pub?output=csv
                </code>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', background: '#1e293b', padding: '3px 8px', borderRadius: '6px' }}>CSV Web URL Format</span>
              </div>
            </div>

            {/* METHOD 2: NATIVE GOOGLE SHEETS CONNECTOR */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0e7ff', color: '#3730a3', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                🔑 Method 2 (OAuth2 Authentication)
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#1e1b4b' }}>
                The Native Power BI "Google Sheets" Connector
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                For private sheets that cannot be published to the web, use Power BI's native Google account sign-in connector:
              </p>

              <ol style={{ paddingLeft: '1.3rem', margin: '0 0 1.5rem 0', fontSize: '0.92rem', color: '#334155', lineHeight: 1.8 }}>
                <li>In Power BI Desktop, click <strong>Get Data ➔ More...</strong></li>
                <li>In the search box, type <strong>Google Sheets</strong> and click <strong>Connect</strong>.</li>
                <li>Paste the standard browser URL of your Google Sheet: <code>https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit</code></li>
                <li>Click <strong>Sign in</strong>. A browser popup will open asking you to authenticate with your Google account.</li>
                <li>Grant Power BI read access, return to Power BI Desktop, and click <strong>Connect</strong>.</li>
                <li>Select the desired sheet tabs from the Navigator pane and load them into your data model!</li>
              </ol>

              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', color: '#92400e', fontSize: '0.88rem' }}>
                <strong>⚠️ Pro-Tip for Cloud Refresh:</strong> When refreshing via Power BI Service in Method 2, make sure OAuth2 credentials are configured under dataset settings with privacy level set to <em>Organizational</em> or <em>Public</em>.
              </div>
            </div>

            {/* METHOD 3: PYTHON SCRIPT INGESTION FROM GOOGLE SHEETS */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f3e8ff', color: '#6b21a8', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                🐍 Method 3 (Python Power Query Script)
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#3b0764' }}>
                Direct Python Pandas Google Sheet Exporter
              </h3>
              <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                You can also use Python inside Power BI to fetch Google Sheets directly into a Pandas DataFrame using the export URL:
              </p>

              <CodeBlock
                language="python"
                title="Python Google Sheets Extractor (Get Data ➔ Python Script)"
                code={`import pandas as pd

# Replace with your Google Sheet ID (found in the URL)
SHEET_ID = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
SHEET_NAME = "Sheet1"

# Construct the live CSV export endpoint
csv_url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}"

# Read into Pandas DataFrame
df = pd.read_csv(csv_url)

# Display columns
print("Successfully loaded columns:", df.columns.tolist())`}
              />
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('live_connections')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 2: Live Connections & DirectQuery <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 3: LIVE CONNECTIONS & DIRECTQUERY
      ───────────────────────────────────────────── */}
      {normalizedTab === 'live_connections' && (
        <Section key="live_connections" id="live_connections" eyebrow="Enterprise Storage Architecture • Method 2" title="Step-by-Step: Live Web APIs, Databases & DirectQuery">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              When your company database holds tens of millions of rows, or you need to display live currency rates, stock prices, or ERP order statuses, downloading files is impossible. In this section, you will learn how <strong>DirectQuery</strong> and <strong>Live REST Web APIs</strong> work.
            </p>

            {/* DirectQuery Explained Visually */}
            <div style={{ background: '#eff6ff', borderRadius: '18px', padding: '2rem', border: '1px solid #bfdbfe' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={20} color="#2563eb" /> How DirectQuery Operates Behind the Scenes
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Unlike Import Mode (which loads all rows into your PC RAM), DirectQuery stores <strong>zero data rows</strong> inside your <code>.pbix</code> file. Only metadata and relationship diagrams are saved.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #dbeafe' }}>
                  <strong style={{ color: '#2563eb', display: 'block', marginBottom: '4px', fontSize: '1rem' }}>1. User Clicks a Slicer Filter</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>User selects "Region: South" and "Year: 2026" on the dashboard report canvas.</span>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #dbeafe' }}>
                  <strong style={{ color: '#2563eb', display: 'block', marginBottom: '4px', fontSize: '1rem' }}>2. Power BI Generates SQL</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>Power BI automatically translates visual requirements into a native SQL query: <code>SELECT SUM(Amount) FROM Orders WHERE Region='South'...</code></span>
                </div>
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #dbeafe' }}>
                  <strong style={{ color: '#2563eb', display: 'block', marginBottom: '4px', fontSize: '1rem' }}>3. Live Server Returns Answer</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>Your SQL Server / Oracle / PostgreSQL executes the query in milliseconds and returns only the final aggregated numbers!</span>
                </div>
              </div>
            </div>

            {/* STEP BY STEP: CONNECTING DIRECTQUERY TO SQL DATABASE */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step-by-Step: Configuring DirectQuery to SQL Database
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    action: 'Open Database Connector',
                    detail: 'In Power BI Desktop ribbon, click Get Data ➔ SQL Server (or PostgreSQL / MySQL / Azure SQL).'
                  },
                  {
                    step: 'Step 2',
                    action: 'Select DirectQuery Radio Button',
                    detail: 'Enter your Server hostname and Database name. Under "Data Connectivity mode", select DirectQuery (IMPORTANT: Do NOT select Import!).'
                  },
                  {
                    step: 'Step 3',
                    action: 'Specify Credentials & Encryption',
                    detail: 'Authenticate with Windows Authentication or Database User/Password. Enable encrypted SSL connection for security.'
                  },
                  {
                    step: 'Step 4',
                    action: 'Verify Storage Mode in Status Bar',
                    detail: 'Once loaded, glance at the bottom-right corner of Power BI Desktop. You will see: "Storage Mode: DirectQuery". Notice there is no "Data View" tab on the left sidebar because data stays in the server!'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '6px' }}>{item.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.98rem', display: 'block', marginBottom: '4px' }}>{item.action}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP BY STEP: CONNECTING LIVE REST API */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step-by-Step: Connecting to Live Public REST APIs (Crypto & Financial Feeds)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                You can connect Power BI to live JSON REST APIs that broadcast live exchange rates and pricing updates every few seconds.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>📡 Recommended Live API Endpoints for Practice:</strong>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.7 }}>
                  <li><strong>Coinbase BTC Ticker:</strong> <code>https://api.exchange.coinbase.com/products/BTC-USD/ticker</code> (Real-time Bitcoin trades)</li>
                  <li><strong>Binance Spot Ticker:</strong> <code>https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT</code> (Real-time live prices)</li>
                  <li><strong>Open-Meteo Weather:</strong> <code>https://api.open-meteo.com/v1/forecast?latitude=9.92&longitude=77.47&current_weather=true</code> (Live temperature & weather)</li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Step 1:</strong> In Power BI, click <strong>Get Data ➔ Web</strong>. Paste the API link and click OK.
                </div>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Step 2:</strong> Power Query opens displaying a JSON <em>Record</em>. In the ribbon, click <strong>To Table</strong> to convert the record into a column.
                </div>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Step 3:</strong> Click <strong>Transform ➔ Transpose</strong> so attributes become column headers. Promote headers (<em>Use First Row as Headers</em>).
                </div>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Step 4:</strong> Change column data types (e.g. <code>price</code> ➔ Decimal Number, <code>time</code> ➔ Date/Time). Click <strong>Close & Apply</strong>!
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('realtime_streaming')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 3: Real-Time Data Streaming <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 4: REAL-TIME DATA STREAMING (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'realtime_streaming' && (
        <Section key="realtime_streaming" id="realtime_streaming" eyebrow="Sub-Second Telemetry • Method 3" title="Step-by-Step: Real-Time Data Streaming & Automatic Page Refresh">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Real-Time Streaming in Power BI is engineered for scenarios requiring <strong>instantaneous visibility</strong> (sub-second latency) — such as monitoring active factory IoT sensors, live hospital vitals, delivery vehicle GPS coordinates, or high-frequency trading rooms.
            </p>

            {/* Interactive Simulator */}
            <LiveStreamSimulator />

            {/* 3 STREAMING DATASET FLAVORS */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>
                The 3 Flavors of Real-Time Datasets in Power BI
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #f59e0b' }}>
                  <strong style={{ color: '#b45309', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>1. Push Dataset</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>Data is pushed into an underlying Azure SQL database. It persists historical data, supports full DAX measures, and can be used in standard reports.</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #10b981' }}>
                  <strong style={{ color: '#047857', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>2. Streaming Dataset</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>Stores data only in a 1-hour rolling RAM cache. Ultra-fast sub-second latency! Best for live dashboard tiles that show only the current minute's telemetry.</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #8b5cf6' }}>
                  <strong style={{ color: '#6d28d9', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>3. PubNub Streaming</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>Power BI connects directly to the PubNub messaging bus to stream third-party high-scale public data channels with zero server maintenance.</span>
                </div>
              </div>
            </div>

            {/* STEP-BY-STEP GUIDE: CREATING STREAMING DATASET IN POWER BI SERVICE */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step-by-Step: Creating a Real-Time Streaming Dataset in Power BI Service
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Step 1',
                    title: 'Navigate to Your Workspace in Power BI Service',
                    body: 'Log in to https://app.powerbi.com. In the left navigation bar, open your workspace (e.g. "My Workspace" or your company team workspace).'
                  },
                  {
                    step: 'Step 2',
                    title: 'Create New Streaming Dataset',
                    body: 'Click the "+ New" button in the upper toolbar ➔ Select "Streaming dataset".'
                  },
                  {
                    step: 'Step 3',
                    title: 'Choose API Source & Define Schema',
                    body: 'Select "API" and click Next. Name your dataset (e.g., "Live_Factory_Telemetry"). Define the schema fields: Timestamp (DateTime), Sensor_Name (Text), Temperature (Number), Pressure (Number), Units_Produced (Number).'
                  },
                  {
                    step: 'Step 4',
                    title: 'Enable Historic Data Analysis (Crucial!)',
                    body: 'Toggle the switch labeled "Historic data analysis" to ON! This turns your streaming dataset into a hybrid Push Dataset so Power BI saves history and allows standard report visuals!'
                  },
                  {
                    step: 'Step 5',
                    title: 'Copy the Push URL Endpoint',
                    body: 'Click "Create". Power BI will generate a unique HTTPS Push URL (e.g. https://api.powerbi.com/beta/YOUR_TENANT/datasets/.../rows?key=...). Copy this URL — your Python script will push data to it!'
                  }
                ].map((s, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#f59e0b', color: '#000000', fontWeight: 900, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '6px' }}>{s.step}</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.98rem', display: 'block', marginBottom: '4px' }}>{s.title}</strong>
                      <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>{s.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PYTHON STREAMING PRODUCER CODE */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Python Producer Script: Streaming Live Data into Power BI Every Second
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Run this lightweight Python script on your machine. It continuously emits simulated live telemetry packets and pushes them to your Power BI streaming endpoint:
              </p>

              <CodeBlock
                language="python"
                title="live_streaming_producer.py"
                code={`import requests
import time
import random
from datetime import datetime, timezone

# 1. Paste your Power BI Service Streaming Dataset Push URL here:
POWER_BI_PUSH_URL = "https://api.powerbi.com/beta/YOUR_TENANT_ID/datasets/YOUR_DATASET_ID/rows?key=YOUR_KEY"

print("🚀 Starting Live Real-Time Stream to Power BI...")
print("Press Ctrl + C to stop the producer at any time.\\n")

try:
    while True:
        # 2. Generate simulated live telemetry payload
        payload = [{
            "Timestamp": datetime.now(timezone.utc).isoformat(),
            "Sensor_Name": "Turbine_Alpha_01",
            "Temperature": round(random.uniform(65.0, 95.0), 2),
            "Pressure": round(random.uniform(100.0, 140.0), 2),
            "Units_Produced": random.randint(10, 50)
        }]
        
        # 3. HTTP POST request to Power BI REST API
        response = requests.post(POWER_BI_PUSH_URL, json=payload)
        
        if response.status_code == 200:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Streamed: Temp={payload[0]['Temperature']}°C | Units={payload[0]['Units_Produced']}")
        else:
            print(f"⚠️ Error {response.status_code}: {response.text}")
            
        # 4. Wait 1 second before emitting next telemetry packet
        time.sleep(1)

except KeyboardInterrupt:
    print("\\n🛑 Live stream producer stopped gracefully.")`}
              />
            </div>

            {/* AUTOMATIC PAGE REFRESH (APR) */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="#6366f1" /> Automatic Page Refresh (APR) in Power BI Desktop
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                If you are using DirectQuery or live database connections, you can turn on <strong>Automatic Page Refresh (APR)</strong> so the entire report canvas redraws itself periodically:
              </p>

              <ol style={{ paddingLeft: '1.3rem', margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.8 }}>
                <li>Click anywhere on the blank canvas background (so no single chart is selected).</li>
                <li>In the right-hand sidebar, open the <strong>Format page</strong> pane (paint roller icon).</li>
                <li>Scroll down to find <strong>Page refresh</strong> and toggle it to <strong>On</strong>.</li>
                <li>Choose refresh type: <strong>Auto page refresh</strong> and set the duration (e.g. <em>Every 5 seconds</em> or <em>10 seconds</em>).</li>
                <li>Now watch your charts continuously poll the backend and refresh numbers live on screen!</li>
              </ol>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('python_powerbi')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Step 4: Python in Power BI <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 5: PYTHON IN POWER BI (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'python_powerbi' && (
        <Section key="python_powerbi" id="python_powerbi" eyebrow="Advanced Scripting & Science Visuals • Method 4" title="Step-by-Step: Python Integration in Power BI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Python expands Power BI with data science capabilities that native BI tools cannot replicate: advanced statistical modeling, natural language cleaning, and specialized scientific visuals like Seaborn correlation heatmaps, violin plots, and density curves.
            </p>

            {/* STEP 1: PREREQUISITES & SETUP */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '18px', padding: '2rem', color: '#ffffff' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                ⚙️ Step 1 • Local Python Setup
              </div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#f8fafc' }}>
                Installing Python Libraries on Your Computer
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Before Power BI can run Python code, install Python (version 3.9 - 3.12) on your PC and install the standard data science trio:
              </p>

              <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '0.9rem', color: '#4ade80', marginBottom: '1.25rem' }}>
                pip install pandas matplotlib seaborn scipy
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '6px' }}>Configure Power BI Scripting Directory:</strong>
                <ol style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7 }}>
                  <li>In Power BI Desktop, open <strong>File ➔ Options and Settings ➔ Options</strong>.</li>
                  <li>In the left panel, click <strong>Python scripting</strong>.</li>
                  <li>Verify that <strong>Detected Python home directories</strong> points to your installed Python environment (e.g. <code>C:\Python311</code> or Anaconda). Click OK.</li>
                </ol>
              </div>
            </div>

            {/* STEP 2: LOAD DATA VIA PYTHON SCRIPT */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step 2: Python as a Data Source (Get Data ➔ Python Script)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                You can write a Python script directly inside Power BI to generate test datasets, calculate simulations, or scrape web tables:
              </p>

              <CodeBlock
                language="python"
                title="Get Data ➔ Other ➔ Python script"
                code={`import pandas as pd
import numpy as np

# Set random seed for reproducible numbers
np.random.seed(42)

# Generate a synthetic retail dataset with 100 transactions
n = 100
categories = ['Electronics', 'Home & Kitchen', 'Apparel', 'Books']

data = {
    'Transaction_ID': range(1001, 1001 + n),
    'Category': np.random.choice(categories, n),
    'Units_Sold': np.random.randint(1, 15, n),
    'Unit_Price': np.random.uniform(10.0, 450.0, n).round(2),
    'Customer_Rating': np.random.uniform(2.5, 5.0, n).round(1)
}

# Create the final Pandas DataFrame
df_retail_sales = pd.DataFrame(data)

# Add Total Revenue column
df_retail_sales['Total_Revenue'] = (df_retail_sales['Units_Sold'] * df_retail_sales['Unit_Price']).round(2)`}
              />

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #6366f1', fontSize: '0.88rem', color: '#334155' }}>
                <strong>🔍 How Power BI Reads This:</strong> Power BI scans the execution environment. Any variable that is a <code>pandas.DataFrame</code> (in this case <code>df_retail_sales</code>) will appear in the Navigator window as an importable table!
              </div>
            </div>

            {/* STEP 3: TRANSFORM DATA IN POWER QUERY WITH PYTHON */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step 3: Transforming Data with Python in Power Query
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Inside the Power Query Editor, click the <strong>Transform tab ➔ Run Python script</strong>. Power BI automatically feeds your current table into a DataFrame variable named <code>dataset</code>:
              </p>

              <CodeBlock
                language="python"
                title="Power Query ➔ Transform ➔ Run Python script"
                code={`# Power BI automatically preloads:
# dataset = pandas.DataFrame(...)

# 1. Fill missing numerical values with column median
dataset['Customer_Rating'] = dataset['Customer_Rating'].fillna(dataset['Customer_Rating'].median())

# 2. Add an automated High-Value Order Flag
dataset['High_Value_Flag'] = dataset['Total_Revenue'].apply(
    lambda x: 'High Value' if x >= 1000 else 'Standard'
)

# 3. Create a normalized Revenue Score
dataset['Revenue_ZScore'] = (
    (dataset['Total_Revenue'] - dataset['Total_Revenue'].mean()) / dataset['Total_Revenue'].std()
).round(2)`}
              />
            </div>

            {/* STEP 4: SEABORN & MATPLOTLIB VISUALS ON CANVAS */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step 4: Building Advanced Data Science Visuals (Seaborn Heatmap & Distributions)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Native Power BI does not have correlation matrix heatmaps. You can build one in 10 seconds using a <strong>Python Visual</strong>:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>Correlation Matrix Heatmap:</strong>
                  <CodeBlock
                    language="python"
                    title="Python Visual Canvas Code"
                    code={`import matplotlib.pyplot as plt
import seaborn as sns

# dataset contains the fields dragged into Values
# (Units_Sold, Unit_Price, Total_Revenue, Customer_Rating)

plt.figure(figsize=(6, 4))
sns.set_theme(style="white")

# Calculate Pearson correlation matrix
corr = dataset.corr(numeric_only=True)

# Generate Heatmap with color gradient & annotations
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=1)

plt.title('Feature Correlation Matrix', fontsize=12, fontweight='bold')
plt.tight_layout()
plt.show()`}
                  />
                </div>

                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>Violin Distribution Density Plot:</strong>
                  <CodeBlock
                    language="python"
                    title="Python Visual Canvas Code"
                    code={`import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(6, 4))
sns.set_theme(style="whitegrid")

# Create Violin Plot comparing Category vs Revenue
sns.violinplot(
    data=dataset, 
    x='Category', 
    y='Total_Revenue', 
    palette='muted',
    inner="quartile"
)

plt.title('Revenue Distribution by Category', fontsize=12, fontweight='bold')
plt.xticks(rotation=20)
plt.tight_layout()
plt.show()`}
                  />
                </div>
              </div>

              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', color: '#92400e', fontSize: '0.88rem' }}>
                <strong>⚠️ Golden Rule for Python Visuals in Power BI:</strong> Always end your script with <code>plt.show()</code>! Without <code>plt.show()</code>, the image cannot be rendered onto the report canvas.
              </div>
            </div>

            {/* Continue Button */}
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleContinue('assignment_day8')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  padding: '1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Proceed to Day 8 Mini Project & Assignment <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 6: DAY 8 MINI PROJECT & ASSIGNMENT
      ───────────────────────────────────────────── */}
      {normalizedTab === 'assignment_day8' && (
        <Section key="assignment_day8" id="assignment_day8" eyebrow="Practical Capstone Challenge" title="Day 8 Mini Project: Live Dynamic Dashboard & Python Visuals">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '18px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0', fontSize: '1.4rem', fontWeight: 900 }}>
                🏆 Day 8 Practical Assignment Mission
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                Build an executive-ready operational dashboard that integrates live cloud data and advanced statistical plotting:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    step: 'Task 1: Google Sheets Live Sync Pipeline',
                    desc: 'Create or open a Google Sheet with at least 15 rows of sales, roster, or inventory data. Publish it as a CSV link, connect in Power BI via Get Data ➔ Web, and verify that edits in your Google Sheet refresh in Power BI.'
                  },
                  {
                    step: 'Task 2: Live Public API Connection',
                    desc: 'Connect to the live Coinbase or Binance crypto ticker (or Open-Meteo weather API) using Get Data ➔ Web. Parse the JSON tree in Power Query and create a real-time KPI card showing the current price.'
                  },
                  {
                    step: 'Task 3: Automatic Page Refresh Configuration',
                    desc: 'Format your report canvas to enable Automatic Page Refresh (APR) every 5 or 10 seconds so the API KPI card updates dynamically.'
                  },
                  {
                    step: 'Task 4: Custom Python Seaborn Chart',
                    desc: 'Insert a Python Visual into the report canvas and generate either a Correlation Matrix Heatmap or a Violin/Distribution plot comparing your metrics.'
                  }
                ].map((task, idx) => (
                  <div key={idx} style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <CheckCircle size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>{task.step}</strong>
                      <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>{task.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Form Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              padding: '2.5rem',
              borderRadius: '20px',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(49, 46, 129, 0.25)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 1rem 0' }}>
                Ready to Submit Your Day 8 Homework?
              </h3>
              <p style={{ color: '#c7d2fe', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 1.75rem', lineHeight: 1.7 }}>
                Take a screenshot or record a quick demo of your live auto-refreshing dashboard with the embedded Python visual, upload your .pbix or link, and submit for instructor evaluation and unlock certification progress!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
