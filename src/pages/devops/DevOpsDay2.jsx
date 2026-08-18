import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Cpu, RefreshCw, Layers, Settings, Play, Download, HelpCircle
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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

export default function DevOpsDay2({ activeTab, onNavigate, openAITutor }) {
  const go = (id) => { onNavigate('devops_module2', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Dockerfile Generator Sandbox States ── */
  const [appType, setAppType] = useState('django');
  const [baseImage, setBaseImage] = useState('python:3.10-slim');
  const [workDir, setWorkDir] = useState('/app');
  const [exposePort, setExposePort] = useState('8000');
  const [runCommand, setRunCommand] = useState('python manage.py runserver 0.0.0.0:8000');

  const [dockerLogs, setDockerLogs] = useState(['Docker Engine: online. Awaiting build trigger...']);
  const [buildStep, setBuildStep] = useState(-1);

  // Sync selectors when changing project presets
  const handlePresetChange = (type) => {
    setAppType(type);
    if (type === 'django') {
      setBaseImage('python:3.10-slim');
      setWorkDir('/app');
      setExposePort('8000');
      setRunCommand('python manage.py runserver 0.0.0.0:8000');
    } else {
      setBaseImage('node:20-alpine');
      setWorkDir('/usr/src/app');
      setExposePort('5173');
      setRunCommand('npm run dev -- --host');
    }
  };

  // Compile Dockerfile
  const dockerfileCode = `FROM ${baseImage}

# Set environment paths
WORKDIR ${workDir}

# Copy dependency catalogs
COPY ${appType === 'django' ? 'requirements.txt' : 'package.json package-lock.json'} ./

# Install packages
RUN ${appType === 'django' ? 'pip install -r requirements.txt' : 'npm install'}

# Copy local source code files
COPY . .

# Expose port
EXPOSE ${exposePort}

# Run execution command
CMD [${runCommand.split(' ').map(c => `"${c}"`).join(', ')}]`;

  const runDockerBuild = async () => {
    setBuildStep(0);
    let tempLogs = [`$ docker build -t my-${appType}-app:latest .`];
    setDockerLogs(tempLogs);

    // 1. Send Build Context
    await new Promise(r => setTimeout(r, 200));
    setBuildStep(1);
    tempLogs.push('Sending build context to Docker daemon... 2.14 MB');
    setDockerLogs([...tempLogs]);

    // 2. Pull Base Image
    await new Promise(r => setTimeout(r, 250));
    setBuildStep(2);
    tempLogs.push(`Step 1/6 : FROM ${baseImage}`);
    tempLogs.push(`---> Pulling image cache metadata from Docker Hub registry`);
    setDockerLogs([...tempLogs]);

    // 3. Set WORKDIR
    await new Promise(r => setTimeout(r, 200));
    setBuildStep(3);
    tempLogs.push(`Step 2/6 : WORKDIR ${workDir}`);
    setDockerLogs([...tempLogs]);

    // 4. Install dependencies
    await new Promise(r => setTimeout(r, 300));
    setBuildStep(4);
    tempLogs.push(`Step 4/6 : RUN ${appType === 'django' ? 'pip install' : 'npm install'}`);
    tempLogs.push('-----> Container packages resolved successfully.');
    setDockerLogs([...tempLogs]);

    // 5. Expose & CMD
    await new Promise(r => setTimeout(r, 200));
    setBuildStep(5);
    tempLogs.push(`Step 5/6 : EXPOSE ${exposePort}`);
    tempLogs.push(`Step 6/6 : CMD ...`);
    tempLogs.push(`Successfully built image: my-${appType}-app:latest`);
    tempLogs.push(`$ docker run -d -p ${exposePort}:${exposePort} my-${appType}-app:latest`);
    tempLogs.push(`[Running] Web app listening inside container on port ${exposePort}!`);
    setDockerLogs([...tempLogs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which Docker command is used to inspect all active running containers on your system?',
      opts: ['docker run', 'docker build', 'docker ps', 'docker images'],
      ans: 2,
      exp: 'The "docker ps" command lists all running containers, showing their IDs, image names, statuses, and ports.'
    },
    {
      k: 'q2',
      q: 'What is the function of the WORKDIR instruction in a Dockerfile?',
      opts: [
        'It sets the host machines operating system target',
        'It defines the default path folder inside the container where command processes are executed',
        'It downloads dependencies from GitHub repositories',
        'It opens port forwarding rules automatically'
      ],
      ans: 1,
      exp: 'WORKDIR sets the working directory for all subsequent instructions like COPY, RUN, and CMD inside the container environment.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRODUCTION: WHAT IS DOCKER & INSTALLATION ────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="DevOps • Day 2 • Module 01" title="What is Docker &amp; Installation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* AI Assistant Help */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Layers size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Struggling with Docker Desktop settings or WSL2? Ask the AI Tutor!</span>
              </div>
              <button className="btn btn-sm" onClick={() => openAITutor('Explain how to install Docker Desktop on Windows 10/11 and configure WSL2 backend support.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>📦 What is Docker?</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7 }}>
                **Docker** is an open-source containerization platform that allows developers to package their applications, dependencies, and environment configurations into a single deployable artifact. This ensures that the application runs identically on your local workstation, staging servers, and production environments.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Installing Docker Desktop</h3>
            <p style={{ fontSize: '0.9rem' }}>Follow these prerequisites and installation guidelines to setup Docker Desktop on your operating system:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Download size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <strong>1. Download Installer</strong>
                  <p style={{ fontSize: '0.78rem', color: '#475569', margin: '2px 0 0' }}>Visit the official Docker site and download the stable installation build package for your system (Windows, Mac, or Linux).</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderTop: '1px solid #cbd5e1', paddingTop: 8 }}>
                <Cpu size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <strong>2. Windows WSL2 Requirements</strong>
                  <p style={{ fontSize: '0.78rem', color: '#475569', margin: '2px 0 0' }}>For Windows, make sure you enable Hyper-V and install the **WSL2 (Windows Subsystem for Linux)** backend update package. Check "Use WSL2 instead of Hyper-V" in settings.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderTop: '1px solid #cbd5e1', paddingTop: 8 }}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <strong>3. Verify Installation</strong>
                  <p style={{ fontSize: '0.78rem', color: '#475569', margin: '2px 0 0' }}>Launch your local terminal shell and run: <code>docker --version</code> to verify that the CLI binary works correctly.</p>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Images vs Containers &amp; Commands <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. IMAGES VS CONTAINERS & DOCKER COMMANDS ──────────────── */}
      {activeTab === 'session_config' && (
        <Section key="images_commands" eyebrow="DevOps • Day 2 • Module 02" title="Images vs Containers &amp; Core Commands">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Images vs. Containers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                <strong style={{ color: '#0284c7' }}>💿 Docker Image</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '4px 0 0' }}>A read-only blueprint containing the application code, libraries, runtime environment, and dependency dependencies. It is static and cannot change.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                <strong style={{ color: '#10b981' }}>⚡ Docker Container</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '4px 0 0' }}>A writeable, running instance of a Docker image. Containers operate as isolated environment layers, executing application run scripts.</p>
              </div>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Core Docker Commands (build, run, stop, ps)</h3>
            <p style={{ fontSize: '0.9rem' }}>These 4 commands form the foundation of controlling local containers:</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Command Syntax</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>docker build -t &lt;name&gt; .</td>
                  <td style={{ padding: '8px' }}>Builds a static Docker image using the rules defined inside the local <code>Dockerfile</code> context.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>docker run -d -p 8000:8000 &lt;name&gt;</td>
                  <td style={{ padding: '8px' }}>Launches a container in detached mode (<code>-d</code>) and maps host port 8000 to container port 8000 (<code>-p</code>).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>docker ps</td>
                  <td style={{ padding: '8px' }}>Lists all currently running containers. Add <code>-a</code> to view stopped ones.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700 }}>docker stop &lt;container_id&gt;</td>
                  <td style={{ padding: '8px' }}>Gracefully shuts down the target container instance process.</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Dockerfile &amp; Compose Basics <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. DOCKERFILE & COMPOSE BASICS ──────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="dockerfile_compose" eyebrow="DevOps • Day 2 • Workspace" title="Dockerfile &amp; Compose Configurations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Customize the app preset configuration to inspect generated Dockerfile parameters. Run the build to test image builds live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Generator control side */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>⚙️ Configure App Image</h4>
                
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>App Template</label>
                  <select value={appType} onChange={e => handlePresetChange(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                    <option value="django">Django Python Backend</option>
                    <option value="react">React JS Frontend</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Base OS Image</label>
                  <input type="text" value={baseImage} onChange={e => setBaseImage(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Working Directory</label>
                  <input type="text" value={workDir} onChange={e => setWorkDir(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Expose Port</label>
                  <input type="text" value={exposePort} onChange={e => setExposePort(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                </div>

                <button onClick={runDockerBuild} style={{ width: '100%', padding: '10px', background: '#0284c7', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Play size={14} /> Run Build Container
                </button>
              </div>

              {/* Code Blocks and details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <CodeBlock title="Dockerfile (Auto Generated)" code={dockerfileCode} />
                
                {/* Steps tracker */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '0.8rem' }}>
                  <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800, fontSize: '0.8rem' }}>📦 Docker Build Steps</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                    {['1. Context', '2. Base OS', '3. Set WorkDir', '4. Pkgs install', '5. Run CMD'].map((step, idx) => {
                      const isActive = buildStep === (idx + 1);
                      const isPassed = buildStep > (idx + 1);
                      let bg = '#f1f5f9', border = '1px solid #cbd5e1', color = '#94a3b8';
                      if (isActive) {
                        bg = '#e0f2fe'; border = '1.5px solid #0284c7'; color = '#0369a1';
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
              </div>

            </div>

            {/* Docker Engine Logs */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden', marginBottom: '1.2rem' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Docker Engine Output Logs</div>
              <div style={{ maxHeight: 100, minHeight: 100, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dockerLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('$') ? '#f59e0b' : log.includes('Step') ? '#38bdf8' : log.includes('Successfully') || log.includes('[Running]') ? '#86efac' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>3. Multi-Container Orchestration (Docker Compose)</h3>
            <p style={{ fontSize: '0.85rem' }}>We utilize a <code>docker-compose.yml</code> file at the project root to orchestrate multiple containers (e.g. Django api + React static files) in a unified local network:</p>
            <CodeBlock title="docker-compose.yml" code={`version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    stdin_open: true
    tty: true`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 2 Quiz — Docker Containerization">
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
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0284c7'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0284c7' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0284c7', borderColor: '#0284c7', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 2 Assignment (5 Tasks)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>🛠️ Mini Project: Containerize a Full-Stack Application</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Complete the following 5 tasks in your project workspace:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { t: 'Task 1: Create Dockerfile for React', d: 'Write a Dockerfile in your frontend React directory using node:alpine base image, exposing port 5173.' },
                  { t: 'Task 2: Create Dockerfile for Django', d: 'Write a Dockerfile in your backend Django folder. Install dependencies from requirements.txt, exposing port 8000.' },
                  { t: 'Task 3: Docker Compose configuration', d: 'Create docker-compose.yml at the project root directory linking both frontend and backend services together.' },
                  { t: 'Task 4: Run Multiple Containers', d: 'Execute terminal command: "docker compose up --build" to build both image directories and launch them simultaneously.' },
                  { t: 'Task 5: Verify Application inside Docker', d: 'Open your local web browser. Navigate to http://localhost:5173/ and http://localhost:8000/api/ to verify both services route traffic correctly.' }
                ].map((item, idx) => (
                  <div key={item.t} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a' }}>{item.t}</div>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#475569' }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('devops_module3', 'intro_sessions')}>
              Complete Day 2 &amp; Go to Day 3 <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
