import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { DATA } from '../../dashboardData';

const fmtINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtCompact = (n) => {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(2) + "Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(2) + "L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px', color: '#1E293B', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {fmtINR(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Project1Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Colors
  const colors = {
    primary: '#4F46E5', // Indigo
    secondary: '#10B981', // Emerald
    bg: '#F8FAFC',
    panel: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
    trace: '#E2E8F0'
  };

  const chartMargins = { top: 10, right: 10, left: 0, bottom: 0 };
  const axisProps = { stroke: colors.trace, tick: { fill: colors.muted, fontSize: 11 }, tickLine: false, axisLine: false };

  // Data Filtering Logic
  const currentMonthData = selectedMonth === 'All' ? null : DATA.month.find(m => m.Month === selectedMonth);
  const scale = currentMonthData ? (currentMonthData.Revenue / DATA.kpi.total_revenue) : 1;

  const kpis = currentMonthData ? {
    total_revenue: currentMonthData.Revenue,
    total_profit: currentMonthData.Profit,
    growth: selectedMonth === 'All' ? "+14.2%" : "+1.5%"
  } : {
    total_revenue: DATA.kpi.total_revenue,
    total_profit: DATA.kpi.total_profit,
    growth: "+14.2%"
  };

  const scaledCategory = DATA.category.map(c => ({
    ...c,
    Revenue: c.Revenue * scale,
    Profit: c.Profit * scale
  }));
  const displayMonthData = currentMonthData ? [currentMonthData] : DATA.month;

  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", borderRadius: '12px', border: `1px solid ${colors.trace}`, overflow: 'hidden', padding: '24px 34px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: '#1E293B' }}>Sales Executive Dashboard</h2>
          <p style={{ margin: 0, color: colors.muted, fontSize: '13px' }}>Regional E-Commerce Performance Overview</p>
        </div>
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.trace}`, outline: 'none', background: '#FFFFFF', color: colors.primary, fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
          >
            <option value="All">All Months (FY 2024)</option>
            {DATA.month.map(m => <option key={m.Month} value={m.Month}>{m.Month}</option>)}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Sales</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: '#1E293B' }}>{fmtCompact(kpis.total_revenue)}</div>
        </div>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Profit</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: '#1E293B' }}>{fmtCompact(kpis.total_profit)}</div>
        </div>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>YoY Growth</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: colors.secondary }}>{kpis.growth}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>

        {/* Line Chart */}
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Sales Over Time</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayMonthData} margin={chartMargins}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                <XAxis dataKey="Month" {...axisProps} />
                <YAxis tickFormatter={fmtCompact} {...axisProps} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Revenue" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Matrix */}
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Category Performance Matrix</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Category</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Total Sales</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Total Profit</th>
                </tr>
              </thead>
              <tbody>
                {scaledCategory.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.trace}` }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500, color: '#1E293B' }}>{row.Category}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: colors.muted }}>{fmtINR(row.Revenue)}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: colors.secondary, fontWeight: 500 }}>{fmtINR(row.Profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
