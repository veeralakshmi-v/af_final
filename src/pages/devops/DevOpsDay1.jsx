import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, GitBranch, RefreshCw, Server, Zap, Cpu, Key, Lock
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

const InfoBox = ({ icon: Icon, color, bg, border, children }) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: 12, display: 'flex', gap: 10, color, margin: '1rem 0' }}>
    <Icon size={20} style={{ flexShrink: 0, marginTop: 2 }} />
    <div style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{children}</div>
  </div>
);

export default function DevOpsDay1({ activeTab, onNavigate, openAITutor }) {
  const go = (id) => { onNavigate('devops_module1', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── CI Pipeline Simulator States ── */
  const [pipelineLogs, setPipelineLogs] = useState(['Runner: Awaiting git trigger event. Click "Simulate Push" below...']);
  const [activeStep, setActiveStep] = useState(-1);
  const [commitMessage, setCommitMessage] = useState('feat: update API database credentials');
  const [targetBranch, setTargetBranch] = useState('main');

  const runCiSimulator = async () => {
    setActiveStep(0);
    let tempLogs = [`[Git Event] Commit: "${commitMessage}" pushed to origin/${targetBranch}`];
    setPipelineLogs(tempLogs);

    // Step 1: Initialize VM
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(1);
    tempLogs.push('[Runner VM] Spinning up Ubuntu-latest hosted virtual environment instance');
    setPipelineLogs([...tempLogs]);

    // Step 2: Checkout Code
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(2);
    tempLogs.push('[Actions] Executing actions/checkout@v4 - Source files retrieved');
    setPipelineLogs([...tempLogs]);

    // Step 3: Run Linter
    await new Promise(r => setTimeout(r, 250));
    setActiveStep(3);
    tempLogs.push('[Linter Check] Running Flake8/ESLint syntax audits. Pass: 0 warnings');
    setPipelineLogs([...tempLogs]);

    // Step 4: Run Tests
    await new Promise(r => setTimeout(r, 250));
    setActiveStep(4);
    tempLogs.push('[Unit Tests] Running test suites... 14 passed, 0 failed. SUCCESS');
    setPipelineLogs([...tempLogs]);

    // Step 5: Finished
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(5);
    tempLogs.push('🎉 Workflow Success: Pipeline finished building successfully!');
    setPipelineLogs([...tempLogs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'What is DevOps?',
      opts: [
        'A Python framework designed for database aggregation',
        'A set of cultural philosophies, practices, and tools that automates software development and deployment processes',
        'A browser extension for syntax highlighting React pages',
        'A cloud database hosting platform similar to PostgreSQL'
      ],
      ans: 1,
      exp: 'DevOps bridges the gap between software development (Dev) and IT operations (Ops) to ensure faster, continuous delivery.'
    },
    {
      k: 'q2',
      q: 'Which branch strategy isolates unstable features during active group development?',
      opts: [
        'Pushing commits directly to the main branch',
        'Creating separate feature branches and merging them via validated Pull Requests',
        'Rewriting database migration tables locally',
        'Bypassing the Git workflow entirely'
      ],
      ans: 1,
      exp: 'Feature branching keeps the main/production branch clean and stable, validating code on feature/ branches via CI tests before merging.'
    },
    {
      k: 'q3',
      q: 'Why should credentials and keys never be committed to a public GitHub repository?',
      opts: [
        'It makes the code compile slower',
        'It presents high security risks; instead, use environment variables (.env) and list .env in your .gitignore file',
        'GitHub Actions workflows only run if settings files are clean of text comments',
        'Git cannot serialize strings containing special character symbols'
      ],
      ans: 1,
      exp: 'Committing raw passwords or API keys allows unauthorized access. Standard practice is storing them in local .env files and registering .env inside .gitignore.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRODUCTION: WHAT IS DEVOPS & SDLC VS DEVOPS ───────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="DevOps • Day 1 • Module 01" title="What is DevOps &amp; SDLC Lifecycle?">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* AI Assistant Help */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Zap size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Need clarification on the DevOps pipeline lifecycle? Ask the AI Tutor!</span>
              </div>
              <button className="btn btn-sm" onClick={() => openAITutor('Explain the stages of the DevOps loop: Plan, Code, Build, Test, Release, Deploy, Operate, Monitor.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🚀 What is DevOps?</h3>
              <p style={{ color: '#e0e7ff', margin: 0, lineHeight: 1.7 }}>
                **DevOps** is the union of people, processes, and technology to enable continuous delivery of value to end-users. It removes the traditional siloed wall between developers (who write code) and operations engineers (who maintain hardware servers).
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>SDLC vs. DevOps Lifecycle</h3>
            <p style={{ fontSize: '0.9rem' }}>The Software Development Life Cycle (SDLC) defines how applications are planned, built, tested, and shipped. Here is how traditional release lifecycles compare to modern DevOps workflows:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#ef4444', fontWeight: 800, marginTop: 0 }}>⏱️ Traditional SDLC (Waterfall)</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>**Siloed Phases**: Design ➔ Code ➔ QA Test ➔ Deploy.</li>
                  <li>**Manual Testing**: Quality checks happen at the end, leading to bugs discovery delays.</li>
                  <li>**Infrequent Releases**: Large deployments take place monthly or quarterly, leading to high release risk.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#10b981', fontWeight: 800, marginTop: 0 }}>♾️ Continuous DevOps Lifecycle</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>**Infinite Feedback Loop**: Code integration triggers automated tests instantly.</li>
                  <li>**Continuous Validation**: Code is built and test-audited immediately in virtual runners.</li>
                  <li>**Frequent Small Deploys**: Deployments happen daily, ensuring fast, lower-risk updates.</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: CI/CD &amp; Git Workflow <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CI/CD OVERVIEW & GIT WORKFLOW REVIEW ────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="git_workflow" eyebrow="DevOps • Day 1 • Module 02" title="CI/CD &amp; Git Workflow Review">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. CI/CD Pipeline Overview</h3>
            <p style={{ fontSize: '0.9rem' }}>A CI/CD pipeline automates the journey of code changes from a developer's machine to production deployment:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                <strong style={{ color: '#6366f1' }}>🔄 Continuous Integration (CI)</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '4px 0 0' }}>Automatically checks out branches, compiles code, runs lint style audits, and executes test suites on push.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                <strong style={{ color: '#10b981' }}>🚀 Continuous Delivery / Deployment (CD)</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '4px 0 0' }}>Automatically deploys the validated build artifacts directly to web host servers (Vercel, Render) or Docker container registers.</p>
              </div>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Git &amp; GitHub Workflow Command Cheat Sheet</h3>
            <p style={{ fontSize: '0.9rem' }}>Review the basic Git commands used to synchronize local changes to GitHub repositories:</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Git Command</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>git init</td>
                  <td style={{ padding: '8px' }}>Initializes a brand new local Git repository metadata setup.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>git clone &lt;url&gt;</td>
                  <td style={{ padding: '8px' }}>Copies a remote repository down to your local system folder.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>git add .</td>
                  <td style={{ padding: '8px' }}>Stages all current modifications ready to be committed.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>git commit -m "msg"</td>
                  <td style={{ padding: '8px' }}>Records a snapshot of your staged changes with a summary note.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>git push origin main</td>
                  <td style={{ padding: '8px' }}>Sends committed local changes up to the GitHub remote repository.</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Branching &amp; GitHub Actions <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. BRANCHING STRATEGY & GITHUB ACTIONS INTRODUCTION ────── */}
      {activeTab === 'session_views' && (
        <Section key="branching_actions" eyebrow="DevOps • Day 1 • Module 03" title="Branching Strategies &amp; GitHub Actions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Branching Strategy</h3>
            <p style={{ fontSize: '0.9rem' }}>To prevent team members from overwriting each other's changes, developers use a structured branching model:</p>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
              <li>**main / master**: Reflects production-ready code. Commits are pushed via Pull Requests only.</li>
              <li>**feature/&lt;name&gt;**: Isolated branches created for single features (e.g. `git checkout -b feature/user-profile`).</li>
              <li>**hotfix/&lt;name&gt;**: Branches designed to quickly patch urgent live production bugs.</li>
            </ul>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Introduction to GitHub Actions</h3>
            <p style={{ fontSize: '0.9rem' }}>GitHub Actions is a built-in CI/CD service that automates test builds directly inside your repository. We configure pipelines by writing a YAML (`.yml`) workflow file.</p>
            
            <CodeBlock title=".github/workflows/ci.yml" code={`name: Django & React Test Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate_code:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Run Tests
      run: npm test`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('middleware_intro')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Environment Variables (.env) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. ENVIRONMENT VARIABLES (.ENV) ────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="env_variables" eyebrow="DevOps • Day 1 • Module 04" title="Environment Variables (.env)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Secrets like credentials, Stripe tokens, database passwords, and SECRET_KEYs should **never** be hardcoded directly inside settings files. Instead, developers isolate them using environment variables.</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Defining the local .env file</h3>
            <p style={{ fontSize: '0.9rem' }}>Create a file named <code>.env</code> at the root directory of your project (and add it to your <code>.gitignore</code> file so it isn't pushed to GitHub):</p>
            
            <pre style={{ background: '#0f172a', color: '#a5d6ff', padding: '12px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
{`# Local environment credentials config
SECRET_KEY=django-insecure-33a8b2dfa1e99ca1
DATABASE_URL=postgresql://user:pass@localhost:5432/inventory_db
DEBUG=True
API_KEY=sk_test_51Mz88ab29c0f99a`}
            </pre>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Reading Environment Variables in Code</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>🐍 Python / Django Settings</strong>
                <CodeBlock title="settings.py" code={`import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG') == 'True'`} />
              </div>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>⚡ Node.js / Javascript</strong>
                <CodeBlock title="db.js" code={`require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;`} />
              </div>
            </div>

            <InfoBox icon={Lock} color="#0369a1" bg="#e0f2fe" border="#bae6fd">
              <strong>Security Rule:</strong> If you leak credentials on a public repository, attackers utilize scanner bots to sweep GitHub commits and locate secrets to abuse within seconds. Always list <code>.env</code> inside your <code>.gitignore</code> file!
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Actions Runner Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. RUNNER SANDBOX ───────────────────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="runner_sandbox" eyebrow="DevOps • Day 1 • Workspace" title="GitHub Actions CI Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Customize the git parameters and simulate a commit push. Watch the pipeline runner spin up containers, pull the code, execute tests, and report builds logs.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Form trigger configuration */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2.rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>📂 Commit Parameters</h4>
                
                <div style={{ padding: '5px 0' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Commit Message</label>
                  <input type="text" value={commitMessage} onChange={e => setCommitMessage(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                </div>

                <div style={{ padding: '5px 0' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Branch Target</label>
                  <select value={targetBranch} onChange={e => setTargetBranch(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                    <option value="main">main (Production triggers)</option>
                    <option value="feature/login">feature/login (PR only)</option>
                    <option value="hotfix/cors">hotfix/cors (Hotfix push)</option>
                  </select>
                </div>

                <button onClick={runCiSimulator} style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <RefreshCw size={14} /> Simulate Push Trigger
                </button>
              </div>

              {/* Runner Pipeline logs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '0.8rem' }}>
                  <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800, fontSize: '0.8rem' }}>⚙️ GitHub Job Steps</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                    {['Init VM', 'Checkout', 'Syntax check', 'Unit tests', 'Build pkg'].map((step, idx) => {
                      const isActive = activeStep === (idx + 1);
                      const isPassed = activeStep > (idx + 1);
                      let bg = '#f1f5f9', border = '1px solid #cbd5e1', color = '#94a3b8';
                      if (isActive) {
                        bg = '#e0e7ff'; border = '1.5px solid #6366f1'; color = '#4f46e5';
                      } else if (isPassed) {
                        bg = '#d1fae5'; border = '1.5px solid #10b981'; color = '#065f46';
                      }
                      return (
                        <div key={step} style={{ background: bg, border, borderRadius: 6, padding: '6px 4px', fontSize: '0.62rem', textAlign: 'center', fontWeight: 700, color }}>
                          {step}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dark terminal viewer */}
                <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden', flexGrow: 1 }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Actions Runner Terminal Console</div>
                  <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {pipelineLogs.map((log, i) => (
                      <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Git') ? '#f59e0b' : log.startsWith('🎉') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 1 Quiz — DevOps &amp; Git">
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
                      } else if (selected) { bg = '#e0e7ff'; border = '1.5px solid #6366f1'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 1 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Create Your First GitHub Actions CI Pipeline</h4>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Create a test Django or React application repository on your local system.</li>
                <li>At the repository root, create the directory structure: <code>.github/workflows/</code>.</li>
                <li>Create a file named <code>ci.yml</code> inside it.</li>
                <li>Write a pipeline workflow setting triggers on push events targeting the <code>main</code> branch.</li>
                <li>Create a <code>.env</code> file containing mock API keys, read them in your application, and add <code>.env</code> to your <code>.gitignore</code> file.</li>
                <li>Commit the files and push your changes to GitHub. View the **Actions** tab on your browser repository layout to inspect the running actions status.</li>
              </ol>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#6366f1', borderColor: '#6366f1', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('devops_module2', 'intro_sessions')}>
              Complete Day 1 &amp; Go to Day 2 <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
