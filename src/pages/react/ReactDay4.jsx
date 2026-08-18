import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle 
} from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const highlightJS = (code) => {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(#[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(["'])([\s\S]*?)\1/g, '<span style="color: #a5d6ff;">$1$2$1</span>');

  const keywords = ['const', 'let', 'var', 'return', 'import', 'export', 'default', 'function', 'from', 'class', 'extends', 'if', 'else', 'new', 'typeof', 'as'];
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #ff7b72; font-weight: bold;">$1</span>');
  });

  const hooks = ['useState', 'useEffect', 'useContext'];
  hooks.forEach(hook => {
    const reg = new RegExp(`\\b(${hook})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #d18616; font-weight: bold;">$1</span>');
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const CodeBlock = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflowX: 'auto', margin: '1.5rem 0', position: 'relative', width: '100%' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{title}</span>
          <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.9rem', fontFamily: 'monospace', lineHeight: 1.5, whiteSpace: 'pre' }}>
        <code>{highlightJS(code)}</code>
      </pre>
    </div>
  );
};

export default function ReactDay4({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('react_module4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Widget 1: Static vs State Counter ---
  let staticCount = 0;
  const [stateCount, setStateCount] = useState(0);
  const [staticLogs, setStaticLogs] = useState([]);

  const handleIncrementStatic = () => {
    staticCount += 1;
    setStaticLogs(prev => [...prev, `staticCount incremented to ${staticCount} in stack memory (Re-render NOT triggered)`].slice(-3));
  };

  // --- Widget 2: Interactive State Flow Cycle (Page 4) ---
  const [flowStep, setFlowStep] = useState(1);
  const flowStepsInfo = [
    { step: 1, title: "1. URL ➔ Route Component", desc: "User types a URL or clicks a link. React Router intercepts the request and loads the matching Route Component in the viewport." },
    { step: 2, title: "2. Route Component ➔ Connect ➔ State", desc: "The loaded Route Component is connected to the global or local component state. It reads the current state and registers dispatch capabilities." },
    { step: 3, title: "3. Component ➔ Dispatch ➔ Action", desc: "A user interaction triggers a dispatch. A dispatch is a request to change state. An Action is a plain JavaScript object describing 'what happened' (e.g. { type: 'INCREMENT' }). Components cannot modify state directly!" },
    { step: 4, title: "4. Action ➔ Reducer (Core Logic)", desc: "The Action goes to a Reducer, which is a pure function. It takes (Old state, Action) and returns a brand-new state. The Reducer does not call APIs or modify variables directly." },
    { step: 5, title: "5. Effect ➔ Server (API Call)", desc: "Side effects like fetching database records (e.g. fetch('/api/users')) or handling async tasks are executed here. The server processes the request and sends a response back." },
    { step: 6, title: "6. Server ➔ Effect ➔ Dispatch (Again)", desc: "Once the asynchronous server response arrives, the side-effect handler dispatches another action with the response payload data to update the state." },
    { step: 7, title: "7. Subscription ➔ State Updated", desc: "A subscription listener monitors state changes. When the new state is created, all subscribed components are notified immediately." },
    { step: 8, title: "8. State ➔ UI Re-render", desc: "React compares the old state tree vs the new state tree. It identifies differences, automatically re-renders the changed DOM nodes, and the user sees updated visual data!" }
  ];

  // --- Widget 3: useState Hook Syntax Breakdown ---
  const [selectedSyntaxPart, setSelectedSyntaxPart] = useState(null);
  const syntaxBreakdowns = {
    stateVar: { title: "stateVariable", desc: "This is your state variable's current value. It represents the persistent state data that React tracks across component render cycles." },
    setterFunc: { title: "setStateFunction", desc: "This is the updater function. Calling this function tells React the state has changed and schedules a component re-render to update the user interface." },
    hookName: { title: "useState", desc: "The React built-in Hook function. It registers state memory allocations for functional components, which previously only existed in class-based elements." },
    initialVal: { title: "initialValue", desc: "The default value set when the component mounts. Can be any valid JavaScript type: numbers, strings, booleans, arrays, or nested objects." }
  };

  // --- Widget 4: Profile Demo (Multiple States) ---
  const [profileName, setProfileName] = useState("Kousalya");
  const [profileAge, setProfileAge] = useState(25);

  // --- Widget 5: Object State (Direct Mutation vs Spread) ---
  const [userObject, setUserObject] = useState({ name: "Kousalya", age: 25 });
  const [userObjectLogs, setUserObjectLogs] = useState([]);
  const [hasMutatedDirectly, setHasMutatedDirectly] = useState(false);

  const mutateObjectDirectly = () => {
    userObject.age = userObject.age + 1; 
    setHasMutatedDirectly(true);
    setUserObjectLogs(prev => [...prev, `[Mutation Warning]: Mutated userObject.age directly to ${userObject.age}. Note that the UI has NOT re-rendered because the memory reference is identical!`].slice(-4));
  };

  const mutateObjectCorrectly = () => {
    setUserObject(prev => {
      const updated = { ...prev, age: prev.age + 1 };
      setUserObjectLogs(prevLogs => [...prevLogs, `[State Success]: Dispatched new object reference { name: "${updated.name}", age: ${updated.age} } via setUser. Re-render triggered!`].slice(-4));
      return updated;
    });
    setHasMutatedDirectly(false);
  };

  // --- Widget 6: Array State (Todo list & push comparison) ---
  const [tasksArray, setTasksArray] = useState(['Learn React Day 1', 'Master React Props']);
  const [tasksLogs, setTasksLogs] = useState([]);
  const [typedTask, setTypedTask] = useState("");

  const handlePushArrayDirectly = () => {
    if (!typedTask.trim()) return;
    tasksArray.push(typedTask.trim());
    setTasksLogs(prev => [...prev, `[Array Warning]: Called tasksArray.push("${typedTask.trim()}"). Array length in memory is now ${tasksArray.length}, but UI does NOT update due to reference replication.`].slice(-4));
    setTypedTask("");
  };

  const handleAddArrayCorrectly = () => {
    if (!typedTask.trim()) return;
    const newTask = typedTask.trim();
    setTasksArray(prev => {
      const updated = [...prev, newTask];
      setTasksLogs(prevLogs => [...prevLogs, `[State Success]: Dispatched new array reference via setTasks. Added "${newTask}". UI re-renders!`].slice(-4));
      return updated;
    });
    setTypedTask("");
  };

  // --- Widget 7: Nested Address state ---
  const [nestedState, setNestedState] = useState({
    name: "GeeksforGeeks",
    address: {
      colony: "Sector 136",
      city: "Noida",
      state: "Uttar Pradesh"
    }
  });
  const [nestedLogs, setNestedLogs] = useState([]);

  const handleUpdateNestedCity = () => {
    setNestedState(prevState => {
      const nextState = {
        ...prevState,
        address: {
          ...prevState.address,
          city: "Gautam Budha Nagar"
        }
      };
      setNestedLogs(prev => [...prev, `[Nested State Change]: Updated state.address.city ➔ "Gautam Budha Nagar". New address reference created.`]);
      return nextState;
    });
  };

  // --- Widget 8: State Lifting Playground (Student Grade App) ---
  const [liftedMarks, setLiftedMarks] = useState("");
  const [independentMarksInput, setIndependentMarksInput] = useState("");
  const [independentGradeMarks, setIndependentGradeMarks] = useState("");

  const calculateGrade = (val) => {
    if (val === "") return "";
    const marks = Number(val);
    if (isNaN(marks)) return "Invalid";
    if (marks >= 90) return "A";
    if (marks >= 75) return "B";
    if (marks >= 60) return "C";
    return "Fail";
  };

  // --- Quiz States ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizQuestions = [
    {
      key: 'q1',
      question: 'What is state in ReactJS?',
      options: [
        'A permanent database lookup query.',
        'An object that holds component data that can change over time, triggering UI updates upon mutation.',
        'A stylesheet class configuration selector.',
        'A static variable that never causes component re-renders.'
      ],
      correct: 1,
      explanation: 'State is an internal data repository held by components that is reactive—when state changes, React automatically re-renders the component to display the new values.'
    },
    {
      key: 'q2',
      question: 'Which of the following is correct when initializing useState with boolean false?',
      options: [
        'const [state, setState] = useState(false);',
        'const state = false;',
        'let state = useState(false);',
        'const {state, setState} = useState(false);'
      ],
      correct: 0,
      explanation: 'useState returns a pair: the current state value and an updater function, which are destructuring assigned via array brackets: const [state, setState].'
    },
    {
      key: 'q3',
      question: 'Why should you avoid mutating objects or arrays in state directly (e.g. state.push() or state.prop = value)?',
      options: [
        'It is syntactically invalid JavaScript.',
        'It will delete the values from state.',
        'React relies on shallow reference equality. Mutating in-place does not change the pointer, meaning React will not detect the update and will bypass re-rendering.',
        'It causes memory leaks in the browser.'
      ],
      correct: 2,
      explanation: 'Since React performs shallow reference checks, mutating arrays or objects directly preserves the original memory reference. React assumes no changes occurred and skips re-rendering. Always copy state via the spread operator (...).'
    },
    {
      key: 'q4',
      question: 'What is state lifting?',
      options: [
        'Exporting local state variables to external HTML files.',
        'Moving state from child components up to their closest common parent component, which then distributes it down via props.',
        'Deleting state to decrease component render depth.',
        'Writing state directly on the global window context.'
      ],
      correct: 1,
      explanation: 'State lifting is moving local state up to a parent component so that multiple child elements can share the same state and remain synchronized.'
    }
  ];

  const handleQuizAnswer = (qKey, optIdx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. INTRODUCTION TO STATE ────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 4" title="Introduction to State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>🧩 Understanding Component State</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                In React, <strong>State</strong> is the place where the data comes from. It represents the internal memory of a component—data that can change over time based on user inputs, click triggers, or network responses, driving dynamic UI updates.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>What is State in Reactjs?</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>State is the place where the data comes from.</li>
              <li>You should try to create your state as simple as possible and minimize the number of stateful components.</li>
              <li>For example, if ten components want data from the state, you should create one container component that will keep the state for all of them.</li>
              <li>Every component has a state object and a props object.</li>
            </ul>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Info size={16} /> Why State is Needed?</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
                  <li><strong>User input changes:</strong> As characters are typed into a form input.</li>
                  <li><strong>Button click updates:</strong> Modifying toggles, menus, counter digits.</li>
                  <li><strong>API data updates:</strong> Injecting async server responses into lists.</li>
                  <li><strong>Toggle actions:</strong> Dark mode themes, popup overlays, shopping carts.</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Cpu size={16} /> What is the useState Hook?</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d' }}>
                  The <code>useState</code> hook is a built-in React function that allows you to add and manage state variables inside functional components. It provides a state variable and a setter function to update that variable, prompting React to automatically update the DOM.
                </p>
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: STATIC VS STATE COUNTER --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>⚡ Interactive Playground: Static Variable vs Component State</h3>
            <p>Below, test the difference between updating a normal static variable (which does not trigger re-rendering) and a state variable (which updates the UI instantly).</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              
              {/* Static Column */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', position: 'relative' }}>
                <div style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20, position: 'absolute', top: 12, right: 12 }}>Without State</div>
                <h4 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>Static Variable Stack</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginBottom: '1rem' }}>
                  <span style={{ color: '#ff7b72', fontWeight: 'bold' }}>let</span> <span style={{ color: '#e1e4e8' }}>count = 0;</span>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'white', borderRadius: 12, border: '1px dashed #cbd5e1', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>UI Counter Value:</span>
                  <strong style={{ fontSize: '2.5rem', color: '#64748b' }}>0</strong>
                </div>
                <button className="btn btn-outline" onClick={handleIncrementStatic} style={{ width: '100%' }}><Play size={14} /> Increment count++</button>
                
                {staticLogs.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#fee2e2', borderRadius: 8, fontSize: '0.78rem', color: '#991b1b', fontFamily: 'monospace' }}>
                    {staticLogs.map((log, li) => <div key={li}>⚡ {log}</div>)}
                  </div>
                )}
              </div>

              {/* State Column */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '1.5rem', position: 'relative' }}>
                <div style={{ background: '#10b981', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20, position: 'absolute', top: 12, right: 12 }}>With State</div>
                <h4 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0' }}>React State Memory</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginBottom: '1rem' }}>
                  <span style={{ color: '#ff7b72', fontWeight: 'bold' }}>const</span> <span style={{ color: '#e1e4e8' }}>[count, setCount] = </span><span style={{ color: '#ffb454' }}>useState(0);</span>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'white', borderRadius: 12, border: '1px dashed #86efac', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#166534', display: 'block' }}>UI Counter Value:</span>
                  <strong style={{ fontSize: '2.5rem', color: '#10b981' }}>{stateCount}</strong>
                </div>
                <button className="btn btn-primary" onClick={() => setStateCount(prev => prev + 1)} style={{ width: '100%', background: '#10b981', borderColor: '#10b981' }}><Play size={14} /> setCount(count + 1)</button>
                <div style={{ marginTop: '1.45rem', padding: '0.5rem', background: '#dcfce7', borderRadius: 8, fontSize: '0.78rem', color: '#166534', fontFamily: 'monospace' }}>
                  ⚡ State updated! React captured setter dispatch ➔ re-rendered DOM.
                </div>
              </div>

            </div>

            {/* --- INTERACTIVE STATE CYCLE VISUALIZER (Page 4) --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '3rem', marginBottom: '1rem' }}>🔄 Interactive State Flow Cycle</h3>
            <p>Click through the interactive steps below to trace the complete path of state management in React, from initial router loading to rendering updates.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', margin: '1.5rem 0', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background: '#4f46e5', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{flowStep}</span>
                  {flowStepsInfo[flowStep - 1].title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#475569', minHeight: '80px', lineHeight: 1.6 }}>
                  {flowStepsInfo[flowStep - 1].desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button className="btn btn-outline" onClick={() => setFlowStep(p => Math.max(1, p - 1))} disabled={flowStep === 1}>Previous</button>
                  <button className="btn btn-primary" onClick={() => setFlowStep(p => Math.min(8, p + 1))} disabled={flowStep === 8} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>Next Step</button>
                </div>
              </div>

              {/* Graphical State Node Visualizer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {flowStepsInfo.map(item => {
                  const isActive = item.step === flowStep;
                  return (
                    <div 
                      key={item.step}
                      onClick={() => setFlowStep(item.step)}
                      style={{ 
                        padding: '8px 12px', 
                        background: isActive ? '#e0f2fe' : 'white', 
                        border: isActive ? '1px solid #0ea5e9' : '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#0369a1' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{item.title.split(' ➔ ')[0]}</span>
                      {isActive && <span style={{ color: '#0ea5e9', fontSize: '0.8rem' }}>Active</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('useState_hook')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. USESTATE HOOK ────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 4" title="useState Hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              Hooks are functions that allow you to use React features, like state and lifecycle methods, without writing a class component. Before hooks were introduced in React, state management and other side effects were possible only in class-based components. With hooks, you can manage state and other component features right within functional components.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 16, border: '1px solid #e2e8f0', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>What is useState?</h4>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>
                The <code>useState</code> hook is a special function that lets you add state to a functional component. Unlike props, which are passed to components, state is handled within the component itself and can change over time.
              </p>
            </div>

            {/* --- INTERACTIVE WIDGET: SYNTAX BREAKDOWN --- */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>🔍 Interactive Syntax Inspector</h3>
            <p>Click on any of the highlighted variables/methods below to break down the syntax of the useState Hook expression:</p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 12, display: 'flex', gap: '6px', flexWrap: 'wrap', fontFamily: 'monospace', fontSize: '1.1rem', color: '#f8fafc', margin: '1.5rem 0', alignItems: 'center' }}>
              <span style={{ color: '#ff7b72', fontWeight: 'bold' }}>const</span>
              <span style={{ color: '#e1e4e8' }}>[</span>
              
              <button 
                onClick={() => setSelectedSyntaxPart('stateVar')}
                style={{ 
                  background: selectedSyntaxPart === 'stateVar' ? '#38bdf8' : 'rgba(56, 189, 248, 0.1)', 
                  border: 'none', 
                  color: selectedSyntaxPart === 'stateVar' ? '#0f172a' : '#38bdf8', 
                  fontFamily: 'monospace', 
                  fontSize: '1.1rem',
                  padding: '2px 6px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                stateVariable
              </button>

              <span style={{ color: '#e1e4e8' }}>,</span>

              <button 
                onClick={() => setSelectedSyntaxPart('setterFunc')}
                style={{ 
                  background: selectedSyntaxPart === 'setterFunc' ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)', 
                  border: 'none', 
                  color: selectedSyntaxPart === 'setterFunc' ? '#0f172a' : '#f59e0b', 
                  fontFamily: 'monospace', 
                  fontSize: '1.1rem',
                  padding: '2px 6px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                setStateFunction
              </button>

              <span style={{ color: '#e1e4e8' }}>] =</span>

              <button 
                onClick={() => setSelectedSyntaxPart('hookName')}
                style={{ 
                  background: selectedSyntaxPart === 'hookName' ? '#10b981' : 'rgba(16, 185, 129, 0.1)', 
                  border: 'none', 
                  color: selectedSyntaxPart === 'hookName' ? '#0f172a' : '#10b981', 
                  fontFamily: 'monospace', 
                  fontSize: '1.1rem',
                  padding: '2px 6px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                useState
              </button>

              <span style={{ color: '#e1e4e8' }}>(</span>

              <button 
                onClick={() => setSelectedSyntaxPart('initialVal')}
                style={{ 
                  background: selectedSyntaxPart === 'initialVal' ? '#d2a8ff' : 'rgba(210, 168, 255, 0.1)', 
                  border: 'none', 
                  color: selectedSyntaxPart === 'initialVal' ? '#0f172a' : '#d2a8ff', 
                  fontFamily: 'monospace', 
                  fontSize: '1.1rem',
                  padding: '2px 6px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                initialValue
              </button>

              <span style={{ color: '#e1e4e8' }}>);</span>
            </div>

            {selectedSyntaxPart && (
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #6366f1', padding: '1rem', borderRadius: '4px 12px 12px 4px', marginBottom: '1.5rem', transition: 'all 0.3s' }}>
                <h5 style={{ fontWeight: 800, margin: '0 0 4px 0', color: '#0f172a' }}>{syntaxBreakdowns[selectedSyntaxPart].title}</h5>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>{syntaxBreakdowns[selectedSyntaxPart].desc}</p>
              </div>
            )}

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>State Can Hold Any Type of Data</h3>
            <p>The beauty of <code>useState</code> is its flexibility. The state can hold a variety of data types:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li><strong>Primitives:</strong> Numbers, strings, booleans (e.g. <code>useState(0)</code>, <code>useState("John")</code>, <code>useState(true)</code>).</li>
              <li><strong>Arrays:</strong> Lists of values or object cards (e.g. <code>useState([])</code>).</li>
              <li><strong>Objects:</strong> Key-value parameter settings (e.g. <code>useState(&#123; name: "Alice", age: 25 &#125;)</code>).</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('multiple_states')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. MULTIPLE STATES ──────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 4" title="Initializing useState & Multiple States">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Accessing the State Variable</h3>
            <p>
              The value of the state variable can be directly accessed just like any other variable inside the function component. The value is persistent across re-renders, meaning React will keep track of it.
            </p>

            <CodeBlock title="Greeting.jsx" code={`function Greeting() {
  const [name, setName] = useState('John');
  return <h1>Hello, {name}!</h1>;
}`} />

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem' }}>Using Multiple useState Hooks</h3>
            <p>You can use multiple <code>useState</code> hooks in a single component to manage different states independently:</p>

            <CodeBlock title="Profile.jsx" code={`import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState("Kousalya");
  const [age, setAge] = useState(25);

  return (
    <>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>
        Increase Age
      </button>
    </>
  );
}`} />

            {/* --- INTERACTIVE WIDGET: MULTIPLE STATES PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>👤 Live Multi-State Component Render</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '6px' }}>Edit Name (setNameState):</label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.2rem', outline: 'none' }}
                />
                
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '6px' }}>Modify Age (setAgeState):</label>
                <button className="btn btn-outline" onClick={() => setProfileAge(prev => prev + 1)} style={{ width: '100%' }}>Increment Age: {profileAge} ➔ {profileAge + 1}</button>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h5 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Component Live Output</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <UserIcon size={16} color="#6366f1" />
                  <span><strong>Name:</strong> {profileName || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>empty</span>}</span>
                </div>
                <div>
                  <span><strong>Age:</strong> {profileAge} years old</span>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('object_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. OBJECT STATE ─────────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 4" title="Object & Array State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Handling Objects in State</h3>
            <p>
              When related values belong together (like form data or user profile states), we bundle them into objects.
              <strong> Important Rule:</strong> Never modify state objects directly. Always create a copy using the spread operator <code>...</code> and dispatch the updater.
            </p>

            <CodeBlock title="User.jsx" code={`function User() {
  const [user, setUser] = useState({
    name: "Kousalya",
    age: 25,
  });

  return (
    <>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Increase Age
      </button>
    </>
  );
}`} />

            {/* --- INTERACTIVE OBJECT STATE PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>⚡ Object State Mutation Playground</h4>
            <p>Try updating the age prop directly on the object versus updating it correctly using the spread operator. Look at the logs to understand why mutation is skipped by React's rendering engine.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', margin: '1.5rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={mutateObjectDirectly}
                  style={{ borderColor: '#ef4444', color: '#ef4444', justifyContent: 'flex-start' }}
                >
                  <AlertTriangle size={16} /> Direct Mutation (user.age = user.age + 1)
                </button>
                
                <button 
                  className="btn btn-outline" 
                  onClick={mutateObjectCorrectly}
                  style={{ borderColor: '#10b981', color: '#10b981', justifyContent: 'flex-start' }}
                >
                  <Check size={16} /> Correct Update (setUser(&#123; ...user, age: user.age + 1 &#125;))
                </button>

                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: 8, fontSize: '0.8rem', fontFamily: 'monospace', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span><strong>Current user state:</strong></span>
                  <div style={{ paddingLeft: '1rem', margin: '0.5rem 0' }}>
                    <div>name: "{userObject.name}"</div>
                    <div style={{ color: hasMutatedDirectly ? '#fca5a5' : '#86efac' }}>age: {userObject.age} {hasMutatedDirectly && "(UI STALE!)"}</div>
                  </div>
                  <span>Reference ID: <span style={{ color: '#d2a8ff' }}>{hasMutatedDirectly ? "REPLICATED_POINTER_0x9A" : "NEW_HEAP_ALLOCATION_0x4F"}</span></span>
                </div>
              </div>

              {/* Logs */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: 12, fontSize: '0.78rem', color: '#475569' }}>
                <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Compiler/Reconciliation Logs:</span>
                <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {userObjectLogs.length === 0 ? "Awaiting updates..." : userObjectLogs.map((log, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: log.startsWith('[Mutation') ? '#b91c1c' : '#15803d' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '3rem', marginBottom: '0.8rem' }}>Handling Arrays in State</h3>
            <p>
              Just like objects, arrays in JavaScript are passed by reference. Calling array mutators like <code>push()</code>, <code>pop()</code>, or <code>splice()</code> alters the values within the array elements but preserves the array reference pointer. Always create a new array copy (e.g., using the spread operator <code>[...items]</code>) to update state.
            </p>

            <CodeBlock title="Todo.jsx" code={`function Todo() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    // Correct way: spreads existing items and appends new string
    setTasks([...tasks, "Learn React"]);
  };

  return (
    <>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </>
  );
}`} />

            {/* --- INTERACTIVE ARRAY STATE PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>📝 Live Array State Task Manager</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Type new task here..." 
                  value={typedTask}
                  onChange={(e) => setTypedTask(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none' }}
                />
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" onClick={handlePushArrayDirectly} style={{ flex: 1, borderColor: '#ef4444', color: '#ef4444' }}>
                    Wrong: array.push()
                  </button>
                  <button className="btn btn-primary" onClick={handleAddArrayCorrectly} style={{ flex: 1, background: '#6366f1', borderColor: '#6366f1' }}>
                    Correct: [...arr, task]
                  </button>
                </div>

                <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', marginTop: '1.2rem', minHeight: '130px' }}>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#475569', fontWeight: 'bold' }}>Rendered Array Items (map):</h5>
                  {tasksArray.length === 0 ? (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>No items in array</span>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                      {tasksArray.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Logs */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: 12, fontSize: '0.78rem', color: '#475569' }}>
                <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Array Diff Inspector:</span>
                <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {tasksLogs.length === 0 ? "Awaiting inputs..." : tasksLogs.map((log, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: log.startsWith('[Array') ? '#b91c1c' : '#15803d' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('nested_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. UPDATING NESTED STATE ────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 4" title="Updating Nested State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              To update nested state in React we can use the spread operator, callback with setState, or external libraries like immer and immutability-helper. Below is the example to update nested state with spread operator.
            </p>
            <p>
              We can pass the old nested object using the spread operator and then override the particular properties of the nested object. We will be using the React Hooks to access the state in functional component.
            </p>

            <CodeBlock title="Filename: App.js" code={`import React, { useState } from "react";

