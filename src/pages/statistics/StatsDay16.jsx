import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, Sparkles, Play, RotateCcw } from 'lucide-react';
import calculusImg from '../../assets/calculus_gradient_descent.png';

/* ─── Helpers ─── */
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

/* ─── Gradient Descent Simulator Widget ─── */
const GradientDescentSimulator = () => {
  const [lr, setLr] = useState(0.1);
  const [startX, setStartX] = useState(-2.5);
  const [history, setHistory] = useState([-2.5]);
  const [funcType, setFuncType] = useState('quad'); // quad (x^2) or bimodal (x^4 - 3x^2)

  // f(x) and f'(x)
  const f = (x) => {
    if (funcType === 'quad') return x * x;
    return 0.1 * (x ** 4 - 3 * (x ** 2) - 2 * x + 4);
  };
  const df = (x) => {
    if (funcType === 'quad') return 2 * x;
    return 0.1 * (4 * (x ** 3) - 6 * x - 2);
  };

  const reset = () => {
    setHistory([startX]);
  };

  const step = () => {
    const currentX = history[history.length - 1];
    const grad = df(currentX);
    const nextX = currentX - lr * grad;
    // clamp between -3.2 and 3.2 to keep it inside visual bounds
    const clampedX = Math.max(-3.1, Math.min(3.1, nextX));
    setHistory(prev => [...prev, clampedX]);
  };

  // SVG parameters
  const W = 300, H = 220;
  const toSVG = (x, y) => {
    // x range [-3.5, 3.5] -> [15, W-15]
    // y range [-1.5, 10] -> [H-15, 15]
    const svgX = 15 + ((x + 3.5) / 7) * (W - 30);
    const minVal = funcType === 'quad' ? -0.5 : -1.5;
    const maxVal = funcType === 'quad' ? 10 : 3.5;
    const svgY = (H - 15) - ((y - minVal) / (maxVal - minVal)) * (H - 30);
    return { cx: svgX, cy: svgY };
  };

  // Generate curve path
  const curvePath = useMemo(() => {
    let p = '';
    for (let x = -3.2; x <= 3.2; x += 0.1) {
      const { cx, cy } = toSVG(x, f(x));
      if (x === -3.2) p += `M ${cx} ${cy}`;
      else p += ` L ${cx} ${cy}`;
    }
    return p;
  }, [funcType]);

  return (
    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#7c3aed', margin: '0 0 0.4rem 0', fontSize: '1.05rem' }}>🤖 Interactive Gradient Descent Simulator</h4>
      <p style={{ color: '#6d28d9', fontSize: '0.82rem', margin: '0 0 1.2rem 0' }}>See how learning rate and starting position affect convergence on different loss landscapes.</p>
      
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: '150px', flex: 1 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6d28d9', marginBottom: '4px' }}>Loss Function:</label>
            <select value={funcType} onChange={e => { setFuncType(e.target.value); setHistory([startX]); }}
              style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #ddd6fe', background: '#fff', fontSize: '0.82rem' }}>
              <option value="quad">Quadratic Bowl: f(x) = x²</option>
              <option value="bimodal">Non-Convex Landscape (Multi-minima)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6d28d9', marginBottom: '3px' }}>
              Learning Rate (α): <span style={{ fontFamily: 'monospace' }}>{lr}</span>
            </label>
            <input type="range" min="0.01" max="1.1" step="0.05" value={lr} onChange={e => setLr(Number(e.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6d28d9', marginBottom: '3px' }}>
              Start x: <span style={{ fontFamily: 'monospace' }}>{startX}</span>
            </label>
            <input type="range" min="-3" max="3" step="0.2" value={startX} onChange={e => { setStartX(Number(e.target.value)); setHistory([Number(e.target.value)]); }} style={{ width: '100%', accentColor: '#7c3aed' }} />
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <button className="btn btn-primary" onClick={step} style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Play size={12} /> Step
            </button>
            <button className="btn btn-outline" onClick={reset} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <div style={{ background: '#fff', borderRadius: '8px', padding: '0.7rem', border: '1px solid #ddd6fe', marginTop: '4px', fontSize: '0.75rem', color: '#6d28d9', lineHeight: 1.6 }}>
            <div><strong>Steps Taken:</strong> {history.length - 1}</div>
            <div><strong>Current x:</strong> <span style={{ fontFamily: 'monospace' }}>{history[history.length - 1].toFixed(4)}</span></div>
            <div><strong>Current Loss f(x):</strong> <span style={{ fontFamily: 'monospace' }}>{f(history[history.length - 1]).toFixed(4)}</span></div>
            <div><strong>Gradient f'(x):</strong> <span style={{ fontFamily: 'monospace' }}>{df(history[history.length - 1]).toFixed(4)}</span></div>
          </div>
        </div>

        {/* Plot */}
        <div style={{ border: '1px solid #ddd6fe', borderRadius: '10px', background: '#fff', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width={W} height={H}>
            {/* Grid/Axes */}
            <line x1={10} y1={toSVG(0, 0).cy} x2={W-10} y2={toSVG(0, 0).cy} stroke="#e2e8f0" strokeWidth="1" />
            <line x1={toSVG(0, 0).cx} y1={10} x2={toSVG(0, 0).cx} y2={H-10} stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Loss function curve */}
            <path d={curvePath} fill="none" stroke="#a78bfa" strokeWidth="2.5" />
            
            {/* Steps connection path */}
            {history.map((x, i) => {
              if (i === 0) return null;
              const prev = toSVG(history[i-1], f(history[i-1]));
              const curr = toSVG(x, f(x));
              return (
                <line key={`l-${i}`} x1={prev.cx} y1={prev.cy} x2={curr.cx} y2={curr.cy} stroke="#db2877" strokeWidth="1.5" strokeDasharray="3,3" />
              );
            })}

            {/* Step markers */}
            {history.map((x, i) => {
              const { cx, cy } = toSVG(x, f(x));
              const isLast = i === history.length - 1;
              return (
                <circle key={`pt-${i}`} cx={cx} cy={cy} r={isLast ? 6 : 4} fill={isLast ? '#db2877' : '#7c3aed'} stroke="#fff" strokeWidth={isLast ? 2 : 1} />
              );
            })}
          </svg>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Purple = Loss Curve • Pink = Optimization Path</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Calculus Tab Elements ─── */
export default function StatsDay16({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day16', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "What does the limit of a function at a point tell us?", opts: ["The exact value of the function at that point", "The value the function approaches as the input gets infinitely close to that point", "The slope of the tangent line at that point", "The total area under the curve"], ans: 1, exp: "A Limit represents what output value the function approaches as we get closer and closer to a certain input, regardless of whether the function actually exists or is continuous at that exact point. It is the core concept that makes differentiation possible." },
    { id: 2, q: "If a machine learning loss function is given by f(w) = w², what is its derivative f'(w) and what does it tell us?", opts: ["f'(w) = 2, representing a constant upward slope", "f'(w) = 2w, representing the instantaneous rate of change of loss with respect to w", "f'(w) = w, representing the direction of the minimum", "f'(w) = 1/w, representing the reciprocal curvature"], ans: 1, exp: "Using the Power Rule, the derivative of f(w) = w² is 2w. This derivative tells us the instantaneous slope of the function at any weight w. If the derivative is positive, moving w up increases loss; if negative, moving w up decreases loss." },
    { id: 3, q: "When optimizing a model using Gradient Descent, we update weights by subtracting the gradient multiplied by the learning rate. Why do we SUBTRACT the gradient?", opts: ["Because addition is computationally more expensive", "Because the gradient points in the direction of steepest ASCENT, so subtracting it moves us down the slope (steepest descent)", "Because of the Chain Rule", "To ensure the learning rate remains positive"], ans: 1, exp: "The gradient vector always points in the direction of steepest climb (ascent). Since we want to MINIMIZE the loss function (find the bottom of the bowl), we must move in the opposite direction. Thus, we subtract the gradient: θ = θ − α∇f(θ)." },
    { id: 4, q: "Which calculus rule allows us to calculate the derivative of a composite function like loss(prediction(weights))?", opts: ["Product Rule", "Quotient Rule", "Chain Rule", "L'Hôpital's Rule"], ans: 2, exp: "The Chain Rule is the mathematical foundation of backpropagation in neural networks. It states that the derivative of a composite function f(g(x)) is f'(g(x)) × g'(x). This allows us to calculate how weights deep in a network affect the final loss." },
    { id: 5, q: "For a loss function with two weights f(w₁, w₂) = w₁² + 3w₂², what is the partial derivative with respect to w₂?", opts: ["2w₁ + 6w₂", "6w₂", "2w₁", "2w₂"], ans: 1, exp: "To find the partial derivative with respect to w₂ (∂f/∂w₂), we treat w₁ as a constant. The derivative of w₁² (constant) is 0, and the derivative of 3w₂² with respect to w₂ is 6w₂. Thus, ∂f/∂w₂ = 6w₂." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── LIMITS & DERIVATIVES ─── */}
      {activeTab === 'basics' && (
        <Section eyebrow="Day 16 • Calculus Foundations" title="Limits and Differentiation">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Calculus is the mathematical tool used to study <strong>rates of change</strong>. In data analytics and machine learning, we use calculus to understand how changes in model parameters (like weights and biases) affect the model's accuracy (loss).
            </p>

            <ZoomableImage src={calculusImg} alt="Calculus and Gradient Descent Workflow" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Concept Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                <div style={{ padding: '1.3rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', borderTop: '4px solid #1d4ed8' }}>
                  <span style={{ fontSize: '0.65rem', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Concept 1</span>
                  <h3 style={{ color: '#1d4ed8', margin: '0.3rem 0 0.6rem 0', fontSize: '1.1rem' }}>Limits</h3>
                  <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                    A limit describes the behavior of a function near a point, rather than at that exact point. It answers: "What value does f(x) approach as x gets extremely close to c?"
                  </p>
                  <Formula color="#1d4ed8" bg="rgba(255,255,255,0.7)">lim (x → c) f(x) = L</Formula>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                    Essential because divisions by zero are undefined, but limits let us evaluate expressions like (f(x+h)−f(x))/h as h approaches 0.
                  </p>
                </div>

                <div style={{ padding: '1.3rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px', borderTop: '4px solid #db2877' }}>
                  <span style={{ fontSize: '0.65rem', color: '#db2877', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Concept 2</span>
                  <h3 style={{ color: '#db2877', margin: '0.3rem 0 0.6rem 0', fontSize: '1.1rem' }}>Differentiation</h3>
                  <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                    Differentiation is the process of finding the derivative. It measures the <strong>instantaneous rate of change</strong> of a function at any given point — geometrically, the slope of the tangent line.
                  </p>
                  <Formula color="#db2877" bg="rgba(255,255,255,0.7)">f'(x) = lim (h → 0) [f(x+h) − f(x)] / h</Formula>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                    This limit is the formal definition of a derivative (first principles).
                  </p>
                </div>
              </div>

              {/* Common Derivative Rules Table */}
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginTop: '1rem' }}>
                <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Common Derivative Rules Reference</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Rule Name', 'Function f(x)', 'Derivative f\'(x)', 'Worked Example'].map(h => <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Constant Rule', 'c  (constant)', '0', 'd/dx (5) = 0'],
                        ['Power Rule', 'xⁿ', 'n · xⁿ⁻¹', 'd/dx (x³) = 3x²'],
                        ['Exponential Rule', 'eˣ', 'eˣ', 'd/dx (eˣ) = eˣ'],
                        ['Logarithmic Rule', 'ln(x)', '1/x', 'd/dx (ln(x)) = 1/x'],
                        ['Constant Multiple', 'c · g(x)', 'c · g\'(x)', 'd/dx (4x³) = 12x²'],
                        ['Sum Rule', 'g(x) + h(x)', 'g\'(x) + h\'(x)', 'd/dx (x² + x) = 2x + 1'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#334155' }}>{row[0]}</td>
                          <td style={{ padding: '0.65rem 1rem', color: '#7c3aed', fontFamily: 'monospace' }}>{row[1]}</td>
                          <td style={{ padding: '0.65rem 1rem', color: '#db2877', fontFamily: 'monospace' }}>{row[2]}</td>
                          <td style={{ padding: '0.65rem 1rem', color: '#475569', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('rules')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why are limits necessary for calculus? Show me an example using the definition of derivatives.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── CHAIN RULE & PARTIAL DERIVATIVES ─── */}
      {activeTab === 'rules' && (
        <Section eyebrow="Multivariable Calculus" title="Chain Rule & Partial Derivatives">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Real-world models have thousands of parameters. We use <strong>multivariable calculus</strong> to compute derivatives with respect to many variables at once (partial derivatives) and backpropagate errors through layers (chain rule).
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Concept 1: Chain Rule */}
              <div style={{ padding: '1.5rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px', borderLeft: '5px solid #7c3aed' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.6rem 0' }}>🔗 Chain Rule</h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                  Used to differentiate composite functions. If a variable y depends on u, which in turn depends on x, then y depends on x through the chain:
                </p>
                <Formula color="#7c3aed" bg="rgba(255,255,255,0.7)">
                  dy/dx = (dy/du) · (du/dx)
                </Formula>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd6fe', marginTop: '0.5rem' }}>
                  <strong style={{ color: '#6d28d9', fontSize: '0.82rem', display: 'block', marginBottom: '4px' }}>Worked Example:</strong>
                  <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>
                    Given y = (3x² + 1)³. Let u = 3x² + 1, so y = u³.<br />
                    1. dy/du = 3u² = 3(3x² + 1)²<br />
                    2. du/dx = 6x<br />
                    3. dy/dx = 3(3x² + 1)² · 6x = <strong>18x(3x² + 1)²</strong>
                  </div>
                </div>
                <div style={{ background: '#ede9fe', padding: '0.7rem 0.9rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                  <strong style={{ color: '#7c3aed', fontSize: '0.8rem' }}>🤖 Backpropagation in Neural Networks:</strong>
                  <p style={{ color: '#4c1d95', fontSize: '0.8rem', margin: '3px 0 0 0', lineHeight: 1.5 }}>
                    Neural networks are layers of composite functions: Loss = L(y_pred(z(w))). The chain rule is what computes how a tiny weight adjustment deep inside affects the final training loss.
                  </p>
                </div>
              </div>

              {/* Concept 2: Partial Derivatives */}
              <div style={{ padding: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', borderLeft: '5px solid #1d4ed8' }}>
                <h3 style={{ color: '#1d4ed8', margin: '0 0 0.6rem 0' }}>🗂️ Partial Derivatives</h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                  For functions with multiple independent variables, a partial derivative measures the rate of change with respect to <strong>one variable while keeping all other variables constant</strong>.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div>
                    <Formula color="#1d4ed8" bg="rgba(255,255,255,0.7)">
                      ∂f/∂x   (read "partial of f with respect to x")
                    </Formula>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '0.5rem' }}>
                      <strong style={{ color: '#1e40af', fontSize: '0.82rem', display: 'block', marginBottom: '4px' }}>Worked Example:</strong>
                      <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>
                        Given f(x, y) = 3x²y + 5y³.<br />
                        • ∂f/∂x (treat y as constant) = 6xy + 0 = <strong>6xy</strong><br />
                        • ∂f/∂y (treat x as constant) = 3x² + 15y²
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#dbeafe', padding: '0.7rem 0.9rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.8rem' }}>📊 Multivariable Models:</strong>
                    <p style={{ color: '#1e3a8a', fontSize: '0.8rem', margin: '3px 0 0 0', lineHeight: 1.5 }}>
                      In multiple linear regression, cost is a function of multiple weights (w₁, w₂, ..., wₙ) and intercept b. We compute the partial derivative for each parameter separately to update them independently.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('gradients')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Can you explain how backpropagation uses the Chain Rule with a simple 3-layer neural network diagram?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── GRADIENTS & OPTIMIZATION ─── */}
      {activeTab === 'gradients' && (
        <Section eyebrow="Optimization Engines" title="Gradients & Gradient Descent">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Gradient Descent is the optimization engine that powers almost all modern artificial intelligence. By calculating gradients, our models can "learn" and improve automatically by taking steps downhill towards zero error.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Concept 1: Gradient Vector */}
              <div style={{ padding: '1.4rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.6rem 0' }}>∇ The Gradient Vector</h3>
                <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                  The gradient is a vector containing all the partial derivatives of a function. It points in the direction of the <strong>steepest ascent</strong> of the function, and its magnitude represents the slope.
                </p>
                <Formula color="#0f172a" bg="#f8fafc">
                  ∇f(x, y) = [ ∂f/∂x,  ∂f/∂y ]ᵀ
                </Formula>
                <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                  In machine learning, the gradient ∇L points in the direction of weights that increase loss fastest.
                </p>
              </div>

              {/* Concept 2: Optimization and Gradient Descent */}
              <div style={{ padding: '1.4rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px', borderLeft: '5px solid #db2877' }}>
                <h3 style={{ color: '#db2877', margin: '0 0 0.6rem 0' }}>🏃 Gradient Descent Concept</h3>
                <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
                  To minimize our loss function, we move in the direction opposite to the gradient vector. We take steps downhill:
                </p>
                <Formula color="#db2877" bg="rgba(255,255,255,0.7)">
                  θ_new = θ_old − α · ∇f(θ_old)
                </Formula>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', marginTop: '0.8rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
                    <strong style={{ color: '#db2877', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Learning Rate (α):</strong>
                    <p style={{ color: '#475569', fontSize: '0.76rem', margin: 0, lineHeight: 1.5 }}>
                      Controls step size. Too small α makes training slow. Too large α causes overshoot and divergence.
                    </p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
                    <strong style={{ color: '#db2877', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Local Minima vs Global:</strong>
                    <p style={{ color: '#475569', fontSize: '0.76rem', margin: 0, lineHeight: 1.5 }}>
                      For non-convex shapes, models can get trapped in local valleys. Advanced optimizers (Adam, SGD+Momentum) help jump out.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('playground')}>Gradient Simulator (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What happens if my learning rate is too large in gradient descent? Explain mathematically.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Calculus Lab" title="Interactive Gradient Descent Playground">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Experiment with optimization interactively. Try changing the loss function to "Non-Convex" and watch how different learning rates get trapped in local minima or overshoot the global minimum.
            </p>

            <GradientDescentSimulator />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('python')}>Python Visualization (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How does stochastic gradient descent differ from batch gradient descent?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PYTHON ─── */}
      {activeTab === 'python' && (
        <Section eyebrow="Python Visualization" title="Gradient Descent & Calculus in Python">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Implement gradient descent from scratch in Python. Here, we define a loss function, compute its derivative, and update weights iteratively while logging the results.
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> gradient_descent.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`# ─── Gradient Descent in Python from Scratch ───
import math

# 1. Define loss function f(x) = x^2 - 3x + 2
def loss_function(x):
    return x**2 - 3*x + 2

# 2. Define the derivative (gradient) f'(x) = 2x - 3
def compute_gradient(x):
    return 2*x - 3

# 3. Optimization Parameters
x = 8.0              # starting weight value (initial guess)
learning_rate = 0.1   # step size parameter (alpha)
epochs = 15          # number of updates

print("Epoch |  Weight (x)  |  Loss f(x)  |  Gradient f'(x)")
print("-" * 55)

for epoch in range(1, epochs + 1):
    loss = loss_function(x)
    gradient = compute_gradient(x)
    
    # log status
    print(f" {epoch:4d} |  {x:10.5f}  |  {loss:10.5f}  |  {gradient:15.5f}")
    
    # Gradient Descent update rule: x_new = x - lr * grad
    x = x - learning_rate * gradient

# The analytical minimum is at f'(x) = 0 -> 2x - 3 = 0 -> x = 1.5
print("-" * 55)
print(f"Final Optimized Weight:  {x:.5f}")
print(f"Theoretical Minimum at:  1.50000")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.7 }}>{`Epoch |  Weight (x)  |  Loss f(x)  |  Gradient f'(x)
-------------------------------------------------------
    1 |     8.00000  |    42.00000  |         13.00000
    2 |     6.70000  |    26.79000  |         10.40000
    3 |     5.66000  |    17.07560  |          8.32000
    4 |     4.82800  |    10.82840  |          6.65600
    5 |     4.16240  |     6.83984  |          5.32480
    ...
   15 |     1.52252  |     0.00051  |          0.04504
-------------------------------------------------------
Final Optimized Weight:  1.51803
Theoretical Minimum at:  1.50000`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how to modify this python script to optimize a 2-variable function f(x, y) = x^2 + y^2.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 16 Assessment" title="Day 16 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Calculus Pitfalls in Machine Learning
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Overshooting / Divergence:</strong> Setting learning rate α too high causes weights to bounce back and forth, jumping higher out of the bowl instead of settling at the bottom.</li>
                <li><strong>Vanishing Gradients:</strong> In deep networks with activation functions like Sigmoid, derivatives are between 0 and 0.25. Repeated multiplication using the chain rule causes gradients to vanish, stopping parameter updates.</li>
                <li><strong>Exploding Gradients:</strong> If derivatives are large (&gt; 1), repeated multiplication makes gradients grow exponentially, causing numerical overflow (NaNs).</li>
                <li><strong>Local Minima vs. Saddle Points:</strong> For non-convex shapes, gradient descent can stall at flat regions (saddle points) or settle in local valleys instead of finding the global minimum.</li>
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
                <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={checkFinalScore}>Verify Final Score</button>
                {score !== null && <strong style={{ color: '#db2877', fontSize: '1.2rem' }}>Score: {score} / {quizQuestions.length}</strong>}
              </div>
            </div>

            {/* Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
              <h3 style={{ color: '#db2877', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> Calculate the analytical derivative for the following functions manually using derivative rules:<br />
                  (a) f(x) = 4x³ + 2x² − 7x + 1<br />
                  (b) f(x) = ln(x) + e²ˣ (hint: use chain rule)<br />
                  (c) f(x) = (2x² + 5)³
                </li>
                <li><strong>Task 2:</strong> Given the function f(x, y) = 4x³y² + 2x²y − 9y³ + 12:<br />
                  (a) Find the partial derivative with respect to x (∂f/∂x)<br />
                  (b) Find the partial derivative with respect to y (∂f/∂y)<br />
                  (c) Write down the gradient vector ∇f(x, y) at the point (1, 2)
                </li>
                <li><strong>Task 3:</strong> Perform 3 steps of manual Gradient Descent updates to minimize f(w) = w² starting from w₀ = 4.0 with learning rate α = 0.2. Show w₁, w₂, and w₃ and their corresponding loss values.</li>
                <li><strong>Task 4:</strong> Write a Python function <code>gradient_descent_2d(start_x, start_y, lr, epochs)</code> that minimizes f(x,y) = x² + 2y² starting from a given coordinate. Print the values of x and y at each epoch.</li>
                <li><strong>Task 5:</strong> Read about the "Vanishing Gradient Problem" and explain in 3 sentences how the choice of activation function (e.g. ReLU vs. Sigmoid) helps mitigate it.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 16 — Calculus for Data Analytics! 🎉')}>
                Submit & Complete Day 16 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
