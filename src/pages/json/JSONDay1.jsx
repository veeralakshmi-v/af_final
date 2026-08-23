import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  Copy, Play, ArrowRight, Check, X, ShieldAlert, Laptop, Eye, HelpCircle
} from 'lucide-react';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#06b6d4', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, code }) => {
  const [cp, setCp] = useState(false);
  const hlJS = (c) => {
    let h = c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    h = h.replace(/(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
    h = h.replace(/(["'`])([\s\S]*?)\1/g, '<span style="color:#a5d6ff">$1$2$1</span>');
    ['stringify','parse','const','let','var','true','false','null','return'].forEach(k => {
      h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: h }} />;
  };
  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.2rem 0', overflowX: 'auto' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <button onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre' }}>
        <code>{hlJS(code)}</code>
      </pre>
    </div>
  );
};

/* ─────────────────────────────── main component ──────────────────────── */
export default function JSONDay1({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('json_module1', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Playground States ── */
  const [rawInput, setRawInput] = useState('{\n  "name": "Krishna",\n  "age": 21,\n  "isStudent": true\n}');
  const [parseResult, setParseResult] = useState(null);
  const [parseError, setParseError] = useState(null);

  // Data types tab state
  const [selectedType, setSelectedType] = useState('string');

  // Nested objects tab state
  const [nestedPath, setNestedPath] = useState('user.address.city');

  // Array of objects tab state
  const [arrayFilter, setArrayFilter] = useState('All');

  const sampleArrayOfObjects = [
    { id: 101, name: "Alice Johnson", role: "Developer", status: "Active", experience: 3 },
    { id: 102, name: "Bob Smith", role: "Designer", status: "Inactive", experience: 5 },
    { id: 103, name: "Charlie Brown", role: "Developer", status: "Active", experience: 2 },
    { id: 104, name: "Diana Prince", role: "Manager", status: "Active", experience: 7 }
  ];

  // Settings Manager States
  const [settings, setSettings] = useState({ theme: 'light', volume: 50, notifications: true });
  const [settingsJson, setSettingsJson] = useState('{\n  "theme": "light",\n  "volume": 50,\n  "notifications": true\n}');
  const [settingsLogs, setSettingsLogs] = useState(['LocalSettings initialized.']);

  const handleUpdateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    setSettingsLogs(prev => [...prev, `JS Object Updated: ${key} = ${value}`]);
  };

  const handleSaveSettings = () => {
    const jsonStr = JSON.stringify(settings, null, 2);
    setSettingsJson(jsonStr);
    setSettingsLogs(prev => [...prev, `JSON.stringify() executed: Saved to simulated local storage.`]);
  };

  const handleLoadSettings = () => {
    try {
      const parsed = JSON.parse(settingsJson);
      setSettings(parsed);
      setSettingsLogs(prev => [...prev, `JSON.parse() executed: Loaded settings into runtime object.`]);
    } catch (e) {
      setSettingsLogs(prev => [...prev, `Error parsing JSON settings! Invalid JSON.`]);
    }
  };

  const handleParse = () => {
    try {
      const parsed = JSON.parse(rawInput);
      setParseResult(JSON.stringify(parsed, null, 2));
      setParseError(null);
    } catch (err) {
      setParseError(err.message);
      setParseResult(null);
    }
  };

  const handleStringify = () => {
    try {
      // Safely evaluate standard JS object from input
      const obj = eval(`(${rawInput})`);
      setParseResult(JSON.stringify(obj, null, 2));
      setParseError(null);
    } catch (err) {
      setParseError('Failed to evaluate JS Object. E.g. { name: "Krishna" }');
      setParseResult(null);
    }
  };

  /* ── Assignment Answers Validation ── */
  const [asgnAnswers, setAsgnAnswers] = useState({
    asgn1: '',
    asgn3: '',
    asgn4: ''
  });
  const [asgnFeedback, setAsgnFeedback] = useState({});

  const validateAsgn1 = () => {
    try {
      const parsed = JSON.parse(asgnAnswers.asgn1);
      if (
        parsed.name === 'Krishna' &&
        parsed.age === 21 &&
        parsed.isStudent === true &&
        Array.isArray(parsed.courses) &&
        parsed.courses.includes('HTML') &&
        parsed.address &&
        parsed.address.city === 'Chennai'
      ) {
        setAsgnFeedback(prev => ({ ...prev, asgn1: { success: true, msg: 'Perfect! JSON format is correct and fields match.' } }));
      } else {
        setAsgnFeedback(prev => ({ ...prev, asgn1: { success: false, msg: 'Fields values or data types do not match assignment details.' } }));
      }
    } catch (err) {
      setAsgnFeedback(prev => ({ ...prev, asgn1: { success: false, msg: 'Invalid JSON format. Check double quotes, colons, and commas!' } }));
    }
  };

  const validateAsgn3 = () => {
    const val = asgnAnswers.asgn3.trim().replace(/\s/g, '');
    const target1 = '{"id":101,"name":"Laptop","price":45000}';
    if (val === target1 || val.includes('"id":101') && val.includes('"price":45000')) {
      setAsgnFeedback(prev => ({ ...prev, asgn3: { success: true, msg: 'Correct! JSON.stringify() output is correct.' } }));
    } else {
      setAsgnFeedback(prev => ({ ...prev, asgn3: { success: false, msg: 'Output string does not match the product JSON format.' } }));
    }
  };

  const validateAsgn4 = () => {
    const val = asgnAnswers.asgn4.trim().replace(/\s/g, '');
    if (val === '{name:"Arun",age:23}' || val === "{name:'Arun',age:23}" || val.includes('name:"Arun"') && val.includes('age:23') || val.includes('"name":"Arun"')) {
      setAsgnFeedback(prev => ({ ...prev, asgn4: { success: true, msg: 'Correct! JSON.parse() returned the JavaScript object.' } }));
    } else {
      setAsgnFeedback(prev => ({ ...prev, asgn4: { success: false, msg: 'Represent the output object properties correctly.' } }));
    }
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which of the following syntax layouts is a valid JSON string?',
      opts: ["{ name: 'Arun' }", "{ \"name\": \"Arun\" }", "{ 'name': 'Arun' }", "name: \"Arun\""], ans: 1,
      exp: 'In JSON, all keys and string values must be wrapped in double quotes. Single quotes or bare property names are invalid.' },
    { k: 'q2', q: 'What are the valid data types supported inside a JSON file structure?',
      opts: [
        'String, Number, Boolean, Null, Array, Object',
        'String, Number, Function, Date, Array',
        'Object, Array, RegExp, undefined, Null',
        'Class, Method, Variable, Parameter'
      ], ans: 0,
      exp: 'JSON supports Strings, Numbers, Booleans, Null, Arrays, and Objects. It does NOT support functions, undefined, or custom objects.' },
    { k: 'q3', q: 'Which method translates a JavaScript object into a JSON formatted string?',
      opts: ['JSON.parse()', 'JSON.stringify()', 'Object.toJSON()', 'String.parseJSON()'], ans: 1,
      exp: 'JSON.stringify() serializes a JS object into a JSON string. JSON.parse() deserializes a JSON string back into a JS object.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION ─────────────────────────────────────────────── */}
      {activeTab === 'intro_json' && (
        <Section key="intro_json" eyebrow="JSON • Module 01" title="What is JSON?">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg,#06b6d4,#0891b2)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🌐 JSON Overview</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                <strong>JSON</strong> stands for <strong>JavaScript Object Notation</strong>. It is a lightweight, text-based format for storing and transporting structured data, commonly used to exchange information between web browsers and remote API servers.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>JSON vs XML</h3>
            <p>Before JSON, XML was the standard. Let's compare their structures side-by-side:</p>

            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#cbd5e144', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: 10, textAlign: 'left' }}>Feature</th>
                    <th style={{ padding: 10, textAlign: 'left' }}>JSON</th>
                    <th style={{ padding: 10, textAlign: 'left' }}>XML</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #cbd5e133' }}>
                    <td style={{ padding: 10, fontWeight: 700 }}>Syntax</td>
                    <td style={{ padding: 10 }}>Key-Value pairs (lightweight)</td>
                    <td style={{ padding: 10 }}>Markup tag pairs (verbose tags)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #cbd5e133' }}>
                    <td style={{ padding: 10, fontWeight: 700 }}>Data Types</td>
                    <td style={{ padding: 10 }}>Supports Boolean, Number, Array</td>
                    <td style={{ padding: 10 }}>Only supports text strings</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #cbd5e133' }}>
                    <td style={{ padding: 10, fontWeight: 700 }}>Parsing Speed</td>
                    <td style={{ padding: 10, color: '#10b981', fontWeight: 700 }}>Fast (Native browser JS support)</td>
                    <td style={{ padding: 10 }}>Slow (Requires DOM parser libraries)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('json_syntax')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. SYNTAX RULES & TYPES ─────────────────────────────────────── */}
      {activeTab === 'json_syntax' && (
        <Section key="json_syntax" eyebrow="JSON • Module 02" title="JSON Syntax & Data Types">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Strict Syntax Rules</h3>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>Double Quotes Only</strong>: All keys and string values MUST use double quotes <code>"key": "value"</code>.</li>
              <li><strong>No Trailing Commas</strong>: The last key-value pair in an object or array must not have a comma.</li>
              <li><strong>Valid Extensions</strong>: Files must be saved with the <code>.json</code> extension.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Supported JSON Data Types</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '2rem' }}>
              {[
                { title: 'String & Number', val: '"name": "Krishna"\n"age": 21' },
                { title: 'Boolean & Null', val: '"isStudent": true\n"pincode": null' },
                { title: 'Array & Object', val: '"skills": ["HTML", "CSS"]\n"address": { "city": "Chennai" }' }
              ].map((item, index) => (
                <div key={index} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: 12 }}>
                  <strong style={{ display: 'block', fontSize: '0.88rem', color: '#06b6d4', marginBottom: 4 }}>{item.title}</strong>
                  <pre style={{ margin: 0, fontSize: '0.74rem', fontFamily: 'monospace', color: '#475569' }}>{item.val}</pre>
                </div>
              ))}
            </div>

            <CodeBlock title="Sample Nested JSON Object" code={`{
  "studentId": 1002,
  "profile": {
    "name": "Krishna",
    "coursesEnrolled": ["HTML", "CSS", "JavaScript"]
  },
  "address": {
    "city": "Chennai",
    "pincode": 600001
  }
}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('json_methods')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. PARSING & STRINGIFYING ───────────────────────────────────── */}
      {activeTab === 'json_methods' && (
        <Section key="json_methods" eyebrow="JSON • Module 03" title="Access, Parse & Stringify">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Accessing JSON Properties</h3>
            <p>Access values inside parsed objects using dot notation or bracket notation:</p>
            <CodeBlock title="Access values examples" code={`const data = { "name": "Krishna", "address": { "city": "Chennai" } };

// Dot notation
console.log(data.name); // output: Krishna

// Bracket notation (useful for keys containing spaces or special characters)
console.log(data["address"]["city"]); // output: Chennai`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Parse vs Stringify Methods</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}>
                <strong style={{ display: 'block', color: '#06b6d4' }}>JSON.parse(text)</strong>
                <span style={{ fontSize: '0.82rem' }}>Converts a JSON string from a server back into a usable JavaScript object.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}>
                <strong style={{ display: 'block', color: '#06b6d4' }}>JSON.stringify(object)</strong>
                <span style={{ fontSize: '0.82rem' }}>Converts a local JavaScript object into a JSON string ready to send to a server.</span>
              </div>
            </div>

            {/* Interactive JSON Converter Simulator Widget */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🧪 Live JSON Converter Playground</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Enter a JSON string or JS object parameters, and run serialization checks dynamically:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Object or JSON Input:</label>
                <textarea className="form-control" value={rawInput} onChange={e => setRawInput(e.target.value)}
                  style={{ background: 'white', fontFamily: 'monospace', fontSize: '0.82rem', height: 145, marginBottom: '1rem', resize: 'none', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px' }} />
                
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleParse} style={{ background: '#06b6d4', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                    JSON.parse()
                  </button>
                  <button onClick={handleStringify} style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                    JSON.stringify()
                  </button>
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 190 }}>
                <div>
                  <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: 4, fontWeight: 700, display: 'inline-block' }}>Conversion Output</span>
                  
                  {parseError && (
                    <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 10, display: 'flex', gap: 4, background: '#fef2f2', padding: 8, borderRadius: 6, border: '1px solid #fecaca' }}>
                      <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{parseError}</span>
                    </div>
                  )}

                  {parseResult && (
                    <pre style={{ margin: '10px 0 0 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#0f172a', background: '#f8fafc', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', maxHeight: 180, overflowY: 'auto', lineHeight: 1.5 }}>
                      {parseResult}
                    </pre>
                  )}

                  {!parseResult && !parseError && (
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: 18 }}>Click parse or stringify above to translate inputs.</div>
                  )}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.5rem' }}>3. Practical Program Example: Local Settings Manager</h3>
            <p>Here is a real-world program that uses JSON to save and load user configuration options in browser LocalStorage. The program uses a <code>try-catch</code> wrap to handle malformed JSON inputs safely:</p>

            <CodeBlock title="settingsManager.js (JSON Application Example)" code={`// 1. Default fallback settings object
const defaultSettings = {
  theme: "light",
  volume: 50,
  notifications: true
};

// 2. Save settings helper (Object -> JSON string)
function saveSettings(settingsObj) {
  const jsonString = JSON.stringify(settingsObj);
  localStorage.setItem("user_settings", jsonString);
}

// 3. Load settings helper (JSON string -> Object)
function loadSettings() {
  const rawData = localStorage.getItem("user_settings");
  if (!rawData) return defaultSettings;
  
  try {
    return JSON.parse(rawData);
  } catch (error) {
    console.warn("Corrupted JSON data! Resetting to default config.");
    return defaultSettings;
  }
}`} />

            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>⚙️ Interactive Settings Dashboard Simulator</h4>
            <p style={{ fontSize: '0.85rem' }}>Change state inputs, save/stringify the config, or modify the JSON text manually to test the try-catch parsing parser:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Controls */}
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block', color: '#06b6d4', marginBottom: 12 }}>Runtime JS State Controls</strong>
                
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.82rem', width: 90 }}>Theme Mode:</span>
                  <select className="form-control" value={settings.theme} onChange={e => handleUpdateSetting('theme', e.target.value)} style={{ background: 'white', fontSize: '0.82rem', padding: '4px 8px' }}>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="cyberpunk">Cyberpunk Mode</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.82rem', width: 90 }}>Audio Volume:</span>
                  <input type="range" min="0" max="100" value={settings.volume} onChange={e => handleUpdateSetting('volume', parseInt(e.target.value))} style={{ accentColor: '#06b6d4' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 'bold' }}>{settings.volume}%</span>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={settings.notifications} onChange={e => handleUpdateSetting('notifications', e.target.checked)} style={{ width: 15, height: 15 }} />
                  Enable Push Notifications
                </label>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleSaveSettings} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
                    Save (JSON.stringify)
                  </button>
                  <button onClick={handleLoadSettings} style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
                    Load (JSON.parse)
                  </button>
                </div>
              </div>

              {/* JSON simulated storage block */}
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block', color: '#0f172a', marginBottom: 10 }}>Simulated LocalStorage JSON Text</strong>
                <textarea className="form-control" value={settingsJson} onChange={e => setSettingsJson(e.target.value)}
                  style={{ background: '#0f172a', color: '#86efac', fontFamily: 'monospace', fontSize: '0.78rem', height: 110, resize: 'none', marginBottom: 8 }} />
                
                <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>💡 Try typing corrupt quotes to see how parsing fails safely.</span>
              </div>
            </div>

            {/* Trace logs */}
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: 10, fontFamily: 'monospace', fontSize: '0.74rem', color: '#94a3b8', maxHeight: 80, overflowY: 'auto' }}>
              <div style={{ color: '#06b6d4', fontWeight: 'bold', marginBottom: 4 }}>Trace logs console:</div>
              {settingsLogs.map((log, lIdx) => <div key={lIdx} style={{ color: log.startsWith('Error') ? '#fca5a5' : '#94a3b8' }}>&gt; {log}</div>)}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('json_datatypes')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Next: JSON Data Types <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. JSON DATA TYPES ─────────────────────────────────────────── */}
      {activeTab === 'json_datatypes' && (
        <Section key="json_datatypes" eyebrow="JSON • Module 04" title="JSON Data Types">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p style={{ marginBottom: '1.5rem' }}>
              JSON strictly supports <strong>6 primitive and composite data types</strong>. Understanding what is allowed (and what is forbidden) is critical when constructing or consuming API payloads.
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>✅ Supported vs ❌ Unsupported Types</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Supported */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#16a34a', marginTop: 0, marginBottom: '0.8rem', fontWeight: 800 }}>
                  ✅ Allowed JSON Data Types (6 Only)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: 6, color: '#334155' }}>
                  <li><strong>String:</strong> Must be wrapped in double quotes <code>"Hello World"</code></li>
                  <li><strong>Number:</strong> Integers or floating-point numbers <code>25</code>, <code>99.99</code></li>
                  <li><strong>Boolean:</strong> Lowercase <code>true</code> or <code>false</code></li>
                  <li><strong>Null:</strong> Represents empty/missing value <code>null</code></li>
                  <li><strong>Object:</strong> Key-value collection wrapped in curly braces <code>{"{}"}</code></li>
                  <li><strong>Array:</strong> Ordered list of values wrapped in square brackets <code>[]</code></li>
                </ul>
              </div>

              {/* Unsupported */}
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#dc2626', marginTop: 0, marginBottom: '0.8rem', fontWeight: 800 }}>
                  ❌ Forbidden Data Types in JSON
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: 6, color: '#334155' }}>
                  <li><strong>Functions:</strong> <code>function() {"{}"}</code> (cannot be serialized)</li>
                  <li><strong>Undefined:</strong> <code>undefined</code> (keys with undefined are omitted)</li>
                  <li><strong>Symbol:</strong> JavaScript <code>Symbol()</code> identifiers</li>
                  <li><strong>Date Objects:</strong> Converted to ISO strings <code>"2026-08-23T12:00:00Z"</code></li>
                  <li><strong>Comments:</strong> Single-line <code>//</code> or multi-line <code>/* */</code> comments</li>
                </ul>
              </div>
            </div>

            {/* Interactive Data Type Inspector */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🧪 Interactive JSON Data Type Inspector</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Click on a data type below to view its syntax rules and real JSON code snippet:</p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                {[
                  { id: 'string', label: 'String' },
                  { id: 'number', label: 'Number' },
                  { id: 'boolean', label: 'Boolean' },
                  { id: 'null', label: 'Null' },
                  { id: 'object', label: 'Object' },
                  { id: 'array', label: 'Array' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedType(item.id)}
                    style={{
                      padding: '0.4rem 0.9rem', borderRadius: 6, border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                      background: selectedType === item.id ? '#06b6d4' : '#e2e8f0',
                      color: selectedType === item.id ? '#fff' : '#475569', transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {selectedType === 'string' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>String Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>Must be enclosed in double quotes. Unicode characters and escape characters like <code>\n</code> are supported.</p>
                  <CodeBlock title="JSON String Example" code={`{\n  "title": "Full Stack Web Development",\n  "description": "Learn HTML, CSS, JavaScript & React"\n}`} />
                </div>
              )}

              {selectedType === 'number' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>Number Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>Supports positive/negative integers, decimals, and exponential notation. Octal and hexadecimal are NOT allowed.</p>
                  <CodeBlock title="JSON Number Example" code={`{\n  "price": 1499,\n  "discount": 0.15,\n  "temperature": -4.5\n}`} />
                </div>
              )}

              {selectedType === 'boolean' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>Boolean Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>Must be lowercase <code>true</code> or <code>false</code> (no quotes around them!).</p>
                  <CodeBlock title="JSON Boolean Example" code={`{\n  "isCompleted": true,\n  "hasCertificate": false\n}`} />
                </div>
              )}

              {selectedType === 'null' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>Null Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>Used to represent an intentional empty value or unassigned field.</p>
                  <CodeBlock title="JSON Null Example" code={`{\n  "middleName": null,\n  "couponCode": null\n}`} />
                </div>
              )}

              {selectedType === 'object' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>Object Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>An unordered collection of key-value pairs wrapped in curly braces.</p>
                  <CodeBlock title="JSON Object Example" code={`{\n  "user": {\n    "id": 501,\n    "name": "Kowsalya"\n  }\n}`} />
                </div>
              )}

              {selectedType === 'array' && (
                <div>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>Array Type:</strong>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>An ordered collection of values wrapped in square brackets. Values can be of mixed data types.</p>
                  <CodeBlock title="JSON Array Example" code={`{\n  "skills": ["JavaScript", "React", "Python"],\n  "scores": [95, 88, 92]\n}`} />
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_objects')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Next: Nested Objects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. NESTED OBJECTS ───────────────────────────────────────────── */}
      {activeTab === 'nested_objects' && (
        <Section key="nested_objects" eyebrow="JSON • Module 05" title="Nested Objects in JSON">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p style={{ marginBottom: '1.5rem' }}>
              JSON allows objects to contain other objects as values. This is called <strong>Nested Objects</strong> and is standard practice for representing complex, real-world hierarchical data (such as user profiles, invoice details, or system settings).
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Understanding Hierarchy &amp; Access</h3>
            <p>To access properties inside a nested JSON object in JavaScript, chain dot notation or bracket notation:</p>

            <CodeBlock title="Nested Object Definition & Property Access" code={`// JSON Data
const company = {
  "name": "AlphaFly Academy",
  "location": {
    "city": "Theni",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.0104,
      "lng": 77.4768
    }
  }
};

// Accessing nested properties:
console.log(company.location.city);               // Output: Theni
console.log(company.location.coordinates.lat);     // Output: 10.0104

// Safe access with Optional Chaining (?.)
console.log(company?.location?.coordinates?.lng); // Output: 77.4768`} />

            {/* Interactive Inspector */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🔍 Live Nested Property Inspector</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Test retrieving values from the nested JSON object below by selecting a path:</p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Select Property Path:</span>
                {[
                  { path: 'user.profile.name', label: 'user.profile.name' },
                  { path: 'user.profile.role', label: 'user.profile.role' },
                  { path: 'user.address.city', label: 'user.address.city' },
                  { path: 'user.address.geo.lat', label: 'user.address.geo.lat' },
                ].map(item => (
                  <button
                    key={item.path}
                    onClick={() => setNestedPath(item.path)}
                    style={{
                      padding: '0.4rem 0.8rem', borderRadius: 6, border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                      background: nestedPath === item.path ? '#06b6d4' : '#e2e8f0',
                      color: nestedPath === item.path ? '#fff' : '#475569', transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, color: '#a5d6ff', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  <span style={{ color: '#8892b0', display: 'block', marginBottom: 4 }}>// Nested JSON Payload:</span>
{`{
  "user": {
    "profile": {
      "name": "Kowsalya",
      "role": "Full Stack Engineer"
    },
    "address": {
      "city": "Theni",
      "geo": { "lat": 10.01, "lng": 77.47 }
    }
  }
}`}
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>EXPRESSION EVALUATED:</span>
                  <code style={{ fontSize: '0.9rem', color: '#06b6d4', margin: '4px 0 10px 0', fontWeight: 'bold' }}>
                    data.{nestedPath}
                  </code>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>RESULT:</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981', marginTop: 4 }}>
                    {nestedPath === 'user.profile.name' && '"Kowsalya"'}
                    {nestedPath === 'user.profile.role' && '"Full Stack Engineer"'}
                    {nestedPath === 'user.address.city' && '"Theni"'}
                    {nestedPath === 'user.address.geo.lat' && '10.01'}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('array_objects')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Next: Array of Objects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. ARRAY OF OBJECTS ─────────────────────────────────────────── */}
      {activeTab === 'array_objects' && (
        <Section key="array_objects" eyebrow="JSON • Module 06" title="Array of Objects">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p style={{ marginBottom: '1.5rem' }}>
              An <strong>Array of Objects</strong> is the single most common data structure returned by REST APIs (such as product lists, user directories, or order histories). It combines square brackets <code>[]</code> for order and curly braces <code>{"{}"}</code> for key-value fields.
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Structure &amp; Array Iteration</h3>
            <p>In JavaScript, you can iterate over a JSON array of objects using <code>.map()</code>, <code>.filter()</code>, or <code>.forEach()</code>:</p>

            <CodeBlock title="Array of Objects & Filtering Example" code={`// JSON Array of Objects
const students = [
  { "id": 1, "name": "Krishna", "score": 95, "status": "Passed" },
  { "id": 2, "name": "Arun", "score": 42, "status": "Failed" },
  { "id": 3, "name": "Deepa", "score": 88, "status": "Passed" }
];

// 1. Iterate and display names:
students.forEach(s => console.log(s.name));

// 2. Filter passed students:
const passed = students.filter(s => s.status === "Passed");
console.log(passed);`} />

            {/* Interactive Array Table Sandbox */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>📊 Live Array of Objects Table Viewer</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Filter the JSON array of objects dynamically below:</p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Filter by Status / Role:</span>
                {['All', 'Developer', 'Designer', 'Active', 'Inactive'].map(btn => (
                  <button
                    key={btn}
                    onClick={() => setArrayFilter(btn)}
                    style={{
                      padding: '0.35rem 0.75rem', borderRadius: 6, border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                      background: arrayFilter === btn ? '#06b6d4' : '#e2e8f0',
                      color: arrayFilter === btn ? '#fff' : '#475569', transition: 'all 0.2s ease'
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>ID</th>
                      <th style={{ padding: '8px 12px' }}>Name</th>
                      <th style={{ padding: '8px 12px' }}>Role</th>
                      <th style={{ padding: '8px 12px' }}>Status</th>
                      <th style={{ padding: '8px 12px' }}>Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleArrayOfObjects
                      .filter(item => {
                        if (arrayFilter === 'All') return true;
                        if (arrayFilter === 'Developer' || arrayFilter === 'Designer') return item.role === arrayFilter;
                        if (arrayFilter === 'Active' || arrayFilter === 'Inactive') return item.status === arrayFilter;
                        return true;
                      })
                      .map(user => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 700, color: '#06b6d4' }}>#{user.id}</td>
                          <td style={{ padding: '8px 12px', fontWeight: 600 }}>{user.name}</td>
                          <td style={{ padding: '8px 12px' }}>{user.role}</td>
                          <td style={{ padding: '8px 12px' }}>
                            <span style={{
                              padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700,
                              background: user.status === 'Active' ? '#dcfce7' : '#fee2e2',
                              color: user.status === 'Active' ? '#15803d' : '#b91c1c'
                            }}>
                              {user.status}
                            </span>
                          </td>
                          <td style={{ padding: '8px 12px' }}>{user.experience} yrs</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 1 Quiz — JSON Basics">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {questions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = qAns[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (qDone) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) { bg = '#ecfeff'; border = '1.5px solid #06b6d4'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #06b6d4' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#06b6d4', borderColor: '#06b6d4', minWidth: 150 }}>
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button className="btn btn-outline" onClick={() => { setQAns({}); setQDone(false); }} style={{ minWidth: 150 }}>Retry Quiz</button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: score === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {score} / {questions.length} ({Math.round(score / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#06b6d4', borderColor: '#06b6d4' }}>
                Go to Assignments <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENTS ─────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Assignments" title="Day 1 Assignments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Assignment 1 */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>1. Student Profile JSON Object</h4>
              <p style={{ fontSize: '0.86rem', margin: '0 0 10px' }}>Create a valid JSON string for a student with name: Krishna, age: 21, isStudent: true, courses: ["HTML", "CSS", "JavaScript"], address containing city: Chennai.</p>
              
              <textarea className="form-control" placeholder='E.g. { "name": "Krishna", ... }' value={asgnAnswers.asgn1} onChange={e => setAsgnAnswers({ ...asgnAnswers, asgn1: e.target.value })}
                style={{ background: 'white', fontFamily: 'monospace', fontSize: '0.82rem', height: 80, marginBottom: 8, resize: 'none' }} />
              
              <button className="btn btn-outline" onClick={validateAsgn1} style={{ fontSize: '0.78rem', padding: '4px 12px' }}>Verify JSON</button>
              
              {asgnFeedback.asgn1 && (
                <div style={{ marginTop: 6, fontSize: '0.8rem', color: asgnFeedback.asgn1.success ? '#16a34a' : '#ef4444', fontWeight: 700 }}>
                  {asgnFeedback.asgn1.msg}
                </div>
              )}
            </div>

            {/* Assignment 2 */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>2. Employee records array</h4>
              <p style={{ fontSize: '0.86rem', margin: '0 0 4px' }}>Create a JSON array containing three employee objects with <code>emp_id</code>, <code>name</code>, <code>designation</code>, and <code>salary</code>, with pincode: 600001.</p>
              <pre style={{ background: '#0f172a', color: '#f8fafc', padding: 8, borderRadius: 6, fontSize: '0.76rem', fontFamily: 'monospace' }}>
{`[
  { "emp_id": 1, "name": "Aman", "designation": "Developer", "salary": 50000, "pincode": 600001 },
  ...
]`}
              </pre>
            </div>

            {/* Assignment 3 */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>3. JSON.stringify() output verification</h4>
              <p style={{ fontSize: '0.86rem', margin: '0 0 10px' }}>What string output is returned when running <code>JSON.stringify(product)</code> where <code>product = &#123; id: 101, name: "Laptop", price: 45000 &#125;</code>?</p>
              
              <input className="form-control" placeholder='E.g. {"id":101,...}' value={asgnAnswers.asgn3} onChange={e => setAsgnAnswers({ ...asgnAnswers, asgn3: e.target.value })}
                style={{ background: 'white', fontFamily: 'monospace', fontSize: '0.82rem', marginBottom: 8 }} />
              
              <button className="btn btn-outline" onClick={validateAsgn3} style={{ fontSize: '0.78rem', padding: '4px 12px' }}>Verify stringify</button>
              
              {asgnFeedback.asgn3 && (
                <div style={{ marginTop: 6, fontSize: '0.8rem', color: asgnFeedback.asgn3.success ? '#16a34a' : '#ef4444', fontWeight: 700 }}>
                  {asgnFeedback.asgn3.msg}
                </div>
              )}
            </div>

            {/* Assignment 4 */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>4. JSON.parse() output verification</h4>
              <p style={{ fontSize: '0.86rem', margin: '0 0 10px' }}>Write down the output of parsing this string: <code>JSON.parse("&#123;\\\"name\\\":\\\"Arun\\\",\\\"age\\\":23&#125;")</code>:</p>
              
              <input className="form-control" placeholder='E.g. {name: "Arun", age: 23}' value={asgnAnswers.asgn4} onChange={e => setAsgnAnswers({ ...asgnAnswers, asgn4: e.target.value })}
                style={{ background: 'white', fontFamily: 'monospace', fontSize: '0.82rem', marginBottom: 8 }} />
              
              <button className="btn btn-outline" onClick={validateAsgn4} style={{ fontSize: '0.78rem', padding: '4px 12px' }}>Verify parse</button>
              
              {asgnFeedback.asgn4 && (
                <div style={{ marginTop: 6, fontSize: '0.8rem', color: asgnFeedback.asgn4.success ? '#16a34a' : '#ef4444', fontWeight: 700 }}>
                  {asgnFeedback.asgn4.msg}
                </div>
              )}
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#06b6d4', borderColor: '#06b6d4', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('dashboard')}>
              Complete Course & Back to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
