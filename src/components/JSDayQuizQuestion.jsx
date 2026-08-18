import React, { useState } from 'react';

export default function JSDayQuizQuestion({ item, qi, buttonColor = '#ca8a04' }) {
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
      <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Q{qi + 1}: {item.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {item.opts.map((opt, oi) => {
          let bg = 'white', border = '1px solid #cbd5e1', color = '#374151';
          if (checked) {
            if (oi === item.ans) { bg = '#f0fdf4'; border = '2px solid #22c55e'; color = '#166534'; }
            else if (oi === sel) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b'; }
          } else if (oi === sel) { bg = '#eff6ff'; border = '2px solid #3b82f6'; color = '#1d4ed8'; }
          return (
            <div key={oi} onClick={() => { if (!checked) setSel(oi); }}
              style={{ background: bg, border, borderRadius: '10px', padding: '10px 14px', cursor: checked ? 'default' : 'pointer', color, fontWeight: oi === sel || (checked && oi === item.ans) ? 700 : 400, transition: 'all 0.2s' }}>
              {String.fromCharCode(65 + oi)}. {opt}
            </div>
          );
        })}
      </div>
      {!checked && sel !== null && (
        <button onClick={() => setChecked(true)} style={{ marginTop: '12px', background: buttonColor, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>Check Answer</button>
      )}
      {checked && (
        <div style={{ marginTop: '10px', color: sel === item.ans ? '#15803d' : '#dc2626', fontWeight: 700 }}>
          {sel === item.ans ? '✅ Correct!' : `❌ Correct answer: ${item.opts[item.ans]}`}
        </div>
      )}
    </div>
  );
}
