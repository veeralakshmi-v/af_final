import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Globe, Server, CloudLightning, GitBranch, Rocket,
  CheckCircle, FileText, Copy, Play, ArrowRight, Check, X,
  ShieldAlert, RefreshCw, Terminal, Plus, Folder
} from 'lucide-react';

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

const CodeBlock = ({ title, code }) => {
  const [cp, setCp] = useState(false);
  const hlJS = (c) => {
    let h = c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    h = h.replace(/(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
    h = h.replace(/(["'`])([\s\S]*?)\1/g, '<span style="color:#a5d6ff">$1$2$1</span>');
    ['git','push','pull','clone','remote','add','origin','branch','merge','checkout'].forEach(k => {
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
export default function GitDay2({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('git_module2', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Git Push Simulator States ── */
  const [repoName, setRepoName] = useState('portfolio-site');
  const [remoteLinked, setRemoteLinked] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushStep, setPushStep] = useState(0);
  const [pushLogs, setPushLogs] = useState([]);
  const [liveUrl, setLiveUrl] = useState(null);

  const handleLinkRemote = () => {
    if (!repoName.trim()) return;
    setRemoteLinked(true);
  };

  const handlePushGit = async () => {
    setIsPushing(true);
    setPushStep(0);
    setLiveUrl(null);
    setPushLogs(['📡 Initializing handshake connection to github.com...', '🔐 Authenticating developer profile security keys...']);
    
    const steps = [
      `🔗 Linked remote repository address: https://github.com/student/${repoName}.git`,
      '📦 Compressing local git objects database database...',
      '🚀 Uploading local main history tree to origin/main branch...',
      '✅ Write complete: 100% (3/3 objects upload successful).',
      '🤖 Instantiating GitHub Pages compilation scripts...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setPushStep(i + 1);
      setPushLogs(prev => [...prev, steps[i]]);
    }

    setLiveUrl(`https://student.github.io/${repoName}`);
    setIsPushing(false);
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which command establishes a link between your local Git repo and a remote cloud repository?',
      opts: [
        'git remote add origin <URL>',
        'git link remote <URL>',
        'git push connection <URL>',
        'git clone remote <URL>'
      ], ans: 0,
      exp: 'git remote add origin <URL> configures the remote repository nickname "origin" pointing to the specified URL.' },
    { k: 'q2', q: 'What does the "git pull" command do?',
      opts: [
        'Uploads local changes to remote repositories',
        'Fetches remote repository updates and merges them directly into your current local branch',
        'Deletes the local .git configuration directory',
        'Creates a new branch on GitHub'
      ], ans: 1,
      exp: 'git pull is a combination of git fetch (downloading changes) and git merge (combining them into your active branch).' },
    { k: 'q3', q: 'How do you create and switch to a new branch in a single command?',
      opts: ['git branch <name>', 'git checkout <name>', 'git checkout -b <name>', 'git merge <name>'], ans: 2,
      exp: 'git checkout -b <name> creates the new branch and immediately checks it out (switches to it).' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. GITHUB OVERVIEW ───────────────────────────────────────────── */}
      {activeTab === 'intro_github' && (
        <Section key="intro_github" eyebrow="Git • Day 2 • Module 01" title="GitHub & Cloud Repositories">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#2563eb)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>☁️ What is GitHub?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                <strong>GitHub</strong> is a cloud hosting platform for Git repositories. While Git is the local software command-line tool, GitHub serves as the remote server hosting your codebase files, facilitating code collaboration, peer review, and continuous deployments.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Creating your first Remote Repository</h3>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Log in to <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a>.</li>
              <li>Click the green <strong>"New"</strong> button or the <strong>"+"</strong> icon to create a repository.</li>
              <li>Name your repository (e.g., <code>my-react-app</code>) and choose <strong>Public</strong> or <strong>Private</strong> access.</li>
              <li>Click <strong>"Create repository"</strong> to generate your remote cloud URL address!</li>
            </ol>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('git_remotes')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. REMOTE OPERATIONS (PUSH/PULL) ────────────────────────────── */}
      {activeTab === 'git_remotes' && (
        <Section key="git_remotes" eyebrow="Git • Day 2 • Module 02" title="Git Remotes (Push, Pull, Clone)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Connect your local workspace folder to GitHub using remote target configs, and sync code histories using push and pull commands:</p>

            <CodeBlock title="GitHub Remotes Setup Commands" code={`# 1. Link your local project to a newly created GitHub repository
git remote add origin https://github.com/username/my-react-app.git

# 2. Rename your default branch to "main" (recommended standard)
git branch -M main

# 3. Push local commits to GitHub (the "-u" flag sets default branch trackers)
git push -u origin main

# 4. Pull changes from GitHub into local directory (sync with team members)
git pull origin main

# 5. Download a copy of an existing GitHub project locally
git clone https://github.com/username/my-react-app.git`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('git_branching')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. BRANCHING & MERGING ──────────────────────────────────────── */}
      {activeTab === 'git_branching' && (
        <Section key="git_branch" eyebrow="Git • Day 2 • Module 03" title="Branching & Merging">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Branches allow you to work on new features, styling, or bug fixes independently without modifying the stable production code on the <code>main</code> branch:</p>

            <CodeBlock title="Branching Workflows" code={`# Show all local branches (current branch has asterisk *)
git branch

# Create a new branch named "feature-login"
git branch feature-login

# Switch to the feature branch
git checkout feature-login

# Shortcut: Create and switch to branch in one command
git checkout -b feature-login

# Merge feature changes back to main (run this while on the main branch)
git checkout main
git merge feature-login

# Delete the merged feature branch safely
git branch -d feature-login`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('github_pages')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. GITHUB PAGES (LIVE LINKS) ────────────────────────────────── */}
      {activeTab === 'github_pages' && (
        <Section key="gh_pages" eyebrow="Git • Day 2 • Module 04" title="Live Sites with GitHub Pages">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>GitHub Pages allows you to host static HTML/CSS/JS websites directly from your GitHub repositories for free, generating a live sharing URL!</p>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', color: '#065f46' }}>
              <h4 style={{ margin: '0 0 6px', fontWeight: 800 }}>📌 Hosting Steps:</h4>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
                <li>Push your static repository files containing an <code>index.html</code> to GitHub.</li>
                <li>On github.com, open your repository <strong>Settings</strong> tab.</li>
                <li>Scroll down to the <strong>"Pages"</strong> section in the left sidebar.</li>
                <li>Under Build and Deployment, set Source to <strong>"Deploy from a branch"</strong>, select <strong>main</strong> branch, and click <strong>Save</strong>.</li>
                <li>After 1-2 minutes, refresh the pages setting to see your live URL: <code>https://username.github.io/repo-name/</code>!</li>
              </ol>
            </div>

            {/* Interactive Remote Push Simulator Widget */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🧪 Remote Git Push & Deployment Simulator</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Scaffold a remote repository, connect local commits, push to GitHub, and deploy a live sharing link:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Remote Repository Name:</label>
                  <input className="form-control" value={repoName} onChange={e => { setRepoName(e.target.value); setRemoteLinked(false); }} disabled={isPushing} style={{ background: 'white' }} />
                </div>
                
                {!remoteLinked ? (
                  <button onClick={handleLinkRemote} style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                    Link Remote Repository origin
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle size={16} /> Remote Linked Successfully!
                    </div>
                    <button onClick={handlePushGit} disabled={isPushing}
                      style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                      {isPushing ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />} Push to GitHub & Deploy
                    </button>
                  </div>
                )}
              </div>

              {/* Console display logs */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 12, fontFamily: 'monospace', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 160 }}>
                <div style={{ color: '#94a3b8' }}>
                  {pushLogs.length === 0 ? (
                    <span style={{ color: '#64748b' }}>Configure remote above to start pushing commits logs...</span>
                  ) : (
                    pushLogs.map((log, idx) => (
                      <div key={idx} style={{ color: idx === pushLogs.length - 1 ? '#86efac' : '#94a3b8', marginBottom: 2 }}>{log}</div>
                    ))
                  )}
                </div>

                {liveUrl && (
                  <div style={{ borderTop: '1px solid #1e293b', paddingTop: 8, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#38bdf8', fontSize: '0.74rem' }}>Live page: {liveUrl}</span>
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{ background: '#10b981', color: 'white', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem' }}>
                      Visit Site →
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 2 Quiz — GitHub & Remotes">
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
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0ea5e9' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0ea5e9', borderColor: '#0ea5e9', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 2 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Launching a Live GitHub Site</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Push your local codebase to a remote server and deploy it:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Create a free account profile on <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a> if you don't have one.</li>
                <li>Scaffold a new public repository named <code>github-pages-test</code>.</li>
                <li>Link your local folder containing <code>index.html</code> to your origin remote URL.</li>
                <li>Push your main branch commits using <code>git push -u origin main</code>.</li>
                <li>Open Settings to Pages, configure deployment targets, and check the generated live URL link!</li>
              </ol>
            </div>

             <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#b45309', marginBottom: '1.5rem' }}>
               <ShieldAlert size={20} style={{ flexShrink: 0 }} />
               <span style={{ fontSize: '0.78rem' }}><strong>Self-Check</strong>: Check that your repository name matches the URL path suffix. E.g. <code>https://username.github.io/github-pages-test/</code>!</span>
             </div>

             <button className="btn btn-primary" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('dashboard')}>
               Complete Course & Back to Dashboard <ArrowRight size={16} />
             </button>
           </div>
         </Section>
       )}
    </AnimatePresence>
  );
}
