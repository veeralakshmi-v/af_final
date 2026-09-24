import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Cpu, Activity, Sparkles, FileText, Sliders, CheckCircle,
  ArrowRight, ArrowLeft, RefreshCw, AlertTriangle, Eye, Shield,
  Terminal, Zap, Check, X, BookOpen, Clock, Timer, Search,
  Play, Pause, RotateCcw, Copy, HelpCircle, HardDrive, Filter,
  Maximize2, Database, Trash2, Plus, CornerDownRight, BarChart3
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const StepCard = ({ stepNumber, title, desc, children }) => (
  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
      <span style={{ background: '#6366f1', color: 'white', fontWeight: 800, fontSize: '0.85rem', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {stepNumber}
      </span>
      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{title}</h4>
    </div>
    {desc && <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{desc}</p>}
    {children}
  </div>
);

// Memoized student row for useCallback demonstration
const MemoizedStudentRow = React.memo(({ student, onDelete, onGradeChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 6, transition: 'all 0.15s' }}>
      <div>
        <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{student.name}</strong>
        <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>Course: {student.course} · Grade: <strong style={{ color: '#6366f1' }}>{student.grade}</strong> (Score: {student.score})</span>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button
          onClick={() => onGradeChange(student.id, Math.min(100, student.score + 5))}
          style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: 6, padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
        >
          +5 Pts
        </button>
        <button
          onClick={() => onDelete(student.id)}
          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
});
MemoizedStudentRow.displayName = 'MemoizedStudentRow';

// Un-memoized child component for comparison
const RegularChild = ({ title, count }) => {
  return (
    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, padding: '8px 12px', fontSize: '0.8rem', color: '#9f1239', marginBottom: 6 }}>
      ⚠️ <strong>{title}:</strong> Rendered on every parent tick! (Parent ticks: {count})
    </div>
  );
};

