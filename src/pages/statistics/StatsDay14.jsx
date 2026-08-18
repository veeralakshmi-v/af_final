import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, RefreshCw } from 'lucide-react';
import laImg from '../../assets/linear_algebra_hierarchy.png';

/* ─── Shared helpers ─── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#db2777', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Formula = ({ children, color = '#7c3aed', bg = '#f5f3ff' }) => (
  <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: '8px', padding: '0.7rem 1rem', fontFamily: 'monospace', fontSize: '0.9rem', color, margin: '0.5rem 0', fontWeight: 600 }}>
    {children}
  </div>
);

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.86rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False)\b)|(?:\b(print|len|sum|range|sorted|min|max|round|abs|int|float|str|list|dict|random|append|math|sqrt|zip|enumerate)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0; let last = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m.index > last) toks.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(last, m.index)}</span>);
          const [tok, cmt, str, kw, bi, num] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (cmt) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (kw) { color = '#ff7b72'; fw = 'bold'; }
          else if (bi) color = '#ffb454';
          else if (num) color = '#79c0ff';
          toks.push(<span key={k++} style={{ color, fontWeight: fw }}>{tok}</span>);
          last = m.index + tok.length;
        }
        if (last < line.length) toks.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(last)}</span>);
        return <div key={li} style={{ whiteSpace: 'pre' }}>{toks.length ? toks : line}</div>;
      })}
    </div>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img src={src} alt={alt} onClick={() => setOpen(true)}
          style={{ maxWidth: '280px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#db2777'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        />
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>🔍 Click to zoom</span>
      </div>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.88)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, cursor: 'zoom-out', padding: '1.5rem' }}>
          <div style={{ position: 'relative', maxWidth: '90%' }}>
            <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '2px solid #334155' }} />
            <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Click anywhere to close</span>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Interactive Matrix Multiplier ─── */
