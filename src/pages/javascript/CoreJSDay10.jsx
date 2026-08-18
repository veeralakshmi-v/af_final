import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity } from 'lucide-react';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, style = {} }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto', ...style }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|parseInt|parseFloat|isNaN|alert|fetch|Promise|Error|JSON|Response|then|resolve|reject)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return (
          <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
            {tokens.length > 0 ? tokens : line}
          </div>
        );
      })}
    </div>
  );
};

const quizQuestions = [
  { id: 'q1', q: 'What are the three states of a JavaScript Promise?', options: ['start, running, done', 'pending, fulfilled, rejected', 'open, closed, error', 'waiting, resolved, failed'], ans: 1 },
  { id: 'q2', q: 'Which keyword pauses execution inside an async function until a promise resolves?', options: ['yield', 'pause', 'await', 'defer'], ans: 2 },
  { id: 'q3', q: 'What does fetch() return?', options: ['A string of HTML', 'A JSON object directly', 'A Promise that resolves to a Response object', 'An XMLHttpRequest'], ans: 2 },
  { id: 'q4', q: 'How do you parse JSON from a fetch Response?', options: ['response.text()', 'JSON.parse(response)', 'response.json()', 'response.data'], ans: 2 },
  { id: 'q5', q: 'In try/catch, when does the finally block run?', options: ['Only when there is an error', 'Only on success', 'Always, regardless of success or error', 'Never automatically'], ans: 2 }
];

export default function CoreJSDay10({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Promise demo states
  const [promiseStatus, setPromiseStatus] = useState('idle');
  const [promiseResult, setPromiseResult] = useState('');

  // Fetch API demo states
  const [fetchResult, setFetchResult] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Mini Project 1: Weather Dashboard states
  const [weatherCity, setWeatherCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Mini Project 2: GitHub User Finder states
  const [githubUsername, setGithubUsername] = useState('');
  const [githubUser, setGithubUser] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState('');

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// Day 10: Fetch API + Async/Await
async function getUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await res.json();
    console.log("Name: " + user.name);
    console.log("Email: " + user.email);
    console.log("City: " + user.address.city);
  } catch (err) {
    console.log("Error: " + err.message);
  }
}
getUser();`);
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to view output here...');

  const editorRef = useRef(null);
  const highlighterRef = useRef(null);

  const handleEditorScroll = () => {
    if (editorRef.current && highlighterRef.current) {
      highlighterRef.current.scrollTop = editorRef.current.scrollTop;
      highlighterRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const handleMsg = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' || prev.startsWith('⚠️') ? '' : prev + '\n';
          return base + event.data.log;
        });
      } else if (event.data && event.data.type === 'CONSOLE_ERROR') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' ? '' : prev + '\n';
          return base + `⚠️ Error: ${event.data.error}`;
        });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const handleContinue = (nextTabId) => {
    onNavigate('core_js_day10', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Promise Demo Handler
  const runPromiseDemo = (shouldSucceed) => {
    setPromiseStatus('pending');
    setPromiseResult('');
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) resolve("✅ Data fetched successfully! (resolved)");
        else reject(new Error("❌ Network timeout! (rejected)"));
      }, 1500);
    });
    p.then(result => {
      setPromiseStatus('fulfilled');
      setPromiseResult(result);
    }).catch(err => {
      setPromiseStatus('rejected');
      setPromiseResult(err.message);
    });
  };

  // Fetch API Demo Handler
  const runFetchDemo = async () => {
    setFetchLoading(true);
    setFetchError('');
    setFetchResult(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFetchResult(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  // Weather Dashboard Handler (uses wttr.in free API)
  const fetchWeather = async () => {
    if (!weatherCity.trim()) return;
    setWeatherLoading(true);
    setWeatherError('');
    setWeatherData(null);
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(weatherCity.trim())}?format=j1`);
      if (!res.ok) throw new Error(`City not found (HTTP ${res.status})`);
      const data = await res.json();
      const current = data.current_condition[0];
      setWeatherData({
        city: weatherCity.trim(),
        temp: current.temp_C,
        feelsLike: current.FeelsLikeC,
        humidity: current.humidity,
        windSpeed: current.windspeedKmph,
        desc: current.weatherDesc[0].value,
        icon: current.weatherIconUrl[0].value
      });
    } catch (err) {
      setWeatherError(err.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  // GitHub User Finder Handler
  const fetchGithubUser = async () => {
    if (!githubUsername.trim()) return;
    setGithubLoading(true);
    setGithubError('');
    setGithubUser(null);
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(githubUsername.trim())}`);
      if (!res.ok) throw new Error(res.status === 404 ? 'User not found!' : `HTTP Error ${res.status}`);
      const data = await res.json();
      setGithubUser({
        name: data.name || data.login,
        login: data.login,
        avatar: data.avatar_url,
        bio: data.bio || 'No bio available.',
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        location: data.location || 'Not specified',
        profileUrl: data.html_url
      });
    } catch (err) {
      setGithubError(err.message);
    } finally {
      setGithubLoading(false);
    }
  };

  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);
    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (name) => {
    if (name === 'promise') {
      setEditorCode(`// Creating & consuming a Promise
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  setTimeout(() => {
    if (success) resolve("Data loaded!");
    else reject("Failed to load data.");
  }, 1000);
});

