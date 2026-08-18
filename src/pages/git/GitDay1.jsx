import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Settings, Terminal, GitBranch, CheckCircle, FileText,
  Copy, Play, ArrowRight, Check, X, ShieldAlert, Cpu, Laptop, RefreshCw
} from 'lucide-react';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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
    ['git','init','add','commit','status','log','config','checkout','global'].forEach(k => {
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
export default function GitDay1({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('git_module1', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Staging Simulator States ── */
  const [gitStatus, setGitStatus] = useState('uninitialized'); // uninitialized, untracked, staged, committed
  const [typedCommand, setTypedCommand] = useState('');
  const [terminalLogs, setTerminalLogs] = useState(['Type "git init" to initialize your local repository.']);
  const [unstagedFiles, setUnstagedFiles] = useState([]);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [commits, setCommits] = useState([]);

  const handleCommandRun = (e) => {
    e.preventDefault();
    const cmd = typedCommand.trim();
    if (!cmd) return;

    let logs = [...terminalLogs, `$ ${cmd}`];
    
    if (cmd === 'git init') {
      if (gitStatus !== 'uninitialized') {
        logs.push('Reinitialized existing Git repository in /workspace/.git/');
      } else {
        setGitStatus('untracked');
        setUnstagedFiles(['index.html', 'style.css']);
        logs.push('Initialized empty Git repository in /workspace/.git/');
        logs.push('Untracked files detected. Type "git status" to verify.');
      }
    } 
    else if (cmd === 'git status') {
      if (gitStatus === 'uninitialized') {
        logs.push('fatal: not a git repository (or any of the parent directories): .git');
      } else if (unstagedFiles.length > 0) {
        logs.push('On branch main');
        logs.push('Untracked files:');
        unstagedFiles.forEach(f => logs.push(`  (use "git add <file>..." to include in what will be committed)`));
        unstagedFiles.forEach(f => logs.push(`\tred:   ${f}`));
        logs.push('nothing added to commit but untracked files present (use "git add" to track)');
      } else if (stagedFiles.length > 0) {
        logs.push('On branch main');
        logs.push('Changes to be committed:');
        logs.push('  (use "git rm --cached <file>..." to unstage)');
        stagedFiles.forEach(f => logs.push(`\tgreen: new file:   ${f}`));
      } else {
        logs.push('On branch main');
        logs.push('nothing to commit, working tree clean');
      }
    }
    else if (cmd === 'git add .' || cmd === 'git add index.html style.css') {
      if (gitStatus === 'uninitialized') {
        logs.push('fatal: not a git repository (or any of the parent directories): .git');
      } else if (unstagedFiles.length === 0) {
        logs.push('Nothing to add.');
      } else {
        setGitStatus('staged');
        setStagedFiles([...stagedFiles, ...unstagedFiles]);
        setUnstagedFiles([]);
        logs.push('Stage updated. Files ready for commit.');
      }
    }
    else if (cmd.startsWith('git commit -m')) {
      const match = cmd.match(/git commit -m ["'](.*?)["']/);
      if (gitStatus === 'uninitialized') {
        logs.push('fatal: not a git repository (or any of the parent directories): .git');
      } else if (stagedFiles.length === 0) {
        logs.push('nothing to commit, working tree clean');
      } else if (!match) {
        logs.push('error: switch `m\' requires a value');
      } else {
        const msg = match[1] || 'Commit message';
        const commitHash = Math.random().toString(16).substring(2, 9);
        const newCommit = { hash: commitHash, message: msg, files: [...stagedFiles] };
        setCommits([...commits, newCommit]);
        setStagedFiles([]);
        setGitStatus('committed');
        logs.push(`[main ${commitHash}] ${msg}`);
        logs.push(` ${newCommit.files.length} files changed, 45 insertions(+)`);
      }
    }
    else if (cmd === 'git log') {
      if (gitStatus === 'uninitialized') {
        logs.push('fatal: not a git repository (or any of the parent directories): .git');
      } else if (commits.length === 0) {
        logs.push('fatal: your current branch main does not have any commits yet');
      } else {
        [...commits].reverse().forEach(c => {
          logs.push(`commit ${c.hash} (HEAD -> main)`);
          logs.push('Author: Student <student@alphafly.com>');
          logs.push(`Date:   ${new Date().toLocaleDateString()}`);
          logs.push(`\n    ${c.message}\n`);
        });
      }
    }
    else {
      logs.push(`bash: ${cmd}: command not found. Try: "git init", "git status", "git add .", "git commit -m 'Initial commit'", or "git log".`);
    }

    setTerminalLogs(logs);
    setTypedCommand('');
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which Git command initializes a new local repository in a folder?',
      opts: ['git create', 'git init', 'git setup', 'git start'], ans: 1,
      exp: 'git init creates a hidden .git directory to begin tracking files in the current folder.' },
    { k: 'q2', q: 'What represents the "Staging Area" in Git?',
      opts: [
        'A remote server on GitHub',
        'A preparation draft area where changes are gathered before a commit is saved',
        'The main production database',
        'A folder containing deleted items'
      ], ans: 1,
      exp: 'The staging area (index) holds files added with "git add" until they are finalized by "git commit".' },
    { k: 'q3', q: 'What is the purpose of running "git commit -m \'Message\'"?',
      opts: [
        'To download remote repository updates',
        'To save staging snapshots permanently with a brief explanatory comment log',
        'To delete untracked local code',
        'To register a GitHub hosting account profile'
      ], ans: 2,
      exp: 'Commits are snapshots of staging changes written into local history with an explanatory message.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION TO VCS ──────────────────────────────────────── */}
      {activeTab === 'intro_git' && (
        <Section key="intro_git" eyebrow="Git • Day 1 • Module 01" title="What is Version Control?">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg,#ec4899,#f43f5e)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>📂 Why Version Control?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                <strong>Version Control Systems (VCS)</strong> keep records of changes made to source files over time. They allow team collaboration, history rollbacks (time travel), and prevent duplicate file configurations (e.g. <code>index_final_v2_new.html</code>).
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Centralized vs Distributed VCS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #cbd5e1' }}>
                <strong style={{ display: 'block', color: '#e11d48', marginBottom: 4 }}>Centralized (SVN)</strong>
                <span style={{ fontSize: '0.85rem' }}>Files live on a single server database. If connection drops or the server crashes, developers cannot save versions or rollback history.</span>
              </div>
              <div style={{ background: '#ecfdf5', padding: 14, borderRadius: 12, border: '1px solid #a7f3d0' }}>
                <strong style={{ display: 'block', color: '#059669', marginBottom: 4 }}>Distributed (Git)</strong>
                <span style={{ fontSize: '0.85rem' }}>Every developer possesses a complete clone copy of the repository timeline database on their local drive. Work is fast, secure, and offline.</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('git_install_config')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. INSTALLATION & CONFIG ────────────────────────────────────── */}
      {activeTab === 'git_install_config' && (
        <Section key="git_install" eyebrow="Git • Day 1 • Module 02" title="Git Installation & Configuration">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Git must be configured with your developer name and email. These credentials are tied to every commit history you register:</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Local Git Installation</h3>
            <div style={{ display: 'flex', gap: 10, background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <Laptop size={24} color="#ec4899" />
              <div style={{ fontSize: '0.86rem' }}>
                <strong>Windows</strong>: Download and run the setup exe wizard from <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">git-scm.com</a>. Choose Git Bash terminal default setup.
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Global Developer Setup commands</h3>
            <CodeBlock title="Terminal Settings Setup" code={`# Verify installation success
git --version

# Configure global author variables
git config --global user.name "Jane Doe"
git config --global user.email "jane@example.com"

# Check your configuration properties list
git config --list`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('git_commands')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. GIT COMMANDS (INIT, ADD, COMMIT) ─────────────────────────── */}
      {activeTab === 'git_commands' && (
        <Section key="git_cmds" eyebrow="Git • Day 1 • Module 03" title="Staging Area & local commits">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Every Git local workflow operates across three distinct conceptual states (Working folder, Stage index, Local commits history):</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '2rem' }}>
              {[
                { title: 'Working Directory', action: 'Modify Files', code: 'Edit html/css files', color: '#64748b' },
                { title: 'Staging Area', action: 'git add .', code: 'Prepare changes draft', color: '#ec4899' },
                { title: 'Local Repository', action: 'git commit -m "..."', code: 'Save permanent commit', color: '#10b981' }
              ].map((step, i) => (
                <div key={i} style={{ background: '#f8fafc', border: `2px solid ${step.color}33`, borderRadius: 12, padding: 12, textAlign: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: step.color, display: 'block' }}>{step.title}</strong>
                  <span style={{ fontSize: '0.74rem', background: '#e2e8f0', padding: '2px 8px', borderRadius: 4, fontWeight: 700, margin: '8px 0', display: 'inline-block' }}>{step.action}</span>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{step.code}</div>
                </div>
              ))}
            </div>

            {/* Interactive Terminal Simulator Widget */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>🧪 Local Staging Terminal Simulator</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Interact with the staging directory below. Type command routines to initialize, add, commit, and view logs:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Terminal panel */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 14, padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: 6, marginBottom: 8, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>git-bash-console</span>
                  <span style={{ color: '#10b981' }}>● staging-ready</span>
                </div>
                <div style={{ height: 160, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, color: '#94a3b8' }}>
                  {terminalLogs.map((log, j) => (
                    <div key={j} style={{ color: log.startsWith('$') ? '#38bdf8' : log.startsWith('red') ? '#fca5a5' : log.startsWith('green') ? '#86efac' : '#94a3b8' }}>
                      {log.replace('red:', '').replace('green:', '')}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCommandRun} style={{ display: 'flex', borderTop: '1px solid #1e293b', paddingTop: 8, marginTop: 8 }}>
                  <span style={{ color: '#38bdf8', marginRight: 6 }}>$</span>
                  <input value={typedCommand} onChange={e => setTypedCommand(e.target.value)} placeholder="Type 'git init', 'git status', 'git add .', 'git commit -m \'msg\'', or 'git log'"
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', flex: 1, fontFamily: 'monospace', fontSize: '0.8rem' }} />
                </form>
              </div>

              {/* Staging Tree visual panel */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1rem' }}>
                <strong style={{ fontSize: '0.86rem', display: 'block', marginBottom: 10, color: '#0f172a' }}>Directory Status Map</strong>
                
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Working Folder (Untracked):</span>
                  {unstagedFiles.length === 0 ? <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>— No files —</span> : (
                    <div style={{ display: 'flex', gap: 6 }}>
                      {unstagedFiles.map((f, idx) => <span key={idx} style={{ background: '#fecaca', color: '#991b1b', padding: '2px 8px', borderRadius: 4, fontSize: '0.74rem', fontWeight: 600 }}>{f}</span>)}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Staging Area (Ready to commit):</span>
                  {stagedFiles.length === 0 ? <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>— No files —</span> : (
                    <div style={{ display: 'flex', gap: 6 }}>
                      {stagedFiles.map((f, idx) => <span key={idx} style={{ background: '#bbf7d0', color: '#166534', padding: '2px 8px', borderRadius: 4, fontSize: '0.74rem', fontWeight: 600 }}>{f}</span>)}
                    </div>
                  )}
                </div>

                <div>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Commits list:</span>
                  {commits.length === 0 ? <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>— No commits saved —</span> : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {commits.map((c, idx) => <span key={idx} style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: 4, fontSize: '0.72rem', fontFamily: 'monospace' }}>[{c.hash}] {c.message}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('git_time_travel')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. TIME TRAVEL & LOGS ───────────────────────────────────────── */}
      {activeTab === 'git_time_travel' && (
        <Section key="git_logs" eyebrow="Git • Day 1 • Module 04" title="Git Log & Commit History checkout">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Every commit generated is saved with a unique 40-character SHA-1 checksum token hash. You can view the commit logs and move back in time to recover previous states:</p>

            <CodeBlock title="Time Travel Commands" code={`# Show complete local commit histories
git log

# Show summarized single-line commit lists
git log --oneline

# View details of a specific commit hash
git show c4f7a2d

# Time travel: checkout a previous commit snapshot (detaches HEAD)
git checkout c4f7a2d

# Return back to the latest commit main branch
git checkout main`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 1 Quiz — Git Basics">
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
                      } else if (selected) { bg = '#fce7f3'; border = '1.5px solid #ec4899'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #ec4899' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#ec4899', borderColor: '#ec4899', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#ec4899', borderColor: '#ec4899' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 1 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Staging your first files</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Practice basic Git operations in your local terminal:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Open Git Bash or Command Prompt in a temporary workspace folder.</li>
                <li>Initialize Git tracking using the appropriate init command.</li>
                <li>Create a dummy file <code>readme.txt</code> and write your name in it.</li>
                <li>Configure your global developer user.name and user.email keys.</li>
                <li>Add the file to staging, commit it with the message <code>"First commit log"</code>, and check your <code>git log</code> histories.</li>
              </ol>
            </div>

             <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#b45309', marginBottom: '1.5rem' }}>
               <ShieldAlert size={20} style={{ flexShrink: 0 }} />
               <span style={{ fontSize: '0.78rem' }}><strong>Self-Check</strong>: Run "git status" between each step to visualize the transitions from red untracked status to green staged indexes!</span>
             </div>

             <button className="btn btn-primary" style={{ backgroundColor: '#ec4899', borderColor: '#ec4899', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('git_module2', 'intro_github')}>
               Go to Day 2: GitHub & Remotes <ArrowRight size={16} />
             </button>
           </div>
         </Section>
       )}
    </AnimatePresence>
  );
}
