import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Cpu, Activity, Sparkles, FileText, Sliders, CheckCircle,
  ArrowRight, ArrowLeft, RefreshCw, Eye, Check, X, BookOpen,
  HelpCircle, Trash2, Plus, CornerDownRight, Play, Info
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
    {/* What is it */}
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #6366f1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>📌</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>What is it?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{what}</p>
    </div>

    {/* Why do we need it */}
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #10b981' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>❓</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Why do we need it?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{why}</p>
    </div>

    {/* Where is it used */}
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', borderTop: '4px solid #f59e0b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🎯</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Where is it used?</h4>
      </div>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{where}</p>
    </div>
  </div>
);

// Child component wrapped in React.memo for useCallback tab
const MemoizedTodoRow = React.memo(({ todo, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 6 }}>
      <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
});
MemoizedTodoRow.displayName = 'MemoizedTodoRow';

/* ─────────────────────────────── Main Component ─────────────────────────────── */
export default function ReactDay12({ activeTab = 'intro_react', onNavigate }) {
  const go = (id) => {
    onNavigate('react_module12', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ──────────────── 1. useRef Live State ──────────────── */
  const inputDomRef = useRef(null);
  const [typedValue, setTypedValue] = useState('');
  const timerIdRef = useRef(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const renderCounterRef = useRef(0);
  renderCounterRef.current += 1;

  const handleFocusClick = () => {
    if (inputDomRef.current) {
      inputDomRef.current.focus();
      inputDomRef.current.style.borderColor = '#6366f1';
    }
  };

  const handleStartTimer = () => {
    if (timerIdRef.current) return;
    setIsTimerActive(true);
    timerIdRef.current = setInterval(() => {
      setLiveSeconds((s) => s + 1);
    }, 1000);
  };

  const handleStopTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      setIsTimerActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  /* ──────────────── 2. useMemo Live State ──────────────── */
  const [searchWord, setSearchWord] = useState('');
  const [themeMode, setThemeMode] = useState('light');
  const sampleItems = useMemo(() => ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'Docker'], []);

  const filteredItems = useMemo(() => {
    return sampleItems.filter((item) =>
      item.toLowerCase().includes(searchWord.toLowerCase())
    );
  }, [sampleItems, searchWord]);

  /* ──────────────── 3. useCallback Live State ──────────────── */
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useRef Hook' },
    { id: 2, text: 'Master useMemo for Performance' },
    { id: 3, text: 'Build Custom Hooks' }
  ]);
  const [parentCount, setParentCount] = useState(0);

  const handleDeleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ──────────────── 4. Custom Hooks Live State ──────────────── */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedUser, setSavedUser] = useState('John Doe');

  /* ──────────────── 5. Hook Recommender ──────────────── */
  const [chosenTask, setChosenTask] = useState('dom');
  const recommendations = {
    dom: { hook: 'useRef()', reason: 'Direct DOM manipulation like focusing an input, playing video, or storing timer interval IDs without re-rendering.' },
    calc: { hook: 'useMemo()', reason: 'Caching the computed result of an expensive calculation or filtering a large array so it only re-computes when dependencies change.' },
    handler: { hook: 'useCallback()', reason: 'Freezing a function definition so passing it to a React.memo child does not trigger unnecessary child re-renders.' },
    reuse: { hook: 'Custom Hook (use...)', reason: 'Extracting repeated stateful logic (fetching, form validation, localStorage) into a reusable function.' }
  };

  /* ──────────────── 6. Capstone Live State ──────────────── */
  const capstoneNameRef = useRef(null);
  const [capstoneQuery, setCapstoneQuery] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [capstoneList, setCapstoneList] = useState([
    { id: 1, name: 'Alice Johnson', course: 'React 19', score: 95 },
    { id: 2, name: 'Bob Smith', course: 'Node.js', score: 82 },
    { id: 3, name: 'Carol White', course: 'React 19', score: 98 }
  ]);

  const filteredCapstone = useMemo(() => {
    return capstoneList.filter((s) =>
      s.name.toLowerCase().includes(capstoneQuery.toLowerCase())
    );
  }, [capstoneList, capstoneQuery]);

  const handleCapstoneDelete = useCallback((id) => {
    setCapstoneList((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.trim()) return;
    setCapstoneList((prev) => [{ id: Date.now(), name: newStudent, course: 'React 19', score: 90 }, ...prev]);
    setNewStudent('');
    if (capstoneNameRef.current) capstoneNameRef.current.focus();
  };

  /* ──────────────── 7. Quiz State ──────────────── */
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What happens when you update a value stored inside `useRef.current`?',
      options: [
        'The component immediately re-renders like useState',
        'The value updates silently without triggering any re-render',
        'All state variables are reset to default',
        'It causes an infinite rendering loop'
      ],
      answer: 1,
      explanation: 'useRef holds a mutable object. Modifying `.current` never triggers a React component re-render.'
    },
    {
      id: 'q2',
      question: 'What is the main purpose of `useMemo`?',
      options: [
        'To focus an HTML input field',
        'To cache (memoize) the return value of an expensive calculation',
        'To fetch data from a backend server',
        'To replace Redux in global state'
      ],
      answer: 1,
      explanation: 'useMemo caches the calculated result value and only recalculates when its specified dependencies change.'
    },
    {
      id: 'q3',
      question: 'Why do we pair `useCallback` with `React.memo`?',
      options: [
        'To prevent child components from re-rendering when passing callback functions as props',
        'To convert classes into functional components',
        'To automatically refresh the web page',
        'To make CSS animations faster'
      ],
      answer: 0,
      explanation: 'Every parent render creates new function instances. useCallback preserves the function reference so React.memo child components see identical props.'
    },
    {
      id: 'q4',
      question: 'What is the naming rule for a Custom Hook in React?',
      options: [
        'It must start with uppercase letter (e.g. FetchData)',
        'It must start with the lowercase prefix "use" (e.g. useFetch, useToggle)',
        'It must end with "Hook"',
        'It can have any name with no rules'
      ],
      answer: 1,
      explanation: 'Custom hooks must start with "use" so React and linter tools can enforce the official Rules of Hooks.'
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

            {/* Concept Overview: What, Why, Where */}
            <ConceptCard
              what="useRef is a hook that gives you a mutable container (ref.current). It allows you to access DOM nodes directly or keep values that persist across renders without causing a re-render."
              why="useState re-renders the whole component on every update. useRef allows silent updates (e.g., timer IDs, render counters) and direct DOM actions (e.g., input.focus())."
              where="1. Auto-focusing an input box on page load. 2. Storing interval/timer IDs (setInterval). 3. Tracking how many times a component rendered."
            />

            {/* Full Beginner Program */}
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
    inputRef.current.style.borderColor = "#6366f1";
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
    <div>
      {/* DOM Focus Section */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Type name here..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleManualFocus}>Focus Input</button>

      {/* Timer Section */}
      <div>
        <p>Timer: {seconds}s</p>
        <button onClick={handleStartTimer}>Start</button>
        <button onClick={handleStopTimer}>Stop</button>
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Interactive Live Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                🔬 Live Interactive Demo
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4 }}>1. DOM Input Focus</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      ref={inputDomRef}
                      type="text"
                      placeholder="Click Focus button..."
                      value={typedValue}
                      onChange={(e) => setTypedValue(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                    <button onClick={handleFocusClick} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      Focus
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4 }}>2. Persistent Timer ({liveSeconds}s)</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleStartTimer} disabled={isTimerActive} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      Start Timer
                    </button>
                    <button onClick={handleStopTimer} disabled={!isTimerActive} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      Stop Timer
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

            {/* Concept Overview: What, Why, Where */}
            <ConceptCard
              what="useMemo is a hook that caches (remembers) the calculated result of an expensive function. It only re-calculates when one of its dependencies changes."
              why="In React, every state change re-runs the entire component body. If you have heavy filtering, sorting, or math, the page lags. useMemo skips recalculation when inputs haven't changed."
              where="1. Filtering or sorting lists with hundreds of items. 2. Heavy mathematical computations. 3. Transforming large datasets before rendering."
            />

            {/* Full Beginner Program */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Program: Filtered List with useMemo
              </h3>
              <CodeBlock
                title="UseMemoDemo.jsx"
                code={`import React, { useState, useMemo } from "react";

const COURSES = ["React Fundamentals", "Advanced Hooks", "Next.js 15", "Node.js API", "SQL Databases"];

export default function UseMemoDemo() {
  const [search, setSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  // ✅ useMemo ONLY filters when "search" changes.
  // Toggling "darkTheme" will NOT re-run this filter!
  const filteredCourses = useMemo(() => {
    console.log("Filtering courses list...");
    return COURSES.filter((c) =>
      c.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]); // <-- Dependency array

  return (
    <div style={{ background: darkTheme ? "#1e293b" : "#fff", color: darkTheme ? "#fff" : "#000", padding: 20 }}>
      <button onClick={() => setDarkTheme((prev) => !prev)}>
        Toggle Theme
      </button>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", margin: "12px 0", padding: 8 }}
      />

      <ul>
        {filteredCourses.map((course, idx) => (
          <li key={idx}>{course}</li>
        ))}
      </ul>
    </div>
  );
}`}
              />
            </div>

            {/* Interactive Live Demo */}
            <div style={{ background: themeMode === 'dark' ? '#0f172a' : '#f8fafc', color: themeMode === 'dark' ? 'white' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>
                  🔬 Live Interactive Demo
                </h4>
                <button
                  onClick={() => setThemeMode(m => m === 'light' ? 'dark' : 'light')}
                  style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  Toggle Theme ({themeMode})
                </button>
              </div>

              <input
                type="text"
                placeholder="Search tech stack (e.g. React)..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem', marginBottom: 10 }}
              />

              <div style={{ fontSize: '0.85rem' }}>
                Found <b>{filteredItems.length}</b> matches: {filteredItems.join(', ')}
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

            {/* Concept Overview: What, Why, Where */}
            <ConceptCard
              what="useCallback is a hook that caches (remembers) a function definition between renders so it doesn't get recreated in memory every time."
              why="In JavaScript, () => {} !== () => {}. Every time a parent renders, new functions are created. Passing them to React.memo child components causes unnecessary child re-renders."
              where="1. Passing delete/update handlers to list items wrapped in React.memo. 2. Passing callback functions into useEffect dependency arrays."
            />

            {/* Full Beginner Program */}
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
    <div>
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

            {/* Interactive Live Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                  🔬 Live Interactive Demo
                </h4>
                <button
                  onClick={() => setParentCount((c) => c + 1)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  Re-render Parent (Count: {parentCount})
                </button>
              </div>

              <div>
                {todos.map((todo) => (
                  <MemoizedTodoRow key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
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

            {/* Concept Overview: What, Why, Where */}
            <ConceptCard
              what="A Custom Hook is a JavaScript function whose name starts with 'use' (e.g. useToggle, useFetch) that can call other React hooks inside it."
              why="Instead of copy-pasting the same useState and useEffect code across 5 different components, you extract the logic into a single reusable custom hook."
              where="1. useToggle for modals and dropdowns. 2. useLocalStorage for saving data to the browser. 3. useFetch for calling backend APIs."
            />

            {/* Full Beginner Program */}
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
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={toggleModal}>
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

            {/* Interactive Live Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                🔬 Live Interactive Demo
              </h4>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <input
                  type="text"
                  value={savedUser}
                  onChange={(e) => setSavedUser(e.target.value)}
                  placeholder="Enter user name..."
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <button
                  onClick={() => setIsModalOpen(v => !v)}
                  style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {isModalOpen ? 'Hide Dialog' : 'Show Dialog (useToggle)'}
                </button>
              </div>

              {isModalOpen && (
                <div style={{ background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: 8, padding: '12px', fontSize: '0.85rem', color: '#5b21b6' }}>
                  🎉 Welcome back, <strong>{savedUser}</strong>! This dialog is powered by clean custom hook logic.
                </div>
              )}
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

            {/* Quick Comparison Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Hook</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>What it returns</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Re-renders Component?</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Primary Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'useState(init)', ret: '[value, setValue]', render: '✅ Yes', use: 'Interactive UI state (inputs, toggles, counters)', color: '#6366f1' },
                    { name: 'useRef(init)', ret: '{ current: value }', render: '❌ Never', use: 'DOM element focus, timer IDs, silent counters', color: '#8b5cf6' },
                    { name: 'useMemo(fn, deps)', ret: 'Calculated value', render: '❌ No', use: 'Caching heavy filters & expensive math', color: '#10b981' },
                    { name: 'useCallback(fn, deps)', ret: 'Function reference', render: '❌ No', use: 'Passing stable handlers to React.memo children', color: '#0ea5e9' },
                    { name: 'Custom Hook', ret: 'Any custom data', render: 'Depends on hooks used', use: 'Reusing stateful logic across components', color: '#f59e0b' }
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
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
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
                    onClick={() => setChosenTask(item.id)}
                    style={{
                      background: chosenTask === item.id ? '#6366f1' : 'white',
                      color: chosenTask === item.id ? 'white' : '#334155',
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

              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px' }}>
                <strong style={{ color: '#6366f1', fontSize: '0.95rem' }}>Recommended: {recommendations[chosenTask].hook}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#475569' }}>{recommendations[chosenTask].reason}</p>
              </div>
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
              This Capstone Project demonstrates all 4 hooks working seamlessly together in a real-world app:
              <br />• <strong>useRef</strong>: Auto-focus the student name input.
              <br />• <strong>useMemo</strong>: Filter students fast without lag.
              <br />• <strong>useCallback</strong>: Freeze delete handler to prevent list re-renders.
            </p>

            {/* Full Beginner Program */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                💻 Complete Capstone Source Code
              </h3>
              <CodeBlock
                title="StudentPortal.jsx"
                code={`import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

// 1. Memoized Child Row
const StudentRow = React.memo(({ student, onDelete }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #eee" }}>
      <span><b>{student.name}</b> ({student.course}) - Score: {student.score}</span>
      <button onClick={() => onDelete(student.id)} style={{ color: "red" }}>Delete</button>
    </div>
  );
});

// 2. Main Component
export default function StudentPortal() {
  const nameInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", course: "React 19", score: 95 },
    { id: 2, name: "Bob Smith", course: "Node.js", score: 82 }
  ]);

  // useRef: Auto-focus on mount
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  // useMemo: Filter students
  const filtered = useMemo(() => {
    return students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }, [students, search]);

  // useCallback: Stable delete handler
  const handleDelete = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStudents(prev => [{ id: Date.now(), name, course: "React 19", score: 90 }, ...prev]);
    setName("");
    if (nameInputRef.current) nameInputRef.current.focus();
  };

  return (
    <div style={{ maxWidth: 500, padding: 20 }}>
      <h3>Student Management Portal</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input ref={nameInputRef} value={name} onChange={e => setName(e.target.value)} placeholder="Student name..." />
        <button type="submit">Add</button>
      </form>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." style={{ width: "100%", marginBottom: 12 }} />

      <div>
        {filtered.map(s => <StudentRow key={s.id} student={s} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Interactive Live Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                🔬 Live Capstone Application Preview
              </h4>

              <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input
                  ref={capstoneNameRef}
                  type="text"
                  placeholder="Enter student name..."
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <button type="submit" style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}>
                  Add Record
                </button>
              </form>

              <input
                type="text"
                placeholder="Search students (useMemo)..."
                value={capstoneQuery}
                onChange={(e) => setCapstoneQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem', marginBottom: 12 }}
              />

              <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
                {filteredCapstone.map((student) => (
                  <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.88rem' }}><b>{student.name}</b> ({student.course}) - Score: <strong style={{ color: '#6366f1' }}>{student.score}</strong></span>
                    <button
                      onClick={() => handleCapstoneDelete(student.id)}
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

                      if (quizDone) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) {
                        bg = '#e0f2fe'; border = '1.5px solid #0ea5e9';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizDone}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                          style={{ background: bg, border, padding: '8px 12px', borderRadius: 6, textAlign: 'left', cursor: quizDone ? 'default' : 'pointer', fontSize: '0.85rem' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizDone && (
                    <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: 6 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {!quizDone ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setQuizDone(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  style={{ background: '#6366f1', borderColor: '#6366f1' }}
                >
                  Submit Quiz
                </button>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizDone(false); }}>
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
                onClick={() => setShowTask1(v => !v)}
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
                onClick={() => setShowTask2(v => !v)}
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
  const toggle = useCallback(() => setState(s => !s), []);
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
                onClick={() => setShowTask3(v => !v)}
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
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {filtered.map(i => <ItemRow key={i.id} item={i} onDelete={handleDelete} />)}
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
