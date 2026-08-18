import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, RefreshCw, Layers, Zap, List, ShoppingCart, Package } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.6 }}>
      {lines.map((line, idx) => {
        // Comments
        if (line.trim().startsWith('//')) {
          return <div key={idx} style={{ color: '#64748b' }}>{line}</div>;
        }
        return <div key={idx}>{line}</div>;
      })}
    </pre>
  );
};

const Section = ({ children, eyebrow, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.25 }}
    className="section-card"
  >
    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CB = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

const MethodCard = ({ method, syntax, desc, example, result }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
      <code style={{ background: '#1e293b', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.9rem', fontWeight: 700 }}>{method}</code>
      <span style={{ color: '#64748b', fontSize: '0.82rem', fontFamily: 'monospace' }}>{syntax}</span>
    </div>
    <p style={{ margin: '0.4rem 0', color: '#334155', fontSize: '0.9rem' }}>{desc}</p>
    {example && (
      <CB code={`${example}\n// Output: ${result}`} />
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay5({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module5', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Math demo ──
  const [mathInput, setMathInput] = useState(16);
  const mathResults = {
    sqrt: Math.sqrt(Number(mathInput)).toFixed(4),
    abs: Math.abs(-Number(mathInput)),
    pow: Math.pow(Number(mathInput), 2),
    ceil: Math.ceil(Number(mathInput) + 0.3),
    floor: Math.floor(Number(mathInput) + 0.7),
    round: Math.round(Number(mathInput) + 0.5),
    log: Math.log(Number(mathInput)).toFixed(4),
    random: Math.random().toFixed(4),
  };

  // ── Inventory Demo ──
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Wireless Mouse', price: 650, stock: 12 },
    { id: 2, name: 'Mechanical Keyboard', price: 2400, stock: 3 },
    { id: 3, name: 'USB-C Cable', price: 299, stock: 25 },
    { id: 4, name: 'HD Webcam', price: 3200, stock: 4 },
  ]);
  const [invName, setInvName] = useState('');
  const [invPrice, setInvPrice] = useState('');
  const [invStock, setInvStock] = useState('');

  // ── Shopping Cart Demo ──
  const [cart, setCart] = useState([
    { name: 'Developer Laptop', price: 75000, quantity: 1 },
    { name: 'Noise Cancelling Headphones', price: 8500, quantity: 2 },
  ]);
  const [cartProd, setCartProd] = useState('');
  const [cartPrice, setCartPrice] = useState('');
  const [cartQty, setCartQty] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [assignVal, setAssignVal] = useState('');

  const addInventoryItem = () => {
    const p = Number(invPrice);
    const s = Number(invStock);
    if (invName.trim() && !isNaN(p) && !isNaN(s) && p >= 0 && s >= 0) {
      setInventory(prev => [...prev, { id: Date.now(), name: invName.trim(), price: p, stock: s }]);
      setInvName(''); setInvPrice(''); setInvStock('');
    }
  };

  const updateStock = (id, newStock) => {
    const s = Math.max(0, Number(newStock));
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: s } : item));
  };

  const deleteInventoryItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotalValue = () => inventory.reduce((total, item) => total + (item.price * item.stock), 0);
  const getLowStockItems = () => inventory.filter(item => item.stock < 5);

  const addCartItem = () => {
    const p = Number(cartPrice);
    const q = Number(cartQty);
    if (cartProd.trim() && !isNaN(p) && !isNaN(q) && p >= 0 && q > 0) {
      setCart(prev => {
        const exist = prev.find(item => item.name.toLowerCase() === cartProd.trim().toLowerCase());
        if (exist) {
          return prev.map(item => item.name.toLowerCase() === cartProd.trim().toLowerCase() ? { ...item, quantity: item.quantity + q } : item);
        }
        return [...prev, { name: cartProd.trim(), price: p, quantity: q }];
      });
      setCartProd(''); setCartPrice(''); setCartQty(1);
    }
  };

  const updateCartQty = (name, newQty) => {
    const q = Math.max(1, Number(newQty));
    setCart(prev => prev.map(item => item.name === name ? { ...item, quantity: q } : item));
  };

  const removeCartItem = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setAppliedDiscount(10);
    } else if (coupon.trim().toUpperCase() === 'FESTIVE20') {
      setAppliedDiscount(20);
    } else {
      alert('Invalid Coupon Code!');
    }
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getDiscountValue = () => (getSubtotal() * appliedDiscount) / 100;
  const getTax = () => ((getSubtotal() - getDiscountValue()) * 18) / 100; // 18% GST
  const getGrandTotal = () => getSubtotal() - getDiscountValue() + getTax();

  return (
    <AnimatePresence mode="wait">

      {/* ── FUNCTION DECLARATION ─────────────────────────────────────── */}
      {activeTab === 'js_func_declaration' && (
        <Section key="js_func_declaration" id="js_func_declaration" eyebrow="Day 5 • Functions" title="Function Declaration">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>🔧 What is a Function?</h3>
              <p style={{ opacity: 0.95, lineHeight: 1.7, color: 'white' }}>A function is a <strong style={{ color: '#fde047' }}>reusable block of code</strong> that performs a specific task. Instead of writing the same code multiple times, you define it once in a function and call it whenever needed.</p>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 Syntax</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// Function Declaration</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>functionName</span>() {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#8892b0' }}>// code to execute</span></div>
              <div>{'}'}</div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#8892b0' }}>// Calling the function</span></div>
              <div><span style={{ color: '#7ee787' }}>functionName</span>();</div>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Example Programs</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// Simple greeting function</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>greet</span>() {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Hello, Welcome to JavaScript!"</span>);</div>
              <div>{'}'}</div>
              <div><span style={{ color: '#7ee787' }}>greet</span>();&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// Call it anytime</span></div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#8892b0' }}>// Function Hoisting — can call BEFORE declaration!</span></div>
              <div><span style={{ color: '#7ee787' }}>sayHello</span>();&nbsp;<span style={{ color: '#8892b0' }}>// works! (hoisted)</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>sayHello</span>() {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Hello from hoisted function!"</span>);</div>
              <div>{'}'}</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
              <strong style={{ color: '#166534' }}>💡 Key Points:</strong>
              <ul style={{ paddingLeft: '1.5rem', color: '#14532d', lineHeight: 2, marginTop: '8px' }}>
                <li>Functions are defined with the <code>function</code> keyword</li>
                <li>Function declarations are <strong>hoisted</strong> — can be called before they appear in code</li>
                <li>Functions make code <strong>reusable, readable, and maintainable</strong></li>
              </ul>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', marginTop: '1.5rem' }} onClick={() => go('js_params_args')}>
              Next: Parameters & Arguments <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── PARAMETERS & ARGUMENTS ───────────────────────────────────── */}
      {activeTab === 'js_params_args' && (
        <Section key="js_params_args" id="js_params_args" eyebrow="Day 5 • Functions" title="Parameters & Arguments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Functions can take input variables called <strong>parameters</strong>. The actual values you pass to these parameters when calling the function are called <strong>arguments</strong>.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 Syntax & Flow</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>greetUser</span>(<span style={{ color: '#fbbf24' }}>name</span>) {'{'} &nbsp;<span style={{ color: '#8892b0' }}>// "name" is a PARAMETER</span></div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Hello, "</span> + <span style={{ color: '#fbbf24' }}>name</span>);</div>
              <div>{'}'}</div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#7ee787' }}>greetUser</span>(<span style={{ color: '#a5d6ff' }}>"John"</span>);&nbsp;<span style={{ color: '#8892b0' }}>// "John" is an ARGUMENT</span></div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Example Programs</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// Function with multiple parameters</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>addNumbers</span>(<span style={{ color: '#fbbf24' }}>num1</span>, <span style={{ color: '#fbbf24' }}>num2</span>) {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#fbbf24' }}>num1</span> + <span style={{ color: '#fbbf24' }}>num2</span>);</div>
              <div>{'}'}</div>
              <div><span style={{ color: '#7ee787' }}>addNumbers</span>(<span style={{ color: '#fbbf24' }}>10</span>, <span style={{ color: '#fbbf24' }}>20</span>);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// Output: 30</span></div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#8892b0' }}>// Default parameters (ES6)</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>welcome</span>(<span style={{ color: '#fbbf24' }}>user</span> = <span style={{ color: '#a5d6ff' }}>"Guest"</span>) {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Welcome, "</span> + <span style={{ color: '#fbbf24' }}>user</span>);</div>
              <div>{'}'}</div>
              <div><span style={{ color: '#7ee787' }}>welcome</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// Output: Welcome, Guest</span></div>
              <div><span style={{ color: '#7ee787' }}>welcome</span>(<span style={{ color: '#a5d6ff' }}>"Alice"</span>);&nbsp;<span style={{ color: '#8892b0' }}>// Output: Welcome, Alice</span></div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', marginTop: '1.5rem' }} onClick={() => go('js_return_stmt')}>
              Next: Return Statement <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── RETURN STATEMENT ─────────────────────────────────────────── */}
      {activeTab === 'js_return_stmt' && (
        <Section key="js_return_stmt" id="js_return_stmt" eyebrow="Day 5 • Functions" title="The Return Statement">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The <code>return</code> statement is used to send a value back from the function to the place where it was called. It also <strong>stops function execution</strong> immediately.</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 How it works</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>square</span>(<span style={{ color: '#fbbf24' }}>x</span>) {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>return</span> <span style={{ color: '#fbbf24' }}>x</span> * <span style={{ color: '#fbbf24' }}>x</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// sends square value back</span></div>
              <div>{'}'}</div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>let</span> result = <span style={{ color: '#7ee787' }}>square</span>(<span style={{ color: '#fbbf24' }}>5</span>); &nbsp;<span style={{ color: '#8892b0' }}>// result gets 25</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(result);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// Output: 25</span></div>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Example Programs</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// Check age eligibility</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>checkEligible</span>(<span style={{ color: '#fbbf24' }}>age</span>) {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>if</span> (<span style={{ color: '#fbbf24' }}>age</span> &gt;= <span style={{ color: '#fbbf24' }}>18</span>) {'{'}</div>
              <div style={{ paddingLeft: '3rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>return</span> <span style={{ color: '#a5d6ff' }}>"Eligible to Vote"</span>;</div>
              <div style={{ paddingLeft: '1.5rem' }}>{'}'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>return</span> <span style={{ color: '#a5d6ff' }}>"Not Eligible"</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// else case</span></div>
              <div>{'}'}</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#7ee787' }}>checkEligible</span>(<span style={{ color: '#fbbf24' }}>20</span>));&nbsp;<span style={{ color: '#8892b0' }}>// "Eligible to Vote"</span></div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', marginTop: '1rem' }} onClick={() => go('js_arrow_functions')}>
              Next: Arrow Functions <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── ARROW FUNCTIONS ──────────────────────────────────────────── */}
      {activeTab === 'js_arrow_functions' && (
        <Section key="js_arrow_functions" id="js_arrow_functions" eyebrow="Day 5 • Functions" title="Arrow Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>⚡ Arrow Functions (ES6)</h3>
              <p style={{ opacity: 0.9, color: 'white' }}>Arrow functions are a <strong>shorter, modern syntax</strong> for writing functions introduced in ES6. They use the <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0 6px', borderRadius: '4px' }}>{'=> '}</code> arrow symbol.</p>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// Regular function</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>function</span> <span style={{ color: '#7ee787' }}>add</span>(<span style={{ color: '#fbbf24' }}>a</span>, <span style={{ color: '#fbbf24' }}>b</span>) {'{'} <span style={{ color: '#ff7b72', fontWeight: 700 }}>return</span> <span style={{ color: '#fbbf24' }}>a</span> + <span style={{ color: '#fbbf24' }}>b</span>; {'}'}</div>
              <div style={{ marginTop: '10px' }}><span style={{ color: '#8892b0' }}>// Arrow function — same thing, shorter</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> <span style={{ color: '#7ee787' }}>add</span> = (<span style={{ color: '#fbbf24' }}>a</span>, <span style={{ color: '#fbbf24' }}>b</span>) =&gt; <span style={{ color: '#fbbf24' }}>a</span> + <span style={{ color: '#fbbf24' }}>b</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// implicit return</span></div>
              <div style={{ marginTop: '10px' }}><span style={{ color: '#8892b0' }}>// Single parameter — parentheses optional</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> <span style={{ color: '#7ee787' }}>square</span> = <span style={{ color: '#fbbf24' }}>n</span> =&gt; <span style={{ color: '#fbbf24' }}>n</span> * <span style={{ color: '#fbbf24' }}>n</span>;</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#7ee787' }}>square</span>(<span style={{ color: '#fbbf24' }}>5</span>));&nbsp;<span style={{ color: '#8892b0' }}>// 25</span></div>
              <div style={{ marginTop: '10px' }}><span style={{ color: '#8892b0' }}>// No parameters</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> <span style={{ color: '#7ee787' }}>greet</span> = () =&gt; <span style={{ color: '#a5d6ff' }}>"Hello!"</span>;</div>
              <div style={{ marginTop: '10px' }}><span style={{ color: '#8892b0' }}>// Multi-line arrow function</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> <span style={{ color: '#7ee787' }}>calcArea</span> = (<span style={{ color: '#fbbf24' }}>w</span>, <span style={{ color: '#fbbf24' }}>h</span>) =&gt; {'{'}</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> area = <span style={{ color: '#fbbf24' }}>w</span> * <span style={{ color: '#fbbf24' }}>h</span>;</div>
              <div style={{ paddingLeft: '1.5rem' }}><span style={{ color: '#ff7b72', fontWeight: 700 }}>return</span> area;</div>
              <div>{'}'}</div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#059669', borderColor: '#059669', marginTop: '1.5rem' }} onClick={() => go('js_scope')}>
              Next: Scope <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── SCOPE ────────────────────────────────────────────────────── */}
      {activeTab === 'js_scope' && (
        <Section key="js_scope" id="js_scope" eyebrow="Day 5 • Functions" title="Scope in JavaScript">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p><strong>Scope</strong> determines where a variable is accessible in your code. There are 3 types: Global, Function/Local, and Block scope.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { type: 'Global Scope', icon: '🌍', color: '#0284c7', bg: '#eff6ff', border: '#93c5fd', desc: 'Variables declared outside any function. Accessible everywhere in the program.', code: `var globalVar = "I am global";\nfunction show() {\n  console.log(globalVar); // accessible\n}\nshow();\nconsole.log(globalVar); // also accessible` },
                { type: 'Local / Function Scope', icon: '📦', color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd', desc: 'Variables declared inside a function. Only accessible within that function.', code: `function calculate() {\n  var localVar = 42; // local to this function\n  console.log(localVar); // works\n}\ncalculate();\nconsole.log(localVar); // ❌ Error! Not accessible` },
                { type: 'Block Scope', icon: '🔲', color: '#059669', bg: '#f0fdf4', border: '#86efac', desc: 'Variables declared with let or const inside {} blocks are block-scoped.', code: `if (true) {\n  let blockVar = "block!";\n  const PI = 3.14;\n  console.log(blockVar); // works\n}\nconsole.log(blockVar); // ❌ Error! var would work though` },
              ].map(item => (
                <div key={item.type} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div style={{ fontWeight: 800, color: item.color, fontSize: '1rem' }}>{item.type}</div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '10px' }}>{item.desc}</p>
                  <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#f8fafc', whiteSpace: 'pre', lineHeight: 1.7 }}>{item.code}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', marginTop: '1rem' }} onClick={() => go('js_types')}>
              Next: Types of Functions <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: TYPES OF FUNCTIONS ════════════════ */}
      {activeTab === 'js_types' && (
        <Section eyebrow="Syllabus 06" title="Types of Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript supports multiple ways to define functions. Choosing the right one depends on whether you need features like hoisting, simplified syntax, or context preservation.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Function Declaration (Named Function)</h3>
            <p>Defined with the <code>function</code> keyword. Function declarations are <strong>hoisted</strong>, meaning they can be called before they are written in the code file.</p>
            <CB code={`// Hoisted invocation (Works!)
greet();

function greet() {
  console.log("Hello!");
}`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. Function Expression (Anonymous Function)</h3>
            <p>Defined inside an expression (usually assigned to a variable). These are <strong>not hoisted</strong>, so you must define them before calling them.</p>
            <CB code={`// Calling here would throw an error!
// sayHello();

const sayHello = function() {
  console.log("Hello from expression!");
};

sayHello(); // Works!`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. Arrow Functions</h3>
            <p>Introduced in ES6, arrow functions provide a shorter syntax. They do not have their own <code>this</code> context, which makes them ideal for callbacks and array helper methods.</p>
            <CB code={`// Standard Arrow function
const multiply = (a, b) => {
  return a * b;
};

// Implicit return (one-line functions don't need {} or return keyword)
const square = x => x * x;

console.log(multiply(3, 4)); // 12
console.log(square(5));       // 25`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>4. Immediately Invoked Function Expressions (IIFE)</h3>
            <p>An <strong>IIFE</strong> is a function that runs as soon as it is defined. It is wrapped in parentheses to form an expression, followed by <code>()</code> to immediately execute it. This is useful for creating local scopes and avoiding global variable contamination.</p>
            <CB code={`(function() {
  let tempMessage = "I run immediately and keep variables local!";
  console.log(tempMessage);
})(); // Output: "I run immediately and keep variables local!"

// Passing arguments to IIFE
(function(name) {
  console.log("Welcome, " + name + "!");
})("Alice"); // Output: "Welcome, Alice!"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>5. Anonymous Functions</h3>
            <p>An <strong>Anonymous Function</strong> is a function without a name. They are typically used where functions are treated as values, such as in function expressions or passed as arguments to other functions.</p>
            <CB code={`// Anonymous function as callback inside setTimeout
setTimeout(function() {
  console.log("Executed after 2 seconds");
}, 2000);

// Anonymous arrow function as callback inside array mapping
const doubled = [1, 2, 3].map(x => x * 2);
console.log(doubled); // Output: [2, 4, 6]`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>6. Callback Functions</h3>
            <p>A <strong>Callback Function</strong> is a function passed into another function as an argument, which is then invoked inside the outer function to complete some routine or action.</p>
            <CB code={`// Declaring the function with callback parameter
function processUserInput(name, callback) {
  console.log("Processing input...");
  callback(name); // Invoking callback
}

// Callback implementation
const greetUser = (user) => {
  console.log("Hello, " + user + "!");
};

processUserInput("Charlie", greetUser);`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>7. Constructor Functions</h3>
            <p>A <strong>Constructor Function</strong> is used with the <code>new</code> keyword to create object instances. It serves as a blueprint for creating multiple objects of the same type.</p>
            <CB code={`function User(name, role) {
  this.name = name;
  this.role = role;
  this.sayRole = function() {
    console.log(this.name + " is an " + this.role);
  };
}

const admin = new User("Alice", "Admin");
const guest = new User("Bob", "Guest");

admin.sayRole(); // Output: "Alice is an Admin"
guest.sayRole(); // Output: "Bob is a Guest"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>8. Generator Functions</h3>
            <p>A <strong>Generator Function</strong> is a special function that can be paused and resumed at a later time. They are declared with <code>function*</code> and use the <code>yield</code> keyword to return values sequentially.</p>
            <CB code={`function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // Output: 1
console.log(gen.next().value); // Output: 2
console.log(gen.next().value); // Output: 3`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Comparison of Function Types</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Feature</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Function Declaration</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Function Expression</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Arrow Function</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>IIFE</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Constructor Function</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Generator Function</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Syntax Example</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>function f() &#123;&#125;</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>const f = function() &#123;&#125;</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>const f = () =&gt; &#123;&#125;</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>(function() &#123;&#125;)()</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>function Person() &#123;&#125;</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>function* gen() &#123;&#125;</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Hoisting</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>this Context</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Dynamic (Own)</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Dynamic (Own)</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#8b5cf6', fontWeight: 600 }}>Lexical (Inherits parent)</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Dynamic (Global/Undefined)</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#3b82f6', fontWeight: 600 }}>New Instance Object</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Dynamic (Own)</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>new Operator</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 600 }}>Yes (Primary Purpose)</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#dc2626', fontWeight: 600 }}>No</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_math')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Math Functions <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: MATH FUNCTIONS ════════════════ */}
      {activeTab === 'js_math' && (
        <Section eyebrow="Syllabus 07" title="Math Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript provides a built-in <strong>Math object</strong> that contains properties and methods to perform mathematical tasks on numbers. Unlike other objects, you don't need to create a Math object first — you can use it directly.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1.5rem 0' }}>
              <MethodCard method="Math.PI" syntax="Math.PI" desc="Returns the ratio of the circumference of a circle to its diameter (approx. 3.14159)." example={`console.log(Math.PI);`} result="3.141592653589793" />
              <MethodCard method="Math.sqrt()" syntax="Math.sqrt(x)" desc="Returns the square root of a number x." example={`let result = Math.sqrt(64);\nconsole.log(result);`} result="8" />
              <MethodCard method="Math.abs()" syntax="Math.abs(x)" desc="Returns the absolute (positive) value of x." example={`let result = Math.abs(-42);\nconsole.log(result);`} result="42" />
              <MethodCard method="Math.pow()" syntax="Math.pow(base, exp)" desc="Returns base raised to the power of exp." example={`let result = Math.pow(3, 4);\nconsole.log(result);`} result="81" />
              <MethodCard method="Math.ceil()" syntax="Math.ceil(x)" desc="Rounds x UP to the nearest integer." example={`let result = Math.ceil(4.2);\nconsole.log(result);`} result="5" />
              <MethodCard method="Math.floor()" syntax="Math.floor(x)" desc="Rounds x DOWN to the nearest integer." example={`let result = Math.floor(4.9);\nconsole.log(result);`} result="4" />
              <MethodCard method="Math.round()" syntax="Math.round(x)" desc="Rounds x to the nearest integer (0.5 rounds up)." example={`let result = Math.round(4.5);\nconsole.log(result);`} result="5" />
              <MethodCard method="Math.max() / Math.min()" syntax="Math.max(a, b, ...) / Math.min(a, b, ...)" desc="Returns the largest or smallest of the given numbers." example={`let biggest = Math.max(10, 25, 8, 40, 3);\nlet smallest = Math.min(10, 25, 8, 40, 3);\nconsole.log(biggest);\nconsole.log(smallest);`} result="40 / 3" />
              <MethodCard method="Math.random()" syntax="Math.random()" desc="Returns a random decimal between 0 (inclusive) and 1 (exclusive)." example={`let rand = Math.random();\nconsole.log(rand);\n// To get random int 1-10:\nlet randInt = Math.floor(Math.random() * 10) + 1;\nconsole.log(randInt);`} result="0.7345... / 7 (varies)" />
              <MethodCard method="Math.trunc()" syntax="Math.trunc(x)" desc="Removes the decimal part — returns only the integer portion." example={`let result = Math.trunc(4.9);\nlet neg = Math.trunc(-4.9);\nconsole.log(result);\nconsole.log(neg);`} result="4 / -4" />
              <MethodCard method="Math.log()" syntax="Math.log(x)" desc="Returns the natural logarithm (base e) of x." example={`let result = Math.log(Math.E);\nconsole.log(result);`} result="1" />
            </div>

            {/* Interactive Demo */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: Math Functions</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Input Number:</label>
              <input type="number" value={mathInput} onChange={e => setMathInput(e.target.value)}
                style={{ display: 'block', marginTop: '0.3rem', marginBottom: '1rem', padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '120px', fontSize: '1rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.7rem' }}>
                {Object.entries(mathResults).map(([k, v]) => (
                  <div key={k} style={{ background: '#1e293b', borderRadius: 8, padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#ffb454', fontFamily: 'monospace', fontSize: '0.82rem' }}>Math.{k}()</span>
                    <span style={{ color: '#79c0ff', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_inventory')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Inventory Manager <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: INVENTORY MANAGER ════════════════ */}
      {activeTab === 'js_inventory' && (
        <Section eyebrow="Syllabus 08" title="Inventory Manager Program">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This project uses standard named functions and arrow functions to keep track of a business inventory stock list. Low stock items are flagged dynamically.</p>

            {/* Inventory Quick Stats */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem 1.5rem', flex: 1, minWidth: '150px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Inventory Value</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ca8a04', marginTop: '0.2rem' }}>₹{calculateTotalValue().toLocaleString()}</div>
              </div>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '1rem 1.5rem', flex: 1, minWidth: '150px' }}>
                <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>Low Stock Alert (&lt; 5)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', marginTop: '0.2rem' }}>{getLowStockItems().length} Items</div>
              </div>
            </div>

            {/* Add Item Form */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>📦 Add Inventory Item</strong>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
                <input placeholder="Item name..." value={invName} onChange={e => setInvName(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 2, minWidth: '150px' }} />
                <input placeholder="Price (₹)..." type="number" value={invPrice} onChange={e => setInvPrice(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '80px' }} />
                <input placeholder="Qty..." type="number" value={invStock} onChange={e => setInvStock(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addInventoryItem()}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '70px' }} />
                <button onClick={addInventoryItem}
                  style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                  Add Item
                </button>
              </div>
            </div>

            {/* Inventory List */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Item Name</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'center' }}>Stock Level</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'right' }}>Total Value</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => {
                    const isLow = item.stock < 5;
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', background: isLow ? '#fff5f5' : 'transparent' }}>
                        <td style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>
                          {item.name}
                          {isLow && <span style={{ marginLeft: '0.5rem', background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 700 }}>LOW STOCK</span>}
                        </td>
                        <td style={{ padding: '0.7rem 1rem', textAlign: 'right' }}>₹{item.price}</td>
                        <td style={{ padding: '0.7rem 1rem', textAlign: 'center' }}>
                          <input type="number" value={item.stock} onChange={e => updateStock(item.id, e.target.value)}
                            style={{ width: '60px', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: 6, textAlign: 'center' }} />
                        </td>
                        <td style={{ padding: '0.7rem 1rem', textAlign: 'right', fontWeight: 700 }}>₹{item.price * item.stock}</td>
                        <td style={{ padding: '0.7rem 1rem', textAlign: 'center' }}>
                          <button onClick={() => deleteInventoryItem(item.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Source Code Panel */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '2rem' }}>📋 Source Code</h3>
            <CB code={`// Inventory Manager
let inventory = [
  { name: "Wireless Mouse", price: 650, stock: 12 },
  { name: "Mechanical Keyboard", price: 2400, stock: 3 }
];

// Arrow function to calculate total value of inventory
const calculateTotalValue = () => {
  return inventory.reduce((total, item) => total + (item.price * item.stock), 0);
};

// Arrow function to filter items low in stock
const getLowStockItems = () => {
  return inventory.filter(item => item.stock < 5);
};

// Standard function to add new item
function addInventoryItem(name, price, stock) {
  inventory.push({ name, price, stock });
}

// Standard function to update stock level
function updateStock(name, newStock) {
  let item = inventory.find(i => i.name === name);
  if (item) {
    item.stock = newStock;
  }
}

addInventoryItem("USB-C Cable", 299, 25);
updateStock("Wireless Mouse", 15);

console.log("Total Value: ₹" + calculateTotalValue());
console.log("Low Stock Items:", getLowStockItems());`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_cart')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Shopping Cart <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 4: SHOPPING CART ════════════════ */}
      {activeTab === 'js_cart' && (
        <Section eyebrow="Syllabus 09" title="Shopping Cart Program">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This project uses expressions and arrow functions to manage customer item purchases, compute total amounts, apply promotional codes, and add tax variables.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem', margin: '1rem 0', alignItems: 'start' }}>
              {/* Product Inputs & Cart List */}
              <div>
                {/* Add Item Form */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', marginBottom: '1.2rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>🛒 Add Product to Cart</strong>
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
                    <input placeholder="Product name..." value={cartProd} onChange={e => setCartProd(e.target.value)}
                      style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 2, minWidth: '130px' }} />
                    <input placeholder="Price..." type="number" value={cartPrice} onChange={e => setCartPrice(e.target.value)}
                      style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '70px' }} />
                    <input placeholder="Qty" type="number" min="1" value={cartQty} onChange={e => setCartQty(Number(e.target.value))}
                      onKeyDown={e => e.key === 'Enter' && addCartItem()}
                      style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '50px' }} />
                    <button onClick={addCartItem}
                      style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                      Add
                    </button>
                  </div>
                </div>

                {/* Cart Items List */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: idx === cart.length - 1 ? 'none' : '1px solid #e2e8f0', background: '#fff' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.1rem' }}>₹{item.price.toLocaleString()} each</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Qty:</span>
                          <input type="number" min="1" value={item.quantity} onChange={e => updateCartQty(item.name, e.target.value)}
                            style={{ width: '45px', padding: '0.2rem 0.3rem', border: '1px solid #cbd5e1', borderRadius: 6, textAlign: 'center' }} />
                        </div>
                        <span style={{ fontWeight: 700, minWidth: '70px', textAlign: 'right' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                        <button onClick={() => removeCartItem(item.name)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>×</button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', background: '#f8fafc' }}>Your cart is empty.</div>
                  )}
                </div>
              </div>

              {/* Bill Details */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem' }}>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Bill Receipt</strong>
                <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Subtotal:</span>
                    <span style={{ fontWeight: 600 }}>₹{getSubtotal().toLocaleString()}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                      <span>Discount ({appliedDiscount}%):</span>
                      <span>-₹{getDiscountValue().toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>GST (18%):</span>
                    <span style={{ fontWeight: 600 }}>₹{getTax().toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid #cbd5e1', margin: '0.5rem 0', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
                    <span>Grand Total:</span>
                    <span style={{ color: '#ca8a04' }}>₹{getGrandTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '0.8rem', marginTop: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Promo Coupon Code:</label>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                    <input placeholder="SAVE10 or FESTIVE20" value={coupon} onChange={e => setCoupon(e.target.value)}
                      style={{ padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.85rem', flex: 1 }} />
                    <button onClick={applyCoupon}
                      style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                      Apply
                    </button>
                  </div>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>* Coupons: SAVE10 (10% off), FESTIVE20 (20% off)</p>
                </div>
              </div>
            </div>

            {/* Source Code */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>📋 Source Code</h3>
            <CB code={`// Shopping Cart Program with Arrow Functions
let cart = [
  { name: "Developer Laptop", price: 75000, quantity: 1 },
  { name: "Noise Cancelling Headphones", price: 8500, quantity: 2 }
];

const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

const calculateDiscount = (subtotal, couponCode) => {
  if (couponCode === "SAVE10") return subtotal * 0.10;
  if (couponCode === "FESTIVE20") return subtotal * 0.20;
  return 0;
};

const calculateTax = (amountAfterDiscount) => amountAfterDiscount * 0.18; // 18% GST

function getGrandTotal(couponCode) {
  let subtotal = getSubtotal();
  let discount = calculateDiscount(subtotal, couponCode);
  let taxableAmount = subtotal - discount;
  let tax = calculateTax(taxableAmount);
  return taxableAmount + tax;
}

console.log("Subtotal: ₹" + getSubtotal());
console.log("Total Bill (with SAVE10 Coupon): ₹" + getGrandTotal("SAVE10"));`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Lab <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="day5" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 5: ASSIGNMENT ════════════════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 5 Assignment: Functions & Math">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Write a function greetUser(name) that prints "Hello, [name]!". Test it with different names.' },
                { no: 2, task: 'Write a function calculateArea(width, height) that returns the area of a rectangle. If height is not provided, use a default value of 10.' },
                { no: 3, task: 'Write an arrow function isEven(num) that returns true if a number is even, and false otherwise.' },
                { no: 4, task: 'Write a function findMax(a, b, c) that uses Math.max() to return the largest of three numbers.' },
                { no: 5, task: 'Create an Immediately Invoked Function Expression (IIFE) that calculates the square of a number and logs it immediately.' },
                { no: 6, task: 'Write a function operate(a, b, callback) that accepts two numbers and a callback function, applies the callback to the numbers, and returns the result.' },
              ].map(t => (
                <div key={t.no} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ca8a04', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{t.no}</span>
                  <span style={{ fontSize: '0.92rem', color: '#334155' }}>{t.task}</span>
                </div>
              ))}
            </div>

            <textarea
              value={assignVal}
              onChange={e => setAssignVal(e.target.value)}
              disabled={submitted}
              placeholder="Paste your code and answers here..."
              style={{ width: '100%', height: '200px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', fontSize: '0.9rem' }}
            />

            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || !assignVal.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {submitted ? 'Submitted ✅' : 'Submit Assignment'}
            </button>

            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── DAY 5 QUIZ ───────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d5" id="quiz_d5" eyebrow="Day 5 • Assessment" title="Day 5 Quiz: Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which keyword is used to define a regular function in JavaScript?', opts: ['def', 'func', 'function', 'fn'], ans: 2 },
              { q: 'What is the difference between a parameter and an argument?', opts: ['No difference', 'Parameters are in function definition; arguments are passed at call time', 'Arguments are optional; parameters are required', 'Parameters are values; arguments are variables'], ans: 1 },
              { q: 'What does a function return if there is no return statement?', opts: ['null', '0', 'undefined', 'false'], ans: 2 },
              { q: 'Which is the correct arrow function syntax for adding two numbers?', opts: ['function(a, b) => a + b', 'const add = (a, b) => a + b', 'const add = a, b -> a + b', 'arrow add(a, b) { return a + b; }'], ans: 1 },
              { q: 'A variable declared with let inside a function is:', opts: ['Globally accessible', 'Only accessible inside that function', 'Accessible in all functions', 'Undefined everywhere'], ans: 1 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#7c3aed" />
            ))}
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Day 5 Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
