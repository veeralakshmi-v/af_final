import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Cpu, Database, Terminal, Filter, Zap, Code, CheckCircle, Play, Copy, Check, ArrowRight, Lightbulb, AlertCircle, Bot } from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function PythonDay1({ activeTab, onNavigate, openAITutor }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [editorCode, setEditorCode] = useState(`# Welcome to Day 1 Python Live Playground!
# Try editing this code and click 'Run Python Code' below

name = input("Enter your name: ")
age_str = input("Enter your age: ")
age = int(age_str)  # Type casting!

print(f"Hello {name}, welcome to AI Python Full Stack!")
print(f"Next year, you will be {age + 1} years old.")
print("Python data types checked:", type(name), type(age))
`);
  const [consoleOutput, setConsoleOutput] = useState("Click 'Run Python Code' to execute your script!");
  const [simulatedInputName, setSimulatedInputName] = useState("Alex");
  const [simulatedInputAge, setSimulatedInputAge] = useState("25");

  const [aiFeedback, setAiFeedback] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState('output'); // 'output' or 'ai'

  const getPlaygroundAIFeedback = () => {
    setAiLoading(true);
    setTimeout(() => {
      let feedback = "";
      const lines = editorCode.split('\n');
      let indentationError = false;
      for (let i = 0; i < lines.length; i++) {
        if ((lines[i].startsWith(' ') && lines[i].length % 4 !== 0 && !lines[i].trim().startsWith('#')) ||
            (lines[i].includes('def ') && lines[i+1] && !lines[i+1].startsWith('    ') && !lines[i+1].trim().startsWith('#') && lines[i+1].trim() !== '')) {
          indentationError = true;
        }
      }
      
      let colonError = false;
      if (/def\s+\w+\s*\([^)]*\)\s*$/m.test(editorCode) || /class\s+\w+\s*$/m.test(editorCode) || /if\s+.*$/m.test(editorCode) || /for\s+.*$/m.test(editorCode) || /while\s+.*$/m.test(editorCode)) {
        colonError = true;
      }
      
      if (indentationError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Indentation Issue Detected**\n\nIn Python, correct spacing defines the structure of your loops, conditions, and functions. Use exactly 4 spaces for indented blocks.";
      } else if (colonError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Missing Colon (:)**\n\nMake sure all header statements (like `if`, `def`, `class`, `for`) end with a colon `:` to start their respective blocks.";
      } else {
        feedback = "🤖 **AI Co-Pilot Playground Assistant:**\n\nYour Day 1 Python script is looking good! Here is what we found:\n\n- **Input Operations**: You are using `input()` to prompt for the user's name and age.\n- **Type Casting**: You have successfully used `int()` to cast the age string to an integer, avoiding concatenation traps!\n- **Formatting**: You are printing output using dynamic f-strings.\n\n**Next Steps:** Try changing `age + 1` to compute your age in 10 years (`age + 10`)!";
      }
      
      setAiFeedback(feedback);
      setAiLoading(false);
      setActivePlaygroundTab('ai');
    }, 600);
  };

  const handleContinue = (nextSectionId) => {
    onNavigate('python_day1', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runSimulatedPython = () => {
    setConsoleOutput("Executing script in Python Virtual Machine (PVM)...\n---");
    setTimeout(() => {
      try {
        let output = "";
        output += `Enter your name: ${simulatedInputName}\n`;
        output += `Enter your age: ${simulatedInputAge}\n`;
        const ageInt = parseInt(simulatedInputAge) || 20;
        output += `Hello ${simulatedInputName}, welcome to AI Python Full Stack!\n`;
        output += `Next year, you will be ${ageInt + 1} years old.\n`;
        output += `Python data types checked: <class 'str'> <class 'int'>\n`;
        output += `\n✨ Process finished with exit code 0`;
        setConsoleOutput(output);
      } catch (err) {
        setConsoleOutput(`Traceback (most recent call last):\n  File "main.py", line 5\nValueError: invalid literal for int()`);
      }
    }, 400);
  };

  return (
    <AnimatePresence mode="wait">

      {/* 1. INTRODUCTION TO PYTHON */}
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Day 1 • Overview" title="What is Python?">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>PYTHON DAY 1</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Guido van Rossum • Released 1991</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
                The Most Versatile Language in the World
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                Python is a <strong style={{ color: '#93c5fd' }}>high-level, interpreted programming language</strong> celebrated for its clean readability, human-friendly English syntax, and immense power. Whether you are building web servers, training AI neural networks, automating boring office spreadsheets, or analyzing complex datasets, Python is the #1 tool of choice.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>Core Characteristics of Python</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#eff6ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#3b82f6', fontWeight: 'bold' }}>01</div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.1rem' }}>Interpreted Language</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Python code is executed line-by-line by the Python Virtual Machine (PVM). No manual compilation to machine code is needed before running!</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#f0fdf4', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#10b981', fontWeight: 'bold' }}>02</div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.1rem' }}>Dynamically Typed</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>You don't need to declare variable types (like <code>int x = 10;</code>). Python automatically detects the data type at runtime based on the assigned value.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#f5f3ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#8b5cf6', fontWeight: 'bold' }}>03</div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.1rem' }}>Multi-Paradigm</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Python seamlessly supports Object-Oriented Programming (OOP), Procedural Programming, and Functional Programming styles in the same codebase.</p>
              </div>

            </div>

            <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <Zap size={20} /> Why Python for AI & Full Stack?
              </h4>
              <p style={{ margin: 0, color: '#78350f', lineHeight: 1.7 }}>
                Python has become the undisputed *lingua franca* (universal language) of Artificial Intelligence. Frameworks like PyTorch, TensorFlow, LangChain, Django, and FastAPI are all built on Python, allowing full-stack developers to build web apps that natively integrate LLMs and machine learning models!
              </p>
            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('install')}>
                Next: Installation & Setup <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is Python and why is it so popular for AI?")}>
                Ask AI Tutor: Explain Python
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 2. INSTALLATION & SETUP */}
      {activeTab === 'install' && (
        <Section key="install" id="install" eyebrow="Day 1 • Setup" title="Python Installation & Environment Setup">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
              Before writing code, we need to install the Python interpreter and configure our Integrated Development Environment (IDE).
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                <h3 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#3b82f6', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>1</span>
                  Download Python from Python.org
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Visit <strong>python.org/downloads</strong> and download the latest version (Python 3.12+).
                </p>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '8px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                  <AlertCircle size={20} color="#dc2626" />
                  CRITICAL STEP: During installation, ALWAYS check the box "Add Python to PATH" before clicking Install Now!
                </div>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                <h3 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#3b82f6', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>2</span>
                  Verify Installation in Terminal / Command Prompt
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Open your Windows Command Prompt (`cmd`) or PowerShell and type the following command to check if Python is installed correctly:
                </p>
                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem 1.5rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>$ python --version<br /><span style={{ color: '#10b981' }}>Python 3.12.4</span></span>
                  <button onClick={() => copyToClipboard('python --version', 'cmd1')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    {copiedCode === 'cmd1' ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                <h3 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#3b82f6', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>3</span>
                  Choose Your Code Editor (IDE)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>VS Code (Recommended)</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Lightweight, endless extensions, integrated AI GitHub Copilot, best for Full Stack.</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>PyCharm Professional</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Dedicated Python IDE by JetBrains with deep Django and database inspection tools.</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>Jupyter Notebook</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Interactive cell-by-cell execution. Essential for Data Science, AI training, and EDA.</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('variables')}>
                Next: Variables & Data Types <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("Can you help me check if Python is installed correctly on my system?")}>
                Ask AI Tutor: Verify Install
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 3. VARIABLES & DATA TYPES */}
      {activeTab === 'variables' && (
        <Section key="variables" id="variables" eyebrow="Day 1 • Core Syntax" title="Variables and All Python Data Types">
          <div className="panel">
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontSize: '1.2rem' }}>What is a Variable?</h4>
              <p style={{ margin: 0, color: '#1e293b', lineHeight: 1.7 }}>
                A variable is a container for storing data values. In Python, a variable is created the exact moment you assign a value to it using the assignment operator (<code>=</code>). Python is <strong>dynamically typed</strong> — you never need to declare a type explicitly, Python detects it automatically at runtime.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>All Python Built-in Data Types</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Python has <strong>11 built-in data type groups</strong> organized into categories below.</p>

            <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <thead>
                  <tr style={{ background: '#0f172a', color: 'white' }}>
                    <th style={{ padding: '1rem 1.2rem', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Category</th>
                    <th style={{ padding: '1rem 1.2rem', fontSize: '0.95rem' }}>Data Type</th>
                    <th style={{ padding: '1rem 1.2rem', fontSize: '0.95rem' }}>Keyword</th>
                    <th style={{ padding: '1rem 1.2rem', fontSize: '0.95rem' }}>Description</th>
                    <th style={{ padding: '1rem 1.2rem', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Code Example</th>
                  </tr>
                </thead>
                <tbody>

                  {/* TEXT */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem' }}>
                      <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>📝 Text</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>String</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>str</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Sequence of Unicode characters enclosed in single, double, or triple quotes.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>name = "Python"<br />msg = 'Hello!'</td>
                  </tr>

                  {/* NUMERIC — int */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem' }} rowSpan={3}>
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>🔢 Numeric</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Integer</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>int</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Whole numbers (no decimal point), positive or negative, of unlimited size.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>age = 25<br />count = -100</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Float</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>float</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Numbers with a decimal point or in scientific/exponential notation (e.g., 3e8).</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>price = 99.99<br />pi = 3.14159</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Complex</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>complex</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Numbers with a real and imaginary part written using <code>j</code> for the imaginary unit.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>z = 3 + 4j<br />w = 2j</td>
                  </tr>

                  {/* SEQUENCE — list */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem' }} rowSpan={3}>
                      <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>📋 Sequence</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>List</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>list</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Ordered, <strong>mutable</strong> (changeable) collection of items. Allows duplicates. Uses <code>[ ]</code>.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>fruits = ["mango", "apple"]<br />nums = [1, 2, 3]</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Tuple</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>tuple</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Ordered, <strong>immutable</strong> (unchangeable) collection. Faster than lists. Uses <code>( )</code>.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>point = (10, 20)<br />rgb = (255, 0, 0)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Range</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>range</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Immutable sequence of numbers generated on-the-fly. Used primarily in <code>for</code> loops.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>r = range(0, 10)<br />r2 = range(1, 100, 2)</td>
                  </tr>

                  {/* MAPPING */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem' }}>
                      <span style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>🗂️ Mapping</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Dictionary</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>dict</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Stores data as unordered <strong>key: value</strong> pairs. Keys must be unique. Uses <code>{'{ }'}</code>.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>student = {'{"name": "Alice", "age": 20}'}</td>
                  </tr>

                  {/* SET */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem' }} rowSpan={2}>
                      <span style={{ background: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>🔵 Set</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Set</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#fee2e2', color: '#991b1b', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>set</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Unordered, <strong>no duplicates</strong>, mutable collection. Ideal for unique-value storage and set math.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>colours = {'{"red", "blue"}'}<br />unique = set([1,2,2,3])</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Frozenset</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#fee2e2', color: '#991b1b', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>frozenset</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>An <strong>immutable</strong> version of a set. Elements cannot be added or removed after creation.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>fs = frozenset([1, 2, 3])</td>
                  </tr>

                  {/* BOOLEAN */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem' }}>
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>✅ Boolean</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Boolean</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>bool</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Represents <code>True</code> or <code>False</code>. Case-sensitive! A sub-type of <code>int</code> (True=1, False=0).</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>is_active = True<br />has_error = False</td>
                  </tr>

                  {/* BINARY */}
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem' }} rowSpan={3}>
                      <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>⚙️ Binary</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Bytes</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>bytes</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>Immutable sequence of bytes (0–255). Used for raw binary data like images or network packets.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>data = b"Hello"<br />data = bytes(5)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Bytearray</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>bytearray</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>A <strong>mutable</strong> sequence of bytes. Contents can be modified after creation.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>ba = bytearray(4)<br />ba[0] = 65</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a' }}>Memoryview</td>
                    <td style={{ padding: '1rem 1.2rem' }}><code style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>memoryview</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem' }}>A memory-efficient view object for accessing the buffer of binary data without copying it.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem' }}>mv = memoryview(b"test")</td>
                  </tr>

                  {/* NONETYPE */}
                  <tr>
                    <td style={{ padding: '1rem 1.2rem', background: '#fafafa' }}>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>🚫 None</span>
                    </td>
                    <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: '#0f172a', background: '#fafafa' }}>NoneType</td>
                    <td style={{ padding: '1rem 1.2rem', background: '#fafafa' }}><code style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>None</code></td>
                    <td style={{ padding: '1rem 1.2rem', color: '#475569', fontSize: '0.9rem', background: '#fafafa' }}>Represents the absence of a value or a null value. Functions return <code>None</code> by default if no <code>return</code> statement exists.</td>
                    <td style={{ padding: '1rem 1.2rem', fontFamily: 'monospace', color: '#0f172a', fontSize: '0.85rem', background: '#fafafa' }}>result = None<br />x = None</td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* TYPE SUMMARY CHIPS */}
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h4 style={{ color: '#94a3b8', margin: '0 0 1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Reference — type() Output</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {[
                  { label: "<class 'str'>", color: '#93c5fd' },
                  { label: "<class 'int'>", color: '#6ee7b7' },
                  { label: "<class 'float'>", color: '#6ee7b7' },
                  { label: "<class 'complex'>", color: '#6ee7b7' },
                  { label: "<class 'list'>", color: '#fcd34d' },
                  { label: "<class 'tuple'>", color: '#fcd34d' },
                  { label: "<class 'range'>", color: '#fcd34d' },
                  { label: "<class 'dict'>", color: '#c4b5fd' },
                  { label: "<class 'set'>", color: '#fca5a5' },
                  { label: "<class 'frozenset'>", color: '#fca5a5' },
                  { label: "<class 'bool'>", color: '#6ee7b7' },
                  { label: "<class 'bytes'>", color: '#94a3b8' },
                  { label: "<class 'NoneType'>", color: '#a5b4fc' },
                ].map(item => (
                  <span key={item.label} style={{ background: '#1e293b', color: item.color, padding: '0.35rem 0.8rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', border: '1px solid #334155' }}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>Checking Data Types at Runtime</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Use Python's built-in <code>type()</code> function to verify the data type of any variable at any point in your program:
            </p>
            <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.8 }}>
              <span style={{ color: '#64748b' }}># Each variable picks up its type automatically</span><br />
              x = <span style={{ color: '#fbbf24' }}>42</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}># int</span><br />
              y = <span style={{ color: '#fbbf24' }}>3.14</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}># float</span><br />
              name = <span style={{ color: '#a5b4fc' }}>"Python"</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}># str</span><br />
              fruits = <span style={{ color: '#fcd34d' }}>["mango", "apple"]</span> &nbsp;&nbsp;<span style={{ color: '#64748b' }}># list</span><br />
              info = <span style={{ color: '#c4b5fd' }}>{'{"name": "Alice"}'}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}># dict</span><br />
              empty = <span style={{ color: '#a5b4fc' }}>None</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}># NoneType</span><br />
              <br />
              <span style={{ color: '#64748b' }}># Check types at runtime</span><br />
              print(type(x)) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#10b981' }}># &lt;class 'int'&gt;</span><br />
              print(type(name)) &nbsp;<span style={{ color: '#10b981' }}># &lt;class 'str'&gt;</span><br />
              print(type(fruits)) <span style={{ color: '#10b981' }}># &lt;class 'list'&gt;</span>
            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('print_input')}>
                Next: print() & input() Functions <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("Can you explain the difference between mutable and immutable data types in Python?")}>
                Ask AI Tutor: Explain Data Types
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 4. PRINT & INPUT FUNCTIONS */}
      {activeTab === 'print_input' && (
        <Section key="print_input" id="print_input" eyebrow="Day 1 • I/O Functions" title="print() and input() Functions">
          <div className="panel">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              {/* PRINT FUNCTION */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.8rem', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#eff6ff', padding: '0.6rem', borderRadius: '10px', color: '#3b82f6' }}>
                    <Terminal size={24} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a' }}>The print() Function</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  The <code>print()</code> function outputs text, variables, or expressions to the console screen. Multiple arguments are automatically separated by spaces.
                </p>
                
                <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Pro Tip: Formatted Strings (f-strings)</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Prefix your string with an <code>f</code> and wrap variables in curly braces <code>{`{var}`}</code> for ultra-clean formatting!</p>
                
                <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  name = <span style={{ color: '#a5b4fc' }}>"Python"</span><br />
                  ver = <span style={{ color: '#fbbf24' }}>3.12</span><br />
                  <br />
                  <span style={{ color: '#64748b' }}># f-string syntax (Modern Python)</span><br />
                  print(f<span style={{ color: '#a5b4fc' }}>"Welcome to {`{name}`} version {`{ver}`}"</span>)
                </div>
              </div>

              {/* INPUT FUNCTION */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.8rem', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#f0fdf4', padding: '0.6rem', borderRadius: '10px', color: '#10b981' }}>
                    <Code size={24} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a' }}>The input() Function</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  The <code>input()</code> function pauses program execution and waits for the user to type text on the keyboard and press Enter.
                </p>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '0.8rem', borderRadius: '8px', color: '#92400e', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                  ⚠️ IMPORTANT RULE: The input() function ALWAYS returns data as a String (str), even if the user types a number like 25!
                </div>
                
                <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <span style={{ color: '#64748b' }}># Taking user input</span><br />
                  city = input(<span style={{ color: '#a5b4fc' }}>"Which city are you in? "</span>)<br />
                  print(f<span style={{ color: '#a5b4fc' }}>"Hello from {`{city}`}!"</span>)
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('type_casting')}>
                Next: Type Casting <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why does the input() function always return a string and how can I process integers?")}>
                Ask AI Tutor: input() & print() Help
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 5. TYPE CASTING */}
      {activeTab === 'type_casting' && (
        <Section key="type_casting" id="type_casting" eyebrow="Day 1 • Data Conversion" title="Type Casting (Implicit & Explicit)">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
              <strong>Type Casting</strong> is the process of converting a variable from one data type to another. Because <code>input()</code> always returns strings, casting is mandatory when performing arithmetic calculations!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={22} color="#3b82f6" /> Explicit Casting Functions
                </h4>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0, fontSize: '1rem' }}>
                  <li><code>int(x)</code> : Converts x into an integer whole number.</li>
                  <li><code>float(x)</code> : Converts x into a decimal floating point number.</li>
                  <li><code>str(x)</code> : Converts x into a text string representation.</li>
                  <li><code>bool(x)</code> : Converts x into True or False (0 and empty strings become False).</li>
                </ul>
              </div>

              <div style={{ background: '#fef2f2', padding: '1.8rem', borderRadius: '14px', border: '1px solid #fecaca' }}>
                <h4 style={{ color: '#991b1b', margin: '0 0 1rem 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={22} color="#dc2626" /> The String Addition Trap!
                </h4>
                <p style={{ color: '#7f1d1d', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  If you try to add two string numbers without type casting, Python will concatenate (join) them instead of performing math!
                </p>
                <div style={{ background: '#7f1d1d', color: '#fee2e2', padding: '0.8rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  x = "10"<br />
                  y = "20"<br />
                  print(x + y) &nbsp;# Output: "1020" (WRONG!)<br />
                  print(int(x) + int(y)) # Output: 30 (CORRECT!)
                </div>
              </div>

            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>Real-World Example: Age Calculator</h3>
            <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.8 }}>
              <span style={{ color: '#64748b' }}># Step 1: Take user input (received as string)</span><br />
              birth_year_str = input(<span style={{ color: '#a5b4fc' }}>"Enter your birth year: "</span>)<br />
              <br />
              <span style={{ color: '#64748b' }}># Step 2: Type cast string into integer</span><br />
              birth_year = int(birth_year_str)<br />
              <br />
              <span style={{ color: '#64748b' }}># Step 3: Perform math calculation</span><br />
              current_year = 2026<br />
              age = current_year - birth_year<br />
              <br />
              print(f<span style={{ color: '#a5b4fc' }}>"You are approximately {`{age}`} years old."</span>)
            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_superpowers')}>
                Next: AI Python Superpowers <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("How does type casting work in Python, and what is the difference between explicit and implicit casting?")}>
                Ask AI Tutor: Explain Type Casting
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 6. AI PYTHON SUPERPOWERS */}
      {activeTab === 'ai_superpowers' && (
        <Section key="ai_superpowers" id="ai_superpowers" eyebrow="Day 1 • AI Advantage" title="🤖 AI Python Superpowers">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #3b0764 100%)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(76,29,149,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
                <Zap size={28} color="#facc15" />
                <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'white', fontWeight: 800 }}>How AI Transform Python Coding</h3>
              </div>
              <p style={{ color: '#e9d5ff', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                In this course, you are learning the modern **AI-Powered** development workflow. Why spend 3 hours debugging a typo when AI can find and fix syntax errors in 0.2 seconds? Here is how professional engineers use AI tools on Day 1:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#eff6ff', padding: '0.6rem', borderRadius: '10px', color: '#3b82f6' }}>
                    <Code size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>1. GitHub Copilot Autocomplete</h4>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  As you type comments like <code># Calculate area of circle</code>, AI instantly writes the complete Python formula for you. It acts as an expert pair programmer sitting right next to you!
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#f0fdf4', padding: '0.6rem', borderRadius: '10px', color: '#10b981' }}>
                    <CheckCircle size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>2. Instant Traceback Debugging</h4>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Got a <code>ValueError: invalid literal for int()</code>? Just paste your terminal error into ChatGPT or Claude, and ask: *"Why did my script fail?"* AI explains the exact line number and gives the fix!
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#fffbeb', padding: '0.6rem', borderRadius: '10px', color: '#d97706' }}>
                    <Lightbulb size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>3. Automated Docstrings & Comments</h4>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Select any block of Python code and use AI shortcut commands to automatically generate clean enterprise documentation and inline explanations for your team.
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Next: Live Python Playground <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => openAITutor("How can I write code faster using AI pair programmers like Copilot?")}>
                Ask AI Tutor: AI Code Superpowers
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 7. LIVE PYTHON PLAYGROUND */}
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Day 1 • Interactive Practice" title="💻 Live Python Playground">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Practice writing Python code right here in your browser! We have created a simulated Python Virtual Machine (PVM) environment. Test variables, string formatting, and type casting live.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              
              {/* CODE EDITOR BOX */}
              <div style={{ border: '1px solid #334155', borderRadius: '14px', overflow: 'hidden', background: '#0f172a' }}>
                <div style={{ background: '#1e293b', padding: '0.8rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code size={18} color="#38bdf8" /> main.py
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                  </div>
                </div>
                
                <textarea
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  style={{
                    width: '100%',
                    height: '240px',
                    background: '#0f172a',
                    color: '#f8fafc',
                    border: 'none',
                    padding: '1.2rem',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ background: '#1e293b', padding: '1rem', borderTop: '1px solid #334155', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Simulate input("Name"):</label>
                    <input 
                      type="text" 
                      value={simulatedInputName} 
                      onChange={(e) => setSimulatedInputName(e.target.value)}
                      style={{ background: '#0f172a', border: '1px solid #475569', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '6px', width: '90px', fontSize: '0.85rem' }} 
                    />
                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>input("Age"):</label>
                    <input 
                      type="text" 
                      value={simulatedInputAge} 
                      onChange={(e) => setSimulatedInputAge(e.target.value)}
                      style={{ background: '#0f172a', border: '1px solid #475569', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '6px', width: '50px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={getPlaygroundAIFeedback}
                      style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(139,92,246,0.3)', transition: 'background 0.2s' }}
                    >
                      <Bot size={18} /> AI Co-pilot
                    </button>
                    <button 
                      onClick={runSimulatedPython}
                      style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(16,185,129,0.3)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
                    >
                      <Play size={18} fill="white" /> Run Python Code
                    </button>
                  </div>
                </div>
              </div>

              {/* CONSOLE / AI FEEDBACK TABBED BOX */}
              <div style={{ border: '1px solid #334155', borderRadius: '14px', overflow: 'hidden', background: '#000000', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex' }}>
                  <button 
                    onClick={() => setActivePlaygroundTab('output')}
                    style={{ background: activePlaygroundTab === 'output' ? '#000000' : 'transparent', color: activePlaygroundTab === 'output' ? '#10b981' : '#94a3b8', border: 'none', padding: '0.8rem 1.2rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Terminal size={16} /> Python Terminal
                  </button>
                  <button 
                    onClick={() => { if (!aiFeedback) getPlaygroundAIFeedback(); else setActivePlaygroundTab('ai'); }}
                    style={{ background: activePlaygroundTab === 'ai' ? '#000000' : 'transparent', color: activePlaygroundTab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', padding: '0.8rem 1.2rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Bot size={16} /> ✨ AI Co-pilot Feedback {aiLoading && '...'}
                  </button>
                </div>
                
                {activePlaygroundTab === 'output' ? (
                  <div style={{ padding: '1.2rem', fontFamily: 'monospace', fontSize: '0.95rem', color: '#10b981', flex: 1, whiteSpace: 'pre-wrap', lineHeight: 1.7, overflowY: 'auto', minHeight: '220px' }}>
                    {consoleOutput}
                  </div>
                ) : (
                  <div style={{ padding: '1.2rem', fontFamily: 'monospace', fontSize: '0.95rem', color: '#a5b4fc', flex: 1, whiteSpace: 'pre-wrap', lineHeight: 1.7, overflowY: 'auto', minHeight: '220px', background: '#090514' }}>
                    {aiFeedback}
                  </div>
                )}
              </div>

            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #3b82f6', textAlign: 'center' }}>
              <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>🎉 Day 1 Completed! You are now a Python Programmer!</h4>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '1rem' }}>
                You have mastered variables, syntax, input/output functions, explicit type casting, and AI superpowers. Get ready for Day 2: Operators & Conditional Statements!
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ background: '#3b82f6', padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => alert("Congratulations! Day 1 Python Fundamentals completed with +50 XP!")}>
                Finish Day 1 Class 🎉
              </button>
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => openAITutor("Can you explain the main.py code in this playground and suggest a challenge?")}>
                Ask AI Tutor: Explain Playground Code
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
