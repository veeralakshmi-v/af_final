import React, { useState } from 'react';

export default function FoodAgenda() {
  const [food, setFood] = useState("");
  const [agenda, setAgenda] = useState(["Apple", "Banana"]);

  const addFood = () => {
    if (food.trim() === "") return;
    setAgenda([...agenda, food.trim()]);
    setFood("");
  };

  const deleteFood = (indexToDelete) => {
    setAgenda(agenda.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h2 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>Food Item Agenda</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter food item..."
          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
        />
        <button
          onClick={addFood}
          style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {agenda.map((item, index) => (
          <li
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px' }}
          >
            <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: 600 }}>{item}</span>
            <button
              onClick={() => deleteFood(index)}
              style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