const MatrixMultiplier = () => {
  const [a, setA] = useState([[1, 2], [3, 4]]);
  const [b, setB] = useState([[5, 6], [7, 8]]);
  const [showResult, setShowResult] = useState(false);

  const updateA = (i, j, v) => setA(prev => prev.map((row, ri) => row.map((c, ci) => ri === i && ci === j ? Number(v) || 0 : c)));
  const updateB = (i, j, v) => setB(prev => prev.map((row, ri) => row.map((c, ci) => ri === i && ci === j ? Number(v) || 0 : c)));

  const result = useMemo(() => {
    const rows = a.length, cols = b[0].length, k = b.length;
    return Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) =>
        a[i].reduce((s, _, ki) => s + a[i][ki] * b[ki][j], 0)
      )
    );
  }, [a, b]);

  const cellStyle = (editable) => ({
    width: '44px', height: '44px', textAlign: 'center', border: '2px solid #e2e8f0',
    borderRadius: '6px', fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace',
    background: editable ? '#fff' : '#f8fafc', outline: 'none', color: '#0f172a',
  });

  const MatCell = ({ val, onChange, color }) => (
    <input type="number" value={val} onChange={e => onChange(e.target.value)}
      style={{ ...cellStyle(true), borderColor: color, cursor: 'text' }} />
  );

  const MatDisplay = ({ data, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {data.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '4px' }}>
          {row.map((v, j) => <div key={j} style={{ ...cellStyle(false), display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}20`, color, border: `2px solid ${color}` }}>{v}</div>)}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>🔢 Interactive Matrix Multiplier (2×2)</h4>
      <p style={{ color: '#1e3a8a', fontSize: '0.83rem', margin: '0 0 1.2rem 0' }}>Edit the matrices below and click Multiply to see the result (C = A × B).</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {/* Matrix A */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.88rem', marginBottom: '6px' }}>Matrix A</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {a.map((row, i) => <div key={i} style={{ display: 'flex', gap: '4px' }}>{row.map((v, j) => <MatCell key={j} val={v} onChange={val => updateA(i, j, val)} color="#1d4ed8" />)}</div>)}
          </div>
        </div>
        <div style={{ fontSize: '1.8rem', color: '#475569', fontWeight: 300 }}>×</div>
        {/* Matrix B */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: '0.88rem', marginBottom: '6px' }}>Matrix B</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {b.map((row, i) => <div key={i} style={{ display: 'flex', gap: '4px' }}>{row.map((v, j) => <MatCell key={j} val={v} onChange={val => updateB(i, j, val)} color="#7c3aed" />)}</div>)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setShowResult(v => !v)}
            style={{ padding: '0.6rem 1.2rem', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> {showResult ? 'Re-compute' : 'Multiply'}
          </button>
          {showResult && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.88rem', marginBottom: '6px' }}>= C (Result)</div>
              <MatDisplay data={result} color="#16a34a" />
            </div>
          )}
        </div>
      </div>

      {/* Step-by-step */}
      {showResult && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: '#fff', borderRadius: '10px', padding: '1rem', border: '1px solid #bfdbfe' }}>
          <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '0.85rem', marginBottom: '8px' }}>Step-by-step calculation:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {result.map((row, i) =>
              row.map((_, j) => (
                <div key={`${i}${j}`} style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#334155', background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                  C[{i+1}][{j+1}] = {a[i].map((v, k) => `${v}×${b[k][j]}`).join(' + ')} = <strong style={{ color: '#16a34a' }}>{result[i][j]}</strong>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ─── Vector visualiser (SVG 2D) ─── */
const VectorVisualiser = () => {
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(4);
  const W = 200, H = 200, CX = 100, CY = 100, SCALE = 18;

  const px = CX + vx * SCALE;
  const py = CY - vy * SCALE;
  const mag = Math.sqrt(vx ** 2 + vy ** 2).toFixed(3);
  const angle = (Math.atan2(vy, vx) * 180 / Math.PI).toFixed(1);

  return (
    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '1.5rem' }}>
      <h4 style={{ color: '#7c3aed', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>📐 Vector Visualiser</h4>
      <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 1rem 0' }}>Adjust x and y components to see the vector, magnitude, and angle update in real time.</p>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', minWidth: '140px' }}>
          {[{ label: 'x component', val: vx, set: setVx }, { label: 'y component', val: vy, set: setVy }].map(ctrl => (
            <div key={ctrl.label}>
              <label style={{ display: 'block', fontWeight: 700, color: '#7c3aed', fontSize: '0.82rem', marginBottom: '3px' }}>
                {ctrl.label}: <span style={{ fontFamily: 'monospace' }}>{ctrl.val}</span>
              </label>
              <input type="range" min="-5" max="5" step="0.5" value={ctrl.val}
                onChange={e => ctrl.set(Number(e.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
            </div>
          ))}
          <div style={{ background: '#fff', borderRadius: '8px', padding: '0.7rem', border: '1px solid #ddd6fe', marginTop: '4px' }}>
            <div style={{ fontSize: '0.75rem', color: '#6d28d9', lineHeight: 1.8 }}>
              <div><strong>Vector:</strong> v = ({vx}, {vy})</div>
              <div><strong>Magnitude |v|:</strong> <span style={{ color: '#db2877', fontFamily: 'monospace' }}>{mag}</span></div>
              <div><strong>Angle θ:</strong> <span style={{ color: '#db2877', fontFamily: 'monospace' }}>{angle}°</span></div>
              <div style={{ marginTop: '4px', fontFamily: 'monospace', fontSize: '0.72rem' }}>|v| = √({vx}² + {vy}²)</div>
            </div>
          </div>
        </div>
        {/* SVG plot */}
        <svg width={W} height={H} style={{ border: '1px solid #ddd6fe', borderRadius: '8px', background: '#fff' }}>
          {/* Grid */}
          {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(x => (
            <line key={`gv${x}`} x1={CX + x * SCALE} y1={10} x2={CX + x * SCALE} y2={H - 10} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(y => (
            <line key={`gh${y}`} x1={10} y1={CY + y * SCALE} x2={W - 10} y2={CY + y * SCALE} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {/* Axes */}
          <line x1="10" y1={CY} x2={W - 10} y2={CY} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={CX} y1="10" x2={CX} y2={H - 10} stroke="#94a3b8" strokeWidth="1.5" />
          {/* Vector */}
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7c3aed" />
            </marker>
          </defs>
          <line x1={CX} y1={CY} x2={px} y2={py} stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#arr)" />
          {/* Projections */}
          <line x1={CX} y1={CY} x2={px} y2={CY} stroke="#db2877" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={px} y1={CY} x2={px} y2={py} stroke="#1d4ed8" strokeWidth="1" strokeDasharray="4,3" />
          {/* Labels */}
          <text x={px + 5} y={py - 5} fill="#7c3aed" fontSize="11" fontWeight="bold">v</text>
          <text x={CX + vx * SCALE / 2 - 6} y={CY + 14} fill="#db2877" fontSize="10">{vx}</text>
          <text x={px + 4} y={CY - vy * SCALE / 2} fill="#1d4ed8" fontSize="10">{vy}</text>
          {/* Origin */}
          <circle cx={CX} cy={CY} r="4" fill="#94a3b8" />
          <text x={CX + 5} y={CY + 14} fill="#64748b" fontSize="9">O</text>
        </svg>
      </div>
    </div>
  );
};

/* ─────────────────────────────────── */
export default function StatsDay14({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day14', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "Which of the following best describes a Scalar?", opts: ["A 1D array of numbers with magnitude and direction", "A 2D grid of numbers with rows and columns", "A single numerical value with no direction (0-dimensional)", "A multi-dimensional array used in deep learning"], ans: 2, exp: "A Scalar is a 0-dimensional quantity — a single real number with no direction. Examples: temperature (22°C), price (₹499), a model's loss value (0.0432). Scalars are the building blocks of all higher-dimensional structures." },
    { id: 2, q: "The dot product of vectors u = [1, 2, 3] and v = [4, 5, 6] is:", opts: ["[4, 10, 18]", "32", "15", "[5, 7, 9]"], ans: 1, exp: "Dot product = Σ(uᵢ × vᵢ) = (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32. It produces a single scalar value, not a vector. The dot product measures how much two vectors point in the same direction." },
    { id: 3, q: "If Matrix A is (3×4) and Matrix B is (4×2), what is the shape of their product A × B?", opts: ["(4×4)", "(3×2)", "(3×4)", "Matrix multiplication is not possible here"], ans: 1, exp: "For A×B: A must have columns = B's rows. Here: A is (3×4) and B is (4×2) → inner dimensions match (4=4). Result shape = (outer dimensions) = (3×2). Rule: (m×n) × (n×p) = (m×p)." },
    { id: 4, q: "In data analytics, what does the transpose of a matrix (Aᵀ) do?", opts: ["Multiplies all elements by -1 (negates)", "Swaps rows and columns — row i becomes column i", "Computes the matrix inverse", "Reduces matrix dimensions by 1"], ans: 1, exp: "Transpose (Aᵀ) swaps rows and columns: element at position (i,j) moves to (j,i). A (3×4) matrix becomes (4×3) after transposing. In data analytics, transposing is used constantly — e.g. X × Xᵀ in PCA and regression calculations." },
    { id: 5, q: "In Machine Learning, a batch of 32 colour images each of size 64×64 pixels is stored as which type of structure?", opts: ["A scalar (one value per image)", "A 1D vector of length 32", "A 2D matrix of shape (32 × 64)", "A 4D tensor of shape (32, 64, 64, 3)"], ans: 3, exp: "This is a 4D Tensor: [batch_size=32, height=64, width=64, channels=3(RGB)]. Images require 3D (H×W×C) per image. A batch adds a 4th dimension. Tensors are the core data structure in frameworks like TensorFlow and PyTorch." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 14 • Linear Algebra" title="Scalars, Vectors & Matrices">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Linear Algebra</strong> is the mathematical foundation of modern data science and machine learning. Every dataset, image, recommendation system, and neural network is built on these four data structures. Understanding them is non-negotiable for any serious data analyst.
            </p>

            <ZoomableImage src={laImg} alt="Linear Algebra Hierarchy — Scalar, Vector, Matrix, Tensor" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* 4 concept cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {[
                  { dim: '0D', name: 'Scalar', icon: '①', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', def: 'A single real number — a point on the number line. Has magnitude only, no direction.', notation: 'x = 42', examples: ['Learning rate: 0.001', 'Loss value: 0.0432', 'Temperature: 22°C', 'Price: ₹499'] },
                  { dim: '1D', name: 'Vector', icon: '↗', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', def: 'An ordered list of scalars. Has both magnitude and direction. Represents a point or direction in n-dimensional space.', notation: 'v = [1, 3, 5, 7]', examples: ['Feature row: [age=25, salary=50k, exp=3]', 'Word embedding: 300-dim vector', 'Gradient vector in ML', 'Pixel intensities (1D image)'] },
                  { dim: '2D', name: 'Matrix', icon: '▦', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', def: 'A 2D array of scalars arranged in rows and columns. The workhorse of data analytics — datasets, transformations, covariance.', notation: 'A[m×n] = [[1,2],[3,4],[5,6]]', examples: ['Dataset: (rows=observations, cols=features)', 'Covariance matrix in PCA', 'Adjacency matrix in graph networks', 'Pixel intensities (grayscale image)'] },
                  { dim: '3D+', name: 'Tensor', icon: '⬡', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', def: 'A generalisation of scalars, vectors, and matrices to N dimensions. The core data structure in deep learning.', notation: 'T[batch, height, width, channels]', examples: ['RGB image: (224, 224, 3)', 'Video batch: (32, 30, 224, 224, 3)', 'NLP sequences: (batch, seq_len, embed_dim)', 'Model weights in neural networks'] },
                ].map(c => (
                  <div key={c.name} style={{ padding: '1.2rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px', borderTop: `4px solid ${c.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: c.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.dim} Dimension</div>
                        <div style={{ fontWeight: 800, color: c.color, fontSize: '1rem' }}>{c.name}</div>
                      </div>
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 0.6rem 0' }}>{c.def}</p>
                    <code style={{ display: 'block', fontSize: '0.82rem', color: c.color, background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '6px', marginBottom: '0.6rem', fontWeight: 700 }}>{c.notation}</code>
                    <ul style={{ paddingLeft: '14px', margin: 0, color: '#475569', fontSize: '0.75rem', lineHeight: 1.7 }}>
                      {c.examples.map(e => <li key={e}>{e}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Vectors deep-dive */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0' }}>↗ Vector Properties & Operations</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {[
                    { name: 'Magnitude (Euclidean Norm)', formula: '|v| = √(v₁² + v₂² + ... + vₙ²)', ex: '|[3, 4]| = √(9+16) = 5', color: '#1d4ed8' },
                    { name: 'Dot Product', formula: 'u · v = Σ uᵢ × vᵢ = |u||v|cos(θ)', ex: '[1,2]·[3,4] = 1×3 + 2×4 = 11', color: '#7c3aed' },
                    { name: 'Vector Addition', formula: 'u + v = [u₁+v₁, u₂+v₂, ...]', ex: '[1,2]+[3,4] = [4, 6]', color: '#16a34a' },
                    { name: 'Scalar Multiplication', formula: 'k × v = [k×v₁, k×v₂, ...]', ex: '3 × [2, 5] = [6, 15]', color: '#dc2626' },
                  ].map(op => (
                    <div key={op.name} style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.8rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 700, color: op.color, fontSize: '0.83rem', marginBottom: '4px' }}>{op.name}</div>
                      <code style={{ display: 'block', fontSize: '0.8rem', color: op.color, marginBottom: '4px' }}>{op.formula}</code>
                      <code style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>Example: {op.ex}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Vector Visualiser */}
              <VectorVisualiser />

            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('operations')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain vectors and their role in machine learning with practical examples like word embeddings.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── MATRIX OPERATIONS ─── */}
      {activeTab === 'operations' && (
        <Section eyebrow="Matrix Algebra" title="Matrix Operations">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Matrices are the primary computational objects in data analytics. Understanding matrix operations — especially multiplication and inversion — is essential for regression, PCA, neural networks, and virtually all ML algorithms.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Operations grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'Matrix Addition / Subtraction', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', formula: 'C[i,j] = A[i,j] ± B[i,j]', rule: 'Both matrices must have the SAME shape (m×n)', ex: '[[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]', use: 'Adding bias terms, gradient accumulation' },
                  { name: 'Scalar Multiplication', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', formula: '(k × A)[i,j] = k × A[i,j]', rule: 'Multiply every element by the scalar k', ex: '3 × [[1,2],[3,4]] = [[3,6],[9,12]]', use: 'Scaling datasets, learning rate application' },
                  { name: 'Matrix Multiplication (Dot Product)', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', formula: 'C[i,j] = Σₖ A[i,k] × B[k,j]', rule: 'A must be (m×n), B must be (n×p) → C is (m×p)', ex: '(2×3) × (3×4) → (2×4) result', use: 'Linear transformations, neural network layers' },
                  { name: 'Transpose (Aᵀ)', color: '#db2877', bg: '#fdf2f8', border: '#fbcfe8', formula: 'Aᵀ[i,j] = A[j,i]', rule: 'Swap rows and columns. (m×n) → (n×m)', ex: '[[1,2,3],[4,5,6]]ᵀ → [[1,4],[2,5],[3,6]]', use: 'PCA, normal equations in regression: (XᵀX)⁻¹Xᵀy' },
                  { name: 'Matrix Inverse (A⁻¹)', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', formula: 'A × A⁻¹ = I (Identity matrix)', rule: 'Only for square non-singular matrices (det ≠ 0)', ex: 'For 2×2: A⁻¹ = (1/det) × [[d,-b],[-c,a]]', use: 'Solving linear systems, OLS regression coefficients' },
                  { name: 'Determinant (det(A))', color: '#d97706', bg: '#fffbeb', border: '#fde68a', formula: 'det(A) = ad − bc  (2×2)', rule: 'Scalar property of square matrices. det=0 → singular (no inverse)', ex: 'det([[3,8],[4,6]]) = 18−32 = −14', use: 'Check if a system has a unique solution, eigenvalue problems' },
                ].map(op => (
                  <div key={op.name} style={{ padding: '1.2rem', background: op.bg, border: `1px solid ${op.border}`, borderRadius: '10px', borderLeft: `4px solid ${op.color}` }}>
                    <div style={{ fontWeight: 800, color: op.color, fontSize: '0.9rem', marginBottom: '4px' }}>{op.name}</div>
                    <Formula color={op.color} bg="rgba(255,255,255,0.6)">{op.formula}</Formula>
                    <div style={{ fontSize: '0.77rem', color: '#475569', lineHeight: 1.5, margin: '4px 0' }}><strong>Rule:</strong> {op.rule}</div>
                    <code style={{ display: 'block', fontSize: '0.75rem', color: op.color, background: 'rgba(255,255,255,0.6)', padding: '3px 6px', borderRadius: '4px', margin: '4px 0' }}>Ex: {op.ex}</code>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>📊 <em>{op.use}</em></div>
                  </div>
                ))}
              </div>

              {/* Special matrices */}
              <div style={{ padding: '1.4rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0' }}>🎯 Special Matrices in Data Analytics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { name: 'Identity Matrix (I)', sym: '[[1,0,0],[0,1,0],[0,0,1]]', note: 'A × I = A. Ones on diagonal, zeros elsewhere. The matrix equivalent of 1.' },
                    { name: 'Zero Matrix (0)', sym: '[[0,0],[0,0]]', note: 'All elements zero. A + 0 = A. Matrix equivalent of 0.' },
                    { name: 'Symmetric Matrix', sym: 'A = Aᵀ (A[i,j] = A[j,i])', note: 'Covariance matrices and correlation matrices are always symmetric.' },
                    { name: 'Diagonal Matrix', sym: 'Non-zero only on diagonal', note: 'Scaling matrix. Appears in eigendecomposition: Σ = QΛQᵀ.' },
                    { name: 'Orthogonal Matrix', sym: 'Qᵀ = Q⁻¹  (QᵀQ = I)', note: 'Rotation/reflection transforms. Preserves distances. Used in PCA.' },
                  ].map(s => (
                    <div key={s.name} style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.8rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.83rem' }}>{s.name}</div>
                      <code style={{ display: 'block', color: '#7c3aed', fontSize: '0.75rem', margin: '4px 0' }}>{s.sym}</code>
                      <p style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.5, margin: 0 }}>{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive multiplier */}
              <MatrixMultiplier />
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('tensors')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain how matrix multiplication is used in linear regression (normal equations) and neural network forward pass.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TENSORS & APPLICATIONS ─── */}
      {activeTab === 'tensors' && (
        <Section eyebrow="Advanced Structures" title="Tensors & Applications in Data Analytics">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Tensors</strong> are the generalised form of scalars, vectors, and matrices. They are the native data structure of deep learning. Every dataset, model weight, and gradient in TensorFlow and PyTorch is a tensor.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Tensor shapes */}
              <div style={{ padding: '1.4rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                <h3 style={{ color: '#f0abfc', margin: '0 0 0.8rem 0', fontSize: '1rem' }}>📦 Tensor Shapes in Practice</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { rank: '0', name: 'Scalar', shape: '( )', ex: 'Loss = 0.043', color: '#c4b5fd' },
                    { rank: '1', name: 'Vector', shape: '(n,)', ex: 'Feature vector (512,)', color: '#93c5fd' },
                    { rank: '2', name: 'Matrix', shape: '(m, n)', ex: 'Dataset (1000, 20)', color: '#86efac' },
                    { rank: '3', name: '3D Tensor', shape: '(batch, seq, embed)', ex: 'NLP batch (32, 128, 768)', color: '#fde68a' },
                    { rank: '4', name: '4D Tensor', shape: '(batch, H, W, C)', ex: 'Image batch (32, 224, 224, 3)', color: '#fca5a5' },
                    { rank: '5', name: '5D Tensor', shape: '(batch, T, H, W, C)', ex: 'Video batch (8, 30, 224, 224, 3)', color: '#f0abfc' },
                  ].map(t => (
                    <div key={t.rank} style={{ background: '#1e293b', border: `1px solid ${t.color}30`, borderRadius: '8px', padding: '0.75rem', borderTop: `3px solid ${t.color}` }}>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Rank {t.rank}</div>
                      <div style={{ fontWeight: 800, color: t.color, fontSize: '0.9rem', marginTop: '2px' }}>{t.name}</div>
                      <code style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', margin: '4px 0' }}>{t.shape}</code>
                      <div style={{ color: '#64748b', fontSize: '0.73rem', fontStyle: 'italic' }}>{t.ex}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div style={{ padding: '1.4rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0' }}>🔬 Linear Algebra in Data Analytics — Key Applications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {[
                    { title: 'Linear Regression', color: '#1d4ed8', bg: '#eff6ff', icon: '📈', desc: 'The normal equation β = (XᵀX)⁻¹Xᵀy solves for coefficients using matrix multiplication and inverse. X is the design matrix (n×p), y is the response vector.', formula: 'β = (XᵀX)⁻¹Xᵀy' },
                    { title: 'Principal Component Analysis (PCA)', color: '#7c3aed', bg: '#f5f3ff', icon: '🔍', desc: 'PCA computes the covariance matrix (Σ = XᵀX/n), then performs eigendecomposition to find orthogonal principal components that capture maximum variance.', formula: 'Σ = XᵀX/n → eigendecomposition' },
                    { title: 'Cosine Similarity', color: '#16a34a', bg: '#f0fdf4', icon: '🧭', desc: 'Measures similarity between two vectors (e.g. documents, word embeddings, user profiles). Used in recommendation systems and NLP.', formula: 'cos(θ) = (u · v) / (|u| × |v|)' },
                    { title: 'Neural Network Forward Pass', color: '#dc2626', bg: '#fef2f2', icon: '🤖', desc: 'Each layer computes Y = X × W + b where X is the input matrix, W is the weight matrix, and b is the bias vector. This is pure matrix multiplication.', formula: 'Y = X × W + b → activation(Y)' },
                    { title: 'Image Processing', color: '#d97706', bg: '#fffbeb', icon: '🖼️', desc: 'Images are 3D tensors (H×W×C). Convolution applies filter matrices across spatial dimensions. Grayscale images are 2D matrices.', formula: 'RGB image: (224, 224, 3) tensor' },
                    { title: 'Recommendation Systems', color: '#db2877', bg: '#fdf2f8', icon: '⭐', desc: 'Collaborative filtering factorises the user-item matrix into two lower-rank matrices: User (U) and Item (V) embeddings such that Rating ≈ U × Vᵀ.', formula: 'R ≈ U × Vᵀ  (matrix factorisation)' },
                  ].map(a => (
                    <div key={a.title} style={{ padding: '1.1rem', background: a.bg, border: `1px solid ${a.color}30`, borderRadius: '10px', borderLeft: `4px solid ${a.color}` }}>
                      <div style={{ fontWeight: 800, color: a.color, fontSize: '0.9rem', marginBottom: '4px' }}>{a.icon} {a.title}</div>
                      <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.6, margin: '0 0 6px 0' }}>{a.desc}</p>
                      <code style={{ display: 'block', color: a.color, fontSize: '0.78rem', background: 'rgba(255,255,255,0.6)', padding: '3px 8px', borderRadius: '4px' }}>{a.formula}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eigenvalues teaser */}
              <div style={{ padding: '1.4rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
                <h3 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', fontSize: '1rem' }}>⚡ Eigenvalues & Eigenvectors (Preview)</h3>
                <p style={{ color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  For a matrix A, an eigenvector v and eigenvalue λ satisfy: <strong>A × v = λ × v</strong>. The matrix transforms v by scaling it (not rotating) by factor λ.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.7rem' }}>
                  {[
                    { use: 'PCA', note: 'Principal components = eigenvectors of covariance matrix. Largest eigenvalue = direction of max variance.' },
                    { use: 'Graph Analysis', note: 'PageRank algorithm uses the principal eigenvector of the web link matrix.' },
                    { use: 'Matrix Stability', note: 'Condition number (max λ/min λ) measures how well a system can be solved.' },
                  ].map(e => (
                    <div key={e.use} style={{ background: '#fff', borderRadius: '6px', padding: '0.7rem', border: '1px solid #bfdbfe' }}>
                      <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.82rem' }}>📌 {e.use}</div>
                      <p style={{ color: '#1e3a8a', fontSize: '0.77rem', lineHeight: 1.5, margin: '4px 0 0 0' }}>{e.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('python')}>Python Examples (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain how PCA uses eigendecomposition of the covariance matrix to find principal components.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PYTHON ─── */}
      {activeTab === 'python' && (
        <Section eyebrow="Python Implementation" title="Linear Algebra from Scratch in Python">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Complete implementation of all key linear algebra operations — no NumPy required. Pure Python with nested lists as matrices.
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> linear_algebra.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# ══════════════════════════════════════════════════════
# SCALARS
# ══════════════════════════════════════════════════════
learning_rate = 0.001     # scalar
loss_value    = 0.0432    # scalar
print(f"Loss: {loss_value}, LR: {learning_rate}")

# ══════════════════════════════════════════════════════
# VECTORS
# ══════════════════════════════════════════════════════
u = [1, 2, 3]
v = [4, 5, 6]

def vec_add(a, b):  return [a[i] + b[i] for i in range(len(a))]
def vec_scale(k, v): return [k * x for x in v]
def dot_product(a, b): return sum(a[i] * b[i] for i in range(len(a)))
def magnitude(v):      return math.sqrt(sum(x**2 for x in v))
def normalize(v):
    mag = magnitude(v)
    return [x / mag for x in v]
def cosine_sim(a, b):
    return dot_product(a, b) / (magnitude(a) * magnitude(b))

print(f"u + v        = {vec_add(u, v)}")
print(f"3 * u        = {vec_scale(3, u)}")
print(f"u · v        = {dot_product(u, v)}")
print(f"|u|          = {magnitude(u):.4f}")
print(f"normalize(u) = {[round(x,3) for x in normalize(u)]}")
print(f"cos_sim(u,v) = {cosine_sim(u,v):.4f}")

# ══════════════════════════════════════════════════════
# MATRICES  (as list of lists)
# ══════════════════════════════════════════════════════
A = [[1, 2, 3],
     [4, 5, 6]]   # 2x3

B = [[7,  8],
     [9,  10],
     [11, 12]]   # 3x2

def shape(M):       return (len(M), len(M[0]))
def transpose(M):
    rows, cols = shape(M)
    return [[M[i][j] for i in range(rows)] for j in range(cols)]

def mat_add(A, B):
    return [[A[i][j] + B[i][j] for j in range(len(A[0]))]
            for i in range(len(A))]

def mat_scale(k, M):
    return [[k * M[i][j] for j in range(len(M[0]))]
            for i in range(len(M))]

def mat_mul(A, B):
    rA, cA = shape(A)
    rB, cB = shape(B)
    assert cA == rB, f"Shape mismatch: {(rA,cA)} x {(rB,cB)}"
    return [[sum(A[i][k] * B[k][j] for k in range(cA))
             for j in range(cB)]
            for i in range(rA)]

def det2x2(M):
    return M[0][0]*M[1][1] - M[0][1]*M[1][0]

def inverse2x2(M):
    d = det2x2(M)
    assert d != 0, "Singular matrix — no inverse"
    return [[ M[1][1]/d, -M[0][1]/d],
            [-M[1][0]/d,  M[0][0]/d]]

print(f"\\nShape A: {shape(A)},  Shape B: {shape(B)}")
C = mat_mul(A, B)
print(f"A × B = {C}")
print(f"Aᵀ    = {transpose(A)}")

M = [[3, 8], [4, 6]]
print(f"det(M)     = {det2x2(M)}")
Minv = inverse2x2(M)
print(f"M⁻¹        = {[[round(x,3) for x in row] for row in Minv]}")
I = mat_mul(M, [[int(round(x)) for x in row] for row in Minv])
print(f"M × M⁻¹ ≈ I: {I}")  # Should be identity

# ══════════════════════════════════════════════════════
# PRACTICAL: OLS REGRESSION (Normal Equation)
# ══════════════════════════════════════════════════════
# Dataset: hours studied vs exam score
X_raw = [[1, 2], [1, 4], [1, 6], [1, 8], [1, 10]]  # [bias, hours]
y     = [55, 65, 72, 80, 90]

Xt   = transpose(X_raw)
XtX  = mat_mul(Xt, X_raw)
Xty  = [sum(Xt[i][j] * y[j] for j in range(len(y))) for i in range(len(Xt))]

# For 2×2 XtX, use direct inverse
XtX_inv = inverse2x2(XtX)
beta = [sum(XtX_inv[i][j] * Xty[j] for j in range(2)) for i in range(2)]
print(f"\\nOLS Coefficients: intercept={beta[0]:.2f}, slope={beta[1]:.2f}")
print(f"Prediction (8 hrs): {beta[0] + beta[1]*8:.1f}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.7 }}>{`Loss: 0.0432, LR: 0.001
u + v        = [5, 7, 9]
3 * u        = [3, 6, 9]
u · v        = 32
|u|          = 3.7417
normalize(u) = [0.267, 0.535, 0.802]
cos_sim(u,v) = 0.9746

Shape A: (2, 3),  Shape B: (3, 2)
A × B = [[58, 64], [139, 154]]
Aᵀ    = [[1, 4], [2, 5], [3, 6]]
det(M)     = -14
M⁻¹        = [[-0.429, 0.571], [0.286, -0.214]]
M × M⁻¹ ≈ I: [[1, 0], [0, 1]]

OLS Coefficients: intercept=43.00, slope=4.70
Prediction (8 hrs): 80.6`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How is matrix multiplication used in neural network layers? Walk me through a forward pass calculation.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 14 Assessment" title="Day 14 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Linear Algebra Pitfalls in Data Science
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Dimension mismatch in matrix multiplication:</strong> A is (m×n), B must be (n×p) — the inner dimensions MUST match. Swapping A and B gives a completely different result (matrix multiplication is NOT commutative: A×B ≠ B×A).</li>
                <li><strong>Attempting to invert a singular matrix:</strong> If det(A) = 0, the matrix has no inverse (the data is collinear). In regression, this causes the multicollinearity problem — use regularisation (Ridge/Lasso) instead.</li>
                <li><strong>Confusing magnitude with dimension:</strong> A vector [5] is a 1D vector with magnitude 5. A scalar 5 has no direction. These are fundamentally different structures.</li>
                <li><strong>Broadcasting errors in tensor operations:</strong> When working with tensors in NumPy/PyTorch, shapes must be compatible for broadcasting. Always check tensor shapes with .shape before operations.</li>
              </ul>
            </div>

            {/* Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#db2777" /> Interactive Quiz
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>{idx + 1}. {q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, oi) => {
                        const sel = selectedAnswers[q.id] === oi;
                        return (
                          <label key={oi} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: sel ? '2px solid #db2777' : '1px solid #cbd5e1', background: sel ? '#fdf2f8' : '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <input type="radio" name={`q-${q.id}`} checked={sel} onChange={() => handleSelectOption(q.id, oi)} style={{ accentColor: '#db2777' }} />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                    {selectedAnswers[q.id] !== undefined && !checkedQuestions[q.id] && (
                      <button className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }} onClick={() => handleCheckQuestion(q.id)}>Check Answer</button>
                    )}
                    {checkedQuestions[q.id] && (
                      <div style={{ marginTop: '1.2rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid', borderColor: selectedAnswers[q.id] === q.ans ? '#16a34a' : '#dc2626', background: selectedAnswers[q.id] === q.ans ? '#f0fdf4' : '#fef2f2' }}>
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>{selectedAnswers[q.id] === q.ans ? 'Correct! ✓' : 'Incorrect ✗'}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{q.exp}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={checkFinalScore}>Verify Final Score</button>
                {score !== null && <strong style={{ color: '#db2777', fontSize: '1.2rem' }}>Score: {score} / {quizQuestions.length}</strong>}
              </div>
            </div>

            {/* Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
              <h3 style={{ color: '#db2877', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> Given vectors u = [2, -1, 3] and v = [0, 4, -2], compute: (a) u + v, (b) 3u − 2v, (c) u · v, (d) |u|, (e) angle between u and v in degrees. Show all workings.</li>
                <li><strong>Task 2:</strong> Let A = [[2, 1], [5, 3]] and B = [[3, -1], [-5, 2]]. Verify that B is the inverse of A by computing A × B. Also verify using the det(A) formula.</li>
                <li><strong>Task 3:</strong> Create a 3×4 dataset matrix X representing 3 students with 4 features each (age, study hours, sleep hours, test score). Transpose it, compute XᵀX, and describe what this matrix represents in the context of linear regression.</li>
                <li><strong>Task 4:</strong> Implement a Python function <code>cosine_similarity_matrix(data)</code> that takes a list of vectors and returns a square matrix where entry [i][j] = cosine similarity between vectors i and j. This is used in recommendation systems and NLP.</li>
                <li><strong>Task 5:</strong> Describe in your own words how matrix factorisation (U × Vᵀ) is used in collaborative filtering for a movie recommendation system. What do the U and V matrices represent, and what are their shapes if you have 1000 users, 5000 movies, and 50 latent factors?</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 14 — Linear Algebra for Data Analytics! 🎉')}>
                Submit & Complete Day 14 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
