import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Users, Settings, RefreshCw, BarChart2
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

export default function DjangoDay14({ activeTab, onNavigate, openAITutor }) {
  const go = (id) => { onNavigate('django_module14', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── File Explorer State ── */
  const [selectedFile, setSelectedFile] = useState('settings.py');

  const filesCode = {
    'settings.py': `# employee_portal/settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Internal app
    'directory',
]

ROOT_URLCONF = 'employee_portal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}`,
    'models.py': `# directory/models.py
from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, default='Active')
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name`,
    'forms.py': `# directory/forms.py
from django import forms
from .models import Employee

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['name', 'email', 'department', 'status']

    # Custom Email Validation Check
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email.endswith('@company.com'):
            raise forms.ValidationError("Only company.com email domains are allowed.")
        return email`,
    'views.py': `# directory/views.py
from django.views.generic import ListView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from .models import Employee
from .forms import EmployeeForm

class EmployeeListView(LoginRequiredMixin, ListView):
    model = Employee
    template_name = 'directory/employee_list.html'
    context_object_name = 'employees'
    login_url = '/login/' # Redirect path for guests

class EmployeeCreateView(LoginRequiredMixin, CreateView):
    model = Employee
    form_class = EmployeeForm
    template_name = 'directory/employee_form.html'
    success_url = reverse_lazy('employee_list')`,
    'urls.py': `# employee_portal/urls.py
from django.contrib import admin
from django.urls import path
from directory.views import EmployeeListView, EmployeeCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', EmployeeListView.as_view(), name='employee_list'),
    path('add/', EmployeeCreateView.as_view(), name='employee_add'),
]`,
    'employee_list.html': `<!-- templates/directory/employee_list.html -->
{% extends "base.html" %}
{% block content %}
<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
        <h2>Employee Directory Portal</h2>
        <a href="{% url 'employee_add' %}" class="btn btn-primary">Add Employee</a>
    </div>

    <table class="table table-striped mt-3">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="directory-body">
            {% for employee in employees %}
            <tr>
                <td>{{ employee.name }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.department.name }}</td>
                <td>
                    <span class="badge {% if employee.status == 'Active' %}bg-success{% else %}bg-secondary{% endif %}">
                        {{ employee.status }}
                    </span>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
{% endblock %}`
  };

  /* ── Directory Simulator ── */
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', dept: 'Engineering', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', dept: 'HR & Talent', status: 'Active' },
    { id: 3, name: 'Carol Davis', email: 'carol@company.com', dept: 'Product Design', status: 'On Leave' }
  ]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  
  const [simLogs, setSimLogs] = useState(['System: Portal ready. Logged in as admin user.']);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    
    // Custom clean validation check simulation
    if (!newEmail.endsWith('@company.com')) {
      setSimLogs(prev => [
        `[Form Validation Error] clean_email() rejected "${newEmail}". Reason: Domain must end with "@company.com"`,
        ...prev
      ]);
      return;
    }

    const newRecord = {
      id: employees.length + 1,
      name: newName,
      email: newEmail,
      dept: newDept,
      status: 'Active'
    };

    setEmployees(prev => [...prev, newRecord]);
    setSimLogs(prev => [
      `[ORM DB Save] Employee.objects.create(name="${newName}", email="${newEmail}", department="${newDept}")`,
      `[Redirect] HTTP 302: Redirected user to Employee list view index.`,
      ...prev
    ]);
    
    setNewName('');
    setNewEmail('');
  };

  const toggleStatus = (id) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        const nextStatus = emp.status === 'Active' ? 'On Leave' : 'Active';
        setSimLogs(prevLogs => [
          `[ORM DB Update] Employee.objects.filter(id=${id}).update(status="${nextStatus}")`,
          ...prevLogs
        ]);
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which view method handles custom validations for a specific form field like email in Django forms?',
      opts: ['is_valid()', 'clean_<field_name>()', 'clean_all()', 'save()'],
      ans: 1,
      exp: 'Django automatically calls methods named clean_<fieldname>() inside ModelForms during clean validations to check specific fields.'
    },
    {
      k: 'q2',
      q: 'Why do we use reverse_lazy() instead of reverse() in the success_url parameter of Generic Edit Views?',
      opts: [
        'To speed up SQL queries',
        'Because reverse_lazy() loads redirect urls dynamically only when requested rather than on class import evaluation',
        'To decrypt credentials automatically',
        'It is just standard python style syntax—no practical difference'
      ],
      ans: 1,
      exp: 'Generic class-based views evaluate class attributes when the code is imported. Using reverse_lazy() prevents evaluation crashes since URL conf is not fully loaded during class import.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRODUCTION ────────────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 14 • Project 1" title="Capstone 1: Full-Stack Employee Portal">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* AI Assistant Help */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Users size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Need help building standard MVT templates &amp; forms?</span>
              </div>
              <button className="btn btn-sm" onClick={() => openAITutor('Explain how to write and validate ModelForms using custom clean hooks in Django.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#3b82f6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>💻 Django MVT Employee Portal Project</h3>
              <p style={{ color: '#dbeafe', margin: 0, lineHeight: 1.7 }}>
                This project focuses on standard **Django MVT (Model-View-Template)** features. It implements model structures, custom form validation overrides (`forms.ModelForm`), access controls using class-based inheritance mixins, and server-side template routing paths.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Project Blueprint</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '📂 Model Relations', desc: 'ForeignKey mappings connecting Employees to Departments with safe cascades.' },
                { title: '📝 Clean validation hooks', desc: 'Custom ModelForms checking email inputs to reject non-company email addresses.' },
                { title: '🔒 Security Guards', desc: 'Securing directory access to registered company members using LoginRequiredMixin.' },
                { title: '🏷️ Template Render', desc: 'Rendering database queryset grids and displaying active status badges.' }
              ].map(({ title, desc }) => (
                <div key={title} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{title}</div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#475569' }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Source Code Explorer <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CODE EXPLORER ────────────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="code_explorer" eyebrow="Django • Day 14 • Codebase" title="Employee Directory Codebase">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Review the files for the pure Django portal project below. Toggle tabs to read each code block:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* File sidebar selector */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', paddingBottom: 6, borderBottom: '1px solid #cbd5e1', marginBottom: 4 }}>📂 Codebase Files</div>
                {[
                  { name: 'settings.py', label: 'settings.py (Config)' },
                  { name: 'models.py', label: 'models.py (ORM)' },
                  { name: 'forms.py', label: 'forms.py (ModelForm)' },
                  { name: 'views.py', label: 'views.py (Generic Views)' },
                  { name: 'urls.py', label: 'urls.py (Paths)' },
                  { name: 'employee_list.html', label: 'employee_list.html' }
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
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Live Portal Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. LIVE PORTAL SANDBOX ─────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="simulator" eyebrow="Django • Day 14 • Directory Run" title="Live Employee Directory Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Add new employee cards below. Check how the custom Django form rules validate domains and update directory status codes live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Custom Add Form */}
              <form onSubmit={handleAddEmployee} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>➕ Add Employee Form</h4>
                
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Full Name</label>
                  <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. David Miller"
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Email Address</label>
                  <input type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="e.g. david@company.com"
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  <span style={{ fontSize: '0.66rem', color: '#64748b' }}>Domain must end with @company.com</span>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Department</label>
                  <select value={newDept} onChange={e => setNewDept(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                    <option value="Engineering">Engineering</option>
                    <option value="HR & Talent">HR &amp; Talent</option>
                    <option value="Product Design">Product Design</option>
                  </select>
                </div>

                <button type="submit" style={{ width: '100%', padding: '8px', background: '#4f46e5', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', marginTop: 4 }}>
                  Add to Directory
                </button>
              </form>

              {/* Directory Output rendering */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>📂 Active Employee Directory</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {employees.map(emp => (
                    <div key={emp.id} style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 6 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{emp.email} • <span style={{ color: '#4f46e5', fontWeight: 600 }}>{emp.dept}</span></div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 4, background: emp.status === 'Active' ? '#d1fae5' : '#e2e8f0', color: emp.status === 'Active' ? '#065f46' : '#475569', fontWeight: 700 }}>
                          {emp.status}
                        </span>
                        <button onClick={() => toggleStatus(emp.id)} style={{ padding: '2px 4px', fontSize: '0.64rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer' }}>Toggle</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sim Logs console */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Django Shell &amp; ORM Logs</div>
              <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {simLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Form') ? '#f87171' : log.includes('Save') || log.includes('Update') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Go to Project Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 14 Quiz — Employee Portal System">
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
                      } else if (selected) { bg = '#e0e7ff'; border = '1.5px solid #4f46e5'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #4f46e5' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#4f46e5', borderColor: '#4f46e5', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Go to Project Checklist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. PROJECT CHECKLIST ───────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 14 Project Milestones">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>📋 Employee Directory Portal Checklist</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Follow these steps to build and test the pure Django MVT portal project:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Configure Department and Employee model classes in <code>models.py</code> using ForeignKey connections. Run migrations.</li>
                <li>Write <code>EmployeeForm</code> inheriting from <code>forms.ModelForm</code>. Override <code>clean_email(self)</code> to validate domain endings.</li>
                <li>Create ListView and CreateView classes inside <code>views.py</code> and protect them with <code>LoginRequiredMixin</code>.</li>
                <li>Register paths for both views in application level <code>urls.py</code> config directories.</li>
                <li>Build HTML template files extending standard base layout blocks displaying table columns.</li>
                <li>Test adding records: check if input errors are displayed correctly for non-company emails.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>MVT Best Practice:</strong> Secure templates using role filters (e.g. <code>perms.directory.add_employee</code>) to hide buttons, ensuring users cannot view or trigger operations they don't have authorization permissions for.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module15', 'intro_sessions')}>
              Next: Day 15 — DRF + Axios Kanban Board <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
