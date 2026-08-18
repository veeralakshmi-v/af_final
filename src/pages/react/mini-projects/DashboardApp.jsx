import React, { useState } from 'react';

export default function DashboardApp() {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Submit API Integrations homework', done: true },
    { id: 2, label: 'Configure protected routing gates', done: false },
    { id: 3, label: 'Optimize factorials rendering tables', done: false }
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const doneCount = tasks.filter(t => t.done).length;
  const progressPct = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ margin: '0 0 1.25rem', color: '#0f172a', fontWeight: 800 }}>Educational Analytics Dashboard</h3>
      
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Task Completion</span>
          <strong style={{ fontSize: '1.25rem', color: '#6366f1' }}>{progressPct}%</strong>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Metric Performance</span>
          <strong style={{ fontSize: '1.25rem', color: '#10b981' }}>92/100</strong>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Pending Tasks</span>
          <strong style={{ fontSize: '1.25rem', color: '#f59e0b' }}>{tasks.length - doneCount}</strong>
        </div>
      </div>

      {/* Task Checklist items */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
        <h4 style={{ margin: '0 0 10px', fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>Action Items Checklist</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tasks.map(t => (
            <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#374151', cursor: 'pointer', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
              <input 
                type="checkbox" 
                checked={t.done} 
                onChange={() => toggleTask(t.id)} 
                style={{ width: 14, height: 14, accentColor: '#6366f1' }}
              />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#94a3b8' : '#374151' }}>
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
