import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { HR_DATA } from '../../hrData';
import { Download } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px', color: '#1E293B', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Project2Dashboard() {
  const [selectedDept, setSelectedDept] = useState('All');

  // Colors
  const colors = {
    primary: '#8B5CF6', // Violet
    secondary: '#EC4899', // Pink
    tertiary: '#3B82F6', // Blue
    bg: '#F8FAFC',
    panel: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
    trace: '#E2E8F0'
  };

  const chartMargins = { top: 10, right: 10, left: 0, bottom: 0 };
  const axisProps = { stroke: colors.trace, tick: { fill: colors.muted, fontSize: 11 }, tickLine: false, axisLine: false };

  // Data Filtering
  const deptData = selectedDept === 'All' ? null : HR_DATA.department.find(d => d.Department === selectedDept);
  const scale = deptData ? (deptData.Employees / HR_DATA.kpi.total_employees) : 1;

  const kpis = deptData ? {
    total_employees: deptData.Employees,
    attrition_rate: ((deptData.Attrition / deptData.Employees) * 100).toFixed(1),
    avg_age: HR_DATA.kpi.avg_age, // Assuming roughly equal across depts for demo
    avg_income: HR_DATA.kpi.avg_income // Assuming roughly equal across depts for demo
  } : HR_DATA.kpi;

  const attritionDonut = [
    { name: 'Yes', value: deptData ? deptData.Attrition : 237 },
    { name: 'No', value: deptData ? (deptData.Employees - deptData.Attrition) : (1470 - 237) }
  ];

  const scaledGender = HR_DATA.gender.map(g => ({
    ...g,
    Attrition: Math.round(g.Attrition * scale)
  }));

  const scaledJobRole = HR_DATA.jobRole.map(r => ({
    ...r,
    Employees: Math.round(r.Employees * scale),
    Attrition: Math.round(r.Attrition * scale)
  }));

  const pieColors = [colors.secondary, colors.trace];

  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", borderRadius: '12px', border: `1px solid ${colors.trace}`, overflow: 'hidden', padding: '24px 34px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: '#1E293B' }}>HR Attrition Dashboard</h2>
          <p style={{ margin: '0 0 16px', color: colors.muted, fontSize: '13px' }}>Employee Demographics & Turnover Analysis</p>
          <a href="/hr_attrition_data.csv" download style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', color: '#334155', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', border: '1px solid #E2E8F0' }}>
            <Download size={16} /> Download CSV Dataset
          </a>
        </div>
        <div>
          <select 
            value={selectedDept} 
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.trace}`, outline: 'none', background: '#FFFFFF', color: colors.primary, fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
          >
            <option value="All">All Departments</option>
            {HR_DATA.department.map(d => <option key={d.Department} value={d.Department}>{d.Department}</option>)}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Employees</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: '#1E293B' }}>{kpis.total_employees.toLocaleString()}</div>
        </div>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.secondary }}></div>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Attrition Rate</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: colors.secondary }}>{kpis.attrition_rate}%</div>
        </div>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.tertiary }}></div>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Average Age</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: '#1E293B' }}>{kpis.avg_age}</div>
        </div>
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: colors.primary }}></div>
          <div style={{ color: colors.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Avg Monthly Income</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', color: '#1E293B' }}>${kpis.avg_income.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        
        {/* Attrition Donut */}
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Attrition Breakdown</h3>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attritionDonut} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2}>
                  {attritionDonut.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % 2]} />)}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition by Gender Bar Chart */}
        <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Attrition by Gender</h3>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scaledGender} margin={chartMargins}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.trace} vertical={false} />
                <XAxis dataKey="Gender" {...axisProps} />
                <YAxis {...axisProps} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="Attrition" fill={colors.tertiary} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Job Role Matrix */}
      <div style={{ background: colors.panel, border: `1px solid ${colors.trace}`, borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Attrition by Job Role</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Job Role</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Total Employees</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Attrition Count</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `2px solid ${colors.trace}`, color: colors.muted, fontWeight: 600 }}>Attrition Rate</th>
              </tr>
            </thead>
            <tbody>
              {scaledJobRole.map((row, i) => {
                const rate = row.Employees > 0 ? ((row.Attrition / row.Employees) * 100).toFixed(1) : 0;
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.trace}` }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500, color: '#1E293B' }}>{row.Role}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: colors.muted }}>{row.Employees}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: colors.secondary, fontWeight: 500 }}>{row.Attrition}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: colors.muted }}>{rate}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
