import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Globe, Server, Lock, RefreshCw
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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

const Step = ({ num, title, children }) => (
  <div style={{ display: 'flex', gap: 12, paddingBottom: 14, borderBottom: '1px solid #e2e8f0' }}>
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#10b981', color: 'white', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{num}</div>
    <div style={{ fontSize: '0.85rem', color: '#334155' }}>
      <strong style={{ color: '#0f172a', display: 'block', marginBottom: 4 }}>{title}</strong>
      {children}
    </div>
  </div>
);

export default function DevOpsDay3({ activeTab, onNavigate, openAITutor }) {
  const go = (id) => { onNavigate('devops_module3', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── CI/CD Deployment Simulator ── */
  const [pipelineLogs, setPipelineLogs] = useState(['Runner: online. Click "Deploy to Production" to start the release cycle...']);
  const [activeStep, setActiveStep] = useState(-1);
  const [liveUrls, setLiveUrls] = useState(null);

  const runDeploymentPipeline = async () => {
    setActiveStep(0);
    setLiveUrls(null);
    let logs = ['$ git push origin main'];
    setPipelineLogs([...logs]);

    await new Promise(r => setTimeout(r, 200));
    setActiveStep(1);
    logs.push('[GitHub Actions] Lint & tests passed. Triggering CD pipelines...');
    setPipelineLogs([...logs]);

    await new Promise(r => setTimeout(r, 280));
    setActiveStep(2);
    logs.push('[Vercel] Building React static bundle → npm run build...');
    logs.push('[Vercel] Deployed to CDN. Edge nodes ready.');
    setPipelineLogs([...logs]);

    await new Promise(r => setTimeout(r, 280));
    setActiveStep(3);
    logs.push('[Render] Deploy webhook triggered. Starting Gunicorn container...');
    setPipelineLogs([...logs]);

    await new Promise(r => setTimeout(r, 300));
    setActiveStep(4);
    logs.push('[Render] Running: python manage.py migrate...');
    logs.push('[Render] Applied 3 migrations. Database schema up to date.');
    setPipelineLogs([...logs]);

    await new Promise(r => setTimeout(r, 200));
    setActiveStep(5);
    logs.push('🎉 Full-stack deployment completed successfully!');
    setPipelineLogs([...logs]);
    setLiveUrls({
      frontend: 'https://student-management.vercel.app',
      backend: 'https://student-api.onrender.com'
    });
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Why is SQLite not recommended for production cloud deployments?',
      opts: [
        'SQLite does not support SQL SELECT queries',
        'SQLite is too expensive to run in the cloud',
        'SQLite stores data in a single file that resets on container rebuild and cannot handle concurrent writes from multiple workers',
        'PostgreSQL is harder to install than SQLite'
      ],
      ans: 2,
      exp: 'SQLite is a file-based database — when a cloud container rebuilds, the file is wiped. It also locks on concurrent writes, making it unsuitable for multi-user production workloads.'
    },
    {
      k: 'q2',
      q: 'What does an SSL certificate do for your deployed website?',
      opts: [
        'It speeds up your database queries',
        'It minifies JavaScript bundle sizes',
        'It encrypts data between the browser and server and enables the HTTPS secure connection',
        'It compresses Docker image layers'
      ],
      ans: 2,
      exp: 'SSL/TLS certificates encrypt all traffic between the client and server, enabling HTTPS. Vercel and Render auto-provision free Let\'s Encrypt certificates.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. CLOUD DEPLOYMENT: REACT & DJANGO STEPS ───────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="DevOps • Day 3 • Module 01" title="Cloud Deployment (React &amp; Django)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* AI Tutor */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Globe size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Struggling with Vercel build settings or Render environment configs? Ask the AI Tutor!</span>
              </div>
              <button onClick={() => openAITutor('Explain how to configure Vercel build settings for a Vite React app and deploy Django on Render with PostgreSQL.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            {/* Hero banner */}
            <div style={{ background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', margin: '0 0 0.5rem' }}>🌐 Deploying Full-Stack Services to the Cloud</h3>
              <p style={{ color: '#d1fae5', margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>
                We split the deployment: the static React build goes to an edge CDN (Vercel/Netlify) for instant global delivery, while the Django API runs on a managed cloud host (Render/Railway) connected to a persistent PostgreSQL database.
              </p>
            </div>

            {/* ── REACT STEPS ── */}
            <div style={{ background: '#f8fafc', border: '1px solid #bae6fd', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#0369a1', fontWeight: 800, marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Globe size={18} /> Deploying React on Vercel — Step by Step
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Step num="1" title="Create vercel.json for SPA routing">
                  React Router needs every URL to resolve to <code>index.html</code>. Create <code>vercel.json</code> at your project root:
                  <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '10px 12px', borderRadius: 8, fontSize: '0.75rem', marginTop: 6, overflowX: 'auto' }}>
{`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
                  </pre>
                </Step>
                <Step num="2" title="Push your project to GitHub">
                  Commit all code and push to your GitHub repository. Vercel will watch this repo for changes.
                </Step>
                <Step num="3" title="Import repo into Vercel">
                  Go to <strong>vercel.com</strong> → <strong>Add New → Project</strong> → connect GitHub → select your React repo.
                </Step>
                <Step num="4" title="Configure build settings and deploy">
                  <ul style={{ paddingLeft: '1.1rem', margin: '4px 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <li><strong>Build Command:</strong> <code>npm run build</code></li>
                    <li><strong>Output Directory:</strong> <code>dist</code> (Vite) or <code>build</code> (CRA)</li>
                    <li>Add any environment variables (e.g. <code>VITE_API_URL</code>) in the <em>Environment Variables</em> panel</li>
                    <li>Click <strong>Deploy</strong> — Vercel builds and publishes a live HTTPS URL instantly.</li>
                  </ul>
                </Step>
              </div>
            </div>

            {/* ── DJANGO STEPS ── */}
            <div style={{ background: '#f8fafc', border: '1px solid #6ee7b7', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#0f766e', fontWeight: 800, marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Server size={18} /> Deploying Django on Render + PostgreSQL — Step by Step
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Step num="1" title="Provision a PostgreSQL database on Render">
                  Render dashboard → <strong>New → PostgreSQL</strong> → give it a name → free plan → <strong>Create Database</strong>. Copy the <strong>External Database URL</strong>.
                </Step>
                <Step num="2" title="Install production packages">
                  <pre style={{ background: '#0f172a', color: '#34d399', padding: '10px 12px', borderRadius: 8, fontSize: '0.75rem', marginTop: 4, overflowX: 'auto' }}>
{`pip install gunicorn dj-database-url python-dotenv
pip freeze > requirements.txt`}
                  </pre>
                </Step>
                <Step num="3" title="Update settings.py to read environment variables">
                  <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '10px 12px', borderRadius: 8, fontSize: '0.72rem', marginTop: 4, overflowX: 'auto' }}>
{`import dj_database_url, os

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = ['*']  # restrict to your domain in production

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}`}
                  </pre>
                </Step>
                <Step num="4" title="Create a build.sh script">
                  At the Django project root, create <code>build.sh</code>:
                  <pre style={{ background: '#0f172a', color: '#fbbf24', padding: '10px 12px', borderRadius: 8, fontSize: '0.75rem', marginTop: 4, overflowX: 'auto' }}>
{`#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate`}
                  </pre>
                </Step>
                <Step num="5" title="Deploy as a Render Web Service">
                  <ul style={{ paddingLeft: '1.1rem', margin: '4px 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <li>Render → <strong>New → Web Service</strong> → connect Django GitHub repo</li>
                    <li><strong>Runtime:</strong> Python · <strong>Build Command:</strong> <code>./build.sh</code></li>
                    <li><strong>Start Command:</strong> <code>gunicorn mysite.wsgi:application</code> (replace <code>mysite</code> with your project name)</li>
                    <li>Under <em>Environment Variables</em>, add: <code>DATABASE_URL</code>, <code>SECRET_KEY</code>, <code>DEBUG=False</code></li>
                    <li>Click <strong>Create Web Service</strong> — Render runs migrations and starts the API live.</li>
                  </ul>
                </Step>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Next: Database &amp; Env Secrets <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. DATABASE CONFIG & ENV SECRETS ────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="db_secrets" eyebrow="DevOps • Day 3 • Module 02" title="Database Configuration &amp; Env Secrets">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. SQLite vs PostgreSQL in Production</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>SQLite is great for local development but must be replaced by PostgreSQL before deploying to the cloud:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>SQLite (Dev)</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>PostgreSQL (Production)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Architecture', 'File on disk (db.sqlite3)', 'Standalone server — separate node'],
                  ['Persistence', '❌ Wiped on container rebuild', '✅ Persists independently of containers'],
                  ['Concurrent writes', '❌ Locked — one writer at a time', '✅ Handles thousands of simultaneous connections'],
                  ['Cloud support', '❌ Not cloud-native', '✅ Supported by Render, Railway, Supabase, Neon'],
                ].map(([feat, dev, prod]) => (
                  <tr key={feat} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 700 }}>{feat}</td>
                    <td style={{ padding: '8px 10px', color: '#64748b' }}>{dev}</td>
                    <td style={{ padding: '8px 10px', color: '#059669' }}>{prod}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Environment Variables &amp; Secrets Management</h3>
            <p style={{ fontSize: '0.9rem' }}>Never hardcode secrets in your code. Store them in the host's environment panel and read them at runtime:</p>
            <CodeBlock title="settings.py — production database config" code={`import dj_database_url
import os

# Pulled from Render / Railway environment panel at runtime
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}`} />

            <InfoBox icon={Lock} color="#0369a1" bg="#e0f2fe" border="#bae6fd">
              <strong>Security rule:</strong> Always add <code>.env</code> to your <code>.gitignore</code> file. Never commit <code>DATABASE_URL</code>, <code>SECRET_KEY</code>, or API keys to GitHub — bots scan public repos in seconds.
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Next: CI/CD Pipeline &amp; Domains <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. GITHUB ACTIONS CD & DOMAINS/SSL ──────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="cicd_domains" eyebrow="DevOps • Day 3 • Module 03" title="GitHub Actions CD &amp; Domain / SSL">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. GitHub Actions — Automated Deployment Workflow</h3>
            <p style={{ fontSize: '0.9rem' }}>Create <code>.github/workflows/deploy.yml</code> to auto-trigger Render's deploy webhook every time code is pushed to <code>main</code>:</p>
            <CodeBlock title=".github/workflows/deploy.yml" code={`name: Continuous Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy_backend:
    runs-on: ubuntu-latest
    steps:
    - name: Trigger Render deploy webhook
      run: |
        curl -X POST \${'$'}{{ secrets.RENDER_DEPLOY_WEBHOOK_URL }}`} />

            <InfoBox icon={ShieldAlert} color="#854d0e" bg="#fefce8" border="#fde68a">
              Store your Render webhook URL as a GitHub secret: repo <strong>Settings → Secrets → Actions → New repository secret</strong> → name it <code>RENDER_DEPLOY_WEBHOOK_URL</code>.
            </InfoBox>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Custom Domain &amp; SSL</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 14 }}>
                <strong style={{ color: '#0369a1', display: 'block', marginBottom: 6 }}>🌐 DNS Records</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>
                  Add your custom domain (e.g. <code>myapp.com</code>) in Vercel/Render's domain panel. Then in your domain registrar add:
                </p>
                <ul style={{ fontSize: '0.76rem', color: '#475569', paddingLeft: '1rem', margin: '6px 0 0' }}>
                  <li><strong>A record</strong> — points root domain to host IP</li>
                  <li><strong>CNAME record</strong> — points <code>www</code> to your Vercel/Render URL</li>
                </ul>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 14 }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: 6 }}>🔒 SSL / HTTPS</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>
                  Both Vercel and Render automatically issue a free <strong>Let's Encrypt SSL certificate</strong> when you attach a domain. This enables the HTTPS padlock and encrypts all traffic between users and your servers.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Next: Live Deploy Simulator <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. LIVE DEPLOY SANDBOX ──────────────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="DevOps • Day 3 • Workspace" title="Live Cloud Deploy Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '1rem' }}>Click <strong>Deploy to Production</strong> to simulate a full CI/CD pipeline run — from git push to live URLs.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.2rem', marginBottom: '1.5rem' }}>

              {/* Controls + terminal */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>⚡ Deployment Control Panel</h4>
                <button onClick={runDeploymentPipeline} style={{ padding: '10px', background: '#10b981', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
                  <Globe size={14} /> Deploy to Production
                </button>
                <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden', flexGrow: 1 }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.72rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Pipeline Output Log</div>
                  <div style={{ maxHeight: 160, minHeight: 160, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {pipelineLogs.map((log, i) => (
                      <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('$') ? '#f59e0b' : log.startsWith('🎉') || log.includes('ready') || log.includes('up to date') ? '#86efac' : '#94a3b8' }}>{log}</pre>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status tracker + URLs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800, fontSize: '0.82rem' }}>📊 Pipeline Steps</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['Git Push', 'CI Tests', 'Vercel Build', 'Render Start', 'DB Migrate'].map((step, idx) => {
                      const isActive = activeStep === (idx + 1);
                      const isPassed = activeStep > (idx + 1);
                      const bg = isPassed ? '#d1fae5' : isActive ? '#d1fae5' : '#f1f5f9';
                      const border = isPassed || isActive ? '1.5px solid #10b981' : '1px solid #cbd5e1';
                      const color = isPassed || isActive ? '#065f46' : '#94a3b8';
                      return (
                        <div key={step} style={{ background: bg, border, borderRadius: 6, padding: '6px 8px', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color }}>{step}</span>
                          {isPassed && <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.65rem' }}>✓ Done</span>}
                          {isActive && <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.65rem' }}>Running…</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {liveUrls && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{ background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: 12, padding: '1rem', color: '#0369a1' }}>
                    <h5 style={{ margin: '0 0 8px', fontSize: '0.78rem', fontWeight: 800 }}>🌐 Live Endpoints</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.71rem' }}>
                      <div><strong>Frontend:</strong> <a href={liveUrls.frontend} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>{liveUrls.frontend}</a></div>
                      <div><strong>API:</strong> <a href={liveUrls.backend} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>{liveUrls.backend}</a></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 3 Quiz — Deployment &amp; CI/CD">
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
                      } else if (selected) { bg = '#d1fae5'; border = '1.5px solid #10b981'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #10b981' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#10b981', borderColor: '#10b981', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Go to Final Project <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. FINAL PROJECT ────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Final Project" title="🏆 Deploy Full-Stack Student Management System">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>Complete all three deployment milestones:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <strong style={{ color: '#0369a1' }}>💻 React Frontend → Vercel</strong>
                  <ul style={{ paddingLeft: '1.1rem', color: '#475569', margin: '4px 0 0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <li>Add <code>vercel.json</code> redirect rules</li>
                    <li>Set <code>VITE_API_URL</code> to your Render backend URL</li>
                    <li>Obtain a live Vercel HTTPS URL</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#0f766e' }}>🏛️ Django API → Render + PostgreSQL</strong>
                  <ul style={{ paddingLeft: '1.1rem', color: '#475569', margin: '4px 0 0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <li>Provision a PostgreSQL database and copy the connection URL</li>
                    <li>Create <code>build.sh</code> that runs <code>migrate</code> and <code>collectstatic</code></li>
                    <li>Deploy as a Render Web Service with all env secrets configured</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#7c3aed' }}>🚀 GitHub Actions CI/CD Pipeline</strong>
                  <ul style={{ paddingLeft: '1.1rem', color: '#475569', margin: '4px 0 0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <li>Create <code>.github/workflows/deploy.yml</code></li>
                    <li>Store the Render webhook URL as a GitHub repository secret</li>
                    <li>Push a commit to <code>main</code> and verify the pipeline runs automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <InfoBox icon={ShieldAlert} color="#065f46" bg="#d1fae5" border="#6ee7b7">
              <strong>🎉 DevOps Course Complete!</strong> You can now containerize with Docker, build automated CI pipelines, and deploy secure full-stack applications to the cloud.
            </InfoBox>

            <button className="btn btn-primary"
              style={{ backgroundColor: '#10b981', borderColor: '#10b981', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }}
              onClick={() => onNavigate('dashboard', 'dashboard')}>
              Back to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
