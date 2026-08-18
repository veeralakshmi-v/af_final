import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Cpu, RefreshCw, BarChart2, Plus, ArrowRightLeft, Radio
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

export default function DjangoDay15({ activeTab, onNavigate, openAITutor }) {
  /* ── File Explorer State ── */
  const [selectedFile, setSelectedFile] = useState('settings.py');

  const filesCode = {
    'settings.py': `# kanban_project/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Expose API libraries
    'rest_framework',
    'rest_framework.authtoken', # Enable token storage
    'tasks',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated', # Require tokens globally
    ]
}`,
    'models.py': `# tasks/models.py
from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    STATUS_CHOICES = [
        ('TODO', 'Todo'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='TODO')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`,
    'serializers.py': `# tasks/serializers.py
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'owner_username', 'created_at']`,
    'views.py': `# tasks/views.py
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    # Filter tasks to only return items belonging to current user
    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    # Automatically set owner field to logged-in user on save
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)`,
    'urls.py': `# kanban_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), # Get token
]`,
    'KanbanBoard.jsx': `// src/components/KanbanBoard.jsx (React Frontend with Axios)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create a custom Axios instance configured with Token headers
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 9944a2b91120ac9a3f' // Auth Token
    }
});

export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);

    // 2. Fetch Tasks on component mount (GET Request)
    useEffect(() => {
        apiClient.get('tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    // 3. Move status column (PUT Request)
    const updateTaskStatus = (taskId, newStatus) => {
        apiClient.put(\`tasks/\${taskId}/\`, { status: newStatus })
            .then(response => {
                // Update local state grid
                setTasks(prev => prev.map(t => t.id === taskId ? response.data : t));
            })
            .catch(error => console.error("Error updating status:", error));
    };

    return (
        <div className="kanban-grid">
            {/* Loop columns and cards... */}
        </div>
    );
}`
  };

  /* ── Kanban Board States ── */
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Configure REST Router paths', status: 'TODO', desc: 'Define default routes in urls.py' },
    { id: 2, name: 'Write serializer fields mapping', title: 'Write Serializer fields', status: 'IN_PROGRESS', desc: 'Add Meta class declarations' },
    { id: 3, title: 'Verify SQLite database connection', status: 'DONE', desc: 'Run initial migration schema files' }
  ]);
  
  const [axiosCodeSnippet, setAxiosCodeSnippet] = useState('// Click an card action to see Axios JavaScript request code.');
  const [apiJsonOutput, setApiJsonOutput] = useState('');
  const [axiosLogs, setAxiosLogs] = useState(['Client ready. Select card actions to trigger Axios requests.']);
  const [activeStep, setActiveStep] = useState(-1);

  const moveCard = async (taskId, newStatus) => {
    setActiveStep(0);
    const code = `// PUT Request: Move status column
axios.put('http://127.0.0.1:8000/api/tasks/${taskId}/', {
    status: '${newStatus}'
}, {
    headers: { 'Authorization': 'Token 9944a2b91120ac9a3f' }
})
.then(res => console.log(res.data));`;

    setAxiosCodeSnippet(code);
    let tempLogs = [`[Axios Client] Dispatching PUT request to "/api/tasks/${taskId}/"`];
    setAxiosLogs(tempLogs);

    // 1. Headers payload check
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(1);
    tempLogs.push('[Headers] Appended header: "Authorization: Token 9944a2b91120ac9a3f"');
    setAxiosLogs([...tempLogs]);

    // 2. DRF View Dispatch
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(2);
    tempLogs.push('[REST APIView] ProductViewSet receives PUT. Authenticated user successfully.');
    setAxiosLogs([...tempLogs]);

    // 3. Serializer DB validation
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(3);
    tempLogs.push('[ORM SQL] Executed UPDATE table: SET status="' + newStatus + '" WHERE id=' + taskId);
    setAxiosLogs([...tempLogs]);

    // 4. Return REST JSON
    await new Promise(r => setTimeout(r, 200));
    setActiveStep(4);
    tempLogs.push('[Axios Client] Received 200 OK response. Rewrote state grid column tables.');
    setAxiosLogs([...tempLogs]);

    // Apply change
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    const targetObj = tasks.find(t => t.id === taskId);
    setApiJsonOutput(JSON.stringify({ ...targetObj, status: newStatus }, null, 2));
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which JS Axios configuration is used to send headers authentication tokens safely to a DRF api?',
      opts: [
        "axios.get('/api/', { auth: token })",
        "axios.post('/api/', data, { headers: { 'Authorization': `Token ${token}` } })",
        "axios.put('/api/', { 'token_key': token })",
        "axios.delete('/api/', token)"
      ],
      ans: 1,
      exp: 'Axios expects headers definitions passed inside the third options dictionary config parameter: { headers: { "Authorization": `Token ${hash}` } }.'
    },
    {
      k: 'q2',
      q: 'Which DRF ViewSet hook is used to override and inject fields parameters (like current user owner) before saving models?',
      opts: ['get_queryset()', 'perform_create(self, serializer)', 'dispatch()', 'is_valid()'],
      ans: 1,
      exp: 'ModelViewSet calls perform_create() before database writes, allowing developers to safely map readonly fields (like assigning owner = self.request.user) automatically.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRODUCTION ────────────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 15 • Project 2" title="Capstone 2: Decoupled Kanban Board (DRF + Axios)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* AI Assistant Help */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <ArrowRightLeft size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Need help mapping Axios queries to REST Framework endpoints?</span>
              </div>
              <button className="btn btn-sm" onClick={() => openAITutor('Explain how to write custom fetch/put request parameters in Axios to connect with Django viewsets.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#0d9488,#1e293b)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🎯 Django REST API &amp; React Axios Board</h3>
              <p style={{ color: '#ccfbf1', margin: 0, lineHeight: 1.7 }}>
                This project focuses on **decoupled architectures**. The backend serves pure JSON data via Django REST Framework (DRF) viewsets, and a frontend React portal uses the **Axios** client to GET, POST, and PUT resources with token headers.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Decoupled Tech Stack specs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '🪙 DRF Token Authentication', desc: 'Issuing cryptographic authentication tokens to clients via obtain_auth_token routes.' },
                { title: '🏛️ ModelViewSets API views', desc: 'Consolidating CRUD controllers logic. Filtering user specific records inside views.' },
                { title: '🔄 Axios HTTP Client', desc: 'Using Axios instances initialized with authorization token headers to call endpoints.' },
                { title: '📋 Interactive Kanban Board', desc: 'A multi-column Board displaying card task workflows: TODO, WORK, DONE.' }
              ].map(({ title, desc }) => (
                <div key={title} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{title}</div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#475569' }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0d9488', borderColor: '#0d9488' }}>
                Next: Source Code Explorer <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CODE EXPLORER ────────────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="code_explorer" eyebrow="Django • Day 15 • Decoupled Code" title="Kanban Board Code explorer">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Inspect the complete decoupled architecture code. Toggle tabs to see backend and frontend configurations:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* File sidebar selector */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', paddingBottom: 6, borderBottom: '1px solid #cbd5e1', marginBottom: 4 }}>📂 Codebase Files</div>
                {[
                  { name: 'settings.py', label: 'settings.py (Config)' },
                  { name: 'models.py', label: 'models.py (ORM)' },
                  { name: 'serializers.py', label: 'serializers.py' },
                  { name: 'views.py', label: 'views.py (REST)' },
                  { name: 'urls.py', label: 'urls.py (Router)' },
                  { name: 'KanbanBoard.jsx', label: 'KanbanBoard.jsx (React)' }
                ].map(f => (
                  <button key={f.name} onClick={() => setSelectedFile(f.name)}
                    style={{ border: 'none', background: selectedFile === f.name ? '#e2e8f0' : 'transparent', color: selectedFile === f.name ? '#0f172a' : '#475569', fontWeight: selectedFile === f.name ? 800 : 500, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontSize: '0.78rem' }}>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Code viewer */}
              <div>
                <CodeBlock title={`File: ${selectedFile}`} code={filesCode[selectedFile]} />
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0d9488', borderColor: '#0d9488' }}>
                Next: Live Kanban Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. LIVE KANBAN SANDBOX ─────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="simulator" eyebrow="Django • Day 15 • Run Kanban" title="Live Kanban Board &amp; Axios Tracer">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Move the tasks between statuses. Watch how the Axios console records query parameters, token headers, and returns serialized database JSON results.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 0.9fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Kanban Grid */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 12px', color: '#0f172a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}><BarChart2 size={16} /> Board Grid</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  
                  {/* Columns */}
                  {['TODO', 'IN_PROGRESS', 'DONE'].map(col => (
                    <div key={col} style={{ background: 'white', border: '1.5px dashed #cbd5e1', borderRadius: 8, padding: 8, minHeight: 200 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: 4, marginBottom: 8, textAlign: 'center' }}>
                        {col === 'TODO' ? '📋 TODO' : col === 'IN_PROGRESS' ? '⚡ IN PROGRESS' : '✓ DONE'}
                      </div>
                      
                      {/* Cards */}
                      {tasks.filter(t => t.status === col).map(t => (
                        <div key={t.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 6, padding: 8, marginBottom: 8 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0f172a' }}>{t.title}</div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 6, justifyContent: 'flex-end' }}>
                            {col !== 'TODO' && <button onClick={() => moveCard(t.id, 'TODO')} style={{ padding: '2px 4px', fontSize: '0.62rem', background: '#e2e8f0', border: 'none', borderRadius: 3, cursor: 'pointer' }}>Todo</button>}
                            {col !== 'IN_PROGRESS' && <button onClick={() => moveCard(t.id, 'IN_PROGRESS')} style={{ padding: '2px 4px', fontSize: '0.62rem', background: '#e0f2fe', border: 'none', borderRadius: 3, cursor: 'pointer', color: '#0369a1' }}>Work</button>}
                            {col !== 'DONE' && <button onClick={() => moveCard(t.id, 'DONE')} style={{ padding: '2px 4px', fontSize: '0.62rem', background: '#d1fae5', border: 'none', borderRadius: 3, cursor: 'pointer', color: '#065f46' }}>Done</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                </div>
              </div>

              {/* API and HTTP steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                
                {/* HTTP Request Pipeline Tracer */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '0.8rem' }}>
                  <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800, fontSize: '0.78rem' }}>🚀 Axios HTTP Request Tracer</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {['Axios Client PUT', 'Token Header Check', 'ViewSet Routing', 'ORM Update Query', 'Return JSON Model'].map((step, idx) => {
                      const isActive = activeStep === idx;
                      const isPassed = activeStep > idx;
                      let bg = '#f1f5f9', border = '1px solid #cbd5e1', color = '#94a3b8';
                      if (isActive) {
                        bg = '#ccfbf1'; border = '1.5px solid #0d9488'; color = '#0f766e';
                      } else if (isPassed) {
                        bg = '#d1fae5'; border = '1.5px solid #10b981'; color = '#065f46';
                      }
                      return (
                        <div key={step} style={{ background: bg, border, borderRadius: 5, padding: '3px 6px', fontSize: '0.66rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color }}>{step}</span>
                          {isPassed && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ passed</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Code Block for Axios parameters */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: 4 }}>💻 Axios JS Request Code Triggered</div>
              <CodeBlock title="Axios Javascript API Query Code" code={axiosCodeSnippet} />
            </div>

            {/* Raw JSON returned */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden', marginBottom: '1.2rem' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>📥 REST API Response JSON Payload</div>
              <pre style={{ margin: 0, padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#86efac', overflow: 'auto', maxHeight: 90, minHeight: 90 }}>
                {apiJsonOutput || '{\n  "message": "Click board action buttons to inspect."\n}'}
              </pre>
            </div>

            {/* Logs console */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Network &amp; Server Logs</div>
              <div style={{ maxHeight: 90, minHeight: 90, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {axiosLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Axios') ? '#f59e0b' : log.includes('Token') ? '#38bdf8' : log.includes('OK') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0d9488', borderColor: '#0d9488' }}>
                Go to Capstone Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 15 Quiz — DRF + Axios Kanban System">
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
                      } else if (selected) { bg = '#ccfbf1'; border = '1.5px solid #0d9488'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0d9488' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0d9488', borderColor: '#0d9488', minWidth: 150 }}>
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button className="btn btn-outline" onClick={() => { setQAns({}); setQDone(false); }} style={{ minWidth: 150 }}>Retry Quiz</button>
                  </>
                )}
              </div>
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0d9488', borderColor: '#0d9488' }}>
                Go to Final Milestone <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. FINAL ASSIGNMENT CHECKLIST ───────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Capstone Milestone" title="Day 15 Project Checklist">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>🎓 Decoupled Kanban Board Milestone Specs</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Follow this final checklist to integrate your Django REST Framework backend with an Axios frontend client:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Configure the Task database model containing STATUS choices in <code>models.py</code>. Run schema migrations.</li>
                <li>Write a <code>TaskSerializer</code> exposing task attributes and reading owner usernames.</li>
                <li>Write a <code>TaskViewSet</code> in <code>views.py</code>, override <code>get_queryset()</code> to filter current user items, and set up <code>perform_create()</code>.</li>
                <li>Bind Token authentication paths inside <code>urls.py</code> config lists.</li>
                <li>Initialize a React frontend project and install Axios: run <code>npm install axios</code>.</li>
                <li>Write an Axios client configuration instance setting default authentication token headers.</li>
                <li>Write HTTP methods calling DRF routes: query <code>axios.get('tasks/')</code> on render and update task status columns via <code>axios.put('tasks/&lt;id&gt;/', data)</code> on column drop.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>🎉 Django Course Completed!</strong> You have built both a full-stack monolithic employee system and a decoupled REST API + Axios Kanban board. Check out the dashboard to start another backend or AI full-stack track!
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#10b981', borderColor: '#10b981', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('dashboard')}>
              Complete Capstone &amp; Return to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
