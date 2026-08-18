import React, { useState } from 'react';

export default function StudentSystem() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@school.com', course: 'React Developer', grade: 'A' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.com', course: 'Fullstack JS', grade: 'B' },
    { id: 3, name: 'Carol White', email: 'carol@school.com', course: 'SQL Databases', grade: 'A' }
  ]);
  const [form, setForm] = useState({ name: '', email: '', course: 'React Developer', grade: 'A' });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setStudents(prev => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', course: 'React Developer', grade: 'A' });
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ margin: '0 0 1rem', color: '#0f172a', fontWeight: 800 }}>Student Management System</h3>
      
      {/* Form Input fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input 
          placeholder="Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
        />
        <input 
          placeholder="Email" 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
        />
        <select 
          value={form.grade} 
          onChange={e => setForm({...form, grade: e.target.value})} 
          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <button 
          onClick={handleAdd} 
          style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', padding: '0 16px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
        >
          Add
        </button>
      </div>

      {/* Student data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Course</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Grade</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '8px 12px', color: '#475569' }}>{s.email}</td>
                <td style={{ padding: '8px 12px' }}>{s.course}</td>
                <td style={{ padding: '8px 12px', fontWeight: 700, color: s.grade === 'A' ? '#10b981' : '#f59e0b' }}>{s.grade}</td>
                <td style={{ padding: '8px 12px' }}>
                  <button 
                    onClick={() => handleDelete(s.id)} 
                    style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontSize: '0.78rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