myPromise
  .then(result => console.log("Success: " + result))
  .catch(err => console.log("Error: " + err))
  .finally(() => console.log("Promise settled."));`);
    } else if (name === 'async') {
      setEditorCode(`// Async/Await with Fetch
async function getPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/3");
    const post = await response.json();
    console.log("Title: " + post.title);
    console.log("Body: " + post.body.substring(0, 80) + "...");
  } catch (error) {
    console.log("Failed: " + error.message);
  } finally {
    console.log("Fetch complete.");
  }
}
getPost();`);
    } else if (name === 'fetch') {
      setEditorCode(`// Fetch multiple users with Promise.all
async function getMultipleUsers() {
  try {
    const urls = [1, 2, 3].map(id =>
      fetch("https://jsonplaceholder.typicode.com/users/" + id)
    );
    const responses = await Promise.all(urls);
    const users = await Promise.all(responses.map(r => r.json()));
    users.forEach(u => console.log(u.name + " - " + u.email));
  } catch (err) {
    console.log("Error: " + err.message);
  }
}
getMultipleUsers();`);
    } else if (name === 'error') {
      setEditorCode(`// Error Handling with try/catch/finally
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero!");
  return a / b;
}

try {
  console.log("10 / 2 = " + divide(10, 2));
  console.log("10 / 0 = " + divide(10, 0));
} catch (err) {
  console.log("Caught: " + err.message);
} finally {
  console.log("Division operation complete.");
}`);
    } else if (name === 'chaining') {
      setEditorCode(`// Promise chaining
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => {
    console.log("Status: " + response.status);
    return response.json();
  })
  .then(user => {
    console.log("User: " + user.name);
    return fetch("https://jsonplaceholder.typicode.com/posts?userId=" + user.id);
  })
  .then(res => res.json())
  .then(posts => {
    console.log("Total Posts: " + posts.length);
    posts.slice(0, 3).forEach(p => console.log("  - " + p.title));
  })
  .catch(err => console.log("Chain Error: " + err.message));`);
    }
  };

  const handleSelectAnswer = (qId, idx) => setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c += 1; });
    setScore(c);
  };

  return (
    <AnimatePresence mode="wait">

      {/* ── TAB 1: PROMISES ──────────────── */}
      {activeTab === 'promises' && (
        <Section key="promises" eyebrow="Day 10 • Modern JS" title="JavaScript Promises">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              A <strong>Promise</strong> is an object representing the eventual completion or failure of an asynchronous operation. It allows you to attach handlers for success or failure instead of passing callbacks.
            </p>

            {/* Real-World Zomato Analogy */}
            <div style={{ background: 'linear-gradient(135deg, #fff7ed, #fffbeb)', border: '2px solid #fb923c', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ color: '#ea580c', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🍕 Real-World Example: Zomato Food Order
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.2rem', fontSize: '0.92rem' }}>
                Think of a Promise like placing a food order on <strong>Zomato</strong>. When you order, you get a <em>promise</em> that your food will arrive. You don't get the food immediately — it takes time. While the kitchen prepares your order, you can continue browsing or watching TV (non-blocking!).
              </p>

              {/* Visual Timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#fffbeb', border: '2px solid #fbbf24', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>📱</div>
                  <div style={{ fontWeight: 800, color: '#f59e0b', marginBottom: '0.2rem' }}>PENDING</div>
                  <div style={{ fontSize: '0.78rem', color: '#92400e' }}>Order placed...<br/>Kitchen is preparing</div>
                </div>
                <div style={{ background: '#ecfdf5', border: '2px solid #34d399', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🛵</div>
                  <div style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.2rem' }}>FULFILLED</div>
                  <div style={{ fontSize: '0.78rem', color: '#065f46' }}>Food delivered! ✅<br/>Enjoy your meal</div>
                </div>
                <div style={{ background: '#fef2f2', border: '2px solid #f87171', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>❌</div>
                  <div style={{ fontWeight: 800, color: '#ef4444', marginBottom: '0.2rem' }}>REJECTED</div>
                  <div style={{ fontSize: '0.78rem', color: '#991b1b' }}>Restaurant closed!<br/>Order cancelled</div>
                </div>
              </div>

              {/* Code Example */}
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
                <SyntaxHighlighter code={`// 🍕 Zomato Order as a Promise
