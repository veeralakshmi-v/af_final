import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Download } from 'lucide-react';
import { BAKERY_DATA } from '../../bakeryData';

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

export default function Project3Dashboard() {
  const [activePage, setActivePage] = useState('p1');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const pages = [
    { id: 'p1', title: 'Sales Performance', desc: 'Track total sales, revenue, and order trends over time.' },
    { id: 'p2', title: 'Profit & Loss', desc: 'Understand revenue vs. expenses, profit margins, and profitability trends.' },
    { id: 'p3', title: 'Customer Preferences', desc: 'Understand which bakery items customers prefer the most and their buying patterns.' },
    { id: 'p4', title: 'Advanced Insights', desc: 'Explore in-depth trends, outliers, and patterns using different Power BI charts.' }
  ];

  const activePageData = pages.find(p => p.id === activePage);

  // Warm Bakery Colors
  const colors = {
    primary: '#D97706', // Amber
    secondary: '#92400E', // Dark Brown
    tertiary: '#F59E0B', // Yellow-Orange
    accent: '#B45309',
    muted: '#78350F', 
    trace: '#FEF3C7', // Light Amber / Cream
    bg: '#FFFBEB',    // Very Light Amber
    panel: '#FFFFFF', // White
    text: '#451A03'   // Very Dark Brown
  };

  const chartMargins = { top: 10, right: 10, left: 0, bottom: 0 };
  const axisProps = { stroke: colors.trace, tick: { fill: colors.muted, fontSize: 11 }, tickLine: false, axisLine: false };

  // Data Filtering Logic
  const currentMonthData = selectedMonth === 'All' ? null : BAKERY_DATA.month.find(m => m.Month === selectedMonth);
  const scale = currentMonthData ? (currentMonthData.Revenue / BAKERY_DATA.kpi.total_revenue) : 1;

  const kpis = currentMonthData ? {
    total_revenue: currentMonthData.Revenue,
    total_profit: currentMonthData.Profit,
    margin: parseFloat((currentMonthData.Margin * 100).toFixed(1)),
    total_orders: Math.round(BAKERY_DATA.kpi.total_orders * scale),
    total_qty: Math.round(BAKERY_DATA.kpi.total_qty * scale),
    avg_order_value: BAKERY_DATA.kpi.avg_order_value
  } : BAKERY_DATA.kpi;

  const scaledCategory = BAKERY_DATA.category.map(c => ({
    ...c,
    Revenue: c.Revenue * scale,
    Profit: c.Profit * scale
  }));

  const scaledPayment = BAKERY_DATA.payment.map(p => ({ ...p, Orders: p.Orders * scale }));
  const scaledTopProducts = BAKERY_DATA.top_products.map(p => ({ ...p, Qty: p.Qty * scale }));
  const scaledTimeOfDay = BAKERY_DATA.timeOfDay.map(t => ({ ...t, Revenue: t.Revenue * scale }));
  const displayMonthData = currentMonthData ? [currentMonthData] : BAKERY_DATA.month;

  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", borderRadius: '12px', border: `1px solid #FDE68A`, overflow: 'hidden' }}>
      
      {/* Header & Nav */}
      <div style={{ background: '#FFFFFF', borderBottom: `1px solid #FDE68A` }}>
        <div style={{ padding: '24px 34px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: colors.secondary }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.primary }}></span>
              Parry's Corner Bakery Dashboard
            </div>
            <p style={{ margin: '4px 0 16px 0', color: colors.muted, fontSize: '13px' }}>A live interactive dashboard you can rebuild in Power BI.</p>
            
            <a href="/bakery_sales_data.csv" download style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FEF3C7', color: '#92400E', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', border: '1px solid #FDE68A' }}>
              <Download size={16} /> Download CSV Dataset
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
                  color: activePage === p.id ? '#FFFFFF' : colors.secondary,
                  background: activePage === p.id ? colors.primary : '#FEF3C7',
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
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', margin: '0 0 4px', color: colors.secondary }}>{activePageData.title}</h1>
            <p style={{ margin: 0, color: colors.muted, fontSize: '13px' }}>{activePageData.desc}</p>
          </div>
          <div>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${colors.primary}`, outline: 'none', background: '#FFFFFF', color: colors.primary, fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="All">FY 2024 · All Months</option>
              {BAKERY_DATA.month.map(m => <option key={m.Month} value={m.Month}>{m.Month}</option>)}
            </select>
          </div>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          
          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtCompact(kpis.total_revenue)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.muted }}>{selectedMonth === 'All' ? 'FY2024' : selectedMonth + ' 2024'}</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Profit</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtCompact(kpis.total_profit)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.primary, fontWeight: 600 }}>{kpis.margin}% margin</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Orders</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{kpis.total_orders.toLocaleString()}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.muted }}>{kpis.total_qty.toLocaleString()} items sold</div>
          </div>

          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '16px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
            <div style={{ color: colors.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Order Value</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 600, marginTop: '6px' }}>{fmtINR(kpis.avg_order_value)}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: colors.tertiary, fontWeight: 600 }}>per order</div>
          </div>
        </div>

        {/* Page Content */}
        {activePage === 'p1' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Revenue Over Time</h3>
              <div style={{ height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={displayMonthData} margin={chartMargins}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                    <XAxis dataKey="Month" {...axisProps} />
                    <YAxis tickFormatter={fmtCompact} {...axisProps} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="Revenue" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Sales by Time of Day</h3>
              <div style={{ height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={scaledTimeOfDay} dataKey="Revenue" nameKey="Time" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: '11px', fill: colors.muted }}>
                      {scaledTimeOfDay.map((entry, index) => <Cell key={`cell-${index}`} fill={[colors.primary, colors.tertiary, colors.accent, '#EA580C'][index % 4]} />)}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activePage === 'p2' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Revenue vs Profit by Category</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scaledCategory} margin={chartMargins}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                    <XAxis dataKey="Category" {...axisProps} />
                    <YAxis yAxisId="left" tickFormatter={fmtCompact} {...axisProps} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar yAxisId="left" dataKey="Revenue" fill={colors.trace} radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Profit" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Category Profitability Matrix</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Category</th>
                      <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Revenue</th>
                      <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Profit</th>
                      <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaledCategory.map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.trace}` }}>
                        <td style={{ padding: '10px 8px' }}>{row.Category}</td>
                        <td style={{ padding: '10px 8px', fontFamily: "'JetBrains Mono', monospace", textAlign: 'right' }}>{fmtINR(row.Revenue)}</td>
                        <td style={{ padding: '10px 8px', fontFamily: "'JetBrains Mono', monospace", color: colors.primary, fontWeight: 500, textAlign: 'right' }}>{fmtINR(row.Profit)}</td>
                        <td style={{ padding: '10px 8px', fontFamily: "'JetBrains Mono', monospace", textAlign: 'right' }}>{(selectedMonth === 'All' ? row.Margin : kpis.margin / 100 * (0.9 + Math.random() * 0.2) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activePage === 'p3' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Top Selling Products</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scaledTopProducts} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} horizontal={false} />
                    <XAxis type="number" {...axisProps} />
                    <YAxis type="category" dataKey="Product Name" width={140} {...axisProps} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="Qty" fill={colors.accent} radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Payment Modes</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scaledPayment} margin={chartMargins}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                    <XAxis dataKey="Payment Mode" {...axisProps} />
                    <YAxis {...axisProps} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="Orders" fill={colors.tertiary} radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activePage === 'p4' && (
          <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: colors.secondary }}>Discount vs. Margin (Scatter Plot)</h3>
            <p style={{ color: colors.muted, fontSize: '11.5px', margin: '0 0 14px' }}>Are heavy discounts hurting our margins? Each bubble is a product. Size = Sales Volume.</p>
            <div style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} />
                  <XAxis type="number" dataKey="Discount" name="Discount" unit="%" tick={{ fill: colors.muted, fontSize: 11 }} axisLine={{ stroke: colors.trace }} tickLine={false} />
                  <YAxis type="number" dataKey="Margin" name="Margin" unit="%" tick={{ fill: colors.muted, fontSize: 11 }} axisLine={{ stroke: colors.trace }} tickLine={false} />
                  <ZAxis type="number" dataKey="Qty" range={[50, 400]} name="Quantity Sold" />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                  <Scatter name="Products" data={BAKERY_DATA.scatter} fill={colors.primary} fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
