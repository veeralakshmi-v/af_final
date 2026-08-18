import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, Sparkles, RefreshCw } from 'lucide-react';
import matImg from '../../assets/matrix_operations_overview.png';

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
  <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: '8px', padding: '0.65rem 1rem', fontFamily: 'monospace', fontSize: '0.88rem', color, margin: '0.4rem 0', fontWeight: 600 }}>
    {children}
  </div>
);

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.85rem', overflowX: 'auto' }}>
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
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }} />
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

/* ─── Matrix renderer (HTML grid) ─── */
const MatGrid = ({ data, color = '#334155', highlight = [] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', border: `2px solid ${color}`, borderRadius: '6px', padding: '6px', background: '#fff', position: 'relative' }}>
    <span style={{ position: 'absolute', left: '-8px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.8rem', color, lineHeight: 1 }}>[</span>
    <span style={{ position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.8rem', color, lineHeight: 1 }}>]</span>
    {data.map((row, ri) => (
      <div key={ri} style={{ display: 'flex', gap: '3px' }}>
        {row.map((cell, ci) => (
          <div key={ci} style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, background: highlight.some(h => h[0] === ri && h[1] === ci) ? `${color}25` : '#f8fafc', borderRadius: '4px', color }}>{cell}</div>
        ))}
      </div>
    ))}
  </div>
);

/* ─── Interactive Matrix Playground ─── */
const MatPlayground = () => {
  const ops = ['Add', 'Subtract', 'Multiply', 'Transpose A', 'Determinant A', 'Inverse A'];
  const [op, setOp] = useState('Add');
  const [a, setA] = useState([[2, 3], [1, 4]]);
  const [b, setB] = useState([[5, 1], [2, 3]]);
  const [showSteps, setShowSteps] = useState(false);

  const update = (setter) => (i, j, v) => setter(prev => prev.map((row, ri) => row.map((c, ci) => ri === i && ci === j ? (Number(v) || 0) : c)));

  const shape = M => [M.length, M[0].length];
  const det2 = M => M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const inv2 = M => { const d = det2(M); if (Math.abs(d) < 1e-10) return null; return [[+(M[1][1]/d).toFixed(3), +(-M[0][1]/d).toFixed(3)], [+(-M[1][0]/d).toFixed(3), +(M[0][0]/d).toFixed(3)]]; };
  const transpose = M => M[0].map((_, j) => M.map(r => r[j]));
  const matMul = (A, B) => A.map((rowA, i) => B[0].map((_, j) => A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));

  const { result, steps, error } = useMemo(() => {
    try {
      switch (op) {
        case 'Add':
          return { result: a.map((r, i) => r.map((v, j) => v + b[i][j])), steps: [`C[i,j] = A[i,j] + B[i,j]`, `Both matrices must have same shape ${shape(a)[0]}×${shape(a)[1]}`], error: null };
        case 'Subtract':
          return { result: a.map((r, i) => r.map((v, j) => v - b[i][j])), steps: [`C[i,j] = A[i,j] - B[i,j]`, `Element-wise subtraction`], error: null };
        case 'Multiply':
          return { result: matMul(a, b), steps: [`(${shape(a)[0]}×${shape(a)[1]}) × (${shape(b)[0]}×${shape(b)[1]}) = (${shape(a)[0]}×${shape(b)[1]})`, `C[i,j] = Σ A[i,k] × B[k,j]`], error: null };
        case 'Transpose A':
          return { result: transpose(a), steps: [`Aᵀ[i,j] = A[j,i]`, `Shape: (${shape(a)[0]}×${shape(a)[1]}) → (${shape(a)[1]}×${shape(a)[0]})`], error: null };
        case 'Determinant A': {
          const d = det2(a);
          return { result: [[+d.toFixed(4)]], steps: [`det(A) = a×d - b×c`, `= ${a[0][0]}×${a[1][1]} - ${a[0][1]}×${a[1][0]}`, `= ${a[0][0]*a[1][1]} - ${a[0][1]*a[1][0]} = ${+d.toFixed(4)}`], error: null };
        }
        case 'Inverse A': {
          const inv = inv2(a);
          if (!inv) return { result: null, steps: ['det(A) = 0 — matrix is singular!', 'No inverse exists.'], error: 'Singular matrix' };
          return { result: inv, steps: [`det(A) = ${+det2(a).toFixed(4)}`, `A⁻¹ = (1/det) × [[d,-b],[-c,a]]`, `Verify: A × A⁻¹ = I`], error: null };
        }
        default: return { result: null, steps: [], error: null };
      }
    } catch { return { result: null, steps: ['Shape mismatch or other error'], error: 'Error' }; }
  }, [op, a, b]);

  const CellInput = ({ val, onChange, color }) => (
    <input type="number" value={val} onChange={e => onChange(e.target.value)}
      style={{ width: '42px', height: '42px', textAlign: 'center', border: `2px solid ${color}`, borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace', background: '#fff', outline: 'none', color: '#0f172a' }} />
  );

  const needsB = ['Add', 'Subtract', 'Multiply'].includes(op);

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>🧮 Interactive Matrix Playground</h4>
      <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 1.2rem 0' }}>Select an operation, edit matrix values, and see live results with step-by-step explanations.</p>

      {/* Operation selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.4rem' }}>
        {ops.map(o => (
          <button key={o} onClick={() => { setOp(o); setShowSteps(false); }}
            style={{ padding: '5px 12px', borderRadius: '20px', border: `2px solid ${op === o ? '#db2877' : '#e2e8f0'}`, background: op === o ? '#db2877' : '#fff', color: op === o ? '#fff' : '#334155', fontWeight: op === o ? 700 : 400, cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.15s' }}>
            {o}
          </button>
        ))}
      </div>

      {/* Matrix inputs + result */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {/* A */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.85rem', marginBottom: '6px' }}>Matrix A (2×2)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>
            {a.map((row, i) => <div key={i} style={{ display: 'flex', gap: '4px' }}>{row.map((v, j) => <CellInput key={j} val={v} onChange={val => update(setA)(i, j, val)} color="#1d4ed8" />)}</div>)}
          </div>
        </div>

        {needsB && <>
          <div style={{ fontSize: '1.6rem', color: '#475569', fontWeight: 300 }}>
            {op === 'Add' ? '+' : op === 'Subtract' ? '−' : '×'}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: '0.85rem', marginBottom: '6px' }}>Matrix B (2×2)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>
              {b.map((row, i) => <div key={i} style={{ display: 'flex', gap: '4px' }}>{row.map((v, j) => <CellInput key={j} val={v} onChange={val => update(setB)(i, j, val)} color="#7c3aed" />)}</div>)}
            </div>
          </div>
        </>}

        {result && <>
          <div style={{ fontSize: '1.6rem', color: '#475569', fontWeight: 300 }}>=</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.85rem', marginBottom: '6px' }}>Result</div>
            <motion.div key={JSON.stringify(result)} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '0 8px' }}>
              <MatGrid data={result} color="#16a34a" />
            </motion.div>
          </div>
        </>}

        {error && <div style={{ padding: '0.8rem', background: '#fef2f2', borderRadius: '8px', color: '#dc2626', fontWeight: 700, fontSize: '0.85rem' }}>⚠️ {error}</div>}
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div>
          <button onClick={() => setShowSteps(v => !v)} style={{ fontSize: '0.8rem', color: '#db2877', background: 'none', border: '1px solid #fbcfe8', padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
            {showSteps ? '▲ Hide' : '▼ Show'} Step-by-step
          </button>
          <AnimatePresence>
            {showSteps && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '0.8rem', border: '1px solid #e2e8f0', marginTop: '8px' }}>
                  {steps.map((s, i) => <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#334155', padding: '2px 0' }}>{i + 1}. {s}</div>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

/* ─── Eigen visualiser ─── */
const EigenVisualiser = () => {
  const [a11, setA11] = useState(3);
  const [a12, setA12] = useState(1);
  const [a21, setA21] = useState(0);
  const [a22, setA22] = useState(2);
  const W = 220, H = 220, CX = 110, CY = 110, SCALE = 18;

  const { lam1, lam2, v1, v2 } = useMemo(() => {
    const trace = a11 + a22;
    const detA = a11 * a22 - a12 * a21;
    const disc = trace * trace - 4 * detA;
    if (disc < 0) return { lam1: null, lam2: null, v1: null, v2: null };
    const l1 = (trace + Math.sqrt(disc)) / 2;
    const l2 = (trace - Math.sqrt(disc)) / 2;
    const ev1 = a12 !== 0 ? [a12, l1 - a11] : [1, 0];
    const ev2 = a12 !== 0 ? [a12, l2 - a11] : [0, 1];
    const norm = v => { const m = Math.sqrt(v[0]**2+v[1]**2); return m > 0 ? [v[0]/m, v[1]/m] : v; };
    return { lam1: +l1.toFixed(3), lam2: +l2.toFixed(3), v1: norm(ev1), v2: norm(ev2) };
  }, [a11, a12, a21, a22]);

  const toSVG = (x, y) => ({ cx: CX + x * SCALE, cy: CY - y * SCALE });

  const Arrow = ({ vx, vy, scale, color }) => {
    const { cx: x2, cy: y2 } = toSVG(vx * scale, vy * scale);
    return (
      <g>
        <defs><marker id={`arw-${color.slice(1)}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill={color} /></marker></defs>
        <line x1={CX} y1={CY} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" markerEnd={`url(#arw-${color.slice(1)})`} />
      </g>
    );
  };

  return (
    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '1.5rem' }}>
      <h4 style={{ color: '#1e40af', margin: '0 0 0.4rem 0', fontSize: '1rem' }}>⚡ Eigenvector Visualiser</h4>
      <p style={{ color: '#1e3a8a', fontSize: '0.8rem', margin: '0 0 1rem 0' }}>Adjust matrix A (2×2). Blue = eigenvector 1, Red = eigenvector 2. They show the directions the matrix stretches/shrinks data.</p>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Controls */}
        <div>
          <div style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '0.82rem', marginBottom: '8px' }}>Matrix A:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '1rem' }}>
            {[{ l: 'a₁₁', v: a11, s: setA11 }, { l: 'a₁₂', v: a12, s: setA12 }, { l: 'a₂₁', v: a21, s: setA21 }, { l: 'a₂₂', v: a22, s: setA22 }].map(ctrl => (
              <div key={ctrl.l}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', display: 'block' }}>{ctrl.l}: {ctrl.v}</label>
                <input type="range" min="-4" max="4" step="0.5" value={ctrl.v} onChange={e => ctrl.s(Number(e.target.value))} style={{ width: '80px', accentColor: '#1d4ed8' }} />
              </div>
            ))}
          </div>
          {lam1 !== null ? (
            <div style={{ background: '#fff', borderRadius: '8px', padding: '0.7rem', border: '1px solid #bfdbfe', fontSize: '0.75rem', lineHeight: 1.8 }}>
              <div style={{ color: '#2563eb', fontWeight: 700 }}>λ₁ = {lam1}</div>
              <div style={{ color: '#475569' }}>v₁ = [{v1[0].toFixed(2)}, {v1[1].toFixed(2)}]</div>
              <div style={{ color: '#dc2626', fontWeight: 700, marginTop: '4px' }}>λ₂ = {lam2}</div>
              <div style={{ color: '#475569' }}>v₂ = [{v2[0].toFixed(2)}, {v2[1].toFixed(2)}]</div>
              <div style={{ color: '#64748b', marginTop: '6px', fontStyle: 'italic', fontSize: '0.7rem' }}>Trace = λ₁+λ₂ = {+(a11+a22).toFixed(3)}<br />Det = λ₁×λ₂ = {+(a11*a22-a12*a21).toFixed(3)}</div>
            </div>
          ) : (
            <div style={{ background: '#fef2f2', borderRadius: '8px', padding: '0.5rem', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600 }}>Complex eigenvalues (disc &lt; 0)</div>
          )}
        </div>
        {/* SVG */}
        <svg width={W} height={H} style={{ border: '1px solid #bfdbfe', borderRadius: '8px', background: '#fff' }}>
          {[-6,-4,-2,0,2,4,6].map(x => <line key={`gv${x}`} x1={CX+x*SCALE} y1={10} x2={CX+x*SCALE} y2={H-10} stroke="#f1f5f9" strokeWidth="1" />)}
          {[-6,-4,-2,0,2,4,6].map(y => <line key={`gh${y}`} x1={10} y1={CY+y*SCALE} x2={W-10} y2={CY+y*SCALE} stroke="#f1f5f9" strokeWidth="1" />)}
          <line x1="10" y1={CY} x2={W-10} y2={CY} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={CX} y1="10" x2={CX} y2={H-10} stroke="#94a3b8" strokeWidth="1.5" />
          {lam1 !== null && v1 && <Arrow vx={v1[0]} vy={v1[1]} scale={Math.abs(lam1) * 1.5 + 0.5} color="#2563eb" />}
          {lam2 !== null && v2 && <Arrow vx={v2[0]} vy={v2[1]} scale={Math.abs(lam2) * 1.5 + 0.5} color="#dc2626" />}
          <circle cx={CX} cy={CY} r="4" fill="#94a3b8" />
          <text x={CX+3} y={CY+12} fill="#64748b" fontSize="9">O</text>
        </svg>
      </div>
    </div>
  );
};

/* ─────────────────────────────────── */
export default function StatsDay15({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day15', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "Matrix A is (3×4) and Matrix B is (3×4). Which operation is valid?", opts: ["A × B (matrix multiplication)", "A + B (matrix addition)", "Both are valid", "Neither is valid"], ans: 1, exp: "Addition requires both matrices to have the SAME shape. Both are (3×4) so A + B = C (3×4) is valid (element-wise). Matrix multiplication (A × B) requires A's columns = B's rows: A has 4 columns, B has 3 rows → 4 ≠ 3, so multiplication is NOT valid." },
    { id: 2, q: "What is the determinant of the matrix [[4, 7], [2, 6]]?", opts: ["48", "10", "26", "34"], ans: 1, exp: "det([[4,7],[2,6]]) = (4×6) − (7×2) = 24 − 14 = 10. For a 2×2 matrix [[a,b],[c,d]], det = ad − bc." },
    { id: 3, q: "If the determinant of matrix A is 0, what does this imply?", opts: ["A has a unique inverse", "The matrix is orthogonal", "A is singular — no inverse exists and the system has no unique solution", "All rows are independent"], ans: 2, exp: "det(A) = 0 means the matrix is singular (degenerate). The rows/columns are linearly dependent. No inverse exists (A⁻¹ is undefined). In a linear system Ax=b, det=0 means either no solution or infinitely many solutions." },
    { id: 4, q: "Eigenvalues and eigenvectors satisfy the equation Av = λv. What does this mean geometrically?", opts: ["The vector v rotates when multiplied by A", "The vector v is unchanged by A", "The matrix A only SCALES the vector v (by factor λ) without changing its direction", "A and v are always perpendicular"], ans: 2, exp: "Geometrically, eigenvectors are the special directions that matrix A does not rotate — it only stretches or shrinks them by the eigenvalue λ. λ > 1: stretches. 0 < λ < 1: shrinks. λ < 0: flips direction. This is key to PCA and dimensionality reduction." },
    { id: 5, q: "In PCA (Principal Component Analysis), the principal components are the:", opts: ["Rows of the original data matrix X", "Eigenvalues of the covariance matrix", "Eigenvectors of the covariance matrix, ordered by eigenvalue magnitude", "Inverse of the correlation matrix"], ans: 2, exp: "PCA finds the eigenvectors of the covariance matrix (XᵀX/n). Each eigenvector is a principal component — a direction of maximum variance. The corresponding eigenvalue tells you HOW MUCH variance that component captures. Sorted by eigenvalue descending → PC1, PC2, ..." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── BASICS ─── */}
      {activeTab === 'basics' && (
        <Section eyebrow="Day 15 • Matrix Operations" title="Addition, Subtraction, Multiplication & Transpose">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Matrix operations are the core computations behind every machine learning algorithm. This module covers each operation rigorously — formula, rule, worked example, and where it appears in real data science.
            </p>

            <ZoomableImage src={matImg} alt="Matrix Operations Overview Diagram" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Operation cards */}
              {[
                {
                  name: 'Matrix Addition', sym: 'A + B = C', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
                  formula: 'C[i,j] = A[i,j] + B[i,j]',
                  rule: 'Both matrices MUST have the same shape (m×n). Result is also (m×n). Element-wise operation.',
                  ex: { A: [[1,2],[3,4]], B: [[5,6],[7,8]], C: [[6,8],[10,12]] },
                  props: ['Commutative: A+B = B+A', 'Associative: (A+B)+C = A+(B+C)', 'Identity: A + 0 = A (zero matrix)'],
                  ml: 'Adding bias vectors to layer outputs in neural networks: Y = XW + b'
                },
                {
                  name: 'Matrix Subtraction', sym: 'A − B = C', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
                  formula: 'C[i,j] = A[i,j] − B[i,j]',
                  rule: 'Same shape requirement as addition. Subtracts corresponding elements.',
                  ex: { A: [[5,8],[9,6]], B: [[2,3],[4,1]], C: [[3,5],[5,5]] },
                  props: ['NOT commutative: A−B ≠ B−A', 'A − A = 0 (zero matrix)', 'A − 0 = A'],
                  ml: 'Computing residuals (errors): e = y − ŷ. Gradient descent updates: W = W − α∇W'
                },
                {
                  name: 'Matrix Multiplication', sym: 'A × B = C', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
                  formula: 'C[i,j] = Σₖ A[i,k] × B[k,j]',
                  rule: '(m×n) × (n×p) = (m×p). Inner dimensions must match. NOT element-wise!',
                  ex: { A: [[1,2],[3,4]], B: [[5,0],[1,2]], C: [[7,4],[19,8]] },
                  props: ['NOT commutative: A×B ≠ B×A (generally)', 'Associative: (AB)C = A(BC)', 'Distributive: A(B+C) = AB+AC'],
                  ml: 'Neural network layers: Y = XW (forward pass). Regression: β = (XᵀX)⁻¹Xᵀy'
                },
                {
                  name: 'Transpose (Aᵀ)', sym: 'Aᵀ[i,j] = A[j,i]', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
                  formula: 'Aᵀ swaps rows ↔ columns. (m×n) → (n×m)',
                  rule: 'Row i becomes column i. Symmetric matrices satisfy A = Aᵀ.',
                  ex: { A: [[1,2,3],[4,5,6]], C: [[1,4],[2,5],[3,6]] },
                  props: ['(Aᵀ)ᵀ = A (double transpose = original)', '(AB)ᵀ = BᵀAᵀ (reverse order!)', '(A+B)ᵀ = Aᵀ + Bᵀ'],
                  ml: 'Normal equation: XᵀX (covariance). Dot product: xᵀy. PCA: covariance = XᵀX/n'
                },
              ].map(op => (
                <div key={op.name} style={{ padding: '1.4rem', background: op.bg, border: `1px solid ${op.border}`, borderRadius: '12px', borderLeft: `5px solid ${op.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <h3 style={{ color: op.color, margin: 0, fontSize: '1rem' }}>{op.name}</h3>
                    <code style={{ color: op.color, fontSize: '0.85rem', background: 'rgba(255,255,255,0.7)', padding: '2px 10px', borderRadius: '12px', fontWeight: 700 }}>{op.sym}</code>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    <div>
                      <Formula color={op.color} bg="rgba(255,255,255,0.6)">{op.formula}</Formula>
                      <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.6, margin: '0.5rem 0' }}>{op.rule}</p>
                      {/* Visual example */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        <MatGrid data={op.ex.A} color={op.color} />
                        {op.ex.B && <span style={{ fontSize: '1.4rem', color: op.color }}>{op.name.includes('Add') ? '+' : op.name.includes('Sub') ? '−' : '×'}</span>}
                        {op.ex.B && <MatGrid data={op.ex.B} color={op.color} />}
                        <span style={{ fontSize: '1.4rem', color: op.color }}>=</span>
                        <MatGrid data={op.ex.C} color={op.color} />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: op.color, fontSize: '0.8rem', marginBottom: '4px' }}>Key Properties:</div>
                      <ul style={{ paddingLeft: '16px', margin: '0 0 0.7rem 0', color: '#475569', fontSize: '0.8rem', lineHeight: 1.7 }}>
                        {op.props.map(p => <li key={p}>{p}</li>)}
                      </ul>
                      <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                        <div style={{ fontWeight: 700, color: op.color, fontSize: '0.78rem' }}>🤖 ML Application:</div>
                        <p style={{ color: '#334155', fontSize: '0.78rem', margin: '3px 0 0 0', lineHeight: 1.6 }}>{op.ml}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dot product */}
              <div style={{ padding: '1.4rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', borderLeft: '5px solid #d97706' }}>
                <h3 style={{ color: '#d97706', margin: '0 0 0.6rem 0', fontSize: '1rem' }}>· Dot Product (Vector Form)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <Formula color="#d97706" bg="rgba(255,255,255,0.7)">u · v = Σ uᵢ × vᵢ = |u||v|cos(θ)</Formula>
                    <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.6, margin: '0.5rem 0' }}>The dot product of two vectors gives a scalar. It measures how much two vectors align. If u·v = 0, the vectors are orthogonal (perpendicular).</p>
                    <code style={{ display: 'block', fontSize: '0.8rem', color: '#d97706', background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '4px' }}>
                      [1,2,3] · [4,5,6] = 4+10+18 = 32
                    </code>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '0.8rem', border: '1px solid #fed7aa' }}>
                    <div style={{ fontWeight: 700, color: '#d97706', fontSize: '0.8rem', marginBottom: '6px' }}>Applications:</div>
                    {['Cosine similarity for recommendation systems and NLP', 'Forward pass in neural networks (row × column)', 'Projection: how much of u lies along v direction', 'Checking orthogonality (u·v=0 → perpendicular)'].map(a => (
                      <div key={a} style={{ fontSize: '0.78rem', color: '#92400e', padding: '3px 0', borderBottom: '1px solid #fde68a', lineHeight: 1.5 }}>• {a}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('advanced')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Walk me through a neural network forward pass using matrix multiplication step by step.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ADVANCED ─── */}
      {activeTab === 'advanced' && (
        <Section eyebrow="Advanced Operations" title="Matrix Inverse, Determinant, Rank & Identity">
          <div className="panel">
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {[
                {
                  name: 'Identity Matrix (I)', icon: '𝕀', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
                  def: 'A square matrix with 1s on the main diagonal and 0s everywhere else. The matrix equivalent of the number 1. Any matrix multiplied by I gives itself.',
                  formula: 'A × I = I × A = A',
                  ex: '2×2: [[1,0],[0,1]]    3×3: [[1,0,0],[0,1,0],[0,0,1]]',
                  note: 'Identity matrices are always square (n×n). Used in eigenvalue equation: (A − λI)v = 0'
                },
                {
                  name: 'Matrix Inverse (A⁻¹)', icon: '⁻¹', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
                  def: 'The inverse of matrix A is the matrix A⁻¹ such that A × A⁻¹ = I. Only square non-singular matrices (det ≠ 0) have an inverse. The matrix equivalent of 1/a for numbers.',
                  formula: 'For 2×2: A⁻¹ = (1/det) × [[d,−b],[−c,a]]   where A=[[a,b],[c,d]]',
                  ex: 'A=[[3,1],[1,2]] → det=5 → A⁻¹=(1/5)×[[2,−1],[−1,3]] = [[0.4,−0.2],[−0.2,0.6]]',
                  note: 'Used in OLS: β=(XᵀX)⁻¹Xᵀy. Computationally expensive for large matrices — use LU decomposition instead.'
                },
                {
                  name: 'Determinant (det or |A|)', icon: '|·|', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
                  def: 'A scalar value computed from a square matrix. Encodes the "volume scaling factor" of the linear transformation. det = 0 → matrix is singular (rows/cols are linearly dependent).',
                  formula: '2×2: det([[a,b],[c,d]]) = ad − bc\n3×3: Cofactor expansion (Sarrus rule)',
                  ex: 'det([[4,7],[2,6]]) = 4×6 − 7×2 = 24 − 14 = 10',
                  note: 'Properties: det(AB) = det(A)×det(B). det(Aᵀ) = det(A). det(A⁻¹) = 1/det(A).'
                },
                {
                  name: 'Matrix Rank', icon: 'rk', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
                  def: 'The number of linearly independent rows (or equivalently columns) in a matrix. Rank tells you the "information content" of the matrix — how many dimensions are truly captured.',
                  formula: 'rank(A) ≤ min(m, n) for an (m×n) matrix\nFull rank: rank = min(m,n) — maximum possible',
                  ex: '[[1,2],[2,4]] has rank 1 (row 2 = 2×row 1, dependent)\n[[1,2],[3,4]] has rank 2 (independent rows)',
                  note: 'rank(A) = n − dim(null space). Low-rank matrices are used in matrix factorisation for recommendations (SVD, NMF).'
                },
              ].map(op => (
                <div key={op.name} style={{ padding: '1.4rem', background: op.bg, border: `1px solid ${op.border}`, borderRadius: '12px', borderLeft: `5px solid ${op.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.7rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: op.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.88rem', flexShrink: 0 }}>{op.icon}</div>
                    <h3 style={{ color: op.color, margin: 0, fontSize: '1rem' }}>{op.name}</h3>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.7, margin: '0 0 0.6rem 0' }}>{op.def}</p>
                  <Formula color={op.color} bg="rgba(255,255,255,0.6)">{op.formula}</Formula>
                  <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '0.5rem 0.8rem', margin: '0.5rem 0', fontFamily: 'monospace', fontSize: '0.78rem', color: op.color }}>{op.ex}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>📌 {op.note}</div>
                </div>
              ))}

              {/* OLS application */}
              <div style={{ padding: '1.4rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                <h3 style={{ color: '#f0abfc', margin: '0 0 0.7rem 0', fontSize: '1rem' }}>🎯 Full Application: OLS Regression via Matrix Operations</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  Ordinary Least Squares regression uses all four operations: Transpose, Multiplication, Inverse, and Vector multiply.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { step: 1, op: 'Design Matrix X', desc: 'Append a column of 1s for intercept → X is (n×p+1)' },
                    { step: 2, op: 'Compute XᵀX', desc: 'Transpose × multiply → square (p+1)×(p+1) matrix' },
                    { step: 3, op: 'Compute (XᵀX)⁻¹', desc: 'Invert that square matrix. Requires det ≠ 0 (no multicollinearity)' },
                    { step: 4, op: 'Compute Xᵀy', desc: 'Transpose X and multiply by y response vector' },
                    { step: 5, op: 'β = (XᵀX)⁻¹Xᵀy', desc: 'Matrix-vector multiply → coefficient vector β (intercept + slopes)' },
                  ].map(s => (
                    <div key={s.step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>{s.step}</div>
                      <div style={{ fontFamily: 'monospace', color: '#f0abfc', fontSize: '0.82rem', fontWeight: 700, minWidth: '120px' }}>{s.op}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('eigen')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain when a matrix is singular and what multicollinearity means in regression using matrix language.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── EIGEN ─── */}
      {activeTab === 'eigen' && (
        <Section eyebrow="Spectral Analysis" title="Eigenvalues & Eigenvectors">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Eigendecomposition</strong> reveals the intrinsic geometric properties of a matrix — the directions it stretches/shrinks (eigenvectors) and by how much (eigenvalues). It's the mathematical engine behind PCA, dimensionality reduction, graph algorithms, and stability analysis.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.3rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', borderTop: '4px solid #2563eb' }}>
                  <h3 style={{ color: '#1d4ed8', margin: '0 0 0.6rem 0', fontSize: '0.95rem' }}>Eigenvalue (λ)</h3>
                  <p style={{ color: '#1e3a8a', fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 0.6rem 0' }}>A scalar that tells you HOW MUCH the matrix stretches or compresses along a particular direction (the eigenvector).</p>
                  <Formula color="#1d4ed8" bg="rgba(255,255,255,0.7)">Av = λv  →  (A − λI)v = 0</Formula>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#1e3a8a', background: 'rgba(255,255,255,0.7)', padding: '0.5rem', borderRadius: '6px', marginTop: '6px' }}>
                    Find λ by solving: det(A − λI) = 0<br />This is the "characteristic equation"
                  </div>
                  <div style={{ marginTop: '0.7rem', fontSize: '0.78rem', color: '#475569', lineHeight: 1.7 }}>
                    <strong>Interpretation:</strong><br />
                    λ &gt; 1 → stretches vector<br />
                    0 &lt; λ &lt; 1 → shrinks vector<br />
                    λ = 1 → no change<br />
                    λ &lt; 0 → flips + scales<br />
                    λ = 0 → collapses to origin
                  </div>
                </div>
                <div style={{ padding: '1.3rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', borderTop: '4px solid #dc2626' }}>
                  <h3 style={{ color: '#dc2626', margin: '0 0 0.6rem 0', fontSize: '0.95rem' }}>Eigenvector (v)</h3>
                  <p style={{ color: '#991b1b', fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 0.6rem 0' }}>A non-zero vector that only gets SCALED (not rotated) when multiplied by matrix A. Points in the direction of maximum/minimum stretch.</p>
                  <Formula color="#dc2626" bg="rgba(255,255,255,0.7)">Av = λv  (v is scaled, not rotated)</Formula>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#991b1b', background: 'rgba(255,255,255,0.7)', padding: '0.5rem', borderRadius: '6px', marginTop: '6px' }}>
                    For each eigenvalue λ, solve:<br />
                    (A − λI)v = 0 for v
                  </div>
                  <div style={{ marginTop: '0.7rem', fontSize: '0.78rem', color: '#475569', lineHeight: 1.7 }}>
                    <strong>Properties:</strong><br />
                    Eigenvectors of symmetric matrices are orthogonal<br />
                    Infinite scalar multiples are all eigenvectors<br />
                    Normalise: ‖v‖ = 1 (unit eigenvectors)
                  </div>
                </div>
              </div>

              {/* Worked example */}
              <div style={{ padding: '1.4rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>📝 Worked Example: 2×2 Eigendecomposition</h3>
                <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '0.8rem' }}>A = [[4, 1], [2, 3]]</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { step: 'Step 1: Characteristic Equation', detail: 'det(A − λI) = 0\ndet([[4−λ, 1],[2, 3−λ]]) = 0\n(4−λ)(3−λ) − (1)(2) = 0\nλ² − 7λ + 10 = 0', color: '#1d4ed8' },
                    { step: 'Step 2: Solve for Eigenvalues', detail: '(λ−5)(λ−2) = 0\nλ₁ = 5,  λ₂ = 2', color: '#7c3aed' },
                    { step: 'Step 3: Eigenvector for λ₁ = 5', detail: '(A − 5I)v = 0\n[[-1,1],[2,-2]]v = 0\nRow reduce → v₁ = [1, 1] (normalised: [0.707, 0.707])', color: '#16a34a' },
                    { step: 'Step 4: Eigenvector for λ₂ = 2', detail: '(A − 2I)v = 0\n[[2,1],[2,1]]v = 0\nRow reduce → v₂ = [-1, 2] (normalised: [-0.447, 0.894])', color: '#dc2626' },
                  ].map(s => (
                    <div key={s.step} style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.8rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 700, color: s.color, fontSize: '0.82rem', marginBottom: '4px' }}>{s.step}</div>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.77rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.detail}</pre>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div style={{ padding: '1.4rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>🔬 Eigendecomposition in Machine Learning</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { app: 'Principal Component Analysis (PCA)', detail: 'Covariance matrix Σ = XᵀX/n is eigendecomposed. PC1 = eigenvector of largest eigenvalue = direction of maximum variance. Eigenvalue = variance explained.', color: '#7c3aed' },
                    { app: 'Graph Analysis (PageRank)', detail: 'Web link structure is a matrix. PageRank scores = principal eigenvector (eigenvector of largest eigenvalue = 1) of the transition matrix.', color: '#1d4ed8' },
                    { app: 'SVD / Matrix Factorisation', detail: 'Singular Value Decomposition (SVD) extends eigendecomposition to non-square matrices: A = UΣVᵀ. Used in recommender systems, image compression, NLP (LSA).', color: '#16a34a' },
                    { app: 'Spectral Clustering', detail: 'Graph Laplacian matrix eigendecomposition clusters data points by their connectivity structure. Used in community detection, image segmentation.', color: '#dc2626' },
                    { app: 'Stability Analysis', detail: 'In dynamical systems, if all eigenvalues have negative real parts → system is stable. Used in control systems and financial portfolio analysis.', color: '#d97706' },
                    { app: 'Multicollinearity Detection', detail: 'Very small eigenvalues of XᵀX indicate near-linear dependence among predictors (multicollinearity). Condition number = max(λ)/min(λ).', color: '#db2877' },
                  ].map(a => (
                    <div key={a.app} style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '8px', padding: '0.8rem', border: `1px solid ${a.color}30`, borderLeft: `3px solid ${a.color}` }}>
                      <div style={{ fontWeight: 700, color: a.color, fontSize: '0.82rem', marginBottom: '4px' }}>{a.app}</div>
                      <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{a.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive eigenvector visualiser */}
              <EigenVisualiser />
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('playground')}>Matrix Playground (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain PCA step by step using eigendecomposition of the covariance matrix with a concrete dataset example.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Interactive Lab" title="Matrix Playground — Live Computations">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Practice every matrix operation interactively. Edit the matrices, select an operation, and see instant results with step-by-step breakdowns. Then read the full Python implementations below.
            </p>

            <MatPlayground />

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> matrix_operations.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

def shape(M):   return (len(M), len(M[0]))
def eye(n):     return [[1 if i==j else 0 for j in range(n)] for i in range(n)]
def T(M):       return [[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]
def mat_add(A,B): return [[A[i][j]+B[i][j] for j in range(len(A[0]))] for i in range(len(A))]
def mat_sub(A,B): return [[A[i][j]-B[i][j] for j in range(len(A[0]))] for i in range(len(A))]
def mat_mul(A,B):
    rA,cA,cB = len(A),len(A[0]),len(B[0])
    return [[sum(A[i][k]*B[k][j] for k in range(cA)) for j in range(cB)] for i in range(rA)]
def scalar_mul(k,M): return [[k*M[i][j] for j in range(len(M[0]))] for i in range(len(M))]
def det2(M):    return M[0][0]*M[1][1] - M[0][1]*M[1][0]
def inv2(M):
    d = det2(M)
    if abs(d) < 1e-10: return None
    return [[M[1][1]/d, -M[0][1]/d], [-M[1][0]/d, M[0][0]/d]]
def dot(u,v):   return sum(a*b for a,b in zip(u,v))

# ── Test all operations ──
A = [[4, 7], [2, 6]]
B = [[1, 2], [3, 4]]

print("Shape A:", shape(A))
print("A + B  =", mat_add(A, B))
print("A - B  =", mat_sub(A, B))
print("A × B  =", mat_mul(A, B))
print("Aᵀ     =", T(A))
print("det(A) =", det2(A))
print("A⁻¹    =", [[round(x,4) for x in row] for row in inv2(A)])
print("I₃     =", eye(3))

# ── Eigenvalues (2×2) ──
def eigenvalues_2x2(M):
    trace = M[0][0] + M[1][1]
    det   = det2(M)
    disc  = trace**2 - 4*det
    if disc < 0: return None, None
    l1 = (trace + math.sqrt(disc)) / 2
    l2 = (trace - math.sqrt(disc)) / 2
    return round(l1,4), round(l2,4)

def eigenvector_2x2(M, lam):
    # Solve (A - lI)v = 0
    a,b,c,d = M[0][0]-lam, M[0][1], M[1][0], M[1][1]-lam
    if abs(b) > 1e-10:    v = [b, lam-a]
    elif abs(c) > 1e-10:  v = [lam-d, c]
    else:                  v = [1, 0]
    norm = math.sqrt(v[0]**2 + v[1]**2)
    return [round(x/norm, 4) for x in v]

E = [[4, 1], [2, 3]]
l1, l2 = eigenvalues_2x2(E)
print(f"\\nEigenvalues of E: λ₁={l1}, λ₂={l2}")
print(f"Eigenvector v₁:   {eigenvector_2x2(E, l1)}")
print(f"Eigenvector v₂:   {eigenvector_2x2(E, l2)}")

# ── Verify: E × v₁ = λ₁ × v₁ ──
v1 = eigenvector_2x2(E, l1)
Ev1 = [dot(E[i], v1) for i in range(2)]
lv1 = [l1*x for x in v1]
print(f"E×v₁={[round(x,3) for x in Ev1]},  λ₁×v₁={[round(x,3) for x in lv1]}  ← should match")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.7 }}>{`Shape A: (2, 2)
A + B  = [[5, 9], [5, 10]]
A - B  = [[3, 5], [-1, 2]]
A × B  = [[25, 36], [20, 28]]
Aᵀ     = [[4, 2], [7, 6]]
det(A) = 10
A⁻¹    = [[0.6, -0.7], [-0.2, 0.4]]
I₃     = [[1,0,0],[0,1,0],[0,0,1]]

Eigenvalues of E: λ₁=5.0, λ₂=2.0
Eigenvector v₁:   [0.7071, 0.7071]
Eigenvector v₂:   [-0.4472, 0.8944]
E×v₁=[3.536, 3.536],  λ₁×v₁=[3.536, 3.536]  ← should match`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How does SVD (Singular Value Decomposition) relate to eigendecomposition and where is it used in ML?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 15 Assessment" title="Day 15 Assessment & Review">
          <div className="panel">
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Matrix Operation Mistakes
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Non-commutativity:</strong> A × B ≠ B × A in general. Always check shape and order. (AB)ᵀ = BᵀAᵀ — the order reverses on transpose.</li>
                <li><strong>Dimension mismatch in multiplication:</strong> For A × B, A's columns must equal B's rows. Attempting (2×3) × (2×3) will fail — you need (2×3) × (3×2).</li>
                <li><strong>Inverse of a singular matrix:</strong> If det(A) = 0, A has no inverse. In multicollinear regression (XᵀX is near-singular), use regularisation (ridge regression: (XᵀX + λI)⁻¹).</li>
                <li><strong>Confusing eigenvalues with diagonal elements:</strong> Eigenvalues are NOT simply the diagonal entries. They must be computed via the characteristic polynomial det(A−λI) = 0.</li>
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
                <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2877' }} onClick={checkFinalScore}>Verify Final Score</button>
                {score !== null && <strong style={{ color: '#db2777', fontSize: '1.2rem' }}>Score: {score} / {quizQuestions.length}</strong>}
              </div>
            </div>

            {/* Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
              <h3 style={{ color: '#db2877', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> Given A = [[2, 5], [1, 3]] and B = [[4, 1], [2, 3]], compute: (a) A + B, (b) A − B, (c) A × B, (d) Aᵀ, (e) Bᵀ × Aᵀ. Verify that (AB)ᵀ = BᵀAᵀ.</li>
                <li><strong>Task 2:</strong> Find the determinant and inverse (if it exists) of: (a) [[3, 7], [1, −4]], (b) [[2, 4], [1, 2]]. For (b), explain why no inverse exists and what this implies for a linear system.</li>
                <li><strong>Task 3:</strong> Find the eigenvalues and eigenvectors of A = [[5, 2], [4, 3]] manually using the characteristic equation. Then verify your result by computing A × v for each eigenvector.</li>
                <li><strong>Task 4:</strong> Explain how PCA uses eigendecomposition. Given a 100×5 dataset X (100 observations, 5 features), describe the shape of each matrix in the steps: compute covariance Σ, eigendecompose Σ, select top 2 PCs, project X. What shape is the reduced dataset?</li>
                <li><strong>Task 5:</strong> Extend the Python code to implement a <code>mat_pow(M, n)</code> function that computes the n-th power of a square matrix using repeated matrix multiplication. Compute A⁴ for A = [[2, 1], [1, 2]] and verify using eigendecomposition: A = QΛQᵀ → A⁴ = QΛ⁴Qᵀ.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 15 — Matrix Operations! 🎉')}>
                Submit & Complete Day 15 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
