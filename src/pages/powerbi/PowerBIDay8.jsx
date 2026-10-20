import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, Radio, Activity, Terminal, FileSpreadsheet, Database, Copy, Check, 
  ExternalLink, Play, Pause, RefreshCw, Sliders, CheckCircle, AlertTriangle, 
  Layers, Zap, TrendingUp, Clock, ArrowRight, Code, Laptop, Server, Globe, Wifi, 
  PieChart, BarChart2, ShieldAlert, Sparkles, HelpCircle, Scale, Info, HardDrive, Cpu, CheckSquare
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
   Directly answers: "These 3 having only few data. How come this is live data?"
───────────────────────────────────────────── */
const LivePipelineVsStaticExplainer = () => {
  const [activeScenario, setActiveScenario] = useState('sheets'); // 'sheets' | 'directquery' | 'streaming'
  
  // Sheet demo state
  const [sheetRows, setSheetRows] = useState([
    { id: 'ORD-1001', rep: 'Karthik S.', region: 'South', category: 'Laptops', amount: 54000, time: '10:14 AM' },
    { id: 'ORD-1002', rep: 'Priya N.', region: 'West', category: 'Accessories', amount: 3200, time: '10:22 AM' },
    { id: 'ORD-1003', rep: 'Amit Verma', region: 'North', category: 'Smartphones', amount: 28500, time: '10:35 AM' },
    { id: 'ORD-1004', rep: 'Sneha Patel', region: 'East', category: 'Monitors', amount: 16800, time: '10:48 AM' },
    { id: 'ORD-1005', rep: 'Rahul Mehta', region: 'South', category: 'Smartphones', amount: 31200, time: '11:02 AM' },
  ]);
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [lastSyncTrace, setLastSyncTrace] = useState(null);

  // DirectQuery demo state
  const [selectedRegion, setSelectedRegion] = useState('South');
  const [queryRunning, setQueryRunning] = useState(false);
  const [queryLatency, setQueryLatency] = useState(28);

  const simulateAddSheetOrder = () => {
    setSyncingSheet(true);
    setTimeout(() => {
      const reps = ['Ananya Rao', 'Deepak Joshi', 'Kavita Menon', 'Vignesh K.', 'Rohan Roy'];
      const regions = ['South', 'North', 'West', 'East'];
      const categories = ['Smartphones', 'Laptops', 'Wearables', 'Printers', 'Audio'];
      const amounts = [4500, 12800, 24500, 38900, 62000, 8900];
      const newOrder = {
        id: `ORD-${1006 + sheetRows.length - 5}`,
        rep: reps[Math.floor(Math.random() * reps.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: 'Just now'
      };
      setSheetRows(prev => [newOrder, ...prev]);
      setLastSyncTrace({
        endpoint: 'GET https://docs.google.com/spreadsheets/d/.../pub?output=csv',
        status: '200 OK (Cloud Webhook Event)',
        duration: `${Math.floor(Math.random() * 120) + 210}ms`,
        addedRow: newOrder.id
      });
      setSyncingSheet(false);
    }, 400);
  };

  const handleRegionChange = (reg) => {
    setQueryRunning(true);
    setSelectedRegion(reg);
    setTimeout(() => {
      setQueryLatency(Math.floor(Math.random() * 25) + 20);
      setQueryRunning(false);
    }, 250);
  };

  const totalRevenue = sheetRows.reduce((acc, r) => acc + r.amount, 0);

  // DirectQuery metrics simulated over 3.45M rows
  const dqDataByRegion = {
    South: { rowsScanned: '3,450,000', matchedOrders: '842,120', revenue: '₹4,12,40,000', topCategory: 'Smartphones (42%)' },
    North: { rowsScanned: '3,450,000', matchedOrders: '721,500', revenue: '₹3,56,80,000', topCategory: 'Laptops (38%)' },
    West:  { rowsScanned: '3,450,000', matchedOrders: '984,300', revenue: '₹4,89,10,000', topCategory: 'Electronics (46%)' },
    East:  { rowsScanned: '3,450,000', matchedOrders: '512,400', revenue: '₹2,64,30,000', topCategory: 'Wearables (29%)' },
    All:   { rowsScanned: '3,450,000', matchedOrders: '3,060,320', revenue: '₹15,22,60,000', topCategory: 'Smartphones (39%)' }
  };

  return (
    <div style={{ background: '#0f172a', borderRadius: '20px', padding: '2rem', color: '#ffffff', marginBottom: '2rem', border: '1px solid #1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      
      {/* Title & Mystery Clarification */}
      <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
          <HelpCircle size={15} /> Critical Concept: Why Row Count ≠ Data Liveness
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.6rem 0', color: '#f8fafc' }}>
          "These Examples Have Only A Few Rows — How Come This is Live Data?"
        </h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.65 }}>
          A common confusion for new BI developers is seeing a tutorial table with 5 rows and asking: <em>"Is this really live?"</em> 
          <br /><strong style={{ color: '#38bdf8' }}>The Answer:</strong> <strong>Liveness is about the PIPELINE CONNECTION, NOT how many rows exist right now!</strong> A 10-million row CSV stored on your hard drive is 100% <em>static</em>. A Google Sheet with only 5 rows is 100% <em>live</em> because new rows flow into Power BI dynamically without re-uploading files!
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[
          { id: 'sheets', label: '1. Live Google Sheets Pipeline', icon: <FileSpreadsheet size={16} />, color: '#10b981' },
          { id: 'directquery', label: '2. DirectQuery on 3.4M SQL Rows', icon: <Server size={16} />, color: '#3b82f6' },
          { id: 'streaming', label: '3. Real-Time Streaming Buffer', icon: <Activity size={16} />, color: '#f59e0b' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveScenario(tab.id)}
            style={{
              background: activeScenario === tab.id ? 'rgba(255,255,255,0.1)' : '#1e293b',
              border: `1.5px solid ${activeScenario === tab.id ? tab.color : '#334155'}`,
              color: activeScenario === tab.id ? '#ffffff' : '#94a3b8',
              padding: '0.7rem 1.2rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ color: tab.color }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* SCENARIO 1: LIVE GOOGLE SHEETS */}
      {activeScenario === 'sheets' && (
        <div style={{ background: '#131d31', borderRadius: '14px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                Interactive Demonstration: Cloud Collaborative Ingestion
              </span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Watch a Live Google Sheet Dynamically Expand in Power BI
              </h4>
            </div>
            <button
              type="button"
              onClick={simulateAddSheetOrder}
              disabled={syncingSheet}
              style={{
                background: syncingSheet ? '#334155' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: syncingSheet ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              {syncingSheet ? <RefreshCw size={15} className="animate-spin" /> : <Zap size={15} />}
              {syncingSheet ? 'Syncing Cloud Payload...' : '+ Simulate Sales Rep Adding Order on Phone'}
            </button>
          </div>

          {/* Dynamic KPI Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Current Rows in Sheet</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>{sheetRows.length} Live Rows</div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Auto-synced via Web CSV</span>
            </div>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Total Revenue (DAX SUM)</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dynamic calculation</span>
            </div>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Power BI Desktop File (.pbix)</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>Zero File Mod.</div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No manual re-upload needed!</span>
            </div>
          </div>

          {/* Network Trace */}
          {lastSyncTrace && (
            <div style={{ background: '#090d16', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '1rem', fontSize: '0.8rem', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: '#38bdf8' }}>📡 [HTTP GET] {lastSyncTrace.endpoint}</span>
              <span style={{ color: '#10b981', fontWeight: 800 }}>{lastSyncTrace.status} ({lastSyncTrace.duration})</span>
            </div>
          )}

          {/* Table Preview */}
          <div style={{ overflowX: 'auto', maxHeight: '230px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left', background: '#090d16' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#cbd5e1' }}>
                  <th style={{ padding: '8px 12px' }}>Order ID</th>
                  <th style={{ padding: '8px 12px' }}>Sales Rep</th>
                  <th style={{ padding: '8px 12px' }}>Region</th>
                  <th style={{ padding: '8px 12px' }}>Category</th>
                  <th style={{ padding: '8px 12px' }}>Amount (INR)</th>
                  <th style={{ padding: '8px 12px' }}>Time Added</th>
                </tr>
              </thead>
              <tbody>
                {sheetRows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b', background: i === 0 ? 'rgba(16, 185, 129, 0.08)' : 'transparent' }}>
                    <td style={{ padding: '8px 12px', color: '#38bdf8', fontWeight: 700, fontFamily: 'monospace' }}>{r.id}</td>
                    <td style={{ padding: '8px 12px', color: '#f8fafc' }}>{r.rep}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.region}</td>
                    <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{r.category}</td>
                    <td style={{ padding: '8px 12px', color: '#10b981', fontWeight: 700 }}>₹{r.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '0.85rem 1rem', fontSize: '0.86rem', color: '#a7f3d0', lineHeight: 1.6 }}>
            <strong>💡 Why this proves it is LIVE:</strong> In static import mode, you have to download <code>sales.xlsx</code> to your laptop, open Power BI Desktop, click Refresh, and republish. In this Live Google Sheet method, any user adding a row in Google Sheets via web browser, Google Form, or phone app immediately populates Power BI automatically upon scheduled refresh without anyone touching the <code>.pbix</code> file!
          </div>
        </div>
      )}

      {/* SCENARIO 2: DIRECTQUERY ON 3.4M ROWS */}
      {activeScenario === 'directquery' && (
        <div style={{ background: '#131d31', borderRadius: '14px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>
                Interactive Demonstration: Query Pushdown & Zero Local Storage
              </span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Why DirectQuery Shows "Few Rows" in Visuals Despite 3,450,000 DB Rows
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>Filter Region Slicer:</span>
              {['South', 'North', 'West', 'East', 'All'].map(reg => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => handleRegionChange(reg)}
                  style={{
                    background: selectedRegion === reg ? '#2563eb' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid #3b82f6',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* DirectQuery Server vs Visual Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Enterprise SQL Database</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc' }}>{dqDataByRegion[selectedRegion].rowsScanned} Rows</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Hosted on Azure SQL DB</span>
            </div>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Rows Stored in .pbix File</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>0 Rows (Zero!)</div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>DirectQuery Storage Mode</span>
            </div>
            <div style={{ background: '#090d16', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Returned Aggregated Metric</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>{dqDataByRegion[selectedRegion].revenue}</div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Returned in {queryLatency}ms</span>
            </div>
          </div>

          {/* Real-time Generated T-SQL */}
          <div style={{ background: '#090d16', borderRadius: '10px', padding: '1rem', border: '1px solid #1e293b', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                Live SQL Query Generated & Pushed Down to Server (Query Folding):
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800 }}>⚡ Executed in {queryLatency}ms</span>
            </div>
            <pre style={{ margin: 0, color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5, overflowX: 'auto' }}>
{`-- Power BI generates this dynamic T-SQL query on every slicer click:
SELECT 
    f.Region,
    COUNT(f.OrderID) AS MatchedOrders,
    SUM(f.SalesAmount) AS TotalRevenue
FROM sales.fact_orders AS f WITH (NOLOCK)
${selectedRegion === 'All' ? '-- No region filter applied' : `WHERE f.Region = '${selectedRegion}'`}
GROUP BY f.Region;`}
            </pre>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '10px', padding: '0.85rem 1rem', fontSize: '0.86rem', color: '#bfdbfe', lineHeight: 1.6 }}>
            <strong>💡 Why the visual only shows 1 or 2 rows:</strong> When you put a Card or Bar Chart in Power BI, the visual requests an <em>aggregation</em> (Total Sales for South). DirectQuery does NOT download 3.45 million rows to your computer; the remote SQL Server aggregates them and returns ONLY the single aggregated answer. The few rows you see on screen is the design goal of business intelligence, while the connection to the database is 100% LIVE!
          </div>
        </div>
      )}

      {/* SCENARIO 3: REAL-TIME STREAMING BUFFER */}
      {activeScenario === 'streaming' && (
        <div style={{ background: '#131d31', borderRadius: '14px', padding: '1.5rem', border: '1px solid #1e293b' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
              Interactive Demonstration: Transient In-Memory FIFO Buffer
            </span>
            <h4 style={{ margin: '4px 0 0.8rem 0', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Why Real-Time Streaming Does NOT Store Gigabytes in Visuals
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              If a streaming IoT device sends 100 readings every second, storing all historical rows in the browser visual would crash Power BI Desktop within minutes. Streaming datasets intentionally use a <strong>rolling FIFO (First In, First Out) memory window</strong> (such as the last 60 seconds or 1 hour).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Ingestion Cadence</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>Sub-Second (1 tick/s)</div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Direct REST POST</span>
            </div>
            <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Visual Retention Window</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>Rolling 60 Seconds</div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Oldest records expire</span>
            </div>
            <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Dashboard Visual Tile</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>Live Auto-Update</div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Zero click refresh</span>
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '0.85rem 1rem', fontSize: '0.86rem', color: '#fde68a', lineHeight: 1.6 }}>
            <strong>💡 Key Takeaway:</strong> In real-time streaming, having 5 to 10 points on a heart-rate monitor, factory gauge, or stock ticker line chart is the exact industry definition of real-time telemetry. You are observing live data as it pulses through memory!
          </div>
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

  // Safe fallback: Map any legacy tabs gracefully
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

  // Interactive Quiz State in Architecture Differences Tab
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarioQuestions = [
    {
      id: 'scen1',
      title: 'Scenario 1: 500 Million Records in Snowflake',
      problem: 'Your company has 500,000,000 transaction records in Snowflake. Security policy strictly forbids downloading data to employee laptops. Executives need live sales KPIs by state.',
      correct: 'directquery',
      recommendation: 'DirectQuery Mode',
      reason: 'With 500M rows, the dataset exceeds Power BI Desktop in-memory limits (1GB). DirectQuery leaves data inside Snowflake and translates visual clicks to live SQL queries in milliseconds.'
    },
    {
      id: 'scen2',
      title: 'Scenario 2: Certified Corporate Semantic Model with 180 DAX Measures',
      problem: 'The central Enterprise BI team created an SSAS Tabular model on Azure with complex Year-over-Year Gross Margin calculations already tested and certified for company finance.',
      correct: 'live_connection',
      recommendation: 'Live Connection',
      reason: 'Use Live Connection to Analysis Services / Power BI Semantic Model. The business logic is already perfected in the external model; Power BI acts purely as the presentation canvas.'
    },
    {
      id: 'scen3',
      title: 'Scenario 3: Factory Temperature & Machine Vibration Sensors',
      problem: 'Assembly line IoT sensors broadcast motor temperatures and vibration RPM every 500ms. Hallway monitors must flash alert cards instantly if heat exceeds 90°C.',
      correct: 'realtime_streaming',
      recommendation: 'Real-Time Streaming Dataset',
      reason: 'Neither DirectQuery nor scheduled refresh can update every 500ms. A Power BI Streaming Dataset with REST API pushes packets directly to in-memory tiles with sub-second latency.'
    },
    {
      id: 'scen4',
      title: 'Scenario 4: Monthly Sales Quotas from Google Sheet (15 Rows)',
      problem: 'Branch managers update their quarterly revenue target numbers (15 rows) in a shared Google Sheet once a week. The team needs the dashboard to auto-sync without file attachments.',
      correct: 'sheets_live',
      recommendation: 'Google Sheets Live Cloud Sync',
      reason: 'Connect via Published CSV link. Although it is only 15 rows, it is 100% Live because any edit made by branch managers automatically flows into Power BI upon scheduled refresh.'
    }
  ];

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

            {/* EMBEDDED INTERACTIVE LIVE EXPLAINER */}
            <LivePipelineVsStaticExplainer />

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
                onClick={() => handleContinue('architecture_differences')}
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
                Proceed to Architecture Differences: Live vs DirectQuery vs Streaming <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 2: ARCHITECTURE DIFFERENCES
          (LIVE CONNECTION VS DIRECTQUERY VS REAL-TIME STREAMING)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'architecture_differences' && (
        <Section 
          key="architecture_differences" 
          id="architecture_differences" 
          eyebrow="Microsoft PL-300 Standard • Enterprise Core Concept" 
          title="Differences: Live Connection vs DirectQuery vs Real-Time Streaming"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Intro Lead */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7, margin: 0 }}>
                Understanding the technical distinction between <strong>Live Connection</strong>, <strong>DirectQuery</strong>, and <strong>Real-Time Streaming</strong> is the most critical architecture decision in enterprise Business Intelligence. Each mode operates on fundamentally different protocols, storage locations, and query pushdown mechanics.
              </p>
            </div>

            {/* The 3 Architectures Visual Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
              
              {/* CARD 1: LIVE CONNECTION */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '2px solid #818cf8', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.08)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '1rem' }}>
                  <Radio size={14} /> Mode 1: Live Connection
                </div>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#1e1b4b' }}>
                  Live Connection (To Analysis Services / Semantic Model)
                </h4>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  Power BI connects directly to an existing, pre-built <strong>SSAS Tabular Model</strong>, <strong>Azure Analysis Services (AAS)</strong>, or <strong>Power BI Service Semantic Model</strong>.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.7, border: '1px solid #e2e8f0' }}>
                  <div><strong>• Where Data Lives:</strong> In the external Analysis Services engine.</div>
                  <div><strong>• Data in .pbix:</strong> <strong>0 Bytes</strong> (Zero rows downloaded).</div>
                  <div><strong>• Modeling in PBI:</strong> <span style={{ color: '#ef4444', fontWeight: 700 }}>LOCKED</span>. You cannot edit relationships or create calculated columns.</div>
                  <div><strong>• Query Language:</strong> Visuals generate pure <strong>DAX</strong> queries sent to the SSAS engine.</div>
                </div>
              </div>

              {/* CARD 2: DIRECTQUERY */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '2px solid #60a5fa', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.08)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dbeafe', color: '#1d4ed8', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '1rem' }}>
                  <Server size={14} /> Mode 2: DirectQuery
                </div>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#1e3a8a' }}>
                  DirectQuery (To Relational DBs & Data Warehouses)
                </h4>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  Power BI connects to relational databases (<strong>SQL Server</strong>, <strong>Snowflake</strong>, <strong>Azure SQL</strong>, <strong>BigQuery</strong>). Every user interaction generates native SQL queries on the fly.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.7, border: '1px solid #e2e8f0' }}>
                  <div><strong>• Where Data Lives:</strong> In the source relational database / warehouse.</div>
                  <div><strong>• Data in .pbix:</strong> <strong>0 Bytes</strong> (Only table schema and metadata).</div>
                  <div><strong>• Modeling in PBI:</strong> <span style={{ color: '#10b981', fontWeight: 700 }}>UNLOCKED</span>. You can build Star Schemas, relationships & DAX measures.</div>
                  <div><strong>• Query Language:</strong> Power BI translates visual clicks into native <strong>T-SQL / SQL</strong>.</div>
                </div>
              </div>

              {/* CARD 3: REAL-TIME STREAMING */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '2px solid #f59e0b', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.08)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#b45309', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '1rem' }}>
                  <Activity size={14} /> Mode 3: Real-Time Streaming
                </div>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#78350f' }}>
                  Real-Time Streaming (Push / Streaming Datasets)
                </h4>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  Data producers (IoT sensors, Python emitters, Kafka, Azure Stream Analytics) push JSON packets directly into Power BI Service via REST API.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.7, border: '1px solid #e2e8f0' }}>
                  <div><strong>• Where Data Lives:</strong> In-memory rolling FIFO buffer (Power BI Service cache).</div>
                  <div><strong>• Data in .pbix:</strong> <strong>0 Bytes</strong> (Streaming datasets reside exclusively in cloud).</div>
                  <div><strong>• Modeling in PBI:</strong> Fixed API schema. No DAX formulas or relationships.</div>
                  <div><strong>• Query Language:</strong> Direct HTTP POST JSON payloads (e.g. <code>/rows</code> endpoint).</div>
                </div>
              </div>

            </div>

            {/* 12-DIMENSION MASTER COMPARISON MATRIX TABLE */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem 1.75rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a', fontWeight: 900 }}>
                    🏆 Master 12-Dimension Enterprise Comparison Matrix
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Comparing Live Connection vs DirectQuery vs Streaming vs Import Mode</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '12px' }}>
                  PL-300 Exam Core
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#334155', minWidth: '160px' }}>Architecture Dimension</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#4338ca', minWidth: '220px' }}>1. Live Connection</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#1d4ed8', minWidth: '220px' }}>2. DirectQuery</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#b45309', minWidth: '220px' }}>3. Real-Time Streaming</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#64748b', minWidth: '180px' }}>4. Standard Import</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        dim: 'Target Data Sources',
                        live: 'SSAS Tabular, Azure Analysis Services, Power BI Semantic Models',
                        dq: 'SQL Server, Azure SQL, Snowflake, BigQuery, Oracle, Databricks',
                        stream: 'IoT Hub, Azure Stream Analytics, Python/Node REST APIs, PubNub',
                        imp: 'Excel, CSV, Folders, Web, SharePoint, Databases'
                      },
                      {
                        dim: 'Where Data Physically Resides',
                        live: 'External Analysis Services tabular engine',
                        dq: 'Remote SQL Database / Cloud Data Warehouse',
                        stream: 'Transient Azure streaming memory buffer',
                        imp: 'Compressed into local VertiPaq columnar memory'
                      },
                      {
                        dim: '.pbix File Size on Disk',
                        live: 'Tiny (~100 KB - metadata only)',
                        dq: 'Small (~200 KB - schema & relationships only)',
                        stream: 'N/A (Built in Power BI Service cloud)',
                        imp: 'Can grow to several gigabytes (1 GB default limit)'
                      },
                      {
                        dim: 'Data Modeling & Relationships',
                        live: '❌ LOCKED (Cannot build relationships or tables in PBI)',
                        dq: '✅ UNLOCKED (Can build Star Schema, relationships & measures)',
                        stream: '❌ Fixed API schema (No tables or relationships)',
                        imp: '✅ Full freedom (Complete modeling & relationships)'
                      },
                      {
                        dim: 'DAX Function Support',
                        live: '✅ 100% Full DAX supported by underlying SSAS model',
                        dq: '⚠️ Restricted DAX (Must translate to SQL; no Time Intelligence calculated columns)',
                        stream: '❌ No DAX formulas (Visuals display raw streaming values)',
                        imp: '✅ 100% Full DAX capabilities'
                      },
                      {
                        dim: 'Power Query (M) Transformations',
                        live: '❌ NONE (Power Query Editor completely disabled)',
                        dq: '⚠️ Query Folding only (Steps must translate to SQL)',
                        stream: '❌ NONE (JSON must be pre-shaped by emitter)',
                        imp: '✅ Unlimited Power Query M steps & transformations'
                      },
                      {
                        dim: 'Update Latency / Refresh Trigger',
                        live: 'Immediate on SSAS partition process',
                        dq: 'Near real-time (Query sent on every slicer/filter click)',
                        stream: '⚡ Sub-second (Continuous 1-second push)',
                        imp: 'Scheduled batch refresh (e.g. 8x or 48x daily)'
                      },
                      {
                        dim: 'Max Data Volume Capacity',
                        live: 'Unlimited (Determined by SSAS cluster RAM)',
                        dq: 'Unlimited (Billions of rows in Snowflake / Synapse)',
                        stream: 'High throughput (Up to 10,000 requests/sec)',
                        imp: 'Limited by 1 GB / 10 GB capacity limits'
                      },
                      {
                        dim: 'Gateway Required for Cloud?',
                        live: 'Yes (If SSAS is on-premises)',
                        dq: 'Yes (If SQL DB is behind corporate firewall)',
                        stream: 'No (Direct HTTPS push over the web)',
                        imp: 'Yes (If source file is on local server/PC)'
                      },
                      {
                        dim: 'Source System CPU Load',
                        live: 'Moderate (Analysis Services handles tabular DAX)',
                        dq: 'HIGH (Every user click triggers live SQL execution)',
                        stream: 'Low (Power BI Service absorbs HTTP payloads)',
                        imp: 'None during viewing; heavy during batch refresh'
                      },
                      {
                        dim: 'Ideal Real-World Scenario',
                        live: 'Enterprise standardized financial models across 500+ analysts',
                        dq: 'High-volume live transactional databases (Orders, ERP, Telematics)',
                        stream: 'Factory floor IoT sensor gauges, live trading tickers, hospital vitals',
                        imp: 'Monthly reports, sales summaries, small-to-medium datasets (<5M rows)'
                      },
                      {
                        dim: 'When NOT to Use',
                        live: 'When you need to mash up multiple disparate raw CSV/Web sources',
                        dq: 'When users expect sub-second slicer clicks on slow, unindexed databases',
                        stream: 'When you need multi-year historical trend analysis and complex DAX',
                        imp: 'When data changes second-by-second or exceeds memory capacity'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 800, color: '#0f172a' }}>{row.dim}</td>
                        <td style={{ padding: '12px 16px', color: '#4338ca', fontSize: '0.85rem', lineHeight: 1.5 }}>{row.live}</td>
                        <td style={{ padding: '12px 16px', color: '#1d4ed8', fontSize: '0.85rem', lineHeight: 1.5 }}>{row.dq}</td>
                        <td style={{ padding: '12px 16px', color: '#b45309', fontSize: '0.85rem', lineHeight: 1.5 }}>{row.stream}</td>
                        <td style={{ padding: '12px 16px', color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>{row.imp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INTERACTIVE ARCHITECTURAL DECISION HELPER */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#166534', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                <CheckSquare size={14} /> Interactive Scenario Decision Helper
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Which Storage Connection Should You Choose? Test Your Knowledge
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Click each enterprise business scenario below to test your understanding of connection modes:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {scenarioQuestions.map(scen => (
                  <button
                    key={scen.id}
                    type="button"
                    onClick={() => setSelectedScenario(scen.id)}
                    style={{
                      background: selectedScenario === scen.id ? '#1e1b4b' : '#ffffff',
                      color: selectedScenario === scen.id ? '#ffffff' : '#0f172a',
                      border: `1.5px solid ${selectedScenario === scen.id ? '#6366f1' : '#cbd5e1'}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedScenario === scen.id ? '0 8px 20px rgba(99, 102, 241, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: selectedScenario === scen.id ? '#a5b4fc' : '#6366f1', marginBottom: '6px' }}>
                      {scen.title}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: selectedScenario === scen.id ? '#cbd5e1' : '#475569', lineHeight: 1.5 }}>
                      {scen.problem}
                    </p>
                  </button>
                ))}
              </div>

              {selectedScenario && (
                <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.5rem', border: '2px solid #10b981', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)' }}>
                  {(() => {
                    const active = scenarioQuestions.find(s => s.id === selectedScenario);
                    return (
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontWeight: 900, fontSize: '0.85rem', marginBottom: '8px' }}>
                          <CheckCircle size={15} /> Architect Recommendation: {active.recommendation}
                        </div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 800 }}>
                          Why This Architecture is Chosen:
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.7 }}>
                          {active.reason}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* ADVANCED CONCEPT: COMPOSITE MODELS & DUAL STORAGE MODE */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '18px', padding: '2rem', color: '#ffffff' }}>
              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="#facc15" /> Advanced Enterprise Pattern: Composite Models & Dual Storage
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.95rem', color: '#c7d2fe', lineHeight: 1.65 }}>
                Did you know that in modern Power BI you don't have to choose exclusively between Import and DirectQuery? You can combine them using <strong>Composite Models</strong>!
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <strong style={{ color: '#facc15', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>Fact Table (DirectQuery)</strong>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>Keep your 500-million row <code>fact_sales</code> table in DirectQuery mode so it never overloads local RAM.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>Dimension Tables (Dual Mode)</strong>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>Set small dimension tables (<code>dim_date</code>, <code>dim_store</code>) to <strong>Dual Mode</strong>. Power BI caches them in memory so slicers operate instantaneously!</span>
                </div>
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
                Proceed to Step 1: Google Sheets Live Connection <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ─────────────────────────────────────────────
          TAB 3: GOOGLE SHEETS CONNECTION (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'google_sheets_connection' && (
        <Section key="google_sheets_connection" id="google_sheets_connection" eyebrow="Live Cloud Data Integration • Method 1" title="Step-by-Step: Connecting Live Google Sheets to Power BI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Google Sheets is the primary collaborative tool used by finance, sales, and operations teams worldwide. In this step-by-step module, you will learn how to connect Power BI to live Google Sheets so that whenever any team member adds or updates a row in the Google Sheet, the Power BI dashboard automatically syncs!
            </p>

            {/* REALISTIC PRODUCTION DATASET PREVIEW */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '0.8rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: 800 }}>
                  📋 Sample Live Production Dataset (E-Commerce Multi-Branch Sales)
                </h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '8px' }}>
                  Auto-Sync Endpoint
                </span>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#64748b' }}>
                This is a realistic representation of an active Google Sheet. When team members add new rows, Power BI reads them directly:
              </p>
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left', background: '#ffffff' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '8px 12px' }}>Order_ID</th>
                      <th style={{ padding: '8px 12px' }}>Customer_Name</th>
                      <th style={{ padding: '8px 12px' }}>Region</th>
                      <th style={{ padding: '8px 12px' }}>Product_Category</th>
                      <th style={{ padding: '8px 12px' }}>Units</th>
                      <th style={{ padding: '8px 12px' }}>Revenue_INR</th>
                      <th style={{ padding: '8px 12px' }}>Order_Status</th>
                      <th style={{ padding: '8px 12px' }}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'ORD-8921', cust: 'Aarav Sharma', reg: 'South', cat: 'Laptops', units: 1, rev: '₹64,500', stat: 'Delivered', ts: '2026-10-20 09:15' },
                      { id: 'ORD-8922', cust: 'Meera Iyer', reg: 'South', cat: 'Accessories', units: 3, rev: '₹4,200', stat: 'Shipped', ts: '2026-10-20 09:28' },
                      { id: 'ORD-8923', cust: 'Rajesh Kumar', reg: 'North', cat: 'Smartphones', units: 1, rev: '₹28,999', stat: 'Processing', ts: '2026-10-20 09:42' },
                      { id: 'ORD-8924', cust: 'Pooja Hegde', reg: 'West', cat: 'Monitors', units: 2, rev: '₹32,400', stat: 'Delivered', ts: '2026-10-20 10:05' },
                      { id: 'ORD-8925', cust: 'Karthik Rao', reg: 'South', cat: 'Audio', units: 2, rev: '₹9,800', stat: 'Delivered', ts: '2026-10-20 10:18' },
                      { id: 'ORD-8926', cust: 'Sneha Roy', reg: 'East', cat: 'Smartphones', units: 1, rev: '₹34,500', stat: 'Shipped', ts: '2026-10-20 10:35' },
                      { id: 'ORD-8927', cust: 'Vignesh N.', reg: 'South', cat: 'Printers', units: 1, rev: '₹14,200', stat: 'Processing', ts: '2026-10-20 10:50' },
                      { id: 'ORD-8928', cust: 'Ananya Desai', reg: 'West', cat: 'Wearables', units: 2, rev: '₹8,600', stat: 'Delivered', ts: '2026-10-20 11:12' },
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 700, color: '#2563eb', fontFamily: 'monospace' }}>{row.id}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{row.cust}</td>
                        <td style={{ padding: '8px 12px', color: '#475569' }}>{row.reg}</td>
                        <td style={{ padding: '8px 12px', color: '#0f172a' }}>{row.cat}</td>
                        <td style={{ padding: '8px 12px', color: '#475569' }}>{row.units}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 700, color: '#16a34a' }}>{row.rev}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: row.stat === 'Delivered' ? '#dcfce7' : '#fef3c7', color: row.stat === 'Delivered' ? '#166534' : '#b45309' }}>
                            {row.stat}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', color: '#64748b', fontSize: '0.78rem' }}>{row.ts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
          TAB 4: LIVE CONNECTIONS & DIRECTQUERY
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
          TAB 5: REAL-TIME DATA STREAMING (STEP-BY-STEP)
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
                    title: 'Click New ➔ Streaming Dataset',
                    body: 'Click the "+ New" button at top left, and choose "Streaming dataset". In the modal, select "API" and click Next.'
                  },
                  {
                    step: 'Step 3',
                    title: 'Define Payload Schema & Columns',
                    body: 'Enter a Dataset Name (e.g. "Factory_Telemetry"). Add fields: timestamp (DateTime), sensor_id (Text), temperature_celsius (Number), pressure_bar (Number), rpm (Number). Toggle "Historic data analysis" to ON if you want reporting!'
                  },
                  {
                    step: 'Step 4',
                    title: 'Copy the Generated Push URL Endpoint',
                    body: 'Power BI Service instantly creates your private REST Push URL endpoint (looks like: https://api.powerbi.com/beta/.../datasets/.../rows?key=...). Copy this URL!'
                  },
                  {
                    step: 'Step 5',
                    title: 'Create Live Dashboard Tile',
                    body: 'Create a new Dashboard. Click "Add Tile" ➔ "Real-time data" ➔ select "Factory_Telemetry". Choose Card or Line Chart and watch values update continuously!'
                  }
                ].map((st, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ background: '#f59e0b', color: '#ffffff', fontWeight: 900, fontSize: '0.8rem', padding: '4px 10px', borderRadius: '8px', flexShrink: 0 }}>{st.step}</span>
                    <div>
                      <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{st.title}</h5>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{st.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PYTHON LIVE STREAMING PRODUCER CODE */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>
                🐍 Python Real-Time Streaming Producer Script
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Run this lightweight Python script on your local machine or server. It pushes simulated sensor telemetry to your Power BI Streaming Dataset every second:
              </p>

              <CodeBlock
                language="python"
                title="powerbi_live_stream_producer.py"
                code={`import requests
import time
import random
from datetime import datetime

# Paste your Power BI Service Push URL here:
PBI_PUSH_URL = "https://api.powerbi.com/beta/YOUR_TENANT_ID/datasets/YOUR_DATASET_ID/rows?key=YOUR_KEY"

print("🚀 Starting Live Telemetry Stream to Power BI...")

try:
    while True:
        # Generate real-time telemetry payload
        payload = [{
            "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "sensor_id": "SENSOR-01-A",
            "temperature_celsius": round(random.uniform(68.0, 92.5), 2),
            "pressure_bar": round(random.uniform(2.1, 3.8), 3),
            "rpm": random.randint(3200, 3650)
        }]

        # Push to Power BI REST API
        response = requests.post(PBI_PUSH_URL, json=payload)

        if response.status_code == 200:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Pushed: Temp={payload[0]['temperature_celsius']}°C | Pressure={payload[0]['pressure_bar']} bar")
        else:
            print(f"❌ Error {response.status_code}: {response.text}")

        # Stream interval (1 tick per second)
        time.sleep(1.0)

except KeyboardInterrupt:
    print("\\n🛑 Live Stream stopped by user.")`}
              />
            </div>

            {/* AUTOMATIC PAGE REFRESH (APR) */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dbeafe', color: '#1e40af', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                ⚡ Power BI Desktop Feature
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#1e3a8a' }}>
                Automatic Page Refresh (APR) in DirectQuery
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                For DirectQuery reports in Power BI Desktop, you can configure <strong>Automatic Page Refresh (APR)</strong> so the visual canvas automatically polls and refreshes without the user clicking the refresh button:
              </p>

              <ol style={{ paddingLeft: '1.3rem', margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.8 }}>
                <li>Ensure your storage mode is <strong>DirectQuery</strong>.</li>
                <li>Deselect all visuals (click the blank canvas background).</li>
                <li>In the <strong>Format</strong> pane on the right, toggle <strong>Page refresh</strong> to <strong>ON</strong>.</li>
                <li>Set the <strong>Refresh interval</strong> (e.g. every 5 seconds, 10 seconds, or 1 minute).</li>
                <li>Choose <em>Auto refresh</em> or <em>Change detection</em> (which queries a measure like <code>MAX(Transactions[Timestamp])</code> to only refresh when new rows appear)!</li>
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
          TAB 6: PYTHON IN POWER BI (STEP-BY-STEP)
      ───────────────────────────────────────────── */}
      {normalizedTab === 'python_powerbi' && (
        <Section key="python_powerbi" id="python_powerbi" eyebrow="Advanced Analytics & Data Science • Step 4" title="Step-by-Step: Python Scripting & Visuals in Power BI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Python transforms Power BI from a standard BI dashboard into an advanced data science and statistical computing workstation. You can use Python for <strong>data ingestion</strong>, <strong>data transformation in Power Query</strong>, and <strong>custom Matplotlib/Seaborn visualizations</strong>.
            </p>

            {/* ENVIRONMENT CONFIGURATION GUIDE */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0e7ff', color: '#3730a3', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                🛠️ Setup & Prerequisites
              </div>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Step 1: Configuring Your Python Environment for Power BI
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Before executing Python in Power BI Desktop, ensure your local Python installation is linked:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>1. Install Required Python Packages</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>Open Command Prompt or Terminal on your PC and run:</span>
                  <code style={{ background: '#0f172a', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', display: 'inline-block' }}>
                    pip install pandas matplotlib seaborn numpy scipy
                  </code>
                </div>

                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>2. Link Python Path in Power BI Desktop</strong>
                  <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    In Power BI Desktop, click <strong>File ➔ Options and settings ➔ Options</strong>. Under Global, click <strong>Python scripting</strong>. Verify your <em>Detected Python home directory</em> points to your active Python directory (e.g., Anaconda or Python 3.10+).
                  </span>
                </div>
              </div>
            </div>

            {/* USE CASE 1: PYTHON AS A DATA SOURCE */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#166534', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                📥 Use Case A
              </div>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Python Script as a Data Source (Get Data ➔ Python Script)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                You can write Python code to fetch data from APIs, scrape web pages, or generate synthetic test datasets:
              </p>

              <CodeBlock
                language="python"
                title="Generate Multi-Store Sales Data with Python"
                code={`import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Generate 500 synthetic retail sales records
n = 500
stores = ['Chennai Metro', 'Bengaluru Central', 'Mumbai Express', 'Hyderabad Tech']
categories = ['Electronics', 'Home Appliances', 'Fitness', 'Office Supplies']

data = {
    'TransactionID': [f'TXN-{10000+i}' for i in range(n)],
    'Store': np.random.choice(stores, n),
    'Category': np.random.choice(categories, n),
    'SalesAmount': np.round(np.random.exponential(scale=3500, size=n) + 200, 2),
    'CustomerRating': np.random.choice([1, 2, 3, 4, 5], n, p=[0.05, 0.1, 0.2, 0.4, 0.25]),
    'DiscountPct': np.random.choice([0.0, 0.05, 0.1, 0.15, 0.25], n)
}

# Power BI will ingest all Pandas DataFrames created in this script:
sales_df = pd.DataFrame(data)`}
              />
            </div>

            {/* USE CASE 2: PYTHON IN POWER QUERY TRANSFORMATIONS */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#b45309', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                ⚙️ Use Case B
              </div>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Transforming Data with Python in Power Query Editor
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                In Power Query Editor, go to <strong>Transform ribbon ➔ Run Python script</strong>. Power BI automatically passes your current table as a Pandas DataFrame named <code>dataset</code>:
              </p>

              <CodeBlock
                language="python"
                title="Power Query Python Step: Outlier Capping & Feature Engineering"
                code={`# 'dataset' holds the input table for this script
import pandas as pd
import numpy as np

# 1. Cap extreme outlier sales using 99th percentile
cap_value = dataset['SalesAmount'].quantile(0.99)
dataset['SalesAmount_Capped'] = np.where(dataset['SalesAmount'] > cap_value, cap_value, dataset['SalesAmount'])

# 2. Calculate Net Revenue after discount
dataset['NetRevenue'] = dataset['SalesAmount_Capped'] * (1 - dataset['DiscountPct'])

# 3. Categorize High-Value vs Standard Transactions
dataset['OrderTier'] = np.where(dataset['NetRevenue'] >= 5000, 'High Value', 'Standard')`}
              />
            </div>

            {/* USE CASE 3: HIGH-END STATISTICAL VISUALIZATIONS */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ede9fe', color: '#6d28d9', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
                📊 Use Case C
              </div>
              <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                Building Custom Python Visuals (Correlation Heatmap & Distributions)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                In the Visualizations pane, click the <strong>Python Visual icon (Py)</strong>. Drag your metrics into Values. In the Python script editor, type:
              </p>

              <CodeBlock
                language="python"
                title="Python Visual: Seaborn Correlation Matrix Heatmap"
                code={`# Paste this code into the Python visual editor in Power BI:
import matplotlib.pyplot as plt
import seaborn as sns

# Configure plot styling
plt.figure(figsize=(7, 5))
plt.title("Metrics Correlation Heatmap", fontsize=14, fontweight='bold', pad=12)

# Compute correlation matrix on numeric fields
corr = dataset.corr(numeric_only=True)

# Generate high-contrast heatmap
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=1.0, cbar=True)

plt.tight_layout()
plt.show()  # Power BI renders this Matplotlib plot directly onto the canvas!`}
              />

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#475569' }}>
                <strong>💡 Tip for Power BI Service:</strong> Python visuals are fully supported in Power BI Service for Pro/Premium capacities as long as standard packages (Pandas, Matplotlib, Seaborn, Scikit-learn) are used.
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
          TAB 7: DAY 8 MINI PROJECT & ASSIGNMENT
      ───────────────────────────────────────────── */}
      {normalizedTab === 'assignment_day8' && (
        <Section key="assignment_day8" id="assignment_day8" eyebrow="Practical Capstone • Day 8" title="Day 8 Mini Project: Live Dynamic Power BI Dashboard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{
              background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(4, 120, 87, 0.25)'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                🏆 Hands-on Assignment
              </div>
              <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 900, lineHeight: 1.25 }}>
                Mission: Construct a Hybrid Multi-Source Live Dashboard
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#a7f3d0', margin: 0, lineHeight: 1.7, maxWidth: '800px' }}>
                Your client runs an omnichannel retail and crypto payment ecosystem. You must assemble a multi-source dashboard in Power BI that incorporates <strong>Google Sheets</strong>, <strong>Live API / DirectQuery</strong>, and a custom <strong>Python statistical visual</strong>.
              </p>
            </div>

            {/* The 4 Assignment Tasks */}
            <div style={{ background: '#ffffff', borderRadius: '18px', padding: '2rem', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                Your 4 Mandatory Implementation Steps:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    num: '1',
                    title: 'Live Google Sheet Integration',
                    desc: 'Create a Google Sheet with 8+ rows of sales data (or use our sample). Publish as CSV, import into Power BI using Web connector, and confirm headers & types.'
                  },
                  {
                    num: '2',
                    title: 'DirectQuery or Live API Feed',
                    desc: 'Connect to Coinbase/Binance BTC ticker API via Web connector, convert JSON Record to Table, transpose, and create a Live Price KPI Card.'
                  },
                  {
                    num: '3',
                    title: 'Python Seaborn / Matplotlib Visual',
                    desc: 'Add a Python Visual to your report canvas. Plot a Correlation Matrix Heatmap or a Distribution Box Plot comparing sales across categories.'
                  },
                  {
                    num: '4',
                    title: 'Interactive Slicers & Design Polish',
                    desc: 'Add interactive slicers for Region and Category. Apply a cohesive dark or corporate theme, clear visual hierarchy, and KPI cards.'
                  }
                ].map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', flexShrink: 0 }}>
                      {task.num}
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{task.title}</h5>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{task.desc}</p>
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