const App = () => {
  // Initializing state using useState hook
  const [state, setState] = useState({
    name: "GeeksforGeeks",
    address: {
      colony: "Sector 136",
      city: "Noida",
      state: "Uttar Pradesh"
    }
  });

  const handleUpdate = () => {
    // Overriding the city property of address object
    setState((prevState) => ({
      ...prevState,
      address: { 
        ...prevState.address, 
        city: "Gautam Budha Nagar" 
      }
    }));
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>{state.name}</h1>
      <h1>
        {state.address.colony}, {state.address.city}, {state.address.state}
      </h1>
      <button onClick={handleUpdate}>UpdateCity</button>
    </div>
  );
};

export default App;`} />

            {/* --- INTERACTIVE WIDGET: NESTED STATE VISUALIZER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🌳 Interactive Nested State Tree</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <h5 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0f172a', fontWeight: 'bold' }}>Live Mock Component Render</h5>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: 12, marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#0f172a' }}>{nestedState.name}</h2>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
                    {nestedState.address.colony}, <strong style={{ color: nestedState.address.city === 'Gautam Budha Nagar' ? '#10b981' : '#f59e0b' }}>{nestedState.address.city}</strong>, {nestedState.address.state}
                  </p>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={handleUpdateNestedCity}
                  disabled={nestedState.address.city === 'Gautam Budha Nagar'}
                  style={{ width: '100%', background: '#0284c7', borderColor: '#0284c7' }}
                >
                  UpdateCity ➔ Gautam Budha Nagar
                </button>
              </div>

              {/* State Tree Code Viewer */}
              <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.25rem', borderRadius: 12, fontFamily: 'monospace', fontSize: '0.85rem', position: 'relative' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px' }}>// Current State Tree Value:</span>
                <div>
                  <span style={{ color: '#ff7b72' }}>{`{`}</span>
                  <div style={{ paddingLeft: '1rem' }}>
                    name: <span style={{ color: '#7ee787' }}>"{nestedState.name}"</span>,
                    <br />
                    address: <span style={{ color: '#ff7b72' }}>{`{`}</span>
                    <div style={{ paddingLeft: '1.5rem' }}>
                      colony: <span style={{ color: '#7ee787' }}>"{nestedState.address.colony}"</span>,
                      <br />
                      city: <span style={{ color: '#7ee787', fontWeight: nestedState.address.city === 'Gautam Budha Nagar' ? 'bold' : 'normal' }}>"{nestedState.address.city}"</span>,
                      <br />
                      state: <span style={{ color: '#7ee787' }}>"{nestedState.address.state}"</span>
                    </div>
                    <span style={{ color: '#ff7b72' }}>{`}`}</span>
                  </div>
                  <span style={{ color: '#ff7b72' }}>{`}`}</span>
                </div>
                {nestedLogs.length > 0 && (
                  <div style={{ marginTop: '1.5rem', color: '#10b981', fontSize: '0.78rem', borderTop: '1px solid #1e293b', paddingTop: '8px' }}>
                    {nestedLogs[nestedLogs.length - 1]}
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('state_lifting')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. STATE LIFTING ────────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="state_lifting" id="state_lifting" eyebrow="Module 06 • Day 4" title="State Lifting & Shared States">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              Most beginners in the quest to learn how props works, can easily understand how content(data) is passed from a parent component to its child component. That is very important. But what if you want to do it the other way round, thus passing content from "Child Component" to its "Parent Component" so that the other "Child Components" who are directly related to the parent Component get access to the data. This brings in the concept of "Lifting State Up".
            </p>

            <div style={{ background: '#f8fafc', borderLeft: '4px solid #4f46e5', padding: '1rem 1.25rem', borderRadius: '4px 12px 12px 4px', margin: '1.5rem 0' }}>
              <strong>🔑 Core Concept:</strong> Lifting state up enables you to pass state data generated by a "Child Component" to its closest "Parent Component". The state is managed by a single component and passed down to other components, promoting a <strong>unidirectional data flow</strong>.
            </div>

            {/* --- SIDE-BY-SIDE LIFTING PLAYGROUND --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1.5rem' }}>🎮 Live Side-by-Side: No Lifting vs With State Lifting</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '1.5rem 0' }}>
              
              {/* Option A: WITHOUT State Lifting */}
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '1.5rem', borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#991b1b', fontWeight: 800, margin: 0 }}>Independent Component States</h4>
                  <span style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 12 }}>No Lifting</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '1rem' }}>Child A and Child B maintain their own state values. They cannot share data.</p>
                
                {/* Child A */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 12, border: '1px solid #fca5a5', marginBottom: '1rem' }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#991b1b', fontWeight: 'bold' }}>Child A (MarksInput)</h5>
                  <label style={{ fontSize: '0.75rem', display: 'block', color: '#64748b', marginBottom: '4px' }}>Enter Marks:</label>
                  <input 
                    type="number" 
                    placeholder="Enter marks"
                    value={independentMarksInput}
                    onChange={(e) => setIndependentMarksInput(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>Local marks: {independentMarksInput || "none"}</div>
                </div>

                {/* Child B */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 12, border: '1px solid #fca5a5' }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#991b1b', fontWeight: 'bold' }}>Child B (GradeDisplay)</h5>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>Calculate grade based on local state:</div>
                  <strong style={{ fontSize: '1rem', color: '#ef4444' }}>
                    {calculateGrade(independentGradeMarks) ? `Grade: ${calculateGrade(independentGradeMarks)}` : "No marks received"}
                  </strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px', fontStyle: 'italic' }}>
                    *Child B knows nothing about Child A's input!
                  </div>
                </div>
              </div>

              {/* Option B: WITH State Lifting */}
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '1.5rem', borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#15803d', fontWeight: 800, margin: 0 }}>Lifted Parent state</h4>
                  <span style={{ background: '#10b981', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 12 }}>Lifted Up</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '1rem' }}>The state lives in the parent container. Child A dispatches updates up; Child B reads down.</p>
                
                {/* Child A */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 12, border: '1px solid #86efac', marginBottom: '1rem' }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#15803d', fontWeight: 'bold' }}>Child A (MarksInput)</h5>
                  <label style={{ fontSize: '0.75rem', display: 'block', color: '#64748b', marginBottom: '4px' }}>Enter Marks (updates parent):</label>
                  <input 
                    type="number" 
                    placeholder="Enter marks"
                    value={liftedMarks}
                    onChange={(e) => setLiftedMarks(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>Shared marks: {liftedMarks || "none"}</div>
                </div>

                {/* Child B */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 12, border: '1px solid #86efac' }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#15803d', fontWeight: 'bold' }}>Child B (GradeDisplay)</h5>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>Calculated grade via parent prop:</div>
                  <strong style={{ fontSize: '1rem', color: '#10b981' }}>
                    {liftedMarks !== "" ? `Grade: ${calculateGrade(liftedMarks)}` : "Enter marks to see grade"}
                  </strong>
                  <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>
                    *Updates immediately as parent state syncs!
                  </div>
                </div>
              </div>

            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginTop: '3rem', marginBottom: '1rem' }}>Code Implementation comparison</h3>
            <p>Compare the files used in the lifted structure below:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
              <CodeBlock title="components/MarksInput.jsx" code={`import React from "react";

