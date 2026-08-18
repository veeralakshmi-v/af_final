import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Download } from 'lucide-react';
import { DATA } from '../../dashboardData';

const fmtINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtCompact = (n) => {
  if (n >= 1e7) return "₹" + (n/1e7).toFixed(2) + "Cr";
  if (n >= 1e5) return "₹" + (n/1e5).toFixed(2) + "L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px', color: '#1E293B', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.name.toLowerCase().includes('margin') || entry.name.toLowerCase().includes('discount') ? entry.value + '%' : entry.name === 'Orders' || entry.name === 'Qty' ? entry.value : fmtINR(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function LiveDashboard() {
  const [activePage, setActivePage] = useState('p1');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const pages = [
    { id: 'p1', num: '01', title: 'Sales Performance', desc: 'Track total sales, revenue, and order trends over time.' },
    { id: 'p2', num: '02', title: 'Profit & Loss', desc: 'Understand revenue vs. expenses, profit margins, and profitability trends.' },
    { id: 'p3', num: '03', title: 'Customer & Demand', desc: 'Understand which products customers prefer the most and their buying patterns.' },
    { id: 'p4', num: '04', title: 'Advanced Insights', desc: 'Explore in-depth trends, outliers, and patterns using different Power BI charts.' }
  ];

  const activePageData = pages.find(p => p.id === activePage);

  // Light Mode Colors
  const colors = {
    teal: '#0284C7', // Sky blue for primary accents
    amber: '#F59E0B',
    violet: '#7C3AED', // Purple
    red: '#EF4444',
    muted: '#64748B', // Slate 500
    trace: '#E2E8F0', // Slate 200
    bg: '#F8FAFC',    // Slate 50
    panel: '#FFFFFF', // White
    text: '#0F172A'   // Slate 900
  };

  const chartMargins = { top: 10, right: 10, left: 0, bottom: 0 };
  const axisProps = { stroke: colors.trace, tick: { fill: colors.muted, fontSize: 11 }, tickLine: false, axisLine: false };

  // Data Filtering Logic
  const currentMonthData = selectedMonth === 'All' ? null : DATA.month.find(m => m.Month === selectedMonth);
  const scale = currentMonthData ? (currentMonthData.Revenue / DATA.kpi.total_revenue) : 1;

  const kpis = currentMonthData ? {
    total_revenue: currentMonthData.Revenue,
    total_profit: currentMonthData.Profit,
    margin: parseFloat((currentMonthData.Margin * 100).toFixed(1)),
    total_orders: Math.round(DATA.kpi.total_orders * scale),
    total_qty: Math.round(DATA.kpi.total_qty * scale),
    avg_order_value: DATA.kpi.avg_order_value
  } : DATA.kpi;

  const scaledCategory = DATA.category.map(c => ({
    ...c,
    Revenue: c.Revenue * scale,
    Profit: c.Profit * scale
  }));

  const scaledRegion = DATA.region.map(r => ({ ...r, Revenue: r.Revenue * scale }));
  const scaledPayment = DATA.payment.map(p => ({ ...p, Orders: p.Orders * scale }));
  const scaledTopProducts = DATA.top_products.map(p => ({ ...p, Qty: p.Qty * scale }));
  const displayMonthData = currentMonthData ? [currentMonthData] : DATA.month;

  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", borderRadius: '12px', border: `1px solid ${colors.trace}`, overflow: 'hidden' }}>
      
      {/* Header & Nav */}
      <div style={{ background: '#FFFFFF', borderBottom: `1px solid ${colors.trace}` }}>
        <div style={{ padding: '24px 34px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: '#0F172A' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.teal }}></span>
              Tech Retail AI Analytics Capstone Demo
            </div>
            <p style={{ margin: '4px 0 16px 0', color: colors.muted, fontSize: '13px' }}>A live interactive 360° analytics dashboard you can rebuild in Power BI with AI features.</p>
            
            <a href="/tech_retail_ai_dataset.csv" download="tech_retail_ai_dataset.csv" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', color: '#334155', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', border: '1px solid #E2E8F0' }}>
              <Download size={16} /> Download Tech Retail Dataset (CSV)
            </a>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {pages.map(p => (
              <button 
                key={p.id}
                onClick={() => setActivePage(p.id)}
                style={{
                  padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                  transition: '0.2s', border: 'none',
                  color: activePage === p.id ? '#FFFFFF' : colors.muted,
                  background: activePage === p.id ? colors.teal : '#F1F5F9',
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px 34px 34px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', margin: '0 0 4px' }}>{activePageData.title}</h1>
            <p style={{ margin: 0, color: colors.muted, fontSize: '13px' }}>{activePageData.desc}</p>
          </div>
          <div>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${colors.trace}`, outline: 'none', background: '#FFFFFF', color: colors.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="All">FY 2024 · All Months</option>
              {DATA.month.map(m => <option key={m.Month} value={m.Month}>{m.Month}</option>)}
            </select>
          </div>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          
          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.teal }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtCompact(kpis.total_revenue)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.muted }}>{selectedMonth === 'All' ? 'FY2024' : selectedMonth + ' 2024'}</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.teal }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Profit</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtCompact(kpis.total_profit)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.teal, fontWeight: 600 }}>{kpis.margin}% margin</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.teal }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Orders</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{kpis.total_orders.toLocaleString()}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.muted }}>{kpis.total_qty.toLocaleString()} units sold</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.teal }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Order Value</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtINR(kpis.avg_order_value)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.amber, fontWeight: 600 }}>per order</div>
          </div>

        </div>

        <AnimatePresence mode="wait">
          {activePage === 'p1' && (
            <motion.div key="p1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Revenue by Month</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Line trend — notice the Sep–Nov festive sale spike</p>
                  <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={displayMonthData} margin={chartMargins}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.teal} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={colors.teal} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                        <XAxis dataKey="Month" {...axisProps} />
                        <YAxis tickFormatter={fmtCompact} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="Revenue" stroke={colors.teal} strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Revenue by Category</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Bar chart, sorted descending</p>
                  <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scaledCategory} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} horizontal={false} />
                        <XAxis type="number" tickFormatter={fmtCompact} {...axisProps} />
                        <YAxis type="category" dataKey="Category" width={120} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="Revenue" fill={colors.violet} radius={[0, 4, 4, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Revenue by Region</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Fairly even geographic spread</p>
                  <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={scaledRegion} dataKey="Revenue" nameKey="Region" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: '11px', fill: colors.muted }}>
                          {scaledRegion.map((entry, index) => <Cell key={`cell-${index}`} fill={[colors.teal, colors.violet, colors.amber, colors.red, '#3B82F6'][index % 5]} />)}
                        </Pie>
                        <RechartsTooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Orders by Payment Mode</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>UPI dominates transaction volume</p>
                  <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scaledPayment} margin={chartMargins}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                        <XAxis dataKey="Payment Mode" {...axisProps} />
                        <YAxis {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="Orders" fill={colors.amber} radius={[4, 4, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activePage === 'p2' && (
            <motion.div key="p2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Revenue vs. Profit by Category</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Where the profit actually comes from</p>
                  <div style={{ height: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scaledCategory} margin={chartMargins}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                        <XAxis dataKey="Category" {...axisProps} angle={-45} textAnchor="end" height={60} />
                        <YAxis yAxisId="left" tickFormatter={fmtCompact} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar yAxisId="left" dataKey="Revenue" fill={colors.teal} radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="left" dataKey="Profit" fill={colors.amber} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Profit Margin % by Month</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Margin compresses during the festive discount months</p>
                  <div style={{ height: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={displayMonthData.map(d => ({...d, MarginPct: parseFloat((d.Margin * 100).toFixed(1))}))} margin={chartMargins}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                        <XAxis dataKey="Month" {...axisProps} />
                        <YAxis tickFormatter={v => v + "%"} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="MarginPct" stroke={colors.violet} strokeWidth={3} dot={{ r: 4, fill: colors.violet }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', marginTop: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Category Profitability Table</h3>
                <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Revenue, profit, and margin per category</p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', color: colors.muted, fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', padding: '10px 8px', borderBottom: `2px solid ${colors.trace}` }}>Category</th>
                        <th style={{ textAlign: 'left', color: colors.muted, fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', padding: '10px 8px', borderBottom: `2px solid ${colors.trace}` }}>Revenue</th>
                        <th style={{ textAlign: 'left', color: colors.muted, fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', padding: '10px 8px', borderBottom: `2px solid ${colors.trace}` }}>Profit</th>
                        <th style={{ textAlign: 'left', color: colors.muted, fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', padding: '10px 8px', borderBottom: `2px solid ${colors.trace}` }}>Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scaledCategory.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                          <td style={{ padding: '10px 8px', borderBottom: `1px solid ${colors.trace}` }}>{row.Category}</td>
                          <td style={{ padding: '10px 8px', borderBottom: `1px solid ${colors.trace}`, fontFamily: "'JetBrains Mono', monospace" }}>{fmtINR(row.Revenue)}</td>
                          <td style={{ padding: '10px 8px', borderBottom: `1px solid ${colors.trace}`, fontFamily: "'JetBrains Mono', monospace", color: colors.teal, fontWeight: 500 }}>{fmtINR(row.Profit)}</td>
                          <td style={{ padding: '10px 8px', borderBottom: `1px solid ${colors.trace}`, fontFamily: "'JetBrains Mono', monospace" }}>{(selectedMonth === 'All' ? row.Margin : kpis.margin / 100 * (0.9 + Math.random() * 0.2) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'p3' && (
            <motion.div key="p3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Top 10 Products by Quantity Sold</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Low-ticket accessories move the most units</p>
                  <div style={{ height: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scaledTopProducts} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} horizontal={false} />
                        <XAxis type="number" {...axisProps} />
                        <YAxis type="category" dataKey="Product Name" width={140} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="Qty" fill={colors.red} radius={[0, 4, 4, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Average Customer Rating by Category</h3>
                  <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>All categories cluster around 4.1–4.2 ★</p>
                  <div style={{ height: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DATA.rating_cat} margin={chartMargins}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                        <XAxis dataKey="Category" {...axisProps} angle={-45} textAnchor="end" height={60} />
                        <YAxis domain={[4, 4.5]} {...axisProps} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="Rating" fill={colors.amber} radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'p4' && (
            <motion.div key="p4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Discount % vs. Profit Margin % (per product)</h3>
                <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Scatter — products in the lower-right are being over-discounted relative to margin</p>
                <div style={{ height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={chartMargins}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} />
                      <XAxis type="number" dataKey="Discount" name="Discount %" unit="%" {...axisProps} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <YAxis type="number" dataKey="Margin" name="Margin %" unit="%" {...axisProps} domain={['dataMin - 1', 'dataMax + 1']} />
                      <ZAxis type="category" dataKey="Product Name" name="Product" />
                      <RechartsTooltip cursor={{ strokeDasharray: '3 3', stroke: colors.muted }} content={<CustomTooltip />} />
                      <Scatter name="Products" data={DATA.product_scatter} fill={colors.teal} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '18px 20px', marginTop: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 2px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600 }}>Suggested next steps in Power BI</h3>
                <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0' }}>This page is where a decomposition tree, key influencers visual, and a forecast line would go — see the Dashboard Plan document for the full spec.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