// Memoized child component for comparison
const OptimizedChild = React.memo(({ title, onClick }) => {
  return (
    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '8px 12px', fontSize: '0.8rem', color: '#166534', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>✅ <strong>{title}:</strong> Frozen! (0 extra renders)</span>
      <button onClick={onClick} style={{ background: '#166534', color: 'white', border: 'none', borderRadius: 4, padding: '3px 8px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}>
        Click Action
      </button>
    </div>
  );
});
OptimizedChild.displayName = 'OptimizedChild';

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay12({ activeTab = 'intro_react', onNavigate }) {
  const go = (id) => {
    onNavigate('react_module12', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ──────────────────────────────────────────────────────────────────────────
     1. useRef STATE & REFS
  ────────────────────────────────────────────────────────────────────────── */
  const domInputRef = useRef(null);
  const intervalTimerRef = useRef(null);
  const renderCounterRef = useRef(0);
  const [refTimerSeconds, setRefTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [stateCounterVal, setStateCounterVal] = useState(0);
  const [dummyText, setDummyText] = useState('');

  const [showSolution1, setShowSolution1] = useState(false);
  const [showSolution2, setShowSolution2] = useState(false);
  const [showSolution3, setShowSolution3] = useState(false);

  // Track component renders
  renderCounterRef.current += 1;

  const handleFocusDomInput = () => {
    if (domInputRef.current) {
      domInputRef.current.focus();
      domInputRef.current.style.borderColor = '#6366f1';
      domInputRef.current.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
    }
  };

  const handleSelectDomText = () => {
    if (domInputRef.current) {
      domInputRef.current.select();
    }
  };

  const handleStartTimer = () => {
    if (isTimerRunning) return;
    setIsTimerRunning(true);
    intervalTimerRef.current = setInterval(() => {
      setRefTimerSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleStopTimer = () => {
    clearInterval(intervalTimerRef.current);
    intervalTimerRef.current = null;
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setRefTimerSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (intervalTimerRef.current) clearInterval(intervalTimerRef.current);
    };
  }, []);

  /* ──────────────────────────────────────────────────────────────────────────
     2. useMemo STATE & BENCHMARK
  ────────────────────────────────────────────────────────────────────────── */
  const [memoNumber, setMemoNumber] = useState(30);
  const [unrelatedInput, setUnrelatedInput] = useState('');
  const [isMemoActive, setIsMemoActive] = useState(true);
  const [lastCalcDuration, setLastCalcDuration] = useState(0);

  // Expensive computation simulation
  const calculateExpensiveFactorial = (num) => {
    const start = performance.now();
    let i = 0;
    // Intentional computational workload
    while (i < 9000000) { i++; }
    let res = 1;
    for (let k = 2; k <= Math.min(num, 30); k++) {
      res = (res * k) % 1000000007;
    }
    const end = performance.now();
    return { value: res, duration: (end - start).toFixed(2) };
  };

  // Memoized version
  const memoizedFactorial = useMemo(() => {
    const res = calculateExpensiveFactorial(memoNumber);
    setLastCalcDuration(res.duration);
    return res.value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoNumber]);

  // If useMemo is disabled, recalculate on every render
  const currentFactorialOutput = isMemoActive
    ? memoizedFactorial
    : calculateExpensiveFactorial(memoNumber).value;

  /* ──────────────────────────────────────────────────────────────────────────
     3. useCallback STATE & CHILD TRACER
  ────────────────────────────────────────────────────────────────────────── */
  const [parentTick, setParentTick] = useState(0);
  const [childClicks, setChildClicks] = useState(0);
  const [childRenderLog, setChildRenderLog] = useState([]);

  const handleStandardAction = () => {
    setChildClicks(c => c + 1);
  };

  const handleOptimizedAction = useCallback(() => {
    setChildClicks(c => c + 1);
  }, []);

  /* ──────────────────────────────────────────────────────────────────────────
     4. CUSTOM HOOKS STATE & SIMULATOR
  ────────────────────────────────────────────────────────────────────────── */
  const [storedNotes, setStoredNotes] = useState('My React Notes: Master Advanced Hooks');
  const [hookStorageKey, setHookStorageKey] = useState('react_course_notes');
  const [storageStatus, setStorageStatus] = useState('Synced to localStorage');
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Debounce search simulation
  const [rawSearchQuery, setRawSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(rawSearchQuery);
      if (rawSearchQuery.trim()) {
        setApiCallCount(c => c + 1);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [rawSearchQuery]);

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ──────────────────────────────────────────────────────────────────────────
     5. HOOK RECOMMENDER WIDGET
  ────────────────────────────────────────────────────────────────────────── */
  const [selectedScenario, setSelectedScenario] = useState('dom');
  const hookRecommendations = {
    'dom': {
      hook: 'useRef()',
      color: '#8b5cf6',
      badge: 'DOM Access',
      title: 'Targeting an HTML Input or Media Element',
      desc: 'Use `useRef()` to store a direct reference to a DOM node for focus, scrolling, or audio/video control.',
      code: `const inputRef = useRef(null);\n// In JSX: <input ref={inputRef} />\n// In handler: inputRef.current.focus();`
    },
    'calc': {
      hook: 'useMemo()',
      color: '#f59e0b',
      badge: 'Cache Value',
      title: 'Filtering or Sorting a 1,000+ Item Array',
      desc: 'Use `useMemo()` to cache the resulting array so filtering doesn\'t rerun on unrelated parent state changes.',
      code: `const filtered = useMemo(() => {\n  return items.filter(i => i.price <= maxPrice);\n}, [items, maxPrice]);`
    },
    'callback': {
      hook: 'useCallback()',
      color: '#0ea5e9',
      badge: 'Cache Function',
      title: 'Passing an Event Handler to a React.memo Child',
      desc: 'Use `useCallback()` to prevent recreating function instances, avoiding unnecessary child re-renders.',
      code: `const handleDelete = useCallback((id) => {\n  setItems(prev => prev.filter(i => i.id !== id));\n}, []);`
    },
    'custom': {
      hook: 'Custom Hook (use...)',
      color: '#10b981',
      badge: 'Reusable Logic',
      title: 'Sharing Fetch / Form Logic Across 5 Components',
      desc: 'Extract your stateful logic into a custom hook (e.g. `useFetch` or `useForm`) to keep components clean and DRY.',
      code: `function useFetch(url) {\n  const [data, setData] = useState(null);\n  // fetch logic here...\n  return { data, loading };\n}`
    }
  };

  /* ──────────────────────────────────────────────────────────────────────────
     6. CAPSTONE TASK: OPTIMIZED LIST & FORM FOCUS
  ────────────────────────────────────────────────────────────────────────── */
  const capstoneInputRef = useRef(null);
  const [capstoneSearch, setCapstoneSearch] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState(50);
  const [sortField, setSortField] = useState('score');
  const [studentsList, setStudentsList] = useState([
    { id: 1, name: 'Alice Johnson', course: 'React 19', score: 95, grade: 'A' },
    { id: 2, name: 'Bob Smith', course: 'Node.js', score: 82, grade: 'B' },
    { id: 3, name: 'Carol White', course: 'React 19', score: 98, grade: 'A' },
    { id: 4, name: 'David Miller', course: 'SQL Databases', score: 64, grade: 'C' },
    { id: 5, name: 'Emma Davis', course: 'React 19', score: 88, grade: 'B' },
    { id: 6, name: 'Frank Harris', course: 'Node.js', score: 45, grade: 'D' },
    { id: 7, name: 'Grace Wilson', course: 'Fullstack Dev', score: 91, grade: 'A' }
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('React 19');
  const [capstoneLog, setCapstoneLog] = useState([]);

  const addCapstoneLog = (msg) => {
    setCapstoneLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 6));
  };

  // 1. useRef to focus input
  const focusStudentInput = () => {
    if (capstoneInputRef.current) {
      capstoneInputRef.current.focus();
      addCapstoneLog('🎯 useRef: Focused student input field');
    }
  };

  // 2. useMemo to filter and sort list
  const filteredAndSortedStudents = useMemo(() => {
    addCapstoneLog('⚙️ useMemo: Re-filtered and sorted student dataset');
    return studentsList
      .filter(s =>
        s.name.toLowerCase().includes(capstoneSearch.toLowerCase()) &&
        s.score >= minScoreFilter
      )
      .sort((a, b) => {
        if (sortField === 'score') return b.score - a.score;
        if (sortField === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [studentsList, capstoneSearch, minScoreFilter, sortField]);

  // 3. useCallback for delete action
  const handleDeleteStudent = useCallback((id) => {
    setStudentsList(prev => prev.filter(s => s.id !== id));
    addCapstoneLog(`🗑️ useCallback: Deleted student record (id: ${id})`);
  }, []);

  // 4. useCallback for grade change
  const handleGradeChange = useCallback((id, newScore) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id === id) {
        const grade = newScore >= 90 ? 'A' : newScore >= 80 ? 'B' : newScore >= 60 ? 'C' : 'D';
        return { ...s, score: newScore, grade };
      }
      return s;
    }));
    addCapstoneLog(`✨ useCallback: Updated student score (id: ${id}, score: ${newScore})`);
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newScore = Math.floor(Math.random() * 30) + 70;
    const grade = newScore >= 90 ? 'A' : 'B';
    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      course: newStudentCourse,
      score: newScore,
      grade
    };
    setStudentsList(prev => [newStudent, ...prev]);
    setNewStudentName('');
    addCapstoneLog(`➕ Added student "${newStudentName}"`);
    // Re-focus input using ref!
    if (capstoneInputRef.current) capstoneInputRef.current.focus();
  };

  /* ──────────────────────────────────────────────────────────────────────────
     7. QUIZ QUESTIONS
  ────────────────────────────────────────────────────────────────────────── */
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const questions = [
    {
      k: 'q1',
      q: 'Which of the following describes the behavior of `useRef` when its `.current` property changes?',
      opts: [
        'It triggers an immediate component re-render like useState',
        'It updates the value synchronously without triggering a component re-render',
        'It clears the browser localStorage cache',
        'It forces all child components to unmount'
      ],
      ans: 1,
      exp: '`useRef` returns a mutable object whose `.current` property can be modified at any time without causing React to re-render the component.'
    },
    {
      k: 'q2',
      q: 'What is the primary purpose of the `useMemo` hook?',
      opts: [
        'To hold a direct pointer to an HTML input or video tag',
        'To memoize (cache) the result of an expensive calculation and only recalculate when specific dependencies change',
        'To automatically debounce asynchronous fetch requests',
        'To replace Redux in global state management'
      ],
      ans: 1,
      exp: '`useMemo` caches the return value of a computation. On re-renders, if the dependency array has not changed, it returns the cached result without running the expensive function again.'
    },
    {
      k: 'q3',
      q: 'How does `useCallback(fn, deps)` relate to `useMemo`?',
      opts: [
        'They are unrelated and do completely opposite things',
        '`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)` — it memoizes the function definition itself rather than its result',
        '`useCallback` can only be used inside custom hooks, whereas `useMemo` cannot',
        '`useCallback` runs synchronously before the DOM updates'
      ],
      ans: 1,
      exp: '`useCallback(fn, deps)` is shorthand for `useMemo(() => fn, deps)`. It ensures that the function reference remains identical between renders unless its dependencies change.'
    },
    {
      k: 'q4',
      q: 'Why does passing an inline callback `<Child onClick={() => doSomething()} />` to a `React.memo(Child)` component cause it to re-render every time?',
      opts: [
        'Because React.memo is broken in modern React',
        'Because in JavaScript, a new function object is created in memory on every render (`() => {} !== () => {}`), so the `onClick` prop looks changed to shallow comparison',
        'Because functions cannot be passed as props in React',
        'Because inline arrows are converted to strings'
      ],
      ans: 1,
      exp: 'Every time a parent component renders, any inline function is re-created with a brand new memory reference. `React.memo` sees the new reference and re-renders the child. `useCallback` fixes this.'
    },
    {
      k: 'q5',
      q: 'What are the two official Rules of Hooks in React?',
      opts: [
        '1. Only call hooks inside loops. 2. Never use useState and useEffect together.',
        '1. Only call hooks at the top level (not inside loops, conditions, or nested functions). 2. Only call hooks from React function components or Custom Hooks.',
        '1. Hooks must always be prefixed with "get". 2. Hooks only work on desktop browsers.',
        '1. All hooks must return an array. 2. Never pass dependencies to useEffect.'
      ],
      ans: 1,
      exp: 'React relies on the call order of hooks to maintain state between renders. Calling hooks conditionally or inside loops breaks the call order.'
    },
    {
      k: 'q6',
      q: 'What is a Custom Hook in React?',
      opts: [
        'A hook built into the browser JavaScript engine',
        'A JavaScript function whose name starts with "use" that can call other built-in React hooks to encapsulate reusable stateful logic',
        'A special CSS class for styling React components',
        'A hook that can only be written in TypeScript'
      ],
      ans: 1,
      exp: 'A Custom Hook is a reusable JavaScript function starting with "use" (e.g. `useFetch`, `useLocalStorage`) that combines built-in hooks to share logic between multiple components.'
    }
  ];

  const quizScore = questions.filter(q => quizAnswers[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ──────────────────────────────────────────────────────────────────
          TAB 1: useRef HOOK
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 12" title="The useRef Hook: DOM Access & Persistent State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Layers size={28} color="#c7d2fe" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Beginner's Guide to useRef</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                Think of <strong><code>useRef</code></strong> as a "secret pocket" attached to your component. It holds a mutable value in its <code>.current</code> property that <strong>persists across renders without triggering a re-render when changed</strong>. It is also your primary tool for directly accessing DOM elements (focusing inputs, measuring heights, controlling video/audio).
              </p>
            </div>

            {/* Beginner Step-by-Step Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🛠️ Step-by-Step Guide to Using useRef
            </h3>

            <StepCard
              stepNumber="1"
              title="Declare a Ref using useRef()"
              desc="Import useRef from 'react' and initialize it with an initial value (usually null for DOM elements or 0 for counters)."
            >
              <CodeBlock title="Step 1: Declaration" code={`import { useRef } from "react";

function MyComponent() {
  // 1. For DOM nodes: initialize with null
  const inputRef = useRef(null);

  // 2. For persistent values: initialize with initial data
  const renderCountRef = useRef(0);
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Attach the Ref to a JSX Element (for DOM Access)"
              desc="Pass your ref variable to the `ref` attribute of any HTML element."
            >
              <CodeBlock title="Step 2: Attaching to DOM" code={`function SearchBar() {
  const inputRef = useRef(null);

  return (
    <div>
      {/* React will assign the actual DOM node to inputRef.current */}
      <input ref={inputRef} type="text" placeholder="Search courses..." />
    </div>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="Access & Manipulate the DOM via `.current`"
              desc="Inside event handlers or useEffect, interact with the element using native DOM methods (focus, select, scrollIntoView)."
            >
              <CodeBlock title="Step 3: Triggering DOM actions" code={`function SearchBar() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // Focus the input element directly
    inputRef.current.focus();
  };

  const handleClear = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="4"
              title="Store Mutable Values (Timer IDs, Previous State, Render Counters)"
              desc="Update `.current` whenever you want to store state without forcing the component to redraw."
            >
              <CodeBlock title="Step 4: Storing Timer IDs without Re-renders" code={`function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  // Store the timer ID so we can clear it later without re-rendering
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <h2>Elapsed: {seconds}s</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}`} />
            </StepCard>

            {/* Comparison Table: useRef vs useState vs Regular JS Variable */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>
              ⚖️ Side-by-Side Comparison: useRef vs useState vs Variable
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Feature</th>
                    <th style={{ padding: '10px 14px', color: '#6366f1' }}>useRef</th>
                    <th style={{ padding: '10px 14px', color: '#10b981' }}>useState</th>
                    <th style={{ padding: '10px 14px', color: '#ef4444' }}>Plain let / const Variable</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Triggers Re-render on change?', ref: '❌ No (Silent update)', state: '✅ Yes (Updates UI)', var: '❌ No' },
                    { f: 'Persists value across renders?', ref: '✅ Yes (Stored in ref.current)', state: '✅ Yes (Stored in state)', var: '❌ No (Resets to initial on every render!)' },
                    { f: 'Mutable or Immutable?', ref: 'Mutable (ref.current = x)', state: 'Immutable (use setState)', var: 'Mutable (let x = y)' },
                    { f: 'Primary Use Case', ref: 'DOM focus, timer IDs, prev state', ref2: true, state: 'UI-driven data, inputs, lists', var: 'Temporary calculations inside render' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fcfcfd' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1e293b' }}>{row.f}</td>
                      <td style={{ padding: '10px 14px', color: '#4338ca', fontWeight: 600 }}>{row.ref}</td>
                      <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: 600 }}>{row.state}</td>
                      <td style={{ padding: '10px 14px', color: '#991b1b' }}>{row.var}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive useRef Live Lab */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#6366f1" /> Interactive useRef Live Lab
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem' }}>
                Test both DOM targeting and silent timer persistence live.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                
                {/* DOM Focus Controls */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase' }}>1. DOM Node Focus Controller</span>
                  <div style={{ display: 'flex', gap: 8, margin: '8px 0 12px' }}>
                    <input
                      ref={domInputRef}
                      type="text"
                      placeholder="Target input element..."
                      value={dummyText}
                      onChange={(e) => setDummyText(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', border: '2px solid #cbd5e1', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleFocusDomInput} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      domInputRef.current.focus()
                    </button>
                    <button onClick={handleSelectDomText} style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      Select All Text
                    </button>
                  </div>

                  {/* Timer Control with Ref */}
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>2. Persistent Interval Timer (using timerRef)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
                        {refTimerSeconds}s
                      </div>
                      <span style={{ fontSize: '0.75rem', background: isTimerRunning ? '#dcfce7' : '#fee2e2', color: isTimerRunning ? '#166534' : '#991b1b', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                        {isTimerRunning ? 'Running' : 'Stopped'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={handleStartTimer} disabled={isTimerRunning} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                        Start
                      </button>
                      <button onClick={handleStopTimer} disabled={!isTimerRunning} style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                        Pause
                      </button>
                      <button onClick={handleResetTimer} style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Inspector Panel */}
                <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.25rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>Component Ref & State Tracker:</span>
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: 10, fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <div>renderCountRef.current: <span style={{ color: '#86efac', fontWeight: 800 }}>{renderCounterRef.current}</span></div>
                    <div>stateCounter: <span style={{ color: '#38bdf8', fontWeight: 800 }}>{stateCounterVal}</span></div>
                    <div>timerRef.current: <span style={{ color: '#fbbf24' }}>{intervalTimerRef.current ? `IntervalID(${intervalTimerRef.current})` : 'null'}</span></div>
                  </div>
                  <button
                    onClick={() => setStateCounterVal(c => c + 1)}
                    style={{ marginTop: 12, background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Trigger State Re-render (+1)
                  </button>
                </div>

              </div>
            </div>

            {/* Complete Beginner Standalone Code */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                ⭐ Complete Standalone Beginner Component (Copy & Paste Ready)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
                Here is a full, self-contained React component demonstrating both <strong>DOM auto-focusing</strong> and <strong>render tracking / interval storage</strong> using <code>useRef</code>.
              </p>
              <CodeBlock title="App.jsx (Complete useRef Beginner Demo)" code={`import React, { useState, useRef, useEffect } from "react";

export default function UseRefFullDemo() {
  const [inputText, setInputText] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);

  // 1. Ref to directly point to the HTML input element
  const inputElementRef = useRef(null);

  // 2. Ref to store the setInterval ID across renders
  const timerIdRef = useRef(null);

  // 3. Ref to track how many times this component has re-rendered
  const totalRendersRef = useRef(1);

  // Auto-focus the input box when the page first loads
  useEffect(() => {
    if (inputElementRef.current) {
      inputElementRef.current.focus();
    }
  }, []);

  // Update render count without causing a new render
  useEffect(() => {
    totalRendersRef.current += 1;
  });

  const handleManualFocus = () => {
    if (inputElementRef.current) {
      inputElementRef.current.focus();
      inputElementRef.current.select(); // Select existing text
    }
  };

  const startTimer = () => {
    if (timerIdRef.current) return; // Already running
    timerIdRef.current = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  return (
    <div style={{ padding: 24, maxWidth: 500, fontFamily: "sans-serif" }}>
      <h2>useRef Beginner Masterclass</h2>
      <p>Component Renders so far: <b>{totalRendersRef.current}</b></p>

      {/* DOM Focus Section */}
      <div style={{ marginBottom: 16 }}>
        <input
          ref={inputElementRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="I will be focused on load!"
          style={{ padding: 8, width: "70%", marginRight: 8 }}
        />
        <button onClick={handleManualFocus} style={{ padding: 8 }}>
          Focus & Select
        </button>
      </div>

      {/* Timer Section */}
      <div style={{ background: "#f1f5f9", padding: 16, borderRadius: 8 }}>
        <h3>Timer: {timerSeconds}s</h3>
        <button onClick={startTimer} style={{ marginRight: 8 }}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
}`} />
            </div>

            {/* Common Beginner Mistakes */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#92400e', fontWeight: 800 }}>⚠️ Common useRef Beginner Gotchas</h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.86rem', color: '#78350f', lineHeight: 1.7 }}>
                <li><strong>Don't read/write <code>ref.current</code> during rendering:</strong> Modifying <code>ref.current</code> directly in the JSX render body leads to unpredictable UI bugs. Always mutate refs inside event handlers or <code>useEffect</code>.</li>
                <li><strong>Don't use <code>useRef</code> when the UI needs to update immediately:</strong> If you want the text on screen to change when a variable changes, use <code>useState</code> instead.</li>
              </ul>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: useMemo Cache (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 2: useMemo HOOK (EXPENSIVE VALUE MEMOIZATION)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 12" title="The useMemo Hook: Caching Expensive Computations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg,#059669,#0d9488)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Cpu size={28} color="#a7f3d0" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Smart Value Memoization</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                In React, every time a component's state updates, the entire function runs from top to bottom. If you have an expensive computation (sorting 10,000 items, calculating statistics, or complex transformations), running it on every keystroke causes perceptible UI lag. <strong><code>useMemo</code> caches (memoizes) the return value</strong> and only recalculates when its specified dependencies change.
              </p>
            </div>

            {/* Step-by-Step Implementation Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              📋 Step-by-Step useMemo Implementation Guide
            </h3>

            <StepCard
              stepNumber="1"
              title="Identify the Expensive Calculation"
              desc="Locate complex data filtering, sorting, or mathematical algorithms inside your component body."
            >
              <CodeBlock title="Unoptimized (Slow) Code" code={`function ProductList({ products, filterText }) {
  // ⚠️ Runs on EVERY re-render, even when unrelated states (like dark mode) toggle!
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return <ul>{filteredProducts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Wrap in useMemo with a Dependency Array"
              desc="Pass a calculation function as the 1st argument, and an array of dependencies as the 2nd argument."
            >
              <CodeBlock title="Optimized with useMemo" code={`import { useMemo } from "react";

function ProductList({ products, filterText }) {
  // ✅ Only recalculates when 'products' array or 'filterText' string changes!
  const filteredProducts = useMemo(() => {
    console.log("Filtering products list...");
    return products.filter(p => 
      p.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]); // <-- Dependencies

  return <ul>{filteredProducts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="When NOT to use useMemo"
              desc="useMemo has a memory and comparison cost. Avoid wrapping trivial calculations (e.g. 2 + 2 or simple string concatenations)."
            >
              <CodeBlock title="Avoid Overusing useMemo" code={`// ❌ Bad: Trivial operations don't need useMemo (overhead is worse than the calc!)
const fullName = useMemo(() => firstName + " " + lastName, [firstName, lastName]);

// ✅ Good: Simple calculations should be plain variables
const fullName = firstName + " " + lastName;`} />
            </StepCard>

            {/* Interactive Benchmark Simulator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    ⚡ Real-Time useMemo Benchmark Simulator
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Type into the unrelated input below to observe how unmemoized calculations freeze UI typing speed</span>
                </div>
                <button
                  onClick={() => setIsMemoActive(v => !v)}
                  style={{
                    background: isMemoActive ? '#10b981' : '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  {isMemoActive ? '✅ useMemo: ENABLED (Fast)' : '❌ useMemo: DISABLED (Laggy)'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                      Calculation Parameter N (1-30):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={memoNumber}
                      onChange={(e) => setMemoNumber(Math.min(30, Math.max(1, +e.target.value)))}
                      style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                      Unrelated Typing Input (Type rapidly to test lag):
                    </label>
                    <input
                      type="text"
                      placeholder="Type letters rapidly..."
                      value={unrelatedInput}
                      onChange={(e) => setUnrelatedInput(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', border: '2px solid #6366f1', borderRadius: 6, fontSize: '0.85rem', outline: 'none' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: 4 }}>
                      {isMemoActive
                        ? '🚀 Fluid typing! useMemo returned the cached result with 0ms recalculation.'
                        : '🐢 Laggy typing! The heavy loop executes on every single keystroke.'}
                    </span>
                  </div>
                </div>

                <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.25rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Benchmark Telemetry:</span>
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: 10, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    <div>Calculated Hash: <span style={{ color: '#fbbf24', fontWeight: 800 }}>{currentFactorialOutput}</span></div>
                    <div>Execution Cost: <span style={{ color: isMemoActive ? '#86efac' : '#f87171', fontWeight: 800 }}>{isMemoActive ? '0.00ms (Cached)' : `${lastCalcDuration}ms (Lag)`}</span></div>
                    <div>Mode: <span style={{ color: isMemoActive ? '#10b981' : '#ef4444' }}>{isMemoActive ? 'Memoized' : 'Raw Recomputation'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Beginner Standalone Code */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                ⭐ Complete Standalone Beginner Component (Copy & Paste Ready)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
                Here is a full component showing how to filter a large dataset with <code>useMemo</code> so that typing in a search bar or toggling dark mode is fast and responsive.
              </p>
              <CodeBlock title="ProductFilterDemo.jsx (Complete useMemo Example)" code={`import React, { useState, useMemo } from "react";

// Initial dataset of items
const ALL_ITEMS = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: \`Course #\${i + 1}\`,
  category: i % 2 === 0 ? "Frontend" : "Backend",
  price: Math.floor(Math.random() * 200) + 20,
}));

export default function ProductFilterDemo() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ useMemo: ONLY re-runs the expensive filter when "query" changes.
  // When "isDarkMode" toggles, this computation is SKIPPED (0ms cost)!
  const filteredList = useMemo(() => {
    console.log("Filtering 2,000 items with query:", query);
    return ALL_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]); // <-- Only depend on query

  return (
    <div style={{
      padding: 24,
      background: isDarkMode ? "#0f172a" : "#f8fafc",
      color: isDarkMode ? "#ffffff" : "#0f172a",
      borderRadius: 12
    }}>
      <h2>useMemo Filter Demo</h2>

      <button onClick={() => setIsDarkMode(prev => !prev)} style={{ marginBottom: 12 }}>
        Toggle Theme ({isDarkMode ? "Dark" : "Light"})
      </button>

      <div>
        <input
          type="text"
          placeholder="Search 2,000 courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px 12px", width: "100%", marginBottom: 12 }}
        />
      </div>

      <p>Showing <b>{filteredList.length}</b> results</p>
      <ul style={{ maxHeight: 180, overflowY: "auto" }}>
        {filteredList.slice(0, 30).map((item) => (
          <li key={item.id}>{item.name} - \${item.price} ({item.category})</li>
        ))}
      </ul>
    </div>
  );
}`} />
            </div>

            {/* When NOT to use useMemo */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#166534', fontWeight: 800 }}>💡 Golden Rule: When to Use useMemo vs Plain Variables</h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.86rem', color: '#14532d', lineHeight: 1.7 }}>
                <li><strong>Use it for:</strong> Filtering/sorting arrays with hundreds of items, complex regex parsing, or heavy mathematical formulas.</li>
                <li><strong>Don't use it for:</strong> Simple operations like <code>a + b</code>, <code>firstName + ' ' + lastName</code>, or small array lengths under 50 items (the memory overhead of useMemo is slower than the operation itself!).</li>
              </ul>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: useCallback Actions (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 3: useCallback HOOK (FUNCTION MEMOIZATION)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 12" title="The useCallback Hook: Memoizing Callback Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#2563eb)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Activity size={28} color="#bae6fd" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Function Reference Stability</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                In JavaScript, functions are objects: <code>{`(() => {}) !== (() => {})`}</code>. Every time a parent component renders, any function declared inside it is recreated with a brand new memory reference. When you pass that function as a prop to a <strong><code>React.memo</code></strong> child component, the child thinks the prop changed and re-renders unnecessarily. <strong><code>useCallback</code> solves this by locking the function reference in memory</strong>.
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🧠 Step-by-Step useCallback Workflow
            </h3>

            <StepCard
              stepNumber="1"
              title="Understand the Problem with Inline Callbacks"
              desc="When passing inline callbacks to child components wrapped in React.memo, the child will still re-render because props fail shallow equality check."
            >
              <CodeBlock title="Parent Re-creates Functions" code={`// Child wrapped in React.memo
const ChildButton = React.memo(({ onClick, label }) => {
  console.log("ChildButton Rendered!");
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // ⚠️ This function gets a NEW memory address every time count updates!
  // This causes ChildButton to re-render even though its label didn't change.
  const handleClick = () => {
    console.log("Button clicked");
  };

  return <ChildButton onClick={handleClick} label="Submit" />;
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Wrap the Callback in useCallback()"
              desc="useCallback preserves the exact same function pointer between renders."
            >
              <CodeBlock title="Preserving Function Reference with useCallback" code={`import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Function reference stays identical across renders!
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // <-- Empty array = function pointer never changes

  return <ChildButton onClick={handleClick} label="Submit" />;
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="useCallback vs useMemo Formula"
              desc="Remember: useCallback memoizes the function itself, while useMemo memoizes the returned result."
            >
              <CodeBlock title="The Golden Rule of Equivalence" code={`// These two lines are 100% equivalent under the hood:
const handleSave = useCallback(fn, [deps]);
const handleSave = useMemo(() => fn, [deps]);`} />
            </StepCard>

            {/* Interactive Child Re-render Visualizer */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    🔬 Child Component Re-render Lab
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Click parent counter to see the difference between regular and memoized children</span>
                </div>
                <button
                  onClick={() => setParentTick(c => c + 1)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Increment Parent State (Tick #{parentTick})
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    Without useCallback (Standard)
                  </span>
                  <RegularChild title="Un-memoized Child" count={parentTick} />
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    * This child re-renders on every parent tick because its callback prop is recreated in memory.
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    With useCallback + React.memo
                  </span>
                  <OptimizedChild title="Memoized Child" onClick={handleOptimizedAction} />
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    * This child stays frozen! Its props have identical memory pointers, avoiding waste repaints. Click count: {childClicks}.
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Beginner Standalone Code */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                ⭐ Complete Standalone Beginner Component (Copy & Paste Ready)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
                Here is a complete parent-child component demonstrating how <code>React.memo</code> and <code>useCallback</code> work together to prevent unnecessary child re-renders.
              </p>
              <CodeBlock title="TodoListWithCallback.jsx (Complete useCallback Example)" code={`import React, { useState, useCallback } from "react";

// 1. Memoized Child Component (React.memo)
const TodoRow = React.memo(({ todo, onDelete }) => {
  console.log(\`[Render] TodoRow rendered: "\${todo.text}"\`);
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 12px",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      marginBottom: 6,
      borderRadius: 6
    }}>
      <span>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ background: "#fee2e2", color: "#b91c1c", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
      >
        Delete
      </button>
    </div>
  );
});

// 2. Parent Component
export default function TodoListWithCallback() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React Fundamentals" },
    { id: 2, text: "Master Advanced Hooks" },
    { id: 3, text: "Deploy to Vercel" }
  ]);
  const [counter, setCounter] = useState(0);

  // ✅ useCallback: Keeps this function reference fixed in memory!
  // Notice we use functional state update (prev => ...) so deps array can be []
  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  }, []); // <-- Empty array: Never re-creates in memory!

  return (
    <div style={{ padding: 24, maxWidth: 500, fontFamily: "sans-serif" }}>
      <h2>useCallback & React.memo Demo</h2>

      {/* Clicking this button re-renders the parent, but NOT the TodoRow children! */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setCounter((c) => c + 1)} style={{ padding: "6px 12px" }}>
          Increment Parent Counter: {counter}
        </button>
        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "4px 0 0" }}>
          (Open browser console: Notice Todo items DO NOT re-render when counter increments!)
        </p>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}`} />
            </div>

            {/* Why useCallback Alone Is Not Enough */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#1d4ed8', fontWeight: 800 }}>💡 Crucial Takeaway: useCallback + React.memo</h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#1e40af', lineHeight: 1.7 }}>
                Wrapping a function in <code>useCallback</code> by itself does <strong>not</strong> stop a child component from re-rendering. You <strong>must also wrap the child component in <code>React.memo(Child)</code></strong>. Together, <code>React.memo</code> checks if props changed, and <code>useCallback</code> ensures the function prop reference didn't change!
              </p>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Custom Hooks (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 4: CUSTOM HOOKS (REUSABLE LOGIC)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 12" title="Custom Hooks: Extracting Reusable Component Logic">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg,#7c3aed,#9333ea)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Sparkles size={28} color="#e9d5ff" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>The Power of Custom Hooks</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                A <strong>Custom Hook</strong> is a regular JavaScript function whose name starts with <strong><code>"use"</code></strong> that calls other React hooks (like <code>useState</code>, <code>useEffect</code>). It lets you extract component logic (API fetching, localStorage synchronization, form state, media queries) into clean, shareable, testable modules.
              </p>
            </div>

            {/* 3 Real-World Custom Hook Examples */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              📦 3 Essential Real-World Custom Hooks
            </h3>

            <StepCard
              stepNumber="1"
              title="useLocalStorage — Persistent State Hook"
              desc="Works just like useState, but automatically synchronizes every state update to browser localStorage."
            >
              <CodeBlock title="src/hooks/useLocalStorage.js" code={`import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Read existing value from localStorage on mount
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 2. Automatically save to localStorage whenever value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// ── Usage in any component ──
function Settings() {
  const [theme, setTheme] = useLocalStorage("app_theme", "dark");
  return <button onClick={() => setTheme("light")}>{theme}</button>;
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="useDebounce — Search & Input Debouncing Hook"
              desc="Delays updating a state value until the user stops typing for N milliseconds, saving hundreds of unnecessary API requests."
            >
              <CodeBlock title="src/hooks/useDebounce.js" code={`import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer if value changes before delay expires
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="useFetch — Declarative API Data Fetcher"
              desc="Encapsulates data, loading spinner flags, and error handling into a single line of code."
            >
              <CodeBlock title="src/hooks/useFetch.js" code={`import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`} />
            </StepCard>

            {/* Interactive Custom Hook Playground */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                🪝 Live Custom Hook Playground: useDebounce & useLocalStorage
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem' }}>
                Type in the search box to see <code>useDebounce</code> buffer keystrokes and reduce API call volume.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                
                {/* useDebounce Live Tester */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>1. useDebounce Demo</span>
                  <input
                    type="text"
                    placeholder="Type search terms quickly..."
                    value={rawSearchQuery}
                    onChange={(e) => setRawSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', margin: '8px 0', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                    <div>Raw Input Value: <code>"{rawSearchQuery}"</code></div>
                    <div>Debounced Value (400ms): <strong style={{ color: '#7c3aed' }}>"{debouncedQuery}"</strong></div>
                    <div>Simulated API Calls Fired: <strong style={{ color: '#16a34a' }}>{apiCallCount}</strong></div>
                  </div>
                </div>

                {/* useLocalStorage Live Tester */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>2. useLocalStorage Demo</span>
                  <input
                    type="text"
                    value={storedNotes}
                    onChange={(e) => setStoredNotes(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', margin: '8px 0', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                    <div>Storage Key: <code>"{hookStorageKey}"</code></div>
                    <div>Value in LocalStorage: <strong style={{ color: '#0284c7' }}>"{storedNotes}"</strong></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Complete Beginner Standalone Code */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                ⭐ Complete Standalone Beginner Component: Multi-Custom-Hooks App
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
                Here is a full application file showing how <code>useToggle</code>, <code>useLocalStorage</code>, and <code>useFetch</code> work together inside a real component.
              </p>
              <CodeBlock title="AppWithCustomHooks.jsx (Complete Custom Hooks Example)" code={`import React, { useState, useEffect, useCallback } from "react";

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

// ── CUSTOM HOOK 3: useFetch ──
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// ── MAIN COMPONENT USING ALL 3 HOOKS ──
export default function AppWithCustomHooks() {
  const [isOpen, toggleOpen] = useToggle(false);
  const [username, setUsername] = useLocalStorage("app_student_name", "Alex");
  const { data: userPost, loading } = useFetch("https://jsonplaceholder.typicode.com/posts/1");

  return (
    <div style={{ padding: 24, maxWidth: 500, fontFamily: "sans-serif" }}>
      <h2>Custom Hooks Showcase</h2>

      {/* useLocalStorage Test */}
      <div style={{ marginBottom: 16 }}>
        <label>Saved Student Name (localStorage): </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 6, marginLeft: 8 }}
        />
      </div>

      {/* useToggle Test */}
      <button onClick={toggleOpen} style={{ padding: "8px 16px", cursor: "pointer" }}>
        {isOpen ? "Hide API Details" : "Show API Details (useToggle)"}
      </button>

      {/* useFetch Test */}
      {isOpen && (
        <div style={{ marginTop: 12, padding: 16, background: "#f1f5f9", borderRadius: 8 }}>
          <h4>Latest Course Update for {username}:</h4>
          {loading ? <p>Loading API data...</p> : <p><b>Title:</b> {userPost?.title}</p>}
        </div>
      )}
    </div>
  );
}`} />
            </div>

            {/* Custom Hook Rules */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#5b21b6', fontWeight: 800 }}>✨ The 2 Golden Rules for Writing Custom Hooks</h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.86rem', color: '#4c1d95', lineHeight: 1.7 }}>
                <li><strong>Always start the function name with <code>use</code>:</strong> React linting tools rely on the <code>use</code> prefix (e.g. <code>useAuth</code>, <code>useWindowSize</code>) to enforce hook rules.</li>
                <li><strong>Do two custom hook calls share state?</strong> No! Each component calling a custom hook gets its own isolated, independent instance of state.</li>
              </ul>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Hook Decision Matrix (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 5: HOOK CHEAT SHEET & DECISION MATRIX
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 12" title="React Hooks Master Cheat Sheet & Decision Matrix">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <FileText size={28} color="#94a3b8" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Hooks Decision Matrix</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                Not sure which hook to use? Use this quick reference guide and interactive decision tool to pick the exact right tool for the job every time.
              </p>
            </div>

            {/* Master Summary Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Hook</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Return Value</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Causes Re-render?</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Primary Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { hook: 'useState(init)', ret: '[state, setState]', render: '✅ Yes', use: 'Interactive values (inputs, toggles, data arrays)', color: '#6366f1' },
                    { hook: 'useEffect(fn, deps)', ret: 'void (or cleanup fn)', render: '❌ No (runs after)', use: 'Data fetching, subscriptions, DOM mutations', color: '#10b981' },
                    { hook: 'useRef(init)', ret: '{ current: value }', render: '❌ Never', use: 'DOM references, timer IDs, previous values', color: '#8b5cf6' },
                    { hook: 'useMemo(fn, deps)', ret: 'Memoized value', render: '❌ No', use: 'Expensive array filters, complex math outputs', color: '#f59e0b' },
                    { hook: 'useCallback(fn, deps)', ret: 'Memoized function', render: '❌ No', use: 'Passing stable handlers to React.memo children', color: '#0ea5e9' },
                    { hook: 'useContext(Context)', ret: 'Current Context value', render: '✅ Yes (if context updates)', use: 'Global theme, user authentication state', color: '#ec4899' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fcfcfd' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 800, fontFamily: 'monospace', color: row.color }}>{row.hook}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#475569' }}>{row.ret}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>{row.render}</td>
                      <td style={{ padding: '10px 14px', color: '#334155' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive "Which Hook Should I Use?" Recommender Widget */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <HelpCircle size={18} color="#6366f1" /> Interactive Hook Recommendation Tool
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>
                Select your engineering scenario below to see the recommended hook and code pattern:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: '1.25rem' }}>
                {[
                  { id: 'dom', label: '1. Focus Input / DOM Access' },
                  { id: 'calc', label: '2. Filter Heavy Dataset' },
                  { id: 'callback', label: '3. Pass Handler to Memo Child' },
                  { id: 'custom', label: '4. Reusable Fetch / Sync Logic' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedScenario(item.id)}
                    style={{
                      background: selectedScenario === item.id ? '#6366f1' : 'white',
                      color: selectedScenario === item.id ? 'white' : '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Recommendation Card */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>
                    Recommended: <span style={{ color: hookRecommendations[selectedScenario].color }}>{hookRecommendations[selectedScenario].hook}</span>
                  </h4>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: 4 }}>
                    {hookRecommendations[selectedScenario].badge}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: '#475569' }}>
                  {hookRecommendations[selectedScenario].desc}
                </p>
                <CodeBlock title="Recommended Boilerplate" code={hookRecommendations[selectedScenario].code} />
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Capstone Task (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 6: CAPSTONE TASK: OPTIMIZED LIST & FORM FOCUS
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Capstone Project • Day 12" title="Form Focus & High-Performance Student Portal">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Project Banner */}
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.75rem', marginBottom: '2rem', color: 'white' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800 }}>🎓 Capstone Project: High-Performance Student Portal</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.95 }}>
                A production-ready student roster combining <strong>useRef</strong> (auto-focus and manual DOM control), <strong>useMemo</strong> (multi-parameter filtering and sorting), and <strong>useCallback</strong> (memoized child action handlers with zero waste renders).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Left Column: Form & Student List */}
              <div>
                {/* Form to Add Student */}
                <form onSubmit={handleAddStudent} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <h5 style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>Add Student Record</h5>
                    <button type="button" onClick={focusStudentInput} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', cursor: 'pointer' }}>
                      Focus Input (useRef)
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                      ref={capstoneInputRef}
                      type="text"
                      placeholder="Student Full Name..."
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', outline: 'none' }}
                    />
                    <select
                      value={newStudentCourse}
                      onChange={(e) => setNewStudentCourse(e.target.value)}
                      style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.85rem', outline: 'none', background: 'white' }}
                    >
                      <option>React 19</option>
                      <option>Node.js</option>
                      <option>SQL Databases</option>
                      <option>Fullstack Dev</option>
                    </select>
                    <button type="submit" style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                      Add
                    </button>
                  </div>
                </form>

                {/* Filter and Sort Toolbar */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Search students (useMemo)..."
                      value={capstoneSearch}
                      onChange={(e) => setCapstoneSearch(e.target.value)}
                      style={{ padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', outline: 'none' }}
                    />
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block' }}>Min Score: {minScoreFilter}</label>
                      <input type="range" min={0} max={100} value={minScoreFilter} onChange={(e) => setMinScoreFilter(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                      style={{ padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', outline: 'none', background: 'white' }}
                    >
                      <option value="score">Sort by Score</option>
                      <option value="name">Sort by Name</option>
                    </select>
                  </div>
                </div>

                {/* Student Records List */}
                <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Active Student Records ({filteredAndSortedStudents.length} matches)</strong>
                    <span style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 800 }}>Optimized with React.memo</span>
                  </div>
                  <div style={{ padding: '8px' }}>
                    {filteredAndSortedStudents.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>No matching students found</div>
                    ) : (
                      filteredAndSortedStudents.map(student => (
                        <MemoizedStudentRow
                          key={student.id}
                          student={student}
                          onDelete={handleDeleteStudent}
                          onGradeChange={handleGradeChange}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Performance Analytics & Action Log */}
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.25rem', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Optimization Activity Log:
                </span>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 380, marginBottom: 12 }}>
                  {capstoneLog.length === 0 ? (
                    <span style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>Interact with the controls on the left to see hook triggers...</span>
                  ) : (
                    capstoneLog.map((log, i) => (
                      <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: log.includes('useRef') ? '#c4b5fd' : log.includes('useMemo') ? '#fde047' : '#86efac', padding: '3px 0', borderBottom: '1px solid #1e293b' }}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
                <button
                  onClick={() => setStudentsList([
                    { id: 1, name: 'Alice Johnson', course: 'React 19', score: 95, grade: 'A' },
                    { id: 2, name: 'Bob Smith', course: 'Node.js', score: 82, grade: 'B' },
                    { id: 3, name: 'Carol White', course: 'React 19', score: 98, grade: 'A' },
                    { id: 4, name: 'David Miller', course: 'SQL Databases', score: 64, grade: 'C' }
                  ])}
                  style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset Student Dataset
                </button>
              </div>

            </div>

            {/* Complete Beginner Standalone Code for Capstone */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                ⭐ Complete Standalone Source Code for Capstone Student Portal
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
                Copy and paste this entire standalone component into your own project to run the complete High-Performance Student Portal combining <code>useRef</code>, <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code>.
              </p>
              <CodeBlock title="StudentPortalCapstone.jsx (Complete Capstone Code)" code={`import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

// 1. Memoized Student Row Component (React.memo)
const StudentRow = React.memo(({ student, onDelete, onGradeChange }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 14px",
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: 8,
      marginBottom: 8
    }}>
      <div>
        <strong>{student.name}</strong>
        <span style={{ display: "block", fontSize: "0.8rem", color: "#64748b" }}>
          Course: {student.course} | Score: <b style={{ color: "#6366f1" }}>{student.score}</b> (Grade: {student.grade})
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => onGradeChange(student.id, Math.min(100, student.score + 5))}
          style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}
        >
          +5 Pts
        </button>
        <button
          onClick={() => onDelete(student.id)}
          style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

// 2. Main Capstone Component
export default function StudentPortalCapstone() {
  const nameInputRef = useRef(null);
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", course: "React 19", score: 95, grade: "A" },
    { id: 2, name: "Bob Smith", course: "Node.js", score: 82, grade: "B" },
    { id: 3, name: "Carol White", course: "React 19", score: 98, grade: "A" },
    { id: 4, name: "David Miller", course: "SQL Databases", score: 64, grade: "C" }
  ]);
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(50);
  const [newName, setNewName] = useState("");
  const [newCourse, setNewCourse] = useState("React 19");

  // useRef 1: Auto-focus on first render
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  // useMemo: Filter and Sort dataset cleanly
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) && s.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }, [students, search, minScore]);

  // useCallback: Stable handler for row deletion
  const handleDelete = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // useCallback: Stable handler for grade updates
  const handleGradeChange = useCallback((id, newScore) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const grade = newScore >= 90 ? "A" : newScore >= 80 ? "B" : newScore >= 60 ? "C" : "D";
          return { ...s, score: newScore, grade };
        }
        return s;
      })
    );
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const score = Math.floor(Math.random() * 25) + 75;
    const grade = score >= 90 ? "A" : "B";
    setStudents((prev) => [{ id: Date.now(), name: newName, course: newCourse, score, grade }, ...prev]);
    setNewName("");
    if (nameInputRef.current) nameInputRef.current.focus(); // Refocus input
  };

  return (
    <div style={{ padding: 24, maxWidth: 650, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>🎓 Student Management Portal</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Student Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
        <select
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" }}
        >
          <option>React 19</option>
          <option>Node.js</option>
          <option>SQL Databases</option>
        </select>
        <button type="submit" style={{ background: "#6366f1", color: "white", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 700 }}>
          Add Record
        </button>
      </form>

      {/* Filter Toolbar */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name (useMemo)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
        <label style={{ fontSize: "0.85rem" }}>
          Min Score: {minScore}
          <input type="range" min={0} max={100} value={minScore} onChange={(e) => setMinScore(+e.target.value)} />
        </label>
      </div>

      {/* Student List */}
      <div>
        {filteredStudents.map((student) => (
          <StudentRow key={student.id} student={student} onDelete={handleDelete} onGradeChange={handleGradeChange} />
        ))}
      </div>
    </div>
  );
}`} />
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Knowledge Check Quiz (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 7: QUIZ
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 12 Quiz — Advanced React Hooks Masterclass">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.92rem', color: '#475569' }}>
              Test your mastery of <code>useRef</code>, <code>useMemo</code>, <code>useCallback</code>, custom hooks, and React performance optimization.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {questions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem', fontSize: '0.95rem' }}>
                    {qi + 1}. {item.q}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = quizAnswers[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (quizSubmitted) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) {
                        bg = '#e0f2fe'; border = '1.5px solid #0ea5e9';
                      }

                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [item.k]: oi }))}
                          style={{
                            background: bg,
                            border,
                            padding: '0.65rem 1rem',
                            borderRadius: 8,
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            textAlign: 'left',
                            fontSize: '0.88rem',
                            transition: 'all 0.15s'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#334155', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!quizSubmitted ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < questions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 160 }}
                  >
                    Submit Quiz Answers
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-outline"
                      onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                      style={{ minWidth: 150 }}
                    >
                      Retry Quiz
                    </button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: quizScore === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {quizScore} / {questions.length} ({Math.round(quizScore / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Hands-on Assignments <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 8: ASSIGNMENT
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Homework & Practice" title="Day 12 Guided Assignments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Completion Banner */}
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.75rem', marginBottom: '2rem', color: 'white' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800 }}>🎉 Day 12 Advanced Hooks Complete!</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.95 }}>
                Master React performance optimization and custom hooks by completing these 3 hands-on step-by-step challenges.
              </p>
            </div>

            {/* Task 1 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#e0e7ff', color: '#4338ca', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 1: Auto-Focus & Previous State Tracker with useRef
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Create a form component that automatically focuses the input on initial mount. Also, use a second <code>useRef</code> to store and display the <strong>previous value</strong> of the input state whenever the user types.
                  </p>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#1d4ed8', marginBottom: '0.75rem' }}>
                    💡 <strong>Step Hint:</strong> Update <code>prevRef.current = value</code> inside a <code>useEffect</code> so it captures the previous render's value!
                  </div>
                  <button
                    onClick={() => setShowSolution1(v => !v)}
                    style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '0.75rem' }}
                  >
                    {showSolution1 ? 'Hide Solution Code' : '👁️ View Full Solution Code'}
                  </button>
                  {showSolution1 && (
                    <CodeBlock
                      title="Solution 1: AutoFocus & Previous State Tracker"
                      code={`import React, { useState, useRef, useEffect } from 'react';

export default function InputWithPrevTracker() {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const prevTextRef = useRef('');

  // 1. Auto-focus on initial mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 2. Track previous text value
  useEffect(() => {
    prevTextRef.current = text;
  }, [text]);

  return (
    <div style={{ padding: 20, border: '1px solid #cbd5e1', borderRadius: 8 }}>
      <h3>AutoFocus & Previous Value Tracker</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px 12px', width: '100%', marginBottom: 12 }}
      />
      <div style={{ fontSize: '0.9rem' }}>
        <p>Current Value: <strong style={{ color: '#6366f1' }}>"{text}"</strong></p>
        <p>Previous Value: <strong style={{ color: '#64748b' }}>"{prevTextRef.current}"</strong></p>
      </div>
    </div>
  );
}`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#dcfce7', color: '#15803d', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 2: Build a Custom useToggle & useFetch Hook
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Build two reusable custom hooks in your project: (1) <code>useToggle(initialValue = false)</code> returning <code>[state, toggleFn]</code>, and (2) <code>useFetch(url)</code> returning <code>{"{ data, loading, error }"}</code>. Use them in a modal dialog component.
                  </p>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#166534', marginBottom: '0.75rem' }}>
                    💡 <strong>Step Hint:</strong> <code>const toggle = useCallback(() =&gt; setState(v =&gt; !v), []);</code> inside useToggle.
                  </div>
                  <button
                    onClick={() => setShowSolution2(v => !v)}
                    style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '0.75rem' }}
                  >
                    {showSolution2 ? 'Hide Solution Code' : '👁️ View Full Solution Code'}
                  </button>
                  {showSolution2 && (
                    <CodeBlock
                      title="Solution 2: useToggle and useFetch Custom Hooks"
                      code={`// 1. useToggle Hook
import { useState, useCallback, useEffect } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

// 2. useFetch Hook
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch resource');
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// 3. Example Component Using Both
export function ModalWithFetchDemo() {
  const [isOpen, toggleOpen] = useToggle(false);
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  return (
    <div style={{ padding: 16 }}>
      <button onClick={toggleOpen} style={{ padding: '8px 16px' }}>
        {isOpen ? 'Close Modal' : 'Open Fetch Modal'}
      </button>

      {isOpen && (
        <div style={{ marginTop: 12, padding: 16, border: '1px solid #6366f1', borderRadius: 8 }}>
          <h4>Async Data inside Modal</h4>
          {loading && <p>Loading data from API...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#fef3c7', color: '#b45309', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 3: High-Performance List with useMemo, useCallback & React.memo
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Render a list of 500 items. Implement <code>useMemo</code> to filter by price range and search term. Wrap each item component in <code>React.memo</code>, and pass a memoized <code>useCallback</code> delete handler so deleting an item does not re-render unaffected items.
                  </p>
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#92400e', marginBottom: '0.75rem' }}>
                    💡 <strong>Step Hint:</strong> Wrap row component with <code>React.memo(RowComponent)</code> and verify 0 extra renders.
                  </div>
                  <button
                    onClick={() => setShowSolution3(v => !v)}
                    style={{ background: '#d97706', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '0.75rem' }}
                  >
                    {showSolution3 ? 'Hide Solution Code' : '👁️ View Full Solution Code'}
                  </button>
                  {showSolution3 && (
                    <CodeBlock
                      title="Solution 3: 500-Item High Performance List"
                      code={`import React, { useState, useMemo, useCallback } from 'react';

// 1. Memoized Child Row
const ProductRow = React.memo(({ item, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>
      <span>{item.name} - <b>\${item.price}</b></span>
      <button onClick={() => onDelete(item.id)} style={{ color: '#dc2626', cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
});

// 2. Main List Component
export default function FastProductList() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      name: \`Product #\${i + 1}\`,
      price: Math.floor(Math.random() * 500) + 10
    }))
  );
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);

  // useMemo: Filter items cleanly without recalculating on unrelated renders
  const filtered = useMemo(() => {
    return items.filter(
      (item) => item.name.toLowerCase().includes(search.toLowerCase()) && item.price <= maxPrice
    );
  }, [items, search, maxPrice]);

  // useCallback: Stable delete reference passed to React.memo child
  const handleDelete = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>High Performance 500-Item Catalog</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />
        <label>
          Max Price: \${maxPrice}
          <input
            type="range"
            min={10}
            max={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(+e.target.value)}
          />
        </label>
      </div>

      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #cbd5e1', borderRadius: 8 }}>
        {filtered.map((item) => (
          <ProductRow key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Submission Footer */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <CheckCircle size={36} color="#10b981" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Ready for Deployment</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Commit your updated files to GitHub and deploy to Vercel to publish your interactive course platform!
              </p>
            </div>

          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