const zomatoOrder = new Promise((resolve, reject) => {
  console.log("📱 Order placed... preparing your Biryani!");
  
  setTimeout(() => {
    let restaurantOpen = true;
    
    if (restaurantOpen) {
      resolve("🛵 Your Biryani has been delivered!");
    } else {
      reject("❌ Sorry, restaurant is closed.");
    }
  }, 3000); // takes 3 seconds to deliver
});

// You can do other things while waiting (non-blocking!)
console.log("📺 Watching TV while waiting for food...");

// Handle the result
zomatoOrder
  .then(message => console.log(message))    // food delivered!
  .catch(error => console.log(error))       // order failed
  .finally(() => console.log("🧹 Cleaning the table."));

// Output order:
// 📱 Order placed... preparing your Biryani!
// 📺 Watching TV while waiting for food...
// (after 3 sec) 🛵 Your Biryani has been delivered!
// 🧹 Cleaning the table.`} />
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Promise States</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { state: 'Pending', desc: 'Initial state — neither fulfilled nor rejected.', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
                { state: 'Fulfilled', desc: 'The operation completed successfully.', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
                { state: 'Rejected', desc: 'The operation failed with an error.', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
              ].map(s => (
                <div key={s.state} style={{ background: s.bg, border: `2px solid ${s.border}`, borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: s.color, fontSize: '1.1rem', marginBottom: '0.3rem' }}>{s.state}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{s.desc}</div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Creating &amp; Consuming Promises</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Operation completed!");
  } else {
    reject("Something went wrong.");
  }
});

// Consuming with .then() / .catch() / .finally()
myPromise
  .then(result => console.log(result))   // on success
  .catch(error => console.log(error))    // on failure
  .finally(() => console.log("Done!"));  // always runs`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Promise.all() &amp; Promise.race()</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#ca8a04', margin: '0 0 0.5rem 0' }}>Promise.all()</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.8rem' }}>Waits for <strong>all</strong> promises to resolve. Rejects if any one fails.</p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`Promise.all([fetch(url1), fetch(url2)])
  .then(responses => console.log("All done!"))
  .catch(err => console.log("One failed"));`} />
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#ca8a04', margin: '0 0 0.5rem 0' }}>Promise.race()</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.8rem' }}>Returns the result of the <strong>first</strong> promise to settle (resolve or reject).</p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`Promise.race([slowFetch, fastFetch])
  .then(first => console.log("Winner:", first));`} />
                </div>
              </div>
            </div>

            {/* Interactive Promise Demo */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.8rem' }}>⚡ Live Promise Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Click to create a promise that resolves after 1.5 seconds. Watch the state transition live!
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => runPromiseDemo(true)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>
                  Resolve Promise ✓
                </button>
                <button onClick={() => runPromiseDemo(false)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>
                  Reject Promise ✗
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.88rem',
                  background: promiseStatus === 'pending' ? '#fffbeb' : promiseStatus === 'fulfilled' ? '#ecfdf5' : promiseStatus === 'rejected' ? '#fef2f2' : '#f1f5f9',
                  color: promiseStatus === 'pending' ? '#f59e0b' : promiseStatus === 'fulfilled' ? '#10b981' : promiseStatus === 'rejected' ? '#ef4444' : '#94a3b8',
                  border: `1px solid ${promiseStatus === 'pending' ? '#fde68a' : promiseStatus === 'fulfilled' ? '#a7f3d0' : promiseStatus === 'rejected' ? '#fecaca' : '#e2e8f0'}`
                }}>
                  State: {promiseStatus === 'idle' ? 'Not started' : promiseStatus.toUpperCase()}
                  {promiseStatus === 'pending' && ' ⏳'}
                </div>
                {promiseResult && <span style={{ fontSize: '0.88rem', color: '#475569' }}>{promiseResult}</span>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('async_await')}>
              Next: Async &amp; Await →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: ASYNC/AWAIT ───────────── */}
      {activeTab === 'async_await' && (
        <Section key="async_await" eyebrow="Day 10 • Async" title="Async &amp; Await">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              <code>async</code> and <code>await</code> are ES2017 keywords that make asynchronous JavaScript code easier to read and write. They work on top of Promises but remove the need for <code>.then()</code> chaining.
            </p>

            {/* Definition Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #3b82f6', borderRadius: '12px', padding: '1.2rem' }}>
                <h4 style={{ color: '#1d4ed8', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>🔹 <code>async</code> keyword</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  <li>Placed <strong>before a function declaration</strong> to make it asynchronous.</li>
                  <li>An <code>async</code> function <strong>always returns a Promise</strong>, even if you return a plain value.</li>
                  <li>Enables you to use the <code>await</code> keyword inside it.</li>
                </ul>
                <div style={{ background: '#0f172a', padding: '0.6rem', borderRadius: '6px', marginTop: '0.8rem' }}>
                  <SyntaxHighlighter code={`async function greet() {
  return "Hello!";
}
// greet() returns Promise<"Hello!">`} />
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '2px solid #10b981', borderRadius: '12px', padding: '1.2rem' }}>
                <h4 style={{ color: '#065f46', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>🔹 <code>await</code> keyword</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  <li><strong>Pauses</strong> the execution of the <code>async</code> function until the Promise resolves.</li>
                  <li>Returns the <strong>resolved value</strong> of the Promise (not the Promise object).</li>
                  <li>Can <strong>only be used inside</strong> an <code>async</code> function.</li>
                </ul>
                <div style={{ background: '#0f172a', padding: '0.6rem', borderRadius: '6px', marginTop: '0.8rem' }}>
                  <SyntaxHighlighter code={`async function getUser() {
  const res = await fetch(url); // pauses here
  const user = await res.json();  // pauses here
  console.log(user.name); // runs after both resolve
}`} />
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Syntax &amp; Usage</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Function Declaration
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}

// Arrow Function Variant
const getData = async () => {
  const res = await fetch("https://api.example.com/items");
  return await res.json();
};`} />
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#92400e', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={18} /> Key Rules
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem' }}>
                <li><code>await</code> can <strong>only</strong> be used inside an <code>async</code> function.</li>
                <li>An <code>async</code> function <strong>always</strong> returns a Promise.</li>
                <li>If <code>await</code> receives a rejected promise, it <strong>throws</strong> an error — wrap in <code>try/catch</code>!</li>
                <li>Multiple <code>await</code> calls run sequentially. Use <code>Promise.all()</code> for parallel execution.</li>
              </ul>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Comparison: .then() Chaining vs Async/Await</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#64748b', margin: '0 0 0.5rem 0' }}>Promise .then() Chaining</h4>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.name);
  })
  .catch(err => console.log(err));`} />
                </div>
              </div>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#065f46', margin: '0 0 0.5rem 0' }}>✨ Async/Await (Cleaner!)</h4>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.name);
  } catch (err) {
    console.log(err);
  }
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'promises')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('fetch_api')}>Next: Fetch API →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: FETCH API ─────────────── */}
      {activeTab === 'fetch_api' && (
        <Section key="fetch_api" eyebrow="Day 10 • Fetch" title="Fetch API">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The <strong>Fetch API</strong> provides a modern JavaScript interface for making HTTP requests. It returns a Promise that resolves to a <code>Response</code> object.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>GET Request</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Simple GET request
async function getPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await response.json();
  console.log(post.title);
}
getPost();`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>POST Request</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// POST request with JSON body
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "My Post",
      body: "Post content here",
      userId: 1
    })
  });
  const created = await response.json();
  console.log("Created post ID:", created.id);
}
createPost();`} />
            </div>

            {/* Live Fetch Demo */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.8rem' }}>🌐 Live Fetch Demo</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Click to fetch a blog post from JSONPlaceholder API using <code>async/await</code>:
              </p>
              <button onClick={runFetchDemo} disabled={fetchLoading} style={{ background: fetchLoading ? '#94a3b8' : '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '6px', cursor: fetchLoading ? 'wait' : 'pointer', fontWeight: 700, marginBottom: '1rem' }}>
                {fetchLoading ? '⏳ Fetching...' : '🚀 Fetch Post #1'}
              </button>
              {fetchError && <p style={{ color: '#ef4444', fontWeight: 600, margin: '0.5rem 0' }}>Error: {fetchError}</p>}
              {fetchResult && (
                <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>{fetchResult.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{fetchResult.body}</div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>Post ID: {fetchResult.id} | User ID: {fetchResult.userId}</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'async_await')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('error_handling')}>Next: Error Handling →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: ERROR HANDLING ─────────── */}
      {activeTab === 'error_handling' && (
        <Section key="error_handling" eyebrow="Day 10 • Errors" title="Error Handling (try / catch / finally)">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              Error handling prevents your program from crashing when unexpected things happen. JavaScript provides the <code>try...catch...finally</code> statement to handle runtime errors gracefully.
            </p>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`try {
  // Code that might throw an error
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  // Runs only if an error was thrown
  console.log("Error caught: " + error.message);
} finally {
  // Always runs, regardless of success or failure
  console.log("Cleanup complete.");
}`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Throwing Custom Errors</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`function validateAge(age) {
  if (typeof age !== "number") throw new TypeError("Age must be a number!");
  if (age < 0 || age > 150)   throw new RangeError("Age must be 0-150!");
  return "Valid age: " + age;
}

try {
  console.log(validateAge(25));    // "Valid age: 25"
  console.log(validateAge("abc")); // throws TypeError
} catch (err) {
  console.log(err.name + ": " + err.message);
}`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Error Handling with Fetch</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("HTTP Error: " + res.status);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Fetch failed: " + err.message);
    return null; // return fallback value
  } finally {
    console.log("Request finished.");
  }
}`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'fetch_api')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: MINI PROJECT 1 — Weather Dashboard ──── */}
      {activeTab === 'mini_project_1' && (
        <Section key="mini_project_1" eyebrow="Day 10 • Demo Project 1" title="🌦️ Weather Dashboard">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project uses <code>async/await</code> with the <strong>Fetch API</strong> to retrieve real-time weather data from the <strong>wttr.in</strong> free weather API. It includes full <code>try/catch/finally</code> error handling.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              {/* Live App */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #3b82f6', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem' }}>🌦️ Live Weather Dashboard</h4>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <input type="text" value={weatherCity} onChange={e => setWeatherCity(e.target.value)} placeholder="Enter city name..."
                    onKeyDown={e => e.key === 'Enter' && fetchWeather()}
                    style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  <button onClick={fetchWeather} disabled={weatherLoading}
                    style={{ background: weatherLoading ? '#94a3b8' : '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: weatherLoading ? 'wait' : 'pointer', fontWeight: 700 }}>
                    {weatherLoading ? '⏳' : '🔍 Search'}
                  </button>
                </div>

                {weatherError && <p style={{ color: '#ef4444', fontWeight: 600, background: '#fef2f2', padding: '8px', borderRadius: '6px' }}>❌ {weatherError}</p>}

                {weatherData && (
                  <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '12px', padding: '1.5rem', color: '#fff' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.3rem' }}>📍 {weatherData.city}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>{weatherData.desc}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900 }}>{weatherData.temp}°C</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Temperature</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900 }}>{weatherData.feelsLike}°C</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Feels Like</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{weatherData.humidity}%</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Humidity</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{weatherData.windSpeed} km/h</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Wind Speed</div>
                      </div>
                    </div>
                  </div>
                )}

                {!weatherData && !weatherError && !weatherLoading && (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem', fontSize: '0.9rem' }}>
                    Enter a city name and click Search to get weather data
                  </div>
                )}
              </div>

              {/* Source Code */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>💻 Full Source Code</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '500px' }}>
                  <SyntaxHighlighter code={`<!-- index.html -->
<input id="cityInput" placeholder="Enter city" />
<button onclick="fetchWeather()">Search</button>
<div id="weatherResult"></div>

<script>
async function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");
  
  if (!city.trim()) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  resultDiv.textContent = "Loading...";

  try {
    const response = await fetch(
      "https://wttr.in/" + encodeURIComponent(city) + "?format=j1"
    );

    if (!response.ok) {
      throw new Error("City not found (HTTP " + response.status + ")");
    }

    const data = await response.json();
    const current = data.current_condition[0];

    resultDiv.innerHTML = 
      "<h3>" + city + "</h3>" +
      "<p>Temperature: " + current.temp_C + "°C</p>" +
      "<p>Feels Like: " + current.FeelsLikeC + "°C</p>" +
      "<p>Humidity: " + current.humidity + "%</p>" +
      "<p>Wind: " + current.windspeedKmph + " km/h</p>" +
      "<p>Description: " + current.weatherDesc[0].value + "</p>";

  } catch (error) {
    resultDiv.textContent = "Error: " + error.message;
  }
}
</script>`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'assessment')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('mini_project_2')}>Next: Mini Project 2 →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: MINI PROJECT 2 — GitHub User Finder ──── */}
      {activeTab === 'mini_project_2' && (
        <Section key="mini_project_2" eyebrow="Day 10 • Demo Project 2" title="👤 GitHub User Finder">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project uses the <strong>GitHub REST API</strong> to search for user profiles. It demonstrates <code>fetch()</code>, <code>async/await</code>, <code>try/catch</code> error handling, and dynamic DOM rendering.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              {/* Live App */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 12px rgba(202,138,4,0.1)' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>👤 GitHub Profile Finder</h4>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} placeholder="Enter GitHub username..."
                    onKeyDown={e => e.key === 'Enter' && fetchGithubUser()}
                    style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  <button onClick={fetchGithubUser} disabled={githubLoading}
                    style={{ background: githubLoading ? '#94a3b8' : '#ca8a04', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: githubLoading ? 'wait' : 'pointer', fontWeight: 700 }}>
                    {githubLoading ? '⏳' : '🔍 Search'}
                  </button>
                </div>

                {githubError && <p style={{ color: '#ef4444', fontWeight: 600, background: '#fef2f2', padding: '8px', borderRadius: '6px' }}>❌ {githubError}</p>}

                {githubUser && (
                  <div style={{ textAlign: 'center' }}>
                    <img src={githubUser.avatar} alt={githubUser.name} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #ca8a04', marginBottom: '0.8rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e293b' }}>{githubUser.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>@{githubUser.login}</div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>{githubUser.bio}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ fontWeight: 800, color: '#ca8a04', fontSize: '1.2rem' }}>{githubUser.repos}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Repos</div>
                      </div>
                      <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ fontWeight: 800, color: '#3b82f6', fontSize: '1.2rem' }}>{githubUser.followers}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Followers</div>
                      </div>
                      <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.2rem' }}>{githubUser.following}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Following</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>📍 {githubUser.location}</div>
                    <a href={githubUser.profileUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '0.4rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                      View Profile on GitHub →
                    </a>
                  </div>
                )}

                {!githubUser && !githubError && !githubLoading && (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem', fontSize: '0.9rem' }}>
                    Try: <strong>torvalds</strong>, <strong>gaearon</strong>, or <strong>getify</strong>
                  </div>
                )}
              </div>

              {/* Source Code */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>💻 Full Source Code</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '500px' }}>
                  <SyntaxHighlighter code={`<!-- index.html -->
<input id="usernameInput" placeholder="GitHub username" />
<button onclick="searchUser()">Search</button>
<div id="profileCard"></div>

<script>
async function searchUser() {
  const username = document.getElementById("usernameInput").value;
  const card = document.getElementById("profileCard");

  if (!username.trim()) {
    card.textContent = "Please enter a username.";
    return;
  }

  card.textContent = "Searching...";

  try {
    const response = await fetch(
      "https://api.github.com/users/" + encodeURIComponent(username)
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found!");
      }
      throw new Error("HTTP Error " + response.status);
    }

    const user = await response.json();

    card.innerHTML =
      '<img src="' + user.avatar_url + '" width="100" />' +
      "<h3>" + (user.name || user.login) + "</h3>" +
      "<p>" + (user.bio || "No bio") + "</p>" +
      "<p>Repos: " + user.public_repos + "</p>" +
      "<p>Followers: " + user.followers + "</p>" +
      "<p>Location: " + (user.location || "N/A") + "</p>" +
      '<a href="' + user.html_url + '" target="_blank">View Profile</a>';

  } catch (error) {
    card.innerHTML = '<p style="color:red;">' + error.message + '</p>';
  }
}
</script>`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'mini_project_1')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('submissions')}>Next: Project Submissions →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: SUBMISSION PROJECTS ─────── */}
      {activeTab === 'submissions' && (
        <Section key="submissions" eyebrow="Day 10 • Submissions" title="📋 Project Titles for Submission">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Choose <strong>one</strong> of the following project ideas to build and submit. Each project must use <code>fetch()</code>, <code>async/await</code>, Promises, and proper <code>try/catch</code> error handling.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Project 1 */}
              <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', border: '2px solid #f59e0b', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <span style={{ background: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem' }}>PROJECT 1</span>
                  <h3 style={{ margin: 0, color: '#92400e', fontSize: '1.2rem' }}>🍽️ Recipe Finder App</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Build a Recipe Finder that fetches recipes from <strong>TheMealDB</strong> free API (<code>www.themealdb.com/api/json/v1/1/search.php?s=chicken</code>).
                </p>
                <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '0.95rem' }}>Requirements:</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.85rem' }}>
                    <li>Search bar to enter a food name (e.g. &quot;pasta&quot;, &quot;chicken&quot;)</li>
                    <li>Display recipe name, category, image, and instructions</li>
                    <li>Show ingredient list with measurements</li>
                    <li>Handle errors: empty search, no results found, network failure</li>
                    <li>Loading spinner while fetching data</li>
                  </ul>
                </div>
              </div>

              {/* Project 2 */}
              <div style={{ background: 'linear-gradient(135deg, #dbeafe, #eff6ff)', border: '2px solid #3b82f6', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <span style={{ background: '#3b82f6', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem' }}>PROJECT 2</span>
                  <h3 style={{ margin: 0, color: '#1e40af', fontSize: '1.2rem' }}>🎬 Movie Search Engine</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Build a Movie Search Engine using the <strong>OMDB API</strong> (<code>www.omdbapi.com/?apikey=YOUR_KEY&amp;s=avengers</code>). Register for a free API key.
                </p>
                <div style={{ background: '#fff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '0.95rem' }}>Requirements:</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.85rem' }}>
                    <li>Search input for movie titles</li>
                    <li>Display a grid of movie cards with poster, title, and year</li>
                    <li>Click a card to fetch and show full details (director, actors, plot, rating)</li>
                    <li>Use <code>Promise.all()</code> to fetch details for multiple movies</li>
                    <li>Handle &quot;Movie not found&quot; and network errors gracefully</li>
                  </ul>
                </div>
              </div>

              {/* Project 3 */}
              <div style={{ background: 'linear-gradient(135deg, #d1fae5, #ecfdf5)', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <span style={{ background: '#10b981', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem' }}>PROJECT 3</span>
                  <h3 style={{ margin: 0, color: '#065f46', fontSize: '1.2rem' }}>💱 Currency Converter</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Build a Currency Converter using the <strong>ExchangeRate API</strong> (<code>api.exchangerate-api.com/v4/latest/USD</code>).
                </p>
                <div style={{ background: '#fff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#065f46', fontSize: '0.95rem' }}>Requirements:</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.85rem' }}>
                    <li>Dropdowns to select &quot;From&quot; and &quot;To&quot; currencies</li>
                    <li>Input field for amount to convert</li>
                    <li>Display converted amount with exchange rate</li>
                    <li>Swap button to reverse currencies</li>
                    <li>Handle invalid amounts and API failures with <code>try/catch</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'mini_project_2')}>← Back</button>
          </div>
        </Section>
      )}

      {/* ── TAB 8: PLAYGROUND ──────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Select a preset to load Modern JS sample scripts, then run them live:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['promise',  '⚡ Promise demo'],
                ['async',    '⏳ Async/Await fetch'],
                ['fetch',    '🌐 Promise.all fetch'],
                ['error',    '🛡️ Error handling'],
                ['chaining', '🔗 Promise chaining'],
              ].map(([key, label]) => (
                <button key={key} onClick={() => loadPresetSnippet(key)}
                  style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Editor */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Source Code Editor</span>
                  <button onClick={executePlaygroundCode} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.3rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Run Code &rarr;
                  </button>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '320px', background: '#0f172a' }}>
                  <div ref={highlighterRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', pointerEvents: 'none', whiteSpace: 'pre', overflow: 'hidden', margin: 0 }}>
                    <SyntaxHighlighter code={editorCode} style={{ overflowX: 'visible' }} />
                  </div>
                  <textarea ref={editorRef} value={editorCode} onChange={e => setEditorCode(e.target.value)} onScroll={handleEditorScroll} wrap="off"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', background: 'transparent', color: 'transparent', caretColor: '#fff', resize: 'none', outline: 'none', border: 'none', whiteSpace: 'pre', overflow: 'auto', margin: 0 }} />
                </div>
              </div>

              {/* Output */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.4rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {['console', 'preview'].map(mode => (
                    <button key={mode} onClick={() => setPlaygroundMode(mode)}
                      style={{ background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: 700, color: playgroundMode === mode ? '#ca8a04' : '#64748b', borderBottom: playgroundMode === mode ? '2px solid #ca8a04' : '2px solid transparent', padding: '0.3rem 0.5rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                      {mode === 'console' ? 'Console Logs' : 'Live Page Preview'}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, minHeight: '320px', background: '#1e293b', position: 'relative' }}>
                  {playgroundMode === 'console' ? (
                    <pre style={{ margin: 0, padding: '1rem', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, fontFamily: 'monospace', fontSize: '0.88rem', background: '#1e293b', color: '#38bdf8', overflowY: 'auto', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {consoleOutput}
                    </pre>
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
                      {runTrigger > 0 ? (
                        <iframe
                          key={runTrigger}
                          srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;margin:10px;}</style></head><body><script>const _l=console.log;console.log=(...a)=>{_l(...a);window.parent.postMessage({type:'CONSOLE_LOG',log:a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ')},'*');};window.onerror=(m)=>{window.parent.postMessage({type:'CONSOLE_ERROR',error:m},'*');return false;};</script>${editorCode.includes('<html') || editorCode.includes('<script') ? editorCode : '<script>' + editorCode + '</script>'}</body></html>`}
                          title="Sandbox Preview"
                          sandbox="allow-scripts"
                          style={{ width: '100%', height: '320px', border: 'none' }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Click &quot;Run Code&quot; to render preview
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'error_handling')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 10 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 9: ASSESSMENT ─────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 10 • Assessment" title="Day 10 Assessment — Modern JS">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Pitfalls
            </h3>
            {[
              { mistake: 'Forgetting to parse JSON from fetch response', code: `// ❌ Wrong: response is a Response object, not JSON!\nconst data = await fetch("https://api.example.com/data");\nconsole.log(data.name); // undefined!\n\n// ✅ Correct: call .json() to parse the body\nconst response = await fetch("https://api.example.com/data");\nconst data = await response.json();\nconsole.log(data.name);` },
              { mistake: 'Using await outside an async function', code: `// ❌ SyntaxError!\nconst data = await fetch(url);\n\n// ✅ Correct: wrap in async function\nasync function getData() {\n  const data = await fetch(url);\n  return data.json();\n}` },
              { mistake: 'fetch() does not reject on HTTP errors (404, 500)', code: `// ❌ fetch resolves even for 404/500 status codes!\nconst res = await fetch("https://api.example.com/bad-url");\n// res.ok === false, but no error thrown!\n\n// ✅ Always check response.ok\nif (!res.ok) {\n  throw new Error("HTTP Error: " + res.status);\n}` },
            ].map(({ mistake, code }) => (
              <div key={mistake} style={{ border: '1px solid #fecaca', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.6rem 1rem', fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>⚠️ {mistake}</div>
                <div style={{ background: '#0f172a', padding: '0.75rem 1rem' }}><SyntaxHighlighter code={code} /></div>
              </div>
            ))}
          </div>

          {/* Quiz */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="#ca8a04" /> Quick Knowledge Check
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((question) => {
                const selected = selectedAnswers[question.id];
                const checked  = checkedQuestions[question.id];
                return (
                  <div key={question.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.2rem' }}>
                    <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{question.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {question.options.map((opt, idx) => {
                        let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                        if (selected === idx) { bg = '#fffbeb'; border = '1px solid #ca8a04'; color = '#92400e'; }
                        if (checked) {
                          if (idx === question.ans) { bg = '#f0fdf4'; border = '1px solid #10b981'; color = '#065f46'; }
                          else if (selected === idx) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; }
                        }
                        return (
                          <button key={idx} onClick={() => !checked && handleSelectAnswer(question.id, idx)}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border, background: bg, color, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontWeight: selected === idx ? 600 : 400 }}>
                            {['A', 'B', 'C', 'D'][idx]}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {!checked && selected !== undefined && (
                      <button onClick={() => handleCheckQuestion(question.id)} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.4rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                        Check Answer
                      </button>
                    )}
                    {checked && (
                      <div style={{ fontSize: '0.85rem', color: selected === question.ans ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                        {selected === question.ans ? '✅ Correct!' : `❌ Incorrect. Correct: ${['A','B','C','D'][question.ans]}. ${question.options[question.ans]}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={checkFinalScore} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Submit All &amp; Get Score
              </button>
              {score !== null && (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#ef4444' }}>
                  Score: {score}/{quizQuestions.length} — {score === 5 ? '🏆 Perfect!' : score >= 4 ? '🎉 Great job!' : score >= 3 ? '👍 Good effort!' : '📚 Keep practising!'}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day10', 'playground')}>← Back to Playground</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('mini_project_1')}>Next: Demo Projects →</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
