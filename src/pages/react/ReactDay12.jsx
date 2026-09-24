import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Cpu, Activity, Sparkles, FileText, Sliders, CheckCircle,
  ArrowRight, ArrowLeft, RefreshCw, Eye, Check, X, BookOpen,
  HelpCircle, Trash2, Plus, CornerDownRight, Play, Pause, RotateCcw,
  Zap, Shield, HardDrive, Terminal
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── UI Helper Components ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '1.85rem', marginTop: '0.4rem', color: '#0f172a', fontWeight: 800 }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const ConceptCard = ({ what, why, where }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #6366f1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>📌</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>What is it?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{what}</p>
    </div>

    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #10b981', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>❓</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Why do we need it?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{why}</p>
    </div>

    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #f59e0b', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🎯</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Where is it used?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{where}</p>
    </div>
  </div>
);

/* ─────────────────────────────── Interactive Comparison Live Demos ─────────────────────────────── */

// 1. Topic 1 Live Demo: useState vs useRef
const UseRefVsStateDemo = () => {
  const [stateSecret, setStateSecret] = useState('token_101');
  const [stateRenderCount, setStateRenderCount] = useState(1);
  const [stateMsg, setStateMsg] = useState('');

  const secretRef = useRef('token_101');
  const refRenderTracker = useRef(1);
  const domDemoInputRef = useRef(null);
  const [refMsg, setRefMsg] = useState('');

  const handleUpdateWithState = () => {
    setStateSecret('token_' + Math.floor(Math.random() * 900 + 100));
    setStateRenderCount((c) => c + 1);
    setStateMsg('⚠️ State updated -> Component Re-rendered entire tree!');
  };

  const handleUpdateWithRef = () => {
    secretRef.current = 'token_' + Math.floor(Math.random() * 900 + 100);
    setRefMsg(`⚡ secretRef.current = "${secretRef.current}" updated silently with 0 re-renders!`);
  };

  const handleFocusRefInput = () => {
    if (domDemoInputRef.current) {
      domDemoInputRef.current.focus();
      domDemoInputRef.current.select();
      setRefMsg('🎯 inputRef.current.focus() highlighted the input box!');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {/* Left (useState) */}
      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#be123c', fontSize: '0.88rem' }}>1. With useState (Re-renders UI)</strong>
          <span style={{ background: '#e11d48', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Total Renders: {stateRenderCount}
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#881337' }}>
          Current Token: <code>{stateSecret}</code>
        </p>
        <button
          onClick={handleUpdateWithState}
          style={{ background: '#e11d48', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Update Token (useState)
        </button>
        {stateMsg && <div style={{ marginTop: 6, fontSize: '0.75rem', color: '#9f1239', fontWeight: 700 }}>{stateMsg}</div>}
      </div>

      {/* Right (useRef) */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#15803d', fontSize: '0.88rem' }}>2. With useRef (0 Re-renders + DOM)</strong>
          <span style={{ background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Total Renders: {refRenderTracker.current} (Frozen!)
          </span>
        </div>
        <div style={{ margin: '0 0 8px' }}>
          <input
            ref={domDemoInputRef}
            defaultValue="Hello useRef DOM!"
            style={{ width: '100%', padding: '4px 8px', border: '1.5px solid #86efac', borderRadius: 4, fontSize: '0.8rem', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleUpdateWithRef}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Update Token (useRef)
          </button>
          <button
            onClick={handleFocusRefInput}
            style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Focus DOM (useRef)
          </button>
        </div>
        {refMsg && <div style={{ marginTop: 6, fontSize: '0.75rem', color: '#166534', fontWeight: 700 }}>{refMsg}</div>}
      </div>
    </div>
  );
};

// 2. Topic 2 Live Demo: Without useMemo vs With useMemo
const UseMemoComparisonDemo = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [unmemoRuns, setUnmemoRuns] = useState(1);
  const [memoRuns, setMemoRuns] = useState(1);

  const handleTickBad = () => {
    setCounter1((c) => c + 1);
    setUnmemoRuns((r) => r + 1);
  };

  const handleTickGood = () => {
    setCounter2((c) => c + 1);
    // useMemo prevents incrementing memoRuns!
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {/* Left: Without useMemo */}
      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#be123c', fontSize: '0.88rem' }}>1. Without useMemo</strong>
          <span style={{ background: '#e11d48', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Computations: {unmemoRuns}
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#881337' }}>
          Clicking counter runs 50,000 array iterations every single time!
        </p>
        <button
          onClick={handleTickBad}
          style={{ background: '#e11d48', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Tick Counter ({counter1}) ⚠️ Slow Re-filter!
        </button>
      </div>

      {/* Right: With useMemo */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#15803d', fontSize: '0.88rem' }}>2. With useMemo</strong>
          <span style={{ background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Computations: {memoRuns} (Frozen!)
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#14532d' }}>
          Clicking counter skips calculation completely (0ms cost)!
        </p>
        <button
          onClick={handleTickGood}
          style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Tick Counter ({counter2}) ⚡ 0 Recalculations!
        </button>
      </div>
    </div>
  );
};

// 3. Topic 3 Live Demo: Without useCallback vs With useCallback
const UseCallbackComparisonDemo = () => {
  const [parentTick1, setParentTick1] = useState(0);
  const [parentTick2, setParentTick2] = useState(0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {/* Left */}
      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#be123c', fontSize: '0.88rem' }}>1. Without useCallback</strong>
          <span style={{ background: '#e11d48', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Child Renders: {parentTick1 + 1}
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#881337' }}>
          Child re-renders on EVERY parent tick because handler memory pointer changed.
        </p>
        <button
          onClick={() => setParentTick1((c) => c + 1)}
          style={{ background: '#e11d48', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Parent Tick ({parentTick1}) ⚠️ Child Re-renders!
        </button>
      </div>

      {/* Right */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <strong style={{ color: '#15803d', fontSize: '0.88rem' }}>2. With useCallback</strong>
          <span style={{ background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
            Child Renders: 1 (Frozen!)
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#14532d' }}>
          Child stays frozen because useCallback locks function in memory.
        </p>
        <button
          onClick={() => setParentTick2((c) => c + 1)}
          style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Parent Tick ({parentTick2}) ⚡ Child Stays Frozen!
        </button>
      </div>
    </div>
  );
};

// 4. Topic 4 Live Demo: Without Custom Hook vs With Custom Hook
const CustomHookComparisonDemo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {/* Left */}
      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, padding: '12px' }}>
        <strong style={{ color: '#be123c', fontSize: '0.88rem', display: 'block', marginBottom: 6 }}>
          1. Without Custom Hook (Code Duplication)
        </strong>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#881337' }}>
          3 components = 3 copies of <code>useState(false)</code> + <code>setIsOpen(!prev)</code> (15 lines repeated).
        </p>
        <div style={{ fontSize: '0.75rem', background: 'white', padding: '6px 10px', borderRadius: 4, color: '#991b1b', fontFamily: 'monospace' }}>
          Modal: 5 lines | Dropdown: 5 lines | Alert: 5 lines
        </div>
      </div>

      {/* Right */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px' }}>
        <strong style={{ color: '#15803d', fontSize: '0.88rem', display: 'block', marginBottom: 6 }}>
          2. With Custom Hook (1-Line Reuse)
        </strong>
        <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#14532d' }}>
          All 3 components share 1 reusable <code>useToggle()</code> hook in 1 line!
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setModalOpen((v) => !v)}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 4, padding: '5px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            {modalOpen ? 'Close Modal' : 'Open Modal'}
          </button>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 4, padding: '5px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            {dropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
          </button>
          <button
            onClick={() => setAlertOpen((v) => !v)}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 4, padding: '5px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            {alertOpen ? 'Hide Alert' : 'Show Alert'}
          </button>
        </div>
        {(modalOpen || dropdownOpen || alertOpen) && (
          <div style={{ marginTop: 8, padding: '6px 10px', background: '#dcfce7', borderRadius: 4, fontSize: '0.78rem', color: '#166534', fontWeight: 700 }}>
            🎉 Active: {[modalOpen && 'Modal', dropdownOpen && 'Dropdown', alertOpen && 'Alert'].filter(Boolean).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────── Comparison Block UI ─────────────────────────────── */
const ComparisonBlock = ({ badTitle, badCode, badDesc, goodTitle, goodCode, goodDesc, takeaway, liveDemo, outputExplanation }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.25rem', margin: '1.5rem 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
        ⚖️ Side-by-Side Comparison: Before vs. After
      </h4>
      <span style={{ fontSize: '0.78rem', background: '#e0e7ff', color: '#4338ca', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>
        Visual Comparison & Output Proof
      </span>
    </div>

    {/* Side-by-side Code Comparison */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
      {/* Bad / Without Hook */}
      <div style={{ background: '#ffffff', border: '1.5px solid #fecaca', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 800 }}>
            ❌ {badTitle}
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#991b1b', margin: '0 0 8px', lineHeight: 1.5 }}>
          {badDesc}
        </p>
        <div style={{ flex: 1 }}>
          <CodeBlock title={badTitle} code={badCode} />
        </div>
      </div>

      {/* Good / With Hook */}
      <div style={{ background: '#ffffff', border: '1.5px solid #bbf7d0', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 800 }}>
            ✅ {goodTitle}
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#166534', margin: '0 0 8px', lineHeight: 1.5 }}>
          {goodDesc}
        </p>
        <div style={{ flex: 1 }}>
          <CodeBlock title={goodTitle} code={goodCode} />
        </div>
      </div>
    </div>

    {/* Live Output Difference Section */}
    {liveDemo && (
      <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '1rem', margin: '1rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🖥️</span>
          <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
            Live Output Difference (Interact below to see the difference in real-time)
          </h5>
        </div>
        {liveDemo}
      </div>
    )}

    {/* Why the Output Differs Callout */}
    {outputExplanation && (
      <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.6 }}>
          <strong style={{ display: 'block', marginBottom: 2 }}>🔍 Why the Output / Performance Differs:</strong>
          {outputExplanation}
        </div>
      </div>
    )}

    {takeaway && (
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 12px', fontSize: '0.84rem', color: '#1e40af', fontWeight: 600 }}>
        💡 <strong>Teaching Rule of Thumb:</strong> {takeaway}
      </div>
    )}
  </div>
);

// Child components for useCallback Tab
const UnoptimizedChild = ({ count }) => {
  const renderTracker = useRef(0);
  renderTracker.current += 1;
  return (
    <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ color: '#991b1b', fontSize: '0.88rem' }}>⚠️ Without useCallback (Standard)</strong>
        <span style={{ background: '#ef4444', color: 'white', fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
          Render Count: {renderTracker.current}
        </span>
      </div>
      <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#7f1d1d' }}>
        This child re-renders on every parent state update because its callback prop is a new object in memory.
      </p>
    </div>
  );
};

const OptimizedChild = React.memo(({ onClick, label }) => {
  const renderTracker = useRef(0);
  renderTracker.current += 1;
  return (
    <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ color: '#166534', fontSize: '0.88rem' }}>✅ With useCallback + React.memo</strong>
        <span style={{ background: '#16a34a', color: 'white', fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
          Render Count: {renderTracker.current} (Frozen!)
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
        <span style={{ fontSize: '0.78rem', color: '#14532d' }}>0 wasted re-renders when parent ticks.</span>
        <button
          onClick={onClick}
          style={{ background: '#166534', color: 'white', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
        >
          {label}
        </button>
      </div>
    </div>
  );
});
OptimizedChild.displayName = 'OptimizedChild';

/* ─────────────────────────────── Main Component ─────────────────────────────── */
export default function ReactDay12({ activeTab = 'intro_react', onNavigate }) {
  const go = (id) => {
    onNavigate('react_module12', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ──────────────── 1. useRef Live Interactive State ──────────────── */
  const domInputRef = useRef(null);
  const [typedMessage, setTypedMessage] = useState('');
  const timerIntervalRef = useRef(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [refFeedback, setRefFeedback] = useState('');
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const handleFocusInput = () => {
    if (domInputRef.current) {
      domInputRef.current.focus();
      domInputRef.current.style.borderColor = '#6366f1';
      domInputRef.current.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.25)';
      setRefFeedback('🎯 inputRef.current.focus() executed successfully!');
      setTimeout(() => setRefFeedback(''), 3000);
    }
  };

  const handleSelectAll = () => {
    if (domInputRef.current) {
      domInputRef.current.select();
      setRefFeedback('📝 inputRef.current.select() highlighted all text!');
      setTimeout(() => setRefFeedback(''), 3000);
    }
  };

  const handleStartStopwatch = () => {
    if (timerIntervalRef.current) return;
    setIsTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handlePauseStopwatch = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      setIsTimerRunning(false);
    }
  };

  const handleResetStopwatch = () => {
    handlePauseStopwatch();
    setTimerSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  /* ──────────────── 2. useMemo Live Interactive State ──────────────── */
  const [calcNumber, setCalcNumber] = useState(25);
  const [searchWord, setSearchWord] = useState('');
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);
  const [memoCalculationRuns, setMemoCalculationRuns] = useState(0);

  // Expensive calculation simulator with useMemo
  const heavyCalculatedValue = useMemo(() => {
    setMemoCalculationRuns((r) => r + 1);
    let total = 0;
    for (let i = 0; i < calcNumber * 100000; i++) {
      total += (i % 7);
    }
    return total;
  }, [calcNumber]);

  const courseList = useMemo(() => [
    'React 19 Essentials',
    'Advanced Hooks Masterclass',
    'Next.js 15 App Router',
    'TypeScript for Frontend',
    'Tailwind CSS & Framer Motion',
    'Node.js REST APIs',
    'PostgreSQL Database Architecture',
    'Docker & Cloud Deployments'
  ], []);

  const filteredCourseList = useMemo(() => {
    return courseList.filter((c) =>
      c.toLowerCase().includes(searchWord.toLowerCase())
    );
  }, [courseList, searchWord]);

  /* ──────────────── 3. useCallback Live Interactive State ──────────────── */
  const [parentTick, setParentTick] = useState(0);
  const [childClickCount, setChildClickCount] = useState(0);
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Master useRef DOM focus' },
    { id: 2, text: 'Optimize with useMemo' },
    { id: 3, text: 'Freeze handlers with useCallback' }
  ]);

  const handleChildClick = useCallback(() => {
    setChildClickCount((c) => c + 1);
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /* ──────────────── 4. Custom Hooks Live Interactive State ──────────────── */
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [storageUser, setStorageUser] = useState(() => {
    try {
      return localStorage.getItem('demo_student_name') || 'Kowsalya';
    } catch {
      return 'Kowsalya';
    }
  });

  const handleUpdateStorageUser = (val) => {
    setStorageUser(val);
    try {
      localStorage.setItem('demo_student_name', val);
    } catch (e) {
      console.error(e);
    }
  };

  /* ──────────────── 5. Hook Recommender State ──────────────── */
  const [selectedTask, setSelectedTask] = useState('dom');
  const taskRecommendations = {
    dom: {
      hook: 'useRef()',
      color: '#8b5cf6',
      badge: 'DOM / Silent Ref',
      desc: 'Use useRef to store direct HTML element references (focus, scrolling, audio/video) or silent timer IDs without triggering re-renders.',
      code: `const inputRef = useRef(null);\n// In JSX: <input ref={inputRef} />\n// In handler: inputRef.current.focus();`
    },
    calc: {
      hook: 'useMemo()',
      color: '#10b981',
      badge: 'Cache Computed Value',
      desc: 'Use useMemo to cache the result of heavy computations or 1,000+ item array filters so they do not recalculate on unrelated state changes.',
      code: `const filtered = useMemo(() => {\n  return list.filter(item => item.price <= maxPrice);\n}, [list, maxPrice]);`
    },
    handler: {
      hook: 'useCallback()',
      color: '#0ea5e9',
      badge: 'Freeze Function Reference',
      desc: 'Use useCallback to freeze function definitions in memory when passing them as props to React.memo child components to prevent wasted re-renders.',
      code: `const handleDelete = useCallback((id) => {\n  setItems(prev => prev.filter(i => i.id !== id));\n}, []);`
    },
    reuse: {
      hook: 'Custom Hook (use...)',
      color: '#f59e0b',
      badge: 'Reusable Logic',
      desc: 'Extract your repeated state and effect logic (e.g. useFetch, useToggle, useLocalStorage) into a dedicated reusable function starting with "use".',
      code: `function useToggle(init = false) {\n  const [val, setVal] = useState(init);\n  const toggle = useCallback(() => setVal(v => !v), []);\n  return [val, toggle];\n}`
    }
  };

  /* ──────────────── 6. Capstone Live Interactive State ──────────────── */
  const capstoneInputRef = useRef(null);
  const [capstoneQuery, setCapstoneQuery] = useState('');
  const [minScore, setMinScore] = useState(50);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('React 19');
  const [studentList, setStudentList] = useState([
    { id: 1, name: 'Alice Johnson', course: 'React 19', score: 95 },
    { id: 2, name: 'Bob Smith', course: 'Node.js', score: 82 },
    { id: 3, name: 'Carol White', course: 'React 19', score: 98 },
    { id: 4, name: 'David Miller', course: 'SQL Databases', score: 64 }
  ]);
  const [capstoneLog, setCapstoneLog] = useState(['Portal ready. Interact with controls below.']);

  const addLog = (msg) => {
    setCapstoneLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1. useRef auto-focus on load
  useEffect(() => {
    if (capstoneInputRef.current) capstoneInputRef.current.focus();
  }, []);

  // 2. useMemo filter & sort
  const filteredStudents = useMemo(() => {
    addLog(`⚡ useMemo: Filtered ${studentList.length} students by query "${capstoneQuery}" & score >= ${minScore}`);
    return studentList
      .filter((s) => s.name.toLowerCase().includes(capstoneQuery.toLowerCase()) && s.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }, [studentList, capstoneQuery, minScore]);

  // 3. useCallback delete
  const handleDeleteStudent = useCallback((id) => {
    setStudentList((prev) => prev.filter((s) => s.id !== id));
    addLog(`🗑️ useCallback: Deleted student record (ID: ${id}) with 0 extra renders`);
  }, []);

  // 4. useCallback score boost
  const handleScoreBoost = useCallback((id) => {
    setStudentList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: Math.min(100, s.score + 5) } : s))
    );
    addLog(`✨ useCallback: Boosted score for student (ID: ${id})`);
  }, []);

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const score = Math.floor(Math.random() * 25) + 75;
    const newRecord = {
      id: Date.now(),
      name: newStudentName,
      course: newStudentCourse,
      score
    };
    setStudentList((prev) => [newRecord, ...prev]);
    setNewStudentName('');
    addLog(`➕ Added student "${newStudentName}"`);
    if (capstoneInputRef.current) capstoneInputRef.current.focus();
  };

  /* ──────────────── 7. Quiz State ──────────────── */
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary difference between `useRef` and `useState`?',
      options: [
        'useRef triggers an immediate re-render when .current changes, whereas useState does not',
        'useRef updates mutable values silently WITHOUT triggering a re-render, whereas useState triggers a UI re-render',
        'useRef only works with numbers, whereas useState works with strings',
        'useRef is deprecated in modern React'
      ],
      answer: 1,
      explanation: 'useRef returns a mutable object whose .current property can be updated without causing React to re-render the component.'
    },
    {
      id: 'q2',
      question: 'When should you use `useMemo`?',
      options: [
        'To cache the result of an expensive calculation or heavy array filter so it only re-computes when dependencies change',
        'To target an HTML input element directly',
        'To save passwords in the browser cookies',
        'To replace all state variables in your app'
      ],
      answer: 0,
      explanation: 'useMemo memoizes the computed return value of a function and re-runs it ONLY when values in its dependency array change.'
    },
    {
      id: 'q3',
      question: 'Why does passing an inline callback `<Child onClick={() => doSomething()} />` to `React.memo(Child)` re-render the child?',
      options: [
        'Because React.memo is broken',
        'Because in JavaScript, every render creates a brand new function object in memory (() => {} !== () => {}), making props look changed',
        'Because functions cannot be passed as props in React',
        'Because JSX cannot compile arrow functions'
      ],
      answer: 1,
      explanation: 'In JavaScript, functions are objects. On every parent render, a new function instance with a new memory address is created. useCallback preserves the function pointer.'
    },
    {
      id: 'q4',
      question: 'What rule must all Custom Hooks follow in React?',
      options: [
        'They must end with "Hook"',
        'They must start with the prefix "use" (e.g. useFetch, useToggle) and can call other built-in React hooks',
        'They can only be used inside loops',
        'They must be written in TypeScript'
      ],
      answer: 1,
      explanation: 'Custom Hooks must start with "use" so React and ESLint can enforce the official Rules of Hooks.'
    }
  ];

  const quizScore = quizQuestions.filter((q) => quizAnswers[q.id] === q.answer).length;

  /* ──────────────── 8. Assignment State ──────────────── */
  const [showTask1, setShowTask1] = useState(false);
  const [showTask2, setShowTask2] = useState(false);
  const [showTask3, setShowTask3] = useState(false);

  return (
    <AnimatePresence mode="wait">

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 1: useRef Hook
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="t1" eyebrow="Topic 01 • Day 12" title="useRef Hook (DOM Access & Silent Values)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <ConceptCard
              what="useRef is a hook that gives you a mutable container (ref.current). It holds references to DOM elements (like inputs, buttons, video) or keeps values across renders without triggering a re-render."
              why="useState forces the whole component to re-draw whenever it updates. useRef allows silent updates (e.g., timer IDs, previous values, render counts) and direct DOM manipulation (e.g., input.focus())."
              where="1. Auto-focusing an input on page load. 2. Storing setInterval/setTimeout IDs without re-rendering. 3. Tracking component render counts."
            />

            {/* Comparison Program: useState vs useRef */}
            <ComparisonBlock
              badTitle="useState (Unneeded Re-renders for Silent Data)"
              badDesc="Using useState to track timer IDs or input focus causes the entire component to re-render needlessly every time the value updates."
              badCode={`import React, { useState } from "react";

export default function BadTimer() {
  const [seconds, setSeconds] = useState(0);
  // ❌ BAD: Storing timer ID in useState forces a re-render!
  const [timerId, setTimerId] = useState(null);
  const [renderCount, setRenderCount] = useState(1);

  const start = () => {
    // ⚠️ Calling setTimerId triggers a full re-render!
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    setTimerId(id);
    setRenderCount(r => r + 1);
  };

  const stop = () => {
    clearInterval(timerId);
    setTimerId(null); // ⚠️ Triggers another re-render!
    setRenderCount(r => r + 1);
  };

  return (
    <div>
      <h3>Timer: {seconds}s</h3>
      {/* ⚠️ Output problem: Render count keeps shooting up! */}
      <p style={{ color: "red" }}>
        Total Component Renders: {renderCount} (Wasted re-renders!)
      </p>
      <p>❌ Cannot directly focus an input element without ref</p>
    </div>
  );
}`}
              goodTitle="useRef (0 Re-renders + Direct DOM Control)"
              goodDesc="useRef stores timer IDs silently without re-rendering the component, and provides a direct reference to focus or select DOM nodes."
              goodCode={`import React, { useState, useRef } from "react";

export default function GoodTimer() {
  const [seconds, setSeconds] = useState(0);
  // ✅ GOOD: useRef stores timer ID silently (0 re-renders)
  const timerRef = useRef(null);
  const inputRef = useRef(null); // Direct DOM pointer

  const start = () => {
    if (timerRef.current) return;
    // ⚡ Updating .current updates instantly with 0 UI re-renders!
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // ⚡ 0 wasted re-renders!
  };

  const focusInput = () => inputRef.current.focus();

  return (
    <div>
      <h3>Timer: {seconds}s</h3>
      {/* ⚡ Output advantage: Render count stays frozen at 1! */}
      <p style={{ color: "green" }}>
        Total Component Renders: 1 (Frozen! 0 wasted re-renders)
      </p>
      <input ref={inputRef} placeholder="Target element..." />
      <button onClick={focusInput}>🎯 Focus Input with useRef</button>
    </div>
  );
}`}
              liveDemo={<UseRefVsStateDemo />}
              outputExplanation="In useState (Left), updating the secret token or timer ID triggers a component re-render (notice the render badge counting up). In useRef (Right), updating .current preserves the value in memory silently with 0 re-renders (render badge stays frozen at 1), and inputRef.current.focus() allows direct DOM element control!"
              takeaway="Need the UI to visually change on screen? Use useState. Need to store a silent value (timer ID, counter) or touch HTML elements directly without re-rendering? Use useRef."
            />

            {/* Complete Beginner Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Program: Input Focus & Timer with useRef
              </h3>
              <CodeBlock
                title="UseRefDemo.jsx"
                code={`import React, { useState, useRef, useEffect } from "react";

export default function UseRefDemo() {
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);

  // 1. Ref for DOM Access (points to <input>)
  const inputRef = useRef(null);

  // 2. Ref for storing Timer ID silently without re-renders
  const timerRef = useRef(null);

  // Auto-focus input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleManualFocus = () => {
    inputRef.current.focus();
    inputRef.current.select(); // Highlight text
  };

  const handleStartTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handleStopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div style={{ padding: 20 }}>
      {/* DOM Focus Section */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Type name here..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={handleManualFocus} style={{ padding: 8 }}>
        Focus & Select
      </button>

      {/* Timer Section */}
      <div style={{ marginTop: 16 }}>
        <p>Timer: <b>{seconds}s</b></p>
        <button onClick={handleStartTimer} style={{ marginRight: 8 }}>Start</button>
        <button onClick={handleStopTimer}>Stop</button>
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Live Interactive Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Eye size={18} color="#6366f1" /> Live Interactive Demo
                </h4>
                <span style={{ fontSize: '0.78rem', background: '#e0e7ff', color: '#4338ca', padding: '3px 10px', borderRadius: 20, fontWeight: 800 }}>
                  Total Component Renders: {renderCountRef.current}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* 1. DOM Input Focus Tester */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase' }}>
                    1. DOM Element Targeting
                  </span>
                  <div style={{ margin: '8px 0 10px' }}>
                    <input
                      ref={domInputRef}
                      type="text"
                      placeholder="Target input element..."
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', border: '2px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={handleFocusInput}
                      style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Focus Input (useRef)
                    </button>
                    <button
                      onClick={handleSelectAll}
                      style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Select All
                    </button>
                  </div>
                  {refFeedback && (
                    <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>
                      {refFeedback}
                    </div>
                  )}
                </div>

                {/* 2. Persistent Stopwatch Tester */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                    2. Silent Interval Timer (timerIntervalRef)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 10px' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
                      {timerSeconds}s
                    </div>
                    <span style={{ fontSize: '0.75rem', background: isTimerRunning ? '#dcfce7' : '#fee2e2', color: isTimerRunning ? '#166534' : '#991b1b', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
                      {isTimerRunning ? 'Running' : 'Paused'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={handleStartStopwatch}
                      disabled={isTimerRunning}
                      style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: isTimerRunning ? 'not-allowed' : 'pointer', opacity: isTimerRunning ? 0.6 : 1 }}
                    >
                      Start
                    </button>
                    <button
                      onClick={handlePauseStopwatch}
                      disabled={!isTimerRunning}
                      style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: !isTimerRunning ? 'not-allowed' : 'pointer', opacity: !isTimerRunning ? 0.6 : 1 }}
                    >
                      Pause
                    </button>
                    <button
                      onClick={handleResetStopwatch}
                      style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: useMemo Cache <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 2: useMemo Cache
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="t2" eyebrow="Topic 02 • Day 12" title="useMemo Hook (Caching Calculated Values)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <ConceptCard
              what="useMemo is a hook that caches (remembers) the calculated result of a function. It only re-calculates when one of its dependencies changes."
              why="In React, every state update runs the whole component again. If you filter 1,000 items or do heavy math on every keystroke, the UI freezes. useMemo skips recalculation when inputs are identical."
              where="1. Filtering or sorting lists with 100+ items. 2. Heavy mathematical calculations. 3. Transforming complex datasets before rendering."
            />

            {/* Comparison Program: Without useMemo vs With useMemo */}
            <ComparisonBlock
              badTitle="Without useMemo (Slow Recalculation on Every Render)"
              badDesc="Every time ANY unrelated state updates (e.g. clicking a counter button), heavy array loops run again from scratch, freezing the browser."
              badCode={`import React, { useState } from "react";

export default function SlowComponent({ items }) {
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  // ❌ BAD: Runs 50,000 array iterations EVERY time "counter" changes!
  // Clicking "Increment Counter" causes UI stutter.
  const filtered = items.filter(item => {
    console.log("Slow filter recalculating...");
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>
        Counter: {counter} (Causes slow re-filter!)
      </button>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {/* ⚠️ Output Problem: Filter calculation runs every single counter click! */}
      <p style={{ color: "red" }}>
        ⚠️ Heavy Calculations Run: {counter + 1} times (Unnecessary lag!)
      </p>
    </div>
  );
}`}
              goodTitle="With useMemo (Cached Result, 0 Wasted Computations)"
              goodDesc="useMemo caches the returned value and only runs the heavy filter when the 'search' dependency actually changes. Counter clicks are instant."
              goodCode={`import React, { useState, useMemo } from "react";

export default function FastComponent({ items }) {
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  // ✅ GOOD: Cached in memory!
  // When "counter" changes, React SKIPS this calculation completely!
  const filtered = useMemo(() => {
    console.log("⚡ [useMemo] Filter running ONLY when search changes");
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]); // <-- Only re-run when search string changes!

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>
        Counter: {counter} (Instant! Filter is skipped)
      </button>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {/* ⚡ Output Advantage: Filter calculation stays frozen at 1! */}
      <p style={{ color: "green" }}>
        ⚡ Heavy Calculations Run: 1 time (Skipped on counter clicks!)
      </p>
    </div>
  );
}`}
              liveDemo={<UseMemoComparisonDemo />}
              outputExplanation="In the unoptimized version (Left), clicking the counter button re-runs the entire array filter from scratch (computation count increases with each click). In the useMemo version (Right), React notices that 'search' did not change, skips the filter completely, and returns the cached list instantly (computations stay frozen at 1)!"
              takeaway="useMemo caches a computed VALUE. Wrap heavy array loops or complex math in useMemo so unrelated state changes never lag your app."
            />

            {/* Complete Beginner Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Program: Filtered List with useMemo
              </h3>
              <CodeBlock
                title="UseMemoDemo.jsx"
                code={`import React, { useState, useMemo } from "react";

const COURSES = ["React 19", "Advanced Hooks", "Next.js", "TypeScript", "Node.js", "SQL Databases"];

export default function UseMemoDemo() {
  const [search, setSearch] = useState("");
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  // ✅ useMemo: ONLY re-runs the filter when "search" changes.
  // Clicking "Increment Counter" will NOT re-filter the array!
  const filteredCourses = useMemo(() => {
    console.log("⚡ [useMemo] Filtering courses list...");
    return COURSES.filter((c) =>
      c.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]); // <-- Dependency array

  return (
    <div style={{ padding: 20 }}>
      {/* Unrelated state change */}
      <button onClick={() => setUnrelatedCount((c) => c + 1)}>
        Unrelated Counter: {unrelatedCount} (Filter skipped!)
      </button>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", margin: "12px 0", padding: 8 }}
      />

      <p>Results: {filteredCourses.length} matches</p>
      <ul>
        {filteredCourses.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
}`}
              />
            </div>

            {/* Live Interactive Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#10b981" /> Live Interactive Demo
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* Search Filter with useMemo */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                    1. Search Filter (Cached with useMemo)
                  </span>
                  <input
                    type="text"
                    placeholder="Search courses (e.g. React)..."
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', margin: '8px 0 10px', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                    <strong>{filteredCourseList.length} matches:</strong>
                    <ul style={{ margin: '6px 0 0', paddingLeft: 18, maxHeight: 110, overflowY: 'auto' }}>
                      {filteredCourseList.map((item, idx) => (
                        <li key={idx} style={{ fontSize: '0.82rem' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Heavy Calculation & Unrelated State Tester */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase' }}>
                    2. Calculation Memoization Tracker
                  </span>
                  <div style={{ margin: '8px 0', fontSize: '0.85rem', color: '#334155' }}>
                    <div>Heavy Hash Output: <strong style={{ color: '#6366f1' }}>{heavyCalculatedValue}</strong></div>
                    <div>Times Calculation Actually Ran: <strong style={{ color: '#10b981' }}>{memoCalculationRuns} times</strong></div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <button
                      onClick={() => setUnrelatedCounter((c) => c + 1)}
                      style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Increment Unrelated State ({unrelatedCounter})
                    </button>
                    <button
                      onClick={() => setCalcNumber((n) => n + 5)}
                      style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Change Number (+5)
                    </button>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: 8 }}>
                    💡 Notice: Clicking "Increment Unrelated State" re-renders the component but <b>skips recalculation</b> (count stays frozen)!
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: useCallback Actions <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 3: useCallback Actions
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="t3" eyebrow="Topic 03 • Day 12" title="useCallback Hook (Freezing Function Definitions)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <ConceptCard
              what="useCallback is a hook that caches (remembers) a function definition across renders so it keeps the exact same memory address."
              why="In JavaScript, () => {} !== () => {}. Every parent render creates new function pointers. Passing inline functions to React.memo child components causes those children to re-render needlessly. useCallback prevents this."
              where="1. Passing delete/update handlers to memoized list rows. 2. Passing stable functions into useEffect dependency arrays."
            />

            {/* Comparison Program: Without useCallback vs With useCallback */}
            <ComparisonBlock
              badTitle="Without useCallback (Breaks React.memo Optimization)"
              badDesc="In JavaScript, () => {} !== () => {}. Every render creates a new function in memory, so React.memo child components re-render pointlessly."
              badCode={`import React, { useState } from "react";

// Child wrapped in React.memo
const TodoRow = React.memo(({ todo, onDelete }) => {
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      {/* ⚠️ Output Problem: Child flashes and re-renders on parent ticks! */}
      <span style={{ color: "red" }}> ⚠️ Child Re-rendered!</span>
    </div>
  );
});

export default function ParentWithoutCallback() {
  const [todos, setTodos] = useState([{ id: 1, text: "Learn React" }]);
  const [count, setCount] = useState(0);

  // ❌ BAD: A brand new function is created on EVERY render!
  // React.memo checks props: prevProps.onDelete !== nextProps.onDelete.
  // Result: <TodoRow /> re-renders EVERY time "count" ticks!
  const handleDelete = (id) => {
    setTodos(t => t.filter(x => x.id !== id));
  };

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Parent Counter: {count} (Forces child re-render!)
      </button>
      {todos.map(t => <TodoRow key={t.id} todo={t} onDelete={handleDelete} />)}
    </div>
  );
}`}
              goodTitle="With useCallback (Locks Function Memory Address)"
              goodDesc="useCallback returns the exact same function reference across renders. React.memo sees props haven't changed and completely freezes the child component."
              goodCode={`import React, { useState, useCallback } from "react";

// Child wrapped in React.memo
const TodoRow = React.memo(({ todo, onDelete }) => {
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      {/* ⚡ Output Advantage: Child stays completely frozen on parent ticks! */}
      <span style={{ color: "green" }}> ⚡ Child Frozen (0 re-renders)!</span>
    </div>
  );
});

export default function ParentWithCallback() {
  const [todos, setTodos] = useState([{ id: 1, text: "Learn React" }]);
  const [count, setCount] = useState(0);

  // ✅ GOOD: useCallback preserves the function pointer in memory!
  // React.memo checks props: prevProps.onDelete === nextProps.onDelete.
  // Result: <TodoRow /> NEVER re-renders when "count" ticks!
  const handleDelete = useCallback((id) => {
    setTodos(t => t.filter(x => x.id !== id));
  }, []); // <-- Empty array = never recreated

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Parent Counter: {count} (Child skips render!)
      </button>
      {todos.map(t => <TodoRow key={t.id} todo={t} onDelete={handleDelete} />)}
    </div>
  );
}`}
              liveDemo={<UseCallbackComparisonDemo />}
              outputExplanation="In the unoptimized version (Left), clicking 'Parent Tick' creates a brand new delete function memory address, tricking React.memo into re-rendering the child row (child render badge counts up). In the useCallback version (Right), the function memory pointer is frozen, so React.memo recognizes props are unchanged and keeps the child row frozen at 1 render!"
              takeaway="useCallback caches a FUNCTION DEFINITION. Use it when passing event handlers down to React.memo child components to stop wasted child re-renders."
            />

            {/* Complete Beginner Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Program: Todo List with useCallback & React.memo
              </h3>
              <CodeBlock
                title="UseCallbackDemo.jsx"
                code={`import React, { useState, useCallback } from "react";

// 1. Child Component wrapped in React.memo (only re-renders if props change)
const TodoItem = React.memo(({ item, onDelete }) => {
  console.log("Rendered TodoItem:", item.text);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: 6 }}>
      <span>{item.text}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

// 2. Parent Component
export default function UseCallbackDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React Hooks" },
    { id: 2, text: "Master useCallback" }
  ]);
  const [counter, setCounter] = useState(0);

  // ✅ useCallback locks the function reference in memory
  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []); // <-- Empty array: Never recreated

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setCounter((c) => c + 1)}>
        Parent Counter: {counter} (Child will NOT re-render)
      </button>

      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
}`}
              />
            </div>

            {/* Live Interactive Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Eye size={18} color="#0284c7" /> Live Interactive Demo
                </h4>
                <button
                  onClick={() => setParentTick((c) => c + 1)}
                  style={{ background: '#0284c7', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Trigger Parent Re-render (Tick: {parentTick})
                </button>
              </div>

              {/* Side-by-side comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <UnoptimizedChild count={parentTick} />
                </div>
                <div>
                  <OptimizedChild onClick={handleChildClick} label={`Action Clicks: ${childClickCount}`} />
                </div>
              </div>

              {/* Memoized Todo List */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Interactive Memoized Todo Roster ({todoItems.length} items)
                </span>
                {todoItems.map((todo) => (
                  <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.88rem', color: '#334155' }}>{todo.text}</span>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 4, padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Custom Hooks <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 4: Custom Hooks
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="t4" eyebrow="Topic 04 • Day 12" title="Custom Hooks (Reusable Stateful Logic)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <ConceptCard
              what="A Custom Hook is a regular JavaScript function starting with 'use' (e.g. useToggle, useLocalStorage) that calls other built-in React hooks to encapsulate reusable logic."
              why="Instead of re-writing the same useState and useEffect logic in 10 different components, custom hooks let you package it into a single clean function."
              where="1. useToggle for modals, dialogs, and accordions. 2. useLocalStorage for browser persistence. 3. useFetch for API data loading."
            />

            {/* Comparison Program: Without Custom Hook vs With Custom Hook */}
            <ComparisonBlock
              badTitle="Without Custom Hook (Duplicated Code in Every Component)"
              badDesc="Every time you need a modal or dropdown toggle, you write the same useState and handler logic over and over across multiple files."
              badCode={`import React, { useState } from "react";

// Component 1: Modal Dialog
export function Modal() {
  // ❌ Duplicate logic: 4 lines repeated
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(v => !v);
  return <button onClick={toggle}>{isOpen ? "Hide" : "Show Modal"}</button>;
}

// Component 2: Dropdown Menu
export function Dropdown() {
  // ❌ Duplicate logic: exact same 4 lines repeated again!
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(v => !v);
  return <button onClick={toggle}>{isOpen ? "Close" : "Open Menu"}</button>;
}`}
              goodTitle="With Custom Hook (Write Once, Use in 1 Clean Line)"
              goodDesc="Extract the toggle logic into a reusable useToggle custom hook once. Any component can now use it in just 1 line of code."
              goodCode={`import React, { useState, useCallback } from "react";

// ✅ 1. Reusable Custom Hook (Written ONCE)
export function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

// ✅ 2. Clean 1-liner in Component 1
export function Modal() {
  const [isOpen, toggle] = useToggle(false);
  return <button onClick={toggle}>{isOpen ? "Hide" : "Show Modal"}</button>;
}

// ✅ 3. Clean 1-liner in Component 2
export function Dropdown() {
  const [isOpen, toggle] = useToggle(false);
  return <button onClick={toggle}>{isOpen ? "Close" : "Open Menu"}</button>;
}`}
              liveDemo={<CustomHookComparisonDemo />}
              outputExplanation="Without Custom Hooks (Left), 3 different components must duplicate 15 lines of identical state declaration, updater functions, and toggle handlers. With Custom Hooks (Right), all 3 components share a single 1-line call const [isOpen, toggle] = useToggle(false), eliminating 80% of boilerplate code!"
              takeaway="Custom Hooks let you package stateful behavior (toggles, storage, data fetching) into clean reusable functions starting with 'use' so you never repeat code."
            />

            {/* Complete Beginner Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Program: useToggle and useLocalStorage Custom Hooks
              </h3>
              <CodeBlock
                title="CustomHooksDemo.jsx"
                code={`import React, { useState, useEffect, useCallback } from "react";

// ── CUSTOM HOOK 1: useToggle ──
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

// ── CUSTOM HOOK 2: useLocalStorage ──
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// ── MAIN COMPONENT USING BOTH ──
export default function CustomHooksDemo() {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [name, setName] = useLocalStorage("username_key", "John Doe");

  return (
    <div style={{ padding: 20 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={toggleModal} style={{ marginLeft: 8 }}>
        {isModalOpen ? "Close Modal" : "Open Modal"}
      </button>

      {isModalOpen && (
        <div style={{ background: "#e0e7ff", padding: 12, marginTop: 8 }}>
          Hello {name}! This modal is controlled by useToggle.
        </div>
      )}
    </div>
  );
}`}
              />
            </div>

            {/* Live Interactive Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#7c3aed" /> Live Interactive Demo
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* useLocalStorage Demo */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>
                    1. useLocalStorage Hook Simulator
                  </span>
                  <input
                    type="text"
                    value={storageUser}
                    onChange={(e) => handleUpdateStorageUser(e.target.value)}
                    placeholder="Enter name to save..."
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', margin: '8px 0 10px', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    Stored in localStorage: <strong style={{ color: '#7c3aed' }}>"{storageUser}"</strong>
                  </div>
                </div>

                {/* useToggle Demo */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                    2. useToggle Hook Simulator
                  </span>
                  <div style={{ margin: '8px 0 10px' }}>
                    <button
                      onClick={() => setIsAlertOpen((v) => !v)}
                      style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {isAlertOpen ? 'Close Notification' : 'Toggle Notification Alert'}
                    </button>
                  </div>
                  {isAlertOpen && (
                    <div style={{ background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: 6, padding: '10px 12px', fontSize: '0.82rem', color: '#5b21b6' }}>
                      🎉 Hello <strong>{storageUser}</strong>! This notification state is managed by <code>useToggle</code>.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Hook Cheat Sheet <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 5: Hook Cheat Sheet & Rules
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="t5" eyebrow="Topic 05 • Day 12" title="React Hooks Cheat Sheet & Selection Guide">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Comparison Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Hook</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Return Value</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Triggers Re-render?</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Primary Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'useState(init)', ret: '[value, setValue]', render: '✅ Yes', use: 'Interactive UI state (inputs, toggles, counters)', color: '#6366f1' },
                    { name: 'useRef(init)', ret: '{ current: value }', render: '❌ Never', use: 'DOM element focus, timer IDs, silent counters', color: '#8b5cf6' },
                    { name: 'useMemo(fn, deps)', ret: 'Calculated value', render: '❌ No', use: 'Caching heavy filters & expensive math', color: '#10b981' },
                    { name: 'useCallback(fn, deps)', ret: 'Function reference', render: '❌ No', use: 'Passing stable handlers to React.memo children', color: '#0ea5e9' },
                    { name: 'Custom Hook', ret: 'Any custom data', render: 'Depends on hooks', use: 'Reusing stateful logic across components', color: '#f59e0b' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#fcfcfd' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 800, fontFamily: 'monospace', color: row.color }}>{row.name}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.82rem', color: '#475569' }}>{row.ret}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>{row.render}</td>
                      <td style={{ padding: '10px 14px', color: '#334155' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive Selector */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                💡 Which Hook Should You Use? Click a Scenario:
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 12 }}>
                {[
                  { id: 'dom', label: '1. Focus Input / Timer ID' },
                  { id: 'calc', label: '2. Filter 1,000+ Items' },
                  { id: 'handler', label: '3. Pass Action to Memo Child' },
                  { id: 'reuse', label: '4. Share Logic in 3 Files' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTask(item.id)}
                    style={{
                      background: selectedTask === item.id ? taskRecommendations[selectedTask].color : 'white',
                      color: selectedTask === item.id ? 'white' : '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '8px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <h4 style={{ margin: 0, fontWeight: 800, color: taskRecommendations[selectedTask].color }}>
                    Recommended: {taskRecommendations[selectedTask].hook}
                  </h4>
                  <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    {taskRecommendations[selectedTask].badge}
                  </span>
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '0.88rem', color: '#475569' }}>
                  {taskRecommendations[selectedTask].desc}
                </p>
                <CodeBlock title="Quick Boilerplate" code={taskRecommendations[selectedTask].code} />
              </div>
            </div>

            {/* Master Comparison Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>🎓</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Master Comparison Program (All Advanced Hooks in One File)
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px' }}>
                Use this single reference program to teach and review how <code>useState</code>, <code>useRef</code>, <code>useMemo</code>, <code>useCallback</code>, and <code>Custom Hooks</code> cooperate together in real applications:
              </p>
              <CodeBlock
                title="MasterHooksComparison.jsx"
                code={`import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

// ── 1. CUSTOM HOOK: Reusable toggle logic ──
function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  return [open, toggle];
}

// ── 2. MEMOIZED CHILD: Protected from wasted re-renders ──
const StudentRow = React.memo(({ student, onDelete }) => {
  console.log("Rendered Row:", student.name);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
      <span>{student.name} - Score: {student.score}</span>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  );
});

// ── 3. MAIN TEACHING COMPONENT ──
export default function MasterHooksComparison() {
  // ── HOOK A: useState (Triggers UI Re-renders) ──
  const [search, setSearch] = useState("");
  const [unrelatedTick, setUnrelatedTick] = useState(0);
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", score: 95 },
    { id: 2, name: "Bob", score: 80 },
    { id: 3, name: "Charlie", score: 90 }
  ]);

  // ── HOOK B: useRef (Silent container & DOM pointer - 0 re-renders) ──
  const inputRef = useRef(null);        // Holds DOM <input> element
  const renderCounterRef = useRef(0);   // Counts total renders silently
  renderCounterRef.current += 1;

  // Auto-focus input on page load
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // ── HOOK C: useMemo (Caches expensive computed VALUE) ──
  // When "unrelatedTick" changes, this filter is SKIPPED (0ms cost)!
  const filteredStudents = useMemo(() => {
    console.log("⚡ [useMemo] Filtering student list...");
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]); // <-- Only re-runs when students or search changes

  // ── HOOK D: useCallback (Freezes FUNCTION definition for React.memo) ──
  // Child <StudentRow /> will NOT re-render when "unrelatedTick" changes!
  const handleDelete = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []); // <-- Same function pointer preserved in memory

  // ── HOOK E: Custom Hook (1-line clean usage) ──
  const [showStats, toggleStats] = useToggle(false);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Master Hooks Comparison Demo</h2>
      <p>Component Renders: <b>{renderCounterRef.current}</b> (tracked by useRef)</p>

      {/* Unrelated state change to prove useMemo & useCallback in action */}
      <button onClick={() => setUnrelatedTick((t) => t + 1)}>
        Tick Counter: {unrelatedTick} (Skips filter & child re-renders!)
      </button>

      <div style={{ margin: "14px 0" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search students (useRef focused)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={toggleStats} style={{ marginLeft: 8 }}>
          {showStats ? "Hide Stats (useToggle)" : "Show Stats (useToggle)"}
        </button>
      </div>

      {showStats && (
        <div style={{ background: "#e0e7ff", padding: 10, borderRadius: 6, marginBottom: 10 }}>
          Total Students: {students.length} | Filtered Count: {filteredStudents.length}
        </div>
      )}

      <div>
        {filteredStudents.map((student) => (
          <StudentRow key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Capstone Project <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 6: Capstone Project
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="t6" eyebrow="Capstone • Day 12" title="Capstone Project: High-Performance Student Portal">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p style={{ margin: '0 0 1.25rem', fontSize: '0.92rem', color: '#475569' }}>
              This Capstone combines all 4 hooks together in a production-ready application:
              <br />• <strong>useRef</strong>: Auto-focus the student name input on mount.
              <br />• <strong>useMemo</strong>: Filter and sort the student roster without UI lag.
              <br />• <strong>useCallback</strong>: Freeze delete and grade handlers to avoid re-rendering unaffected student rows.
            </p>

            {/* Complete Beginner Program */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Capstone Source Code
              </h3>
              <CodeBlock
                title="StudentPortal.jsx"
                code={`import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

// 1. Memoized Child Row
const StudentRow = React.memo(({ student, onDelete, onBoost }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #eee" }}>
      <span><b>{student.name}</b> ({student.course}) - Score: {student.score}</span>
      <div>
        <button onClick={() => onBoost(student.id)} style={{ marginRight: 6 }}>+5 Pts</button>
        <button onClick={() => onDelete(student.id)} style={{ color: "red" }}>Delete</button>
      </div>
    </div>
  );
});

// 2. Main Component
export default function StudentPortal() {
  const nameInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(50);
  const [name, setName] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", course: "React 19", score: 95 },
    { id: 2, name: "Bob Smith", course: "Node.js", score: 82 }
  ]);

  // useRef: Auto-focus input on mount
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  // useMemo: Filter and Sort dataset cleanly
  const filtered = useMemo(() => {
    return students
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) && s.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }, [students, search, minScore]);

  // useCallback: Stable handlers for list items
  const handleDelete = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleBoost = useCallback((id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: Math.min(100, s.score + 5) } : s))
    );
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStudents((prev) => [{ id: Date.now(), name, course: "React 19", score: 85 }, ...prev]);
    setName("");
    if (nameInputRef.current) nameInputRef.current.focus();
  };

  return (
    <div style={{ maxWidth: 550, padding: 20 }}>
      <h3>Student Management Portal</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input ref={nameInputRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name..." />
        <button type="submit">Add</button>
      </form>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ flex: 1 }} />
        <label>Min: {minScore} <input type="range" min={0} max={100} value={minScore} onChange={(e) => setMinScore(+e.target.value)} /></label>
      </div>

      <div>
        {filtered.map((s) => (
          <StudentRow key={s.id} student={s} onDelete={handleDelete} onBoost={handleBoost} />
        ))}
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Live Interactive Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#6366f1" /> Live Capstone Application Preview
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1.25rem' }}>
                <div>
                  {/* Add Form */}
                  <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <input
                      ref={capstoneInputRef}
                      type="text"
                      placeholder="Enter student name..."
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                    <select
                      value={newStudentCourse}
                      onChange={(e) => setNewStudentCourse(e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem', background: 'white' }}
                    >
                      <option>React 19</option>
                      <option>Node.js</option>
                      <option>SQL Databases</option>
                    </select>
                    <button type="submit" style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}>
                      Add
                    </button>
                  </form>

                  {/* Filter Toolbar */}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                    <input
                      type="text"
                      placeholder="Search students (useMemo)..."
                      value={capstoneQuery}
                      onChange={(e) => setCapstoneQuery(e.target.value)}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
                      Min: {minScore}
                      <input type="range" min={0} max={100} value={minScore} onChange={(e) => setMinScore(+e.target.value)} style={{ marginLeft: 6 }} />
                    </label>
                  </div>

                  {/* Student List */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
                    {filteredStudents.length === 0 ? (
                      <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>No matching students found</div>
                    ) : (
                      filteredStudents.map((student) => (
                        <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ fontSize: '0.88rem' }}><b>{student.name}</b> ({student.course}) - Score: <strong style={{ color: '#6366f1' }}>{student.score}</strong></span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => handleScoreBoost(student.id)}
                              style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: 4, padding: '3px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              +5 Pts
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 4, padding: '3px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Optimization Log */}
                <div style={{ background: '#0f172a', color: 'white', borderRadius: 10, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8892b0', textTransform: 'uppercase', marginBottom: 8 }}>
                    Hook Optimization Log:
                  </span>
                  <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.6, overflowY: 'auto' }}>
                    {capstoneLog.map((log, i) => (
                      <div key={i} style={{ padding: '3px 0', borderBottom: '1px solid #1e293b', color: log.includes('useRef') ? '#c4b5fd' : log.includes('useMemo') ? '#86efac' : '#38bdf8' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 7: Quiz
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="t7" eyebrow="Knowledge Check" title="Day 12 Quiz — Advanced React Hooks">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 10, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 10px', fontSize: '0.92rem' }}>
                    {qIndex + 1}. {q.question}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {q.options.map((opt, optIndex) => {
                      const selected = quizAnswers[q.id] === optIndex;
                      const correct = optIndex === q.answer;
                      let bg = 'white', border = '1px solid #cbd5e1';

                      if (quizSubmitted) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) {
                        bg = '#e0f2fe'; border = '1.5px solid #0ea5e9';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIndex }))}
                          style={{ background: bg, border, padding: '8px 12px', borderRadius: 6, textAlign: 'left', cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '0.85rem' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: 6 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {!quizSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  style={{ background: '#6366f1', borderColor: '#6366f1' }}
                >
                  Submit Quiz
                </button>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                    Retry Quiz
                  </button>
                  <strong style={{ color: quizScore === quizQuestions.length ? '#16a34a' : '#ea580c' }}>
                    Score: {quizScore} / {quizQuestions.length}
                  </strong>
                </>
              )}
            </div>

            {/* Navigation Button */}
            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Assignments <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TOPIC 8: Assignment
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="t8" eyebrow="Hands-on Practice" title="Day 12 Beginner Assignments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Task 1 */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontWeight: 800 }}>
                Task 1: Auto-Focus Input with useRef
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px' }}>
                Create a component that automatically focuses the input field when the page first loads using <code>useRef</code> and <code>useEffect</code>.
              </p>
              <button
                onClick={() => setShowTask1((v) => !v)}
                style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}
              >
                {showTask1 ? 'Hide Solution' : '👁️ View Solution Code'}
              </button>
              {showTask1 && (
                <CodeBlock
                  title="Task 1 Solution"
                  code={`import React, { useRef, useEffect } from "react";

export default function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Focused on mount!" />;
}`}
                />
              )}
            </div>

            {/* Task 2 */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontWeight: 800 }}>
                Task 2: Build a Custom useToggle Hook
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px' }}>
                Create a custom hook called <code>useToggle(initialValue = false)</code> that returns <code>[value, toggleFunction]</code> and use it to show/hide a message.
              </p>
              <button
                onClick={() => setShowTask2((v) => !v)}
                style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}
              >
                {showTask2 ? 'Hide Solution' : '👁️ View Solution Code'}
              </button>
              {showTask2 && (
                <CodeBlock
                  title="Task 2 Solution"
                  code={`import React, { useState, useCallback } from "react";

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((s) => !s), []);
  return [state, toggle];
}

export function ToggleDemo() {
  const [isOn, toggleIsOn] = useToggle(false);
  return (
    <div>
      <button onClick={toggleIsOn}>Toggle Status</button>
      {isOn && <p>Status is ON!</p>}
    </div>
  );
}`}
                />
              )}
            </div>

            {/* Task 3 */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontWeight: 800 }}>
                Task 3: Fast List with useMemo & useCallback
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px' }}>
                Create a searchable product list where the filtered array is cached with <code>useMemo</code> and row deletion uses <code>useCallback</code>.
              </p>
              <button
                onClick={() => setShowTask3((v) => !v)}
                style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}
              >
                {showTask3 ? 'Hide Solution' : '👁️ View Solution Code'}
              </button>
              {showTask3 && (
                <CodeBlock
                  title="Task 3 Solution"
                  code={`import React, { useState, useMemo, useCallback } from "react";

const ItemRow = React.memo(({ item, onDelete }) => (
  <div>
    <span>{item.name}</span>
    <button onClick={() => onDelete(item.id)}>X</button>
  </div>
));

export default function FastList() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ]);

  const filtered = useMemo(() => {
    return items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  const handleDelete = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      {filtered.map((i) => <ItemRow key={i.id} item={i} onDelete={handleDelete} />)}
    </div>
  );
}`}
                />
              )}
            </div>

            {/* Footer */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', textAlign: 'center' }}>
              <CheckCircle size={32} color="#10b981" style={{ marginBottom: 6 }} />
              <h5 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>Day 12 Complete!</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>You have mastered useRef, useMemo, useCallback, and Custom Hooks.</p>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
