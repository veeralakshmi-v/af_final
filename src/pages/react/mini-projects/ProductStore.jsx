import React, { useState } from 'react';

export default function ProductStore() {
  const products = [
    { id: 1, name: 'Wireless Headset', price: 2999, category: 'Audio', rating: 4.5 },
    { id: 2, name: 'Mechanical Keyboard', price: 4500, category: 'Peripherals', rating: 4.8 },
    { id: 3, name: 'Ergonomic Mouse', price: 1800, category: 'Peripherals', rating: 4.2 },
    { id: 4, name: 'Smart Fitness Band', price: 3500, category: 'Wearables', rating: 4.0 }
  ];
  const [cart, setCart] = useState([]);

  const handleAddToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) {
        return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
      
      {/* Product Catalog */}
      <div>
        <h3 style={{ margin: '0 0 1rem', color: '#0f172a', fontWeight: 800 }}>UniStore Catalog</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {products.map(p => (
            <div key={p.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block', color: '#0f172a' }}>{p.name}</strong>
                <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'block', margin: '2px 0 6px' }}>Category: {p.category}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6366f1' }}>₹{p.price}</span>
              </div>
              <button 
                onClick={() => handleAddToCart(p)} 
                style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', padding: '5px 0', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', marginTop: 10 }}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>Shopping Cart</h4>
          {cart.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', textAlign: 'center', margin: '2rem 0' }}>Your cart is empty</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 10px', fontSize: '0.8rem' }}>
                  <div>
                    <strong>{item.name}</strong>
                    <span style={{ display: 'block', color: '#64748b', fontSize: '0.74rem' }}>{item.qty} x ₹{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveFromCart(item.id)} 
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
            <span>Total Amount:</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
