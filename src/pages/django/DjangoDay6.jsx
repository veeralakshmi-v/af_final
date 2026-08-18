import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Lock, User, LogIn, LogOut, UserPlus, Eye, EyeOff, Key
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

export default function DjangoDay6({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module6', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Auth Sandbox State ── */
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'admin', password: 'admin123', email: 'admin@example.com' }
  ]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [serverRunning, setServerRunning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('http://127.0.0.1:8000/login/');
  const [terminalLogs, setTerminalLogs] = useState(['Type "python manage.py runserver" to start the auth sandbox...']);
  const [cmdInput, setCmdInput] = useState('');

  // Login form
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Register form
  const [regForm, setRegForm] = useState({ username: '', email: '', password1: '', password2: '' });
  const [regErrors, setRegErrors] = useState({});
  const [showRegPw, setShowRegPw] = useState(false);
  const [regSuccess, setRegSuccess] = useState('');

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;
    let reply = '';
    if (cmd === 'python manage.py runserver') {
      setServerRunning(true);
      reply = 'Watching for file changes...\nDjango version 4.2, using settings \'inventory.settings\'\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
    } else if (cmd === 'python manage.py createsuperuser') {
      reply = 'Username: admin\nEmail address: admin@example.com\nPassword: ********\nSuperuser created successfully.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else {
      reply = `"${cmd}" not recognized. Try "python manage.py runserver".`;
    }
    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = registeredUsers.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setLoggedInUser(user);
      setLoginError('');
      setPreviewUrl('http://127.0.0.1:8000/products/');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginForm({ username: '', password: '' });
    setPreviewUrl('http://127.0.0.1:8000/login/');
  };

  const validateReg = () => {
    const errors = {};
    if (!regForm.username.trim()) errors.username = 'Username is required.';
    else if (registeredUsers.find(u => u.username === regForm.username)) errors.username = 'Username already taken.';
    if (!regForm.email.trim() || !regForm.email.includes('@')) errors.email = 'Enter a valid email address.';
    if (regForm.password1.length < 8) errors.password1 = 'Password must be at least 8 characters.';
    if (regForm.password1 !== regForm.password2) errors.password2 = 'Passwords do not match.';
    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validateReg();
    if (Object.keys(errors).length > 0) { setRegErrors(errors); setRegSuccess(''); return; }
    setRegisteredUsers(prev => [...prev, { username: regForm.username, email: regForm.email, password: regForm.password1 }]);
    setRegSuccess(`Account created for "${regForm.username}"! You can now log in.`);
    setRegErrors({});
    setRegForm({ username: '', email: '', password1: '', password2: '' });
    setTimeout(() => setPreviewUrl('http://127.0.0.1:8000/login/'), 1500);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which built-in Django form is used to handle user registration with password confirmation?',
      opts: ['AuthenticationForm', 'UserForm', 'UserCreationForm', 'RegistrationForm'],
      ans: 2,
      exp: 'UserCreationForm (from django.contrib.auth.forms) provides username, password1 and password2 fields out-of-the-box, including password match validation.'
    },
    {
      k: 'q2',
      q: 'What does the @login_required decorator do when an unauthenticated user tries to access a protected view?',
      opts: [
        'It raises a 403 Forbidden error',
        'It redirects the user to the LOGIN_URL (default: /accounts/login/)',
        'It logs the user out',
        'It renders a blank page'
      ],
      ans: 1,
      exp: '@login_required redirects unauthenticated users to the login page (settings.LOGIN_URL) with a "next" query parameter so they are returned to the original page after logging in.'
    },
    {
      k: 'q3',
      q: 'How do you check inside a Django template if the current user is logged in?',
      opts: [
        '{% if user.is_staff %}',
        '{% if request.session.user %}',
        '{% if user.is_authenticated %}',
        '{% if user.logged_in %}'
      ],
      ans: 2,
      exp: 'Django\'s template context always includes the "user" variable. user.is_authenticated returns True for logged-in users and False for anonymous users.'
    },
    {
      k: 'q4',
      q: 'Which Django function ends a user\'s session and removes their authentication data?',
      opts: ['auth.remove(request)', 'logout(request)', 'session.clear(request)', 'auth.logout(request, user)'],
      ans: 1,
      exp: 'logout(request) from django.contrib.auth flushes the session data and marks the user as anonymous, effectively ending their authenticated session.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO AUTH ──────────────────────────────────────────── */}
      {activeTab === 'intro_auth' && (
        <Section key="intro" eyebrow="Django • Day 6 • Module 01" title="User Authentication in Django">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔐 What is Authentication?</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: 'white' }}>Authentication</strong> is the process of verifying <em>who</em> a user is. Django ships with a complete, battle-tested authentication system in <code style={{ color: '#7dd3fc' }}>django.contrib.auth</code> that handles user accounts, passwords, sessions, permissions and groups — all without writing a single line of auth logic yourself.
              </p>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Authentication vs Authorization</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🔍', title: 'Authentication', color: '#0284c7', bg: '#f0f9ff', desc: 'Verifies WHO the user is. "Are you really Alice?" Handled via login forms, sessions, and tokens.' },
                { icon: '🛡️', title: 'Authorization', color: '#7c3aed', bg: '#f5f3ff', desc: 'Verifies WHAT the user can do. "Can Alice delete a product?" Handled via permissions and groups.' },
              ].map(({ icon, title, color, bg, desc }) => (
                <div key={title} style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontWeight: 800, color, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: '0.83rem', color: '#475569' }}>{desc}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Django Auth Flow Overview</h3>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              {[
                ['1', 'User visits a protected URL', 'Django checks request.user.is_authenticated'],
                ['2', 'Not logged in?', '@login_required redirects to /login/ with ?next=/protected-url/'],
                ['3', 'User submits login form', 'authenticate(username, password) checks DB credentials'],
                ['4', 'Credentials valid?', 'login(request, user) stores user in session → redirects to next'],
                ['5', 'User session active', 'All subsequent requests know who the user is via request.user'],
                ['6', 'User clicks logout', 'logout(request) destroys session → anonymous user'],
              ].map(([step, action, detail]) => (
                <div key={step} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ background: '#0f172a', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>{step}</span>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong style={{ color: '#0f172a' }}>{action}</strong>
                    <span style={{ color: '#64748b' }}> — {detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Key Functions & Classes</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Module</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['authenticate()', 'django.contrib.auth', 'Checks username+password against DB, returns User or None'],
                  ['login(request, user)', 'django.contrib.auth', 'Stores user in session — marks them as logged in'],
                  ['logout(request)', 'django.contrib.auth', 'Destroys session — marks user as anonymous'],
                  ['@login_required', 'django.contrib.auth.decorators', 'Protects views — redirects anonymous users to login'],
                  ['AuthenticationForm', 'django.contrib.auth.forms', 'Built-in login form with username + password fields'],
                  ['UserCreationForm', 'django.contrib.auth.forms', 'Built-in registration form with password confirmation'],
                  ['request.user', 'django.http.HttpRequest', 'Always available in views — current User or AnonymousUser'],
                ].map(([name, mod, desc]) => (
                  <tr key={name} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem' }}>{name}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#0284c7' }}>{mod}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#475569' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('login_view')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Login View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. LOGIN VIEW ──────────────────────────────────────────── */}
      {activeTab === 'login_view' && (
        <Section key="login" eyebrow="Django • Day 6 • Module 02" title="Login View & AuthenticationForm">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django provides <code>AuthenticationForm</code> — a ready-made form that accepts <strong>username</strong> and <strong>password</strong>. The login view checks POST data, authenticates credentials, then calls <code>login()</code> to persist the session:</p>

            <CodeBlock title="accounts/views.py — Login View" code={`from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)           # Store user in session
                messages.success(request, f'Welcome back, {username}!')
                return redirect('product_list')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})`} />

            <CodeBlock title="templates/accounts/login.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<div class="auth-container">
  <h2>Login</h2>
  {% if messages %}
    {% for message in messages %}
      <div class="alert alert-{{ message.tags }}">{{ message }}</div>
    {% endfor %}
  {% endif %}
  <form method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
  <p>Don't have an account? <a href="{% url 'register' %}">Register here</a></p>
</div>
{% endblock %}`} />

            <InfoBox icon={Key} color="#0369a1" bg="#f0f9ff" border="#bae6fd">
              <strong>How authenticate() works:</strong> It runs through Django's configured AUTHENTICATION_BACKENDS (by default, checks <code>auth_user</code> table). Returns the <code>User</code> object if credentials match, or <code>None</code> if they don't. Always use <code>authenticate()</code> — never compare passwords manually.
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('logout_view')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Logout View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. LOGOUT VIEW ──────────────────────────────────────────── */}
      {activeTab === 'logout_view' && (
        <Section key="logout" eyebrow="Django • Day 6 • Module 03" title="Logout View">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Logging out is simple — call <code>logout(request)</code> to flush the session and then redirect:</p>

            <CodeBlock title="accounts/views.py — Logout View" code={`from django.contrib.auth import logout
from django.shortcuts import redirect

def user_logout(request):
    logout(request)            # Destroys session, sets user to AnonymousUser
    return redirect('login')`} />

            <p>Add a logout link to your base template that's only visible to authenticated users:</p>
            <CodeBlock title="templates/base.html — Conditional Nav Links" language="html" code={`<nav>
  {% if user.is_authenticated %}
    <span>Welcome, {{ user.username }}!</span>
    <a href="{% url 'logout' %}">Logout</a>
    <a href="{% url 'product_list' %}">Products</a>
  {% else %}
    <a href="{% url 'login' %}">Login</a>
    <a href="{% url 'register' %}">Register</a>
  {% endif %}
</nav>`} />

            <InfoBox icon={ShieldAlert} color="#9f1239" bg="#fff1f2" border="#fecdd3">
              <strong>Best practice:</strong> Logout should always use a <code>POST</code> form (not a plain &lt;a&gt; tag) to protect against CSRF-based forced logouts. However, for simplicity in small projects a GET-based redirect is common — just be aware of the trade-off.
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('register_view')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Register View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. REGISTER VIEW ──────────────────────────────────────────── */}
      {activeTab === 'register_view' && (
        <Section key="register" eyebrow="Django • Day 6 • Module 04" title="Register View & UserCreationForm">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p><code>UserCreationForm</code> provides three fields — <strong>username</strong>, <strong>password1</strong>, <strong>password2</strong> — and automatically validates that both passwords match and meet Django's password strength requirements:</p>

            <CodeBlock title="accounts/views.py — Register View" code={`from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()                        # Creates the User record in DB
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Custom Registration Form (adding email field)</h3>
            <p>To add an <strong>email</strong> field, create a custom form extending <code>UserCreationForm</code>:</p>
            <CodeBlock title="accounts/forms.py — CustomUserCreationForm" code={`from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text='Required. Enter a valid email address.')

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user`} />

            <CodeBlock title="templates/accounts/register.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<div class="auth-container">
  <h2>Create Account</h2>
  {% if messages %}
    {% for message in messages %}
      <div class="alert alert-{{ message.tags }}">{{ message }}</div>
    {% endfor %}
  {% endif %}
  <form method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
  <p>Already have an account? <a href="{% url 'login' %}">Login here</a></p>
</div>
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('login_required')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Protecting Views <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. LOGIN REQUIRED ──────────────────────────────────────────── */}
      {activeTab === 'login_required' && (
        <Section key="protected" eyebrow="Django • Day 6 • Module 05" title="Protecting Views with @login_required">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The <code>@login_required</code> decorator is the simplest way to restrict access to a view. If an unauthenticated user hits a protected URL, Django redirects them to the login page with the original URL appended as a <code>?next=</code> parameter:</p>

            <CodeBlock title="inventory/views.py — Protecting product views" code={`from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from .forms import ProductForm

@login_required                            # Unauthenticated → redirected to /login/?next=/products/
def product_list(request):
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})

@login_required
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'inventory/add_product.html', {'form': form})

@login_required
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product_list')
    return render(request, 'inventory/confirm_delete.html', {'product': product})`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Configure LOGIN_URL in settings.py</h3>
            <CodeBlock title="inventory/settings.py" code={`# Tells @login_required where to redirect anonymous users
LOGIN_URL = '/login/'

# After successful login, redirect here if no ?next= parameter
LOGIN_REDIRECT_URL = '/products/'

# After logout, redirect here
LOGOUT_REDIRECT_URL = '/login/'`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Checking Auth in Templates</h3>
            <CodeBlock title="templates/inventory/product_list.html — Auth check" language="html" code={`{% if user.is_authenticated %}
  <p>Welcome, {{ user.username }}! 
     <a href="{% url 'logout' %}">Logout</a>
  </p>
  <a href="{% url 'add_product' %}">+ Add Product</a>
{% else %}
  <p><a href="{% url 'login' %}">Login</a> to manage products.</p>
{% endif %}`} />

            <InfoBox icon={CheckCircle} color="#065f46" bg="#f0fdf4" border="#bbf7d0">
              <strong>Tip — "next" redirect:</strong> When <code>@login_required</code> redirects to <code>/login/?next=/products/</code>, you should handle the <code>next</code> parameter in your login view:<br />
              <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>return redirect(request.POST.get('next') or 'product_list')</code>
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('urls_auth')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Auth URL Configuration <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. URLS AUTH ──────────────────────────────────────────── */}
      {activeTab === 'urls_auth' && (
        <Section key="urls" eyebrow="Django • Day 6 • Module 06" title="Auth URL Configuration">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Create a dedicated <strong>accounts app</strong> for authentication URLs, keeping auth logic separate from inventory logic:</p>

            <CodeBlock title="accounts/urls.py" code={`from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register, name='register'),
]`} />

            <CodeBlock title="inventory/urls.py (project level)" code={`from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('invent_app.urls')),     # Inventory CRUD routes
    path('', include('accounts.urls')),       # Auth routes: /login/, /logout/, /register/
]`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Full Project Structure</h3>
            <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 2 }}>
              {[
                ['📁', 'inventory/', '# Django project folder'],
                ['  📄', 'settings.py', '# LOGIN_URL, LOGIN_REDIRECT_URL'],
                ['  📄', 'urls.py', '# includes invent_app.urls and accounts.urls'],
                ['📁', 'invent_app/', '# Product CRUD app'],
                ['  📄', 'models.py', '# Product, Category models'],
                ['  📄', 'forms.py', '# ProductForm with validators'],
                ['  📄', 'views.py', '# @login_required on all product views'],
                ['  📄', 'urls.py', '# /products/, /add-product/, ...'],
                ['📁', 'accounts/', '# Authentication app'],
                ['  📄', 'views.py', '# user_login, user_logout, register'],
                ['  📄', 'forms.py', '# CustomUserCreationForm'],
                ['  📄', 'urls.py', '# /login/, /logout/, /register/'],
                ['📁', 'templates/'],
                ['  📁', 'accounts/', '# login.html, register.html'],
                ['  📁', 'inventory/', '# product_list.html, ...'],
              ].map(([icon, name, comment]) => (
                <div key={name + comment}>
                  <span style={{ color: '#7ee787' }}>{icon} {name}</span>
                  <span style={{ color: '#8b949e' }}> {comment}</span>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_auth')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Next: Live Auth Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE AUTH SANDBOX ────────────────────────────── */}
      {activeTab === 'interactive_auth' && (
        <Section key="sandbox" eyebrow="Django • Day 6 • Module 07" title="Interactive Auth Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Experience Django authentication live! Boot the server, then register a new account and log in to access the protected products page.</p>

            {/* Terminal */}
            <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>🖥️ Terminal</div>
              <div style={{ maxHeight: 72, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                {terminalLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('>') ? '#e2e8f0' : '#86efac' }}>{log}</pre>
                ))}
              </div>
              <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: 6, padding: '6px 12px', borderTop: '1px solid #1e293b' }}>
                <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', alignSelf: 'center' }}>$</span>
                <input type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)}
                  placeholder="python manage.py runserver"
                  style={{ background: '#1e293b', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 8px', flexGrow: 1, outline: 'none', borderRadius: 4 }} />
              </form>
            </div>

            {/* Nav bar tabs */}
            {serverRunning && (
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                  {[
                    { url: 'http://127.0.0.1:8000/login/', label: '🔐 /login/' },
                    { url: 'http://127.0.0.1:8000/register/', label: '📝 /register/' },
                    { url: 'http://127.0.0.1:8000/products/', label: '📦 /products/' },
                  ].map(({ url, label }) => (
                    <button key={url} onClick={() => setPreviewUrl(url)}
                      style={{ padding: '4px 10px', borderRadius: 6, border: previewUrl === url ? '2px solid #0f172a' : '1px solid #cbd5e1', background: previewUrl === url ? '#0f172a' : '#f8fafc', color: previewUrl === url ? 'white' : '#475569', cursor: 'pointer', fontSize: '0.76rem', fontWeight: previewUrl === url ? 700 : 400 }}>
                      {label}
                    </button>
                  ))}
                  {loggedInUser && (
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                      ✅ Logged in as <strong>{loggedInUser.username}</strong>
                    </span>
                  )}
                </div>

                {/* Browser Viewport */}
                <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: '#f1f5f9', padding: '6px 10px', borderBottom: '1px solid #cbd5e1', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                    🌐 {previewUrl}
                  </div>
                  <div style={{ background: 'white', minHeight: 200 }}>

                    {/* ── /login/ ── */}
                    {previewUrl === 'http://127.0.0.1:8000/login/' && (
                      <div>
                        <header style={{ background: '#0f172a', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700 }}>Inventory System</span>
                          <div style={{ display: 'flex', gap: 10, fontSize: '0.75rem' }}>
                            <span style={{ color: '#60a5fa', cursor: 'pointer' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/login/')}>Login</span>
                            <span style={{ color: '#60a5fa', cursor: 'pointer' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/register/')}>Register</span>
                          </div>
                        </header>
                        <div style={{ padding: '20px', maxWidth: 320, margin: '0 auto' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <Lock size={20} color="#0f172a" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Login</h3>
                          </div>
                          {loginError && (
                            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 6, padding: '8px 10px', fontSize: '0.78rem', color: '#991b1b', marginBottom: 12 }}>
                              ❌ {loginError}
                            </div>
                          )}
                          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                              <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>Username</label>
                              <input type="text" value={loginForm.username} onChange={e => setLoginForm(p => ({ ...p, username: e.target.value }))}
                                placeholder="e.g. admin"
                                style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.82rem', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>Password</label>
                              <div style={{ position: 'relative' }}>
                                <input type={showLoginPw ? 'text' : 'password'} value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                                  placeholder="••••••••"
                                  style={{ width: '100%', padding: '6px 30px 6px 8px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.82rem', boxSizing: 'border-box' }} />
                                <button type="button" onClick={() => setShowLoginPw(p => !p)}
                                  style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                  {showLoginPw ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                              </div>
                            </div>
                            <button type="submit" style={{ padding: '7px', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                              Login
                            </button>
                          </form>
                          <p style={{ fontSize: '0.76rem', textAlign: 'center', marginTop: 12, color: '#64748b' }}>
                            No account? <span style={{ color: '#0284c7', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/register/')}>Register here</span>
                          </p>
                          <div style={{ marginTop: 12, background: '#f8fafc', borderRadius: 6, padding: '8px', fontSize: '0.72rem', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                            <strong>Demo credentials:</strong> username: <code>admin</code> / password: <code>admin123</code>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── /register/ ── */}
                    {previewUrl === 'http://127.0.0.1:8000/register/' && (
                      <div>
                        <header style={{ background: '#0f172a', color: 'white', padding: '10px 16px' }}>
                          <span style={{ fontWeight: 700 }}>Inventory System — Register</span>
                        </header>
                        <div style={{ padding: '16px', maxWidth: 320, margin: '0 auto' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <UserPlus size={20} color="#0f172a" />
                            <h3 style={{ margin: 0, fontSize: '1rem' }}>Create Account</h3>
                          </div>
                          {regSuccess && (
                            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 6, padding: '8px 10px', fontSize: '0.78rem', color: '#14532d', marginBottom: 10 }}>
                              ✅ {regSuccess}
                            </div>
                          )}
                          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                              { label: 'Username', key: 'username', type: 'text', placeholder: 'Choose a username' },
                              { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
                            ].map(({ label, key, type, placeholder }) => (
                              <div key={key}>
                                <label style={{ fontSize: '0.76rem', fontWeight: 600, display: 'block', marginBottom: 2 }}>{label}</label>
                                <input type={type} value={regForm[key]} placeholder={placeholder}
                                  onChange={e => setRegForm(p => ({ ...p, [key]: e.target.value }))}
                                  style={{ width: '100%', padding: '5px 8px', border: regErrors[key] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', boxSizing: 'border-box' }} />
                                {regErrors[key] && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{regErrors[key]}</span>}
                              </div>
                            ))}
                            {[
                              { label: 'Password', key: 'password1' },
                              { label: 'Confirm Password', key: 'password2' },
                            ].map(({ label, key }) => (
                              <div key={key}>
                                <label style={{ fontSize: '0.76rem', fontWeight: 600, display: 'block', marginBottom: 2 }}>{label}</label>
                                <div style={{ position: 'relative' }}>
                                  <input type={showRegPw ? 'text' : 'password'} value={regForm[key]} placeholder="Min 8 characters"
                                    onChange={e => setRegForm(p => ({ ...p, [key]: e.target.value }))}
                                    style={{ width: '100%', padding: '5px 28px 5px 8px', border: regErrors[key] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', boxSizing: 'border-box' }} />
                                  <button type="button" onClick={() => setShowRegPw(p => !p)}
                                    style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                    {showRegPw ? <EyeOff size={13} /> : <Eye size={13} />}
                                  </button>
                                </div>
                                {regErrors[key] && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{regErrors[key]}</span>}
                              </div>
                            ))}
                            <button type="submit" style={{ padding: '7px', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>
                              Register
                            </button>
                          </form>
                          <p style={{ fontSize: '0.76rem', textAlign: 'center', marginTop: 10, color: '#64748b' }}>
                            Already have an account? <span style={{ color: '#0284c7', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/login/')}>Login here</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ── /products/ ── */}
                    {previewUrl === 'http://127.0.0.1:8000/products/' && (
                      loggedInUser ? (
                        <div>
                          <header style={{ background: '#0f172a', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700 }}>Inventory System</span>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.75rem' }}>
                              <span style={{ color: '#86efac' }}>👋 {loggedInUser.username}</span>
                              <button onClick={handleLogout}
                                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '3px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <LogOut size={11} /> Logout
                              </button>
                            </div>
                          </header>
                          <div style={{ padding: 16 }}>
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#14532d', marginBottom: 14 }}>
                              ✅ You are logged in as <strong>{loggedInUser.username}</strong>. You can now manage products.
                            </div>
                            <h3 style={{ fontSize: '0.95rem', margin: '0 0 10px' }}>Product List (Protected Page)</h3>
                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>This page is only accessible to authenticated users. The <code>@login_required</code> decorator protects this view.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                              {['Laptop — $999', 'Keyboard — $49', 'Python Book — $29.99'].map(p => (
                                <div key={p} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 10px', fontSize: '0.78rem', color: '#334155' }}>📦 {p}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <header style={{ background: '#0f172a', color: 'white', padding: '10px 16px' }}>
                            <span style={{ fontWeight: 700 }}>Inventory System</span>
                          </header>
                          <div style={{ padding: '30px', textAlign: 'center' }}>
                            <Lock size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                            <h3 style={{ fontSize: '0.95rem', color: '#0f172a', margin: '0 0 6px' }}>Login Required</h3>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 14 }}>This page is protected by <code>@login_required</code>. You have been redirected from <code>/products/</code>.</p>
                            <button onClick={() => setPreviewUrl('http://127.0.0.1:8000/login/')}
                              style={{ padding: '7px 20px', background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>
                              Go to Login →
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {!serverRunning && (
              <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                <Terminal size={32} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem' }}>Run <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4, color: '#334155' }}>python manage.py runserver</code> above to launch the auth sandbox.</p>
              </div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 6 Quiz — User Authentication">
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
                      } else if (selected) { bg = '#f0f9ff'; border = '1.5px solid #0284c7'; }
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
                    style={{ background: '#0f172a', borderColor: '#0f172a', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0f172a', borderColor: '#0f172a' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 9. ASSIGNMENT ──────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 6 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Add Full User Authentication to Your Inventory System</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Integrate login, logout, and registration into the inventory project you built in Days 3–5:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Create a new Django app called <code>accounts</code> (<code>python manage.py startapp accounts</code>) and register it in <code>INSTALLED_APPS</code>.</li>
                <li>Create <code>accounts/views.py</code> with three views: <code>user_login</code> (using <code>AuthenticationForm</code>), <code>user_logout</code>, and <code>register</code> (using <code>CustomUserCreationForm</code> with email field).</li>
                <li>Create <code>accounts/urls.py</code> with routes for <code>/login/</code>, <code>/logout/</code>, <code>/register/</code> and include it in the project-level <code>urls.py</code>.</li>
                <li>Create templates <code>accounts/login.html</code> and <code>accounts/register.html</code> with proper <code>{"{% csrf_token %}"}</code> and message display blocks.</li>
                <li>Add <code>@login_required</code> decorator to all product views (<code>product_list</code>, <code>add_product</code>, <code>update_product</code>, <code>delete_product</code>).</li>
                <li>Configure <code>LOGIN_URL</code>, <code>LOGIN_REDIRECT_URL</code>, and <code>LOGOUT_REDIRECT_URL</code> in <code>settings.py</code>.</li>
                <li>Update <code>base.html</code> to show conditional nav links using <code>{"{% if user.is_authenticated %}"}</code>.</li>
                <li>Test the full flow: register → login → access products → logout → verify redirect.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Security Reminder:</strong> Always use Django's built-in <code>authenticate()</code> and <code>login()</code> functions — never compare passwords directly from the database. Django stores passwords as <strong>hashed</strong> values using PBKDF2 by default.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module7', 'intro_roles')}>
              Next: Day 7 — User Roles &amp; Permissions <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