function MarksInput({ setMarks }) {
  return (
    <div>
      <h3>Enter Marks</h3>
      <input
        type="number"
        placeholder="Enter marks"
        onChange={(e) => setMarks(e.target.value)}
      />
    </div>
  );
}
export default MarksInput;`} />

              <CodeBlock title="components/GradeDisplay.jsx" code={`import React from "react";

function GradeDisplay({ marks }) {
  let grade = "";

  if (marks >= 90) grade = "A";
  else if (marks >= 75) grade = "B";
  else if (marks >= 60) grade = "C";
  else if (marks !== "") grade = "Fail";

  return (
    <div>
      <h3>Grade</h3>
      <p>{marks ? \`Grade: \${grade}\` : "Enter marks to see grade"}</p>
    </div>
  );
}
export default GradeDisplay;`} />
            </div>

            <div style={{ width: '100%' }}>
              <CodeBlock title="App.jsx (State Owner)" code={`import React, { useState } from "react";
import MarksInput from "./components/MarksInput";
import GradeDisplay from "./components/GradeDisplay";

function App() {
  const [marks, setMarks] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Grade App</h1>
      <MarksInput setMarks={setMarks} />
      <GradeDisplay marks={marks} />
    </div>
  );
}
export default App;`} />
            </div>

            {/* Comparison summary table (Page 13) */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '3rem', marginBottom: '1.2rem' }}>State Lifting vs Props drilling summary</h3>
            
            <div style={{ padding: '1rem 1.5rem', background: '#e0f2fe', borderLeft: '4px solid #0284c7', borderRadius: '4px 12px 12px 4px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.92rem', color: '#0369a1' }}>💡 <strong>State lifting is about WHERE state lives</strong></span>
              <span style={{ fontSize: '0.92rem', color: '#0369a1' }}>💡 <strong>Props drilling is about HOW props travel</strong></span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#334155' }}>Concept</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#334155' }}>Question it Answers</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>State Lifting</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>"Where should state live?"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>Props</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>"How does data move down?"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>Callback Props</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>"How does data move up?"</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>Props Drilling</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>"Is data passing through too many layers?"</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Go to Module Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 4 Interactive Quiz">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {quizQuestions.map((item, qi) => (
                <div key={item.key} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0' }}>{qi + 1}. {item.question}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.options.map((opt, oi) => {
                      const isSelected = quizAnswers[item.key] === oi;
                      const isCorrect = oi === item.correct;
                      let bg = "white";
                      let border = "1px solid #cbd5e1";
                      if (quizChecked) {
                        if (isCorrect) { bg = "#dcfce7"; border = "1.5px solid #10b981"; }
                        else if (isSelected) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; }
                      } else if (isSelected) {
                        bg = "#e0f2fe"; border = "1.5px solid #0ea5e9";
                      }
                      return (
                        <button
                          key={oi}
                          disabled={quizChecked}
                          onClick={() => handleQuizAnswer(item.key, oi)}
                          style={{ background: bg, border: border, padding: '0.6rem 1rem', borderRadius: 8, cursor: quizChecked ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!quizChecked ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setQuizChecked(true)} 
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: '150px' }}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => { setQuizAnswers({}); setQuizChecked(false); }}
                      style={{ minWidth: '150px' }}
                    >
                      Retry Quiz
                    </button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: getQuizScore() === quizQuestions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {getQuizScore()} / {quizQuestions.length} ({Math.round((getQuizScore() / quizQuestions.length) * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 4 Assignment: State & useState">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>🎓 Day 4 Syllabus Completed!</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Awesome job! You have fully mastered component state, array/object pointer immutability, nested property modifications, and the core guidelines of lifting state up. Now complete your homework assignment.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>📋 Homework Assignments</h4>
            {[
              { num: 1, title: 'Build a Controlled Profile Editor', icon: '👤', desc: 'Create a ProfileEditor component. Maintain state as an object { username: "", bio: "", email: "" }. Implement inputs for each property updating state correctly using the spread operator. Display the updated profile cards live below the form.', hint: 'Remember to copy the previous object reference first via {...prevState}!' },
              { num: 2, title: 'Interactive Shopping List', icon: '🛒', desc: 'Build a list editor where users can input an item name and quantity. Store it in state as an array of objects. Add buttons to append new items (copying array reference), increment individual quantities, and remove/filter items.', hint: 'Use map() for incrementing quantity and filter() for item removals.' },
              { num: 3, title: 'Color Picker (State Lifting)', desc: 'Build App ➔ ColorSelector (Child 1) and PanelDisplay (Child 2). ColorSelector contains color buttons. Click a button to lift selected color state to App, which passes it down to PanelDisplay to change its background color.', hint: 'Pass setSelectColor callback down to Child 1 as prop, and selectedColor value down to Child 2.', icon: '🎨' }
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>Task {task.num}: {task.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 0.75rem' }}>{task.desc}</p>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#1d4ed8' }}>
                      💡 Hint: {task.hint}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <BookOpenCheck size={36} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Submit Day 4 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save your code scripts inside the local playground repository workspace and sync to complete module validation.</p>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
